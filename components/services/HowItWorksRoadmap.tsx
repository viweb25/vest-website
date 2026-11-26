'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Step {
  step: number;
  title: string;
  description: string;
  image?: string;
  href?: string;
  tag?: string;
  highlights?: string[];
}

interface HowItWorksData {
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  lead?: string;
  steps?: Step[];
  flowNote?: string;
}

interface HowItWorksRoadmapProps {
  data?: HowItWorksData;
}

const STEP_PHASE_TAGS = [
  'Phase 01 • Architecture Modeling',
  'Phase 02 • Core Architecture',
  'Phase 03 • Hardware Abstraction Layer',
  'Phase 04 • Operator Interface',
  'Phase 05 • Endurance Validation',
  'Phase 06 • Factory Handover',
];

// Continuous Serpentine S-Curve Path (Canvas: 1200 x 3700)
// Matches Frinks AI: Starts below header at center (600, 100),
// sweeps right to Apex 1 (940, 380), sweeps left to Apex 2 (260, 980),
// sweeps right to Apex 3 (940, 1580), sweeps left to Apex 4 (260, 2180),
// sweeps right to Apex 5 (940, 2780), sweeps left to Apex 6 (260, 3380),
// and sweeps down to center exit (600, 3650).
const SERPENTINE_ROAD_PATH =
  'M 600,100 C 600,230 940,250 940,380 C 940,650 260,710 260,980 C 260,1250 940,1310 940,1580 C 940,1850 260,1910 260,2180 C 260,2450 940,2510 940,2780 C 940,3050 260,3110 260,3380 C 260,3510 600,3520 600,3650';

const ROAD_TOTAL_LENGTH = 5492;

