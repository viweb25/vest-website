'use client';

import React, { useState } from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { useLenis } from '@/hooks/use-lenis';

import SystemsHero from '@/components/systems/SystemsHero';
import LabviewSection from '@/components/systems/LabviewSection';
import SystemsWorkflow from '@/components/systems/SystemsWorkflow';
import PlcSection from '@/components/systems/PlcSection';
import AiAutomation from '@/components/systems/AiAutomation';
import SystemsPricing from '@/components/systems/SystemsPricing';
import SystemsFAQ from '@/components/systems/SystemsFAQ';

export default function SystemsPage() {
  // Initialize Lenis smooth scrolling for this page
  useLenis();
  const [activeTab, setActiveTab] = useState('labview');


  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0e7c86]/20 selection:text-[#0b2027]">
      <Navbar />

      <main className="flex flex-col relative z-10">
        <SystemsHero />

        {/* Custom Tabs Section */}
        <div className="pt-16 pb-2 bg-white flex justify-center relative z-20">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 px-4 max-w-5xl">
            <button
              onClick={() => setActiveTab('labview')}
              className={`px-8 py-4 md:px-12 md:py-5 rounded-full text-base md:text-lg font-extrabold transition-all border-2 ${activeTab === 'labview'
                ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900'
                }`}
            >
              LabVIEW Engineering
            </button>
            <button
              onClick={() => setActiveTab('plc')}
              className={`px-8 py-4 md:px-12 md:py-5 rounded-full text-base md:text-lg font-extrabold transition-all border-2 ${activeTab === 'plc'
                ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900'
                }`}
            >
              PLC Programming & Industrial Automation
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-8 py-4 md:px-12 md:py-5 rounded-full text-base md:text-lg font-extrabold transition-all border-2 ${activeTab === 'ai'
                ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900'
                }`}
            >
              Intelligent Automation with LabVIEW + AI
            </button>
          </div>
        </div>

        {activeTab === 'labview' && <LabviewSection />}
        {activeTab === 'plc' && <PlcSection />}
        {activeTab === 'ai' && <AiAutomation />}

        <SystemsWorkflow />
        <SystemsPricing />
        <SystemsFAQ />
      </main>

      <Footer />
    </div>
  );
}
