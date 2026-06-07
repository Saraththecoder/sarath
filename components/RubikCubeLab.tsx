"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Zap, Layers, RefreshCw, Cpu, Play, Timer, TrendingUp } from "lucide-react";

type StructurePart = "cross" | "f2l" | "oll" | "pll";
type FaceName = "U" | "D" | "F" | "B" | "L" | "R";
type CubeState = Record<FaceName, string[]>;
type TimerState = "idle" | "inspection" | "ready" | "running" | "stopped";

// Speedcubing standard colors
const COLORS = {
  U: "#FFFFFF", // White
  D: "#FFD600", // Yellow
  F: "#E50914", // Red
  B: "#FF5F00", // Orange
  L: "#00E676", // Green
  R: "#0091EA", // Blue
};

// Initial state creator
const initialCubeState = (): CubeState => ({
  U: Array(9).fill(COLORS.U),
  D: Array(9).fill(COLORS.D),
  F: Array(9).fill(COLORS.F),
  B: Array(9).fill(COLORS.B),
  L: Array(9).fill(COLORS.L),
  R: Array(9).fill(COLORS.R),
});

// Helper: Rotate face clockwise
const rotateFaceClockwise = (face: string[]): string[] => {
  const next = [...face];
  next[0] = face[6];
  next[1] = face[3];
  next[2] = face[0];
  next[3] = face[7];
  // next[4] stays next[4]
  next[5] = face[1];
  next[6] = face[8];
  next[7] = face[5];
  next[8] = face[2];
  return next;
};

// Helper: Apply move to CubeState
const applyMove = (currentState: CubeState, move: string): CubeState => {
  const next: CubeState = {
    U: [...currentState.U],
    D: [...currentState.D],
    F: [...currentState.F],
    B: [...currentState.B],
    L: [...currentState.L],
    R: [...currentState.R],
  };

  const isPrime = move.endsWith("'");
  const baseMove = isPrime ? move.slice(0, -1) : move;
  const iterations = isPrime ? 3 : 1;

  for (let iter = 0; iter < iterations; iter++) {
    const temp = {
      U: [...next.U],
      D: [...next.D],
      F: [...next.F],
      B: [...next.B],
      L: [...next.L],
      R: [...next.R],
    };

    if (baseMove === "U") {
      next.U = rotateFaceClockwise(temp.U);
      next.F[0] = temp.R[0]; next.F[1] = temp.R[1]; next.F[2] = temp.R[2];
      next.L[0] = temp.F[0]; next.L[1] = temp.F[1]; next.L[2] = temp.F[2];
      next.B[0] = temp.L[0]; next.B[1] = temp.L[1]; next.B[2] = temp.L[2];
      next.R[0] = temp.B[0]; next.R[1] = temp.B[1]; next.R[2] = temp.B[2];
    } else if (baseMove === "D") {
      next.D = rotateFaceClockwise(temp.D);
      next.F[6] = temp.L[6]; next.F[7] = temp.L[7]; next.F[8] = temp.L[8];
      next.R[6] = temp.F[6]; next.R[7] = temp.F[7]; next.R[8] = temp.F[8];
      next.B[6] = temp.R[6]; next.B[7] = temp.R[7]; next.B[8] = temp.R[8];
      next.L[6] = temp.B[6]; next.L[7] = temp.B[7]; next.L[8] = temp.B[8];
    } else if (baseMove === "R") {
      next.R = rotateFaceClockwise(temp.R);
      next.U[2] = temp.F[2]; next.U[5] = temp.F[5]; next.U[8] = temp.F[8];
      next.B[6] = temp.U[2]; next.B[3] = temp.U[5]; next.B[0] = temp.U[8];
      next.D[2] = temp.B[6]; next.D[5] = temp.B[3]; next.D[8] = temp.B[0];
      next.F[2] = temp.D[2]; next.F[5] = temp.D[5]; next.F[8] = temp.D[8];
    } else if (baseMove === "L") {
      next.L = rotateFaceClockwise(temp.L);
      next.F[0] = temp.U[0]; next.F[3] = temp.U[3]; next.F[6] = temp.U[6];
      next.D[0] = temp.F[0]; next.D[3] = temp.F[3]; next.D[6] = temp.F[6];
      next.B[8] = temp.D[0]; next.B[5] = temp.D[3]; next.B[2] = temp.D[6];
      next.U[0] = temp.B[8]; next.U[3] = temp.B[5]; next.U[6] = temp.B[2];
    } else if (baseMove === "F") {
      next.F = rotateFaceClockwise(temp.F);
      next.R[0] = temp.U[6]; next.R[3] = temp.U[7]; next.R[6] = temp.U[8];
      next.D[0] = temp.R[6]; next.D[1] = temp.R[3]; next.D[2] = temp.R[0];
      next.L[2] = temp.D[0]; next.L[5] = temp.D[1]; next.L[8] = temp.D[2];
      next.U[6] = temp.L[8]; next.U[7] = temp.L[5]; next.U[8] = temp.L[2];
    } else if (baseMove === "B") {
      next.B = rotateFaceClockwise(temp.B);
      next.U[0] = temp.R[2]; next.U[1] = temp.R[5]; next.U[2] = temp.R[8];
      next.R[2] = temp.D[8]; next.R[5] = temp.D[7]; next.R[8] = temp.D[6];
      next.D[6] = temp.L[0]; next.D[7] = temp.L[3]; next.D[8] = temp.L[6];
      next.L[0] = temp.U[2]; next.L[3] = temp.U[1]; next.L[6] = temp.U[0];
    }
  }

  return next;
};

