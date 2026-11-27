'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { useLenis } from '@/hooks/use-lenis';
import { ShimmerText } from '@/components/ui/shimmer-text';
import HardwareSelectionGuide from '@/components/site/HardwareSelectionGuide';
import CoreCapabilitiesCards from '@/components/services/CoreCapabilitiesCards';
import SmartTestSystemsSection from '@/components/services/SmartTestSystemsSection';
import WhyChooseLabviewBanner from '@/components/services/WhyChooseLabviewBanner';
import ComprehensiveEngineeringServices from '@/components/services/ComprehensiveEngineeringServices';
import { LinkPreview } from '@/components/ui/link-preview';
import LabviewEngineeringHero from '@/components/services/LabviewEngineeringHero';
import InteractiveFloorGrid from '@/components/site/InteractiveFloorGrid';
import {
  ArrowRight,
  Zap,
  Cpu,
  CheckCircle2,
  Calendar,
  Settings,
  ShieldCheck,
  Activity,
  Layers,
  Network,
  Check,
  Sparkles,
  ChevronRight,
  Database,
  RefreshCw,
  Eye,
  Server,
  FileCode,
  Clock,
  Code2,
  Brain,
  LineChart,
  Factory,
  Car,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Workflow,
  Boxes,
  FileSpreadsheet,
  Gauge,
  ArrowUpRight,
  Terminal,
  Layers3,
  Flame,
  Plane,
  Radio,
  FileText,
  Play,
  Pause,
  Maximize2,
  Binary,
  Microchip,
  ShieldAlert,
  SlidersHorizontal,
  Compass,
  FileCheck
} from 'lucide-react';

// ═════════════════════════════════════════════════════════════════════════════
// 1. FLOATING TECH LABELS FOR SIGNATURE BLUEPRINT CANVAS
// ═════════════════════════════════════════════════════════════════════════════
const TECH_LABELS = [
  { text: 'CLD & CLAD ARCHITECTURE', x: '4%', y: '18%', delay: 0.2 },
  { text: '< 1 µs HARDWARE SYNC', x: '76%', y: '14%', delay: 0.5 },
  { text: 'NI PXI & CRIO REAL-TIME', x: '6%', y: '72%', delay: 0.8 },
  { text: 'EDGE AI & ONNX RUNTIME', x: '78%', y: '75%', delay: 1.1 },
  { text: 'DETERMINISTIC TESTSTAND', x: '36%', y: '90%', delay: 1.4 },
];

