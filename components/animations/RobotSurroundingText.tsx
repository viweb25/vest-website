'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------
// COMPONENT: ContinuousMorphText (Internal)
// ---------------------------------------------------------

const MORPH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const MORPH_DURATION = 850;

const splitGraphemes = (str: string): string[] => {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const Segmenter = (Intl as any).Segmenter;
    const segmenter = new Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(str)).map((item: any) => item.segment);
  }
  return Array.from(str);
};

function ContinuousMorphText({
  phrases,
  className,
  delay = 0,
}: {
  phrases: string[];
  className?: string;
  delay?: number;
}) {
  const safePhrases = phrases?.filter(Boolean) ?? [];
  const [displayText, setDisplayText] = useState(safePhrases[0] || '');
  
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (safePhrases.length < 2) return;
    cancelledRef.current = false;
    let currentIndex = 0;

    const wait = (ms: number) => {
      return new Promise<void>((resolve) => {
        timeoutRef.current = setTimeout(() => {
          if (!cancelledRef.current) resolve();
        }, ms);
      });
    };

    const morphText = (from: string, to: string): Promise<void> => {
      return new Promise((resolve) => {
        if (cancelledRef.current) return resolve();
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);

        const fromChars = splitGraphemes(from);
        const toChars = splitGraphemes(to);
        const maxLength = Math.max(fromChars.length, toChars.length);

        const delays = Array.from({ length: maxLength }, (_, i) => {
          return maxLength <= 1 ? 0 : (i / (maxLength - 1)) * 0.18;
        });

        let startTime: number | null = null;
        let completed = false;

        const finish = () => {
          if (completed) return;
          completed = true;
          if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
          setDisplayText(to);
          resolve();
        };

        const animate = (timestamp: number) => {
          if (cancelledRef.current) return finish();
          if (startTime === null) startTime = timestamp;

          const progress = Math.min((timestamp - startTime) / MORPH_DURATION, 1);
          let result = '';

          for (let i = 0; i < maxLength; i++) {
            const oldChar = fromChars[i] ?? '';
            const newChar = toChars[i] ?? '';

            if (oldChar === ' ' || newChar === ' ') {
              const spaceProgress = Math.min(Math.max((progress - delays[i]) / 0.35, 0), 1);
              result += spaceProgress >= 0.5 ? newChar || ' ' : oldChar || ' ';
              continue;
            }

            const localProgress = Math.min(Math.max((progress - delays[i]) / 0.82, 0), 1);

            if (localProgress <= 0) {
              result += oldChar;
              continue;
            }

            if (localProgress < 1) {
              const revealThreshold = Math.pow(localProgress, 0.65);
              const seed = ((i + 1) * 9301 + Math.floor(localProgress * 100) * 49297) % 233280;
              const randomValue = seed / 233280;

              if (randomValue < revealThreshold) {
                result += newChar;
              } else {
                const charIndex = Math.abs(Math.floor(seed % MORPH_CHARS.length));
                result += MORPH_CHARS[charIndex];
              }
              continue;
            }

            result += newChar;
          }

          setDisplayText(result);

          if (progress < 1) {
            frameRef.current = requestAnimationFrame(animate);
          } else {
            finish();
          }
        };

        frameRef.current = requestAnimationFrame(animate);
      });
    };

    const runSequence = async () => {
      // Stagger start so they don't morph exactly simultaneously
      if (delay > 0) {
        await wait(delay);
      }

      while (!cancelledRef.current) {
        // Hold for reading duration (e.g., 2.5 seconds) then continuously morph to the next
        await wait(2500);
        if (cancelledRef.current) return;

        const nextIndex = (currentIndex + 1) % safePhrases.length;
        await morphText(safePhrases[currentIndex], safePhrases[nextIndex]);
        if (cancelledRef.current) return;

        currentIndex = nextIndex;
      }
    };

    runSequence();

    return () => {
      cancelledRef.current = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [phrases]);

  return (
    <span className={cn('inline-block whitespace-nowrap will-change-transform', className)} aria-live="polite">
      {displayText}
    </span>
  );
}

// ---------------------------------------------------------
// COMPONENT: RobotSurroundingText (Exported)
// ---------------------------------------------------------

const PHRASES_1 = [
  "Intelligent Testing. Smarter Engineering.",
  "よりスマートなエンジニアリングのためのインテリジェントテスト",
  "اختبارات ذكية وهندسة أكثر ذكاءً",
  "परीक्षण बुद्धिमान। इंजीनियरिंग अधिक स्मार्ट।",
  "Intelligente Tests. Smarteres Engineering.",
  "Intelligent Testing. Smarter Engineering.",
];

