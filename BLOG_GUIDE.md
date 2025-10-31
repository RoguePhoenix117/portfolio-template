# Blog Management Guide

This guide explains how to manage blog posts using Sanity CMS in your portfolio website.

> ⚠️ **Note**: The blog feature is **disabled by default**. Enable it in `public/user.json`:
> ```json
> {
>   "features": {
>     "enableBlog": true
>   }
> }
> ```
> You'll also need to set up Sanity CMS - see [SANITY_SETUP.md](SANITY_SETUP.md).

## How It Works

The blog system uses **Sanity.io CMS** for content management. Blog posts are stored in your Sanity project and can be managed through the Sanity Studio interface at `/studio`.

## Prerequisites

1. **Sanity CMS Setup**: See [SANITY_SETUP.md](SANITY_SETUP.md) for setup instructions
2. **Blog Feature Enabled**: Set `enableBlog: true` in `public/user.json`
3. **Sanity Studio Enabled** (recommended): Set `enableStudio: true` in `public/user.json` to manage content

## Accessing Sanity Studio

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3001/studio`
3. Log in with your Sanity account
4. Start creating content!

> If you see "Studio Not Available", make sure:
> - `enableStudio: true` in `user.json`
> - Sanity environment variables are set (see [SANITY_SETUP.md](SANITY_SETUP.md))

## Creating a Blog Post

### Via Sanity Studio (Recommended)

1. Go to `/studio` in your browser
2. Click **"Blog Post"** in the sidebar
3. Click **"Create new"**
4. Fill in the fields:
   - **Title**: Your blog post title
   - **Slug**: Auto-generated from title (or edit manually)
   - **Excerpt**: Brief description (appears in blog listings)
   - **Author**: Your name (defaults to "Your Name")
   - **Date**: Publication date
   - **Category**: Category name (e.g., "Web Development", "Tutorial")
   - **Tags**: Add tags (press Enter after each)
   - **Featured**: Toggle if you want this post featured
   - **Content**: Write your blog post content in Markdown
5. Click **"Publish"**

### Content Format

Blog posts use **Markdown** for content formatting:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)

![Image alt text](https://example.com/image.jpg)

```code
Code block
```

> Blockquote
```

### Frontmatter Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | Yes | Post title | `"Getting Started with React"` |
| `slug` | Auto | URL slug | `"getting-started-with-react"` |
| `excerpt` | Yes | Short description | `"Learn React basics"` |
| `date` | Yes | Publication date | `"2024-01-20"` |
| `category` | Yes | Post category | `"Web Development"` |
| `tags` | No | Array of tags | `["React", "Tutorial"]` |
| `author` | No | Author name | `"Your Name"` |
| `featured` | No | Featured post | `true` or `false` |
| `content` | Yes | Markdown content | Full post content |

## Categories

Create categories as needed. Common categories:

- Web Development
- TypeScript
- CSS
- Performance
- API Development
- DevOps
- Tutorial
- Best Practices
- React
- Next.js

## Managing Blog Posts

### Editing Posts

1. Go to `/studio`
2. Click **"Blog Post"** in sidebar
3. Click on the post you want to edit
4. Make changes
5. Click **"Publish"**

### Deleting Posts

1. Go to `/studio`
2. Click **"Blog Post"** in sidebar
3. Select the post
4. Click the menu (three dots)
5. Click **"Delete"**

### Featured Posts

Featured posts appear in the featured section on your blog page. Toggle the **"Featured"** field in the post editor.

## Previewing Your Blog

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3001/blog`
3. Your posts appear automatically!

## Migrating Existing Content

If you have markdown files in `content/blog/`, you can migrate them to Sanity:

1. Set up Sanity (see [SANITY_SETUP.md](SANITY_SETUP.md))
2. Add `SANITY_API_TOKEN` to `.env.local` (with Editor permissions)
3. Run the migration script:
   ```bash
   npm run migrate:sanity
   ```

This imports all markdown files from `content/blog/` into Sanity.

## Deployment

### Environment Variables

Add these to your deployment platform:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Your dataset name (usually `production`)

**Note**: You don't need `SANITY_API_TOKEN` in production unless you're using API routes that write content.

### Production Studio

The Sanity Studio is available at `/studio` in production. You can:

- Restrict access (see [STUDIO_SECURITY.md](STUDIO_SECURITY.md))
- Or keep it public for easy content management

## Tips

- **Write engaging excerpts** - They appear in social media previews
- **Use descriptive titles** - Help with SEO
- **Add relevant tags** - Help with categorization and search
- **Keep content fresh** - Regular posting keeps readers engaged
- **Use featured posts** - Highlight your best content

## Troubleshooting

### Blog page shows "Blog Not Available"

- Check `enableBlog: true` in `public/user.json`
- Restart your dev server after changing config

### No posts showing

- Make sure posts are **published** in Sanity Studio (drafts don't show)
- Check Sanity environment variables are set correctly
- Verify Sanity project ID and dataset name

### Studio won't load

- Check `enableStudio: true` in `public/user.json`
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
- Restart your dev server

### Posts not appearing after creation

- Make sure posts are published (not drafts)
- Clear browser cache
- Check browser console for errors

## Resources

- [Sanity.io Documentation](https://www.sanity.io/docs)
- [Sanity Studio Guide](https://www.sanity.io/docs/studio)
- [Markdown Guide](https://www.markdownguide.org/)

---

**Happy blogging!** 📝