// ═════════════════════════════════════════════════════════════════════════════
// 2. CORE CAPABILITY OFFERINGS (PDF Page 2)
// ═════════════════════════════════════════════════════════════════════════════
const CORE_CAPABILITIES = [
  {
    id: 'app-dev',
    slug: 'labview-application-development',
    icon: Code2,
    badge: 'CORE SOFTWARE',
    index: '01',
    title: 'LabVIEW Application Development',
    image: '/LabVIEW Development and Data Acquisition Suite.png',
    description:
      'Modular, scalable VIs built using Actor Framework, DQMH, and industry best practices for robust test execution.',
    specs: ['Actor Framework & DQMH', 'Queued Message Handler (QMH)', 'Object-Oriented LabVIEW (LVOOP)', 'Producer-Consumer Pipelines']
  },
  {
    id: 'teststand',
    slug: 'teststand-automation',
    icon: Layers,
    badge: 'TEST EXECUTIVE',
    index: '02',
    title: 'NI TestStand Architecture & Automated Test Sequencing',
    image: '/Automated Test Equipment Workstation Rack.png',
    description:
      'Industry-standard test executive frameworks for automated sequencing, parallel multi-UUT testing, and automated SQL reporting.',
    specs: ['Parallel & Batch Execution', 'Modular LabVIEW/Python Steps', 'Automated Database Logging (SQL)', 'Custom Operator Interface (OI)']
  },
  {
    id: 'ate',
    slug: 'automated-test-systems',
    icon: Zap,
    badge: 'AUTOMATED TEST',
    index: '03',
    title: 'Automated Test Systems',
    image: '/Automated Test System and LabVIEW Workstation (1).png',
    description:
      'High-speed functional test benches, End-of-Line (EOL) testing, and automated test executive workflows.',
    specs: ['End-of-Line (EOL) Testing', 'Hardware-in-the-Loop (HIL)', 'Automated TestStand Sequencing', 'Pass/Fail SQL Analytics']
  },
  {
    id: 'hardware',
    slug: 'hardware-instrument-integration',
    icon: Cpu,
    badge: 'NI HARDWARE',
    index: '04',
    title: 'Hardware & Instrument Integration',
    image: '/LabVIEW Hardware Integration Showcase.png',
    description:
      'Seamless interfacing with NI PXI, CompactDAQ, CompactRIO, PLCs, and third-party laboratory instruments.',
    specs: ['NI PXIe Chassis High-Speed', 'cDAQ & CompactRIO Real-Time', 'SCPI & VISA Instrument Control', 'Simultaneous Multi-Channel DAQ']
  },
  {
    id: 'industrial',
    slug: 'industrial-automation',
    icon: Factory,
    badge: 'SCADA & PLC',
    index: '05',
    title: 'Industrial Automation',
    image: '/Industrial Automation Test Cell Dashboard (1).png',
    description:
      'Robust control systems, SCADA connectivity, PLC communication, and pneumatic or robotic testing cells.',
    specs: ['Siemens & Allen-Bradley PLCs', 'Modbus TCP / RTU & OPC UA', 'EtherNet/IP & PROFINET', 'Operator Touchscreen HMIs']
  },
  {
    id: 'ai-vision',
    slug: 'ai-vision-inspection',
    icon: Brain,
    badge: 'VISION & AI',
    index: '06',
    title: 'AI Machine Vision & Smart Testing',
    image: '/AI Machine Vision Inspection System.png',
    description:
      'Automated defect inspection, predictive maintenance, and intelligent anomaly detection powered by ONNX.',
    specs: ['Sub-Millimeter Optical Inspection', 'ONNX Machine Learning Models', 'Vibration Predictive Analytics', 'Automated Root-Cause Reports']
  },
  {
    id: 'modernization',
    slug: 'legacy-code-refactoring',
    icon: RotateCcw,
    badge: 'LIFECYCLE',
    index: '07',
    title: 'Legacy Code Refactoring & Migration',
    image: '/Legacy to Modern LabVIEW Code Migration (2).png',
    description:
      'Modernizing monolithic or obsolete LabVIEW codebases into clean, modular, maintainable architectures.',
    specs: ['Spaghetti Code Refactoring', 'Race Condition Elimination', 'LabVIEW 2024+ Upgrades', 'Automated Regression Suites']
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// 3. 5-STAGE WORKFLOW PIPELINE (PDF Page 4)
// ═════════════════════════════════════════════════════════════════════════════
const WORKFLOW_PIPELINE = [
  {
    step: '01',
    channel: 'CH-01',
    title: 'Real-World Signals',
    desc: 'Voltages, currents, temperatures, vibrations & pressures',
    tag: 'Physical Layer',
    telemetry: '±10V / 24-bit IEPE'
  },
  {
    step: '02',
    channel: 'CH-02',
    title: 'Sensors & Transducers',
    desc: 'Thermocouples, accelerometers, load cells & flow meters',
    tag: 'Transduction',
    telemetry: 'Analog Conditioning'
  },
  {
    step: '03',
    channel: 'CH-03',
    title: 'DAQ & Controllers',
    desc: 'CompactDAQ, PXI, CompactRIO & third-party instruments',
    tag: 'Digitization',
    telemetry: '1 MS/s Simultaneous'
  },
  {
    step: '04',
    channel: 'CH-04',
    title: 'LabVIEW Software',
    desc: 'Data acquisition, processing, filtering & visualization',
    tag: 'Processing',
    telemetry: 'Microsecond Determinism'
  },
  {
    step: '05',
    channel: 'CH-05',
    title: 'Reports & Decisions',
    desc: 'Automated PDF/Excel reports & quality gates',
    tag: 'Compliance',
    telemetry: '100% Traceable TDMS/SQL'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// 4. ARCHITECTURAL RISKS & SOLUTIONS (PDF Page 6-7)
// ═════════════════════════════════════════════════════════════════════════════
const ARCHITECTURAL_RISKS = [
  {
    num: '01',
    code: 'FAULT_0x01',
    title: 'Spaghetti Code & Monolithic Coupling',
    problem:
      'When block diagrams are entangled without modular subVIs or clean data flow, tracing errors becomes extremely difficult. Future modifications or adding features frequently breaks existing functionalities.',
    consequence: 'Fragile Builds & High Technical Debt',
    solution: 'Certified CLD Modular DQMH / Actor Hierarchy'
  },
  {
    num: '02',
    code: 'FAULT_0x02',
    title: 'Race Conditions & Thread Collisions',
    problem:
      'Running multiple parallel while loops without proper data synchronization (such as Queues, Notifiers, or Semaphores) causes unpredictable execution orders, leading to data loss and erratic hardware control.',
    consequence: 'Intermittent Failures & Jitter',
    solution: 'Thread-Safe Synchronization & RT FIFOs'
  },
  {
    num: '03',
    code: 'FAULT_0x03',
    title: 'Memory Leaks & System Crashes',
    problem:
      'In continuous testing environments, poor error handling, unclosed references, and inefficient shift register management cause RAM usage to grow uncontrollably, leading to crashes during long test runs.',
    consequence: 'Runaway RAM Accumulation',
    solution: 'Robust Error Handling & Refactoring'
  },
  {
    num: '04',
    code: 'FAULT_0x04',
    title: 'User Interface (UI) Freezing',
    problem:
      'Performing heavy data processing, file logging (TDMS/SQL), or intensive computations directly on the UI thread causes front panels to freeze, making buttons unresponsive and ruining operator experience.',
    consequence: 'Stalled HMI & Unresponsive Controls',
    solution: 'Asynchronous UI Message Queues'
  },
  {
    num: '05',
    code: 'FAULT_0x05',
    title: 'Hardware Sync & Latency Issues',
    problem:
      'Interfacing with high-speed hardware (PXI, CompactRIO, DAQ, PLCs) without deterministic timing loops and proper driver configuration introduces severe latency, jitter, and inaccurate signal sampling.',
    consequence: 'Phase Shift & Corrupted Capture',
    solution: 'Deterministic RT & FPGA Loops'
  },
  {
    num: '06',
    code: 'FAULT_0x06',
    title: 'Lack of Scalability',
    problem:
      'Monolithic code cannot easily scale. Adding new sensors, expanding channel counts, or integrating new test sequences requires rewriting major portions of the application from scratch.',
    consequence: 'Total Code Rewrite Required',
    solution: 'Actor Framework & DQMH Patterns'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// 5. CORE ENGINEERING DOMAIN SOLUTIONS (PDF Page 8-9)
// ═════════════════════════════════════════════════════════════════════════════
const DOMAIN_SOLUTIONS = [
  {
    icon: Car,
    category: 'AUTOMOTIVE & EV',
    title: 'EV & Battery Test Benches',
    slug: 'ev-battery-test-benches',
    desc: 'High-voltage battery cycling, thermal chamber control, and BMS communication validation test rigs designed with strict safety interlocks and deterministic data logging.',
    image: '/EV Battery and Powertrain Test Bench.png',
    telemetry: 'BUS: CAN FD / LIN • SIL-2 SAFETY INTERLOCK',
    bullets: [
      'High-voltage isolation DAQ integration',
      'Real-time temperature & voltage profiling'
    ]
  },
  {
    icon: Cpu,
    category: 'MANUFACTURING QUALITY',
    title: 'Automated End-of-Line (EOL) Testing',
    slug: 'automated-test-systems',
    desc: 'Turnkey manufacturing test stations integrating pneumatic fixtures, barcode scanners, electrical probes, and acoustic validation to ensure 100% product compliance.',
    image: '/Industrial Robotic Automation Cell.png',
    telemetry: 'CYCLE TIME: < 12s • PNEUMATIC FIXTURES',
    bullets: [
      'Automated pass/fail database logging',
      'Fast-cycle execution algorithms'
    ]
  },
  {
    icon: Network,
    category: 'PLANT AUTOMATION',
    title: 'PLC & Industrial SCADA Integration',
    slug: 'industrial-automation',
    desc: 'Bridging LabVIEW applications with industrial PLCs (Siemens, Allen-Bradley) via OPC UA, Modbus, and Ethernet/IP to provide intuitive plant-floor control dashboards.',
    image: '/Industrial SCADA Control System Collage.png',
    telemetry: 'PROTOCOLS: OPC UA / MODBUS • TOUCH HMI',
    bullets: [
      'Bi-directional command synchronization',
      'Role-based operator HMI panels'
    ]
  },
  {
    icon: Eye,
    category: 'COMPUTER VISION',
    title: 'AI Machine Vision & AOI Systems',
    slug: 'ai-vision-inspection',
    desc: 'High-speed optical inspection for part presence, dimensional verification, surface defect classification, and OCR barcode reading using NI Vision and deep learning models.',
    image: '/AI Machine Vision Inspection Station.png',
    telemetry: 'INFERENCE: < 35ms • RESOLUTION: ±0.02mm',
    bullets: [
      'Sub-millimeter optical precision',
      'Real-time ONNX model inference'
    ]
  },
  {
    icon: Activity,
    category: 'AEROSPACE & DEFENSE',
    title: 'Hardware-in-the-Loop (HIL) Simulators',
    slug: 'hardware-in-the-loop-hil',
    desc: 'Simulating complex physical systems in real time using NI PXI and FPGA hardware to validate embedded control units (ECUs) prior to field integration.',
    image: '/NI PXIe-1085 Modular Instrument Chassis.png',
    telemetry: 'TIMING: < 1µs JITTER • CHASSIS: NI PXIe',
    bullets: [
      'Microsecond determinism on RTOS',
      'Fault insertion unit (FIU) test matrices'
    ]
  },
  {
    icon: Radio,
    category: 'TELECOMMUNICATIONS',
    title: 'RF & Wireless Device Characterization',
    slug: 'rf-wireless-automated-test',
    desc: 'Automated measurement of S-parameters, gain, noise figure, and spectrum analysis for RF components and wireless modules across multi-GHz frequencies.',
    image: '/Precision NI Laboratory Instrument Stack.png',
    telemetry: 'BANDWIDTH: 26.5 GHz • PROTOCOL: SCPI/VISA',
    bullets: [
      'SCPI/VISA automation for spectrum analyzers',
      'Multi-port matrix switch routing'
    ]
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// 6. 10-STEP METHODOLOGY (PDF Page 10-11)
// ═════════════════════════════════════════════════════════════════════════════
const WORKFLOW_STEPS = [
  {
    step: '01',
    phase: 'PHASE 01: ARCHITECTURE',
    title: 'Requirement Gathering & Feasibility',
    desc: 'Review test specifications, identify I/O channels, signal types, sample rates, accuracy requirements, and interface protocols.',
    deliverable: 'SRS Document',
    image: '/images/methodology/methodology-01-requirements.jpg'
  },
  {
    step: '02',
    phase: 'PHASE 01: ARCHITECTURE',
    title: 'System Architecture Design',
    desc: 'Select appropriate design patterns (QMH, Actor Framework, DQMH), define state machines, error-handling strategy, and data flow.',
    deliverable: 'Architecture Document',
    image: '/images/methodology/methodology-02-architecture.jpg'
  },
  {
    step: '03',
    phase: 'PHASE 01: ARCHITECTURE',
    title: 'Hardware Selection & BOM',
    desc: 'Recommend optimal NI hardware (PXI, cDAQ, cRIO), sensors, signal conditioning modules, communication cards, and third-party instruments.',
    deliverable: 'Hardware BOM',
    image: '/images/methodology/methodology-03-hardware-bom.jpg'
  },
  {
    step: '04',
    phase: 'PHASE 02: DEVELOPMENT',
    title: 'UI / UX Front Panel Design',
    desc: 'Create intuitive, operator-friendly front panels with clear real-time graphs, status indicators, alarm banners, and role-based access.',
    deliverable: 'UI Mockups & Prototypes',
    image: '/images/methodology/methodology-04-ui-ux.jpg'
  },
  {
    step: '05',
    phase: 'PHASE 02: DEVELOPMENT',
    title: 'Core Software Development',
    desc: 'Write clean, modular, self-documenting VIs following certified CLD standards, with subVIs, typdefs, and comprehensive error handling.',
    deliverable: 'Source Code Repository',
    image: '/images/methodology/methodology-05-core-software.jpg'
  },
  {
    step: '06',
    phase: 'PHASE 02: DEVELOPMENT',
    title: 'Hardware & Driver Integration',
    desc: 'Interface with NI-DAQmx, NI-VISA, NI-CAN, Modbus, OPC UA, and instrument drivers. Validate timing, triggering, and synchronization.',
    deliverable: 'Driver Integration Test',
    image: '/images/methodology/methodology-06-driver-integration.jpg'
  },
  {
    step: '07',
    phase: 'PHASE 02: DEVELOPMENT',
    title: 'Testing, Debugging & Optimization',
    desc: 'Stress testing, memory leak checks (VI Profiler), race condition elimination, timing optimization, and boundary condition validation.',
    deliverable: 'Test Coverage Report',
    image: '/images/methodology/methodology-07-testing-debugging.jpg'
  },
  {
    step: '08',
    phase: 'PHASE 03: COMMISSIONING',
    title: 'Deployment & Commissioning',
    desc: 'Build stand-alone executables (.exe), installers with runtime engines, deploy to target machines, calibrate sensors, and run dry tests.',
    deliverable: 'Installer Package',
    image: '/images/methodology/methodology-08-deployment.jpg'
  },
  {
    step: '09',
    phase: 'PHASE 03: COMMISSIONING',
    title: 'Documentation & Training',
    desc: 'Deliver detailed User Manuals, Software Design Descriptions (SDD), API documentation, and conduct on-site or remote training sessions.',
    deliverable: 'Documentation Package',
    image: '/images/methodology/methodology-09-documentation.jpg'
  },
  {
    step: '10',
    phase: 'PHASE 03: COMMISSIONING',
    title: 'Support & Maintenance',
    desc: 'Provide ongoing warranty support, bug fixes, feature enhancements, code refactoring, and LabVIEW version upgrades as needs evolve.',
    deliverable: 'SLA Support Contract',
    image: '/images/methodology/methodology-10-support.jpg'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// 7. INTELLIGENT AI TESTING CAPABILITIES (PDF Page 14-15)
// ═════════════════════════════════════════════════════════════════════════════
const AI_TESTING_FEATURES = [
  {
    step: '01',
    badge: 'VISION & AOI',
    title: 'AI Machine Vision & Defect Detection',
    desc: 'Real-time identification of microscopic component defects, scratches, and assembly errors.'
  },
  {
    step: '02',
    badge: 'EDGE TELEMETRY',
    title: 'Predictive Maintenance & Monitoring',
    desc: 'Continuous vibration and thermal analysis to predict equipment failure before it occurs.'
  },
  {
    step: '03',
    badge: 'DATA PIPELINE',
    title: 'Intelligent Test Data Analytics',
    desc: 'Automated classification of large volume test datasets and parameter correlation.'
  },
  {
    step: '04',
    badge: 'ANOMALY DETECT',
    title: 'Real-Time Anomaly Detection',
    desc: 'Instant identification of unexpected sensor drift or test rig abnormal behavior.'
  },
  {
    step: '05',
    badge: 'ROOT CAUSE',
    title: 'AI-Assisted Report Analysis',
    desc: 'Natural language summaries and automated root-cause insights embedded into PDF reports.'
  },
  {
    step: '06',
    badge: 'OEE ANALYTICS',
    title: 'Production Performance Insights',
    desc: 'OEE optimization and bottleneck identification across manufacturing test lines.'
  },
  {
    step: '07',
    badge: 'ADAPTIVE QA',
    title: 'Intelligent Quality Inspection',
    desc: 'Adaptive pass/fail criteria adjusting dynamically based on historical batch trends.'
  },
  {
    step: '08',
    badge: 'CONTROL ROOM',
    title: 'AI-Enabled Engineering Dashboards',
    desc: 'Executive web and local dashboards showcasing predictive health metrics in real time.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// REAL-TIME VIRTUAL INSTRUMENT OSCILLOSCOPE MONITOR (LabVIEW Front Panel Demo)
// ═════════════════════════════════════════════════════════════════════════════
function VirtualInstrumentWaveform() {
  const [channel, setChannel] = useState<'sine' | 'can' | 'hil' | 'ai'>('sine');
  const [isRunning, setIsRunning] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef(0);
  const animFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1));
    let height = (canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Engineering grid background
      ctx.strokeStyle = 'rgba(14, 124, 134, 0.08)';
      ctx.lineWidth = 1 * (window.devicePixelRatio || 1);

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

      // 2. Center crosshair axis
      ctx.strokeStyle = 'rgba(14, 124, 134, 0.25)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Draw live signal trace
      const primaryColor =
        channel === 'sine'
          ? '#E7651A'
          : channel === 'can'
            ? '#0891b2'
            : channel === 'hil'
              ? '#2563eb'
              : '#10b981';

      ctx.lineWidth = 2.5 * (window.devicePixelRatio || 1);
      ctx.strokeStyle = primaryColor;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 8 * (window.devicePixelRatio || 1);
      ctx.beginPath();

      const centerY = height / 2;
      const amp = height * 0.35;

      for (let x = 0; x < width; x++) {
        const t = (x / width) * 22 + phaseRef.current;
        let y = centerY;

        if (channel === 'sine') {
          // Analog high-speed DAQ waveform
          y = centerY + Math.sin(t) * amp * 0.8 + Math.sin(t * 3.2) * (amp * 0.15);
        } else if (channel === 'can') {
          // Digital CAN Bus differential pulse train
          const rawSq = Math.sin(t * 1.6) > 0 ? 1 : -1;
          const jitter = Math.sin(t * 14) * 0.04;
          y = centerY + (rawSq + jitter) * (amp * 0.7);
        } else if (channel === 'hil') {
          // HIL Closed Loop feedback with damping
          y = centerY + Math.sin(t * 2) * Math.cos(t * 0.4) * amp + (Math.random() * 3 - 1.5);
        } else {
          // Edge AI Vision Defect confidence confidence spikes
          const spike = Math.sin(t * 0.9) > 0.45 ? Math.sin(t * 7) * 0.9 : 0.08 * Math.sin(t * 2);
          y = centerY + spike * amp;
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
      width = canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      height = canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [channel, isRunning]);

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden flex flex-col">
      {/* Oscilloscope Header Bar */}
      <div className="px-5 py-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider text-slate-300">
            <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>VEST VI-OSC-4400 // CHASSIS PXIe-8881</span>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E7651A]/30 text-teal-300 border border-teal-500/40">
            {channel === 'sine'
              ? 'ANALOG IN (2.5 MS/s)'
              : channel === 'can'
                ? 'CAN-FD BUS (1.0 Mbps)'
                : channel === 'hil'
                  ? 'HIL CLOSED-LOOP (10 kHz)'
                  : 'EDGE AI DEFECT TRACE'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none border text-xs font-mono font-bold tracking-wider uppercase transition-all ${isRunning
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600'
              }`}
          >
            {isRunning ? <Pause size={12} className="text-amber-400" /> : <Play size={12} className="text-white" />}
            <span>{isRunning ? 'FREEZE' : 'ACQUIRE'}</span>
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full h-56 sm:h-64 bg-[#fbfdff]">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Bottom Channel Selector Pill Matrix */}
        <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-none border border-slate-300 shadow-xs">
            <button
              type="button"
              onClick={() => setChannel('sine')}
              className={`px-2.5 py-1 rounded-none font-mono text-[10px] font-bold tracking-wider uppercase transition-all border ${channel === 'sine'
                ? 'bg-[#E7651A] text-white border-[#E7651A]'
                : 'text-slate-600 border-transparent hover:bg-slate-100'
                }`}
            >
              CH1 SINE
            </button>
            <button
              type="button"
              onClick={() => setChannel('can')}
              className={`px-2.5 py-1 rounded-none font-mono text-[10px] font-bold tracking-wider uppercase transition-all border ${channel === 'can'
                ? 'bg-[#0891b2] text-white border-[#0891b2]'
                : 'text-slate-600 border-transparent hover:bg-slate-100'
                }`}
            >
              CH2 CAN-FD
            </button>
            <button
              type="button"
              onClick={() => setChannel('hil')}
              className={`px-2.5 py-1 rounded-none font-mono text-[10px] font-bold tracking-wider uppercase transition-all border ${channel === 'hil'
                ? 'bg-[#2563eb] text-white border-[#2563eb]'
                : 'text-slate-600 border-transparent hover:bg-slate-100'
                }`}
            >
              CH3 HIL
            </button>
            <button
              type="button"
              onClick={() => setChannel('ai')}
              className={`px-2.5 py-1 rounded-none font-mono text-[10px] font-bold tracking-wider uppercase transition-all border ${channel === 'ai'
                ? 'bg-[#10b981] text-white border-[#10b981]'
                : 'text-slate-600 border-transparent hover:bg-slate-100'
                }`}
            >
              CH4 ONNX AI
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-none border border-slate-300 text-slate-600 font-bold shadow-xs">
            <span>Vpp: <span className="text-[#E7651A]">3.32 V</span></span>
            <span className="text-slate-300">•</span>
            <span>Freq: <span className="text-slate-900">1.00 kHz</span></span>
            <span className="text-slate-300">•</span>
            <span>A/D Latency: <span className="text-emerald-600">&lt; 42 ns</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
export default function LabVIEWEngineeringPage() {
  useLenis();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#E7651A]/20 selection:text-[#0B2340]">
      <Navbar />

      <main className="flex flex-col relative z-10 overflow-x-clip bg-white">

        {/* ═════════════════════════════════════════════════════════════════════
            1. 3D ISOMETRIC LABVIEW ARCHITECTURE CORE HERO (SYNTRA SYSTEM)
        ═════════════════════════════════════════════════════════════════════ */}
        <LabviewEngineeringHero />

        {/* ═════════════════════════════════════════════════════════════════════
            2. PROVEN COMPETENCIES - CORE ENGINEERING CAPABILITIES CARDS
        ═════════════════════════════════════════════════════════════════════ */}
        <CoreCapabilitiesCards />

        {/* ═════════════════════════════════════════════════════════════════════
            3. WHY CHOOSE LABVIEW? (ENGINEERING INTELLIGENCE & ECOSYSTEM)
        ═════════════════════════════════════════════════════════════════════ */}
        <WhyChooseLabviewBanner />

        {/* ═════════════════════════════════════════════════════════════════════
            3.1 COMPREHENSIVE LABVIEW ENGINEERING SERVICES (9 CORE CAPABILITIES)
        ═════════════════════════════════════════════════════════════════════ */}
        <ComprehensiveEngineeringServices />

        {/* ═════════════════════════════════════════════════════════════════════
            4. ARCHITECTURAL INTEGRITY: RISKS OF UNSTRUCTURED CODE (PDF Page 5-7)
        ═════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 hero-styled-bg relative isolate overflow-hidden">
          <InteractiveFloorGrid />
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-[#0B2340] tracking-tight mb-4">
                Why Architecture Matters: <span className="text-[#E7651A]">The Risks</span> of Unstructured LabVIEW Code
              </h2>

              <p className="text-[#536578] text-sm sm:text-base leading-relaxed">
                Developing LabVIEW applications without proper architecture, modular design, or structured logic (often leading to monolithic or &ldquo;spaghetti&rdquo; code) introduces severe technical vulnerabilities. Here is what happens when code lacks professional structure:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ARCHITECTURAL_RISKS.map((risk, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{
                    y: -6,
                    borderColor: 'rgba(231, 101, 26, 0.6)',
                    boxShadow: '0 12px 32px -6px rgba(231, 101, 26, 0.12)'
                  }}
                  className="p-7 sm:p-8 rounded-2xl bg-white border border-[#0B2340]/10 shadow-[0_4px_20px_-4px_rgba(11,35,64,0.05)] flex flex-col justify-between transition-all cursor-default relative overflow-hidden group"
                >
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2340] mb-3 leading-snug group-hover:text-[#E7651A] transition-colors">
                      {risk.title}
                    </h3>

                    {/* Problem Statement */}
                    <p className="text-xs sm:text-sm text-[#536578] leading-relaxed mb-5">
                      {risk.problem}
                    </p>

                    {/* Consequence Strip */}
                    <div className="mb-5 px-3 py-2 rounded-lg bg-[#E7651A]/10 border border-[#E7651A]/25 flex items-center gap-2 text-[#0B2340] text-xs font-semibold">
                      <ShieldAlert size={14} className="text-[#E7651A] shrink-0" />
                      <span>{risk.consequence}</span>
                    </div>
                  </div>

                  {/* Engineered Solution */}
                  <div className="pt-4 border-t border-[#0B2340]/8 flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#E7651A] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-[#0B2340] leading-tight block">
                        {risk.solution}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            5. CORE ENGINEERING DOMAIN SOLUTIONS (PDF Page 7-9)
        ═════════════════════════════════════════════════════════════════════ */}
        <section id="solutions" className="py-24 hero-styled-bg relative isolate overflow-hidden">
          <InteractiveFloorGrid />
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14 max-w-4xl"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0B2340] leading-[1.05] tracking-tight mb-4">
                <span className="text-[#E7651A]">Core</span> Engineering Solutions for High-Precision Applications
              </h2>

              <p className="text-[#536578] text-base sm:text-lg mb-8 max-w-2xl leading-relaxed font-normal">
                Targeted, turnkey test automation, automated EOL validation, and industrial control architectures engineered for deterministic performance, high throughput, and mission-critical reliability.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DOMAIN_SOLUTIONS.map((sol, idx) => {
                const Icon = sol.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="relative bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(11,35,64,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(11,35,64,0.12)] border border-[#0B2340]/10 hover:border-[#E7651A]/50 transition-all duration-300 min-h-[330px] group flex"
                  >
                    {/* Background Image Container */}
                    <div className="absolute inset-0 right-0 w-full h-full z-0 bg-white">
                      <Image
                        src={sol.image}
                        alt={sol.title}
                        fill
                        className="object-cover object-right group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Curved White Overlay with Smooth Transition */}
                    <div className="absolute inset-0 w-[70%] sm:w-[68%] h-full z-10 pointer-events-none">
                      <svg
                        className="w-full h-full drop-shadow-[4px_0_8px_rgba(0,0,0,0.06)]"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 100"
                      >
                        <path
                          d="M0,0 L75,0 C75,35 100,55 100,100 L0,100 Z"
                          fill="white"
                        />
                      </svg>
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-20 w-[62%] sm:w-[58%] p-6 sm:p-7 flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-[#E7651A]/10 text-[#E7651A] flex items-center justify-center shrink-0 mb-3">
                          <Icon size={16} />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#0B2340] leading-tight mb-2.5 group-hover:text-[#E7651A] transition-colors">
                          {sol.title}
                        </h3>
                        <p className="text-[#536578] text-xs sm:text-[13px] leading-relaxed line-clamp-4">
                          {sol.desc}
                        </p>
                      </div>

                      <Link
                        href={`/services/${sol.slug || 'automated-test-systems'}`}
                        className="inline-flex items-center text-xs font-semibold text-[#0B2340] hover:text-[#E7651A] transition-colors mt-4 group/btn"
                      >
                        Explore Architecture &amp; Capabilities
                        <ArrowRight size={14} className="ml-1.5 text-[#E7651A] transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            6. 10-STEP METHODOLOGY (PDF Page 10-11)
        ═════════════════════════════════════════════════════════════════════ */}
        {/* <section className="py-24 hero-styled-bg relative isolate overflow-hidden">
          <InteractiveFloorGrid />
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-[#0B2340] tracking-tight mb-4">
                Our Engineering Workflow — <span className="text-[#E7651A]">From Requirement to Reality</span>
              </h2>

              <p className="text-[#536578] text-sm sm:text-base leading-relaxed">
                A rigorous 10-step engineering framework ensuring high reliability, strict traceability, and flawless deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {WORKFLOW_STEPS.map((wf, idx) => (
                <LinkPreview
                  key={idx}
                  imageSrc={wf.image}
                  isStatic={true}
                  width={340}
                  height={220}
                  asChild
                >
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: (idx % 2) * 0.1 }}
                    whileHover={{
                      y: -4,
                      borderColor: '#E7651A',
                      boxShadow: '0 12px 30px -8px rgba(231,101,26,0.15)'
                    }}
                    className="p-6 sm:p-7 rounded-2xl bg-white border border-[#0B2340]/10 shadow-[0_4px_16px_-4px_rgba(11,35,64,0.05)] flex flex-col justify-between transition-all cursor-pointer group hover:border-[#E7651A] select-none overflow-hidden min-h-[155px]"
                  >
                    <div>
                      <div className="mb-2.5">
                        <span className="font-mono text-xs font-bold text-[#E7651A]">
                          STEP {wf.step}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0B2340] group-hover:text-[#E7651A] transition-colors leading-snug mb-2">
                        {wf.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#536578] leading-relaxed">
                        {wf.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#0B2340]/8 flex items-center justify-between font-mono text-[11px]">
                      <span className="text-[#536578]">Deliverable:</span>
                      <span className="font-bold text-[#0B2340] group-hover:text-[#E7651A] transition-colors">
                        {wf.deliverable}
                      </span>
                    </div>
                  </motion.div>
                </LinkPreview>
              ))}
            </div>

          </div>
        </section> */}

        {/* ═════════════════════════════════════════════════════════════════════
            7. HARDWARE PLATFORM SELECTION GUIDE
        ═════════════════════════════════════════════════════════════════════ */}
        <HardwareSelectionGuide />

        {/* ═════════════════════════════════════════════════════════════════════
            8. INTELLIGENT AI TESTING SUITE (PDF Page 14-15)
        ═════════════════════════════════════════════════════════════════════ */}
        <SmartTestSystemsSection />

      </main>

      <Footer />
    </div>
  );
}
