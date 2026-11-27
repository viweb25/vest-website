"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { Check, Activity, ShieldCheck, Zap, ArrowRight, ArrowUpRight, Layers, Sliders, Globe, Cpu, Boxes } from 'lucide-react';

const getProductData = (id: string) => {
  const allProducts = [
    {
      id: "compactdaq",
      title: "CompactDAQ",
      type: "Modular Data Acquisition System",
      category: "Hardware & DAQ",
      status: "Available",
      maker: "VEST Solutions",
      lead: "What Is CompactDAQ?\n\nCompactDAQ systems collect and deliver the data validation you need to meet test requirements at any distance, in any environment. These portable, customizable solutions—made of data acquisition modules that can synchronize measurements across a network—help you digitize data closer to sensors, minimizing noise and simplifying cabling in the field.",
      features: [
        "Easy Sensor Connectivity (Any Physical Sensor)",
        "Compact, Rugged Design (50 g Shock, -40°C to 70°C)",
        "Hot-Swappable C-Series I/O Modules",
        "Up to 1 MS/s per channel sampling",
        "Analog Input / Output (Voltage & Current)",
        "Thermocouple, RTD & Strain Gauge Support",
        "USB, Ethernet & TSN Network Synchronization",
        "Benchtop & Distributed DAQ Architecture"
      ],
      primaryCta: { label: "Request a CompactDAQ Quote", href: "/book" },
      secondaryCta: { label: "Schedule Technical Consultation", href: "/contact" },
      imageSubtitle: "MODULAR DATA ACQUISITION PLATFORM",
      imageMock: (
        <img src="/CompactDAQ Modular Data Acquisition.png" alt="CompactDAQ" className="w-full h-full object-cover" />
      )
    },
    {
      id: "compactrio",
      title: "CompactRIO",
      type: "Embedded Real-Time Controller & FPGA",
      category: "Embedded & Control",
      status: "Available",
      maker: "VEST Solutions",
      lead: "What Is CompactRIO?\n\nNI CompactRIO systems provide high-performance processing capabilities, sensor-specific conditioned I/O, and a closely integrated software toolchain that make them ideal for Industrial Internet of Things, monitoring, and control applications. The real-time processor offers reliable, predictable behavior, while the FPGA excels at smaller tasks that require high-speed logic and precise timing.",
      features: [
        "Deterministic NI Linux Real-Time OS",
        "User-Programmable Xilinx FPGA for Hardware-Timed Logic",
        "Flexible Development with LabVIEW Real-Time & FPGA",
        "Long-Term Autonomous Field Data Acquisition & Logging",
        "Combined High-Speed DAQ and Closed-Loop Control",
        "Open, Secure Platform with Industrial IoT & C/C++ Stacks",
        "Hot-Swappable C Series Conditioned I/O Modules",
        "Rugged Industrial Temperature: -40 °C to 70 °C, 50 g Shock"
      ],
      primaryCta: { label: "Request a CompactRIO Quote", href: "/book" },
      secondaryCta: { label: "Schedule Technical Consultation", href: "/contact" },
      imageSubtitle: "DISTRIBUTED MEASUREMENT & CONTROL",
      imageMock: (
        <img src="/Industrial LabVIEW CompactRIO Dashboard.png" alt="CompactRIO" className="w-full h-full object-cover" />
      )
    },
    {
      id: "pxi",
      title: "PXI",
      type: "High-Speed Automated Test Chassis",
      category: "High-Performance Test",
      status: "Available",
      maker: "VEST Solutions",
      lead: "What Is PXI?\n\nPXI is an advanced test and measurement platform built for automation that combines hardware and software components to tackle complex device testing efficiently, so that engineers can take their first measurement in seconds and transition to automation within the same system. Renowned for its flexibility and reliability, engineers use this platform to build high-performance, mixed-measurement systems for validation and production test.",
      features: [
        "Flexible and Scalable Architecture (2 to 18 Slots)",
        "High-Performance PCI Express Backplane Throughput",
        "Sub-Nanosecond Clock Synchronization & Triggering",
        "Software-Defined with LabVIEW+ Suite & Python",
        "Instant Interactive Measurements with InstrumentStudio™",
        "Over 600 Modular Instruments from DC to mmWave",
        "Embedded & Remote High-Power Controller Options",
        "Open Industry Standard with 1,500+ Ecosystem Products"
      ],
      primaryCta: { label: "Request a PXI System Quote", href: "/book" },
      secondaryCta: { label: "Schedule Technical Consultation", href: "/contact" },
      imageSubtitle: "HIGH-PERFORMANCE TEST ARCHITECTURE",
      imageMock: (
        <img src="/PXI Instrument on Reflective Metallic Table.png" alt="PXI" className="w-full h-full object-cover" />
      )
    },
    {
      id: "labview-suite",
      title: "LabVIEW+ Suite",
      type: "Automated Test System Development Software",
      category: "Engineering Software",
      status: "Available",
      maker: "VEST Solutions",
      lead: "A unified software bundle combining LabVIEW, TestStand, DIAdem, and specialized instrument drivers for rapid design, automated sequencing, and deep data analytics across engineering workflows.",
      features: [
        "LabVIEW Professional Development Environment",
        "NI TestStand Automated Test Sequencer",
        "DIAdem Big Test Data Post-Processing",
        "Seamless Multi-Vendor Hardware Drivers",
        "Custom Engineering HMI Dashboard Controls",
        "Automated Report Generation (PDF, Excel, TDMS)",
        "Source Code Control & CI/CD Integration",
        "Native Python, MATLAB & C/C++ Interop"
      ],
      primaryCta: { label: "Request a LabVIEW+ License", href: "/book" },
      secondaryCta: { label: "Schedule Technical Consultation", href: "/contact" },
      imageSubtitle: "AUTOMATED TEST DEVELOPMENT SUITE",
      imageMock: (
        <img src="/Lab Monitor_ Reflective Lab Workspace.png" alt="LabVIEW+ Suite" className="w-full h-full object-cover" />
      )
    },
    {
      id: "erp",
      title: "VEST ERP",
      type: "Business Management Platform",
      category: "SaaS & Enterprise",
      status: "Available",
      maker: "VEST Solutions",
      lead: "A scalable SaaS and enterprise platform. Start with the modules you need and add others as your organisation grows.",
      features: ["CRM", "Sales", "Purchase", "Inventory", "Finance", "HR", "Payroll", "Project Management", "Customer Management", "Service Management", "Reporting", "Dashboard"],
      primaryCta: { label: "Request an ERP Demo", href: "#" },
      secondaryCta: { label: "Book a Demo", href: "#" },
      imageSubtitle: "MODULAR BUSINESS MANAGEMENT PLATFORM",
      imageMock: (
        <img src="/erp.png" alt="VEST ERP" className="w-full h-full object-cover" />
      )
    },
    {
      id: "repairsync",
      title: "RepairSync",
      type: "Mobile Shop Management",
      category: "Mobile First",
      status: "Available",
      maker: "VEST Solutions",
      lead: "A mobile-first solution for repair and service businesses that replaces paper job cards and scattered messages with one connected record.",
      features: ["Customer Management", "Vehicle / Equipment Records", "Repair Job Management", "Service Tracking", "Job Status", "Customer History", "Service Records", "Invoice Management", "Business Dashboard", "Mobile Access", "Notifications", "Digital Records"],
      primaryCta: { label: "Try RepairSync", href: "#" },
      secondaryCta: { label: "Book a Demo", href: "#" },
      imageSubtitle: "SMART MOBILE SHOP MANAGEMENT",
      imageMock: (
        <img src="/repair.png" alt="RepairSync" className="w-full h-full object-cover" />
      )
    },
    {
      id: "auto-posting",
      title: "N*N Auto Posting",
      type: "Content Automation",
      category: "Social Media",
      status: "Available",
      maker: "VEST Solutions",
      lead: "Plan, schedule and publish content from a single workspace, with a calendar and campaign view for the whole team.",
      features: ["Multi-platform publishing", "Content scheduling", "Automated posting", "Media management", "Content calendar", "Campaign management", "Analytics", "Workflow automation"],
      primaryCta: { label: "Request a Demo", href: "#" },
      secondaryCta: { label: "Book a Demo", href: "#" },
      imageSubtitle: "SOCIAL MEDIA CONTENT AUTOMATION",
      imageMock: (
        <img src="/n8n.png" alt="N*N Auto Posting" className="w-full h-full object-cover" />
      )
    },
    {
      id: "puro",
      title: "Puro Firing Box",
      type: "Proprietary Hardware",
      category: "Industrial Control",
      status: "Available",
      maker: "VEST Solutions",
      lead: "A VEST Solutions proprietary product. The overview, applications, features and specifications below are published from approved product documentation only; nothing is estimated.",
      isTable: true,
      tableData: [
        { label: "Product overview", value: "To be supplied by VEST Solutions" },
        { label: "Applications", value: "To be supplied by VEST Solutions" },
        { label: "Features", value: "To be supplied by VEST Solutions" },
        { label: "Electrical ratings", value: "Awaiting verified specification" },
        { label: "Safety and compliance", value: "Awaiting verified approvals" },
        { label: "Dimensions", value: "Awaiting verified specification" },
      ],
      userDocs: [
        { label: "User manual", value: "to be supplied" },
        { label: "Datasheet", value: "to be supplied" }
      ],
      primaryCta: { label: "Enquire About Puro", href: "#" },
      secondaryCta: { label: "Request a Demo", href: "#" },
      imageSubtitle: "PURO FIRING BOX INTERFACE",
      imageMock: (
        <img src="/Firing Box Installation.png" alt="Puro Firing Box" className="w-full h-full object-cover" />
      )
    }
  ];
  const currentIndex = allProducts.findIndex(p => p.id === id);
  const validIndex = currentIndex !== -1 ? currentIndex : 0;
  const proj = allProducts[validIndex];

  const nextIndex = (validIndex + 1) % allProducts.length;
  const nextProj = allProducts[nextIndex];

  return {
    ...proj,
    nextProjectId: nextProj.id,
    nextProjectTitle: nextProj.title,
    nextProjectImageMock: nextProj.imageMock
  };
};

