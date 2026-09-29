'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Layers, Wrench, FileText, Check, ArrowRight, MoveRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/section-header';

const DISCIPLINES = [
  {
    num: '01',
    icon: Building2,
    title: 'Civil Engineering',
    desc: 'Drawings and documentation that carry a project from layout to construction.',
    image: '/img-1.png',
    services: [
      'Civil Engineering Drawings', 'Construction Documentation', 'Layout Drawings',
      'Engineering Documentation', 'Quantity Take-Off', 'BOQ / BOM Support', 'Technical Documentation',
    ],
    href: '/services/civil-engineering',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Structural Engineering',
    desc: 'Structural steel detailing and drawings prepared for fabrication and erection.',
    image: '/img-2.png',
    services: [
      'Structural Steel Detailing', 'Structural Drawings', 'Steel Fabrication Drawings',
      'Erection Drawings', 'Connection Detailing', 'Member Detailing', 'Structural Documentation', 'Shop Drawings',
    ],
    href: '/services/structural-engineering',
  },
  {
    num: '03',
    icon: Wrench,
    title: 'Miscellaneous Steel Detailing',
    desc: 'Detailing for the many secondary steel items every industrial and building project needs.',
    image: '/img-3.png',
    services: [
      'Platforms', 'Staircases', 'Handrails', 'Ladders',
      'Equipment Supports', 'Pipe Supports', 'Walkways', 'Miscellaneous Structures', 'Industrial Steel Components',
    ],
    href: '/services/miscellaneous-steel-detailing',
  },
  {
    num: '04',
    icon: FileText,
    title: 'BOM & Material Documentation',
    desc: 'Material information organised so procurement and fabrication can move without rework.',
    image: '/img-4.png',
    services: [
      'Bill of Materials', 'Material Take-Off', 'Quantity Take-Off',
      'Fabrication Lists', 'Material Schedules', 'Component Lists', 'Procurement Support Documentation',
    ],
    href: '/services/bom-material-documentation',
  },
];

function DisciplineCard({ item, index }: { item: typeof DISCIPLINES[0]; index: number }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="bg-white rounded-2xl border border-slate-100 p-6 xl:p-8 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full transition-shadow hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] group"
    >
      {/* Top Image area */}
      <div className="relative h-48 mb-10 w-full">
        {/* Giant Number */}
        <div className="absolute -top-4 -left-2 text-[64px] font-black text-slate-100 leading-none z-0">
          {item.num}
        </div>

        {/* Image */}
        {item.image && (
          <img src={item.image} alt={item.title} className="w-[120%] h-[120%] -ml-[10%] object-contain mix-blend-multiply opacity-90 absolute top-0 pointer-events-none" />
        )}

        {/* Icon Badge overlapping bottom left */}
        <div className="absolute -bottom-4 left-0 w-12 h-12 bg-[#04526d] text-white rounded-xl flex items-center justify-center shadow-md">
          <Icon size={22} strokeWidth={2} />
        </div>
      </div>

      <h3 className="text-[19px] font-bold text-[#0b2027] mb-3 leading-snug tracking-tight">
        {item.title}
      </h3>

      <p className="text-[#64748b] text-[13.5px] leading-relaxed mb-6 font-medium">
        {item.desc}
      </p>

      <ul className="space-y-2.5 mb-8 flex-grow">
        {item.services.map(s => (
          <li key={s} className="flex items-start gap-2.5 text-[13px] text-[#475569] font-medium leading-snug">
            <div className="mt-0.5 rounded-full bg-[#0a5270] text-white p-[3px] shrink-0">
              <Check size={10} strokeWidth={3.5} />
            </div>
            <span>{s}</span>
          </li>
        ))}
      </ul>

      <Link href={item.href || '#'} className="mt-auto flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0a5270] transition-colors group-hover:text-[#0b2027] cursor-pointer">
        Learn More <ArrowUpRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  );
}

export default function EngineeringDisciplines() {
  return (
    <section id="disciplines" className="py-24 md:py-32 bg-[#fafcfc] relative overflow-hidden">
      <div className="relative z-10 max-w-[2000px] mx-auto px-6 sm:px-10">
        <SectionHeader
          eyebrow="Engineering Disciplines"
          className="text-center items-center flex flex-col mb-16"
          title={
            <>Engineering<br />Disciplines</>
          }
          description="Integrated engineering deliverables designed to support every stage of your project."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-4">
          {DISCIPLINES.map((item, i) => (
            <DisciplineCard key={item.num} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
