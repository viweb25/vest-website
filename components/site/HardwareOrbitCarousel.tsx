'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/*
 * Hardware Orbit Carousel: Smart interactive hardware ecosystem showcase.
 * Driven by thumbnail clicks, arrow navigation, and swipe gestures.
 * Free of scroll hijacking, keeping page scrolling 100% natural.
 */

export type HardwareItem = {
  /** The thin first title line, e.g. "NI Modular". */
  title: string;
  /** The heavy second title line, e.g. "CompactDAQ". */
  subtitle: string;
  /** Hardware photo / module render (transparent PNG/WebP). */
  image: string;
  alt?: string;
  /** Small line above the title, e.g. "MODULAR DAQ ARCHITECTURE". */
  eyebrow?: string;
  /** Two-line label under the thumbnail. Defaults to title + subtitle. */
  label?: string;
  rating?: number;
  chef: string; // Platform classification tag
  kitchen?: string; // Architecture / bus protocol
  description: string;
  likes?: number;
  ingredients?: string[]; // Capabilities / I/O highlights
  accent: string;
};

export type HardwareOrbitCarouselProps = {
  items: HardwareItem[];
  height?: string;
  backdrop?: string;
  onExplore?: (item: HardwareItem, index: number) => void;
  onRequestBOM?: (item: HardwareItem, index: number) => void;
  exploreLabel?: string;
  contactLabel?: string;
  onChange?: (index: number) => void;
  className?: string;
};

export function wrapIndex(i: number, n: number): number {
  if (n <= 0) return 0;
  return ((Math.round(i) % n) + n) % n;
}

export function stepDirection(from: number, to: number, n: number): 1 | -1 {
  if (n <= 0) return 1;
  const fwd = (((to - from) % n) + n) % n;
  return fwd <= n - fwd ? 1 : -1;
}

export function stripStart(index: number, n: number, visible: number): number {
  if (n <= visible) return 0;
  return Math.max(0, Math.min(index - 1, n - visible));
}

export function fitSize(chars: number, max: number, width: number, em: number): number {
  return Math.min(max, width / (Math.max(1, chars) * em));
}

export function arcPath(a0: number, a1: number, cx: number, cy: number, r: number, w: number, steps = 48): string {
  const outer: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180;
    const h = (w / 2) * Math.pow(Math.sin(Math.PI * t), 0.45);
    const c = Math.cos(a);
    const s = Math.sin(a);
    outer.push((cx + c * (r + h)).toFixed(1) + ' ' + (cy + s * (r + h)).toFixed(1));
    inner.push((cx + c * (r - h)).toFixed(1) + ' ' + (cy + s * (r - h)).toFixed(1));
  }
  return 'M' + outer.join('L') + 'L' + inner.reverse().join('L') + 'Z';
}

export const ARC_REST = [[50, 98], [46, 124], [60, 126], [40, 100]];
export function arcRest(index: number): number[] {
  return ARC_REST[((index % ARC_REST.length) + ARC_REST.length) % ARC_REST.length];
}

export const ARC_SWEEP = [38, 146];

const ORBIT_X = 299;
const ORBIT_Y = -450;
const ORBIT_R = 650;
const SWING = 50;
const ITEM = 118;
const VISIBLE = 4;

const HIDE_1 = 'inset(0% 0% 0% 100%)';
const HIDE_2 = 'inset(0% 100% 0% 0%)';
const SHOW = 'inset(0% 0% 0% 0%)';

const Icon = {
  play: (
    <svg className="dsh-ico dsh-fill" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3.5v17l14-8.5z" />
    </svg>
  ),
  order: (
    <svg className="dsh-ico dsh-fill" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5 3 15h18zM3 18h18v2.5H3z" />
    </svg>
  )
};

