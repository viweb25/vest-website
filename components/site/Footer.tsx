'use client';

import { Linkedin, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#080808] pt-24 pb-8 text-[#a3a3a3] font-mono text-[11px] uppercase tracking-wider overflow-hidden">
      {/* Ensure solid dark background */}
      <div className="absolute inset-0 bg-[#080808] -z-10" />

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">

        {/* TOP ROW: FOLLOW */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-24">
          <span className="text-[#666]"> [ FOLLOW ] </span>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 hover:bg-white/5 hover:text-white transition-colors">
              <Linkedin size={14} />
              <span className="mt-0.5">linkedin</span>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 hover:bg-white/5 hover:text-white transition-colors">
              <Instagram size={14} />
              <span className="mt-0.5">instagram</span>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 hover:bg-white/5 hover:text-white transition-colors">
              <Facebook size={14} />
              <span className="mt-0.5">facebook</span>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 hover:bg-white/5 hover:text-white transition-colors">
              <Youtube size={14} />
              <span className="mt-0.5">youtube</span>
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 mb-24">

          {/* Col 1 & 2: Popular Services (Spans 5 cols) */}
          <div className="md:col-span-5">
            <h4 className="text-[#666] mb-8">Core Expertise</h4>
            <div className="grid grid-cols-2 gap-y-5 gap-x-8">
              <a href="#" className="hover:text-white transition-colors">Lorem ipsum dolor</a>
              <a href="#" className="hover:text-white transition-colors flex items-center justify-between group">
                <span>Sit amet consectetur</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] opacity-80 shadow-[0_0_8px_#f43f5e]" />
              </a>
              <a href="#" className="hover:text-white transition-colors">Adipiscing elit</a>
              <a href="#" className="hover:text-white transition-colors flex items-center justify-between group">
                <span>Sed do eiusmod</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] opacity-80 shadow-[0_0_8px_#f43f5e]" />
              </a>
              <a href="#" className="hover:text-white transition-colors">Tempor incididunt</a>
              <a href="#" className="text-white hover:text-[#f43f5e] transition-colors flex items-center gap-2 font-bold">
                Ut labore <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {/* Col 3: Company (Spans 3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-[#666] mb-8">Company</h4>
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <a href="#" className="hover:text-white transition-colors">Services</a>
              <a href="#" className="hover:text-white transition-colors">Case studies</a>
              <a href="#" className="hover:text-white transition-colors">Blog</a>
              <a href="/careers" className="hover:text-white transition-colors flex items-center justify-between group">
                <span>Careers</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2670E] opacity-80 shadow-[0_0_8px_#F2670E]" />
              </a>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Col 4: Quick Links (Spans 4 cols) */}
          <div className="md:col-span-4 flex justify-between">
            <div className="w-full">
              <h4 className="text-[#666] mb-8">Quick Links</h4>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                <a href="/pricing" className="hover:text-white transition-colors">Book a Demo</a>
                <a href="#" className="hover:text-white transition-colors">Reviews</a>
                <a href="#" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>System Diagnosis</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] opacity-80 shadow-[0_0_8px_#f43f5e]" />
                </a>
                <a href="#" className="hover:text-white transition-colors">AI Visibility Check</a>
                <a href="#" className="hover:text-white transition-colors">Free Code Audit</a>
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                <a href="#" className="hover:text-white transition-colors text-[#666]">llms.txt</a>
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
                <span className="text-white">CITY ONE • LRM • HQ • 14:30</span>
              </div>
              {/* Location Pill 2 */}
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2 text-[10px]">
                <span className="text-[#a3a3a3]">CITY TWO • IPS • PRESENCE • 02:00</span>
              </div>
              {/* Location Pill 3 */}
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2 text-[10px]">
                <span className="text-[#a3a3a3]">CITY THREE • DLR • PRESENCE • 13:00</span>
              </div>
            </div>

            {/* Stats Pill */}
            <div className="flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2 text-[10px] bg-white/5">
              <span className="text-white">10+ YEARS • 500+ PROJECTS • 12 COUNTRIES</span>
            </div>
          </div>

          {/* Payment & Crypto */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-[10px]">
              <span className="text-[#666]">PAYMENT RATES</span>
              <div className="flex gap-2 text-white/40">
                <div className="px-2 py-0.5 border border-white/10 rounded-sm">VISA</div>
                <div className="px-2 py-0.5 border border-white/10 rounded-sm">MC</div>
                <div className="px-2 py-0.5 border border-white/10 rounded-sm">AMEX</div>
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
            © {currentYear} LOREM IPSUM® — REGISTERED TRADEMARK • BUILT TO EVOLVE
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS AND CONDITIONS</a>
            <a href="#" className="hover:text-white transition-colors">COOKIES</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
