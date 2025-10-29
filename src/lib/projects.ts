import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

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

// Get all project slugs
export function getAllProjectSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(projectsDirectory);
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}

// Get project by slug
export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const metadata = data as ProjectMetadata;
    
    // Process markdown content
    const processedContent = remark().use(html).processSync(content).toString();

    // Calculate read time (rough estimate)
    const readTime = Math.ceil(content.split(/\s+/).length / 200);

    return {
      id: slug,
      slug,
      title: metadata.title,
      description: metadata.description,
      excerpt: metadata.excerpt,
      image: metadata.image,
      technologies: metadata.technologies || [],
      githubUrl: metadata.githubUrl,
      liveUrl: metadata.liveUrl,
      featured: metadata.featured || false,
      date: metadata.date,
      category: metadata.category,
      tags: metadata.tags || [],
      content: processedContent,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

// Get all projects with metadata
export function getAllProjects(): Project[] {
  try {
    const slugs = getAllProjectSlugs();
    const projects = slugs
      .map(slug => {
        const project = getProjectBySlug(slug);
        return project;
      })
      .filter(project => project !== null)
      .sort((a, b) => (a.date < b.date ? 1 : -1)); // Sort by date, newest first

    return projects as Project[];
  } catch (error) {
    console.error('Error getting all projects:', error);
    return [];
  }
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter(project => project.featured);
}

// Get projects by category
export function getProjectsByCategory(category: string): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter(project => project.category.toLowerCase() === category.toLowerCase());
}

// Get all categories
export function getAllProjectCategories(): string[] {
  const allProjects = getAllProjects();
  const categories = allProjects.map(project => project.category);
  return [...new Set(categories)];
}

// Get all tags
export function getAllProjectTags(): string[] {
  const allProjects = getAllProjects();
  const tags = allProjects.flatMap(project => project.tags);
  return [...new Set(tags)];
}
