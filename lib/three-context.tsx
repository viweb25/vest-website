'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';

type Scene = 'hero' | 'features' | 'about' | 'pipeline' | 'pricing' | 'contact';

type ThreeContextValue = {
  enabled: boolean;
  reducedMotion: boolean;
  scene: Scene;
  setScene: (s: Scene) => void;
  scrollProgress: number;
  setScrollProgress: (n: number) => void;
  mouse: { x: number; y: number };
};

const ThreeContext = createContext<ThreeContextValue | null>(null);

export function ThreeProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scene, setScene] = useState<Scene>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMq = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onMq);

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.innerWidth < 768;
    const lowMem =
      // @ts-expect-error device memory is non-standard
      (navigator.deviceMemory && navigator.deviceMemory <= 3) ||
      navigator.hardwareConcurrency <= 4;

    const webglTest = document.createElement('canvas');
    const gl =
      webglTest.getContext('webgl') || webglTest.getContext('experimental-webgl');
    const hasWebgl = !!gl;

    if ((isMobile && (lowMem || isCoarse)) || !hasWebgl) {
      setEnabled(false);
    }

    const onResize = () => {
      if (window.innerWidth < 768 && (lowMem || isCoarse)) setEnabled(false);
    };
    window.addEventListener('resize', onResize);

    const onMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    return () => {
      mq.removeEventListener('change', onMq);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  const value = useMemo(
    () => ({
      enabled,
      reducedMotion,
      scene,
      setScene,
      scrollProgress,
      setScrollProgress,
      mouse,
    }),
    [enabled, reducedMotion, scene, scrollProgress, mouse]
  );

  return <ThreeContext.Provider value={value}>{children}</ThreeContext.Provider>;
}

export function useThreeState() {
  const ctx = useContext(ThreeContext);
  if (!ctx)
    throw new Error('useThreeState must be used within ThreeProvider');
  return ctx;
}

export const WHATSAPP_URL =
  'https://wa.me/918886711810?text=' +
  encodeURIComponent('Hi, I’d like a demo of RepairSync.');
