"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Terminal, Users, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

// Count-up helper component that animates when entering the viewport
function Counter({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const duration = 1500; // ms

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            setCount(easeProgress * value);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={elementRef} className="font-syne font-extrabold text-3xl md:text-5xl text-accent">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

type TabType = "developer" | "student" | "leader";

export default function About() {
  const [activeTab, setActiveTab] = useState<TabType>("developer");
  const [imageError, setImageError] = useState(false);

  const tabContent = {
    developer: {
      title: "Frontend Developer",
      icon: <Terminal className="w-5 h-5" />,
      bio: "Obsessed with creating responsive, fluid, and pixel-perfect web interfaces. I design using clean modular structures, smooth custom animations, and bold brutalist print typography. My goal is to build award-winning visual layouts.",
      bullets: [
        "Specializes in Next.js, React, TypeScript & Tailwind CSS",
        "Expertise in interactive layouts using GSAP, Lenis, and Framer Motion",
        "Dedicated to performance optimization and accessibility standards"
      ]
    },
    student: {
      title: "AI & ML Specialist",
      icon: <BookOpen className="w-5 h-5" />,
      bio: "Currently pursuing a Bachelor of Technology in Artificial Intelligence and Machine Learning at AITS Tirupati. I maintain a 9.03 CGPA and love bridging complex machine learning engines with polished user interfaces.",
      bullets: [
        "Maintains a high academic standing with a 9.03 CGPA",
        "Proficient in Python, Data Structures, and Core ML Frameworks",
        "Passionate about applying AI concepts to enhance web UX"
      ]
    },
    leader: {
      title: "Google Ambassador",
      icon: <Users className="w-5 h-5" />,
      bio: "Serving as a Google Student Ambassador 2026. Actively empowering the developer community by speaking at, organizing, and leading web dev bootcamps and contributing to open-source programs like GSSoC.",
      bullets: [
        "Leads community developer initiatives as Google Ambassador",
        "Contributes actively to open-source software (GirlScript SOC)",
        "Mentored and trained 200+ students in web development"
      ]
    }
  };

  return (
    <section
      id="about"
      className="relative w-full py-24 px-6 md:px-16 border-t border-borderDark z-10 bg-background overflow-hidden"
    >
      {/* Editorial Watermark */}
      <div className="absolute right-0 bottom-0 pointer-events-none select-none text-borderDark font-syne font-extrabold text-[12rem] md:text-[20rem] opacity-30 leading-none translate-y-12 translate-x-12">
        ABOUT
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-20 relative z-10">
        
        {/* Top Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 flex items-center gap-2">
            <span className="font-mono text-sm tracking-widest text-mutedGray">02 //</span>
            <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
              IDENTITY
            </span>
          </div>

          <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-syne font-extrabold text-5xl md:text-7xl leading-none uppercase text-foreground tracking-tight">
              WHO I AM
            </h2>
            <div className="h-[2px] flex-grow bg-borderDark mx-4 mb-3 hidden md:block" />
            <span className="font-mono text-xs uppercase text-accent tracking-[0.2em] font-semibold shrink-0">
              SARATH KUMAR BHASA
            </span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-[340px] aspect-[3/4] select-none">
              
              {/* Decorative Accent Borders */}
              <div className="absolute inset-0 border border-borderDark translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500 ease-out z-0" />
              <div className="absolute inset-0 border border-accent -translate-x-2 -translate-y-2 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform duration-500 ease-out z-0" />
              
              {/* Photo Frame Container */}
              <div className="w-full h-full bg-cardBg border border-borderDark overflow-hidden relative z-10 p-2">
                <div className="w-full h-full relative overflow-hidden bg-background">
                  {!imageError ? (
                    <Image
                      src="/sarath.jpg"
                      alt="Sarath Kumar Bhasa"
                      fill
                      priority
                      sizes="(max-width: 768px) 340px, 340px"
                      className="object-cover grayscale hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-700 ease-out"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cardBg via-background to-borderDark flex flex-col justify-between p-6">
                      <span className="font-mono text-2xl font-bold text-accent">SKB</span>
                      <div className="flex flex-col gap-2">
                        <span className="font-mono text-xs text-mutedGray tracking-wider">
                          PHOTO PLACEHOLDER
                        </span>
                        <span className="font-mono text-[10px] text-mutedGray">
                          Please place photo at /public/sarath.jpg
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Pulsing Status Badge */}
                  <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1.5 border border-borderDark flex items-center gap-2.5 z-20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-foreground font-semibold">
                      Online // Tirupati, IN
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Bio details + Interactive Tabs */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Top Introductory statement */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                BRIEF STATEMENT
              </span>
              <p className="font-mono text-lg md:text-xl text-foreground font-medium uppercase tracking-wide leading-snug">
                I bridge the gap between high-level machine learning engines and polished, pixel-perfect frontend experiences.
              </p>
            </div>

            {/* Interactive Tab bar */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2 border-b border-borderDark pb-2">
                {(Object.keys(tabContent) as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 relative border ${
                      activeTab === tab
                        ? "bg-accent border-accent text-background font-semibold"
                        : "border-borderDark hover:border-accent/60 text-mutedGray hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Animating tab content container */}
              <div className="min-h-[180px] bg-cardBg border border-borderDark p-6 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-2 text-accent font-semibold">
                      {tabContent[activeTab].icon}
                      <h3 className="font-syne font-extrabold text-sm uppercase tracking-wider">
                        {tabContent[activeTab].title}
                      </h3>
                    </div>

                    <p className="font-mono text-xs uppercase tracking-wider text-mutedGray leading-relaxed">
                      {tabContent[activeTab].bio}
                    </p>

                    <ul className="flex flex-col gap-2.5 mt-2">
                      {tabContent[activeTab].bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground font-mono uppercase tracking-wide">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* Stats Section with Progress indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          
          {/* Card 1 */}
          <div className="border border-borderDark bg-cardBg p-8 flex flex-col justify-between gap-6 relative group transition-colors duration-300 hover:border-accent/60">
            <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
            <div className="flex justify-between items-start">
              <Counter value={9.03} decimals={2} />
              <Award className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                CGPA (AITS Tirupati)
              </h4>
              <p className="font-mono text-[9px] text-mutedGray tracking-wider uppercase mt-1">ACADEMIC PERFORMANCE</p>
              
              {/* Progress gauge */}
              <div className="w-full h-1.5 bg-borderDark mt-4 overflow-hidden relative">
                <div 
                  className="h-full bg-accent transition-all duration-1000 ease-out origin-left scale-x-0 group-hover:scale-x-100" 
                  style={{ width: "90.3%" }} 
                />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-borderDark bg-cardBg p-8 flex flex-col justify-between gap-6 relative group transition-colors duration-300 hover:border-accent/60">
            <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
            <div className="flex justify-between items-start">
              <Counter value={2} decimals={0} />
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                HACKATHON FINALIST
              </h4>
              <p className="font-mono text-[9px] text-mutedGray tracking-wider uppercase mt-1">BUILT UNDER PRESSURE</p>
              
              {/* Progress gauge */}
              <div className="w-full h-1.5 bg-borderDark mt-4 overflow-hidden relative">
                <div 
                  className="h-full bg-accent transition-all duration-1000 ease-out origin-left scale-x-0 group-hover:scale-x-100" 
                  style={{ width: "66%" }} 
                />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-borderDark bg-cardBg p-8 flex flex-col justify-between gap-6 relative group transition-colors duration-300 hover:border-accent/60">
            <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
            <div className="flex justify-between items-start">
              <Counter value={2026} decimals={0} />
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                GOOGLE AMBASSADOR
              </h4>
              <p className="font-mono text-[9px] text-mutedGray tracking-wider uppercase mt-1">LEADERSHIP COHORT</p>
              
              {/* Progress gauge */}
              <div className="w-full h-1.5 bg-borderDark mt-4 overflow-hidden relative">
                <div 
                  className="h-full bg-accent transition-all duration-1000 ease-out origin-left scale-x-0 group-hover:scale-x-100" 
                  style={{ width: "100%" }} 
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
