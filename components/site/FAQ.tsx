'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const categories = [
  { id: 'general', name: 'General', number: '01' },
  { id: 'websites', name: 'Websites', number: '02' },
  { id: 'marketing', name: 'Marketing', number: '03' },
  { id: 'support', name: 'Support', number: '04' },
];

const faqs = [
  {
    question: "Lorem ipsum dolor sit amet consectetur?",
    answer: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
  },
  {
    question: "Sed do eiusmod tempor incididunt ut labore?",
    answer: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    question: "Nemo enim ipsam voluptatem quia voluptas?",
    answer: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora."
  },
  {
    question: "Ut enim ad minima veniam, quis nostrum?",
    answer: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem."
  },
  {
    question: "Nam libero tempore, cum soluta nobis est eligendi?",
    answer: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus."
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('general');

  return (
    <section id="faq" className="relative pt-20 md:pt-32 pb-24 md:pb-32 bg-[#fdfdfb] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
        
        {/* Left Column: Header & Categories */}
        <div className="flex flex-col">
          <p className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-6">
            Lorem Ipsum
          </p>
          {/* User requested heading full black */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-[1.1] tracking-tight mb-8">
            Dolor Sit Amet.
          </h2>
          <p className="text-[15px] text-slate-600 leading-relaxed max-w-md">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
          </p>

          {/* Categories Sidebar */}
          <div className="hidden lg:flex flex-col mt-16 pl-6 relative">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200/60" />
            
            {/* Active Indicator Line */}
            <motion.div 
              className="absolute left-0 w-[2px] bg-black"
              layoutId="activeCategoryIndicator"
              initial={false}
              animate={{
                top: `${categories.findIndex(c => c.id === activeCategory) * 64}px`,
                height: '24px'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <div className="flex flex-col gap-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-4 text-left transition-colors h-6 ${
                    activeCategory === cat.id ? 'text-black' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className={`text-[11px] font-mono tracking-widest ${
                    activeCategory === cat.id ? 'text-black' : 'text-slate-400'
                  }`}>
                    {cat.number}
                  </span>
                  <span className={`text-[15px] font-semibold ${
                    activeCategory === cat.id ? 'font-bold' : ''
                  }`}>
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column: Accordion */}
        <div className="flex flex-col pt-2 lg:pt-8">
          <div className="w-full border-t border-slate-200/60" />
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-b border-slate-200/60"
              >
                <AccordionTrigger className="hover:no-underline py-6 md:py-8 group">
                  <div className="flex items-start gap-4 md:gap-6 w-full text-left">
                    <span className="text-[11px] md:text-xs font-mono text-slate-400 shrink-0 mt-1.5 transition-colors group-hover:text-black">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-lg md:text-[1.15rem] font-semibold text-slate-900 leading-snug group-hover:text-black transition-colors">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-[15px] md:text-base leading-relaxed pb-8 pl-9 md:pl-12 pr-6 md:pr-12">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
      </div>
    </section>
  );
}
