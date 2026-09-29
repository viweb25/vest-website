"use client";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function EarthGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 6,
      baseColor: [1, 1, 1], // White globe
      markerColor: [0, 0, 0], // Black markers if any
      glowColor: [1, 1, 1], // White glow
      markers: [],
    });

    let animationId: number;
    const render = () => {
      globe.update({ phi });
      phi += 0.008;
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationId);
      globe.destroy();
    };
  }, []);

  return (
    <div className={cn("w-full max-w-[600px] aspect-square mx-auto", className)}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 1,
        }}
      />
    </div>
  );
}
