# Blog Management Guide

This guide explains how to add, edit, and manage blog posts in your portfolio website.

## How It Works

The blog system uses **markdown files** stored in the `content/blog/` directory. Each blog post is a separate `.md` file with frontmatter metadata.

## Adding a New Blog Post

### 1. Create a Markdown File

Create a new file in `content/blog/` with a descriptive filename (this becomes the URL slug):

```
content/blog/my-awesome-post.md
```

### 2. Add Frontmatter

Start your markdown file with frontmatter (metadata between the `---` lines):

```markdown
---
title: "Your Post Title"
excerpt: "A brief description of your post that appears in the blog listing"
date: "2024-01-20"
category: "Web Development"
featured: true
tags: ["React", "Tutorial", "JavaScript"]
author: "Your Name"
---

# Your Post Title

Your blog post content goes here...
```

### 3. Write Your Content

Write your blog post using standard markdown syntax:

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

![Image alt text](image-url.jpg)

```code
Code block
```

> Blockquote
```

## Frontmatter Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | Yes | The post title | `"Getting Started with React"` |
| `excerpt` | Yes | Short description for listings | `"Learn the basics of React development"` |
| `date` | Yes | Publication date (YYYY-MM-DD) | `"2024-01-20"` |
| `category` | Yes | Post category | `"Web Development"` |
| `featured` | No | Show in featured section | `true` or `false` |
| `tags` | No | Array of tags | `["React", "Tutorial"]` |
| `author` | No | Author name | `"Your Name"` |

## File Naming Convention

- Use lowercase letters and hyphens
- Be descriptive but concise
- This becomes your URL slug
- Examples:
  - `getting-started-with-react.md` → `/blog/getting-started-with-react`
  - `advanced-typescript-patterns.md` → `/blog/advanced-typescript-patterns`

## Categories

The system automatically generates categories from your posts. Common categories include:

- Web Development
- TypeScript
- CSS
- Performance
- API
- DevOps
- Tutorial
- Best Practices

## Adding Images

1. Create an `images/` folder in your project root
2. Add your images there
3. Reference them in markdown: `![Alt text](/images/your-image.jpg)`

## Code Syntax Highlighting

Use triple backticks with language names:

```markdown
```typescript
interface User {
  name: string;
  email: string;
}
```
```

## Previewing Your Post

1. Start the development server: `pnpm dev`
2. Visit `http://localhost:3000/blog`
3. Find your post in the listing
4. Click to view the full post

## Deployment

When you're ready to publish:

1. Commit your changes: `git add . && git commit -m "Add new blog post"`
2. Push to your repository: `git push`
3. If using Vercel, it will automatically redeploy

## Tips

- **Write engaging excerpts** - They appear in social media previews
- **Use descriptive titles** - They help with SEO
- **Add relevant tags** - They help with categorization
- **Include a featured image** - Makes posts more attractive
- **Keep content fresh** - Regular posting keeps readers engaged

## Example Complete Post

```markdown
---
title: "Building a Todo App with React and TypeScript"
excerpt: "Learn how to create a fully functional todo application using React hooks and TypeScript for type safety."
date: "2024-01-20"
category: "Web Development"
featured: true
tags: ["React", "TypeScript", "Tutorial", "Hooks"]
author: "Your Name"
---

# Building a Todo App with React and TypeScript

In this tutorial, we'll build a complete todo application using React and TypeScript...

## Prerequisites

- Basic knowledge of React
- Understanding of TypeScript
- Node.js installed

## Getting Started

First, let's create a new React project...

[Continue with your content...]
```

That's it! Your blog system is now ready to use. Happy writing! 🚀
