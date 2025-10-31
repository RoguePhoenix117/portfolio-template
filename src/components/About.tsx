'use client';

import { Code, Database, Globe, Smartphone, Users, Zap } from 'lucide-react';
import { loadUserConfig } from '@/lib/config';
import { UserConfig } from '@/lib/types';
import { useEffect, useState } from 'react';

// Map skill names to icons
const skillIconMap: Record<string, typeof Globe> = {
  'Frontend Development': Globe,
  'Backend Development': Database,
  'Mobile Development': Smartphone,
  'DevOps & Tools': Zap,
  'Team Collaboration': Users,
  'Problem Solving': Code,
};

const colorMap: Record<'blue' | 'purple' | 'green' | 'orange', string> = {
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  green: 'text-green-600',
  orange: 'text-orange-600',
};

export default function About() {
  const [config, setConfig] = useState<UserConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const userConfig = await loadUserConfig();
        setConfig(userConfig);
      } catch (error) {
        console.error('Failed to load user configuration:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!config || !config.content.about) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Failed to load about section configuration</p>
          </div>
        </div>
      </section>
    );
  }

  const aboutConfig = config.content.about;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {aboutConfig.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {aboutConfig.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Story */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              {aboutConfig.story.map((paragraph, index) => (
                <p key={index} className="text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {aboutConfig.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold ${colorMap[stat.color]} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Skills & Expertise</h3>
            <div className="grid grid-cols-1 gap-6">
              {aboutConfig.skills.map((skill, index) => {
                const Icon = skillIconMap[skill.name] || Code;
                return (
                  <div
                    key={index}
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
            {aboutConfig.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
