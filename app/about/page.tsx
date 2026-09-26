"use client";

import React from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { useLenis } from '@/hooks/use-lenis';

import Hero from '@/components/about/Hero';
import WhoWeAre from '@/components/about/WhoWeAre';
import Philosophy from '@/components/about/Philosophy';
import Expertise from '@/components/about/Expertise';
import Process from '@/components/about/Process';
import Team from '@/components/about/Team';
import Future from '@/components/about/Future';

export default function AboutPage() {
  useLenis(); // Ensure smooth scrolling is enabled

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#2563EB] selection:text-white">
      <Navbar />
      
      <main className="flex flex-col relative z-10 overflow-hidden pt-24 md:pt-32">
        <Hero />
        
        <div className="flex justify-center py-8">
          <ScrollCue />
        </div>

        <WhoWeAre />
        
        <div className="flex justify-center py-8">
          <ScrollCue />
        </div>

        <Philosophy />

        <div className="flex justify-center py-8">
          <ScrollCue />
        </div>
        
        <Expertise />

        <div className="flex justify-center py-8">
          <ScrollCue />
        </div>
        
        <Process />

        <div className="flex justify-center py-8">
          <ScrollCue />
        </div>
        
        <Team />
        
        <Future />
      </main>

      <Footer />
    </div>
  );
}

function ScrollCue() {
  return (
    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-slate-300 to-transparent relative opacity-50 my-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
    </div>
  );
}
