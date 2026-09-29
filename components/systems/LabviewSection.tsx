'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShimmerText } from "@/components/ui/shimmer-text";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Cpu,
  Layers,
  Network,
  Radio,
  Terminal,
  Sliders,
  Share2,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  Globe,
  Play,
  Pause,
  RotateCcw,
  Gauge,
  Workflow,
  HardDrive,
  Maximize2
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { EarthGlobe } from '@/components/ui/globe';

interface CapabilityItem {
  name: string;
  code: string;
  tag: string;
}

interface ChassisSlot {
  id: string;
  slotNumber: string;
  title: string;
  subtitle: string;
  status: 'ACTIVE' | 'CALIBRATED' | 'LOCKED';
  color: string;
  sampleRate: string;
  signalType: 'sine' | 'square' | 'packet' | 'hil';
  metrics: { label: string; value: string };
  capabilities: CapabilityItem[];
}

const CHASSIS_SLOTS: ChassisSlot[] = [
  {
    id: 'daq-hardware',
    slotNumber: 'SLOT 01 // NI-PXIe',
    title: 'Hardware & DAQ Platforms',
    subtitle: 'cDAQ, cRIO & High-Speed Determinism',
    status: 'ACTIVE',
    color: '#0891b2', // cyan-600
    sampleRate: '2.5 MS/s',
    signalType: 'sine',
    metrics: { label: 'A/D Latency', value: '42 ns' },
    capabilities: [
      { name: 'DAQ Integration', code: 'NI-DAQmx', tag: 'Direct I/O' },
      { name: 'PXI Systems', code: 'PXIe-8881', tag: 'Chassis' },
      { name: 'cDAQ Systems', code: 'cDAQ-9178', tag: 'Modular' },
      { name: 'cRIO Systems', code: 'cRIO-9045', tag: 'Real-Time FPGA' },
      { name: 'Instrument Control', code: 'VISA / SCPI', tag: 'GPIB/USB' },
      { name: 'Data Acquisition', code: 'Analog/Digital', tag: 'High-Speed' },
      { name: 'Hardware Integration', code: 'Multi-vendor', tag: 'Sensors' }
    ]
  },
  {
    id: 'industrial-bus',
    slotNumber: 'SLOT 02 // FIELDBUS',
    title: 'Industrial Comm & Matrix',
    subtitle: 'Deterministic Serial, CAN & TCP Fabrics',
    status: 'ACTIVE',
    color: '#0d9488', // teal-600
    sampleRate: '1.0 Mbps',
    signalType: 'square',
    metrics: { label: 'Bus Load', value: '38.4%' },
    capabilities: [
      { name: 'Industrial Communication', code: 'Fieldbus Matrix', tag: 'Sync' },
      { name: 'Modbus', code: 'RTU / ASCII / TCP', tag: 'Registers' },
      { name: 'CAN', code: 'CANopen / CAN FD', tag: 'Automotive' },
      { name: 'TCP/IP', code: 'Raw Socket Stack', tag: 'Ethernet' },
      { name: 'Serial Communication', code: 'RS-232 / RS-485', tag: 'Baud Master' }
    ]
  },
  {
    id: 'validation-hil',
    slotNumber: 'SLOT 03 // TEST & HIL',
    title: 'Automated Test & Validation',
    subtitle: 'Closed-Loop Verification & Stress Runs',
    status: 'ACTIVE',
    color: '#0284c7', // sky-600
    sampleRate: '10 kHz Loop',
    signalType: 'hil',
    metrics: { label: 'Pass Ratio', value: '99.98%' },
    capabilities: [
      { name: 'Automated Test Systems', code: 'ATE Sequencer', tag: 'End-Of-Line' },
      { name: 'Test & Measurement', code: 'Metrology Grade', tag: 'Sensors' },
      { name: 'Test Automation', code: 'Automated Runs', tag: 'Hands-Free' },
      { name: 'HIL Testing', code: 'Closed Loop Model', tag: 'Simulation' },
      { name: 'Validation & Verification', code: 'V-Model Lifecycle', tag: 'Compliance' }
    ]
  },
  {
    id: 'software-cloud',
    slotNumber: 'SLOT 04 // SYS-ARCH',
    title: 'Software, APIs & Legacy',
    subtitle: 'Microservices, REST, SQL & Modernization',
    status: 'ACTIVE',
    color: '#2563eb', // blue-600
    sampleRate: 'REST / WS',
    signalType: 'packet',
    metrics: { label: 'API Uptime', value: '99.99%' },
    capabilities: [
      { name: 'LabVIEW Development', code: 'Actor Framework', tag: 'OOP/Design' },
      { name: 'LabVIEW Application Development', code: 'Stand-Alone EXEs', tag: 'Custom UI' },
      { name: 'Database Integration', code: 'ODBC / PostgreSQL', tag: 'Storage' },
      { name: 'Web Services', code: 'LabVIEW Web API', tag: 'Network' },
      { name: 'REST API Integration', code: 'JSON / HTTP REST', tag: 'Enterprise' },
      { name: 'LabVIEW Application Deployment', code: 'NIPKG / Installers', tag: 'Production' },
      { name: 'Legacy LabVIEW Application Support', code: 'LV 8.x - 2024+', tag: 'Refactoring' }
    ]
  }
];

