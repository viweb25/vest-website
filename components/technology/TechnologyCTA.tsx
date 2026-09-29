'use client';

import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TechnologyCTA() {
  return (
    <section className="relative w-full bg-black text-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 xl:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start justify-between">
          
          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-8">
              LET'S BUILD TOGETHER
            </p>
            
            <h2 className="text-[clamp(3rem,5vw,5rem)] font-bold tracking-tight leading-[1.05] text-white mb-8 max-w-2xl">
              Ready for<br />cleaner air?
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed max-w-lg mb-14">
              Start a technical discussion with NAPCEN engineers. We analyze your process to provide the most effective pollution control solution.
            </p>

            {/* Contact Details Grid */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row gap-8">
                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#111111] border border-white/5 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#f97316]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1">SALES INQUIRY</span>
                    <a href="tel:+918886711810" className="text-white font-bold text-sm hover:text-[#f97316] transition-colors">
                      +91 88867 11810
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#111111] border border-white/5 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#f97316]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1">GENERAL SUPPORT</span>
                    <a href="mailto:admin@viwebsync.com" className="text-white font-bold text-sm hover:text-[#f97316] transition-colors uppercase">
                      ADMIN@VIWEBSYNC.COM
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#111111] border border-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#f97316]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1">HQ & Operations</span>
                  <span className="text-[13px] font-bold text-white leading-relaxed">
                    Tharangambadi,<br />
                    Tamil Nadu, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Quotation Card) */}
          <div className="w-full lg:w-[500px] xl:w-[550px] flex-shrink-0">
            <div className="w-full bg-[#0a0a0a] rounded-[24px] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              
              {/* Subtle top gradient glow effect on the card */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-[#0070f3]/30 to-transparent opacity-50" />
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Request a quotation
              </h3>
              
              <p className="text-slate-400 text-[15px] leading-relaxed mb-12">
                Provide your process specifications, and our engineers will evaluate the requirements for a customized solution.
              </p>

              <Link 
                href="/contact" 
                className="w-full bg-white rounded-full px-2 py-2 flex items-center justify-between group-hover:scale-[1.02] transition-transform duration-300"
              >
                <span className="pl-6 text-[13px] font-black tracking-widest uppercase text-black">
                  GET MY QUOTATION
                </span>
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0 transform transition-transform group-hover:rotate-45">
                  <ArrowRight size={18} className="text-white" />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
