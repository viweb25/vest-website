'use client';

import { useEffect, useRef, useState } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
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
          <div className="max-w-2xl w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-cyan-100">
                The smarter way to build test systems
              </span>
            </div>

            <h1 className="display text-[clamp(3.0rem,6.0vw,6.0rem)] font-black tracking-[-0.03em] leading-[1.1] text-white">
              LabVIEW<br />+ AI Vision.
            </h1>

            <div className="w-16 h-[1px] bg-white opacity-20 my-4 sm:my-6" />

            <p className="font-mono text-[clamp(1.25rem,1.0vw,1.25rem)] font-bold leading-relaxed max-w-2xl mb-4 text-balance text-white">
              VI WebSync Technologies is India's NI-certified LabVIEW + AI integration company — exclusively serving Aerospace, Defence, and Automotive industries.
            </p>

            <p className="font-mono text-[clamp(0.85rem,1.2vw,1rem)] font-semibold leading-relaxed max-w-2xl mb-5 text-balance text-white/80">
              We embed modern neural networks — ONNX, OpenVINO, deep learning — directly into NI LabVIEW VIs running on PXI and cRIO hardware. No cloud. No compromise. Deterministic, production-grade AI at hardware cycle rates.
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