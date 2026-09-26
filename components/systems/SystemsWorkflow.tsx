'use client';

import React from "react";
import Timeline from "@/components/ui/timeline";
import { SectionHeader } from '@/components/ui/section-header';

export default function SystemsWorkflow() {
  return (
    <section className="py-24 md:py-32 bg-[#f8fafc] relative">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10">
        <SectionHeader 
          eyebrow="Lifecycle"
          className="text-center items-center flex flex-col mb-16"
          title={
            <>LabVIEW Development<br />Services</>
          }
          description="We can support your project across the full lifecycle. Select a stage."
        />
      </div>
      <div className="w-full bg-[#f8fafc] text-slate-900">
        <Timeline 
          title="Development Lifecycle"
          periodLabel="7 Lifecycle Stages"
          imageUrl="/software.png"
          imageAlt="LabVIEW Development Lifecycle"
          activeColor="#168a9f"
          backgroundColor="#f8fafc"
          textColor="#0f172a"
          mutedTextColor="#64748b"
        />
      </div>
    </section>
  );
}
