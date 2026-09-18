'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PHASES = [
  {
    n: '01',
    tag: 'Discovery',
    title: 'AI Feasibility & Requirements',
    desc: 'We audit your existing LabVIEW system, NI hardware setup, and test requirements, confirming feasibility on your PXI, cRIO, or FPGA platform before a single line of code is written.',
    highlights: [
      'LabVIEW system & NI hardware audit',
      'AI value-add identification',
      'PXI / cRIO / FPGA feasibility',
    ],
    img: '/images/pipeline/phase_01.jpg',
    accentBg: 'bg-blue-600',
    accentText: 'text-blue-600',
    accentDot: 'bg-blue-600',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-700',
  },
  {
    n: '02',
    tag: 'Architecture',
    title: 'LabVIEW AI Architecture',
    desc: 'We design the full integration architecture — selecting the right AI model (ONNX, OpenVINO, TensorRT), defining the LabVIEW VI structure and data pipeline from NI DAQ to neural inference.',
    highlights: [
      'ONNX / OpenVINO / TensorRT selection',
      'LabVIEW VI structure design',
      'NI DAQ → neural inference pipeline',
    ],
    img: '/images/pipeline/phase_02.jpg',
    accentBg: 'bg-orange-500',
    accentText: 'text-orange-600',
    accentDot: 'bg-orange-500',
    tagBg: 'bg-orange-50',
    tagText: 'text-orange-700',
  },
  {
    n: '03',
    tag: 'Validation',
    title: 'Neural Integration & HIL Validation',
    desc: 'The AI model is embedded directly inside LabVIEW VIs — no external runtime. We validate accuracy and determinism using Hardware-in-the-Loop simulation and MIL-STD test benches.',
    highlights: [
      'AI embedded inside LabVIEW VIs',
      'Hardware-in-the-Loop validation',
      'MIL-STD / Aerospace / Auto test benches',
    ],
    img: '/images/pipeline/phase_03.jpg',
    accentBg: 'bg-blue-500',
    accentText: 'text-blue-500',
    accentDot: 'bg-blue-500',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-600',
  },
  {
    n: '04',
    tag: 'Deployment',
    title: 'Deployment & Live Monitoring',
    desc: 'We deploy on production NI hardware, commission on-site and enable live AI monitoring dashboards with ongoing retraining pipelines and remote support to keep the system accurate.',
    highlights: [
      'Production deployment (PXI / cRIO / FPGA)',
      'On-site system commissioning',
      'Live AI monitoring dashboards',
    ],
    img: '/images/pipeline/phase_04.jpg',
    accentBg: 'bg-orange-600',
    accentText: 'text-orange-600',
    accentDot: 'bg-orange-600',
    tagBg: 'bg-orange-50',
    tagText: 'text-orange-700',
  },
  {
    n: '05',
    tag: 'Data Pipeline',
    title: 'Real-Time Data Acquisition',
    desc: 'We build high-speed NI DAQ data pipelines that stream sensor, RF, and telemetry signals into the AI inference engine with sub-millisecond latency — entirely within LabVIEW RT.',
    highlights: [
      'NI DAQ multi-channel configuration',
      'Deterministic real-time streaming',
      'Signal pre-processing & conditioning',
    ],
    img: '/images/pipeline/phase_05.jpg',
    accentBg: 'bg-blue-700',
    accentText: 'text-blue-700',
    accentDot: 'bg-blue-700',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-800',
  },
  {
    n: '06',
    tag: 'Optimisation',
    title: 'Model Quantisation & Compression',
    desc: 'We quantise, prune, and compress AI models to meet the strict memory and compute constraints of FPGA and cRIO targets — without sacrificing inference accuracy on safety-critical outputs.',
    highlights: [
      'INT8 / FP16 quantisation for FPGA',
      'Structured pruning for cRIO targets',
      'Accuracy-latency trade-off profiling',
    ],
    img: '/images/pipeline/phase_06.jpg',
    accentBg: 'bg-orange-500',
    accentText: 'text-orange-600',
    accentDot: 'bg-orange-500',
    tagBg: 'bg-orange-50',
    tagText: 'text-orange-700',
  },
  {
    n: '07',
    tag: 'Compliance',
    title: 'Safety & Standards Certification',
    desc: 'We prepare the AI-integrated LabVIEW system for DO-178C (aerospace), MIL-STD-882 (defence), and ISO 26262 (automotive) compliance — generating traceability matrices and V&V evidence.',
    highlights: [
      'DO-178C & DO-254 evidence packages',
      'MIL-STD-882 hazard analysis',
      'ISO 26262 functional safety (ASIL)',
    ],
    img: '/images/pipeline/phase_07.jpg',
    accentBg: 'bg-blue-600',
    accentText: 'text-blue-600',
    accentDot: 'bg-blue-600',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-700',
  },
  {
    n: '08',
    tag: 'Support',
    title: 'Long-Term AI Model Support',
    desc: 'Post-deployment, we provide continuous model performance monitoring, scheduled retraining with new field data, remote diagnostics, and LabVIEW VI updates to keep your system at peak accuracy.',
    highlights: [
      'Continuous performance monitoring',
      'Scheduled retraining pipelines',
      'Remote diagnostics & VI updates',
    ],
    img: '/images/pipeline/phase_08.jpg',
    accentBg: 'bg-orange-600',
    accentText: 'text-orange-600',
    accentDot: 'bg-orange-600',
    tagBg: 'bg-orange-50',
    tagText: 'text-orange-700',
  },
];

