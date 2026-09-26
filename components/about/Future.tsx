"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';

const FutureScene = dynamic(() => import('@/components/about/FutureScene'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0A0A0A] z-0 animate-pulse"></div>
});

function MagneticButton({ children, href }: { children: React.ReactNode, href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Link 
        href={href}
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0A0A0A] text-white rounded-full font-bold text-lg overflow-hidden transition-colors hover:bg-[#2563EB]"
      >
        <span className="relative z-10">{children}</span>
        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}

export default function Future() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] text-white py-24">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none md:pointer-events-auto">
        <FutureScene />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 
              className="text-5xl md:text-8xl font-sans font-black tracking-tighter uppercase mb-8 leading-none"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
            >
              The Future Is <br/> Yours To Shape.
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Let's combine our expertise with your vision to create something extraordinary. The next big thing starts with a conversation.
            </p>

            <MagneticButton href="/contact">
              Let's Build Together
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
