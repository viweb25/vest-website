"use client";

import React, { useRef } from 'react';
import { motion, useInView, Variants, useMotionValue, useSpring } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';

function AnimatedCounter({ value, label }: { value: number, label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/50 backdrop-blur-md border border-slate-200/50 shadow-sm transition-transform hover:-translate-y-1">
      <div className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-slate-900 mb-2">
        {displayValue}+
      </div>
      <div className="text-sm font-semibold tracking-widest uppercase text-slate-500">
        {label}
      </div>
    </div>
  );
}

export default function WhoWeAre() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 relative z-10 bg-[#FAFAFA]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            eyebrow="WHO WE ARE"
            title="Technology with purpose."
            description="We believe that the best digital products are born from a deep understanding of human needs. Our mission is to bridge the gap between complex engineering and intuitive design, creating platforms that not only work flawlessly but feel completely natural."
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <motion.div variants={itemVariants}>
              <AnimatedCounter value={150} label="Projects Delivered" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <AnimatedCounter value={45} label="Happy Clients" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <AnimatedCounter value={10} label="Years of Experience" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
