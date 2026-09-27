'use client';

import React, { useRef, useEffect } from 'react';
import {
  Monitor, CodeXml, Smartphone, Cloud, CheckCircle, ArrowUpRight, Star, Code,
  Building2, Users, ShoppingCart, AppWindow, TrendingUp, Settings, Database,
  Cpu, Network, LayoutDashboard, Bot, Factory, Briefcase, MapPin, UserCircle,
  Tablet, Layers, CloudCog, BarChart3, Brain, Eye, LineChart
} from 'lucide-react';
import Link from 'next/link';
const capabilities = [
  {
    eyebrow: 'WEBSITE DEVELOPMENT',
    title: 'Websites that drive business.',
    image: '/web.png',
    description: 'Modern, high-performance websites tailored for your business needs. We design, develop and deploy scalable web solutions that look great and deliver real results.',
    icon: Monitor,
    stats: [
      { value: '100+', label: 'PROJECTS DELIVERED' },
      { value: '4.9', label: 'CLIENT RATING ★' },
      { value: '98%', label: 'CLIENT RETENTION' },
      { value: '30+', label: 'INDUSTRIES SERVED' },
    ],
    items: [
      { name: 'Corporate Websites', desc: 'Professional websites for your brand', icon: Monitor },
      { name: 'Responsive Design', desc: 'Perfect on all devices', icon: Smartphone },
      { name: 'Engineering Websites', desc: 'Industry-focused web solutions', icon: Building2 },
      { name: 'SEO', desc: 'Higher visibility, more customers', icon: TrendingUp },
      { name: 'B2B Websites', desc: 'Scalable platforms for business growth', icon: Users },
      { name: 'API Integration', desc: 'Seamless third-party integration', icon: Settings },
      { name: 'E-Commerce', desc: 'Feature-rich online stores', icon: ShoppingCart },
      { name: 'CMS', desc: 'Easy content management', icon: Database },
      { name: 'Web Applications', desc: 'Custom web applications for your needs', icon: AppWindow },
      { name: 'Cloud Deployment', desc: 'Secure, scalable and reliable', icon: Cloud },
    ]
  },
  {
    eyebrow: 'SOFTWARE DEVELOPMENT',
    title: 'Software that powers industry.',
    image: '/software.png',
    description: 'Custom desktop and enterprise applications built for mission-critical operations. We deliver robust software architectures that streamline complex workflows.',
    icon: CodeXml,
    stats: [
      { value: '250+', label: 'APPLICATIONS BUILT' },
      { value: '100%', label: 'DATA SECURITY' },
      { value: '24/7', label: 'SYSTEM UPTIME' },
      { value: '15+', label: 'YEARS EXPERIENCE' },
    ],
    items: [
      { name: 'Custom Software', desc: 'Tailored to your specific workflows', icon: Code },
      { name: 'Desktop Applications', desc: 'High-performance native apps', icon: Monitor },
      { name: 'Enterprise Apps', desc: 'Scale across your organization', icon: Building2 },
      { name: 'Industrial Software', desc: 'Reliable control and monitoring', icon: Factory },
      { name: 'Engineering Software', desc: 'Complex mathematical modeling', icon: Cpu },
      { name: 'Database Apps', desc: 'Secure and structured data', icon: Database },
      { name: 'API Development', desc: 'Connect your digital ecosystem', icon: Network },
      { name: 'Dashboard Dev', desc: 'Real-time observability', icon: LayoutDashboard },
      { name: 'Business Automation', desc: 'Eliminate manual processes', icon: Bot },
    ]
  },
  {
    eyebrow: 'MOBILE APP DEVELOPMENT',
    title: 'Apps that connect users.',
    image: '/Mobile.png',
    description: 'Native and cross-platform mobile applications for business and industrial use cases. Providing real-time data access and control right from your pocket.',
    icon: Smartphone,
    stats: [
      { value: '1M+', label: 'APP DOWNLOADS' },
      { value: '4.8', label: 'APP STORE RATING' },
      { value: '99%', label: 'CRASH-FREE USERS' },
      { value: 'iOS/UI', label: 'CROSS-PLATFORM' },
    ],
    items: [
      { name: 'Android Apps', desc: 'Native performance for Android', icon: Smartphone },
      { name: 'iOS Applications', desc: 'Premium experience for Apple', icon: Tablet },
      { name: 'Cross-Platform', desc: 'Write once, deploy everywhere', icon: Layers },
      { name: 'Industrial Mobile', desc: 'Rugged device compatibility', icon: Factory },
      { name: 'Business Apps', desc: 'Internal tooling on the go', icon: Briefcase },
      { name: 'Field Service', desc: 'Offline-first capabilities', icon: MapPin },
      { name: 'Customer Portals', desc: 'Direct engagement channels', icon: UserCircle },
    ]
  },
  {
    eyebrow: 'CLOUD & AI',
    title: 'Intelligence at global scale.',
    image: '/CLOUD.png',
    description: 'Leverage the power of distributed computing and machine learning. We integrate predictive analytics and AI automation directly into your infrastructure.',
    icon: Cloud,
    stats: [
      { value: '50TB+', label: 'DATA PROCESSED/DAY' },
      { value: '<10ms', label: 'INFERENCE LATENCY' },
      { value: 'AWS/GCP', label: 'MULTI-CLOUD' },
      { value: '99.99%', label: 'AVAILABILITY' },
    ],
    items: [
      { name: 'Cloud Applications', desc: 'Serverless and microservices', icon: Cloud },
      { name: 'Cloud APIs', desc: 'Scalable backend endpoints', icon: CloudCog },
      { name: 'Database Systems', desc: 'Distributed data storage', icon: Database },
      { name: 'Data Analytics', desc: 'Actionable business insights', icon: BarChart3 },
      { name: 'AI Applications', desc: 'Intelligent decision making', icon: Brain },
      { name: 'Machine Learning', desc: 'Custom trained models', icon: Network },
      { name: 'Computer Vision', desc: 'Automated inspection & QA', icon: Eye },
      { name: 'Predictive Analytics', desc: 'Forecast trends and failures', icon: LineChart },
      { name: 'AI Automation', desc: 'Smart workflow triggers', icon: Bot },
      { name: 'Cloud Dashboards', desc: 'Global fleet monitoring', icon: LayoutDashboard },
    ]
  }
];

