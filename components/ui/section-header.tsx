import React from 'react';
import { Sparkles } from 'lucide-react';
import { ShimmerText } from '@/components/ui/shimmer-text';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  dark?: boolean; // if true, title is text-white, desc is lighter
  smallTitle?: boolean; // if true, renders a smaller title
  titleClassName?: string;
}

export function SectionHeader({ eyebrow, title, description, className, dark, smallTitle, titleClassName }: SectionHeaderProps) {
  return (
    <motion.div 
      className={cn("mb-16", className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 shadow-sm",
        dark ? "bg-white/10 border-white/20" : "bg-[#e6f4f1] border-[#b8dfd8]"
      )}>
        <Sparkles className={cn("w-3.5 h-3.5", dark ? "text-cyan-400" : "text-[#0a2540]")} strokeWidth={2.5} />
        <span className={cn(
          "text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase",
          dark ? "text-cyan-100" : "text-[#0a2540]"
        )}>
          {eyebrow}
        </span>
      </div>

      <h2
        className={cn("font-black uppercase mb-9", dark ? "text-white" : "text-black", titleClassName)}
        style={{
          fontSize: smallTitle ? "clamp(1.5rem, 3.5vw, 3rem)" : "clamp(2rem, 5vw, 4.25rem)",
          lineHeight: 0.98,
          letterSpacing: "-0.035em",
          WebkitTextStroke: smallTitle ? "1px currentColor" : "2px currentColor",
        }}
      >
        {title}
      </h2>

      {description && (
        <ShimmerText
          className={cn(
            "text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.8] tracking-[0.005em] font-medium max-w-[64ch]",
            className?.includes("text-center") ? "mx-auto" : ""
          )}
          style={{
            color: dark ? "#94a3b8" : "#475569",
            opacity: 1,
          }}
        >
          {description}
        </ShimmerText>
      )}
    </motion.div>
  );
}
