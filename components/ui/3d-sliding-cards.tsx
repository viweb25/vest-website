'use client'

import { useEffect, useState } from 'react'
import React from 'react'
import Link from 'next/link'

type Card = {
  id: number
  imgSrc: string
  title: string
  sub: string
}

export default function FloatingCards() {
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    // 6 original + 10 extra images
    const rawData = [
      { src: 'https://cdn.21st.dev/assets/mirror/6e/6ea4e5b0e69969ff6f3a9d8ba1853ea9d2f42f2726d6cccc856e8977712f8a8f.jpg', title: 'Automated functional test station', sub: 'LabVIEW & Test Automation' },
      { src: 'https://cdn.21st.dev/assets/mirror/8b/8b8342d2727e06d018042e9009c4cb1e313cd03afb622dafe02412cb8b655452.jpg', title: 'Hardware-in-the-loop test bench', sub: 'LabVIEW & Test Automation' },
      { src: 'https://cdn.21st.dev/assets/mirror/32/3228cb51067a340306315e58d3b03b6802c56b2559b182abd1facfa05bee50dd.jpg', title: 'Machine automation with HMI', sub: 'PLC & Automation' },
      { src: 'https://cdn.21st.dev/assets/mirror/d5/d5d0b163b00548feb4b108fff5dd1878b2a82b1ed3def020d9c5f4f768932e88.jpg', title: 'Production monitoring and data logging', sub: 'PLC & Automation' },
      { src: 'https://cdn.21st.dev/assets/mirror/e3/e3f1d75a706d5405c69c5fdc2af2a25931e6dbc1d16cd2c9a56711f35ce49bfe.jpg', title: 'Predictive maintenance analytics', sub: 'AI & Computer Vision' },
      { src: 'https://cdn.21st.dev/assets/mirror/b4/b4fa70f4aa260f7824f44730524387113411bc08cf160d8aea2bef9a8fbb97fa.jpg', title: 'Machine vision inspection', sub: 'AI & Computer Vision' },
      { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', title: 'Structural steel detailing package', sub: 'Engineering' },
      { src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', title: 'Miscellaneous steel and BOM documentation', sub: 'Engineering' },
      { src: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80', title: 'Mobile-first service management app', sub: 'Software & Technology' },
      { src: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&q=80', title: 'Modular ERP platform', sub: 'Software & Technology' },
    ]

    const newCards = rawData.map((data, index) => ({
      id: index + 1,
      imgSrc: data.src,
      title: data.title,
      sub: data.sub
    }))

    setCards(newCards)

    let currentProgress = 0
    let targetProgress = 0
    let rafId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateAnimation = () => {
      currentProgress = lerp(currentProgress, targetProgress, 0.08)

      const slider = document.querySelector('.slider') as HTMLElement | null
      if (slider) {
        // Cards are stacked along: X: +200, Y: -100, Z: -400 for dramatic depth
        // We move the slider in the exact opposite direction to fly through them
        const xOffset = -(currentProgress * 200)
        const yOffset = (currentProgress * 100)
        const zOffset = (currentProgress * 400)

        slider.style.transform = `translate3d(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px), ${zOffset}px)`

        // Fade out cards as they fly past the camera to prevent clipping/glitching
        const cardElements = document.querySelectorAll('.card-wrapper')
        cardElements.forEach((el, index) => {
          const absoluteZ = (index * -400) + zOffset
          const htmlEl = el as HTMLElement

          // Camera is at Z=2000. Start fading at Z=800, fully transparent by Z=1400.
          if (absoluteZ > 800) {
            const opacity = Math.max(0, 1 - ((absoluteZ - 800) / 600))
            htmlEl.style.opacity = opacity.toString()
            htmlEl.style.pointerEvents = opacity < 0.5 ? 'none' : 'auto'
          } else {
            htmlEl.style.opacity = '1'
            htmlEl.style.pointerEvents = 'auto'
          }
        })
      }

      rafId = requestAnimationFrame(updateAnimation)
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const targetMax = cards.length > 0 ? cards.length - 1 : 0

      let progress = (scrollPos / maxScroll) * targetMax
      targetProgress = Math.max(0, Math.min(progress, targetMax))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initialize
    handleScroll()
    currentProgress = targetProgress // Snap to initial position immediately
    rafId = requestAnimationFrame(updateAnimation)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [cards.length])

  return (
    <>
      <style>{`
        .slider-container {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 10;
          perspective: 2000px; /* Crucial for realistic 3D depth */
        }
        .slider {
          position: absolute;
          top: 50%;
          left: 65%; /* Move to right side so it does not overlap text */
          width: 260px;
          height: 260px;
          transform-style: preserve-3d;
        }
        .card-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          pointer-events: auto;
          cursor: pointer;
        }
        .card {
          width: 100%;
          height: 100%;
          border-radius: 0px; /* Sharp corners matching screenshot */
          background: #fff;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 20px 40px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05);
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          position: relative;
        }
        /* Hover effect: Pop out and to the right, bring to front */
        .card-wrapper:hover {
          z-index: 50 !important;
        }
        .card-wrapper:hover .card {
          /* Translating positively on X pushes it right, negatively on Y pushes it up */
          transform: translate3d(50px, -40px, 100px);
          box-shadow: -40px 60px 90px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(0,0,0,0.05);
        }
        .card-img-wrap {
          flex: 1;
          width: 100%;
          background: #f0f0f0;
          overflow: hidden;
        }
        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
        .card-text {
          width: 100%;
          height: 40px;
          background: #fff;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          padding: 0 12px;
          text-align: right;
        }
        .card-title {
          font-weight: 700;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #000;
        }
        .card-sub {
          font-size: 8px;
          color: #888;
          margin-top: 2px;
          font-weight: 500;
        }
        @media (min-width: 768px) {
          .slider {
            width: 360px;
            height: 360px;
            left: 56%;
          }
        }
      `}</style>

      <div className="slider-container">
        <div className="slider" aria-label="3D image slider">
          {cards.map((card, index) => {
            // Distribute cards in 3D space: right, up, and backwards
            // Increase spacing significantly so cards don't overlap as heavily
            const cardTransform = `translate3d(${index * 200}px, ${index * -100}px, ${index * -400}px)`;
            return (
              <Link
                href={`/projects/${card.id}`}
                key={card.id}
                className="card-wrapper"
                style={{ transform: cardTransform, zIndex: cards.length - index }}
              >
                <div className="card">
                  <div className="card-img-wrap">
                    <img
                      src={card.imgSrc || "/placeholder.svg"}
                      alt={`Project ${card.id}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="card-text">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-sub">{card.sub}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
