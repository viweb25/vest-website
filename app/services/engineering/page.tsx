'use client';

import React from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { useLenis } from '@/hooks/use-lenis';

import EngineeringHero from '@/components/engineering/EngineeringHero';
import EngineeringDisciplines from '@/components/engineering/EngineeringDisciplines';
import EngineeringWorkflow from '@/components/engineering/EngineeringWorkflow';
import EngineeringCTA from '@/components/engineering/EngineeringCTA';

export default function EngineeringSolutionsPage() {
  // Initialize Lenis smooth scrolling for this page
  useLenis();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0e7c86]/20 selection:text-[#0b2027]">
      <Navbar />
      
      <main className="flex flex-col relative z-10 overflow-hidden">
        <EngineeringHero />
        <EngineeringDisciplines />
        <EngineeringWorkflow />
        <EngineeringCTA />
      </main>

      <Footer />
    </div>
  );
}
