'use client';

import About from '@/components/About';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import ProjectsClientOnly from '@/components/ProjectsClientOnly';
import { loadUserConfig } from '@/lib/config';
import { UserConfig } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function Home() {
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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Failed to load configuration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero />
      {config.features.enableAbout && <About />}
      {config.features.enableProjects && <ProjectsClientOnly />}
      {config.features.enableContact && <Contact />}
    </div>
  );
}
