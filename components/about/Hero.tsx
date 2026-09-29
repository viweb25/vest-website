"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import { SectionHeader } from '@/components/ui/section-header';

const HeroScene = dynamic(() => import('@/components/about/HeroScene'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#F8FBFF] z-0 animate-pulse"></div>
});

export default function Hero() {
  const headingText = "WE BUILD WHAT'S NEXT.";
  const words = headingText.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 * i },
    }),
  };

  const child: Variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      y: 50,
      opacity: 0,
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
        <HeroScene />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <SectionHeader 
            eyebrow="ABOUT US" 
            title={
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-x-4 gap-y-2"
              >
                {words.map((word, index) => (
                  <div key={index} className="overflow-hidden">
                    <motion.span variants={child} className="inline-block">
                      {word}
                    </motion.span>
                  </div>
                ))}
              </motion.div>
            }
            description="We are a collective of designers, engineers, and strategists crafting digital experiences that transcend the ordinary. Driven by innovation, built for the future."
          />
        </div>
      </div>
    </section>
  );
}
