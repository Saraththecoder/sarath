export interface Project {
  id: string;
  number: string;
  name: string;
  description: string;
  tech: string[];
  link: string;
}

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  org: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

export const projectsData: Project[] = [
  {
    id: "aits-canteen",
    number: "01",
    name: "AITS CANTEEN",
    description: "Full-stack college canteen ordering platform with AI-powered admin dashboard, real-time orders, UPI/QR payments, and Google authentication.",
    tech: ["React", "TypeScript", "Firebase", "Gemini AI"],
    link: "#",
  },
  {
    id: "fitstreak",
    number: "02",
    name: "FITSTREAK",
    description: "Social fitness tracking application featuring a gamified streak system, friend feeds, and a mobile-first responsive layout.",
    tech: ["Next.js 14", "MongoDB", "NextAuth.js", "Tailwind CSS"],
    link: "#",
  },
  {
    id: "mantra",
    number: "03",
    name: "MANTRA",
    description: "Mood-based music & wellness platform with dynamic animations, audio visualizations, and a fully fluid responsive user interface.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#",
  },
  {
    id: "fraudshield-ai",
    number: "04",
    name: "FRAUDSHIELD AI",
    description: "Multi-layered fraud detection system employing graph-based traversal techniques. Built and presented to law enforcement at a police hackathon.",
    tech: ["FastAPI", "React", "MongoDB", "NetworkX"],
    link: "#",
  },
  {
    id: "sakhi",
    number: "05",
    name: "SAKHI",
    description: "WhatsApp-based women's healthcare companion powered by generative AI. Named a finalist at the national Women Ideathon 1.0.",
    tech: ["WhatsApp AI", "Python", "FastAPI", "Gemini AI"],
    link: "#",
  },
];

export const hackathonsData: TimelineEntry[] = [
  {
    id: "ideathon",
    date: "Mar 2026",
    title: "Women Ideathon 1.0 Finalist",
    org: "CBIT / She Leads",
    description: "Sakhi Project. Selected as a national finalist among 606 participating teams for our generative AI healthcare solution.",
  },
  {
    id: "police-hackathon",
    date: "Jan 2026",
    title: "Anantapur Police AI Hackathon Finalist",
    org: "AP Police Department",
    description: "FraudShield AI. Developed a graph-network fraud detection platform and pitched directly to senior police & cybercrime officials.",
  },
  {
    id: "google-ambassador",
    date: "2026",
    title: "Google Student Ambassador 2026",
    org: "Google Students",
    description: "Appointed to lead developer communities, organize tech workshops, and bridge the gap between academic learning and industry standards.",
  },
  {
    id: "open-source",
    date: "2025 - Present",
    title: "Open Source Contributor",
    org: "GSSoC & SSC",
    description: "Active contributor to GirlScript Summer of Code (GSSoC) and Social Summer of Code. Merged high-impact PRs in frontend and Python toolkits.",
  },
];

export const skillsData: SkillGroup[] = [
  {
    category: "FRONTEND",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "Bootstrap"],
  },
  {
    category: "AI & BACKEND",
    skills: ["Python", "FastAPI", "Flask", "OpenCV", "NetworkX", "Gemini AI"],
  },
  {
    category: "DATABASE",
    skills: ["MongoDB", "Firebase", "SQL"],
  },
  {
    category: "DESIGN & TOOLS",
    skills: ["Figma", "Framer", "Webflow", "Canva"],
  },
  {
    category: "PLATFORMS",
    skills: ["GitHub", "N8N", "Vercel", "Google Cloud"],
  },
];

export const certificationsData: Certification[] = [
  {
    title: "Intro to Generative AI Studio",
    issuer: "Google Cloud",
    year: "2025",
  },
  {
    title: "Programming Foundations: Beyond the Fundamentals",
    issuer: "LinkedIn",
    year: "2025",
  },
];
