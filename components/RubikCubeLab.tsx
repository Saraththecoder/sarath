"use client";

import React, { useState, useEffect } from "react";

type FaceName = "U" | "D" | "F" | "B" | "L" | "R";

const CUBE_COLORS = {
  U: "#FFFFFF", // White
  D: "#FFD600", // Yellow
  F: "#E50914", // Red
  B: "#FF5F00", // Orange
  L: "#00E676", // Green
  R: "#0091EA", // Blue
};

// Static solved cube state for clean display
const cubeState: Record<FaceName, string[]> = {
  U: Array(9).fill(CUBE_COLORS.U),
  D: Array(9).fill(CUBE_COLORS.D),
  F: Array(9).fill(CUBE_COLORS.F),
  B: Array(9).fill(CUBE_COLORS.B),
  L: Array(9).fill(CUBE_COLORS.L),
  R: Array(9).fill(CUBE_COLORS.R),
};

export default function RubikCubeLab() {
  const [rotY, setRotY] = useState(0);

  // Auto-rotate the models in sync
  useEffect(() => {
    const interval = setInterval(() => {
      setRotY((prev) => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const renderCubeStickers = (face: FaceName) => {
    return cubeState[face].map((color, i) => (
      <div
        key={i}
        className="w-full h-full border-[1.5px] border-[#060608] relative"
        style={{
          backgroundColor: color,
          boxShadow: `inset 0 0 12px rgba(255,255,255,0.18), 0 0 4px ${color}15`,
        }}
      >
        <div className="absolute inset-0.5 border border-white/5 opacity-20 pointer-events-none" />
      </div>
    ));
  };

  return (
    <section
      id="rubik-lab"
      className="relative w-full py-20 px-6 md:px-16 border-t border-[#1e1e24] z-10 bg-[#08080a] overflow-hidden select-none"
    >
      {/* Background Watermark */}
      <div className="absolute left-0 top-0 pointer-events-none select-none text-zinc-900 font-syne font-extrabold text-[12rem] md:text-[18rem] opacity-20 leading-none -translate-y-12 -translate-x-12 uppercase">
        HOBBY
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 flex items-center gap-2">
            <span className="font-mono text-sm tracking-widest text-[#E50914] font-bold">05 //</span>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              CREATIVE LAB
            </span>
          </div>

          <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-syne font-extrabold text-5xl md:text-7xl leading-none uppercase text-white tracking-tight">
              HOBBIES &amp; CRAFT
            </h2>
            <div className="h-[2px] flex-grow bg-[#1e1e24] mx-4 mb-3 hidden md:block" />
            <span className="font-mono text-xs uppercase text-[#E50914] tracking-[0.2em] font-semibold shrink-0">
              3D INTERACTIVE MODELS
            </span>
          </div>
        </div>

        {/* 3-Column 3D Models Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Photography Camera */}
          <div className="border border-[#1e1e24] bg-[#0d0d10] p-6 flex flex-col justify-between items-center relative shadow-[0_0_20px_rgba(0,0,0,0.5)] min-h-[360px] overflow-hidden group">
            <div className="w-full flex justify-between font-mono text-[9px] text-zinc-500 uppercase tracking-widest z-10">
              <span>01 // PHOTOGRAPHY</span>
              <span>EXPOSURE_CAPTURED</span>
            </div>

            {/* Picture Frame Viewport */}
            <div className="w-full flex items-center justify-center relative flex-grow min-h-[200px] py-4 z-10">
              <div className="relative w-full aspect-[4/3] border border-[#1e1e24] bg-black overflow-hidden rounded-sm group/img">
                <video
                  src="/camera.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute bottom-2 left-3 font-mono text-[8px] text-zinc-400 pointer-events-none">
                  CAMERA SHOWCASE // PLAYING VIDEO
                </div>
              </div>
            </div>

            <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider text-center border-t border-[#1e1e24] w-full pt-3 z-10">
              Capturing light &amp; geometry
            </div>
          </div>

          {/* Card 2: Video Editing */}
          <div className="border border-[#1e1e24] bg-[#0d0d10] p-6 flex flex-col justify-between items-center relative shadow-[0_0_20px_rgba(0,0,0,0.5)] min-h-[360px] overflow-hidden group">
            <div className="w-full flex justify-between font-mono text-[9px] text-zinc-500 uppercase tracking-widest z-10">
              <span>02 // VIDEO EDITING</span>
              <span>TIMELINE_RENDER</span>
            </div>

            {/* Video Viewport */}
            <div className="w-full flex items-center justify-center relative flex-grow min-h-[200px] py-4 z-10">
              <div className="relative w-full aspect-[4/3] border border-[#1e1e24] bg-black overflow-hidden rounded-sm group/img">
                <video
                  src="/editing.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute bottom-2 left-3 font-mono text-[8px] text-zinc-400 pointer-events-none">
                  EDITING FLOW // PLAYING VIDEO
                </div>
              </div>
            </div>

            <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider text-center border-t border-[#1e1e24] w-full pt-3 z-10">
              Narrative timeline &amp; cuts
            </div>
          </div>

          {/* Card 3: Rubik's Cube */}
          <div className="border border-[#1e1e24] bg-[#0d0d10] p-6 flex flex-col justify-between items-center relative shadow-[0_0_20px_rgba(0,0,0,0.5)] min-h-[360px]">
            <div className="w-full flex justify-between font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
              <span>03 // CUBE SOLVING</span>
              <span>3X3_PUZZLE</span>
            </div>

            {/* 3D Viewport */}
            <div className="w-full flex items-center justify-center relative flex-grow min-h-[200px]" style={{ perspective: "1000px" }}>
              <div
                className="w-32 h-32 relative"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(-25deg) rotateY(${rotY}deg)`,
                }}
              >
                {/* FACE 1: FRONT */}
                <div className="absolute inset-0" style={{ transform: "translateZ(64px)", transformStyle: "preserve-3d" }}>
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3 p-1 bg-[#060608] border border-[#1e1e24]">
                    {renderCubeStickers("F")}
                  </div>
                </div>
                {/* FACE 2: BACK */}
                <div className="absolute inset-0" style={{ transform: "rotateY(180deg) translateZ(64px)" }}>
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3 p-1 bg-[#060608] border border-[#1e1e24]">
                    {renderCubeStickers("B")}
                  </div>
                </div>
                {/* FACE 3: UP */}
                <div className="absolute inset-0" style={{ transform: "rotateX(90deg) translateZ(64px)" }}>
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3 p-1 bg-[#060608] border border-[#1e1e24]">
                    {renderCubeStickers("U")}
                  </div>
                </div>
                {/* FACE 4: DOWN */}
                <div className="absolute inset-0" style={{ transform: "rotateX(-90deg) translateZ(64px)" }}>
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3 p-1 bg-[#060608] border border-[#1e1e24]">
                    {renderCubeStickers("D")}
                  </div>
                </div>
                {/* FACE 5: LEFT */}
                <div className="absolute inset-0" style={{ transform: "rotateY(-90deg) translateZ(64px)" }}>
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3 p-1 bg-[#060608] border border-[#1e1e24]">
                    {renderCubeStickers("L")}
                  </div>
                </div>
                {/* FACE 6: RIGHT */}
                <div className="absolute inset-0" style={{ transform: "rotateY(90deg) translateZ(64px)" }}>
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3 p-1 bg-[#060608] border border-[#1e1e24]">
                    {renderCubeStickers("R")}
                  </div>
                </div>
              </div>
            </div>

            <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider text-center border-t border-[#1e1e24] w-full pt-3">
              Spatial logic &amp; algorithms
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
