"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const locations = [
  {
    id: 'mexico',
    name: "Mexico Office (Primary)",
    address: "Arroz #6734, Granjero\nCiudad Juárez, Chihuahua 32690, MX",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113032.55396568285!2d-106.505089!3d31.690363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e75ce452934eb1%3A0xc48c0db1b8ed64dc!2sCiudad%20Ju%C3%A1rez%2C%20Chih.%2C%20Mexico!5e0!3m2!1sen!2sin!4v1682522123456!5m2!1sen!2sin"
  },
  {
    id: 'us',
    name: "US Office",
    address: "7080 Columbia Gateway Dr\nColumbia, Maryland (MD) 21046-2132, US",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3096.533663673322!2d-76.80491062345233!3d39.179122327092925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7dfb36e0d9b4b%3A0xa64b38bf42c16a8d!2s7080%20Columbia%20Gateway%20Dr%2C%20Columbia%2C%20MD%2021046%2C%20USA!5e0!3m2!1sen!2sin!4v1682522123456!5m2!1sen!2sin"
  },
  {
    id: 'canada',
    name: "Canada Office",
    address: "2600B John St\nMarkham, Ontario (ON) L3R 3W3, CA",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.5724574971353!2d-79.3512399234125!3d43.82319062391039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d30e527f4f65%3A0x6b106bf41481b7e6!2s2600%20John%20St%20%23B%2C%20Markham%2C%20ON%20L3R%203W3%2C%20Canada!5e0!3m2!1sen!2sin!4v1682522123456!5m2!1sen!2sin"
  },
  {
    id: 'india',
    name: "India Office",
    address: "Anthanathan Nagar, Mannivakkam\nChennai, Tamilnadu 600048, IN",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.704207908865!2d80.08119852341512!3d12.868846618585461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f63f5b72223b%3A0xa9db53513364f84c!2sMannivakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1682522123456!5m2!1sen!2sin"
  }
];

export default function ContactMap() {
  const [activeLocation, setActiveLocation] = useState(locations[0]);

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
              <h3 className="text-xl font-black tracking-tight mb-6 uppercase text-[#0B2540]">Our Offices</h3>
              
              <div className="space-y-4 mb-8">
                {locations.map((loc) => (
                  <div 
                    key={loc.id}
                    onClick={() => setActiveLocation(loc)}
                    className={`cursor-pointer p-4 rounded-xl transition-all border ${
                      activeLocation.id === loc.id 
                        ? 'border-[#1D79C5] bg-[#E8F3FA]/50 shadow-sm' 
                        : 'border-transparent hover:bg-zinc-50'
                    }`}
                  >
                    <h4 className="font-bold text-[#0B2540] mb-1">{loc.name}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{loc.address}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-zinc-100 pt-6 px-4">
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-[#1D79C5]" />
                  <div className="flex flex-col">
                    <span className="font-bold tracking-wide text-sm text-[#0B2540]">IN: +91 8886711810</span>
                    <span className="font-bold tracking-wide text-sm text-[#0B2540]">MX: +52 6562967976</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-[#1D79C5]" />
                  <span className="font-bold tracking-wide text-[#0B2540]">info@vestsolution.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="lg:w-2/3 h-[500px] lg:h-auto bg-zinc-100 relative">
            <iframe
              title={`Google Map - ${activeLocation.name}`}
              src={activeLocation.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale-[20%] contrast-125 opacity-90 transition-opacity duration-500"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
