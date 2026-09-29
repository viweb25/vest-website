"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

interface Phase {
  step: string;
  title: string;
  category: string;
  desc: string;
  icon: React.ElementType;
  tag: string;
  metric: string;
  tempId?: number;
}

interface PhaseCardProps {
  position: number;
  phase: Phase;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const PhaseCard: React.FC<PhaseCardProps> = ({
  position,
  phase,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;
  const Icon = phase.icon;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out flex flex-col justify-between",
        isCenter
          ? "z-10 bg-slate-950 text-white border-slate-900 shadow-2xl"
          : "z-0 bg-white text-slate-900 border-slate-200 hover:border-[#0066FF]/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(15, 23, 42, 0.1)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn("absolute block origin-top-right rotate-45 z-20", isCenter ? "bg-slate-800" : "bg-slate-200")}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />

      {/* Large Background Number */}
      <div className={cn(
        "absolute right-2 bottom-12 text-[140px] font-black leading-none tracking-tighter pointer-events-none select-none z-0",
        isCenter ? "text-white/[0.05]" : "text-slate-900/[0.03]"
      )}>
        {phase.step}
      </div>

      <div className="relative z-10">


        <div className={cn("flex items-center mb-6 transition-colors",
          isCenter ? "text-white" : "text-slate-400"
        )}>
          {Icon && <Icon className="w-8 h-8 stroke-[2]" />}
        </div>

        <h3 className={cn("text-xl sm:text-2xl font-black mb-3 tracking-tight uppercase",
          isCenter ? "text-white" : "text-slate-950"
        )}>
          {phase.title}
        </h3>

        <p className={cn("text-sm leading-relaxed font-normal",
          isCenter ? "text-slate-300" : "text-slate-500"
        )}>
          {phase.desc}
        </p>
      </div>

      <div className={cn("pt-4 mt-6 border-t flex items-center justify-between relative z-10",
        isCenter ? "border-slate-800" : "border-slate-100"
      )}>
        <span className={cn("text-[11px] font-medium font-mono",
          isCenter ? "text-sky-300" : "text-slate-500"
        )}>
          {phase.metric}
        </span>
      </div>
    </div>
  );
};

export const StaggerPhases: React.FC<{ phases: Phase[] }> = ({ phases }) => {
  const [cardSize, setCardSize] = useState(365);
  // Add tempId to initial items to match the move logic
  const [phasesList, setPhasesList] = useState(() =>
    phases.map(p => ({ ...p, tempId: Math.random() }))
  );

  const handleMove = (steps: number) => {
    const newList = [...phasesList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setPhasesList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent py-10"
      style={{ height: 600 }}
    >
      {phasesList.map((phase, index) => {
        const position = phasesList.length % 2
          ? index - (phasesList.length - 1) / 2
          : index - phasesList.length / 2;
        return (
          <PhaseCard
            key={phase.tempId}
            phase={phase}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors rounded-full",
            "bg-white border-2 border-slate-200 hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          )}
          aria-label="Previous phase"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors rounded-full",
            "bg-white border-2 border-slate-200 hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          )}
          aria-label="Next phase"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
