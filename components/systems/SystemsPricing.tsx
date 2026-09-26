'use client';

import { motion } from 'framer-motion';
import { Activity, Settings, Headset, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const PRICING = [
  {
    id: 'labview',
    icon: Activity,
    title: 'LabVIEW Engineering Support',
    subtitle: 'Per-Day Engineering Support',
    desc: 'Dedicated LabVIEW engineering capacity for development, troubleshooting or extension of your test systems.',
  },
  {
    id: 'plc',
    icon: Settings,
    title: 'PLC Engineering Support',
    subtitle: 'Per-Day Engineering Support',
    desc: 'PLC programming, HMI and commissioning support scoped to your machine or line.',
  },
  {
    id: 'support',
    icon: Headset,
    title: 'Immediate Online Support',
    subtitle: 'On-Demand Technical Support',
    desc: 'Remote help for urgent LabVIEW, PLC, DAQ or software issues.',
  }
];

export default function SystemsPricing() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#0b2027] tracking-tight leading-tight mb-6">
            Engineering support and pricing
          </h2>
          <p className="text-[#44616b] text-lg font-medium leading-relaxed">
            Rates are confirmed against your requirement, so we quote rather than publish fixed prices.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PRICING.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col p-8 lg:p-10 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:border-[#0e7c86]/30 transition-all group h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#f4f4f5] flex items-center justify-center mb-8 group-hover:bg-[#e6f4f5] transition-colors">
                  <Icon size={26} className="text-[#0b2027] group-hover:text-[#0e7c86] transition-colors" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-bold text-[#0b2027] mb-2 leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-xs font-mono text-[#0e7c86] tracking-widest uppercase mb-6">
                  {item.subtitle}
                </p>
                
                <p className="text-[#44616b] leading-relaxed mb-10 flex-grow">
                  {item.desc}
                </p>
                
                <Link
                  href={`/contact?topic=${encodeURIComponent(item.title)}&pricing=1`}
                  className="mt-auto w-full justify-center inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold border border-zinc-300 text-[#0b2027] bg-white/50 backdrop-blur-sm hover:bg-white hover:text-[#0e7c86] hover:border-[#0e7c86] hover:-translate-y-0.5 transition-all group"
                >
                  Request Current Pricing
                  <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
