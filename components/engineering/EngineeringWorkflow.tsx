'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Lightbulb, Ruler, PenTool, Factory, Building, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';

const STEPS = [
  {
    num: '01',
    label: 'CONCEPT',
    icon: Lightbulb,
    title: 'Concept & Scope',
    desc: 'Define the project scope, applicable drawing standards, and deliverable schedule. We review the brief and confirm what will be produced.',
    deliverables: ['Project Scope Review', 'Drawing Standards Confirmation', 'Deliverable Schedule', 'Initial BOQ Outline'],
    image: '/img-1.png',
  },
  {
    num: '02',
    label: 'ENGINEERING',
    icon: Ruler,
    title: 'Engineering & Analysis',
    desc: 'Structural analysis and civil engineering work is carried out. Design loads, member sizes and connection forces are established.',
    deliverables: ['Structural Analysis Reports', 'Design Load Calculations', 'Member Sizing', 'Geotechnical Review'],
    image: '/img-2.png',
  },
  {
    num: '03',
    label: 'DETAILING',
    icon: PenTool,
    title: 'Detailing & Drawings',
    desc: 'Shop drawings, erection drawings, connection details and miscellaneous steel are prepared to the specified standard.',
    deliverables: ['Shop Drawings', 'Erection Drawings', 'Connection Details', 'Member Schedules', 'Miscellaneous Steel Drawings'],
    image: '/img-3.png',
  },
  {
    num: '04',
    label: 'FABRICATION',
    icon: Factory,
    title: 'Fabrication Documentation',
    desc: 'Bills of materials, material take-offs and fabrication lists are produced so procurement and workshop can move without rework.',
    deliverables: ['Bill of Materials', 'Material Take-Off', 'Fabrication Lists', 'Component Lists', 'Procurement Schedules'],
    image: '/img-4.png',
  },
  {
    num: '05',
    label: 'ERECTION',
    icon: Building,
    title: 'Erection & As-Built',
    desc: 'Erection sequences, site installation packages and as-built documentation are prepared for handover.',
    deliverables: ['Erection Sequence Drawings', 'Site Installation Packages', 'As-Built Documentation', 'Handover Records'],
    image: '/img-5.png',
  },
];

export default function EngineeringWorkflow() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="py-24 md:py-32 bg-[#fafcfc] relative overflow-hidden" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <SectionHeader
          eyebrow="Engineering Workflow"
          className="text-center items-center flex flex-col mb-16 md:mb-24"
          title={<>From 3D Model<br />to Site Installation</>}
          description="One coordinated chain of deliverables, systematically executed."
        />

        <div className="mt-16 md:mt-24 relative max-w-[1200px] mx-auto">
          {/* SVG Progress Line Background */}
          <div className="absolute left-[47px] md:left-1/2 top-4 bottom-4 w-[2px] bg-zinc-200 md:-translate-x-1/2 rounded-full overflow-hidden" />

          {/* SVG Progress Line Animated */}
          <div className="absolute left-[47px] md:left-1/2 top-4 bottom-4 w-[2px] md:-translate-x-1/2">
            <motion.div
              className="w-full h-full bg-[#0e7c86] origin-top"
              style={{ scaleY: pathLength }}
            />
          </div>

          <div className="flex flex-col gap-24 md:gap-32 relative z-10">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              const [firstWord, ...restWords] = step.title.split(' ');

              return (
                <motion.div
                  key={step.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "0px 0px -50% 0px" }}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 relative ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Empty half for Desktop (Contains the background number) */}
                  <div className="hidden md:flex flex-1 relative items-center justify-center pointer-events-none select-none z-0">
                    <div className="text-[240px] font-black text-slate-100/70 leading-none">
                      {step.num}
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="relative shrink-0 ml-4 md:ml-0 z-10 mt-2 md:mt-0">
                    <motion.div
                      variants={{
                        hidden: { borderColor: "#e4e4e7", color: "#a1a1aa", backgroundColor: "#f8f8f8" },
                        visible: { borderColor: "#0e7c86", color: "#0e7c86", backgroundColor: "#ffffff" }
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full border-[3px] flex items-center justify-center shadow-[0_0_0_8px_rgba(255,255,255,1)] z-10 relative bg-[#fafcfc]"
                    >
                      <Icon size={28} strokeWidth={2.5} color="currentColor" />
                    </motion.div>
                  </div>

                  {/* Content (Text & Box) */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: isEven ? -40 : 40 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                    className={`flex-1 w-full pl-20 md:pl-0 relative z-10 ${isEven ? 'md:text-right' : 'md:text-left'}`}
                  >
                    {/* Floating Background Image (Same side as content) */}
                    <div className={`hidden lg:block absolute top-[60%] -translate-y-1/2 w-[600px] xl:w-[800px] -z-10 pointer-events-none ${isEven ? '-left-32 xl:-left-64' : '-right-32 xl:-right-64'}`}>
                      {step.image && (
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, x: isEven ? -40 : 40 },
                            visible: { opacity: 1, x: 0 }
                          }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                          className="relative"
                        >
                          <img src={step.image} alt={step.title} className="w-full h-auto object-contain mix-blend-multiply opacity-25" />
                        </motion.div>
                      )}
                    </div>

                    {/* Giant background number (Mobile Only) */}
                    <div className={`md:hidden absolute -top-12 text-[140px] font-black text-slate-100/70 leading-none pointer-events-none select-none -z-10 ${isEven ? 'right-0' : '-left-6'}`}>
                      {step.num}
                    </div>

                    {/* Mobile Image (Hidden on Desktop) */}
                    {step.image && (
                      <div className="lg:hidden w-full mb-8 opacity-90 mix-blend-multiply">
                        <img src={step.image} alt={step.title} className="w-full h-auto object-contain" />
                      </div>
                    )}

                    {/* Eyebrow */}
                    <div className={`relative z-10 text-[11px] font-black tracking-[0.2em] uppercase text-[#0e7c86] mb-4 flex items-center gap-4 ${isEven ? 'md:justify-end' : ''}`}>
                      {isEven && <div className="w-12 h-px bg-[#0e7c86]/40 hidden md:block" />}
                      {step.label}
                      {!isEven && <div className="w-12 h-px bg-[#0e7c86]/40 hidden md:block" />}
                    </div>

                    <h3 className="relative z-10 text-4xl md:text-5xl font-bold text-[#0b2027] mb-6 tracking-tight leading-tight">
                      {firstWord} <span className="text-[#0e7c86]">{restWords.join(' ')}</span>
                    </h3>

                    <p className={`relative z-10 text-[#44616b] font-medium leading-relaxed text-[16px] mb-10 max-w-[46ch] ${isEven ? 'md:ml-auto' : ''}`}>
                      {step.desc}
                    </p>

                    {/* Deliverables Box */}
                    <div className={`bg-transparent text-left max-w-[46ch] relative ${isEven ? 'md:ml-auto' : ''}`}>
                      <div className="relative z-10">
                        <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#88a0a8] mb-6">
                          Key Deliverables
                        </div>
                        <ul className="space-y-4">
                          {step.deliverables.map((d) => (
                            <li key={d} className="flex items-center gap-4 text-[15px] font-bold text-[#0b2027]">
                              <ArrowRight size={16} className="text-[#0e7c86] shrink-0" strokeWidth={2.5} />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
