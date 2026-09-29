'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { useLenis } from '@/hooks/use-lenis';
import { StaggerPhases } from '@/components/ui/stagger-phases';
import { ShimmerText } from '@/components/ui/shimmer-text';
import { ArrowRight, ChevronRight, ChevronLeft, Check, FileText } from 'lucide-react';
import { ServiceHero } from '@/components/engineering-services/ServiceHero';

// Add the Hero for Civil Engineering separately if needed, but since it's just a different image and text,
// ServiceHero can handle it if we add 'civil-engineering' to `engineeringMockData.ts`.
// Alternatively, we can inline the hero here, or use the data directly in this template.

export interface ServicePageData {
  slug: string;
  overview: {
    title: string;
    description: string;
    features: { icon: any, title: string, subtitle: string }[];
  };
  servicesTitle: string;
  servicesDesc: string;
  services: {
    id: string;
    title: string;
    icon: any;
    image: string;
    heading: string;
    desc: string;
    features: { name: string, icon: any }[];
  }[];
  serviceMeta: Record<string, { type: string, ref: string, status: string, rev: string, shortTitle: string }>;
  workflowTitle: string;
  workflowDesc: string;
  workflow: any[];
  galleryTitle: string;
  projects: any[];
  ctaTitle: string;
  ctaDesc: string;
}

export function ServicePageTemplate({ data }: { data: ServicePageData }) {
  useLenis();

  return (
    <div className="min-h-screen bg-[#f8fbff] dark:bg-[#000000] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#0e7c86]/20 selection:text-[#0b2027]">
      <Navbar />
      
      <main className="flex flex-col relative z-10 overflow-hidden bg-white">
        {/* Render hero component if it relies on slug */}
        {data.slug === 'civil-engineering' ? (
          <HeroFallback data={data} />
        ) : (
          <ServiceHero serviceId={data.slug as any} />
        )}
        
        <OverviewSection overview={data.overview} />
        <ServicesSection 
          servicesTitle={data.servicesTitle}
          servicesDesc={data.servicesDesc}
          services={data.services} 
          serviceMeta={data.serviceMeta} 
        />
        <WorkflowSection workflowTitle={data.workflowTitle} workflowDesc={data.workflowDesc} workflow={data.workflow} />
        <GallerySection galleryTitle={data.galleryTitle} projects={data.projects} />
        <CTASection ctaTitle={data.ctaTitle} ctaDesc={data.ctaDesc} />
      </main>

      <Footer />
    </div>
  );
}

