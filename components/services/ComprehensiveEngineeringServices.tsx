'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ComprehensiveEngineeringServices() {
  return (
    <section id="comprehensive-services" className="py-20 sm:py-28 bg-white relative isolate overflow-hidden text-[#0B2340]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION HEADER
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3"
          >

            <span className="text-xs sm:text-[13px] font-mono font-bold tracking-widest text-[#0B2340] uppercase">
              CORE ENGINEERING CAPABILITIES
            </span>

          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2340] tracking-tight leading-tight mb-3"
          >
            Comprehensive <span className="text-[#E7651A]">LabVIEW</span> Engineering Services
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            From data acquisition and control to automated testing and system validation.
          </motion.p>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            TOP GRID: CARD 01 (TALL LEFT) + CARDS 02-05 (2x2 RIGHT)
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">

          {/* ── CARD 01: ADVANCED TEST SYSTEM ARCHITECTURE (TALL 2-ROW SPAN) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="lg:col-span-1 lg:row-span-2 bg-white rounded-2xl p-6 sm:p-7 border border-[#E7651A]/40 shadow-[0_4px_24px_-4px_rgba(231,101,26,0.12)] flex flex-col justify-between transition-all duration-300"
          >
            <div>
              {/* Header row with text and monitor image */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-black text-[#0B2340] leading-snug mb-2.5">
                    <span className="text-[#E7651A]">01.</span> Advanced Test System Architecture
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    Develop customized test architectures that integrate hardware, software, instrumentation, signal acquisition, test execution, and result management.
                  </p>
                </div>

                <div className="relative w-28 sm:w-36 aspect-[4/3] shrink-0">
                  <Image
                    src="/core-services/hd-service-01.png"
                    alt="Advanced Test System Architecture LabVIEW Monitor"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Checkmark Bullets List */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                {[
                  'Modular and scalable test architecture',
                  'Producer-Consumer and event-driven programming',
                  'Queued Message Handler (QMH) architecture',
                  'Parallel and multithreaded execution',
                  'Distributed measurement and control systems',
                  'Modular software components and reusable libraries',
                  'Automated test sequencing and execution',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium leading-snug">
                    <span className="text-[#E7651A] font-bold text-sm leading-none shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── CARDS 02 to 05 (2x2 GRID ON RIGHT) ── */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

            {/* CARD 02: HIGH-PERFORMANCE DATA ACQUISITION & INSTRUMENTATION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_4px_16px_-4px_rgba(11,35,64,0.05)] hover:border-[#E7651A]/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base sm:text-[17px] font-black text-[#0B2340] leading-snug flex-1">
                    <span className="text-[#E7651A]">02.</span> High-Performance Data Acquisition &amp; Instrumentation
                  </h3>
                  <div className="relative w-20 sm:w-24 aspect-[5/4] shrink-0">
                    <Image
                      src="/NI Measurement Modules Lineup.png"
                      alt="High-Performance Data Acquisition Hardware"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                  Transform physical measurements into meaningful engineering information through advanced data acquisition.
                </p>
              </div>
            </motion.div>

            {/* CARD 03: PXI, COMPACTDAQ & COMPACTRIO INTEGRATION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_4px_16px_-4px_rgba(11,35,64,0.05)] hover:border-[#E7651A]/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base sm:text-[17px] font-black text-[#0B2340] leading-snug flex-1">
                    <span className="text-[#E7651A]">03.</span> PXI, CompactDAQ &amp; CompactRIO Integration
                  </h3>
                  <div className="relative w-20 sm:w-24 aspect-[5/4] shrink-0">
                    <Image
                      src="/Industrial Modular I_O Network Rack.png"
                      alt="PXI, CompactDAQ & CompactRIO Modular Hardware"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                  Build advanced measurement and automation systems using modular hardware platforms.
                </p>
              </div>
            </motion.div>

            {/* CARD 04: REAL-TIME CONTROL & FPGA-BASED APPLICATIONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_4px_16px_-4px_rgba(11,35,64,0.05)] hover:border-[#E7651A]/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base sm:text-[17px] font-black text-[#0B2340] leading-snug flex-1">
                    <span className="text-[#E7651A]">04.</span> Real-Time Control &amp; FPGA-Based Applications
                  </h3>
                  <div className="relative w-16 sm:w-20 aspect-square shrink-0">
                    <Image
                      src="/Blue FPGA Microchip Close-Up.png"
                      alt="Real-Time FPGA Processor"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                  Develop deterministic control and monitoring applications for demanding environments.
                </p>
              </div>
            </motion.div>

            {/* CARD 05: AUTOMATED TEST EQUIPMENT (ATE) & TESTSTAND */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_4px_16px_-4px_rgba(11,35,64,0.05)] hover:border-[#E7651A]/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base sm:text-[17px] font-black text-[#0B2340] leading-snug flex-1">
                    <span className="text-[#E7651A]">05.</span> Automated Test Equipment (ATE) &amp; TestStand
                  </h3>
                  <div className="relative w-20 sm:w-24 aspect-[5/4] shrink-0">
                    <Image
                      src="/Silver Laptop Displaying TestStand PASS.png"
                      alt="Automated TestStand Sequence Execution Laptop"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                  Create repeatable, scalable, and production-ready automated testing environments.
                </p>
              </div>
            </motion.div>

          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            BOTTOM ROW: 4 CARDS ACROSS (CARDS 06 TO 09)
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-5 sm:mt-6">

          {/* CARD 06: ADVANCED SIGNAL PROCESSING & ENGINEERING ANALYTICS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_4px_16px_-4px_rgba(11,35,64,0.05)] hover:border-[#E7651A]/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-sm sm:text-base font-black text-[#0B2340] leading-snug flex-1">
                  <span className="text-[#E7651A]">06.</span> Advanced Signal Processing &amp; Engineering Analytics
                </h3>
                <div className="relative w-14 sm:w-16 aspect-square shrink-0">
                  <Image
                    src="/Modern Benchtop Oscilloscope Display.png"
                    alt="Oscilloscope Signal Waveform"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Convert raw measurement signals into engineering intelligence using advanced analysis and processing.
              </p>
            </div>
          </motion.div>

          {/* CARD 07: INDUSTRIAL COMMUNICATION & SYSTEM INTEGRATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_4px_16px_-4px_rgba(11,35,64,0.05)] hover:border-[#E7651A]/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-sm sm:text-base font-black text-[#0B2340] leading-snug flex-1">
                  <span className="text-[#E7651A]">07.</span> Industrial Communication &amp; System Integration
                </h3>
                <div className="relative w-14 sm:w-16 aspect-square shrink-0">
                  <Image
                    src="/Industrial NI cRIO Ethernet Controller Setup.png"
                    alt="Industrial Communication Module"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Connect diverse industrial devices, controllers, instruments, and engineering software through suitable communication interfaces.
              </p>
            </div>
          </motion.div>

          {/* CARD 08: DATABASE, TRACEABILITY & SMART REPORTING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_4px_16px_-4px_rgba(11,35,64,0.05)] hover:border-[#E7651A]/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-sm sm:text-base font-black text-[#0B2340] leading-snug flex-1">
                  <span className="text-[#E7651A]">08.</span> Database, Traceability &amp; Smart Reporting
                </h3>
                <div className="relative w-14 sm:w-16 aspect-square shrink-0">
                  <Image
                    src="/Silver Laptop with Analytics Dashboard.png"
                    alt="Database Analytics Laptop"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Build structured data management solutions that preserve measurement history and provide reliable access.
              </p>
            </div>
          </motion.div>

          {/* CARD 09: HARDWARE-IN-THE-LOOP (HIL) & SYSTEM VALIDATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_4px_16px_-4px_rgba(11,35,64,0.05)] hover:border-[#E7651A]/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-sm sm:text-base font-black text-[#0B2340] leading-snug flex-1">
                  <span className="text-[#E7651A]">09.</span> Hardware-in-the-Loop (HIL) &amp; System Validation
                </h3>
                <div className="relative w-14 sm:w-16 aspect-square shrink-0">
                  <Image
                    src="/NI LabVIEW Automation Test Bench.png"
                    alt="Hardware-in-the-Loop HIL Simulator"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Validate embedded controllers and complex systems using simulation-based testing and hardware integration.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
