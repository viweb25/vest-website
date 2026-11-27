'use client';

import React, { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import type { CSSProperties, MouseEvent, PointerEvent as ReactPointerEvent, ReactElement, ReactNode, SVGProps } from 'react';
import Link from 'next/link';
import { AnimatePresence, LazyMotion, animate, domAnimation, m, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Cable,
  ChartNoAxesColumnIncreasing,
  Cpu,
  FilePen,
  MousePointer2,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Workflow,
  Activity,
  Layers,
  Database,
  Terminal,
  Code2,
  Monitor,
  Network,
  ClipboardCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Scoped Block Stylesheet ──────────────────────────────────────────────────
const BLOCK_CSS = `
.n3-root {
  --color-n3-page: #ffffff;
  --color-n3-ink: #171717;
  --color-n3-grey: #74716c;
  --color-n3-line: #e2e8f0;
  --color-n3-accent: #E7651A;
  --n3-gutter: 20px;
}

@media (min-width: 640px) {
  .n3-root {
    --n3-gutter: 32px;
  }
}

@media (min-width: 1024px) {
  .n3-root {
    --n3-gutter: 48px;
  }
}

.n3-frame {
  padding-left: var(--n3-gutter);
  padding-right: var(--n3-gutter);
}

.n3-hero {
  min-height: calc(100vh - 90px);
}

@media (max-width: 1023px) {
  .n3-hero {
    min-height: 0;
  }
}

.n3-h1 {
  font-size: clamp(2.4rem, 1.2rem + 3.8vw, 4.5rem);
  line-height: 1.04;
  letter-spacing: -0.035em;
}

.n3-bg {
  background:
    radial-gradient(ellipse 65% 70% at 75% 50%, rgb(255 255 255 / 0.98) 0%, rgb(255 255 255 / 0) 70%),
    radial-gradient(ellipse 40% 45% at 78% 58%, rgb(255 122 47 / 0.08) 0%, rgb(255 122 47 / 0) 70%),
    radial-gradient(ellipse 50% 40% at 100% 0%, rgb(241 245 249 / 0.8) 0%, rgb(241 245 249 / 0) 70%),
    #ffffff;
}

.n3-halo {
  border-radius: 9999px;
  background: radial-gradient(closest-side, rgb(255 255 255 / 0.95), rgb(255 255 255 / 0));
}

.n3-floor,
.n3-floor-lit {
  --n3-floor-area: radial-gradient(ellipse 75% 80% at 72% 70%, #000 20%, transparent 100%);
  --n3-floor-edges: linear-gradient(to left, transparent 0%, #000 22%), linear-gradient(to top, transparent 0%, #000 28%);
  -webkit-mask-image: var(--n3-floor-area), var(--n3-floor-edges);
  mask-image: var(--n3-floor-area), var(--n3-floor-edges);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}

.n3-floor {
  opacity: 0.38;
}

.n3-floor-spot {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 400ms ease;
  will-change: transform, opacity;
  -webkit-mask-image: radial-gradient(closest-side, #000 0%, transparent 100%);
  mask-image: radial-gradient(closest-side, #000 0%, transparent 100%);
}

.n3-floor-lit {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
}

[data-spot='on'] > .n3-floor-spot {
  opacity: 0.85;
}

@media (max-width: 1023px) {
  .n3-floor,
  .n3-floor-lit {
    --n3-floor-area: radial-gradient(ellipse 90% 60% at 50% 75%, #000 20%, transparent 100%);
  }
}

.n3-fade-edge {
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 14%);
  mask-image: linear-gradient(to right, transparent 0%, #000 14%);
}

@media (max-width: 1023px) {
  .n3-fade-edge {
    -webkit-mask-image: none;
    mask-image: none;
  }
}

.n3-flip {
  perspective: 600px;
}

.n3-flip-box {
  --d: 0.75em;
  display: inline-grid;
  transform-style: preserve-3d;
  transform: translateZ(calc(var(--d) * -1)) rotateX(0deg);
  transition: transform 550ms cubic-bezier(0.22, 1, 0.36, 1);
}

.n3-flip-face {
  grid-area: 1 / 1;
  display: inline-flex;
  height: 1.5em;
  align-items: center;
  justify-content: center;
  line-height: 1.5em;
  backface-visibility: hidden;
  transform: translateZ(var(--d));
}

.n3-flip-back {
  transform: rotateX(-90deg) translateZ(var(--d));
}

.n3-flip:hover .n3-flip-box,
.n3-flip:focus-visible .n3-flip-box {
  transform: translateZ(calc(var(--d) * -1)) rotateX(90deg);
}

@media (prefers-reduced-motion: reduce) {
  .n3-flip-box {
    transition: none;
  }
  .n3-flip:hover .n3-flip-box,
  .n3-flip:focus-visible .n3-flip-box {
    transform: translateZ(calc(var(--d) * -1));
  }
}

.n3-rise {
  animation: n3-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

.n3-drop {
  animation: n3-drop 600ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

.n3-enter {
  animation: n3-enter 1100ms cubic-bezier(0.22, 1, 0.36, 1) 250ms backwards;
}

@keyframes n3-rise {
  from {
    opacity: 0;
    translate: 0 18px;
  }
}

@keyframes n3-drop {
  from {
    opacity: 0;
    translate: 0 -12px;
  }
}

@keyframes n3-enter {
  from {
    opacity: 0;
    scale: 0.97;
  }
}

@media (prefers-reduced-motion: reduce) {
  .n3-rise,
  .n3-drop,
  .n3-enter {
    animation: none;
  }
}

@keyframes n3-float {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(var(--n3-float, 6) * -1px));
  }
}

.n3-float {
  animation: n3-float var(--n3-float-seconds, 6.5s) ease-in-out infinite alternate;
}

@keyframes n3-seam {
  from {
    opacity: 0.78;
  }
  to {
    opacity: 1;
  }
}

.n3-seam-pulse {
  animation: n3-seam 4.8s ease-in-out infinite alternate;
}

@media (prefers-reduced-motion: reduce) {
  .n3-float,
  .n3-seam-pulse {
    animation: none;
  }
}

.n3-stage-card {
  border: 1px solid rgb(23 23 23 / 0.08);
  border-radius: 1.25em;
  background: rgb(255 255 255 / 0.88);
  box-shadow:
    0 1px 2px rgb(60 50 40 / 0.04),
    0 14px 34px -18px rgb(90 78 62 / 0.25),
    inset 0 1px 0 rgb(255 255 255 / 0.95);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  transition:
    border-color 300ms ease,
    box-shadow 300ms ease;
}

.n3-stage-card-lit {
  border-color: rgb(255 122 47 / 0.55);
  box-shadow:
    0 1px 2px rgb(60 50 40 / 0.04),
    0 18px 38px -18px rgb(255 122 47 / 0.45),
    inset 0 1px 0 rgb(255 255 255 / 0.95);
}

@container (max-width: 640px) {
  .n3-stage-apps {
    display: none;
  }
}
`;

// ─── Shared Isometric Geometry ────────────────────────────────────────────────
const ISO_X = 0.866;
const ISO_Y = 0.5;
const CX = 500;
const CY = 500;
const RING_FLATTEN = 0.57;
const RING_RX = [400, 530] as const;

type SlabType = {
  half: number;
  radius: number;
  top: number;
  depth: number;
};

const BASE: SlabType = { half: 168, radius: 40, top: 475, depth: 34 };
const SEAM_GAP = 9;
const MID: SlabType = { half: 151, radius: 36, top: BASE.top - SEAM_GAP - 28, depth: 28 };
const CAP: SlabType = { half: 101, radius: 28, top: MID.top - 14, depth: 14 };

type Point = [number, number];
const round = (n: number) => Math.round(n * 100) / 100;

const project = (x: number, y: number, cx = CX, cy = CY): Point => {
  return [cx + (x - y) * ISO_X, cy + (x + y) * ISO_Y];
};

const footprint = (half: number, radius: number, steps = 14): Point[] => {
  const r = Math.min(radius, half);
  const c = half - r;
  const corners: [number, number, number][] = [
    [c, c, 0],
    [-c, c, 90],
    [-c, -c, 180],
    [c, -c, 270],
  ];
  const pts: Point[] = [];
  for (const [ox, oy, start] of corners) {
    for (let i = 0; i <= steps; i++) {
      const a = ((start + (90 * i) / steps) * Math.PI) / 180;
      pts.push([ox + r * Math.cos(a), oy + r * Math.sin(a)]);
    }
  }
  return pts;
};

const toPath = (pts: Point[]) => `M${pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join('L')}Z`;

const topPath = (slab: SlabType, inset = 0, cx = CX, dy = 0) => {
  const half = slab.half - inset;
  const radius = Math.max(slab.radius - inset, 1);
  return toPath(footprint(half, radius).map(([x, y]) => project(x, y, cx, slab.top + dy)));
};

const hull = (points: Point[]): Point[] => {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: Point, a: Point, b: Point) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const build = (list: Point[]) => {
    const out: Point[] = [];
    for (const p of list) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 0) out.pop();
      out.push(p);
    }
    out.pop();
    return out;
  };
  return [...build(pts), ...build([...pts].reverse())];
};

