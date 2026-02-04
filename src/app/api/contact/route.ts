import { NextRequest, NextResponse } from 'next/server';

// Rate limiting: Simple in-memory store (in production, use Redis or similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // Max 5 submissions per 15 minutes per IP

function getRateLimitKey(ip: string): string {
  return `contact-${ip}`;
}

function checkRateLimit(ip: string): boolean {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const record = requestCounts.get(key);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    requestCounts.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  // Try various headers that might contain the IP
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  // Fallback
  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          message: 'Rate limit exceeded. Please wait before submitting again.'
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      subject,
      message,
      provider = 'web3forms',
      genericApiEndpoint,
      genericApiHeaders,
      'h-captcha-response': hCaptchaResponse,
    } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields', message: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email', message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message too long', message: 'Message must be less than 5000 characters.' },
        { status: 400 }
      );
    }

    let response: Response;
    let result: any;

    if (provider === 'web3forms') {
      // Use server-only env var so the key is never exposed to the client
      const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;

      if (!web3formsAccessKey) {
        return NextResponse.json(
          { error: 'Web3Forms access key not configured', message: 'Please set WEB3FORMS_ACCESS_KEY in your environment (.env.local). See CONTACT_FORM_SETUP.md for instructions.' },
          { status: 500 }
        );
      }

      if (!hCaptchaResponse || typeof hCaptchaResponse !== 'string') {
        return NextResponse.json(
          { error: 'Captcha required', message: 'Please complete the captcha verification.' },
          { status: 400 }
        );
      }

      // Web3Forms integration (includes hCaptcha token for spam protection)
      const web3formsPayload = {
        access_key: web3formsAccessKey,
        name,
        email,
        subject,
        message,
        from_name: name,
        botcheck: false,
        'h-captcha-response': hCaptchaResponse,
      };

      response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(web3formsPayload),
      });

      result = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          { 
            error: 'Failed to submit form',
            message: result.message || 'An error occurred while submitting your message. Please try again later.'
          },
          { status: response.status }
        );
      }
    } else if (provider === 'generic') {
      if (!genericApiEndpoint) {
        return NextResponse.json(
          { error: 'Generic API endpoint not configured', message: 'Please configure your API endpoint in user.json' },
          { status: 400 }
        );
      }

      // Generic API integration
      const genericPayload = {
        name,
        email,
        subject,
        message,
      };

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...genericApiHeaders,
      };

      response = await fetch(genericApiEndpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(genericPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return NextResponse.json(
          { 
            error: 'Failed to submit form',
            message: 'An error occurred while submitting your message. Please try again later.',
            details: errorText
          },
          { status: response.status }
        );
      }

      result = await response.json().catch(() => ({ success: true }));
    } else {
      return NextResponse.json(
        { error: 'Invalid provider', message: 'Invalid form provider specified.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: result,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    );
  }
}