function CompactDAQVideoPlayer() {
  const videoUrl = "https://youtu.be/82Gy2AG9MkI?si=AjX7-ZOHmTN4XIGN";

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video min-h-[300px] sm:min-h-[420px] rounded-xl overflow-hidden border border-slate-300 shadow-lg bg-black">
        <video
          src="/cdaq-walkthrough.mp4"
          poster="https://img.youtube.com/vi/82Gy2AG9MkI/maxresdefault.jpg"
          controls
          playsInline
          preload="metadata"
          className="w-full h-full min-h-[300px] sm:min-h-[420px] object-contain rounded-xl bg-black"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Official National Instruments CompactDAQ Platform Walkthrough</span>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E7651A] hover:underline flex items-center gap-1 font-bold"
        >
          Open on YouTube
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function CompactRIOVideoPlayer() {
  const videoUrl = "https://youtu.be/WMIs0Ll1_pc?si=TSIdm7Aavb8xRWIe";

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video min-h-[300px] sm:min-h-[420px] rounded-xl overflow-hidden border border-slate-300 shadow-lg bg-black">
        <video
          src="/crio-walkthrough.mp4"
          poster="https://img.youtube.com/vi/WMIs0Ll1_pc/maxresdefault.jpg"
          controls
          playsInline
          preload="metadata"
          className="w-full h-full min-h-[300px] sm:min-h-[420px] object-contain rounded-xl bg-black"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Official National Instruments CompactRIO Platform Overview</span>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E7651A] hover:underline flex items-center gap-1 font-bold"
        >
          Open on YouTube
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function PXIVideoPlayer() {
  const videoUrl = "https://youtu.be/_iZ_OPOgI98?si=IF0DoiLC-tc44YcZ";

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video min-h-[300px] sm:min-h-[420px] rounded-xl overflow-hidden border border-slate-300 shadow-lg bg-black">
        <video
          src="/pxi-walkthrough.mp4"
          poster="https://img.youtube.com/vi/_iZ_OPOgI98/maxresdefault.jpg"
          controls
          playsInline
          preload="metadata"
          className="w-full h-full min-h-[300px] sm:min-h-[420px] object-contain rounded-xl bg-black"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Official National Instruments PXI Platform Overview (1:04)</span>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E7651A] hover:underline flex items-center gap-1 font-bold"
        >
          Open on YouTube
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = getProductData(params.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  
  const [layout, setLayout] = useState({
    dockTop: 0,
    maxScroll: 0,
    viewportHeight: 0,
    phase1End: 0.1,
    containerHeight: "300vh"
  });

  useEffect(() => {
    const measure = () => {
      if (!rightColumnRef.current || !descRef.current) return;
      const vh = window.innerHeight;
      const descHeight = descRef.current.offsetHeight;
      const rightColHeight = rightColumnRef.current.offsetHeight;
      
      const gap = 24;
      const dock = descHeight + gap;
      
      const maxScrollY = rightColHeight - vh; 
      const validMaxScroll = maxScrollY > 0 ? maxScrollY : 0;
      
      // Phase 1: Completes quickly in 350px of scroll so hero settles automatically into view
      const phase1Scroll = 350;
      const totalScrollDistance = validMaxScroll + phase1Scroll;
      const p1End = totalScrollDistance > 0 ? Math.min(phase1Scroll / totalScrollDistance, 0.25) : 0.1;
      const containerH = totalScrollDistance + vh;

      setLayout({
        dockTop: dock,
        maxScroll: validMaxScroll,
        viewportHeight: vh,
        phase1End: p1End,
        containerHeight: containerH > vh * 1.5 ? `${containerH}px` : "200vh"
      });
    };
    
    measure();
    const t1 = setTimeout(measure, 150);
    const t2 = setTimeout(measure, 500);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measure);
    };
  }, [product.lead]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [showOverlays, setShowOverlays] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlays(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const p1 = layout.phase1End;

  const imageWidth = useTransform(scrollYProgress, [0, p1], ["100%", "55%"]);
  const imageHeight = useTransform(scrollYProgress, [0, p1], ["100vh", "52vh"]);
  
  const imageTop = useTransform(
    scrollYProgress, 
    [0, p1, 1], 
    ["0px", `${layout.dockTop}px`, `${layout.dockTop - layout.maxScroll}px`]
  );

  const rightColumnY = useTransform(
    scrollYProgress,
    [0, p1, 1],
    ["0px", "0px", `-${layout.maxScroll}px`]
  );

  const imagePaddingRight = useTransform(scrollYProgress, [0, p1], ["0rem", "2.5rem"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, p1], [1, 0], { clamp: true });

  return (
    <div className="bg-[#f2f2f2] text-slate-900 font-sans selection:bg-blue-200">
      <div className="fixed top-0 left-0 w-full z-[60]">
        <Navbar />
      </div>

      <div ref={containerRef} style={{ height: layout.containerHeight }} className="relative">
        <div className="sticky top-0 left-0 w-full h-screen bg-[#f2f2f2] overflow-hidden">

          {/* ─── LEFT COLUMN (Sticky Sidebar) ─── */}
          <div className="absolute top-0 left-0 w-full md:w-[45%] h-screen px-8 md:px-16 pt-[15vh] pb-12 flex flex-col justify-between z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <Link href="/products" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-900 uppercase mb-8 hover:opacity-50 transition-opacity">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                BACK TO PRODUCTS
              </Link>
              
              <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter uppercase mb-6 leading-none text-slate-900 break-words mt-4">
                {product.title}
              </h1>
              
              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pointer-events-auto">
                <a href={product.primaryCta.href} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent hover:bg-transparent border-1.5 border-[#0B2340] hover:border-[#E7651A] text-[#0B2340] hover:text-[#E7651A] text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] rounded-none transition-all active:scale-95 group shadow-none cursor-pointer">
                  {product.primaryCta.label}
                </a>
                <a href={product.secondaryCta.href} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent hover:bg-transparent border-1.5 border-[#0B2340] hover:border-[#E7651A] text-[#0B2340] hover:text-[#E7651A] text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] rounded-none transition-all active:scale-95 group shadow-none cursor-pointer">
                  <span>{product.secondaryCta.label}</span>
                  <ArrowUpRight size={17} className="text-[#0B2340] group-hover:text-[#E7651A] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-y-3 text-sm md:text-base pb-4 pointer-events-auto border-t border-slate-300 pt-6">
              <div className="font-bold text-slate-500 col-span-1">Maker</div>
              <div className="font-semibold text-slate-900 col-span-2">{product.maker}</div>

              <div className="font-bold text-slate-500 col-span-1">Type</div>
              <div className="font-semibold text-slate-900 col-span-2">{product.type}</div>

              <div className="font-bold text-slate-500 col-span-1">Category</div>
              <div className="font-semibold text-slate-900 col-span-2">{product.category}</div>

              <div className="font-bold text-slate-500 col-span-1">Status</div>
              <div className="font-semibold text-slate-900 col-span-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                {product.status}
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN (Scrolls Up in Phase 2) ─── */}
          <motion.div
            ref={rightColumnRef}
            style={{ y: rightColumnY }}
            className="absolute top-0 right-0 w-full md:w-[55%] flex flex-col z-10 pointer-events-auto"
          >
            {/* Top Overview & Core Features (dockTarget is directly below this) */}
            <div ref={descRef} className="pt-[calc(15vh+4rem)] pl-0 pr-8 md:pr-12">
              <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-medium text-slate-800">
                {product.lead}
              </p>

              {/* Core Features / Table */}
              <div className="flex flex-col w-full mt-10 pr-0 pl-0">
                {product.isTable ? (
                  <div className="w-full">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 text-slate-900">Specifications</h3>
                    <table className="w-full text-sm text-left">
                      <tbody>
                        {product.tableData?.map((row, i) => (
                          <tr key={i} className="border-b border-slate-300 last:border-0">
                            <th className="py-4 font-semibold text-slate-800 w-[40%] pr-4 align-top">{row.label}</th>
                            <td className="py-4 align-top">
                              <span className="inline-block px-3 py-1.5 border border-slate-300 rounded text-slate-700 bg-white text-[13px] font-medium">
                                {row.value}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    <div className="mt-8 pt-8 border-t border-slate-300">
                      <h4 className="font-bold text-slate-900 mb-4">User Documentation</h4>
                      <div className="flex flex-wrap gap-3">
                        {product.userDocs?.map((doc, i) => (
                          <div key={i} className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 bg-white text-[13px] flex items-center gap-1.5">
                            <span className="font-bold text-slate-900">{doc.label}:</span> {doc.value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 text-slate-900">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {product.features?.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="w-[18px] h-[18px] text-slate-900 flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-sm font-semibold text-slate-800 leading-tight pt-[1px]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ─── DOCKED HERO PLACEHOLDER (Image docks precisely into this slot) ─── */}
            <div style={{ height: '52vh', marginTop: '1.5rem', marginBottom: '2.5rem' }} className="w-full pointer-events-none" />

                  {/* CompactDAQ In-Depth Specifications directly under Key Features */}
                  {product.id === 'compactdaq' && (
                    <div className="mt-14 space-y-12">

                      {/* COMPACTDAQ SYSTEM COMPONENTS */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          System Architecture
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                          CompactDAQ System Components
                        </h4>
                        <div className="w-full bg-white p-3 rounded-xl border border-slate-300 shadow-sm mb-5 flex items-center justify-center">
                          <img
                            src="/cdaq-components.jpg"
                            alt="CompactDAQ System Components"
                            className="w-full max-h-[300px] object-contain rounded-lg"
                          />
                        </div>
                        <p className="text-base text-slate-700 leading-relaxed font-medium mb-4">
                          Each CompactDAQ system includes a chassis that connects to your PC over USB or Ethernet, plus one or more I/O modules for measurements. You can control and analyze data using NI software—like LabVIEW or FlexLogger™—or choose from a wide range of common programming languages, including .NET, C#, and Python.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['LabVIEW', 'FlexLogger™', '.NET & C#', 'Python', 'USB Connectivity', 'Gigabit Ethernet'].map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white text-slate-800 text-xs font-semibold border border-slate-300 shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* COMPACTDAQ CHASSIS */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          Hardware Foundation
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                          CompactDAQ Chassis
                        </h4>
                        <div className="w-full bg-white p-3 rounded-xl border border-slate-300 shadow-sm mb-5 flex items-center justify-center">
                          <img
                            src="/cdaq-chassis.jpg"
                            alt="CompactDAQ Chassis Features"
                            className="w-full max-h-[320px] object-contain rounded-lg"
                          />
                        </div>
                        <p className="text-base text-slate-700 leading-relaxed font-medium mb-6">
                          CompactDAQ chassis connect your I/O modules to a PC over USB or Ethernet and unify your measurements for seamless data acquisition with built-in timing and synchronization. All chassis share the same core technology and module compatibility, but differ by communication bus, slot count, and environmental range.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { num: 1, label: "Module Latch Catches", desc: "Locks C-Series modules firmly into slots" },
                            { num: 2, label: "Status LEDs", desc: "Real-time power, ready and active status" },
                            { num: 3, label: "Bus Connector (USB or ENET)", desc: "Host PC or network uplink communication" },
                            { num: 4, label: "Power Supply Connector", desc: "9–30 VDC industrial power input" },
                            { num: 5, label: "Module Slots", desc: "1-, 2-, 8-, 14-slot capacity options" },
                            { num: 6, label: "Grounding Lug (on exterior)", desc: "Direct earth ground to shield signals" },
                            { num: 7, label: "Rear Mounting Hole", desc: "DIN rail and panel mount installation" },
                            { num: 8, label: "Desktop Mount Mounting Hole", desc: "Stable benchtop test positioning" },
                          ].map((item) => (
                            <div key={item.num} className="bg-white p-3.5 border border-slate-300 shadow-sm flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#E7651A] text-white flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                                {item.num}
                              </span>
                              <div>
                                <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">{item.label}</div>
                                <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">{item.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CONNECTIVITY OPTIONS AND CONSIDERATIONS */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          Connector Options
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                          Connectivity Options and Considerations
                        </h4>
                        <div className="w-full bg-white p-3 rounded-xl border border-slate-300 shadow-sm mb-5 flex items-center justify-center">
                          <img
                            src="/cdaq-connectors.jpg"
                            alt="CompactDAQ Connector Options"
                            className="w-full max-h-[320px] object-contain rounded-lg"
                          />
                        </div>
                        <p className="text-base text-slate-700 leading-relaxed font-medium mb-6">
                          CompactDAQ modules provide multiple connector options, giving you flexibility to match your wiring preferences, environmental needs, and installation requirements. These choices ensure your system is ready for a variety of test setups.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { num: 1, label: "NI-9205 Spring Terminal Module", desc: "Tool-free direct single-wire terminal connections" },
                            { num: 2, label: "Connect to cDAQ chassis", desc: "Robust backplane connection pins" },
                            { num: 3, label: "Spring-Terminal Connections", desc: "Vibration-proof quick push-in terminals" },
                            { num: 4, label: "Plastic Backshell", desc: "Protective strain relief around terminals" },
                            { num: 5, label: "NI-9205 D-SUB Module", desc: "High-density 37-pin D-SUB connector" },
                            { num: 6, label: "37-pin D-SUB Terminal Block", desc: "Modular DIN-mount signal breakout block" },
                            { num: 7, label: "NI 37-pin D-SUB Cable", desc: "Shielded multi-conductor interconnect cable" },
                          ].map((item) => (
                            <div key={item.num} className="bg-white p-3.5 border border-slate-300 shadow-sm flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-[#E7651A] text-white flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                                {item.num}
                              </span>
                              <div>
                                <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">{item.label}</div>
                                <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">{item.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* COMPACTDAQ VIDEO OVERVIEW */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          Video Walkthrough
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                          CompactDAQ Platform Walkthrough
                        </h4>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium mb-5">
                          Watch how CompactDAQ unifies multi-sensor instrumentation, signal conditioning, and LabVIEW synchronization in real-world test environments.
                        </p>
                        <CompactDAQVideoPlayer />
                      </div>

                      {/* 1. Measurement Versatility - Easy Sensor Connectivity */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          Measurement Versatility
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                          Easy Sensor Connectivity
                        </h4>
                        <p className="text-base text-slate-700 leading-relaxed font-medium mb-5">
                          CompactDAQ supports virtually any physical sensor with modules designed specifically for your measurement type. Each module includes the necessary signal conditioning and connectors, so you can spend less time worrying about setup and more time collecting accurate data. We’ve done the hard work—just choose the module that matches your sensor, and you’re ready to go.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['Thermocouples & RTDs', 'Strain Gauges & Bridges', 'Accelerometers (IEPE)', 'Voltage & Current', 'Digital I/O & Relays'].map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white text-slate-800 text-xs font-semibold border border-slate-300 shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 2. Industrial Durability - Compact, Rugged Design */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#0284c7] uppercase block mb-1">
                          Industrial Durability
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                          Compact, Rugged Design
                        </h4>
                        <p className="text-base text-slate-700 leading-relaxed font-medium mb-5">
                          Don’t worry about protecting your instrumentation—the CompactDAQ chassis handles 50 g shock and operates at -40 °C to 70 °C. Its compact size and flexible mounting options make it easy to set up near your device under test, reducing sensor wiring and preserving data quality. Designed for reliability, CompactDAQ lets you focus on the test, not the hardware.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-4 border border-slate-300 shadow-sm">
                            <div className="text-xl font-black text-slate-900">50 g</div>
                            <div className="text-xs text-slate-600 font-semibold mt-0.5">Shock Resistance (Half-Sine)</div>
                          </div>
                          <div className="bg-white p-4 border border-slate-300 shadow-sm">
                            <div className="text-xl font-black text-slate-900">-40 °C to 70 °C</div>
                            <div className="text-xs text-slate-600 font-semibold mt-0.5">Operating Temperature Range</div>
                          </div>
                        </div>
                      </div>

                      {/* 3. Key Applications */}
                      <div className="pt-8 border-t border-slate-300">
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                          Key Applications
                        </h4>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">
                          cDAQ-9183 CompactDAQ Ethernet chassis in a laboratory setting
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            "Electromechanical validation",
                            "Component test",
                            "Motor/pump test",
                            "Structural and durability test",
                            "Noise, vibration, and harshness test (NVH)",
                            "Research measurements",
                            "Cycle test systems",
                            "Performance benchmarks",
                            "Power and thermal tests",
                            "Power and battery characterization",
                            "HALT/HASS measurements",
                            "Sensor measurements"
                          ].map((app, i) => (
                            <div key={i} className="flex items-center gap-2.5 bg-white px-3.5 py-2.5 border border-slate-300 shadow-sm">
                              <Check className="w-4 h-4 text-[#E7651A] flex-shrink-0" strokeWidth={3} />
                              <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 4. Why Choose CompactDAQ Hardware? & Recommended Uses */}
                      <div className="pt-8 border-t border-slate-300 pb-4">
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                          Why Choose CompactDAQ Hardware?
                        </h4>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                          front view of 4 slot compactdaq chassis with modules
                        </p>
                        <p className="text-base text-slate-700 leading-relaxed font-medium mb-6">
                          CompactDAQ is a cost-effective approach to benchtop measurement. Pair sensor-specific, conditioned I/O modules with software optimized for DAQ applications.
                        </p>
                        
                        <div className="bg-white p-5 border border-slate-300 shadow-sm">
                          <h5 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#E7651A]" />
                            Recommended Uses:
                          </h5>
                          <div className="space-y-2.5">
                            {[
                              "High-channel-count distributed DAQ applications",
                              "Benchtop test and measurement",
                              "Mixed sensor measurements"
                            ].map((use, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                                <span className="text-[#E7651A] font-black">•</span>
                                <span>{use}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ─── CompactRIO In-Depth Specifications directly under Key Features ─── */}
                  {product.id === 'compactrio' && (
                    <div className="mt-14 space-y-12 pr-8 md:pr-12 pb-16">

                      {/* 1. COMPACTRIO SYSTEM COMPONENTS */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          System Architecture
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                          CompactRIO System Components
                        </h4>
                        <div className="w-full bg-white p-3 rounded-xl border border-slate-300 shadow-sm mb-5 flex items-center justify-center">
                          <img
                            src="/crio-components.jpg"
                            alt="CompactRIO System Components"
                            className="w-full max-h-[320px] object-contain rounded-lg"
                          />
                        </div>
                        <p className="text-base text-slate-700 leading-relaxed font-medium mb-4">
                          CompactRIO systems feature a controller with a processor running a Linux Real-Time OS and a chassis that contains a user-programmable FPGA. These systems support industrial I/O modules from both NI and third-party vendors.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'NI Linux Real-Time',
                            'User-Programmable FPGA',
                            'C-Series I/O Modules',
                            'LabVIEW Real-Time & FPGA',
                            'Deterministic Timing',
                            'Industrial IoT Ready'
                          ].map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white text-slate-800 text-xs font-semibold border border-slate-300 shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 2. CORE CAPABILITIES (4 Grid Cards) */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          Platform Pillars
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
                          Advanced Embedded Architecture
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            {
                              title: "Flexible Development Options",
                              desc: "Abstract low-level code and use a single toolchain to build and deploy time-critical applications on your CompactRIO system using NI LabVIEW and the real-time and FPGA modules.",
                              tag: "LabVIEW Toolchain",
                              icon: "/crio-icon-rocket.png"
                            },
                            {
                              title: "Long-Term Data Acquisition",
                              desc: "Utilize the integrated controller running a Linux Real-Time OS and sensor-specific I/O modules to build and deploy robust applications directly on the CompactRIO controller.",
                              tag: "Autonomous Field Edge",
                              icon: "/crio-icon-satellite.png"
                            },
                            {
                              title: "Combined DAQ and Control",
                              desc: "Take advantage of the user-programmable FPGA and integrate existing intellectual property (IP) when you need to acquire high-quality data and process and respond to it in real time.",
                              tag: "Hardware-Timed Speed",
                              icon: "/crio-icon-car.png"
                            },
                            {
                              title: "Open, Secure Platform",
                              desc: "Harness the openness of the NI Linux Real-Time OS through thousands of open-source applications, IP, and examples, while collaborating with an active community of users and developers.",
                              tag: "Open-Source Ecosystem",
                              icon: "/crio-icon-document.png"
                            }
                          ].map((card, idx) => (
                            <div
                              key={idx}
                              className="group relative overflow-hidden bg-white p-6 border border-slate-300 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
                            >
                              {/* Background Watermark Logo */}
                              <div className="absolute -bottom-3 -right-3 w-32 h-32 opacity-[0.14] pointer-events-none select-none transition-transform duration-300 group-hover:scale-110 group-hover:opacity-[0.22]">
                                <img
                                  src={card.icon}
                                  alt=""
                                  className="w-full h-full object-contain filter grayscale contrast-125"
                                />
                              </div>

                              {/* Card Content */}
                              <div className="relative z-10">
                                <h5 className="text-base font-bold text-slate-900 mb-2.5 group-hover:text-[#E7651A] transition-colors">
                                  {card.title}
                                </h5>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                  {card.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3. COMPACTRIO VIDEO OVERVIEW */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          Video Walkthrough
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                          CompactRIO Platform Walkthrough
                        </h4>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium mb-5">
                          Learn how CompactRIO combines real-time processing, FPGA hardware acceleration, and conditioned C-Series I/O for mission-critical industrial control and monitoring.
                        </p>
                        <CompactRIOVideoPlayer />
                      </div>

                      {/* 4. WHY CHOOSE COMPACTRIO? */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          Hardware Selection
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                          Why Choose CompactRIO?
                        </h4>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                          front view of ni compactrio system
                        </p>
                        
                        <div className="w-full bg-white p-4 rounded-xl border border-slate-300 shadow-sm mb-5 flex items-center justify-center">
                          <img
                            src="/crio-system.jpg"
                            alt="Front View of NI CompactRIO System"
                            className="w-full max-h-[320px] object-contain rounded-lg"
                          />
                        </div>

                        <p className="text-base text-slate-700 leading-relaxed font-medium mb-6">
                          CompactRIO hardware provides an industrial control and monitoring solution using sensor- or protocol-specific, conditioned I/O modules with real-time capabilities.
                        </p>
                        
                        <div className="bg-white p-5 border border-slate-300 shadow-sm">
                          <h5 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#E7651A]" />
                            Best For:
                          </h5>
                          <div className="space-y-2.5">
                            {[
                              "Real-time processing needs",
                              "Industrial monitoring and control applications",
                              "Long-term testing in the field"
                            ].map((use, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                                <span className="text-[#E7651A] font-black">•</span>
                                <span>{use}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ─── PXI In-Depth Specifications directly under Key Features ─── */}
                  {product.id === 'pxi' && (
                    <div className="mt-14 space-y-12 pr-8 md:pr-12 pb-16">

                      {/* 1. CHASSIS */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          System Foundation
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                          Chassis
                        </h4>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                          pxi chassis are available in various sizes, from 4 to 18 slots
                        </p>
                        <div className="w-full bg-white p-3 rounded-xl border border-slate-300 shadow-sm mb-5 flex items-center justify-center">
                          <img
                            src="/pxi-chassis.jpg"
                            alt="PXI Chassis (Available from 4 to 18 Slots)"
                            className="w-full max-h-[320px] object-contain rounded-lg"
                          />
                        </div>
                        <p className="text-base text-slate-700 leading-relaxed font-medium mb-4">
                          The chassis is the backbone of a PXI system and is comparable to a PC’s mechanical enclosure and motherboard. It provides power, cooling, and a communication bus to the system, and synchronizes the instrument modules. Chassis range in size from two to 18 slots to fit the needs of your application, whether you require a portable, benchtop, rack-mount, or embedded system.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            '2 to 18 Slot Capacity',
                            'PCI Express High-Throughput Bus',
                            'Integrated High-Flow Fan Cooling',
                            'Sub-Nanosecond Clock Synchronization',
                            'Benchtop, Portable & Rack-Mount'
                          ].map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white text-slate-800 text-xs font-semibold border border-slate-300 shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 2. CONTROLLER */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          Processing & Compute
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                          Controller
                        </h4>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                          integrated pxi controllers contain everything you need to run your pxi system without an external pc
                        </p>
                        <div className="w-full bg-white p-3 rounded-xl border border-slate-300 shadow-sm mb-5 flex items-center justify-center">
                          <img
                            src="/pxi-controller.jpg"
                            alt="PXI Integrated Embedded Controller"
                            className="w-full max-h-[320px] object-contain rounded-lg"
                          />
                        </div>
                        <p className="text-base text-slate-700 leading-relaxed font-medium mb-4">
                          NI PXI controllers are either embedded or remote. Embedded controllers contain everything you need to run your PXI system without an external PC, while remote controllers let you control your PXI system from a desktop, laptop, or server computer.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'High-Performance Intel Core & Xeon Processors',
                            'Integrated Windows 11 & Linux RTOS',
                            'Remote MXI-Express (Fiber & Copper)',
                            'Thunderbolt & High-Speed Ethernet Uplinks'
                          ].map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white text-slate-800 text-xs font-semibold border border-slate-300 shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 3. MODULES */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          Modular Instrumentation
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                          Modules
                        </h4>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                          In a PXI system, each module is its own instrument
                        </p>
                        <div className="w-full bg-white p-3 rounded-xl border border-slate-300 shadow-sm mb-5 flex items-center justify-center">
                          <img
                            src="/pxi-modules.png"
                            alt="Modular PXI Instruments DC to mmWave"
                            className="w-full max-h-[320px] object-contain rounded-lg"
                          />
                        </div>
                        <p className="text-base text-slate-700 leading-relaxed font-medium mb-4">
                          In a PXI system, each module is its own instrument. NI offers more than 600 PXI modules ranging from DC to mmWave. This includes standard instruments such as oscilloscopes, digital multimeters, and data acquisition modules, as well as interfaces including GPIB, serial, and CAN. Because PXI is an open industry standard, nearly 1,500 products are available from more than 70 different instrumentation vendors.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Over 600 NI PXI Modules',
                            'Oscilloscopes & DMMs',
                            'DC to mmWave RF & Vector Signal',
                            'GPIB, CAN, Serial & LIN Interfaces',
                            '70+ Global Instrumentation Vendors',
                            '1,500+ Ecosystem Products'
                          ].map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white text-slate-800 text-xs font-semibold border border-slate-300 shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 4. PLATFORM PILLARS (4 Grid Cards with Logo in Background) */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          Platform Capabilities
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
                          Architected for Advanced Test Automation
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            {
                              title: "Flexible and Scalable",
                              desc: "Achieve unparalleled accuracy, reliability, and timing-sync capabilities, with the ability to synchronize across multiple modules or chassis for system expansion. Scale and adapt as technologies evolve and test requirements change.",
                              tag: "System Expansion",
                              icon: "layers"
                            },
                            {
                              title: "High-Performance",
                              desc: "Experience high-quality instrumentation and highest performance, data throughput, and latency throughout your test and measurement applications.",
                              tag: "Throughput & Latency",
                              icon: "zap"
                            },
                            {
                              title: "Software-Defined",
                              desc: "Leverage the NI software workflow to measure in seconds with NI InstrumentStudio™ software and automate in minutes by developing application-specific measurement and analysis programs using the NI LabVIEW+ Suite, Python, and other languages on an open platform architecture.",
                              tag: "LabVIEW+ & Python",
                              icon: "sliders"
                            },
                            {
                              title: "Vibrant Ecosystem",
                              desc: "Connect with a global network of vendors, integrators, and consultants for unlimited customization and support.",
                              tag: "Global Network",
                              icon: "globe"
                            }
                          ].map((card, idx) => (
                            <div
                              key={idx}
                              className="group relative overflow-hidden bg-white p-6 border border-slate-300 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
                            >
                              {/* Background Watermark Graphic */}
                              <div className="absolute -bottom-3 -right-3 w-32 h-32 opacity-[0.10] pointer-events-none select-none text-[#E7651A] transition-transform duration-300 group-hover:scale-110 group-hover:opacity-[0.18] flex items-center justify-center">
                                {card.icon === 'layers' && <Layers className="w-28 h-28" strokeWidth={1.5} />}
                                {card.icon === 'zap' && <Zap className="w-28 h-28" strokeWidth={1.5} />}
                                {card.icon === 'sliders' && <Sliders className="w-28 h-28" strokeWidth={1.5} />}
                                {card.icon === 'globe' && <Globe className="w-28 h-28" strokeWidth={1.5} />}
                              </div>

                              {/* Card Content */}
                              <div className="relative z-10">
                                <h5 className="text-base font-bold text-slate-900 mb-2.5 group-hover:text-[#E7651A] transition-colors">
                                  {card.title}
                                </h5>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                  {card.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 5. VIDEO WALKTHROUGH */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          Video Walkthrough
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                          PXI Platform Walkthrough (1:04)
                        </h4>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium mb-5">
                          Watch how PXI unifies high-performance modular instrumentation, software automation, and multi-chassis synchronization for validation and production test.
                        </p>
                        <PXIVideoPlayer />
                      </div>

                      {/* 6. WHY CHOOSE PXI? */}
                      <div className="pt-8 border-t border-slate-300">
                        <span className="text-xs font-bold tracking-widest text-[#E7651A] uppercase block mb-1">
                          Hardware Architecture & ROI
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                          Why Choose PXI?
                        </h4>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                          blowout view of ni pxi chassis
                        </p>
                        
                        <div className="w-full bg-white p-4 rounded-xl border border-slate-300 shadow-sm mb-5 flex items-center justify-center">
                          <img
                            src="/pxi-blowout.png"
                            alt="Blowout View of NI PXI Chassis"
                            className="w-full max-h-[340px] object-contain rounded-lg"
                          />
                        </div>

                        <p className="text-base text-slate-700 leading-relaxed font-medium mb-6">
                          PXI offers engineers high performance while reducing test time and cost compared to traditional box instruments. The modular architecture, software integration, and built-in timing and synchronization capabilities make PXI ideal for advanced test applications that require precise, large-channel count, mixed-measurement solutions.
                        </p>
                        
                        <div className="bg-white p-5 border border-slate-300 shadow-sm">
                          <h5 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#E7651A]" />
                            Recommended Applications:
                          </h5>
                          <div className="space-y-2.5">
                            {[
                              "Production test systems for electronic devices",
                              "Automated validation test",
                              "High-channel, high-speed test applications",
                              "Combining instruments, sensor, and electrical measurements"
                            ].map((use, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                                <span className="text-[#E7651A] font-black">•</span>
                                <span>{use}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

          </motion.div>

          {/* ─── THE HERO MOCK (Shrinks automatically on initial scroll then moves up) ─── */}
          <motion.div
            style={{
              width: imageWidth,
              height: imageHeight,
              top: imageTop,
              right: 0,
              paddingRight: imagePaddingRight,
            }}
            className="absolute origin-top-right overflow-hidden shadow-none z-20 pointer-events-none"
          >
            <div className="relative w-full h-full overflow-hidden bg-white border border-slate-200 flex items-center justify-center">
              
              {/* Cyan corners like in the product grid */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-[#168a9f] z-30" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-[#168a9f] z-30" />

              <div className="absolute inset-0 z-10">
                {product.imageMock}
              </div>

              {/* Overlays */}
              <AnimatePresence>
                {showOverlays && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    style={{ opacity: overlayOpacity }}
                    className="absolute bottom-6 left-0 right-0 text-center z-40"
                  >
                    <p className="text-slate-500 font-bold tracking-widest text-sm drop-shadow-sm bg-white/80 px-4 py-1 inline-block rounded-full border border-slate-200">
                      {product.imageSubtitle}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Spacer before footer */}
      <div className="w-full h-32 md:h-48 bg-[#f2f2f2] pointer-events-none" />

      <Footer />
    </div>
  );
}
