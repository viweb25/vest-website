'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeader } from '@/components/ui/section-header';

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        
        {/* Animated Header & Description */}
        <SectionHeader 
          eyebrow="Lorem Ipsum"
          title="Dolor Sit Amet"
          description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
          className="text-center flex flex-col items-center"
        />
        
        {/* Animated Accordion List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div variants={itemVariants} key={index}>
                <AccordionItem value={`item-${index}`} className="border-b border-slate-200 py-3">
                  <AccordionTrigger className="text-left text-[1.15rem] md:text-[1.25rem] font-bold text-slate-900 hover:text-[#f97316] transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 text-[1.05rem] md:text-[1.1rem] leading-relaxed pb-6 pr-4 md:pr-10">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        
      </div>
    </section>
  );
}
