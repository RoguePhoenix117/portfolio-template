# Sanity.io Setup Guide

This guide helps you set up Sanity.io CMS for blog posts and projects management.

> ⚠️ **Important**: Sanity CMS is **optional**. You only need this if you want to:
> - Enable the **blog** feature (`/blog` route)
> - Enable the **projects** feature (`/projects` route)
> - Enable the **studio** feature (`/studio` route)
>
> These features are **disabled by default**. See [CONFIGURATION.md](CONFIGURATION.md) for enabling them.

## Prerequisites

1. A Sanity.io account (free at [sanity.io](https://sanity.io))
2. Node.js and npm/pnpm installed
3. Your portfolio project set up

## Step 1: Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and sign up/sign in (free)
2. Click **"Create new project"**
3. Fill in the project details:
   - **Project name**: Your Portfolio (or any name)
   - **Project ID**: Auto-generated (you'll need this)
   - **Dataset name**: `production` (or your preferred name)
4. Click **"Create project"**

## Step 2: Get Your API Credentials

1. In your Sanity project dashboard, go to **API** section
2. Copy your **Project ID** (e.g., `abc123xyz`)
3. Note your **Dataset** name (usually `production`)
4. Go to **API** → **Tokens** section
5. Click **"Add API token"**
6. Create a new token with:
   - **Token name**: `Portfolio Migration Token` (or any name)
   - **Permissions**: **Editor** (needed for writing content during migration)
7. Copy the token (you'll need this for migration only)

## Step 3: Set Environment Variables

Create a `.env.local` file in the root of your project:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token-here  # Only needed for migration
```

Replace:
- `your-project-id-here` with your actual Project ID from Step 2
- `production` with your dataset name (usually `production`)
- `your-api-token-here` with your API token from Step 2

> **Important**: Never commit `.env.local` to Git. It's already in `.gitignore`.

## Step 4: Enable Features in user.json

Enable the features you want in `public/user.json`:

```json
{
  "features": {
    "enableBlog": true,      // Enable blog (/blog route)
    "enableProjects": true,  // Enable projects (/projects route)
    "enableStudio": true     // Enable Sanity Studio (/studio route)
  }
}
```

**Note**: You can enable just one, two, or all three features.

## Step 5: Migrate Existing Content (Optional)

If you have existing markdown files in `content/blog/` and `content/projects/`:

1. Make sure your `.env.local` has all required variables (including `SANITY_API_TOKEN`)
2. Run the migration script:
   ```bash
   npm run migrate:sanity
   ```

This will:
- Import all blog posts from `content/blog/*.md`
- Import all projects from `content/projects/*.md`
- Preserve all metadata (tags, categories, dates, etc.)

**Note**: Project images need to be uploaded separately via the Sanity Studio.

## Step 6: Access Sanity Studio

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit the Sanity Studio at:
   ```
   http://localhost:3001/studio
   ```

3. You'll be prompted to authenticate:
   - If you're already logged into Sanity, you'll be redirected back
   - If not, log in with your Sanity account

4. Once authenticated, you'll see the Studio interface where you can:
   - Create new blog posts
   - Create new projects
   - Edit existing content
   - Upload images
   - Manage categories and tags

> **Note**: If you see "Studio Not Available", make sure `enableStudio: true` in `user.json`.

## Creating Content

### Creating a Blog Post

1. In Sanity Studio, click **"Blog Post"** in the sidebar
2. Click **"Create new"**
3. Fill in the fields:
   - **Title**: Your blog post title
   - **Slug**: Auto-generated from title (or edit manually)
   - **Excerpt**: Brief description
   - **Author**: Your name
   - **Date**: Publication date
   - **Category**: Category name
   - **Tags**: Add tags (press Enter after each)
   - **Featured**: Toggle if featured
   - **Content**: Write your markdown content
4. Click **"Publish"**

See [BLOG_GUIDE.md](BLOG_GUIDE.md) for detailed blog management instructions.

### Creating a Project

1. In Sanity Studio, click **"Project"** in the sidebar
2. Click **"Create new"**
3. Fill in the fields:
   - **Title**: Project name
   - **Slug**: Auto-generated
   - **Description**: Detailed description
   - **Excerpt**: Brief description for cards
   - **Image**: Upload project image (drag & drop)
   - **Technologies**: Add technologies (press Enter after each)
   - **GitHub URL**: Link to repository
   - **Live URL**: Link to live demo
   - **Date**: Project date
   - **Category**: Category name
   - **Tags**: Add tags
   - **Featured**: Toggle if featured
   - **Content**: Detailed project information (markdown)
4. Click **"Publish"**

## Deployment

When deploying to Vercel, Netlify, or other platforms, add these environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

**Note**: You don't need `SANITY_API_TOKEN` in production unless you're using API routes that write content.

### Vercel

1. Go to Project Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `your-project-id`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
3. Redeploy

### Netlify

1. Go to Site Settings → Build & deploy → Environment
2. Add the same variables as above
3. Redeploy

## Troubleshooting

### Studio Won't Load

- **Error**: "Missing projectId"
  - **Solution**: Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set in `.env.local`
  - **Solution**: Restart your dev server after adding env variables
  - **Solution**: Verify `enableStudio: true` in `user.json`

### Content Not Showing

- **Check**: Are your blog posts/projects published in Sanity Studio? (drafts won't appear)
- **Check**: Visit `/studio` and verify content exists
- **Check**: Check browser console for errors
- **Check**: Verify environment variables are set correctly
- **Check**: Make sure features are enabled in `user.json`

### Migration Script Fails

- **Error**: "Missing API token"
  - **Solution**: Make sure `SANITY_API_TOKEN` is set in `.env.local`
  - **Solution**: Verify token has **Editor** permissions
  - **Solution**: Check token hasn't expired

- **Error**: "Project not found"
  - **Solution**: Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
  - **Solution**: Check dataset name matches your Sanity project

### Images Not Displaying

- **Check**: Are images uploaded via Sanity Studio?
- **Check**: Verify image field in project schema is populated
- **Check**: Check image URL in browser console

## Security

For additional Studio security (password protection, IP whitelist), see [STUDIO_SECURITY.md](STUDIO_SECURITY.md).

## Next Steps

1. ✅ Set up Sanity account and project
2. ✅ Set environment variables
3. ✅ Enable features in `user.json`
4. ✅ Migrate existing content (optional)
5. ✅ Access Studio at `/studio`
6. ✅ Create new content
7. ✅ Deploy with environment variables

## Resources

- [Sanity.io Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/docs/js-client)
- [Sanity Studio Documentation](https://www.sanity.io/docs/studio)

---

**Need help?** Check [BLOG_GUIDE.md](BLOG_GUIDE.md) for blog management or open an issue on GitHub.