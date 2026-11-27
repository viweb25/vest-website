'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Activity,
  Cpu,
  Radio,
  Zap,
  BarChart3,
  Network,
  Database,
  ShieldCheck,
  Car,
  Plane,
  Microchip,
  Factory,
  Flame,
  Sparkles,
  Settings,
  HeartPulse,
  ArrowRight,
  CheckCircle2,
  Boxes,
  Workflow,
  Clock,
  Compass,
  FileCheck,
  TrendingUp,
  Sliders,
  Check
} from 'lucide-react';

// ═════════════════════════════════════════════════════════════════════════════
// 1. DATA DEFINITIONS
// ═════════════════════════════════════════════════════════════════════════════

const CAPABILITIES = [
  {
    id: '01',
    num: '01',
    title: 'Advanced Test System Architecture',
    icon: Layers,
    lead: 'Develop customized test architectures that integrate hardware, software, instrumentation, signal acquisition, test execution, and result management into a unified engineering platform.',
    bullets: [
      'Modular and scalable test architecture',
      'Producer–Consumer and event-driven programming',
      'Queued Message Handler (QMH) architecture',
      'Parallel and multithreaded execution',
      'Distributed measurement and control systems',
      'Modular software components and reusable libraries',
      'Automated test sequencing and execution',
    ],
  },
  {
    id: '02',
    num: '02',
    title: 'High-Performance Data Acquisition & Instrumentation',
    icon: Activity,
    lead: 'Transform physical measurements into meaningful engineering information through advanced data acquisition and instrumentation integration.',
    bullets: [
      'High-speed analog and digital data acquisition',
      'Voltage, current, temperature, pressure and flow measurement',
      'Thermocouple, RTD, strain gauge and accelerometer integration',
      'Continuous waveform acquisition and monitoring',
      'Synchronized multi-channel measurements',
      'Trigger-based acquisition and signal generation',
      'Hardware-timed sampling and signal conditioning',
    ],
  },
  {
    id: '03',
    num: '03',
    title: 'PXI, CompactDAQ & CompactRIO Integration',
    icon: Cpu,
    lead: 'Build advanced measurement and automation systems using modular hardware platforms. Develop application-specific solutions for high-speed testing, embedded control, industrial monitoring, and real-time data acquisition.',
    platforms: [
      'NI PXI / PXI Express',
      'NI CompactDAQ (cDAQ)',
      'NI CompactRIO (cRIO)',
      'NI Single-Board RIO',
      'NI Multifunction DAQ',
      'NI FlexRIO',
    ],
    bullets: [
      'Seamless multi-chassis synchronization and timing',
      'High-throughput backplane data streaming (PCIe/PXIe)',
      'Hot-swappable C Series I/O signal conditioning modules',
      'Embedded FPGA deterministic processing loops',
    ],
  },
  {
    id: '04',
    num: '04',
    title: 'Real-Time Control & FPGA-Based Applications',
    icon: Radio,
    lead: 'Develop deterministic control and monitoring applications for demanding engineering environments using the appropriate NI hardware and software modules.',
    bullets: [
      'Real-time embedded application development',
      'FPGA-based signal processing and control',
      'High-speed digital I/O operations',
      'Hardware-timed control applications',
      'PID and advanced control algorithms',
      'Custom signal generation and acquisition',
      'Low-latency measurement and response systems',
    ],
  },
  {
    id: '05',
    num: '05',
    title: 'Automated Test Equipment (ATE) & TestStand',
    icon: Zap,
    lead: 'Create repeatable, scalable, and production-ready automated testing environments.',
    bullets: [
      'Automated test sequence development',
      'TestStand and LabVIEW integration',
      'Sequential and parallel test execution',
      'DUT (Device Under Test) communication',
      'Automatic limit checking and validation',
      'PASS / FAIL decision management',
      'Test result logging and traceability',
      'Production test report generation',
    ],
  },
  {
    id: '06',
    num: '06',
    title: 'Advanced Signal Processing & Engineering Analytics',
    icon: BarChart3,
    lead: 'Convert raw measurement signals into engineering intelligence using advanced analysis and mathematical processing capabilities.',
    bullets: [
      'FFT and frequency-domain analysis',
      'Digital filtering and noise reduction',
      'RMS, peak and peak-to-peak calculations',
      'Transient and waveform analysis',
      'Vibration and acoustic analysis',
      'Statistical analysis and trend monitoring',
      'Signal comparison and performance evaluation',
      'Custom mathematical algorithms',
    ],
  },
  {
    id: '07',
    num: '07',
    title: 'Industrial Communication & System Integration',
    icon: Network,
    lead: 'Connect diverse industrial devices, controllers, instruments, and engineering software through suitable communication interfaces and drivers.',
    bullets: [
      'OPC UA and industrial communication',
      'Modbus TCP/IP and RTU',
      'Ethernet and TCP/IP',
      'Serial communication (RS-232 / RS-485)',
      'CAN and CAN FD (hardware/interface dependent)',
      'PLC and controller integration',
      'SCPI-based instrument communication',
      'Python, C/C++ and .NET interoperability',
    ],
  },
  {
    id: '08',
    num: '08',
    title: 'Database, Traceability & Smart Reporting',
    icon: Database,
    lead: 'Build structured data management solutions that preserve measurement history and provide reliable access to engineering test results.',
    bullets: [
      'MySQL, SQL Server and SQLite integration',
      'Automated measurement data storage',
      'Test ID and serial number management',
      'Timestamp-based data recording',
      'Historical test data retrieval',
      'Automated CSV, Excel and PDF reports',
      'User authentication and access control',
      'Production monitoring and performance analysis',
    ],
  },
  {
    id: '09',
    num: '09',
    title: 'Hardware-in-the-Loop (HIL) & System Validation',
    icon: ShieldCheck,
    lead: 'Validate embedded controllers and complex electromechanical systems using simulation-based testing and hardware integration.',
    bullets: [
      'HIL test system development',
      'ECU and embedded controller validation',
      'Real-time plant model integration',
      'Sensor and actuator signal simulation',
      'Fault injection and boundary-condition testing',
      'Automated regression testing',
      'Closed-loop system verification',
      'Test sequence integration with VeriStand and TestStand',
    ],
  },
];

