'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import Image from 'next/image';
import React from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type LinkPreviewProps = {
  children: React.ReactNode;
  url?: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
  isStatic?: boolean;
  imageSrc?: string;
  asChild?: boolean;
};

export const LinkPreview = ({
  children,
  url = '#',
  className,
  width = 240,
  height = 150,
  quality = 75,
  isStatic = true,
  imageSrc = '',
  asChild = false
}: LinkPreviewProps) => {
  let src = imageSrc;
  if (!isStatic && url && url !== '#') {
    const params = new URLSearchParams({
      url,
      screenshot: 'true',
      meta: 'false',
      embed: 'screenshot.url',
      colorScheme: 'dark',
      'viewport.isMobile': 'true',
      'viewport.deviceScaleFactor': '1',
      'viewport.width': String(width * 3),
      'viewport.height': String(height * 3)
    }).toString();
    src = `https://api.microlink.io/?${params}`;
  }

  const [isOpen, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Subtle parallax effect
    x.set(offsetFromCenter);
  };

  const previewContent = (
    <div
      className="block p-1.5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl rounded-2xl overflow-hidden hover:border-[#E7651A]/40 transition-colors"
      style={{ fontSize: 0 }}
    >
      <div className="relative rounded-xl overflow-hidden bg-slate-900" style={{ width, height }}>
        <Image
          src={src || '/Machine.png'}
          width={width}
          height={height}
          quality={quality}
          priority={true}
          className="rounded-xl object-cover w-full h-full"
          alt="Workflow Step Preview"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );

  return (
    <>
      {isMounted && src ? (
        <div className="hidden" aria-hidden="true">
          <Image
            src={src}
            width={width}
            height={height}
            quality={quality}
            priority={true}
            alt="preloaded preview image"
          />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={120}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        {asChild ? (
          <HoverCardPrimitive.Trigger
            asChild
            onMouseMove={handleMouseMove}
            className={className}
          >
            {children}
          </HoverCardPrimitive.Trigger>
        ) : (
          <HoverCardPrimitive.Trigger
            onMouseMove={handleMouseMove}
            className={cn('cursor-pointer text-[#E7651A]', className)}
            href={url}
          >
            {children}
          </HoverCardPrimitive.Trigger>
        )}

        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)] z-50 pointer-events-none"
          side="top"
          align="center"
          sideOffset={14}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 20
                  }
                }}
                exit={{ opacity: 0, y: 16, scale: 0.7, transition: { duration: 0.15 } }}
                className="shadow-2xl rounded-2xl"
                style={{
                  x: translateX
                }}
              >
                {url && url !== '#' ? (
                  <Link href={url} className="block cursor-pointer">
                    {previewContent}
                  </Link>
                ) : (
                  previewContent
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};

export default LinkPreview;
