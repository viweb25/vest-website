'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Civil3DStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale and opacity transformations for sequential building
  // Phase 1: Foundation (0.1 - 0.3)
  const foundationOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);
  const foundationY = useTransform(scrollYProgress, [0.1, 0.2], [50, 0]);
  
  // Phase 2: Columns (0.25 - 0.4)
  const columnsOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.8, 0.9], [0, 1, 1, 0]);
  const columnsY = useTransform(scrollYProgress, [0.25, 0.35], [50, 0]);

  // Phase 3: Beams & Layout (0.4 - 0.6)
  const layoutOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.8, 0.9], [0, 1, 1, 0]);
  const layoutY = useTransform(scrollYProgress, [0.4, 0.5], [50, 0]);

  // Phase 4: Full Documentation Overlay (0.55 - 0.7)
  const docOpacity = useTransform(scrollYProgress, [0.55, 0.65, 0.8, 0.9], [0, 1, 1, 0]);

  const scale = useTransform(scrollYProgress, [0.1, 0.8], [0.8, 1.1]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[var(--surface)] dark:bg-[#050a0c]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle, var(--ink) 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />
        
        <div className="relative z-10 text-center mb-16 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-[#0e7c86] uppercase mb-4"
          >
            Engineering Documentation Connects Design With Execution
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--ink)]"
          >
            EVERY LINE <br className="md:hidden" /> HAS A PURPOSE.
          </motion.h2>
        </div>

        {/* 3D Story Container (Simulated with SVG/CSS for precision and performance without over-stressing WebGL context) */}
        <motion.div 
          style={{ scale }}
          className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] perspective-[1000px]"
        >
          <div className="w-full h-full transform-style-3d rotate-x-[60deg] rotate-z-[-45deg] relative transition-transform duration-1000">
            
            {/* Foundation */}
            <motion.div 
              style={{ opacity: foundationOpacity, y: foundationY }}
              className="absolute inset-x-10 inset-y-10 border-2 border-[#0e7c86] bg-[#0e7c86]/10 shadow-[0_0_30px_rgba(14,124,134,0.2)] flex items-center justify-center"
            >
              <div className="text-[10px] font-mono text-[#0e7c86] font-bold tracking-widest transform rotate-x-[-90deg]">FOUNDATION</div>
            </motion.div>
            
            {/* Columns */}
            <motion.div 
              style={{ opacity: columnsOpacity, y: columnsY, translateZ: '100px' }}
              className="absolute inset-0 pointer-events-none"
            >
              {[
                { top: 40, left: 40 },
                { top: 40, right: 40 },
                { bottom: 40, left: 40 },
                { bottom: 40, right: 40 }
              ].map((pos, i) => (
                <div key={i} className="absolute w-2 h-[100px] border border-[#1e56a0] bg-[#1e56a0]/20 transform rotate-x-[90deg] origin-bottom" style={{ ...pos }} />
              ))}
            </motion.div>

            {/* Layout / Mid-floor */}
            <motion.div 
              style={{ opacity: layoutOpacity, y: layoutY, translateZ: '100px' }}
              className="absolute inset-x-10 inset-y-10 border-2 border-[#1e56a0] bg-[#1e56a0]/10 flex flex-col justify-between p-4"
            >
              {/* Grid Lines */}
              <div className="absolute inset-0 border border-white/20 grid grid-cols-3 grid-rows-3">
                {Array.from({ length: 9 }).map((_, i) => <div key={i} className="border border-white/10" />)}
              </div>
              <div className="text-[10px] font-mono text-[#1e56a0] font-bold tracking-widest self-start transform rotate-x-[-90deg]">STRUCTURE</div>
            </motion.div>
            
            {/* Documentation Annotations */}
            <motion.div 
              style={{ opacity: docOpacity, translateZ: '150px' }}
              className="absolute -inset-10 pointer-events-none"
            >
              {/* Dimension line */}
              <div className="absolute top-0 right-0 bottom-0 w-8 border-l border-r border-[#ea580c] flex items-center justify-center">
                <span className="text-[10px] font-mono text-[#ea580c] transform rotate-90 whitespace-nowrap bg-[var(--surface)] px-2">ELEV. +12.4m</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-b border-[#ea580c] flex items-center justify-center">
                <span className="text-[10px] font-mono text-[#ea580c] whitespace-nowrap bg-[var(--surface)] px-2">SPAN: 24.0m</span>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
