"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "We dive deep into your brand, audience, and goals to build a strategic foundation that informs every decision."
  },
  {
    num: "02",
    title: "Design",
    desc: "Our design team crafts intuitive, aesthetic wireframes and prototypes, bringing your vision to visual life."
  },
  {
    num: "03",
    title: "Develop",
    desc: "Using cutting-edge frameworks, we build robust, scalable architectures with pixel-perfect precision."
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Rigorous testing and seamless deployment ensure your product launches flawlessly and performs at scale."
  }
];

export default function Process() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="py-24 relative z-10 bg-white" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            eyebrow="OUR PROCESS"
            title="From Vision to Reality."
            description="Our proven methodology ensures that every project is delivered on time, on budget, and beyond expectations. We believe in transparency and collaboration at every stage."
          />

          <div className="mt-20 relative">
            {/* SVG Progress Line Background */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2 rounded-full overflow-hidden hidden md:block" />
            
            {/* SVG Progress Line Animated */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block">
              <motion.div 
                className="w-full bg-gradient-to-b from-[#2563EB] to-[#7C3AED] origin-top"
                style={{ scaleY: pathLength }}
              />
            </div>

            <div className="flex flex-col gap-16 md:gap-24 relative z-10">
              {steps.map((step, i) => {
                const isEven = i % 2 === 0;
                
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Empty half for desktop layout */}
                    <div className="hidden md:block flex-1" />

                    {/* Number Badge */}
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xl font-bold text-slate-400 z-10 relative">
                        {step.num}
                      </div>
                      {/* Inner glow on active could be added here */}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{step.title}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed text-lg max-w-md">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
