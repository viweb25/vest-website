'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: "What should I do now that I've shared my project idea with you?",
    answer: "Once you submit your project specifications or concept, our senior solutions engineering team conducts a thorough technical feasibility review within 24 hours. We then schedule a technical discovery call under NDA to review your hardware requirements (NI, PLCs, sensors, communication protocols), finalize project scope, and provide a transparent, milestone-based engineering proposal.",
    category: "General"
  },
  {
    question: "How does your team ensure the success of product development?",
    answer: "We apply Certified LabVIEW Architect (CLA) and industrial automation standards at every phase. We employ modular Software Abstraction Layers (HAL/MAL), Actor Framework and DQMH design patterns, continuous automated regression testing, and Hardware-in-the-Loop (HIL) simulation. Every test bench and control cell undergoes stringent Factory Acceptance Testing (FAT) before shipment and Site Acceptance Testing (SAT) on your factory floor.",
    category: "Engineering"
  },
  {
    question: "What are some of the products you've successfully developed?",
    answer: "Our portfolio spans high-speed Automated Test Equipment (ATE) for automotive ECUs, End-of-Line (EOL) functional testers for EV battery modules, sub-millimeter AI machine vision inspection cells, multi-channel NI CompactDAQ/PXI data acquisition systems, automated PLC/SCADA assembly cells, and proprietary software platforms including VEST ERP and RepairSync.",
    category: "Products"
  },
  {
    question: "How long will my project take to complete?",
    answer: "Timelines depend on system complexity and physical hardware integration. Rapid software prototyping, proof-of-concept (PoC), and legacy code refactoring typically take 2 to 4 weeks. Full turnkey automated test stations or industrial automation cells with custom fixturing, electrical panels, and PLC/SCADA integration generally span 6 to 12 weeks, structured into trackable weekly sprint milestones.",
    category: "Timeline"
  },
  {
    question: "What hardware platforms and instrument protocols do you support?",
    answer: "We natively support the complete National Instruments hardware family (PXIe chassis, CompactRIO, CompactDAQ, FlexRIO) and top-tier industrial PLCs (Siemens S7-1200/1500, Allen-Bradley ControlLogix, Omron, Mitsubishi, Schneider Electric). For industrial networking and bench instruments, we interface via CAN/CAN-FD, LIN, Automotive Ethernet, Modbus TCP/RTU, EtherNet/IP, PROFINET, OPC UA, GPIB, USB, and SCPI/VISA standards.",
    category: "Hardware"
  },
  {
    question: "Can you modernize and refactor our existing legacy LabVIEW code?",
    answer: "Yes, legacy code refactoring is one of our core specialties. We perform in-depth architectural audits to eliminate monolithic spaghetti code, race conditions, memory leaks, and deprecated drivers. We refactor legacy VIs into clean, modular DQMH or Actor Framework modules and migrate them seamlessly to modern LabVIEW 2024+ environments with zero disruption to production.",
    category: "Engineering"
  },
  {
    question: "Do you provide on-site deployment, commissioning, and training?",
    answer: "Yes. While core architecture and hardware design are developed in-house, our engineers travel globally for on-site commissioning, electrical wire-up verification, sensor calibration, and Factory Acceptance Testing. We provide comprehensive Software Architecture Documents (SAD), user manuals, hands-on operator training, and 24/7 ongoing technical support SLAs.",
    category: "Support"
  },
  {
    question: "How do you handle intellectual property (IP) and source code ownership?",
    answer: "You retain 100% complete intellectual property and source code ownership. Upon project delivery and milestone sign-off, we hand over all uncompiled LabVIEW source code (.lvproj), custom VI libraries, CAD schematics, PLC ladder logic/function blocks, and compiled standalone installers with absolutely no vendor lock-ins or recurring proprietary fees.",
    category: "General"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 md:py-32 bg-white overflow-hidden border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading, Subtitle & Pattern */}
          <div className="relative flex flex-col justify-between h-full pt-2">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F6F8] border border-slate-200 text-xs font-bold tracking-[0.2em] text-[#0B2340] uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E7651A]" />
                Frequently Asked Questions
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2340] leading-[1.1] tracking-tight mb-6">
                Everything You Need to Know.
              </h2>

              <p className="text-base sm:text-lg text-[#536578] leading-relaxed max-w-md font-normal mb-8">
                Clear answers about our automated test architecture, hardware integration, project timelines, and full source code ownership.
              </p>

              {/* Quick Contact CTA */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 text-sm font-bold text-[#0B2340] hover:text-[#E7651A] transition-colors group"
                >
                  <span className="w-9 h-9 rounded-full bg-[#F4F6F8] flex items-center justify-center group-hover:bg-[#E7651A] group-hover:text-white transition-all shadow-sm">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <span>Have a specific project question? Talk with our engineers</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Divider-Based Accordion List */}
          <div className="flex flex-col pt-2 border-t border-neutral-300">
            {FAQ_LIST.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border-b border-neutral-300 transition-colors"
                >
                  <button
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="w-full py-6 sm:py-7 flex items-center justify-between text-left group select-none transition-colors"
                  >
                    <span className="text-base sm:text-lg md:text-xl font-normal text-[#0B2340] group-hover:text-[#E7651A] transition-colors leading-snug pr-6">
                      {faq.question}
                    </span>

                    {/* Exact Right-Triangle Corner Icon from Uploaded Reference */}
                    <span
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                    >
                      <svg
                        className="w-2.5 h-2.5 fill-[#0B2340] group-hover:fill-[#E7651A] transition-colors"
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
                        <p className="pb-7 pr-8 sm:pr-12 text-[#536578] text-[15px] sm:text-base leading-relaxed font-normal max-w-3xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
