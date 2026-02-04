# Portfolio Website Template

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern, responsive portfolio template built with Next.js 16, TypeScript, and Tailwind CSS. Content is driven by `public/user.json`; blog and projects are optional and can use Sanity.io.

---

## Quick Start

```bash
git clone <repo> && cd portfolio-template && pnpm install
cp public/user.json.example public/user.json
# Edit public/user.json with your info
pnpm dev
```

Open **http://localhost:3001**. Add `resume.pdf` to `public/` for the resume link.

**Security:** Do not commit `public/user.json` or `.env.local` (both are in `.gitignore`).

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 (PostCSS) |
| Icons | Lucide React |
| Font | Inter (Google Fonts) |
| CMS (optional) | Sanity.io |
| Contact form | Web3Forms or generic API |

---

## Features & Toggles

Features are controlled in `public/user.json` under `features`:

| Feature | Default | Notes |
|---------|--------|--------|
| `enableAbout` | `true` | About section on homepage |
| `enableContact` | `true` | Contact section + form |
| `enableBlog` | `false` | `/blog` — requires Sanity |
| `enableProjects` | `false` | `/projects` — requires Sanity |
| `enableStudio` | `false` | Sanity Studio at `/studio` — requires Sanity |

When a feature is off, its nav item is hidden and the route shows a “Feature Not Available” page.

---

## Configuration

Copy `public/user.json.example` to `public/user.json` and edit:

- **personal** — name, initials, title, email, location  
- **social** — URLs for GitHub, LinkedIn, Twitter, etc.  
- **socialFlags** — `true`/`false` per network to show/hide  
- **content.hero** — greeting, subtitle, description, CTA labels, `resumeUrl`  
- **content.about** — title, story paragraphs, stats, skills, CTA  
- **content.contact** — title, subtitle, description, form labels  
- **features** — enable/disable blog, projects, studio, about, contact  
- **branding** — logoText, logoInitial  
- **contactForm** — `provider`: `"web3forms"` or `"generic"` (see Contact Form below)

Styling: edit `src/app/globals.css`. Tailwind 4 is configured via PostCSS (`postcss.config.mjs`); no `tailwind.config.js` by default.

---

## Contact Form

- **Web3Forms (recommended):** Get an access key from [web3forms.com](https://web3forms.com). Set `WEB3FORMS_ACCESS_KEY` in `.env.local` (and in your host’s env). In `user.json`, set `contactForm.provider` to `"web3forms"`. Do not put the key in `user.json`.
- **Generic API:** In `user.json`: `contactForm.provider: "generic"`, `genericApiEndpoint: "https://…"`, and optionally `genericApiHeaders`.

The API route (`/api/contact`) applies rate limiting (5 requests per 15 minutes per IP), honeypot, and basic validation.

---

## Sanity (Blog & Projects)

Required only if you enable blog, projects, or studio.

1. Create a project at [sanity.io](https://sanity.io) and note **Project ID** and **Dataset** (e.g. `production`).
2. In project root, create `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=…   # Only for migration (Editor token)
   ```
3. In `user.json`, set `enableBlog`, `enableProjects`, and/or `enableStudio` to `true`.
4. Run the dev server and open `/studio` to log in and create content.  
   **Optional migration:** `pnpm run migrate:sanity` imports Markdown from `content/blog/` and `content/projects/` into Sanity (requires `SANITY_API_TOKEN`).

**Studio security (optional):** Set `STUDIO_PASSWORD` in env to protect `/studio` with a password; or `STUDIO_ALLOWED_IPS=ip1,ip2`; or `STUDIO_DEV_ONLY=true` to disable Studio in production. Sanity’s own auth is still required to edit content.

---

## Security

- **Headers:** X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy (see `next.config.ts`).
- **Contact form:** Rate limit, honeypot, server-side validation; store API keys in env only.
- **Secrets:** Use `.env.local` and host env vars; never commit `user.json` or `.env.local`.

---

## Deployment

1. Set `user.json` (or equivalent config) and `resume.pdf` in `public/`.
2. Set env vars on your host: `WEB3FORMS_ACCESS_KEY` (if using contact form); `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` (if using Sanity); optional `STUDIO_PASSWORD` for Studio.
3. Build and start: `pnpm build` then `pnpm start`, or connect your repo to Vercel/Netlify (they detect Next.js).

**Vercel:** Import repo → add env vars → deploy. **Netlify:** Build command `pnpm build`, publish directory `.next` (or use Next.js runtime).

---

## Project Structure

```
src/
├── app/              # Routes
│   ├── api/contact/  # Contact form API
│   ├── blog/         # Blog (optional)
│   ├── projects/     # Projects page (optional)
│   ├── studio/       # Sanity Studio (optional)
│   ├── layout.tsx, page.tsx, globals.css
├── components/       # Hero, About, Contact, Projects, Blog, Nav, Footer
├── lib/              # config, types, blog, projects, sanity
content/               # Optional Markdown for migrate:sanity
public/               # user.json.example, resume.pdf, static assets
```

---

## Scripts

| Command | Description |
|--------|--------------|
| `pnpm dev` | Dev server (port 3001) |
| `pnpm build` | Production build |
| `pnpm start` | Run production build |
| `pnpm lint` | Run ESLint |
| `pnpm run setup` | Template setup |
| `pnpm run migrate:sanity` | Import content/ Markdown into Sanity |

---

## Contributing

1. Open an issue for bugs or features.
2. Fork, create a branch (`feature/…`), make changes, run `pnpm dev`, `pnpm build`, `pnpm lint`.
3. Commit with a clear message and open a pull request.

Follow existing code style (TypeScript, Tailwind, component structure). Update docs if you change behavior.

---

## License

MIT — see [LICENSE](LICENSE).
