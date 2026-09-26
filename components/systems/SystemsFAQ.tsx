'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ_DATA = [
  {
    q: "Do you offer on-site support and commissioning?",
    a: "Yes. While much of our development and simulation is done in-house or remotely, we frequently travel for on-site commissioning, hardware integration, and operator training across the USA, Canada, Mexico, and Europe."
  },
  {
    q: "Can you maintain and upgrade legacy LabVIEW applications?",
    a: "Absolutely. A significant portion of our work involves taking over legacy LabVIEW systems, refactoring undocumented code, upgrading it to modern frameworks (like Actor Framework or DQMH), and migrating it to newer hardware."
  },
  {
    q: "What PLC brands do your engineers specialize in?",
    a: "Our team has extensive experience across the major industrial ecosystems, primarily Siemens (TIA Portal), Allen-Bradley / Rockwell Automation (Studio 5000), Mitsubishi, Omron, and Schneider Electric."
  },
  {
    q: "How does the pricing model work for engineering support?",
    a: "We avoid one-size-fits-all fixed prices because every system is unique. We typically quote based on a Per-Day Engineering rate after defining the exact scope of work, timeline, and deliverables with you."
  },
  {
    q: "Do you integrate AI with existing factory data?",
    a: "Yes. We specialize in adding 'Intelligent Automation' layers to existing systems. This involves pulling data from PLCs or DAQ systems, applying machine learning models for predictive maintenance or anomaly detection, and pushing actionable insights to your dashboard or SCADA."
  }
];

export default function SystemsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-24 md:py-32 bg-[#fafcfc] relative overflow-hidden border-t border-zinc-100">
      <div className="relative z-10 max-w-[1000px] mx-auto px-6 sm:px-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#0b2027] tracking-tight leading-tight">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === i ? 'border-[#0e7c86] bg-white shadow-sm' : 'border-zinc-200 bg-white hover:border-[#0e7c86]/50'}`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <span className={`text-lg md:text-xl font-bold pr-8 transition-colors ${openIndex === i ? 'text-[#0b2027]' : 'text-[#0b2027]/80'}`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-[#0e7c86] text-white' : 'bg-[#f4f4f5] text-[#0b2027]'}`}>
                  {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 md:px-8 pb-8 text-[#44616b] text-lg leading-relaxed border-t border-zinc-100 pt-6">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
