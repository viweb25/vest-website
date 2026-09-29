"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";

export default function ContactHero() {
  return (
    <section className="relative w-full max-w-[1400px] mx-auto px-5 sm:px-8 pt-10 md:pt-16 overflow-hidden bg-white">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white to-transparent" />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-20 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 left-20 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl relative z-10">
        <SectionHeader 
          eyebrow="GET IN TOUCH"
          title={<>LET'S BUILD<br />SOMETHING GREAT.</>}
          description="Have a project in mind, need technical support, or want to explore a partnership? Let's talk about your requirements and find the right solution for your business."
        />
      </div>
    </section>
  );
}
