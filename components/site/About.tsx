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
    <Card ref={sectionRef} className="w-full min-h-screen rounded-none border-0 bg-[#050a15] relative overflow-hidden flex flex-col">
      {spotlightArmed && (
        <Spotlight
          key="spotlight-armed"
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
      )}

      <div className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-[55%] lg:w-7/12 relative z-10 flex flex-col justify-start pt-20 md:pt-20 lg:pt-1 pb-12 items-center md:items-start px-6 md:pl-12 lg:pl-16 xl:pl-24 md:pr-8 pointer-events-none">
          <div className="w-full max-w-2xl 2xl:max-w-3xl">
            <SectionHeader
              dark
              smallTitle
              className="mb-6"
              titleClassName="!text-[clamp(1.5rem,2.5vw,2.5rem)] !mb-5"
              eyebrow="WHY CHOOSE VEST SOLUTIONS?"
              title={<>ENGINEERING INTELLIGENT FUTURES<br />TECHNOLOGY.</>}
              description="VEST Solutions delivers advanced engineering, industrial automation, software, AI, cloud, and digital solutions designed to improve productivity, reliability, quality, and operational efficiency."
            />

            <div className="grid grid-cols-2 gap-x-6 gap-y-6 my-6">
              <div className="flex flex-col gap-1">
                <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">5</span>
                <span className="text-[11px] uppercase tracking-wider text-white/80 font-mono mt-1">Markets Served</span>
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono">INDIA, USA, CANADA, MEXICO, EUROPE</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">4</span>
                <span className="text-[11px] uppercase tracking-wider text-white/80 font-mono mt-1">Core Capability Areas</span>
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono">ENGINEERING, AUTOMATION, AI, DIGITAL</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">4+</span>
                <span className="text-[11px] uppercase tracking-wider text-white/80 font-mono mt-1">Projects Delivered</span>
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono">ACROSS INDUSTRIES</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">8+</span>
                <span className="text-[11px] uppercase tracking-wider text-white/80 font-mono mt-1">Years of Engineering Excellence</span>
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono">DRIVING INNOVATION</span>
              </div>
            </div>

            <p className="font-mono text-[clamp(0.75rem,1vw,0.9rem)] font-medium leading-relaxed max-w-2xl mb-6 text-white/70">
              From concept to commissioning, we deliver end-to-end solutions with domain expertise, cutting-edge technology, and a customer-first approach for industries worldwide.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6 pointer-events-auto">
              <Link href="/contact" className="rounded-full bg-white px-6 py-3 font-mono text-[clamp(0.75rem,1vw,0.9rem)] font-bold uppercase tracking-[0.15em] text-black shadow-lg shadow-black/5 hover:scale-[1.02] transition-all duration-300 flex items-center gap-3 group">
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-5 h-5 text-black transform translate-y-0 translate-x-0 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link href="#overview" className="font-mono text-[clamp(0.75rem,1vw,0.9rem)] font-bold uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors flex items-center gap-4">
                Watch Overview
                <Play className="w-4 h-4 fill-current" />
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="w-full md:w-[45%] lg:w-5/12 relative pointer-events-auto h-[50vh] md:h-auto md:min-h-full">
          
          {loadScene && (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          )}
        </div> */}
      </div>
    </Card>
  );
}