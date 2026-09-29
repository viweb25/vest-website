'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Settings, Monitor, Cpu, Link2,
  Database, Network, LineChart, Wrench, Layers,
  GitMerge, Bell, Share2, RefreshCw, Activity, Check
} from 'lucide-react';

const ECOSYSTEMS = [
  { name: 'SIEMENS', border: 'border-slate-200', img: '/1.png' },
  { name: 'Mitsubishi', border: 'border-slate-200', img: '/3.webp' },
  { name: 'Allen-Bradley', border: 'border-slate-200', img: '/2.png', text: 'Allen-Bradley / Rockwell Automation' },
  { name: 'Schneider Electric', border: 'border-slate-200', img: '/5.png' },
  { name: 'OMRON', border: 'border-slate-200', img: '/4.png' }
];

const GROUPS = [
  {
    title: 'Machine Control',
    items: [
      { name: 'PLC Programming', icon: Settings },
      { name: 'Sequence Programming', icon: GitMerge },
      { name: 'Interlocking', icon: Link2 },
      { name: 'Machine Automation', icon: Cpu },
    ],
  },
  {
    title: 'Operator Interface',
    items: [
      { name: 'HMI Development', icon: Monitor },
      { name: 'SCADA Integration', icon: Layers },
      { name: 'Alarm Management', icon: Bell },
    ],
  },
  {
    title: 'Connectivity & Data',
    items: [
      { name: 'PLC-to-PC Communication', icon: Network },
      { name: 'PLC-to-LabVIEW Integration', icon: RefreshCw },
      { name: 'Industrial Networking', icon: Share2 },
      { name: 'Data Logging', icon: Database },
    ],
  },
  {
    title: 'Monitoring & Support',
    items: [
      { name: 'Production Monitoring', icon: LineChart },
      { name: 'Machine Diagnostics', icon: Activity },
      { name: 'PLC Troubleshooting', icon: Wrench },
    ],
  },
];

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function PlcSection() {
  return (
    <section className="bg-white font-sans relative overflow-hidden flex flex-col">
      <div className="flex flex-col lg:flex-row items-stretch flex-1 w-full">
        {/* Left Content */}
        <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col justify-center px-6 sm:px-10 pt-10 lg:pt-16 pb-4 lg:pb-6 relative z-10 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))]">

        {/* ───────── HEADER ───────── */}
        <div className="max-w-3xl">
          <motion.p
            {...fade}
            className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] mb-8"
          >
            Industrial Automation
          </motion.p>

          <motion.h2
            {...fade}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-black leading-[1.05] tracking-tight mb-8"
          >
            PLC programming &amp; <br className="hidden lg:block" />
            industrial automation
          </motion.h2>

          <motion.p
            {...fade}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg lg:text-xl leading-relaxed max-w-xl font-medium mb-12"
          >
            Reliable machine control, clear operator interfaces and dependable links between the plant floor and your data systems.
          </motion.p>

          <motion.div
            {...fade}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <button className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold border border-zinc-300 text-[#0b2027] bg-white/50 backdrop-blur-sm hover:bg-white hover:text-[#0e7c86] hover:border-[#0e7c86] hover:-translate-y-0.5 transition-all group">
              Talk to an Expert
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold border border-zinc-300 text-[#0b2027] bg-white/50 backdrop-blur-sm hover:bg-white hover:text-[#0e7c86] hover:border-[#0e7c86] hover:-translate-y-0.5 transition-all group">
              Explore Our Systems
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </div>

        </div>

        {/* Right Content (Capabilities) */}
        <div className="w-full lg:w-[50%] xl:w-[55%] flex flex-col justify-center px-6 sm:px-10 pt-12 lg:pt-16 pb-12 lg:pb-32 lg:pl-16 xl:pl-32 relative z-10 lg:pr-[max(2rem,calc((100vw-1400px)/2+2rem))]">
          <motion.div 
            {...fade}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 lg:mt-16 xl:mt-24"
          >
            {GROUPS.flatMap(g => g.items).map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-[#168a9f] flex-shrink-0" strokeWidth={2.5} />
                <span className="text-[15px] lg:text-[16px] text-[#1e293b] font-medium">{item.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ───────── ECOSYSTEMS (Full Page Row) ───────── */}
      <div className="w-full px-6 sm:px-10 pt-2 pb-12 relative z-20 lg:px-[max(2rem,calc((100vw-1400px)/2+2rem))] bg-white">
        <motion.div
          {...fade}
          className="w-full"
        >
          <h3 className="text-base font-bold text-slate-800 mb-6">
            Automation ecosystems we work with
          </h3>

          <div className="flex flex-wrap items-center gap-4">
            {ECOSYSTEMS.map((eco, i) => (
              <div key={eco.name} className={`px-4 py-2 bg-white border ${eco.border} rounded-full flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow duration-300`}>
                <img src={eco.img} alt={eco.name} className="h-7 sm:h-8 object-contain" />
                {(i === 1 || i === 2) && (
                  <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 whitespace-nowrap">{eco.text || eco.name}</span>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-[10px] text-slate-400 leading-relaxed font-medium max-w-2xl">
            Platform names indicate the ecosystems our engineers work with. They do not imply certification, endorsement or partnership.
          </p>
        </motion.div>
      </div>
    </section>
  );
}