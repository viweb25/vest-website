"use client";

/**
 * InversionCircleScrollAnimation
 *
 * Natural Page-Scroll Driven Inversion Circle Animation:
 * - Pinned sticky hero inside a 250vh track that sticks to viewport (top: 0).
 * - Phase 1 (scroll 0 -> viewH): Power4 InOut rising black circle with real-time
 *   CSS clip-path text inversion (white text inside black circle).
 * - Phase 2 (scroll viewH -> 2*viewH): Ease-in² expansion filling the entire viewport.
 * - Below the track, ContentSection smoothly transitions background from black to pure white
 *   as it enters viewport, revealing the System Architecture content, 5-stage pipeline & waveform demo.
 */

import React, { useEffect, useRef, useState } from "react";

// ─── constants ────────────────────────────────────────────────────────────────
const BALL_SIZE = 380; // px — fixed diameter during Phase 1 travel

export interface InversionCircleScrollAnimationProps {
  title?: string;
  subtitle?: string;
  label?: string;
  contentHeading?: React.ReactNode;
  contentDescription?: string;
  contentImage?: string;
  contentImageAlt?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  children?: React.ReactNode;
}

// ─── root export ──────────────────────────────────────────────────────────────
export default function InversionCircleScrollAnimation({
  title = "System Architecture.",
  subtitle = "Engineered for deterministic test, measurement, and control.",
  label = "",
  contentHeading = "What Is LabVIEW?",
  contentDescription = "National Instruments LabVIEW is a graphical programming environment designed for engineers and scientists to build sophisticated test, measurement, and control systems rapidly. By integrating high-speed measurement hardware, instruments, sensors, controllers, software logic, custom HMI dashboards, and advanced data analysis into a unified solution, LabVIEW eliminates the complexity of multi-vendor driver integration.",
  contentImage = "/LabVIEW Development and Data Acquisition Suite.png",
  contentImageAlt = "LabVIEW Development and Data Acquisition Suite",
  buttonText,
  onButtonClick,
  children,
}: InversionCircleScrollAnimationProps = {}) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="icsa-wrap w-full relative">
      <HeroSection
        trackRef={trackRef}
        title={title}
        subtitle={subtitle}
      />
      <ContentSection
        label={label}
        contentHeading={contentHeading}
        contentDescription={contentDescription}
        contentImage={contentImage}
        contentImageAlt={contentImageAlt}
        buttonText={buttonText}
        onButtonClick={onButtonClick}
      >
        {children}
      </ContentSection>
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
function HeroSection({
  trackRef,
  title,
  subtitle,
}: {
  trackRef: React.RefObject<HTMLDivElement>;
  title: string;
  subtitle: string;
}) {
  const [scrollY, setScrollY] = useState(0);
  const [viewH, setViewH] = useState(800);
  const [viewW, setViewW] = useState(1200);

  useEffect(() => {
    const measure = () => {
      setViewH(window.innerHeight || 800);
      setViewW(window.innerWidth || 1200);
    };
    measure();

    let ticking = false;
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      // Progress starts when top of track hits top of viewport (rect.top <= 0)
      const st = Math.max(0, -rect.top);
      setScrollY(st);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, [trackRef]);

  // phase progress 0 → 1
  const p1 = clamp(scrollY / viewH);
  const p2 = clamp((scrollY - viewH) / viewH);

  // Power4 InOut
  const p1e = p1 < 0.5 ? 8 * p1 ** 4 : 1 - (-2 * p1 + 2) ** 4 / 2;
  // ease-in²
  const p2e = p2 * p2;

  // geometry
  const yOff = (1 - p1e) * (viewH / 2 + BALL_SIZE / 2);
  const coverSize = Math.max(viewW, viewH) * 2.8;
  const ballSize = BALL_SIZE + p2e * (coverSize - BALL_SIZE);
  const clipX = viewW / 2;
  const clipY = viewH / 2 + yOff;
  const clipR = ballSize / 2;

  return (
    <div ref={trackRef} className="icsa-track">
      <section className="icsa-hero" suppressHydrationWarning>
        {/* expanding black circle */}
        <div
          className="icsa-ball"
          suppressHydrationWarning
          style={{
            width: ballSize,
            height: ballSize,
            transform: `translate(-50%, calc(-50% + ${yOff}px))`,
          }}
        />

        {/* black text — always visible */}
        <div className="icsa-layer icsa-dark">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {/* white text — clipped to the circle (inversion) */}
        <div
          className="icsa-layer icsa-light"
          suppressHydrationWarning
          style={{
            clipPath: `circle(${clipR}px at 50% calc(50% + ${yOff}px))`,
            WebkitClipPath: `circle(${clipR}px at 50% calc(50% + ${yOff}px))`,
          }}
        >
          <h1 className="text-white" style={{ color: '#ffffff' }}>{title}</h1>
          {subtitle && <p className="text-white" style={{ color: '#ffffff', opacity: 0.9 }}>{subtitle}</p>}
        </div>
      </section>
    </div>
  );
}

// ─── ContentSection ───────────────────────────────────────────────────────────
function ContentSection({
  label,
  contentHeading,
  contentDescription,
  contentImage,
  contentImageAlt,
  buttonText,
  onButtonClick,
  children,
}: {
  label: string;
  contentHeading: React.ReactNode;
  contentDescription: string;
  contentImage?: string;
  contentImageAlt?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
        } else if (e.boundingClientRect.top > 0) {
          setOn(false);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`icsa-cs${on ? " on" : ""}`}>
      <div className="icsa-inner">
        {contentImage ? (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: LabVIEW Image */}
            <div
              className={`lg:col-span-6 w-full ${
                on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } transition-all duration-700 delay-150`}
            >
              <div className="relative aspect-[16/10] w-full flex items-center justify-center group">
                <img
                  src={contentImage}
                  alt={
                    contentImageAlt ||
                    (typeof contentHeading === "string"
                      ? contentHeading
                      : "LabVIEW Platform")
                  }
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Column: What Is LabVIEW? Heading & Description */}
            <div
              className={`lg:col-span-6 flex flex-col justify-center text-left ${
                on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } transition-all duration-700 delay-300`}
            >
              {label && (
                <span className="icsa-label mb-2 text-left text-[#E7651A]">{label}</span>
              )}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2340] tracking-tight leading-[1.08] mb-3 text-left">
                {contentHeading}
              </h2>
              <p className="text-[#536578] text-base sm:text-lg leading-relaxed font-normal text-left max-w-none">
                {contentDescription}
              </p>
              {buttonText && (
                <div className="mt-6">
                  <CTAButton text={buttonText} onClick={onButtonClick} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="icsa-header">
            {label && <span className="icsa-label">{label}</span>}
            <h2>{contentHeading}</h2>
            <p>{contentDescription}</p>
            {buttonText && (
              <CTAButton text={buttonText} onClick={onButtonClick} />
            )}
          </div>
        )}

        {children && (
          <div className="icsa-content">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
function CTAButton({
  text = "SCHEDULE TECHNICAL CONSULTATION",
  onClick,
}: {
  text?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="icsa-btn"
      onClick={
        onClick ||
        (() => {
          const el = document.getElementById("pipeline-section");
          el?.scrollIntoView({ behavior: "smooth" });
        })
      }
    >
      <span>{text}</span>
      <svg
        className="w-3.5 h-3.5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </button>
  );
}

// ─── helpers ──────────────────────────────────────────────────────────────────
const clamp = (v: number) => Math.min(1, Math.max(0, v));
