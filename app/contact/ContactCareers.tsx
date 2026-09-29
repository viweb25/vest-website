"use client";

import React from "react";
import { motion } from "framer-motion";
import { UploadCloud, Users } from "lucide-react";
import Link from "next/link";

export default function ContactCareers() {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] bg-[#0B2540] px-8 py-12 md:px-16 md:py-14 flex flex-col md:flex-row items-center justify-between gap-10"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "28px 28px",
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#F2670E] rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.16, 0.08] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute -bottom-16 -left-16 w-[300px] h-[300px] bg-[#1D79C5] rounded-full blur-3xl"
            />
          </div>

          {/* Left content */}
          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-5">
              <Users className="w-3.5 h-3.5 text-[#F2670E]" strokeWidth={2.5} />
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/80">
                WE'RE HIRING
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
              Want to join our team?
            </h2>
            <p className="text-white/60 font-medium text-base max-w-xl leading-relaxed">
              We're looking for engineers, developers and automation specialists who love solving real-world problems. Drop your resume and we'll keep you in mind for our next opening.
            </p>
          </div>

          {/* Right CTA buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-4 shrink-0">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 border border-white/40 text-white font-bold text-[15px] hover:text-[#F2670E] hover:border-[#F2670E] hover:-translate-y-0.5 transition-all"
            >
              <UploadCloud className="w-4 h-4" />
              Send Your Resume
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 border border-white/40 text-white font-bold text-[15px] hover:text-[#F2670E] hover:border-[#F2670E] hover:-translate-y-0.5 transition-all"
            >
              View Open Roles
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
