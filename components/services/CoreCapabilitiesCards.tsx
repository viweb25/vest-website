'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Code2,
  Layers,
  Zap,
  Cpu,
  Factory,
  Brain,
  RotateCcw,
  Activity,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export interface CapabilityItem {
  id: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  index: string;
  title: string;
  image: string;
  description: string;
  specs: string[];
}

// ═════════════════════════════════════════════════════════════════════════════
// 8 CORE CAPABILITIES (4 CARDS PER ROW, 2 BALANCED ROWS)
// ═════════════════════════════════════════════════════════════════════════════
export const CORE_CAPABILITIES: CapabilityItem[] = [
  {
    id: 'app-dev',
    slug: 'labview-application-development',
    icon: Code2,
    badge: 'CORE SOFTWARE',
    index: '01',
    title: 'LabVIEW Application Development',
    image: '/LabVIEW Development and Data Acquisition Suite.png',
    description:
      'Modular, scalable VIs built using Actor Framework, DQMH, and industry best practices for robust test execution.',
    specs: [
      'Actor Framework & DQMH',
      'Queued Message Handler (QMH)',
      'Object-Oriented LabVIEW (LVOOP)',
      'Producer-Consumer Pipelines',
    ],
  },
  {
    id: 'teststand',
    slug: 'teststand-automation',
    icon: Layers,
    badge: 'TEST EXECUTIVE',
    index: '02',
    title: 'NI TestStand Architecture & Sequencing',
    image: '/Automated Test Equipment Workstation Rack.png',
    description:
      'Industry-standard test executive frameworks for automated sequencing, parallel multi-UUT testing, and automated SQL reporting.',
    specs: [
      'Parallel & Batch Execution',
      'Modular LabVIEW/Python Steps',
      'Automated Database Logging (SQL)',
      'Custom Operator Interface (OI)',
    ],
  },
  {
    id: 'ate',
    slug: 'automated-test-systems',
    icon: Zap,
    badge: 'AUTOMATED TEST',
    index: '03',
    title: 'Automated Test Systems',
    image: '/Automated Test System and LabVIEW Workstation (1).png',
    description:
      'High-speed functional test benches, End-of-Line (EOL) testing, and automated test executive workflows.',
    specs: [
      'End-of-Line (EOL) Testing',
      'Hardware-in-the-Loop (HIL)',
      'Automated TestStand Sequencing',
      'Pass/Fail SQL Analytics',
    ],
  },
  {
    id: 'hardware',
    slug: 'hardware-instrument-integration',
    icon: Cpu,
    badge: 'NI HARDWARE',
    index: '04',
    title: 'Hardware & Instrument Integration',
    image: '/LabVIEW Hardware Integration Showcase.png',
    description:
      'Seamless interfacing with NI PXI, CompactDAQ, CompactRIO, PLCs, and third-party laboratory instruments.',
    specs: [
      'NI PXIe Chassis High-Speed',
      'cDAQ & CompactRIO Real-Time',
      'SCPI & VISA Instrument Control',
      'Simultaneous Multi-Channel DAQ',
    ],
  },
  {
    id: 'industrial',
    slug: 'industrial-automation',
    icon: Factory,
    badge: 'SCADA & PLC',
    index: '05',
    title: 'Industrial Automation',
    image: '/Industrial Automation Test Cell Dashboard (1).png',
    description:
      'Robust control systems, SCADA connectivity, PLC communication, and pneumatic or robotic testing cells.',
    specs: [
      'Siemens & Allen-Bradley PLCs',
      'Modbus TCP / RTU & OPC UA',
      'EtherNet/IP & PROFINET',
      'Operator Touchscreen HMIs',
    ],
  },
  {
    id: 'ai-vision',
    slug: 'ai-vision-inspection',
    icon: Brain,
    badge: 'VISION & AI',
    index: '06',
    title: 'AI Machine Vision & Smart Testing',
    image: '/AI Machine Vision Inspection System.png',
    description:
      'Automated defect inspection, predictive maintenance, and intelligent anomaly detection powered by ONNX.',
    specs: [
      'Sub-Millimeter Optical Inspection',
      'ONNX Machine Learning Models',
      'Vibration Predictive Analytics',
      'Automated Root-Cause Reports',
    ],
  },
  {
    id: 'modernization',
    slug: 'legacy-code-refactoring',
    icon: RotateCcw,
    badge: 'LIFECYCLE',
    index: '07',
    title: 'Legacy Code Refactoring & Migration',
    image: '/Legacy to Modern LabVIEW Code Migration (2).png',
    description:
      'Modernizing monolithic or obsolete LabVIEW codebases into clean, modular, maintainable architectures.',
    specs: [
      'Spaghetti Code Refactoring',
      'Race Condition Elimination',
      'LabVIEW 2024+ Upgrades',
      'Automated Regression Suites',
    ],
  },
  {
    id: 'hil-simulation',
    slug: 'hardware-in-the-loop-hil',
    icon: Activity,
    badge: 'HIL SIMULATION',
    index: '08',
    title: 'Hardware-in-the-Loop (HIL) Simulators',
    image: '/Automotive Powertrain Test Facility.png',
    description:
      'Validate mission-critical ECUs, flight computers, and control units using microsecond FPGA plant models and automated fault insertion.',
    specs: [
      'Sub-Microsecond FPGA Loop Rates',
      'MATLAB / Simulink Compilation',
      'Fault Insertion Unit (FIU)',
      'ECU Automated Regression',
    ],
  },
];

