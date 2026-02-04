'use client';

import { getSocialLinks, loadUserConfig } from '@/lib/config';
import { UserConfig } from '@/lib/types';
import { ArrowDown, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

const HERO_IMAGE_PATH = '/hero.png';

export default function Hero() {
  const [config, setConfig] = useState<UserConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

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
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (!config) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <p className="text-red-600">Failed to load configuration</p>
        </div>
      </section>
    );
  }

  const socialLinks = getSocialLinks(config);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 dark:bg-pink-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Profile picture or initials fallback */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <img
                src={HERO_IMAGE_PATH}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover ${heroImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setHeroImageLoaded(true)}
                onError={() => setHeroImageLoaded(false)}
              />
              {!heroImageLoaded && (
                <span className="text-white text-4xl font-bold select-none" aria-hidden>
                  {config.personal.initials}
                </span>
              )}
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            {config.content.hero.greeting}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {config.content.hero.nameHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {config.content.hero.subtitle1}{' '}
            <span className="font-semibold text-blue-600">{config.content.hero.subtitleHighlight1}</span>{' '}
            {config.content.hero.subtitle2}{' '}
            <span className="font-semibold text-purple-600">{config.content.hero.subtitleHighlight2}</span>
          </p>

          {/* Description */}
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
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
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2"
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
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <Icon size={28} />
                </a>
              );
            })}
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center animate-bounce">
            <a href={config.content.navigation.about} className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" aria-label="Scroll to about">
              <ArrowDown size={32} />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
