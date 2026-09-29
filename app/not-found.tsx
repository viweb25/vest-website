"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GlyphPortal from "@/components/ui/glyph-portal";

export default function NotFound() {
  const router = useRouter();
  const face = "var(--font-sans, Inter, Arial, sans-serif)";

  return (
    <div
      style={{
        width: "100%",
        background: "#0a0b0d",
        containerType: "inline-size",
        fontFamily: face,
        minHeight: "100svh",
      }}
    >
      <style>{`
        [data-404-demo] [data-gp-caption]{inset:calc(var(--gp-word-bottom,50%) + 82px) 24px auto;justify-content:center;}
        [data-404-demo] [data-gp-hint]{display:none;}
        [data-404-demo] [data-gp-enter]{min-height:46px;padding:0 20px;gap:28px;background:#1a1a2e;border:1px solid #2a2a4e;border-radius:10px;color:#fff;font-size:13px;font-weight:500;box-shadow:0 1px 2px rgba(0,0,0,0.3);transition:background .18s,box-shadow .18s;}
        [data-404-demo] [data-gp-enter]:hover{background:#2a2a4e;box-shadow:0 3px 8px rgba(0,0,0,0.3);}
        [data-404-demo] [data-gp-enter]:focus-visible{outline:2px solid #4facfe;outline-offset:4px;}
        [data-404-demo] [data-gp-touch-picker]{top:auto;bottom:18px;left:50%;}
        [data-404-demo] [data-gp-select]{border-color:transparent;border-radius:8px;font-size:12px;color:#888;}
        [data-404-header]{position:absolute;inset:clamp(24px,4.5cqw,48px) clamp(24px,5cqw,64px) auto;display:flex;align-items:center;justify-content:space-between;gap:20px;}
        [data-404-logo]{font-size:19px;font-weight:600;letter-spacing:-.065em;color:#fff;cursor:pointer;}
        [data-404-code]{font-size:12px;line-height:1.5;color:rgba(255,255,255,0.4);font-family:ui-monospace,monospace;letter-spacing:0.1em;}
        [data-404-eyebrow]{position:absolute;inset:auto 24px calc(100% - var(--gp-word-top,35%) + 32px);margin:0;text-align:center;font-size:13px;font-weight:400;line-height:1.5;letter-spacing:.005em;color:rgba(255,255,255,0.45);}
        [data-404-support]{position:absolute;inset:calc(var(--gp-word-bottom,50%) + 32px) 24px auto;margin:0;text-align:center;font-size:16px;font-weight:400;line-height:1.5;color:rgba(255,255,255,0.6);}
        [data-404-scroll]{position:absolute;inset:auto 24px 7%;text-align:center;color:rgba(255,255,255,0.3);font-size:11px;letter-spacing:.01em;}
        @media(any-pointer:coarse){[data-404-scroll]{bottom:13%;}}
        @container(max-width:450px){[data-404-code]{max-width:12ch;text-align:right;}[data-404-eyebrow]{font-size:12px;}[data-404-support]{font-size:14px;}[data-404-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 76px);}}
        @container(max-height:479px){[data-404-header]{top:18px;}[data-404-support]{top:calc(var(--gp-word-bottom,50%) + 16px);}[data-404-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 60px);}[data-404-scroll]{display:none;}}
        [data-404-demo] [data-gp-content]{padding:5.5rem clamp(1.25rem,5cqw,5rem) 6.5rem;font-family:inherit;}
        [data-404-copy]{display:flex;width:min(100%,80rem);margin:auto;flex-direction:column;align-items:center;gap:clamp(2rem,5svh,3.5rem);text-align:center;}
        [data-404-copy] h2{max-width:36rem;margin:0;color:inherit;font-size:clamp(1.75rem,1.1rem + 2.1cqw,2.5rem);font-weight:300;line-height:1.25;letter-spacing:0;text-wrap:balance;}
        [data-404-copy] p{max-width:44ch;margin:0;color:rgba(251,251,250,.7);font-size:1rem;line-height:1.65;}
        [data-404-actions]{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;}
        [data-404-btn-primary]{padding:12px 28px;background:#fff;color:#0a0b0d;border:none;border-radius:9999px;font-size:14px;font-weight:600;cursor:pointer;transition:opacity .18s,transform .18s;letter-spacing:.01em;}
        [data-404-btn-primary]:hover{opacity:.88;transform:scale(1.03);}
        [data-404-btn-secondary]{padding:12px 28px;background:transparent;color:rgba(251,251,250,.7);border:1px solid rgba(251,251,250,.2);border-radius:9999px;font-size:14px;font-weight:500;cursor:pointer;transition:border-color .18s,color .18s;letter-spacing:.01em;}
        [data-404-btn-secondary]:hover{border-color:rgba(251,251,250,.5);color:#fff;}
      `}</style>

      <div data-404-demo style={{ width: "100%", minHeight: "100svh" }}>
          <GlyphPortal
            word="404"
            fontFamily={face}
            fontWeight={700}
            style={{ fontFamily: face, "--gp-field": "#0f0f1a", "--gp-paper": "#0a0b0d", "--gp-foreground": "#fbfbfa" } as React.CSSProperties}
            scrollLength={2.2}
            interactive={true}
            annotations={false}
            enterLabel="Take me back"
            front={
              <>
                <div data-404-header>
                  <span data-404-logo onClick={() => router.push("/")}>websync.</span>
                  <span data-404-code>ERROR / 404</span>
                </div>
                <p data-404-eyebrow>You wandered somewhere empty.</p>
                <p data-404-support>This page doesn&apos;t exist.</p>
                <span data-404-scroll>Scroll to find your way back ↓</span>
              </>
            }
          >
            <div data-404-copy>
              <h2>The page you&apos;re looking for has gone missing.</h2>
              <p>
                It might have been moved, deleted, or it never existed in the first place.
                Let&apos;s get you back on track.
              </p>
              <div data-404-actions>
                <button data-404-btn-primary onClick={() => router.push("/")}>
                  Take me home
                </button>
                <button data-404-btn-secondary onClick={() => router.back()}>
                  ← Go back
                </button>
              </div>
            </div>
          </GlyphPortal>
      </div>
    </div>
  );
}
