export default function Navbar({ dark, setDark }) {

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-base-900/80 backdrop-blur-md border-b border-gray-200 dark:border-base-600 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo (left) */}
        <a
          href="#"
          className="text-gray-900 dark:text-text-primary font-bold text-xl tracking-tight hover:text-amber-500 dark:hover:text-accent-500 transition-colors duration-200"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ShumaimRaza<span className="text-amber-500 dark:text-accent-500">.</span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-6">

          {/* Download Resume */}
          <a
            href="/resume.pdf"
            download
            className="group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-text-primary transition-all duration-200 border border-transparent hover:border-gray-300 dark:hover:border-base-600 hover:bg-gray-100/80 dark:hover:bg-white/5 backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10h5l-6 6-6-6h5V3h2v7zm-9 9h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7z"/>
            </svg>
            Resume
          </a>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-300 dark:bg-base-600" />

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-md flex items-center justify-center bg-gray-100 dark:bg-base-800 border border-gray-300 dark:border-base-600 hover:border-amber-400 dark:hover:border-accent-500 text-gray-500 dark:text-text-muted hover:text-amber-500 dark:hover:text-accent-500 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
