'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Linkedin, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';
import { ScrambleText, ScrambleContext } from '@/components/ui/scramble-text';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  return (
    <footer ref={footerRef} className="relative border-t border-[#16365c] bg-[#0B2340] pt-24 pb-8 text-[#B3C7DA] font-mono text-[11px] uppercase tracking-wider overflow-hidden">
      <ScrambleContext.Provider value={isInView}>
      {/* Ensure solid Deep Navy background */}
      <div className="absolute inset-0 bg-[#0B2340] -z-10" />

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">

        {/* TOP ROW: FOLLOW */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-24">
          <span className="text-[#8DABC8]"><ScrambleText>[ FOLLOW ]</ScrambleText></span>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[#B3C7DA] hover:border-[#E7651A] hover:text-[#E7651A] hover:bg-white/5 transition-colors">
              <Linkedin size={14} />
              <ScrambleText className="mt-0.5">linkedin</ScrambleText>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[#B3C7DA] hover:border-[#E7651A] hover:text-[#E7651A] hover:bg-white/5 transition-colors">
              <Instagram size={14} />
              <ScrambleText className="mt-0.5">instagram</ScrambleText>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[#B3C7DA] hover:border-[#E7651A] hover:text-[#E7651A] hover:bg-white/5 transition-colors">
              <Facebook size={14} />
              <ScrambleText className="mt-0.5">facebook</ScrambleText>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[#B3C7DA] hover:border-[#E7651A] hover:text-[#E7651A] hover:bg-white/5 transition-colors">
              <Youtube size={14} />
              <ScrambleText className="mt-0.5">youtube</ScrambleText>
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 mb-24">

          {/* Col 1 & 2: Popular Services (Spans 5 cols) */}
          <div className="md:col-span-5">
            <h4 className="text-[#8DABC8] mb-8 font-semibold tracking-widest text-[12px]"><ScrambleText>Core Expertise</ScrambleText></h4>
            <div className="grid grid-cols-2 gap-y-5 gap-x-8">
              <a href="/services/engineering" className="hover:text-white transition-colors"><ScrambleText>LabVIEW Engineering</ScrambleText></a>
              <a href="/services/systems" className="hover:text-white transition-colors flex items-center justify-between group">
                <ScrambleText>Automated Test Systems</ScrambleText>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E7651A] opacity-90 shadow-[0_0_8px_#E7651A]" />
              </a>
              <a href="/services/technology" className="hover:text-white transition-colors"><ScrambleText>Vision Inspection</ScrambleText></a>
              <a href="/services/systems" className="hover:text-white transition-colors flex items-center justify-between group">
                <ScrambleText>Embedded & cRIO Systems</ScrambleText>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E7651A] opacity-90 shadow-[0_0_8px_#E7651A]" />
              </a>
              <a href="/services/engineering" className="hover:text-white transition-colors"><ScrambleText>Industrial Automation</ScrambleText></a>
              <a href="/services/engineering" className="text-white hover:text-[#E7651A] transition-colors flex items-center gap-2 font-bold">
                <ScrambleText>Explore Services</ScrambleText> <ArrowRight size={12} className="text-[#E7651A]" />
              </a>
            </div>
          </div>

          {/* Col 3: Company (Spans 3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-[#8DABC8] mb-8 font-semibold tracking-widest text-[12px]"><ScrambleText>Company</ScrambleText></h4>
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <a href="/services/engineering" className="hover:text-white transition-colors"><ScrambleText>Services</ScrambleText></a>
              <a href="/projects" className="hover:text-white transition-colors"><ScrambleText>Case studies</ScrambleText></a>
              <a href="/blogs" className="hover:text-white transition-colors"><ScrambleText>Blog</ScrambleText></a>
              <a href="/careers" className="hover:text-white transition-colors flex items-center justify-between group">
                <ScrambleText>Careers</ScrambleText>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E7651A] opacity-90 shadow-[0_0_8px_#E7651A]" />
              </a>
              <a href="/about" className="hover:text-white transition-colors"><ScrambleText>About</ScrambleText></a>
              <a href="/contact" className="hover:text-white transition-colors"><ScrambleText>Contact</ScrambleText></a>
            </div>
          </div>

          {/* Col 4: Quick Links (Spans 4 cols) */}
          <div className="md:col-span-4 flex justify-between">
            <div className="w-full">
              <h4 className="text-[#8DABC8] mb-8 font-semibold tracking-widest text-[12px]"><ScrambleText>Quick Links</ScrambleText></h4>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                <a href="/pricing" className="text-[#E7651A] hover:text-white transition-colors font-bold"><ScrambleText>Book a Demo ↗</ScrambleText></a>
                <a href="/products" className="hover:text-white transition-colors"><ScrambleText>Products</ScrambleText></a>
                <a href="/services/systems" className="hover:text-white transition-colors flex items-center justify-between group">
                  <ScrambleText>System Diagnosis</ScrambleText>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E7651A] opacity-90 shadow-[0_0_8px_#E7651A]" />
                </a>
                <a href="/services/technology" className="hover:text-white transition-colors"><ScrambleText>AI Vision Check</ScrambleText></a>
                <a href="/contact" className="hover:text-white transition-colors"><ScrambleText>Free Code Audit</ScrambleText></a>
                <a href="/sitemap" className="hover:text-white transition-colors"><ScrambleText>Sitemap</ScrambleText></a>
                <a href="/llms.txt" className="hover:text-white transition-colors text-[#8DABC8]/60"><ScrambleText>llms.txt</ScrambleText></a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM METRICS & LOCATIONS */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10 border-b border-white/10 pb-16 mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Location Pill 1 */}
              <div className="flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E7651A] shadow-[0_0_8px_#E7651A]" />
                <ScrambleText className="text-white">HEADQUARTERS • CHENNAI • HQ • 14:30</ScrambleText>
              </div>
              {/* Location Pill 2 */}
              <div className="flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-[10px]">
                <ScrambleText className="text-[#B3C7DA]">BANGALORE • HUB • PRESENCE • 14:30</ScrambleText>
              </div>
              {/* Location Pill 3 */}
              <div className="flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-[10px]">
                <ScrambleText className="text-[#B3C7DA]">COIMBATORE • LAB • PRESENCE • 14:30</ScrambleText>
              </div>
            </div>

            {/* Stats Pill */}
            <div className="flex items-center gap-2.5 rounded-full border border-[#E7651A]/30 px-4 py-2 text-[10px] bg-[#E7651A]/10 text-white">
              <ScrambleText className="text-white">10+ YEARS • 500+ PROJECTS • 12 COUNTRIES</ScrambleText>
            </div>
          </div>

          {/* Payment & Quality Certs */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-[10px]">
              <ScrambleText className="text-[#8DABC8]">STANDARDS</ScrambleText>
              <div className="flex gap-2 text-white/70">
                <div className="px-2 py-0.5 border border-white/15 rounded-sm"><ScrambleText>ISO 9001</ScrambleText></div>
                <div className="px-2 py-0.5 border border-white/15 rounded-sm"><ScrambleText>NI ALLIANCE</ScrambleText></div>
                <div className="px-2 py-0.5 border border-white/15 rounded-sm"><ScrambleText>CE CERT</ScrambleText></div>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT & LEGAL */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-[10px] text-[#8DABC8]">
          <div>
            <ScrambleText>© {currentYear} VEST SOLUTIONS® — PRECISION ENGINEERING & INTELLIGENT AUTOMATION</ScrambleText>
          </div>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors"><ScrambleText>PRIVACY POLICY</ScrambleText></a>
            <a href="/terms-and-conditions" className="hover:text-white transition-colors"><ScrambleText>TERMS AND CONDITIONS</ScrambleText></a>
            <a href="/cookies" className="hover:text-white transition-colors"><ScrambleText>COOKIES</ScrambleText></a>
          </div>
        </div>

      </div>
      </ScrambleContext.Provider>
    </footer>
  );
}
