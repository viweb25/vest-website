'use client';

import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, ArrowRight, Cpu, Zap, Database, Brain, Rocket } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero'; 

export default function Hero() {
  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'PRODUCT', href: '#' },
    { label: 'STORE', href: '#' },
    { label: 'ABOUT US', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  const DeliveryFlowBanner = (
    <div className="w-full bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-sm p-4 md:p-6 lg:rounded-2xl rounded-t-2xl">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="flex-shrink-0 text-left">
          <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-1">VEST Solutions / Delivery flow</p>
          <h3 className="text-sm md:text-base font-extrabold text-slate-800">Engineering precision. Industrial intelligence. Digital innovation.</h3>
        </div>
        
        <div className="flex flex-wrap items-center justify-start gap-4 lg:gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-full text-[#168a9f]"><Cpu size={18} strokeWidth={2.5} /></div>
            <div className="text-left"><p className="text-[10px] text-slate-500 font-bold uppercase">Phase 1</p><p className="text-[13px] font-bold text-slate-800 leading-tight">Engineering</p></div>
          </div>
          <div className="hidden md:block w-px h-6 bg-slate-200"></div>
          
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-full text-[#168a9f]"><Zap size={18} strokeWidth={2.5} /></div>
            <div className="text-left"><p className="text-[10px] text-slate-500 font-bold uppercase">Phase 2</p><p className="text-[13px] font-bold text-slate-800 leading-tight">Automation</p></div>
          </div>
          <div className="hidden md:block w-px h-6 bg-slate-200"></div>
          
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-full text-[#168a9f]"><Database size={18} strokeWidth={2.5} /></div>
            <div className="text-left"><p className="text-[10px] text-slate-500 font-bold uppercase">Phase 3</p><p className="text-[13px] font-bold text-slate-800 leading-tight">Data</p></div>
          </div>
          <div className="hidden md:block w-px h-6 bg-slate-200"></div>
          
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-full text-[#168a9f]"><Brain size={18} strokeWidth={2.5} /></div>
            <div className="text-left"><p className="text-[10px] text-slate-500 font-bold uppercase">Phase 4</p><p className="text-[13px] font-bold text-slate-800 leading-tight">AI</p></div>
          </div>
          <div className="hidden md:block w-px h-6 bg-slate-200"></div>
          
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-full text-[#168a9f]"><Rocket size={18} strokeWidth={2.5} /></div>
            <div className="text-left"><p className="text-[10px] text-slate-500 font-bold uppercase">Phase 5</p><p className="text-[13px] font-bold text-slate-800 leading-tight">Digital transformation</p></div>
          </div>
        </div>
      </div>
    </div>
  );

  const CustomMainText = (
    <div className="flex flex-col items-start text-left bg-white/70 backdrop-blur-sm p-6 rounded-3xl md:bg-transparent md:backdrop-blur-none md:p-0">
      <p className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
        Engineering the future through intelligent technology
      </p>
      {/* Reduced heading size and fully black color as requested */}
      <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-black leading-[1.15] tracking-tight mb-6">
        Engineering precision.<br />
        Industrial intelligence.<br />
        Digital innovation.
      </h2>
      <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed font-medium mb-8 max-w-lg">
        <strong className="text-black">VEST Solutions Private Limited</strong> delivers advanced engineering, industrial automation, software, AI, cloud, and digital solutions designed to improve productivity, reliability, quality, and operational efficiency.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button className="inline-flex items-center gap-2 rounded-full bg-[#fbbc24] px-6 py-3 text-[14px] font-bold text-black shadow-sm hover:-translate-y-0.5 transition-transform">
          Book a Demo
          <ArrowRight size={16} />
        </button>
        <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-transparent px-6 py-3 text-[14px] font-bold text-slate-800 hover:bg-slate-50 hover:-translate-y-0.5 transition-transform">
          Explore Our Solutions
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div id="home">
      <MinimalistHero
        logoText="mnmlst."
        navLinks={navLinks}
        mainText={CustomMainText}
        readMoreLink="#"
        imageSrc="/reboat.png"
        imageAlt="reboat"
        overlayText={{
          part1: 'less is',
          part2: 'more.',
        }}
        socialLinks={socialLinks}
        locationText="Arlington Heights, IL"
        bottomContent={DeliveryFlowBanner}
      />
    </div>
  );
}
