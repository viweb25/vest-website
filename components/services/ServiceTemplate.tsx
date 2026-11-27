'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { ServicePageData } from '@/data/servicesData';
import ServiceHeroGraphic from './ServiceHeroGraphic';
import SplashMediaGrid from './SplashMediaGrid';
import HardwareOrbitCarousel from '@/components/site/HardwareOrbitCarousel';
import HowItWorksSlider from './HowItWorksSlider';
import HowItWorksRoadmap from './HowItWorksRoadmap';
import { HARDWARE_MODULES, getHardwareModulesForService } from '@/lib/hardware-modules';
import {
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Layers,
  Cpu,
  Zap,
  Activity,
  ShieldCheck,
  Check,
  ChevronRight,
  Lightbulb,
  Monitor,
  Compass,
  Code2,
  Rocket,
  Award,
  Clock,
  Wrench,
  FileCode,
  Package,
  Database,
  ClipboardCheck,
  LineChart,
  FlaskConical,
  Thermometer,
  Box
} from 'lucide-react';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const SERVICE_HERO_IMAGES: Record<string, string> = {
  'ai-object-detection': '/AI Inference.png',
  'labview-application-development': '/LabVIEW Industrial Test System Setup.png',
  'automated-test-systems': '/Automated Test System and LabVIEW Workstation (1).png',
  'teststand-automation': '/Automated Test Equipment Workstation Rack.png',
  'teststand': '/Automated Test Equipment Workstation Rack.png',
  'hardware-instrument-integration': '/LabVIEW Hardware Integration Showcase.png',
  'industrial-automation': '/Industrial Automation Test Cell Dashboard (1).png',
  'ai-vision-inspection': '/AI Machine Vision Inspection System.png',
  'legacy-code-refactoring': '/Legacy to Modern LabVIEW Code Migration (2).png',
  'ev-battery-test-benches': '/Machine.png',
  'hardware-in-the-loop-hil': '/HMI.png',
  'rf-wireless-automated-test': '/Data Logging Pipeline.png',
};

interface ServiceTemplateProps {
  data: ServicePageData;
}

