'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lead: string;
  steps: Step[];
  flowNote?: string;
}

interface HowItWorksSliderProps {
  data: HowItWorksData;
}

interface CardTheme {
  gradient: string;
  image: string;
  linkText: string;
}

const CARD_THEMES: Record<number, CardTheme> = {
  1: {
    gradient: 'from-[#E1658A] via-[#DD876C] to-[#DEA057]',
    image: '/how-it-works/step-1.png',
    linkText: 'Explore more',
  },
  2: {
    gradient: 'from-[#B092E3] via-[#AD8DE0] to-[#9E7DE0]',
    image: '/how-it-works/step-2.png',
    linkText: 'Explore more',
  },
  3: {
    gradient: 'from-[#45CEBE] via-[#44C8CC] to-[#44C1D5]',
    image: '/how-it-works/step-3.png',
    linkText: 'Explore more',
  },
  4: {
    gradient: 'from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]',
    image: '/how-it-works/step-4.png',
    linkText: 'Explore more',
  },
  5: {
    gradient: 'from-[#10B981] via-[#059669] to-[#047857]',
    image: '/how-it-works/step-5.png',
    linkText: 'Explore more',
  },
  6: {
    gradient: 'from-[#F59E0B] via-[#D97706] to-[#B45309]',
    image: '/how-it-works/step-6.png',
    linkText: 'Explore more',
  },
  7: {
    gradient: 'from-[#EC4899] via-[#E11D48] to-[#BE123C]',
    image: '/how-it-works/step-1.png',
    linkText: 'Explore more',
  },
  8: {
    gradient: 'from-[#6366F1] via-[#4F46E5] to-[#4338CA]',
    image: '/how-it-works/step-2.png',
    linkText: 'Explore more',
  },
};

