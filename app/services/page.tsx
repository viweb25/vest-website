'use client';

import { useLenis } from '@/hooks/use-lenis';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { InteractiveDotGrid } from '@/components/canvas/InteractiveDotGrid';
import { Star } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ThreeProvider } from '@/lib/three-context';
import TrustAndStatsBar from '@/components/site/TrustAndStatsBar';

const AmbientBackground = dynamic(
  () => import('@/components/three/AmbientBackground'),
  { ssr: false }
);

function LenisBridge() {
  useLenis();
  return null;
}

export default function ServicesPage() {
  return (
    <ThreeProvider>
      <LenisBridge />
      <Navbar />

      {/* Dark background */}
      <div className="fixed inset-0 z-[-1] bg-[#0d0d0d]">
        <InteractiveDotGrid />
        <AmbientBackground />
      </div>

      <main className="relative min-h-screen pt-32 pb-32 flex flex-col items-center justify-center overflow-hidden">

        <div className="w-full px-4 sm:px-4 text-center flex flex-col items-center z-10">

          {/* Subtitle / Eyebrow */}
          <div className="mb-8 flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#f43f5e] uppercase animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
            <span className="text-black/50 tracking-widest">WHAT WE DO</span>
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#f43f5e] shadow-[0_0_8px_#f43f5e]" />
            <span className="font-bold tracking-widest">ERP IMPLEMENTATION</span>
          </div>

          {/* Hero Title */}
          <h1 className="font-mono text-[3.5rem] sm:text-[5.5rem] lg:text-[7.5rem] font-black text-black tracking-tighter leading-[1.05] mb-12">
            Sixteen services. One<br />
            <span className="text-black/90">operating model.</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-[#a3a3a3] font-mono text-sm sm:text-base leading-relaxed mb-16 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 ease-out fill-mode-both">
            Every engagement starts with the business outcome we're trying<br className="hidden sm:block" /> to move. The service we deliver is whatever the outcome demands<br className="hidden sm:block" /> — and an AI-driven process is baked into all of them.
          </p>

          {/* Trust & Stats Bar */}
          <TrustAndStatsBar />

        </div>

        {/* Marquee Text */}
        <div className="absolute bottom-12 w-full overflow-hidden text-white/10 font-mono text-[10px] tracking-[0.4em] uppercase pointer-events-none select-none z-0">
          <div className="animate-marquee whitespace-nowrap text-center opacity-60">
            COMPANIES THAT BELIEVE IN US • COMPANIES THAT BELIEVE IN US • COMPANIES THAT BELIEVE IN US • COMPANIES THAT BELIEVE IN US • COMPANIES THAT BELIEVE IN US • COMPANIES THAT BELIEVE IN US • COMPANIES THAT BELIEVE IN US • COMPANIES THAT BELIEVE IN US
          </div>
        </div>

      </main>

      <Footer />
    </ThreeProvider>
  );
}
