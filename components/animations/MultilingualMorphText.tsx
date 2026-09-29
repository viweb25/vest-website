'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MultilingualMorphTextProps {
  phrases: string[];
  className?: string;
}

const MORPH_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const VISIBLE_DURATION = 3000;
const HIDDEN_DURATION = 1000;
const MORPH_DURATION = 850;

const ALIGNMENTS = [
  'items-start justify-start text-left',
  'items-start justify-center text-center',
  'items-start justify-end text-right',
  'items-center justify-start text-left',
  'items-center justify-center text-center',
  'items-center justify-end text-right',
  'items-end justify-start text-left',
  'items-end justify-center text-center',
  'items-end justify-end text-right',
];

const splitGraphemes = (str: string): string[] => {
  if (
    typeof Intl !== 'undefined' &&
    'Segmenter' in Intl
  ) {
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

export default function MultilingualMorphText({
  phrases,
  className,
}: MultilingualMorphTextProps) {
  const safePhrases = phrases?.filter(Boolean) ?? [];

  const [displayText, setDisplayText] = useState(
    safePhrases[0] || ''
  );

  const [isVisible, setIsVisible] = useState(true);

  const [positionClass, setPositionClass] = useState(
    ALIGNMENTS[4]
  );

  const frameRef = useRef<number | null>(null);

  const timeoutRefs = useRef<
    Set<ReturnType<typeof setTimeout>>
  >(new Set());

  const cancelledRef = useRef(false);

  const currentIndexRef = useRef(0);

  const positionRef = useRef(ALIGNMENTS[4]);

  const phrasesKey = JSON.stringify(safePhrases);

  useEffect(() => {
    if (safePhrases.length < 2) {
      return;
    }

    cancelledRef.current = false;
    currentIndexRef.current = 0;

    // -----------------------------------------
    // INITIAL STATE
    // -----------------------------------------

    setDisplayText(safePhrases[0]);
    setIsVisible(true);
    setPositionClass(ALIGNMENTS[4]);

    positionRef.current = ALIGNMENTS[4];

    // -----------------------------------------
    // CLEANUP PREVIOUS ANIMATION
    // -----------------------------------------

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current.clear();

    // -----------------------------------------
    // WAIT HELPER
    // -----------------------------------------

    const wait = (ms: number): Promise<boolean> => {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          timeoutRefs.current.delete(timer);

          if (cancelledRef.current) {
            resolve(false);
            return;
          }

          resolve(true);
        }, ms);

        timeoutRefs.current.add(timer);
      });
    };

    // -----------------------------------------
    // MORPH ENGINE
    // -----------------------------------------

    const morphText = (
      from: string,
      to: string
    ): Promise<boolean> => {
      return new Promise((resolve) => {
        if (cancelledRef.current) {
          resolve(false);
          return;
        }

        // Cancel any old RAF
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

        let startTime: number | null = null;
        let completed = false;

        // -----------------------------------------
        // EACH CHARACTER GETS A FIXED START DELAY
        // -----------------------------------------

        const delays = Array.from(
          { length: maxLength },
          (_, index) => {
            if (maxLength <= 1) return 0;

            return (
              (index / (maxLength - 1)) * 0.18
            );
          }
        );

        // -----------------------------------------
        // FINISH
        // -----------------------------------------

        const finish = () => {
          if (completed) return;

          completed = true;

          if (frameRef.current !== null) {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
          }

          // ALWAYS EXACT TARGET
          setDisplayText(to);

          resolve(true);
        };

        // -----------------------------------------
        // ANIMATION FRAME
        // -----------------------------------------

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

          const elapsed = timestamp - startTime;

          const progress = Math.min(
            elapsed / MORPH_DURATION,
            1
          );

          let result = '';

          for (let i = 0; i < maxLength; i++) {
            const oldChar = fromChars[i] ?? '';
            const newChar = toChars[i] ?? '';

            // -----------------------------------------
            // SPACE HANDLING
            // -----------------------------------------

            if (oldChar === ' ' || newChar === ' ') {
              const spaceProgress = Math.min(
                Math.max(
                  (progress - delays[i]) / 0.35,
                  0
                ),
                1
              );

              if (spaceProgress >= 0.5) {
                result += newChar || ' ';
              } else {
                result += oldChar || ' ';
              }

              continue;
            }

            // -----------------------------------------
            // CHARACTER PROGRESS
            // -----------------------------------------

            const localProgress = Math.min(
              Math.max(
                (progress - delays[i]) / 0.82,
                0
              ),
              1
            );

            // Before this character starts
            if (localProgress <= 0) {
              result += oldChar;
              continue;
            }

            // Character is transitioning
            if (localProgress < 1) {
              // Deterministic reveal threshold
              const revealThreshold =
                Math.pow(localProgress, 0.65);

              // Use stable pseudo-random character
              // instead of Math.random() every frame
              const seed =
                ((i + 1) * 9301 +
                  Math.floor(
                    localProgress * 100
                  ) *
                  49297) %
                233280;

              const randomValue = seed / 233280;

              if (randomValue < revealThreshold) {
                result += newChar;
              } else {
                const charIndex =
                  Math.abs(
                    Math.floor(
                      seed % MORPH_CHARS.length
                    )
                  );

                result +=
                  MORPH_CHARS[charIndex];
              }

              continue;
            }

            // Character completed
            result += newChar;
          }

          setDisplayText(result);

          // -----------------------------------------
          // CONTINUE
          // -----------------------------------------

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

    // -----------------------------------------
    // NEW POSITION
    // NEVER SAME AS PREVIOUS
    // -----------------------------------------

    const getNewPosition = () => {
      if (ALIGNMENTS.length <= 1) {
        return ALIGNMENTS[0];
      }

      let newPosition = positionRef.current;

      while (newPosition === positionRef.current) {
        newPosition =
          ALIGNMENTS[
          Math.floor(
            Math.random() * ALIGNMENTS.length
          )
          ];
      }

      return newPosition;
    };

    // -----------------------------------------
    // MAIN SEQUENCE
    //
    // Initial phrase is shown immediately. Every phrase
    // then morphs directly into the next phrase with NO
    // pause. Only the FINAL phrase gets the 3s visible +
    // 1s hidden + new-position cycle before looping.
    // -----------------------------------------

    const runSequence = async () => {
      // Show the first English phrase immediately.
      setDisplayText(safePhrases[0]);
      setIsVisible(true);

      while (!cancelledRef.current) {
        const currentIndex = currentIndexRef.current;
        const nextIndex =
          (currentIndex + 1) % safePhrases.length;

        const currentPhrase = safePhrases[currentIndex];
        const nextPhrase = safePhrases[nextIndex];

        // CONTINUOUS MORPH:
        // English -> Japanese -> Arabic -> Hindi -> German
        // -> Dubai English -> Final English
        // No wait between any of these transitions.
        const morphFinished = await morphText(
          currentPhrase,
          nextPhrase
        );

        if (!morphFinished || cancelledRef.current) {
          return;
        }

        // Advance only after the morph is 100% complete.
        currentIndexRef.current = nextIndex;

        // Only the LAST phrase gets a visible/hidden pause.
        if (nextIndex === safePhrases.length - 1) {
          setDisplayText(nextPhrase);
          setIsVisible(true);

          // FINAL ENGLISH: visible for 3 seconds.
          const visibleFinished =
            await wait(VISIBLE_DURATION);

          if (!visibleFinished || cancelledRef.current) {
            return;
          }

          // Hide completely for 1 second.
          setIsVisible(false);

          const hiddenFinished =
            await wait(HIDDEN_DURATION);

          if (!hiddenFinished || cancelledRef.current) {
            return;
          }

          // Move ONLY while hidden. Never use the same
          // position as the previous cycle.
          const newPosition = getNewPosition();
          positionRef.current = newPosition;
          setPositionClass(newPosition);

          // FINAL ENGLISH -> FIRST ENGLISH immediately.
          // No extra delay after changing position.
          const firstPhrase = safePhrases[0];

          setDisplayText(nextPhrase);
          setIsVisible(true);

          const loopMorphFinished = await morphText(
            nextPhrase,
            firstPhrase
          );

          if (!loopMorphFinished || cancelledRef.current) {
            return;
          }

          setDisplayText(firstPhrase);
          currentIndexRef.current = 0;

          // Continue immediately: First English -> Japanese
          // -> Arabic -> Hindi -> German -> Dubai English...
        }
      }
    };

    runSequence();

    // -----------------------------------------
    // CLEANUP
    // -----------------------------------------

    return () => {
      cancelledRef.current = true;

      if (frameRef.current !== null) {
        cancelAnimationFrame(
          frameRef.current
        );

        frameRef.current = null;
      }

      timeoutRefs.current.forEach(
        clearTimeout
      );

      timeoutRefs.current.clear();
    };
  }, [phrasesKey]);

  return (
    <div
      className={cn(
        'w-full min-h-[200px] sm:min-h-[260px]',
        'flex p-4 sm:p-8',
        'transition-all duration-300',
        positionClass
      )}
    >
      <div
        className={cn(
          'relative inline-block',
          'whitespace-pre-wrap',
          'will-change-transform',
          'transition-opacity duration-300 ease-in-out',
          isVisible
            ? 'opacity-100'
            : 'opacity-0',
          className
        )}
        aria-live="polite"
      >
        <span className="inline-block">
          {displayText}
        </span>
      </div>
    </div>
  );
}