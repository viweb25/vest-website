"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function ContactMap() {
  return (
    <section id="contact-map" className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 mt-24 mb-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-sm font-bold tracking-[0.1em] uppercase text-zinc-400 mb-2 text-center md:text-left">Find Us</h2>
        <p className="text-[#0B2540] font-black text-3xl md:text-4xl tracking-tight mb-8 text-center md:text-left">
          Visit us or connect with our team.
        </p>

        <div className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm overflow-hidden flex flex-col lg:flex-row">
          
          {/* Side Panel */}
          <div className="lg:w-1/3 bg-white p-8 md:p-12 text-[#0B2540] flex flex-col justify-between border-r border-zinc-200">
            <div>
              <div className="w-12 h-12 bg-[#E8F3FA] rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-[#1D79C5]" />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-2 uppercase text-[#0B2540]">COMPANY HQ</h3>
              <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                123 Engineering Park, Tech Zone<br />
                Bengaluru, Karnataka 560001<br />
                India
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-[#1D79C5]" />
                  <span className="font-bold tracking-wide text-[#0B2540]">+91 704 308 4455</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-[#1D79C5]" />
                  <span className="font-bold tracking-wide text-[#0B2540]">info@company.com</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <a 
                href="https://maps.google.com/?q=Bengaluru" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-full text-sm font-bold tracking-wider text-[#0B2540]"
              >
                GET DIRECTIONS <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Map Container */}
          <div className="lg:w-2/3 h-[400px] lg:h-auto bg-zinc-100 relative">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001696423075!2d77.5912997153383!3d12.971598690855848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1682522123456!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale-[20%] contrast-125 opacity-90"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
