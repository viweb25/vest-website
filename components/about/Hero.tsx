"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CUBE_SLIDES = [
  {
    id: 1,
    title: 'Engineering Collaboration',
    category: 'TEAM & LAB',
    image: '/images/about/cube-slide-1.png',
    badge: 'Live Test Rig'
  },
  {
    id: 2,
    title: 'Automated Robotics Cell',
    category: 'HARDWARE AUTOMATION',
    image: '/images/about/cube-slide-2.png',
    badge: 'Industrial Cell'
  },
  {
    id: 3,
    title: 'AI Machine Vision Inspection',
    category: 'QUALITY ASSURANCE',
    image: '/images/about/cube-slide-3.png',
    badge: '99.98% Accuracy'
  },
  {
    id: 4,
    title: 'LabVIEW Metrology System',
    category: 'INSTRUMENTATION',
    image: '/images/about/cube-slide-4.png',
    badge: 'Sub-Micron QA'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play smooth crossfade every 6.5 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CUBE_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <section className="relative bg-white pt-4 pb-8 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Life at VEST Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 z-10"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF4D15] animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-slate-700 uppercase font-mono">
                About Us
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.06] mb-6">
              We Build <br />
              <span className="text-[#FF4D15]">What&apos;s Next.</span>
            </h1>

            {/* Narrative Description */}
            <p className="text-base sm:text-lg md:text-[18px] text-slate-600 leading-relaxed font-normal mb-8 max-w-xl">
              We are a collective of designers, engineers, and strategists crafting digital experiences that transcend the ordinary. Driven by innovation, built for the future.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent hover:bg-transparent border-1.5 border-[#0B2340] hover:border-[#E7651A] text-[#0B2340] hover:text-[#E7651A] text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] rounded-none transition-all active:scale-95 group shadow-none"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4 text-[#0B2340] group-hover:text-[#E7651A] transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#who-we-are"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent hover:bg-transparent border-1.5 border-[#0B2340] hover:border-[#E7651A] text-[#0B2340] hover:text-[#E7651A] text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] rounded-none transition-all active:scale-95 group shadow-none"
              >
                <span>LEARN MORE</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Isometric 3D Tech Cube Slider */}
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-end justify-center relative select-none"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Cube Stage Container */}
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px] aspect-[519/587] flex items-center justify-center group">
              
              {/* Dynamic ambient blur glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D15]/20 via-[#E7651A]/15 to-transparent blur-3xl opacity-60 rounded-full pointer-events-none transform scale-90 transition-opacity duration-700" />
              
              {/* Seamless In-Place Crossfade Transition (zero jump, zero scale, zero blank gap) */}
              <div className="relative w-full h-full">
                {CUBE_SLIDES.map((slide, idx) => (
                  <motion.div
                    key={slide.id}
                    initial={false}
                    animate={{ 
                      opacity: currentSlide === idx ? 1 : 0
                    }}
                    transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 w-full h-full"
                    style={{ pointerEvents: currentSlide === idx ? 'auto' : 'none' }}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={idx === 0}
                      className="object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.12)] select-none"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
