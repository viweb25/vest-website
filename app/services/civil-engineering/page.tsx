'use client';

import React from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { useLenis } from '@/hooks/use-lenis';

import { CivilHero } from '@/components/civil-engineering/CivilHero';
import { 
  EngineeringOverview, 
  CivilServices, 
  EngineeringWorkflow,
  CivilGallery,
  CivilCTA 
} from '@/components/civil-engineering/CivilSections';

export default function CivilEngineeringPage() {
  useLenis();

  return (
    <div className="min-h-screen bg-[#f8fbff] dark:bg-[#000000] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#0e7c86]/20 selection:text-[#0b2027]">
      <Navbar />
      
      <main className="flex flex-col relative z-10 overflow-hidden bg-white">
        <CivilHero />
        <EngineeringOverview />
        <CivilServices />
        <EngineeringWorkflow />
        <CivilGallery />
        <CivilCTA />
      </main>

      <Footer />
    </div>
  );
}