export default function HowItWorksRoadmap({ data }: HowItWorksRoadmapProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll position through the section (100% standard Framer Motion offset)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Orange road draws forward as user scrolls through the steps
  const pathOffset = useTransform(
    smoothProgress,
    [0, 0.98],
    [ROAD_TOTAL_LENGTH, 0]
  );

  // If data or steps are not yet available, return null safely
  if (!data || !data.steps || data.steps.length === 0) {
    return null;
  }

  const getStepImage = (step?: Step, idx?: number) => {
    if (step?.image) return step.image;
    return `/how-it-works/step-${(idx ?? 0) + 1}.png`;
  };

  const stepsList = data.steps || [];

  return (
    <section
      ref={containerRef}
      id={data.id || 'how-it-works'}
      className="relative w-full bg-white text-[#172B3A] selection:bg-[#FF6A00]/20 overflow-hidden pt-16 sm:pt-24 pb-20"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. BACKGROUND DECORATIVE ACCENTS (Faint Frinks AI Mesh Wave)
      ────────────────────────────────────────────────────────────── */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] lg:w-[560px] lg:h-[560px] opacity-[0.12] pointer-events-none select-none">
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full stroke-[#FF6A00]">
          <path
            d="M 50,0 C 200,120 350,60 500,180 M 0,60 C 200,180 350,120 500,240 M 0,120 C 200,240 350,180 500,300 M 0,180 C 200,300 350,240 500,360"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="absolute top-32 left-0 w-[300px] h-[300px] opacity-[0.08] pointer-events-none select-none">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full stroke-[#FF6A00]">
          <path
            d="M 0,50 C 100,100 200,50 300,120 M 0,100 C 100,150 200,100 300,170 M 0,150 C 100,200 200,150 300,220"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. SECTION HEADER (Centered, Spacious, Editorial)
      ────────────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-20 relative z-20">
        {data.eyebrow && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/70 font-mono text-xs font-bold uppercase tracking-wider text-[#FF6A00] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
            {data.eyebrow}
          </div>
        )}

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] tracking-[-0.03em] leading-tight">
          {data.heading || 'How It'}{' '}
          <span className="text-[#FF6A00]">{data.headingAccent || 'Operates'}</span>
        </h2>

        <div className="w-16 h-[2px] bg-[var(--ink)] opacity-20 mx-auto my-5" />

        {data.lead && (
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4 font-normal">
            {data.lead}
          </p>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. DESKTOP CONTINUOUS SERPENTINE ROADMAP (hidden md:block)
      ────────────────────────────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto px-6 hidden md:block">
        
        {/* Full-Height Serpentine SVG Track */}
        <svg
          viewBox="0 0 1200 3700"
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Smooth Vibrant Orange Gradient */}
            <linearGradient id="frinksOrangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF7A1A" />
              <stop offset="50%" stopColor="#FF6A00" />
              <stop offset="100%" stopColor="#FF4D00" />
            </linearGradient>

            {/* Subtle Warm Glow Filter */}
            <filter id="roadGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#FF6A00" floodOpacity="0.38" />
            </filter>
          </defs>

          {/* Inactive Grey Base Road (Clean 5px) */}
          <path
            d={SERPENTINE_ROAD_PATH}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Active Scroll-Driven Orange Road */}
          <motion.path
            d={SERPENTINE_ROAD_PATH}
            fill="none"
            stroke="url(#frinksOrangeGrad)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#roadGlow)"
            style={{
              strokeDasharray: ROAD_TOTAL_LENGTH,
              strokeDashoffset: pathOffset,
            }}
          />
        </svg>

        {/* Alternating Step Rows */}
        <div className="relative z-20 flex flex-col">
          {stepsList.slice(0, 6).map((step, idx) => {
            const stepNum = idx + 1;
            const isOdd = stepNum % 2 !== 0; // Steps 1, 3, 5: Left text. Steps 2, 4, 6: Right text.
            const formattedNum = String(stepNum).padStart(2, '0');
            const phaseTag = STEP_PHASE_TAGS[idx] || `Phase 0${stepNum}`;
            const stepImage = getStepImage(step, idx);

            return (
              <div
                key={`desktop-step-${stepNum}`}
                className="min-h-[580px] lg:min-h-[600px] flex items-center"
              >
                <div className="grid grid-cols-2 gap-12 lg:gap-16 w-full items-center">
                  
                  {/* Left Column */}
                  {isOdd ? (
                    // Odd Steps (01, 03, 05): Content on Left
                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.35 }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-lg pl-6 lg:pl-12 pr-4"
                    >
                      {/* Top Header: Huge Number + 3D Hardware Model */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-7xl lg:text-8xl font-medium tracking-tight text-[#172B3A] select-none">
                          {formattedNum}
                        </span>
                        <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0">
                          <Image
                            src={stepImage}
                            alt={step.title}
                            fill
                            className="object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                            sizes="128px"
                          />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-[var(--ink)] tracking-[-0.02em] mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                        {step.description}
                      </p>

                      {/* Phase Badge */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)] shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                        {phaseTag}
                      </div>
                    </motion.div>
                  ) : (
                    // Even Steps (02, 04, 06): Left side is open for road loop
                    <div className="w-full" aria-hidden="true" />
                  )}

                  {/* Right Column */}
                  {!isOdd ? (
                    // Even Steps (02, 04, 06): Content on Right
                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.35 }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-lg pl-8 lg:pl-16 pr-4"
                    >
                      {/* Top Header: Huge Orange Number + 3D Hardware Model */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display text-7xl lg:text-8xl font-medium tracking-tight text-[#FF6A00] select-none">
                          {formattedNum}
                        </span>
                        <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0">
                          <Image
                            src={stepImage}
                            alt={step.title}
                            fill
                            className="object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                            sizes="128px"
                          />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-[var(--ink)] tracking-[-0.02em] mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                        {step.description}
                      </p>

                      {/* Phase Badge */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/90 font-mono text-xs font-bold uppercase tracking-wider text-orange-900 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                        {phaseTag}
                      </div>
                    </motion.div>
                  ) : (
                    // Odd Steps (01, 03, 05): Right side is open for road loop
                    <div className="w-full" aria-hidden="true" />
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. MOBILE CLEAN VERTICAL PIPELINE (block md:hidden)
      ────────────────────────────────────────────────────────────── */}
      <div className="relative max-w-xl mx-auto px-6 block md:hidden">
        {/* Vertical Orange Accent Guide Line */}
        <div className="absolute top-4 bottom-4 left-9 w-0.5 bg-gradient-to-b from-[#FF6A00] via-[#FF6A00]/40 to-slate-200" />

        <div className="space-y-12 relative z-10">
          {stepsList.map((step, idx) => {
            const stepNum = idx + 1;
            const formattedNum = String(stepNum).padStart(2, '0');
            const isEven = stepNum % 2 === 0;
            const stepImage = getStepImage(step, idx);
            const phaseTag = STEP_PHASE_TAGS[idx] || `Phase 0${stepNum}`;

            return (
              <motion.div
                key={`mobile-step-${stepNum}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="pl-14 relative"
              >
                {/* Milestone Node on Guide Line */}
                <div className="absolute left-1 top-2 w-5 h-5 rounded-full bg-white border-2 border-[#FF6A00] flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-5xl font-medium tracking-tight ${
                      isEven ? 'text-[#FF6A00]' : 'text-[#172B3A]'
                    }`}
                  >
                    {formattedNum}
                  </span>
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={stepImage}
                      alt={step.title}
                      fill
                      className="object-contain filter drop-shadow-sm"
                      sizes="64px"
                    />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 font-normal">{step.description}</p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--ink)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                  {phaseTag}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. BOTTOM CONCLUSION BANNER (Frinks AI Ending Style)
      ────────────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto text-center pt-16 sm:pt-24 px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 font-mono text-xs font-bold uppercase tracking-wider text-[#FF6A00] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
            Full Lifecycle Software Engineering
          </div>

          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--ink)] tracking-[-0.03em] mb-3">
            Deterministic, 24/7 Factory-Floor Execution
          </h3>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
            {data.flowNote ||
              'Hardware Drivers → Hardware Abstraction Layer → Business Logic Engine → UI Message Broker → Operator Front Panel'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