const PHRASES_2 = [
  "AI-Powered LabVIEW Integration.",
  "AIを搭載したLabVIEWインテグレーション",
  "تكامل LabVIEW المدعوم بالذكاء الاصطناعي",
  "AI-संचालित LabVIEW एकीकरण",
  "KI-gestützte LabVIEW-Integration",
  "AI-Powered LabVIEW Integration.",
];

const PHRASES_3 = [
  "Precision Built for Mission-Critical Systems.",
  "ミッションクリティカルなシステムのために構築された精度",
  "دقة مصممة للأنظمة الحرجة",
  "मिशन-क्रिटिकल सिस्टम के लिए निर्मित सटीकता",
  "Präzision für geschäftskritische Systeme",
  "Precision Built for Mission-Critical Systems.",
];

const PHRASES_4 = [
  "Real-Time Intelligence at Hardware Speed.",
  "ハードウェア速度でのリアルタイムインテリジェンス",
  "ذكاء في الوقت الفعلي بسرعة الأجهزة",
  "हार्डवेयर गति पर रीयल-टाइम इंटेलिजेंस",
  "Echtzeit-Intelligenz bei Hardware-Geschwindigkeit",
  "Real-Time Intelligence at Hardware Speed.",
];

const PHRASES_5 = [
  "Engineering Automation Without Compromise.",
  "妥協のないエンジニアリングの自動化",
  "أتمتة هندسية بلا تنازلات",
  "समझौते के बिना इंजीनियरिंग स्वचालन",
  "Engineering-Automatisierung ohne Kompromisse",
  "Engineering Automation Without Compromise.",
];

const PHRASES_6 = [
  "From Aerospace to Automotive Innovation.",
  "航空宇宙から自動車のイノベーションまで",
  "من الفضاء إلى ابتكار السيارات",
  "एयरोस्पेस से लेकर ऑटोमोटिव इनोवेशन तक",
  "Von der Luft- und Raumfahrt zur Automobilinnovation",
  "From Aerospace to Automotive Innovation.",
];

const PHRASES_7 = [
  "Where LabVIEW Meets Artificial Intelligence.",
  "LabVIEWと人工知能が出会う場所",
  "حيث يلتقي LabVIEW بالذكاء الاصطناعي",
  "जहां LabVIEW आर्टिफिशियल इंटेलिजेंस से मिलता है",
  "Wo LabVIEW auf künstliche Intelligenz trifft",
  "Where LabVIEW Meets Artificial Intelligence.",
];

const PHRASES_8 = [
  "Building the Future of Intelligent Testing.",
  "インテリジェントテストの未来を築く",
  "بناء مستقبل الاختبارات الذكية",
  "बुद्धिमान परीक्षण के भविष्य का निर्माण",
  "Die Zukunft intelligenter Tests gestalten",
  "Building the Future of Intelligent Testing.",
];

export default function RobotSurroundingText() {
  const baseClass = "absolute font-mono text-[10px] md:text-[12px] lg:text-[13px] tracking-widest uppercase text-white/30 drop-shadow-sm";

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* 1. Above-left */}
      <ContinuousMorphText
        phrases={PHRASES_1}
        delay={0}
        className={cn(baseClass, "top-[10%] left-[0%] sm:left-[5%] text-left")}
      />
      {/* 2. Above-right */}
      <ContinuousMorphText
        phrases={PHRASES_2}
        delay={400}
        className={cn(baseClass, "top-[15%] right-[-5%] sm:right-[0%] text-right")}
      />
      {/* 3. Middle-left */}
      <ContinuousMorphText
        phrases={PHRASES_3}
        delay={800}
        className={cn(baseClass, "top-[40%] left-[-10%] sm:left-[-5%] text-left")}
      />
      {/* 4. Middle-right */}
      <ContinuousMorphText
        phrases={PHRASES_4}
        delay={1200}
        className={cn(baseClass, "top-[50%] right-[-10%] sm:right-[-5%] text-right")}
      />
      {/* 5. Lower-left */}
      <ContinuousMorphText
        phrases={PHRASES_5}
        delay={1600}
        className={cn(baseClass, "bottom-[25%] left-[0%] sm:left-[5%] text-left")}
      />
      {/* 6. Lower-right */}
      <ContinuousMorphText
        phrases={PHRASES_6}
        delay={2000}
        className={cn(baseClass, "bottom-[15%] right-[-5%] sm:right-[0%] text-right")}
      />
      {/* 7. Slightly above/near */}
      <ContinuousMorphText
        phrases={PHRASES_7}
        delay={2400}
        className={cn(baseClass, "top-[2%] right-[30%] sm:right-[35%] text-center")}
      />
      {/* 8. Slightly below/near */}
      <ContinuousMorphText
        phrases={PHRASES_8}
        delay={2800}
        className={cn(baseClass, "bottom-[5%] right-[25%] sm:right-[30%] text-center")}
      />
    </div>
  );
}
