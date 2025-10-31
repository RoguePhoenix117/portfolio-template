# Contact Form Setup Guide

This guide explains how to set up the contact form for your portfolio website. The template supports multiple form submission providers.

## Supported Providers

1. **Web3Forms** (Recommended for beginners - Free tier: 250 submissions/month)
2. **Generic API** (For custom integrations)

## Option 1: Web3Forms (Recommended)

Web3Forms is a free service that allows you to receive form submissions directly in your email inbox without any backend code.

### Step 1: Get Your Web3Forms Access Key

1. Visit [Web3Forms.com](https://web3forms.com/)
2. Click **"Get Your Access Key"** or **"Sign Up"**
3. Enter your email address
4. You'll receive an access key via email
5. Copy the access key (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Step 2: Configure as Environment Variable

**⚠️ IMPORTANT: Never put your access key in `user.json` - it will be committed to your repository!**

Instead, use environment variables for security:

#### For Local Development

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add your access key:

```env
WEB3FORMS_ACCESS_KEY=your_access_key_here
```

3. Make sure `.env.local` is in your `.gitignore` (it should be by default)

#### For Production Deployment

Configure the environment variable in your deployment platform:

**Vercel:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add `WEB3FORMS_ACCESS_KEY` with your access key
4. Redeploy your application

**Netlify:**
1. Go to Site settings
2. Navigate to "Environment variables"
3. Add `WEB3FORMS_ACCESS_KEY` with your access key
4. Redeploy your site

**Other Platforms:**
Refer to your platform's documentation for setting environment variables.

### Step 3: Configure Provider in user.json

Open `public/user.json` and ensure the `contactForm` section is set to use Web3Forms:

```json
{
  "contactForm": {
    "provider": "web3forms"
  }
}
```

**Note:** Do NOT include the access key here - it's handled via environment variables!

### Step 4: Test Your Form

1. Start your development server: `npm run dev`
2. Navigate to the contact section of your website
3. Fill out and submit the form
4. Check your email inbox - you should receive the form submission

### Web3Forms Features

- ✅ **Free tier**: 250 submissions/month
- ✅ **No backend required**: Works with static sites
- ✅ **Email notifications**: Receive submissions directly in your inbox
- ✅ **Spam protection**: Built-in bot protection
- ✅ **Upgrade options**: Available if you need more submissions

## Option 2: Generic API Integration

If you prefer to use a different service (like Formspree, FormSubmit, or a custom API), you can use the generic API integration.

### Step 1: Set Up Your API Endpoint

Set up your form submission service and get the API endpoint URL.

### Step 2: Configure in user.json

Open `public/user.json` and update the `contactForm` section:

```json
{
  "contactForm": {
    "provider": "generic",
    "genericApiEndpoint": "https://your-api-endpoint.com/submit",
    "genericApiHeaders": {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    }
  }
}
```

**Configuration options:**

- `genericApiEndpoint`: The URL of your form submission API endpoint
- `genericApiHeaders`: (Optional) Any headers required by your API (e.g., API keys, authentication tokens)

### Step 3: Test Your Form

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Verify the submission was received by your service

### Example Integrations

#### Formspree

```json
{
  "contactForm": {
    "provider": "generic",
    "genericApiEndpoint": "https://formspree.io/f/YOUR_FORM_ID",
    "genericApiHeaders": {
      "Content-Type": "application/json"
    }
  }
}
```

#### FormSubmit

```json
{
  "contactForm": {
    "provider": "generic",
    "genericApiEndpoint": "https://formsubmit.co/YOUR_EMAIL",
    "genericApiHeaders": {
      "Content-Type": "application/json"
    }
  }
}
```

## Security Features

The contact form includes several security features:

### Rate Limiting

- Maximum **5 submissions per 15 minutes** per IP address
- Prevents spam and abuse
- Returns a 429 status if limit is exceeded

### Honeypot Protection

- Hidden checkbox field that bots often fill
- Silent rejection of bot submissions
- No user-visible impact

### Input Validation

- Required field validation
- Email format validation
- Message length limit (5000 characters)
- Server-side validation for security

## Troubleshooting

### Form submissions not working

1. **Check your environment variable** - Ensure `WEB3FORMS_ACCESS_KEY` is set correctly
2. **For Web3Forms**: Verify the access key is correct in your environment variables (not in user.json)
3. **For Generic API**: Check your API endpoint and headers in `user.json`
4. **Check the browser console** for any error messages
5. **Verify network requests** in the browser's Network tab
6. **Check server logs** for API errors

### Rate limit errors

If you're seeing "Too many requests" errors:

- Wait 15 minutes before trying again
- This is normal rate limiting behavior to prevent spam

### Web3Forms not receiving submissions

1. **Verify your access key** is set in environment variables (`WEB3FORMS_ACCESS_KEY`)
2. **Check environment variable** is available in your deployment platform
3. **Restart your development server** after adding `.env.local` (changes require restart)
4. **Check your email spam folder**
5. **Visit Web3Forms dashboard** to view submission logs
6. **Ensure your email is verified** with Web3Forms

### Generic API not working

1. **Verify your API endpoint** is accessible
2. **Check required headers** are correctly configured
3. **Verify your API accepts JSON** in the expected format
4. **Check CORS settings** if accessing from a different domain

## Form Data Format

The form sends the following data structure:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a potential project..."
}
```

For Web3Forms, additional fields are automatically added:

- `access_key`: Your Web3Forms access key
- `from_name`: The submitter's name
- `botcheck`: False (honeypot protection)

## Next Steps

After setting up your contact form:

1. ✅ **Test thoroughly** with multiple submissions
2. ✅ **Set up email notifications** (if using Web3Forms, this is automatic)
3. ✅ **Monitor submissions** through your chosen service's dashboard
4. ✅ **Consider upgrading** if you exceed the free tier limits

## Resources

- [Web3Forms Documentation](https://docs.web3forms.com/)
- [Formspree Documentation](https://formspree.io/docs)
- [FormSubmit Documentation](https://formsubmit.co/)

---

**Need help?** Open an issue on GitHub or refer to [CONFIGURATION.md](CONFIGURATION.md) for more customization options.