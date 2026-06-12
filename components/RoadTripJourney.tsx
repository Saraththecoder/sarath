"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { 
  Trophy, 
  Terminal, 
  Users, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Layers
} from "lucide-react";

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
  percentage: number; // position along path (0 to 1)
  triggerProgress: number; // target scroll progress
  highlights: string[];
}

const MILESTONES_DATA: Milestone[] = [
  {
    id: "oss",
    title: "Open Source Contributor",
    date: "2025 - Pres.",
    org: "GSSoC & SSC",
    description: "Contributed to open-source codebases, merging pull requests across frontend and Python ecosystems.",
    icon: <Sparkles className="w-4 h-4" />,
    color: "#A855F7", // Purple
    glowColor: "rgba(192, 132, 252, 0.4)",
    layoutSide: "left",
    percentage: 0.20,
    triggerProgress: 0.28,
    highlights: [
      "Merged 15+ pull requests",
      "GirlScript Summer of Code contributor",
      "Optimized React component rendering"
    ]
  },
  {
    id: "police",
    title: "AP Police AI Hackathon Finalist",
    date: "Jan 2026",
    org: "AP Police Department",
    description: "Built FraudShield AI, an advanced graph-network fraud detection platform presented directly to Cybercrime Officials.",
    icon: <Terminal className="w-4 h-4" />,
    color: "#3B82F6", // Electric Blue
    glowColor: "rgba(96, 165, 250, 0.4)",
    layoutSide: "right",
    percentage: 0.50,
    triggerProgress: 0.55,
    highlights: [
      "Top 10 Finalist nationally",
      "Designed fraud relation graphs using D3.js",
      "Presented prototype to DIG Cybercrime"
    ]
  },
  {
    id: "ideathon",
    title: "Women Ideathon 1.0 Finalist",
    date: "Mar 2026",
    org: "CBIT / SHE Leads",
    description: "Selected as a National Finalist among 606 participating teams for our generative AI healthcare solution.",
    icon: <Trophy className="w-4 h-4" />,
    color: "#FBBF24", // Gold/Amber
    glowColor: "rgba(245, 158, 11, 0.4)",
    layoutSide: "left",
    percentage: 0.77,
    triggerProgress: 0.79,
    highlights: [
      "Outranked 590+ teams nationwide",
      "Designed AI health symptom analyzer",
      "Validated prototype with medical experts"
    ]
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
    percentage: 1.0,
    triggerProgress: 0.97,
    highlights: [
      "Organized dev bootcamps for 200+ students",
      "Conducted web performance seminars",
      "Hosted official Google Cloud study jams"
    ]
  },
];

// Winding SVG path across 1200x600 viewBox
const roadPathD = "M 100,540 C 350,510 650,470 600,390 C 550,310 200,250 300,170 C 400,90 800,110 1100,50";

