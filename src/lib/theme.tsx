'use client';

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  /** Resolved for UI: 'light' or 'dark' (system resolves to actual preference) */
  resolvedTheme: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_KEY = 'theme';

function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const t = localStorage.getItem(THEME_KEY);
  if (t === 'light' || t === 'dark' || t === 'system') return t;
  return 'system';
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else if (mode === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
}

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  return getStoredTheme();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
    getInitialTheme() === 'system' ? getSystemTheme() : (getInitialTheme() as 'light' | 'dark')
  );

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    if (next === 'system') {
      setResolvedTheme(getSystemTheme());
    } else {
      setResolvedTheme(next);
    }
  }, []);

  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored);
    applyTheme(stored);
    if (stored === 'system') {
      setResolvedTheme(getSystemTheme());
    } else {
      setResolvedTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setResolvedTheme(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
