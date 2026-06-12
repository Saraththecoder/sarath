"use client";

import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "GITHUB", url: "https://github.com/sarathkumarbhasa" },
  { label: "LINKEDIN", url: "https://www.linkedin.com/in/sarathakumarm3001/" },
  { label: "PORTFOLIO", url: "https://sarath-portfolio-delta.vercel.app/" },
];

function EmailScrambler() {
  const originalEmail = "bhasasarathkumar051@gmail.com";
  const [displayText, setDisplayText] = useState(originalEmail);
  const [isScrambling, setIsScrambling] = useState(false);
  const glyphs = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        originalEmail
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return originalEmail[index];
            }
            if (char === "@" || char === ".") return char;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("")
      );

      iteration += 1.5;
      if (iteration >= originalEmail.length) {
        clearInterval(interval);
        setDisplayText(originalEmail);
        setIsScrambling(false);
      }
    }, 30);
  };

  return (
    <a
      href={`mailto:${originalEmail}`}
      onMouseEnter={startScramble}
      className="flex items-center gap-3 font-mono text-sm sm:text-lg md:text-xl text-accent tracking-wider uppercase font-semibold relative py-2 group select-all cursor-pointer"
    >
      <Mail className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0 group-hover:rotate-12 transition-transform duration-300" />
      <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100">
        {displayText}
      </span>
      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-accent opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full pt-32 pb-12 px-6 md:px-16 border-t border-borderDark z-10 bg-background"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[60vh] gap-16">
        
        {/* Top Header */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm tracking-widest text-mutedGray">06 //</span>
          <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
            CONTACT
          </span>
        </div>

        {/* Massive Call to Action */}
        <div className="w-full flex flex-col items-start gap-8">
          <h2 className="text-huge font-syne font-extrabold uppercase leading-none tracking-tight select-none flex flex-col">
            <span className="text-stroke">LET&apos;S BUILD</span>
            <span className="text-foreground">SOMETHING</span>
          </h2>
          
          <div className="mt-8 flex flex-col gap-6">
            <p className="font-mono text-xs uppercase tracking-widest text-mutedGray">
              DROP AN EMAIL OR RECONNOITER SOCIAL LINKS
            </p>
            
            {/* Glitching email link */}
            <EmailScrambler />
          </div>
        </div>

        {/* Monospace links & Footer details */}
        <div className="flex flex-col gap-12 mt-12">
          {/* Socials */}
          <div className="flex flex-wrap gap-8 sm:gap-12 pb-8 border-b border-borderDark">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs md:text-sm tracking-widest uppercase font-semibold text-foreground hover:text-accent relative transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-mutedGray font-mono text-[10px] uppercase tracking-widest">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span>&copy; 2026 SARATH KUMAR BHASA</span>
              <span className="hidden sm:inline text-borderDark">&bull;</span>
              <span>TIRUPATI, INDIA</span>
            </div>
            
            <span>
              Designed &amp; Developed by{" "}
              <span className="text-foreground hover:text-accent cursor-default transition-colors">
                Sarath
              </span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
