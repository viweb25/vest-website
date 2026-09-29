'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggerPhases } from '@/components/ui/stagger-phases';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  FileText,
  Layers,
  LayoutTemplate,
  Archive,
  Grid,
  PenTool,
  BookOpen,
  ClipboardList,
  HardHat,
  Package,
  Target,
  Shield,
  FileSearch,
  Compass,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Sliders,
  Check,
  Building2,
  Factory,
  Cpu
} from 'lucide-react';
import { ShimmerText } from '@/components/ui/shimmer-text';

/* =========================================================================
   1. ENGINEERING OVERVIEW
   ========================================================================= */
export function EngineeringOverview() {
  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden font-sans border-b border-slate-100">


      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Heading & Core Features */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-6 w-fit shadow-xs"
            >

              <span className="text-[11px] font-bold tracking-widest text-slate-600 uppercase">
                Engineering Documentation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-black uppercase text-black"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.25rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                marginBottom: "36px",
                WebkitTextStroke: "2px currentColor",
              }}
            >
              FROM CONCEPT <br />
              TO CONSTRUCTION.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-10 max-w-2xl"
            >
              <ShimmerText
                className="text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.8] tracking-[0.005em] font-medium"
                style={{ color: "#475569", opacity: 1 }}
              >
                Civil engineering projects depend on accurate drawings, structured documentation, and clear technical information. We create detailed engineering documentation that helps teams move confidently from initial layouts and design coordination through construction execution.
              </ShimmerText>
            </motion.div>

            {/* Core Metrics & Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-slate-100"
            >
              {[
                { icon: Target, title: 'Accurate Drawings', subtitle: 'Millimeter Tolerance' },
                { icon: FileText, title: 'Structured Docs', subtitle: 'Standardized BOQs' },
                { icon: HardHat, title: 'Site Ready', subtitle: 'IFC & GFC Packets' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex flex-col gap-2 p-3 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/60">
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0066FF] shadow-xs">
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{item.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center lg:justify-start"
          >
            <div className="w-full relative lg:-ml-20 xl:-ml-[150px] mt-8 lg:mt-0">
              <img
                src="https://res.cloudinary.com/defqgygsf/image/upload/v1790418859/0234_xgsytz.png"
                className="w-full lg:w-[130%] xl:w-[140%] max-w-none h-auto object-contain"
                alt="Engineering CAD Documentation"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   2. CIVIL SERVICES
   ========================================================================= */
const IMG1 = 'https://res.cloudinary.com/defqgygsf/image/upload/v1790425893/89t_rwtqjh.png';
const IMG2 = 'https://res.cloudinary.com/defqgygsf/image/upload/v1790430016/8932_wyigkp.png';
const IMG3 = 'https://res.cloudinary.com/defqgygsf/image/upload/v1790430154/327_maakri.png';

const SERVICES = [
  {
    id: '01',
    title: 'Civil Engineering Drawings',
    icon: FileText,
    image: IMG1,
    heading: 'CIVIL ENGINEERING DRAWINGS',
    desc: 'Detailed architectural, structural and construction drawings for accurate design and execution.',
    features: [
      { name: 'Architectural Drawings', icon: FileText },
      { name: 'Structural Drawings', icon: Layers },
      { name: 'Elevation & Section Drawings', icon: LayoutTemplate },
      { name: 'Detailed CAD Documentation', icon: Archive },
    ]
  },
  {
    id: '02',
    title: 'Construction Documentation',
    icon: Layers,
    image: IMG2,
    heading: 'CONSTRUCTION DOCUMENTATION',
    desc: 'Comprehensive construction document sets ready for site execution and contractor coordination.',
    features: [
      { name: 'Site Layouts', icon: Grid },
      { name: 'Installation Details', icon: PenTool },
      { name: 'Material Specifications', icon: FileText },
      { name: 'As-Built Drawings', icon: BookOpen },
    ]
  },
  {
    id: '03',
    title: 'Layout Drawings',
    icon: Grid,
    image: IMG3,
    heading: 'LAYOUT DRAWINGS',
    desc: 'Precise site and floor layouts ensuring accurate spatial planning and clash resolution.',
    features: [
      { name: 'Floor Plans', icon: LayoutTemplate },
      { name: 'Reflected Ceiling Plans', icon: Grid },
      { name: 'Equipment Layouts', icon: Package },
      { name: 'Setting Out Plans', icon: Target },
    ]
  },
  {
    id: '04',
    title: 'Engineering Documentation',
    icon: Archive,
    image: IMG1,
    heading: 'ENGINEERING DOCUMENTATION',
    desc: 'Full-scale engineering documentation supporting complex infrastructure and structural designs.',
    features: [
      { name: 'Design Reports', icon: FileText },
      { name: 'Calculation Sheets', icon: ClipboardList },
      { name: 'Technical Submittals', icon: BookOpen },
      { name: 'Method Statements', icon: Layers },
    ]
  },
  {
    id: '05',
    title: 'Quantity Take-Off',
    icon: ClipboardList,
    image: IMG2,
    heading: 'QUANTITY TAKE-OFF',
    desc: 'Accurate material quantification directly from 2D/3D models for precise cost estimation.',
    features: [
      { name: 'Concrete & Rebar QTO', icon: Layers },
      { name: 'Steelwork QTO', icon: HardHat },
      { name: 'Finishes Quantification', icon: LayoutTemplate },
      { name: 'Earthworks Volumetrics', icon: Grid },
    ]
  },
  {
    id: '06',
    title: 'BOQ / BOM Support',
    icon: Package,
    image: IMG3,
    heading: 'BOQ / BOM SUPPORT',
    desc: 'Detailed Bill of Quantities and Bill of Materials preparation for procurement and bidding.',
    features: [
      { name: 'Detailed BOQ Generation', icon: ClipboardList },
      { name: 'Material Schedules', icon: FileText },
      { name: 'Supplier Ready BOMs', icon: Package },
      { name: 'Cost Code Integration', icon: Archive },
    ]
  },
  {
    id: '07',
    title: 'Technical Documentation',
    icon: BookOpen,
    image: IMG1,
    heading: 'TECHNICAL DOCUMENTATION',
    desc: 'Clear, standardized technical documentation for operation, maintenance, and compliance.',
    features: [
      { name: 'O&M Manuals', icon: BookOpen },
      { name: 'Compliance Reports', icon: FileText },
      { name: 'Safety Documentation', icon: Shield },
      { name: 'Asset Registers', icon: Archive },
    ]
  },
];

const SERVICE_META: Record<string, { type: string; ref: string; status: string; rev: string; shortTitle: string }> = {
  '01': { type: 'CAD / ENGINEERING', ref: 'CIVIL-01', status: 'READY FOR EXECUTION', rev: '01', shortTitle: 'DRAWINGS' },
  '02': { type: 'CONSTRUCTION DOCS', ref: 'CIVIL-02', status: 'READY FOR EXECUTION', rev: '02', shortTitle: 'DOCUMENT' },
  '03': { type: 'LAYOUT / PLANNING', ref: 'CIVIL-03', status: 'READY FOR EXECUTION', rev: '03', shortTitle: 'LAYOUT' },
  '04': { type: 'ENGINEERING DOCS', ref: 'CIVIL-04', status: 'READY FOR EXECUTION', rev: '04', shortTitle: 'ENGINEERING' },
  '05': { type: 'QUANTIFICATION', ref: 'CIVIL-05', status: 'READY FOR EXECUTION', rev: '05', shortTitle: 'QTO' },
  '06': { type: 'PROCUREMENT', ref: 'CIVIL-06', status: 'READY FOR EXECUTION', rev: '06', shortTitle: 'BOQ/BOM' },
  '07': { type: 'TECHNICAL DOCS', ref: 'CIVIL-07', status: 'READY FOR EXECUTION', rev: '07', shortTitle: 'TECHNICAL' },
};

export function CivilServices() {
  const [activeTab, setActiveTab] = useState('01');
  const activeService = SERVICES.find((s) => s.id === activeTab)!;
  const activeMeta = SERVICE_META[activeTab];

  return (
    <section className="relative bg-[#07111e] text-white overflow-hidden font-sans py-20 lg:py-28">


      <div className="relative z-10 max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-bold tracking-[0.25em] text-slate-400 uppercase">Our Capabilities</span>
            </div>
            <h2
              className="font-black uppercase text-white"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.25rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                marginBottom: "24px",
                WebkitTextStroke: "2px currentColor",
              }}
            >
              ENGINEERING DOCUMENTATION, <br />
              BUILT FOR EXECUTION.
            </h2>
          </div>

          <ShimmerText
            className="text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.8] tracking-[0.005em] font-medium max-w-md lg:text-right lg:mb-6"
            style={{ color: "#94a3b8", opacity: 1 }}
          >
            From millimeter-accurate drawings to comprehensive BOQ support, we formulate civil engineering documentation built for real-world contractors.
          </ShimmerText>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="w-fit max-w-full border border-slate-800 bg-slate-900/60 backdrop-blur-md rounded-2xl p-2 mb-10 overflow-x-auto scrollbar-none shadow-xl">
          <div className="flex items-center min-w-max gap-2">
            {SERVICES.map((srv) => {
              const isActive = srv.id === activeTab;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(srv.id)}
                  className={`px-5 py-3 rounded-xl transition-all duration-200 text-left flex items-center gap-3 ${isActive
                    ? 'bg-[#3b82f6] text-white shadow-lg shadow-blue-500/25'
                    : 'hover:bg-slate-800/80 text-slate-400 hover:text-white'
                    }`}
                >
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {srv.id}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    {SERVICE_META[srv.id].shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Workstation Container */}
        <div className="grid grid-cols-1 xl:grid-cols-12 rounded-3xl border border-slate-800 bg-[#0a1626]/80 backdrop-blur-xl overflow-hidden shadow-2xl">

          {/* Left: Blueprint Visual Inspector */}
          <div className="xl:col-span-7 relative min-h-[460px] lg:min-h-[580px] p-6 lg:p-12 flex items-center justify-center border-b xl:border-b-0 xl:border-r border-slate-800/90 overflow-hidden">
            {/* Viewport markers */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#3b82f6]/40" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#3b82f6]/40" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#3b82f6]/40" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#3b82f6]/40" />

            <div className="absolute top-6 left-8 flex items-center gap-4 text-[10px] font-mono text-slate-500">
              <span className="text-[#f26522] font-bold">VIEWPORT // ACTIVE</span>
              <span>GRID: 100mm</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab}
                src={activeService.image}
                alt={activeService.heading}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="max-h-[420px] w-auto object-contain filter drop-shadow-[0_10px_40px_rgba(59,130,246,0.2)]"
              />
            </AnimatePresence>

            {/* Bottom Realtime Coords Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-[#060e19]/90 border-t border-slate-800 px-6 py-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <div className="flex gap-4">
                <span>X: 12.44m</span>
                <span>Y: 08.20m</span>
                <span>Z: +04.50m</span>
              </div>
              <span className="text-[#3b82f6] font-bold">STATUS: {activeMeta.status}</span>
            </div>
          </div>

          {/* Right: Technical Deliverables & Specifications */}
          <div className="xl:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#3b82f6]/20 text-sky-400 border border-sky-500/20">
                    CODE: {activeMeta.ref}
                  </span>
                  <span className="text-xs font-mono text-slate-400">REV. {activeMeta.rev}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-4">
                  {activeService.heading}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {activeService.desc}
                </p>

                <h4 className="text-[11px] font-mono font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
                  Included Submittals & Formats
                </h4>

                <div className="space-y-2 mb-8">
                  {activeService.features.map((feat, idx) => {
                    const Icon = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                            <Icon size={16} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                            {feat.name}
                          </span>
                        </div>
                        <ArrowRight size={14} className="text-slate-600" />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-6 border-t border-slate-800/90 flex items-center justify-between text-xs text-slate-500">
              <span>Standard: <strong className="text-slate-300">ISO 19650 / AIA</strong></span>
              <button
                onClick={() => {
                  const nextIdx = (SERVICES.findIndex(s => s.id === activeTab) + 1) % SERVICES.length;
                  setActiveTab(SERVICES[nextIdx].id);
                }}
                className="text-sky-400 hover:text-white font-bold flex items-center gap-1 transition-colors"
              >
                Next Item <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   3. ENGINEERING WORKFLOW (OUR PROCESS - REDESIGNED ON PURE WHITE)
   ========================================================================= */
const WORKFLOW = [
  {
    step: '01',
    title: 'Project Input',
    category: 'Discovery & Feasibility',
    desc: 'Understand project scope, regulatory requirements, site constraints, and collect baseline data.',
    icon: FileSearch,
    tag: 'Phase 01',
    metric: '100% Data Intake'
  },
  {
    step: '02',
    title: 'Engineering Dev',
    category: 'Calculations & BIM',
    desc: 'Perform calculations, 3D modeling, and author preliminary engineering schematics.',
    icon: Compass,
    tag: 'Phase 02',
    metric: 'LOD 300 / 350'
  },
  {
    step: '03',
    title: 'Coordination',
    category: 'Clash Resolution',
    desc: 'Federated model checks across Architectural, Structural, and MEP disciplines to resolve clashes.',
    icon: Layers,
    tag: 'Phase 03',
    metric: 'Zero Clashes'
  },
  {
    step: '04',
    title: 'Documentation',
    category: 'Deliverables & BOQ',
    desc: 'Generate permit-ready plan sets, comprehensive BOQs, specifications, and schedules.',
    icon: FileText,
    tag: 'Phase 04',
    metric: 'GFC Approved'
  },
  {
    step: '05',
    title: 'Site Support',
    category: 'Field Coordination',
    desc: 'Resolve RFIs, evaluate shop drawings, and issue revisions swiftly to keep work moving on site.',
    icon: HardHat,
    tag: 'Phase 05',
    metric: '< 24hr RFI Turn'
  },
  {
    step: '06',
    title: 'Handover',
    category: 'As-Built Sign-off',
    desc: 'Deliver as-built models, operations manuals, and finalized compliance documentation.',
    icon: CheckCircle2,
    tag: 'Phase 06',
    metric: 'Full Compliance'
  },
];

export function EngineeringWorkflow() {

  return (
    <section className="relative py-24 lg:py-32 bg-white text-slate-900 overflow-hidden font-sans border-b border-slate-100">


      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col mb-16 gap-6">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-5 shadow-xs"
            >

              <span className="text-[11px] font-bold tracking-widest text-slate-600 uppercase">
                Structured Execution
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-black uppercase text-black"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                marginBottom: "16px",
                WebkitTextStroke: "2px currentColor",
              }}
            >
              A STRUCTURED APPROACH <br className="hidden md:block" />
              FOR BETTER BUILDINGS.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-md"
          >
            <ShimmerText
              className="text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.8] tracking-[0.005em] font-medium"
              style={{ color: "#475569", opacity: 1 }}
            >
              Our documentation workflow supports the entire project lifecycle, minimizing rework and ensuring airtight site readiness.
            </ShimmerText>
          </motion.div>
        </div>

        <div className="mt-8">
          <StaggerPhases phases={WORKFLOW} />
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   4. CIVIL GALLERY (FEATURED PROJECTS)
   ========================================================================= */
const PROJECTS = [
  {
    id: '01',
    category: 'Commercial High-Rise',
    title: 'Horizon Corporate Tower',
    scope: 'Complete civil and structural documentation for a 32-storey commercial tower with 3 basement levels.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    tags: ['Commercial', 'Structural', 'BIM LOD 350'],
    deliverables: [
      'Architectural Layouts & Sections',
      'Post-Tensioned Slab Schedules',
      'Comprehensive BOQ & Cost Codes',
      'IFC Execution Set'
    ]
  },
  {
    id: '02',
    category: 'Industrial Logistics',
    title: 'Apex Logistics Hub',
    scope: 'Fast-track structural steel modeling, foundation layout, and precast civil engineering for a 50,000 sqm warehouse.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Industrial', 'Steel Structure', 'Precast'],
    deliverables: [
      'Heavy Foundation Footing Plans',
      'Steel Connection Detailed Sheets',
      'Pavement & Stormwater QTO',
      'Bar Bending Schedules (BBS)'
    ]
  },
  {
    id: '03',
    category: 'Healthcare Facility',
    title: 'Metro Speciality Hospital',
    scope: 'High-precision clash detection and MEP-civil coordinated drawings for a state-of-the-art 400-bed hospital.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Healthcare', 'MEP Coordination', 'Critical'],
    deliverables: [
      'Radiation Shielding Concrete Walls',
      'Cleanroom Penetration Layouts',
      'As-Built Asset Database',
      'Operations Compliance Manual'
    ]
  }
];

export function CivilGallery() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentProject = PROJECTS[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden font-sans border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-5 shadow-xs">
              <span className="text-[11px] font-bold tracking-widest text-slate-600 uppercase">
                Featured Portfolio
              </span>
            </div>
            <h2
              className="font-black uppercase text-black"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.25rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                marginBottom: "24px",
                WebkitTextStroke: "2px currentColor",
              }}
            >
              REAL PROJECTS. <br />
              REAL IMPACT.
            </h2>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-bold text-slate-500">
              0{currentIdx + 1} / 0{PROJECTS.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-400 hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors"
                aria-label="Previous Project"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-slate-950 hover:bg-[#0066FF] text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Next Project"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Project Showcase Container */}
        <div className="rounded-3xl border border-slate-200/90 bg-slate-50/60 p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Project Image Frame */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentProject.id}
                    src={currentProject.image}
                    alt={currentProject.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-300 font-bold">
                    {currentProject.category}
                  </span>
                  <h4 className="text-xl font-bold">{currentProject.title}</h4>
                </div>
              </div>
            </div>

            {/* Project Meta and Deliverables */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">
                    {currentProject.title}
                  </h3>

                  <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                    {currentProject.scope}
                  </p>

                  <h5 className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-3">
                    Key Outputs Produced:
                  </h5>

                  <ul className="space-y-2.5 mb-8">
                    {currentProject.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                        <Check size={14} className="text-[#0066FF] shrink-0 stroke-[3]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="inline-flex items-center justify-center gap-3 px-6 py-3.5 border border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 text-sm font-serif font-bold tracking-widest uppercase transition-colors">
                    DISCUSS A SIMILAR PROJECT
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   5. CIVIL CTA
   ========================================================================= */
export function CivilCTA() {
  return (
    <section
      className="relative py-24 lg:py-32 bg-[#09121f] text-white overflow-hidden font-sans bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "linear-gradient(to right, rgba(9, 18, 31, 0.98) 0%, rgba(9, 18, 31, 0.8) 30%, transparent 60%), url('https://res.cloudinary.com/defqgygsf/image/upload/v1790436251/4629_vdb68z.png')",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="max-w-2xl">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
              GET STARTED
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.05] mb-6 uppercase text-white"
          >
            READY TO START <br />
            YOUR PROJECT?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-slate-300 mb-10 max-w-lg font-medium leading-relaxed"
          >
            Let's create accurate, reliable and construction-ready documentation for your next project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button className="bg-white text-slate-950 px-8 py-4 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-all duration-300 flex items-center gap-3">
              START A PROJECT <ArrowRight size={16} strokeWidth={2.5} />
            </button>
            <button className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center gap-3">
              CONTACT OUR TEAM <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Stubs preserved for backwards compatibility
export function TechnicalPrecision() {
  return null;
}

export function Civil3DStory() {
  return null;
}