const bodyPath = (slab: SlabType, inset = 0) => {
  const half = slab.half - inset;
  const radius = Math.max(slab.radius - inset, 1);
  const outline = footprint(half, radius);
  const upper = outline.map(([x, y]) => project(x, y, CX, slab.top));
  const lower = outline.map(([x, y]) => project(x, y, CX, slab.top + slab.depth));
  return toPath(hull([...upper, ...lower]));
};

const facePoint = (slab: SlabType, side: 'left' | 'right', u: number, v: number): Point => {
  const { half, top, depth } = slab;
  if (side === 'left') {
    const [x, y] = project(-half + 2 * half * u, half, CX, top);
    return [x, y + depth * v];
  }
  const [x, y] = project(half, half - 2 * half * u, CX, top);
  return [x, y + depth * v];
};

const FACE_MATRIX = {
  left: `${ISO_X} ${ISO_Y} 0 1`,
  right: `${ISO_X} ${-ISO_Y} 0 1`,
  top: `${ISO_X} ${ISO_Y} ${-ISO_X} ${ISO_Y}`,
};

const ringPoint = (rx: number, angleDeg: number): Point => {
  const a = (angleDeg * Math.PI) / 180;
  return [round(CX + rx * Math.cos(a)), round(CY + rx * RING_FLATTEN * Math.sin(a))];
};

const ringPath = (rx: number) => {
  const ry = rx * RING_FLATTEN;
  return `M${CX + rx} ${CY}A${rx} ${ry} 0 1 1 ${CX - rx} ${CY}A${rx} ${ry} 0 1 1 ${CX + rx} ${CY}Z`;
};

// ─── Syntra Leaves Emblem (Top Plate Inlay) ───────────────────────────────────
const LEAF = 'M11 0H19A3 3 0 0 1 22 3V11A11 11 0 0 1 11 22H3A3 3 0 0 1 0 19V11A11 11 0 0 1 11 0Z';
const TURNS = [0, 90, 180, 270];
const OPACITY = [1, 0.9, 0.8, 0.9];

const SyntraLeaves = ({ fill, fades = false, stroke }: { fill: string; fades?: boolean; stroke?: string }) => (
  <>
    {TURNS.map((turn, i) => (
      <path
        key={turn}
        d={LEAF}
        transform={`rotate(${turn}) translate(-25 -25)`}
        fill={fill}
        stroke={stroke}
        strokeWidth={stroke ? 0.6 : undefined}
        opacity={fades ? OPACITY[i] : 1}
      />
    ))}
  </>
);

// ─── Core Parts & Materials ───────────────────────────────────────────────────
const ORANGE = '#E7651A';

