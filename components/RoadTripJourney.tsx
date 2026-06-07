"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Trophy, Terminal, Users, Sparkles, Navigation } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

interface Milestone {
  id: string;
  title: string;
  date: string;
  org: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  layoutSide: "left" | "right";
}

const MILESTONES_DATA: Milestone[] = [
  {
    id: "ideathon",
    title: "Women Ideathon 1.0 Finalist",
    date: "Mar 2026",
    org: "CBIT / SHE Leads",
    description: "Selected as a National Finalist among 606 participating teams for our generative AI healthcare solution.",
    icon: <Trophy className="w-4 h-4" />,
    color: "#FBBF24", // Gold/Amber
    glowColor: "rgba(245, 158, 11, 0.4)",
    layoutSide: "right",
  },
  {
    id: "police",
    title: "AP Police AI Hackathon Finalist",
    date: "Jan 2026",
    org: "AP Police Department",
    description: "Built FraudShield AI, a graph-network fraud detection platform presented directly to cybercrime officials.",
    icon: <Terminal className="w-4 h-4" />,
    color: "#3B82F6", // Electric Blue
    glowColor: "rgba(96, 165, 250, 0.4)",
    layoutSide: "left",
  },
  {
    id: "ambassador",
    title: "Google Student Ambassador 2026",
    date: "2026",
    org: "Google Students",
    description: "Appointed to lead developer communities, organize workshops, and bridge academic learning with industry practices.",
    icon: <Users className="w-4 h-4" />,
    color: "#84CC16", // Lime Green
    glowColor: "rgba(163, 230, 53, 0.4)",
    layoutSide: "right",
  },
  {
    id: "oss",
    title: "Open Source Contributor",
    date: "2025 - Pres.",
    org: "GSSoC & SSC",
    description: "Contributed to open-source projects and merged impactful pull requests across frontend and Python ecosystems.",
    icon: <Sparkles className="w-4 h-4" />,
    color: "#A855F7", // Purple
    glowColor: "rgba(192, 132, 252, 0.4)",
    layoutSide: "left",
  },
  {
    id: "startup",
    title: "Startup Founder",
    date: "Future",
    org: "Tech Venture",
    description: "Building AI products that solve real-world problems at scale.",
    icon: <Navigation className="w-4 h-4" />,
    color: "#F97316", // Golden Orange
    glowColor: "rgba(249, 115, 22, 0.4)",
    layoutSide: "right",
  },
];

// Winding SVG path across 1000x1000 viewBox
const roadPathD = "M 150,950 C 350,900 650,820 580,680 C 500,520 200,450 300,320 C 400,180 720,150 850,80";
const milestonePercentages = [0.18, 0.44, 0.68, 0.88, 1.0]; // percentage positions along the SVG path

