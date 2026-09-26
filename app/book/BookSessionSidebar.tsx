"use client";

import React from "react";
import { CheckCircle2, MapPin, Phone, Sparkles } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { ShimmerText } from "@/components/ui/shimmer-text";

export default function BookSessionSidebar() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 shadow-sm bg-[#e6f4f1] border-[#b8dfd8]">
          <Sparkles className="w-3.5 h-3.5 text-[#0a2540]" strokeWidth={2.5} />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase text-[#0a2540]">
            CLAIM YOUR FREE QUOTE
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight leading-[1.1] mb-6 uppercase" style={{ WebkitTextStroke: "1px currentColor" }}>
          Tell Us Your <br />
          <span>
            Engineering Requirement
          </span>
        </h1>
        <div className="text-xl md:text-2xl font-bold text-slate-700 mb-6 -mt-4">
          for a Custom Test Solution
        </div>
        
        <ShimmerText className="text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.8] tracking-[0.005em] font-medium max-w-[64ch] mb-10" style={{ color: "#475569" }}>
          Submit your requirement in under 2 minutes. Our engineering team will review your application and recommend the right test, automation, measurement, or integration solution.
        </ShimmerText>

        {/* How It Works Timeline */}
        <div className="mb-12">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
            How it works
          </h3>
          <div className="space-y-6">
            {[
              { title: "Submit your requirement", desc: "2 minutes — tell us what you need", icon: <CheckCircle2 className="w-4 h-4 text-[#1D79C5]" /> },
              { title: "Our engineers review", desc: "We understand your application and technical requirements", icon: <Phone className="w-4 h-4 text-[#F2670E]" /> },
              { title: "Receive a solution proposal", desc: "Get a suitable technical approach and quotation", icon: <CheckCircle2 className="w-4 h-4 text-[#1D79C5]" /> },
              { title: "Start your project", desc: "Engineering, integration, testing and support", icon: <MapPin className="w-4 h-4 text-[#F2670E]" /> },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center shrink-0 mt-0.5">
                  {step.icon}
                </div>
                <div>
                  <h4 className="font-bold text-[#0B2540] text-sm">{step.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="bg-white rounded-xl p-4 border border-zinc-200 shadow-sm text-center">
            <div className="text-2xl font-black text-[#0B2540]">98.7%</div>
            <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">Success Rate</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-zinc-200 shadow-sm text-center">
            <div className="text-2xl font-black text-[#0B2540]">48-72h</div>
            <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">Turnaround</div>
          </div>
        </div>
      </div>

      {/* Contact Help */}
      <div className="bg-[#0B2540] rounded-2xl p-6 text-white shadow-lg mt-auto">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-4">
          NEED TECHNICAL ASSISTANCE?
        </h4>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">+91-704-308-4455</div>
              <div className="text-xs text-zinc-400">Mon–Sat, 9am–6pm IST</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4 text-[#25D366]" />
            </div>
            <div>
              <div className="font-bold text-sm">WhatsApp Us</div>
              <div className="text-xs text-zinc-400">Quick technical response</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
