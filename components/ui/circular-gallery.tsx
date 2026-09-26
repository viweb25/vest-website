import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Externally provided rotation value. If provided, disables auto-scroll. */
  rotation?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, rotation = 0, ...props }, ref) => {

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out'
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.2, 1 - (normalizedAngle / 180));
            const scale = Math.max(0.7, 1 - (normalizedAngle / 180) * 0.5);

            return (
              <div
                key={item.photo.url + i}
                role="group"
                aria-label={item.common}
                className="absolute w-[300px] h-[380px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-150px',
                  marginTop: '-120px',
                  opacity: opacity,
                  transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                }}
              >
                <div className="group relative w-full h-full rounded-[22px] shadow-2xl overflow-hidden bg-slate-900 border border-slate-200/20">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />

                  {/* Base subtle gradient always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Darker gradient that fades in smoothly on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

                  {/* GPU-accelerated text sliding container */}
                  <div className="absolute left-0 right-0 bottom-0 p-6 flex flex-col justify-end translate-y-[84px] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="pb-2">
                      <span className="block text-[10px] font-bold tracking-widest uppercase mb-2 text-orange-400">{item.photo.by}</span>
                      <h2 className="text-xl font-bold text-white leading-snug">{item.common}</h2>
                    </div>
                    
                    {/* Fixed height description area to avoid layout reflows */}
                    <div className="h-[84px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out delay-75">
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">{item.binomial}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
