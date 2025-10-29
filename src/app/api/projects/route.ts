import { getAllProjects, getFeaturedProjects } from '@/lib/projects';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allProjects = getAllProjects();
    const featuredProjects = getFeaturedProjects();

    return NextResponse.json({
      allProjects,
      featuredProjects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
