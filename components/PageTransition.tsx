"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PageTransition() {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Lock scroll during entrance animation
    document.documentElement.classList.add("lenis-stopped");
    
    const timer = setTimeout(() => {
      document.documentElement.classList.remove("lenis-stopped");
      setIsCompleted(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, []);

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: "100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed inset-0 bg-background w-full h-full z-[99999] pointer-events-none ${isCompleted ? 'hidden' : ''}`}
      style={{ willChange: "transform" }}
    />
  );
}
