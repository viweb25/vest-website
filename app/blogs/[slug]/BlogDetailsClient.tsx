"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

export default function BlogDetailsClient({ post, nextPost, nextSlug }: any) {
  const router = useRouter();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  
  const [layout, setLayout] = useState({
    dockTop: 0,
    maxScroll: 0,
    viewportHeight: 0,
    containerHeight: "400vh"
  });

  useEffect(() => {
    const measure = () => {
      if (!rightColumnRef.current || !descRef.current) return;
      const vh = window.innerHeight;
      const descHeight = descRef.current.offsetHeight;
      const rightColHeight = rightColumnRef.current.offsetHeight;
      
      const gap = vh * 0.05; 
      const dock = descHeight + gap;
      
      const maxScrollY = rightColHeight - vh; 
      const validMaxScroll = maxScrollY > 0 ? maxScrollY : 0;
      
      const totalScrollDistance = validMaxScroll / 0.6;
      const containerH = totalScrollDistance + vh;

      setLayout({
        dockTop: dock,
        maxScroll: validMaxScroll,
        viewportHeight: vh,
        containerHeight: containerH > vh * 2 ? `${containerH}px` : "300vh"
      });
    };
    
    measure();
    setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [post.content]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [showOverlays, setShowOverlays] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlays(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const phase1End = 0.4;
  const imageWidth = useTransform(scrollYProgress, [0, phase1End], ["100%", "55%"]);
  const imageHeight = useTransform(scrollYProgress, [0, phase1End], ["100vh", "55vh"]);
  const imageTop = useTransform(
    scrollYProgress, 
    [0, phase1End, 1], 
    ["0px", `${layout.dockTop}px`, `${layout.dockTop - layout.maxScroll}px`]
  );
  const rightColumnY = useTransform(
    scrollYProgress,
    [0, phase1End, 1],
    ["0px", "0px", `-${layout.maxScroll}px`]
  );
  const imagePaddingRight = useTransform(scrollYProgress, [0, phase1End], ["0rem", "2.5rem"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, phase1End], [1, 0], { clamp: true });

  const { scrollYProgress: nextScroll } = useScroll({
    target: nextProjectRef,
    offset: ["start start", "end end"]
  });

  const nextClipPath = useTransform(nextScroll, [0, 0.8], ["inset(30% 25% 30% 25%)", "inset(0% 0% 0% 0%)"]);
  const nextOpacity = useTransform(nextScroll, [0, 0.1], [0, 1]);
  const nextTextOpacity = useTransform(nextScroll, [0, 0.3], [1, 0]);

  useMotionValueEvent(nextScroll, "change", (latest) => {
    if (latest >= 0.99) {
      router.push(`/blogs/${nextSlug}`);
    }
  });

  // Basic markdown parser
  const renderContent = () => {
    const lines = post.content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc pl-5 mb-8 space-y-2 text-slate-700 text-lg">
            {currentList.map((li, idx) => (
              <li key={idx}>
                {li.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => 
                  part.startsWith('**') && part.endsWith('**') 
                    ? <strong key={pIdx} className="font-bold text-slate-900">{part.slice(2, -2)}</strong> 
                    : part
                )}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line: string, i: number) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        return;
      }

      const renderFormatted = (text: string) => {
        return text.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => 
          part.startsWith('**') && part.endsWith('**') 
            ? <strong key={pIdx} className="font-bold text-slate-900">{part.slice(2, -2)}</strong> 
            : part
        );
      };

      if (trimmed.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={`h2-${i}`} className="text-3xl font-bold text-slate-900 mb-6 mt-8">
            {renderFormatted(trimmed.replace("## ", ""))}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={`h3-${i}`} className="text-2xl font-bold text-slate-900 mb-4 mt-6">
            {renderFormatted(trimmed.replace("### ", ""))}
          </h3>
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        currentList.push(trimmed.replace(/^[-*]\s+/, ""));
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushList();
        elements.push(
          <div key={`p-${i}`} className="flex items-start gap-4 mb-4 text-slate-700 text-lg">
            <span className="font-bold text-slate-900 flex-shrink-0">{trimmed.match(/^\d+\./)?.[0]}</span>
            <span>{renderFormatted(trimmed.replace(/^\d+\.\s/, ""))}</span>
          </div>
        );
      } else {
        flushList();
        elements.push(
          <p key={`p-${i}`} className="text-lg leading-relaxed font-normal text-slate-700 mb-6">
            {renderFormatted(trimmed)}
          </p>
        );
      }
    });
    flushList();
    return elements;
  };

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#d4ff00]">
      <div className="fixed top-0 left-0 w-full z-[60]">
        <Navbar />
      </div>

      <div ref={containerRef} style={{ height: layout.containerHeight }} className="relative">
        <div className="sticky top-0 left-0 w-full h-screen bg-white overflow-hidden">

          {/* LEFT COLUMN */}
          <div className="absolute top-0 left-0 w-full md:w-[45%] h-screen px-8 md:px-16 pt-[15vh] pb-12 flex flex-col justify-start gap-12 z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <Link href="/blogs" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-900 uppercase mb-8 hover:opacity-50 transition-opacity">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                BACK TO JOURNAL
              </Link>
              
              <p className="text-base font-bold mb-1 text-slate-900">{post.category} · {post.readTime}</p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-sans font-black tracking-tight uppercase mb-6 leading-tight text-slate-900 break-words">
                {post.title}
              </h1>
              
              <div className="flex flex-col gap-1 mb-8">
                 <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">{post.author}</p>
                 <p className="text-xs text-slate-500 uppercase tracking-widest">{post.authorRole}</p>
              </div>

              {/* <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="border border-slate-900 px-5 py-1.5 text-sm font-bold hover:bg-slate-900 hover:text-white transition-colors duration-300 text-slate-900 cursor-pointer tracking-wider flex items-center gap-2">
                  DISCUSS A PROJECT
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              </div> */}
            </div>

            <div className="grid grid-cols-3 gap-y-4 text-sm md:text-base pb-4 pointer-events-auto">
              <div className="font-bold text-slate-500 col-span-1">Tags</div>
              <div className="font-medium text-slate-900 col-span-2 flex flex-wrap gap-2">
                {post.tags?.map((tech: string) => (
                  <span key={tech} className="bg-slate-200 px-2 py-1 rounded text-xs">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <motion.div
            ref={rightColumnRef}
            style={{ y: rightColumnY }}
            className="absolute top-0 right-0 w-full md:w-[55%] flex flex-col z-10"
          >
            <div ref={descRef} className="pt-[calc(15vh+4.5rem)] pl-0 pr-10 flex flex-col">
              {/* Blog Content */}
              <div className="prose prose-slate prose-lg max-w-none">
                 <p className="text-xl md:text-2xl font-medium italic text-slate-600 border-l-4 border-orange-500 pl-6 mb-12">
                   {post.excerpt}
                 </p>
                 {renderContent()}
              </div>
            </div>

            <div style={{ height: '55vh', marginTop: '5vh' }} className="w-full pointer-events-none" />
          </motion.div>

          {/* THE HERO IMAGE */}
          <motion.div
            style={{
              width: imageWidth,
              height: imageHeight,
              top: imageTop,
              right: 0,
              paddingRight: imagePaddingRight,
            }}
            className="absolute origin-top-right overflow-hidden flex items-end justify-end shadow-none z-20 pointer-events-none"
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>

              <AnimatePresence>
                {showOverlays && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    style={{ opacity: overlayOpacity }}
                    className="absolute bottom-6 left-0 right-0 text-center z-10"
                  >
                    <p className="text-white font-bold tracking-widest text-sm md:text-base drop-shadow-md mix-blend-difference">
                      {post.category.toUpperCase()} — {post.date.toUpperCase()}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* NEXT BLOG SECTION */}
      <div ref={nextProjectRef} className="relative w-full h-[150vh] bg-white">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden cursor-pointer" onClick={() => router.push(`/blogs/${nextSlug}`)}>
          
          <motion.div style={{ opacity: nextTextOpacity }} className="absolute inset-0 flex flex-col items-center justify-between pt-24 pb-8 z-0">
            <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
              <p className="text-sm md:text-base font-medium tracking-wide text-slate-800 mb-16">
                Next article
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 max-w-4xl px-6">
                <h2 className="text-lg md:text-xl lg:text-3xl font-sans font-bold uppercase tracking-widest text-slate-900 leading-tight">
                  {nextPost.title}
                </h2>
              </div>
            </div>

            <p className="text-xs md:text-sm font-normal tracking-widest text-slate-500 mt-auto opacity-70">
              Keep scroll down
            </p>
          </motion.div>

          <motion.div 
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            style={{ 
              clipPath: nextClipPath,
              opacity: nextOpacity,
            }}
          >
            <img 
              src={nextPost.coverImage} 
              alt={nextPost.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
