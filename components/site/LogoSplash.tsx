'use client';

import React, { useState, useEffect } from 'react';

export default function LogoSplash() {
  const [show, setShow] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    // Lock scrolling while splash screen plays
    document.body.style.overflow = 'hidden';

    // Fade out starts at 3.4 seconds (after tile, polygons, shine, text rise, glow finish)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3400);

    // Unmount completely at 4.1 seconds and restore scrolling
    const closeTimer = setTimeout(() => {
      document.body.style.overflow = '';
      setShow(false);
    }, 4100);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(closeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      document.body.style.overflow = '';
      setShow(false);
    }, 300);
  };

  if (!show) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#f4f1ec] cursor-pointer select-none transition-opacity duration-700 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="VEST Welcome Screen"
    >
      {/* WRAPPER & SVG (Exact classes bound to pre-compiled global CSS) */}
      <div className="logo-splash-wrap logo-splash-play">
        <div className="logo-splash-stage">
          <svg
            viewBox="0 0 500 500"
            role="img"
            aria-label="Animated V logo"
            className="w-full h-full overflow-visible block"
          >
            <defs>
              <clipPath id="tileClip">
                <rect x="66" y="66" width="368" height="368" rx="30" />
              </clipPath>
              <linearGradient id="sheen" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <filter id="blur">
                <feGaussianBlur stdDeviation="10" />
              </filter>
            </defs>

            <g className="logo-splash-logo">
              <rect
                className="logo-splash-shadow"
                x="76"
                y="92"
                width="348"
                height="348"
                rx="34"
                fill="#000"
                filter="url(#blur)"
                opacity=".22"
              />
              <rect
                className="logo-splash-tile"
                x="66"
                y="66"
                width="368"
                height="368"
                rx="30"
                fill="#E2621B"
              />
              <polygon
                className="logo-splash-left"
                points="133,132 195,132 244,326 238,352 188,352"
                fill="#0B2748"
              />
              <polygon
                className="logo-splash-right"
                points="347,80 375,80 262,358 229,360"
                fill="#0B2748"
              />
              <g clipPath="url(#tileClip)">
                <rect
                  className="logo-splash-shine"
                  x="66"
                  y="40"
                  width="90"
                  height="420"
                  fill="url(#sheen)"
                  transform="skewX(-20)"
                  style={{ transformBox: 'fill-box' }}
                />
              </g>
            </g>
          </svg>
        </div>
        <div className="logo-splash-brand">
          <h1 className="logo-splash-company">
            <span>VEST INNOVATION PVT LIMITED</span>
          </h1>
          <p className="logo-splash-powered">
            <span className="logo-splash-pb">Powered by</span>{' '}
            <span className="logo-splash-vi">VI websync</span>
          </p>
        </div>
      </div>
    </div>
  );
}
