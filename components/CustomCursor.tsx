"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/animations";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Mouse coordinate refs
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports hover/fine pointer (touch devices don't)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches || reducedMotion) {
      return;
    }

    // Add active class to HTML to hide default cursor
    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Dynamic hover bindings for links, buttons, and items with hover interactions
    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .project-card, .skills-card"
      );
      targets.forEach((target) => {
        target.addEventListener("mouseenter", () => setIsHovered(true));
        target.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    // Observe changes to the DOM to bind hover events to dynamically rendered content
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial binding
    addHoverListeners();

    // Lerp loop for trailing ring
    const render = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring && isVisible) {
        // Direct positioning for the dot
        dot.style.transform = `translate3d(calc(${mousePos.current.x}px - 50%), calc(${mousePos.current.y}px - 50%), 0)`;

        // Lerp positioning for the outer trailing ring (lag effect)
        const lerpFactor = 0.15;
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;
        
        ring.style.transform = `translate3d(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%), 0)`;
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isVisible, reducedMotion]);

  // If mobile or reduced motion is active, do not render custom cursor markup
  if (reducedMotion) return <div aria-hidden="true" style={{ display: 'none' }} />;

  return (
    <div aria-hidden="true" className="pointer-events-none z-[99999]">
      {/* Inner dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "scale-50 opacity-50" : "scale-100"}`}
        style={{ willChange: "transform", transform: "translate3d(-50%, -50%, 0)" }}
      />
      {/* Outer lagging ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none transition-all duration-200 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "scale-150 bg-accent/10 border-accent" : "scale-100"} ${
          isClicking ? "scale-75 bg-accent/30" : ""
        }`}
        style={{ willChange: "transform", transform: "translate3d(-50%, -50%, 0)" }}
      />
    </div>
  );
}
