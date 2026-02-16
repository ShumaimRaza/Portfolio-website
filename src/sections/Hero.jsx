import { useEffect, useRef, useState } from "react";
import ContactLightbox from "./ContactLightbox";

export default function Hero() {
  const titleRef = useRef(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const phrases = ["The Best", "Fullstack Developer", "Wix Designer", "UI/UX Designer"];
    const el = titleRef.current;
    if (!el) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        el.textContent = currentPhrase.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          timeout = setTimeout(type, 1500);
          return;
        }
        timeout = setTimeout(type, 80);
      } else {
        el.textContent = currentPhrase.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timeout = setTimeout(type, 400);
          return;
        }
        timeout = setTimeout(type, 40);
      }
    };

    timeout = setTimeout(type, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl w-full flex flex-col items-center text-center gap-6">

          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-amber-500 dark:bg-accent-500" />
            <span className="text-amber-600 dark:text-accent-500 text-sm font-medium tracking-widest uppercase">
              Welcome to my portfolio
            </span>
            <span className="h-px w-10 bg-amber-500 dark:bg-accent-500" />
          </div>

          {/* Name */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-text-primary leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Shumaim{" "}
            <span className="relative inline-block">
              <span className="text-amber-500 dark:text-accent-500">Raza</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-amber-500 dark:bg-accent-500 rounded-full opacity-40" />
            </span>
          </h1>

          {/* Typewriter Role */}
          <div className="flex items-center gap-2 text-xl sm:text-2xl font-medium text-gray-500 dark:text-text-secondary">
            <span className="text-gray-400 dark:text-text-muted">&lt;</span>
            <div className="flex items-center justify-start w-[220px]">
              <span ref={titleRef} className="text-blue-600 dark:text-cool-400" />
              <span className="animate-pulse text-amber-500 dark:text-accent-500 ml-0.5">|</span>
            </div>
            <span className="text-gray-400 dark:text-text-muted">/&gt;</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">

            {/* Contact Me — opens lightbox */}
            <button
              onClick={() => setContactOpen(true)}
              className="px-6 py-3 text-gray-500 dark:text-text-secondary hover:text-amber-500 dark:hover:text-accent-500 font-semibold rounded-lg border border-gray-300 dark:border-base-600 hover:border-amber-400 dark:hover:border-accent-500 transition-all duration-200 hover:-translate-y-0.5"
            >
              Contact Me
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-text-muted">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-gray-400 dark:from-text-muted to-transparent animate-pulse" />
          </div>

        </div>
      </section>

      {/* Contact Lightbox */}
      <ContactLightbox
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}