'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, Activity, Globe, Box, Target, Layers } from 'lucide-react';

const logos = [
  { name: 'Logo 1', icon: <img src="/1.png" alt="Logo 1" className="h-16 w-auto object-contain" /> },
  { name: 'Logo 2', icon: <img src="/2.png" alt="Logo 2" className="h-16 w-auto object-contain" /> },
  { name: 'Logo 3', icon: <img src="/3.webp" alt="Logo 3" className="h-16 w-auto object-contain" /> },
  { name: 'Logo 4', icon: <img src="/4.png" alt="Logo 4" className="h-16 w-auto object-contain" /> },
  { name: 'Logo 5', icon: <img src="/5.png" alt="Logo 5" className="h-16 w-auto object-contain" /> },
  { name: 'Napcen', icon: <img src="/Napcen-logo.webp" alt="Napcen Logo" className="h-16 w-auto object-contain" /> },
  { name: 'Logo Transparent', icon: <img src="/logo-transparent.png" alt="Transparent Logo" className="h-16 w-auto object-contain" /> },
];

export default function LogoTicker() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden border-b border-zinc-100">
      {/* <div className="max-w-7xl mx-auto px-6 text-center mb-12 md:mb-16">
        <p className="text-[11px] font-bold tracking-[0.25em] text-slate-400 uppercase mb-4">
          In Good Company
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
          A few of the brands we've grown alongside
        </h2>
      </div> */}

      {/* Marquee Wrapper */}
      <div className="relative flex flex-col gap-10 overflow-hidden w-full group">
        {/* Left/Right Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />

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
            duration: 30, // Adjust speed here
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
