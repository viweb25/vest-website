'use client';

import { useEffect, useState, useRef } from 'react';
import { Menu, X, Globe, Code, Smartphone, Cpu, TrendingUp, ChevronDown, HardHat, Layers, FileText, Database, User, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { scrollToId } from '@/hooks/use-lenis';
import { LoginModal } from '@/components/site/LoginModal';
import { ProfileModal } from '@/components/site/ProfileModal';
import { UserProfileDropdown } from '@/components/site/UserProfileDropdown';
import { useAuth } from '@/providers/AuthProvider';

const LINKS = [
  { id: 'engineering', label: 'Engineering', href: '/services/engineering' },
  { id: 'systems', label: 'Systems', href: '/services/systems' },
  { id: 'technology', label: 'Technology', href: '/services/technology' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'about', label: 'About Us', href: '/about' },
  { id: 'blog', label: 'Blog', href: '/blogs' },
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
    href: '/services/labview-engineering',
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
  const [isVisible, setIsVisible] = useState(true);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const isHoveredRef = useRef(false);
  const isOpenRef = useRef(open);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    isOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      setIsVisible(true);

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
      else if (path.startsWith('/blogs')) current = 'blog';
      else if (path === '/products') current = 'products';
      else if (path.startsWith('/services/engineering') || path === '/engineering') current = 'engineering';
      else if (path === '/services/labview-engineering' || path === '/labview-engineering' || path === '/labview-solutions') current = 'systems';

      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      onMouseEnter={() => {
        isHoveredRef.current = true;
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        window.dispatchEvent(new Event('scroll'));
      }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled ? 'py-1' : 'py-2',
        !isVisible && !open ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
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
          prefetch={true}
          className="flex items-center gap-2 transition-opacity hover:opacity-85"
        >
          <Image src="/images/logo.png" alt="Logo" width={120} height={40} className="h-8 sm:h-9 lg:h-10 w-auto object-contain" priority />
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
                      prefetch={true}
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
                              prefetch={true}
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
                    prefetch={true}
                    className={cn(
                      'nav-link transition-colors text-[#0B2340] hover:text-[#E7651A] whitespace-nowrap font-medium',
                      active === l.id && 'is-active text-[#E7651A] font-bold'
                    )}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => go(l.id)}
                    className={cn(
                      'nav-link transition-colors text-[#0B2340] hover:text-[#E7651A] whitespace-nowrap font-medium',
                      active === l.id && 'is-active text-[#E7651A] font-bold'
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
          <Link
            href="/pricing"
            prefetch={true}
            className="whitespace-nowrap bg-transparent hover:bg-transparent text-[#0B2340] hover:text-[#E7651A] border-1.5 border-[#0B2340] hover:border-[#E7651A] px-5 xl:px-6 py-2.5 text-xs xl:text-sm font-extrabold uppercase tracking-[0.12em] rounded-none transition-all inline-flex items-center gap-2 text-center shadow-none active:scale-95 group"
          >
            <span>Book a Demo</span>
            <ArrowUpRight className="size-3.5 text-[#0B2340] group-hover:text-[#E7651A] transition-colors" strokeWidth={2.5} />
          </Link>

          {/* Profile Icon on the right side of Book a Demo */}
          {isAuthenticated && user ? (
            <UserProfileDropdown />
          ) : (
            <LoginModal>
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm hover:ring-2 hover:ring-[#1D79C5]/40 hover:border-[#1D79C5]/50 transition-all flex items-center justify-center cursor-pointer text-slate-700 dark:text-zinc-200 hover:text-[#1D79C5] shrink-0"
                title="Account / Sign In"
                aria-label="Account Profile"
              >
                <User className="w-5 h-5" />
              </button>
            </LoginModal>
          )}
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
                {l.id === 'technology' || l.id === 'systems' ? (
                  <div className="flex flex-col">
                    <Link
                      href={l.href!}
                      prefetch={true}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'block w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-[var(--ink-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--ink)] transition-colors',
                        active === l.id && 'bg-[var(--accent-soft)] text-[var(--ink)] font-bold'
                      )}
                    >
                      {l.label}
                    </Link>
                    <div className="pl-4 mt-1 flex flex-col gap-1 border-l-2 border-black/5 dark:border-white/5 ml-6">
                      {(l.id === 'technology' ? TECH_ITEMS : SYSTEMS_ITEMS).map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          prefetch={true}
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
                    prefetch={true}
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
              </div>
            </li>
            <li>
              {isAuthenticated && user ? (
                <div className="p-3 bg-white/70 dark:bg-zinc-900/70 rounded-2xl border border-black/5 dark:border-white/10 mb-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 dark:bg-zinc-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                      {(user.name || user.email).slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-sm text-[var(--ink)] truncate">
                        {user.name || user.email.split('@')[0]}
                      </div>
                      <div className="text-xs text-[var(--ink-soft)] truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-black/5 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileProfileOpen(true);
                        setOpen(false);
                      }}
                      className="py-2 px-3 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-bold text-[var(--ink)] text-center hover:bg-black/10 transition-colors"
                    >
                      Profile Details
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="py-2 px-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold text-center hover:bg-red-500/20 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <LoginModal>
                  <button className="block w-full text-center rounded-none border border-[#0B2340] bg-white px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-[#0B2340] transition-colors mb-2">
                    Login / Sign In
                  </button>
                </LoginModal>
              )}
              <Link
                href="/pricing"
                prefetch={true}
                onClick={() => setOpen(false)}
                className="mt-1 w-full flex items-center justify-center gap-2 text-center rounded-none border-1.5 border-[#0B2340] hover:border-[#E7651A] bg-transparent hover:bg-transparent px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-[#0B2340] hover:text-[#E7651A] transition-all group"
              >
                <span>Book a Demo</span>
                <ArrowUpRight className="size-4 text-[#0B2340] group-hover:text-[#E7651A] transition-colors" strokeWidth={2.5} />
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Profile Details Modal */}
      <ProfileModal open={mobileProfileOpen} onOpenChange={setMobileProfileOpen} />
    </header>
  );
}
