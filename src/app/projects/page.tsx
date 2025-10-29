import ProjectsServer from '@/components/ProjectsServer';
import ProjectsWrapper from '@/components/ProjectsWrapper';

export default function ProjectsPage() {
  return (
    <ProjectsWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A collection of projects that showcase my skills, creativity, and passion for building innovative solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <div className="py-16">
          <ProjectsServer />
        </div>
      </div>
    </ProjectsWrapper>
  );
}
