# Portfolio Configuration Guide

This portfolio template now supports easy personalization through a JSON configuration file. All the hardcoded values in the Hero component have been replaced with configurable options.

## Quick Start

1. **Create your configuration file**: Copy the example template to create your own configuration
   ```bash
   cp public/user.json.example public/user.json
   ```
2. **Edit the configuration file**: Open `public/user.json` in the project directory
3. **Update your personal information**: Replace the placeholder values with your actual information
4. **Add your resume**: Place your resume PDF file in the `public` folder as `resume.pdf`
5. **Run the update script**: Execute `npm run update-package` to update package.json with your repository information
6. **Start the development server**: Run `npm run dev` to see your changes

> ⚠️ **Security Warning**: The `public/user.json` file contains personal information (email addresses, social media links, etc.) and is **automatically excluded from Git** via `.gitignore` to protect your privacy. 
> - Always create `user.json` by copying from `user.json.example`
> - Never commit your actual `user.json` file to the repository
> - If you've already committed it, remove it from Git history using `git rm --cached public/user.json`

## Configuration Structure

The `public/user.json` file contains the following sections:

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
```json
{
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "twitter": "https://x.com/yourusername",
    "email": "mailto:your.email@example.com"
  }
}
```

### Content Customization
```json
{
  "content": {
    "hero": {
      "greeting": "Hi, I'm",
      "nameHighlight": "Your Name",
      "subtitle": "Full-Stack Developer passionate about creating",
      "subtitleHighlight1": "innovative solutions",
      "subtitleHighlight2": "digital reality",
      "description": "I specialize in React, Next.js, Node.js, and modern web technologies. I love building scalable applications and sharing knowledge through my blog.",
      "ctaButtons": {
        "viewWork": "View My Work",
        "downloadResume": "Download Resume"
      },
      "resumeUrl": "/resume.pdf"
    },
    "navigation": {
      "projects": "#projects",
      "about": "#about"
    }
  }
}
```

### Feature Toggles
```json
{
  "features": {
    "enableBlog": true,
    "enableProjects": true,
    "enableAbout": true,
    "enableContact": true
  }
}
```

### Branding Configuration
```json
{
  "branding": {
    "logoText": "Your Name",
    "logoInitial": "Y"
  }
}
```

**Note**: The branding configuration affects:
- Navigation logo and text
- Footer logo and text
- Copyright notice
- Footer description (uses `personal.title`)

### Repository Information
```json
{
  "repository": {
    "url": "https://github.com/yourusername/portfolio-template.git",
    "homepage": "https://github.com/yourusername/portfolio-template#readme",
    "issues": "https://github.com/yourusername/portfolio-template/issues"
  }
}
```

## Navigation & Feature Configuration

The portfolio template supports modular navigation and conditional rendering of sections. You can easily enable or disable different parts of your portfolio without touching the code.

### Feature Toggles Explained

- **`enableBlog`**: Controls whether the Blog section appears in navigation and if the `/blog` page is accessible
- **`enableProjects`**: Controls whether the Projects section appears on the homepage and in navigation
- **`enableAbout`**: Controls whether the About section appears on the homepage and in navigation
- **`enableContact`**: Controls whether the Contact section appears on the homepage and in navigation

### Navigation Behavior

- **Home**: Always enabled (cannot be disabled)
- **About**: Only appears if `enableAbout` is `true` (links to `/#about`)
- **Projects**: Only appears if `enableProjects` is `true` (links to `/projects`)
- **Blog**: Only appears if `enableBlog` is `true` (links to `/blog`)
- **Contact**: Only appears if `enableContact` is `true` (links to `/#contact`)

**Note**: Projects and Blog have dedicated pages that show "Feature Not Available" when disabled, while About and Contact are sections on the homepage.

### Disabled Features

When a feature is disabled:
- The navigation item is hidden from the menu
- The corresponding section is not rendered on the homepage
- The footer quick links are updated to exclude disabled features
- For the blog, visiting `/blog` shows a "Feature Not Available" page
- For projects, visiting `/projects` shows a "Feature Not Available" page

### Example Configurations

**Minimal Portfolio** (Only Home, About, Contact):
```json
{
  "features": {
    "enableBlog": false,
    "enableProjects": false,
    "enableAbout": true,
    "enableContact": true
  }
}
```

**Developer Portfolio** (All features enabled):
```json
{
  "features": {
    "enableBlog": true,
    "enableProjects": true,
    "enableAbout": true,
    "enableContact": true
  }
}
```

**Blog-Focused Portfolio** (Emphasize blog content):
```json
{
  "features": {
    "enableBlog": true,
    "enableProjects": false,
    "enableAbout": true,
    "enableContact": true
  }
}
```

## How It Works

1. **Configuration Loading**: All components load the `public/user.json` file at runtime
2. **Type Safety**: TypeScript types ensure all configuration options are properly typed
3. **Conditional Rendering**: Components check feature flags before rendering
4. **Fallback Handling**: If the configuration fails to load, default values are used
5. **Dynamic Updates**: Changes to `public/user.json` are reflected immediately in development mode

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run update-package` - Update package.json with your repository information
- `npm run setup` - Run the original setup script

## Customization Tips

1. **Profile Image**: Replace the initials with an actual profile image by modifying the Hero component
2. **Styling**: Colors and styling can be customized through Tailwind CSS classes
3. **Additional Sections**: Use the same pattern to make other components configurable
4. **Validation**: Add validation to ensure required fields are present

## Error Handling

The system includes robust error handling:
- Loading states while configuration is being fetched
- Fallback to default values if configuration fails
- Console warnings for missing or invalid configuration

## Resume File Setup

The portfolio includes a "Download Resume" button that serves a PDF file. Here's how it works:

### How Resume is Served
- **File Location**: Place your resume PDF in the `public` folder as `resume.pdf`
- **URL Path**: The resume is accessible at `https://yoursite.com/resume.pdf`
- **Configuration**: The resume URL is configurable in `public/user.json` under `content.hero.resumeUrl`
- **Download Behavior**: The button triggers a direct download when clicked

