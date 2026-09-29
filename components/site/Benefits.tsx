"use client";

import { useEffect, useState } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";
import { Compass, Settings, Activity, Network, Globe, Headset, Layers, Target } from "lucide-react";

const settings = { word: "BENEFITS", scrollLength: 2.4, interactive: true, annotations: false };

export default function Benefits(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  const face = "var(--font-sans, Inter, Arial, sans-serif)";
  
  return (
    <div data-demo-scroll data-slipstream-demo tabIndex={0} role="region" aria-label="Benefits. Scroll to step inside." id="benefits"
      style={{ width: "100%", background: "#0a0b0d", containerType: "inline-size", fontFamily: face }}>
      <style>{`
        [data-slipstream-demo] [data-gp-caption]{inset:calc(var(--gp-word-bottom,50%) + 82px) 24px auto;justify-content:center;}
        [data-slipstream-demo] [data-gp-hint]{display:none;}
        [data-slipstream-demo] [data-gp-enter]{min-height:46px;padding:0 20px;gap:28px;background:#142b22;border:1px solid #10261d;border-radius:10px;color:#fff;font-size:13px;font-weight:500;box-shadow:0 1px 2px #10261d1a;transition:background .18s,box-shadow .18s;}
        [data-slipstream-demo] [data-gp-enter]:hover{background:#204434;box-shadow:0 3px 8px #10261d18;}
        [data-slipstream-demo] [data-gp-enter]:focus-visible{outline:2px solid #176247;outline-offset:4px;}
        [data-slipstream-demo] [data-gp-touch-picker]{top:auto;bottom:18px;left:50%;}
        [data-slipstream-demo] [data-gp-select]{border-color:transparent;border-radius:8px;font-size:12px;color:#626964;}
        [data-sublime-header]{position:absolute;inset:clamp(24px,4.5cqw,48px) clamp(24px,5cqw,64px) auto;display:flex;align-items:center;justify-content:space-between;gap:20px;}
        [data-sublime-logo]{font-size:19px;font-weight:600;letter-spacing:-.065em;color:#0a0b0d;}
        [data-sublime-category]{font-size:12px;line-height:1.5;color:#4a4a4a;}
        [data-sublime-eyebrow]{position:absolute;inset:auto 24px calc(100% - var(--gp-word-top,35%) + 32px);margin:0;text-align:center;font-size:13px;font-weight:400;line-height:1.5;letter-spacing:.005em;color:#4a4a4a;}
        [data-sublime-support]{position:absolute;inset:calc(var(--gp-word-bottom,50%) + 32px) 24px auto;margin:0;text-align:center;font-size:16px;font-weight:400;line-height:1.5;color:#333333;}
        [data-sublime-scroll]{position:absolute;inset:auto 24px 7%;text-align:center;color:#666666;font-size:11px;letter-spacing:.01em;}
        @media(any-pointer:coarse){[data-sublime-scroll]{bottom:13%;}}
        @container(max-width:450px){[data-sublime-category]{max-width:12ch;text-align:right;}[data-sublime-eyebrow]{font-size:12px;}[data-sublime-support]{font-size:14px;}[data-slipstream-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 76px);}}
        @container(max-height:479px){[data-sublime-header]{top:18px;}[data-sublime-support]{top:calc(var(--gp-word-bottom,50%) + 16px);}[data-slipstream-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 60px);}[data-sublime-scroll]{display:none;}}
        [data-slipstream-demo] [data-gp-content]{padding:5.5rem clamp(1.25rem,5cqw,5rem) 6.5rem;font-family:inherit;}
        [data-slipstream-demo] section,[data-slipstream-demo] [data-gp-caption]{font-family:inherit;}
        [data-slipstream-copy]{display:flex;width:min(100%,80rem);margin:auto;flex-direction:column;align-items:flex-start;gap:clamp(2rem,5svh,3.5rem);}
        [data-slipstream-copy] h2{width:100%;max-width:100%;margin:0;color:inherit;font-size:clamp(1.75rem,1.1rem + 2.1cqw,2.25rem);font-weight:400;line-height:1.25;letter-spacing:0;text-wrap:balance;}
        [data-slipstream-features]{display:grid;width:100%;grid-template-columns:1fr;gap:1.75rem;}
        [data-slipstream-feature]{border-top:1px solid rgba(251,251,250,.22);padding-top:1.1rem;}
        [data-slipstream-feature] h3{margin:0;color:inherit;font-size:1.125rem;font-weight:600;line-height:1.3;letter-spacing:0;display:flex;flex-direction:column;gap:12px;}
        [data-slipstream-feature] h3 svg{color:#ffffff;}
        [data-slipstream-feature] p{margin:.75rem 0 0;color:rgba(251,251,250,.75);font-size:.9375rem;line-height:1.55;}
        [data-slipstream-no]{display:none;}
        @container(min-width:768px){[data-slipstream-features]{grid-template-columns:repeat(2,minmax(0,1fr));gap:3.5rem;}}
        @container(min-width:1024px){[data-slipstream-features]{grid-template-columns:repeat(4,minmax(0,1fr));gap:3.5rem;}}
      `}</style>
      <GlyphPortal word={s.word} fontFamily={face} fontWeight={700} style={{ fontFamily: face }} scrollLength={s.scrollLength} interactive={s.interactive} annotations={s.annotations} enterLabel="Step inside" front={<>
          <div data-sublime-header><span data-sublime-logo>vest.</span><span data-sublime-category>[ The Vest Advantage ]</span></div>
          <p data-sublime-eyebrow>Built for Reliability</p>
          <p data-sublime-support>Engineering Excellence</p>
          <span data-sublime-scroll>Scroll for a closer look ↓</span>
        </>}>
          <div data-slipstream-copy>
            <h2>We combine engineering expertise, industrial automation, LabVIEW, AI and software capabilities to deliver reliable, scalable and practical solutions that improve efficiency, simplify operations and support long-term growth.</h2>
            <div data-slipstream-features>
              <div data-slipstream-feature><h3><Compass className="w-6 h-6" /> Engineering Expertise</h3><p>Civil, structural and steel detailing deliverables prepared for fabrication and construction workflows.</p></div>
              <div data-slipstream-feature><h3><Settings className="w-6 h-6" /> Industrial Automation Experience</h3><p>Machine control, monitoring and test systems that connect hardware to dependable software.</p></div>
              <div data-slipstream-feature><h3><Activity className="w-6 h-6" /> LabVIEW & PLC Expertise</h3><p>From instrument control and DAQ to sequence logic, HMI and PLC-to-PC integration.</p></div>
              <div data-slipstream-feature><h3><Network className="w-6 h-6" /> AI & Software Engineering</h3><p>Data pipelines, analytics and models that turn machine data into decisions.</p></div>
              <div data-slipstream-feature><h3><Globe className="w-6 h-6" /> International Project Delivery</h3><p>Clear communication and documentation for teams across India, North America and Europe.</p></div>
              <div data-slipstream-feature><h3><Headset className="w-6 h-6" /> Remote Engineering Support</h3><p>Online troubleshooting and application support arranged around your project.</p></div>
              <div data-slipstream-feature><h3><Layers className="w-6 h-6" /> Scalable Technology Solutions</h3><p>Modular architectures that grow from a single machine to multi-site platforms.</p></div>
              <div data-slipstream-feature><h3><Target className="w-6 h-6" /> Customer-Focused Engineering</h3><p>Defined requirements, transparent progress and a maintainable handover.</p></div>
            </div>
          </div>
      </GlyphPortal>
    </div>
  );
}
