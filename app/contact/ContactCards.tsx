"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Check, Copy } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className="inline-flex items-center justify-center p-1 rounded hover:bg-slate-100 text-[#1D79C5] hover:text-[#0B2540] transition-colors"
      title={copied ? "Copied!" : `Copy ${label}`}
      aria-label={`Copy ${label}`}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}

export default function ContactCards() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-sm font-bold tracking-[0.1em] uppercase text-zinc-400 mb-2">Let's Talk</h2>
        <p className="text-[#0B2540] font-bold text-2xl md:text-3xl tracking-tight mb-8">
          Whether you're starting a new project, looking for technical support, or exploring a partnership, we're here to help.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {/* Phone */}
        <motion.div variants={cardVariants} className="group p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E8F3FA] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-5 h-5 text-[#1D79C5]" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Phone</div>
              <div className="text-[#0B2540] font-bold text-base mb-1 flex items-center gap-2">
                <span className="w-6 text-slate-400 text-sm">IN</span> +91 8886711810
                <CopyButton text="+918886711810" label="phone number" />
              </div>
              <div className="text-[#0B2540] font-bold text-base mb-3 flex items-center gap-2">
                <span className="w-6 text-slate-400 text-sm">MX</span> +52 6562967976
                <CopyButton text="+526562967976" label="phone number" />
              </div>
              <div className="flex items-center gap-4">
                <a href="tel:+918886711810" className="text-xs font-bold text-slate-500 hover:text-[#0B2540] transition-colors">CALL US →</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Email */}
        <motion.div variants={cardVariants} className="group p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E8F3FA] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-5 h-5 text-[#1D79C5]" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Email</div>
              <div className="text-[#0B2540] font-black text-lg mb-3 break-all flex items-center gap-2">
                info@vestsolution.com
                <CopyButton text="info@vestsolution.com" label="email address" />
              </div>
              <div className="flex items-center gap-4">
                <a href="mailto:info@vestsolution.com" className="text-xs font-bold text-slate-500 hover:text-[#0B2540] transition-colors">SEND EMAIL →</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* WhatsApp */}
        <motion.div variants={cardVariants} className="group p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6 text-[#25D366]" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">WhatsApp</div>
              <div className="text-[#0B2540] font-black text-lg mb-1">Chat with us instantly</div>
              <p className="text-xs text-slate-500 mb-4">Quick technical response</p>
              <a 
                href="https://wa.me/918886711810" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:text-white transition-colors"
              >
                CHAT ON WHATSAPP →
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
