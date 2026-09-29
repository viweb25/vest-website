"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { Lightbulb, ShieldCheck, Zap } from 'lucide-react';

const text = "We believe in challenging the status quo. We don't just write code; we architect solutions that scale, perform, and inspire. Our philosophy is rooted in the constant pursuit of excellence, where every pixel and every function serves a precise purpose.";

function ScrollRevealText() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className="py-20 max-w-5xl mx-auto flex flex-wrap justify-center text-center gap-x-3 gap-y-2">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const color = useTransform(
          scrollYProgress,
          [start, end],
          ["#cbd5e1", "#0f172a"]
        );

        return (
          <motion.span
            key={i}
            style={{ color }}
            className="text-3xl md:text-5xl font-sans font-bold tracking-tight"
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

function TiltCard({ title, desc, icon: Icon, delay }: { title: string, desc: string, icon: any, delay: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-8 rounded-3xl bg-white border border-slate-200/50 shadow-xl cursor-crosshair group hover:border-[#2563EB]/30 transition-colors duration-500"
    >
      <div style={{ transform: "translateZ(50px)" }} className="flex flex-col h-full pointer-events-none">
        <div className="w-14 h-14 rounded-2xl bg-[#f0f5ff] flex items-center justify-center text-[#2563EB] mb-6 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-500">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function Philosophy() {
  return (
    <section className="py-24 relative z-10 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            eyebrow="OUR PHILOSOPHY"
            title="Think Different. Build Better."
          />

          <ScrollRevealText />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 perspective-1000">
            <TiltCard 
              title="Innovation First" 
              desc="We constantly explore the bleeding edge of technology to bring you solutions that don't just solve today's problems, but anticipate tomorrow's needs."
              icon={Lightbulb}
              delay={0}
            />
            <TiltCard 
              title="Uncompromising Quality" 
              desc="From pixel-perfect UI to scalable backend architecture, we hold ourselves to the highest standards. Good enough is never enough."
              icon={ShieldCheck}
              delay={0.2}
            />
            <TiltCard 
              title="Real-world Impact" 
              desc="We measure our success by the tangible impact our products have on your business metrics and your users' lives."
              icon={Zap}
              delay={0.4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
