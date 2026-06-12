"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, FileText } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Three.js Interactive Particle Grid Effect
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;
    
    // Check if mobile for performance
    if (window.innerWidth < 768) {
      return;
    }

    // Dynamic import of Three.js to prevent SSR issues
    let THREE: typeof import("three");
    let renderer: import("three").WebGLRenderer;
    let scene: import("three").Scene;
    let camera: import("three").OrthographicCamera;
    let particles: import("three").Points;
    let animationId: number;

    const initThree = async () => {
      THREE = await import("three");
      
      const canvas = canvasRef.current!;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.OrthographicCamera(
        -width / 2,
        width / 2,
        height / 2,
        -height / 2,
        1,
        1000
      );
      camera.position.z = 500;

      // Renderer
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Particle Grid Setup
      const dotsX = 60;
      const dotsY = 35;
      const gapX = width / (dotsX - 1);
      const gapY = height / (dotsY - 1);

      const numParticles = dotsX * dotsY;
      const positions = new Float32Array(numParticles * 3);
      const initialPositions = new Float32Array(numParticles * 3);
      const velocities = new Float32Array(numParticles * 3);

      let idx = 0;
      for (let y = 0; y < dotsY; y++) {
        const posY = -height / 2 + y * gapY;
        for (let x = 0; x < dotsX; x++) {
          const posX = -width / 2 + x * gapX;
          
          positions[idx * 3] = posX;
          positions[idx * 3 + 1] = posY;
          positions[idx * 3 + 2] = 0;

          initialPositions[idx * 3] = posX;
          initialPositions[idx * 3 + 1] = posY;
          initialPositions[idx * 3 + 2] = 0;

          velocities[idx * 3] = 0;
          velocities[idx * 3 + 1] = 0;
          velocities[idx * 3 + 2] = 0;

          idx++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      // Draw custom circles for particles
      const canvasSprite = document.createElement("canvas");
      canvasSprite.width = 16;
      canvasSprite.height = 16;
      const ctxSprite = canvasSprite.getContext("2d");
      if (ctxSprite) {
        ctxSprite.beginPath();
        ctxSprite.arc(8, 8, 5, 0, Math.PI * 2);
        ctxSprite.fillStyle = "#E50914";
        ctxSprite.fill();
      }
      const texture = new THREE.CanvasTexture(canvasSprite);

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 8,
        map: texture,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Mouse tracking in Three.js coordinates
      const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };

      const onMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const rawX = event.clientX - rect.left;
        const rawY = event.clientY - rect.top;

        mouse.targetX = rawX - width / 2;
        mouse.targetY = -(rawY - height / 2);
      };

      const onMouseLeave = () => {
        mouse.targetX = -9999;
        mouse.targetY = -9999;
      };

      window.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseleave", onMouseLeave);

      // Resize listener
      const onResize = () => {
        if (!canvasRef.current) return;
        const newW = canvasRef.current.clientWidth;
        const newH = canvasRef.current.clientHeight;

        camera.left = -newW / 2;
        camera.right = newW / 2;
        camera.top = newH / 2;
        camera.bottom = -newH / 2;
        camera.updateProjectionMatrix();

        renderer.setSize(newW, newH, false);
      };
      window.addEventListener("resize", onResize);

      // Physics/Animation Loop
      const animate = () => {
        animationId = requestAnimationFrame(animate);

        // Smooth mouse coords
        if (mouse.targetX !== -9999) {
          if (mouse.x === -9999) {
            mouse.x = mouse.targetX;
            mouse.y = mouse.targetY;
          } else {
            mouse.x += (mouse.targetX - mouse.x) * 0.15;
            mouse.y += (mouse.targetY - mouse.y) * 0.15;
          }
        } else {
          mouse.x = -9999;
          mouse.y = -9999;
        }

        const posAttr = geometry.attributes.position;
        const positionsArr = posAttr.array as Float32Array;

        const warpRadius = 90;
        const warpForce = 0.45;
        const springForce = 0.08;
        const damping = 0.85;

        for (let i = 0; i < numParticles; i++) {
          const px = positionsArr[i * 3];
          const py = positionsArr[i * 3 + 1];

          const homeX = initialPositions[i * 3];
          const homeY = initialPositions[i * 3 + 1];

          let vx = velocities[i * 3];
          let vy = velocities[i * 3 + 1];

          // Home force (spring)
          const homeDx = homeX - px;
          const homeDy = homeY - py;
          vx += homeDx * springForce;
          vy += homeDy * springForce;

          // Mouse warp force (repulsion)
          if (mouse.x !== -9999) {
            const mdx = px - mouse.x;
            const mdy = py - mouse.y;
            const dist = Math.sqrt(mdx * mdx + mdy * mdy);

            if (dist < warpRadius) {
              const push = (1 - dist / warpRadius) * warpForce;
              // Repulse away from cursor
              const angle = Math.atan2(mdy, mdx);
              vx += Math.cos(angle) * push * 12;
              vy += Math.sin(angle) * push * 12;
            }
          }

          // Apply velocity and damping
          vx *= damping;
          vy *= damping;

          positionsArr[i * 3] += vx;
          positionsArr[i * 3 + 1] += vy;

          velocities[i * 3] = vx;
          velocities[i * 3 + 1] = vy;
        }

        posAttr.needsUpdate = true;
        renderer.render(scene, camera);
      };

      animate();

      // Clean up closure variables
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        if (canvas) canvas.removeEventListener("mouseleave", onMouseLeave);
        cancelAnimationFrame(animationId);
        renderer.dispose();
      };
    };

    let cleanupFn: (() => void) | undefined;
    initThree().then((cleanup) => {
      cleanupFn = cleanup;
    });

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, []);

  // GSAP staggered loading reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Delay to align with PageTransition fadeout
      tl.delay(0.8);

      tl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );

      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between items-start px-6 md:px-16 py-12 select-none overflow-hidden"
    >
      {/* Three.js interactive canvas in the background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
      />

      {/* Top spacing / Header spacer */}
      <div className="w-full flex justify-between items-center z-10">
        <span className="mono-label tracking-[0.25em] text-accent font-semibold">
          SARATH KUMAR BHASA
        </span>
        <span className="mono-label text-mutedGray">PORTFOLIO &copy; 2026</span>
      </div>

      {/* Hero center copy */}
      <div className="w-full flex flex-col items-start z-10 my-auto pt-20 pb-10">
        <h1 className="text-huge font-syne font-extrabold tracking-tight select-none uppercase mb-6 flex flex-col leading-none">
          <span ref={titleLine1Ref} className="text-stroke block">
            SARATH
          </span>
          <span ref={titleLine2Ref} className="text-foreground block">
            KUMAR
          </span>
        </h1>

        <div ref={subtitleRef} className="mb-10 max-w-xl">
          <p className="font-mono text-base md:text-lg tracking-wide text-mutedGray uppercase">
            Frontend Developer <span className="text-accent">&middot;</span> UI/UX Designer <span className="text-accent">&middot;</span> AI/ML Student
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="#projects"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-accent text-background font-mono text-sm uppercase tracking-wider font-semibold border border-accent hover:bg-transparent hover:text-accent transition-colors duration-300 group"
          >
            View Work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <a
            href="/Sarath Kumar Bhasa.docx"
            target="_blank"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-foreground font-mono text-sm uppercase tracking-wider border border-borderDark hover:border-accent hover:text-accent transition-colors duration-300"
          >
            Download CV
            <FileText className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Scroll indicator footer */}
      <div ref={scrollRef} className="w-full flex justify-between items-end z-10">
        <span className="mono-label text-mutedGray max-w-xs leading-relaxed hidden md:block">
          Focused on building high-performance, visually gorgeous web products.
        </span>
        
        {/* Animated scrolling indicator */}
        <a
          href="#about"
          className="flex flex-col items-center gap-4 group cursor-pointer mx-auto md:mx-0"
        >
          <span className="mono-label group-hover:text-accent transition-colors">
            Scroll down
          </span>
          <div className="w-[1px] h-16 bg-borderDark relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-pulse rounded-full" style={{
              animation: 'scrollIndicator 2s cubic-bezier(0.76, 0, 0.24, 1) infinite'
            }} />
          </div>
        </a>
      </div>

      {/* Custom pulse keyframe injected locally */}
      <style jsx global>{`
        @keyframes scrollIndicator {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </section>
  );
}
