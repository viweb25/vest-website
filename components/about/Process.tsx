"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    num: "01",
    title: "DISCOVER.",
    text: "We dive deep into your brand, audience, and goals to build a strategic foundation that informs every decision."
  },
  {
    num: "02",
    title: "DESIGN.",
    text: "Our design team crafts intuitive, aesthetic wireframes and prototypes, bringing your vision to visual life."
  },
  {
    num: "03",
    title: "DEVELOP.",
    text: "Using cutting-edge frameworks, we build robust, scalable architectures with pixel-perfect precision."
  },
  {
    num: "04",
    title: "DEPLOY.",
    text: "Rigorous testing and seamless deployment ensure your product launches flawlessly and performs at scale."
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Framer motion scroll progress tracker
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate active stage from scroll position
  const updateStageFromScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable <= 0) return;

    // Progress within the pinned section: 0 to 1
    const currentScroll = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

    let index = 0;
    if (progress < 0.25) {
      index = 0;
    } else if (progress < 0.5) {
      index = 1;
    } else if (progress < 0.75) {
      index = 2;
    } else {
      index = 3;
    }
    setActiveIndex(index);
  }, []);

  // Sync with native/Lenis scroll events for instantaneous frame-level accuracy
  useEffect(() => {
    updateStageFromScroll();
    window.addEventListener('scroll', updateStageFromScroll, { passive: true });
    window.addEventListener('resize', updateStageFromScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateStageFromScroll);
      window.removeEventListener('resize', updateStageFromScroll);
    };
  }, [updateStageFromScroll]);

  // Also bind to Framer Motion's reactive hook
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) {
      setActiveIndex(0);
    } else if (latest < 0.5) {
      setActiveIndex(1);
    } else if (latest < 0.75) {
      setActiveIndex(2);
    } else {
      setActiveIndex(3);
    }
  });

  // Smooth scroll to a target stage when clicking pill indicators or text
  const scrollToStage = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    const targetScroll = scrollTop + rect.top + (index / 3) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Helper styling for kinetic outline/solid typography
  const getTextStyle = (index: number) => {
    const isActive = activeIndex === index;
    return {
      color: isActive ? '#FF4D15' : 'transparent',
      WebkitTextStroke: isActive ? '0px transparent' : '1.5px rgba(255, 77, 21, 0.4)',
      transition: 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1), -webkit-text-stroke 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    };
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-white w-full h-[400vh] selection:bg-[#FF4D15] selection:text-white"
    >
      {/* Sticky Viewport Container - Pins for 4 full viewport scrolls */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10 px-6 sm:px-12 lg:px-20 xl:px-28">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Context Eyebrow & Dynamic Narrative Paragraph */}
          <div className="lg:col-span-5 flex flex-col justify-center z-20">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#E7651A] uppercase font-mono">
                From Vision to Reality
              </span>
            </div>

            {/* Dynamic Description with Cross-Fade */}
            <div className="min-h-[140px] sm:min-h-[160px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-lg sm:text-xl md:text-2xl text-slate-800 font-normal leading-relaxed max-w-lg">
                    {STEPS[activeIndex].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Giant Kinetic Typography Stack (Left-aligned as in reference) */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center select-none pt-4 lg:pt-0">
            <div className="flex flex-col items-start tracking-tight leading-[0.92] uppercase font-black font-sans">

              {/* 1. DISCOVER. */}
              <div
                onClick={() => scrollToStage(0)}
                className="cursor-pointer py-0.5 sm:py-1 text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[115px] 2xl:text-[124px]"
                style={getTextStyle(0)}
              >
                DISCOVER.
              </div>

              {/* 2. DESIGN. */}
              <div
                onClick={() => scrollToStage(1)}
                className="cursor-pointer py-0.5 sm:py-1 text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[115px] 2xl:text-[124px]"
                style={getTextStyle(1)}
              >
                DESIGN.
              </div>

              {/* 3. DEVELOP. */}
              <div
                onClick={() => scrollToStage(2)}
                className="cursor-pointer py-0.5 sm:py-1 text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[115px] 2xl:text-[124px]"
                style={getTextStyle(2)}
              >
                DEVELOP.
              </div>

              {/* 4. DEPLOY. */}
              <div
                onClick={() => scrollToStage(3)}
                className="cursor-pointer py-0.5 sm:py-1 text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[115px] 2xl:text-[124px]"
                style={getTextStyle(3)}
              >
                DEPLOY.
              </div>

            </div>

            {/* Vertical Accent Line (As in Frinks AI reference) */}
            <div className="w-full flex justify-start pl-4 sm:pl-8 lg:pl-12 mt-6 sm:mt-10">
              <motion.div
                animate={{
                  opacity: activeIndex === 3 ? 1 : 0.2,
                  height: activeIndex === 3 ? 72 : 28
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-1 bg-gradient-to-b from-[#FF4D15] to-transparent rounded-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
