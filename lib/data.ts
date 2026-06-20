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
  link: string;
}

export const projectsData: Project[] = [
  {
    id: "aits-canteen",
    number: "01",
    name: "AITS CANTEEN",
    description: "Full-stack college canteen ordering platform with AI-powered admin dashboard, real-time orders, UPI/QR payments, and Google authentication.",
    tech: ["React", "TypeScript", "Firebase", "Gemini AI"],
    link: "https://github.com/Saraththecoder/CollegeCanteen",
  },
  {
    id: "fitstreak",
    number: "02",
    name: "FITSTREAK",
    description: "Social fitness tracking application featuring a gamified streak system, friend feeds, and a mobile-first responsive layout.",
    tech: ["Next.js 14", "MongoDB", "NextAuth.js", "Tailwind CSS"],
    link: "https://github.com/Saraththecoder/FitStreak",
  },
  {
    id: "mantra",
    number: "03",
    name: "MANTRA",
    description: "Mood-based music & wellness platform with dynamic animations, audio visualizations, and a fully fluid responsive user interface.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/themantra3/Mantra",
  },
  {
    id: "fraudshield-ai",
    number: "04",
    name: "FRAUDSHIELD AI",
    description: "Multi-layered fraud detection system employing graph-based traversal techniques. Built and presented to law enforcement at a police hackathon.",
    tech: ["FastAPI", "React", "MongoDB", "NetworkX"],
    link: "https://github.com/sarathkumarbhasa/spatpfinals",
  },
  {
    id: "sakhi",
    number: "05",
    name: "SAKHI",
    description: "WhatsApp-based women's healthcare companion powered by generative AI. Named a finalist at the national Women Ideathon 1.0.",
    tech: ["WhatsApp AI", "Python", "FastAPI", "Gemini AI"],
    link: "https://github.com/sarathkumarbhasa/sakhimodel",
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
    link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzODE0IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODM1OTU5Nl84NzE0MzkxMTc0NzY0ODE1MTE5MC5wbmciLCJ1c2VybmFtZSI6IkIuU2FyYXRoIEt1bWFyIn0&referrer=https%3A%2F%2Fcertificates.simplicdn.net%2Fshare%2F8359596_87143911747648151190.png&%24identity_id=1460146076408930151&channel=android&feature=sharing&type=0&duration=0&source=android&data=eyIkb2dfdGl0bGUiOiJCLlNhcmF0aCBLdW1hciBoYXMgc3VjY2Vzc2Z1bGx5IGNvbXBsZXRlZCB0aGUgSW50cm9kdWN0aW9uIHRvIEdlbmVyYXRpdmUgQUkgU3R1ZGlvIG9ubGluZSBjb3Vyc2UuIiwiJGNhbm9uaWNhbF9pZGVudGlmaWVyIjoiODM1OTU5NiIsIiRvZ19kZXNjcmlwdGlvbiI6IkxlYXJuIHRvZGF5J3MgbW9zdCBpbi1kZW1hbmQgc2tpbGxzIGZvciBmcmVlIGF0IFNraWxsVXAgYnkgU2ltcGxpbGVhcm4uIiwiJG9nX2ltYWdlX3VybCI6Imh0dHBzOlwvXC9jZXJ0aWZpY2F0ZXMuc2ltcGxpY2RuLm5ldFwvc2hhcmVcLzgzNTk1OTZfODcxNDM5MTE3NDc2NDgxNTExOTAucG5nIiwiJHB1YmxpY2x5X2luZGV4YWJsZSI6InRydWUiLCIkZGVza3RvcF91cmwiOiJodHRwczpcL1wvd3d3LnNpbXBsaWxlYXJuLmNvbVwvc2tpbGx1cC1jZXJ0aWZpY2F0ZS1sYW5kaW5nP3Rva2VuPWV5SmpiM1Z5YzJWZmFXUWlPaUl6T0RFMElpd2lZMlZ5ZEdsbWFXTmhkR1ZmZFhKc0lqb2lhSFIwY0hNNlhDOWNMMk5sY25ScFptbGpZWFJsY3k1emFXMXdiR2xqWkc0dWJtVjBYQzl6YUdGeVpWd3ZPRE0xT1RVNU5sODROekUwTXpreE1UYzBOelkwT0RFMU1URTVNQzV3Ym1jaUxDSjFjMlZ5Ym1GdFpTSTZJa0l1VTJGeVlYUm9JRXQxYldGeUluMCZ1dG1fc291cmNlPXNoYXJlZC1jZXJ0aWZpY2F0ZSZ1dG1fbWVkaXVtPWFwcF9sbXMmdXRtX2NhbXBhaWduPXNoYXJlZC1jZXJ0aWZpY2F0ZS1wcm9tb3Rpb24mcmVmZXJyZXI9aHR0cHMlM0ElMkYlMkZjZXJ0aWZpY2F0ZXMuc2ltcGxpY2RuLm5ldCUyRnNoYXJlJTJGODM1OTU5Nl84NzE0MzkxMTc0NzY0ODE1MTE5MC5wbmciLCIkYW5kcm9pZF91cmwiOiJodHRwczpcL1wvd3d3LnNpbXBsaWxlYXJuLmNvbVwvc2tpbGx1cC1jZXJ0aWZpY2F0ZS1sYW5kaW5nP3Rva2VuPWV5SmpiM1Z5YzJWZmFXUWlPaUl6T0RFMElpd2lZMlZ5ZEdsbWFXTmhkR1ZmZFhKc0lqb2lhSFIwY0hNNlhDOWNMMk5sY25ScFptbGpZWFJsY3k1emFXMXdiR2xqWkc0dWJtVjBYQzl6YUdGeVpWd3ZPRE0xT1RVNU5sODROekUwTXpreE1UYzBOelkwT0RFMU1URTVNQzV3Ym1jaUxDSjFjMlZ5Ym1GdFpTSTZJa0l1VTJGeVlYUm9JRXQxYldGeUluMCZ1dG1fc291cmNlPXNoYXJlZC1jZXJ0aWZpY2F0ZSZ1dG1fbWVkaXVtPWFwcF9sbXMmdXRtX2NhbXBhaWduPXNoYXJlZC1jZXJ0aWZpY2F0ZS1wcm9tb3Rpb24mcmVmZXJyZXI9aHR0cHMlM0ElMkYlMkZjZXJ0aWZpY2F0ZXMuc2ltcGxpY2RuLm5ldCUyRnNoYXJlJTJGODM1OTU5Nl84NzE0MzkxMTc0NzY0ODE1MTE5MC5wbmciLCJzb3VyY2UiOiJhbmRyb2lkIn0%3D",
  },
  {
    title: "Programming Foundations: Beyond the Fundamentals",
    issuer: "LinkedIn",
    year: "2025",
    link: "https://www.linkedin.com/learning/certificates/3ac08d98ea1d12a2de1553d9b794a30254bdf4ca7607d2a5a4865a098793d702",
  },
];
