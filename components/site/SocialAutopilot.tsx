'use client';

import {
  Sparkles,
  Clock,
  TrendingUp,
  Globe2,
  FileText,
  Bot,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import TiltCard from '@/components/three/TiltCard';

const STEPS = [
  {
    num: '01',
    icon: FileText,
    title: 'You Share Your Business Details',
    desc: "Tell us what you sell, drop in your website link, or describe your target audience. That's all we need from you.",
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    num: '02',
    icon: Bot,
    title: 'Our AI System Gets to Work',
    desc: 'Our system analyzes your brand, understands who your buyers are, designs eye-catching graphics, and writes high-converting captions — automatically.',
    color: 'text-[var(--accent)]',
    bg: 'bg-[var(--accent-soft)]',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Your Social Media Grows on Autopilot',
    desc: 'Your posts are published across all your social channels at the best times to get views, likes, and customers.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
];

const BENEFITS = [
  {
    icon: Sparkles,
    title: 'Zero Content Stress',
    desc: "You don't need to write a single word or design a single graphic.",
  },
  {
    icon: Clock,
    title: 'Always On Time',
    desc: 'Fresh, professional posts go out consistently, keeping your business top-of-mind.',
  },
  {
    icon: TrendingUp,
    title: 'Smart Audience Growth',
    desc: 'Content tailored specifically to attract and convert the people most likely to buy from you.',
  },
  {
    icon: Globe2,
    title: 'All Your Channels Covered',
    desc: 'Instagram, LinkedIn, Facebook, and more — managed seamlessly from one place.',
  },
];



export default function SocialAutopilot() {
  return (
    <section id="services" className="relative py-10 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* ── Header ── */}
        <div className="max-w-3xl mb-16">
          <p className="reveal text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
            Services &amp; Solutions
          </p>
          <h2 className="reveal display text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)]">
            Your social media on{' '}
            <span className="text-gradient">autopilot</span>
          </h2>
          <p className="reveal body-copy text-[var(--ink-soft)] mt-4 max-w-xl">
            No more struggling for post ideas. No more spending hours on
            graphics. No more missed posting days — just share a few quick
            details and our smart AI system takes over your{' '}
            <strong className="text-[var(--ink)] font-semibold">
              entire social media marketing.
            </strong>
          </p>
        </div>

        {/* ── How It Works – 3 Steps ── */}
        <div className="reveal mb-20">
          <p className="text-xs text-center uppercase tracking-[0.3em] text-[var(--accent)] mb-8 font-semibold">
            How Simple It Is For You
          </p>

          {/* Wrapper with floating logos */}
          <div className="relative">


            {/* Steps grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-10 relative z-10">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <TiltCard
                    key={i}
                    className="flex flex-col h-full"
                  >
                    <div className="relative z-10 flex h-full flex-col">
                      {/* Step number + icon */}
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${s.bg} ${s.color}`}
                        >
                          <Icon size={20} />
                        </div>
                        <span className="text-xs font-bold tracking-widest text-[var(--ink-muted)]">
                          STEP {s.num}
                        </span>
                      </div>

                      <h3 className="font-display font-semibold text-lg text-[var(--ink)] mb-2 leading-snug">
                        {s.title}
                      </h3>
                      <p className="body-copy text-sm text-[var(--ink-soft)]">
                        {s.desc}
                      </p>

                    </div>
                    {/* Arrow connector (desktop) */}
                    {i < STEPS.length - 1 && (
                      <div className="hidden md:flex absolute right-[-34px] top-1/2 -translate-y-1/2 z-20 h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                        <ArrowRight size={14} />
                      </div>
                    )}
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating logo animations */}
        <style jsx>{`
          @keyframes socialFloat1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-14px) rotate(6deg); }
          }
          @keyframes socialFloat2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(20px) rotate(5deg); }
          }
          @keyframes socialFloat3 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-10px) translateX(8px); }
            66% { transform: translateY(-16px) translateX(-4px); }
          }
          @keyframes socialFloat4 {
            0%, 100% { transform: translateY(-50%) translateX(0px); }
            50% { transform: translateY(calc(-50% - 12px)) translateX(-6px); }
          }
          @keyframes socialFloat5 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(4deg); }
          }
          @keyframes socialFloat6 {
            0%, 100% { transform: translateY(-50%) rotate(0deg); }
            50% { transform: translateY(calc(-50% + 12px)) rotate(-4deg); }
          }
        `}</style>

        {/* ── Everything Taken Care Of – Benefits ── */}
        <div className="reveal mb-20">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-8 font-semibold">
            Everything Taken Care Of
          </p>

          {/* Wrapper with floating logos */}
          <div className="relative">
            {/* ── Floating social logos ── */}
            <div className="pointer-events-none absolute inset-0 -inset-x-6 sm:-inset-x-10 overflow-hidden">
              {/* LinkedIn - top left */}
              <div
                className="absolute top-0 left-2 sm:left-8 opacity-[0.15] dark:opacity-[0.2]"
                style={{ animation: 'socialFloat2 6.5s ease-in-out infinite' }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>

              {/* YouTube - top right */}
              <div
                className="absolute top-5 right-10 sm:right-16 opacity-[0.15] dark:opacity-[0.2]"
                style={{ animation: 'socialFloat5 7s ease-in-out infinite' }}
              >
                <svg width="32" height="22" viewBox="0 0 24 17" fill="none">
                  <path d="M23.498 2.186A3.016 3.016 0 0021.38.068C19.505-.389 12-.389 12-.389S4.495-.389 2.62.068A3.016 3.016 0 00.502 2.186C.066 4.062.066 8 .066 8s0 3.938.436 5.814a3.016 3.016 0 002.118 2.118C4.495 16.389 12 16.389 12 16.389s7.505 0 9.38-.457a3.016 3.016 0 002.118-2.118C23.934 11.938 23.934 8 23.934 8s0-3.938-.436-5.814z" fill="#FF0000" />
                  <path d="M9.545 11.568V4.432L15.818 8l-6.273 3.568z" fill="#fff" />
                </svg>
              </div>

              {/* Facebook - middle left */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-8 lg:left-16 opacity-[0.12] dark:opacity-[0.18]"
                style={{ animation: 'socialFloat3 8s ease-in-out infinite' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>

              {/* X (Twitter) - middle right */}
              <div
                className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-2 opacity-[0.12] dark:opacity-[0.18]"
                style={{ animation: 'socialFloat4 5.5s ease-in-out infinite' }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--ink)]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>

              {/* Instagram - bottom right */}
              <div
                className="absolute bottom-4 right-4 sm:right-14 opacity-[0.15] dark:opacity-[0.2]"
                style={{ animation: 'socialFloat1 6s ease-in-out infinite' }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <radialGradient id="igf" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#fdf497" />
                      <stop offset="5%" stopColor="#fdf497" />
                      <stop offset="45%" stopColor="#fd5949" />
                      <stop offset="60%" stopColor="#d6249f" />
                      <stop offset="90%" stopColor="#285AEB" />
                    </radialGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#igf)" strokeWidth="2" fill="none" />
                  <circle cx="12" cy="12" r="4.5" stroke="url(#igf)" strokeWidth="2" fill="none" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="url(#igf)" />
                </svg>
              </div>

              {/* LinkedIn (small) - bottom left */}
              <div
                className="absolute bottom-4 left-4 sm:left-10 opacity-[0.1] dark:opacity-[0.15]"
                style={{ animation: 'socialFloat6 7.5s ease-in-out infinite' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>

              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.15] dark:opacity-[0.2]"
                style={{ animation: 'socialFloat1 6s ease-in-out infinite' }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <radialGradient id="igf" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#fdf497" />
                      <stop offset="5%" stopColor="#fdf497" />
                      <stop offset="45%" stopColor="#fd5949" />
                      <stop offset="60%" stopColor="#d6249f" />
                      <stop offset="90%" stopColor="#285AEB" />
                    </radialGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#igf)" strokeWidth="2" fill="none" />
                  <circle cx="12" cy="12" r="4.5" stroke="url(#igf)" strokeWidth="2" fill="none" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="url(#igf)" />
                </svg>
              </div>

              {/* YouTube (duplicate) - center gap */}
              <div
                className="absolute top-[54%] left-[30%] -translate-y-1/2 opacity-[0.15] dark:opacity-[0.2]"
                style={{ animation: 'socialFloat5 7.5s ease-in-out infinite' }}
              >
                <svg width="32" height="22" viewBox="0 0 24 17" fill="none">
                  <path d="M23.498 2.186A3.016 3.016 0 0021.38.068C19.505-.389 12-.389 12-.389S4.495-.389 2.62.068A3.016 3.016 0 00.502 2.186C.066 4.062.066 8 .066 8s0 3.938.436 5.814a3.016 3.016 0 002.118 2.118C4.495 16.389 12 16.389 12 16.389s7.505 0 9.38-.457a3.016 3.016 0 002.118-2.118C23.934 11.938 23.934 8 23.934 8s0-3.938-.436-5.814z" fill="#FF0000" />
                  <path d="M9.545 11.568V4.432L15.818 8l-6.273 3.568z" fill="#fff" />
                </svg>
              </div>
            </div>

            {/* Benefits grid */}
            <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto relative z-10">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="glass rounded-3xl p-7 flex items-start gap-5"
                  >
                    <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-lg text-[var(--ink)] mb-1 leading-snug">
                        {b.title}
                      </h4>
                      <p className="body-copy text-sm text-[var(--ink-soft)]">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Platforms Strip ── */}
        <div className="reveal mb-16 md:hidden">
          <p className="text-xs text-center uppercase tracking-[0.3em] text-[var(--accent)] mb-6 font-semibold">
            Platforms We Manage
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            {/* Instagram */}
            <span className="glass rounded-2xl px-5 py-3 inline-flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <defs>
                  <radialGradient id="ig1" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#fdf497" />
                    <stop offset="5%" stopColor="#fdf497" />
                    <stop offset="45%" stopColor="#fd5949" />
                    <stop offset="60%" stopColor="#d6249f" />
                    <stop offset="90%" stopColor="#285AEB" />
                  </radialGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#ig1)" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="4.5" stroke="url(#ig1)" strokeWidth="2" fill="none" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig1)" />
              </svg>
              <span className="text-sm font-medium text-[var(--ink)]">Instagram</span>
            </span>

            {/* LinkedIn */}
            <span className="glass rounded-2xl px-5 py-3 inline-flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-sm font-medium text-[var(--ink)]">LinkedIn</span>
            </span>

            {/* Facebook */}
            <span className="glass rounded-2xl px-5 py-3 inline-flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium text-[var(--ink)]">Facebook</span>
            </span>

            {/* X (Twitter) */}
            <span className="glass rounded-2xl px-5 py-3 inline-flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--ink)]">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm font-medium text-[var(--ink)]">X (Twitter)</span>
            </span>

            {/* YouTube */}
            <span className="glass rounded-2xl px-5 py-3 inline-flex items-center gap-3">
              <svg width="24" height="18" viewBox="0 0 24 17" fill="none">
                <path d="M23.498 2.186A3.016 3.016 0 0021.38.068C19.505-.389 12-.389 12-.389S4.495-.389 2.62.068A3.016 3.016 0 00.502 2.186C.066 4.062.066 8 .066 8s0 3.938.436 5.814a3.016 3.016 0 002.118 2.118C4.495 16.389 12 16.389 12 16.389s7.505 0 9.38-.457a3.016 3.016 0 002.118-2.118C23.934 11.938 23.934 8 23.934 8s0-3.938-.436-5.814z" fill="#FF0000" />
                <path d="M9.545 11.568V4.432L15.818 8l-6.273 3.568z" fill="#fff" />
              </svg>
              <span className="text-sm font-medium text-[var(--ink)]">YouTube</span>
            </span>
          </div>
        </div>

        {/* ── CTA strip ── */}
        <div className="reveal glass-strong rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-[var(--ink)] mb-1">
              Ready to put your social media on autopilot?
            </h3>
            <p className="body-copy text-sm text-[var(--ink-soft)]">
              Get started in minutes — no design or marketing skills needed.
            </p>
          </div>
          <button
            onClick={() =>
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-black dark:text-white shadow-lg shadow-[#0e7c86]/25 transition-transform hover:scale-[1.03]"
          >
            <Sparkles size={16} className="text-[var(--accent)]" />
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
}
