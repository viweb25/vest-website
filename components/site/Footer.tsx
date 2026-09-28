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
    <footer ref={footerRef} className="relative border-t border-white/5 bg-[#080808] pt-24 pb-8 text-[#a3a3a3] font-mono text-[11px] uppercase tracking-wider overflow-hidden">
      <ScrambleContext.Provider value={isInView}>
      {/* Ensure solid dark background */}
      <div className="absolute inset-0 bg-[#080808] -z-10" />

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">

        {/* TOP ROW: FOLLOW */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-24">
          <span className="text-[#666]"><ScrambleText>[ FOLLOW ]</ScrambleText></span>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 hover:bg-white/5 hover:text-white transition-colors">
              <Linkedin size={14} />
              <ScrambleText className="mt-0.5">linkedin</ScrambleText>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 hover:bg-white/5 hover:text-white transition-colors">
              <Instagram size={14} />
              <ScrambleText className="mt-0.5">instagram</ScrambleText>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 hover:bg-white/5 hover:text-white transition-colors">
              <Facebook size={14} />
              <ScrambleText className="mt-0.5">facebook</ScrambleText>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 hover:bg-white/5 hover:text-white transition-colors">
              <Youtube size={14} />
              <ScrambleText className="mt-0.5">youtube</ScrambleText>
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 mb-24">

          {/* Col 1 & 2: Popular Services (Spans 5 cols) */}
          <div className="md:col-span-5">
            <h4 className="text-[#666] mb-8"><ScrambleText>Core Expertise</ScrambleText></h4>
            <div className="grid grid-cols-2 gap-y-5 gap-x-8">
              <a href="#" className="hover:text-white transition-colors"><ScrambleText>Lorem ipsum dolor</ScrambleText></a>
              <a href="#" className="hover:text-white transition-colors flex items-center justify-between group">
                <ScrambleText>Sit amet consectetur</ScrambleText>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] opacity-80 shadow-[0_0_8px_#f43f5e]" />
              </a>
              <a href="#" className="hover:text-white transition-colors"><ScrambleText>Adipiscing elit</ScrambleText></a>
              <a href="#" className="hover:text-white transition-colors flex items-center justify-between group">
                <ScrambleText>Sed do eiusmod</ScrambleText>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] opacity-80 shadow-[0_0_8px_#f43f5e]" />
              </a>
              <a href="#" className="hover:text-white transition-colors"><ScrambleText>Tempor incididunt</ScrambleText></a>
              <a href="#" className="text-white hover:text-[#f43f5e] transition-colors flex items-center gap-2 font-bold">
                <ScrambleText>Ut labore</ScrambleText> <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {/* Col 3: Company (Spans 3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-[#666] mb-8"><ScrambleText>Company</ScrambleText></h4>
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <a href="#" className="hover:text-white transition-colors"><ScrambleText>Services</ScrambleText></a>
              <a href="#" className="hover:text-white transition-colors"><ScrambleText>Case studies</ScrambleText></a>
              <a href="#" className="hover:text-white transition-colors"><ScrambleText>Blog</ScrambleText></a>
              <a href="/careers" className="hover:text-white transition-colors flex items-center justify-between group">
                <ScrambleText>Careers</ScrambleText>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2670E] opacity-80 shadow-[0_0_8px_#F2670E]" />
              </a>
              <a href="#" className="hover:text-white transition-colors"><ScrambleText>About</ScrambleText></a>
              <a href="#" className="hover:text-white transition-colors"><ScrambleText>Contact</ScrambleText></a>
            </div>
          </div>

          {/* Col 4: Quick Links (Spans 4 cols) */}
          <div className="md:col-span-4 flex justify-between">
            <div className="w-full">
              <h4 className="text-[#666] mb-8"><ScrambleText>Quick Links</ScrambleText></h4>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                <a href="/pricing" className="hover:text-white transition-colors"><ScrambleText>Book a Demo</ScrambleText></a>
                <a href="#" className="hover:text-white transition-colors"><ScrambleText>Reviews</ScrambleText></a>
                <a href="#" className="hover:text-white transition-colors flex items-center justify-between group">
                  <ScrambleText>System Diagnosis</ScrambleText>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] opacity-80 shadow-[0_0_8px_#f43f5e]" />
                </a>
                <a href="#" className="hover:text-white transition-colors"><ScrambleText>AI Visibility Check</ScrambleText></a>
                <a href="#" className="hover:text-white transition-colors"><ScrambleText>Free Code Audit</ScrambleText></a>
                <a href="#" className="hover:text-white transition-colors"><ScrambleText>Sitemap</ScrambleText></a>
                <a href="#" className="hover:text-white transition-colors text-[#666]"><ScrambleText>llms.txt</ScrambleText></a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM METRICS & LOCATIONS */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10 border-b border-white/5 pb-16 mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Location Pill 1 */}
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] shadow-[0_0_8px_#f43f5e]" />
                <ScrambleText className="text-white">CITY ONE • LRM • HQ • 14:30</ScrambleText>
              </div>
              {/* Location Pill 2 */}
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2 text-[10px]">
                <ScrambleText className="text-[#a3a3a3]">CITY TWO • IPS • PRESENCE • 02:00</ScrambleText>
              </div>
              {/* Location Pill 3 */}
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2 text-[10px]">
                <ScrambleText className="text-[#a3a3a3]">CITY THREE • DLR • PRESENCE • 13:00</ScrambleText>
              </div>
            </div>

            {/* Stats Pill */}
            <div className="flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2 text-[10px] bg-white/5">
              <ScrambleText className="text-white">10+ YEARS • 500+ PROJECTS • 12 COUNTRIES</ScrambleText>
            </div>
          </div>

          {/* Payment & Crypto */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-[10px]">
              <ScrambleText className="text-[#666]">PAYMENT RATES</ScrambleText>
              <div className="flex gap-2 text-white/40">
                <div className="px-2 py-0.5 border border-white/10 rounded-sm"><ScrambleText>VISA</ScrambleText></div>
                <div className="px-2 py-0.5 border border-white/10 rounded-sm"><ScrambleText>MC</ScrambleText></div>
                <div className="px-2 py-0.5 border border-white/10 rounded-sm"><ScrambleText>AMEX</ScrambleText></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/40">₿</div>
              <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/40">Ξ</div>
              <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/40">S</div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT & LEGAL */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-[9px] text-[#666]">
          <div>
            <ScrambleText>© {currentYear} LOREM IPSUM® — REGISTERED TRADEMARK • BUILT TO EVOLVE</ScrambleText>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors"><ScrambleText>PRIVACY POLICY</ScrambleText></a>
            <a href="/terms-and-conditions" className="hover:text-white transition-colors"><ScrambleText>TERMS AND CONDITIONS</ScrambleText></a>
            <a href="#" className="hover:text-white transition-colors"><ScrambleText>COOKIES</ScrambleText></a>
          </div>
        </div>

      </div>
      </ScrambleContext.Provider>
    </footer>
  );
}
