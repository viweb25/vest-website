'use client';

import React from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { useLenis } from '@/hooks/use-lenis';
import { DigitalMarketingHero } from '@/components/technology/DigitalMarketingHero';
import { FlowArtDemo } from '@/components/technology/FlowArtDemo';

export default function DigitalMarketingPage() {
  useLenis();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0e7c86]/20 selection:text-[#0b2027]">
      <Navbar />
      
      <main className="flex flex-col relative z-10">
        <DigitalMarketingHero />
        <FlowArtDemo />
      </main>

      <Footer />
    </div>
  );
}
