"use client";

import React, { useState, useEffect } from "react";
import { Zap, Layers, RefreshCw, Cpu } from "lucide-react";

type StructurePart = "centers" | "edges" | "corners";

export default function RubikCubeLab() {
  // 3D Cube Rotation States
  const [rotX, setRotX] = useState(-25);
  const [rotY, setRotY] = useState(45);
  
  // Active explanation part
  const [activePart, setActivePart] = useState<StructurePart>("centers");
  
  // Animation state for face turns
  const [activeMove, setActiveMove] = useState<string | null>(null);
  
  // Notation Moves list
  const moves = [
    { label: "R (Right)", move: "R" },
    { label: "U (Up)", move: "U" },
    { label: "F (Front)", move: "F" },
    { label: "L (Left)", move: "L" },
  ];

  // Perform a move and trigger animation
  const triggerMove = (move: string) => {
    if (activeMove) return; // Wait for current animation
    setActiveMove(move);
    setTimeout(() => {
      setActiveMove(null);
    }, 600); // Match CSS transition duration
  };

  // Auto rotate toggle
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotY((prev) => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Structural details mapping
  const structureDetails = {
    centers: {
      title: "Centers // Core Anchors",
      icon: <Cpu className="w-5 h-5 text-accent" />,
      description: "6 FIXED PIECES THAT NEVER MOVE RELATIONALLY. THEY DEFINE THE COLOR OF THE FACE.",
      analogy: "CORE ARCHITECTURAL DECISIONS (E.G., REACT, NEXT.JS, FASTAPI). THE FIXED REFERENCE POINTS THAT ANCHOR EVERY FEATURE YOU BUILD.",
      metrics: "6 pieces / Single color per piece"
    },
    edges: {
      title: "Edges // Connective Logic",
      icon: <Layers className="w-5 h-5 text-accent" />,
      description: "12 PIECES POSITIONED BETWEEN CORNERS, CONNECTING TWO ADJACENT FACES.",
      analogy: "CONNECTIVE FLOW & ROUTING (API LOGIC, STATE MANAGEMENT, PROPS). THEY BRIDGE SEPARATE CODE MODULES AND PASS DATA BETWEEN FACES.",
      metrics: "12 pieces / 2 colors per piece"
    },
    corners: {
      title: "Corners // Junction Features",
      icon: <Zap className="w-5 h-5 text-accent" />,
      description: "8 PIECES SIT AT THE INTERSECTIONS, EXPOSING THREE COLORS SIMULTANEOUSLY.",
      analogy: "FULL-STACK FEATURES (E.G., PAYMENT INTEGRATIONS, AI CHAT SYSTEM). TOUCHES FRONTEND (UI), API (LOGIC), AND FIREBASE/DB (STORAGE) ALL AT ONCE.",
      metrics: "8 pieces / 3 colors per piece"
    }
  };

  // Render a 3x3 grid face of colored stickers
  const renderStickers = (colorClass: string) => {
    return Array(9)
      .fill(null)
      .map((_, i) => (
        <div
          key={i}
          className={`w-full h-full border-[1.5px] border-[#0d0d0d] transition-all duration-300 ${colorClass}`}
        />
      ));
  };

  return (
    <section
      id="rubik-lab"
      className="relative w-full py-24 px-6 md:px-16 border-t border-borderDark z-10 bg-background overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute left-0 top-0 pointer-events-none select-none text-borderDark font-syne font-extrabold text-[12rem] md:text-[18rem] opacity-35 leading-none -translate-y-12 -translate-x-12">
        CUBE
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 flex items-center gap-2">
            <span className="font-mono text-sm tracking-widest text-mutedGray">05.2 //</span>
            <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
              THE ALGORITHMIC MIND
            </span>
          </div>

          <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-syne font-extrabold text-5xl md:text-7xl leading-none uppercase text-foreground tracking-tight">
              SPEEDCUBING LAB
            </h2>
            <div className="h-[2px] flex-grow bg-borderDark mx-4 mb-3 hidden md:block" />
            <span className="font-mono text-xs uppercase text-accent tracking-[0.2em] font-semibold shrink-0">
              ALGORITHMS & ARCHITECTURE
            </span>
          </div>
        </div>

        {/* Lab Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: 3D Interactive CSS Cube */}
          <div className="lg:col-span-6 flex flex-col items-center gap-8">
            
            {/* Viewport Box */}
            <div className="w-full max-w-[420px] aspect-square bg-cardBg border border-borderDark flex flex-col items-center justify-center relative p-8 select-none">
              
              {/* Perspective viewport container */}
              <div 
                className="w-44 h-44 relative"
                style={{ perspective: "1000px" }}
              >
                {/* 3D Cube */}
                <div
                  className="w-full h-full absolute transition-transform duration-200"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                  }}
                >
                  {/* FACE 1: FRONT (Red) */}
                  <div
                    className={`absolute inset-0 grid grid-cols-3 grid-rows-3 p-1 bg-[#0d0d0d] border border-borderDark transition-transform duration-500 ease-out origin-center ${
                      activeMove === "F" ? "rotate-90" : ""
                    }`}
                    style={{ transform: "translateZ(88px)" }}
                  >
                    {renderStickers("bg-[#E50914]")} {/* Brand Red */}
                  </div>

                  {/* FACE 2: BACK (Orange) */}
                  <div
                    className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-1 bg-[#0d0d0d] border border-borderDark origin-center"
                    style={{ transform: "rotateY(180deg) translateZ(88px)" }}
                  >
                    {renderStickers("bg-[#FF5F00]")} {/* Orange */}
                  </div>

                  {/* FACE 3: UP (White) */}
                  <div
                    className={`absolute inset-0 grid grid-cols-3 grid-rows-3 p-1 bg-[#0d0d0d] border border-borderDark transition-transform duration-500 ease-out origin-center ${
                      activeMove === "U" ? "rotate-90" : ""
                    }`}
                    style={{ transform: "rotateX(90deg) translateZ(88px)" }}
                  >
                    {renderStickers("bg-[#FFFFFF]")} {/* White */}
                  </div>

                  {/* FACE 4: DOWN (Yellow) */}
                  <div
                    className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-1 bg-[#0d0d0d] border border-borderDark origin-center"
                    style={{ transform: "rotateX(-90deg) translateZ(88px)" }}
                  >
                    {renderStickers("bg-[#FFD600]")} {/* Yellow */}
                  </div>

                  {/* FACE 5: LEFT (Green) */}
                  <div
                    className={`absolute inset-0 grid grid-cols-3 grid-rows-3 p-1 bg-[#0d0d0d] border border-borderDark transition-transform duration-500 ease-out origin-center ${
                      activeMove === "L" ? "rotate-90" : ""
                    }`}
                    style={{ transform: "rotateY(-90deg) translateZ(88px)" }}
                  >
                    {renderStickers("bg-[#00E676]")} {/* Green */}
                  </div>

                  {/* FACE 6: RIGHT (Blue) */}
                  <div
                    className={`absolute inset-0 grid grid-cols-3 grid-rows-3 p-1 bg-[#0d0d0d] border border-borderDark transition-transform duration-500 ease-out origin-center ${
                      activeMove === "R" ? "rotate-90" : ""
                    }`}
                    style={{ transform: "rotateY(90deg) translateZ(88px)" }}
                  >
                    {renderStickers("bg-[#0091EA]")} {/* Blue */}
                  </div>
                </div>
              </div>

              {/* 3D Spin Sliders & Toggle controls */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between px-2 text-[10px] font-mono text-mutedGray">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className="flex items-center gap-1.5 px-2 py-1 border border-borderDark bg-background hover:border-accent hover:text-accent transition-colors"
                  >
                    <RefreshCw className={`w-2.5 h-2.5 ${autoRotate ? "animate-spin" : ""}`} />
                    <span>{autoRotate ? "HALT" : "SPIN"}</span>
                  </button>
                  <button
                    onClick={() => setRotX((prev) => (prev + 15) % 360)}
                    className="px-2 py-1 border border-borderDark bg-background hover:border-accent hover:text-accent transition-colors"
                  >
                    TILT +
                  </button>
                  <button
                    onClick={() => setRotX((prev) => (prev - 15) % 360)}
                    className="px-2 py-1 border border-borderDark bg-background hover:border-accent hover:text-accent transition-colors"
                  >
                    TILT -
                  </button>
                </div>
                
                <div className="flex gap-2.5">
                  <span>X: {rotX}&deg;</span>
                  <span>Y: {rotY}&deg;</span>
                </div>
              </div>
              
              {/* Drag instruction overlay */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-mutedGray uppercase tracking-widest">
                Interactive 3D Grid
              </div>
            </div>

            {/* Turn buttons */}
            <div className="flex flex-col items-center gap-3 w-full">
              <span className="font-mono text-[10px] tracking-wider text-mutedGray uppercase font-semibold">
                Perform Notation Move (CSS Face Spin)
              </span>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {moves.map((m) => (
                  <button
                    key={m.move}
                    onClick={() => triggerMove(m.move)}
                    className="px-3.5 py-1.5 border border-borderDark bg-cardBg hover:border-accent hover:text-accent font-mono text-xs transition-all duration-300"
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Structural Breakdown & Cubing Stats */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            
            {/* Stat Row */}
            <div className="grid grid-cols-2 gap-4 border-b border-borderDark pb-6">
              <div className="flex flex-col gap-1 border border-borderDark p-4 bg-cardBg relative group hover:border-accent/40 transition-colors">
                <span className="font-mono text-[9px] tracking-wider text-mutedGray">ACADEMIC STANDING</span>
                <span className="font-syne font-extrabold text-2xl md:text-3xl text-accent">9.03</span>
                <span className="font-mono text-[8px] text-mutedGray mt-1 uppercase">B.TECH AI &amp; ML CGPA</span>
              </div>
              <div className="flex flex-col gap-1 border border-borderDark p-4 bg-cardBg relative group hover:border-accent/40 transition-colors">
                <span className="font-mono text-[9px] tracking-wider text-mutedGray">HACKATHONS</span>
                <span className="font-syne font-extrabold text-2xl md:text-3xl text-foreground">2x</span>
                <span className="font-mono text-[8px] text-mutedGray mt-1 uppercase">STATE &amp; NATIONAL FINALIST</span>
              </div>
            </div>

            {/* Interactive Concept Breakdown */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] tracking-widest text-accent font-bold uppercase">
                STRUCTURAL ANALOGY
              </span>
              
              {/* Tabs */}
              <div className="flex gap-2">
                {(Object.keys(structureDetails) as StructurePart[]).map((part) => (
                  <button
                    key={part}
                    onClick={() => setActivePart(part)}
                    className={`px-3 py-1.5 border font-mono text-[10px] uppercase tracking-wider transition-all duration-300 ${
                      activePart === part
                        ? "bg-accent border-accent text-background font-semibold"
                        : "border-borderDark text-mutedGray hover:text-foreground"
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>

              {/* Tab Display Panel */}
              <div className="bg-cardBg border border-borderDark p-6 flex flex-col gap-4 min-h-[190px]">
                <div className="flex items-center gap-2 font-semibold">
                  {structureDetails[activePart].icon}
                  <h3 className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                    {structureDetails[activePart].title}
                  </h3>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] text-accent uppercase tracking-widest font-semibold">CUBE ANATOMY:</span>
                  <p className="font-mono text-xs text-mutedGray uppercase leading-relaxed">
                    {structureDetails[activePart].description}
                  </p>
                </div>

                <div className="flex flex-col gap-1 border-t border-borderDark pt-3 mt-1">
                  <span className="font-mono text-[8px] text-accent uppercase tracking-widest font-semibold">SOFTWARE ANALOGY:</span>
                  <p className="font-mono text-xs text-foreground uppercase leading-relaxed">
                    {structureDetails[activePart].analogy}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
