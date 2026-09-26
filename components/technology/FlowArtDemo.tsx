'use client';

import React from 'react';
import { FlowArt, FlowSection } from '@/components/ui/story-scroll';
import { TestimonialsSection } from './TestimonialsSection';
import {
  Compass, Users, Gem, Image as ImageIcon, GraduationCap, Building,
  UploadCloud, Link as LinkIcon, TrendingUp, ShoppingCart, Handshake, RefreshCw,
  Globe, Banknote, Award, Unlock, Earth, PieChart
} from 'lucide-react';

export function FlowArtDemo() {
  return (
    <FlowArt aria-label="Présentation Flow Art">
      <FlowSection aria-label="Qui nous sommes" style={{ backgroundColor: '#ffffffff', color: '#000' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">Who we are</p>
        <div>
          <h1 className="text-[clamp(2.5rem,7vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight w-full">
            Create Without Limits
          </h1>
        </div>
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          We believe every artist deserves a platform that puts creativity first. No algorithms, no
          noise — just pure art and the people who make it.
        </p>
      </FlowSection>

      <FlowSection aria-label="La mission" style={{ backgroundColor: '#000', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">The mission</p>
        <div>
          <h2 className="text-[clamp(2.5rem,7vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight w-full">
            Art First Always
          </h2>
        </div>
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          A global community built for artists, by artists. We're rewriting the rules of how
          creative work gets seen, shared, and valued.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-[3vw] w-full mt-4">
          <div className="flex-1">
            <Compass className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Discovery</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Human-curated collections that put real eyes on real art. No algorithms deciding your fate.
            </p>
          </div>
          <div className="flex-1">
            <Users className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Community</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Find collaborators, mentors, and fellow creatives who push your work forward.
            </p>
          </div>
          <div className="flex-1">
            <Gem className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Value</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Fair pricing. Transparent commissions. Artists keep what they earn. Always.
            </p>
          </div>

          <div className="flex-1">
            <ImageIcon className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Exhibitions</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Virtual and physical showcases curated from our global network.
            </p>
          </div>
          <div className="flex-1">
            <GraduationCap className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Mentorship</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Paired guidance from established artists who've walked the path.
            </p>
          </div>
          <div className="flex-1">
            <Building className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Residencies</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Access funded creative retreats around the world.
            </p>
          </div>
        </div>
        <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          Every feature we build starts with one question — does this serve the artist?
        </p>
      </FlowSection>

      <FlowSection aria-label="Comment ça marche" style={{ backgroundColor: '#F5F0E8', color: '#000' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">How it works</p>
        <div>
          <h2 className="text-[clamp(2.5rem,7vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight w-full">
            Show Up. Stand Out.
          </h2>
        </div>
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          Three steps. Zero complexity. Your creative career starts moving the moment you sign up.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-[3vw] w-full mt-4">
          <div className="flex-1">
            <UploadCloud className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Upload</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Drag, drop, done. Your portfolio goes live in seconds with full creative control.
            </p>
          </div>
          <div className="flex-1">
            <LinkIcon className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Connect</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Match with collectors, galleries, and brands actively looking for your style.
            </p>
          </div>
          <div className="flex-1">
            <TrendingUp className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Grow</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Track engagement, manage commissions, and scale your practice — all in one place.
            </p>
          </div>

          <div className="flex-1">
            <ShoppingCart className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Sell</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Set your prices, manage editions, handle licensing. Built-in commerce tools.
            </p>
          </div>
          <div className="flex-1">
            <Handshake className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Collaborate</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Find your people. Joint projects, split commissions, shared studios.
            </p>
          </div>
          <div className="flex-1">
            <RefreshCw className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Evolve</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Your practice changes. Your platform should too. Flexible tools that adapt.
            </p>
          </div>
        </div>
      </FlowSection>

      <FlowSection aria-label="La vision" style={{ backgroundColor: '#000', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">The vision</p>
        <div>
          <h2 className="text-[clamp(2.5rem,7vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight w-full">
            Future Of Art
          </h2>
        </div>
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          We're not just building a platform. We're building a movement.
        </p>
        <div className="flex flex-wrap gap-[3vw] mt-4">
          <div className="min-w-[180px] flex-1">
            <Globe className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">10K+</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Artists from 80 countries already shaping the future with us.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <Banknote className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">$2M+</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Paid directly to creators in our first year. Zero hidden fees.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <Award className="mb-4 w-6 h-6 opacity-80" />
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">100%</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Artist-owned. Every decision we make starts with the creator.
            </p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-stretch gap-10 xl:gap-10 mt-6">

          {/* Left Side (Text Block) */}
          <div className="xl:w-[40%] flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
                A new era for creators
              </p>
              <div className="h-px w-12 bg-[#38bdf8]/40" />
            </div>
            <p className="text-[clamp(1rem,1.5vw,1.35rem)] font-medium leading-relaxed max-w-[450px]">
              The art world has been broken for decades. <br className="hidden md:block" />
              Galleries take 50%. Algorithms bury talent. <br className="hidden md:block" />
              <span className="text-[#38bdf8]">We're here to change that — permanently.</span>
            </p>
          </div>

          {/* Right Side (3 Items) */}
          <div className="xl:w-[60%] flex flex-col sm:flex-row items-stretch gap-8 sm:gap-0">
            {/* Item 1 */}
            <div className="flex-1 flex flex-col sm:pr-8">
              <Unlock className="mb-4 w-6 h-6 opacity-80" strokeWidth={1.5} />
              <p className="mb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">Open access</p>
              <p className="text-[clamp(0.75rem,1vw,0.95rem)] leading-relaxed opacity-75">
                No invite codes. No waiting lists. If you make art, you belong here.
              </p>
            </div>

            {/* Divider 1 */}
            <div className="hidden sm:block w-px bg-white/20 mx-4" />

            {/* Item 2 */}
            <div className="flex-1 flex flex-col sm:px-8">
              <Earth className="mb-4 w-6 h-6 opacity-80" strokeWidth={1.5} />
              <p className="mb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">Global reach</p>
              <p className="text-[clamp(0.75rem,1vw,0.95rem)] leading-relaxed opacity-75">
                Your work seen in 120+ countries from day one.
              </p>
            </div>

            {/* Divider 2 */}
            <div className="hidden sm:block w-px bg-white/20 mx-4" />

            {/* Item 3 */}
            <div className="flex-1 flex flex-col sm:pl-8">
              <PieChart className="mb-4 w-6 h-6 opacity-80" strokeWidth={1.5} />
              <p className="mb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">Artist-first economics</p>
              <p className="text-[clamp(0.75rem,1vw,0.95rem)] leading-relaxed opacity-75">
                You keep 90% of every sale. The remaining 10% funds the platform and the mission.
              </p>
            </div>
          </div>
        </div>
      </FlowSection>

      <TestimonialsSection />
    </FlowArt>
  );
}