export default function ServiceTemplate({ data }: ServiceTemplateProps) {
  const {
    slug,
    meta,
    hero,
    intro,
    capabilities,
    howItWorks,
    technologies,
    architecture,
    hardware,
    performance,
    process,
    deliverables,
    applications,
    whyUs,
    perspective,
    mistakes,
    faq,
    cta
  } = data;

  const processContainerRef = useRef(null);
  const { scrollYProgress: processScrollProgress } = useScroll({
    target: processContainerRef,
    offset: ["start 65%", "end 65%"]
  });
  const processPathLength = useSpring(processScrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // All 12 Deliverable Items
  const allDeliverables = React.useMemo(() => {
    const defaultPoints = [
      "Complete uncompiled LabVIEW source code (.lvproj)",
      "Standalone compiled executable (.exe) & Windows installer",
      "Hardware Abstraction Layer (HAL) driver packages",
      "DQMH / Actor Framework diagnostic consoles",
      "Database & TDMS logging pipelines",
      "Centralized error handling subVI suite",
      "Comprehensive Software Architecture Document (SAD)",
      "Detailed user operating & calibration manuals",
      "VI Analyzer automated code quality audit certificate",
      "Desktop Execution Trace Toolkit (DETT) benchmark report",
      "Git version-controlled repository history",
      "On-site commissioning and 12-month technical SLA"
    ];

    if (deliverables?.col1 && deliverables?.col2) {
      return [...deliverables.col1, ...deliverables.col2];
    }

    return defaultPoints;
  }, [deliverables]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#E7651A] selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar />

      {/* SVG ClipPath Definitions for Continent Silhouette & Splashes */}
      <svg className="clipppy absolute -top-[9999px] -left-[9999px] w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="hero-continent-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.22 0.05 C 0.30 0.03, 0.42 0.04, 0.52 0.08 C 0.58 0.10, 0.64 0.12, 0.68 0.08 C 0.73 0.05, 0.77 0.09, 0.80 0.16 C 0.83 0.22, 0.88 0.26, 0.94 0.30 C 0.99 0.33, 1.00 0.38, 0.97 0.44 C 0.93 0.49, 0.86 0.50, 0.83 0.55 C 0.80 0.60, 0.82 0.68, 0.78 0.74 C 0.73 0.80, 0.67 0.87, 0.60 0.93 C 0.54 0.97, 0.48 1.00, 0.44 0.99 C 0.41 0.97, 0.37 0.90, 0.35 0.83 C 0.32 0.76, 0.31 0.70, 0.30 0.63 C 0.29 0.56, 0.33 0.52, 0.30 0.47 C 0.25 0.44, 0.17 0.44, 0.11 0.41 C 0.05 0.38, 0.00 0.33, 0.00 0.27 C 0.00 0.19, 0.06 0.13, 0.11 0.09 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* 2. Hero Section - Exact Reference Image UI: Authentic Europe & Africa Map, Big Serif Headline, Dark Pill Button, Floating Accent Dots */}
      <section id="top" className="relative pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-14 lg:pb-20 bg-white overflow-hidden">
        {/* Europe Continent Vector Silhouette in Soft Warm Sand Beige (#efebe4) - Sits in background spanning center-left behind headline */}

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">

            {/* Left Column: Big Serif Headline + Description + Dark Pill Button (Slides in from Left) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center relative z-10"
            >
              {hero.eyebrow && (
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-500">
                    {hero.eyebrow}
                  </span>
                </div>
              )}

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black text-[var(--ink)] leading-[1.05] tracking-[-0.03em] mb-6">
                {hero.title}
                {hero.titleAccent && (
                  <span className="block text-[var(--ink)] font-display font-black mt-1">
                    {hero.titleAccent}
                  </span>
                )}
              </h1>

              <div className="w-16 h-[2px] bg-[var(--ink)] opacity-20 mb-6" />

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal">
                {hero.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <Link
                  href={`/book?service=${slug}`}
                  className="btn-box !rounded-none"
                >
                  <span>{hero.primaryCta?.text || "Discuss Your LabVIEW Project"}</span>
                  <ArrowUpRight className="w-4 h-4 text-inherit transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Hero Hardware / Software Cutout Showcase (Slides in from Right) */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end p-2 relative z-10 lg:-mt-10 xl:-mt-14"
            >
              <div className="relative w-full max-w-[580px] sm:max-w-[640px] lg:max-w-[700px] xl:max-w-[760px] aspect-[16/10] flex items-center justify-center">
                {/* Hardware & Software Architecture Visual */}
                <div className="relative w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.10)] transition-transform duration-500 hover:scale-[1.02]">
                  <Image
                    src={SERVICE_HERO_IMAGES[slug] || '/LabVIEW Industrial Test System Setup.png'}
                    alt={`${hero.title} - ${hero.eyebrow || 'LabVIEW Architecture'}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. In-Page Tab Navigation (Static, Pure White, Centered, No Scrollbar) */}
      <nav
        aria-label="In-page section tabs"
        className="relative bg-white border-b border-slate-200 transition-all z-20"
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-start md:justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto no-scrollbar scroll-smooth text-xs sm:text-sm md:text-base lg:text-lg font-bold py-0.5 select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <a
              href="#top"
              className="text-[#0B2340] border-b-[3px] md:border-b-[4px] border-[#E7651A] pb-2.5 pt-3 md:pb-3 md:pt-3.5 whitespace-nowrap transition-colors tracking-tight font-bold shrink-0"
            >
              Overview
            </a>
            <a
              href="#offer"
              className="text-slate-700 hover:text-[#E7651A] border-b-[3px] md:border-b-[4px] border-transparent hover:border-[#E7651A]/40 pb-2.5 pt-3 md:pb-3 md:pt-3.5 whitespace-nowrap transition-colors tracking-tight font-semibold hover:font-bold shrink-0"
            >
              Capabilities
            </a>
            <a
              href="#about"
              className="text-slate-700 hover:text-[#E7651A] border-b-[3px] md:border-b-[4px] border-transparent hover:border-[#E7651A]/40 pb-2.5 pt-3 md:pb-3 md:pt-3.5 whitespace-nowrap transition-colors tracking-tight font-semibold hover:font-bold shrink-0"
            >
              About
            </a>
            {/* Hidden: How It Works Section Tab
            <a
              href="#flow"
              className="text-slate-700 hover:text-[#E7651A] border-b-[3px] md:border-b-[4px] border-transparent hover:border-[#E7651A]/40 pb-2.5 pt-3 md:pb-3 md:pt-3.5 whitespace-nowrap transition-colors tracking-tight font-semibold hover:font-bold shrink-0"
            >
              How It Works
            </a>
            */}
            <a
              href="#architecture"
              className="text-slate-700 hover:text-[#E7651A] border-b-[3px] md:border-b-[4px] border-transparent hover:border-[#E7651A]/40 pb-2.5 pt-3 md:pb-3 md:pt-3.5 whitespace-nowrap transition-colors tracking-tight font-semibold hover:font-bold shrink-0"
            >
              Architecture
            </a>
            <a
              href="#hardware"
              className="text-slate-700 hover:text-[#E7651A] border-b-[3px] md:border-b-[4px] border-transparent hover:border-[#E7651A]/40 pb-2.5 pt-3 md:pb-3 md:pt-3.5 whitespace-nowrap transition-colors tracking-tight font-semibold hover:font-bold shrink-0"
            >
              Hardware Support
            </a>
            <a
              href="#process"
              className="text-slate-700 hover:text-[#E7651A] border-b-[3px] md:border-b-[4px] border-transparent hover:border-[#E7651A]/40 pb-2.5 pt-3 md:pb-3 md:pt-3.5 whitespace-nowrap transition-colors tracking-tight font-semibold hover:font-bold shrink-0"
            >
              Process
            </a>
            <a
              href="#faq"
              className="text-slate-700 hover:text-[#E7651A] border-b-[3px] md:border-b-[4px] border-transparent hover:border-[#E7651A]/40 pb-2.5 pt-3 md:pb-3 md:pt-3.5 whitespace-nowrap transition-colors tracking-tight font-semibold hover:font-bold shrink-0"
            >
              FAQ
            </a>
          </div>
        </div>
      </nav>

      {/* 4. Capabilities / What We Offer - Matches "Make a Difference" UI with Asymmetric Scoop Bottom-Left Cards */}
      <section id="offer" className="py-10 sm:py-16 md:py-20 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Centered Header (Slide up) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-14"
          >
            <div className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">
              {capabilities.eyebrow || "WHAT WE OFFER"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-[-0.03em] mb-3">
              {capabilities.heading}{' '}
              <span className="text-black">{capabilities.headingAccent}</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              {(capabilities as any).lead || (capabilities as any).description || "High-throughput test and measurement capabilities engineered to eliminate spaghetti code and deliver deterministic factory-floor execution."}
            </p>
          </motion.div>

          {/* Cards Grid with Asymmetric Bottom-Left Scoop (Staggered Entrance) */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${capabilities.cards.length === 5 ? 'lg:grid-cols-3 xl:grid-cols-5' : capabilities.cards.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
            {capabilities.cards.map((card, idx) => {
              const icons = [Cpu, Layers, Zap, ShieldCheck, Activity];
              const IconComp = icons[idx % icons.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-2xl rounded-bl-[48px] sm:rounded-bl-[56px] p-7 sm:p-8 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Dual-tone Icon at Top Center */}
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 mx-auto mb-5 group-hover:scale-110 transition-transform">
                      <IconComp className="w-7 h-7" />
                    </div>

                    <h3 className="font-bold text-[#0B2340] text-lg sm:text-[19px] mb-2.5 text-center leading-snug group-hover:text-[#E7651A] transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal text-center mb-5">
                      {card.description}
                    </p>
                  </div>

                  {/* Feature Bullets List */}
                  <ul className="space-y-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-700">
                    {card.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold shrink-0">✓</span>
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. About the Service / Intro - Matches "Changing Lives with Knowledge" with Circular Bubble Collage and Split Actions */}
      <section id="about" className="py-10 sm:py-16 md:py-20 lg:py-24 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

            {/* Left Column: Transparent Cutout Image (Slides in from Left) */}
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative flex items-center justify-center"
            >
              <div className="relative w-full aspect-[3/2] flex items-center justify-center">
                <Image
                  src="/LabVIEW Electronics Workstation Cutout.png"
                  alt={`${intro.heading} - VEST Solutions`}
                  fill
                  className="object-contain object-center"
                />
              </div>
            </motion.div>

            {/* Right Column: Eyebrow + Serif Headline + Lead Quote + Body + 2 Actions (Slides in from Right) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <div className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">
                {intro.eyebrow || "ABOUT THE SERVICE"}
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-[-0.03em] leading-[1.18] mb-6">
                {intro.heading}{' '}
                <span className="text-black">{intro.headingAccent}</span>
              </h2>

              <p className="text-[#0B2340] font-semibold text-base sm:text-lg leading-relaxed mb-4">
                {intro.paragraph1}
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-8">
                {intro.paragraph2}
              </p>

              {/* Action Buttons matching reference image */}
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href={`/book?service=${slug}`}
                  className="btn-box !rounded-none"
                >
                  <span>{hero.primaryCta?.text || "Book Consultation"}</span>
                  <ArrowUpRight className="w-4 h-4 text-inherit transition-transform duration-300" />
                </Link>

                <a
                  href="#architecture"
                  className="inline-flex items-center gap-3 text-[#0B2340] hover:text-[#E7651A] font-bold text-sm tracking-wide group transition-colors"
                >
                  <span className="w-11 h-11 rounded-full bg-[#E7651A] group-hover:bg-[#095961] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-all">
                    <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  <span>Explore Architecture</span>
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. Flow / How It Works - Premium Orange Parallax Roadmap (Ascending Curved Architecture) - Currently Hidden */}
      {/* <HowItWorksRoadmap data={howItWorks} /> */}

      {/* 8. LabVIEW / Software Architecture */}
      <section id="architecture" className="py-10 sm:py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-7 sm:mb-12"
          >
            <div className="text-xs font-bold text-[#E7651A] uppercase tracking-widest mb-2">
              {architecture.eyebrow}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-[-0.03em] mb-3">
              {architecture.heading}{' '}
              <span className="text-black">{architecture.headingAccent}</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              {(architecture as any).lead || (architecture as any).description || "Industrial-grade design patterns engineered to replace monolithic code with modular, testable, and maintainable LabVIEW frameworks."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {architecture.cards.map((arch, aIdx) => (
              <motion.div
                key={aIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: aIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-[#E7651A] shadow-xs transition-colors"
              >
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E7651A] uppercase tracking-wider mb-2">
                  <Layers className="w-4 h-4" />
                  Pattern 0{aIdx + 1}
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{arch.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{arch.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Hardware & Instrument Integration - Interactive Hardware Orbit Carousel (MODULAR DAQ ARCHITECTURE UI) */}
      <section id="hardware" className="bg-white border-b border-slate-100 relative overflow-hidden">
        {/* Section Header (Slides up smoothly) */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 md:pt-24 pb-3 sm:pb-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-xs font-bold tracking-[0.25em] text-[#E7651A] uppercase block mb-3">
              {hardware.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-[-0.03em] mb-4">
              {hardware.heading} <span className="text-black">{hardware.headingAccent}</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              {(hardware as any).lead || (hardware as any).description || "Seamless integration with industry-leading measurement hardware, controllers, sensors, and communication protocols."}
            </p>
          </motion.div>
        </div>

        {/* Interactive Hardware Orbit Carousel (Pure White Background) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white relative pb-8 sm:pb-12 lg:pb-16"
        >
          <HardwareOrbitCarousel
            items={getHardwareModulesForService(slug)}
            height="740px"
            exploreLabel="Learn More"
            contactLabel="Contact"
            onExplore={() => {
              const el = document.getElementById('book') || document.getElementById('faq');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else window.location.href = '/book';
            }}
            onRequestBOM={() => {
              window.location.href = '/book';
            }}
          />
        </motion.div>
      </section>

      {/* 10. Performance & Validation Metrics */}
      <section className="py-10 sm:py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-7 sm:mb-12"
          >
            <div className="text-xs font-bold text-[#E7651A] uppercase tracking-widest mb-2">
              {performance.eyebrow}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-[-0.03em] mb-3">
              {performance.heading}{' '}
              <span className="text-black">{performance.headingAccent}</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              {performance.lead}
            </p>
          </motion.div>

          {/* 5 Metric Summary Badges (Staggered Pop-In) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-7 sm:mb-12">
            {performance.metrics.map((m, mIdx) => (
              <motion.div
                key={mIdx}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: mIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-slate-200 p-5 rounded-2xl text-center shadow-xs"
              >
                <div className="text-2xl font-black text-[#E7651A] tracking-tight">{m.value}</div>
                <div className="text-xs font-medium text-slate-600 mt-1">{m.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Two-Column Optimization Details (Slide in from Left and Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs"
            >
              <h3 className="font-bold text-black mb-3 text-base">{performance.leftTitle}</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {performance.leftBullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E7651A] mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs"
            >
              <h3 className="font-bold text-black mb-3 text-base">{performance.rightTitle}</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {performance.rightBullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E7651A] mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 11. Development Process - Exact Engineering Workflow UI (From Engineering Page) */}
      <section
        id="process"
        ref={processContainerRef}
        className="py-12 sm:py-20 md:py-28 lg:py-32 bg-[#F4F6F8] relative overflow-hidden border-b border-slate-100"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-10">

          {/* Centered Header matching SectionHeader (Slide up) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center items-center flex flex-col mb-10 sm:mb-16 md:mb-24"
          >
            <div className="text-[11px] font-black tracking-[0.2em] uppercase text-[#E7651A] mb-4">
              {process.eyebrow || "DEVELOPMENT PROCESS"}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[var(--ink)] tracking-[-0.03em] leading-tight mb-4">
              {process.heading} <span className="text-black">{process.headingAccent}</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {(process as any).lead || (process as any).description || "From initial requirements elicitation to automated FAT/SAT deployment, our deterministic engineering lifecycle ensures zero runtime regressions."}
            </p>
          </motion.div>

          <div className="mt-10 sm:mt-16 md:mt-24 relative max-w-[1200px] mx-auto">
            {/* SVG Progress Line Background */}
            <div className="absolute left-[47px] md:left-1/2 top-4 bottom-4 w-[2px] bg-zinc-200 md:-translate-x-1/2 rounded-full overflow-hidden" />

            {/* SVG Progress Line Animated */}
            <div className="absolute left-[47px] md:left-1/2 top-4 bottom-4 w-[2px] md:-translate-x-1/2">
              <motion.div
                className="w-full h-full bg-[#E7651A] origin-top"
                style={{ scaleY: processPathLength }}
              />
            </div>

            <div className="flex flex-col gap-12 sm:gap-20 md:gap-32 relative z-10">
              {process.steps.map((step, i) => {
                const isEven = i % 2 === 0;
                const numStr = step.number < 10 ? `0${step.number}` : `${step.number}`;
                const [firstWord, ...restWords] = step.title.split(' ');

                const STEP_CONFIGS: Record<number, { label: string; icon: any; image: string; deliverables: string[] }> = {
                  1: {
                    label: 'CONCEPT & REQUIREMENTS',
                    icon: Lightbulb,
                    image: '/img-1.png',
                    deliverables: ['Test Routine Specification', 'Signal Limit Matrix', 'User Access & Audit Trail', 'Initial FAT Criteria']
                  },
                  2: {
                    label: 'ARCHITECTURE & DESIGN',
                    icon: Monitor,
                    image: '/img-2.png',
                    deliverables: ['Module Class UML Diagrams', 'Queue / Event Channel Protocols', 'Actor Tree & DQMH Modules', 'HAL Interface Definitions']
                  },
                  3: {
                    label: 'HARDWARE ABSTRACTION',
                    icon: Cpu,
                    image: '/img-3.png',
                    deliverables: ['Interchangeable Instrument Drivers', 'SCPI / VISA Protocol Adapters', 'Offline Simulation Stubs', 'Hardware Loopback Verification']
                  },
                  4: {
                    label: 'CORE IMPLEMENTATION',
                    icon: Compass,
                    image: '/img-4.png',
                    deliverables: ['Asynchronous Engine Implementation', 'State Transition Handlers', 'TDMS / Database Logging Engines', 'SubVI Error Cluster Routing']
                  },
                  5: {
                    label: 'UI & ERGONOMICS',
                    icon: Code2,
                    image: '/img-5.png',
                    deliverables: ['Dynamic Subpanel Framework', '24/7 Dark/Light Operator HMI', 'Interactive Calibration Wizards', 'Automated Recipe Batch Loaders']
                  },
                  6: {
                    label: 'MEMORY & STRESS AUDIT',
                    icon: Activity,
                    image: '/cdaq-chassis.jpg',
                    deliverables: ['72-Hour Continuous Run Benchmark', 'DETT Reference Leak Eradication', 'Thread Execution Trace Report', 'VI Analyzer Automated Code Score']
                  },
                  7: {
                    label: 'FAT/SAT COMMISSIONING',
                    icon: Rocket,
                    image: '/Machine.png',
                    deliverables: ['Final Standalone Executable (.exe)', 'Factory Acceptance (FAT) Sign-Off', 'Site Commissioning (SAT) Protocol', 'Complete Uncompiled VI Source Code']
                  }
                };

                const conf = STEP_CONFIGS[step.number] || {
                  label: 'ENGINEERING PHASE',
                  icon: Lightbulb,
                  image: '/img-1.png',
                  deliverables: ['Deterministic Code', 'Comprehensive Documentation', 'Quality Certification']
                };
                const Icon = conf.icon;

                return (
                  <motion.div
                    key={step.number}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "0px 0px -30% 0px" }}
                    className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 relative ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Empty half for Desktop (Contains the background number) */}
                    <div className="hidden md:flex flex-1 relative items-center justify-center pointer-events-none select-none z-0">
                      <div className="text-[240px] font-black text-slate-100/70 leading-none">
                        {numStr}
                      </div>
                    </div>

                    {/* Central Node Badge */}
                    <div className="relative shrink-0 ml-4 md:ml-0 z-10 mt-2 md:mt-0">
                      <motion.div
                        variants={{
                          hidden: { borderColor: "#e4e4e7", color: "#a1a1aa", backgroundColor: "#f8f8f8" },
                          visible: { borderColor: "#E7651A", color: "#E7651A", backgroundColor: "#ffffff" }
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full border-[3px] flex items-center justify-center shadow-[0_0_0_8px_rgba(255,255,255,1)] z-10 relative bg-[#F4F6F8]"
                      >
                        <Icon size={28} strokeWidth={2.5} color="currentColor" />
                      </motion.div>
                    </div>

                    {/* Content (Text & Box) */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: isEven ? -40 : 40 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                      className={`flex-1 w-full pl-20 md:pl-0 relative z-10 ${isEven ? 'md:text-right' : 'md:text-left'}`}
                    >
                      {/* Floating Background Image (Same side as content) */}
                      <div className={`hidden lg:block absolute top-[60%] -translate-y-1/2 w-[600px] xl:w-[800px] -z-10 pointer-events-none ${isEven ? '-left-32 xl:-left-64' : '-right-32 xl:-right-64'}`}>
                        {conf.image && (
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, x: isEven ? -40 : 40 },
                              visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                            className="relative"
                          >
                            <img src={conf.image} alt={step.title} className="w-full h-auto object-contain mix-blend-multiply opacity-25" />
                          </motion.div>
                        )}
                      </div>

                      {/* Giant background number (Mobile Only) */}
                      <div className={`md:hidden absolute -top-12 text-[140px] font-black text-slate-100/70 leading-none pointer-events-none select-none -z-10 ${isEven ? 'right-0' : '-left-6'}`}>
                        {numStr}
                      </div>

                      {/* Mobile Image (Hidden on Desktop) */}
                      {conf.image && (
                        <div className="lg:hidden w-full mb-8 opacity-90 mix-blend-multiply">
                          <img src={conf.image} alt={step.title} className="w-full h-auto object-contain" />
                        </div>
                      )}

                      {/* Eyebrow */}
                      <div className={`relative z-10 text-[11px] font-black tracking-[0.2em] uppercase text-[#E7651A] mb-4 flex items-center ${isEven ? 'md:justify-end' : ''}`}>
                        {conf.label}
                      </div>

                      <h3 className="relative z-10 font-display text-4xl md:text-5xl font-black text-[var(--ink)] mb-6 tracking-tight leading-tight">
                        {firstWord} <span className="text-black">{restWords.join(' ')}</span>
                      </h3>

                      <p className={`relative z-10 text-[#536578] font-medium leading-relaxed text-[16px] mb-10 max-w-[46ch] ${isEven ? 'md:ml-auto' : ''}`}>
                        {step.description}
                      </p>

                      {/* Deliverables Box */}
                      <div className={`bg-transparent text-left max-w-[46ch] relative ${isEven ? 'md:ml-auto' : ''}`}>
                        <div className="relative z-10">
                          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#88a0a8] mb-6">
                            Key Deliverables
                          </div>
                          <ul className="space-y-4">
                            {conf.deliverables.map((d) => (
                              <li key={d} className="flex items-center gap-4 text-[15px] font-bold text-[#0B2340]">
                                <ArrowRight size={16} className="text-[#E7651A] shrink-0" strokeWidth={2.5} />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 12. Deliverables (Exact Reference UI: Blueprint Concentric Arc Rings, Plant Visual & Precision SVG Connecting Lines) */}
      <section id="engineering" className="py-12 sm:py-18 md:py-24 bg-white relative overflow-hidden border-t border-slate-100">

        {/* Content Container */}
        <div className="w-full px-6 lg:px-12 xl:px-20 mx-auto max-w-[1600px] relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-center">

            {/* Left Column: Heading, Subheading & Hardware Visual Showcase (Slides in from Left) */}
            <div className="flex flex-col justify-between h-full relative z-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                    {deliverables.eyebrow || "ENGINEERING BEFORE QUOTATION"}
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-[54px] font-black text-[var(--ink)] leading-[1.05] tracking-tight mb-3">
                  {deliverables.heading}{' '}
                  <span className="text-black">{deliverables.headingAccent}</span>
                </h2>
                <p className="text-slate-500 text-[15px] lg:text-[16.5px] leading-relaxed font-medium max-w-lg mb-6">
                  {(deliverables as any).lead || (deliverables as any).description || "A useful proposal starts with useful data. Every system we deliver is validated for throughput, hardware determinism, error recovery, and comprehensive lifecycle operating criteria."}
                </p>
              </motion.div>

              {/* Hardware Visual Showcase (Positioned cleanly below the text, slides in from Left) */}
              <motion.div
                initial={{ opacity: 0, x: -60, scale: 0.94 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[620px] h-[300px] sm:h-[350px] lg:h-[390px] xl:h-[430px] mt-4 lg:mt-6"
              >
                <Image
                  src="/NI Instrumentation and LabVIEW Showcase.png"
                  alt="NI Instrumentation and LabVIEW Showcase"
                  fill
                  className="object-contain object-bottom-left"
                  priority
                />
              </motion.div>
            </div>

            {/* Right Column: All 12 Deliverable Points with Precision Curved Blueprint Lines (Slides in from Right) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:pl-10 xl:pl-12"
            >
              {/* Concentric Arc & Dashed Rings: Layer 0 (z-0, BEHIND the hardware image) */}
              <div
                className="hidden lg:flex absolute top-1/2 -translate-y-1/2 w-[1100px] h-[1100px] items-center justify-center pointer-events-none z-0"
                style={{ right: 'calc(100% + 18px)' }}
              >
                {/* Crisp Slate Circle */}
                <div className="absolute w-[75%] h-[75%] bg-gradient-to-tr from-slate-100 to-slate-50 rounded-full" />
                {/* Dashed circular lines (radius 495px) */}
                <div className="absolute w-[90%] h-[90%] border-[1.5px] border-dashed border-slate-300 rounded-full" />
                <div className="absolute w-[100%] h-[100%] border-[1px] border-dashed border-slate-200 rounded-full" />
              </div>

              {/* Items List (Layer 2: z-20 above hardware image and circle) */}
              <div className="flex flex-col gap-2 relative z-20">
                {allDeliverables.map((item, idx) => {
                  const num = String(idx + 1).padStart(2, '0');

                  // Mathematically exact circular arc coordinates (err = 0.00px from R = 495px circle)
                  const lineCoordinates = [
                    { dotX: 28.2, dotY: 44.0, pivotX: 110, pivotY: 25, isStraight: false },
                    { dotX: 48.5, dotY: 40.5, pivotX: 110, pivotY: 25, isStraight: false },
                    { dotX: 64.1, dotY: 37.1, pivotX: 110, pivotY: 25, isStraight: false },
                    { dotX: 75.4, dotY: 33.6, pivotX: 110, pivotY: 25, isStraight: false },
                    { dotX: 82.9, dotY: 30.2, pivotX: 110, pivotY: 25, isStraight: false },
                    { dotX: 86.5, dotY: 25.0, pivotX: 110, pivotY: 25, isStraight: true },
                    { dotX: 86.5, dotY: 25.0, pivotX: 110, pivotY: 25, isStraight: true },
                    { dotX: 82.9, dotY: 19.8, pivotX: 110, pivotY: 25, isStraight: false },
                    { dotX: 75.4, dotY: 16.4, pivotX: 110, pivotY: 25, isStraight: false },
                    { dotX: 64.1, dotY: 12.9, pivotX: 110, pivotY: 25, isStraight: false },
                    { dotX: 48.5, dotY: 9.5, pivotX: 110, pivotY: 25, isStraight: false },
                    { dotX: 28.2, dotY: 6.0, pivotX: 110, pivotY: 25, isStraight: false },
                  ];
                  const coord = lineCoordinates[idx] ?? lineCoordinates[5];
                  const svgPath = coord.isStraight
                    ? `M 160 25 L ${coord.dotX} 25`
                    : `M 160 25 L ${coord.pivotX} ${coord.pivotY} L ${coord.dotX} ${coord.dotY}`;

                  return (
                    <motion.div
                      key={idx}
                      variants={fadeInUp}
                      className="flex items-center gap-3.5 group relative"
                    >
                      {/* Connecting Line to Dashed Circle */}
                      <div className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 w-[160px] h-[50px] overflow-visible pointer-events-none">
                        <svg
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-[160px] h-[50px] overflow-visible"
                          viewBox="0 0 160 50"
                        >
                          {/* Main Line */}
                          <path
                            d={svgPath}
                            fill="none"
                            stroke="#94a3b8"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Tiny outer dot at the angle pivot point */}
                          {!coord.isStraight && (
                            <circle cx={coord.pivotX} cy={coord.pivotY} r="2" fill="#64748b" />
                          )}
                          {/* Larger inner dot directly ON the dashed circle */}
                          <circle cx={coord.dotX} cy={coord.dotY} r="3" fill="#64748b" />
                        </svg>
                      </div>

                      {/* Numbered Circular Badge (01 to 12) */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200/90 relative z-20 text-[#0B2340] font-mono font-bold text-xs group-hover:bg-[#E7651A] group-hover:text-white group-hover:border-[#E7651A] transition-all duration-300">
                        {num}
                      </div>

                      {/* Text Item (Clean, no divider line) */}
                      <div className="flex-1 py-1 flex items-center justify-between relative z-20">
                        <span className="text-[#0B2340] font-semibold text-[14px] sm:text-[14.5px] leading-snug group-hover:text-[#E7651A] transition-colors">
                          {item}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 13. Applications / Built around your industry (Exact Reference Image UI - 100% Edge-to-Edge Full Page Width) */}
      <section id="applications" className="pt-10 sm:pt-16 md:pt-20 lg:pt-28 pb-0 bg-white border-b border-slate-200/80 overflow-hidden w-full">
        {/* Section Header matching Reference Image (Slides in from Left) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full px-6 sm:px-10 lg:px-12 xl:px-16 mb-8 sm:mb-12 md:mb-16"
        >
          <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.25em] mb-3">
            WHERE PRECISION MATTERS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[var(--ink)] tracking-[-0.03em] mb-3">
            {applications.heading || "Built around your industry."}{' '}
            {applications.headingAccent && <span className="text-black">{applications.headingAccent}</span>}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
            {(applications as any).lead || (applications as any).description || "Proven test, measurement, and automated validation platforms deployed across mission-critical global industrial sectors."}
          </p>
        </motion.div>

        {/* 4-Column Layout across 100% True Edge-to-Edge Screen Width (Staggered Column Entrance) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-slate-200/80 md:border-t-0">
          {applications.cards.map((app, aIdx) => {
            const DOMAIN_IMAGES = [
              '/Industrial Hangar with Fighter Jet and Radar Dish.png', // Aerospace & Defense Test Rigs
              '/Automotive Powertrain Test Facility.png', // Automotive Powertrain & ECU
              '/Semiconductor Wafer Testing Facility Cutout.png', // Semiconductor Wafer Testing
              '/Medical Device Validation Facility.png', // Medical Device Validation
            ];
            const imgSrc = DOMAIN_IMAGES[aIdx % DOMAIN_IMAGES.length];

            return (
              <motion.div
                key={aIdx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: aIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col justify-between pt-6 sm:pt-8 pb-0 border-b md:border-b-0 md:border-r border-slate-200/80 last:border-r-0 hover:bg-slate-50/30 transition-colors"
              >
                {/* Text Content with Generous Padding */}
                <div className="px-6 sm:px-8 lg:px-10 xl:px-12">
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 leading-snug group-hover:text-[#E7651A] transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed min-h-[56px]">
                    {app.description}
                  </p>
                </div>

                {/* Bottom Image Spanning Full Column Width - Ultra-compact panoramic aspect ratio with pure white background */}
                <div className="mt-5 sm:mt-7 w-full overflow-hidden aspect-[21/9] bg-white">
                  <Image
                    src={imgSrc}
                    alt={app.title}
                    width={900}
                    height={386}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 14. Why Us / Why Choose Our Engineers? (Animated 3-Column Layout: Center Drop Down, Left/Right Slide In) */}
      <section id="why-us" className="py-12 sm:py-18 md:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header (Smooth Fade In) */}
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 md:mb-20"
          >
            <p className="text-xs font-bold tracking-[0.25em] text-[#E7651A] uppercase mb-2">
              {whyUs.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-[-0.03em] mb-3">
              {whyUs.heading} <span className="text-black">{whyUs.headingAccent}</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              {(whyUs as any).lead || (whyUs as any).description || "Certified LabVIEW Architects and Hardware Integration Specialists delivering zero-defect deterministic automation."}
            </p>
          </motion.div>

          {/* 3-Column Center-Emblem Layout (Matching Reference Image) */}
          {(() => {
            const LEFT_ICONS = [Award, Cpu, ShieldCheck, CheckCircle2, Layers];
            const RIGHT_ICONS = [Rocket, Zap, Wrench, Clock, CheckCircle2];

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

                {/* Left Column: whyUs.col1 (Slides in from the LEFT with stagger) */}
                <div className="lg:col-span-4 flex flex-col space-y-8 sm:space-y-10">
                  {whyUs.col1.map((item, idx) => {
                    const IconComp = LEFT_ICONS[idx % LEFT_ICONS.length];
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -70 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.65,
                          delay: idx * 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="group flex flex-col-reverse sm:flex-row items-start sm:items-center justify-end gap-4 sm:gap-5 text-left sm:text-right"
                      >
                        <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug max-w-[280px] group-hover:text-[#E7651A] transition-colors">
                          {item}
                        </p>
                        <div className="shrink-0 p-1.5 rounded-full border-2 border-dotted border-[#E7651A] group-hover:rotate-45 transition-transform duration-500">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E7651A] text-white flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                            <IconComp className="w-6 h-6 sm:w-7 sm:h-7" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Center Column: Big VEST Solutions Logo Emblem (Drops down from the TOP) */}
                <motion.div
                  initial={{ opacity: 0, y: -70, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="lg:col-span-4 flex flex-col items-center justify-center py-6 px-4"
                >
                  <div className="relative flex flex-col items-center">
                    {/* Subtle concentric decorative rings behind logo */}
                    <div className="absolute -inset-10 sm:-inset-14 rounded-full border border-slate-100 -z-10 pointer-events-none"></div>
                    <div className="absolute -inset-20 sm:-inset-28 rounded-full border border-dashed border-slate-200/80 -z-10 pointer-events-none"></div>

                    <Image
                      src="/images/vest-emblem.png"
                      alt="VEST Solutions"
                      width={380}
                      height={194}
                      className="w-56 sm:w-64 lg:w-80 h-auto object-contain drop-shadow-sm select-none transition-transform duration-300 hover:scale-105"
                      priority
                    />

                    <div className="mt-5 sm:mt-6 text-center">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase">
                        <span className="text-[#f97316]">VEST</span> <span className="text-[#0B2340]">SOLUTIONS</span>
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-[#E7651A] tracking-[0.28em] uppercase mt-1.5 sm:mt-2">
                        ADVANCED INDUSTRIAL AUTOMATION
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column: whyUs.col2 (Slides in from the RIGHT with stagger) */}
                <div className="lg:col-span-4 flex flex-col space-y-8 sm:space-y-10">
                  {whyUs.col2.map((item, idx) => {
                    const IconComp = RIGHT_ICONS[idx % RIGHT_ICONS.length];
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 70 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.65,
                          delay: idx * 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="group flex items-start sm:items-center justify-start gap-4 sm:gap-5 text-left"
                      >
                        <div className="shrink-0 p-1.5 rounded-full border-2 border-dotted border-[#E7651A] group-hover:-rotate-45 transition-transform duration-500">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E7651A] text-white flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                            <IconComp className="w-6 h-6 sm:w-7 sm:h-7" />
                          </div>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug max-w-[280px] group-hover:text-[#E7651A] transition-colors">
                          {item}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

              </div>
            );
          })()}

        </div>
      </section>

      {/* 15. Our Perspective (Reference UI Layout with Authentic Content Preserved) */}
      <section id="perspective" className="py-10 sm:py-16 md:py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header (Authentic Content) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mb-8 sm:mb-14 md:mb-20"
          >
            <div className="text-xs font-bold text-[#E7651A] uppercase tracking-widest mb-2">
              {perspective.eyebrow}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-[-0.03em] mb-4">
              {perspective.heading}{' '}
              <span className="text-black">{perspective.headingAccent}</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              {perspective.lead}
            </p>
          </motion.div>

          {/* Perspective comparisons */}
          {(() => {
            const leftPerspectiveImg =
              perspective.leftImage ||
              (perspective.leftTitle?.includes('modular PXI / cDAQ') || slug === 'hardware-instrument-integration'
                ? '/NI Lab Equipment and LabVIEW Test Setup.png'
                : perspective.leftTitle?.includes('automated ATE test racks') || slug === 'automated-test-equipment-ate'
                  ? '/Automated Test Equipment Workstation Rack.png'
                  : perspective.leftTitle?.includes('PLC must always own') || slug === 'plc-automation-integration'
                    ? '/Industrial Automation Control Station.png'
                    : perspective.leftTitle?.includes('deploy AI / Deep Learning') || slug === 'ai-vision-inspection'
                      ? '/LabVIEW Machine Vision Inspection System (1).png'
                      : perspective.leftTitle?.includes('smart refactoring wins') || slug === 'legacy-code-refactoring'
                        ? '/Smart Refactoring vs. Rewrite.png'
                        : '/LabVIEW Industrial Test System Setup.png');

            const rightPerspectiveImg =
              perspective.rightImage ||
              (perspective.rightTitle?.includes('standalone benchtop') || slug === 'hardware-instrument-integration'
                ? '/Professional Benchtop Test Instrument Suite.png'
                : perspective.rightTitle?.includes('manual bench setups') || slug === 'automated-test-equipment-ate'
                  ? '/Professional Electronics Lab Workbench.png'
                  : perspective.rightTitle?.includes('PC / LabVIEW system should own') || slug === 'plc-automation-integration'
                    ? '/LabVIEW Vision Inspection Workstation.png'
                    : perspective.rightTitle?.includes('classical vision tools are superior') || slug === 'ai-vision-inspection'
                      ? '/LabVIEW Machine Vision Inspection System.png'
                      : perspective.rightTitle?.includes('clean-sheet rewrite is truly necessary') || slug === 'legacy-code-refactoring'
                        ? '/When to Rewrite from Scratch.png'
                        : '/Silver Laptop Showing LabVIEW Block Diagram.png');

            return (
              <div className="space-y-10 sm:space-y-16 md:space-y-20 lg:space-y-28">
                {/* ROW 1: Modular Frameworks (Visual on Left slides in from Left, Content on Right slides in from Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
                  {/* Visual Left (Slides in from Left) */}
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6 flex justify-center lg:justify-start"
                  >
                    <Image
                      src={leftPerspectiveImg}
                      alt={perspective.leftTitle || 'Perspective Visual'}
                      width={560}
                      height={315}
                      className="w-full max-w-[480px] h-auto object-contain select-none"
                      priority
                    />
                  </motion.div>

                  {/* Content Right: perspective.leftTitle & perspective.leftBullets (Slides in from Right) */}
                  <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6"
                  >
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--ink)] tracking-[-0.03em] leading-[1.2] mb-6">
                      {perspective.leftTitle}
                    </h3>
                    <ul className="space-y-3.5 text-sm sm:text-base text-slate-700">
                      {perspective.leftBullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#E7651A] shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="leading-relaxed font-normal text-slate-700">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* ROW 2: Simpler State Machines (Content on Left slides in from Left, Visual on Right slides in from Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
                  {/* Content Left: perspective.rightTitle & perspective.rightBullets (Slides in from Left) */}
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6 pt-1 sm:pt-4"
                  >
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--ink)] tracking-[-0.03em] leading-[1.2] mb-6">
                      {perspective.rightTitle}
                    </h3>
                    <ul className="space-y-3.5 text-sm sm:text-base text-slate-700">
                      {perspective.rightBullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#E7651A] shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="leading-relaxed font-normal text-slate-700">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Visual Right (Slides in from Right) */}
                  <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6 flex flex-col items-start"
                  >
                    <Image
                      src={rightPerspectiveImg}
                      alt={perspective.rightTitle || 'Perspective Visual'}
                      width={560}
                      height={315}
                      className="w-full max-w-[480px] h-auto object-contain select-none mb-6"
                    />
                  </motion.div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* 16. Common Mistakes */}
      <section className="py-10 sm:py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-7 sm:mb-12"
          >
            <div className="text-xs font-bold text-[#E7651A] uppercase tracking-widest mb-2">
              {mistakes.eyebrow}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-[-0.03em] mb-3">
              {mistakes.heading} <span className="text-black">{mistakes.headingAccent}</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              {(mistakes as any).lead || (mistakes as any).description || "Architectural pitfalls that turn scalable test systems into unmaintainable legacy technical debt."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mistakes.cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center mb-4">
                  !
                </div>
                <h3 className="text-base font-bold text-[#0B2340] mb-2 leading-snug">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 17. Frequently Asked Questions (Exact Reference Image UI: Minimalist Accordion, Solid Corner-Triangle Icon, Clean Divider Lines) */}
      <section id="faq" className="py-10 sm:py-16 md:py-20 lg:py-28 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header (Slides in from Left) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 sm:mb-12 md:mb-16"
          >
            <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.25em] mb-3">
              {faq.eyebrow || "FAQ"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-[-0.03em] mb-3">
              {faq.heading}{' '}
              <span className="text-black">{faq.headingAccent}</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
              {(faq as any).lead || (faq as any).description || "Answers to technical questions regarding architecture patterns, instrument drivers, FAT/SAT deployment, and full source code ownership."}
            </p>
          </motion.div>

          {/* Minimalist Border-Divided Accordion List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-slate-200"
          >
            {faq.items.map((item, fIdx) => (
              <details
                key={fIdx}
                className="group border-b border-slate-200 transition-colors cursor-pointer"
              >
                <summary className="py-6 sm:py-7 list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-6 select-none">
                  <span className="text-lg sm:text-xl lg:text-2xl font-normal text-black tracking-tight group-hover:text-[#E7651A] transition-colors">
                    {item.question}
                  </span>
                  {/* Distinct Solid Right-Triangle Indicator (Exact Reference Icon) */}
                  <span className="shrink-0 transition-transform duration-300 group-open:rotate-90">
                    <svg
                      className="w-2.5 h-2.5 fill-black group-hover:fill-[#E7651A] transition-colors"
                      viewBox="0 0 10 10"
                      aria-hidden="true"
                    >
                      <path d="M 0 10 L 10 0 L 10 10 Z" />
                    </svg>
                  </span>
                </summary>
                <div className="pb-6 sm:pb-7 pr-8 sm:pr-12 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-4xl">
                  {item.answer}
                </div>
              </details>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Global Footer */}
      <Footer />
    </div>
  );
}

