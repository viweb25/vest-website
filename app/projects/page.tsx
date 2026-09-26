"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import FloatingCards from '@/components/ui/3d-sliding-cards';

export default function ProjectsPage() {
  // We need to allow scrolling for the cards. The body height should be large.
  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff'; // full white
    document.body.style.backgroundImage = 'none'; // remove dots
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.backgroundImage = '';
    }
  }, []);

  return (
    <div className="min-h-[400vh] relative font-sans text-black bg-white selection:bg-black selection:text-white overflow-x-hidden" style={{ backgroundImage: 'none' }}>

      {/* Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-[5vw] max-w-[100vw]">
        <div className="w-[1px] h-full bg-black/5"></div>
        <div className="w-[1px] h-full bg-black/5"></div>
        <div className="w-[1px] h-full bg-black/5"></div>
        <div className="w-[1px] h-full bg-black/5"></div>
        <div className="w-[1px] h-full bg-black/5"></div>
        <div className="w-[1px] h-full bg-black/5"></div>
        <div className="w-[1px] h-full bg-black/5"></div>
      </div>

      {/* Static Typography & Layout Layer */}
      <div className="fixed inset-0 pointer-events-none z-10 p-[5vw] flex flex-col justify-between">

        {/* Top Left */}
        <div className="absolute top-8 left-[5vw] flex items-center gap-2 pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-[#5d9c6c]"></div>
          <span className="text-[10px] font-bold tracking-widest uppercase">Available for Service</span>
        </div>

        {/* Center / Left Typography */}
        <div className="absolute top-[28%] left-[10vw]">
          <h1 className="text-[8vw] md:text-[80px] font-medium leading-[0.85] tracking-tighter">
            Ai Lavview
          </h1>
          <p className="mt-6 text-[11px] font-bold tracking-widest uppercase ml-1">
            Advanced Tech Solutions
          </p>
        </div>

        {/* Bottom Left Menu */}
        <div className="absolute bottom-[20%] left-[5vw] pointer-events-auto">
          <ul className="text-[11px] font-bold tracking-widest leading-relaxed flex flex-col gap-2">
            <li><Link href="/" className="hover:opacity-50">HOME</Link></li>
            <li><Link href="/services/engineering" className="hover:opacity-50">ENGINEERING</Link></li>
            <li><Link href="/services/systems" className="hover:opacity-50">SYSTEMS</Link></li>
            <li><Link href="/services/technology" className="hover:opacity-50">TECHNOLOGY</Link></li>
            <li><Link href="/products" className="hover:opacity-50">PRODUCTS</Link></li>
            <li><Link href="/about" className="hover:opacity-50">ABOUT</Link></li>
            <li><Link href="/contact" className="hover:opacity-50">CONTACT US</Link></li>
          </ul>
        </div>

        {/* Bottom Left Actions */}
        <div className="absolute bottom-[5vw] left-[5vw] pointer-events-auto flex flex-col gap-8">
          <div className="flex gap-4 text-black">
            {/* Social Icons (Instagram, Facebook, LinkedIn) */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
          </div>
        </div>

        {/* Bottom Right Text block */}
        <div className="absolute bottom-[20%] right-[5vw] max-w-[200px]">
          <p className="text-[10px] font-semibold leading-[1.6] tracking-wider uppercase mb-8">
            We are Labview, your trusted partner for professional technology solutions. We provide fast, reliable, and high-quality services that balance efficiency and performance.
          </p>
          <p className="text-[10px] font-semibold leading-[1.6] tracking-wider uppercase">
            Based locally<br />
            Serving nationwide
          </p>
        </div>
      </div>

      {/* The 3D Sliding Cards */}
      <FloatingCards />

    </div>
  );
}