type Phase = (typeof PHASES)[number];

export default function Pipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headingWordsRef = useRef<HTMLSpanElement[]>([]);
  const descriptionWordsRef = useRef<HTMLSpanElement[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selected, setSelected] = useState<Phase | null>(null);
  const startX = useRef(0);
  const hasDragged = useRef(false);

  // Header scroll entrance — words rise from below with a subtle shine
  useEffect(() => {
    const ctx = gsap.context(() => {
      const headingWords = headingWordsRef.current.filter(Boolean);
      const descriptionWords = descriptionWordsRef.current.filter(Boolean);

      // Initial state: each word sits below its final position and is softly blurred.
      gsap.set([...headingWords, ...descriptionWords], {
        opacity: 0,
        yPercent: 115,
        filter: 'blur(8px)',
        textShadow: '0 0 24px rgba(255, 255, 255, 1)',
      });

      // Keep the timeline paused. It is restarted every time
      // the section enters the viewport — down or back up.
      const tl = gsap.timeline({ paused: true });

      const resetWords = () => {
        gsap.set([...headingWords, ...descriptionWords], {
          opacity: 0,
          yPercent: 115,
          filter: 'blur(8px)',
          textShadow: '0 0 24px rgba(255,255,255,1)',
        });
      };

      const playWords = () => {
        tl.restart();
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 30%',

        // Entering while scrolling DOWN
        onEnter: playWords,

        // Entering again while scrolling UP
        onEnterBack: playWords,

        // Reset when leaving through the top.
        // This makes the next entry play from the beginning.
        onLeaveBack: () => {
          tl.pause(0);
          resetWords();
        },
      });

      // Heading: word-by-word rise + glow/shine.
      tl.to(headingWords, {
        opacity: 1,
        yPercent: 0,
        filter: 'blur(0px)',
        textShadow: '0 0 0 rgba(0,0,0,0)',
        duration: 1.0,
        stagger: 0.07,
        ease: 'power4.out',
      })
        // Description follows slightly after the heading.
        .to(
          descriptionWords,
          {
            opacity: 1,
            yPercent: 0,
            filter: 'blur(0px)',
            textShadow: '0 0 0 rgba(0,0,0,0)',
            duration: 0.75,
            stagger: 0.025,
            ease: 'power3.out',
          },
          '-=0.35'
        );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Card entrance animation
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardEls.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const goTo = useCallback((idx: number) => setActiveIdx(idx), []);

  const rotate = useCallback(
    (dir: 1 | -1) => {
      const next = ((activeIdx + dir) % PHASES.length + PHASES.length) % PHASES.length;
      goTo(next);
    },
    [activeIdx, goTo]
  );

  // Drag handlers
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    hasDragged.current = false;
    startX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (Math.abs(e.clientX - startX.current) > 8) hasDragged.current = true;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    const dx = e.clientX - startX.current;
    if (hasDragged.current) {
      if (dx < -60) rotate(1);
      else if (dx > 60) rotate(-1);
    }
  };

  // Visual transform per card
  const getCardStyle = (idx: number): React.CSSProperties => {
    const total = PHASES.length;
    let rel = idx - activeIdx;
    if (rel > total / 2) rel -= total;
    if (rel < -total / 2) rel += total;

    const isActive = rel === 0;
    const rotation = isActive ? 0 : rel * 10;
    const tx = isActive ? 0 : rel * 150;
    const scale = isActive ? 1 : Math.max(0.60, 1 - Math.abs(rel) * 0.12);
    const zIndex = isActive ? 30 : 30 - Math.abs(rel) * 10;
    const opacity = Math.abs(rel) > 3 ? 0 : isActive ? 1 : 0.85 - Math.abs(rel) * 0.15;
    const blur = isActive ? 0 : Math.abs(rel) * 1.2;

    return {
      transform: `translateX(${tx}px) rotate(${rotation}deg) scale(${scale})`,
      zIndex,
      opacity,
      filter: blur > 0 ? `blur(${blur}px)` : undefined,
      transition: isDragging ? 'none' : 'all 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
      pointerEvents: isActive ? 'auto' : 'none',
    };
  };

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-30 overflow-hidden bg-white"
    >
      {/* Background orbs (Light theme) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-100/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-orange-100/60 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-8 z-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center w-full mx-auto mb-6 sm:mb-8">
          <div className="header-child inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f4f1] border border-[#b8dfd8] mb-6">
            <Sparkles className="w-4 h-4 text-[#0a2540]" strokeWidth={2.5} />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.1em] text-[#0a2540] uppercase">
              The Process
            </span>
          </div>

          {/* Layered glowing heading + word-by-word shine entrance */}
          <div className="header-child relative mb-6" style={{ perspective: '800px' }}>
            {/* Back float layer */}
            <h2
              aria-hidden
              className="absolute inset-0 text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.15] text-white opacity-60 blur-[10px] select-none animate-[float_4s_ease-in-out_infinite]"
            >
              From feasibility to a live AI model,<br />running inside LabVIEW
            </h2>

            {/* Mid float layer */}
            <h2
              aria-hidden
              className="absolute inset-0 text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.15] text-white opacity-60 blur-[4px] select-none translate-x-[2px] translate-y-[2px] animate-[float_4s_ease-in-out_infinite_reverse]"
            >
              From feasibility to a live AI model,<br />running inside LabVIEW
            </h2>

            {/* Front solid layer */}
            <h2 className="relative text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.15] translate-x-[2px] translate-y-[2px]">
              <span className="inline-block overflow-hidden align-bottom">
                <span
                  ref={(el) => {
                    if (el) headingWordsRef.current[0] = el;
                  }}
                  className="heading-word inline-block"
                >
                  From
                </span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span
                  ref={(el) => {
                    if (el) headingWordsRef.current[1] = el;
                  }}
                  className="heading-word inline-block"
                >
                  feasibility
                </span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span
                  ref={(el) => {
                    if (el) headingWordsRef.current[2] = el;
                  }}
                  className="heading-word inline-block"
                >
                  to
                </span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span
                  ref={(el) => {
                    if (el) headingWordsRef.current[3] = el;
                  }}
                  className="heading-word inline-block"
                >
                  a
                </span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span
                  ref={(el) => {
                    if (el) headingWordsRef.current[4] = el;
                  }}
                  className="heading-word inline-block"
                >
                  live
                </span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span
                  ref={(el) => {
                    if (el) headingWordsRef.current[5] = el;
                  }}
                  className="heading-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"
                >
                  AI model
                </span>
              </span>,
              <br />
              <span className="inline-block overflow-hidden align-bottom">
                <span
                  ref={(el) => {
                    if (el) headingWordsRef.current[6] = el;
                  }}
                  className="heading-word inline-block"
                >
                  running
                </span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span
                  ref={(el) => {
                    if (el) headingWordsRef.current[7] = el;
                  }}
                  className="heading-word inline-block"
                >
                  inside
                </span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span
                  ref={(el) => {
                    if (el) headingWordsRef.current[8] = el;
                  }}
                  className="heading-word inline-block"
                >
                  LabVIEW
                </span>
              </span>
            </h2>
          </div>

          <p className="header-child text-lg text-slate-600 leading-relaxed">
            {[
              'A', 'four-phase', 'process', 'for', 'embedding', 'neural',
              'networks', 'directly', 'into', 'NI', 'LabVIEW', '—',
              'built', 'for', 'aerospace,', 'defence', 'and', 'automotive',
              'programmes.'
            ].map((word, index) => (
              <span key={`${word}-${index}`}>
                <span className="inline-block overflow-hidden align-bottom">
                  <span
                    ref={(el) => {
                      if (el) descriptionWordsRef.current[index] = el;
                    }}
                    className="description-word inline-block"
                  >
                    {word}
                  </span>
                </span>
                {index < 18 ? ' ' : ''}
              </span>
            ))}
          </p>
        </div>

        {/* ── Fan / Deck Stage ── */}
        <div
          ref={trackRef}
          className="relative flex items-center justify-center"
          style={{ height: '500px', cursor: isDragging ? 'grabbing' : 'grab' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {PHASES.map((phase, idx) => {
            const style = getCardStyle(idx);
            const isActive = idx === activeIdx;

            return (
              <div
                key={idx}
                ref={(el) => { cardEls.current[idx] = el; }}
                style={style}
                className="absolute"
              >
                {/* 3-D flip card: front = image, back = details */}
                <div
                  className="pipeline-card-scene w-[270px] sm:w-[300px] h-[370px] cursor-pointer"
                  style={{
                    perspective: '900px',
                    boxShadow: isActive
                      ? '0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)'
                      : '0 20px 50px rgba(0,0,0,0.4)',
                    borderRadius: '22px',
                  }}
                  onClick={() => {
                    if (!hasDragged.current && !isActive) goTo(idx);
                  }}
                >
                  {/* Flipper wrapper — rotates on hover */}
                  <div className="pipeline-card-flipper w-full h-full relative" style={{ transformStyle: 'preserve-3d', transition: 'transform 0.65s cubic-bezier(0.4,0.2,0.2,1)' }}>

                    {/* ── FRONT: Full image ── */}
                    <div className="pipeline-card-face absolute inset-0 rounded-[22px] overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                      <img
                        src={phase.img}
                        alt={phase.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center px-3 py-1.5 rounded-full bg-slate-800/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-semibold tracking-wide shadow-lg">
                          Phase {phase.n}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center px-3 py-1.5 rounded-full bg-slate-700/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-wide shadow-lg">
                          {phase.tag}
                        </div>
                      </div>
                      <div className="absolute bottom-5 left-4 right-4">
                        <h3 className="text-lg font-bold text-white leading-snug">{phase.title}</h3>
                        <p className="text-white/40 text-[11px] mt-1.5 flex items-center gap-1">
                          <span>↻</span> Hover to flip
                        </p>
                      </div>
                    </div>

                    {/* ── BACK: Scrollable details ── */}
                    <div
                      className="pipeline-card-face absolute inset-0 rounded-[22px] bg-white flex flex-col overflow-hidden"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >

                      <div className="flex-1 overflow-y-auto p-5 [scrollbar-width:thin] [scrollbar-color:#e2e8f0_transparent]">
                        <div className="flex items-center justify-between mb-3">
                          <span className={cn('text-[10px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded-lg', phase.tagBg, phase.tagText)}>
                            Phase {phase.n}
                          </span>
                          <span className={cn('text-[10px] font-bold tracking-widest uppercase', phase.accentText)}>{phase.tag}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{phase.title}</h3>
                        <p className="text-[11px] text-slate-600 leading-relaxed mb-4">{phase.desc}</p>
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                          <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mb-2">Key Deliverables</p>
                          {phase.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2">
                              <div className={cn('w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0', phase.accentDot)} />
                              <span className="text-[11px] font-medium text-slate-700">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Controls ── */}
        <div className="flex items-center justify-center gap-5 mt-4">
          <button
            onClick={() => rotate(-1)}
            className="w-11 h-11 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:shadow transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div className="flex items-center gap-2">
            {PHASES.map((p, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === activeIdx ? cn('w-6 h-2.5', p.accentBg) : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300'
                )}
              />
            ))}
          </div>
          <button
            onClick={() => rotate(1)}
            className="w-11 h-11 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:shadow transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-4 tracking-wide select-none">← drag to slide · tap active card to expand →</p>

      </div>

      {/* ── Detail Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelected(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

          {/* Modal panel */}
          <div
            className="relative z-10 w-full max-w-2xl rounded-3xl bg-white overflow-hidden shadow-2xl animate-[fadeInUp_0.35s_ease]"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'fadeInUp 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}
          >
            {/* Hero image */}
            <div className="relative w-full aspect-[16/7] overflow-hidden">
              <img src={selected.img} alt={selected.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Phase badge on image */}
              <div className="absolute top-4 left-4">
                <span className={cn('text-[11px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-xl text-white', selected.accentBg)}>
                  Phase {selected.n} · {selected.tag}
                </span>
              </div>
              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              >
                <X size={18} />
              </button>
              {/* Title over image */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{selected.title}</h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-7 sm:p-9">
              <p className="text-slate-600 leading-relaxed mb-8 text-base">{selected.desc}</p>

              <div className={cn('h-0.5 w-12 mb-6 rounded-full', selected.accentBg)} />

              <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-4">Key Deliverables</p>
              <div className="space-y-3">
                {selected.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={cn('w-2 h-2 rounded-full flex-shrink-0', selected.accentDot)} />
                    <span className="text-sm font-medium text-slate-800">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-4px) scale(1.01); }
        }
        @keyframes gradient {
          to { background-position: 200% center; }
        }

        /* Subtle light sweep used by the animated heading/description entrance. */
        .heading-word,
        .description-word {
          backface-visibility: hidden;
          transform-origin: center bottom;
        }
        .pipeline-card-scene:hover .pipeline-card-flipper {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}