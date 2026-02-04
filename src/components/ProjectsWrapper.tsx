'use client';

import { loadUserConfig } from '@/lib/config';
import { UserConfig } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProjectsWrapperProps {
  children: React.ReactNode;
}

export default function ProjectsWrapper({ children }: ProjectsWrapperProps) {
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

  if (!config.features.enableProjects) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">💼</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Projects Not Available</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The projects feature is currently disabled. You can enable it by setting <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">enableProjects: true</code> in your configuration.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
