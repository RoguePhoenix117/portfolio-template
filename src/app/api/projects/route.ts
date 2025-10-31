import { getAllProjects, getFeaturedProjects } from '@/lib/projects';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [allProjects, featuredProjects] = await Promise.all([
      getAllProjects(),
      getFeaturedProjects(),
    ]);

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