export default function HowItWorksSlider({ data }: HowItWorksSliderProps) {
  const scrollContainerRef = useRef<any>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);

    const cardWidth = 400 + 24; // card width + gap
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIdx(Math.min(Math.max(index, 0), data.steps.length - 1));
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [data.steps.length]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector(':scope > div') as HTMLElement | null;
    const stepWidth = firstCard ? firstCard.offsetWidth + 28 : 440;
    const scrollAmount = direction === 'left' ? -stepWidth : stepWidth;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollToIndex = (idx: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector(':scope > div') as HTMLElement | null;
    const stepWidth = firstCard ? firstCard.offsetWidth + 28 : 440;
    el.scrollTo({ left: idx * stepWidth, behavior: 'smooth' });
  };

  return (
    <section id={data.id || 'flow'} className="py-12 sm:py-20 md:py-28 lg:py-32 bg-white relative z-20 overflow-hidden border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        {/* Header & Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 sm:mb-12 md:mb-16"
        >
          <div className="max-w-3xl">
            <div className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#E7651A] mb-3">
              {data.eyebrow || 'HOW IT WORKS'}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-[-0.03em] leading-tight">
              {data.heading} <span className="text-[var(--ink)]">{data.headingAccent}</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4 max-w-2xl font-normal">
              {data.lead}
            </p>
          </div>

          {/* Desktop Navigation Chevrons */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-semibold text-slate-600 mr-2 tabular-nums" suppressHydrationWarning>
              0{activeIdx + 1} / 0{data.steps.length}
            </span>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous step"
              className={`w-12 h-12 rounded-none border-1.5 border-[#0B2340] bg-white text-[#0B2340] flex items-center justify-center transition-all ${!canScrollLeft
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-[#0B2340] hover:text-white cursor-pointer active:scale-95'
                }`}
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next step"
              className={`w-12 h-12 rounded-none border-1.5 border-[#0B2340] bg-white text-[#0B2340] flex items-center justify-center transition-all ${!canScrollRight
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-[#0B2340] hover:text-white cursor-pointer active:scale-95'
                }`}
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>

        {/* Horizontal Slider Track */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 sm:gap-7 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.steps.map((st, i) => {
            const stepNum = st.step || i + 1;
            const theme = CARD_THEMES[stepNum] || CARD_THEMES[1];
            const isImageTop = stepNum % 2 !== 0; // 1, 3, 5: Image Top; 2, 4, 6: Image Bottom
            const stepImage = st.image || theme.image;

            return (
              <div
                key={st.step}
                className={`w-[320px] sm:w-[370px] md:w-[400px] lg:w-[420px] h-[600px] sm:h-[650px] md:h-[680px] lg:h-[700px] shrink-0 rounded-[32px] sm:rounded-[36px] overflow-hidden flex flex-col justify-between p-7 sm:p-8 lg:p-9 text-white relative shadow-xl shadow-slate-200/70 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group select-none snap-start bg-gradient-to-b ${theme.gradient}`}
              >
                {/* Subtle Overlay Glow for depth */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {isImageTop ? (
                  <>
                    {/* Top 3D Hardware Image (Large, prominent, zero clipping on desktop/mobile) */}
                    <div className="relative h-[290px] sm:h-[330px] md:h-[350px] lg:h-[370px] w-full flex items-center justify-center">
                      <img
                        src={stepImage}
                        alt={`${st.title} - Hardware Render`}
                        className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Bottom Content Box */}
                    <div className="flex flex-col justify-end flex-1 mt-3">
                      {st.tag && (
                        <div className="mb-2">
                          <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                            {st.tag}
                          </span>
                        </div>
                      )}
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-white leading-[1.15] mb-2.5">
                        {st.title}
                      </h3>
                      <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal line-clamp-3 sm:line-clamp-4 mb-3">
                        {st.description}
                      </p>
                      {st.highlights && st.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3 font-mono">
                          {st.highlights.map((h, hIdx) => (
                            <span key={hIdx} className="text-[11px] font-medium bg-black/15 text-white/95 px-2 py-0.5 rounded-md">
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                      <div>
                        {st.href ? (
                          <a
                            href={st.href}
                            className="inline-flex items-center gap-1.5 text-white font-mono font-bold uppercase tracking-wider text-xs sm:text-sm underline underline-offset-4 decoration-white/80 group-hover:decoration-white transition-all cursor-pointer"
                          >
                            <span>{theme.linkText}</span>
                            <ArrowUpRight size={18} strokeWidth={2.2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-white font-mono font-bold uppercase tracking-wider text-xs sm:text-sm underline underline-offset-4 decoration-white/80 group-hover:decoration-white transition-all cursor-pointer">
                            <span>{theme.linkText}</span>
                            <ArrowUpRight size={18} strokeWidth={2.2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Top Content Box */}
                    <div className="flex flex-col justify-start">
                      {st.tag && (
                        <div className="mb-2">
                          <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                            {st.tag}
                          </span>
                        </div>
                      )}
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-white leading-[1.15] mb-2.5">
                        {st.title}
                      </h3>
                      <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal line-clamp-3 sm:line-clamp-4 mb-3">
                        {st.description}
                      </p>
                      {st.highlights && st.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3 font-mono">
                          {st.highlights.map((h, hIdx) => (
                            <span key={hIdx} className="text-[11px] font-medium bg-black/15 text-white/95 px-2 py-0.5 rounded-md">
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                      <div>
                        {st.href ? (
                          <a
                            href={st.href}
                            className="inline-flex items-center gap-1.5 text-white font-mono font-bold uppercase tracking-wider text-xs sm:text-sm underline underline-offset-4 decoration-white/80 group-hover:decoration-white transition-all cursor-pointer"
                          >
                            <span>{theme.linkText}</span>
                            <ArrowUpRight size={18} strokeWidth={2.2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-white font-mono font-bold uppercase tracking-wider text-xs sm:text-sm underline underline-offset-4 decoration-white/80 group-hover:decoration-white transition-all cursor-pointer">
                            <span>{theme.linkText}</span>
                            <ArrowUpRight size={18} strokeWidth={2.2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom 3D Hardware Image (Large, prominent, zero clipping on desktop/mobile) */}
                    <div className="relative h-[290px] sm:h-[330px] md:h-[350px] lg:h-[370px] w-full flex items-center justify-center mt-auto">
                      <img
                        src={stepImage}
                        alt={`${st.title} - Hardware Render`}
                        className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Indicator Dots / Slider Navigation Pills */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {data.steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Jump to slide ${idx + 1}`}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${activeIdx === idx
                ? 'w-8 bg-[#E7651A]'
                : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
            />
          ))}
        </div>

        {/* Flow Note Badge */}
        {data.flowNote && (
          <div className="text-center mt-12 sm:mt-14">
            <span className="inline-flex items-center gap-2.5 bg-white text-[#0B2340] text-xs font-semibold px-6 py-3 rounded-full border border-slate-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E7651A] animate-pulse" />
              {data.flowNote}
            </span>
          </div>
        )}

      </div>
    </section>
  );
}
