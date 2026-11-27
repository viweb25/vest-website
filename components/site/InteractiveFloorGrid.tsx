'use client';

import React, { useEffect, useId, useRef } from 'react';

const CELL = { w: 84, h: 48 };
const SPOT = 380;

interface InteractiveFloorGridProps {
  className?: string;
  spotColor?: string;
  gridColor?: string;
  opacity?: number;
}

export default function InteractiveFloorGrid({
  className = '',
  spotColor = '#E7651A',
  gridColor = '#CBD5E1',
  opacity = 0.32,
}: InteractiveFloorGridProps) {
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const basePatternId = `ifg-base-${safeId}`;
  const litPatternId = `ifg-lit-${safeId}`;

  const ref = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const litRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const spot = spotRef.current;
    const lit = litRef.current;
    const section = el?.parentElement;

    if (!el || !spot || !lit || !section) return;

    // Immediately initialize lit dimensions to prevent lag before resize observer fires
    lit.style.width = `${section.offsetWidth || section.clientWidth || 1440}px`;
    lit.style.height = `${section.offsetHeight || section.clientHeight || 900}px`;

    const resize = new ResizeObserver(([entry]) => {
      lit.style.width = `${entry.contentRect.width}px`;
      lit.style.height = `${entry.contentRect.height}px`;
    });
    resize.observe(section);

    let frame = 0;
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = section.getBoundingClientRect();
        const x = e.clientX - box.left - SPOT / 2;
        const y = e.clientY - box.top - SPOT / 2;
        spot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        lit.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
        spot.style.opacity = '1';
      });
    };

    const handlePointerLeave = () => {
      cancelAnimationFrame(frame);
      spot.style.opacity = '0';
    };

    section.addEventListener('pointermove', handlePointerMove);
    section.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Base Floor Grid with layered smooth masks (Subtle & light show) */}
      <div
        className="absolute inset-0"
        style={{
          opacity,
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, #000 35%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, #000 35%, transparent 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)',
          }}
        >
          <svg aria-hidden="true" width="100%" height="100%" className="block size-full">
            <defs>
              <pattern id={basePatternId} width={CELL.w} height={CELL.h} patternUnits="userSpaceOnUse">
                <path
                  d={`M0 ${CELL.h / 2}L${CELL.w / 2} 0L${CELL.w} ${CELL.h / 2}M0 ${CELL.h / 2}L${CELL.w / 2} ${CELL.h}L${CELL.w} ${CELL.h / 2}`}
                  fill="none"
                  stroke={gridColor}
                  strokeWidth={0.85}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${basePatternId})`} />
          </svg>
        </div>
      </div>

      {/* Interactive Cursor Spotlight (Lit Grid + Soft Ambient Hover Light Color) */}
      <div
        ref={spotRef}
        style={{
          width: SPOT,
          height: SPOT,
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          transition: 'opacity 350ms ease',
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      >
        {/* Soft Ambient Light Glow on Hover (Like the Hero section halo) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(231, 101, 26, 0.16) 0%, rgba(231, 101, 26, 0.06) 45%, transparent 72%)',
            filter: 'blur(8px)',
          }}
        />

        {/* Lit Grid lines clipped to the circular spotlight */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'radial-gradient(closest-side, #000 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(closest-side, #000 0%, transparent 100%)',
          }}
        >
          <div
            ref={litRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              willChange: 'transform',
            }}
          >
            <svg aria-hidden="true" width="100%" height="100%" className="block size-full">
              <defs>
                <pattern id={litPatternId} width={CELL.w} height={CELL.h} patternUnits="userSpaceOnUse">
                  <path
                    d={`M0 ${CELL.h / 2}L${CELL.w / 2} 0L${CELL.w} ${CELL.h / 2}M0 ${CELL.h / 2}L${CELL.w / 2} ${CELL.h}L${CELL.w} ${CELL.h / 2}`}
                    fill="none"
                    stroke={spotColor}
                    strokeWidth={1.2}
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${litPatternId})`} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
