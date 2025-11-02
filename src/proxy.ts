import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy to protect the Sanity Studio route
 * 
 * Security options:
 * 1. Password protection (recommended for production)
 * 2. IP whitelist (for specific IPs)
 * 3. Environment-based (dev only)
 * 
 * Configure via environment variables:
 * - STUDIO_PASSWORD: Password to protect Studio (optional)
 * - STUDIO_ALLOWED_IPS: Comma-separated IPs (optional)
 * - STUDIO_DEV_ONLY: "true" to block in production (optional)
 */

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /studio routes
  if (!pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  // Option 1: Password protection via query param or cookie
  const studioPassword = process.env.STUDIO_PASSWORD;
  if (studioPassword) {
    const urlPassword = request.nextUrl.searchParams.get('password');
    const cookiePassword = request.cookies.get('studio-auth')?.value;

    // Check if valid password in URL
    if (urlPassword === studioPassword) {
      // Set cookie for future visits (valid for 7 days)
      const response = NextResponse.next();
      response.cookies.set('studio-auth', studioPassword, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      return response;
    }

    // Check if valid password in cookie
    if (cookiePassword === studioPassword) {
      return NextResponse.next();
    }

    // Check if wrong password was submitted
    const hasPasswordAttempt = urlPassword !== null;
    const isWrongPassword = hasPasswordAttempt && urlPassword !== studioPassword;

    // Show password prompt
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Studio Access</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0;
            }
            .container {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.2);
              max-width: 400px;
              width: 100%;
            }
            h1 {
              margin: 0 0 1rem 0;
              color: #333;
            }
            input {
              width: 100%;
              padding: 0.75rem;
              border: 1px solid ${isWrongPassword ? '#e74c3c' : '#ddd'};
              border-radius: 4px;
              font-size: 1rem;
              box-sizing: border-box;
              margin-bottom: 0.5rem;
            }
            input:focus {
              outline: none;
              border-color: ${isWrongPassword ? '#e74c3c' : '#667eea'};
              box-shadow: 0 0 0 3px ${isWrongPassword ? 'rgba(231, 76, 60, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
            }
            button {
              width: 100%;
              padding: 0.75rem;
              background: #667eea;
              color: white;
              border: none;
              border-radius: 4px;
              font-size: 1rem;
              cursor: pointer;
              transition: background 0.2s;
            }
            button:hover {
              background: #5568d3;
            }
            .error {
              color: #e74c3c;
              font-size: 0.875rem;
              margin-top: 0;
              margin-bottom: 1rem;
              display: ${isWrongPassword ? 'block' : 'none'};
            }
            .error-icon {
              display: inline-block;
              margin-right: 0.25rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Studio Access Required</h1>
            ${isWrongPassword ? '<p class="error"><span class="error-icon">⚠️</span> Invalid password. Please try again.</p>' : ''}
            <form method="GET">
              <input 
                type="password" 
                name="password" 
                placeholder="Enter password" 
                required 
                autofocus
                ${isWrongPassword ? 'value=""' : ''}
              />
              <button type="submit">Access Studio</button>
            </form>
          </div>
        </body>
      </html>
    `, {
      status: 401,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Option 2: IP whitelist
  const allowedIPs = process.env.STUDIO_ALLOWED_IPS?.split(',').map(ip => ip.trim());
  if (allowedIPs && allowedIPs.length > 0) {
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    if (!allowedIPs.includes(clientIP)) {
      return new NextResponse('Access Denied', { status: 403 });
    }
  }

  // Option 3: Development only
  if (process.env.STUDIO_DEV_ONLY === 'true' && process.env.NODE_ENV === 'production') {
    return new NextResponse('Studio not available in production', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/studio/:path*',
};

