"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle, Monitor, Cpu, Database, Palette, Cloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { certificationsData } from "@/lib/data";

// Proficiency percentages for skill bars
const PROFICIENCY: Record<string, number> = {
  "React": 95, "Next.js": 98, "TypeScript": 92, "Tailwind CSS": 96,
  "HTML/CSS": 99, "Bootstrap": 80, "Python": 88, "FastAPI": 85,
  "Flask": 72, "OpenCV": 70, "NetworkX": 68, "Gemini AI": 82,
  "MongoDB": 78, "Firebase": 88, "SQL": 75, "Figma": 90,
  "Framer": 85, "Webflow": 78, "Canva": 92, "GitHub": 95,
  "N8N": 72, "Vercel": 90, "Google Cloud": 76,
};

// Orbital configuration — innermost = most core technologies
interface Orbit {
  id: string;
  category: string;
  icon: LucideIcon;
  skills: string[];
  radius: number;
  duration: number;
  startAngle: number;
  color: string;
  description: string;
}

const ORBITS: Orbit[] = [
  {
    id: "frontend",
    category: "FRONTEND",
    icon: Monitor,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "Bootstrap"],
    radius: 80,
    duration: 28,
    startAngle: 30,
    color: "#E50914",
    description: "Core UI frameworks, rendering engines, and styling architectures.",
  },
  {
    id: "backend",
    category: "AI & BACKEND",
    icon: Cpu,
    skills: ["Python", "FastAPI", "Flask", "OpenCV", "NetworkX", "Gemini AI"],
    radius: 125,
    duration: 38,
    startAngle: 200,
    color: "#A855F7",
    description: "Server-side logic, ML pipelines, and REST API infrastructure.",
  },
  {
    id: "database",
    category: "DATABASE",
    icon: Database,
    skills: ["MongoDB", "Firebase", "SQL"],
    radius: 168,
    duration: 48,
    startAngle: 100,
    color: "#FFD600",
    description: "Data persistence, NoSQL document stores, and auth services.",
  },
  {
    id: "design",
    category: "DESIGN & TOOLS",
    icon: Palette,
    skills: ["Figma", "Framer", "Webflow", "Canva"],
    radius: 208,
    duration: 58,
    startAngle: 310,
    color: "#3B82F6",
    description: "Visual design tools, prototyping, and no-code platforms.",
  },
  {
    id: "platforms",
    category: "PLATFORMS",
    icon: Cloud,
    skills: ["GitHub", "N8N", "Vercel", "Google Cloud"],
    radius: 248,
    duration: 68,
    startAngle: 160,
    color: "#22C55E",
    description: "Deployment, automation workflows, and cloud infrastructure.",
  },
];

const DESIGN_SIZE = 560;
const CENTER = DESIGN_SIZE / 2;

