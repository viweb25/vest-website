"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const IMAGES = [
  {
    src: "https://cdn.21st.dev/assets/mirror/c3/c3fbd2afa140223999a441b32ed986f61d473930002708df805a81532a326aac.jpg",
    title: "Chroma I",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/9d/9d8b2f675a5814476ada3736ce439bcda23c5c389e0ebf9b25d8a0c09f3bbcfe.jpg",
    title: "Prism III",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/8b/8bb738bf2f00d7f7ed3c3ec034adb9938ad38f4be4ac191d632a6a11ad525574.jpg",
    title: "Ether IV",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/ac/ac5ac700b188d7ef16ee9dab868098b59f15c440db3f71d4e8c03262a3287577.jpg",
    title: "Quantum V",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/ef/ef25eff6ce655fba459b3b7e7711524dc92499aa18f6c7dbea9a0fcc56a8f908.jpg",
    title: "Nebula VI",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/f2/f28b370a5dcbf76240f1504579c4b05fc0ff0bb990a42aff8dc2f73a5dc46072.jpg",
    title: "Cyber VII",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/f2/f26a1eac85704dda924820392dedfb72d51d8261d35354f83b35d683617295f3.jpg",
    title: "Flux VIII",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/77/7755d23eaaa0aa5b403343f44afa7a29b2d06d3065fe54c602b14ba01d00f2aa.jpg",
    title: "Aether IX",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/65/657317761fe9058a1d43711b13c543a71eb5199b7a5d9abf4c28479674e39cf7.jpg",
    title: "Chroma X",
  },
];

interface TunnelCardData {
  item: { src: string; title: string };
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
}

const TUNNEL_CARDS: TunnelCardData[] = IMAGES.map((item, i) => {
  const goldenAngle = i * 137.5 * (Math.PI / 180);
  const radiusFactorX = 0.28 + (i % 3) * 0.08;
  const radiusFactorY = 0.26 + (i % 2) * 0.09;

  return {
    item,
    angleCos: Math.cos(goldenAngle),
    angleSin: Math.sin(goldenAngle),
    radiusFactorX,
    radiusFactorY,
    rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
    index: i,
  };
});

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

interface TunnelCardProps {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
  const staggerSpan = 0.60;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;

  const localProgress = useTransform(progress, [start, end], [0, 1]);

  const farZ = stage.isMobile ? -1400 : -1900;
  const nearZ = stage.isMobile ? 380 : 550;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

  // Ensure cards in the distance are visible initially so the scene never looks empty
  const opacity = useTransform(
    localProgress,
    [0, 0.08, 0.82, 0.98],
    [0.55, 1, 1, 0]
  );

  const cardWidth = stage.isMobile
    ? Math.max(130, Math.min(180, stage.width * 0.38))
    : Math.max(180, Math.min(270, stage.width * 0.18));

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 20 : 45;

  const transform = useTransform(
    [z, pointer.x, pointer.y],
    ([currZ, px, py]: number[]) => {
      const offsetX = baseX - px * panStrength;
      const offsetY = baseY - py * panStrength;
      return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
    }
  );

  return (
    <motion.div
      style={{
        width: cardWidth,
        transform,
        opacity,
        zIndex: card.index + 1,
      }}
      className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform select-none cursor-pointer"
    >
      <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl shadow-[#0B2340]/10 ring-1 ring-[#0B2340]/10 transition-all duration-500 hover:ring-[#E7651A]/80 hover:shadow-[0_16px_40px_rgba(231,101,26,0.25)]">
        <img
          src={card.item.src}
          alt={card.item.title}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4 sm:p-5">
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white font-bold drop-shadow-md">
            {card.item.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [stage, setStage] = useState<StageDimensions>({
    width: 1440,
    height: 900,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Natural page scroll linked to the pinned container track (zero scroll hijacking or wheel lock)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 28,
    restDelta: 0.0005,
  });

  const pointer = useCameraParallax(!reduce);

  // Initial title starts crisp with full opacity and scales gracefully as you fly through
  const titleScale = useTransform(smoothProgress, [0, 0.45, 0.9], [1, 1.25, 1.55]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.15, 0.55, 0.8], [1, 1, 0.35, 0]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[260vh] w-full bg-white">
      {/* Pinned Viewport Container */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-white text-[#0B2340] select-none flex items-center justify-center"
        style={{
          perspective: stage.isMobile ? "900px" : "1300px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Soft Ambient Depth - Pure White Without Dots */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(231,101,26,0.04)_0%,transparent_70%)]" />

        {/* Depth Ring Guides */}
        <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-[#E7651A]/20" />
        <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-[#0B2340]/10" />

        {/* Central Anchor Typography */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="pointer-events-none z-0 flex flex-col items-center text-center px-6 max-w-xl"
        >
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-[#E7651A] font-bold mb-4">
            Warp Drive Sequence
          </p>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-[#0B2340]">
            INTO THE
            <br />
            ETHER.
          </h2>
          <p className="mt-4 max-w-[36ch] text-sm sm:text-base font-normal text-[#536578]">
            Scroll your trackpad or mouse wheel to fly through the spatial 3D corridor.
          </p>
        </motion.div>

        {/* Scroll Prompt */}
        <motion.div
          style={{ opacity: promptOpacity }}
          className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#536578]"
        >
          <span className="font-semibold text-[11px] tracking-[0.25em]">Scroll to Explore</span>
          <div className="h-6 w-px bg-gradient-to-b from-[#E7651A] to-transparent" />
        </motion.div>

        {/* 3D Z-Space Plane */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {TUNNEL_CARDS.map((card, i) => (
            <TunnelCard
              key={i}
              card={card}
              progress={smoothProgress}
              pointer={pointer}
              total={TUNNEL_CARDS.length}
              stage={stage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
