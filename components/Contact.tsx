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
      className="flex items-center gap-3 font-mono text-sm sm:text-base md:text-lg text-accent tracking-wider uppercase font-semibold relative py-2 group select-all cursor-pointer"
    >
      <Mail className="w-4 h-4 text-accent shrink-0 group-hover:rotate-12 transition-transform duration-300" />
      <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100">
        {displayText}
      </span>
      <ArrowUpRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");

    const whatsappNum = "91807244332";
    const textMessage = `Hello Sarath,\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodedText}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative w-full pt-32 pb-12 px-6 md:px-16 border-t border-borderDark z-10 bg-background"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Top Header */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm tracking-widest text-mutedGray">06 //</span>
          <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
            CONTACT
          </span>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Header CTAs and Resume Shortcut */}
          <div className="lg:col-span-6 flex flex-col justify-between lg:min-h-[420px] gap-10">
            <div className="w-full flex flex-col items-start gap-6">
              <h2 className="text-5xl md:text-7xl font-syne font-extrabold uppercase leading-none tracking-tight select-none flex flex-col">
                <span className="text-stroke">LET&apos;S BUILD</span>
                <span className="text-foreground">SOMETHING</span>
              </h2>
              
              <div className="mt-4 flex flex-col gap-4">
                <p className="font-mono text-xs uppercase tracking-widest text-mutedGray">
                  Drop an email or get in touch directly
                </p>
                <EmailScrambler />
              </div>
            </div>

            {/* Resume CV Download Card (Hiring Manager Value Add) */}
            <div className="flex flex-col gap-4 border border-borderDark bg-[#0a0a0d] p-6 max-w-md relative group hover:border-accent/40 transition-colors">
              <div className="absolute top-2 right-4 font-mono text-[8px] text-mutedGray/40">CREDENTIAL_FILE</div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                Credentials &amp; CV
              </h4>
              <p className="font-mono text-[10px] text-mutedGray uppercase tracking-wider leading-relaxed">
                Looking for a quick summary of Sarath&apos;s academic standing and hackathon details? Download his CV here.
              </p>
              <a
                href="/Sarath Kumar Bhasa.docx"
                target="_blank"
                className="flex items-center justify-between w-max gap-3 mt-2 px-4 py-2.5 border border-borderDark hover:border-accent bg-background text-foreground hover:text-accent font-mono text-[10px] uppercase tracking-widest transition-all duration-300 group/btn"
              >
                <span>[Download CV]</span>
                <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-6 border border-borderDark bg-[#0a0a0d] p-8 relative shadow-xl">
            <div className="absolute top-2.5 right-4 font-mono text-[8px] text-mutedGray/50 select-none">
              SECURE_MAIL_v1.0
            </div>
            
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-accent mb-6">
              {"// SEND DIRECT MESSAGE"}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-mono text-[9px] uppercase tracking-widest text-mutedGray font-semibold">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === "sending"}
                  placeholder="E.G. JOHN DOE"
                  className="bg-background border border-borderDark focus:border-accent text-foreground font-mono text-xs p-3 outline-none transition-colors w-full rounded-none placeholder-zinc-800"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-[9px] uppercase tracking-widest text-mutedGray font-semibold">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === "sending"}
                  placeholder="E.G. JOHN@EXAMPLE.COM"
                  className="bg-background border border-borderDark focus:border-accent text-foreground font-mono text-xs p-3 outline-none transition-colors w-full rounded-none placeholder-zinc-800"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-[9px] uppercase tracking-widest text-mutedGray font-semibold">
                  MESSAGE / BRIEF
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === "sending"}
                  placeholder="DESCRIBE THE ENGAGEMENT OPPORTUNITY..."
                  className="bg-background border border-borderDark focus:border-accent text-foreground font-mono text-xs p-3 outline-none transition-colors w-full rounded-none resize-none placeholder-zinc-800"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className={`mt-2 py-4 border font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                  status === "sending"
                    ? "bg-[#111115] border-borderDark text-mutedGray cursor-not-allowed"
                    : status === "success"
                    ? "bg-accent border-accent text-background cursor-default"
                    : "bg-[#0b0b0e] border-borderDark hover:border-accent text-foreground hover:text-background hover:bg-accent"
                }`}
              >
                {status === "sending"
                  ? "TRANSMITTING..."
                  : status === "success"
                  ? "MESSAGE TRANSMITTED SUCCESSFULLY!"
                  : "TRANSMIT MESSAGE"}
              </button>
            </form>
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
