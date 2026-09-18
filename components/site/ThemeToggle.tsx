'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // On mount, read saved preference or system preference
  useEffect(() => {
    const saved = localStorage.getItem('rs-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('rs-theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative inline-flex h-9 w-16 items-center rounded-full transition-all duration-300 focus:outline-none"
      style={{
        background: dark
          ? 'linear-gradient(135deg, #14a0ac, #2d6fc4)'
          : '#e2e8ea',
        boxShadow: dark
          ? 'inset 2px 2px 5px rgba(0,0,0,0.3), 0 0 12px rgba(20,160,172,0.3)'
          : 'inset 2px 2px 5px #c8d0d2, inset -2px -2px 5px #ffffff',
      }}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-yellow-400 transition-opacity duration-300" style={{ opacity: dark ? 0 : 1 }}>
        <Sun size={13} />
      </span>
      <span className="absolute right-1.5 text-blue-200 transition-opacity duration-300" style={{ opacity: dark ? 1 : 0 }}>
        <Moon size={13} />
      </span>

      {/* Thumb */}
      <span
        className="absolute flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-all duration-300"
        style={{
          left: dark ? 'calc(100% - 1.75rem)' : '0.2rem',
          background: dark ? '#0a0f10' : '#ffffff',
          boxShadow: dark
            ? '0 2px 8px rgba(0,0,0,0.5)'
            : '1px 1px 4px #c0c8ca, -1px -1px 3px #ffffff',
        }}
      >
        {dark ? (
          <Moon size={12} className="text-[#14a0ac]" />
        ) : (
          <Sun size={12} className="text-yellow-500" />
        )}
      </span>
    </button>
  );
}
