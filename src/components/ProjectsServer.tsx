import { getAllProjects, getFeaturedProjects } from '@/lib/projects';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsServer() {
  const [allProjects, featuredProjects] = await Promise.all([
    getAllProjects(),
    getFeaturedProjects(),
  ]);

  return <ProjectsClient allProjects={allProjects} featuredProjects={featuredProjects} />;
}
