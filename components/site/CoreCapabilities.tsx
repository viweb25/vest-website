"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Sparkles,
  Network,
  Rocket,
  Shield,
  Car,
  Zap,
  Activity,
  Wrench,
  LayoutDashboard,
  Lightbulb,
} from "lucide-react";

const capabilitiesData = [
  {
    title: "LOREM IPSUM DOLOR",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    icon: Network,
  },
  {
    title: "CONSECTETUR ADIPISCING",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: Rocket,
  },
  {
    title: "SED DO EIUSMOD",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    icon: Shield,
  },
  {
    title: "TEMPOR INCIDIDUNT",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    icon: Car,
  },
  {
    title: "LABORE ET DOLORE",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    icon: Zap,
  },
  {
    title: "MAGNA ALIQUA UT ENIM",
    description:
      "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    icon: Activity,
  },
  {
    title: "AD MINIM VENIAM",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
    icon: Wrench,
  },
  {
    title: "QUIS NOSTRUD EXERCITATION",
    description:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    icon: LayoutDashboard,
  },
  {
    title: "ULLAMCO LABORIS NISI",
    description:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid.",
    icon: Lightbulb,
  },
];

export default function CoreCapabilities() {
  const firstRow = capabilitiesData.slice(0, 3);
  const secondRow = capabilitiesData.slice(3, 6);
  const thirdRow = capabilitiesData.slice(6, 9);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-300, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [300, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] pt-40 pb-40 overflow-hidden antialiased relative flex flex-col self-auto bg-white"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="[perspective:1000px]"
      >
        <motion.div
          className="flex flex-row-reverse space-x-reverse space-x-20 mb-[88px]"
        >
          {[...firstRow, ...firstRow, ...firstRow].map((cap, i) => (
            <CapabilityCard
              capability={cap}
              translate={translateX}
              key={`first-${i}`}
            />
          ))}
        </motion.div>
        <motion.div
          className="flex flex-row mb-[88px] space-x-20"
        >
          {[...secondRow, ...secondRow, ...secondRow].map((cap, i) => (
            <CapabilityCard
              capability={cap}
              translate={translateXReverse}
              key={`second-${i}`}
            />
          ))}
        </motion.div>
        <motion.div
          className="flex flex-row-reverse space-x-reverse space-x-20"
        >
          {[...thirdRow, ...thirdRow, ...thirdRow].map((cap, i) => (
            <CapabilityCard
              capability={cap}
              translate={translateX}
              key={`third-${i}`}
            />
          ))}
        </motion.div>
      </motion.div>
      <style jsx global>{`
        @keyframes gradient {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
}

export const Header = () => {
  return (
    <div
      className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0"
      style={{ paddingTop: "1vh", paddingLeft: "15vh", marginBottom: "55px" }}
    >
      <SectionHeader
        eyebrow="Core Features"
        title={<>LOREM IPSUM<br />DOLOR SIT</>}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />

      {/* Meta row */}
      <div
        className="flex items-center text-[11px] uppercase text-slate-400 font-bold"
        style={{ gap: "18px", marginTop: "40px", letterSpacing: "0.28em" }}
      >
        <span>Feature One</span>
        <span aria-hidden style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#f97316" }} />
        <span>Feature Two</span>
        <span aria-hidden style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#f97316" }} />
        <span>Feature Three</span>
      </div>
    </div>
  );
};

export const CapabilityCard = ({
  capability,
  translate,
}: {
  capability: {
    title: string;
    description: string;
    icon: React.ElementType;
  };
  translate: MotionValue<number>;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Offset by half of cursor width/height to center it (approx 50px width, 20px height)
    mouseX.set(e.clientX - rect.left - 50);
    mouseY.set(e.clientY - rect.top - 20);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        x: translate,
        boxShadow:
          "0 30px 80px -30px rgba(0,0,0,0.15), 0 0 0 1px rgba(249,115,22,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product h-80 w-[22rem] relative flex-shrink-0 overflow-hidden rounded-[24px] bg-slate-50 border border-slate-200 p-8 flex flex-col justify-between cursor-none"
    >
      {/* Background watermark icon */}
      <div className="absolute right-[-10%] bottom-[-10%] text-slate-200 transform -rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110 pointer-events-none">
        <capability.icon strokeWidth={1} size={200} />
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 mb-6 shadow-sm border border-orange-200 group-hover/product:scale-110 transition-transform duration-300">
            <capability.icon size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 leading-snug mb-3">
            {capability.title}
          </h2>
        </div>
        <p className="text-sm font-medium text-slate-600 leading-relaxed line-clamp-4">
          {capability.description}
        </p>
      </div>

      {/* Subtle hover gradient */}
      <div
        className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background: "linear-gradient(to top right, rgba(249,115,22,0.05), transparent)",
        }}
      />

      {/* Custom Floating Cursor */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-50 flex h-10 px-4 items-center justify-center gap-1.5 rounded-full bg-orange-500 text-white shadow-xl whitespace-nowrap"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <span className="font-bold text-[11px] uppercase tracking-wider">
          View
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      </motion.div>
    </motion.div>
  );
};