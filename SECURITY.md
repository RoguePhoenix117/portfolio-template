# Security Guide

This document outlines the security measures implemented in the portfolio template and provides recommendations for keeping your website secure.

## Built-in Security Features

### Security Headers

The template includes security headers configured in `next.config.ts`:

- **X-Content-Type-Options: nosniff** - Prevents MIME type sniffing
- **X-Frame-Options: DENY** - Prevents clickjacking attacks
- **X-XSS-Protection: 1; mode=block** - Enables browser XSS protection
- **Referrer-Policy: strict-origin-when-cross-origin** - Controls referrer information
- **Permissions-Policy** - Restricts access to browser features

These headers are automatically applied to all routes in your application.

### Contact Form Protection

#### Rate Limiting

The contact form API (`/api/contact`) includes rate limiting:
- **Limit**: 5 submissions per 15 minutes per IP address
- **Purpose**: Prevents spam and DDoS attacks
- **Response**: Returns 429 (Too Many Requests) when limit is exceeded

#### Honeypot Protection

- Hidden checkbox field (`botcheck`) that bots often fill automatically
- Bots are silently rejected without user notification
- No impact on legitimate users

#### Input Validation

All form inputs are validated:
- Required fields are checked
- Email format validation (regex)
- Message length limit (5000 characters)
- Server-side validation for security

#### Spam Protection

- Honeypot field prevents automated bot submissions
- Rate limiting prevents submission floods
- Input sanitization (via Web3Forms or your API provider)

---

## Deployment Security Recommendations

### Platform-Specific Protections

#### Vercel (Recommended)

Vercel provides built-in DDoS protection:
- Automatic DDoS mitigation
- Rate limiting at the edge
- Geographic distribution
- **No additional configuration needed**

**Recommendations:**
1. Enable Vercel's analytics for monitoring
2. Use Vercel's edge functions for rate limiting if needed
3. Monitor usage in Vercel dashboard

#### Netlify

Netlify also includes DDoS protection:
- Built-in DDoS mitigation
- Edge network protection
- **No additional configuration needed**

**Recommendations:**
1. Enable Netlify Forms for additional spam protection
2. Configure Netlify's visitor analytics

#### Other Platforms

If deploying to other platforms:

1. **Cloudflare** (Recommended)
   - Free tier includes DDoS protection
   - Set up Cloudflare in front of your site
   - Enable bot management (paid feature)

2. **AWS CloudFront**
   - Use AWS WAF for DDoS protection
   - Configure rate limiting rules

3. **Custom Server**
   - Implement reverse proxy (nginx/Apache)
   - Use fail2ban for IP blocking
   - Configure firewall rules

---

## Environment Variables Security

### Best Practices

1. **Never commit secrets to Git**
   - Add `.env.local` to `.gitignore`
   - Use environment variables for API keys
   - Rotate keys regularly

2. **Use Environment Variables for Production**

Instead of storing API keys in `user.json`, use environment variables:

```env
# .env.local (don't commit this!)
WEB3FORMS_ACCESS_KEY=your_access_key_here
```

**Note:** Use `WEB3FORMS_ACCESS_KEY` (without `NEXT_PUBLIC_`) since it's only used server-side for security.

3. **Deployment Platform Variables**

Configure environment variables in your deployment platform:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **Other platforms**: Refer to platform documentation

---

## Additional Security Recommendations

### 1. Content Security Policy (CSP)

Consider adding a Content Security Policy for stricter security. Update `next.config.ts`:

```typescript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
}
```

**Note**: This may break some features. Test thoroughly before enabling.

### 2. HTTPS Only

Ensure your deployment platform enforces HTTPS:
- **Vercel**: Automatic HTTPS with Let's Encrypt
- **Netlify**: Automatic HTTPS with Let's Encrypt
- **Custom**: Use certificates from Let's Encrypt or your provider

### 3. Regular Updates

Keep dependencies updated:
```bash
pnpm update
# or
npm update
```

Check for security vulnerabilities:
```bash
pnpm audit
# or
npm audit
```

### 4. API Key Rotation

Regularly rotate API keys:
1. Generate new API key
2. Update environment variable
3. Verify old key is disabled
4. Test form submission

### 5. Monitor Submissions

Monitor contact form submissions:
- Check email regularly
- Set up email filters for spam
- Review submission logs if available
- Watch for unusual patterns

---

## Rate Limiting Considerations

### Current Implementation

The current rate limiting is **in-memory** and resets on server restart. This is suitable for:
- Small to medium traffic
- Static sites with serverless functions
- Most portfolio websites

### For High Traffic Sites

If you expect high traffic or need persistent rate limiting:

1. **Use Redis** (for Vercel or other platforms with Redis)
2. **Use Vercel Edge Config** (Vercel-specific)
3. **Use Upstash** (Serverless Redis)
4. **Use your API provider's rate limiting** (Web3Forms has built-in protection)

### Upgrade Path

If you need more sophisticated rate limiting:

1. Install a rate limiting package:
   ```bash
   pnpm add @upstash/ratelimit
   ```

2. Update `/api/contact/route.ts` to use Redis-based rate limiting
3. Configure Upstash or your Redis provider
4. Deploy with environment variables

---

## Monitoring and Alerts

### Recommended Monitoring

1. **Error Tracking**
   - Set up error tracking (Sentry, LogRocket, etc.)
   - Monitor API route errors
   - Track form submission failures

2. **Analytics**
   - Use Vercel Analytics or Google Analytics
   - Monitor page views and user behavior
   - Track form submission rates

3. **Uptime Monitoring**
   - Use Uptime Robot or similar service
   - Monitor API endpoint availability
   - Set up alerts for downtime

### Cost Monitoring

Monitor costs if using paid services:
- Web3Forms: Monitor submission count (free: 250/month)
- API providers: Monitor usage and costs
- Platform costs: Monitor bandwidth and function invocations

---

## Incident Response

### If You Experience an Attack

1. **Immediate Actions**
   - Check rate limiting is working
   - Review server logs
   - Identify attack patterns

2. **Short-term**
   - Temporarily reduce rate limits if needed
   - Block specific IPs if necessary (platform-dependent)
   - Contact your hosting provider

3. **Long-term**
   - Implement additional security layers
   - Consider Cloudflare or similar service
   - Review and update security headers
   - Update dependencies

### Reporting Issues

If you discover security vulnerabilities:
1. **Do NOT** create public GitHub issues
2. Email the maintainer privately
3. Provide detailed information
4. Allow time for fixes before public disclosure

---

## Security Checklist

Before deploying your portfolio:

- [ ] Security headers are enabled (automatic)
- [ ] Contact form rate limiting is active (automatic)
- [ ] API keys are stored in environment variables
- [ ] `.env.local` is in `.gitignore`
- [ ] HTTPS is enforced on your platform
- [ ] Dependencies are up to date
- [ ] You've tested form submission
- [ ] Error monitoring is set up (optional)
- [ ] You've reviewed submission logs

---

## Resources

- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web3Forms Security](https://docs.web3forms.com/)
- [Vercel Security](https://vercel.com/docs/security)
- [Netlify Security](https://docs.netlify.com/)

---

## Support

For security concerns:
- Open a private security issue on GitHub
- Email: [Your Contact Email]
- Do not disclose security issues publicly

