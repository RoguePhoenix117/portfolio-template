import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  tags: string[];
  author: string;
  content?: string;
  slug: string;
}

export interface BlogPostMetadata {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured?: boolean;
  tags: string[];
  author: string;
}

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading blog posts directory:', error);
    return [];
  }
}

// Get all blog posts with metadata
export function getAllPosts(): BlogPost[] {
  try {
    const slugs = getAllPostSlugs();
    const posts = slugs
      .map(slug => {
        const post = getPostBySlug(slug);
        return post;
      })
      .filter(post => post !== null)
      .sort((a, b) => (a.date < b.date ? 1 : -1)); // Sort by date, newest first

    return posts as BlogPost[];
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

// Get featured posts
export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.featured);
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

// Get all categories
export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = new Set(allPosts.map(post => post.category));
  return Array.from(categories).sort();
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    return {
      slug,
      id: slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      date: data.date || new Date().toISOString().split('T')[0],
      readTime: `${readTime} min read`,
      category: data.category || 'Uncategorized',
      featured: data.featured || false,
      tags: data.tags || [],
      author: data.author || 'Your Name',
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Get post content as HTML
export async function getPostContent(slug: string): Promise<string> {
  try {
    const post = getPostBySlug(slug);
    if (!post || !post.content) {
      return '';
    }

    const processedContent = await remark()
      .use(html)
      .process(post.content);
    
    return processedContent.toString();
  } catch (error) {
    console.error(`Error processing post content ${slug}:`, error);
    return '';
  }
}

// Get related posts (by category, excluding current post)
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllPosts();
  return allPosts
    .filter(post => 
      post.slug !== currentSlug && 
      post.category === currentPost.category
    )
    .slice(0, limit);
}
