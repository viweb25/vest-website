
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { SectionHeader } from '@/components/ui/section-header';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PHASES = [
  {
    n: '01',
    tag: 'Lorem Ipsum',
    title: 'Dolor Sit Amet Consectetur',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    highlights: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Sed do eiusmod tempor',
    ],
    img: '/images/pipeline/phase_01.jpg',
    accentBg: 'bg-blue-600',
    accentText: 'text-blue-600',
    accentDot: 'bg-blue-600',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-700',
  },
  {
    n: '02',
    tag: 'Adipiscing',
    title: 'Elit Sed Do Eiusmod',
    desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    highlights: [
      'Ut enim ad minim veniam',
      'Quis nostrud exercitation',
      'Ullamco laboris nisi ut aliquip',
    ],
    img: '/images/pipeline/phase_02.jpg',
    accentBg: 'bg-orange-500',
    accentText: 'text-orange-600',
    accentDot: 'bg-orange-500',
    tagBg: 'bg-orange-50',
    tagText: 'text-orange-700',
  },
  {
    n: '03',
    tag: 'Consectetur',
    title: 'Incididunt Ut Labore Et',
    desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.',
    highlights: [
      'Duis aute irure dolor in',
      'Reprehenderit in voluptate velit',
      'Esse cillum dolore eu fugiat',
    ],
    img: '/images/pipeline/phase_03.jpg',
    accentBg: 'bg-blue-500',
    accentText: 'text-blue-500',
    accentDot: 'bg-blue-500',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-600',
  },
  {
    n: '04',
    tag: 'Eiusmod',
    title: 'Dolore Magna Aliqua',
    desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    highlights: [
      'Excepteur sint occaecat cupidatat',
      'Non proident sunt in culpa',
      'Officia deserunt mollit anim',
    ],
    img: '/images/pipeline/phase_04.jpg',
    accentBg: 'bg-orange-600',
    accentText: 'text-orange-600',
    accentDot: 'bg-orange-600',
    tagBg: 'bg-orange-50',
    tagText: 'text-orange-700',
  },
  {
    n: '05',
    tag: 'Tempor',
    title: 'Ut Enim Ad Minim',
    desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.',
    highlights: [
      'Sed ut perspiciatis unde',
      'Omnis iste natus error',
      'Sit voluptatem accusantium',
    ],
    img: '/images/pipeline/phase_05.jpg',
    accentBg: 'bg-blue-700',
    accentText: 'text-blue-700',
    accentDot: 'bg-blue-700',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-800',
  },
  {
    n: '06',
    tag: 'Optimisation',
    title: 'Model Quantisation & Compression',
    desc: 'We quantise, prune, and compress AI models to meet the strict memory and compute constraints of FPGA and cRIO targets — without sacrificing inference accuracy on safety-critical outputs.',
    highlights: [
      'INT8 / FP16 quantisation for FPGA',
      'Structured pruning for cRIO targets',
      'Accuracy-latency trade-off profiling',
    ],
    img: '/images/pipeline/phase_06.jpg',
    accentBg: 'bg-orange-500',
    accentText: 'text-orange-600',
    accentDot: 'bg-orange-500',
    tagBg: 'bg-orange-50',
    tagText: 'text-orange-700',
  },
  {
    n: '07',
    tag: 'Compliance',
    title: 'Safety & Standards Certification',
    desc: 'We prepare the AI-integrated LabVIEW system for DO-178C (aerospace), MIL-STD-882 (defence), and ISO 26262 (automotive) compliance — generating traceability matrices and V&V evidence.',
    highlights: [
      'DO-178C & DO-254 evidence packages',
      'MIL-STD-882 hazard analysis',
      'ISO 26262 functional safety (ASIL)',
    ],
    img: '/images/pipeline/phase_07.jpg',
    accentBg: 'bg-blue-600',
    accentText: 'text-blue-600',
    accentDot: 'bg-blue-600',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-700',
  },
  {
    n: '08',
    tag: 'Support',
    title: 'Long-Term AI Model Support',
    desc: 'Post-deployment, we provide continuous model performance monitoring, scheduled retraining with new field data, remote diagnostics, and LabVIEW VI updates to keep your system at peak accuracy.',
    highlights: [
      'Continuous performance monitoring',
      'Scheduled retraining pipelines',
      'Remote diagnostics & VI updates',
    ],
    img: '/images/pipeline/phase_08.jpg',
    accentBg: 'bg-orange-600',
    accentText: 'text-orange-600',
    accentDot: 'bg-orange-600',
    tagBg: 'bg-orange-50',
    tagText: 'text-orange-700',
  },
];

export default function Pipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const proxy = { rotation: 0 };
      const totalRotation = -((PHASES.length - 1) * (360 / PHASES.length));

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 0.8,
        animation: gsap.to(proxy, {
          rotation: totalRotation,
          ease: 'power1.inOut',
          onUpdate: () => {
            setRotation(proxy.rotation);
          }
        })
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const galleryItems: GalleryItem[] = PHASES.map(phase => ({
    common: phase.title,
    binomial: phase.desc,
    photo: {
      url: phase.img,
      text: phase.title,
      by: phase.tag
    }
  }));

  return (
    <>
      {/* Header Section (Scrolls naturally) */}
      <section id="process-intro" className="relative w-full bg-white pt-24 pb-8">
        <div className="text-center z-20 px-4 sm:px-8 w-full">
          <SectionHeader 
            eyebrow="The Process"
            title={<>Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit</>}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
            className="text-center flex flex-col items-center"
          />
        </div>
      </section>

      <section id="process-gallery" ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-white flex flex-col justify-center">
        <div className="w-full h-full relative z-10 flex items-center justify-center -translate-y-8">
          <CircularGallery items={galleryItems} radius={600} rotation={rotation} />
        </div>
      </section>

      <style jsx global>{`
        @keyframes gradient {
          to { background-position: 200% center; }
        }
      `}</style>
    </>
  );
}