export default function RoadTripJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const mountain1Ref = useRef<SVGSVGElement>(null);
  const mountain2Ref = useRef<SVGSVGElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollTriggerRef = useRef<any>(null);
  const autoplayTweenRef = useRef<gsap.core.Tween | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const [checkpointPoints, setCheckpointPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(() => [
    `[SYSTEM] Navigation systems active. Engine diagnostics: nominal.`,
    `[SYSTEM] Planned highway route: 2025 Open Source -> 2026 Hackathons -> Google Student Ambassador.`,
    `[SYSTEM] Cockpit ready. Scroll manually or click PLAY SIMULATION below.`
  ]);
  const isFirstRender = useRef(true);

  const addLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [...prev, `${timestamp} - ${message}`].slice(-30));
  }, []);

  const pauseAutoplay = useCallback(() => {
    if (autoplayTweenRef.current) {
      autoplayTweenRef.current.kill();
    }
    setIsPlaying(false);
    addLog("SYS: Simulation PAUSED. Handing over steer to operator.");
  }, [addLog]);

  const startAutoplay = useCallback(() => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    setIsPlaying(true);
    addLog("SYS: Autoplay simulation ENGAGED. Velocity cruise active.");

    const start = trigger.start;
    const end = trigger.end;
    const currentScroll = window.scrollY;

    const startFrom = currentScroll >= end - 20 ? start : currentScroll;
    if (currentScroll >= end - 20) {
      window.scrollTo(0, start);
    }

    const remainingRatio = 1 - (startFrom - start) / (end - start);
    const duration = 20 * remainingRatio; // 20s for full scroll

    const obj = { y: startFrom };
    autoplayTweenRef.current = gsap.to(obj, {
      y: end,
      duration: duration,
      ease: "none",
      onUpdate: () => {
        window.scrollTo(0, obj.y);
      },
      onComplete: () => {
        setIsPlaying(false);
        addLog("SYS: Route simulation completed. Destination reached.");
      }
    });
  }, [addLog]);

  // Autoplay simulation listeners to cancel on manual interactions
  useEffect(() => {
    if (!isPlaying) return;

    const stopPlaying = () => {
      pauseAutoplay();
    };

    window.addEventListener("wheel", stopPlaying, { passive: true });
    window.addEventListener("touchmove", stopPlaying, { passive: true });
    window.addEventListener("pointerdown", stopPlaying, { passive: true });

    return () => {
      window.removeEventListener("wheel", stopPlaying);
      window.removeEventListener("touchmove", stopPlaying);
      window.removeEventListener("pointerdown", stopPlaying);
    };
  }, [isPlaying, pauseAutoplay]);

  const toggleAutoplay = () => {
    if (isPlaying) {
      pauseAutoplay();
    } else {
      startAutoplay();
    }
  };

  // Mobile viewport detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll telemetry log console
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Compute exact coordinates of checkpoints on the SVG road path in viewBox coordinates
  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const totalLength = path.getTotalLength();
      const coords = MILESTONES_DATA.map((milestone) => {
        const pt = path.getPointAtLength(milestone.percentage * totalLength);
        return {
          x: pt.x,
          y: pt.y,
        };
      });
      setCheckpointPoints(coords);
    }
  }, []);

  // Log checkpoints cleared
  const prevActiveIdxRef = useRef(-1);
  useEffect(() => {
    if (activeIdx === -1) {
      if (prevActiveIdxRef.current !== -1) {
        addLog("SYSTEM: Vehicle in transit between coordinates.");
      }
      prevActiveIdxRef.current = -1;
      return;
    }

    if (activeIdx !== prevActiveIdxRef.current) {
      const milestone = MILESTONES_DATA[activeIdx];
      addLog(`NAV: Entering Checkpoint ${activeIdx + 1} // ${milestone.title.toUpperCase()}`);
      addLog(`NET: Nodes established at ${milestone.org.toUpperCase()}`);
      addLog(`DATA: "${milestone.description.substring(0, 48)}..."`);
      prevActiveIdxRef.current = activeIdx;
    }
  }, [activeIdx, addLog]);

  // GSAP scroll animation trigger and path animations
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
          end: "+=120%",
          scrub: 0.5,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);
            
            // Map scroll progress boundaries to active checkpoints
            let currentActive = -1;
            if (progress >= 0.12 && progress < 0.40) currentActive = 0;
            else if (progress >= 0.40 && progress < 0.68) currentActive = 1;
            else if (progress >= 0.68 && progress < 0.88) currentActive = 2;
            else if (progress >= 0.88) currentActive = 3;
            
            setActiveIdx(currentActive);

            // Compute current velocity in pixels per second and convert to km/h
            const vel = self.getVelocity();
            const kmh = Math.min(Math.round(Math.abs(vel) * 0.05), 180);
            setSpeed(kmh);
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger;

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

      // Parallax mountain shifting inside the pinned timeline
      if (mountain1El) {
        tl.to(mountain1El, {
          y: -80,
          ease: "none",
          duration: totalDuration,
        }, 0);
      }

      if (mountain2El) {
        tl.to(mountain2El, {
          y: -40,
          ease: "none",
          duration: totalDuration,
        }, 0);
      }
    }, containerEl);

    return () => ctx.revert();
  }, []);



  // Jump smoothly to a specific milestone
  const handleJumpToMilestone = (idx: number) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    pauseAutoplay();
    const milestone = MILESTONES_DATA[idx];
    addLog(`SYS: Initiating warp drive to checkpoint ${idx + 1}: ${milestone.title.toUpperCase()}`);

    const start = trigger.start;
    const end = trigger.end;
    const targetProgress = milestone.triggerProgress;
    const targetScroll = start + targetProgress * (end - start);

    const obj = { y: window.scrollY };
    gsap.to(obj, {
      y: targetScroll,
      duration: 1.5,
      ease: "power3.out",
      onUpdate: () => {
        window.scrollTo(0, obj.y);
      },
      onComplete: () => {
        addLog(`SYS: Warp drive complete. Holding position at Checkpoint ${idx + 1}.`);
      }
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#08080a] text-zinc-100 z-10 select-none border-t border-[#1e1e24] overflow-hidden"
    >
      {/* Floating Particles in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array(20).fill(null).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-5 animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
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
        <path d="M 0,550 Q 250,500 500,570 Q 750,610 1000,530 L 1000,1200 L 0,1200 Z" fill="#1e1e24" />
      </svg>
      <svg
        ref={mountain2Ref}
        className="absolute inset-0 w-full h-[120%] pointer-events-none z-0 opacity-20"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path d="M 0,680 Q 300,730 600,660 Q 850,620 1000,700 L 1000,1200 L 0,1200 Z" fill="#121217" />
      </svg>

      {/* Viewport content */}
      <div className="relative h-full w-full flex flex-col justify-between overflow-hidden py-4 px-6 md:py-6 md:px-12 z-10">
        
        {/* Dashboard Top Header */}
        <div className="w-full flex items-center justify-between border-b border-[#1e1e24] pb-4 z-20">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm tracking-widest text-[#E50914] font-bold">04 //</span>
            <h2 className="font-syne font-extrabold text-lg md:text-xl uppercase tracking-tight text-white">
              AUTOMATED TIMEWAY
            </h2>
          </div>

          <div className="flex items-center gap-6 font-mono text-[10px] text-zinc-500 uppercase">
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>COCKPIT ACTIVE</span>
            </div>
            <div className="hidden md:block">
              <span>SECTOR: </span>
              <span className="text-white font-bold">{activeIdx !== -1 ? `${activeIdx + 1} / ${MILESTONES_DATA.length}` : "FREE HIGHWAY"}</span>
            </div>
            <div>
              <span>PROGRESS: </span>
              <span className="text-white font-bold">{Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Dashboard Main Console Panel */}
        <div className="flex-grow w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center py-2 lg:py-4 overflow-hidden">
          
          {/* LEFT: Mission Control & Telemetry Panel (5 cols) */}
          {!isMobile ? (
            <div className="lg:col-span-5 flex flex-col gap-3 lg:gap-4 h-full max-h-[60vh] justify-between z-20">
              
              {/* Telemetry Details Card */}
              <div className="flex-grow flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="p-4 border bg-[#0d0d10]/95 backdrop-blur-md flex flex-col gap-3"
                    style={{
                      borderColor: activeIdx !== -1 ? MILESTONES_DATA[activeIdx].color : "#1e1e24",
                      boxShadow: activeIdx !== -1 ? `0 0 20px ${MILESTONES_DATA[activeIdx].glowColor}` : "none",
                    }}
                  >
                    {activeIdx === -1 ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/30 px-2 py-0.5 font-bold">
                            WAITING
                          </span>
                          <Layers className="w-5 h-5 text-zinc-500 animate-pulse" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <h4 className="font-syne font-extrabold text-white text-base uppercase tracking-tight leading-tight">
                            ROUTE INITIALIZED
                          </h4>
                          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">
                            READY TO DRIVE
                          </span>
                        </div>
                        <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wide leading-relaxed border-t border-[#1e1e24]/60 pt-3">
                          WELCOME TO THE SIMULATOR. SCROLL DOWN TO MANUALLY LAUNCH OR PRESS PLAY BELOW TO START AUTOPILOT ON THE TIMELINE HIGHWAY.
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 font-semibold">
                            {MILESTONES_DATA[activeIdx].date}
                          </span>
                          <div 
                            className="w-7 h-7 flex items-center justify-center text-white border transition-colors duration-300"
                            style={{ 
                              borderColor: MILESTONES_DATA[activeIdx].color,
                              backgroundColor: `${MILESTONES_DATA[activeIdx].color}20` 
                            }}
                          >
                            {MILESTONES_DATA[activeIdx].icon}
                          </div>
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <h4 className="font-syne font-extrabold text-white text-base uppercase tracking-tight leading-tight">
                            {MILESTONES_DATA[activeIdx].title}
                          </h4>
                          <span className="font-mono text-[9px] uppercase tracking-wider font-bold" style={{ color: MILESTONES_DATA[activeIdx].color }}>
                            {MILESTONES_DATA[activeIdx].org}
                          </span>
                        </div>

                        <p className="font-mono text-[10px] text-zinc-300 uppercase tracking-wide leading-relaxed border-y border-[#1e1e24]/60 py-2">
                          {MILESTONES_DATA[activeIdx].description}
                        </p>

                        <div className="flex flex-col gap-1.5">
                          <span className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-wider">KEY DELIVERABLES:</span>
                          <ul className="flex flex-col gap-1">
                            {MILESTONES_DATA[activeIdx].highlights.map((highlight, index) => (
                              <li key={index} className="font-mono text-[9px] text-zinc-400 uppercase flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-[#E50914]" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Instrumentation Widget Grid (Speedometer & Coordinates) */}
              <div className="grid grid-cols-2 gap-3">
                {/* Speedometer */}
                <div className="border border-[#1e1e24] bg-[#0d0d10]/80 p-2.5 flex flex-col justify-between">
                  <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase">CRUISE VELOCITY</span>
                  <div className="flex items-baseline gap-1.5 mt-1.5">
                    <span className="font-mono text-2xl font-extrabold text-white tracking-tight">
                      {String(speed).padStart(3, "0")}
                    </span>
                    <span className="font-mono text-[8px] text-[#E50914] font-bold">KM/H</span>
                  </div>
                  <div className="w-full h-1 bg-[#1e1e24] mt-1.5 relative overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#E50914] to-yellow-500 transition-all duration-300"
                      style={{ width: `${(speed / 180) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Navigation Coordinates */}
                <div className="border border-[#1e1e24] bg-[#0d0d10]/80 p-2.5 flex flex-col justify-between">
                  <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase">NAV COORDINATES</span>
                  <div className="flex flex-col mt-1.5 font-mono text-[9px] text-zinc-400 uppercase">
                    <div className="flex justify-between">
                      <span>POS X:</span>
                      <span className="text-white font-bold">{(scrollProgress * 1200).toFixed(0)}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span>POS Y:</span>
                      <span className="text-white font-bold">{(scrollProgress * 600).toFixed(0)}m</span>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-[#1e1e24] mt-1.5 relative">
                    <div 
                      className="h-full bg-[#E50914]"
                      style={{ width: `${scrollProgress * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Telemetry Console Log */}
              <div className="flex flex-col border border-[#1e1e24] bg-[#070709] rounded-none overflow-hidden h-24">
                <div className="bg-[#121217] border-b border-[#1e1e24] px-4 py-1.5 flex items-center justify-between text-[8px] text-zinc-500 font-mono">
                  <span>TELEMETRY CONSOLE STREAM</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="p-3 font-mono text-[8px] text-zinc-400 overflow-y-auto flex flex-col gap-1 h-24 select-text">
                  {logs.map((log, i) => (
                    <div key={i} className="leading-relaxed">
                      <span className="text-[#E50914] mr-1">&gt;</span>
                      {log}
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              </div>

            </div>
          ) : null}

          {/* RIGHT: Visual Highway Simulator (7 cols) */}
          <div className="col-span-1 lg:col-span-7 h-full w-full flex items-center justify-center relative min-h-[350px] lg:min-h-0 z-10">
            <div className="w-full h-full border border-[#1e1e24] bg-[#0a0a0d] backdrop-blur-md relative overflow-hidden flex items-center justify-center p-4">
              
              {/* Simulator Grid overlay */}
              <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

              {/* Main Highway SVG */}
              <svg
                className="w-full h-full z-10 overflow-visible max-h-[42vh] lg:max-h-[52vh]"
                viewBox="0 0 1200 600"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Ambient road lighting gradient */}
                  <linearGradient id="road-glow-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
                    <stop offset="33%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="66%" stopColor="#FBBF24" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#84CC16" stopOpacity="0.8" />
                  </linearGradient>

                  {/* Volumetric Headlights beam */}
                  <linearGradient id="headlight-beam" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                    <stop offset="25%" stopColor="#ffffff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Road Asphalt Shadow Base */}
                <path
                  d={roadPathD}
                  fill="none"
                  stroke="#16161c"
                  strokeWidth="52"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Main Asphalt Road Surface */}
                <path
                  ref={pathRef}
                  d={roadPathD}
                  fill="none"
                  stroke="#0f0f13"
                  strokeWidth="44"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="border-r"
                />

                {/* Glowing Progressive Path (Car trajectory glow) */}
                <path
                  ref={progressPathRef}
                  d={roadPathD}
                  fill="none"
                  stroke="url(#road-glow-grad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* White Dashed Lane Markings */}
                <path
                  d={roadPathD}
                  fill="none"
                  stroke="#52525b"
                  strokeWidth="1.5"
                  strokeDasharray="8, 16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.6"
                />

                {/* Checkpoint Nodes Rendered EXACTLY within the SVG coordinates */}
                {checkpointPoints.map((pt, idx) => {
                  const milestone = MILESTONES_DATA[idx];
                  const isActive = activeIdx === idx;
                  
                  return (
                    <g 
                      key={milestone.id}
                      transform={`translate(${pt.x}, ${pt.y})`}
                      className="cursor-pointer group"
                      onClick={() => handleJumpToMilestone(idx)}
                    >
                      {/* Active radar rings */}
                      {isActive && (
                        <circle
                          r="30"
                          fill="none"
                          stroke={milestone.color}
                          strokeWidth="1.5"
                          opacity="0.4"
                          className="animate-ping"
                          style={{ transformOrigin: "0 0" }}
                        />
                      )}

                      {/* Hover / Active outer boundary glow */}
                      <circle
                        r={isActive ? "20" : "14"}
                        fill="none"
                        stroke={milestone.color}
                        strokeWidth={isActive ? "2.5" : "1.5"}
                        opacity={isActive ? "1" : "0.5"}
                        className="transition-all duration-300 group-hover:r-[20px] group-hover:opacity-100"
                        style={{
                          filter: isActive ? `drop-shadow(0 0 8px ${milestone.color})` : "none"
                        }}
                      />

                      {/* Inner center core dot */}
                      <circle
                        r={isActive ? "10" : "6"}
                        fill={isActive ? milestone.color : "#0f0f13"}
                        stroke={milestone.color}
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />

                      {/* Milestone Number Label (Displayed on Node) */}
                      <text
                        y="3.5"
                        textAnchor="middle"
                        fill={isActive ? "#050816" : milestone.color}
                        fontSize="9px"
                        fontWeight="extrabold"
                        className="pointer-events-none select-none font-mono"
                      >
                        {idx + 1}
                      </text>

                      {/* Tooltip Label Hover Effect */}
                      <text
                        y="-26"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="9px"
                        fontWeight="bold"
                        className="pointer-events-none select-none font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 uppercase bg-black"
                      >
                        {milestone.date}
                      </text>
                    </g>
                  );
                })}

                {/* Sports Car Vehicle Group */}
                <g ref={carRef} style={{ transformOrigin: "50% 50%" }}>
                  {/* Vehicle Shadow */}
                  <ellipse cx="0" cy="0" rx="16" ry="26" fill="rgba(0,0,0,0.85)" filter="blur(4px)" />

                  {/* Volumetric Headlights cone (Right Side facing) */}
                  <polygon points="22,-8 140,-36 140,36 22,8" fill="url(#headlight-beam)" pointerEvents="none" />

                  {/* Red Tail Brake Lights glows (Left Side facing) */}
                  <polygon points="-24,-6 -60,-15 -60,2 -24,-6" fill="rgba(229, 9, 20, 0.15)" filter="blur(2px)" />
                  <polygon points="-24,6 -60,-2 -60,15 -24,6" fill="rgba(229, 9, 20, 0.15)" filter="blur(2px)" />

                  {/* Tail light points */}
                  <circle cx="-24" cy="-5" r="2.5" fill="#E50914" />
                  <circle cx="-24" cy="5" r="2.5" fill="#E50914" />

                  {/* Sports Car Body chassis */}
                  <path
                    d="M -24,-10 C -24,-13 -20,-14 -14,-14 L 16,-14 C 20,-14 24,-12 24,-7 L 26,0 L 24,7 C 24,12 20,14 16,14 L -14,14 C -20,14 -24,13 -24,10 Z"
                    fill="#111116"
                    stroke="#E50914"
                    strokeWidth="2"
                  />

                  {/* Windshield canopy */}
                  <path d="M 6,-8 C 10,-8 12,-5 12,0 C 12,5 10,8 6,8 L 3,7 L 3,-7 Z" fill="#1f1f2a" stroke="#E50914" strokeWidth="0.5" />
                  <path d="M -10,-7 L -10,7 L -16,6 C -17,6 -18,4 -18,0 C -18,-4 -17,-6 -16,-6 Z" fill="#1f1f2a" />
                </g>
              </svg>

              {/* Watermark in bottom corner */}
              <span className="absolute bottom-4 right-4 font-mono text-[8px] text-zinc-700 tracking-widest uppercase">
                LATENCY ACC: 0.04 MS // SIM VER 4.2
              </span>
            </div>
          </div>

        </div>

        {/* Dashboard Bottom Controls Bar */}
        <div className="w-full border-t border-[#1e1e24] pt-4 flex flex-col md:flex-row items-center justify-between gap-4 z-20">
          
          {/* Simulation Autoplay Console Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleAutoplay}
              className={`flex items-center gap-2 px-5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 rounded-none border ${
                isPlaying 
                  ? "bg-amber-500 border-amber-500 text-black font-extrabold"
                  : "bg-[#E50914] border-[#E50914] text-white font-bold hover:bg-[#ff1e27] hover:border-[#ff1e27]"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>PAUSE SIMULATION</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>PLAY SIMULATION</span>
                </>
              )}
            </button>

            {scrollProgress > 0.05 && (
              <button
                onClick={() => {
                  pauseAutoplay();
                  window.scrollTo({
                    top: scrollTriggerRef.current?.start || 0,
                    behavior: "smooth"
                  });
                  addLog("SYS: Resetting simulation coordinates to 0.0m.");
                }}
                className="flex items-center justify-center p-2.5 border border-[#1e1e24] hover:bg-zinc-800 hover:text-white transition-colors"
                title="Reset Simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Shortcut Timeline Markers */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[9px] text-zinc-500 uppercase mr-2 hidden sm:block">QUICK JUMPS:</span>
            {MILESTONES_DATA.map((milestone, idx) => (
              <button
                key={milestone.id}
                onClick={() => handleJumpToMilestone(idx)}
                className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider border transition-all duration-300 rounded-none ${
                  activeIdx === idx
                    ? "bg-white text-black font-extrabold"
                    : "border-[#1e1e24] bg-[#0d0d10] text-zinc-400 hover:border-zinc-600 hover:text-white"
                }`}
                style={{
                  borderColor: activeIdx === idx ? milestone.color : "#1e1e24"
                }}
              >
                {milestone.date.replace(" - Pres.", "")}
              </button>
            ))}
          </div>

        </div>

        {/* Mobile Overlay Milestone details overlay */}
        {isMobile && activeIdx !== -1 && (
          <div className="absolute bottom-24 inset-x-6 z-30 pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="p-4 border bg-[#0d0d10]/95 backdrop-blur-md flex flex-col gap-2"
                style={{
                  borderColor: MILESTONES_DATA[activeIdx].color,
                  boxShadow: `0 0 16px ${MILESTONES_DATA[activeIdx].glowColor}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 font-semibold">
                    {MILESTONES_DATA[activeIdx].date}
                  </span>
                  
                  <div 
                    className="w-6 h-6 flex items-center justify-center text-white border"
                    style={{ 
                      borderColor: MILESTONES_DATA[activeIdx].color,
                      backgroundColor: `${MILESTONES_DATA[activeIdx].color}20` 
                    }}
                  >
                    {MILESTONES_DATA[activeIdx].icon}
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  <h4 className="font-syne font-extrabold text-white text-xs uppercase tracking-tight leading-tight">
                    {MILESTONES_DATA[activeIdx].title}
                  </h4>
                  <span className="font-mono text-[8px] uppercase tracking-wider font-bold" style={{ color: MILESTONES_DATA[activeIdx].color }}>
                    {MILESTONES_DATA[activeIdx].org}
                  </span>
                </div>

                <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-wide leading-relaxed border-t border-[#1e1e24]/40 pt-1.5 mt-1">
                  {MILESTONES_DATA[activeIdx].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
