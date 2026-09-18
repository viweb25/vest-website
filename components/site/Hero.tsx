'use client';

import { useRef } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { scrollToId } from '@/hooks/use-lenis';
import Image from 'next/image';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#0a0b0d' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div aria-hidden className="absolute top-[-10%] left-[-5%] w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,180,220,0.07) 0%, transparent 70%)' }} />
      <div aria-hidden className="absolute bottom-0 right-[-5%] w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,46,140,0.06) 0%, transparent 70%)' }} />
        
      {/* Floating logo animations */}
      <style jsx>{`
        @keyframes socialFloat1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(6deg); }
        }
        @keyframes socialFloat2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(5deg); }
        }
        @keyframes socialFloat3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(8px); }
          66% { transform: translateY(-16px) translateX(-4px); }
        }
        @keyframes socialFloat4 {
          0%, 100% { transform: translateY(-50%) translateX(0px); }
          50% { transform: translateY(calc(-50% - 12px)) translateX(-6px); }
        }
        @keyframes socialFloat5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(4deg); }
        }
        @keyframes socialFloat6 {
          0%, 100% { transform: translateY(-50%) rotate(0deg); }
          50% { transform: translateY(calc(-50% + 12px)) rotate(-4deg); }
        }
      `}</style>

      {/* ── Floating social logos ── */}
      <div className="pointer-events-none absolute inset-0 -inset-x-6 sm:-inset-x-10 overflow-hidden">
        {/* LinkedIn - top left */}
        <div
          className="absolute top-[10%] left-2 sm:left-8 opacity-[0.15] dark:opacity-[0.2]"
          style={{ animation: 'socialFloat2 6.5s ease-in-out infinite' }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>

        {/* YouTube - top right */}
        <div
          className="absolute top-[15%] right-10 sm:right-16 opacity-[0.15] dark:opacity-[0.2]"
          style={{ animation: 'socialFloat5 7s ease-in-out infinite' }}
        >
          <svg width="32" height="22" viewBox="0 0 24 17" fill="none">
            <path d="M23.498 2.186A3.016 3.016 0 0021.38.068C19.505-.389 12-.389 12-.389S4.495-.389 2.62.068A3.016 3.016 0 00.502 2.186C.066 4.062.066 8 .066 8s0 3.938.436 5.814a3.016 3.016 0 002.118 2.118C4.495 16.389 12 16.389 12 16.389s7.505 0 9.38-.457a3.016 3.016 0 002.118-2.118C23.934 11.938 23.934 8 23.934 8s0-3.938-.436-5.814z" fill="#FF0000" />
            <path d="M9.545 11.568V4.432L15.818 8l-6.273 3.568z" fill="#fff" />
          </svg>
        </div>

        {/* Facebook - middle left */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-8 lg:left-16 opacity-[0.12] dark:opacity-[0.18]"
          style={{ animation: 'socialFloat3 8s ease-in-out infinite' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>

        {/* X (Twitter) - middle right */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-2 opacity-[0.12] dark:opacity-[0.18]"
          style={{ animation: 'socialFloat4 5.5s ease-in-out infinite' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>

        {/* Instagram - bottom right */}
        <div
          className="absolute bottom-[10%] right-4 sm:right-14 opacity-[0.15] dark:opacity-[0.2]"
          style={{ animation: 'socialFloat1 6s ease-in-out infinite' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <defs>
              <radialGradient id="igf" cx="30%" cy="107%" r="150%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="5%" stopColor="#fdf497" />
                <stop offset="45%" stopColor="#fd5949" />
                <stop offset="60%" stopColor="#d6249f" />
                <stop offset="90%" stopColor="#285AEB" />
              </radialGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#igf)" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="4.5" stroke="url(#igf)" strokeWidth="2" fill="none" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="url(#igf)" />
          </svg>
        </div>

        {/* LinkedIn (small) - bottom left */}
        <div
          className="absolute bottom-[15%] left-4 sm:left-10 opacity-[0.1] dark:opacity-[0.15]"
          style={{ animation: 'socialFloat6 7.5s ease-in-out infinite' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.15] dark:opacity-[0.2]"
          style={{ animation: 'socialFloat1 6s ease-in-out infinite' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <defs>
              <radialGradient id="igf" cx="30%" cy="107%" r="150%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="5%" stopColor="#fdf497" />
                <stop offset="45%" stopColor="#fd5949" />
                <stop offset="60%" stopColor="#d6249f" />
                <stop offset="90%" stopColor="#285AEB" />
              </radialGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#igf)" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="4.5" stroke="url(#igf)" strokeWidth="2" fill="none" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="url(#igf)" />
          </svg>
        </div>

        {/* YouTube (duplicate) - center gap */}
        <div
          className="absolute top-[64%] left-[30%] -translate-y-1/2 opacity-[0.15] dark:opacity-[0.2]"
          style={{ animation: 'socialFloat5 7.5s ease-in-out infinite' }}
        >
          <svg width="32" height="22" viewBox="0 0 24 17" fill="none">
            <path d="M23.498 2.186A3.016 3.016 0 0021.38.068C19.505-.389 12-.389 12-.389S4.495-.389 2.62.068A3.016 3.016 0 00.502 2.186C.066 4.062.066 8 .066 8s0 3.938.436 5.814a3.016 3.016 0 002.118 2.118C4.495 16.389 12 16.389 12 16.389s7.505 0 9.38-.457a3.016 3.016 0 002.118-2.118C23.934 11.938 23.934 8 23.934 8s0-3.938-.436-5.814z" fill="#FF0000" />
            <path d="M9.545 11.568V4.432L15.818 8l-6.273 3.568z" fill="#fff" />
          </svg>
        </div>
      </div>
      
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-10 flex flex-col lg:flex-row items-center gap-12 pt-36 pb-24 lg:pt-44 lg:pb-32">
        <div className="flex-1 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.15em] text-white/50 uppercase">Online &middot; Chennai, India</span>
          </div>
          <h1 className="font-display font-black text-[clamp(3rem,7vw,5.5rem)] leading-[1.0] tracking-[-0.03em] text-white mb-6">
            Your AI partner.<br />
            <span style={{
              background: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 50%, #ff2e8c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Embedded.</span>
          </h1>
          <p className="text-[clamp(1rem,1.8vw,1.2rem)] text-white/50 font-medium max-w-xl leading-relaxed mb-8">
            We embed state-of-the-art neural networks directly into NI LabVIEW &mdash; no cloud, no compromise.
            Deterministic AI at hardware cycle rates for Aerospace, Defence and Automotive.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-10 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03]">
            <span className="font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">NI-Certified</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">10+ Years</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">500+ Projects</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">India</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={() => scrollToId('about')}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-bold text-black shadow-xl transition-all hover:scale-[1.03]"
            >
              Book a Demo
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToId('process')}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[15px] font-semibold text-white/70 hover:text-white hover:border-white/30 transition-all"
            >
              See the Process
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-[13px] text-white/35 font-medium">
            <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> No cloud dependency</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Hardware-cycle rates</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> NI-Certified engineers</div>
          </div>
        </div>
        <div className="flex-1 relative flex justify-center w-full lg:w-auto pointer-events-none min-h-[420px]">
          <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full scale-75 -z-10" />
          <div className="absolute right-0 lg:right-4 top-0 z-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 pointer-events-auto">
            <div className="flex items-center gap-3 bg-[#121418]/90 border border-white/10 backdrop-blur-md shadow-xl rounded-xl px-4 py-3 hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-tight">Deployment Alert</span>
                <span className="text-[11px] text-white/40">AI model updated on PXI rack</span>
              </div>
            </div>
          </div>
          <div className="absolute left-0 lg:left-4 bottom-20 z-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700 pointer-events-auto">
            <div className="flex items-center gap-3 bg-[#121418]/90 border border-white/10 backdrop-blur-md shadow-xl rounded-xl px-4 py-3 hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400">
                <ShieldCheck size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-tight">NI-Certified</span>
                <span className="text-[11px] text-white/40">LabVIEW + AI Integration</span>
              </div>
            </div>
          </div>
          <div className="absolute left-0 lg:left-4 top-16 z-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 pointer-events-auto">
            <div className="flex items-center gap-3 bg-[#121418]/90 border border-white/10 backdrop-blur-md shadow-xl rounded-xl px-4 py-3 hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                <Zap size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-tight">Edge Inference</span>
                <span className="text-[11px] text-white/40">Hardware cycle-rate ready</span>
              </div>
            </div>
          </div>
          <Image
            src="/hero-image.png"
            alt="VI WebSync LabVIEW AI Dashboard"
            width={1200}
            height={800}
            className="w-full max-w-[900px] h-auto object-contain z-10 transition-transform duration-700 ease-out hover:scale-[1.02]"
            priority
          />
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" aria-hidden>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white uppercase">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}

