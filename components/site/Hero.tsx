'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full bg-white text-slate-900 overflow-hidden pt-28 sm:pt-32 lg:pt-28 pb-8 lg:pb-12 min-h-[90vh] lg:min-h-[calc(100vh-16px)] flex items-center"
    >
      {/* Background Soft Glow & Curved Technological Waves (Matching Reference Image) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        {/* Soft Radial Ambient Glow behind the isometric ecosystem */}
        <div className="absolute top-[45%] right-[5%] -translate-y-1/2 w-[700px] lg:w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(231,101,26,0.08)_0%,rgba(11,35,64,0.03)_40%,rgba(255,255,255,0)_70%)]" />

        {/* Ambient technological concentric wave arcs (Top Right behind robotic hand) */}
        <svg
          className="absolute -top-12 -right-12 w-[800px] h-[800px] opacity-40 text-slate-200"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="700" cy="150" r="320" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="700" cy="150" r="460" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="700" cy="150" r="620" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="700" cy="150" r="780" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
        </svg>

        {/* Subtle Bottom Grid Floor Shadow */}
        <div
          className="absolute bottom-0 inset-x-0 h-40 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(203, 213, 225, 0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(203, 213, 225, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: '64px 32px',
            transform: 'perspective(480px) rotateX(60deg)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 60%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60%, black 100%)',
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-8 lg:pl-12 xl:pl-16 lg:pr-4 xl:pr-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-6 xl:gap-8">

          {/* ================= LEFT COLUMN: Headline, Intro & Actions (~45%) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 flex flex-col items-start text-left z-20"
          >
            {/* Eyebrow Tagline */}
            <div className="inline-flex items-center gap-2.5 mb-5 sm:mb-6">
              <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#536578]">
                INDUSTRIAL · DIGITAL · AI
              </span>
            </div>

            {/* Main Headline (Exact typography & line breaks from user reference) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[46px] xl:text-[54px] font-black tracking-[-0.03em] text-[#0B2340] leading-[1.08] mb-6">
              Engineering the <br />
              future through <br />
              <span className="text-[#E7651A]">intelligent technology</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-[14px] sm:text-[15px] xl:text-[16px] text-[#536578] leading-relaxed font-normal max-w-[480px] mb-8 sm:mb-10">
              <strong className="text-[#0B2340] font-semibold">VEST Solutions Private Limited</strong> delivers advanced engineering, industrial automation, software, AI, cloud, and digital solutions designed to improve productivity, reliability, quality, and operational efficiency.
            </p>

            {/* CTA Buttons (Sharp Rectangular Engineering Box Style) */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent hover:bg-transparent border-1.5 border-[#0B2340] hover:border-[#E7651A] text-[#0B2340] hover:text-[#E7651A] text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] rounded-none transition-all active:scale-95 group shadow-none"
              >
                <span>BOOK A DEMO</span>
                <ArrowUpRight size={17} className="text-[#0B2340] group-hover:text-[#E7651A] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/services/systems"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent hover:bg-transparent border-1.5 border-[#0B2340] hover:border-[#E7651A] text-[#0B2340] hover:text-[#E7651A] text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] rounded-none transition-all active:scale-95 group shadow-none"
              >
                <span>EXPLORE SOLUTIONS</span>
                <ArrowUpRight size={17} className="text-[#0B2340] group-hover:text-[#E7651A] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: Prominent Isometric IIoT Factory Ecosystem (~55%) ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center lg:justify-end my-5 lg:my-0 z-10 overflow-visible"
          >
            {/* Glowing Floor Pedestal Reflection under platforms (Shifted right with graphic) */}
            <div className="absolute -bottom-7 sm:-bottom-11 left-1/2 lg:left-[58%] -translate-x-1/2 w-72 sm:w-[460px] lg:w-[580px] h-24 bg-[#E7651A]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full lg:w-[108%] xl:w-[112%] 2xl:w-[116%] lg:-mr-4 xl:-mr-8 2xl:-mr-12 lg:translate-x-3 xl:translate-x-6 2xl:translate-x-8 flex items-center justify-center lg:justify-end">
              <div className="relative w-full flex items-center justify-center lg:justify-end -translate-x-[2px]">
                <Image
                  src="/Industrial Technology Automation Ecosystem.png"
                  alt="Isometric IIoT Factory Ecosystem - VEST Solutions"
                  width={1536}
                  height={1024}
                  priority
                  className="w-full h-auto max-h-[460px] sm:max-h-[520px] lg:max-h-[580px] xl:max-h-[640px] 2xl:max-h-[690px] object-contain lg:object-right select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(11,35,64,0.1)] scale-95 sm:scale-100 lg:scale-[1.0] xl:scale-[1.02] origin-center lg:origin-right"
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* ================= 3 FEATURED PRODUCTS SHOWCASE (Products Page Top 3) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
          className="mt-16 sm:mt-20 lg:mt-24 pt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-[1240px] mx-auto">
            {[
              {
                id: 'compactdaq',
                title: 'CompactDAQ',
                category: 'Modular Data Acquisition',
                image: '/CompactDAQ Modular Data Acquisition.png',
                description:
                  'CompactDAQ systems collect and deliver data validation to meet test requirements at any distance, in any environment. Portable, modular solutions that synchronize measurements across networks to digitize data closer to sensors.',
                href: '/products/compactdaq',
              },
              {
                id: 'compactrio',
                title: 'CompactRIO',
                category: 'Distributed Measurement and Control',
                image: '/Industrial LabVIEW CompactRIO Dashboard.png',
                description:
                  'CompactRIO systems combine high-performance real-time processing, FPGA hardware logic, and conditioned I/O modules, making them ideal for Industrial IoT, autonomous field data logging, and closed-loop control.',
                href: '/products/compactrio',
              },
              {
                id: 'pxi',
                title: 'PXI',
                category: 'High-Performance Test',
                image: '/PXI Instrument on Reflective Metallic Table.png',
                description:
                  'PXI is an open, modular test and measurement platform combining multi-channel instrumentation and sub-nanosecond synchronization to build high-throughput automated validation and production test systems.',
                href: '/products/pxi',
              },
            ].map((prod) => (
              <Link
                key={prod.id}
                href={prod.href}
                className="group flex flex-col items-center cursor-pointer select-none"
              >
                {/* White Rounded Card Box with Hover Description Overlay */}
                <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(11,35,64,0.06)] group-hover:border-slate-300 group-hover:shadow-[0_16px_36px_-6px_rgba(11,35,64,0.14)] group-hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                  {/* Default State: Full Product Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={prod.image}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Hover Overlay: Dark Card with Faint Background & Description Text (Matching Reference Style) */}
                  <div className="absolute inset-0 bg-[#2f353b]/95 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 sm:p-6 flex flex-col justify-between z-20">
                    {/* Faint product background watermark */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <Image
                        src={prod.image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* White Description Text */}
                    <p className="relative z-10 text-white text-xs sm:text-[13px] md:text-[13.5px] leading-relaxed font-normal">
                      {prod.description}
                    </p>

                    {/* Read More Button with » icon */}
                    <div className="relative z-10 flex justify-end items-center mt-2">
                      <span className="text-[#f59e0b] group-hover:text-[#fbbf24] font-bold text-xs sm:text-sm inline-flex items-center gap-1 transition-colors">
                        Read More <span className="text-base">&raquo;</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Typography Below Card */}
                <div className="mt-4 sm:mt-5 text-center">
                  <h3 className="text-base sm:text-lg font-bold text-[#0B2340] group-hover:text-[#E7651A] transition-colors leading-snug">
                    {prod.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#E7651A] font-semibold mt-1">
                    {prod.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Slider Pagination Bars */}
          <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
            <span className="w-8 h-1 bg-[#0B2340] rounded-full inline-block cursor-pointer transition-all" />
            <span className="w-8 h-1 bg-[#f59e0b] rounded-full inline-block cursor-pointer opacity-80 hover:opacity-100 transition-all" />
            <span className="w-8 h-1 bg-[#f59e0b] rounded-full inline-block cursor-pointer opacity-80 hover:opacity-100 transition-all" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
