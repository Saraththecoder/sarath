import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Sarath Kumar Bhasa | Frontend Developer & UI/UX Designer",
  description: "Awwwards-worthy portfolio of Sarath Kumar Bhasa — a frontend developer, UI/UX designer, and AI/ML student from Tirupati, India. Focused on dark brutalist luxury craft.",
  keywords: [
    "Sarath Kumar Bhasa",
    "Frontend Developer",
    "UI/UX Designer",
    "AI/ML Student",
    "Tirupati Portfolio",
    "Brutalist Website",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Sarath Kumar Bhasa" }],
  openGraph: {
    title: "Sarath Kumar Bhasa | Frontend Developer & UI/UX Designer",
    description: "Personal portfolio focusing on high-performance, visually gorgeous web products.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased relative min-h-screen bg-background text-foreground font-mono">
        {/* Background Grid Texture */}
        <div className="grid-bg" />

        {/* Global Grain/Noise Overlay */}
        <div className="grain-overlay" />

        {/* Custom cursor follower */}
        <CustomCursor />

        {/* Swipe animation on load */}
        <PageTransition />

        {/* Lenis global smooth scroll */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
