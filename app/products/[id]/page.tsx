"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { Check } from 'lucide-react';

const getProductData = (id: string) => {
  const allProducts = [
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

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = getProductData(params.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  
  const [layout, setLayout] = useState({
    dockTop: 0,
    maxScroll: 0,
    viewportHeight: 0,
    containerHeight: "300vh"
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
        containerHeight: containerH > vh * 2 ? `${containerH}px` : "250vh"
      });
    };
    
    measure();
    setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
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

  return (
    <div className="bg-[#f2f2f2] text-slate-900 font-sans selection:bg-blue-200">
      <div className="fixed top-0 left-0 w-full z-[60]">
        <Navbar />
      </div>

      <div ref={containerRef} style={{ height: layout.containerHeight }} className="relative">
        <div className="sticky top-0 left-0 w-full h-screen bg-[#f2f2f2] overflow-hidden">

          {/* --- LEFT COLUMN (Sticky) --- */}
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
                <a href={product.primaryCta.href} className="border border-slate-900 px-5 py-1.5 text-sm font-bold hover:bg-slate-900 hover:text-white transition-colors duration-150 text-slate-900 cursor-pointer tracking-wider flex items-center justify-center uppercase">
                  {product.primaryCta.label}
                </a>
                <a href={product.secondaryCta.href} className="border border-slate-900 px-5 py-1.5 text-sm font-bold hover:bg-slate-900 hover:text-white transition-colors duration-150 text-slate-900 cursor-pointer tracking-wider flex items-center gap-2 uppercase">
                  {product.secondaryCta.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-y-2 text-sm md:text-base pb-4 pointer-events-auto">
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

          {/* --- RIGHT COLUMN (Scrolls Up in Phase 2) --- */}
          <motion.div
            ref={rightColumnRef}
            style={{ y: rightColumnY }}
            className="absolute top-0 right-0 w-full md:w-[55%] flex flex-col z-10 pointer-events-auto"
          >
            {/* Description (Dynamic Height) */}
            <div ref={descRef} className="pt-[calc(15vh+4.5rem)] pl-0 pr-10">
              <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-medium text-slate-800">
                {product.lead}
              </p>
              
              {/* Additional content (Features, Tables) MOVED ABOVE IMAGE */}
              <div className="flex flex-col w-full mt-16 pr-0 pl-0 pb-8">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
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

            {/* Dynamic Gap placeholder where the Hero mock precisely docks (55vh) */}
            <div style={{ height: '55vh', marginTop: '5vh' }} className="w-full pointer-events-none" />
          </motion.div>

          {/* --- THE HERO MOCK (Shrinks then scrolls up) --- */}
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
