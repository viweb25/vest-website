'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_DATA = [
  {
    q: "What should I do now that I've shared my automation project specifications?",
    a: "Our engineering leads review your control system requirements, factory architecture, and hardware specs within 24 hours. We then schedule a technical discovery session under NDA to confirm PLC/SCADA standards, network topology (PROFINET, EtherNet/IP, Modbus), and deliver a comprehensive turnkey proposal with defined FAT/SAT milestones."
  },
  {
    q: "Do you offer on-site support, installation, and commissioning?",
    a: "Yes. While much of our software simulation and panel wiring is completed in-house, our field engineers travel for on-site commissioning, hardware integration, electrical checkout, and operator training across the USA, Canada, Mexico, Europe, and Asia."
  },
  {
    q: "Can you maintain, upgrade, and refactor legacy LabVIEW & PLC systems?",
    a: "Absolutely. A major portion of our engineering involves taking over legacy systems, refactoring undocumented monolithic code, upgrading it to modern frameworks (Actor Framework, DQMH, or structured PLC function blocks), and migrating obsolete hardware to modern NI or Siemens architectures."
  },
  {
    q: "What PLC and industrial controller brands do your engineers specialize in?",
    a: "Our team has extensive expertise across major industrial automation ecosystems: Siemens (TIA Portal / S7-1200/1500), Allen-Bradley / Rockwell Automation (Studio 5000 / ControlLogix / CompactLogix), Omron, Mitsubishi, and Schneider Electric."
  },
  {
    q: "How does your pricing model work for engineering support and system integration?",
    a: "We avoid one-size-fits-all pricing because each industrial cell or test rack is unique. We provide transparent, milestone-based turnkey quotes for complete buildouts, or Per-Day / Per-Sprint engineering rates for custom software development, FAT/SAT, and on-site commissioning."
  },
  {
    q: "Do you integrate AI machine learning with existing factory sensor data?",
    a: "Yes. We specialize in adding 'Intelligent Automation' layers to existing plants. This involves acquiring high-speed sensor telemetry from PLCs or DAQ chassis, running edge ONNX machine learning models for predictive maintenance or anomaly detection, and serving real-time actionable insights to SCADA and cloud dashboards."
  }
];

export default function SystemsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold tracking-[0.2em] text-slate-700 uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E7651A]" />
            Automation & Systems FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-[1.1] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Find answers to common questions about our industrial PLC architecture, on-site commissioning, legacy migrations, and edge AI integration.
          </p>
        </motion.div>

        {/* Minimalist Divider-Based Accordion List */}
        <div className="border-t border-neutral-300">
          {FAQ_DATA.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border-b border-neutral-300 transition-colors"
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full py-6 sm:py-7 flex items-center justify-between text-left group select-none transition-colors"
                >
                  <span className="text-base sm:text-lg md:text-xl font-normal text-neutral-900 group-hover:text-[#E7651A] transition-colors leading-snug pr-6">
                    {faq.q}
                  </span>

                  {/* Exact Right-Triangle Corner Icon */}
                  <span
                    className={`shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  >
                    <svg
                      className="w-2.5 h-2.5 fill-black group-hover:fill-[#E7651A] transition-colors"
                      viewBox="0 0 10 10"
                      aria-hidden="true"
                    >
                      <path d="M 0 10 L 10 0 L 10 10 Z" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-8 sm:pr-12 text-slate-600 text-[15px] sm:text-base leading-relaxed font-normal max-w-4xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
