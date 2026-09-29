'use client';

import { useEffect, useRef } from 'react';

/**
 * TornReveal
 * Place as the LAST child inside a dark section (position:relative, overflow:hidden).
 * fillColor should match the NEXT section's background.
 * GSAP ScrollTrigger scrubs the SVG upward as user scrolls.
 */
export default function TornReveal({ fillColor = '#ffffff' }: { fillColor?: string }) {
  const maskRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let ctx: any;
    const init = async () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      const gsap = gsapModule.default;
      const { ScrollTrigger } = scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (prefersReduced) {
          gsap.fromTo(
            maskRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: maskRef.current,
                start: 'top 90%',
                end: 'top 30%',
                scrub: true,
              },
            }
          );
          return;
        }

        gsap.to(maskRef.current, {
          yPercent: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: maskRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      });
    };
    init();
    return () => { if (ctx) ctx.revert(); };
  }, []);

  return (
    <svg
      ref={maskRef}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="pointer-events-none absolute bottom-0 left-0 w-full"
      style={{
        height: '75vh',
        transform: 'translateY(78%)',
        zIndex: 20,
        color: fillColor,
        willChange: 'transform',
      }}
    >
      {/* Organic torn-paper edge — irregular spikes, NOT symmetric */}
      <path
        d="
          M0,148
          L22,120  L55,158  L83,102  L118,142  L147,88
          L179,130  L208,72  L244,118  L270,90  L302,134
          L330,78   L364,122  L395,66  L428,116  L460,84
          L490,128  L520,70   L556,120  L585,88  L618,134
          L648,76   L680,118  L714,60   L745,110  L775,80
          L808,128  L840,68   L872,114  L903,82   L934,126
          L966,70   L998,112  L1028,78  L1062,122 L1092,64
          L1125,108 L1155,80  L1188,124 L1218,72  L1250,116
          L1280,82  L1314,126 L1342,68  L1375,112 L1400,86
          L1440,130
          L1440,320 L0,320 Z
        "
        fill="currentColor"
      />
    </svg>
  );
}