const INDUSTRIES = [
  {
    name: 'Automotive',
    icon: Car,
    application: 'ECU, engine and component validation',
    metric: 'MIL / SIL / HIL & CAN FD',
  },
  {
    name: 'Aerospace',
    icon: Plane,
    application: 'Avionics and system testing',
    metric: 'DO-178C & ARINC 429 / 1553',
  },
  {
    name: 'Electronics',
    icon: Microchip,
    application: 'Functional and production testing',
    metric: 'High-Speed Boundary Scan',
  },
  {
    name: 'Manufacturing',
    icon: Factory,
    application: 'Automated inspection and test systems',
    metric: 'EOL Automated Test Cells',
  },
  {
    name: 'Energy',
    icon: Flame,
    application: 'Electrical and power system monitoring',
    metric: 'Smart Grid & PMU DAQ',
  },
  {
    name: 'Research & Development',
    icon: Sparkles,
    application: 'Experimental measurement and validation',
    metric: 'Multi-Physics Validation',
  },
  {
    name: 'Medical Equipment',
    icon: HeartPulse,
    application: 'Device verification and performance testing',
    metric: 'ISO 13485 & IEC 62304',
  },
  {
    name: 'Industrial Engineering',
    icon: Settings,
    application: 'Machine monitoring and process validation',
    metric: 'SCADA & Edge Telemetry',
  },
];

const ADVANTAGES = [
  {
    title: 'Hardware Independence',
    desc: 'Integrate supported NI and third-party measurement instruments through appropriate drivers, APIs, and communication interfaces.',
    icon: Boxes,
  },
  {
    title: 'Application Flexibility',
    desc: 'Develop customized engineering applications rather than depending entirely on predefined software workflows.',
    icon: Sliders,
  },
  {
    title: 'Scalable Architecture',
    desc: 'Expand from standalone measurement applications to modular, distributed, and automated test environments.',
    icon: Workflow,
  },
  {
    title: 'Engineering Productivity',
    desc: 'Combine acquisition, visualization, analysis, control, and reporting within an integrated development environment.',
    icon: TrendingUp,
  },
  {
    title: 'Data-Driven Decisions',
    desc: 'Convert test measurements into structured engineering records, performance metrics, and actionable results.',
    icon: BarChart3,
  },
  {
    title: 'Long-Term Expandability',
    desc: 'Build reusable software architectures that can be maintained, upgraded, and extended as testing requirements evolve.',
    icon: ShieldCheck,
  },
];

