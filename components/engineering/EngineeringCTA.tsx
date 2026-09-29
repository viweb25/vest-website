'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UploadCloud, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function EngineeringCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >

      {/* Animated SVG blueprint lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Dimension lines */}
        <motion.line
          x1="8%" y1="20%" x2="35%" y2="20%"
          stroke="#0e7c86" strokeWidth="0.7" strokeOpacity="0.15"
          strokeDasharray="200"
          initial={{ strokeDashoffset: 200 }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.2, ease: 'easeInOut' }}
        />
        <motion.line
          x1="65%" y1="75%" x2="92%" y2="75%"
          stroke="#0e7c86" strokeWidth="0.7" strokeOpacity="0.15"
          strokeDasharray="200"
          initial={{ strokeDashoffset: 200 }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.5, ease: 'easeInOut' }}
        />
        {/* Corner ticks */}
        <motion.line x1="8%" y1="18%" x2="8%" y2="22%"
          stroke="#0e7c86" strokeWidth="0.7" strokeOpacity="0.2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.5 }} />
        <motion.line x1="35%" y1="18%" x2="35%" y2="22%"
          stroke="#0e7c86" strokeWidth="0.7" strokeOpacity="0.2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.6 }} />
        <motion.line x1="65%" y1="73%" x2="65%" y2="77%"
          stroke="#0e7c86" strokeWidth="0.7" strokeOpacity="0.2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.7 }} />
        <motion.line x1="92%" y1="73%" x2="92%" y2="77%"
          stroke="#0e7c86" strokeWidth="0.7" strokeOpacity="0.2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.8 }} />

        {/* Structural grid sketch — top-left */}
        {[0,1,2].map(i => (
          <motion.rect
            key={i}
            x={`${5 + i * 4}%`} y="5%"
            width="3%" height="12%"
            fill="none" stroke="#0e7c86" strokeWidth="0.5" strokeOpacity="0.08"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 + i * 0.15 }}
          />
        ))}
        {/* Structural grid sketch — bottom-right */}
        {[0,1,2].map(i => (
          <motion.rect
            key={i}
            x={`${80 + i * 4}%`} y="83%"
            width="3%" height="12%"
            fill="none" stroke="#0e7c86" strokeWidth="0.5" strokeOpacity="0.08"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 + i * 0.15 }}
          />
        ))}

        {/* Coordinate labels */}
        <motion.text x="6%" y="14%" fill="#0e7c86" fillOpacity="0.2"
          fontSize="7" fontFamily="monospace" letterSpacing="1"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}>
          X.01
        </motion.text>
        <motion.text x="84%" y="82%" fill="#0e7c86" fillOpacity="0.2"
          fontSize="7" fontFamily="monospace" letterSpacing="1"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}>
          X.04
        </motion.text>
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0e7c86]/25 bg-[#e6f4f5] mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0e7c86]" />
          <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#0b2027]">
            Start a Project
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-black text-[#0b2027] leading-[0.95] tracking-tight mb-8"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            WebkitTextStroke: '1.5px currentColor',
          }}
        >
          Send us your<br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #0e7c86, #1e56a0)', WebkitTextStroke: '0' }}
          >
            drawings or<br />project brief
          </span>
        </motion.h2>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-[#44616b] font-medium leading-relaxed max-w-[52ch] text-[15px] mb-12"
        >
          Tell us the scope, drawing standard and schedule. We will confirm the
          deliverables and respond with a quotation.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/contact?topic=Engineering+Quote"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold border border-zinc-300 text-[#0b2027] hover:text-[#0e7c86] hover:border-[#0e7c86] hover:-translate-y-0.5 transition-all"
          >
            <UploadCloud size={17} />
            Request a Quote
          </Link>
          <Link
            href="/contact?topic=Engineering+Consultation"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold border border-zinc-300 text-[#0b2027] hover:text-[#0e7c86] hover:border-[#0e7c86] hover:-translate-y-0.5 transition-all"
          >
            Talk to an Engineer
            <ArrowUpRight size={17} />
          </Link>
        </motion.div>

        {/* Technical annotation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex items-center gap-3 text-[11px] font-mono text-[#0b2027]/20 tracking-widest uppercase"
        >
          <div className="w-8 h-px bg-[#0e7c86]/20" />
          VEST Solutions — Engineering Division
          <div className="w-8 h-px bg-[#0e7c86]/20" />
        </motion.div>
      </div>
    </section>
  );
}
