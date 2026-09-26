'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Megaphone, Search, PenTool, Share2, Mail, 
  BarChart, Target, PieChart, TrendingUp, Presentation,
  CheckCircle, Star, ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';

const cap = {
  eyebrow: 'DIGITAL MARKETING',
  title: 'Marketing that drives growth.',
  image: '/marketing.png',
  description: 'Data-driven marketing strategies tailored to elevate your brand presence. We combine creative campaigns with advanced analytics to deliver measurable ROI.',
  icon: Megaphone,
  stats: [
    { value: '500+', label: 'CAMPAIGNS LAUNCHED' },
    { value: '300%', label: 'AVG ROI INCREASE' },
    { value: '50M+', label: 'AUDIENCE REACH' },
    { value: '95%', label: 'CLIENT SUCCESS RATE' },
  ],
  items: [
    { name: 'SEO Optimization', desc: 'Dominate search engine rankings', icon: Search },
    { name: 'Content Marketing', desc: 'Engaging, high-value content', icon: PenTool },
    { name: 'Social Media', desc: 'Strategic brand building', icon: Share2 },
    { name: 'Email Campaigns', desc: 'Targeted lead nurturing', icon: Mail },
    { name: 'Performance Analytics', desc: 'Data-driven insights', icon: BarChart },
    { name: 'PPC Advertising', desc: 'High-conversion paid ads', icon: Target },
    { name: 'Market Research', desc: 'Understand your audience', icon: PieChart },
    { name: 'Growth Hacking', desc: 'Rapid scalable marketing', icon: TrendingUp },
    { name: 'Brand Strategy', desc: 'Positioning and messaging', icon: Presentation },
    { name: 'Digital PR', desc: 'Boost brand authority', icon: Megaphone },
  ]
};

export function DigitalMarketingHero() {
  const currentAccent = 'text-[#f59e0b]';
  const currentHoverAccent = 'hover:text-[#f59e0b]';
  const currentHoverBorder = 'hover:border-[#f59e0b]';

  return (
    <section className="pt-24 pb-12 md:pt-28 md:pb-16 bg-white relative overflow-hidden flex items-center">
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 xl:px-12 flex flex-col pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col lg:flex-row gap-12 flex-1 min-h-0"
        >
          {/* LEFT COLUMN: TITLE & COLLAGE */}
          <div className="lg:w-[45%] flex flex-col">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-4">
              {cap.eyebrow}
            </p>
            <h3 className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-tight leading-[1.1] text-black mb-6">
              {cap.title}
            </h3>
            <p className="text-[17px] leading-relaxed max-w-lg mb-10 animate-shimmer font-medium">
              {cap.description}
            </p>

            {/* Image representing the UI */}
            <div className="relative flex-1 min-h-[250px] hidden md:flex items-center justify-start mt-6 w-full max-w-[550px] lg:-ml-4 xl:-ml-8">
              <img
                src={cap.image}
                alt={`${cap.eyebrow} Showcase`}
                className="w-full h-auto object-contain drop-shadow-2xl mix-blend-multiply dark:mix-blend-normal max-h-[350px]"
                onError={(e) => { 
                  e.currentTarget.style.display = 'none'; 
                }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: SERVICES GRID & TRUSTPILOT */}
          <div className="lg:w-[55%] flex flex-col h-full pt-2">
            {/* STATS BAR */}
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-6 mb-6">
              {cap.stats.map((stat, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col gap-1">
                    <span className="text-2xl md:text-[28px] font-extrabold text-black tracking-tight leading-none">{stat.value}</span>
                    <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-1">{stat.label}</span>
                  </div>
                  {idx < cap.stats.length - 1 && (
                    <div className="hidden md:block w-px h-8 bg-slate-200/80" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 pb-2 flex-1">
              {cap.items.map((item, idx) => {
                const ItemIcon = item.icon;
                const isLastInCol = idx >= cap.items.length - 2;

                return (
                  <div key={idx} className={`flex items-center gap-4 py-4 ${!isLastInCol ? 'border-b border-slate-200/60' : ''}`}>
                    {/* Icon without border */}
                    <div className="flex-shrink-0 w-11 h-11 bg-transparent flex items-center justify-center">
                      <ItemIcon size={21} strokeWidth={1.75} className="text-slate-800" />
                    </div>

                    {/* Text content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-[14px] font-bold text-black mb-0.5 tracking-tight">{item.name}</h4>
                      <p className="text-[11.5px] text-slate-500 leading-tight">{item.desc}</p>
                    </div>

                    {/* Checkmark */}
                    <CheckCircle size={15} strokeWidth={2.5} className={`${currentAccent} opacity-80 flex-shrink-0`} />
                  </div>
                );
              })}
            </div>

            {/* Bottom action area */}
            <div className="mt-auto pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Trustpilot Review */}
              <div className="flex flex-col max-w-[280px]">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">4.9/5 on Trustpilot</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                  "Their work has been phenomenal. We went from a simple concept to a complete digital presence in just a few months."
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
                <p className="text-sm font-bold text-slate-800">Want a solution like this?</p>
                <Link href="/contact" className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-800 ${currentHoverAccent} ${currentHoverBorder} hover:-translate-y-0.5 transition-all text-sm font-bold shadow-sm`}>
                  Start Your Project
                  <ArrowUpRight size={17} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Custom Shine Animation for Description */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #64748b 0%, #cbd5e1 30%, #475569 50%, #cbd5e1 70%, #64748b 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }
      `}} />
    </section>
  );
}
