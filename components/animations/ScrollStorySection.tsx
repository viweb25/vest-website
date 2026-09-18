'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Radio, Flame, Activity, Plane, 
  Cpu, Radar, ShieldCheck, Crosshair, 
  BatteryCharging, Car, Settings2, Gauge, 
  Network, CircuitBoard, HardDrive, Layers,
  ArrowUpRight
} from 'lucide-react';
import AboutAlpha from '@/components/site/About';

gsap.registerPlugin(ScrollTrigger);

// Extend Window interface for our custom dot color variable
declare global {
  interface Window {
    __themeDotColor?: string;
  }
}

const PHASES = [
  { 
    id: '01', 
    title: 'Aerospace.', 
    text: 'Precision-engineered aerospace test systems. From satellite telemetry analysis to propulsion thrust stand automation and structural health monitoring. Built for ISRO-grade accuracy using NI PXI hardware and real-time LabVIEW architectures.',
    features: [
      { text: 'Satellite Telemetry', icon: <Radio className="w-5 h-5 text-[var(--accent)]" /> },
      { text: 'Propulsion Testing', icon: <Flame className="w-5 h-5 text-[var(--accent)]" /> },
      { text: 'Structural Health', icon: <Activity className="w-5 h-5 text-[var(--accent)]" /> },
      { text: 'Flight Simulation', icon: <Plane className="w-5 h-5 text-[var(--accent)]" /> }
    ],
    link: 'Open Aerospace Systems dossier'
  },
  { 
    id: '02', 
    title: 'Defense.', 
    text: 'Mission-critical defense solutions: MIL-STD Hardware-in-the-Loop (HIL) simulation, radar signal classification, and avionics validation. Robust, deterministic architectures for DRDO and DPSU requirements on NI cRIO and PXI platforms.',
    features: [
      { text: 'HIL / SIL Simulation', icon: <Cpu className="w-5 h-5 text-[var(--accent)]" /> },
      { text: 'Radar Signal Processing', icon: <Radar className="w-5 h-5 text-[var(--accent)]" /> },
      { text: 'Avionics Validation', icon: <ShieldCheck className="w-5 h-5 text-[var(--accent)]" /> },
      { text: 'Electronic Warfare', icon: <Crosshair className="w-5 h-5 text-[var(--accent)]" /> }
    ],
    link: 'Open Defense Intelligence dossier'
  },
  { 
    id: '03', 
    title: 'Automotive.', 
    text: 'Advanced testing for the next generation of mobility. EV battery management system (BMS) optimization, ADAS sensor validation, and full ECU functional test automation. Tier-1 OEM ready solutions with high-speed CAN-bus data ingestion.',
    features: [
      { text: 'EV BMS Validation', icon: <BatteryCharging className="w-5 h-5 text-[var(--accent)]" /> },
      { text: 'ADAS Sensor Fusion', icon: <Car className="w-5 h-5 text-[var(--accent)]" /> },
      { text: 'ECU Functional Test', icon: <Settings2 className="w-5 h-5 text-[var(--accent)]" /> },
      { text: 'Drive-cycle Sim', icon: <Gauge className="w-5 h-5 text-[var(--accent)]" /> }
    ],
    link: 'Open Automotive Systems dossier'
  },
  { 
    id: '04', 
    title: 'LabVIEW+AI.', 
    text: 'Our specialized platform for embedding neural networks directly into LabVIEW VIs. Using OpenVINO and ONNX for real-time inference on NI PXI and FPGA. Transforming traditional test cells into intelligent, self-optimizing AI systems.',
    features: [
      { text: 'Neural Network in VI', icon: <Network className="w-5 h-5 text-[var(--accent)]" /> },
      { text: 'FPGA AI Inference', icon: <CircuitBoard className="w-5 h-5 text-[var(--accent)]" /> },
      { text: 'Edge AI on cRIO', icon: <HardDrive className="w-5 h-5 text-[var(--accent)]" /> },
      { text: 'OpenVINO Integration', icon: <Layers className="w-5 h-5 text-[var(--accent)]" /> }
    ],
    link: 'Open LabVIEW + AI Core dossier'
  },
];

