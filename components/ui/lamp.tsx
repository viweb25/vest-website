"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full rounded-md z-0",
        className,
      )}
    >
      {/* Background image - full cover */}
      <div
        style={{
          backgroundImage: "url('/img3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="absolute inset-0 w-full h-full z-0"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-50 flex w-full flex-1 flex-col justify-center items-start px-6 md:px-10 lg:px-16 xl:px-20">
        {children}
      </div>
    </div>
  );
};



export function LampDemo() {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col items-start text-left w-full max-w-2xl z-50"
      >
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </div>
            <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
              WHY VI WEBSYNC
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.05] mb-6 w-full">
            Building a <br />
            <span className="xl:whitespace-nowrap">Smarter Tomorrow.</span>
          </h2>

          <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-10 max-w-xl font-medium">
            We are more than a service provider — we are your technology partner in the journey towards a smarter, more automated and intelligent future.
          </p>

          <button className="group relative flex items-center gap-4 bg-transparent border border-slate-700/80 rounded-full pr-8 p-1.5 transition-all hover:border-slate-500 hover:bg-slate-800/30">
            <div className="relative flex items-center justify-center w-11 h-11 bg-slate-100 rounded-full text-black transition-transform group-hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="relative text-white font-semibold text-sm tracking-wide">
              Watch Video
            </span>
          </button>
        </div>
      </motion.div>
    </LampContainer>
  );
}
