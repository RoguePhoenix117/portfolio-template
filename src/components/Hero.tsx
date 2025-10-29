'use client';

import { getSocialLinks, loadUserConfig } from '@/lib/config';
import { UserConfig } from '@/lib/types';
import { ArrowDown, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
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
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (!config) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <p className="text-red-600">Failed to load configuration</p>
        </div>
      </section>
    );
  }

  const socialLinks = getSocialLinks(config);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Profile Image Placeholder */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
              {config.personal.initials}
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            {config.content.hero.greeting}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {config.content.hero.nameHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {config.content.hero.subtitle1}{' '}
            <span className="font-semibold text-blue-600">{config.content.hero.subtitleHighlight1}</span>{' '}
            {config.content.hero.subtitle2}{' '}
            <span className="font-semibold text-purple-600">{config.content.hero.subtitleHighlight2}</span>
          </p>

          {/* Description */}
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            {config.content.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href={config.content.navigation.projects}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {config.content.hero.ctaButtons.viewWork}
            </a>
            <a
              href={config.content.hero.resumeUrl}
              download
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2"
            >
              <Download size={20} />
              {config.content.hero.ctaButtons.downloadResume}
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-16">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <Icon size={28} />
                </a>
              );
            })}
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <a href={config.content.navigation.about} className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
              <ArrowDown size={32} />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
