'use client';

import {
  useRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  max?: number;
  className?: string;
}

export default function TiltCard({
  children,
  max = 10,
  className,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  };

  return (
    <div
      ref={ref}
      className={cn('tilt-card glass rounded-2xl p-6 relative', className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      <span className="tilt-sheen" />
      {children}
    </div>
  );
}
