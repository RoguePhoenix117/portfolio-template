import { Code, Database, Globe, Smartphone, Users, Zap } from 'lucide-react';

export default function About() {
  const skills = [
    { name: 'Frontend Development', icon: Globe, description: 'React, Next.js, TypeScript, Tailwind CSS' },
    { name: 'Backend Development', icon: Database, description: 'Node.js, Express, Python, PostgreSQL' },
    { name: 'Mobile Development', icon: Smartphone, description: 'React Native, Flutter' },
    { name: 'DevOps & Tools', icon: Zap, description: 'Docker, AWS, Vercel, Git' },
    { name: 'Team Collaboration', icon: Users, description: 'Agile, Code Reviews, Mentoring' },
    { name: 'Problem Solving', icon: Code, description: 'Algorithm Design, System Architecture' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm a passionate developer with a love for creating innovative solutions and continuous learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Story */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed">
                With over 5 years of experience in software development, I've had the privilege of working 
                on diverse projects ranging from small startups to large enterprise applications. My journey 
                began with a curiosity about how websites work, which quickly evolved into a passion for 
                building scalable, user-friendly applications.
              </p>
              <p className="text-gray-600 leading-relaxed">
                I believe in the power of clean code, user-centered design, and continuous learning. 
                When I'm not coding, you'll find me writing technical blog posts, contributing to open-source 
                projects, or exploring new technologies that can solve real-world problems.
              </p>
              <p className="text-gray-600 leading-relaxed">
                My goal is to create digital experiences that not only meet requirements but exceed expectations, 
                making a positive impact on users' lives.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>

          {/* Right side - Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Skills & Expertise</h3>
            <div className="grid grid-cols-1 gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {skill.name}
                        </h4>
                        <p className="text-gray-600">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Let's Work Together
          </a>
        </div>
      </div>
    </section>
  );
}
