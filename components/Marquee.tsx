"use client";

import React from "react";

const MARQUEE_ITEMS = [
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "PYTHON",
  "FIGMA",
  "FIREBASE",
  "FRAMER MOTION",
  "GSAP",
  "TAILWIND",
  "OPEN SOURCE",
];

export default function Marquee() {
  // Repeating the items several times ensures there is enough content to fill the screen and loop seamlessly
  const repeatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="w-full overflow-hidden bg-accent py-4 md:py-6 border-y border-borderDark flex items-center select-none z-10 relative">
      <div className="flex whitespace-nowrap animate-marquee-loop">
        {repeatedItems.map((item, idx) => (
          <span
            key={idx}
            className="font-syne font-extrabold text-background text-xl md:text-3xl tracking-tight mx-4 flex items-center gap-8"
          >
            {item}
            <span className="text-background/40 font-mono text-base md:text-xl">&bull;</span>
          </span>
        ))}
      </div>

      <style jsx global>{`
        .animate-marquee-loop {
          display: flex;
          width: max-content;
          animation: marqueeScroll 25s linear infinite;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            // Translates by exactly half of the duplicated list width to achieve a perfect seamless loop
            transform: translate3d(-50%, 0, 0);
          }
        }

        /* Speed up marquee slightly on scroll if browser supports custom interactions */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-loop {
            animation-duration: 60s;
          }
        }
      `}</style>
    </div>
  );
}
