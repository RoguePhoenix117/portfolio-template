#!/usr/bin/env tsx

/**
 * Migration script to import existing markdown blog posts and projects into Sanity
 * 
 * Usage:
 *   pnpm tsx scripts/migrate-to-sanity.ts
 * 
 * Prerequisites:
 *   - Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 *   - Set NEXT_PUBLIC_SANITY_DATASET in .env.local
 *   - Set SANITY_API_TOKEN in .env.local (with write permissions)
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is required');
  console.error('Add it to your .env.local file');
  process.exit(1);
}

if (!token) {
  console.error('❌ SANITY_API_TOKEN is required');
  console.error('Add it to your .env.local file');
  console.error('You can generate a token at https://sanity.io/manage');
  process.exit(1);
}

// Create Sanity client with write permissions
const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token,
});

const postsDirectory = path.join(process.cwd(), 'content/blog');
const projectsDirectory = path.join(process.cwd(), 'content/projects');

interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured?: boolean;
  tags: string[];
  author: string;
}

interface ProjectFrontmatter {
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

// Helper to create slug from filename or title
function createSlug(title: string, filename: string): string {
  return filename.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

// Migrate blog posts
async function migrateBlogPosts() {
  console.log('\n📝 Migrating blog posts...\n');
  
  if (!fs.existsSync(postsDirectory)) {
    console.log(`⚠️  Blog directory not found: ${postsDirectory}`);
    return;
  }

  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('⚠️  No blog post files found');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const filePath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const metadata = data as BlogPostFrontmatter;
      const slug = createSlug(metadata.title, file);
      
      // Check if post already exists
      const existing = await client.fetch(
        `*[_type == "post" && slug.current == $slug][0]._id`,
        { slug }
      );

      const post = {
        _type: 'post',
        _id: existing || undefined, // Use existing ID if found
        title: metadata.title,
        slug: {
          _type: 'slug',
          current: slug,
        },
        excerpt: metadata.excerpt,
        author: metadata.author || 'Your Name',
        date: metadata.date,
        category: metadata.category,
        featured: metadata.featured || false,
        tags: metadata.tags || [],
        content: content.trim(),
      };

      if (existing) {
        // Update existing post
        await client.createOrReplace(post);
        console.log(`✅ Updated: ${metadata.title}`);
      } else {
        // Create new post
        await client.create(post);
        console.log(`✅ Created: ${metadata.title}`);
      }
      
      successCount++;
    } catch (error) {
      console.error(`❌ Error migrating ${file}:`, error);
      errorCount++;
    }
  }

  console.log(`\n📊 Blog posts: ${successCount} migrated, ${errorCount} errors\n`);
}

// Migrate projects
async function migrateProjects() {
  console.log('\n🚀 Migrating projects...\n');
  
  if (!fs.existsSync(projectsDirectory)) {
    console.log(`⚠️  Projects directory not found: ${projectsDirectory}`);
    return;
  }

  const files = fs.readdirSync(projectsDirectory).filter(f => f.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('⚠️  No project files found');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const filePath = path.join(projectsDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const metadata = data as ProjectFrontmatter;
      const slug = createSlug(metadata.title, file);
      
      // Check if project already exists
      const existing = await client.fetch(
        `*[_type == "project" && slug.current == $slug][0]._id`,
        { slug }
      );

      // For images, we'll store the URL as a string for now
      // You'll need to upload images to Sanity later via the Studio
      const project = {
        _type: 'project',
        _id: existing || undefined,
        title: metadata.title,
        slug: {
          _type: 'slug',
          current: slug,
        },
        description: metadata.description,
        excerpt: metadata.excerpt,
        // Image will need to be uploaded separately via Studio
        // For now, we'll store the path as a note
        technologies: metadata.technologies || [],
        githubUrl: metadata.githubUrl || '',
        liveUrl: metadata.liveUrl || '',
        featured: metadata.featured || false,
        date: metadata.date,
        category: metadata.category,
        tags: metadata.tags || [],
        content: content.trim(),
      };

      if (existing) {
        await client.createOrReplace(project);
        console.log(`✅ Updated: ${metadata.title}`);
        console.log(`   ⚠️  Image needs to be uploaded: ${metadata.image}`);
      } else {
        await client.create(project);
        console.log(`✅ Created: ${metadata.title}`);
        console.log(`   ⚠️  Image needs to be uploaded: ${metadata.image}`);
      }
      
      successCount++;
    } catch (error) {
      console.error(`❌ Error migrating ${file}:`, error);
      errorCount++;
    }
  }

  console.log(`\n📊 Projects: ${successCount} migrated, ${errorCount} errors\n`);
  console.log('⚠️  Note: Project images need to be uploaded via Sanity Studio');
  console.log('   Visit /studio after running the app to upload images\n');
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting migration to Sanity...\n');
  console.log(`Project ID: ${projectId}`);
  console.log(`Dataset: ${dataset}\n`);

  try {
    await migrateBlogPosts();
    await migrateProjects();
    
    console.log('✅ Migration complete!');
    console.log('\n📌 Next steps:');
    console.log('   1. Visit http://localhost:3001/studio to verify content');
    console.log('   2. Upload project images via the Studio');
    console.log('   3. Review and edit content as needed');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrate();

