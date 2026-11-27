'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronDown, MonitorPlay, Sparkles, UploadCloud } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const SystemsHeroCanvas = dynamic(() => import('./SystemsHeroCanvas'), { ssr: false });

const TECH_LABELS = [
  { text: 'LABVIEW',        x: '8%',  y: '22%', delay: 0.3 },
  { text: 'DAQ SYSTEMS',    x: '75%', y: '12%', delay: 0.7 },
  { text: 'PLC AUTOMATION', x: '5%',  y: '68%', delay: 1.1 },
  { text: 'AI INFERENCE',   x: '80%', y: '72%', delay: 1.5 },
  { text: 'SCADA',          x: '38%', y: '90%', delay: 1.9 },
];

export default function SystemsHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const headingY  = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentO  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const canvasY   = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section
      ref={ref}
      className="relative w-full aspect-[2.2/1] flex items-center overflow-hidden bg-white"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/banner-sys.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
          filter: 'brightness(1.1)'
        }}
      />

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14,124,134,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,124,134,0.045) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      {/* Coordinate corner marks */}
      {[['top-10 left-10', '0,0'], ['top-10 right-10', '1,0'], ['bottom-10 left-10', '0,1'], ['bottom-10 right-10', '1,1']].map(([pos, coord]) => (
        <div key={coord} className={`absolute ${pos} pointer-events-none`}>
          <span className="text-[9px] font-mono text-[#E7651A]/30 tracking-widest">
            [{coord}]
          </span>
        </div>
      ))}

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 xl:px-16 pt-12 md:pt-20 flex flex-col items-start justify-center text-left">

        {/* ── Left: text content ─────────────────────────────── */}
        <motion.div style={{ y: headingY, opacity: contentO }} className="flex flex-col items-start gap-8 max-w-[800px]">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E7651A]/25 bg-[#e6f4f5] w-fit"
          >
            <Sparkles size={14} className="text-[#E7651A]" />
            <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#0B2340]">
              Systems
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="font-black text-black leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}
          >
            Test. Measure.<br />
            Automate.<br />
            Analyze.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="font-bold leading-relaxed max-w-[60ch] text-[#536578]"
            style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)' }}
          >
            VEST Solutions is an engineering systems provider specializing in industrial automation and test systems, from a single instrument rack to a connected production line.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact?topic=LabVIEW%20Development"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent hover:bg-transparent border-1.5 border-[#0B2340] hover:border-[#E7651A] text-[#0B2340] hover:text-[#E7651A] text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] rounded-none transition-all active:scale-95 group shadow-none"
            >
              <UploadCloud size={17} className="text-[#0B2340] group-hover:text-[#E7651A] transition-colors" />
              <span>REQUEST A QUOTE</span>
            </Link>
            <Link
              href="/demo?service=LabVIEW%20Development"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent hover:bg-transparent border-1.5 border-[#0B2340] hover:border-[#E7651A] text-[#0B2340] hover:text-[#E7651A] text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] rounded-none transition-all active:scale-95 group shadow-none"
            >
              <MonitorPlay size={17} className="text-[#0B2340] group-hover:text-[#E7651A] transition-colors" />
              <span>BOOK A DEMO</span>
              <ArrowUpRight size={17} className="text-[#0B2340] group-hover:text-[#E7651A] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>


        </motion.div>



      </div>
    </section>
  );
}
