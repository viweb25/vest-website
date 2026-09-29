'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------
// COMPONENT: ContinuousMorphText (Internal)
// ---------------------------------------------------------

const MORPH_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const MORPH_DURATION = 850;

// The text can move between these controlled positions.
// Each position is different from the previous one.
const ROBOT_TEXT_POSITIONS = [
  'top-[6%] left-[4%] text-left',
  'top-[8%] right-[4%] text-right',
  'top-[25%] left-[2%] text-left',
  'top-[30%] right-[2%] text-right',
  'top-[48%] left-[4%] text-left',
  'top-[52%] right-[4%] text-right',
  'bottom-[18%] left-[6%] text-left',
  'bottom-[12%] right-[6%] text-right',
  'top-[14%] left-1/2 -translate-x-1/2 text-center',
  'bottom-[7%] left-1/2 -translate-x-1/2 text-center',
];

const splitGraphemes = (str: string): string[] => {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const Segmenter = (Intl as any).Segmenter;
    const segmenter = new Segmenter('en', {
      granularity: 'grapheme',
    });

    return Array.from(segmenter.segment(str)).map(
      (item: any) => item.segment
    );
  }

  return Array.from(str);
};

function ContinuousMorphText({
  phrases,
  className,
  delay = 0,
  initialPositionIndex = 0,
}: {
  phrases: string[];
  className?: string;
  delay?: number;
  initialPositionIndex?: number;
}) {
  const safePhrases = phrases?.filter(Boolean) ?? [];

  const [displayText, setDisplayText] = useState(
    safePhrases[0] || ''
  );

  const initialPosition =
    ROBOT_TEXT_POSITIONS[
      Math.abs(initialPositionIndex) % ROBOT_TEXT_POSITIONS.length
    ];

  const [positionClass, setPositionClass] =
    useState(initialPosition);

  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef(false);
  const positionRef = useRef(initialPosition);

  useEffect(() => {
    if (safePhrases.length < 2) return;

    cancelledRef.current = false;

    let currentIndex = 0;

    const startingPosition =
      ROBOT_TEXT_POSITIONS[
        Math.abs(initialPositionIndex) % ROBOT_TEXT_POSITIONS.length
      ];

    positionRef.current = startingPosition;
    setPositionClass(startingPosition);
    setDisplayText(safePhrases[0]);

    const wait = (ms: number) => {
      return new Promise<boolean>((resolve) => {
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
          resolve(!cancelledRef.current);
        }, ms);
      });
    };

    const morphText = (
      from: string,
      to: string
    ): Promise<boolean> => {
      return new Promise((resolve) => {
        if (cancelledRef.current) {
          resolve(false);
          return;
        }

        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }

        const fromChars = splitGraphemes(from);
        const toChars = splitGraphemes(to);
        const maxLength = Math.max(
          fromChars.length,
          toChars.length
        );

        const delays = Array.from(
          { length: maxLength },
          (_, index) =>
            maxLength <= 1
              ? 0
              : (index / (maxLength - 1)) * 0.18
        );

        let startTime: number | null = null;
        let completed = false;

        const finish = () => {
          if (completed) return;

          completed = true;

          if (frameRef.current !== null) {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
          }

          // Always finish on the exact target sentence.
          setDisplayText(to);
          resolve(true);
        };

        const animate = (timestamp: number) => {
          if (cancelledRef.current) {
            if (!completed) {
              completed = true;

              if (frameRef.current !== null) {
                cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
              }

              resolve(false);
            }

            return;
          }

          if (startTime === null) {
            startTime = timestamp;
          }

          const progress = Math.min(
            (timestamp - startTime) / MORPH_DURATION,
            1
          );

          let result = '';

          for (let i = 0; i < maxLength; i++) {
            const oldChar = fromChars[i] ?? '';
            const newChar = toChars[i] ?? '';

            if (oldChar === ' ' || newChar === ' ') {
              const spaceProgress = Math.min(
                Math.max(
                  (progress - delays[i]) / 0.35,
                  0
                ),
                1
              );

              result +=
                spaceProgress >= 0.5
                  ? newChar || ' '
                  : oldChar || ' ';

              continue;
            }

            const localProgress = Math.min(
              Math.max(
                (progress - delays[i]) / 0.82,
                0
              ),
              1
            );

            if (localProgress <= 0) {
              result += oldChar;
              continue;
            }

            if (localProgress < 1) {
              const revealThreshold = Math.pow(
                localProgress,
                0.65
              );

              const seed =
                ((i + 1) * 9301 +
                  Math.floor(localProgress * 100) * 49297) %
                233280;

              const randomValue = seed / 233280;

              if (randomValue < revealThreshold) {
                result += newChar;
              } else {
                const charIndex = Math.abs(
                  Math.floor(
                    seed % MORPH_CHARS.length
                  )
                );

                result += MORPH_CHARS[charIndex];
              }

              continue;
            }

            result += newChar;
          }

          setDisplayText(result);

          if (progress < 1) {
            frameRef.current =
              requestAnimationFrame(animate);
          } else {
            finish();
          }
        };

        frameRef.current =
          requestAnimationFrame(animate);
      });
    };

    const getNewPosition = () => {
      if (ROBOT_TEXT_POSITIONS.length <= 1) {
        return ROBOT_TEXT_POSITIONS[0];
      }

      let nextPosition = positionRef.current;

      // Never return the same position twice in a row.
      while (nextPosition === positionRef.current) {
        nextPosition =
          ROBOT_TEXT_POSITIONS[
            Math.floor(
              Math.random() * ROBOT_TEXT_POSITIONS.length
            )
          ];
      }

      return nextPosition;
    };

    const runSequence = async () => {
      if (delay > 0) {
        const delayed = await wait(delay);
        if (!delayed || cancelledRef.current) return;
      }

      while (!cancelledRef.current) {
        const nextIndex =
          (currentIndex + 1) % safePhrases.length;

        // Continuous morph: no reading pause between languages.
        const finished = await morphText(
          safePhrases[currentIndex],
          safePhrases[nextIndex]
        );

        if (!finished || cancelledRef.current) return;

        currentIndex = nextIndex;

        // IMPORTANT:
        // Once the sentence is complete, move it to a NEW
        // position. The next sentence starts from that position.
        const nextPosition = getNewPosition();
        positionRef.current = nextPosition;
        setPositionClass(nextPosition);
      }
    };

    runSequence();

    return () => {
      cancelledRef.current = true;

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [phrases, delay, initialPositionIndex]);

  return (
    <span
      className={cn(
        'absolute inline-block whitespace-nowrap will-change-transform',
        'transition-[top,right,bottom,left,transform] duration-700 ease-out',
        positionClass,
        className
      )}
      aria-live="polite"
    >
      {displayText}
    </span>
  );
}

