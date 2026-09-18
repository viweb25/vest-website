'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useThreeState } from '@/lib/three-context';

const AmbientCanvas = dynamic(() => import('./AmbientCanvas'), {
  ssr: false,
  loading: () => <StaticGradient />,
});

function StaticGradient() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 transition-colors duration-300"
      style={{
        background:
          'radial-gradient(120% 90% at 20% 10%, var(--accent-soft) 0%, transparent 50%),' +
          'radial-gradient(120% 100% at 85% 30%, rgba(30,86,160,0.10) 0%, transparent 55%),' +
          'linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%)',
      }}
    />
  );
}

export default function AmbientBackground() {
  const { enabled, reducedMotion } = useThreeState();
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  if (!mounted) return <StaticGradient />;

  if (!enabled || reducedMotion) return <StaticGradient />;

  return (
    <AmbientCanvas scrollRef={scrollRef} mouseRef={mouseRef} reduced={reducedMotion} />
  );
}
