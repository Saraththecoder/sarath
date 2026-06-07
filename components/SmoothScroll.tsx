"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Trigger ScrollTrigger refresh to ensure calculations are correct
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        lerp: 0.1,
        syncTouch: false,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
