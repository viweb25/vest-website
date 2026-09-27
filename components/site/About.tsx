'use client';

import { useEffect, useRef, useState } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";
import { ArrowUpRight, Play, Layers, Cpu, CircuitBoard, Activity, Sparkles } from "lucide-react";
import React from "react";
import AboutRobotSurroundingText from "@/components/animations/AboutRobotSurroundingText";

export default function AboutAlpha() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [spotlightArmed, setSpotlightArmed] = useState(false);
  const [loadScene, setLoadScene] = useState(false);

  useEffect(() => {
    // 1. Warm up the 3D runtime eagerly in the background on first scroll or touch
    const startWarmUp = () => {
      setLoadScene(true);
      cleanupListeners();
    };

    const cleanupListeners = () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", startWarmUp);
        window.removeEventListener("pointerdown", startWarmUp);
        window.removeEventListener("touchstart", startWarmUp);
      }
    };

    if (typeof window !== "undefined") {
      if (window.scrollY > 10) {
        setLoadScene(true);
      } else {
        window.addEventListener("scroll", startWarmUp, { passive: true });
        window.addEventListener("pointerdown", startWarmUp, { passive: true });
        window.addEventListener("touchstart", startWarmUp, { passive: true });
      }
    }

    // 2. IntersectionObserver for Spotlight + fallback scene loading
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setSpotlightArmed(true);
            setLoadScene(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5] }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cleanupListeners();
    };
  }, []);

  return (
    <Card ref={sectionRef} className="w-full h-screen min-h-screen rounded-none border-0 bg-[#050a15] relative overflow-hidden">
      {spotlightArmed && (
        <Spotlight
          key="spotlight-armed"
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
      )}

      <div className="flex flex-col md:flex-row h-full">
        <div className="flex-1 relative z-10 flex flex-col justify-start pt-24 md:pt-30 pb-16 items-center md:items-end px-6 md:pr-12 md:pl-0 pointer-events-none">
          <div className="flex-1 lg:max-w-xl">
            <SectionHeader
              dark
              smallTitle
              eyebrow="Why Choose VEST Solutions?"
              title={<>Built for complex<br />engineering challenges.</>}
              description="Designed for global project delivery, we provide scalable technology solutions and remote engineering support from concept to deployment."
            />

            <div className="grid grid-cols-2 gap-6 my-8">
              <div className="flex flex-col gap-1">
                <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">5</span>
                <span className="text-[11px] uppercase tracking-wider text-white/60 font-mono">Markets Served Globally</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">4</span>
                <span className="text-[11px] uppercase tracking-wider text-white/60 font-mono">Core Capability Areas</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">4</span>
                <span className="text-[11px] uppercase tracking-wider text-white/60 font-mono">Proprietary Products</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">7</span>
                <span className="text-[11px] uppercase tracking-wider text-white/60 font-mono">Stages from Req to Support</span>
              </div>
            </div>

            <p className="font-mono text-[clamp(0.75rem,1vw,0.9rem)] font-medium leading-relaxed max-w-2xl mb-8 text-white/70">
              Customer-Focused Engineering with defined requirements, transparent progress, and a maintainable handover. We provide international project delivery across India, North America, and Europe.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6 pointer-events-auto">
              <Link href="/contact" className="rounded-full bg-white px-6 py-3 font-mono text-[clamp(0.75rem,1vw,0.9rem)] font-bold uppercase tracking-[0.15em] text-black shadow-lg shadow-black/5 hover:scale-[1.02] transition-all duration-300 flex items-center gap-3 group">
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-5 h-5 text-black transform translate-y-0 translate-x-0 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link href="#overview" className="font-mono text-[clamp(0.75rem,1vw,0.9rem)] font-bold uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors flex items-center gap-2">
                Watch Overview
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 relative pointer-events-auto h-[50vh] md:h-full">
          {/* <AboutRobotSurroundingText /> */}
          {loadScene && (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </Card>
  );
}