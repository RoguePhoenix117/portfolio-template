# Configuration Guide

This guide explains how to customize your portfolio through the `public/user.json` configuration file.

## Quick Start

1. **Create your configuration file**:
   ```bash
   cp public/user.json.example public/user.json
   ```

2. **Edit `public/user.json`** with your information

3. **Never commit `user.json`** to Git (it's in `.gitignore`)

> ⚠️ **Security**: The `public/user.json` file contains personal information and is automatically excluded from Git to protect your privacy.

## Configuration Structure

### Personal Information

```json
{
  "personal": {
    "name": "Your Name",
    "initials": "YN",
    "title": "Full-Stack Developer",
    "email": "your.email@example.com",
    "location": "Your City, Country"
  }
}
```

### Social Links

Add your social media profiles:

```json
{
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "email": "mailto:your.email@example.com",
    "twitter": "https://x.com/yourusername"
  },
  "socialFlags": {
    "github": true,
    "linkedin": true,
    "email": true,
    "twitter": false
  }
}
```

Set `socialFlags` to `true` to show the link, `false` to hide it.

### Feature Toggles

**Important**: Some features are disabled by default:

```json
{
  "features": {
    "enableBlog": false,      // Blog route (/blog) - requires Sanity CMS
    "enableProjects": false,  // Projects route (/projects) - requires Sanity CMS
    "enableStudio": false,    // Sanity Studio (/studio) - requires Sanity CMS
    "enableAbout": true,     // About section on homepage
    "enableContact": true     // Contact section on homepage
  }
}
```

**To enable blog/projects/studio:**
1. Set the feature to `true` in `user.json`
2. Set up Sanity CMS (see [SANITY_SETUP.md](SANITY_SETUP.md))

When disabled, routes show "Feature Not Available" pages instead of errors.

### Hero Section

Customize your hero section:

```json
{
  "content": {
    "hero": {
      "greeting": "Hi, I'm",
      "nameHighlight": "Your Name",
      "subtitle1": "Developer passionate about creating",
      "subtitleHighlight1": "innovative solutions",
      "subtitle2": "and turning ideas into",
      "subtitleHighlight2": "digital reality",
      "description": "I specialize in React, Next.js, Node.js, and modern web technologies.",
      "ctaButtons": {
        "viewWork": "View My Work",
        "downloadResume": "Download Resume"
      },
      "resumeUrl": "/resume.pdf"
    }
  }
}
```

**Resume Setup:**
1. Place your resume PDF in `public/resume.pdf`
2. Or update `resumeUrl` to your custom path

### About Section

Customize your about section:

```json
{
  "content": {
    "about": {
      "title": "About Me",
      "subtitle": "I'm a passionate developer...",
      "story": [
        "First paragraph of your story...",
        "Second paragraph of your story...",
        "Third paragraph of your story..."
      ],
      "stats": [
        {
          "label": "Projects Completed",
          "value": "50+",
          "color": "blue"
        },
        {
          "label": "Years Experience",
          "value": "5+",
          "color": "purple"
        }
      ],
      "skills": [
        {
          "name": "Frontend Development",
          "description": "React, Next.js, TypeScript, Tailwind CSS"
        },
        {
          "name": "Backend Development",
          "description": "Node.js, Express, Python, PostgreSQL"
        }
      ],
      "ctaText": "Let's Work Together"
    }
  }
}
```

**Stats Color Options**: `blue`, `purple`, `green`, `orange`

### Contact Section

Customize your contact section:

```json
{
  "content": {
    "contact": {
      "title": "Get In Touch",
      "subtitle": "Have a project in mind?",
      "description": "I'm always interested in new opportunities...",
      "email": "your.email@example.com",
      "phone": "+1 (555) 123-4567",
      "location": "San Francisco, CA",
      "formTitle": "Send a Message",
      "formDescription": "Fill out the form below..."
    }
  },
  "contactForm": {
    "provider": "web3forms"
  }
}
```

**Contact Form Setup:**

The template supports multiple form providers:

1. **Web3Forms** (Recommended - Free tier: 250 submissions/month)
   - Get your access key from [Web3Forms.com](https://web3forms.com/)
   - **⚠️ IMPORTANT:** Store your access key in environment variable `WEB3FORMS_ACCESS_KEY` (NOT in user.json)
   - See [CONTACT_FORM_SETUP.md](CONTACT_FORM_SETUP.md) for detailed instructions

2. **Generic API** (For custom integrations)
   ```json
   {
     "contactForm": {
       "provider": "generic",
       "genericApiEndpoint": "https://your-api-endpoint.com/submit",
       "genericApiHeaders": {
         "Authorization": "Bearer YOUR_API_KEY"
       }
     }
   }
   ```

See [CONTACT_FORM_SETUP.md](CONTACT_FORM_SETUP.md) for complete form setup.

### Branding

Customize branding:

```json
{
  "branding": {
    "logoText": "Your Name",
    "logoInitial": "Y"
  }
}
```

This affects:
- Navigation logo and text
- Footer logo and text
- Copyright notice

## Navigation Behavior

Navigation items appear based on feature toggles:

- **Home**: Always enabled (cannot be disabled)
- **About**: Appears if `enableAbout` is `true` (links to `/#about`)
- **Projects**: Appears if `enableProjects` is `true` (links to `/projects`)
- **Blog**: Appears if `enableBlog` is `true` (links to `/blog`)
- **Contact**: Appears if `enableContact` is `true` (links to `/#contact`)

When a feature is disabled:
- Navigation item is hidden
- Section is not rendered on homepage
- Footer quick links exclude disabled features
- Routes show "Feature Not Available" pages

## Example Configurations

### Minimal Portfolio (Only Home, About, Contact)

```json
{
  "features": {
    "enableBlog": false,
    "enableProjects": false,
    "enableAbout": true,
    "enableContact": true,
    "enableStudio": false
  }
}
```

### Full Portfolio (All Features)

```json
{
  "features": {
    "enableBlog": true,
    "enableProjects": true,
    "enableAbout": true,
    "enableContact": true,
    "enableStudio": true
  }
}
```

**Note**: Enabling blog/projects/studio requires Sanity CMS setup (see [SANITY_SETUP.md](SANITY_SETUP.md)).

### Blog-Focused Portfolio

```json
{
  "features": {
    "enableBlog": true,
    "enableProjects": false,
    "enableAbout": true,
    "enableContact": true,
    "enableStudio": true
  }
}
```

## Advanced Customization

### Styling

The website uses Tailwind CSS for styling. You can customize:

- **Colors**: Edit `tailwind.config.js`
- **Global styles**: Edit `src/app/globals.css`
- **Component styles**: Edit individual component files

### Adding New Sections

Use the same pattern as existing sections:

1. Add configuration to `user.json`
2. Create a component in `src/components/`
3. Add to homepage in `src/app/page.tsx`

### Custom Pages

Add custom pages in `src/app/`:

```
src/app/
├── about/
│   └── page.tsx       # Custom about page
├── custom/
│   └── page.tsx       # Custom route
```

## Environment Variables

**Never put secrets in `user.json`** - use environment variables instead:

```bash
# .env.local (never commit this!)
WEB3FORMS_ACCESS_KEY=your_access_key_here
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Add to `.gitignore` (already included by default).

## Security Best Practices

### ✅ Do:

- Always create `user.json` by copying from `user.json.example`
- Keep your `user.json` file local and never commit it
- Use environment variables for sensitive data (API keys, tokens)
- Test configuration locally before deploying

### ❌ Don't:

- Commit `public/user.json` to Git (already in `.gitignore`)
- Share your `user.json` file publicly
- Put sensitive API keys in `user.json` (use environment variables instead)
- Commit `.env.local` to Git

## Troubleshooting

### Configuration not loading

- Check file path: `public/user.json` (not `src/user.json`)
- Verify JSON syntax is valid (use a JSON validator)
- Restart your dev server after changes
- Check browser console for errors

### Features not enabling

- Verify feature toggle is set to `true` in `user.json`
- For blog/projects/studio: Ensure Sanity CMS is set up
- Restart dev server after configuration changes

### Social links not showing

- Check `socialFlags` section (set to `true` to show)
- Verify URLs are correct in `social` section
- Restart dev server

## Next Steps

1. ✅ Copy `user.json.example` to `user.json`
2. ✅ Customize with your information
3. ✅ Enable features you want
4. ✅ Set up Sanity CMS (if using blog/projects) - see [SANITY_SETUP.md](SANITY_SETUP.md)
5. ✅ Set up contact form - see [CONTACT_FORM_SETUP.md](CONTACT_FORM_SETUP.md)
6. ✅ Add resume PDF to `public/resume.pdf`
7. ✅ Customize styling if desired
8. ✅ Deploy!

For deployment instructions, see [README.md](README.md#-deployment).

---

**Need more help?** Check the other documentation files or open an issue on GitHub.