// ---------------------------------------------------------
// COMPONENT: AboutRobotSurroundingText (Exported)
// ---------------------------------------------------------

const PHRASES_1 = [
  'Intelligent Testing. Smarter Engineering.',
  'よりスマートなエンジニアリングのためのインテリジェントテスト',
  'اختبارات ذكية وهندسة أكثر ذكاءً',
  'परीक्षण बुद्धिमान। इंजीनियरिंग अधिक स्मार्ट।',
  'Intelligente Tests. Smarteres Engineering.',
  'Intelligent Testing. Smarter Engineering.',
];

const PHRASES_2 = [
  'AI-Powered LabVIEW Integration.',
  'AIを搭載したLabVIEWインテグレーション',
  'تكامل LabVIEW المدعوم بالذكاء الاصطناعي',
  'AI-संचालित LabVIEW एकीकरण',
  'KI-gestützte LabVIEW-Integration',
  'AI-Powered LabVIEW Integration.',
];

const PHRASES_3 = [
  'Precision Built for Mission-Critical Systems.',
  'ミッションクリティカルなシステムのために構築された精度',
  'دقة مصممة للأنظمة الحرجة',
  'मिशन-क्रिटिकल सिस्टम के लिए निर्मित सटीकता',
  'Präzision für geschäftskritische Systeme',
  'Precision Built for Mission-Critical Systems.',
];

