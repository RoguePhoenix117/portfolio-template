# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This portfolio showcases your development skills, projects, and blog posts in a clean, professional design.

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

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Netlify

1. Build the project:
```bash
pnpm build
```

2. Deploy the `out` folder to Netlify

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Render

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