// Generate standard random scramble
const generateScramble = (): string => {
  const movesList = ["R", "L", "U", "D", "F", "R'", "L'", "U'", "D'", "F'"];
  const scramble: string[] = [];
  let lastMove = "";
  for (let i = 0; i < 15; i++) {
    let m = movesList[Math.floor(Math.random() * movesList.length)];
    while (m[0] === lastMove[0]) {
      m = movesList[Math.floor(Math.random() * movesList.length)];
    }
    scramble.push(m);
    lastMove = m;
  }
  return scramble.join(" ");
};

export default function RubikCubeLab() {
  // 3D Cube Rotation orientation
  const [rotX, setRotX] = useState(-25);
  const [rotY, setRotY] = useState(45);
  const [autoRotate, setAutoRotate] = useState(true);

  // Functional Cube state
  const [cubeState, setCubeState] = useState<CubeState>(initialCubeState());
  const [activeMove, setActiveMove] = useState<string | null>(null);

  // Algorithm player states
  const [isPlayingAlg, setIsPlayingAlg] = useState(false);
  const [currentMoveIdx, setCurrentMoveIdx] = useState(-1);
  const [algMoves, setAlgMoves] = useState<string[]>([]);
  
  // Solves Timer states
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [timerTime, setTimerTime] = useState(0);
  const [scramble, setScramble] = useState("");
  const [solves, setSolves] = useState<number[]>([]);
  const readyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active CFOP explanation tab
  const [activePart, setActivePart] = useState<StructurePart>("cross");

  // CFOP Tab details
  const structureDetails = {
    cross: {
      title: "Cross // Foundational Grid",
      icon: <Cpu className="w-4 h-4 text-accent" />,
      description: "ALIGN 4 EDGE PIECES ON THE BOTTOM FACE TO FORM A CROSS MATCHING ADJACENT CENTERS.",
      analogy: "CORE SETUP & CONFIGURATION (Next.js configurations, Tailwind tokens, directory structures, and database schemas). GIVES THE ENTIRE codebase AN ANCHORED REFERENCE MATRIX.",
      metrics: "Step 1 / 4 Edges / Solve Target: < 1.5s"
    },
    f2l: {
      title: "F2L // Component Pairing",
      icon: <Layers className="w-4 h-4 text-accent" />,
      description: "PAIR 4 CORNER-EDGE MODULES AND INSERT THEM SIMULTANEOUSLY INTO THE FIRST TWO LAYERS.",
      analogy: "VERTICAL FEATURE SLICING (pairing API endpoints directly with UI components, establishing unified state hooks). REPLACES SLOW LAYER-BY-LAYER CODE WITH INTEGRATED, MODULAR FEATURE PAIRS.",
      metrics: "Step 2 / 4 Pairs / Solve Target: < 6.0s"
    },
    oll: {
      title: "OLL // Performance Tuning",
      icon: <Zap className="w-4 h-4 text-accent" />,
      description: "ORIENT THE LAST LAYER STICKERS TO MAKE THE TOP FACE ONE SOLID COLOR (YELLOW).",
      analogy: "STANDARDS COMPLIANCE & CORE WEB VITALS (SEO tags, lighthouse audits, caching headers, performance bundle compression). MAKES THE INTERFACE EFFICIENT WITHOUT REARRANGING DATA SCHEMAS.",
      metrics: "Step 3 / 57 Algorithms / Solve Target: < 2.5s"
    },
    pll: {
      title: "PLL // Motion Polish",
      icon: <TrendingUp className="w-4 h-4 text-accent" />,
      description: "PERMUTE THE LAST LAYER PIECES TO CORRECT THEIR SIDES, SOLVING THE CUBE.",
      analogy: "MICRO-INTERACTIONS & MOTION DESIGN (GSAP, lenis configurations, framer-motion UI sweeps, custom hover effects). FINALIZES LAYOUT PLACEMENT FOR A PERFECT, SCALABLE SOLVED UX.",
      metrics: "Step 4 / 21 Algorithms / Solve Target: < 2.0s"
    }
  };

  // Preset speedcubing algorithms
  const algorithms = [
    { name: "T-Permutation (PLL Corner Swap)", seq: "R U R' U' R' F R2 U' R' U' R U R' F'" },
    { name: "Sune (OLL Corner Orientation)", seq: "R U R' U R U2 R'" },
    { name: "U-Permutation (PLL Edge Cycle)", seq: "R2 U R U R' U' R' U' R' U R'" },
    { name: "Sexy Trigger (Loop of 4 Moves)", seq: "R U R' U'" },
  ];

  // Scramble cube helper
  const handleScrambleCube = () => {
    const sStr = generateScramble();
    setScramble(sStr);
    const moves = sStr.split(" ");
    let temp = initialCubeState();
    moves.forEach((m) => {
      temp = applyMove(temp, m);
    });
    setCubeState(temp);
  };

  const handleResetCube = () => {
    setCubeState(initialCubeState());
    setActiveMove(null);
  };

  // Perform single move notation
  const triggerMove = useCallback((move: string) => {
    if (activeMove || isPlayingAlg) return;
    setActiveMove(move);
    setTimeout(() => {
      setCubeState((prev) => applyMove(prev, move));
      setActiveMove(null);
    }, 500);
  }, [activeMove, isPlayingAlg]);

  // Execute entire sequence of moves
  const playAlgorithm = async (movesString: string) => {
    if (activeMove || isPlayingAlg) return;
    setIsPlayingAlg(true);
    const parsedMoves = movesString.split(" ");
    setAlgMoves(parsedMoves);

    for (let i = 0; i < parsedMoves.length; i++) {
      const move = parsedMoves[i];
      setCurrentMoveIdx(i);
      setActiveMove(move);
      await new Promise((resolve) => setTimeout(resolve, 520));
      setCubeState((prev) => applyMove(prev, move));
      setActiveMove(null);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    setIsPlayingAlg(false);
    setCurrentMoveIdx(-1);
    setAlgMoves([]);
  };

  // Auto rotate trigger
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotY((prev) => (prev + 1) % 360);
    }, 45);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Scramble initialization
  useEffect(() => {
    setScramble(generateScramble());
  }, []);

  // Solve Timer ticking effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerState === "running") {
      const startTime = Date.now();
      interval = setInterval(() => {
        setTimerTime(Date.now() - startTime);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState]);

  // Spacebar controller for timer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        const tag = document.activeElement?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        
        e.preventDefault();

        if (timerState === "idle" || timerState === "stopped") {
          if (readyTimeoutRef.current) return;
          setTimerState("inspection");
          readyTimeoutRef.current = setTimeout(() => {
            setTimerState("ready");
          }, 350);
        } else if (timerState === "running") {
          setTimerState("stopped");
          setSolves((prev) => [...prev, timerTime]);
          setScramble(generateScramble());
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        const tag = document.activeElement?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;

        e.preventDefault();

        if (readyTimeoutRef.current) {
          clearTimeout(readyTimeoutRef.current);
          readyTimeoutRef.current = null;
        }

        if (timerState === "ready") {
          setTimerState("running");
          setTimerTime(0);
        } else if (timerState === "inspection") {
          setTimerState("idle");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (readyTimeoutRef.current) clearTimeout(readyTimeoutRef.current);
    };
  }, [timerState, timerTime]);

  // Handle Touch/Click events on the timer zone (useful for mobile)
  const handleTimerTouchStart = () => {
    if (timerState === "idle" || timerState === "stopped") {
      setTimerState("inspection");
      readyTimeoutRef.current = setTimeout(() => {
        setTimerState("ready");
      }, 350);
    } else if (timerState === "running") {
      setTimerState("stopped");
      setSolves((prev) => [...prev, timerTime]);
      setScramble(generateScramble());
    }
  };

  const handleTimerTouchEnd = () => {
    if (readyTimeoutRef.current) {
      clearTimeout(readyTimeoutRef.current);
      readyTimeoutRef.current = null;
    }

    if (timerState === "ready") {
      setTimerState("running");
      setTimerTime(0);
    } else if (timerState === "inspection") {
      setTimerState("idle");
    }
  };

  // Stats calculation
  const personalBest = solves.length > 0 ? Math.min(...solves) : 0;
  const averageOf5 = () => {
    if (solves.length < 5) return 0;
    const last5 = solves.slice(-5);
    const sum = last5.reduce((a, b) => a + b, 0);
    return sum / 5;
  };

  // Convert milliseconds to formatted timer output
  const formatTime = (ms: number): string => {
    const totalSecs = ms / 1000;
    return totalSecs.toFixed(2);
  };

  // Sticker array generator
  const renderStickers = (face: FaceName) => {
    return cubeState[face].map((color, i) => (
      <div
        key={i}
        className="w-full h-full border-[1.5px] border-[#060608] relative group/sticker"
        style={{
          backgroundColor: color,
          boxShadow: `inset 0 0 12px rgba(255,255,255,0.18), 0 0 4px ${color}15`,
        }}
      >
        {/* Holographic detail lining */}
        <div className="absolute inset-0.5 border border-white/5 opacity-20 pointer-events-none" />
      </div>
    ));
  };

  // Dynamic rotation classes avoiding transform overlap
  const getRotationClass = (face: FaceName): string => {
    if (!activeMove) return "";
    const isPrime = activeMove.endsWith("'");
    const baseMove = isPrime ? activeMove.slice(0, -1) : activeMove;
    if (baseMove === face) {
      return isPrime ? "-rotate-90" : "rotate-90";
    }
    return "";
  };

  return (
    <section
      id="rubik-lab"
      className="relative w-full py-24 px-6 md:px-16 border-t border-[#1e1e24] z-10 bg-[#08080a] overflow-hidden select-none"
    >
      {/* Background Watermark decoration */}
      <div className="absolute left-0 top-0 pointer-events-none select-none text-zinc-900 font-syne font-extrabold text-[12rem] md:text-[18rem] opacity-20 leading-none -translate-y-12 -translate-x-12 uppercase">
        CUBE
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Header section aligned with portfolio grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 flex items-center gap-2">
            <span className="font-mono text-sm tracking-widest text-[#E50914] font-bold">05.2 //</span>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              THE ALGORITHMIC MIND
            </span>
          </div>

          <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-syne font-extrabold text-5xl md:text-7xl leading-none uppercase text-white tracking-tight">
              SPEEDCUBING LAB
            </h2>
            <div className="h-[2px] flex-grow bg-[#1e1e24] mx-4 mb-3 hidden md:block" />
            <span className="font-mono text-xs uppercase text-[#E50914] tracking-[0.2em] font-semibold shrink-0">
              ALGORITHMS &amp; ARCHITECTURE
            </span>
          </div>
        </div>

        {/* Lab Panel Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: 3D Holographic CSS Cube & Algorithm Player (6 cols) */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-8 items-center h-full justify-between">
            
            {/* Viewport Frame Box */}
            <div className="w-full max-w-[420px] aspect-square bg-[#0b0b0e] border border-[#1e1e24] flex flex-col items-center justify-center relative p-8 select-none shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
              
              {/* Perspective Wrapper */}
              <div 
                className="w-44 h-44 relative"
                style={{ perspective: "1000px" }}
              >
                {/* 3D Rotatable Cube Body */}
                <div
                  className="w-full h-full absolute transition-transform duration-200"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                  }}
                >
                  {/* FACE 1: FRONT */}
                  <div
                    className="absolute inset-0"
                    style={{ transform: "translateZ(88px)", transformStyle: "preserve-3d" }}
                  >
                    <div
                      className={`w-full h-full grid grid-cols-3 grid-rows-3 p-1 bg-[#060608] border border-[#1e1e24] transition-transform duration-500 ease-out origin-center ${getRotationClass("F")}`}
                    >
                      {renderStickers("F")}
                    </div>
                  </div>

                  {/* FACE 2: BACK */}
                  <div
                    className="absolute inset-0"
                    style={{ transform: "rotateY(180deg) translateZ(88px)", transformStyle: "preserve-3d" }}
                  >
                    <div
                      className={`w-full h-full grid grid-cols-3 grid-rows-3 p-1 bg-[#060608] border border-[#1e1e24] transition-transform duration-500 ease-out origin-center ${getRotationClass("B")}`}
                    >
                      {renderStickers("B")}
                    </div>
                  </div>

                  {/* FACE 3: UP */}
                  <div
                    className="absolute inset-0"
                    style={{ transform: "rotateX(90deg) translateZ(88px)", transformStyle: "preserve-3d" }}
                  >
                    <div
                      className={`w-full h-full grid grid-cols-3 grid-rows-3 p-1 bg-[#060608] border border-[#1e1e24] transition-transform duration-500 ease-out origin-center ${getRotationClass("U")}`}
                    >
                      {renderStickers("U")}
                    </div>
                  </div>

                  {/* FACE 4: DOWN */}
                  <div
                    className="absolute inset-0"
                    style={{ transform: "rotateX(-90deg) translateZ(88px)", transformStyle: "preserve-3d" }}
                  >
                    <div
                      className={`w-full h-full grid grid-cols-3 grid-rows-3 p-1 bg-[#060608] border border-[#1e1e24] transition-transform duration-500 ease-out origin-center ${getRotationClass("D")}`}
                    >
                      {renderStickers("D")}
                    </div>
                  </div>

                  {/* FACE 5: LEFT */}
                  <div
                    className="absolute inset-0"
                    style={{ transform: "rotateY(-90deg) translateZ(88px)", transformStyle: "preserve-3d" }}
                  >
                    <div
                      className={`w-full h-full grid grid-cols-3 grid-rows-3 p-1 bg-[#060608] border border-[#1e1e24] transition-transform duration-500 ease-out origin-center ${getRotationClass("L")}`}
                    >
                      {renderStickers("L")}
                    </div>
                  </div>

                  {/* FACE 6: RIGHT */}
                  <div
                    className="absolute inset-0"
                    style={{ transform: "rotateY(90deg) translateZ(88px)", transformStyle: "preserve-3d" }}
                  >
                    <div
                      className={`w-full h-full grid grid-cols-3 grid-rows-3 p-1 bg-[#060608] border border-[#1e1e24] transition-transform duration-500 ease-out origin-center ${getRotationClass("R")}`}
                    >
                      {renderStickers("R")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Viewport dashboard telemetry labels */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                Interactive Holographic Grid
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1 font-mono text-[9px] text-[#E50914] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                <span>ONLINE STATE</span>
              </div>

              {/* Angle orientation sliders / controls */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between px-2 text-[9px] font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`flex items-center gap-1 px-2.5 py-1 border transition-colors ${
                      autoRotate 
                        ? "border-[#E50914]/40 bg-[#E50914]/10 text-white font-semibold"
                        : "border-[#1e1e24] bg-transparent hover:border-[#E50914] hover:text-white"
                    }`}
                  >
                    <RefreshCw className={`w-2.5 h-2.5 ${autoRotate ? "animate-spin" : ""}`} />
                    <span>{autoRotate ? "SPINNING" : "HALT"}</span>
                  </button>
                  <button
                    onClick={() => setRotX((prev) => (prev + 15) % 360)}
                    className="px-2 py-1 border border-[#1e1e24] hover:border-white hover:text-white transition-colors"
                  >
                    TILT +
                  </button>
                  <button
                    onClick={() => setRotX((prev) => (prev - 15) % 360)}
                    className="px-2 py-1 border border-[#1e1e24] hover:border-white hover:text-white transition-colors"
                  >
                    TILT -
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <span>X: {rotX}&deg;</span>
                  <span>Y: {rotY}&deg;</span>
                </div>
              </div>

            </div>

            {/* Quick manual rotation buttons */}
            <div className="flex flex-col items-center gap-3 w-full">
              <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase font-bold">
                Manual Notation Inputs
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                {["R", "R'", "U", "U'", "F", "F'", "L", "L'"].map((m) => (
                  <button
                    key={m}
                    onClick={() => triggerMove(m)}
                    className="w-10 py-1.5 border border-[#1e1e24] bg-[#0d0d10] hover:border-[#E50914] hover:text-white font-mono text-xs transition-all duration-300"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Algorithm Player HUD */}
            <div className="w-full border border-[#1e1e24] bg-[#0d0d10] p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-[#1e1e24] pb-2 text-[10px] font-mono text-zinc-500">
                <Play className="w-3.5 h-3.5 text-[#E50914]" />
                <span>ALGORITHM PLAYER (CFOP PATTERNS)</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {algorithms.map((alg) => (
                  <div key={alg.name} className="flex items-center justify-between gap-4 p-2 border border-[#1e1e24]/40 bg-black/30 hover:border-[#E50914]/40 transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase">{alg.name}</span>
                      <span className="font-mono text-[9px] text-[#E50914] uppercase tracking-wider">{alg.seq}</span>
                    </div>
                    <button
                      disabled={isPlayingAlg || activeMove !== null}
                      onClick={() => playAlgorithm(alg.seq)}
                      className="px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider bg-[#E50914] hover:bg-[#ff1e27] text-white disabled:bg-zinc-800 disabled:text-zinc-600 font-bold transition-all"
                    >
                      PLAY
                    </button>
                  </div>
                ))}
              </div>

              {/* Running algorithm moves progress visualizer */}
              {isPlayingAlg && (
                <div className="border border-[#E50914]/20 bg-[#E50914]/5 p-3 flex flex-col gap-1.5 font-mono text-[9px]">
                  <span className="text-zinc-500 uppercase tracking-widest font-bold">EXECUTING SEQUENCE:</span>
                  <div className="flex flex-wrap gap-1 items-center">
                    {algMoves.map((m, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 border text-[10px] ${
                          idx === currentMoveIdx
                            ? "bg-white text-black font-extrabold border-white"
                            : "border-zinc-800 text-zinc-500"
                        }`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: Solve Timer HUD & Bento CFOP-Software Analogy (6 cols) */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-8 h-full justify-between">
            
            {/* Speedcubing Solve Timer (CSTimer style) */}
            <div className="border border-[#1e1e24] bg-[#0d0d10] p-6 flex flex-col gap-5 relative overflow-hidden">
              
              {/* Stats telemetry readouts top */}
              <div className="flex items-center justify-between border-b border-[#1e1e24]/60 pb-3">
                <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500">
                  <Timer className="w-4 h-4 text-[#E50914]" />
                  <span>SPEED TIME MODULE</span>
                </div>
                
                <div className="flex gap-4 font-mono text-[9px] text-zinc-500 uppercase">
                  <div>
                    <span>PB: </span>
                    <span className="text-[#E50914] font-bold">{personalBest > 0 ? `${formatTime(personalBest)}s` : "--"}</span>
                  </div>
                  <div>
                    <span>Ao5: </span>
                    <span className="text-white font-bold">{averageOf5() > 0 ? `${formatTime(averageOf5())}s` : "--"}</span>
                  </div>
                  <div>
                    <span>SOLVES: </span>
                    <span className="text-white font-bold">{solves.length}</span>
                  </div>
                </div>
              </div>

              {/* Scramble code block */}
              <div className="bg-black/60 border border-[#1e1e24] p-3 text-center">
                <span className="font-mono text-[9px] text-zinc-500 uppercase block tracking-wider mb-1">GENERATED SCRAMBLE</span>
                <span className="font-mono text-[10px] md:text-xs text-white uppercase tracking-widest leading-relaxed">
                  {scramble || "NO SCRAMBLE LOADED"}
                </span>
              </div>

              {/* Timer HUD trigger box */}
              <div 
                onMouseDown={handleTimerTouchStart}
                onMouseUp={handleTimerTouchEnd}
                onTouchStart={(e) => { e.preventDefault(); handleTimerTouchStart(); }}
                onTouchEnd={(e) => { e.preventDefault(); handleTimerTouchEnd(); }}
                className="w-full aspect-[21/9] border border-[#1e1e24]/70 bg-black/40 hover:bg-black/80 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative group"
              >
                {/* Visual states cues */}
                <div className="absolute top-3 inset-x-0 text-center font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
                  {timerState === "idle" && "HOLD SPACEBAR / TAP HERE TO READY"}
                  {timerState === "inspection" && "WAITING FOR DEPLOYMENT..."}
                  {timerState === "ready" && "RELEASE SPACEBAR / TAP TO START CUBING"}
                  {timerState === "running" && "TAP ANYWHERE TO STOP SOLVE"}
                  {timerState === "stopped" && "SOLVE CAPTURED. PRESS SPACE FOR NEXT"}
                </div>

                <div 
                  className={`font-mono text-5xl md:text-6xl font-extrabold tracking-tighter transition-colors duration-200 select-none ${
                    timerState === "inspection" ? "text-red-500 animate-pulse" : ""
                  } ${
                    timerState === "ready" ? "text-emerald-500" : ""
                  } ${
                    timerState === "running" ? "text-white scale-105" : ""
                  } ${
                    timerState === "stopped" ? "text-[#E50914]" : "text-zinc-300"
                  }`}
                >
                  {formatTime(timerTime)}
                  <span className="text-xs font-bold ml-1">s</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center mt-1">
                <div className="flex gap-2">
                  <button
                    onClick={handleScrambleCube}
                    className="px-3 py-1.5 border border-[#1e1e24] font-mono text-[9px] text-zinc-400 hover:border-[#E50914] hover:text-white uppercase transition-colors"
                  >
                    SCRAMBLE CUBE
                  </button>
                  <button
                    onClick={handleResetCube}
                    className="px-3 py-1.5 border border-[#1e1e24] font-mono text-[9px] text-zinc-400 hover:border-zinc-600 hover:text-white uppercase transition-colors"
                  >
                    RESET STATE
                  </button>
                </div>

                {solves.length > 0 && (
                  <button
                    onClick={() => {
                      setSolves([]);
                      setTimerTime(0);
                      setTimerState("idle");
                    }}
                    className="px-3 py-1.5 border border-[#E50914]/20 bg-[#E50914]/5 text-[#E50914] hover:bg-[#E50914]/10 font-mono text-[9px] uppercase tracking-wide font-bold transition-all"
                  >
                    CLEAR SESSION
                  </button>
                )}
              </div>

            </div>

            {/* CFOP Speedcubing & Software Bento Analogy Grid */}
            <div className="flex flex-col gap-5 mt-4">
              <div className="flex items-center justify-between border-b border-[#1e1e24] pb-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#E50914]" />
                  <span className="font-mono text-[10px] tracking-widest text-zinc-500 font-bold uppercase">
                    ALGORITHMIC ENGINE BENTO
                  </span>
                </div>
                <span className="font-mono text-[8px] text-zinc-500">CFOP SOFTWARE MODEL</span>
              </div>

              {/* CFOP Steps Tabs */}
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(structureDetails) as StructurePart[]).map((part) => (
                  <button
                    key={part}
                    onClick={() => setActivePart(part)}
                    className={`py-2 border font-mono text-[9px] uppercase tracking-widest transition-all duration-300 rounded-none ${
                      activePart === part
                        ? "bg-[#E50914] border-[#E50914] text-white font-extrabold"
                        : "border-[#1e1e24] bg-[#0d0d10] text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>

              {/* Analogy Display Bento Card */}
              <div 
                className="bg-[#0d0d10] border p-6 flex flex-col gap-4 min-h-[220px] transition-all duration-500"
                style={{
                  borderColor: activePart === "cross" ? "#A855F7" : activePart === "f2l" ? "#3B82F6" : activePart === "oll" ? "#FBBF24" : "#F97316",
                  boxShadow: `0 0 15px ${activePart === "cross" ? "rgba(168,85,247,0.04)" : activePart === "f2l" ? "rgba(59,130,246,0.04)" : activePart === "oll" ? "rgba(251,191,36,0.04)" : "rgba(249,115,22,0.04)"}`
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-7 h-7 flex items-center justify-center text-white border transition-colors duration-300"
                    style={{
                      borderColor: activePart === "cross" ? "#A855F7" : activePart === "f2l" ? "#3B82F6" : activePart === "oll" ? "#FBBF24" : "#F97316",
                      backgroundColor: activePart === "cross" ? "#A855F720" : activePart === "f2l" ? "#3B82F620" : activePart === "oll" ? "#FBBF2420" : "#F9731620"
                    }}
                  >
                    {structureDetails[activePart].icon}
                  </div>
                  
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-syne font-extrabold text-white text-xs uppercase tracking-wider">
                      {structureDetails[activePart].title}
                    </h3>
                    <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest leading-none">
                      {structureDetails[activePart].metrics}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pt-2 border-t border-[#1e1e24]">
                  <span className="font-mono text-[8px] text-[#E50914] uppercase tracking-widest font-bold">CUBE DYNAMICS:</span>
                  <p className="font-mono text-[10px] text-zinc-400 uppercase leading-relaxed tracking-wide">
                    {structureDetails[activePart].description}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 pt-2.5 border-t border-[#1e1e24]/40">
                  <span className="font-mono text-[8px] text-[#E50914] uppercase tracking-widest font-bold">SOFTWARE ENGINEERING DYNAMICS:</span>
                  <p className="font-mono text-[10px] text-zinc-300 uppercase leading-relaxed tracking-wide">
                    {structureDetails[activePart].analogy}
                  </p>
                </div>
              </div>
            </div>

            {/* Certificate readout details bottom */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="border border-[#1e1e24] p-4 bg-[#0d0d10] flex flex-col justify-between">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">ALGORITHMIC SPEED</span>
                <span className="font-syne font-extrabold text-lg text-white mt-1 uppercase">SUB-11s</span>
                <span className="font-mono text-[8px] text-[#E50914] uppercase font-bold mt-1 tracking-wider">AVERAGE CFOP SOLVE</span>
              </div>
              <div className="border border-[#1e1e24] p-4 bg-[#0d0d10] flex flex-col justify-between">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">TPS INTENSITY</span>
                <span className="font-syne font-extrabold text-lg text-white mt-1 uppercase">8.5 turns/s</span>
                <span className="font-mono text-[8px] text-[#E50914] uppercase font-bold mt-1 tracking-wider">MAX TURNS PER SEC</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
