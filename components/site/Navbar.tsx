'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scrollToId } from '@/hooks/use-lenis';
import ThemeToggle from '@/components/site/ThemeToggle';
import { LoginModal } from '@/components/site/LoginModal';
import { useAuth } from '@/providers/AuthProvider';

const LINKS = [
  { id: 'labview-solutions', label: 'LabVIEW Solutions' },
  { id: 'systems-products', label: 'Systems & Products' },
  { id: 'web-ai-suite', label: 'Web + AI Suite' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'about', label: 'ABOUT' },
  { id: 'careers', label: 'CAREERS' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = LINKS.map((l) => l.id);
      let current = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled ? 'py-1' : 'py-2'
      )}
    >
      <nav
        className={cn(
          'mx-auto flex items-center justify-between px-4 sm:px-6 transition-all duration-500 rounded-full',
          scrolled
            ? 'max-w-[1300px] glass-strong py-1.5 border border-black/5 dark:border-white/5'
            : 'max-w-[1300px] bg-transparent py-1'
        )}
      >
        {/* Brand Logo */}
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <img src="/images/logo.png" alt="Logo" className="h-11 sm:h-12 lg:h-14 w-auto object-contain" />
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base font-semibold text-[var(--ink-soft)]">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={cn(
                  'nav-link transition-colors hover:text-[var(--ink)] whitespace-nowrap',
                  active === l.id && 'is-active text-[var(--ink)] font-bold'
                )}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 ml-2 lg:ml-4">
          {/* {isAuthenticated ? (
            <div className="flex items-center gap-4 mr-2">
              <span className="text-base font-bold text-[var(--ink)]">
                Hi, {user?.name.split(' ')[0]}
              </span>
              <button
                onClick={() => logout()}
                className="text-base font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <LoginModal>
              <button className="text-base font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors mr-2">
                Login
              </button>
            </LoginModal>
          )}
           */}
          <button
            onClick={() => go('contact')}
            className="whitespace-nowrap rounded-full bg-white px-5 xl:px-6 py-2.5 text-sm xl:text-base font-bold text-black dark:text-white shadow-lg shadow-[#0e7c86]/25 transition-transform hover:scale-[1.03]"
          >
            Book a Demo
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden text-[var(--ink)] p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden mx-4 mt-2 glass-strong rounded-2xl p-4">
          <ul className="flex flex-col gap-1.5">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={cn(
                    'w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-[var(--ink-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--ink)] transition-colors',
                    active === l.id && 'bg-[var(--accent-soft)] text-[var(--ink)] font-bold'
                  )}
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <div className="mt-2 flex items-center justify-between px-4 py-2">
                {/* <span className="text-base font-semibold text-[var(--ink-soft)]">Dark Mode</span> */}
                {/* <ThemeToggle /> */}
              </div>
            </li>
            <li>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="block w-full text-center rounded-xl bg-[var(--accent-soft)] px-4 py-3 text-base font-bold text-[var(--ink)] transition-colors mb-2"
                >
                  Logout
                </button>
              ) : (
                <LoginModal>
                  <button className="block w-full text-center rounded-xl bg-[var(--accent-soft)] px-4 py-3 text-base font-bold text-[var(--ink)] transition-colors mb-2">
                    Login
                  </button>
                </LoginModal>
              )}
              <button
                onClick={() => go('contact')}
                className="mt-1 w-full rounded-xl bg-white px-4 py-3 text-base font-bold text-black dark:text-white shadow-lg shadow-[#0e7c86]/25"
              >
                Book a Demo
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}