# Sanity Studio Security Guide

Additional security options for the Sanity Studio at `/studio`.

> ⚠️ **Note**: The Studio feature is **disabled by default**. Enable it in `public/user.json`:
> ```json
> {
>   "features": {
>     "enableStudio": true
>   }
> }
> ```
> You'll also need Sanity CMS setup - see [SANITY_SETUP.md](SANITY_SETUP.md).

## Built-in Sanity Authentication

**Important:** Sanity has built-in authentication. Even if someone visits `/studio`, they cannot edit content without:

1. A valid Sanity account
2. Being invited to your Sanity project
3. Proper permissions (Editor/Administrator role)

**Sanity's authentication is your primary security layer.**

## Additional Protection Options

You can add middleware protection (optional). Choose one or combine them:

### Option 1: Password Protection (Recommended)

Add a password to protect the Studio route.

1. **Set environment variable:**
   ```bash
   # .env.local
   STUDIO_PASSWORD=your-strong-password-here
   ```

2. **How it works:**
   - Users must enter the password to access `/studio`
   - Password is stored in a cookie (7 days)
   - Query param: `/studio?password=your-password`

3. **Deploy:**
   - Add `STUDIO_PASSWORD` to your deployment platform's environment variables

### Option 2: IP Whitelist

Restrict access to specific IP addresses.

1. **Set environment variable:**
   ```bash
   # .env.local
   STUDIO_ALLOWED_IPS=192.168.1.100,203.0.113.45
   ```

2. **Limitations:**
   - IP addresses can change (especially on mobile)
   - Not suitable for teams with dynamic IPs

### Option 3: Development Only

Hide Studio in production.

1. **Set environment variable:**
   ```bash
   # .env.local
   STUDIO_DEV_ONLY=true
   ```

2. **How it works:**
   - Studio accessible in development
   - Blocked in production builds

### Option 4: Combine Options

You can use multiple protections:

```bash
# .env.local
STUDIO_PASSWORD=secure-password-123
STUDIO_ALLOWED_IPS=203.0.113.45
# Or
STUDIO_PASSWORD=secure-password-123
STUDIO_DEV_ONLY=true
```

## Recommended Setup

### For Production

**Recommended:** Password protection only

```bash
STUDIO_PASSWORD=your-very-strong-password-here
```

**Why:**
- Simple to use
- Works for teams
- Doesn't break when IPs change
- Additional layer before Sanity auth

### For Development

No protection needed (or just password for convenience):

```bash
# .env.local (dev)
STUDIO_PASSWORD=dev-password
```

Or leave it empty for easy access.

## How It Works

1. **User visits `/studio`**
   - Middleware checks protection settings
   - If password required: Shows password prompt
   - If IP restricted: Checks IP whitelist
   - If dev-only: Blocks in production

2. **After protection:**
   - User sees Sanity Studio login
   - Must authenticate with Sanity account
   - Must have access to your project

3. **Two-layer security:**
   - Layer 1: Your middleware protection (optional)
   - Layer 2: Sanity's authentication (required)

## Deployment

### Vercel

1. Go to Project Settings → Environment Variables
2. Add:
   - `STUDIO_PASSWORD` = `your-password`
   - (Optional) `STUDIO_ALLOWED_IPS` = `ip1,ip2`
   - (Optional) `STUDIO_DEV_ONLY` = `false`

### Netlify

1. Go to Site Settings → Environment Variables
2. Add the same variables as above

### Other Platforms

Add environment variables according to your platform's documentation.

## Sanity Project Security

### Managing Access

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **Members**
4. **Invite team members:**
   - Click "Add member"
   - Enter email
   - Choose role:
     - **Administrator**: Full access
     - **Editor**: Can edit content (recommended)
     - **Viewer**: Read-only

**Recommendation:** Give team members "Editor" role unless they need admin access.

## Best Practices

1. **Use strong passwords** if enabling password protection
2. **Rotate passwords regularly** if shared with team
3. **Limit Sanity project access** - only invite trusted users
4. **Use "Editor" role** for content creators (not Administrator)
5. **Review access regularly** - remove inactive members
6. **Monitor Sanity project activity** in Sanity dashboard

## Troubleshooting

### Studio shows password prompt but I didn't set it

- Check `.env.local` for `STUDIO_PASSWORD`
- Check deployment environment variables
- Clear browser cookies for `studio-auth`

### Can't access Studio after setting IP whitelist

- Verify your IP is in `STUDIO_ALLOWED_IPS`
- IP might be different behind proxy/load balancer
- Check `x-forwarded-for` header value

### Studio blocked in production

- If `STUDIO_DEV_ONLY=true`, Studio is blocked in production
- Remove this env var or set to `false`

### Sanity login fails

- Verify you're invited to the Sanity project
- Check you're using the correct Sanity account
- Contact Sanity support if issues persist

## FAQ

**Q: Is the Studio really secure without additional protection?**  
A: Yes! Sanity's authentication is sufficient. Additional protection is optional but recommended for defense-in-depth.

**Q: Can I disable the middleware protection?**  
A: Yes, just don't set any `STUDIO_*` environment variables.

**Q: What happens if I forget the password?**  
A: Remove `STUDIO_PASSWORD` from environment variables and redeploy, or access via `/studio?password=correct-password`.

**Q: Should I use IP whitelist for a team?**  
A: Not recommended - IPs change frequently. Use password protection instead.

**Q: Can I use both password and IP restrictions?**  
A: Yes, the middleware checks both. User must pass both checks.

## Next Steps

1. ✅ Decide on protection method (if any)
2. ✅ Set environment variables
3. ✅ Test locally
4. ✅ Configure deployment environment variables
5. ✅ Review Sanity project members and permissions

---

**Need help?** See [SANITY_SETUP.md](SANITY_SETUP.md) for basic Sanity setup or check the [Security Guide](SECURITY.md).