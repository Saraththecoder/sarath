"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Terminal } from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

type SuggestionType = "About" | "Skills" | "Projects" | "Hackathons" | "Contact";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-1",
      sender: "bot",
      text: "Connection established with Sarath's AI directory core. System diagnostic: ONLINE. Ask me anything about his technical stack, web releases, hackathons, or CV info.",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !showVideo) {
      scrollToBottom();
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen, showVideo]);

  const getResponse = (queryText: string): string => {
    const query = queryText.toLowerCase().trim();

    // 1. GREETINGS & SMALL TALK
    if (query === "hi" || query === "hello" || query === "hey" || query === "hola" || query === "yo") {
      return "Hello! Interactive communications link established. How can I assist you with Sarath's credentials today?";
    }

    if (query.includes("how are you") || query.includes("how is it going") || query.includes("how's it going") || query.includes("how are you doing")) {
      return "Current agent status: Operational (100% capacity). Ready to retrieve and query Sarath's database fields. What can I fetch for you?";
    }

    if (query === "fine" || query === "good" || query === "great" || query === "doing well" || query.includes("i am good") || query.includes("i'm good")) {
      return "Excellent status received. I am prepared. Please direct your query about Sarath's projects, technical certifications, or education.";
    }

    if (query.includes("thank") || query.includes("thanks")) {
      return "Command completed successfully. Let me know if there are any other data fields to query.";
    }

    if (query.includes("joke") || query.includes("make me laugh") || query.includes("funny")) {
      const jokes = [
        "Why do programmers wear glasses? Because they can't C#! 🤓",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
        "There are 10 types of people in the world: those who understand binary, and those who don't. 💻",
        "What is a programmer's favorite place to hang out? Foo Bar! 🍺"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // 2. IDENTITY / ABOUT
    if (query.includes("about") || query.includes("who are you") || query.includes("who is sarath") || query.includes("bio") || query.includes("identity")) {
      return "Sarath Kumar Bhasa is a B.Tech student in Artificial Intelligence & Machine Learning at AITS Tirupati (9.03 CGPA). He is a Google Student Ambassador 2026 and an active open-source contributor. He bridges the gap between high-level machine learning engines and pixel-perfect, interactive frontend interfaces.";
    }

    // 3. SKILLS & TOOLCHAIN
    if (query.includes("skill") || query.includes("tech") || query.includes("languages") || query.includes("stack") || query.includes("code") || query.includes("framework")) {
      return "Here is Sarath's core technical stack:\n\n• **Frontend Development**: React, Next.js, TypeScript, Tailwind CSS, HTML/CSS.\n• **AI & Backend**: Python, FastAPI, Flask, OpenCV, Gemini AI, NetworkX.\n• **Databases**: MongoDB, Firebase, SQL.\n• **Tools & Platforms**: Figma, Framer, GitHub, Vercel, Google Cloud.";
    }

    // 4. PROJECTS
    if (query.includes("project") || query.includes("portfolio") || query.includes("built") || query.includes("created")) {
      return "Here are Sarath's key projects:\n\n1. **AITS Canteen** — Full-stack college ordering hub with real-time orders, UPI payments, and Gemini AI admin dash.\n2. **FitStreak** — Gamified social fitness platform built with Next.js 14, MongoDB, and NextAuth.js.\n3. **Mantra** — Wellness platform featuring mood-based music and dynamic canvas/audio visualizations.\n4. **FraudShield AI** — Graph-network transaction fraud tracing tool pitched to AP Police Department.\n5. **Sakhi** — WhatsApp-based AI healthcare companion for women's wellness.\n\nWhich project would you like to know more about?";
    }

    if (query.includes("canteen")) {
      return "**AITS Canteen** is a college ordering platform. Built with React, TypeScript, and Firebase, it handles real-time transactions and notifications, Google authentication, and UPI payment interfaces. It also includes an admin panel with a Gemini AI suite that detects order anomalies and forecasts peak canteen hours.";
    }

    if (query.includes("fitstreak")) {
      return "**FitStreak** is a gamified social fitness tracking application. Powered by Next.js 14, MongoDB, Tailwind CSS, and NextAuth.js, it encourages users to log workouts, share feeds with friends, and gain achievement streaks with interactive charts.";
    }

    if (query.includes("mantra")) {
      return "**Mantra** is a mood-based music and wellness platform. Built with HTML, CSS, and vanilla JS, it leverages dynamic animations and custom canvas audio visualizers to create a fluid, relaxing user experience tailored to users' mental wellness.";
    }

    if (query.includes("fraud") || query.includes("shield") || query.includes("police")) {
      return "**FraudShield AI** is an advanced transaction fraud detector. Using graph-network traversal (NetworkX), Python, FastAPI, and MongoDB, it analyzes transaction paths to reveal structured fraud loops. It was successfully pitched to cybercrime officials at the Anantapur Police AI Hackathon.";
    }

    if (query.includes("sakhi") || query.includes("health") || query.includes("women")) {
      return "**Sakhi** is a WhatsApp healthcare companion designed to provide fast, reliable answers to women's health queries. Powered by Python, FastAPI, and Gemini AI models, it was named a national finalist (Top 60 of 606 teams) at the CBIT Women Ideathon 1.0.";
    }

    // 5. ACHIEVEMENTS & LEADER ROLES
    if (query.includes("hackathon") || query.includes("achievement") || query.includes("award") || query.includes("winner") || query.includes("accomplish")) {
      return "Sarath's notable accomplishments include:\n\n• **National Finalist** @ Women Ideathon 1.0 (Sakhi Project, March 2026)\n• **Hackathon Finalist** @ AP Police AI Hackathon (FraudShield AI, January 2026)\n• **Google Student Ambassador 2026** (leadership cohort)\n• **GSSoC & SSC Contributor**, merging pull requests in Python and web toolkits.";
    }

    if (query.includes("google") || query.includes("ambassador")) {
      return "As a **Google Student Ambassador for 2026**, Sarath leads developers on campus. He organizes tech bootcamps, conducts workshops on modern frameworks like React and Next.js, and helps students get involved in open-source programs like GSSoC.";
    }

    if (query.includes("gssoc") || query.includes("open source") || query.includes("open-source")) {
      return "Sarath is an active contributor to open-source codebases, including GirlScript Summer of Code (GSSoC) and Social Summer of Code. His contributions range from styling responsive layouts to creating Python-based data utilities.";
    }

    // 6. CONTACT & HIRE
    if (query.includes("contact") || query.includes("email") || query.includes("hire") || query.includes("linkedin") || query.includes("reach") || query.includes("resume") || query.includes("social")) {
      return "Here is how you can connect with Sarath:\n\n• **Email**: bhasasarathkumar051@gmail.com\n• **LinkedIn**: linkedin.com/in/sarathakumarm3001\n• **GitHub**: github.com/sarathkumarbhasa\n\nHe is currently seeking frontend, full-stack, or AI/ML internship roles!";
    }

    // 7. CGPA / EDUCATION
    if (query.includes("gpa") || query.includes("cgpa") || query.includes("education") || query.includes("college") || query.includes("aits") || query.includes("study") || query.includes("marks")) {
      return "Sarath is pursuing his Bachelor of Technology (B.Tech) in **Artificial Intelligence and Machine Learning** at AITS Tirupati. He is in his final years and maintains an outstanding academic record with a **9.03 CGPA**.";
    }

    if (query.includes("secret")) {
      return "Encrypted log decrypted successfully. 🔓\n\nSarath has the skills, work ethic, and adaptability for immediate software engineering or AI internships. You can bypass forms and email him directly at: **bhasasarathkumar051@gmail.com**.";
    }

    // DEFAULT FALLBACK
    return "Query not recognized in system routing map. Local directory archives match schemas for:\n\n• ABOUT / BIOGRAPHY\n• TECHNICAL SKILLS & STACK\n• PORTFOLIO PROJECTS\n• HACKATHON ACHIEVEMENTS\n• CONTACT INFO & SOCIALS\n\nSubmit a new query or select a chip below.";
  };

  const handleSendMessage = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    // Append User Message in original casing
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate Bot Typing response
    setTimeout(() => {
      const responseText = getResponse(trimmed);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(input);
    }
  };

  const selectSuggestion = (suggestion: SuggestionType) => {
    handleSendMessage(suggestion);
  };

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setShowVideo(false);
    } else {
      setIsOpen(true);
      setShowVideo(true);
    }
  };

  const suggestions: SuggestionType[] = ["About", "Skills", "Projects", "Hackathons", "Contact"];

  return (
    <>
      {/* Floating Toggle Button (Neo-Brutalist Shadow Press) */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={handleToggle}
          className={`flex flex-col items-center justify-center w-16 h-16 bg-background border-2 border-foreground ${
            isOpen 
              ? "shadow-none translate-x-[4px] translate-y-[4px] border-accent animate-none" 
              : "shadow-[4px_4px_0px_var(--accent)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          } rounded-none transition-all duration-200 relative group`}
          aria-label="Toggle Chatbot"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-accent" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/chatbot.png"
                alt="AI Chatbot Icon"
                width={26}
                height={26}
                className="object-contain filter group-hover:scale-105 transition-transform"
              />
              <span className="font-mono text-[7px] text-mutedGray uppercase tracking-widest mt-0.5">
                AGENT
              </span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Chat Window Panel - Neo-Brutalist Code Editor HUD */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-20 md:bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-[420px] h-[500px] md:h-[550px] max-h-[calc(100vh-7rem)] md:max-h-[calc(100vh-8rem)] bg-[#09090b] border-2 border-foreground shadow-[8px_8px_0px_var(--accent)] z-50 flex flex-col overflow-hidden rounded-none"
          >
            {/* Retro Moving Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,230,118,0.02)_50%,rgba(0,230,118,0.02))] bg-[size:100%_4px] opacity-70" />

            {showVideo ? (
              /* Custom Intro Video Player overlay */
              <div className="relative w-full h-full bg-black flex flex-col justify-between p-4 md:p-6 z-10">
                {/* Tech crosses */}
                <span className="absolute top-1.5 left-2 font-mono text-[9px] text-[#1e1e24] select-none pointer-events-none">+</span>
                <span className="absolute top-1.5 right-2 font-mono text-[9px] text-[#1e1e24] select-none pointer-events-none">+</span>
                <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#1e1e24] select-none pointer-events-none">+</span>
                <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-[#1e1e24] select-none pointer-events-none">+</span>

                <div className="flex justify-between items-center font-mono text-[9px] text-accent tracking-widest uppercase">
                  <span>[SYS_INT_PLAYBACK]</span>
                  <span className="animate-pulse flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    PLAYING_INTRO.mp4
                  </span>
                </div>

                <div className="w-full flex-grow flex items-center justify-center py-4">
                  <video
                    src="/hatbot.mp4"
                    autoPlay
                    playsInline
                    className="w-full max-h-[260px] md:max-h-[360px] object-contain border border-borderDark"
                    onEnded={() => setShowVideo(false)}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowVideo(false)}
                    className="px-4 py-2.5 border-2 border-foreground bg-accent text-background font-mono text-xs uppercase tracking-widest font-black transition-all hover:bg-transparent hover:text-accent w-full text-center"
                  >
                    [ Skip Playback ]
                  </button>
                </div>
              </div>
            ) : (
              /* Standard Code Editor Console Chat Mode */
              <>
                {/* Folder Tab Header */}
                <div className="flex flex-col bg-[#121217] border-b-2 border-foreground shrink-0 z-10">
                  <div className="flex justify-between items-center px-4 py-3 bg-[#0a0a0d]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 border border-borderDark bg-background flex items-center justify-center relative overflow-hidden">
                        <Image
                          src="/chatbot.png"
                          alt="AI Chatbot Logo"
                          width={18}
                          height={18}
                          className="object-contain"
                        />
                      </div>
                      <span className="font-mono text-[10px] font-black uppercase text-foreground tracking-widest">
                        SKB_ASSISTANT_v2.0
                      </span>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-mutedGray hover:text-foreground transition-colors p-1 border border-transparent hover:border-borderDark"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Asymmetrical Tab */}
                  <div className="flex">
                    <div className="bg-[#09090b] text-accent font-mono text-[8px] font-black uppercase px-4 py-1.5 border-r-2 border-t border-foreground tracking-widest">
                      CONSOLE_LOG.js
                    </div>
                    <div className="flex-grow border-t border-foreground bg-[#121217]" />
                  </div>
                </div>

                {/* Messages Body (Code Editor Layout with Line Numbers) */}
                <div className="flex-grow overflow-y-auto p-5 flex flex-col gap-6 bg-[#09090b] scrollbar-thin z-10">
                  {messages.map((msg, index) => (
                    <div key={msg.id} className="flex items-start gap-4 w-full">
                      {/* Editor Line Numbers */}
                      <span className="font-mono text-[9px] text-[#2c2c3e] select-none mt-1 shrink-0 w-4 text-right">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      
                      <div className="flex-grow flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1 font-mono text-[8px] tracking-widest text-mutedGray uppercase">
                          {msg.sender === "user" ? (
                            <span className="text-[#a1a1aa]">&gt; USER INPUT</span>
                          ) : (
                            <span className="text-accent flex items-center gap-1">
                              <Terminal className="w-2.5 h-2.5" />
                              SYS_RESPONSE
                            </span>
                          )}
                        </div>
                        
                        {msg.sender === "user" ? (
                          <div className="font-mono text-xs text-foreground uppercase border-l-2 border-accent pl-3 py-0.5">
                            {msg.text}
                          </div>
                        ) : (
                          <div className="font-mono text-[11px] leading-relaxed text-[#c8c8d5] whitespace-pre-line tracking-wide border border-borderDark bg-[#0e0e12] p-3 shadow-md relative">
                            {/* Brackets indicator */}
                            <div className="absolute top-1 right-2 text-[8px] text-accent/20 select-none">OBJ</div>
                            {msg.text}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Bot Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-4 w-full">
                      <span className="font-mono text-[9px] text-[#2c2c3e] select-none mt-1 shrink-0 w-4 text-right">
                        {String(messages.length + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-grow flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1 font-mono text-[8px] tracking-widest text-accent uppercase">
                          <Terminal className="w-2.5 h-2.5" />
                          FETCHING_SYS_DATA
                        </div>
                        <div className="font-mono text-xs text-accent flex items-center gap-1 border border-borderDark bg-[#0e0e12] w-max p-2 px-3">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestions Chips (Arcade syntax brackets) */}
                <div className="px-4 py-3 bg-[#0d0d12] border-t-2 border-foreground flex flex-wrap gap-2 justify-center shrink-0 z-10">
                  {suggestions.map((sug) => (
                    <button
                      key={sug}
                      onClick={() => selectSuggestion(sug)}
                      disabled={isTyping}
                      className="px-2.5 py-1.5 border border-borderDark hover:border-accent hover:text-accent text-[9px] font-mono bg-[#09090b] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none uppercase"
                    >
                      [{sug.toLowerCase()}.js]
                    </button>
                  ))}
                </div>

                {/* Input Bar */}
                <div className="bg-[#0e0e12] border-t-2 border-foreground px-4 py-3.5 flex items-center gap-2 shrink-0 z-10">
                  <span className="font-mono text-xs text-accent font-bold shrink-0">&gt;_</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                    className="w-full bg-transparent border-none outline-none font-mono text-xs text-neutral-200 placeholder-neutral-700 disabled:opacity-50"
                    placeholder="Submit query logs..."
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                  <button
                    onClick={() => handleSendMessage(input)}
                    disabled={isTyping || !input.trim()}
                    className="text-mutedGray hover:text-accent disabled:opacity-30 disabled:hover:text-mutedGray transition-colors p-1.5"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
