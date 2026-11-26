'use client';

import React from 'react';
import HowItWorksSlider from '@/components/services/HowItWorksSlider';

const PIPELINE_DATA = {
  id: 'process-intro',
  eyebrow: 'The Process',
  heading: 'From steel to decision,',
  headingAccent: 'one connected flow',
  lead: 'Scroll to move through the stages of an engineered, automated and data-driven system.',
  steps: [
    {
      step: 1,
      tag: 'Engineer',
      title: 'Machine',
      description: 'Industrial machinery and robotic automation bring engineered designs into motion.',
      highlights: [
        'Industrial machinery',
        'Robotic automation',
        'Engineered machine systems',
      ],
      image: '/how-it-works/step-1.png',
      href: '/services/automated-test-systems'
    },

    {
      step: 2,
      tag: 'Automate',
      title: 'PLC Control',
      description: 'PLC logic, interlocking and HMI coordinate machine sequences reliably and safely.',
      highlights: [
        'PLC logic',
        'Machine interlocking',
        'HMI control',
      ],
      image: '/Exploded Industrial Control Cabinet (1).png',
      href: '/services/industrial-automation'
    },
    {
      step: 3,
      tag: 'Test',
      title: 'LabVIEW Test System',
      description: 'LabVIEW test systems validate performance, log results and automate verification.',
      highlights: [
        'Performance validation',
        'Automated test sequences',
        'Test data logging',
      ],
      image: '/how-it-works/step-3.png',
      href: '/services/labview-application-development'
    },
    {
      step: 4,
      tag: 'Measure',
      title: 'Sensors & DAQ',
      description: 'Sensors and data acquisition hardware capture the signals that describe real machine behaviour.',
      highlights: [
        'Industrial sensors',
        'Data acquisition hardware',
        'Real-time machine signals',
      ],
      image: '/how-it-works/step-2.png',
      href: '/services/hardware-instrument-integration'
    },
    {
      step: 5,
      tag: 'Analyze',
      title: 'AI Model',
      description: 'Models detect anomalies, estimate condition and surface patterns in machine and test data.',
      highlights: [
        'Anomaly detection',
        'Condition estimation',
        'Machine data analytics',
      ],
      image: '/Exploded AI Chip Assembly.png',
      href: '/services/ai-vision-inspection'
    },
    {
      step: 6,
      tag: 'Connect',
      title: 'Cloud',
      description: 'Databases, APIs and cloud platforms connect plants, labs and teams across regions.',
      highlights: [
        'Cloud platforms',
        'APIs & databases',
        'Connected industrial systems',
      ],
      image: '/Neon Cloud Computing Network.png',
      href: '/services/automated-test-systems'
    },
    {
      step: 7,
      tag: 'Decide',
      title: 'Mobile Dashboard',
      description: 'Dashboards turn data into decisions, from the plant floor to the management review.',
      highlights: [
        'Real-time dashboards',
        'Mobile access',
        'Data-driven decisions',
      ],
      image: '/Modern Mobile Analytics Dashboard Trio.png',
      href: '/services/labview-engineering'
    }
  ]
};

export default function Pipeline() {
  return <HowItWorksSlider data={PIPELINE_DATA} />;
}
