import { getAllProjects, getFeaturedProjects } from '@/lib/projects';
import ProjectsClient from './ProjectsClient';

export default function ProjectsServer() {
  const allProjects = getAllProjects();
  const featuredProjects = getFeaturedProjects();

  return <ProjectsClient allProjects={allProjects} featuredProjects={featuredProjects} />;
}
