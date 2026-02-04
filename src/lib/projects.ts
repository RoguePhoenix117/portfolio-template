import { remark } from 'remark';
import html from 'remark-html';
import { client } from './sanity/client';
import { urlFor } from './sanity/image';

export interface Project {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  date: string;
  category: string;
  tags: string[];
  content?: string;
  slug: string;
}

export interface ProjectMetadata {
  title: string;
  description: string;
  excerpt: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  date: string;
  category: string;
  tags: string[];
}

// Transform Sanity project to Project format
function transformProject(project: any): Project {
  const content = project.content || '';
  const imageUrl = project.image 
    ? urlFor(project.image).width(800).height(600).url()
    : project.image?.asset?.url || '/placeholder.jpg';
  
  return {
    id: project._id || (typeof project.slug === 'string' ? project.slug : project.slug?.current) || '',
    slug: typeof project.slug === 'string' ? project.slug : (project.slug?.current ?? ''),
    title: project.title || '',
    description: project.description || '',
    excerpt: project.excerpt || '',
    image: imageUrl,
    technologies: project.technologies || [],
    githubUrl: project.githubUrl || '',
    liveUrl: project.liveUrl || '',
    featured: project.featured || false,
    date: project.date || new Date().toISOString().split('T')[0],
    category: project.category || '',
    tags: project.tags || [],
    content,
  };
}

// Process markdown content to HTML
async function processContent(content: string): Promise<string> {
  if (!content) return '';
  try {
    const processed = remark().use(html).processSync(content);
    return processed.toString();
  } catch (error) {
    console.error('Error processing content:', error);
    return content;
  }
}

// Get all project slugs
export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const projects = await client.fetch<Array<{ slug: { current: string } }>>(`
      *[_type == "project"] {
        "slug": slug
      }
    `);
    return projects.map(project => project.slug?.current || '').filter(Boolean);
  } catch (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const project = await client.fetch<any>(`
      *[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        description,
        excerpt,
        image,
        technologies,
        githubUrl,
        liveUrl,
        featured,
        date,
        category,
        tags,
        content
      }
    `, { slug });
    
    if (!project) return null;
    
    const transformed = transformProject(project);
    // Process markdown content to HTML
    if (transformed.content) {
      transformed.content = await processContent(transformed.content);
    }
    
    return transformed;
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    return null;
  }
}

// Get all projects with metadata
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch<any[]>(`
      *[_type == "project"] | order(date desc) {
        _id,
        title,
        "slug": slug.current,
        description,
        excerpt,
        image,
        technologies,
        githubUrl,
        liveUrl,
        featured,
        date,
        category,
        tags,
        content
      }
    `);
    
    return projects.map(transformProject);
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }
}

// Get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch<any[]>(`
      *[_type == "project" && featured == true] | order(date desc) {
        _id,
        title,
        "slug": slug.current,
        description,
        excerpt,
        image,
        technologies,
        githubUrl,
        liveUrl,
        featured,
        date,
        category,
        tags,
        content
      }
    `);
    
    return projects.map(transformProject);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

// Get projects by category
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const projects = await client.fetch<any[]>(`
      *[_type == "project" && category == $category] | order(date desc) {
        _id,
        title,
        "slug": slug.current,
        description,
        excerpt,
        image,
        technologies,
        githubUrl,
        liveUrl,
        featured,
        date,
        category,
        tags,
        content
      }
    `, { category });
    
    return projects.map(transformProject);
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }
}

// Get all categories
export async function getAllProjectCategories(): Promise<string[]> {
  try {
    const categories = await client.fetch<string[]>(`
      array::unique(*[_type == "project"].category)
    `);
    return [...new Set(categories)];
  } catch (error) {
    console.error('Error fetching project categories:', error);
    return [];
  }
}

// Get all tags
export async function getAllProjectTags(): Promise<string[]> {
  try {
    const tags = await client.fetch<string[][]>(`
      *[_type == "project"].tags
    `);
    const flatTags = tags.flat();
    return [...new Set(flatTags)];
  } catch (error) {
    console.error('Error fetching project tags:', error);
    return [];
  }
}
