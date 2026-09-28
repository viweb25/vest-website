'use client';

import React from 'react';
import { FlowArt, FlowSection } from '@/components/ui/story-scroll';
import { TestimonialsSection } from './TestimonialsSection';
import {
  Compass, Settings, Gem, Database, MonitorCog, ShieldCheck,
  Search, Workflow, TrendingUp, Handshake, RefreshCw,
  Globe, Cpu, Award, Link as LinkIcon, Zap, Shield, Users
} from 'lucide-react';

export function FlowArtDemo() {
  return (
    <FlowArt aria-label="Présentation Flow Art">
      <FlowSection aria-label="Qui nous sommes" style={{ backgroundColor: '#ffffffff', color: '#000' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">Who we are</p>
        <div>
          <h1 className="text-[clamp(2.5rem,7vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight w-full">
            Engineering Excellence
          </h1>
        </div>
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          We bridge the gap between complex engineering and intuitive technology. Delivering industrial solutions built for modern enterprises.
        </p>
      </FlowSection>

      <FlowSection aria-label="La mission" style={{ backgroundColor: '#000', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">The mission</p>
        <div>
          <h2 className="text-[clamp(2.5rem,7vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight w-full">
            Innovation First Always
          </h2>
        </div>
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          A team built for complex problem-solving. We're redefining how industrial hardware and software systems integrate seamlessly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-[3vw] w-full mt-4">
          <div className="flex-1">
            <Compass className="mb-4 w-6 h-6 text-[#1D79C5]" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Design</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Precision-engineered architectures that scale effortlessly with your business requirements.
            </p>
          </div>
          <div className="flex-1">
            <Users className="mb-4 w-6 h-6 text-[#1D79C5]" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Integration</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Seamless deployment of software and hardware ecosystems working in perfect harmony.
            </p>
          </div>
          <div className="flex-1">
            <Gem className="mb-4 w-6 h-6 text-[#1D79C5]" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Quality</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Uncompromising standards across all engineering deliverables and documentation.
            </p>
          </div>

          <div className="flex-1">
            <Settings className="mb-4 w-6 h-6 text-[#1D79C5]" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Automation</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Intelligent control systems, PLCs, and advanced industrial automation.
            </p>
          </div>
          <div className="flex-1">
            <Database className="mb-4 w-6 h-6 text-[#1D79C5]" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Data Systems</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Secure cloud infrastructure, analytics, and real-time monitoring platforms.
            </p>
          </div>
          <div className="flex-1">
            <MonitorCog className="mb-4 w-6 h-6 text-[#1D79C5]" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Testing</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              LabVIEW-based DAQ, Hardware-in-the-Loop (HIL), and specialized machine testing.
            </p>
          </div>
        </div>
        <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          Every system we build starts with one question — does it solve the core problem?
        </p>
      </FlowSection>

      <FlowSection aria-label="Comment ça marche" style={{ backgroundColor: '#F5F0E8', color: '#000' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">How it works</p>
        <div>
          <h2 className="text-[clamp(2.5rem,7vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight w-full">
            Analyze. Architect. Automate.
          </h2>
        </div>
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          Three phases. Zero complexity. We streamline your operations from day one.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-[3vw] w-full mt-4">
          <div className="flex-1">
            <Search className="mb-4 w-6 h-6 text-orange-600" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Analyze</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Deep dive into your requirements, constraints, and long-term business goals.
            </p>
          </div>
          <div className="flex-1">
            <Workflow className="mb-4 w-6 h-6 text-orange-600" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Architect</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Design robust systems tailored specifically to your unique workflow and standards.
            </p>
          </div>
          <div className="flex-1">
            <TrendingUp className="mb-4 w-6 h-6 text-orange-600" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Automate</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Deploy, scale, and optimize operations for maximum efficiency and output.
            </p>
          </div>

          <div className="flex-1">
            <ShieldCheck className="mb-4 w-6 h-6 text-orange-600" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Validate</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Rigorous testing, calibration, and compliance checks before every rollout.
            </p>
          </div>
          <div className="flex-1">
            <Handshake className="mb-4 w-6 h-6 text-orange-600" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Collaborate</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Ongoing partnership, maintenance (AMC), and continuous technical support.
            </p>
          </div>
          <div className="flex-1">
            <RefreshCw className="mb-4 w-6 h-6 text-orange-600" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Evolve</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Your industry changes. Our digital solutions adapt and grow with you.
            </p>
          </div>
        </div>
      </FlowSection>

      <FlowSection aria-label="La vision" style={{ backgroundColor: '#000', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">The vision</p>
        <div>
          <h2 className="text-[clamp(2.5rem,7vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight w-full">
            Future Of Industry
          </h2>
        </div>
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          We're not just delivering projects. We're engineering the future.
        </p>
        <div className="flex flex-wrap gap-[3vw] mt-4">
          <div className="min-w-[180px] flex-1">
            <Globe className="mb-4 w-6 h-6 text-[#1D79C5]" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Global Reach</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Deploying complex systems across borders for international clients.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <Cpu className="mb-4 w-6 h-6 text-[#1D79C5]" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Intelligent</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              AI-driven analytics, machine vision, and predictive maintenance.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <Award className="mb-4 w-6 h-6 text-[#1D79C5]" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">100% Reliable</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Mission-critical solutions designed for precision and zero downtime.
            </p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-stretch gap-10 xl:gap-10 mt-6">
          {/* Left Side (Text Block) */}
          <div className="xl:w-[40%] flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
                A new era for industry
              </p>
              <div className="h-px w-12 bg-[#38bdf8]/40" />
            </div>
            <p className="text-[clamp(1rem,1.5vw,1.35rem)] font-medium leading-relaxed max-w-[450px]">
              Traditional engineering is siloed. <br className="hidden md:block" />
              Hardware and software are often disconnected. <br className="hidden md:block" />
              <span className="text-[#38bdf8]">We're here to unify them — permanently.</span>
            </p>
          </div>

          {/* Right Side (3 Items) */}
          <div className="xl:w-[60%] flex flex-col sm:flex-row items-stretch gap-8 sm:gap-0">
            <div className="flex-1 flex flex-col sm:pr-8">
              <LinkIcon className="mb-4 w-6 h-6 text-[#38bdf8]" strokeWidth={1.5} />
              <p className="mb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">Seamless Integration</p>
              <p className="text-[clamp(0.75rem,1vw,0.95rem)] leading-relaxed opacity-75">
                Bridging IT and OT for complete operational visibility and control.
              </p>
            </div>

            <div className="hidden sm:block w-px bg-white/20 mx-4" />

            <div className="flex-1 flex flex-col sm:px-8">
              <Zap className="mb-4 w-6 h-6 text-[#38bdf8]" strokeWidth={1.5} />
              <p className="mb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">High Performance</p>
              <p className="text-[clamp(0.75rem,1vw,0.95rem)] leading-relaxed opacity-75">
                Optimized algorithms and hardware for real-time control and speed.
              </p>
            </div>

            <div className="hidden sm:block w-px bg-white/20 mx-4" />

            <div className="flex-1 flex flex-col sm:pl-8">
              <Shield className="mb-4 w-6 h-6 text-[#38bdf8]" strokeWidth={1.5} />
              <p className="mb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">Enterprise Security</p>
              <p className="text-[clamp(0.75rem,1vw,0.95rem)] leading-relaxed opacity-75">
                Data protection, access control, and highly secure cloud architectures.
              </p>
            </div>
          </div>
        </div>
      </FlowSection>

      <TestimonialsSection />
    </FlowArt>
  );
}