export default function Skills() {
  const [selectedOrbit, setSelectedOrbit] = useState<string | null>(null);
  const [hoveredOrbit, setHoveredOrbit] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const solarRef = useRef<HTMLDivElement>(null);

  // Scale the solar system to fit the responsive container
  useEffect(() => {
    const el = solarRef.current;
    if (!el) return;
    const updateScale = () => {
      setScale(el.clientWidth / DESIGN_SIZE);
    };
    updateScale();
    const ro = new ResizeObserver(() => updateScale());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const activeOrbitData = ORBITS.find(
    (o) => o.id === (selectedOrbit || hoveredOrbit)
  );
  const isPaused = selectedOrbit !== null;

  const handlePlanetClick = (id: string) => {
    setSelectedOrbit((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="skills"
      className="relative w-full pt-6 pb-24 px-6 md:px-16 border-t border-borderDark z-10 bg-background overflow-hidden select-none"
    >
      {/* Background Watermark */}
      <div className="absolute right-0 top-0 pointer-events-none select-none text-borderDark font-syne font-extrabold text-[12rem] md:text-[20rem] opacity-30 leading-none -translate-y-12 translate-x-12">
        STACK
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 flex items-center gap-2">
            <span className="font-mono text-sm tracking-widest text-mutedGray">
              05 //
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
              SYSTEM DIRECTORY
            </span>
          </div>

          <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-syne font-extrabold text-5xl md:text-7xl leading-none uppercase text-foreground tracking-tight">
              DEVELOPER STACK
            </h2>
            <div className="h-[2px] flex-grow bg-borderDark mx-4 mb-3 hidden md:block" />
            <span className="font-mono text-xs uppercase text-accent tracking-[0.2em] font-semibold shrink-0">
              SOLAR ARCHITECTURE
            </span>
          </div>
        </div>

        {/* Solar System + Right Panel side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT — Solar System */}
          <div className="flex flex-col items-center gap-6">
            <div
              ref={solarRef}
              className="w-full max-w-[520px] aspect-square relative"
            >
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: DESIGN_SIZE,
                height: DESIGN_SIZE,
                transform: `translate(-50%, -50%) scale(${scale})`,
                transformOrigin: "center center",
              }}
            >
              {/* Ambient sun glow */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 220,
                  height: 220,
                  top: CENTER - 110,
                  left: CENTER - 110,
                  background:
                    "radial-gradient(circle, rgba(229,9,20,0.1) 0%, rgba(229,9,20,0.02) 50%, transparent 70%)",
                }}
              />

              {/* Orbit rings */}
              {ORBITS.map((orbit) => (
                <div
                  key={`ring-${orbit.id}`}
                  className="absolute rounded-full pointer-events-none transition-all duration-500"
                  style={{
                    width: orbit.radius * 2,
                    height: orbit.radius * 2,
                    top: CENTER - orbit.radius,
                    left: CENTER - orbit.radius,
                    border: `1px ${
                      selectedOrbit === orbit.id ? "solid" : "dashed"
                    } ${
                      selectedOrbit === orbit.id
                        ? `${orbit.color}50`
                        : hoveredOrbit === orbit.id
                        ? `${orbit.color}30`
                        : "rgba(30,30,36,0.35)"
                    }`,
                  }}
                />
              ))}

              {/* Sun core */}
              <div
                className="absolute cursor-pointer z-20"
                style={{
                  top: CENTER,
                  left: CENTER,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setSelectedOrbit(null)}
              >
                {/* Outer pulse ring */}
                <div
                  className="absolute rounded-full border border-accent/15"
                  style={{
                    width: 88,
                    height: 88,
                    top: -12,
                    left: -12,
                    animation: "sun-pulse 3s ease-in-out infinite",
                  }}
                />
                {/* Second pulse ring */}
                <div
                  className="absolute rounded-full border border-accent/8"
                  style={{
                    width: 104,
                    height: 104,
                    top: -20,
                    left: -20,
                    animation: "sun-pulse 3s ease-in-out infinite 0.5s",
                  }}
                />
                {/* Sun body */}
                <div
                  className="w-16 h-16 rounded-full border-2 border-accent/50 flex flex-col items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: "#0a0a0d" }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(229,9,20,0.2) 0%, transparent 70%)",
                    }}
                  />
                  <span className="font-syne font-extrabold text-accent text-xs tracking-wider relative z-10">
                    DEV
                  </span>
                  <span className="font-mono text-[5px] text-mutedGray uppercase tracking-[0.3em] relative z-10">
                    STACK
                  </span>
                </div>
              </div>

              {/* Orbiting planets */}
              {ORBITS.map((orbit) => {
                const delay =
                  -(orbit.startAngle / 360) * orbit.duration;
                const isActive =
                  selectedOrbit === orbit.id ||
                  hoveredOrbit === orbit.id;
                const isDimmed =
                  selectedOrbit !== null &&
                  selectedOrbit !== orbit.id;

                return (
                  <div
                    key={orbit.id}
                    className="absolute z-10"
                    style={{
                      top: CENTER,
                      left: CENTER,
                      width: 0,
                      height: 0,
                      animation: `orbit-spin ${orbit.duration}s linear infinite`,
                      animationDelay: `${delay}s`,
                      animationPlayState: isPaused
                        ? "paused"
                        : "running",
                    }}
                  >
                    {/* Position offset to orbit radius */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transform: `translateX(${orbit.radius}px)`,
                      }}
                    >
                      {/* Counter-spin to keep content upright */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          animation: `orbit-counter-spin ${orbit.duration}s linear infinite`,
                          animationDelay: `${delay}s`,
                          animationPlayState: isPaused
                            ? "paused"
                            : "running",
                        }}
                      >
                        {/* Clickable planet wrapper */}
                        <div
                          className="cursor-pointer"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            transform: "translate(-50%, -50%)",
                          }}
                          onMouseEnter={() =>
                            setHoveredOrbit(orbit.id)
                          }
                          onMouseLeave={() =>
                            setHoveredOrbit(null)
                          }
                          onClick={() =>
                            handlePlanetClick(orbit.id)
                          }
                        >
                          {/* Enlarged hit area */}
                          <div
                            className="absolute"
                            style={{
                              width: 64,
                              height: 64,
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          />

                          {/* Planet body */}
                          <div
                            className="flex items-center justify-center transition-all duration-300 relative"
                            style={{
                              width: isActive ? 50 : 38,
                              height: isActive ? 50 : 38,
                              borderRadius: "50%",
                              border: `2px solid ${
                                isActive
                                  ? orbit.color
                                  : isDimmed
                                  ? "#151518"
                                  : "#1e1e24"
                              }`,
                              backgroundColor: "#08080a",
                              boxShadow: isActive
                                ? `0 0 16px ${orbit.color}35, 0 0 32px ${orbit.color}15`
                                : "none",
                              opacity: isDimmed ? 0.3 : 1,
                            }}
                          >
                            {/* Inner glow */}
                            {isActive && (
                              <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                  background: `radial-gradient(circle, ${orbit.color}20 0%, transparent 70%)`,
                                }}
                              />
                            )}
                            {/* Icon inside planet */}
                            <orbit.icon
                              className="relative z-10 transition-all duration-300"
                              style={{
                                width: isActive ? 18 : 13,
                                height: isActive ? 18 : 13,
                                color: isDimmed ? "#3f3f46" : orbit.color,
                                filter: isActive ? `drop-shadow(0 0 4px ${orbit.color}80)` : "none",
                              }}
                            />
                          </div>

                          {/* Category label below planet */}
                          <div
                            className="whitespace-nowrap font-mono uppercase tracking-widest text-center transition-all duration-300"
                            style={{
                              position: "absolute",
                              top: isActive ? 32 : 24,
                              left: "50%",
                              transform: "translateX(-50%)",
                              fontSize: 7,
                              color: isActive
                                ? "#ffffff"
                                : isDimmed
                                ? "#27272a"
                                : "#71717a",
                              fontWeight: isActive ? 700 : 500,
                            }}
                          >
                            {orbit.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>

            {/* Instruction */}
            <span className="font-mono text-[9px] text-mutedGray uppercase tracking-widest text-center">
              Click a planet to explore its stack &bull; Click the sun to reset
            </span>
          </div>

          {/* RIGHT — Details Panel (always visible) */}
          <div className="w-full h-full flex flex-col">
            <AnimatePresence mode="wait">
              {!activeOrbitData ? (
                /* Idle state */
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 border border-borderDark/40 bg-cardBg/20 flex flex-col items-center justify-center gap-6 p-10 min-h-[420px]"
                >
                  {/* Placeholder orbit rings decoration */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute w-24 h-24 rounded-full border border-dashed border-borderDark/50" style={{ animation: "orbit-spin 12s linear infinite" }} />
                    <div className="absolute w-16 h-16 rounded-full border border-dashed border-borderDark/30" style={{ animation: "orbit-spin 8s linear infinite reverse" }} />
                    <div className="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center" style={{ background: "radial-gradient(circle, rgba(229,9,20,0.12) 0%, transparent 70%)" }}>
                      <span className="font-syne font-extrabold text-accent text-[8px]">DEV</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="font-syne font-extrabold text-foreground/20 text-xl uppercase tracking-widest">
                      SELECT A PLANET
                    </span>
                    <span className="font-mono text-[9px] text-mutedGray/50 uppercase tracking-widest">
                      Click any orbiting planet to inspect its technology stack
                    </span>
                  </div>
                  {/* Legend */}
                  <div className="flex flex-col gap-2 w-full max-w-xs mt-4">
                    {ORBITS.map((o) => (
                      <div key={o.id} className="flex items-center gap-3 py-1.5 px-3 border border-borderDark/30 hover:border-borderDark/60 transition-colors cursor-pointer group" onClick={() => setSelectedOrbit(o.id)}>
                        <o.icon className="w-3 h-3 shrink-0 transition-colors duration-200" style={{ color: o.color }} />
                        <span className="font-mono text-[9px] text-mutedGray group-hover:text-foreground uppercase tracking-wider flex-1 transition-colors duration-200">{o.category}</span>
                        <span className="font-mono text-[8px] text-mutedGray/50">{o.skills.length} skills</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Active planet detail */
                <motion.div
                  key={activeOrbitData.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="flex-1 border bg-cardBg/30 overflow-hidden flex flex-col"
                  style={{ borderColor: `${activeOrbitData.color}30` }}
                >
                  {/* Header */}
                  <div
                    className="flex items-center justify-between px-6 py-4 border-b"
                    style={{ borderColor: `${activeOrbitData.color}20`, background: `${activeOrbitData.color}06` }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: activeOrbitData.color, boxShadow: `0 0 10px ${activeOrbitData.color}60` }}
                      />
                      <span className="font-syne font-extrabold text-base uppercase tracking-wider text-foreground">
                        {activeOrbitData.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[8px] text-mutedGray uppercase tracking-widest">
                        {activeOrbitData.skills.length} MODULES
                      </span>
                      <button
                        onClick={() => setSelectedOrbit(null)}
                        className="font-mono text-[9px] text-mutedGray hover:text-foreground uppercase tracking-widest transition-colors border border-borderDark hover:border-mutedGray px-2 py-0.5"
                      >
                        ✕ RESET
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-6 py-3 border-b border-borderDark/40">
                    <p className="font-mono text-[10px] text-mutedGray uppercase tracking-wider leading-relaxed">
                      {activeOrbitData.description}
                    </p>
                  </div>

                  {/* Skills list */}
                  <div className="flex flex-col flex-1 overflow-y-auto">
                    {activeOrbitData.skills.map((skill, idx) => {
                      const prof = PROFICIENCY[skill] || 70;
                      return (
                        <div key={skill} className="group/skill">
                          <div className="flex items-center justify-between px-6 py-3 hover:bg-cardBg/50 transition-colors duration-200">
                            <div className="flex items-center gap-4">
                              <span className="font-mono text-[8px] text-mutedGray/40 tabular-nums w-4 text-right select-none">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold">
                                {skill}
                              </span>
                            </div>
                            <span
                              className="font-mono text-[10px] tabular-nums font-bold"
                              style={{ color: activeOrbitData.color }}
                            >
                              {prof}%
                            </span>
                          </div>
                          <div className="h-[1px] bg-borderDark/20 relative mx-6 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${prof}%` }}
                              transition={{ duration: 0.9, delay: idx * 0.07, ease: [0.25, 1, 0.5, 1] }}
                              className="h-full"
                              style={{ backgroundColor: activeOrbitData.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer orbit legend */}
                  <div className="px-6 py-3 border-t border-borderDark/40 flex gap-3 flex-wrap">
                    {ORBITS.map((o) => (
                      <button
                        key={o.id}
                        onClick={() => setSelectedOrbit(o.id)}
                        className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-widest transition-all duration-200 hover:opacity-80"
                        style={{ opacity: o.id === activeOrbitData.id ? 1 : 0.3 }}
                      >
                        <o.icon className="w-2.5 h-2.5" style={{ color: o.color }} />
                        <span style={{ color: o.id === activeOrbitData.id ? o.color : undefined }}>{o.category}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              value: "23+",
              label: "TECHNOLOGIES",
              sublabel: "ACROSS STACK",
            },
            {
              value: "5",
              label: "ORBITS",
              sublabel: "FULL COVERAGE",
            },
            {
              value: "98%",
              label: "TOP PROFICIENCY",
              sublabel: "NEXT.JS",
            },
            {
              value: "3+",
              label: "YEARS",
              sublabel: "BUILDING",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-borderDark bg-cardBg p-6 flex flex-col gap-3 relative group transition-colors duration-300 hover:border-accent/60"
            >
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
              <span className="font-syne font-extrabold text-2xl md:text-3xl text-accent">
                {stat.value}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-foreground font-semibold">
                  {stat.label}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-wider text-mutedGray">
                  {stat.sublabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 border-b border-borderDark pb-2">
            <Award className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-mutedGray font-semibold">
              VERIFIED CREDENTIALS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificationsData.map((cert, index) => (
              <motion.div
                key={cert.title}
                whileHover={{ x: 6, borderColor: "#E50914" }}
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-borderDark bg-cardBg/40 p-6 hover:bg-cardBg relative group transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,9,20,0.03)]"
              >
                {/* Left accent bar */}
                <div className="absolute top-0 bottom-0 left-0 w-[2px] h-0 bg-accent transition-all duration-300 group-hover:h-full" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-borderDark bg-background flex items-center justify-center text-accent shrink-0 group-hover:border-accent transition-colors duration-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[8px] text-accent tracking-widest uppercase font-bold">
                      VERIFIED CREDENTIAL
                    </span>
                    <h4 className="font-syne font-extrabold text-foreground text-sm md:text-base uppercase tracking-tight">
                      {cert.title}
                    </h4>
                    <span className="font-mono text-[9px] text-mutedGray uppercase tracking-wider">
                      ISSUED BY: {cert.issuer} &bull;
                      CRED-ID: SKB-{index + 1}09{index}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 sm:mt-0 font-mono text-xs text-accent font-semibold ml-4 self-end sm:self-center">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{cert.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Orbital animation keyframes */}
      <style jsx global>{`
        @keyframes orbit-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbit-counter-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes sun-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.12);
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
}
