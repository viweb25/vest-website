'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CivilHero() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 bg-[#f8fbff] flex items-center overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 flex flex-col lg:flex-row items-center gap-12 relative z-10">

        {/* Left Content */}
        <div className="flex-1 w-full lg:w-[45%] relative z-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-6"
          >
            <span className="text-gray">CIVIL ENGINEERING</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[5.5rem] lg:text-[7rem] font-extrabold text-black leading-[0.85] tracking-tight mb-8"
          >
            CIVIL <br />
            <span>ENGINEERING</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-md font-medium leading-relaxed"
          >
            Drawings and documentation that carry a project from layout to construction. We deliver precise architectural layouts, structural schematics, and rigorous site documentation tailored for complex modern infrastructures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <button className="bg-[#0f172a] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.15em] hover:bg-black transition-colors flex items-center gap-3 shadow-lg shadow-black/5">
              START A PROJECT <ArrowRight size={14} />
            </button>
            <button className="bg-transparent border border-slate-300/80 text-[#0f172a] px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.15em] hover:bg-slate-50 transition-colors flex items-center gap-3">
              EXPLORE SERVICES <ArrowRight size={14} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-8 md:gap-12 border-t border-slate-200/60 pt-8"
          >
            <div>
              <p className="text-3xl font-extrabold text-[#0f172a]">150+</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">Drawings Delivered</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <p className="text-3xl font-extrabold text-[#0f172a]">30+</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">Projects Supported</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <p className="text-3xl font-extrabold text-[#0f172a]">100%</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">Documentation Accuracy</p>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-1 w-full lg:w-[55%] relative h-[400px] sm:h-[500px] lg:h-[700px] -mx-6 sm:-mx-10 lg:mx-0 lg:-mr-[10vw] xl:-mr-[20vw] z-0 lg:-mt-16 lg:-ml-16 xl:-ml-24"
        >
          {/* Fade edge */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8fbff] to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f8fbff] to-transparent z-10" />

          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            src="https://res.cloudinary.com/defqgygsf/image/upload/v1790438192/469_ds0khy.png"
            alt="Civil Engineering Documentation"
            className="w-full lg:w-[115%] h-full object-cover lg:object-contain object-left-top mix-blend-darken"
          />
        </motion.div>
      </div>
    </section>
  );
}
