"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { LayoutTemplate, Bot, Cog, Palette, Megaphone, Smartphone } from 'lucide-react';

const expertiseData = [
  {
    title: "Web Development",
    description: "Building scalable, high-performance web applications using modern frameworks and robust backend architectures.",
    icon: LayoutTemplate,
    colSpan: "md:col-span-2",
  },
  {
    title: "AI Integration",
    description: "Empowering products with machine learning, NLP, and computer vision capabilities to automate and predict.",
    icon: Bot,
    colSpan: "md:col-span-1",
  },
  {
    title: "Automation",
    description: "Streamlining complex business workflows with custom scripting and integration pipelines.",
    icon: Cog,
    colSpan: "md:col-span-1",
  },
  {
    title: "UI/UX Design",
    description: "Crafting intuitive, accessible, and stunning user interfaces that elevate brand identity and user retention.",
    icon: Palette,
    colSpan: "md:col-span-2",
  },
  {
    title: "Digital Marketing",
    description: "Data-driven strategies and campaigns that maximize reach, engagement, and conversion rates.",
    icon: Megaphone,
    colSpan: "md:col-span-1",
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile experiences that bring your services directly to the user's pocket.",
    icon: Smartphone,
    colSpan: "md:col-span-2",
  },
];

export default function Expertise() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-24 relative z-10 bg-[#FAFAFA]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            eyebrow="OUR EXPERTISE"
            title="Ideas Into Intelligent Solutions."
            description="We leverage a diverse stack of modern technologies to build comprehensive solutions. Whether it's a sleek marketing site or a complex enterprise AI platform, we have the specialized skills to deliver."
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {expertiseData.map((item, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className={`group relative p-[1px] rounded-3xl overflow-hidden ${item.colSpan}`}
              >
                {/* Gradient Border Glow (hidden by default, revealed on hover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card Content Background */}
                <div className="relative h-full bg-white rounded-[23px] p-8 flex flex-col items-start transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 mb-6 group-hover:text-[#2563EB] group-hover:scale-110 transition-all duration-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#2563EB] transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
