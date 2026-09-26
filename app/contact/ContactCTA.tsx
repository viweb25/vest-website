"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="w-full bg-white text-[#0B2540] py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"
        />
      </div>

      <motion.div 
        className="max-w-[1400px] mx-auto px-5 sm:px-8 relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 bg-[#E8F3FA] border-[#b8dfd8]">
          <Sparkles className="w-3.5 h-3.5 text-[#1D79C5]" strokeWidth={2.5} />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase text-[#1D79C5]">
            HAVE AN IDEA?
          </span>
        </div>

        <h2 
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-8 text-[#0B2540]"
          style={{ WebkitTextStroke: "1px currentColor" }}
        >
          Let's Turn It <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500" style={{ WebkitTextStroke: "0" }}>
            Into Reality.
          </span>
        </h2>

        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed mb-12">
          From engineering and technology solutions to digital products and long-term support, let's create something meaningful together.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full sm:w-auto group relative overflow-hidden rounded-full px-8 py-4 bg-[#F2670E] text-white font-black shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center justify-center gap-2">
              START A PROJECT <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <Link 
            href="/services" 
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#0B2540] font-bold hover:bg-zinc-50 transition-colors border border-zinc-200 shadow-sm text-center"
          >
            EXPLORE OUR CAPABILITIES
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