export default function TechnologyCapabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    let gsapCtx: any;
    const init = async () => {
      const [gsapModule, stModule] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      gsap.registerPlugin(ScrollTrigger);

      gsapCtx = gsap.context(() => {
        if (!sectionRef.current) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            pin: stickyRef.current,
          },
        });

        tl.to(introRef.current, {
          scale: 1.4,
          yPercent: -20,
          opacity: 0,
          duration: 1,
          ease: 'power1.inOut',
        }, 0);

        let currentTime = 1.0;
        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;
          tl.fromTo(panel,
            { xPercent: 100, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 1.5, ease: 'power1.inOut' },
            currentTime
          );
          const exitTime = currentTime + 2.5;
          if (i < panelRefs.current.length - 1) {
            tl.to(panel,
              { xPercent: -100, opacity: 0, duration: 1.5, ease: 'power1.inOut' },
              exitTime
            );
          } else {
            tl.to(panel,
              { scale: 0.95, yPercent: -5, opacity: 0, duration: 1.5, ease: 'power1.inOut' },
              exitTime
            );
          }
          currentTime = exitTime;
        });
      }, sectionRef);
    };
    init();
    return () => { if (gsapCtx) gsapCtx.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f8f9fa]"
      style={{ height: '250vh' }}
    >
      {/* Pinned Container */}
      <div
        ref={stickyRef}
        className="left-0 w-full h-screen overflow-hidden"
      >
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full bg-[#fafbfc] text-black"
          style={{ transition: 'none' }}
        />

        {/* --- MAIN CONTENT AREA --- */}
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">

          {/* 1. INTRO STATE */}
          <div
            ref={introRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray mb-6">
              [ CORE EXPERTISE ]
            </p>
            <h2 className="display text-[clamp(3rem,6vw,6rem)] font-bold tracking-[-0.03em] leading-[0.95] mb-8 text-black">
              Technology<br />Capabilities.
            </h2>
            <p className="text-[clamp(1.1rem,1.5vw,1.25rem)] font-medium max-w-2xl text-slate-500 text-balance leading-relaxed">
              Scroll to explore our comprehensive software solutions designed for scale, performance, and industrial reliability.
            </p>
          </div>

          {/* 2. HORIZONTAL PANELS */}
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;

            // Layout specific colors based on the panel
            const accentColors = ['text-[#0070f3]', 'text-[#0e7c86]', 'text-[#6366f1]', 'text-[#10b981]'];
            const bgAccentColors = ['bg-[#0070f3]', 'bg-[#0e7c86]', 'bg-[#6366f1]', 'bg-[#10b981]'];
            const hoverAccentColors = ['hover:text-[#0070f3]', 'hover:text-[#0e7c86]', 'hover:text-[#6366f1]', 'hover:text-[#10b981]'];
            const hoverBorderColors = ['hover:border-[#0070f3]', 'hover:border-[#0e7c86]', 'hover:border-[#6366f1]', 'hover:border-[#10b981]'];

            const currentAccent = accentColors[i];
            const currentBgAccent = bgAccentColors[i];
            const currentHoverAccent = hoverAccentColors[i];
            const currentHoverBorder = hoverBorderColors[i];

            return (
              <div
                key={cap.eyebrow}
                ref={(el) => { panelRefs.current[i] = el; }}
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pt-20 pb-12"
              >
                <div className="max-w-[1400px] w-full h-full px-4 md:px-8 xl:px-12 flex flex-col pointer-events-auto">

                  {/* TWO COLUMN MAIN CONTENT */}
                  <div className="flex flex-col lg:flex-row gap-12 flex-1 min-h-0">

                    {/* LEFT COLUMN: TITLE & COLLAGE */}
                    <div className="lg:w-[45%] flex flex-col">
                      <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-4">
                        {cap.eyebrow}
                      </p>
                      <h3 className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-tight leading-[1.1] text-black mb-6">
                        {cap.title}
                      </h3>
                      <p className="text-[17px] leading-relaxed max-w-lg mb-10 animate-shimmer font-medium">
                        {cap.description}
                      </p>

                      {/* Image representing the UI */}
                      <div className={`relative flex-1 min-h-[250px] hidden md:flex items-center justify-start mt-6 ${i === 0
                          ? "w-[110%] max-w-[700px] lg:-ml-16 xl:-ml-24"
                          : "w-full max-w-[550px] lg:-ml-4 xl:-ml-8"
                        }`}>
                        <img
                          src={cap.image || "/web.png"}
                          alt={`${cap.eyebrow} Showcase`}
                          className={`w-full h-auto object-contain drop-shadow-2xl mix-blend-multiply dark:mix-blend-normal ${i === 0 ? "max-h-[450px] transform lg:scale-110 origin-left" : "max-h-[350px]"
                            }`}
                        />
                      </div>
                    </div>

                    {/* RIGHT COLUMN: SERVICES GRID & TRUSTPILOT */}
                    <div className="lg:w-[55%] flex flex-col h-full pt-2">

                      {/* STATS BAR (Matches width of right column) */}
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-6 mb-6">
                        {cap.stats.map((stat, idx) => (
                          <React.Fragment key={idx}>
                            <div className="flex flex-col gap-1">
                              <span className="text-2xl md:text-[28px] font-extrabold text-black tracking-tight leading-none">{stat.value}</span>
                              <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-1">{stat.label}</span>
                            </div>
                            {idx < cap.stats.length - 1 && (
                              <div className="hidden md:block w-px h-8 bg-slate-200/80" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 pb-2 flex-1">
                        {cap.items.map((item, idx) => {
                          const ItemIcon = item.icon;
                          const isLastInCol = idx >= cap.items.length - 2; // Rough approximation for border-b removal

                          return (
                            <div key={idx} className={`flex items-center gap-4 py-4 ${!isLastInCol ? 'border-b border-slate-200/60' : ''}`}>
                              {/* Icon without border */}
                              <div className="flex-shrink-0 w-11 h-11 bg-transparent flex items-center justify-center">
                                <ItemIcon size={21} strokeWidth={1.75} className="text-slate-800" />
                              </div>

                              {/* Text content */}
                              <div className="flex-1 flex flex-col justify-center">
                                <h4 className="text-[14px] font-bold text-black mb-0.5 tracking-tight">{item.name}</h4>
                                <p className="text-[11.5px] text-slate-500 leading-tight">{item.desc}</p>
                              </div>

                              {/* Checkmark */}
                              <CheckCircle size={15} strokeWidth={2.5} className={`${currentAccent} opacity-80 flex-shrink-0`} />
                            </div>
                          );
                        })}
                      </div>

                      {/* Bottom action area */}
                      <div className="mt-auto pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-6">
                        {/* Trustpilot Review */}
                        <div className="flex flex-col max-w-[280px]">
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, idx) => (
                              <Star key={idx} size={14} className="fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-xs font-bold text-slate-700 ml-2">4.9/5 on Trustpilot</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed italic">
                            "Their work has been phenomenal. We went from a simple concept to a complete digital presence in just a few months."
                          </p>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
                          <p className="text-sm font-bold text-slate-800">Want a solution like this?</p>
                          <Link href="/contact" className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-800 ${currentHoverAccent} ${currentHoverBorder} hover:-translate-y-0.5 transition-all text-sm font-bold shadow-sm`}>
                            Start Your Project
                            <ArrowUpRight size={17} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
      {/* Custom Shine Animation for Description */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #64748b 0%, #cbd5e1 30%, #475569 50%, #cbd5e1 70%, #64748b 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }
      `}} />
    </section>
  );
}
