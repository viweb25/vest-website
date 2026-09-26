'use client';

import React, { useState, useEffect } from 'react';
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

  // Auto-slide tabs every 5 seconds
  useEffect(() => {
    const tabs = ['labview', 'plc', 'ai'];
    const interval = setInterval(() => {
      setActiveTab((currentTab) => {
        const currentIndex = tabs.indexOf(currentTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0e7c86]/20 selection:text-[#0b2027]">
      <Navbar />

      <main className="flex flex-col relative z-10">
        <SystemsHero />

        {/* Custom Tabs Section */}
        <div className="pt-16 pb-8 bg-white flex justify-center relative z-20">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 px-4 max-w-5xl">
            <button
              onClick={() => setActiveTab('labview')}
              className={`px-5 py-2.5 md:px-8 md:py-3.5 rounded-full text-xs md:text-sm font-bold transition-all border ${activeTab === 'labview'
                ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-black/10'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
            >
              LabVIEW Engineering
            </button>
            <button
              onClick={() => setActiveTab('plc')}
              className={`px-5 py-2.5 md:px-8 md:py-3.5 rounded-full text-xs md:text-sm font-bold transition-all border ${activeTab === 'plc'
                ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-black/10'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
            >
              PLC Programming & Industrial Automation
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-5 py-2.5 md:px-8 md:py-3.5 rounded-full text-xs md:text-sm font-bold transition-all border ${activeTab === 'ai'
                ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-black/10'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
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
