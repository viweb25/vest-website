"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
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
    title: "LABVIEW AI CORE INTEGRATION",
    description:
      "Embed ONNX & OpenVINO neural networks directly into LabVIEW VIs running on NI PXI and cRIO — zero external runtime required.",
    icon: Network,
  },
  {
    title: "AEROSPACE AI TESTING",
    description:
      "Satellite telemetry analysis, propulsion test automation, and real-time predictive maintenance with AI on NI PXI hardware.",
    icon: Rocket,
  },
  {
    title: "DEFENCE HIL/SIL AI",
    description:
      "MIL-STD compliant Hardware-in-the-Loop simulation with radar signal classification and ATR AI algorithms on cRIO.",
    icon: Shield,
  },
  {
    title: "AUTOMOTIVE BMS & ADAS AI",
    description:
      "Deep learning for EV battery management, ADAS validation pipelines, and ECU functional test with CAN-bus data ingestion.",
    icon: Car,
  },
  {
    title: "REAL-TIME AI INFERENCE",
    description:
      "Deploy deterministic neural inference at hardware cycle rates on NI FPGA and Real-Time OS — no cloud dependency.",
    icon: Zap,
  },
  {
    title: "SIGNAL CLASSIFICATION AI",
    description:
      "Real-time FFT, radar, and vibration signal classification using neural networks integrated within LabVIEW measurement loops.",
    icon: Activity,
  },
  {
    title: "PREDICTIVE MAINTENANCE AI",
    description:
      "Vibration, thermal, and acoustic signal AI for uptime maximisation across aerospace, defence, and automotive test rigs.",
    icon: Wrench,
  },
  {
    title: "AI-ENHANCED SCADA & HMI",
    description:
      "Industrial supervisory control with AI anomaly detection and live intelligence dashboards built inside LabVIEW.",
    icon: LayoutDashboard,
  },
  {
    title: "LABVIEW AI CONSULTING",
    description:
      "Architecture review, model selection, and integration roadmap — we map exactly where AI fits your existing LabVIEW system.",
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
      className="h-[300vh] pt-40 pb-0 overflow-hidden antialiased relative flex flex-col self-auto bg-white"
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
      {/* Eyebrow / kicker */}
      <div
        className="flex items-center text-[11px] uppercase text-orange-600 font-bold"
        style={{ gap: "14px", marginBottom: "28px", letterSpacing: "0.32em" }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "48px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(249,115,22,0.9))",
          }}
        />
        <Sparkles className="w-4 h-4 text-orange-500" strokeWidth={2.5} />
        <span>Core Capabilities</span>
      </div>

      {/* Title */}
      <h1
        className="font-black dark:text-slate-900 uppercase text-slate-900"
        style={{
          fontSize: "clamp(2.25rem, 6.4vw, 5.75rem)",
          lineHeight: 0.98,
          letterSpacing: "-0.035em",
          marginBottom: "36px",
        }}
      >
        VI WEBSYNC
        <br />
        ENGINEERING
      </h1>

      {/* Hairline divider */}
      <div
        aria-hidden
        style={{
          width: "84px",
          height: "1px",
          marginBottom: "32px",
          background:
            "linear-gradient(90deg, rgba(249,115,22,0.55), rgba(249,115,22,0))",
        }}
      />

      {/* Body copy */}
      <p
        style={{
          maxWidth: "64ch",
          fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)",
          lineHeight: 1.8,
          letterSpacing: "0.005em",
          color: "#475569",
          opacity: 1,
          fontWeight: 500,
        }}
      >
        High-performance integration of LabVIEW and Artificial Intelligence
        tailored for high-stakes Aerospace, Defense, and Automotive environments.
      </p>

      {/* Meta row */}
      <div
        className="flex items-center text-[11px] uppercase text-slate-400 font-bold"
        style={{ gap: "18px", marginTop: "40px", letterSpacing: "0.28em" }}
      >
        <span>NI PXI / cRIO</span>
        <span aria-hidden style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#f97316" }} />
        <span>Hardware-in-the-Loop</span>
        <span aria-hidden style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#f97316" }} />
        <span>Scroll to explore</span>
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
  return (
    <motion.div
      style={{
        x: translate,
        boxShadow:
          "0 30px 80px -30px rgba(0,0,0,0.15), 0 0 0 1px rgba(249,115,22,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product h-80 w-[22rem] relative flex-shrink-0 overflow-hidden rounded-[24px] bg-slate-50 border border-slate-200 p-8 flex flex-col justify-between"
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
    </motion.div>
  );
};