// Inline Hero for Civil Engineering (fallback) since it uses a slightly different layout originally
function HeroFallback({ data }: { data: ServicePageData }) {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 bg-[#f8fbff] flex items-center overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 w-full lg:w-[45%] relative z-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-6"
          >
            <span className="text-gray">CIVIL ENGINEERING</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[5.5rem] lg:text-[7rem] font-extrabold text-black leading-[0.85] tracking-tight mb-8"
          >
            CIVIL <br />
            <span>ENGINEERING</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-md font-medium leading-relaxed"
          >
            Drawings and documentation that carry a project from layout to construction. We deliver precise architectural layouts, structural schematics, and rigorous site documentation tailored for complex modern infrastructures.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <button className="bg-[#0f172a] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.15em] hover:bg-black transition-colors flex items-center gap-3 shadow-lg shadow-black/5">
              START A PROJECT <ArrowRight size={14} />
            </button>
            <button className="bg-transparent border border-slate-300/80 text-[#0f172a] px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.15em] hover:bg-slate-50 transition-colors flex items-center gap-3">
              EXPLORE SERVICES <ArrowRight size={14} />
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-8 md:gap-12 border-t border-slate-200/60 pt-8"
          >
            <div>
              <p className="text-3xl font-extrabold text-[#0f172a]">150+</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">Drawings Delivered</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <p className="text-3xl font-extrabold text-[#0f172a]">30+</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">Projects Supported</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <p className="text-3xl font-extrabold text-[#0f172a]">100%</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">Documentation Accuracy</p>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-1 w-full lg:w-[55%] relative h-[400px] sm:h-[500px] lg:h-[700px] -mx-6 sm:-mx-10 lg:mx-0 lg:-mr-[10vw] xl:-mr-[20vw] z-0 lg:-mt-16 lg:-ml-16 xl:-ml-24"
        >
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8fbff] to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f8fbff] to-transparent z-10" />
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-[115%] h-full relative"
          >
            <Image
              src="https://res.cloudinary.com/defqgygsf/image/upload/v1790438192/469_ds0khy.png"
              alt="Civil Engineering Documentation"
              fill
              className="object-cover lg:object-contain object-left-top mix-blend-darken"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function OverviewSection({ overview }: { overview: ServicePageData['overview'] }) {
  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden font-sans border-b border-slate-100">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-6 w-fit shadow-xs"
            >
              <span className="text-[11px] font-bold tracking-widest text-slate-600 uppercase">
                Engineering Documentation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-black uppercase text-black whitespace-pre-line"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.25rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                marginBottom: "36px",
                WebkitTextStroke: "2px currentColor",
              }}
            >
              {overview.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-10 max-w-2xl"
            >
              <ShimmerText
                className="text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.8] tracking-[0.005em] font-medium"
                style={{ color: "#475569", opacity: 1 }}
              >
                {overview.description}
              </ShimmerText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 mt-6 border-t border-slate-200/60"
            >
              {overview.features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="group flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="text-black group-hover:scale-110 transition-transform duration-300 transform origin-left">
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-wider group-hover:text-[#0066FF] transition-colors duration-300">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center lg:justify-start"
          >
            <div className="w-full relative lg:-ml-20 xl:-ml-[150px] mt-8 lg:mt-0">
              <Image
                src="https://res.cloudinary.com/defqgygsf/image/upload/v1790418859/0234_xgsytz.png"
                width={800}
                height={600}
                className="w-full lg:w-[130%] xl:w-[140%] max-w-none h-auto object-contain"
                alt="Engineering CAD Documentation"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ 
  servicesTitle, 
  servicesDesc, 
  services, 
  serviceMeta 
}: { 
  servicesTitle: string;
  servicesDesc: string;
  services: ServicePageData['services'];
  serviceMeta: ServicePageData['serviceMeta'];
}) {
  const [activeTab, setActiveTab] = useState(services[0]?.id || '01');
  const activeService = services.find((s) => s.id === activeTab) || services[0];
  const activeMeta = serviceMeta[activeTab] || Object.values(serviceMeta)[0] || { ref: '', rev: '', status: '' };

  if (!activeService) return null;

  return (
    <section className="relative bg-[#07111e] text-white overflow-hidden font-sans py-20 lg:py-28">
      <div className="relative z-10 max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-bold tracking-[0.25em] text-slate-400 uppercase">Our Capabilities</span>
            </div>
            <h2
              className="font-black uppercase text-white whitespace-pre-line"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.25rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                marginBottom: "24px",
                WebkitTextStroke: "2px currentColor",
              }}
            >
              {servicesTitle}
            </h2>
          </div>

          <ShimmerText
            className="text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.8] tracking-[0.005em] font-medium max-w-md lg:text-right lg:mb-6"
            style={{ color: "#94a3b8", opacity: 1 }}
          >
            {servicesDesc}
          </ShimmerText>
        </div>

        <div className="w-fit max-w-full border border-slate-800 bg-slate-900/60 backdrop-blur-md rounded-2xl p-2 mb-10 overflow-x-auto scrollbar-none shadow-xl">
          <div className="flex items-center min-w-max gap-2">
            {services.map((srv) => {
              const isActive = srv.id === activeTab;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(srv.id)}
                  className={`px-5 py-3 rounded-xl transition-all duration-200 text-left flex items-center gap-3 ${isActive
                    ? 'bg-[#3b82f6] text-white shadow-lg shadow-blue-500/25'
                    : 'hover:bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {srv.id}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    {serviceMeta[srv.id]?.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 rounded-3xl border border-slate-800 bg-[#0a1626]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="xl:col-span-7 relative min-h-[460px] lg:min-h-[580px] p-6 lg:p-12 flex items-center justify-center border-b xl:border-b-0 xl:border-r border-slate-800/90 overflow-hidden">
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#3b82f6]/40" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#3b82f6]/40" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#3b82f6]/40" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#3b82f6]/40" />

            <div className="absolute top-6 left-8 flex items-center gap-4 text-[10px] font-mono text-slate-500">
              <span className="text-[#f26522] font-bold">VIEWPORT // ACTIVE</span>
              <span>GRID: 100mm</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab}
                src={activeService.image}
                alt={activeService.heading}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="max-h-[420px] w-auto object-contain filter drop-shadow-[0_10px_40px_rgba(59,130,246,0.2)]"
              />
            </AnimatePresence>

            <div className="absolute bottom-0 inset-x-0 bg-[#060e19]/90 border-t border-slate-800 px-6 py-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <div className="flex gap-4">
                <span>X: 12.44m</span>
                <span>Y: 08.20m</span>
                <span>Z: +04.50m</span>
              </div>
              <span className="text-[#3b82f6] font-bold">STATUS: {activeMeta.status}</span>
            </div>
          </div>

          <div className="xl:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#3b82f6]/20 text-sky-400 border border-sky-500/20">
                    CODE: {activeMeta.ref}
                  </span>
                  <span className="text-xs font-mono text-slate-400">REV. {activeMeta.rev}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-4">
                  {activeService.heading}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {activeService.desc}
                </p>

                <h4 className="text-[11px] font-mono font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
                  Included Submittals & Formats
                </h4>

                <div className="space-y-2 mb-8">
                  {activeService.features.map((feat, idx) => {
                    const Icon = feat.icon || FileText;
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                            <Icon size={16} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                            {feat.name}
                          </span>
                        </div>
                        <ArrowRight size={14} className="text-slate-600" />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-6 border-t border-slate-800/90 flex items-center justify-between text-xs text-slate-500">
              <span>Standard: <strong className="text-slate-300">ISO 19650 / AIA</strong></span>
              <button
                onClick={() => {
                  const nextIdx = (services.findIndex(s => s.id === activeTab) + 1) % services.length;
                  setActiveTab(services[nextIdx].id);
                }}
                className="text-sky-400 hover:text-white font-bold flex items-center gap-1 transition-colors"
              >
                Next Item <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection({ workflowTitle, workflowDesc, workflow }: { workflowTitle: string; workflowDesc: string; workflow: any[] }) {
  return (
    <section className="relative py-24 lg:py-32 bg-white text-slate-900 overflow-hidden font-sans border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="flex flex-col mb-16 gap-6">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-5 shadow-xs"
            >
              <span className="text-[11px] font-bold tracking-widest text-slate-600 uppercase">
                Structured Execution
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-black uppercase text-black whitespace-pre-line"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                marginBottom: "16px",
                WebkitTextStroke: "2px currentColor",
              }}
            >
              {workflowTitle}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-md"
          >
            <ShimmerText
              className="text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.8] tracking-[0.005em] font-medium"
              style={{ color: "#475569", opacity: 1 }}
            >
              {workflowDesc}
            </ShimmerText>
          </motion.div>
        </div>

        <div className="mt-8">
          <StaggerPhases phases={workflow} />
        </div>
      </div>
    </section>
  );
}

function GallerySection({ galleryTitle, projects }: { galleryTitle: string; projects: any[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentProject = projects[currentIdx] || {};

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (!projects.length) return null;

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden font-sans border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-5 shadow-xs">
              <span className="text-[11px] font-bold tracking-widest text-slate-600 uppercase">
                Featured Portfolio
              </span>
            </div>
            <h2
              className="font-black uppercase text-black whitespace-pre-line"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.25rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                marginBottom: "24px",
                WebkitTextStroke: "2px currentColor",
              }}
            >
              {galleryTitle || "PRECISION DETAILS. \\n REAL IMPACT."}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-bold text-slate-500 whitespace-nowrap">
              {`0${currentIdx + 1} / 0${projects.length}`}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-400 hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors"
                aria-label="Previous Project"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-slate-950 hover:bg-[#0066FF] text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Next Project"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-slate-50/60 p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentProject.id}
                    src={currentProject.image}
                    alt={currentProject.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-300 font-bold">
                    {currentProject.category}
                  </span>
                  <h4 className="text-xl font-bold">{currentProject.title}</h4>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentProject.tags?.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">
                    {currentProject.title}
                  </h3>

                  <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                    {currentProject.scope}
                  </p>

                  <h5 className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-3">
                    Key Outputs Produced:
                  </h5>

                  <ul className="space-y-2.5 mb-8">
                    {currentProject.deliverables?.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                        <Check size={14} className="text-[#0066FF] shrink-0 stroke-[3]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="inline-flex items-center justify-center gap-3 px-6 py-3.5 border border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 text-sm font-serif font-bold tracking-widest uppercase transition-colors">
                    DISCUSS A SIMILAR PROJECT
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection({ ctaTitle, ctaDesc }: { ctaTitle: string; ctaDesc: string }) {
  return (
    <section
      className="relative py-24 lg:py-32 bg-[#09121f] text-white overflow-hidden font-sans bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "linear-gradient(to right, rgba(9, 18, 31, 0.98) 0%, rgba(9, 18, 31, 0.8) 30%, transparent 60%), url('https://res.cloudinary.com/defqgygsf/image/upload/v1790436251/4629_vdb68z.png')",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
              GET STARTED
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.05] mb-6 uppercase text-white whitespace-pre-line"
          >
            READY TO START <br/> YOUR PROJECT?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-slate-300 mb-10 max-w-lg font-medium leading-relaxed"
          >
            {ctaDesc || "Let's create accurate, reliable and construction-ready documentation for your next project."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button className="bg-white text-slate-950 px-8 py-4 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-all duration-300 flex items-center gap-3">
              START A PROJECT <ArrowRight size={16} strokeWidth={2.5} />
            </button>
            <button className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center gap-3">
              CONTACT OUR TEAM <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