export default function CoreCapabilitiesCards() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      className="font-sans py-20 lg:py-24 bg-white relative isolate overflow-hidden"
      id="proven-competencies"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header (Original Text Preserved) */}
        <div className="portfolio-header">
          <h2 className="portfolio-title !text-[#0B2340]">
            <span className="text-[#E7651A]">Core</span> Engineering Capabilities
          </h2>
          <p className="portfolio-subtitle !text-[#536578]">
            Click any competency below to view certified software architecture, instrument drivers, and deterministic performance benchmarks.
          </p>
        </div>

        {/* 4 Cards Per Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {CORE_CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            const isToggled = activeId === cap.id;

            return (
              <Link
                key={cap.id}
                href={`/services/${cap.slug || cap.id}`}
                onClick={(e) => {
                  // On touch devices, allow first tap to expand if not yet expanded
                  if (typeof window !== 'undefined' && 'ontouchstart' in window && !isToggled) {
                    e.preventDefault();
                    setActiveId(cap.id);
                  }
                }}
                className="relative rounded-[28px] overflow-hidden group cursor-pointer min-h-[490px] sm:min-h-[520px] lg:h-[550px] shadow-[0_12px_36px_-8px_rgba(11,35,64,0.12)] flex flex-col justify-end p-6 sm:p-7 transition-all duration-500 select-none hover:shadow-2xl hover:-translate-y-1 block"
              >
                {/* 1. Full Bleed High-Resolution Photograph */}
                <Image
                  src={cap.image}
                  alt={`${cap.title} - VEST Solutions`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={idx < 4}
                />

                {/* 2. Top Dark Vignette for Visual Contrast */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 via-black/15 to-transparent pointer-events-none" />

                {/* 3. Top Badges: Category & Index */}
                <div className="absolute top-5 inset-x-5 z-20 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-white font-mono text-[10.5px] sm:text-[11px] font-extrabold tracking-wider uppercase shadow-sm">
                    {cap.badge}
                  </span>
                  <span className="text-white/80 font-mono text-xs font-black tracking-wider">
                    {cap.index}
                  </span>
                </div>

                {/* 4. Signature Orange Gradient Overlay (Default Bottom Gradient) */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#E7651A] via-[#E7651A]/70 to-transparent transition-opacity duration-500 ${
                    isToggled ? 'opacity-0' : 'group-hover:opacity-0'
                  }`}
                />

                {/* 5. Expanded Orange Overlay on Hover / Active State */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#E7651A] via-[#E7651A]/92 to-[#E7651A]/45 transition-opacity duration-500 ${
                    isToggled ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />

                {/* 6. Card Foreground Content */}
                <div className="relative z-10 flex flex-col items-start text-left w-full">
                  {/* Minimalist White Outline Icon */}
                  <div className="mb-2.5 text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
                  </div>

                  {/* Bold White Title */}
                  <h3 className="text-xl sm:text-[23px] font-black text-white tracking-tight leading-snug mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    {cap.title}
                  </h3>

                  {/* Description & Specs (Smoothly Expands on Hover / Active) */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isToggled
                        ? 'max-h-80 opacity-100 mt-2.5'
                        : 'max-h-0 opacity-0 group-hover:max-h-80 group-hover:opacity-100 group-hover:mt-2.5'
                    }`}
                  >
                    <p className="text-white text-xs sm:text-[13.5px] font-semibold leading-relaxed mb-3.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
                      {cap.description}
                    </p>

                    {/* Spec Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {cap.specs.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-white/25 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-sm"
                        >
                          <CheckCircle2 className="w-3 h-3 text-white stroke-[2.5] shrink-0" />
                          <span>{spec}</span>
                        </span>
                      ))}
                    </div>

                    {/* Explore Link */}
                    <div className="inline-flex items-center gap-2 text-white font-extrabold text-xs uppercase tracking-wider group-hover:translate-x-1.5 transition-transform drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                      <span>View Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