const PHRASES_4 = [
  'Real-Time Intelligence at Hardware Speed.',
  'ハードウェア速度でのリアルタイムインテリジェンス',
  'ذكاء في الوقت الفعلي بسرعة الأجهزة',
  'हार्डवेयर गति पर रीयल-टाइम इंटेलिजेंस',
  'Echtzeit-Intelligenz bei Hardware-Geschwindigkeit',
  'Real-Time Intelligence at Hardware Speed.',
];

const PHRASES_5 = [
  'Engineering Automation Without Compromise.',
  '妥協のないエンジニアリングの自動化',
  'أتمتة هندسية بلا تنازلات',
  'समझौते के बिना इंजीनियरिंग स्वचालन',
  'Engineering-Automatisierung ohne Kompromisse',
  'Engineering Automation Without Compromise.',
];

const PHRASES_6 = [
  'From Aerospace to Automotive Innovation.',
  '航空宇宙から自動車のイノベーションまで',
  'من الفضاء إلى ابتكار السيارات',
  'एयरोस्पेस से लेकर ऑटोमोटिव इनोवेशन तक',
  'Von der Luft- und Raumfahrt zur Automobilinnovation',
  'From Aerospace to Automotive Innovation.',
];

const PHRASES_7 = [
  'Where LabVIEW Meets Artificial Intelligence.',
  'LabVIEWと人工知能が出会う場所',
  'حيث يلتقي LabVIEW بالذكاء الاصطناعي',
  'जहां LabVIEW आर्टिफिशियल इंटेलिजेंस से मिलता है',
  'Wo LabVIEW auf künstliche Intelligenz trifft',
  'Where LabVIEW Meets Artificial Intelligence.',
];

const PHRASES_8 = [
  'Building the Future of Intelligent Testing.',
  'インテリジェントテストの未来を築く',
  'بناء مستقبل الاختبارات الذكية',
  'बुद्धिमान परीक्षण के भविष्य का निर्माण',
  'Die Zukunft intelligenter Tests gestalten',
  'Building the Future of Intelligent Testing.',
];

export default function AboutRobotSurroundingText() {
  const baseClass =
    'font-mono text-[10px] md:text-[12px] lg:text-[13px] tracking-widest uppercase text-white/30 drop-shadow-sm';

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <ContinuousMorphText
        phrases={PHRASES_1}
        delay={0}
        initialPositionIndex={0}
        className={baseClass}
      />

      <ContinuousMorphText
        phrases={PHRASES_2}
        delay={400}
        initialPositionIndex={1}
        className={baseClass}
      />

      <ContinuousMorphText
        phrases={PHRASES_3}
        delay={800}
        initialPositionIndex={2}
        className={baseClass}
      />

      <ContinuousMorphText
        phrases={PHRASES_4}
        delay={1200}
        initialPositionIndex={3}
        className={baseClass}
      />

      <ContinuousMorphText
        phrases={PHRASES_5}
        delay={1600}
        initialPositionIndex={4}
        className={baseClass}
      />

      <ContinuousMorphText
        phrases={PHRASES_6}
        delay={2000}
        initialPositionIndex={5}
        className={baseClass}
      />

      <ContinuousMorphText
        phrases={PHRASES_7}
        delay={2400}
        initialPositionIndex={6}
        className={baseClass}
      />

      <ContinuousMorphText
        phrases={PHRASES_8}
        delay={2800}
        initialPositionIndex={7}
        className={baseClass}
      />
    </div>
  );
}
