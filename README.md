# Portfolio Website Template

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

A modern, responsive portfolio website template built with Next.js 14, TypeScript, and Tailwind CSS. Perfect for developers who want to showcase their work in a clean, professional design.

## ⚡ Quick Setup

1. **Clone and install**:
   ```bash
   git clone <repo> && cd portfolio-template && npm install
   ```

2. **Create your config**:
   ```bash
   cp public/user.json.example public/user.json
   ```
   Edit `public/user.json` with your information.

3. **Add your resume**: Place `resume.pdf` in the `public/` folder

4. **Set up contact form** (optional): See [CONTACT_FORM_SETUP.md](CONTACT_FORM_SETUP.md)

5. **Run**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3001`

> ⚠️ **Security**: Never commit `public/user.json` to Git. It's automatically excluded via `.gitignore`.

## 🎯 Feature Toggles

**Important**: Some features are **disabled by default** and must be enabled in `public/user.json`:

```json
{
  "features": {
    "enableBlog": false,      // Blog route (/blog) - disabled by default
    "enableProjects": false,  // Projects route (/projects) - disabled by default
    "enableStudio": false,    // Sanity Studio (/studio) - disabled by default
    "enableAbout": true,      // About section - enabled by default
    "enableContact": true     // Contact section - enabled by default
  }
}
```

To enable:
- **Blog**: Requires Sanity CMS setup (see [SANITY_SETUP.md](SANITY_SETUP.md))
- **Projects**: Requires Sanity CMS setup (see [SANITY_SETUP.md](SANITY_SETUP.md))
- **Studio**: Requires Sanity CMS setup + enable in config

When disabled, routes show a "Feature Not Available" page instead of errors.

## ⭐ Features

- 🚀 **Modern Stack** - Next.js 14, TypeScript, Tailwind CSS
- 📱 **Fully Responsive** - Mobile-first design
- 🎨 **Beautiful UI** - Clean, modern design with animations
- 📝 **Blog System** - Sanity.io CMS-powered (optional, disabled by default)
- 💼 **Project Showcase** - Sanity.io CMS-powered (optional, disabled by default)
- 📧 **Contact Form** - Web3Forms (250 free/month) or custom API
- 🔒 **Security** - Rate limiting, honeypot, security headers
- 🔍 **SEO Optimized** - Meta tags and structured data
- ⚡ **Performance** - Optimized images, code splitting
- ⚙️ **Fully Configurable** - All content via `user.json`

## 📚 Documentation

- **[CONFIGURATION.md](CONFIGURATION.md)** - Complete customization guide
- **[SANITY_SETUP.md](SANITY_SETUP.md)** - Set up Sanity CMS for blog/projects (optional)
- **[CONTACT_FORM_SETUP.md](CONTACT_FORM_SETUP.md)** - Configure contact form
- **[SECURITY.md](SECURITY.md)** - Security features and best practices
- **[STUDIO_SECURITY.md](STUDIO_SECURITY.md)** - Additional Sanity Studio security (optional)
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribute to this template

## 🚀 Deployment

### Free Deployment Options

#### Vercel (Recommended - 100% Free)

1. **Push to GitHub**: Push your code to a GitHub repository
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project" → Import your repository
   - Vercel auto-detects Next.js settings
3. **Add Environment Variables** (if using optional features):
   - Go to Project Settings → Environment Variables
   - Add `WEB3FORMS_ACCESS_KEY` (if using contact form)
   - Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` (if using Sanity)
4. **Deploy**: Click "Deploy" - your site is live in ~2 minutes!

**Vercel Free Tier Includes:**
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Custom domains
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Automatic deployments from Git

#### Netlify (100% Free)

1. **Push to GitHub**: Push your code to a GitHub repository
2. **Import to Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign in with GitHub
   - Click "New site from Git" → Select your repository
   - Build settings: `npm run build`
   - Publish directory: `.next`
3. **Add Environment Variables** (if needed)
4. **Deploy**: Site goes live automatically

**Netlify Free Tier Includes:**
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Custom domains
- ✅ 100GB bandwidth/month
- ✅ 125K serverless function invocations/month

#### Other Free Options

- **Render** - Free tier with automatic deployments
- **Railway** - Free tier with $5/month credit
- **Cloudflare Pages** - Free, unlimited bandwidth
- **GitHub Pages** - Free (requires static export)

### Deployment Checklist

Before deploying:

- [ ] Set up `public/user.json` with your information
- [ ] Add `resume.pdf` to `public/` folder
- [ ] Configure contact form (optional) - see [CONTACT_FORM_SETUP.md](CONTACT_FORM_SETUP.md)
- [ ] Enable features you want in `features` section of `user.json`
- [ ] Set up Sanity CMS (if enabling blog/projects) - see [SANITY_SETUP.md](SANITY_SETUP.md)
- [ ] Add environment variables to your hosting platform:
  - `WEB3FORMS_ACCESS_KEY` (if using contact form)
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` (if using Sanity)
  - `NEXT_PUBLIC_SANITY_DATASET` (if using Sanity)

## 🎨 Customization

### Quick Customization

Edit `public/user.json` to customize:

- **Personal info**: Name, title, email, location
- **Social links**: GitHub, LinkedIn, Twitter, etc.
- **Content**: Hero section, About section, Contact section
- **Features**: Enable/disable blog, projects, studio
- **Branding**: Logo text, colors (via Tailwind)

### Advanced Customization

- **Styling**: Edit `src/app/globals.css` and `tailwind.config.js`
- **Components**: Modify components in `src/components/`
- **Routes**: Add custom pages in `src/app/`

See [CONFIGURATION.md](CONFIGURATION.md) for complete customization details.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [Sanity.io](https://sanity.io/) (optional)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Inter (Google Fonts)

## 📝 Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── blog/         # Blog pages (optional)
│   ├── projects/     # Projects page (optional)
│   ├── studio/       # Sanity Studio (optional)
│   └── page.tsx      # Homepage
├── components/       # React components
├── lib/             # Utilities and helpers
│   ├── blog.ts      # Blog data fetching
│   ├── projects.ts  # Projects data fetching
│   └── sanity/      # Sanity CMS setup
└── ...
```

## 🔒 Security

Built-in security features:

- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ Rate limiting (5 submissions per 15 minutes)
- ✅ Honeypot protection for forms
- ✅ Input validation
- ✅ Environment variable protection

See [SECURITY.md](SECURITY.md) for details.

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Support

If you have questions:
- Open an issue on GitHub
- Check the documentation files
- Review example configuration in `user.json.example`

---

**Happy coding!** 🚀