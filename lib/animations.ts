/**
 * Shared animation configurations and motion utilities.
 */

import { useEffect, useState } from "react";

// Check if prefers-reduced-motion is enabled
export const isReducedMotionEnabled = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Custom React hook for checking prefers-reduced-motion
export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return reduced;
};

// Standard Framer Motion transitions for brutalist animations
export const transitionBrutal = {
  type: "spring",
  damping: 30,
  stiffness: 200,
  mass: 1,
};

export const transitionSlow = {
  duration: 0.8,
  ease: [0.76, 0, 0.24, 1], // Custom cubic-bezier for slick Awwwards feel
};

export const transitionFast = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],
};

// GSAP Standard Configurations
export const gsapEaseAwwwards = "power4.out";
export const gsapEaseIn = "power3.inOut";
export const gsapEaseMuted = "expo.out";
export const gsapDurationAwwwards = 1.2;
export const gsapDurationFast = 0.6;