export default function ScrollStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const evolveRef = useRef<HTMLDivElement>(null);
  
  // Progress indicators
  const progressTextRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // We need refs for the 4 sliding panels
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Timeline that scrubs with scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: stickyRef.current, // Let GSAP handle the pinning instead of CSS sticky
      },
    });

    // 1. INTRO
    // Scale up and fade out the intro text early in the scroll
    tl.to(introRef.current, {
      scale: 1.4,
      yPercent: -20,
      opacity: 0,
      duration: 1,
      ease: 'power1.inOut',
    }, 0);

    // 2. HORIZONTAL PANELS (DISCOVER -> DIAGNOSE -> DESIGN -> DELIVER)
    // Initially all panels are hidden via CSS opacity 0 and translated to the right.
    let currentTime = 1.0; // Start slightly after intro finishes fading
    
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;

      // Bring panel in from right to center
      tl.fromTo(panel, 
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1.5, ease: 'power1.inOut' },
        currentTime
      );
      
      // Update progress bar
      tl.to(progressBarRef.current, {
        height: `${((i + 1) / 5) * 100}%`,
        duration: 1.5,
        ease: 'none'
      }, currentTime);

      // The panel stays in the center for a while (hold duration).
      const exitTime = currentTime + 2.5; // Slightly shorter hold so it feels more fluid

      // If not the last horizontal panel, slide it out completely to the left
      if (i < panelRefs.current.length - 1) {
        tl.to(panel, 
          { xPercent: -100, opacity: 0, duration: 1.5, ease: 'power1.inOut' },
          exitTime
        );
      } else {
        // For the last horizontal panel (DELIVER), fade out for EVOLVE
        tl.to(panel, 
          { scale: 0.9, yPercent: -10, opacity: 0, duration: 1.5, ease: 'power1.inOut' },
          exitTime
        );
      }

      // NEXT panel should start entering exactly when THIS panel starts exiting
      currentTime = exitTime;
    });

    // 3. THEME TRANSITION & EVOLVE
    const darkTransitionStart = currentTime;
    
    // Animate background to dark and text to white
    tl.to(bgRef.current, {
      backgroundColor: '#151515',
      color: '#ffffff',
      duration: 2,
      ease: 'power1.inOut'
    }, darkTransitionStart);
    
    // Update progress bar for final phase
    tl.to(progressBarRef.current, {
      height: `100%`,
      duration: 1,
      ease: 'none'
    }, darkTransitionStart);

    // Proxy object for dot color animation
    const dotProxy = { 
      r: 0, g: 0, b: 0, a: 0.25 // Light theme dot color (subtle black)
    };
    
    tl.to(dotProxy, {
      r: 48, g: 50, b: 56, a: 0.8, // Dark theme dot color (#303238)
      duration: 2,
      ease: 'power1.inOut',
      onUpdate: () => {
        window.__themeDotColor = `rgba(${Math.round(dotProxy.r)}, ${Math.round(dotProxy.g)}, ${Math.round(dotProxy.b)}, ${dotProxy.a})`;
      }
    }, darkTransitionStart);

    // Bring in About Section with a cinematic slide-up reveal
    tl.fromTo(evolveRef.current,
      { yPercent: 100, scale: 0.85, opacity: 0 },
      { yPercent: 0, scale: 1, opacity: 1, duration: 2, ease: 'expo.inOut' },
      darkTransitionStart
    );

    // Edge Progress text update
    tl.to({}, {
      duration: tl.duration(),
      onUpdate: function() {
        if (progressTextRef.current) {
          const progress = Math.round(this.progress() * 100);
          progressTextRef.current.innerText = `${progress}%`;
        }
      }
    }, 0);

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full"
      style={{ height: '400vh' }} // High height to allow plenty of scroll scrubbing
    >
      {/* Pinned Container */}
      <div 
        ref={stickyRef} 
        className="left-0 w-full h-screen overflow-hidden"
      >
        {/* Background layer */}
        <div 
          ref={bgRef} 
          className="absolute inset-0 w-full h-full bg-white text-[var(--ink)]"
          style={{ transition: 'none' }} // GSAP will control this
        />

        {/* --- EDGE PROGRESS INDICATOR --- */}
        <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50">
          <div className="w-[1px] h-24 bg-current opacity-20 relative">
            <div 
              ref={progressBarRef}
              className="absolute top-0 left-0 w-full bg-[var(--accent)]" 
              style={{ height: '0%' }}
            />
          </div>
          <span 
            ref={progressTextRef} 
            className="text-[10px] sm:text-xs font-mono font-medium tracking-widest"
            style={{ writingMode: 'vertical-rl' }}
          >
            0%
          </span>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
          
          {/* 1. INTRO STATE */}
          <div 
            ref={introRef} 
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-6">
              [ OUR EXPERTISE ]
            </p>
            <h2 className="display text-[clamp(3.5rem,8vw,8rem)] font-bold tracking-[-0.03em] leading-[0.95] mb-8">
              Core Services.
            </h2>
            <p className="text-[clamp(1.1rem,1.8vw,1.5rem)] font-medium max-w-2xl opacity-70 text-balance leading-relaxed">
              We deliver mission-critical LabVIEW architectures and real-time AI integration for industries where failure is not an option. We engineer deterministic systems that push the boundaries of hardware performance.
            </p>
            <p className="mt-12 text-[10px] font-bold tracking-[0.25em] uppercase opacity-40">
              AEROSPACE · DEFENSE · AUTOMOTIVE · LABVIEW+AI
            </p>
          </div>

          {/* 2. HORIZONTAL PANELS */}
          {PHASES.map((phase, i) => (
            <div
              key={phase.id}
              ref={(el) => { panelRefs.current[i] = el; }}
              className="absolute inset-0 flex flex-col items-start justify-center opacity-0"
            >
              {/* Massive Background Number */}
              <div className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-end pr-8 sm:pr-16 lg:pr-32 pointer-events-none -z-10 overflow-visible">
                <span className="text-[38vw] leading-none font-bold opacity-[0.035] select-none tracking-tighter">
                  {phase.id}
                </span>
              </div>
              
              {/* Foreground Content */}
              <div className="max-w-4xl w-full px-8 sm:px-16 lg:px-32 flex flex-col items-start text-left">
                <h3 className="display text-[clamp(3rem,7vw,6.5rem)] font-bold tracking-[-0.03em] leading-[1.1]">
                  {phase.title}
                </h3>
                
                <div className="w-16 h-[1px] bg-current opacity-20 my-6 sm:my-8" />
                
                <p className="font-mono text-[clamp(1rem,1.5vw,1.25rem)] font-semibold leading-relaxed max-w-2xl mb-8 text-balance text-[var(--ink)]">
                  {phase.text}
                </p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 font-mono text-[clamp(0.85rem,1.2vw,1rem)] font-medium mb-10 w-full text-[var(--ink)]">
                  {phase.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="shrink-0">{feat.icon}</div>
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>

                {phase.link && (
                  <button className="mt-4 rounded-full bg-white px-6 py-3 font-mono text-[clamp(0.75rem,1vw,0.9rem)] font-bold uppercase tracking-[0.15em] text-black shadow-lg shadow-black/5 hover:shadow-[#0e7c86]/25 hover:scale-[1.02] transition-all duration-300 flex items-center gap-3 group">
                    <span>{phase.link}</span>
                    <ArrowUpRight className="w-5 h-5 text-black transform translate-y-0 translate-x-0 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* 3. FINAL EVOLVE STATE */}
          <div 
            ref={evolveRef}
            className="absolute inset-0 overflow-hidden"
          >
            <AboutAlpha />
          </div>

        </div>
      </div>
    </section>
  );
}
