"use client";
import { useRef } from "react";
import { useInView as useFramerInView, UseInViewOptions } from "framer-motion";

export function useInView(options: UseInViewOptions = { once: true, margin: "-100px" }) {
  const ref = useRef<Element>(null);
  const inView = useFramerInView(ref, options);
  return { ref, inView };
}
