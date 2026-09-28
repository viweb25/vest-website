'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, Activity, Globe, Box, Target, Layers } from 'lucide-react';

const logos = [
  { name: 'National Instruments', icon: <Cpu size={28} /> },
  { name: 'Siemens', icon: <Activity size={28} /> },
  { name: 'Texas Instruments', icon: <Zap size={28} /> },
  { name: 'Bosch', icon: <ShieldCheck size={28} /> },
  { name: 'Ford', icon: <Target size={28} /> },
  { name: 'General Electric', icon: <Globe size={28} /> },
  { name: 'Honeywell', icon: <Layers size={28} /> },
  { name: 'ABB', icon: <Box size={28} /> },
];

export default function LogoTicker() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12 md:mb-16">
        <p className="text-[11px] font-bold tracking-[0.25em] text-slate-400 uppercase mb-4">
          In Good Company
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
          A few of the brands we've grown alongside
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative flex overflow-x-hidden w-full group">
        {/* Left/Right Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex flex-nowrap items-center gap-16 md:gap-24 pl-16 md:pl-24"
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
              key={idx} 
              className="flex flex-col md:flex-row items-center gap-3 text-slate-400 opacity-60 hover:opacity-100 hover:text-black transition-all duration-300 shrink-0 grayscale hover:grayscale-0"
            >
              {logo.icon}
              <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
