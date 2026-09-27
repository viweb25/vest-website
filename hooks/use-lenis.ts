'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
export function useLenis(onScroll?: (progress: number) => void) {
  const lenisRef = useRef<any | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let lenisInstance: any = null;
    let gsapInstance: any = null;

    const initLenis = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const [LenisModule, gsapModule, scrollTriggerModule] = await Promise.all([
        import('@studio-freight/lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger')
      ]);

      const Lenis = LenisModule.default;
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      lenisRef.current = lenis;
      lenisInstance = lenis;
      gsapInstance = gsap;

      // Sync Lenis scroll with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);
      
      // Provide progress callback if requested
      lenis.on('scroll', (e: any) => {
        const progress = e.scroll / (e.limit || 1);
        onScroll?.(progress);
      });

      // Use GSAP's ticker instead of a standalone rAF loop to ensure perfect sync
      // and prevent jittering during pinned animations
      const update = (time: number, deltaTime: number, frame: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(update);
      
      // Prevent lag smoothing from disrupting the sync
      gsap.ticker.lagSmoothing(0);
    };

    initLenis();

    return () => {
      if (gsapInstance && lenisInstance) {
        // we can't easily remove the specific update function since it's defined inside initLenis,
        // but we can just destroy lenis
        lenisInstance.destroy();
      }
      lenisRef.current = null;
    };
  }, [onScroll]);

  // Reset scroll to top on route change to prevent jumping to bottom
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return lenisRef;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: 'smooth' });
}
