"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Cpu } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "@/lib/data";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Magnetic Button Wrapper for elements
function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      const magneticRadius = 80;

      if (distance < magneticRadius) {
        setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}

// Accent style maps
const projectAccentColors = {
  "aits-canteen": "hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(229,9,20,0.15)] border-t-red-500/20",
  "fitstreak": "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] border-t-emerald-500/20",
  "mantra": "hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] border-t-violet-500/20",
  "fraudshield-ai": "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] border-t-blue-500/20",
  "sakhi": "hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] border-t-pink-500/20",
} as const;

const projectAccentTexts = {
  "aits-canteen": "text-red-500",
  "fitstreak": "text-emerald-500",
  "mantra": "text-violet-500",
  "fraudshield-ai": "text-blue-500",
  "sakhi": "text-pink-500",
} as const;

const projectAccentBgs = {
  "aits-canteen": "bg-red-500/10 border-red-500/20 text-red-400",
  "fitstreak": "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  "mantra": "bg-violet-500/10 border-violet-500/20 text-violet-400",
  "fraudshield-ai": "bg-blue-500/10 border-blue-500/20 text-blue-400",
  "sakhi": "bg-pink-500/10 border-pink-500/20 text-pink-400",
} as const;

// Sprocket pattern configuration (35mm film edge sprockets)
const sprocketStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='12' viewBox='0 0 24 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='6' y='2' width='12' height='8' rx='1.5' fill='%231E1E24'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat-x",
  backgroundSize: "24px 12px",
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Render high-fidelity custom visual widget for each project theme
  const renderProjectVisual = (id: string, isHovered: boolean) => {
    switch (id) {
      case "aits-canteen":
        return (
          <div className="relative w-full h-full flex flex-col justify-center items-center p-6 bg-zinc-950/80">
            {/* Scanning red laser line */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-red-500 shadow-[0_0_10px_#ef4444] z-10 pointer-events-none"
            />
            {/* Mock Dashboard HUD */}
            <div className="w-full max-w-[280px] border border-red-500/20 bg-black/60 rounded p-4 font-mono text-[10px] text-red-500/80 relative overflow-hidden">
              <div className="flex justify-between border-b border-red-500/20 pb-2 mb-2">
                <span>CANTEEN_SYSTEM_v1.0</span>
                <span className="animate-pulse">● LIVE</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span>ORDER #104</span>
                  <span className="text-emerald-400 font-bold">PREPARING</span>
                </div>
                <div className="flex justify-between">
                  <span>ORDER #103</span>
                  <span className="text-zinc-500">COMPLETED</span>
                </div>
                <div className="flex justify-between">
                  <span>REVENUE TODAY</span>
                  <span className="text-red-400 font-bold">$1,240.50</span>
                </div>
              </div>
              
              {/* Payment scan animation */}
              <div className="mt-4 pt-3 border-t border-red-500/20 flex items-center justify-between">
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 flex items-center justify-center rounded">
                  {/* Mock QR grid */}
                  <div className="grid grid-cols-4 gap-[2px] w-8 h-8 opacity-60">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 ${i % 3 === 0 || i % 5 === 1 ? 'bg-red-500' : 'bg-transparent'}`} />
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[8px] text-zinc-500">SCAN &amp; PAY</span>
                  <span className="text-[10px] text-emerald-400 font-bold">UPI / QR</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "fitstreak":
        return (
          <div className="relative w-full h-full flex items-center justify-center p-6 bg-zinc-950/80">
            <div className="relative flex flex-col items-center justify-center">
              {/* Pulsing ring */}
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="48"
                  className="stroke-zinc-900"
                  strokeWidth="5"
                  fill="transparent"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="48"
                  className="stroke-emerald-500"
                  strokeWidth="5"
                  fill="transparent"
                  strokeDasharray="301"
                  animate={{ strokeDashoffset: [301, 80, 301] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
              </svg>
              
              {/* Center status */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <motion.span 
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="text-2xl"
                  >
                    🔥
                  </motion.span>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold">14 DAYS</span>
                </div>
              </div>

              {/* Floating indicators */}
              <motion.div 
                animate={{ y: isHovered ? -5 : 0 }}
                className="absolute -top-2 -right-6 bg-zinc-900 border border-emerald-500/20 px-2 py-0.5 rounded text-[8px] font-mono text-emerald-400/90 shadow-lg"
              >
                ❤️ 74 BPM
              </motion.div>
              <motion.div 
                animate={{ y: isHovered ? 5 : 0 }}
                className="absolute -bottom-2 -left-6 bg-zinc-900 border border-emerald-500/20 px-2 py-0.5 rounded text-[8px] font-mono text-emerald-400/90 shadow-lg"
              >
                ⚡ 640 KCAL
              </motion.div>
            </div>
          </div>
        );
      case "mantra":
        return (
          <div className="relative w-full h-full flex items-center justify-center p-6 bg-zinc-950/80 overflow-hidden">
            {/* Audio Waveform columns */}
            <div className="w-full max-w-[220px] flex items-center justify-between gap-1 h-20">
              {Array.from({ length: 14 }).map((_, i) => {
                const heights = [20, 60, 40, 80, 50, 90, 30, 75, 45, 95, 35, 70, 55, 85];
                return (
                  <motion.div
                    key={i}
                    className="w-1.5 rounded-full bg-gradient-to-t from-violet-600 to-fuchsia-400"
                    animate={{
                      height: isHovered 
                        ? [heights[i] * 0.3, heights[i], heights[i] * 0.3] 
                        : [heights[i] * 0.5, heights[i] * 0.8, heights[i] * 0.5]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.7 + (i % 3) * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}
            </div>
            {/* Floating wellness bubbles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-violet-400/20"
                  style={{
                    left: `${20 + i * 18}%`,
                    bottom: "10%",
                  }}
                  animate={{
                    y: ["0px", "-90px"],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5 + i * 0.4,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </div>
        );
      case "fraudshield-ai":
        return (
          <div className="relative w-full h-full flex items-center justify-center p-6 bg-zinc-950/80 overflow-hidden">
            {/* Cybersecurity node topology graph */}
            <svg className="w-full h-full absolute inset-0 z-0">
              <line
                x1="50%" y1="25%" x2="30%" y2="55%"
                stroke="rgba(59, 130, 246, 0.25)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="50%" y1="25%" x2="70%" y2="55%"
                stroke="rgba(59, 130, 246, 0.25)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="30%" y1="55%" x2="50%" y2="78%"
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="1"
              />
              <line
                x1="70%" y1="55%" x2="50%" y2="78%"
                stroke="rgba(239, 68, 68, 0.4)" 
                strokeWidth="1.2"
              />
            </svg>

            <div className="relative w-full h-full flex items-center justify-center">
              {/* Server Central Node */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-[18%] left-[45%] w-8 h-8 rounded-full bg-blue-950 border border-blue-500 flex items-center justify-center z-10"
              >
                <Cpu className="w-4 h-4 text-blue-400" />
              </motion.div>

              {/* Secure Node A */}
              <div className="absolute top-[50%] left-[25%] w-5 h-5 rounded-full bg-zinc-900 border border-blue-500/50 flex items-center justify-center z-10" />

              {/* Suspicious Node B */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], borderColor: ["#3b82f6", "#ef4444", "#3b82f6"] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute top-[50%] left-[65%] w-5 h-5 rounded-full bg-red-950/20 border border-red-500 flex items-center justify-center z-10"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              </motion.div>

              {/* Database Node */}
              <div className="absolute top-[72%] left-[45%] w-6 h-6 rounded-full bg-zinc-900 border border-blue-500/50 flex items-center justify-center z-10" />

              {/* Alert terminal HUD overlay */}
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0.8, y: isHovered ? -3 : 0 }}
                className="absolute bottom-4 left-4 right-4 bg-zinc-950/95 border border-red-500/30 p-2 rounded text-[8px] font-mono text-red-400 shadow-xl"
              >
                <div className="font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  FRAUD TRAVERSAL DETECTED
                </div>
                <div className="text-zinc-500 mt-0.5 uppercase">Threat Traverse ID: NODE_03</div>
              </motion.div>
            </div>
          </div>
        );
      case "sakhi":
        return (
          <div className="relative w-full h-full flex flex-col justify-center items-center p-6 bg-zinc-950/80 overflow-hidden">
            {/* WhatsApp convo simulator */}
            <div className="w-full max-w-[240px] space-y-2.5 font-mono text-[9px] relative z-10">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-zinc-900 border border-pink-500/20 text-pink-400/80 p-2 rounded-xl rounded-tl-none max-w-[85%] shadow-md">
                  &quot;Tips for daily iron intake?&quot;
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-end"
              >
                <div className="bg-pink-950/20 border border-pink-500/30 text-pink-300 p-2 rounded-xl rounded-tr-none max-w-[85%] shadow-md">
                  <span className="font-bold block text-pink-400 text-[8px] mb-0.5">🌸 SAKHI AI:</span>
                  &quot;Add spinach to meals. Keep tracking metrics!&quot;
                </div>
              </motion.div>
            </div>
            
            {/* Soft pink ambient background glow */}
            <motion.div 
              animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.15, 0.08] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute w-36 h-36 rounded-full border border-pink-500/35 blur-xl pointer-events-none"
            />
          </div>
        );
      default:
        return null;
    }
  };

  // GSAP desktop pin scroll Trigger
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getScrollWidth = () => {
        return trackRef.current ? trackRef.current.scrollWidth - window.innerWidth : 0;
      };

      const animation = gsap.to(trackRef.current, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        },
      });

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Mobile horizontal swipe progress updates
  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll > 0) {
      setProgress(scrollLeft / maxScroll);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full lg:h-screen bg-background border-t border-borderDark z-10 flex flex-col justify-between py-10 lg:py-16 overflow-hidden"
    >
      {/* Section Header HUD */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm tracking-widest text-mutedGray">03 //</span>
          <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
            SELECTED WORK
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-mutedGray">
          <span>SCROLL TO RIDE FILM</span>
          <Play className="w-3 h-3 animate-pulse text-accent" />
        </div>
      </div>

      {/* Cinematic Horizontal Scroller */}
      <div 
        className="w-full overflow-x-auto lg:overflow-hidden scrollbar-none my-6 lg:my-0" 
        onScroll={handleMobileScroll}
      >
        <div
          ref={trackRef}
          className="flex flex-row items-center gap-8 lg:gap-20 py-10 lg:py-16 px-6 lg:px-[15vw] relative w-max"
        >
          {/* Top Film Sprocket Line */}
          <div
            className="absolute top-0 left-0 right-0 h-3 bg-zinc-950 border-b border-borderDark/30 z-10"
            style={sprocketStyle}
          />
          
          {/* Loop over Projects */}
          {projectsData.map((project, idx) => {
            const isHovered = hoveredIdx === idx;
            const accentBorderClass = projectAccentColors[project.id as keyof typeof projectAccentColors] || "";
            const accentTextClass = projectAccentTexts[project.id as keyof typeof projectAccentTexts] || "";
            const accentBgClass = projectAccentBgs[project.id as keyof typeof projectAccentBgs] || "";

            return (
              <div
                key={project.id}
                className={`project-card w-[80vw] lg:w-[70vw] max-w-[850px] h-[55vh] lg:h-[48vh] flex-shrink-0 flex flex-col lg:flex-row border border-borderDark lg:border-x lg:border-y-0 bg-cardBg relative overflow-hidden snap-center rounded-xl lg:rounded-none transition-all duration-500 ease-out ${accentBorderClass}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Left Side: Custom Animated Graphics Widget */}
                <div className="w-full h-[45%] lg:w-1/2 lg:h-full bg-zinc-950 relative flex items-center justify-center border-b lg:border-b-0 lg:border-r border-borderDark/40 overflow-hidden">
                  {/* Film metadata details */}
                  <div className="absolute top-2.5 left-3 font-mono text-[8px] text-mutedGray/70 tracking-wider z-10 select-none">
                    EXP {project.number} / ISO 400
                  </div>
                  <div className="absolute top-2.5 right-3 font-mono text-[8px] text-mutedGray/70 tracking-wider z-10 select-none">
                    F/2.8 24MM
                  </div>
                  
                  {renderProjectVisual(project.id, isHovered)}
                </div>

                {/* Right Side: Details & Action links */}
                <div className="w-full h-[55%] lg:w-1/2 lg:h-full p-6 lg:p-8 flex flex-col justify-between bg-[#0B0B0E] relative">
                  {/* Kodak logo label */}
                  <div className="absolute top-2.5 right-4 font-mono text-[8px] text-mutedGray/50 select-none">
                    KODAK PORTRA 400
                  </div>
                  
                  <div>
                    {/* Role / Tech Main category */}
                    <span className={`font-mono text-[10px] tracking-widest uppercase block mb-2 font-semibold ${accentTextClass}`}>
                      {project.tech[0]} SYSTEM
                    </span>
                    
                    {/* Project Title */}
                    <h3 className="font-syne font-extrabold text-2xl lg:text-3.5xl uppercase tracking-tight text-foreground mb-3 leading-none group-hover:translate-x-1 transition-transform duration-300">
                      {project.name}
                    </h3>
                    
                    {/* Description text */}
                    <p className="font-mono text-xs text-mutedGray uppercase tracking-wider leading-relaxed mb-4 max-w-md line-clamp-3 lg:line-clamp-none">
                      {project.description}
                    </p>
                  </div>

                  {/* Badges + Link CTA */}
                  <div className="space-y-4">
                    {/* Tech tag list */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider border rounded-sm font-medium transition-colors duration-300 ${accentBgClass}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between border-t border-borderDark/40 pt-4">
                      <span className="font-mono text-[10px] text-mutedGray/80">REEL FRAME {project.number}</span>
                      
                      <MagneticButton>
                        <a
                          href={project.link}
                          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-borderDark bg-background hover:bg-foreground hover:text-background transition-all duration-300 group/btn"
                        >
                          <span className="font-mono text-[9px] tracking-wider uppercase font-bold">VIEW CASE</span>
                          <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Bottom Film Sprocket Line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-3 bg-zinc-950 border-t border-borderDark/30 z-10"
            style={sprocketStyle}
          />
        </div>
      </div>

      {/* Unified Progress HUD */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between gap-6 z-20">
        <span className="font-mono text-xs text-mutedGray">
          {projectsData[0]?.number || "01"}
        </span>
        <div className="h-[2px] flex-grow bg-zinc-900 relative rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="font-mono text-xs text-mutedGray">
          {projectsData[projectsData.length - 1]?.number || "05"}
        </span>
      </div>
    </section>
  );
}
