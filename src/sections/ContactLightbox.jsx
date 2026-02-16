import { useEffect, useRef } from "react";

export default function ContactLightbox({ isOpen, onClose }) {
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const contacts = [
    {
      label: "Email",
      value: "shumaimraza1990@gmail.com",
      href: "mailto:shumaimraza1990@gmail.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
    },
    {
      label: "Phone",
      value: "0302 890 2242",
      href: "tel:+923028902242",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-sm bg-white dark:bg-base-800 border border-gray-200 dark:border-base-600 rounded-2xl shadow-2xl dark:shadow-float p-8 transition-colors duration-300">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 dark:text-text-muted hover:text-gray-900 dark:hover:text-text-primary hover:bg-gray-100 dark:hover:bg-base-700 transition-all duration-200"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-amber-500 dark:bg-accent-500" />
            <span className="text-amber-600 dark:text-accent-500 text-xs font-medium tracking-widest uppercase">
              Get in touch
            </span>
          </div>
          <h2
            className="text-2xl font-bold text-gray-900 dark:text-text-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contact Me
          </h2>
          <p className="text-gray-500 dark:text-text-secondary text-sm mt-1">
            Feel free to reach out directly.
          </p>
        </div>

        {/* Contact items */}
        <div className="flex flex-col gap-3">
          {contacts.map(({ label, value, href, icon }) => (
            <a
              key={label}
              href={href}
              className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-base-700 border border-gray-200 dark:border-base-600 hover:border-amber-400 dark:hover:border-accent-500 transition-all duration-200"
            >
              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-amber-50 dark:bg-accent-500/10 text-amber-500 dark:text-accent-500 shrink-0">
                {icon}
              </div>

              {/* Text */}
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-gray-400 dark:text-text-muted font-medium tracking-wide uppercase">
                  {label}
                </span>
                <span className="text-gray-900 dark:text-text-primary font-medium text-sm truncate group-hover:text-amber-500 dark:group-hover:text-accent-500 transition-colors duration-200">
                  {value}
                </span>
              </div>

              {/* Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14" height="14"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                viewBox="0 0 24 24"
                className="ml-auto text-gray-300 dark:text-text-muted group-hover:text-amber-400 dark:group-hover:text-accent-500 transition-colors duration-200 shrink-0"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}