export default function RoadTripJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const mountain1Ref = useRef<SVGSVGElement>(null);
  const mountain2Ref = useRef<SVGSVGElement>(null);

  const [checkpointPoints, setCheckpointPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  // Handle mobile check and responsive sizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute exact coordinates of checkpoints on the SVG road path
  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const totalLength = path.getTotalLength();
      const coords = milestonePercentages.map((pct) => {
        const pt = path.getPointAtLength(pct * totalLength);
        return {
          x: (pt.x / 1000) * 100, // convert back to percentage coordinates
          y: (pt.y / 1000) * 100,
        };
      });
      setCheckpointPoints(coords);
    }
  }, []);

  // GSAP animations for car following path, road coloring, and parallax mountains
  useEffect(() => {
    const pathEl = pathRef.current;
    const carEl = carRef.current;
    const progressPathEl = progressPathRef.current;
    const containerEl = containerRef.current;
    const mountain1El = mountain1Ref.current;
    const mountain2El = mountain2Ref.current;

    if (typeof window === "undefined" || !containerEl || !pathEl || !carEl) return;

    const ctx = gsap.context(() => {
      const totalDuration = 10;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            let currentActive = -1;
            
            // Map scroll progress boundaries to active checkpoints
            if (progress >= 0.12 && progress < 0.38) currentActive = 0;
            else if (progress >= 0.38 && progress < 0.62) currentActive = 1;
            else if (progress >= 0.62 && progress < 0.82) currentActive = 2;
            else if (progress >= 0.82 && progress < 0.94) currentActive = 3;
            else if (progress >= 0.94) currentActive = 4;
            
            setActiveIdx(currentActive);
          },
        },
      });

      // Animate the car along the SVG path
      tl.to(carEl, {
        motionPath: {
          path: pathEl,
          align: pathEl,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        ease: "none",
        duration: totalDuration,
      }, 0);

      // Animate the progressive road lighting
      if (progressPathEl) {
        const length = progressPathEl.getTotalLength();
        gsap.set(progressPathEl, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        tl.to(progressPathEl, {
          strokeDashoffset: 0,
          ease: "none",
          duration: totalDuration,
        }, 0);
      }

      // Parallax mountain shifting
      if (mountain1El) {
        gsap.to(mountain1El, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: containerEl,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (mountain2El) {
        gsap.to(mountain2El, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: containerEl,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerEl);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-gradient-to-b from-[#050816] via-[#0B1020] to-[#101827] z-10 select-none">
      
      {/* Floating Particles in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array(20).fill(null).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20 animate-pulse"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Cinematic Parallax Mountains */}
      <svg
        ref={mountain1Ref}
        className="absolute inset-0 w-full h-[120%] pointer-events-none z-0 opacity-15"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path d="M 0,550 Q 250,500 500,570 Q 750,610 1000,530 L 1000,1200 L 0,1200 Z" fill="#030612" />
      </svg>
      <svg
        ref={mountain2Ref}
        className="absolute inset-0 w-full h-[120%] pointer-events-none z-0 opacity-25"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path d="M 0,680 Q 300,730 600,660 Q 850,620 1000,700 L 1000,1200 L 0,1200 Z" fill="#010309" />
      </svg>

      {/* Sticky viewport content */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Floating section heading */}
        <div className="absolute top-8 left-8 md:left-16 z-20 flex flex-col gap-1.5 pointer-events-none">
          <span className="font-mono text-[10px] tracking-widest text-[#94A3B8] uppercase">
            04 // AUTOMATED TIMELINE
          </span>
          <h2 className="font-syne font-extrabold text-3xl md:text-5xl text-white uppercase tracking-tight leading-none">
            BUILT UNDER PRESSURE
          </h2>
          <span className="font-mono text-[9px] text-accent uppercase tracking-widest mt-1">
            CINEMATIC ROAD-TRIP EXPERIENCE
          </span>
        </div>

        {/* Dashboard instrumentation widget (bottom-left) */}
        <div className="absolute bottom-8 left-8 md:left-16 z-20 hidden md:flex flex-col gap-2 font-mono text-[10px] text-[#94A3B8] border border-white/10 bg-[#0A0E1A]/85 backdrop-blur-md px-4 py-3 pointer-events-none uppercase">
          <div className="flex justify-between gap-6">
            <span>VEHICLE STATUS:</span>
            <span className="text-accent font-bold">CRUISING</span>
          </div>
          <div className="flex justify-between gap-6">
            <span>SYSTEM FOCUS:</span>
            <span className="text-white">INTERACTIVE JOURNEY</span>
          </div>
          <div className="flex justify-between gap-6">
            <span>CURRENT MILESTONE:</span>
            <span className="text-accent font-bold">
              {activeIdx !== -1 ? `${activeIdx + 1} / 5` : "READY"}
            </span>
          </div>
        </div>

        {/* Outer 3D Perspective container */}
        <div className="relative w-full max-w-[1200px] h-[80vh] flex items-center justify-center">
          
          {/* Main SVG Container representing the board/highway grid */}
          <svg
            className="absolute inset-0 w-full h-full z-10 overflow-visible"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Ambient gradients definitions */}
            <defs>
              <linearGradient id="road-glow-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#84CC16" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#A855F7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0.8" />
              </linearGradient>

              {/* Headlight volumetric cone */}
              <linearGradient id="headlight-beam" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                <stop offset="20%" stopColor="#FBBF24" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* 1. Underlying road asphalt base */}
            <path
              d={roadPathD}
              fill="none"
              stroke="#1E293B"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
            />
            
            {/* 2. Main road surface */}
            <path
              ref={pathRef}
              d={roadPathD}
              fill="none"
              stroke="#080C16"
              strokeWidth="42"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 3. Glowing road progress path (draws behind the car) */}
            <path
              ref={progressPathRef}
              d={roadPathD}
              fill="none"
              stroke="url(#road-glow-grad)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 4. Dashed lane markings */}
            <path
              d={roadPathD}
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1.5"
              strokeDasharray="6, 18"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.45"
            />

            {/* 5. Sleek sports car group */}
            <g ref={carRef} style={{ transformOrigin: "50% 50%" }}>
              {/* Soft reflection shadow */}
              <ellipse cx="0" cy="0" rx="14" ry="24" fill="rgba(0,0,0,0.6)" filter="blur(3px)" />

              {/* Volumetric Headlights beam casting forward (Right / +X direction) */}
              <polygon points="20,-6 110,-28 110,28 20,6" fill="url(#headlight-beam)" pointerEvents="none" />

              {/* Dynamic Brake Light glows casting backward (Left / -X direction) */}
              <polygon points="-22,-5 -50,-12 -50,1 -22,-5" fill="rgba(239, 68, 68, 0.2)" filter="blur(1px)" />
              <polygon points="-22,5 -50,-1 -50,12 -22,5" fill="rgba(239, 68, 68, 0.2)" filter="blur(1px)" />

              {/* Red tail bulb lights */}
              <circle cx="-22" cy="-5" r="2" fill="#EF4444" filter="blur(0.5px)" />
              <circle cx="-22" cy="5" r="2" fill="#EF4444" filter="blur(0.5px)" />

              {/* Sports car body chassis */}
              <path
                d="M -22,-9 C -22,-12 -18,-13 -12,-13 L 14,-13 C 18,-13 22,-11 22,-6 L 24,0 L 22,6 C 22,11 18,13 14,13 L -12,13 C -18,13 -22,12 -22,9 Z"
                fill="#111827"
                stroke="#E50914"
                strokeWidth="1.5"
              />

              {/* Aerodynamic windshield canopy */}
              <path d="M 5,-7 C 9,-7 11,-4 11,0 C 11,4 9,7 5,7 L 2,6 L 2,-6 Z" fill="#1F2937" />
              <path d="M -9,-6 L -9,6 L -14,5 C -15,5 -16,3 -16,0 C -16,-3 -15,-5 -14,-5 Z" fill="#1F2937" />
            </g>
          </svg>

          {/* Glowing Checkpoint nodes rendered on top of container coordinates */}
          {checkpointPoints.map((pt, idx) => {
            const milestone = MILESTONES_DATA[idx];
            const isActive = activeIdx === idx;
            
            return (
              <div
                key={milestone.id}
                className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300"
                style={{
                  left: `${pt.x}%`,
                  top: `${pt.y}%`,
                }}
              >
                {/* Volumetric outer pulsating rings */}
                <div
                  className="absolute rounded-full border opacity-40 transition-transform duration-700 ease-out"
                  style={{
                    width: isActive ? "34px" : "14px",
                    height: isActive ? "34px" : "14px",
                    borderColor: milestone.color,
                    boxShadow: isActive ? `0 0 16px ${milestone.color}` : "none",
                    animation: isActive ? "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" : "none",
                  }}
                />

                {/* Inner center core dot */}
                <div
                  className="rounded-full border transition-all duration-300 flex items-center justify-center bg-[#050816]"
                  style={{
                    width: isActive ? "18px" : "10px",
                    height: isActive ? "18px" : "10px",
                    borderColor: milestone.color,
                    backgroundColor: isActive ? milestone.color : "#050816",
                  }}
                >
                  {isActive && (
                    <span className="text-[#050816] font-bold text-[8px] flex items-center justify-center leading-none">
                      {idx + 1}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Desktop Milestone Cards: Alternating sides, pinned in place */}
          {!isMobile && checkpointPoints.map((pt, idx) => {
            const milestone = MILESTONES_DATA[idx];
            const isActive = activeIdx === idx;

            // Compute offsets so cards sit adjacent to points
            const cardWidth = 30; // percentage container width
            const leftOffset = milestone.layoutSide === "right" ? pt.x + 6 : pt.x - cardWidth - 6;
            const topOffset = pt.y - 12;

            return (
              <div
                key={milestone.id}
                className={`absolute z-30 transition-all duration-500 ease-out ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
                style={{
                  left: `${leftOffset}%`,
                  top: `${topOffset}%`,
                  width: `${cardWidth}%`,
                }}
              >
                {/* Premium glass card design */}
                <div
                  className="p-5 rounded-none border backdrop-blur-md bg-[#0A0E1A]/60 flex flex-col gap-3 transition-colors duration-300"
                  style={{
                    borderColor: isActive ? milestone.color : "rgba(255, 255, 255, 0.08)",
                    boxShadow: isActive ? `0 0 25px ${milestone.glowColor}` : "none",
                  }}
                >
                  {/* Card Header details */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#CBD5E1] bg-white/5 border border-white/10 px-2 py-0.5">
                      {milestone.date}
                    </span>
                    <div 
                      className="w-7 h-7 flex items-center justify-center text-white border transition-colors"
                      style={{ 
                        borderColor: milestone.color,
                        backgroundColor: `${milestone.color}20` 
                      }}
                    >
                      {milestone.icon}
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <h4 className="font-syne font-extrabold text-white text-sm md:text-base uppercase tracking-tight leading-tight">
                      {milestone.title}
                    </h4>
                    <span className="font-mono text-[9px] text-[#94A3B8] uppercase tracking-wider font-semibold">
                      {milestone.org}
                    </span>
                  </div>

                  <p className="font-mono text-[10px] text-[#CBD5E1] uppercase tracking-wide leading-relaxed border-t border-white/5 pt-2">
                    {milestone.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Fixed bottom-sheet card selector overlay */}
        {isMobile && (
          <div className="absolute bottom-6 inset-x-6 z-30 pointer-events-none">
            <AnimatePresence mode="wait">
              {activeIdx !== -1 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3 }}
                  className="w-full pointer-events-auto"
                >
                  {/* Glassmorphism bottom card */}
                  <div
                    className="p-5 rounded-none border backdrop-blur-md bg-[#0A0E1A]/85 flex flex-col gap-3"
                    style={{
                      borderColor: MILESTONES_DATA[activeIdx].color,
                      boxShadow: `0 0 20px ${MILESTONES_DATA[activeIdx].glowColor}`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#CBD5E1] bg-white/5 border border-white/10 px-2 py-0.5">
                        {MILESTONES_DATA[activeIdx].date}
                      </span>
                      
                      <div 
                        className="w-7 h-7 flex items-center justify-center text-white border"
                        style={{ 
                          borderColor: MILESTONES_DATA[activeIdx].color,
                          backgroundColor: `${MILESTONES_DATA[activeIdx].color}20` 
                        }}
                      >
                        {MILESTONES_DATA[activeIdx].icon}
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <h4 className="font-syne font-extrabold text-white text-sm uppercase tracking-tight leading-tight">
                        {MILESTONES_DATA[activeIdx].title}
                      </h4>
                      <span className="font-mono text-[9px] text-[#94A3B8] uppercase tracking-wider font-semibold">
                        {MILESTONES_DATA[activeIdx].org}
                      </span>
                    </div>

                    <p className="font-mono text-[10px] text-[#CBD5E1] uppercase tracking-wide leading-relaxed border-t border-white/5 pt-2">
                      {MILESTONES_DATA[activeIdx].description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
