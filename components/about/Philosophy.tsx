"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import Image from 'next/image';

const text = "We believe in challenging the status quo. We don't just write code; we architect solutions that scale, perform, and inspire. Our philosophy is rooted in the constant pursuit of excellence, where every pixel and every function serves a precise purpose.";

function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className="py-12 sm:py-16 max-w-5xl mx-auto flex flex-wrap justify-center text-center gap-x-3 gap-y-2">
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
            className="text-2xl sm:text-3xl md:text-5xl font-sans font-bold tracking-tight"
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

function ManufacturingVideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto mt-6 sm:mt-10 group">
      {/* Ambient background glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#E7651A]/20 via-[#FF4D15]/15 to-transparent blur-3xl opacity-70 rounded-3xl pointer-events-none" />

      {/* Main Video Viewport */}
      <div
        onClick={togglePlay}
        className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.15)] cursor-pointer select-none group"
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src="/Video Project 1.mp4"
          poster="/images/about/manufacturing-video-poster.jpg"
          loop
          muted={isMuted}
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />

        {/* Video Poster Overlay when not playing */}
        {!isPlaying && (
          <div className="absolute inset-0 z-10">
            <Image
              src="/images/about/manufacturing-video-poster.jpg"
              alt="Autonomous Industrial Manufacturing & Inspection Line"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle dark film */}
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-300" />
          </div>
        )}

        {/* Central Play / Pause Button */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl pointer-events-auto ${isPlaying
                ? 'opacity-0 group-hover:opacity-100 bg-slate-950/60 backdrop-blur-md text-white'
                : 'opacity-100 bg-slate-950/75 hover:bg-[#FF4D15] backdrop-blur-md text-white scale-100 group-hover:scale-110 border border-white/20'
              }`}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 sm:w-8 sm:h-8 fill-white" />
            ) : (
              <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
            )}
          </div>
        </div>

        {/* Technical Corner Watermark HUD (Top-Right) */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <div className="px-2.5 py-1 rounded bg-slate-950/60 backdrop-blur-md border border-white/10 text-white/80 font-mono text-[10px] tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D15] animate-pulse" />
            <span>VEST METROLOGY RIG</span>
          </div>
        </div>

        {/* Bottom Control Bar on Hover */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-center justify-between text-white transition-opacity duration-300 opacity-90 group-hover:opacity-100">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#FF4D15]">
              Real-World Factory Execution
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white drop-shadow">
              Sub-Micron SMT &amp; Automated PCB Vision Inspection
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center transition-colors border border-white/10"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleFullscreen}
              aria-label="Fullscreen video"
              className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Philosophy() {
  return (
    <section className="py-20 sm:py-24 relative z-10 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">


          <ScrollRevealText />

          {/* Replaced 3 TiltCards with the Manufacturing Video Showcase */}
          <ManufacturingVideoShowcase />

        </div>
      </div>
    </section>
  );
}