const FaceMark = ({
  slab,
  side,
  u,
  v,
  w,
  h,
  fill,
  glow,
}: {
  slab: SlabType;
  side: 'left' | 'right';
  u: number;
  v: number;
  w: number;
  h: number;
  fill: string;
  glow?: boolean;
}) => {
  const [x, y] = facePoint(slab, side, u, v);
  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) matrix(${FACE_MATRIX[side]} 0 0)`}>
      {glow && (
        <rect
          x={-w / 2 - 2}
          y={-h / 2 - 3}
          width={w + 4}
          height={h + 6}
          rx={h}
          fill={fill}
          filter="url(#n3-blur-sm)"
          opacity="0.8"
        />
      )}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fill} />
    </g>
  );
};

const PanelLine = ({
  slab,
  side,
  v,
  from = 0.14,
  to = 0.86,
}: {
  slab: SlabType;
  side: 'left' | 'right';
  v: number;
  from?: number;
  to?: number;
}) => {
  const [x1, y1] = facePoint(slab, side, from, v);
  const [x2, y2] = facePoint(slab, side, to, v);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#A7A298" strokeWidth="0.9" opacity="0.55" />;
};

const Fastener = ({ slab, x, y }: { slab: SlabType; x: number; y: number }) => {
  const [px, py] = project(x, y, CX, slab.top);
  return (
    <g transform={`translate(${px.toFixed(2)} ${py.toFixed(2)}) matrix(${FACE_MATRIX.top} 0 0)`}>
      <circle r="6.5" fill="url(#n3-hole)" stroke="#C9C5BB" strokeWidth="1" />
    </g>
  );
};

const SlabBody = ({ slab }: { slab: SlabType }) => (
  <g>
    <path d={bodyPath(slab)} fill="url(#n3-side)" />
    <path d={bodyPath(slab)} fill="url(#n3-side-shade)" />
    <path d={bodyPath(slab)} fill="none" stroke="#CFCBC1" strokeWidth="1" opacity="0.85" />
  </g>
);

const SlabTop = ({ slab, groove }: { slab: SlabType; groove?: number }) => (
  <g>
    <path d={topPath(slab)} fill="url(#n3-bevel)" stroke="#D9D6D0" strokeWidth="1" />
    <path d={topPath(slab, 4.5)} fill="url(#n3-top)" stroke="#fff" strokeWidth="1" opacity="1" />
    {groove !== undefined && <path d={topPath(slab, groove)} fill="none" stroke="#DAD6CE" strokeWidth="1.2" />}
  </g>
);

const LOGO_SIDE = ['#6E2B08', '#8E380C', '#AF4610', '#D15514', '#F36519', '#E7651A'];
const LOGO_SCALE = 1.42;

const CoreLogo = ({ x, y }: { x: number; y: number }) => {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Soft ground shadow on top plate */}
      <ellipse cx="0" cy="10" rx="42" ry="15" fill="#000000" opacity="0.1" filter="url(#n3-blur-sm)" />

      {/* LabVIEW Yellow Triangle Emblem */}
      <g transform="translate(0, -14)">
        {/* 3D Extrusion Bevel Shadow */}
        <path
          d="M -23,-28 C -26,-31 -32,-29 -32,-24 L -32,24 C -32,29 -26,31 -23,28 L 28,3 C 32,1 32,-1 28,-3 Z"
          transform="translate(0, 5)"
          fill="#D98E00"
        />

        {/* Top Triangle Face */}
        <path
          d="M -23,-28 C -26,-31 -32,-29 -32,-24 L -32,24 C -32,29 -26,31 -23,28 L 28,3 C 32,1 32,-1 28,-3 Z"
          fill="url(#lv-gold)"
          stroke="#FFEAA0"
          strokeWidth="1.2"
        />

        {/* LabVIEW Inner Schematic Wire Glyph */}
        {/* Horizontal wire */}
        <line x1="-22" y1="0" x2="8" y2="0" stroke="#171717" strokeWidth="4.8" strokeLinecap="round" />
        {/* Tall vertical cross tick (left) */}
        <line x1="-11" y1="-11" x2="-11" y2="11" stroke="#171717" strokeWidth="4.8" strokeLinecap="round" />
        {/* Short vertical cross tick (right) */}
        <line x1="-1" y1="-6" x2="-1" y2="6" stroke="#171717" strokeWidth="4.2" strokeLinecap="round" />
      </g>

      {/* LabVIEW™ Text below triangle */}
      <text
        x="0"
        y="32"
        textAnchor="middle"
        fontFamily="var(--font-n3-sans), 'Onest', system-ui, sans-serif"
        fontSize="23"
        fontWeight="900"
        fontStyle="italic"
        letterSpacing="-0.5"
        fill="#0B2340"
      >
        LabVIEW<tspan fontSize="12" fontStyle="normal" fontWeight="bold" dy="-9">™</tspan>
      </text>
    </g>
  );
};

const CoreDefs = () => (
  <defs>
    <linearGradient id="lv-gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#FFDC33" />
      <stop offset="55%" stopColor="#FFBA00" />
      <stop offset="100%" stopColor="#F09B00" />
    </linearGradient>
    <linearGradient id="n3-side" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="0.46" stopColor="#EFECE6" />
      <stop offset="0.5" stopColor="#DDD8CE" />
      <stop offset="1" stopColor="#CDC7BA" />
    </linearGradient>
    <linearGradient id="n3-side-shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.45" stopColor="#7E7667" stopOpacity="0" />
      <stop offset="1" stopColor="#7E7667" stopOpacity="0.18" />
    </linearGradient>
    <linearGradient id="n3-bevel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="1" stopColor="#D9D4C7" />
    </linearGradient>
    <linearGradient id="n3-top" x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="1" stopColor="#F5F2EB" />
    </linearGradient>
    <linearGradient id="n3-inlay" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#D8D3C5" />
      <stop offset="1" stopColor="#F8F6F0" />
    </linearGradient>
    <linearGradient id="n3-seam" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#FF9A5C" />
      <stop offset="0.5" stopColor={ORANGE} />
      <stop offset="1" stopColor="#D05612" />
    </linearGradient>
    <linearGradient id="n3-slot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#3F392F" />
      <stop offset="1" stopColor="#554E41" />
    </linearGradient>
    <linearGradient id="n3-logo-top" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#FFA66E" />
      <stop offset="0.55" stopColor={ORANGE} />
      <stop offset="1" stopColor="#E2570A" />
    </linearGradient>
    <clipPath id="n3-mark-clip">
      <SyntraLeaves fill="#000" />
    </clipPath>
    <radialGradient id="n3-hole" cx="0.5" cy="0.4" r="0.7">
      <stop offset="0" stopColor="#7E7667" />
      <stop offset="1" stopColor="#F5F2EB" />
    </radialGradient>
    <filter id="n3-blur-sm" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3.5" />
    </filter>
    <filter id="n3-blur-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="9" />
    </filter>
    <filter id="n3-blur-spill" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="18" />
    </filter>
  </defs>
);

const SyntraCoreObject = (props: SVGProps<SVGSVGElement>) => {
  const seam: SlabType = {
    half: MID.half - 2,
    radius: MID.radius - 2,
    top: MID.top + MID.depth - 1,
    depth: SEAM_GAP + 1,
  };
  const spillDy = BASE.top - MID.top;
  const [logoX, logoY] = [CX, CAP.top];

  return (
    <svg viewBox="0 0 1000 1000" role="img" aria-label="Syntra Core Platform" {...props}>
      <CoreDefs />
      <SlabBody slab={BASE} />
      <SlabTop slab={BASE} groove={10} />
      <PanelLine slab={BASE} side="left" v={0.3} />
      <PanelLine slab={BASE} side="right" v={0.3} />
      <FaceMark slab={BASE} side="right" u={0.5} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
      <FaceMark slab={BASE} side="right" u={0.58} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
      <FaceMark slab={BASE} side="right" u={0.66} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
      <FaceMark slab={BASE} side="left" u={0.32} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
      <FaceMark slab={BASE} side="left" u={0.4} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />

      <g className="n3-seam-pulse">
        <path d={topPath(MID, 4, CX, spillDy)} fill={ORANGE} opacity="0.3" filter="url(#n3-blur-spill)" />
        <path d={bodyPath(seam)} fill={ORANGE} opacity="0.65" filter="url(#n3-blur-glow)" />
      </g>
      <path d={bodyPath(seam)} fill="url(#n3-seam)" />

      <SlabBody slab={MID} />
      <SlabTop slab={MID} groove={11} />
      <PanelLine slab={MID} side="left" v={0.78} />
      <PanelLine slab={MID} side="right" v={0.78} />
      <FaceMark slab={MID} side="left" u={0.62} v={0.42} w={34} h={7.5} fill="url(#n3-slot)" />
      <FaceMark slab={MID} side="left" u={0.34} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
      <FaceMark slab={MID} side="left" u={0.42} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
      <FaceMark slab={MID} side="right" u={0.44} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
      <FaceMark slab={MID} side="right" u={0.52} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
      <FaceMark slab={MID} side="right" u={0.68} v={0.42} w={22} h={4.5} fill="url(#n3-slot)" />
      <g className="n3-seam-pulse">
        <FaceMark slab={MID} side="left" u={0.2} v={0.42} w={7} h={2.6} fill={ORANGE} glow />
      </g>

      <Fastener slab={MID} x={0} y={-MID.half + 28} />
      <Fastener slab={MID} x={-MID.half + 28} y={0} />
      <Fastener slab={MID} x={MID.half - 28} y={0} />
      <Fastener slab={MID} x={0} y={MID.half - 28} />

      <SlabBody slab={CAP} />
      <SlabTop slab={CAP} />
      <path d={topPath(CAP, 19)} fill="url(#n3-inlay)" stroke="#D8D4C8" strokeWidth="1.2" />
      <path d={topPath(CAP, 20.5)} fill="none" stroke="#fff" strokeWidth="1" opacity="0.9" />

      <CoreLogo x={logoX} y={logoY} />
    </svg>
  );
};

const SyntraCoreShadow = (props: SVGProps<SVGSVGElement>) => {
  const floor = { ...BASE, top: BASE.top + BASE.depth + 30 };
  return (
    <svg viewBox="0 0 1000 1000" aria-hidden {...props}>
      <defs>
        <filter id="n3-blur-lg" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="n3-blur-md" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <path d={topPath(floor, -14)} fill="#5C5549" opacity="0.22" filter="url(#n3-blur-lg)" />
      <path d={topPath(floor, 6)} fill="#2B261F" opacity="0.25" filter="url(#n3-blur-md)" />
    </svg>
  );
};

const NODES: [number, number][] = [
  [118, 132],
  [318, 82],
  [690, 96],
  [884, 188],
  [936, 470],
  [70, 512],
  [150, 858],
  [850, 846],
];

const SyntraDepthBackdrop = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 1000 1000" aria-hidden {...props}>
    <defs>
      <linearGradient id="n3-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.8" />
        <stop offset="1" stopColor="#fff" stopOpacity="0.15" />
      </linearGradient>
    </defs>
    <g fill="url(#n3-glass)" stroke="#E5E1D8" strokeWidth="1" opacity="0.45">
      <rect width="290" height="250" rx="22" transform="matrix(0.866 -0.5 0 1 232 300)" />
      <rect width="290" height="250" rx="22" transform="matrix(0.866 0.5 0 1 520 150)" />
    </g>
    <g fill="#fff" stroke="#D3CEBF" strokeWidth="1">
      {NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 3} opacity="0.85" />
      ))}
    </g>
  </svg>
);

// ─── Configuration & Stages ───────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

const MOTION = {
  floatDistance: 10,
  floatSeconds: 6.5,
  tiltDegrees: 3.5,
  ringParallax: 12,
  backdropParallax: 5,
  orbitSeconds: [70, 95],
  orbitOpenOpacity: 0.15,
};

const ARTBOARD = 1000;

const STAGES = [
  {
    title: 'LabVIEW Development',
    items: ['UI', 'Test Sequencing', 'Automation'],
    apps: ['UI', 'Sequencing', 'Automation'],
    icon: 'development',
    side: 'right',
  },
  {
    title: 'Data Acquisition',
    items: ['NI DAQ', 'cDAQ', 'Real-Time'],
    apps: ['NI DAQ', 'cDAQ', 'RT'],
    icon: 'daq',
    side: 'left',
  },
  {
    title: 'Instrument Control',
    items: ['VISA', 'SCPI', 'GPIB', 'Serial'],
    apps: ['VISA', 'SCPI', 'GPIB', 'Serial'],
    icon: 'instruments',
    side: 'right',
    main: true,
  },
  {
    title: 'System Integration',
    items: ['DAQ', 'PLC', 'Motion', 'Vision'],
    apps: ['DAQ', 'PLC', 'Motion', 'Vision'],
    icon: 'integration',
    side: 'left',
  },
  {
    title: 'Test Automation',
    items: ['Validation', 'Reporting', 'MES'],
    apps: ['Validation', 'Reporting', 'MES'],
    icon: 'automation',
    side: 'right',
  },
] as const;

type Stage = (typeof STAGES)[number];
const isMain = (stage: Stage) => 'main' in stage && stage.main;

const EXPLODE = {
  spring: { stiffness: 105, damping: 25, mass: 1 },
  gap: 98,
  aiLift: 12,
  topPlateY: 220,
  stagger: 0.05,
  scales: [0.63, 0.62, 0.7, 1.07, 1.06],
};

const STAGE_CARDS = {
  left: { edge: -4, width: 35 },
  right: { edge: 0, width: 35 },
  restInset: 10,
  outward: 2,
  beadSeconds: 1.6,
};

const PLATE_SLABS: SlabType[] = [
  { ...BASE, top: BASE.top + 17, depth: 17 },
  { ...BASE, top: BASE.top, depth: 17 },
  MID,
  { ...CAP, top: CAP.top + 7, depth: 7 },
  { ...CAP, top: CAP.top, depth: 7 },
];

const AI_PLATE = 2;
const TARGET_TOPS = PLATE_SLABS.map(
  (_, i) => EXPLODE.topPlateY + (PLATE_SLABS.length - 1 - i) * EXPLODE.gap - (i === AI_PLATE ? EXPLODE.aiLift : 0)
);
const TRAVEL = PLATE_SLABS.map((slab, i) => TARGET_TOPS[i] - slab.top);

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const plateProgress = (i: number, p: number) => {
  const delay = Math.abs(i - AI_PLATE) * EXPLODE.stagger;
  return clamp((p - delay) / (1 - delay));
};
const plateY = (i: number, p: number) => TRAVEL[i] * plateProgress(i, p);
const plateScale = (i: number, p: number) => 1 + (EXPLODE.scales[i] - 1) * plateProgress(i, p);

const tipOffset = (i: number) => {
  const { half, radius } = PLATE_SLABS[i];
  return 0.866 * (2 * half - 0.586 * radius) * EXPLODE.scales[i];
};
const tipX = (i: number, side: 'left' | 'right') => CX + (side === 'right' ? 1 : -1) * tipOffset(i);
const cornerY = (i: number) => TARGET_TOPS[i] + PLATE_SLABS[i].depth / 2;

const SKIRT = [0, 4, 0, 10, 10];

const Plate = ({ index, progress, children }: { index: number; progress: MotionValue<number>; children: ReactNode }) => {
  const y = useTransform(progress, v => plateY(index, v));
  const scale = useTransform(progress, v => plateScale(index, v));
  const apart = useTransform(progress, v => plateProgress(index, v));
  const shadow = useTransform(apart, v => v * 0.16);
  const slab = PLATE_SLABS[index];
  const skirt = SKIRT[index];

  return (
    <m.g style={{ y, scale }}>
      {index > 0 && (
        <m.path
          d={topPath(slab, -6, CX, slab.depth + 34)}
          fill="#6E6556"
          filter="url(#n3-blur-spill)"
          style={{ opacity: shadow }}
        />
      )}
      {skirt > 0 && (
        <m.g style={{ opacity: apart }}>
          <SlabBody slab={{ ...slab, top: slab.top + slab.depth - 1, depth: skirt + 1 }} />
        </m.g>
      )}
      {children}
    </m.g>
  );
};

const PlateNumber = ({ slab, n, main = false }: { slab: SlabType; n: number; main?: boolean }) => {
  const k = slab.half * 0.56;
  const [x, y] = project(k, k, CX, slab.top);
  const plane = `matrix(${FACE_MATRIX.top} 0 0) rotate(-45)`;
  const label = String(n).padStart(2, '0');

  const text = {
    textAnchor: 'middle' as const,
    dominantBaseline: 'central' as const,
    fontSize: 25,
    fontWeight: 700,
    letterSpacing: 2.5,
  };

  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`} aria-hidden>
      <text {...text} transform={`translate(0 0.9) ${plane}`} fill="#FFFFFF" opacity="0.95">
        {label}
      </text>
      <text {...text} transform={plane} fill={main ? ORANGE : '#7E7667'}>
        {label}
      </text>
    </g>
  );
};

