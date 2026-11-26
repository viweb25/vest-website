'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Landmark,
  Layers3,
  Boxes,
  FileText,
  ClipboardList,
  PenTool,
  FileCog,
  MonitorCog,
  Cpu,
  Factory,
  Gauge,
  Activity,
  CircuitBoard,
  Workflow,
  Settings2,
  Database,
  Network,
  BrainCircuit,
  TrendingUp,
  MonitorCheck,
  ScanEye,
  ScanSearch,
  BarChart3,
  Globe2,
  Code2,
  Smartphone,
  Cloud,
  Webhook,
  PanelsTopLeft,
  ArrowUpRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AboutAlpha from '@/components/site/About';

// Extend Window interface for our custom dot color variable
declare global {
  interface Window {
    __themeDotColor?: string;
  }
}

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    id: '01',
    title: 'Industrial Systems.',
    text: 'Test, measurement and control systems built on LabVIEW, PLC platforms and industrial communication.',
    watermark: '/Industrial Automation Control Workstation.png',
    features: [
      {
        text: 'LabVIEW Development',
        icon: <MonitorCog className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'PLC Programming',
        icon: <Cpu className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Industrial Automation',
        icon: <Factory className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Test & Measurement Systems',
        icon: <Gauge className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'DAQ Systems',
        icon: <Activity className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'HIL Testing',
        icon: <CircuitBoard className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Automated Test Systems',
        icon: <Workflow className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Machine Testing',
        icon: <Settings2 className="w-5 h-5 text-[#E7651A]" />
      },
    ],
    link: 'Explore Industrial Systems',
    href: '/services/systems'
  },

  {
    id: '02',
    title: 'Intelligent Automation.',
    text: 'Machine and test data turned into condition insight, early fault detection and decisions.',
    watermark: '/Industrial Robotic Inspection Line (1).png',
    features: [
      {
        text: 'LabVIEW + AI',
        icon: <BrainCircuit className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Predictive Maintenance',
        icon: <TrendingUp className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Machine Monitoring',
        icon: <MonitorCheck className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Computer Vision',
        icon: <ScanEye className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'AI-Based Fault Detection',
        icon: <ScanSearch className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Industrial Data Analytics',
        icon: <BarChart3 className="w-5 h-5 text-[#E7651A]" />
      }
    ],
    link: 'Explore Intelligent Automation',
    href: '/services/systems'
  },

  {
    id: '03',
    title: 'Technology.',
    text: 'Digital products and platforms that connect people, machines and business processes.',
    watermark: '/AI Cloud Development Ecosystem.png',
    features: [
      {
        text: 'Website Development',
        icon: <Globe2 className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Software Development',
        icon: <Code2 className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Mobile Application Development',
        icon: <Smartphone className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Cloud Solutions',
        icon: <Cloud className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'AI Solutions',
        icon: <BrainCircuit className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'API Development',
        icon: <Webhook className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Digital Platforms',
        icon: <PanelsTopLeft className="w-5 h-5 text-[#E7651A]" />
      }
    ],
    link: 'Explore Technology Solutions',
    href: '/services/technology'
  },

  {
    id: '04',
    title: 'Engineering.',
    text: 'Civil and structural documentation, steel detailing and fabrication-ready deliverables for international projects.',
    watermark: '/Steel Fabrication Engineering Workspace.png',
    features: [
      {
        text: 'Civil Engineering',
        icon: <Building2 className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Structural Engineering',
        icon: <Landmark className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Structural Steel Detailing',
        icon: <Layers3 className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Miscellaneous Steel Detailing',
        icon: <Boxes className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Engineering Drawings',
        icon: <FileText className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Bill of Materials (BOM)',
        icon: <ClipboardList className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Shop Drawings',
        icon: <PenTool className="w-5 h-5 text-[#E7651A]" />
      },
      {
        text: 'Fabrication Documentation',
        icon: <FileCog className="w-5 h-5 text-[#E7651A]" />
      }
    ],
    link: 'Explore Engineering Solutions',
    href: '/services/engineering'
  }
];
// const PHASES = [
//   { 
//     id: '01', 
//     title: 'Aerospace.', 
//     text: 'Precision-engineered aerospace test systems. From satellite telemetry analysis to propulsion thrust stand automation and structural health monitoring. Built for ISRO-grade accuracy using NI PXI hardware and real-time LabVIEW architectures.',
//     features: [
//       { text: 'Satellite Telemetry', icon: <Radio className="w-5 h-5 text-[var(--accent)]" /> },
//       { text: 'Propulsion Testing', icon: <Flame className="w-5 h-5 text-[var(--accent)]" /> },
//       { text: 'Structural Health', icon: <Activity className="w-5 h-5 text-[var(--accent)]" /> },
//       { text: 'Flight Simulation', icon: <Plane className="w-5 h-5 text-[var(--accent)]" /> }
//     ],
//     link: 'Open Aerospace Systems dossier'
//   },
//   { 
//     id: '02', 
//     title: 'Defense.', 
//     text: 'Mission-critical defense solutions: MIL-STD Hardware-in-the-Loop (HIL) simulation, radar signal classification, and avionics validation. Robust, deterministic architectures for DRDO and DPSU requirements on NI cRIO and PXI platforms.',
//     features: [
//       { text: 'HIL / SIL Simulation', icon: <Cpu className="w-5 h-5 text-[var(--accent)]" /> },
//       { text: 'Radar Signal Processing', icon: <Radar className="w-5 h-5 text-[var(--accent)]" /> },
//       { text: 'Avionics Validation', icon: <ShieldCheck className="w-5 h-5 text-[var(--accent)]" /> },
//       { text: 'Electronic Warfare', icon: <Crosshair className="w-5 h-5 text-[var(--accent)]" /> }
//     ],
//     link: 'Open Defense Intelligence dossier'
//   },
//   { 
//     id: '03', 
//     title: 'Automotive.', 
//     text: 'Advanced testing for the next generation of mobility. EV battery management system (BMS) optimization, ADAS sensor validation, and full ECU functional test automation. Tier-1 OEM ready solutions with high-speed CAN-bus data ingestion.',
//     features: [
//       { text: 'EV BMS Validation', icon: <BatteryCharging className="w-5 h-5 text-[var(--accent)]" /> },
//       { text: 'ADAS Sensor Fusion', icon: <Car className="w-5 h-5 text-[var(--accent)]" /> },
//       { text: 'ECU Functional Test', icon: <Settings2 className="w-5 h-5 text-[var(--accent)]" /> },
//       { text: 'Drive-cycle Sim', icon: <Gauge className="w-5 h-5 text-[var(--accent)]" /> }
//     ],
//     link: 'Open Automotive Systems dossier'
//   },
//   { 
//     id: '04', 
//     title: 'LabVIEW+AI.', 
//     text: 'Our specialized platform for embedding neural networks directly into LabVIEW VIs. Using OpenVINO and ONNX for real-time inference on NI PXI and FPGA. Transforming traditional test cells into intelligent, self-optimizing AI systems.',
//     features: [
//       { text: 'Neural Network in VI', icon: <Network className="w-5 h-5 text-[var(--accent)]" /> },
//       { text: 'FPGA AI Inference', icon: <CircuitBoard className="w-5 h-5 text-[var(--accent)]" /> },
//       { text: 'Edge AI on cRIO', icon: <HardDrive className="w-5 h-5 text-[var(--accent)]" /> },
//       { text: 'OpenVINO Integration', icon: <Layers className="w-5 h-5 text-[var(--accent)]" /> }
//     ],
//     link: 'Open LabVIEW + AI Core dossier'
//   },
// ];

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
        pin: stickyRef.current,
        onLeave: () => {
          if (typeof window !== 'undefined') {
            window.__themeDotColor = undefined;
          }
        },
        onLeaveBack: () => {
          if (typeof window !== 'undefined') {
            window.__themeDotColor = undefined;
          }
        },
        onEnterBack: () => {
          if (typeof window !== 'undefined') {
            window.__themeDotColor = 'rgba(48, 50, 56, 0.8)';
          }
        },
      },
    });

    // 1. INTRO
    tl.to(introRef.current, {
      scale: 1.4,
      yPercent: -20,
      opacity: 0,
      duration: 1,
      ease: 'power1.inOut',
    }, 0);

    // 2. HORIZONTAL PANELS
    let currentTime = 1.0;

    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;

      tl.fromTo(panel,
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1.5, ease: 'power1.inOut' },
        currentTime
      );

      tl.to(progressBarRef.current, {
        height: `${((i + 1) / 5) * 100}%`,
        duration: 1.5,
        ease: 'none'
      }, currentTime);

      const exitTime = currentTime + 2.5;

      if (i < panelRefs.current.length - 1) {
        tl.to(panel,
          { xPercent: -100, opacity: 0, duration: 1.5, ease: 'power1.inOut' },
          exitTime
        );
      } else {
        tl.to(panel,
          { scale: 0.9, yPercent: -10, opacity: 0, duration: 1.5, ease: 'power1.inOut' },
          exitTime
        );
      }

      currentTime = exitTime;
    });

    // 3. THEME TRANSITION & EVOLVE (Solid Black Screen Finishing at 100%)
    const darkTransitionStart = currentTime;

    tl.to(bgRef.current, {
      backgroundColor: '#050a15',
      color: '#ffffff',
      duration: 1.5,
      ease: 'power1.inOut'
    }, darkTransitionStart);

    tl.to(progressBarRef.current, {
      height: '100%',
      duration: 1.5,
      ease: 'none'
    }, darkTransitionStart);

    const dotProxy = { r: 0, g: 0, b: 0, a: 0.25 };

    tl.to(dotProxy, {
      r: 48, g: 50, b: 56, a: 0.8,
      duration: 1.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (typeof window !== 'undefined') {
          window.__themeDotColor = `rgba(${Math.round(dotProxy.r)}, ${Math.round(dotProxy.g)}, ${Math.round(dotProxy.b)}, ${dotProxy.a})`;
        }
      }
    }, darkTransitionStart);

    tl.fromTo(evolveRef.current,
      { yPercent: 100, scale: 0.9, opacity: 0 },
      { yPercent: 0, scale: 1, opacity: 1, duration: 1.8, ease: 'expo.out' },
      darkTransitionStart
    );

    // Hold cleanly on the solid black screen until 100% scroll is reached
    tl.to({}, { duration: 2.0 });

    tl.to({}, {
      duration: tl.duration(),
      onUpdate: function () {
        if (progressTextRef.current) {
          const progress = Math.min(100, Math.round(this.progress() * 100));
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
              className="absolute top-0 left-0 w-full bg-[#E7651A]"
              style={{ height: '0%' }}
            />
          </div>
          <span
            ref={progressTextRef}
            className="text-[10px] sm:text-xs font-mono font-medium tracking-widest text-[#0B2340]"
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
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#E7651A] mb-6">
              [ OUR EXPERTISE ]
            </p>
            <h2 className="display text-[clamp(3.5rem,8vw,8rem)] font-bold tracking-[-0.03em] leading-[0.95] mb-8 text-[#0B2340]">
              Core Services<span className="text-[#E7651A]">.</span>
            </h2>
            <p className="text-[clamp(1.1rem,1.8vw,1.45rem)] font-medium max-w-2xl opacity-80 text-balance leading-relaxed text-[#536578]">
              We deliver precision engineering documentation, industrial automation, test & measurement systems, and enterprise technology platforms.
            </p>
            <p className="mt-12 text-[11px] font-bold tracking-[0.25em] uppercase text-[#0B2340]/80 font-mono">
              INDUSTRIAL SYSTEMS · INTELLIGENT AUTOMATION · TECHNOLOGY · ENGINEERING
            </p>
          </div>

          {/* 2. HORIZONTAL PANELS */}
          {PHASES.map((phase, i) => (
            <div
              key={phase.id}
              ref={(el) => { panelRefs.current[i] = el; }}
              className="absolute inset-0 flex flex-col items-start justify-center opacity-0"
            >
              {/* Background Blueprint Sketch Illustration */}
              <div className="absolute inset-y-0 right-0 w-full md:w-3/5 lg:w-1/2 flex items-center justify-end pr-6 sm:pr-14 lg:pr-24 pointer-events-none -z-10 overflow-hidden select-none">
                {phase.watermark && (
                  <div className="w-full h-full flex items-center justify-center lg:justify-end pr-0 lg:pr-6 pointer-events-none">
                    <img
                      src={phase.watermark}
                      alt={`${phase.title} Showcase`}
                      className="w-[90%] max-w-[680px] lg:max-w-[800px] max-h-[78vh] object-contain opacity-[0.92] mix-blend-multiply select-none pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)] transition-opacity duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              {/* Foreground Content */}
              <div className="max-w-4xl w-full px-8 sm:px-16 lg:px-32 flex flex-col items-start text-left pt-16 sm:pt-10">
                <h3 className="display text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold tracking-[-0.03em] leading-[0.9] text-[#0B2340]">
                  {phase.title.endsWith('.') ? (
                    <>
                      {phase.title.slice(0, -1)}
                      <span className="text-[#E7651A]">.</span>
                    </>
                  ) : (
                    phase.title
                  )}
                </h3>

                <div className="w-16 h-1 bg-[#E7651A] rounded-full my-6 sm:my-8" />

                <p className="font-sans text-[clamp(1rem,1.4vw,1.2rem)] font-medium leading-relaxed max-w-2xl mb-8 text-balance text-[#0B2340]">
                  {phase.text}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 font-sans text-[clamp(0.95rem,1.2vw,1.05rem)] font-semibold mb-10 w-full text-[#0B2340]">
                  {phase.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3.5">
                      <div className="shrink-0 text-[#E7651A]">{feat.icon}</div>
                      <span className="text-[#0B2340] font-bold tracking-tight">{feat.text}</span>
                    </li>
                  ))}
                </ul>

                {phase.link && (
                  <Link 
                    href={phase.href || '/services/systems'}
                    className="mt-4 pointer-events-auto rounded-none bg-transparent hover:bg-transparent border-1.5 border-[#0B2340] hover:border-[#E7651A] px-7 py-3.5 font-sans text-[clamp(0.8rem,1vw,0.95rem)] font-extrabold uppercase tracking-[0.12em] text-[#0B2340] hover:text-[#E7651A] hover:scale-[1.01] transition-all duration-300 inline-flex items-center gap-3 group shadow-none"
                  >
                    <span>{phase.link}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#0B2340] group-hover:text-[#E7651A] transform translate-y-0 translate-x-0 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                )}
              </div>
            </div>
          ))}

          {/* 3. FINAL EVOLVE STATE */}
          <div
            ref={evolveRef}
            className="absolute inset-0 overflow-hidden pointer-events-auto"
          >
            <AboutAlpha />
          </div>

        </div>
      </div>
    </section>
  );
}
