"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

interface InteractiveDotGridProps {
  density?: number;
  dotRadius?: number;
  interactionRadius?: number;
  repulsionStrength?: number;
  rippleStrength?: number;
  rippleDuration?: number;
  maxDisplacement?: number;
  disabled?: boolean;
}

interface Particle {
  originalX: number;
  originalY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Ripple {
  x: number;
  y: number;
  startTime: number;
}

export function InteractiveDotGrid({
  density = 28, // Default ~28px for desktop as requested
  dotRadius = 0.85,
  interactionRadius = 140,
  repulsionStrength = 0.4,
  rippleStrength = 1.2,
  rippleDuration = 2500, // Increased to 2.5s so wave travels full screen
  maxDisplacement = 40,
  disabled = false,
}: InteractiveDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const animationRef = useRef<number | null>(null);
  const { theme } = useTheme();

  // Initialize particles based on canvas size and density
  const initParticles = useCallback((width: number, height: number) => {
    // Determine screen-based density
    const isMobile = width < 768;
    const currentDensity = isMobile ? Math.max(20, density - 6) : density;

    const cols = Math.floor(width / currentDensity) + 2;
    const rows = Math.floor(height / currentDensity) + 2;
    const particles: Particle[] = [];
    
    const offsetX = (width - (cols - 1) * currentDensity) / 2;
    const offsetY = (height - (rows - 1) * currentDensity) / 2;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * currentDensity + offsetX;
        const y = j * currentDensity + offsetY;
        particles.push({
          originalX: x,
          originalY: y,
          x,
          y,
          vx: 0,
          vy: 0,
        });
      }
    }
    particlesRef.current = particles;
  }, [density]);

  // Main render loop
  const render = useCallback((time: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    // Clear canvas - transparent background so page background color shows through
    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;
    const ripples = ripplesRef.current;
    const mouse = mouseRef.current;

    // Clean up old ripples
    ripplesRef.current = ripples.filter((r) => time - r.startTime < rippleDuration);

    // Determine dot color based on theme. Check window.__themeDotColor first (from GSAP scroll), 
    // fallback to HTML class, then to defaults.
    const isDark = document.documentElement.classList.contains("dark") || theme === "dark";
    // Using the accent color (#14a0ac / #0e7c86) for the dots
    const defaultColor = isDark ? "rgba(20, 160, 172, 0.35)" : "rgba(14, 124, 134, 0.35)";
    const dotColor = window.__themeDotColor || defaultColor;
    
    ctx.fillStyle = dotColor;
    
    // Physics parameters
    const friction = 0.85;
    const springForce = 0.05;

    ctx.beginPath();
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (!disabled) {
        // 1. Mouse repulsion is DISABLED as requested by user
        /* 
        if (mouse.active) {
          // ... 
        }
        */

        // 2. Ripple effects (Click waves)
        for (const ripple of ripplesRef.current) {
          const dx = p.originalX - ripple.x;
          const dy = p.originalY - ripple.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          
          const elapsed = time - ripple.startTime;
          const progress = elapsed / rippleDuration;
          
          // Ripple expands outwards to cover the full screen
          const rippleRadius = progress * Math.max(width, height) * 1.5;
          const waveWidth = 250; // Wider area to allow multiple rings
          
          const distToWave = Math.abs(dist - rippleRadius);
          
          if (distToWave < waveWidth) {
            // Water drop ripple: oscillating sine wave creates concentric rings
            const frequency = 0.06; // Controls how tight the rings are
            const damping = 1 - (distToWave / waveWidth); // Smooth falloff at the edges of the wave band
            const globalFade = Math.max(0, 1 - progress * 0.8); // Fades out over time
            
            // The sine wave oscillates between positive (push out) and negative (pull in)
            const waveForce = Math.sin((dist - rippleRadius) * frequency) * rippleStrength * damping * globalFade;
            
            // Apply radial force to mimic water surface displacement
            p.vx += (dx / dist) * waveForce * 18;
            p.vy += (dy / dist) * waveForce * 18;
          }
        }

        // 3. Spring force to original position
        const dxOrig = p.originalX - p.x;
        const dyOrig = p.originalY - p.y;
        p.vx += dxOrig * springForce;
        p.vy += dyOrig * springForce;

        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        // Clamp to max displacement
        const dispX = p.x - p.originalX;
        const dispY = p.y - p.originalY;
        const dispSq = dispX * dispX + dispY * dispY;
        if (dispSq > maxDisplacement * maxDisplacement) {
          const disp = Math.sqrt(dispSq);
          p.x = p.originalX + (dispX / disp) * maxDisplacement;
          p.y = p.originalY + (dispY / disp) * maxDisplacement;
        }
      } else {
        p.x += (p.originalX - p.x) * 0.1;
        p.y += (p.originalY - p.y) * 0.1;
      }

      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
    }
    
    ctx.fill();
    animationRef.current = requestAnimationFrame(render);
  }, [density, disabled, dotRadius, interactionRadius, maxDisplacement, repulsionStrength, rippleDuration, rippleStrength, theme]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Could set disabled=true here if we wanted to enforce it internally
    }

    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const clientWidth = window.innerWidth;
      const clientHeight = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      
      canvasRef.current.width = clientWidth * dpr;
      canvasRef.current.height = clientHeight * dpr;
      
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      
      initParticles(clientWidth, clientHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    animationRef.current = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, render]);

  // Global mouse/touch event listeners
  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true,
        };
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        startTime: performance.now(),
      });
      // Cap at 5 ripples
      if (ripplesRef.current.length > 5) {
        ripplesRef.current.shift();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        ripplesRef.current.push({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          startTime: performance.now(),
        });
        if (ripplesRef.current.length > 5) {
          ripplesRef.current.shift();
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchend", handleMouseLeave, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchend", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [disabled]);

  return (
    <div 
      className="fixed inset-0 z-[-1] pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