export function HardwareOrbitCarousel({
  items,
  height = '740px',
  backdrop,
  onExplore,
  onRequestBOM,
  exploreLabel = 'Learn More',
  contactLabel = 'Contact',
  onChange,
  className
}: HardwareOrbitCarouselProps) {
  const n = items.length;
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState('overview');

  const rootRef = useRef(null as HTMLDivElement | null);
  const indexRef = useRef(0);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const orbits = useRef([] as (HTMLDivElement | null)[]);
  const heads = useRef([] as (HTMLDivElement | null)[]);
  const bodies = useRef([] as (HTMLDivElement | null)[]);
  const arcRef = useRef(null as SVGPathElement | null);
  const arc = useRef({ a0: 0, a1: 0 });
  const shown = useRef(-1);
  const dirRef = useRef(1 as 1 | -1);
  const tlRef = useRef(null as gsap.core.Timeline | null);
  const reducedRef = useRef(false);
  const swipe = useRef(null as { x: number; y: number } | null);

  // Fit the 960 x 520 design canvas to the root container.
  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth;
      const h = el.clientHeight || 740;
      // Generous responsive scale factor up to 1.5x so it expands wide and grand across desktop screens
      const scaleX = w / 960;
      const scaleY = h / 520;
      const scale = Math.min(scaleX, scaleY, 1.5);
      el.style.setProperty('--dsh-s', String(Math.max(0.65, scale)));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => (reducedRef.current = mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // GSAP Orbit Transition
  useIsomorphicLayoutEffect(() => {
    const from = shown.current;
    const to = index;
    const parts = (i: number) => {
      const head = heads.current[i];
      return {
        orbit: orbits.current[i],
        head,
        eye: head && head.querySelector('.dsh-eye'),
        t1: head && head.querySelector('.dsh-t1'),
        t2: head && head.querySelector('.dsh-t2'),
        body: bodies.current[i]
      };
    };

    const drawArc = () =>
      arcRef.current?.setAttribute('d', arcPath(arc.current.a0, arc.current.a1, ORBIT_X, ORBIT_Y, ORBIT_R, 118));
    const rest = arcRest(to);
    const tint = '#ffffff';
    if (tlRef.current) tlRef.current.progress(1).kill();
    const b = parts(to);

    if (from === -1 || from === to || reducedRef.current) {
      for (let i = 0; i < n; i++) {
        if (i !== to) {
          const p = parts(i);
          gsap.set([p.orbit, p.head, p.body], { autoAlpha: 0 });
        }
      }
      gsap.set([b.orbit, b.head, b.body, b.eye], { autoAlpha: 1, rotation: 0, y: 0 });
      gsap.set(b.t1, { clipPath: SHOW });
      gsap.set(b.t2, { clipPath: SHOW });
      arc.current.a0 = rest[0];
      arc.current.a1 = rest[1];
      drawArc();
      if (arcRef.current) gsap.set(arcRef.current, { fill: '#ffffff', opacity: 0 });
      shown.current = to;
      return;
    }

    const a = parts(from);
    const d = dirRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        tlRef.current = null;
      }
    });
    tlRef.current = tl;

    // Hardware plate orbit swing
    tl.to(a.orbit, { rotation: SWING * d, duration: 0.62, ease: 'power2.in' }, 0)
      .set(a.orbit, { autoAlpha: 0, rotation: 0 }, 0.62)
      .fromTo(b.orbit, { autoAlpha: 1, rotation: -SWING * d }, { rotation: 0, duration: 0.95, ease: 'power3.out' }, 0.3);

    // Title wipe
    tl.to(a.t1, { clipPath: HIDE_1, duration: 0.42, ease: 'power2.in' }, 0)
      .to(a.t2, { clipPath: HIDE_2, duration: 0.42, ease: 'power2.in' }, 0.06)
      .to(a.eye, { autoAlpha: 0, duration: 0.25 }, 0)
      .set(a.head, { autoAlpha: 0 }, 0.5)
      .set(b.head, { autoAlpha: 1 }, 0.5)
      .fromTo(b.eye, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.55)
      .fromTo(b.t1, { clipPath: HIDE_1 }, { clipPath: SHOW, duration: 0.7, ease: 'power3.out' }, 0.55)
      .fromTo(b.t2, { clipPath: HIDE_2 }, { clipPath: SHOW, duration: 0.7, ease: 'power3.out' }, 0.62);

    // Card cross-fade
    tl.to(a.body, { autoAlpha: 0, y: -6, duration: 0.3, ease: 'power1.in' }, 0.05).set(b.body, { autoAlpha: 1, y: 0 }, 0.4);
    if (b.body) {
      tl.fromTo(
        b.body.children,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
        0.4
      );
    }

    // Arc trail stretch and morph
    tl.to(arc.current, { a0: ARC_SWEEP[0], a1: ARC_SWEEP[1], duration: 0.6, ease: 'power2.inOut', onUpdate: drawArc }, 0)
      .to(arc.current, { a0: rest[0], a1: rest[1], duration: 0.85, ease: 'power3.out', onUpdate: drawArc }, 0.6);
    if (arcRef.current) tl.to(arcRef.current, { fill: '#ffffff', opacity: 0, duration: 1.1, ease: 'power1.inOut' }, 0.1);

    shown.current = to;
  }, [index, n, items]);

  useEffect(() => () => {
    tlRef.current?.kill();
  }, []);

  const select = (next: number, dir: 1 | -1) => {
    if (next === indexRef.current) return;
    dirRef.current = dir;
    indexRef.current = next;
    setIndex(next);
    onChangeRef.current?.(next);
  };

  const go = (to: number, dir?: 1 | -1) => {
    if (n < 2) return;
    const next = wrapIndex(to, n);
    if (next === index) return;
    select(next, dir ?? stepDirection(index, next, n));
  };

  const step = (d: 1 | -1) => go(index + d, d);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.4) step(dx < 0 ? 1 : -1);
  };

  const start = stripStart(index, n, VISIBLE);
  const currentItem = items[index];

  return (
    <div
      className={'dsh-trk ' + (className || '')}
      style={{ position: 'relative', width: '100%', minHeight: height, background: 'transparent' }}
      suppressHydrationWarning
    >
      <div
        ref={rootRef}
        className="dsh-root"
        style={{ position: 'relative', height: height, overflow: 'hidden' }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Hardware Ecosystem"
        tabIndex={0}
        onKeyDown={onKeyDown}
        suppressHydrationWarning
      >
        {backdrop ? <img className="dsh-bd" src={backdrop} alt="" width={1200} height={900} /> : null}
        {backdrop ? <div className="dsh-dim" /> : null}
        {backdrop ? <div className="dsh-wash" /> : null}

        <div className="dsh-canvas">

          <div className="dsh-pager" role="tablist" aria-label="Choose a hardware platform">
            {items.map((d, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                className="dsh-btn dsh-dot"
                aria-selected={i === index}
                aria-current={i === index ? 'true' : undefined}
                aria-label={d.title + ' ' + d.subtitle}
                onClick={() => go(i)}
              >
                <i />
              </button>
            ))}
          </div>

          {/* Mobile Manual Slide Navigation Controls (Matching Screenshot 2 UI) - Visible ONLY on Mobile/Tablet, Hidden on Desktop */}
          <div className="flex lg:hidden items-center justify-between w-full max-w-[340px] px-3 mb-2 select-none z-30">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-700 tracking-wider">
                0{index + 1} / 0{n}
              </span>
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#E7651A] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                {items[index]?.chef || 'Platform'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous hardware platform"
                className="w-10 h-10 rounded-none border border-slate-300 bg-white text-[#0B2340] flex items-center justify-center hover:border-[#E7651A] hover:bg-[#E7651A] hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next hardware platform"
                className="w-10 h-10 rounded-none border border-slate-300 bg-white text-[#0B2340] flex items-center justify-center hover:border-[#E7651A] hover:bg-[#E7651A] hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div
            className="dsh-plates"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipe.current = null)}
          >
            {items.map((d, i) => (
              <div
                key={i}
                ref={(el) => {
                  orbits.current[i] = el;
                }}
                className="dsh-orbit"
                aria-hidden={i !== index}
              >
                <img
                  src={d.image}
                  alt={d.alt ?? d.title + ' ' + d.subtitle}
                  width={245}
                  height={245}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <div className="dsh-head" aria-live="polite">
            {items.map((d, i) => (
              <div
                key={i}
                ref={(el) => {
                  heads.current[i] = el;
                }}
                className="dsh-hd"
                aria-hidden={i !== index}
              >
                <p className="dsh-eye">{d.eyebrow ?? '#' + (i + 1) + ' Hardware Platform'}</p>
                <h2 style={{ margin: 0, font: 'inherit' }}>
                  <span className="dsh-t1" style={{ fontSize: fitSize(d.title.length, 50, 310, 0.58) + 'px' }}>
                    {d.title}
                  </span>
                  <span className="dsh-t2" style={{ fontSize: fitSize(d.subtitle.length, 56, 310, 0.66) + 'px' }}>
                    {d.subtitle}
                  </span>
                </h2>
              </div>
            ))}
          </div>

          <div className="dsh-acts" style={{ gap: '28px', alignItems: 'center' }}>
            <button
              type="button"
              className="text-[#0B2340] hover:text-[#E7651A] font-mono text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.14em] transition-colors inline-flex items-center gap-2 group cursor-pointer hover:underline underline-offset-4"
              onClick={() => currentItem && onExplore?.(currentItem, index)}
            >
              <span>{exploreLabel}</span>
              <ArrowUpRight className="w-4 h-4 text-[#E7651A] transform translate-y-0 translate-x-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>

          <div className="dsh-card">
            <div className="dsh-tabs" role="tablist" aria-label="Platform details">
              {['overview', 'specs'].map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  className="dsh-btn dsh-tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                >
                  {t === 'overview' ? 'Overview' : 'Capabilities'}
                </button>
              ))}
            </div>

            <div className="dsh-bodies">
              {items.map((d, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    bodies.current[i] = el;
                  }}
                  className="dsh-body"
                  aria-hidden={i !== index}
                >
                  <p className="dsh-chef">{d.chef}</p>
                  <p className="dsh-kit">{d.kitchen ?? '\u00a0'}</p>

                  {tab === 'overview' || !d.ingredients?.length ? (
                    <p className="dsh-desc">{d.description}</p>
                  ) : (
                    <ul className="dsh-ing">
                      {d.ingredients.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="dsh-strip">
            <button
              type="button"
              className="dsh-btn dsh-arrow"
              aria-label="Previous platform"
              onClick={() => step(-1)}
            >
              <svg viewBox="0 0 12 16" aria-hidden="true">
                <path d="M11 0v16L0 8z" />
              </svg>
            </button>
            <div className="dsh-win">
              <div className="dsh-track" style={{ transform: 'translateX(' + -start * ITEM + 'px)' }}>
                {items.map((d, i) => (
                  <div key={i} className="dsh-th">
                    <button
                      type="button"
                      className="dsh-btn"
                      aria-current={i === index ? 'true' : undefined}
                      onClick={() => go(i)}
                    >
                      <img src={d.image} alt="" width={52} height={52} draggable={false} />
                      <span>{d.label ?? d.title + ' ' + d.subtitle}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="dsh-btn dsh-arrow"
              aria-label="Next platform"
              onClick={() => step(1)}
            >
              <svg viewBox="0 0 12 16" aria-hidden="true">
                <path d="M1 0v16l11-8z" />
              </svg>
            </button>
          </div>
        </div>

        <p className="dsh-sr" aria-live="polite">
          {currentItem
            ? 'Hardware ' + (index + 1) + ' of ' + n + ': ' + currentItem.title + ' ' + currentItem.subtitle
            : ''}
        </p>
      </div>
    </div>
  );
}

export default HardwareOrbitCarousel;
