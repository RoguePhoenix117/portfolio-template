import { remark } from 'remark';
import html from 'remark-html';
import { client } from './sanity/client';

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

// Helper function to calculate read time
function calculateReadTime(content: string): string {
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  return `${readTime} min read`;
}

// Transform Sanity post to BlogPost format
function transformPost(post: any): BlogPost {
  const content = post.content || '';
  // Handle slug - it might be a string (from GROQ) or an object with .current
  const slug = typeof post.slug === 'string' 
    ? post.slug 
    : (post.slug?.current || '');
  
  return {
    id: post._id || slug || '',
    slug: slug || '',
    title: post.title || 'Untitled',
    excerpt: post.excerpt || '',
    date: post.date || new Date().toISOString().split('T')[0],
    readTime: calculateReadTime(content),
    category: post.category || 'Uncategorized',
    featured: post.featured || false,
    tags: post.tags || [],
    author: post.author || 'Your Name',
    content,
  };
}

// Get all blog post slugs
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const posts = await client.fetch<Array<{ slug: string }>>(`
      *[_type == "post"] {
        "slug": slug.current
      }
    `);
    return posts.map(post => post.slug || '').filter(Boolean);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

// Get all blog posts with metadata
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch<any[]>(`
      *[_type == "post"] | order(date desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        date,
        category,
        featured,
        tags,
        author,
        content
      }
    `);
    
    return posts.map(transformPost);
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

// Get featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch<any[]>(`
      *[_type == "post" && featured == true] | order(date desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        date,
        category,
        featured,
        tags,
        author,
        content
      }
    `);
    
    return posts.map(transformPost);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch<any[]>(`
      *[_type == "post" && category == $category] | order(date desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        date,
        category,
        featured,
        tags,
        author,
        content
      }
    `, { category });
    
    return posts.map(transformPost);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

// Get all categories
export async function getAllCategories(): Promise<string[]> {
  try {
    const categories = await client.fetch<string[]>(`
      array::unique(*[_type == "post"].category)
    `);
    return categories.sort();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await client.fetch<any>(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        date,
        category,
        featured,
        tags,
        author,
        content
      }
    `, { slug });
    
    if (!post) return null;
    return transformPost(post);
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

// Get post content as HTML
export async function getPostContent(slug: string): Promise<string> {
  try {
    const post = await getPostBySlug(slug);
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
export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  try {
    const currentPost = await getPostBySlug(currentSlug);
    if (!currentPost) return [];

    const posts = await client.fetch<any[]>(`
      *[_type == "post" && slug.current != $currentSlug && category == $category] | order(date desc) [0...$limit] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        date,
        category,
        featured,
        tags,
        author,
        content
      }
    `, { 
      currentSlug,
      category: currentPost.category,
      limit 
    });
    
    return posts.map(transformPost);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}
