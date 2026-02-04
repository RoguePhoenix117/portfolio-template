'use client';

import { getNavigationItems, loadUserConfig } from '@/lib/config';
import { UserConfig } from '@/lib/types';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
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
      <nav className="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="hidden md:flex space-x-8">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (!config) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-red-600">Failed to load navigation</div>
          </div>
        </div>
      </nav>
    );
  }

  const navItems = getNavigationItems(config);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">{config.branding.logoInitial}</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">{config.branding.logoText}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Theme toggle */}
          <div className="hidden md:flex items-center">
            <ThemeToggle />
          </div>

          {/* Mobile: theme + menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
