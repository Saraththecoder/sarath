"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "@/lib/data";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Magnetic Button Wrapper for the CTA elements
function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const magneticRadius = 80;

    if (distance < magneticRadius) {
      // Attract effect - move a fraction of the distance toward the cursor
      setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const title = card.querySelector(".project-title");
        const number = card.querySelector(".project-number");

        if (title) {
          gsap.fromTo(
            title,
            { x: -50, opacity: 0.2 },
            {
              x: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=50px",
                end: "top center+=100px",
                scrub: 1,
              },
            }
          );
        }

        if (number) {
          gsap.fromTo(
            number,
            { x: 50, opacity: 0 },
            {
              x: 0,
              opacity: 0.15,
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=50px",
                end: "top center+=100px",
                scrub: 1,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full py-24 px-6 md:px-16 border-t border-borderDark z-10 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-16">
          <span className="font-mono text-sm tracking-widest text-mutedGray">03 //</span>
          <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
            SELECTED WORK
          </span>
        </div>

        {/* Vertical Stacked Cards */}
        <div className="flex flex-col w-full divide-y divide-borderDark border-y border-borderDark">
          {projectsData.map((project, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="project-card relative w-full py-8 md:py-12 group cursor-pointer overflow-hidden transition-colors duration-300 hover:bg-cardBg/30"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Desktop layout wrapper */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-8 relative z-10">
                  
                  {/* Left Side: Number + Name */}
                  <div className="flex items-baseline gap-6 md:gap-12">
                    <span className="project-number font-syne font-extrabold text-4xl md:text-5xl text-stroke opacity-15 select-none transition-all duration-300 group-hover:text-stroke-accent group-hover:opacity-40">
                      {project.number}
                    </span>
                    <h3 className="project-title font-syne font-extrabold text-3xl md:text-6xl uppercase tracking-tight text-foreground select-none group-hover:text-accent transition-colors duration-300">
                      {project.name}
                    </h3>
                  </div>

                  {/* Right Side: CTA View Link */}
                  <div className="md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-end md:self-center">
                    <MagneticButton>
                      <a
                        href={project.link}
                        className="flex items-center justify-center w-12 h-12 rounded-full border border-borderDark bg-background hover:bg-accent hover:border-accent text-foreground hover:text-background transition-colors duration-300"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    </MagneticButton>
                  </div>
                </div>

                {/* Animated expandable content using Framer Motion */}
                <div className="px-4 md:px-8 pl-12 md:pl-28 max-w-3xl">
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: isHovered ? "auto" : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 flex flex-col gap-4">
                      {/* One liner description */}
                      <p className="font-mono text-xs md:text-sm text-mutedGray uppercase tracking-wider leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 font-mono text-[9px] uppercase tracking-widest bg-cardBg border border-borderDark text-accent font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
