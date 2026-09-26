'use client';

import dynamic from 'next/dynamic';
import { ThreeProvider } from '@/lib/three-context';
import { useLenis } from '@/hooks/use-lenis';
import Navbar from '@/components/site/Navbar';
import Hero from '@/components/site/Hero';
import ScrollStorySection from '@/components/animations/ScrollStorySection';
import Features from '@/components/site/Features';
import About from '@/components/site/About';
import Pipeline from '@/components/site/Pipeline';
import Pricing from '@/components/site/Pricing';
import SocialAutopilot from '@/components/site/SocialAutopilot';
import Benefits from '@/components/site/Benefits';
import Contact from '@/components/site/Contact';
import Footer from '@/components/site/Footer';
import ShowcaseSection from '@/components/site/ShowcaseSection';
import CoreCapabilities from '@/components/site/CoreCapabilities';
import { ObservabilityDashboard } from '@/components/ui/observability-dashboard';
import FAQ from '@/components/site/FAQ';
import GlobeSection from '@/components/site/GlobeSection';

const AmbientBackground = dynamic(
  () => import('@/components/three/AmbientBackground'),
  { ssr: false }
);
const ScrollReveal = dynamic(
  () => import('@/components/three/ScrollReveal'),
  { ssr: false }
);

function LenisBridge() {
  useLenis();
  return null;
}

export default function Home() {
  return (
    <ThreeProvider>
      <LenisBridge />
      {/* <AmbientBackground /> */}
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        {/* <About /> */}
        <CoreCapabilities />
        <ScrollStorySection />
        <Pipeline />
        <ObservabilityDashboard />
        <Benefits />
        <ShowcaseSection />
        <GlobeSection />
        <FAQ />
        {/* <Contact /> */}
        {/* Unused generic sections */}
        {/* <Features /> */}
        {/* <SocialAutopilot /> */}
        {/* <Pricing /> */}
      </main>
      <Footer />
    </ThreeProvider>
  );
}
