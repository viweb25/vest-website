'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Globe, Code, Smartphone, Cpu, TrendingUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { scrollToId } from '@/hooks/use-lenis';
import { LoginModal } from '@/components/site/LoginModal';
import { useAuth } from '@/providers/AuthProvider';

const LINKS = [
  { id: 'engineering', label: 'Engineering', href: '/services/engineering' },
  { id: 'systems', label: 'Systems', href: '/services/systems' },
  { id: 'technology', label: 'Technology', href: '/services/technology' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'about', label: 'About Us', href: '/about' },
  { id: 'careers', label: 'Careers', href: '/careers' },
  { id: 'contact', label: 'Contact Us', href: '/contact' },
];

const TECH_ITEMS = [
  {
    title: 'WEBSITE DEVELOPMENT',
    description: 'Custom, responsive websites built for scale and performance.',
    icon: Globe,
    href: '/services/technology/website-development',
  },
  {
    title: 'SOFTWARE DEVELOPMENT',
    description: 'Robust enterprise software solutions tailored to your needs.',
    icon: Code,
    href: '/services/technology/software-development',
  },
  {
    title: 'MOBILE APP DEVELOPMENT',
    description: 'Native and cross-platform mobile experiences for iOS & Android.',
    icon: Smartphone,
    href: '/services/technology/mobile-app-development',
  },
  {
    title: 'CLOUD & AI',
    description: 'Next-gen cloud infrastructure and advanced AI integration.',
    icon: Cpu,
    href: '/services/technology/cloud-ai',
  },
  {
    title: 'DIGITAL MARKETING',
    description: 'Data-driven marketing strategies to accelerate digital growth.',
    icon: TrendingUp,
    href: '/services/technology/digital-marketing',
  },
];

const SYSTEMS_ITEMS = [
  {
    title: 'LabVIEW Engineering',
    description: 'Custom test systems, DAQ, and instrument control solutions.',
    icon: Code,
    href: '/services/systems',
  },
  {
    title: 'PLC Programming & Industrial Automation',
    description: 'Reliable machine control, HMI, and factory floor integration.',
    icon: Cpu,
    href: '/services/systems',
  },
  {
    title: 'Intelligent Automation with LabVIEW + AI',
    description: 'Next-gen test systems powered by machine learning and AI.',
    icon: TrendingUp,
    href: '/services/systems',
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = LINKS.filter(l => !l.href).map((l) => l.id);
      let current = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      
      const path = window.location.pathname;
      if (path === '/contact') current = 'contact';
      else if (path === '/projects') current = 'projects';
      else if (path === '/about') current = 'about';
      else if (path === '/products') current = 'products';
      
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
        'fixed top-0 inset-x-0 z-50 transition-all duration-200',
        scrolled ? 'py-1' : 'py-2'
      )}
    >
      <nav
        className={cn(
          'mx-auto flex items-center justify-between px-4 sm:px-6 transition-all duration-200 rounded-full',
          scrolled
            ? 'max-w-[1300px] glass-strong py-1.5 border border-black/5 dark:border-white/5'
            : 'max-w-[1300px] bg-transparent py-1'
        )}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <img src="/images/logo.png" alt="Logo" className="h-11 sm:h-12 lg:h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base font-semibold text-[var(--ink-soft)]">
          {LINKS.map((l) => {
            const hasDropdown = l.id === 'technology' || l.id === 'systems';
            const dropdownItems = l.id === 'technology' ? TECH_ITEMS : SYSTEMS_ITEMS;

            return (
              <li key={l.id} className={cn("relative", hasDropdown && "group")}>
                {hasDropdown ? (
                  <>
                    <Link
                      href={l.href || '#'}
                      className={cn(
                        'nav-link transition-colors hover:text-[var(--ink)] whitespace-nowrap flex items-center gap-1.5 py-2',
                        active === l.id && 'is-active text-[var(--ink)] font-bold'
                      )}
                    >
                      {l.label}
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-180 text-zinc-400 group-hover:text-[var(--ink)]" />
                    </Link>
                    
                    {/* Mega Menu Dropdown */}
                    <div className={cn(
                      "absolute top-[100%] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[950px] z-50",
                      l.id === 'systems' ? "left-1/2 -translate-x-[25%]" : "left-1/2 -translate-x-1/2"
                    )}>
                      <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/5 dark:border-white/10 p-5">
                        
                        {/* Grid Items */}
                        <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                          {dropdownItems.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href}
                              className="flex items-start gap-3.5 p-3 rounded-[12px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors group/item"
                            >
                              <div className="bg-white dark:bg-zinc-900 p-2.5 rounded-[10px] border border-black/5 dark:border-white/10 shadow-sm shrink-0 group-hover/item:border-black/10 dark:group-hover/item:border-white/20 transition-colors flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover/item:text-black dark:group-hover/item:text-white transition-colors" />
                              </div>
                              <div className="mt-0.5">
                                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[14px] mb-1 tracking-tight">
                                  {item.title}
                                </h4>
                                <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                      </div>
                    </div>
                  </>
                ) : l.href ? (
                  <Link
                    href={l.href}
                    className={cn(
                      'nav-link transition-colors hover:text-[var(--ink)] whitespace-nowrap',
                      active === l.id && 'is-active text-[var(--ink)] font-bold'
                    )}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => go(l.id)}
                    className={cn(
                      'nav-link transition-colors hover:text-[var(--ink)] whitespace-nowrap',
                      active === l.id && 'is-active text-[var(--ink)] font-bold'
                    )}
                  >
                    {l.label}
                  </button>
                )}
              </li>
            );
          })}
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
          <Link
            href="/pricing"
            className="whitespace-nowrap rounded-full bg-white px-5 xl:px-6 py-2.5 text-sm xl:text-base font-bold text-black dark:text-white shadow-lg shadow-[#0e7c86]/25 transition-transform hover:scale-[1.03] inline-block text-center"
          >
            Book a Demo
          </Link>
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
        <div className="md:hidden mx-4 mt-2 glass-strong rounded-2xl p-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <ul className="flex flex-col gap-1.5">
            {LINKS.map((l) => (
              <li key={l.id} className="w-full">
                {l.id === 'technology' ? (
                  <div className="flex flex-col">
                    <Link
                      href={l.href!}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'block w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-[var(--ink-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--ink)] transition-colors',
                        active === l.id && 'bg-[var(--accent-soft)] text-[var(--ink)] font-bold'
                      )}
                    >
                      {l.label}
                    </Link>
                    <div className="pl-4 mt-1 flex flex-col gap-1 border-l-2 border-black/5 dark:border-white/5 ml-6">
                      {TECH_ITEMS.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="py-2 text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : l.href ? (
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-[var(--ink-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--ink)] transition-colors',
                      active === l.id && 'bg-[var(--accent-soft)] text-[var(--ink)] font-bold'
                    )}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => go(l.id)}
                    className={cn(
                      'w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-[var(--ink-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--ink)] transition-colors',
                      active === l.id && 'bg-[var(--accent-soft)] text-[var(--ink)] font-bold'
                    )}
                  >
                    {l.label}
                  </button>
                )}
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
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="mt-1 w-full block text-center rounded-xl bg-white px-4 py-3 text-base font-bold text-black dark:text-white shadow-lg shadow-[#0e7c86]/25"
              >
                Book a Demo
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}