const AiEmphasis = ({ progress }: { progress: MotionValue<number> }) => {
  const on = useTransform(progress, v => clamp((v - 0.5) / 0.4));
  const rim = useTransform(on, v => v * 0.95);
  const halo = useTransform(on, v => v * 0.6);
  const spill = useTransform(halo, v => v * 0.4);

  return (
    <g transform={`translate(${CX} ${MID.top}) matrix(${FACE_MATRIX.top} 0 0)`}>
      <m.circle r="86" fill={ORANGE} filter="url(#n3-blur-spill)" style={{ opacity: spill }} />
      <m.circle r="56" fill="none" stroke={ORANGE} strokeWidth="1.6" style={{ opacity: rim }} />
      <m.circle r="38" fill="none" stroke={ORANGE} strokeWidth="1" strokeDasharray="3 6" style={{ opacity: halo }} />
      <m.circle r="9" fill={ORANGE} style={{ opacity: rim }} />
    </g>
  );
};

const SyntraExplodedCore = ({ progress, ...props }: SVGProps<SVGSVGElement> & { progress: MotionValue<number> }) => {
  const strongGlow = useTransform(progress, v => clamp((v - 0.4) / 0.5) * 0.65);
  const seam = { half: MID.half - 2, radius: MID.radius - 2, top: MID.top + MID.depth - 1, depth: SEAM_GAP + 1 };

  const inlay = (slab: (typeof PLATE_SLABS)[number]) => (
    <>
      <path d={topPath(slab, 19)} fill="url(#n3-inlay)" stroke="#D8D4C8" strokeWidth="1.2" />
      <path d={topPath(slab, 20.5)} fill="none" stroke="#fff" strokeWidth="1" opacity="0.9" />
    </>
  );

  return (
    <svg viewBox="0 0 1000 1000" aria-hidden {...props}>
      <CoreDefs />
      <Plate index={0} progress={progress}>
        <SlabBody slab={PLATE_SLABS[0]} />
        <SlabTop slab={PLATE_SLABS[0]} groove={10} />
        <PlateNumber slab={PLATE_SLABS[0]} n={1} />
        <FaceMark slab={BASE} side="right" u={0.5} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
        <FaceMark slab={BASE} side="right" u={0.58} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
        <FaceMark slab={BASE} side="right" u={0.66} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
        <FaceMark slab={BASE} side="left" u={0.32} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
        <FaceMark slab={BASE} side="left" u={0.4} v={0.62} w={4.5} h={4.5} fill="url(#n3-slot)" />
      </Plate>

      <Plate index={1} progress={progress}>
        <SlabBody slab={PLATE_SLABS[1]} />
        <SlabTop slab={PLATE_SLABS[1]} groove={10} />
        <PlateNumber slab={PLATE_SLABS[1]} n={2} />
        <PanelLine slab={BASE} side="left" v={0.3} />
        <PanelLine slab={BASE} side="right" v={0.3} />
      </Plate>

      <Plate index={AI_PLATE} progress={progress}>
        <g className="n3-seam-pulse">
          <path d={topPath(MID, 4, CX, BASE.top - MID.top)} fill={ORANGE} opacity="0.3" filter="url(#n3-blur-spill)" />
          <path d={bodyPath(seam)} fill={ORANGE} opacity="0.65" filter="url(#n3-blur-glow)" />
        </g>
        <m.path d={bodyPath(seam)} fill={ORANGE} filter="url(#n3-blur-glow)" style={{ opacity: strongGlow }} />
        <path d={bodyPath(seam)} fill="url(#n3-seam)" />
        <SlabBody slab={MID} />
        <SlabTop slab={MID} groove={11} />
        <PlateNumber slab={MID} n={3} main />
        <PanelLine slab={MID} side="left" v={0.78} />
        <PanelLine slab={MID} side="right" v={0.78} />
        <FaceMark slab={MID} side="left" u={0.62} v={0.42} w={34} h={7.5} fill="url(#n3-slot)" />
        <FaceMark slab={MID} side="left" u={0.34} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
        <FaceMark slab={MID} side="left" u={0.42} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
        <FaceMark slab={MID} side="right" u={0.44} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
        <FaceMark slab={MID} side="right" u={0.52} v={0.42} w={5} h={5} fill="url(#n3-slot)" />
        <FaceMark slab={MID} side="right" u={0.68} v={0.42} w={22} h={4.5} fill="url(#n3-slot)" />
        <g className="n3-seam-pulse">
          <FaceMark slab={MID} side="left" u={0.2} v={0.42} w={7} h={2.6} fill={ORANGE} glow />
        </g>
        <Fastener slab={MID} x={0} y={-MID.half + 28} />
        <Fastener slab={MID} x={-MID.half + 28} y={0} />
        <Fastener slab={MID} x={MID.half - 28} y={0} />
        <Fastener slab={MID} x={0} y={MID.half - 28} />
        <AiEmphasis progress={progress} />
      </Plate>

      <Plate index={3} progress={progress}>
        <SlabBody slab={PLATE_SLABS[3]} />
        <SlabTop slab={PLATE_SLABS[3]} />
        {inlay(PLATE_SLABS[3])}
        <PlateNumber slab={PLATE_SLABS[3]} n={4} />
      </Plate>

      <Plate index={4} progress={progress}>
        <SlabBody slab={PLATE_SLABS[4]} />
        <SlabTop slab={PLATE_SLABS[4]} />
        {inlay(CAP)}
        <CoreLogo x={CX} y={CAP.top} />
      </Plate>
    </svg>
  );
};

