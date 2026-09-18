'use client';

import { ArrowUpRight } from 'lucide-react';
import { scrollToId } from '@/hooks/use-lenis';

const METRICS = [
  { value: '< 10ms', label: 'Inference latency on NI hardware', accent: '#00f2fe' },
  { value: '99.98%', label: 'Uptime across deployed systems', accent: '#4facfe' },
  { value: 'Zero', label: 'Cloud dependency in production', accent: '#a78bfa' },
  { value: '3x', label: 'Faster test cycle time on average', accent: '#ff2e8c' },
];

export default function Benefits() {
  return (
    <section className="relative py-32 sm:py-48 overflow-hidden" style={{ background: '#0a0b0d' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div aria-hidden className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(79,172,254,0.06) 0%, transparent 70%)' }} />
      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-20">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/25 mb-4">[ Why choose us ]</p>
            <h2 className="font-display font-black text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.1] tracking-[-0.03em] text-white">
              Numbers that<br />
              <span style={{
                background: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                do not lie.
              </span>
            </h2>
          </div>
          <button
            onClick={() => scrollToId('process')}
            className="group hidden sm:flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-white/30 hover:text-white transition-colors shrink-0"
          >
            See the process
            <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {METRICS.map((m, i) => (
            <div
              key={i}
              className="group relative flex flex-col justify-between p-8 bg-[#0a0b0d] hover:bg-[#111318] transition-colors duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${m.accent}, transparent)` }} />
              <span
                className="font-display font-black text-[clamp(2.5rem,4vw,3.5rem)] leading-none mb-6"
                style={{
                  background: `linear-gradient(135deg, ${m.accent} 0%, white 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {m.value}
              </span>
              <p className="font-mono text-[11px] tracking-[0.1em] text-white/35 uppercase leading-relaxed">
                {m.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-mono text-[10px] tracking-[0.15em] text-white/20 uppercase">
          Based on client deployments across Aerospace, Defence and Automotive — not projections.
        </p>
      </div>
    </section>
  );
}
