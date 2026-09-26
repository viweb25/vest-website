"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

// Dynamic data matching the ids from the projects page
const getProjectData = (id: string) => {
  const allProjects = [
    { 
      id: "1", title: "Automated functional test station", image: "https://cdn.21st.dev/assets/mirror/6e/6ea4e5b0e69969ff6f3a9d8ba1853ea9d2f42f2726d6cccc856e8977712f8a8f.jpg",
      category: "Electronics · Manufacturing",
      challenge: "Manual product testing limits throughput and makes results hard to trace.",
      solution: "A LabVIEW test executive controlling instruments and DAQ hardware, with configurable sequences, limits and database logging.",
      technology: ["LabVIEW", "DAQ", "SQL", "Instrument control"],
      outcome: "Repeatable test execution with traceable results."
    },
    { 
      id: "2", title: "Hardware-in-the-loop test bench", image: "https://cdn.21st.dev/assets/mirror/8b/8b8342d2727e06d018042e9009c4cb1e313cd03afb622dafe02412cb8b655452.jpg",
      category: "Automotive · Aerospace",
      challenge: "Embedded controllers must be validated against realistic conditions before field use.",
      solution: "A real-time HIL setup with signal simulation, CAN communication and automated verification reports.",
      technology: ["LabVIEW", "cRIO / PXI", "CAN", "Test automation"],
      outcome: "Earlier detection of control faults and documented verification."
    },
    { 
      id: "3", title: "Machine automation with HMI", image: "https://cdn.21st.dev/assets/mirror/32/3228cb51067a340306315e58d3b03b6802c56b2559b182abd1facfa05bee50dd.jpg",
      category: "Manufacturing",
      challenge: "Machines rely on manual coordination and offer limited diagnostics.",
      solution: "PLC sequence control, interlocks and alarm management, with an HMI for operators and maintenance teams.",
      technology: ["PLC", "HMI", "Industrial networking"],
      outcome: "Consistent machine operation and clearer diagnostics."
    },
    { 
      id: "4", title: "Production monitoring and data logging", image: "https://cdn.21st.dev/assets/mirror/d5/d5d0b163b00548feb4b108fff5dd1878b2a82b1ed3def020d9c5f4f768932e88.jpg",
      category: "Industrial Automation",
      challenge: "Production status and machine data are not visible in one place.",
      solution: "PLC-to-PC communication with data logging, dashboards and SCADA integration.",
      technology: ["PLC", "SCADA", "Modbus", "SQL"],
      outcome: "Live production visibility and a historical record."
    },
    { 
      id: "5", title: "Predictive maintenance analytics", image: "https://cdn.21st.dev/assets/mirror/e3/e3f1d75a706d5405c69c5fdc2af2a25931e6dbc1d16cd2c9a56711f35ce49bfe.jpg",
      category: "Energy · Manufacturing",
      challenge: "Equipment degradation goes unnoticed until it causes unplanned downtime.",
      solution: "Condition data acquired through DAQ, stored centrally and analysed with anomaly-detection models.",
      technology: ["LabVIEW", "Python", "Machine learning", "Cloud"],
      outcome: "Earlier warning of developing faults."
    },
    { 
      id: "6", title: "Machine vision inspection", image: "https://cdn.21st.dev/assets/mirror/b4/b4fa70f4aa260f7824f44730524387113411bc08cf160d8aea2bef9a8fbb97fa.jpg",
      category: "Manufacturing · Electronics",
      challenge: "Visual inspection depends on manual checks that vary between operators.",
      solution: "Camera-based inspection using computer vision models with result logging.",
      technology: ["Computer vision", "Python", "Industrial cameras", "SQL"],
      outcome: "More consistent inspection records."
    },
    { 
      id: "7", title: "Structural steel detailing package", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80",
      category: "Construction · Steel Fabrication",
      challenge: "Fabricators need coordinated, accurate drawings for complex structures.",
      solution: "Shop and erection drawings, connection details and material lists prepared from the structural model.",
      technology: ["Steel detailing", "3D modelling", "BOM"],
      outcome: "Fabrication-ready documentation."
    },
    { 
      id: "8", title: "Miscellaneous steel and BOM documentation", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80",
      category: "Industrial · Infrastructure",
      challenge: "Platforms, stairs, handrails and supports involve many small, precisely documented parts.",
      solution: "Detailed drawings, fabrication lists and material schedules for miscellaneous steel.",
      technology: ["Steel detailing", "BOM", "Material take-off"],
      outcome: "Clear procurement and fabrication information."
    },
    { 
      id: "9", title: "Mobile-first service management app", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80",
      category: "Service businesses",
      challenge: "Job tracking and customer records are spread across paper and messages.",
      solution: "A mobile application with job tracking, service records and dashboards, as in RepairSync.",
      technology: ["Mobile", "Cloud", "APIs", "PostgreSQL"],
      outcome: "One digital record for every job."
    },
    { 
      id: "10", title: "Modular ERP platform", image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=1600&q=80",
      category: "Business management",
      challenge: "Sales, inventory, finance and service run in disconnected tools.",
      solution: "A modular platform with a shared data model and reporting, as in VEST ERP.",
      technology: ["React", "FastAPI", "PostgreSQL", "Cloud"],
      outcome: "One source of truth across departments."
    }
  ];
  const currentIndex = allProjects.findIndex(p => p.id === id);
  const validIndex = currentIndex !== -1 ? currentIndex : 0;
  const proj = allProjects[validIndex];

  const nextIndex = (validIndex + 1) % allProjects.length;
  const nextProj = allProjects[nextIndex];

  return {
    ...proj,
    number: proj.id.padStart(2, '0'),
    imageSubtitle: `${proj.category.toUpperCase()} — ${proj.title.toUpperCase()}`,
    nextProjectId: nextProj.id,
    nextProjectTitle: nextProj.title,
    nextProjectImage: nextProj.image
  };
};

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = getProjectData(params.id);
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
      
      const gap = vh * 0.05; // 5vh gap
      const dock = descHeight + gap;
      
      // Calculate max scroll for right column to exactly hit the bottom of the viewport
      const maxScrollY = rightColHeight - vh; 
      const validMaxScroll = maxScrollY > 0 ? maxScrollY : 0;
      
      // Make phase 2 scroll 1:1 natural speed
      // Phase 2 is 0.6 of total scroll distance
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
  }, [project.challenge, project.solution, project.outcome]);

  // Track scroll within the dynamic container for the split-scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // State for the 2-second delay reveal
  const [showOverlays, setShowOverlays] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlays(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // ANIMATION PHASES:
  // Phase 1 (0 to 0.4): Hero image shrinks and docks below the description. Left column stays visible.
  // Phase 2 (0.4 to 1): Left column stays fixed. Right column (description + images) scrolls up!
  const phase1End = 0.4;

  const imageWidth = useTransform(scrollYProgress, [0, phase1End], ["100%", "55%"]);
  const imageHeight = useTransform(scrollYProgress, [0, phase1End], ["100vh", "55vh"]);
  
  // Image starts at top: 0, docks exactly below the dynamic description, then scrolls UP identically
  const imageTop = useTransform(
    scrollYProgress, 
    [0, phase1End, 1], 
    ["0px", `${layout.dockTop}px`, `${layout.dockTop - layout.maxScroll}px`]
  );

  // Right column starts at y: 0, then scrolls UP exactly by maxScroll
  const rightColumnY = useTransform(
    scrollYProgress,
    [0, phase1End, 1],
    ["0px", "0px", `-${layout.maxScroll}px`]
  );

  const imagePaddingRight = useTransform(scrollYProgress, [0, phase1End], ["0rem", "2.5rem"]);

  // Fade out play button and subtitle overlays when scroll starts and image shrinks
  const overlayOpacity = useTransform(scrollYProgress, [0, phase1End], [1, 0], { clamp: true });

  // NEXT PROJECT ANIMATION
  const { scrollYProgress: nextScroll } = useScroll({
    target: nextProjectRef,
    offset: ["start start", "end end"]
  });

  const nextClipPath = useTransform(nextScroll, [0, 0.8], ["inset(30% 25% 30% 25%)", "inset(0% 0% 0% 0%)"]);
  const nextOpacity = useTransform(nextScroll, [0, 0.1], [0, 1]);
  const nextTextOpacity = useTransform(nextScroll, [0, 0.3], [1, 0]);

  // Auto-navigate to next project when the user keeps scrolling AFTER the image fully expands
  useMotionValueEvent(nextScroll, "change", (latest) => {
    if (latest >= 0.99) {
      router.push(`/projects/${project.nextProjectId}`);
    }
  });

  return (
    <div className="bg-[#f2f2f2] text-slate-900 font-sans selection:bg-[#d4ff00]">
      {/* Ensure Navbar floats above */}
      <div className="fixed top-0 left-0 w-full z-[60]">
        <Navbar />
      </div>

      {/* 
        Main animation scroll container.
        Height is calculated dynamically to ensure 1:1 scroll speed based on content length.
      */}
      <div ref={containerRef} style={{ height: layout.containerHeight }} className="relative">
        <div className="sticky top-0 left-0 w-full h-screen bg-[#f2f2f2] overflow-hidden">

          {/* --- LEFT COLUMN (Sticky) --- */}
          <div className="absolute top-0 left-0 w-full md:w-[45%] h-screen px-8 md:px-16 pt-[15vh] pb-12 flex flex-col justify-between z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-900 uppercase mb-8 hover:opacity-50 transition-opacity">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                BACK TO PROJECTS
              </Link>
              
              <p className="text-base font-bold mb-1 text-slate-900">({project.number})</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight uppercase mb-6 leading-tight text-slate-900 break-words">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-4">

                <Link href="/contact" className="border border-slate-900 px-5 py-1.5 text-sm font-bold hover:bg-slate-900 hover:text-white transition-colors duration-300 text-slate-900 cursor-pointer tracking-wider flex items-center gap-2">
                  DISCUSS A SIMILAR PROJECT
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-y-4 text-sm md:text-base pb-4 pointer-events-auto">
              <div className="font-bold text-slate-500 col-span-1">Category</div>
              <div className="font-medium text-slate-900 col-span-2">{project.category}</div>

              <div className="font-bold text-slate-500 col-span-1">Technology</div>
              <div className="font-medium text-slate-900 col-span-2 flex flex-wrap gap-2">
                {project.technology.map(tech => (
                  <span key={tech} className="bg-slate-200 px-2 py-1 rounded text-xs">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN (Scrolls Up in Phase 2) --- */}
          <motion.div
            ref={rightColumnRef}
            style={{ y: rightColumnY }}
            className="absolute top-0 right-0 w-full md:w-[55%] flex flex-col z-10"
          >
            {/* Description (Dynamic Height) */}
            <div ref={descRef} className="pt-[calc(15vh+4.5rem)] pl-0 pr-10 flex flex-col gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Challenge</h3>
                <p className="text-base md:text-lg leading-relaxed font-normal text-slate-700">{project.challenge}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Solution</h3>
                <p className="text-base md:text-lg leading-relaxed font-normal text-slate-700">{project.solution}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Typical outcome</h3>
                <p className="text-base md:text-lg leading-relaxed font-normal text-slate-700">{project.outcome}</p>
              </div>
            </div>

            {/* Dynamic Gap placeholder where the Hero image precisely docks (55vh) */}
            <div style={{ height: '55vh', marginTop: '5vh' }} className="w-full pointer-events-none" />

            {/* Additional scrolled content (Dummy images match Hero image size) */}
            <div className="flex flex-col gap-4 w-full pt-4 pr-10 pl-0 pb-12">
              <img src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=1600&q=80" className="w-full h-[55vh] object-cover" />
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80" className="w-full h-[55vh] object-cover" />
            </div>
          </motion.div>

          {/* --- THE HERO IMAGE (Shrinks then scrolls up) --- */}
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
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>

              {/* Overlays on the image */}
              <AnimatePresence>
                {showOverlays && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ opacity: overlayOpacity }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* "PLAY VIDEO" Center Target */}
                    <div className="flex flex-col items-center justify-center text-white mix-blend-difference">
                      <div className="relative flex items-center justify-center p-8">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white opacity-70"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white opacity-70"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white opacity-70"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white opacity-70"></div>

                        <div className="flex items-center gap-2 font-bold tracking-widest text-lg">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                          PLAY VIDEO
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Project Name on Image */}
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
                      {project.imageSubtitle}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* --- NEXT PROJECT SECTION (SCROLL REVEAL) --- */}
      <div ref={nextProjectRef} className="relative w-full h-[150vh] bg-[#f2f2f2]">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden cursor-pointer" onClick={() => router.push(`/projects/${project.nextProjectId}`)}>
          
          {/* Base Text Layer */}
          <motion.div style={{ opacity: nextTextOpacity }} className="absolute inset-0 flex flex-col items-center justify-between pt-24 pb-8 z-0">
            <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
              <p className="text-sm md:text-base font-medium tracking-wide text-slate-800 mb-16">
                Next project
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">

                <h2 className="text-lg md:text-xl lg:text-2xl font-sans font-normal uppercase tracking-widest text-slate-900">
                  {project.nextProjectTitle}
                </h2>
              </div>
            </div>

            <p className="text-xs md:text-sm font-normal tracking-widest text-slate-500 mt-auto opacity-70">
              Keep scroll down
            </p>
          </motion.div>

          {/* Expanding Image Layer */}
          <motion.div 
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            style={{ 
              clipPath: nextClipPath,
              opacity: nextOpacity,
            }}
          >
            <img 
              src={project.nextProjectImage} 
              alt={project.nextProjectTitle}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
