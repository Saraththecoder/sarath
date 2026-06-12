"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force reset scroll on load/reload
    window.scrollTo(0, 0);
    
    // Multiple fallback timeouts to ensure browser handles it after DOM completes
    const t1 = setTimeout(() => window.scrollTo(0, 0), 50);
    const t2 = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 150);
    const t3 = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 500);

    // Trigger ScrollTrigger refresh to ensure calculations are correct
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
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
