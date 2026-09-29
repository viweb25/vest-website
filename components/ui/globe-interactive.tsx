"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import createGlobe from "cobe"

interface InteractiveMarker {
  id: string
  location: [number, number]
  name: string
  users: number
}

interface GlobeInteractiveProps {
  markers?: InteractiveMarker[]
  className?: string
  speed?: number
}

const defaultMarkers: InteractiveMarker[] = [
  { id: "hq", location: [37.78, -122.44], name: "HQ", users: 1420 },
  { id: "eu", location: [52.52, 13.41], name: "EU", users: 892 },
  { id: "asia", location: [35.68, 139.65], name: "Asia", users: 2103 },
  { id: "india", location: [20.59, 78.96], name: "India", users: 3120 },
  { id: "latam", location: [-23.55, -46.63], name: "LATAM", users: 567 },
  { id: "mena", location: [25.2, 55.27], name: "MENA", users: 734 },
  { id: "oceania", location: [-33.87, 151.21], name: "APAC", users: 445 },
]

export function GlobeInteractive({
  markers = defaultMarkers,
  className = "",
  speed = 0.003,
}: GlobeInteractiveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 0

    function init() {
      const width = canvas.offsetWidth
      if (width === 0) return
      if (globe) return // already initialized

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width, height: width,
        phi: 0, theta: 0.2, dark: 0, diffuse: 1.5,
        mapSamples: 16000, mapBrightness: 10,
        baseColor: [0.15, 0.4, 0.9], // Blue earth
        markerColor: [0.1, 0.8, 0.3], // Green dot
        glowColor: [0.2, 0.5, 1], // Blue glow
        markerElevation: 0,
        markers: markers.map((m) => ({ location: m.location, size: 0.015, id: m.id })), // Reduced marker size
        arcs: [], arcColor: [0.15, 0.3, 0.55],
        arcWidth: 0.5, arcHeight: 0.25, opacity: 0.7,
      })

      function animate() {
        if (!isPausedRef.current) phi += speed
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [markers, speed])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <style>{`
        @keyframes fade-slide-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 0.8; transform: translateY(0); }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%", height: "100%", cursor: "grab", opacity: 0,
          transition: "opacity 1.2s ease", borderRadius: "50%", touchAction: "none",
        }}
      />
      {markers.map((m) => (
        <div key={m.id} style={{ display: 'contents' }}>
          {/* Pulsing dot directly on the globe location */}
          <div
            style={{
              position: "absolute",
              // @ts-expect-error CSS Anchor Positioning
              positionAnchor: `--cobe-${m.id}`,
              top: "anchor(center)",
              left: "anchor(center)",
              translate: "-50% -50%",
              pointerEvents: "none",
              opacity: `var(--cobe-visible-${m.id}, 0)`,
            }}
            className="flex h-2.5 w-2.5"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </div>

          {/* Message Box */}
          <div
            onClick={() => setExpanded(expanded === m.id ? null : m.id)}
            className="bg-white border border-slate-200 rounded-none shadow-sm hover:shadow-md"
            style={{
              position: "absolute",
              // @ts-expect-error CSS Anchor Positioning
              positionAnchor: `--cobe-${m.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              translate: "-50% 0",
              marginBottom: 8,
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              padding: expanded === m.id ? "0.4rem 0.6rem" : "0.3rem 0.5rem",
              color: "#0f172a",
              cursor: "pointer",
              opacity: `var(--cobe-visible-${m.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
              transition: "opacity 0.4s, filter 0.4s, transform 0.2s, padding 0.2s",
              zoom: expanded === m.id ? 1.05 : 1,
            }}
          >
            {/* Chat bubble tail */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-b border-r border-slate-200 rotate-45"></div>
            
            <div className="relative flex items-center gap-1.5 z-10">
              <span style={{
                fontFamily: "monospace", fontSize: "0.6rem", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase" as const,
              }}>{m.name}</span>
            </div>
            {expanded === m.id && (
              <span className="relative z-10" style={{
                fontFamily: "system-ui, sans-serif", fontSize: "0.55rem",
                opacity: 0.8, marginTop: "0.15rem",
                animation: "fade-slide-in 0.2s ease-out",
              }}>
                {m.users.toLocaleString()} users
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
