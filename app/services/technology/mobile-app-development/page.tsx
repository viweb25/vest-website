'use client';

import React from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { useLenis } from '@/hooks/use-lenis';
import { MobileAppDevHero } from '@/components/technology/MobileAppDevHero';
import { FlowArtDemo } from '@/components/technology/FlowArtDemo';

export default function MobileAppDevelopmentPage() {
  useLenis();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0e7c86]/20 selection:text-[#0b2027]">
      <Navbar />
      
      <main className="flex flex-col relative z-10">
        <MobileAppDevHero />
        <FlowArtDemo />
      </main>

      <Footer />
    </div>
  );
}