### Setting Up Your Resume
1. **Create your resume** as a PDF file
2. **Name it `resume.pdf`** (or update the `resumeUrl` in `user.json`)
3. **Place it in the `public` folder** alongside other static assets
4. **Test the download** by clicking the "Download Resume" button

### Example File Structure
```
public/
├── user.json
├── resume.pdf          ← Your resume file goes here
├── next.svg
└── vercel.svg
```

### Customizing Resume URL
You can change the resume file name or path by updating the `resumeUrl` in your `user.json`:

```json
{
  "content": {
    "hero": {
      "resumeUrl": "/my-custom-resume.pdf"  // Custom path
    }
  }
}
```

## Content Management

The portfolio template uses a content-based approach for both blog posts and projects, making it easy to add and manage content without touching the code.

### Blog Posts

Blog posts are stored in the `content/blog/` directory as Markdown files. Each post should include frontmatter with metadata:

```markdown
---
title: "Your Blog Post Title"
excerpt: "A brief description of your post"
date: "2024-01-15"
category: "Technology"
featured: true
tags: ["react", "nextjs", "tutorial"]
author: "Your Name"
---

# Your Blog Post Content

Write your blog post content here in Markdown...
```

### Projects

Projects are stored in the `content/projects/` directory as Markdown files. Each project should include frontmatter with metadata:

```markdown
---
title: "Your Project Title"
description: "A detailed description of your project"
excerpt: "A brief description for the project card"
image: "/path/to/project-image.jpg"
technologies: ["React", "Node.js", "MongoDB"]
githubUrl: "https://github.com/yourusername/project"
liveUrl: "https://your-project.vercel.app"
featured: true
date: "2024-01-15"
category: "Full-Stack"
tags: ["react", "nodejs", "mongodb"]
---

# Your Project Description

Write detailed project information here in Markdown...
```

### Adding New Content

1. **Add a new blog post**: Create a new `.md` file in `content/blog/`
2. **Add a new project**: Create a new `.md` file in `content/projects/`
3. **Update existing content**: Edit the corresponding `.md` files
4. **Remove content**: Delete the `.md` files

The system automatically:
- Loads all content from the directories
- Sorts by date (newest first)
- Filters featured content
- Generates categories and tags

### About Section Configuration

The About section is now fully configurable via `user.json`. You can customize:

```json
{
  "content": {
    "about": {
      "title": "About Me",
      "subtitle": "I'm a passionate developer with a love for creating innovative solutions and continuous learning.",
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
        },
        {
          "label": "Happy Clients",
          "value": "100+",
          "color": "green"
        },
        {
          "label": "Support Available",
          "value": "24/7",
          "color": "orange"
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

### Contact Section Configuration

The Contact section is fully configurable, including form setup:

```json
{
  "content": {
    "contact": {
      "title": "Get In Touch",
      "subtitle": "Have a project in mind or want to collaborate?",
      "description": "I'm always interested in new opportunities...",
      "email": "your.email@example.com",
      "phone": "+1 (555) 123-4567",
      "location": "San Francisco, CA",
      "formTitle": "Send a Message",
      "formDescription": "Fill out the form below and I'll get back to you as soon as possible."
    }
  },
  "contactForm": {
    "provider": "web3forms"
  }
}
```

**Contact Form Setup:**

The template supports multiple form submission providers:

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

**For detailed contact form setup instructions, see [CONTACT_FORM_SETUP.md](CONTACT_FORM_SETUP.md)**

## Security Features

The template includes built-in security features:

### Built-in Protections

- **Security Headers**: Configured in `next.config.ts` (X-Content-Type-Options, X-Frame-Options, etc.)
- **Rate Limiting**: Contact form is rate-limited (5 submissions per 15 minutes per IP)
- **Honeypot Protection**: Hidden bot detection field in contact form
- **Input Validation**: Server-side validation for all form inputs

### Security Documentation

For comprehensive security information:
- See [SECURITY.md](SECURITY.md) for detailed security guide
- See [CONTACT_FORM_SETUP.md](CONTACT_FORM_SETUP.md) for form security features

## Next Steps

1. **Create your configuration**: Copy `public/user.json.example` to `public/user.json` if you haven't already
2. Customize your `public/user.json` file with your information
3. Add your resume PDF to the `public` folder as `resume.pdf`
4. Add your projects to the `content/projects/` directory
5. Add your blog posts to the `content/blog/` directory
6. Update the styling to match your brand
7. Add more configurable sections as needed

For more advanced customization, you can extend the configuration structure and update the corresponding TypeScript types and components.

---

## Security Best Practices

**Important**: The `public/user.json` file contains personal information and should never be committed to your repository.

### ✅ Do:
- Always create `user.json` by copying from `user.json.example`
- Keep your `user.json` file local and never commit it
- Use environment variables for sensitive data like API keys (see [CONTACT_FORM_SETUP.md](CONTACT_FORM_SETUP.md))

### ❌ Don't:
- Commit `public/user.json` to Git
- Share your `user.json` file publicly
- Put sensitive API keys in `user.json` (use environment variables instead)

The template automatically excludes `public/user.json` from Git via `.gitignore` to protect your privacy.
