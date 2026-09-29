'use client';

import { useEffect } from 'react';

const SELECTOR =
  'a, button, input, textarea, select, [role="button"], .tilt-card, .magnetic';

export default function MagneticCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.body.classList.add('has-custom-cursor');

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'rs-cursor-dot';
    ring.className = 'rs-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let raf = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(SELECTOR);
      if (t) {
        active = true;
        ring.classList.add('is-active');
      } else {
        active = false;
        ring.classList.remove('is-active');
      }
    };

    const tick = () => {
      dotX += (mouseX - dotX) * 0.9;
      dotY += (mouseY - dotY) * 0.9;
      ringX += (mouseX - ringX) * (active ? 0.6 : 0.4);
      ringY += (mouseY - ringY) * (active ? 0.6 : 0.4);
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.body.classList.remove('has-custom-cursor');
      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
}
