'use client';

import React from 'react';
import { motion } from 'framer-motion';
import UniqueLaurelBranch from '@/components/site/UniqueLaurelBranch';

const logos = [
  { name: 'Logo 1', icon: <img src="/1.png" alt="Logo 1" className="h-14 sm:h-16 w-auto object-contain" /> },
  { name: 'Logo 2', icon: <img src="/2.png" alt="Logo 2" className="h-14 sm:h-16 w-auto object-contain" /> },
  { name: 'Logo 3', icon: <img src="/3.webp" alt="Logo 3" className="h-14 sm:h-16 w-auto object-contain" /> },
  { name: 'Logo 4', icon: <img src="/4.png" alt="Logo 4" className="h-14 sm:h-16 w-auto object-contain" /> },
  { name: 'Logo 5', icon: <img src="/5.png" alt="Logo 5" className="h-14 sm:h-16 w-auto object-contain" /> },
  { name: 'Napcen', icon: <img src="/Napcen-logo.webp" alt="Napcen Logo" className="h-14 sm:h-16 w-auto object-contain" /> },
  { name: 'Logo Transparent', icon: <img src="/logo-transparent.png" alt="Transparent Logo" className="h-14 sm:h-16 w-auto object-contain" /> },
];

export default function LogoTicker() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 overflow-hidden relative border-b border-slate-100">
      {/* Title Label with Subtle Orange Dots */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E7651A]" />
          <p className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.25em] text-[#536578]">
            TRUSTED BY INDUSTRY LEADERS &amp; GLOBAL ENTERPRISES
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E7651A]" />
        </div>
      </div>

      {/* Marquee Wrapper Framed by Unique Laurel Branches */}
      <div className="relative flex flex-col gap-8 overflow-hidden w-full group py-2">
        {/* Left/Right Smooth Fades Behind Laurel */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-40 sm:w-60 md:w-80 bg-gradient-to-r from-white from-25% via-white/95 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-40 sm:w-60 md:w-80 bg-gradient-to-l from-white from-25% via-white/95 to-transparent z-10" />

        {/* Left Laurel Branch Emblem */}
        <div className="absolute left-3 sm:left-8 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <UniqueLaurelBranch side="left" height={200} className="scale-80 sm:scale-90 md:scale-100 lg:scale-105 origin-left" />
        </div>

        {/* Right Laurel Branch Emblem */}
        <div className="absolute right-3 sm:right-8 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <UniqueLaurelBranch side="right" height={200} className="scale-80 sm:scale-90 md:scale-100 lg:scale-105 origin-right" />
        </div>

        {/* First Row (Left to Right) */}
        <motion.div
          className="flex flex-nowrap items-center gap-16 md:gap-24 pl-16 md:pl-24 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 30, // Adjust speed here
            repeat: Infinity,
          }}
        >
          {/* Double the logos to create an infinite loop effect */}
          {[...logos, ...logos].map((logo, idx) => (
            <div
              key={`row1-${idx}`}
              className="flex flex-col md:flex-row items-center gap-3 text-slate-400 opacity-60 hover:opacity-100 hover:text-black transition-all duration-300 shrink-0 grayscale hover:grayscale-0"
            >
              {logo.icon}
            </div>
          ))}
        </motion.div>

        {/* Second Row (Right to Left) */}
        <motion.div
          className="flex flex-nowrap items-center gap-16 md:gap-24 pl-16 md:pl-24 w-max"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            ease: 'linear',
            duration: 32, // Adjust speed here
            repeat: Infinity,
          }}
        >
          {/* Double the logos, reversed for variety */}
          {[...[...logos].reverse(), ...[...logos].reverse()].map((logo, idx) => (
            <div
              key={`row2-${idx}`}
              className="flex flex-col md:flex-row items-center gap-3 text-slate-400 opacity-60 hover:opacity-100 hover:text-black transition-all duration-300 shrink-0 grayscale hover:grayscale-0"
            >
              {logo.icon}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