const APPROACH_STEPS = [
  {
    step: '01',
    title: 'Requirement Analysis',
    desc: 'Understand the test objective, measurement parameters, hardware requirements, and system specifications.',
  },
  {
    step: '02',
    title: 'System Architecture Design',
    desc: 'Define the software architecture, instrumentation, communication interfaces, and hardware configuration.',
  },
  {
    step: '03',
    title: 'Application Development',
    desc: 'Develop LabVIEW applications, test sequences, control logic, and engineering interfaces.',
  },
  {
    step: '04',
    title: 'Integration & Validation',
    desc: 'Integrate sensors, DAQ hardware, instruments, controllers, and external systems.',
  },
  {
    step: '05',
    title: 'Deployment & Documentation',
    desc: 'Deploy the application, validate functionality, and deliver technical documentation and reporting solutions.',
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// 2. MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

export default function WhyChooseLabviewSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'architecture' | 'hardware' | 'validation'>('all');

  const filteredCapabilities = CAPABILITIES.filter((cap) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'architecture') return ['01', '05', '07', '08'].includes(cap.id);
    if (activeTab === 'hardware') return ['02', '03', '04'].includes(cap.id);
    if (activeTab === 'validation') return ['06', '09'].includes(cap.id);
    return true;
  });

  return (
    <section id="why-choose-labview" className="py-24 sm:py-32 bg-white relative isolate overflow-hidden text-[#0B2340]">
      {/* Decorative Subtle Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-orange-50/50 via-slate-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ═════════════════════════════════════════════════════════════════════
            PART 1: SECTION MANIFESTO & HERO LEAD
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="max-w-4xl mx-auto text-center mb-20 sm:mb-24">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#E7651A] animate-pulse" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-wider text-[#E7651A] uppercase">
              WHY CHOOSE LABVIEW?
            </span>
          </motion.div>

          {/* Display Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-[#0B2340]"
          >
            Engineering Intelligence. <br className="hidden sm:inline" />
            Advanced Automation. <br className="hidden sm:inline" />
            <span className="text-[#E7651A]">Precision Testing.</span>
          </motion.h2>

          {/* Subheading Lead Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-orange-50/30 border border-slate-200/70 shadow-sm text-left sm:text-center"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B2340] mb-4">
              Beyond Conventional Programming – A Complete Engineering Ecosystem
            </h3>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 max-w-3xl mx-auto">
              In today&apos;s rapidly evolving industrial landscape, engineering teams require more than conventional programming tools. They need an integrated environment capable of connecting physical systems, acquiring high-speed measurements, executing complex test sequences, processing engineering data, and delivering actionable insights.
            </p>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium mb-4 max-w-3xl mx-auto">
              <strong className="text-[#0B2340] font-bold">NI LabVIEW (Laboratory Virtual Instrument Engineering Workbench)</strong> provides a flexible graphical programming and system development environment for building sophisticated test, measurement, control, and automation applications.
            </p>

            <p className="text-[#E7651A] font-semibold text-xs sm:text-sm tracking-wide max-w-3xl mx-auto">
              From individual sensor measurements to distributed automated test facilities, LabVIEW enables engineers to design, integrate, deploy, and maintain application-specific engineering solutions.
            </p>
          </motion.div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            PART 2: 9 CORE CAPABILITIES (BENTO / CARD GRID WITH FILTER TABS)
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="mb-24 sm:mb-32">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200 gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#E7651A] uppercase tracking-wider block mb-1">
                Core Capabilities Matrix
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-[#0B2340] tracking-tight">
                9 Engineering Pillars of LabVIEW
              </h3>
            </div>

            {/* Segmented Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
              {[
                { id: 'all', label: 'All 9 Pillars' },
                { id: 'architecture', label: 'Architecture & TestStand' },
                { id: 'hardware', label: 'Hardware & FPGA' },
                { id: 'validation', label: 'Analytics & HIL' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-[#0B2340] shadow-sm'
                      : 'text-slate-600 hover:text-[#0B2340]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 9 Capability Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCapabilities.map((cap, idx) => {
                const IconComponent = cap.icon;
                return (
                  <motion.div
                    layout
                    key={cap.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    whileHover={{ y: -6 }}
                    className="flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(11,35,64,0.06)] hover:border-[#E7651A]/60 hover:shadow-[0_16px_36px_-6px_rgba(231,101,26,0.14)] transition-all duration-300 group"
                  >
                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-orange-50 text-[#E7651A] border border-orange-200/50">
                          PILLAR {cap.num}
                        </span>

                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 text-[#0B2340] group-hover:bg-[#E7651A] group-hover:text-white group-hover:border-[#E7651A] flex items-center justify-center transition-colors">
                          <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-xl font-bold text-[#0B2340] group-hover:text-[#E7651A] transition-colors mb-3 leading-snug">
                        {cap.title}
                      </h4>

                      {/* Lead */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                        {cap.lead}
                      </p>

                      {/* Optional Hardware Platform Badges for Pillar 03 */}
                      {cap.platforms && (
                        <div className="mb-6">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
                            Supported Engineering Platforms:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {cap.platforms.map((plat) => (
                              <span
                                key={plat}
                                className="px-2.5 py-1 rounded-md bg-slate-100 text-[#0B2340] text-xs font-semibold font-mono"
                              >
                                {plat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bullets List */}
                      <div className="space-y-2.5 pt-4 border-t border-slate-100">
                        {cap.bullets.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
                            <CheckCircle2 className="w-4 h-4 text-[#E7651A] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0B2340] group-hover:text-[#E7651A]">
                      <span>Enterprise Tested</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            PART 3: INDUSTRIES & ENGINEERING APPLICATIONS MATRIX
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="mb-24 sm:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-[#E7651A] uppercase tracking-wider block mb-2">
              Cross-Sector Deployment
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-[#0B2340] tracking-tight mb-4">
              Industries &amp; Engineering Applications
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Proven LabVIEW execution across critical engineering domains, from aerospace telemetry to automotive powertrain validation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDUSTRIES.map((ind, idx) => {
              const IndIcon = ind.icon;
              return (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#E7651A]/60 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#E7651A] flex items-center justify-center mb-4">
                      <IndIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-[#0B2340] mb-2">{ind.name}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {ind.application}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-semibold text-slate-500">
                    <span>STANDARD:</span>
                    <span className="text-[#E7651A]">{ind.metric}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            PART 4: THE ENGINEERING ADVANTAGE (6 PILLARS)
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="mb-24 sm:mb-32 p-8 sm:p-12 lg:p-16 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E7651A]/15 blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono font-bold text-[#E7651A] uppercase tracking-wider block mb-2">
              The Engineering Advantage
            </span>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
              Why Leading Engineering Teams Adopt LabVIEW
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Designed from the silicon up for engineers and scientists who demand deterministic measurement fidelity and total hardware autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((adv, idx) => {
              const AdvIcon = adv.icon;
              return (
                <motion.div
                  key={adv.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-7 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-[#E7651A]/60 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E7651A]/20 text-[#E7651A] flex items-center justify-center mb-5">
                    <AdvIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2.5">{adv.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {adv.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            PART 5: OUR 5-STEP ENGINEERING APPROACH
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="mb-24 sm:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-[#E7651A] uppercase tracking-wider block mb-2">
              Structured Execution Framework
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-[#0B2340] tracking-tight mb-4">
              Our Engineering Approach
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From Measurement Requirements to Intelligent Test Solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {APPROACH_STEPS.map((st, idx) => (
              <motion.div
                key={st.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-[#E7651A]/50 transition-all group"
              >
                <div>
                  <span className="font-mono text-2xl font-black text-[#E7651A] block mb-3">
                    {st.step}
                  </span>
                  <h4 className="text-base font-bold text-[#0B2340] mb-2 leading-snug">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <Check className="w-3.5 h-3.5 text-[#E7651A]" />
                  <span>Verified Phase</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            PART 6: HIGH-IMPACT CALL TO ACTION
        ═════════════════════════════════════════════════════════════════════ */}
        <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-orange-500 via-[#E7651A] to-[#C94F0C] text-white shadow-xl text-center relative overflow-hidden">
          {/* Subtle Decorative Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-mono font-bold tracking-wider uppercase text-white mb-4">
              Precision Measurement. Intelligent Automation. Reliable Engineering.
            </span>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-white">
              Engineer Your Next Generation Test System
            </h3>

            <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Whether you are developing an automated production test station, a high-speed data acquisition platform, an embedded control application, or a complete HIL validation environment, LabVIEW provides the flexibility to turn complex engineering requirements into practical test and automation solutions.
            </p>

            <p className="text-xl font-bold tracking-tight mb-8 text-white">
              Let&apos;s Build Smarter Engineering Systems.
            </p>

            {/* 3 Call to Action Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-white text-[#0B2340] font-bold text-sm shadow-md hover:bg-slate-100 hover:scale-105 transition-all flex items-center gap-2 group"
              >
                <span>Contact Our Engineering Team</span>
                <ArrowRight className="w-4 h-4 text-[#E7651A] transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#solutions"
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 text-white font-bold text-sm shadow-md hover:bg-slate-900 hover:scale-105 transition-all"
              >
                Explore Our Solutions
              </Link>

              <Link
                href="/book"
                className="px-6 py-3.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-sm border border-white/30 transition-all hover:scale-105"
              >
                Request a Technical Consultation
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
