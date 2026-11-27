'use client';

import React, { useId } from 'react';
import { motion } from 'framer-motion';

interface UniqueLaurelBranchProps {
  side?: 'left' | 'right';
  className?: string;
  height?: number | string;
}

const points = [
  { cx: 24, cy: 210, a: -15, s: 0.85 },
  { cx: 26, cy: 175, a: -5, s: 0.95 },
  { cx: 32, cy: 140, a: 8, s: 1.05 },
  { cx: 42, cy: 105, a: 22, s: 1.10 },
  { cx: 56, cy: 75, a: 38, s: 1.05 },
  { cx: 74, cy: 48, a: 55, s: 0.95 },
  { cx: 92, cy: 28, a: 70, s: 0.85 },
];

export default function UniqueLaurelBranch({
  side = 'left',
  className = '',
  height = 190,
}: UniqueLaurelBranchProps) {
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const isRight = side === 'right';

  return (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`select-none pointer-events-none inline-flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height={height}
        viewBox="0 0 140 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-auto max-h-full drop-shadow-[0_4px_16px_rgba(231,101,26,0.12)]"
      >
        <defs>
          <linearGradient id={`laurelStem-${safeId}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B2340" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#536578" stopOpacity="0.6" />
            <stop offset="90%" stopColor="#E7651A" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={`leafFacetA-${safeId}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0B2340" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#536578" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E7651A" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id={`leafFacetB-${safeId}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#536578" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#94A3B8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.75" />
          </linearGradient>
          <filter id={`laurelGlow-${safeId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Group: Flipped symmetrically for right side */}
        <g transform={isRight ? 'translate(140, 0) scale(-1, 1)' : undefined}>
          {/* Graceful Curving Spine */}
          <path
            d="M 23 235 C 24 180, 32 115, 60 65 C 72 44, 88 28, 106 14"
            stroke={`url(#laurelStem-${safeId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Leaf Pairs */}
          {points.map((pt, idx) => (
            <g key={idx} transform={`translate(${pt.cx}, ${pt.cy}) rotate(${-pt.a})`}>
              {/* Left Leaf */}
              <g transform={`rotate(-48) scale(${pt.s})`}>
                <path d="M 0 0 C -4 -12, -12 -22, -2 -34 C 12 -26, 8 -12, 0 0 Z" fill={`url(#leafFacetA-${safeId})`} />
                <path d="M 0 0 C 4 -12, 10 -22, -2 -34 C 0 -24, -2 -12, 0 0 Z" fill={`url(#leafFacetB-${safeId})`} />
                <path d="M 0 0 L -2 -34" stroke="#CBD5E1" strokeWidth="0.75" strokeLinecap="round" opacity="0.6" />
              </g>
              {/* Right Leaf */}
              <g transform={`rotate(48) scale(${pt.s})`}>
                <path d="M 0 0 C -4 -12, -10 -22, 2 -34 C 0 -24, 2 -12, 0 0 Z" fill={`url(#leafFacetB-${safeId})`} />
                <path d="M 0 0 C 4 -12, 12 -22, 2 -34 C -12 -26, -8 -12, 0 0 Z" fill={`url(#leafFacetA-${safeId})`} />
                <path d="M 0 0 L 2 -34" stroke="#CBD5E1" strokeWidth="0.75" strokeLinecap="round" opacity="0.6" />
              </g>
              {/* Orange Nodal Connection Dot */}
              <circle cx="0" cy="0" r={2.0 * pt.s} fill="#E7651A" opacity="0.9" />
            </g>
          ))}

          {/* Crown Terminal Leaf at Top */}
          <g transform="translate(106, 14) rotate(-35)">
            <path d="M 0 0 C -4 -10, -10 -20, 0 -28 C 10 -20, 4 -10, 0 0 Z" fill={`url(#leafFacetB-${safeId})`} />
            <path d="M 0 0 L 0 -28" stroke="#E7651A" strokeWidth="0.8" opacity="0.8" />
            <circle cx="0" cy="0" r="2.5" fill="#E7651A" filter={`url(#laurelGlow-${safeId})`} />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}
