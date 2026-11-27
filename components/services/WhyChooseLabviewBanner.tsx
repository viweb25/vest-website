'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';

export default function WhyChooseLabviewBanner() {
  return (
    <section id="why-choose-labview" className="py-16 sm:py-24 bg-white relative isolate overflow-hidden">
      {/* Subtle Warm Glow in Background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-100/30 via-amber-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">

          {/* ═══════════════════════════════════════════════════════════════════
              LEFT COLUMN: MANIFESTO & ACTION CTAs
          ═══════════════════════════════════════════════════════════════════ */}
          <div className="w-full lg:w-[48%] flex flex-col justify-center">

            {/* Top Eyebrow Category */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2.5 mb-4"
            >

              <span className="text-xs sm:text-[13px] font-mono font-bold tracking-widest text-[#0B2340] uppercase">
                ENGINEERING / AUTOMATION / TEST &amp; MEASUREMENT
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2340] tracking-tight leading-[1.1] mb-3"
            >
              Why Choose <span className="text-[#E7651A]">LabVIEW?</span>
            </motion.h2>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="text-sm sm:text-base font-bold text-[#0B2340] tracking-tight mb-4"
            >
              Engineering Intelligence. Advanced Automation. Precision Testing.
            </motion.p>

            {/* Section Tagline */}
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="text-sm sm:text-[15px] font-bold text-[#E7651A] tracking-normal mb-3"
            >
              Beyond Conventional Programming – A Complete Engineering Ecosystem
            </motion.h3>

            {/* Narrative Body Copy */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-3 text-slate-600 text-xs sm:text-[13.5px] leading-relaxed mb-6 font-normal"
            >
              <p>
                In today&apos;s rapidly evolving industrial landscape, engineering teams require more than conventional programming tools. They need an integrated environment capable of connecting physical systems, acquiring high-speed measurements, executing complex test sequences, processing engineering data, and delivering actionable insights.
              </p>

              <p>
                <em className="text-[#0B2340] font-semibold not-italic">NI LabVIEW (Laboratory Virtual Instrument Engineering Workbench)</em> provides a flexible graphical programming and system development environment for building sophisticated test, measurement, control, and automation applications.
              </p>

              <p className="text-slate-700 font-medium">
                From individual sensor measurements to distributed automated test facilities, LabVIEW enables engineers to design, integrate, deploy, and maintain application-specific engineering solutions.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <Link
                href="#solutions"
                className="px-6 sm:px-7 py-3 rounded-full bg-[#E7651A] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#D5530B] hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 group"
              >
                <span>Explore Solutions</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="#contact"
                className="px-6 sm:px-7 py-3 rounded-full bg-white text-[#0B2340] text-xs sm:text-sm font-bold border border-slate-300 hover:border-[#0B2340] hover:bg-slate-50 transition-all flex items-center gap-2 group"
              >
                <Play className="w-3.5 h-3.5 fill-[#0B2340] text-[#0B2340] transition-transform group-hover:scale-110" />
                <span>Watch Overview</span>
              </Link>
            </motion.div>

          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              RIGHT COLUMN: DYNAMIC SLANTED 3-PANEL HARDWARE & LABVIEW VISUAL
          ═══════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[52%] flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[620px] aspect-[1128/722] group">
              <Image
                src="/why-labview-panels.png"
                alt="NI & LabVIEW-Driven Test and Automation Solutions Panels"
                fill
                priority
                className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