const SyntraOrbitalSystem = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 1000 1000" aria-hidden {...props}>
    <g fill="none" stroke="#D8D4C8" strokeWidth="1">
      <ellipse cx={CX} cy={CY} rx={RING_RX[0]} ry={RING_RX[0] * RING_FLATTEN} opacity="0.8" />
      <ellipse cx={CX} cy={CY} rx={RING_RX[1]} ry={RING_RX[1] * RING_FLATTEN} opacity="0.65" />
    </g>
  </svg>
);

const NODES2 = [
  { ring: 0, angle: 20, size: 7 },
  { ring: 0, angle: 110, size: 5.5 },
  { ring: 0, angle: 200, size: 8 },
  { ring: 0, angle: 290, size: 6 },
  { ring: 1, angle: 60, size: 6 },
  { ring: 1, angle: 132, size: 8 },
  { ring: 1, angle: 204, size: 5.5 },
  { ring: 1, angle: 276, size: 7 },
  { ring: 1, angle: 348, size: 6.5 },
];

const Crystal = ({ size }: { size: number }) => (
  <g filter="url(#n3-crystal-shadow)">
    <circle r={size * 1.55} fill="url(#n3-crystal-halo)" />
    <circle r={size} fill="url(#n3-crystal-body)" />
    <circle r={size} fill="url(#n3-crystal-refract)" />
    <circle r={size - 0.5} fill="none" stroke="url(#n3-crystal-rim)" strokeWidth="1" />
    <ellipse
      cx={-size * 0.32}
      cy={-size * 0.4}
      rx={size * 0.36}
      ry={size * 0.2}
      transform={`rotate(-30 ${-size * 0.32} ${-size * 0.4})`}
      fill="#FFFFFF"
      opacity="0.95"
    />
    <circle cx={size * 0.34} cy={-size * 0.5} r={Math.max(0.7, size * 0.07)} fill="#FFFFFF" opacity="0.85" />
  </g>
);

