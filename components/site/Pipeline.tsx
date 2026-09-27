'use client';

import { useEffect, useRef, useState } from 'react';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { SectionHeader } from '@/components/ui/section-header';

// const PHASES = [
//   {
//     n: '01',
//     tag: 'Lorem Ipsum',
//     title: 'Dolor Sit Amet Consectetur',
//     desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     highlights: [
//       'Lorem ipsum dolor sit amet',
//       'Consectetur adipiscing elit',
//       'Sed do eiusmod tempor',
//     ],
//     img: '/images/pipeline/phase_01.jpg',
//     accentBg: 'bg-blue-600',
//     accentText: 'text-blue-600',
//     accentDot: 'bg-blue-600',
//     tagBg: 'bg-blue-50',
//     tagText: 'text-blue-700',
//   },
//   {
//     n: '02',
//     tag: 'Adipiscing',
//     title: 'Elit Sed Do Eiusmod',
//     desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     highlights: [
//       'Ut enim ad minim veniam',
//       'Quis nostrud exercitation',
//       'Ullamco laboris nisi ut aliquip',
//     ],
//     img: '/images/pipeline/phase_02.jpg',
//     accentBg: 'bg-orange-500',
//     accentText: 'text-orange-600',
//     accentDot: 'bg-orange-500',
//     tagBg: 'bg-orange-50',
//     tagText: 'text-orange-700',
//   },
//   {
//     n: '03',
//     tag: 'Consectetur',
//     title: 'Incididunt Ut Labore Et',
//     desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.',
//     highlights: [
//       'Duis aute irure dolor in',
//       'Reprehenderit in voluptate velit',
//       'Esse cillum dolore eu fugiat',
//     ],
//     img: '/images/pipeline/phase_03.jpg',
//     accentBg: 'bg-blue-500',
//     accentText: 'text-blue-500',
//     accentDot: 'bg-blue-500',
//     tagBg: 'bg-blue-50',
//     tagText: 'text-blue-600',
//   },
//   {
//     n: '04',
//     tag: 'Eiusmod',
//     title: 'Dolore Magna Aliqua',
//     desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     highlights: [
//       'Excepteur sint occaecat cupidatat',
//       'Non proident sunt in culpa',
//       'Officia deserunt mollit anim',
//     ],
//     img: '/images/pipeline/phase_04.jpg',
//     accentBg: 'bg-orange-600',
//     accentText: 'text-orange-600',
//     accentDot: 'bg-orange-600',
//     tagBg: 'bg-orange-50',
//     tagText: 'text-orange-700',
//   },
//   {
//     n: '05',
//     tag: 'Tempor',
//     title: 'Ut Enim Ad Minim',
//     desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.',
//     highlights: [
//       'Sed ut perspiciatis unde',
//       'Omnis iste natus error',
//       'Sit voluptatem accusantium',
//     ],
//     img: '/images/pipeline/phase_05.jpg',
//     accentBg: 'bg-blue-700',
//     accentText: 'text-blue-700',
//     accentDot: 'bg-blue-700',
//     tagBg: 'bg-blue-50',
//     tagText: 'text-blue-800',
//   },
//   {
//     n: '06',
//     tag: 'Optimisation',
//     title: 'Model Quantisation & Compression',
//     desc: 'We quantise, prune, and compress AI models to meet the strict memory and compute constraints of FPGA and cRIO targets — without sacrificing inference accuracy on safety-critical outputs.',
//     highlights: [
//       'INT8 / FP16 quantisation for FPGA',
//       'Structured pruning for cRIO targets',
//       'Accuracy-latency trade-off profiling',
//     ],
//     img: '/images/pipeline/phase_06.jpg',
//     accentBg: 'bg-orange-500',
//     accentText: 'text-orange-600',
//     accentDot: 'bg-orange-500',
//     tagBg: 'bg-orange-50',
//     tagText: 'text-orange-700',
//   },
//   {
//     n: '07',
//     tag: 'Compliance',
//     title: 'Safety & Standards Certification',
//     desc: 'We prepare the AI-integrated LabVIEW system for DO-178C (aerospace), MIL-STD-882 (defence), and ISO 26262 (automotive) compliance — generating traceability matrices and V&V evidence.',
//     highlights: [
//       'DO-178C & DO-254 evidence packages',
//       'MIL-STD-882 hazard analysis',
//       'ISO 26262 functional safety (ASIL)',
//     ],
//     img: '/images/pipeline/phase_07.jpg',
//     accentBg: 'bg-blue-600',
//     accentText: 'text-blue-600',
//     accentDot: 'bg-blue-600',
//     tagBg: 'bg-blue-50',
//     tagText: 'text-blue-700',
//   },
//   {
//     n: '08',
//     tag: 'Support',
//     title: 'Long-Term AI Model Support',
//     desc: 'Post-deployment, we provide continuous model performance monitoring, scheduled retraining with new field data, remote diagnostics, and LabVIEW VI updates to keep your system at peak accuracy.',
//     highlights: [
//       'Continuous performance monitoring',
//       'Scheduled retraining pipelines',
//       'Remote diagnostics & VI updates',
//     ],
//     img: '/images/pipeline/phase_08.jpg',
//     accentBg: 'bg-orange-600',
//     accentText: 'text-orange-600',
//     accentDot: 'bg-orange-600',
//     tagBg: 'bg-orange-50',
//     tagText: 'text-orange-700',
//   },
// ];
const PHASES = [
  {
    n: '01',
    tag: 'Design',
    title: 'Steel Structure',
    desc: 'Structural models, shop drawings and bills of materials define the physical foundation of every project.',
    highlights: [
      'Structural models',
      'Shop drawings',
      'Bills of materials',
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
    tag: 'Engineer',
    title: 'Machine',
    desc: 'Industrial machinery and robotic automation bring engineered designs into motion.',
    highlights: [
      'Industrial machinery',
      'Robotic automation',
      'Engineered machine systems',
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
    tag: 'Automate',
    title: 'PLC Control',
    desc: 'PLC logic, interlocking and HMI coordinate machine sequences reliably and safely.',
    highlights: [
      'PLC logic',
      'Machine interlocking',
      'HMI control',
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
    tag: 'Test',
    title: 'LabVIEW Test System',
    desc: 'LabVIEW test systems validate performance, log results and automate verification.',
    highlights: [
      'Performance validation',
      'Automated test sequences',
      'Test data logging',
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
    tag: 'Measure',
    title: 'Sensors & DAQ',
    desc: 'Sensors and data acquisition hardware capture the signals that describe real machine behaviour.',
    highlights: [
      'Industrial sensors',
      'Data acquisition hardware',
      'Real-time machine signals',
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
    tag: 'Analyze',
    title: 'AI Model',
    desc: 'Models detect anomalies, estimate condition and surface patterns in machine and test data.',
    highlights: [
      'Anomaly detection',
      'Condition estimation',
      'Machine data analytics',
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
    tag: 'Connect',
    title: 'Cloud',
    desc: 'Databases, APIs and cloud platforms connect plants, labs and teams across regions.',
    highlights: [
      'Cloud platforms',
      'APIs & databases',
      'Connected industrial systems',
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
    tag: 'Decide',
    title: 'Mobile Dashboard',
    desc: 'Dashboards turn data into decisions, from the plant floor to the management review.',
    highlights: [
      'Real-time dashboards',
      'Mobile access',
      'Data-driven decisions',
    ],
    img: '/images/pipeline/phase_08.jpg',
    accentBg: 'bg-orange-600',
    accentText: 'text-orange-600',
    accentDot: 'bg-orange-600',
    tagBg: 'bg-orange-50',
    tagText: 'text-orange-700',
  },
];

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Pipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useGSAP(() => {
    if (!sectionRef.current) return;

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
  }, { scope: sectionRef });

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
            title={<>From steel to decision,<br />one connected flow</>}
            description="Scroll to move through the stages of an engineered, automated and data-driven system."
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