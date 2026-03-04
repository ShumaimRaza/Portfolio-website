import { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import Hero from "./sections/Hero";
import AnimatedBackground from "./layout/AnimatedBackground";
import SocialSidebar from "./layout/Socialsidebar";
import WordleSection from "./sections/Wordlesection";
import ProjectsSection from "./sections/Projectssection";

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });
  
  // Single source of truth for dark class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream dark:bg-base-900 text-gray-900 dark:text-text-primary transition-colors duration-300">
      <AnimatedBackground dark={dark} />
      <SocialSidebar />
      <Navbar dark={dark} setDark={setDark} />
      <main className="relative z-10 pt-16 px-4 sm:px-0">
        <Hero />
        <ProjectsSection />
        <WordleSection/>
      </main>
    </div>
  );
}

export default App;