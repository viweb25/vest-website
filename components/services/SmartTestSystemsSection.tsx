'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GradientCard } from '@/components/ui/gradient-card';

interface SmartFeature {
  step: string;
  badge: string;
  title: string;
  desc: string;
  gradient: 'orange' | 'gray' | 'purple' | 'green';
  imageUrl: string;
  ctaText: string;
  ctaHref: string;
}

const SMART_FEATURES: SmartFeature[] = [
  {
    step: '01',
    badge: 'VISION & AOI',
    title: 'AI Machine Vision & Defect Detection',
    desc: 'Real-time identification of microscopic component defects, scratches, and assembly errors.',
    gradient: 'orange',
    imageUrl: '/smart-testing/smart-01-vision.png',
    ctaText: 'View Architecture',
    ctaHref: '#contact',
  },
  {
    step: '02',
    badge: 'EDGE TELEMETRY',
    title: 'Predictive Maintenance & Monitoring',
    desc: 'Continuous vibration and thermal analysis to predict equipment failure before it occurs.',
    gradient: 'gray',
    imageUrl: '/smart-testing/smart-02-predictive.png',
    ctaText: 'View Architecture',
    ctaHref: '#contact',
  },
  {
    step: '03',
    badge: 'DATA PIPELINE',
    title: 'Intelligent Test Data Analytics',
    desc: 'Automated classification of large volume test datasets and parameter correlation.',
    gradient: 'purple',
    imageUrl: '/smart-testing/smart-03-analytics.png',
    ctaText: 'View Architecture',
    ctaHref: '#contact',
  },
  {
    step: '04',
    badge: 'ANOMALY DETECT',
    title: 'Real-Time Anomaly Detection',
    desc: 'Instant identification of unexpected sensor drift or test rig abnormal behavior.',
    gradient: 'orange',
    imageUrl: '/smart-testing/smart-04-anomaly.png',
    ctaText: 'View Architecture',
    ctaHref: '#contact',
  },
  {
    step: '05',
    badge: 'ROOT CAUSE',
    title: 'AI-Assisted Report Analysis',
    desc: 'Natural language summaries and automated root-cause insights embedded into PDF reports.',
    gradient: 'gray',
    imageUrl: '/smart-testing/smart-05-report.png',
    ctaText: 'View Architecture',
    ctaHref: '#contact',
  },
  {
    step: '06',
    badge: 'OEE ANALYTICS',
    title: 'Production Performance Insights',
    desc: 'OEE optimization and bottleneck identification across manufacturing test lines.',
    gradient: 'green',
    imageUrl: '/smart-testing/smart-06-oee.png',
    ctaText: 'View Architecture',
    ctaHref: '#contact',
  },
  {
    step: '07',
    badge: 'ADAPTIVE QA',
    title: 'Intelligent Quality Inspection',
    desc: 'Adaptive pass/fail criteria adjusting dynamically based on historical batch trends.',
    gradient: 'orange',
    imageUrl: '/smart-testing/smart-07-quality.png',
    ctaText: 'View Architecture',
    ctaHref: '#contact',
  },
  {
    step: '08',
    badge: 'CONTROL ROOM',
    title: 'AI-Enabled Engineering Dashboards',
    desc: 'Executive web and local dashboards showcasing predictive health metrics in real time.',
    gradient: 'purple',
    imageUrl: '/smart-testing/smart-08-dashboard.png',
    ctaText: 'View Architecture',
    ctaHref: '#contact',
  },
];

export default function SmartTestSystemsSection() {
  return (
    <section className="py-24 bg-white relative isolate overflow-hidden">
      {/* Decorative Subtle Ambient Wave Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-200/20 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-5xl font-black text-[#0B2340] tracking-tight mb-4"
          >
            Make Your Test Systems <span className="text-[#E7651A]">Smarter</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[#536578] text-sm sm:text-base leading-relaxed"
          >
            Combining deterministic LabVIEW execution with cutting-edge AI and machine learning models (PyTorch / ONNX Runtime) for superior industrial outcomes.
          </motion.p>
        </div>

        {/* 8 Cards in 2 Rows of 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SMART_FEATURES.map((feat, idx) => (
            <motion.div
              key={feat.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
              className="h-full"
            >
              <GradientCard
                gradient={feat.gradient}
                badgeText={feat.badge}
                title={feat.title}
                description={feat.desc}
                ctaText={feat.ctaText}
                ctaHref={feat.ctaHref}
                imageUrl={feat.imageUrl}
                className="min-h-[320px]"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
