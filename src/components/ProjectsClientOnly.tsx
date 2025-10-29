'use client';

import { Project } from '@/lib/projects';
import { Calendar, ExternalLink, Github } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProjectsClientOnly() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Fetch projects data from an API route
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setAllProjects(data.allProjects || []);
          setFeaturedProjects(data.featuredProjects || []);
        } else {
          console.error('Failed to load projects');
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const otherProjects = allProjects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of projects that showcase my skills, creativity, and passion for building innovative solutions.
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {new Date(project.date).getFullYear()}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {project.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          aria-label="GitHub"
                        >
                          <Github size={24} />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={24} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {new Date(project.date).getFullYear()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          aria-label="GitHub"
                        >
                          <Github size={20} />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Projects Message */}
        {allProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">💼</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Yet</h3>
            <p className="text-gray-600">
              Projects will appear here once you add them to the content/projects directory.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
