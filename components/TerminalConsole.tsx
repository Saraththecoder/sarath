"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Command, ArrowRight } from "lucide-react";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function TerminalConsole() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="font-mono text-xs uppercase tracking-wider text-mutedGray">
          <p className="text-accent font-bold mb-1 flex items-center gap-2">
            <TerminalIcon className="w-4 h-4" />
            SARATH KUMAR BHASA -- INTERACTIVE CONSOLE v1.0.0
          </p>
          <p>TYPE A COMMAND OR CLICK A BUTTON BELOW TO COMMENCE INTERACTION.</p>
          <p className="mt-1">TYPE <span className="text-foreground underline">help</span> FOR A LIST OF VALID COMMANDS.</p>
        </div>
      ),
    },
  ]);

  const consoleBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (consoleBodyRef.current) {
      consoleBodyRef.current.scrollTo({
        top: consoleBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmdText: string) => {
    const trimmedCmd = cmdText.trim().toLowerCase();
    if (!trimmedCmd) return;

    let output: React.ReactNode = "";

    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="flex flex-col gap-1 font-mono text-[11px] text-mutedGray uppercase">
            <p className="text-neutral-100 font-semibold">VALID COMMANDS:</p>
            <p className="pl-4"><span className="text-accent">about</span>     - STATEMENT OF PURPOSE & FOCUS</p>
            <p className="pl-4"><span className="text-accent">skills</span>    - OVERVIEW OF TECHNICAL TOOLCHAIN</p>
            <p className="pl-4"><span className="text-accent">projects</span>  - TOP-TIER DIGITAL RELEASES</p>
            <p className="pl-4"><span className="text-accent">contact</span>   - GET IN TOUCH & SOCIAL CONNECTIONS</p>
            <p className="pl-4"><span className="text-accent">secret</span>    - ENCRYPTED INTERNSHIP REPORT</p>
            <p className="pl-4"><span className="text-accent">clear</span>     - PURGE CONSOLE HISTORY</p>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="font-mono text-[11px] text-mutedGray uppercase leading-relaxed">
            <p className="text-neutral-100 font-semibold mb-1">ABOUT SARATH:</p>
            <p>B.Tech Artificial Intelligence and Machine Learning student at AITS Tirupati.</p>
            <p>GPA: 9.03 / 10 &middot; Google Student Ambassador &middot; GSSoC Contributor.</p>
            <p className="mt-2">I design and develop responsive, high-performance web products that leverage ML backends and feature rich visual interactions.</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="font-mono text-[11px] text-mutedGray uppercase flex flex-col gap-2">
            <p className="text-neutral-100 font-semibold">TECHNICAL CAPABILITIES:</p>
            <div>
              <p className="text-accent font-semibold">[FRONTEND]</p>
              <p>REACT &bull; NEXT.JS &bull; TYPESCRIPT &bull; TAILWIND CSS &bull; HTML/CSS</p>
            </div>
            <div>
              <p className="text-accent font-semibold">[AI & BACKEND]</p>
              <p>PYTHON &bull; FASTAPI &bull; FLASK &bull; OPENCV &bull; GEMINI AI</p>
            </div>
            <div>
              <p className="text-accent font-semibold">[DATABASE & PLATFORMS]</p>
              <p>MONGODB &bull; FIREBASE &bull; GITHUB &bull; VERCEL &bull; GCLOUD</p>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="font-mono text-[11px] text-mutedGray uppercase flex flex-col gap-2">
            <p className="text-neutral-100 font-semibold">SELECTED RELEASES:</p>
            <div>
              <p className="text-accent font-semibold">01 // AITS CANTEEN</p>
              <p>COLLEGE ORDERING PLATFORM INTEGRATING FIREBASE & GEMINI ADMIN SUITE.</p>
            </div>
            <div>
              <p className="text-accent font-semibold">02 // FITSTREAK</p>
              <p>GAMIFIED FITNESS TRACKING PLATFORM BUILT WITH NEXT.JS 14 & MONGODB.</p>
            </div>
            <div>
              <p className="text-accent font-semibold">03 // FRAUDSHIELD AI</p>
              <p>AI GRAPH TRAVERSAL FRAUD DETECTION SYSTEM PITCHED TO AP POLICE DEPT.</p>
            </div>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="font-mono text-[11px] text-mutedGray uppercase leading-relaxed">
            <p className="text-neutral-100 font-semibold mb-1">COMMUNICATION PATHWAYS:</p>
            <p>EMAIL    : bhasasarathkumar051@gmail.com</p>
            <p>LINKEDIN : linkedin.com/in/sarathakumarm3001</p>
            <p>GITHUB   : github.com/sarathkumarbhasa</p>
          </div>
        );
        break;

      case "secret":
        output = (
          <div className="font-mono text-[11px] border border-accent/40 bg-accent/5 p-4 uppercase leading-relaxed text-neutral-200">
            <p className="text-accent font-extrabold text-sm mb-1">[ACCESS GRANTED -- SECRET ENVELOPE]</p>
            <p className="font-semibold text-xs mt-2">LOOKING FOR A HIGH-PERFORMANCE INTERN?</p>
            <p className="text-mutedGray mt-1">SARATH HAS THE SYSTEM CAPACITY FOR IMMEDIATE DEPLOYMENT:</p>
            <ul className="list-disc pl-4 mt-2 text-mutedGray flex flex-col gap-1">
              <li>9.03 CGPA IN ARTIFICIAL INTELLIGENCE & ML</li>
              <li>GOOGLE STUDENT AMBASSADOR 2026 (LEADERSHIP)</li>
              <li>PROVEN HACKATHON TACTICIAN (2X FINALIST)</li>
              <li>MERGED PRs IN GSSOC (OPEN-SOURCE CODEBASES)</li>
            </ul>
            <p className="text-accent font-semibold mt-3">CONTACT DIRECTLY: bhasasarathkumar051@gmail.com</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <p className="font-mono text-xs text-red-500 uppercase">
            COMMAND NOT FOUND: &quot;{trimmedCmd}&quot;. TYPE &quot;help&quot; FOR OPTIONS.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdText, output }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  const executeQuickCommand = (cmd: string) => {
    handleCommand(cmd);
  };

  return (
    <section
      id="console"
      className="relative w-full py-24 px-6 md:px-16 border-t border-borderDark z-10 bg-background"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm tracking-widest text-mutedGray">05.5 //</span>
          <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
            INTERACTIVE SYSTEM CONSOLE
          </span>
        </div>

        {/* Terminal Window */}
        <div 
          onClick={focusInput}
          className="w-full max-w-4xl mx-auto border border-borderDark bg-[#0d0d0d] shadow-lg rounded-none overflow-hidden cursor-text"
        >
          {/* macOS-style Header */}
          <div className="w-full bg-[#181818] border-b border-borderDark px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-accent opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
            </div>
            
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-mutedGray uppercase tracking-wider">
              <Command className="w-3 h-3" />
              <span>guest-session@skb-portfolio:~</span>
            </div>

            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Terminal Console Output area */}
          <div 
            ref={consoleBodyRef}
            className="w-full h-80 overflow-y-auto p-6 flex flex-col gap-4"
          >
            {history.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                {item.command !== "welcome" && (
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-accent font-semibold">guest@skb-portfolio:~$</span>
                    <span className="text-neutral-200 font-medium">{item.command}</span>
                  </div>
                )}
                <div>{item.output}</div>
              </div>
            ))}
          </div>

          {/* Prompt input field */}
          <div className="w-full bg-[#111111] border-t border-borderDark px-6 py-4 flex items-center gap-2">
            <span className="font-mono text-xs text-accent font-semibold shrink-0">guest@skb-portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none font-mono text-xs text-neutral-200 placeholder-neutral-700 uppercase"
              placeholder="TYPE COMMAND HERE..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <button 
              onClick={() => handleCommand(input)}
              className="text-mutedGray hover:text-accent transition-colors p-1"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="w-full flex flex-col items-center gap-4">
          <span className="font-mono text-[10px] text-mutedGray uppercase tracking-widest font-semibold">
            QUICK ACTION TAGS (FOR MOBILE / FAST ACCESS)
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {["about", "skills", "projects", "contact", "secret", "clear"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeQuickCommand(cmd)}
                className="px-4 py-2 border border-borderDark bg-cardBg text-foreground font-mono text-xs uppercase hover:bg-accent hover:border-accent hover:text-background transition-all"
              >
                [{cmd}]
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