const CORRIDORS = [
  { country: 'USA', hub: 'Austin, TX', code: 'us' },
  { country: 'Germany', hub: 'Munich', code: 'de' },
  { country: 'India', hub: 'Bangalore', code: 'in' },
  { country: 'Japan', hub: 'Tokyo', code: 'jp' },
  { country: 'UK', hub: 'London', code: 'gb' },
];

function WaveformMonitor({
  signalType,
  primaryColor,
  isRunning
}: {
  signalType: string;
  primaryColor: string;
  isRunning: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef(0);
  const animFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw engineering grid background
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)'; // slate-300
      ctx.lineWidth = 1 * window.devicePixelRatio;

      const stepX = width / 12;
      const stepY = height / 6;

      for (let x = 0; x <= width; x += stepX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += stepY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center crosshair axis
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)'; // slate-400
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw signal trace
      ctx.lineWidth = 2.5 * window.devicePixelRatio;
      ctx.strokeStyle = primaryColor;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 8 * window.devicePixelRatio;
      ctx.beginPath();

      const centerY = height / 2;
      const amp = height * 0.35;

      for (let x = 0; x < width; x++) {
        const t = (x / width) * 20 + phaseRef.current;
        let y = centerY;

        if (signalType === 'sine') {
          y = centerY + Math.sin(t) * amp * 0.8 + Math.sin(t * 3.2) * (amp * 0.15);
        } else if (signalType === 'square') {
          // CAN / Digital square pattern with small slew rate
          const rawSq = Math.sin(t * 1.5) > 0 ? 1 : -1;
          const jitter = (Math.sin(t * 12) * 0.04);
          y = centerY + (rawSq + jitter) * (amp * 0.7);
        } else if (signalType === 'hil') {
          // Closed loop feedback with simulated transient response
          y = centerY + (Math.sin(t * 1.8) * Math.cos(t * 0.4)) * amp + (Math.random() * 4 - 2);
        } else {
          // REST/Packet burst
          const burst = Math.sin(t * 0.8) > 0.4 ? Math.sin(t * 6) * 0.85 : 0.05 * Math.sin(t * 2);
          y = centerY + burst * amp;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (isRunning) {
        phaseRef.current += 0.045;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [signalType, primaryColor, isRunning]);

  return (
    <div className="relative w-full h-44 sm:h-52 bg-slate-950/[0.02] rounded-xl overflow-hidden border border-slate-200">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Live scope overlay tags */}
      <div className="absolute top-2 left-3 flex items-center gap-2 pointer-events-none">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
        </span>
        <span className="text-[10px] font-mono tracking-wider font-semibold text-slate-500 uppercase">
          CH-01: AC COUPLED // 500 mV/div
        </span>
      </div>

      <div className="absolute bottom-2 right-3 pointer-events-none text-[10px] font-mono text-slate-500 bg-white/90 px-2 py-0.5 rounded border border-slate-200">
        TIMEBASE: 20 µs/div
      </div>
    </div>
  );
}

export default function LabviewSection() {
  const [activeSlotId, setActiveSlotId] = useState<string>('daq-hardware');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [triggerCount, setTriggerCount] = useState<number>(14290);

  const currentSlot = CHASSIS_SLOTS.find(s => s.id === activeSlotId) || CHASSIS_SLOTS[0];

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTriggerCount(prev => prev + Math.floor(Math.random() * 8 + 3));
    }, 400);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <section className="relative pt-10 md:pt-16 pb-20 md:pb-32 bg-white text-slate-900 overflow-hidden font-sans selection:bg-cyan-500/15 selection:text-cyan-900">



      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
          <div className="flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 shadow-sm bg-[#e6f4f1] border-[#b8dfd8]">
              <Sparkles className="w-3.5 h-3.5 text-[#0a2540]" strokeWidth={2.5} />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase text-[#0a2540]">
                LabVIEW
              </span>
            </div>
            <h2
              className="font-black uppercase text-black"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.25rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                WebkitTextStroke: "2px currentColor",
              }}
            >
              LabVIEW<br /> engineering
            </h2>
          </div>

          <div className="lg:max-w-[45%] xl:max-w-[50%]">
            <p className="text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.8] tracking-[0.005em] font-medium text-slate-600">
              <ShimmerText duration={3}>
                VEST Solutions develops LabVIEW applications for automated test systems, data acquisition and instrument control. Our engineers work with PXI, cDAQ and cRIO platforms, integrate hardware through industrial protocols such as Modbus, CAN, TCP/IP and serial communication, and connect results to databases, web services and REST APIs.
              </ShimmerText>
            </p>
          </div>
        </div>

        {/* Modular Virtual Rack Shell */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.06)] overflow-hidden">

          {/* Chassis Top Mounting Rail */}
          <div className="bg-slate-50/90 border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400/50" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 tracking-wider">
                NI-PXIe-1085 // 18-SLOT HIGH-BANDWIDTH CHASSIS
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM ONLINE
              </span>
            </div>
          </div>

          {/* Main Interactive Rack Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* Left Slot Selector (Modular Instrument Cards) */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/30 p-4 sm:p-5 space-y-2.5">
              <div className="px-2 py-1 flex items-center justify-between text-[11px] font-mono text-slate-400 font-semibold tracking-wider uppercase">
                <span>Modular Slots</span>
                <span>Select Module</span>
              </div>

              {CHASSIS_SLOTS.map((slot) => {
                const isSelected = slot.id === activeSlotId;
                return (
                  <button
                    key={slot.id}
                    onClick={() => setActiveSlotId(slot.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 relative group ${isSelected
                      ? 'bg-white border-cyan-500/80 shadow-md shadow-cyan-500/5'
                      : 'bg-white/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-gradient-to-b from-cyan-600 to-teal-600 rounded-r-full" />
                    )}

                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 group-hover:text-cyan-600 transition-colors">
                        {slot.slotNumber}
                      </span>
                      {/* <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {slot.sampleRate}
                      </span> */}
                    </div>

                    <h4 className={`text-base font-bold transition-colors ${isSelected ? 'text-slate-950' : 'text-slate-700'
                      }`}>
                      {slot.title}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {slot.subtitle}
                    </p>

                    {/* <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>{slot.metrics.label}:</span>
                      <span className="font-bold text-slate-800">{slot.metrics.value}</span>
                    </div> */}
                  </button>
                );
              })}
            </div>

            {/* Right Interactive Workbench (Scope + Detailed Capabilities Grid) */}
            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">

              <div>
                {/* Module Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-600 tracking-wider">
                        {currentSlot.slotNumber}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-bold text-slate-500">CALIBRATION VERIFIED</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-950 tracking-tight mt-0.5">
                      {currentSlot.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                      MODE: REAL-TIME RTOS
                    </span>
                  </div>
                </div>

                {/* Oscilloscope / Waveform Visualizer */}


                {/* Dedicated Capability Matrix for this Slot */}
                <div className="mt-7">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider">
                      Assigned LabVIEW Competencies ({currentSlot.capabilities.length})
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">STATUS: VERIFIED</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentSlot.capabilities.map((cap) => (
                      <div
                        key={cap.name}
                        className="group flex items-center justify-between p-3 rounded-xl border border-slate-200/90 bg-white hover:border-cyan-400 hover:shadow-xs transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-cyan-600 group-hover:scale-125 transition-transform" />
                          <div>
                            <span className="text-sm font-bold text-slate-900 block group-hover:text-cyan-900 transition-colors">
                              {cap.name}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {cap.code}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200 group-hover:border-cyan-200 group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors">
                          {cap.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Console Status Footer */}
              <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>24/24 Full-Lifecycle LabVIEW Stack Supported</span>
                </div>
                <div className="text-slate-400">
                  REF: VEST-NI-ENG-2026
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Global Deployment Corridor Banner */}
        <div className="mt-10 p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 flex items-center justify-center flex-shrink-0 relative">
              <EarthGlobe />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-950">
                Global Turnkey Deployment & Legacy Modernization
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                On-site commissioning, test rack assembly, HIL test loops, and multi-year support across international facilities.
              </p>
            </div>
          </div>

          {/* Regional Flag Badges */}
          <div className="flex flex-nowrap items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide shrink-0">
            {CORRIDORS.map((corridor) => (
              <div
                key={corridor.country}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs"
                title={corridor.hub}
              >
                <img
                  src={`https://flagcdn.com/${corridor.code}.svg`}
                  alt={corridor.country}
                  className="w-4 h-3 sm:w-5 sm:h-3.5 object-cover rounded-[2px] shadow-xs"
                />
                <span className="text-xs font-bold text-slate-800">{corridor.country}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
