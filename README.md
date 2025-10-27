# Portfolio Website Template

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

A modern, responsive portfolio website template built with Next.js 14, TypeScript, and Tailwind CSS. This template is perfect for developers who want to showcase their skills, projects, and blog posts in a clean, professional design.

## 🚀 Live Demo

[View Live Demo](https://your-portfolio-demo.vercel.app) | [Fork Template](https://github.com/yourusername/portfolio-template/fork)

## ⭐ Features

- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- 📱 **Fully Responsive** - Optimized for all device sizes
- ⚡ **Fast Performance** - Built with Next.js 14 and optimized for speed
- 📝 **Blog System** - Markdown-based blog with categories and tags
- 💼 **Project Showcase** - Display your projects with live demos
- 🔍 **SEO Optimized** - Meta tags and structured data
- 🎯 **Type Safe** - Built with TypeScript for better development experience
- 🚀 **Easy Deployment** - One-click deployment to Vercel/Netlify

## Features

- 🚀 **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- 📱 **Fully Responsive**: Optimized for all device sizes
- 🎨 **Beautiful Design**: Clean, modern UI with smooth animations
- 📝 **Blog System**: Built-in blog functionality with sample posts
- 💼 **Project Showcase**: Display your projects with live demos and GitHub links
- 📧 **Contact Form**: Working contact form with validation
- 🔍 **SEO Optimized**: Meta tags and structured data for better search visibility
- ⚡ **Performance**: Fast loading with optimized images and code splitting

## Sections

### Homepage
- Hero section with introduction and call-to-action
- About section with skills and experience
- Featured projects showcase
- Contact information and social links

### Blog
- Blog listing page with categories and search
- Individual blog post pages
- Author bio and social links
- Newsletter signup

### Projects
- Featured projects with detailed descriptions
- Project grid with technologies used
- Live demo and GitHub links
- Responsive project cards

### Contact
- Contact form with validation
- Contact information
- Social media links
- Professional contact details

## 🚀 Quick Start

### Option 1: Fork This Template (Recommended)

1. **Fork this repository** by clicking the "Fork" button at the top
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-template.git
   cd portfolio-template
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```
4. **Start developing**:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
5. **Run the setup script** to customize with your information:
   ```bash
   pnpm setup
   # or
   npm run setup
   ```
6. **Customize** your portfolio (see [Customization Guide](#customization))

### Option 2: Use as Template

1. Click "Use this template" on GitHub
2. Create a new repository from this template
3. Follow the same steps as Option 1

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

## Customization

### Personal Information

Update the following files with your personal information:

1. **Navigation & Footer** (`src/components/Navigation.tsx`, `src/components/Footer.tsx`):
   - Replace "Your Name" with your actual name
   - Update social media links
   - Update email and contact information

2. **Hero Section** (`src/components/Hero.tsx`):
   - Update the hero text and description
   - Replace the profile image placeholder
   - Update social links

3. **About Section** (`src/components/About.tsx`):
   - Update your story and experience
   - Modify skills and technologies
   - Update statistics

4. **Projects** (`src/components/Projects.tsx`):
   - Replace with your actual projects
   - Update project descriptions and links
   - Add your GitHub repositories

5. **Contact** (`src/components/Contact.tsx`):
   - Update contact information
   - Configure form submission (currently simulated)

6. **Metadata** (`src/app/layout.tsx`):
   - Update page title and description
   - Add your name and keywords

### Blog Posts

To add new blog posts:

1. Add your blog post data to `src/app/blog/[slug]/page.tsx`
2. Update the blog listing in `src/app/blog/page.tsx`
3. For a more dynamic solution, consider integrating with a headless CMS

### Styling

The website uses Tailwind CSS for styling. You can customize:

- Colors in `tailwind.config.js`
- Custom styles in `src/app/globals.css`
- Component-specific styles in individual component files

## 🚀 Deployment

### Vercel (Recommended)

1. **Push your changes** to your forked repository
2. **Go to [Vercel](https://vercel.com)** and sign in with GitHub
3. **Click "New Project"** and import your forked repository
4. **Configure settings**:
   - Framework Preset: Next.js
   - Build Command: `pnpm build` (or `npm run build`)
   - Output Directory: `.next`
5. **Click "Deploy"** - Your portfolio will be live in minutes!

### Netlify

1. **Build the project**:
   ```bash
   pnpm build
   ```
2. **Go to [Netlify](https://netlify.com)** and sign in with GitHub
3. **Drag and drop** your `.next` folder or connect your repository
4. **Configure build settings**:
   - Build command: `pnpm build`
   - Publish directory: `.next`
5. **Deploy** - Your portfolio is live!

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- **AWS Amplify** - Connect your GitHub repository
- **DigitalOcean App Platform** - One-click deployment
- **Railway** - Simple deployment with automatic builds
- **Render** - Free tier available

## 📝 Template Features

This template includes everything you need to get started:

- ✅ **Pre-configured** Next.js 14 with TypeScript
- ✅ **Responsive design** with Tailwind CSS
- ✅ **Blog system** with markdown support
- ✅ **Project showcase** with live demos
- ✅ **Contact form** with validation
- ✅ **SEO optimization** out of the box
- ✅ **Performance optimized** for fast loading
- ✅ **Mobile-first** responsive design

## 🎯 Perfect For

- **Developers** looking to showcase their work
- **Students** building their first portfolio
- **Freelancers** needing a professional online presence
- **Job seekers** wanting to stand out to employers
- **Anyone** who wants a modern, responsive website

## 🌟 Why This Template?

- **Modern Stack**: Built with the latest technologies
- **Easy to Customize**: Well-documented and organized code
- **SEO Ready**: Optimized for search engines
- **Fast Performance**: Optimized for Core Web Vitals
- **Mobile First**: Responsive design that works everywhere
- **Blog Included**: Share your thoughts and knowledge
- **Open Source**: Free to use and modify

## Project Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx          # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx      # Individual blog post
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── About.tsx             # About section
│   ├── Contact.tsx           # Contact section
│   ├── Footer.tsx            # Footer component
│   ├── Hero.tsx              # Hero section
│   ├── Navigation.tsx        # Navigation component
│   └── Projects.tsx          # Projects section
```

## Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel (recommended)

## Performance Features

- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Code splitting
- Lazy loading
- SEO optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help customizing the portfolio, please open an issue on GitHub.

---

**Happy coding!** 🚀