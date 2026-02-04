'use client';

import { useTheme, type ThemeMode } from '@/lib/theme';
import { Monitor, Moon, Sun } from 'lucide-react';

const options: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center rounded-lg bg-gray-100 p-1 dark:bg-gray-800"
      role="radiogroup"
      aria-label="Theme"
    >
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          aria-checked={theme === value}
          role="radio"
          className={`rounded-md p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
            theme === value
              ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
          }`}
          aria-label={label}
          title={label}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
}
