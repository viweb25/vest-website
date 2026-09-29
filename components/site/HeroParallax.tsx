'use client';

import { useEffect, useRef, useCallback } from 'react';
import {
  FileText,
  CreditCard,
  Package,
  UserCheck,
  MessageCircle,
  Wifi,
  Battery,
  Signal,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Particle positions — static to prevent hydration mismatch
   ───────────────────────────────────────────────────────────── */
const PARTICLES = [
  { left: 8,  top: 15, size: 2.5, delay: 0,   dur: 7.5 },
  { left: 22, top: 55, size: 2,   delay: 1.2, dur: 8.2 },
  { left: 45, top: 10, size: 3,   delay: 0.4, dur: 6.8 },
  { left: 62, top: 40, size: 2,   delay: 2.1, dur: 9.0 },
  { left: 78, top: 20, size: 2.5, delay: 0.8, dur: 7.0 },
  { left: 92, top: 65, size: 2,   delay: 1.6, dur: 8.8 },
  { left: 35, top: 75, size: 2,   delay: 2.4, dur: 6.2 },
  { left: 55, top: 50, size: 3,   delay: 0.6, dur: 8.0 },
  { left: 15, top: 35, size: 2,   delay: 1.9, dur: 7.4 },
  { left: 70, top: 80, size: 2,   delay: 2.9, dur: 6.6 },
  { left: 88, top: 35, size: 1.5, delay: 3.2, dur: 9.2 },
  { left: 5,  top: 70, size: 2,   delay: 0.9, dur: 7.8 },
];

/* ─────────────────────────────────────────────────────────────
   Floating UI card definitions
   ───────────────────────────────────────────────────────────── */
const FLOATING_CARDS = [
  {
    icon: FileText,
    label: 'Repair Ticket',
    detail: '#RS-2847 — Repairing',
    color: '#0e7c86',
    pos: { top: '5%', right: '-6%' },
    mobilePos: { top: '3%', right: '1%' },
    depth: 60,
    factor: 1.0,
    floatClass: 'hero-float-card--1',
  },
  {
    icon: CreditCard,
    label: 'Invoice Ready',
    detail: '₹2,450 — Paid',
    color: '#16a34a',
    pos: { top: '42%', right: '-12%' },
    mobilePos: { top: '38%', right: '-2%' },
    depth: 80,
    factor: 1.35,
    floatClass: 'hero-float-card--2',
  },
  {
    icon: Package,
    label: 'Stock Alert',
    detail: 'LCD Panel — 3 left',
    color: '#d97706',
    pos: { bottom: '24%', left: '-8%' },
    mobilePos: { bottom: '20%', left: '1%' },
    depth: 45,
    factor: 0.85,
    floatClass: 'hero-float-card--3',
  },
  {
    icon: UserCheck,
    label: 'Staff Check-in',
    detail: 'Ravi — Clocked 9:02 AM',
    color: '#7c3aed',
    pos: { bottom: '5%', right: '-5%' },
    mobilePos: { bottom: '2%', right: '3%' },
    depth: 70,
    factor: 1.2,
    floatClass: 'hero-float-card--4',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp Sent',
    detail: 'Customer notified — Ready',
    color: '#15803d',
    pos: { top: '70%', left: '-5%' },
    mobilePos: { top: '64%', left: '0%' },
    depth: 55,
    factor: 1.05,
    floatClass: 'hero-float-card--5',
  },
];

export default function HeroParallax() {
  /* ── Refs ── */
  const wrapperRef      = useRef<HTMLDivElement>(null);
  const sceneRef        = useRef<HTMLDivElement>(null);
  const phoneRef        = useRef<HTMLDivElement>(null);
  const bgLayerRef      = useRef<HTMLDivElement>(null);
  const lightRef        = useRef<HTMLDivElement>(null);
  const cardRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const particleLayerRef = useRef<HTMLDivElement>(null);
  const glowRingRef     = useRef<HTMLDivElement>(null);

  const setCardRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      cardRefs.current[i] = el;
    },
    []
  );

  /* ── 3D parallax engine ── */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const hasMouse  = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const w         = window.innerWidth;
    const isMobile  = w < 768;
    const isTablet  = w >= 768 && w < 1024;

    const mouseK  = !hasMouse || isMobile ? 0 : isTablet ? 0.4 : 1;
    const scrollK = isMobile ? 0.4 : 1;

    const tgt = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const scr = { cur: 0, tgt: 0 };
    let raf: number;
    let heroVisible = true;

    /* ── IntersectionObserver ── */
    const io = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        if (!heroVisible) {
          cancelAnimationFrame(raf);
          [sceneRef, bgLayerRef, phoneRef, particleLayerRef, lightRef, glowRingRef].forEach(
            (r) => { if (r.current) r.current.style.transform = ''; }
          );
          cardRefs.current.forEach((el) => {
            if (el) { el.style.transform = ''; el.style.opacity = ''; }
          });
          scr.cur = 0;
          scr.tgt = 0;
        } else {
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0 }
    );
    if (wrapperRef.current) io.observe(wrapperRef.current);

    /* ── Mouse listener ── */
    const onMove = (e: MouseEvent) => {
      if (!mouseK || !heroVisible) return;
      tgt.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      tgt.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (mouseK) window.addEventListener('mousemove', onMove, { passive: true });

    /* ── Device orientation for mobile ── */
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (mouseK || !e.gamma || !e.beta || !heroVisible) return;
      tgt.x = Math.max(-1, Math.min(1, e.gamma / 30));
      tgt.y = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
    };
    if (!mouseK && !isMobile) {
      window.addEventListener('deviceorientation', onOrientation, { passive: true });
    }

    /* ── Scroll listener ── */
    const onScroll = () => {
      if (!wrapperRef.current || !heroVisible) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      scr.tgt = Math.max(0, Math.min(1.0, -rect.top / (window.innerHeight * 0.8)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ── Animation loop ── */
    const tick = () => {
      if (!heroVisible) return;

      const damp = 0.045;
      cur.x += (tgt.x - cur.x) * damp;
      cur.y += (tgt.y - cur.y) * damp;
      scr.cur += (scr.tgt - scr.cur) * 0.06;

      const mx = cur.x * mouseK;
      const my = cur.y * mouseK;
      const sy = scr.cur * scrollK;

      /* Scene 3D tilt */
      if (sceneRef.current) {
        sceneRef.current.style.transform =
          `rotateY(${mx * 5}deg) rotateX(${-my * 3.5}deg)`;
      }

      /* Background layer: very slow */
      if (bgLayerRef.current) {
        bgLayerRef.current.style.transform =
          `translate3d(${-mx * 4}px, ${-my * 3 + sy * -8}px, -120px) scale(1.15)`;
        bgLayerRef.current.style.opacity = `${Math.max(0, 1 - sy * 0.6)}`;
      }

      /* Phone layer: moderate */
      if (phoneRef.current) {
        const phoneScrollY    = sy * -50;
        const phoneRotateExtra = sy * 8;
        phoneRef.current.style.transform =
          `translate3d(${-mx * 5}px, ${-my * 3 + phoneScrollY}px, 0px) rotateY(${mx * 2 + phoneRotateExtra}deg) rotateX(${-my * 1.5}deg) scale(${1 + sy * 0.02})`;
        phoneRef.current.style.opacity = `${Math.max(0, 1 - sy * 0.45)}`;
      }

      /* Floating cards: varied speed */
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const card = FLOATING_CARDS[i];
        const f    = card.factor;
        const cardScrollY = sy * -(22 + i * 9);
        el.style.transform =
          `translate3d(${mx * 14 * f}px, ${my * 9 * f + cardScrollY}px, ${card.depth}px)`;
        el.style.opacity = `${Math.max(0, 1 - sy * 0.55)}`;
      });

      /* Particle layer */
      if (particleLayerRef.current) {
        particleLayerRef.current.style.transform =
          `translate3d(${mx * 8}px, ${my * 5 + sy * -12}px, 30px)`;
      }

      /* Glow ring */
      if (glowRingRef.current) {
        glowRingRef.current.style.transform =
          `translate3d(${mx * 6}px, ${my * 4 + sy * -20}px, 10px)`;
        glowRingRef.current.style.opacity = `${Math.max(0, 1 - sy * 0.7)}`;
      }

      /* Mouse-following light */
      if (lightRef.current) {
        const lx = 50 + mx * 30;
        const ly = 50 + my * 25;
        lightRef.current.style.background =
          `radial-gradient(700px circle at ${lx}% ${ly}%, rgba(14,124,134,0.07), transparent 50%)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('deviceorientation', onOrientation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapperRef} className="hero-parallax-wrapper">
      {/* Ambient glow */}
      <div className="hero-parallax-ambient" />

      {/* 3D scene container */}
      <div ref={sceneRef} className="hero-parallax-scene">

        {/* Layer 1: Background depth elements */}
        <div ref={bgLayerRef} className="hero-parallax-layer hero-parallax-layer--bg">
          {/* Subtle 3D perspective grid */}
          <div className="hero-bg-grid" aria-hidden="true" />
          {/* Blurred light orbs */}
          <div className="hero-bg-orb hero-bg-orb--1" aria-hidden="true" />
          <div className="hero-bg-orb hero-bg-orb--2" aria-hidden="true" />
          <div className="hero-bg-orb hero-bg-orb--3" aria-hidden="true" />
          <div className="hero-bg-orb hero-bg-orb--4" aria-hidden="true" />
        </div>

        {/* Layer 2: Floating particles + geometric shapes */}
        <div ref={particleLayerRef} className="hero-parallax-dots" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="hero-parallax-dot"
              style={{
                left: `${p.left}%`,
                top:  `${p.top}%`,
                width:  p.size,
                height: p.size,
                animationDelay:    `${p.delay}s`,
                animationDuration: `${p.dur}s`,
              }}
            />
          ))}
          {/* Geometric accent shapes */}
          <div className="hero-geo hero-geo--1" />
          <div className="hero-geo hero-geo--2" />
          <div className="hero-geo hero-geo--3" />
          <div className="hero-geo hero-geo--4" />
        </div>

        {/* Glow ring behind phone */}
        <div ref={glowRingRef} className="hero-glow-ring-wrap" aria-hidden="true">
          <div className="hero-glow-ring hero-glow-ring--outer" />
          <div className="hero-glow-ring hero-glow-ring--inner" />
        </div>

        {/* Layer 3: Main 3D smartphone */}
        <div ref={phoneRef} className="hero-parallax-layer hero-phone-layer">
          <div className="hero-phone-container">

            {/* Premium metallic phone frame */}
            <div className="hero-phone-frame">

              {/* Metallic side buttons */}
              <div className="hero-phone-btn hero-phone-btn--vol-up"   aria-hidden="true" />
              <div className="hero-phone-btn hero-phone-btn--vol-down" aria-hidden="true" />
              <div className="hero-phone-btn hero-phone-btn--power"    aria-hidden="true" />

              {/* Dynamic Island notch */}
              <div className="hero-phone-notch" aria-hidden="true">
                <div className="hero-phone-notch-camera" />
              </div>

              {/* Screen glass */}
              <div className="hero-phone-screen">
                {/* iOS-style status bar */}
                <div className="hero-screen-statusbar">
                  <span className="hero-status-time">9:41</span>
                  <div className="hero-status-icons">
                    <Signal  size={8} />
                    <Wifi    size={8} />
                    <Battery size={8} />
                  </div>
                </div>

                {/* Screen header */}
                <div className="hero-screen-header">
                  <div className="hero-screen-logo">
                    <div className="hero-screen-logo-icon">R</div>
                    <span className="hero-screen-logo-text">RepairSync</span>
                  </div>
                  <div className="hero-screen-avatar">
                    <UserCheck size={9} />
                  </div>
                </div>

                {/* Pipeline tracker */}
                <div className="hero-screen-pipeline">
                  <div className="hero-pipeline-label">Repair Pipeline</div>
                  <div className="hero-pipeline-stages">
                    {['Received', 'Diagnosing', 'Approval', 'Repairing', 'Ready', 'Delivered'].map(
                      (stage, idx) => (
                        <div
                          key={stage}
                          className={`hero-pipeline-stage ${idx <= 3 ? 'hero-pipeline-stage--active' : ''} ${idx === 3 ? 'hero-pipeline-stage--current' : ''}`}
                        >
                          <div className="hero-pipeline-dot" />
                          <span className="hero-pipeline-text">{stage}</span>
                        </div>
                      )
                    )}
                  </div>
                  <div className="hero-pipeline-progress">
                    <div className="hero-pipeline-bar" />
                  </div>
                </div>

                {/* Repair tickets */}
                <div className="hero-screen-tickets">
                  <div className="hero-ticket">
                    <div className="hero-ticket-left">
                      <div className="hero-ticket-status hero-ticket-status--green" />
                      <div>
                        <div className="hero-ticket-id">#RS-2847</div>
                        <div className="hero-ticket-device">iPhone 15 Pro</div>
                      </div>
                    </div>
                    <div className="hero-ticket-badge hero-ticket-badge--green">Ready</div>
                  </div>

                  <div className="hero-ticket">
                    <div className="hero-ticket-left">
                      <div className="hero-ticket-status hero-ticket-status--blue" />
                      <div>
                        <div className="hero-ticket-id">#RS-2846</div>
                        <div className="hero-ticket-device">Samsung S24</div>
                      </div>
                    </div>
                    <div className="hero-ticket-badge hero-ticket-badge--blue">Repairing</div>
                  </div>

                  <div className="hero-ticket">
                    <div className="hero-ticket-left">
                      <div className="hero-ticket-status hero-ticket-status--yellow" />
                      <div>
                        <div className="hero-ticket-id">#RS-2845</div>
                        <div className="hero-ticket-device">OnePlus 12</div>
                      </div>
                    </div>
                    <div className="hero-ticket-badge hero-ticket-badge--yellow">Awaiting</div>
                  </div>

                  <div className="hero-ticket">
                    <div className="hero-ticket-left">
                      <div className="hero-ticket-status hero-ticket-status--purple" />
                      <div>
                        <div className="hero-ticket-id">#RS-2844</div>
                        <div className="hero-ticket-device">Pixel 9</div>
                      </div>
                    </div>
                    <div className="hero-ticket-badge hero-ticket-badge--purple">Diagnosing</div>
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="hero-screen-nav">
                  <div className="hero-nav-item hero-nav-item--active">
                    <FileText size={10} />
                    <span>Tickets</span>
                  </div>
                  <div className="hero-nav-item">
                    <CreditCard size={10} />
                    <span>Billing</span>
                  </div>
                  <div className="hero-nav-item">
                    <Package size={10} />
                    <span>Stock</span>
                  </div>
                  <div className="hero-nav-item">
                    <UserCheck size={10} />
                    <span>Staff</span>
                  </div>
                </div>
              </div>

              {/* Glass sheen on screen */}
              <div className="hero-phone-screen-sheen" aria-hidden="true" />
              {/* Edge glow */}
              <div className="hero-phone-edge-glow" aria-hidden="true" />
            </div>

            {/* Phone shadow */}
            <div className="hero-phone-shadow" />
          </div>
        </div>

        {/* Layer 4: Floating RepairSync UI cards */}
        {FLOATING_CARDS.map((card, i) => (
          <div
            key={card.label}
            ref={(el) => setCardRef(el, i)}
            className={`hero-parallax-card-wrap ${i >= 3 ? 'hero-card-hide-mobile' : ''}`}
            style={card.pos as React.CSSProperties}
            aria-hidden="true"
          >
            <div className={`hero-float-card ${card.floatClass}`}>
              <div
                className="hero-float-card-icon"
                style={{ backgroundColor: `${card.color}18`, color: card.color }}
              >
                <card.icon size={13} />
              </div>
              <div className="hero-float-card-content">
                <span className="hero-float-card-label">{card.label}</span>
                <span className="hero-float-card-detail">{card.detail}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Mouse-following light reflection */}
        <div ref={lightRef} className="hero-parallax-layer hero-parallax-reflection" />

        {/* Animated light sweep */}
        <div className="hero-parallax-layer hero-parallax-sweep" />
      </div>

      {/* Depth shadow */}
      <div className="hero-parallax-shadow" />
    </div>
  );
}
