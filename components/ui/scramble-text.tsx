"use client";

import { ComponentProps, useEffect, useRef, createContext, useContext } from "react";
import { useInView } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export const ScrambleContext = createContext<boolean | undefined>(undefined);

type ScrambleTextProps = {
  random?: boolean;
} & ComponentProps<"span">;

const defaultChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const ScrambleText = ({
  random = true,
  ...props
}: ScrambleTextProps) => {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const isInViewInternal = useInView(wrapperRef, { once: true, margin: "-10%" });
  const contextTrigger = useContext(ScrambleContext);
  
  const shouldTrigger = contextTrigger !== undefined ? contextTrigger : isInViewInternal;

  const { contextSafe } = useGSAP();

  const scramble = contextSafe(() => {
    const target = wrapperRef.current;
    if (gsap.isTweening(target) || !target) return;
    gsap.to(target, {
      duration: 1,
      ease: "sine.in",
      scrambleText: {
        text: target.innerText,
        speed: 2,
        chars: random ? defaultChars : target.innerText.replace(/\s/g, ""),
      },
    });
  });

  useEffect(() => {
    if (shouldTrigger) {
      scramble();
    }
  }, [shouldTrigger, scramble]);

  return <span {...props} ref={wrapperRef} />;
};

export default ScrambleText;
