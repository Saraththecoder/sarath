import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import RoadTripJourney from "@/components/RoadTripJourney";
import Skills from "@/components/Skills";
import RubikCubeLab from "@/components/RubikCubeLab";
import TerminalConsole from "@/components/TerminalConsole";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <RoadTripJourney />
      <Skills />
      <RubikCubeLab />
      <TerminalConsole />
      <Contact />
    </>
  );
}
