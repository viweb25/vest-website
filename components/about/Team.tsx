"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { Twitter, Linkedin, Github } from 'lucide-react';

const teamMembers = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
  },
  {
    name: "Sarah Chen",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
  },
  {
    name: "Marcus Johnson",
    role: "Lead Engineer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80",
  },
  {
    name: "Elena Rodriguez",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
  },
];

export default function Team() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section className="py-24 relative z-10 bg-[#FAFAFA]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            eyebrow="OUR TEAM"
            title="Built by People Who Care."
            description="We are a diverse group of passionate thinkers and makers. Our strength lies in our collaboration and our shared commitment to pushing the boundaries of what's possible."
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
          >
            {teamMembers.map((member, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-slate-200">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#2563EB] transition-colors translate-y-4 group-hover:translate-y-0 duration-300 delay-100">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#2563EB] transition-colors translate-y-4 group-hover:translate-y-0 duration-300 delay-150">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#2563EB] transition-colors translate-y-4 group-hover:translate-y-0 duration-300 delay-200">
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-slate-500 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
