'use client';

import dynamic from 'next/dynamic';
import { ThreeProvider } from '@/lib/three-context';
import { useLenis } from '@/hooks/use-lenis';
import Navbar from '@/components/site/Navbar';
import Hero from '@/components/site/Hero';
import Features from '@/components/site/Features';
import About from '@/components/site/About';
import Pricing from '@/components/site/Pricing';
import SocialAutopilot from '@/components/site/SocialAutopilot';
import Contact from '@/components/site/Contact';
import Footer from '@/components/site/Footer';

// Heavy animation/3D components — deferred until after first render
const ScrollStorySection = dynamic(
  () => import('@/components/animations/ScrollStorySection'),
  { ssr: false }
);
const Pipeline = dynamic(
  () => import('@/components/site/Pipeline'),
  { ssr: false }
);
const ShowcaseSection = dynamic(
  () => import('@/components/site/ShowcaseSection'),
  { ssr: false }
);
const CoreCapabilities = dynamic(
  () => import('@/components/site/CoreCapabilities'),
  { ssr: false }
);
const ObservabilityDashboard = dynamic(
  () => import('@/components/ui/ObservabilityDashboardDefault'),
  { ssr: false }
);
const FAQ = dynamic(() => import('@/components/site/FAQ'), { ssr: false });
const GlobeSection = dynamic(() => import('@/components/site/GlobeSection'), { ssr: false });
const Benefits = dynamic(() => import('@/components/site/Benefits'), { ssr: false });

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