const SyntraParticles = ({
  half,
  animate: doAnimate,
  paused = false,
  ...props
}: SVGProps<SVGSVGElement> & { half: 'back' | 'front'; animate: boolean; paused?: boolean }) => {
  const ref = useRef<SVGSVGElement>(null);
  const clipId = `n3-clip-${half}`;

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (paused) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [paused]);

  return (
    <svg ref={ref} viewBox="0 0 1000 1000" aria-hidden {...props}>
      <defs>
        <clipPath id={clipId}>
          {half === 'back' ? (
            <rect x="-200" y="-200" width="1400" height={CY + 200} />
          ) : (
            <rect x="-200" y={CY} width="1400" height="700" />
          )}
        </clipPath>
        <linearGradient id="n3-crystal-body" x1="0.15" y1="0.1" x2="0.85" y2="0.95">
          <stop offset="0" stopColor="#FFD1B3" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#FF9A5C" stopOpacity="0.88" />
          <stop offset="1" stopColor="#E7651A" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="n3-crystal-refract" cx="0.6" cy="0.78" r="0.45">
          <stop offset="0" stopColor="#FFE5D4" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFE5D4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="n3-crystal-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#E7651A" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="n3-crystal-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.5" stopColor="#E7651A" stopOpacity="0.16" />
          <stop offset="1" stopColor="#E7651A" stopOpacity="0" />
        </radialGradient>
        <filter id="n3-crystal-shadow" x="-80%" y="-80%" width="260%" height="260%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#8F3E0A" floodOpacity="0.25" />
        </filter>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {NODES2.map((node, i) => {
          const rx = RING_RX[node.ring];
          const [x, y] = ringPoint(rx, node.angle);
          const dur = MOTION.orbitSeconds[node.ring];
          const reverse = node.ring === 1;
          const start = node.angle / 360;
          const begin = -dur * (reverse ? 1 - start : start);

          return (
            <g key={i} transform={doAnimate ? undefined : `translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <Crystal size={node.size} />
              {doAnimate && (
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${begin}s`}
                  repeatCount="indefinite"
                  path={ringPath(rx)}
                  {...(reverse && { keyPoints: '1;0', keyTimes: '0;1', calcMode: 'linear' })}
                />
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
};

const DOTS = Array.from({ length: 26 }, (_, i) => {
  const a = (i * 137.5 * Math.PI) / 180;
  const r = 160 + ((i * 53) % 340);
  return [
    round(CX + r * Math.cos(a) * 1.02),
    round(CY + r * Math.sin(a) * RING_FLATTEN * 1.6),
    0.8 + (i % 3) * 0.5,
  ] as const;
});

const SyntraTechnicalBackdrop = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 1000 1000" aria-hidden {...props}>
    <defs>
      <linearGradient id="n3-axis-v" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#D9D5CB" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D9D5CB" stopOpacity="0.45" />
        <stop offset="1" stopColor="#D9D5CB" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="n3-axis-h" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#D9D5CB" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D9D5CB" stopOpacity="0.7" />
        <stop offset="1" stopColor="#D9D5CB" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x={CX - 0.5} y="110" width="1" height="780" fill="url(#n3-axis-v)" />
    <rect x="70" y={CY - 0.5} width="860" height="1" fill="url(#n3-axis-h)" />
    <g fill="#A9A396">
      {DOTS.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} opacity={0.35 + (i % 4) * 0.12} />
      ))}
    </g>
    <g stroke="#C4BEAF" strokeWidth="1" opacity="0.6">
      {([
        [212, 292],
        [790, 690],
        [860, 430],
        [150, 560],
      ] as const).map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x - 5} ${y}h10M${x} ${y - 5}v10`} />
      ))}
    </g>
  </svg>
);

const STAGE_ICONS = {
  development: Code2,
  daq: Database,
  instruments: Monitor,
  integration: Network,
  automation: ClipboardCheck,
};

// ─── Compact Industrial App Logos / Tech Badges (Col-3 Aligned) ───────────────
const AppLogos = ({
  stage,
  tiles,
  className,
}: {
  stage: Stage;
  tiles: boolean;
  className?: string;
}) => {
  return (
    <div className={cn('n3-stage-apps flex shrink-0 items-center', tiles ? 'gap-[0.45em]' : 'gap-[0.3em]', className)}>
      {stage.apps.map(app =>
        tiles ? (
          <span
            key={app}
            className="border border-[#e2e8f0] px-2 py-0.5 rounded-[0.55em] bg-white shadow-[0_1px_2px_rgb(60_50_40/0.06)] font-mono text-[9px] font-extrabold text-[#E7651A] uppercase tracking-wide"
          >
            {app}
          </span>
        ) : (
          <span
            key={app}
            className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-[0.45em] bg-slate-100/90 text-slate-700 border border-slate-200 shadow-2xs whitespace-nowrap"
          >
            {app}
          </span>
        )
      )}
      <span className="sr-only">Tech: {stage.apps.join(', ')}</span>
    </div>
  );
};

/**
 * StageCardBody strictly uses a 2-line grid in standard stages and a compact 3-line grid in the
 * main stage. Non-main badges sit in Column 3, beside the text, taking 0 extra vertical lines.
 */
const StageCardBody = ({ index }: { index: number }) => {
  const stage = STAGES[index];
  const main = isMain(stage);
  const Icon = 'icon' in stage ? STAGE_ICONS[stage.icon as keyof typeof STAGE_ICONS] : null;

  return (
    <div className="grid grid-cols-[1.35em_1fr] items-start gap-x-[0.55em]">
      {/* Step number: 01, 02, etc. */}
      <span className="text-[#8e8a82] col-start-1 row-start-1 flex h-[1.64em] items-center text-[0.8em] font-mono font-bold tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Stage title */}
      <div className="col-start-2 row-start-1 flex items-baseline justify-between gap-x-[0.6em]">
        <p className="text-[#171717] text-[1.02em] leading-[1.25] font-bold tracking-[-0.015em] whitespace-nowrap">
          {stage.title}
        </p>
      </div>

      {/* Stage icon */}
      {Icon && (
        <span className="col-start-1 row-start-2 mt-[0.32em] flex h-[1.276em] items-center">
          <Icon className="text-[#E7651A] size-[1.2em]" strokeWidth={1.8} aria-hidden />
        </span>
      )}

      {/* Subtitle / outputs */}
      <div className="col-start-2 row-start-2 mt-[0.32em] min-w-0">
        <p className="text-[#74716c] text-[0.82em] leading-[1.35] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {stage.items.join(' · ')}
        </p>
      </div>
    </div>
  );
};

const pct = (n: number) => `${(n / ARTBOARD) * 100}%`;
const cardDirection = (index: number) => (STAGES[index].side === 'left' ? -1 : 1);

const StageCard = ({
  index,
  progress,
  open,
  lit,
  onHover,
}: {
  index: number;
  progress: MotionValue<number>;
  open: boolean;
  lit: boolean;
  onHover: (index: number | null) => void;
}) => {
  const opacity = useTransform(progress, [0.35, 0.9], [0, 1]);
  const x = useTransform(
    progress,
    [0, 1],
    [-cardDirection(index) * STAGE_CARDS.restInset, cardDirection(index) * STAGE_CARDS.outward]
  );
  const stage = STAGES[index];
  const { edge, width } = STAGE_CARDS[stage.side];
  const left = stage.side === 'left' ? edge : 100 - edge - width;

  return (
    <li
      style={{ top: pct(cornerY(index)), left: `${left}%`, width: `${width}%` }}
      className="absolute -translate-y-1/2"
    >
      <m.div
        style={{ opacity, x }}
        onPointerEnter={e => {
          if (e.pointerType === 'mouse') onHover(index);
        }}
        onPointerLeave={() => onHover(null)}
        className={cn(
          'n3-stage-card px-[1.05em] py-[0.85em] overflow-hidden',
          open && 'pointer-events-auto',
          lit && 'n3-stage-card-lit'
        )}
      >
        <StageCardBody index={index} />
      </m.div>
    </li>
  );
};

const StageCards = ({
  progress,
  open,
  hovered,
  onHover,
}: {
  progress: MotionValue<number>;
  open: boolean;
  hovered: number | null;
  onHover: (index: number | null) => void;
}) => (
  <ul
    aria-label="How LabVIEW Architecture Operates"
    aria-hidden={!open}
    className="pointer-events-none absolute inset-0 m-0 hidden list-none p-0 text-[clamp(10px,1.55cqw,14px)] md:block"
  >
    {STAGES.map((stage, i) => (
      <StageCard key={stage.title} index={i} progress={progress} open={open} lit={hovered === i} onHover={onHover} />
    ))}
  </ul>
);

const lineEnds = (plate: number, card: number, side: 'left' | 'right') => {
  const dir = side === 'right' ? 1 : -1;
  return { plateX: plate + dir * 7, nodeX: card - dir * 10 };
};

const SyntraStageConnector = ({
  plate,
  card,
  y,
  side,
  index,
  main,
  lit,
  active,
  progress,
  className,
}: {
  className?: string;
  plate: number;
  card: number;
  y: number;
  side: 'left' | 'right';
  index: number;
  main: boolean;
  lit: boolean;
  active: boolean;
  progress: MotionValue<number>;
}) => {
  const show = useTransform(progress, [0.55, 0.9], [0, 1]);
  const t = useMotionValue(0);
  const beadX = useTransform(t, k => {
    const ends = lineEnds(plate, card, side);
    return ends.nodeX + (ends.plateX - ends.nodeX) * k;
  });
  const beadOpacity = useTransform([t, show], ([k, s]: number[]) => s * Math.sin(Math.PI * k));
  const { plateX, nodeX } = lineEnds(plate, card, side);

  useEffect(() => {
    if (!active) return;
    const controls = animate(t, [0, 1], {
      duration: STAGE_CARDS.beadSeconds,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 1.4,
      delay: 0.5 + index * 0.25,
    });
    return () => {
      controls.stop();
      t.set(0);
    };
  }, [active, index, t]);

  return (
    <m.svg aria-hidden viewBox={`0 0 ${ARTBOARD} ${ARTBOARD}`} style={{ opacity: show }} className={className}>
      <line x1={plateX} x2={nodeX} y1={y} y2={y} stroke="#D8D4C8" strokeWidth="1" />
      <m.line
        x1={plateX}
        x2={nodeX}
        y1={y}
        y2={y}
        stroke={ORANGE}
        strokeWidth="1.4"
        initial={false}
        animate={{ opacity: lit ? 0.95 : 0 }}
        transition={{ duration: 0.25 }}
      />
      <circle cx={plateX} cy={y} r="2.6" fill="#7E7667" />
      <m.circle
        cx={nodeX}
        cy={y}
        r={main ? 10 : 8}
        fill={ORANGE}
        initial={false}
        animate={{ opacity: lit || main ? 0.25 : 0.12 }}
        transition={{ duration: 0.25 }}
      />
      <circle cx={nodeX} cy={y} r="3.6" fill={ORANGE} />
      <m.circle cx={beadX} cy={y} r="2.8" fill={ORANGE} style={{ opacity: beadOpacity }} />
    </m.svg>
  );
};

const StageConnectors = ({
  progress,
  active,
  hovered,
}: {
  progress: MotionValue<number>;
  active: boolean;
  hovered: number | null;
}) => (
  <div className="pointer-events-none absolute inset-0 hidden md:block">
    {STAGES.map((stage, i) => {
      const { edge, width } = STAGE_CARDS[stage.side];
      const cardEdge = stage.side === 'left' ? (edge + width) * 10 : (100 - edge - width) * 10;
      return (
        <SyntraStageConnector
          key={stage.title}
          plate={tipX(i, stage.side)}
          card={cardEdge}
          y={cornerY(i)}
          side={stage.side}
          index={i}
          main={isMain(stage)}
          lit={hovered === i}
          active={active}
          progress={progress}
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
        />
      );
    })}
  </div>
);

const StageList = ({ reduce }: { reduce: boolean }) => (
  <m.ul
    initial={reduce ? false : { opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
    aria-label="How LabVIEW Architecture Operates"
    className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 text-[13px] sm:grid-cols-2 md:hidden mt-6"
  >
    {STAGES.map((stage, i) => (
      <li key={stage.title} className="n3-stage-card px-[1.05em] py-[0.95em]">
        <StageCardBody index={i} />
      </li>
    ))}
  </m.ul>
);

const ParallaxLayer = ({
  x,
  y,
  reach,
  children,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  reach: number;
  children: ReactNode;
}) => {
  const tx = useTransform(x, v => v * reach);
  const ty = useTransform(y, v => v * reach);
  return (
    <m.div style={{ x: tx, y: ty }} className="pointer-events-none absolute inset-0">
      {children}
    </m.div>
  );
};

const Tilted = ({
  rotateX,
  rotateY,
  children,
}: {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  children: ReactNode;
}) => (
  <div className="pointer-events-none absolute inset-0 [perspective:1400px]">
    <m.div style={{ rotateX, rotateY }} className="absolute inset-0">
      <div className="n3-float absolute inset-0">{children}</div>
    </m.div>
  </div>
);

const CoreVisual = () => {
  const [open, setOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).has('exploded');
    }
    return false;
  });
  const [hovered, setHovered] = useState<number | null>(null);
  const pointerType = useRef('mouse');
  const visualRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const isVisible = useSyncExternalStore(
    onChange => {
      document.addEventListener('visibilitychange', onChange);
      return () => document.removeEventListener('visibilitychange', onChange);
    },
    () => !document.hidden,
    () => true
  );

  const inView = useInView(visualRef, { margin: '200px 0px' });
  const beadsPaused = !isVisible || !inView;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 120, damping: 20 });
  const y = useSpring(py, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(x, [-1, 1], [-MOTION.tiltDegrees, MOTION.tiltDegrees]);
  const rotateX = useTransform(y, [-1, 1], [MOTION.tiltDegrees, -MOTION.tiltDegrees]);

  const targetProgress = open ? 1 : 0;
  const progress = useSpring(targetProgress, EXPLODE.spring);

  useEffect(() => {
    progress.set(targetProgress);
  }, [targetProgress, progress]);

  const restOpacity = useTransform(progress, [0, 0.25], [1, 0]);
  const explodedOpacity = useTransform(progress, [0.05, 0.4], [0, 1]);
  const shadowOpacity = useTransform(progress, [0, 0.5], [1, 0.4]);
  const orbitOpacity = useTransform(progress, [0, 0.6], [1, MOTION.orbitOpenOpacity]);
  const hintOpacity = useTransform(progress, [0, 0.15], [1, 0]);

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const box = visualRef.current?.getBoundingClientRect();
    if (!box) return;
    px.set(((e.clientX - box.left) / box.width - 0.5) * 2);
    py.set(((e.clientY - box.top) / box.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
    setOpen(false);
  };

  const handleCardHover = (index: number | null) => {
    setHovered(index);
    if (index !== null && !reduce) setOpen(true);
  };

  return (
    <LazyMotion features={domAnimation}>
      <>
        <div
          ref={visualRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="n3-enter @container relative -my-[6%] -ml-[10%] aspect-square w-[120%] max-w-none md:mx-auto md:my-0 md:w-full md:max-w-[840px] lg:mx-0 lg:w-[102%] lg:max-w-none"
        >
          <div className="absolute inset-0">
            <div aria-hidden className="n3-halo pointer-events-none absolute inset-[6%]" />

            <div className="n3-fade-edge absolute inset-0">
              <ParallaxLayer x={x} y={y} reach={-MOTION.backdropParallax}>
                <SyntraDepthBackdrop className="absolute inset-0 size-full overflow-visible" />
                <SyntraTechnicalBackdrop className="absolute inset-0 size-full overflow-visible" />
              </ParallaxLayer>
            </div>

            <ParallaxLayer x={x} y={y} reach={MOTION.ringParallax}>
              <m.div style={{ opacity: orbitOpacity }} className="absolute inset-0">
                <SyntraOrbitalSystem className="absolute inset-0 size-full overflow-visible" />
                <SyntraParticles
                  half="back"
                  animate={!reduce}
                  paused={beadsPaused}
                  className="absolute inset-0 size-full overflow-visible"
                />
              </m.div>
            </ParallaxLayer>

            <m.div style={{ opacity: shadowOpacity }} className="absolute inset-0">
              <SyntraCoreShadow className="pointer-events-none absolute inset-0 size-full overflow-visible" />
            </m.div>

            <Tilted rotateX={rotateX} rotateY={rotateY}>
              <m.div style={{ opacity: restOpacity }} className="absolute inset-0">
                <SyntraCoreObject className="absolute inset-0 size-full overflow-visible" />
              </m.div>
              <m.div style={{ opacity: explodedOpacity }} className="absolute inset-0">
                <SyntraExplodedCore progress={progress} className="absolute inset-0 size-full overflow-visible" />
              </m.div>
              <StageConnectors progress={progress} active={open && !reduce} hovered={hovered} />
            </Tilted>

            <ParallaxLayer x={x} y={y} reach={MOTION.ringParallax}>
              <m.div style={{ opacity: orbitOpacity }} className="absolute inset-0">
                <SyntraParticles
                  half="front"
                  animate={!reduce}
                  paused={beadsPaused}
                  className="absolute inset-0 size-full overflow-visible"
                />
              </m.div>
            </ParallaxLayer>

            <Tilted rotateX={rotateX} rotateY={rotateY}>
              <StageCards progress={progress} open={open} hovered={hovered} onHover={handleCardHover} />
            </Tilted>
          </div>

          {/* Invitation Hint */}
          <m.p
            aria-hidden
            style={{ opacity: hintOpacity }}
            className="text-[#74716c] pointer-events-none absolute top-[84%] left-1/2 m-0 flex -translate-x-1/2 items-center gap-1.5 text-[12.5px] whitespace-nowrap"
          >
            <MousePointer2 className="text-[#E7651A] size-3.5" strokeWidth={1.8} />
            <span className="[@media(hover:none)]:hidden">Hover to inspect modular stack</span>
            <span className="hidden [@media(hover:none)]:inline">Tap to inspect modular stack</span>
          </m.p>

          <button
            type="button"
            aria-expanded={open}
            aria-label="Inspect LabVIEW Modular Architecture"
            onPointerDown={e => {
              pointerType.current = e.pointerType;
            }}
            onPointerEnter={e => {
              if (e.pointerType === 'mouse' && !reduce) setOpen(true);
            }}
            onClick={e => {
              if (e.detail === 0 || pointerType.current !== 'mouse') setOpen(v => !v);
            }}
            onBlur={() => setOpen(false)}
            className="focus-visible:outline-[#E7651A] absolute top-[30%] left-[22%] h-[44%] w-[56%] cursor-pointer rounded-[3rem] focus-visible:outline-2 focus-visible:outline-offset-4"
          />
        </div>
        <StageList reduce={reduce} />
      </>
    </LazyMotion>
  );
};

const FlipLabel = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className="n3-flip-box">
    <span className={cn('n3-flip-face', className)}>{children}</span>
    <span aria-hidden className={cn('n3-flip-face n3-flip-back', className)}>
      {children}
    </span>
  </span>
);

const CELL = { w: 84, h: 48 };

const SyntraFloorGrid = ({
  id,
  stroke = '#CBD5E1',
  strokeWidth = 0.8,
  ...props
}: SVGProps<SVGSVGElement> & { id: string; stroke?: string; strokeWidth?: number }) => (
  <svg aria-hidden width="100%" height="100%" {...props}>
    <defs>
      <pattern id={id} width={CELL.w} height={CELL.h} patternUnits="userSpaceOnUse">
        <path
          d={`M0 ${CELL.h / 2}L${CELL.w / 2} 0L${CELL.w} ${CELL.h / 2}M0 ${CELL.h / 2}L${CELL.w / 2} ${CELL.h}L${CELL.w} ${CELL.h / 2}`}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

const SPOT = 340;

const HeroFloor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const litRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const spot = spotRef.current;
    const lit = litRef.current;
    const section = el?.parentElement;

    if (!el || !spot || !lit || !section) return;

    const resize = new ResizeObserver(([entry]) => {
      lit.style.width = `${entry.contentRect.width}px`;
      lit.style.height = `${entry.contentRect.height}px`;
    });
    resize.observe(section);

    let frame = 0;
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = section.getBoundingClientRect();
        const x = e.clientX - box.left - SPOT / 2;
        const y = e.clientY - box.top - SPOT / 2;
        spot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        lit.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
        el.dataset.spot = 'on';
      });
    };

    const handlePointerLeave = () => {
      cancelAnimationFrame(frame);
      el.dataset.spot = 'off';
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
    <div ref={ref} aria-hidden data-spot="off" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <SyntraFloorGrid id="n3-floor-cell" className="n3-floor absolute inset-0" />
      <div ref={spotRef} style={{ width: SPOT, height: SPOT }} className="n3-floor-spot">
        <div ref={litRef} className="n3-floor-lit">
          <SyntraFloorGrid id="n3-floor-cell-lit" stroke="#E7651A" strokeWidth={1} className="block size-full" />
        </div>
      </div>
    </div>
  );
};

const rise = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

export default function LabviewEngineeringHero() {
  const motionVars = {
    '--n3-float': MOTION.floatDistance,
    '--n3-float-seconds': `${MOTION.floatSeconds}s`,
  } as CSSProperties;

  return (
    <div style={motionVars} className="n3-root n3-bg w-full relative overflow-hidden" suppressHydrationWarning>
      <style dangerouslySetInnerHTML={{ __html: BLOCK_CSS }} />
      <section id="top" aria-labelledby="n3-title" className="n3-hero relative isolate overflow-x-clip py-8 lg:py-14">
        <HeroFloor />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-16">

          {/* Left Column: Authentic LabVIEW Engineering Content */}
          <div className="flex flex-col justify-center z-10">
            {/* Headline */}
            <h1 id="n3-title" {...rise(0.18)} className="n3-rise n3-h1 font-black text-[#0B2340] tracking-tight leading-[1.04] mb-6">
              <span className="text-[#E7651A]">LabVIEW</span> <br />
              Application <br />
              Development
            </h1>

            {/* Narrative Description */}
            <p {...rise(0.3)} className="n3-rise text-[#536578] text-base sm:text-lg lg:text-[18px] leading-relaxed font-normal max-w-[32rem] mb-8">
              Design, develop and deploy high-performance LabVIEW applications for test, measurement and automation — from concept to production-ready systems.
            </p>

            {/* Box UI Action Buttons */}
            <div {...rise(0.4)} className="n3-rise flex flex-wrap items-center gap-4">
              <Link
                href="/book"
                className="btn-box !rounded-none"
              >

                <span>DISCUSS YOUR PROJECT</span>
                <ArrowUpRight className="size-4" strokeWidth={2.5} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Isometric Exploded Core Visual */}
          <div className="flex justify-center items-center w-full relative">
            <CoreVisual />
          </div>

        </div>
      </section>
    </div>
  );
}
