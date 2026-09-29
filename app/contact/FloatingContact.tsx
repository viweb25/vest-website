"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="flex flex-col gap-3 mb-2 origin-bottom"
              >
                <a href="https://wa.me/917043084455" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                  <span className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-zinc-100 text-xs font-bold text-[#0B2540] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Chat on WhatsApp
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                  </div>
                </a>
                
                <a href="tel:+917043084455" className="group flex items-center gap-3">
                  <span className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-zinc-100 text-xs font-bold text-[#0B2540] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Call Us
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#1D79C5] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                </a>

                <a href="mailto:info@company.com" className="group flex items-center gap-3">
                  <span className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-zinc-100 text-xs font-bold text-[#0B2540] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Send Email
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#0B2540] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 bg-[#F2670E] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow hover:scale-105 active:scale-95"
            aria-label="Contact Options"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
