"use client";

import { motion } from "framer-motion";
import { Award, ChevronRight, Monitor, Brain, Database, Palette, Cloud, CheckCircle } from "lucide-react";
import { skillsData, certificationsData } from "@/lib/data";

const categoryIcons: Record<string, React.ReactNode> = {
  "FRONTEND": <Monitor className="w-4 h-4 text-accent" />,
  "AI & BACKEND": <Brain className="w-4 h-4 text-accent" />,
  "DATABASE": <Database className="w-4 h-4 text-accent" />,
  "DESIGN & TOOLS": <Palette className="w-4 h-4 text-accent" />,
  "PLATFORMS": <Cloud className="w-4 h-4 text-accent" />,
};

const categorySubtitles: Record<string, string> = {
  "FRONTEND": "CRAFTING HIGH-FIDELITY CLIENT INTERFACES",
  "AI & BACKEND": "BUILDING INTELLIGENT ANALYTICAL BACKENDS",
  "DATABASE": "DESIGNING STRUCTURED DATA ARCHITECTURES",
  "DESIGN & TOOLS": "PROTOTYPING RESPONSIVE UX PARADIGMS",
  "PLATFORMS": "DEPLOYING OPTIMIZED SERVER INFRASTRUCTURE",
};

const bentoSpans = [
  "col-span-12 md:col-span-7", // Frontend (large)
  "col-span-12 md:col-span-5", // AI & Backend (medium)
  "col-span-12 sm:col-span-6 md:col-span-4", // Database (small)
  "col-span-12 sm:col-span-6 md:col-span-4", // Design & Tools (small)
  "col-span-12 md:col-span-4", // Platforms (small)
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full py-24 px-6 md:px-16 border-t border-borderDark z-10 bg-background overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute right-0 top-0 pointer-events-none select-none text-borderDark font-syne font-extrabold text-[12rem] md:text-[18rem] opacity-35 leading-none -translate-y-12 translate-x-12">
        TECH
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 flex items-center gap-2">
            <span className="font-mono text-sm tracking-widest text-mutedGray">05 //</span>
            <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
              TOOLS OF THE TRADE
            </span>
          </div>

          <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-syne font-extrabold text-5xl md:text-7xl leading-none uppercase text-foreground tracking-tight">
              DEVELOPER STACK
            </h2>
            <div className="h-[2px] flex-grow bg-borderDark mx-4 mb-3 hidden md:block" />
            <span className="font-mono text-xs uppercase text-accent tracking-[0.2em] font-semibold shrink-0">
              MODERN WEB ENGINE
            </span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6 w-full">
          {skillsData.map((group, idx) => {
            const spanClass = bentoSpans[idx] || "col-span-12 md:col-span-4";
            
            return (
              <motion.div
                key={group.category}
                whileHover={{ scale: 1.01, borderColor: "#E50914" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`${spanClass} border border-borderDark bg-cardBg/40 hover:bg-cardBg p-6 md:p-8 flex flex-col justify-between gap-6 relative group transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,9,20,0.06)]`}
              >
                {/* Accent line top-right */}
                <div className="absolute top-0 right-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
                
                {/* Header */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      {categoryIcons[group.category] || <Monitor className="w-4 h-4 text-accent" />}
                      <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                        {group.category}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-mutedGray group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                  <span className="font-mono text-[9px] text-mutedGray uppercase tracking-wider">
                    {categorySubtitles[group.category] || ""}
                  </span>
                </div>

                {/* Skills wrap */}
                <div className="flex flex-wrap gap-2.5 pt-6">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 font-mono text-[10px] md:text-xs uppercase tracking-wider bg-background border border-borderDark text-foreground hover:bg-accent hover:border-accent hover:text-background hover:-translate-y-[2px] transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications Sub-Section */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-8 border-b border-borderDark pb-2">
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
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-borderDark bg-cardBg/30 p-6 hover:bg-cardBg relative group transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,9,20,0.04)]"
              >
                {/* Accent border line left */}
                <div className="absolute top-0 bottom-0 left-0 w-[2px] h-0 bg-accent transition-all duration-300 group-hover:h-full" />
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-borderDark bg-background flex items-center justify-center text-accent shrink-0 group-hover:border-accent transition-colors duration-300">
                    <Award className="w-5 h-5" />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[8px] text-accent tracking-widest uppercase font-bold">VERIFIED CREDENTIAL</span>
                    <h4 className="font-syne font-extrabold text-foreground text-sm md:text-base uppercase tracking-tight">
                      {cert.title}
                    </h4>
                    <span className="font-mono text-[9px] text-mutedGray uppercase tracking-wider">
                      ISSUED BY: {cert.issuer} &bull; CRED-ID: SKB-{index + 1}09{index}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4 sm:mt-0 font-mono text-xs text-accent font-semibold ml-4 self-end sm:self-center">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{cert.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
