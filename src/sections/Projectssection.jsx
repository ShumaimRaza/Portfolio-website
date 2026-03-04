import { useState, useEffect } from "react";

export default function ProjectsSection() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/ShumaimRaza/repos?sort=updated&per_page=6");
        const data = await res.json();
        setRepos(data.filter(repo => !repo.fork)); // exclude forked repos
      } catch (err) {
        console.error("Failed to fetch repos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <section id="projects" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-10 bg-amber-500 dark:bg-accent-500" />
            <span className="text-amber-600 dark:text-accent-500 text-sm font-medium tracking-widest uppercase">
              My Work
            </span>
            <span className="h-px w-10 bg-amber-500 dark:bg-accent-500" />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-text-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Projects
          </h2>
          <p className="text-gray-500 dark:text-text-secondary text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            A collection of my recent work and contributions
          </p>
        </div>

        {/* GitHub Projects Grid */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-text-primary mb-6 flex items-center gap-2 sm:gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-gray-600 dark:text-text-secondary sm:w-6 sm:h-6">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub Repositories
          </h3>

          {/* hrcore Repository */}
          <a
            href="https://github.com/ShumaimRaza/hrcore"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-2 border-blue-200 dark:border-blue-500/30 rounded-2xl p-6 sm:p-8 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-float overflow-hidden mb-6"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 dark:from-blue-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/10 dark:from-indigo-500/10 to-transparent rounded-tr-full"></div>

            <div className="relative">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-blue-600 dark:text-blue-400">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      hrcore
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-text-secondary mb-4 leading-relaxed">
                    A comprehensive HR management system built with modern web technologies. Features employee management, attendance tracking, payroll processing, and performance evaluations.
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                      React
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 text-xs font-semibold rounded-full">
                      JavaScript
                    </span>
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 text-xs font-semibold rounded-full">
                      HTML
                    </span>
                    <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold rounded-full">
                      Tailwind CSS
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all duration-200">
                    <span>View Repository</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="group-hover:translate-x-1 transition-transform duration-200">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>

                {/* Repo icon */}
                <div className="hidden sm:block shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" viewBox="0 0 24 24">
                      <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </a>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin w-8 h-8 text-amber-500 dark:text-accent-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-base-800 border border-gray-200 dark:border-base-600 rounded-xl p-4 sm:p-6 hover:border-amber-400 dark:hover:border-accent-500 transition-all duration-200 hover:shadow-lg dark:hover:shadow-float"
                >
                  {/* Repo name */}
                  <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                    <h4 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-text-primary group-hover:text-amber-500 dark:group-hover:text-accent-500 transition-colors duration-200 line-clamp-1 break-words">
                      {repo.name}
                    </h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 text-gray-400 dark:text-text-muted group-hover:text-amber-500 dark:group-hover:text-accent-500 transition-colors duration-200 sm:w-4 sm:h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 dark:text-text-secondary mb-3 sm:mb-4 line-clamp-2 min-h-[40px]">
                    {repo.description || "No description provided"}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-400 dark:text-text-muted">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-amber-400 dark:bg-accent-500"></span>
                        <span>{repo.language}</span>
                      </div>
                    )}
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                        </svg>
                        {repo.stargazers_count}
                      </div>
                    )}
                    {repo.forks_count > 0 && (
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 9a3 3 0 100-6 3 3 0 000 6zm0 2c-2.7 0-8 1.29-8 4v2h16v-2c0-2.71-5.3-4-8-4zm12-9a3 3 0 100 6 3 3 0 000-6zm0 8c-1.65 0-3.22.39-4.5 1.05v1.89c1.38-.62 2.85-.94 4.5-.94 2.7 0 8 1.29 8 4v2h-8v2h10v-4c0-2.71-5.3-4-8-4z"/>
                        </svg>
                        {repo.forks_count}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Wix Portfolio Section */}
        <div className="border-t border-gray-200 dark:border-base-700 pt-8 sm:pt-12">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-text-primary mb-6 flex items-center gap-2 sm:gap-3">
            <span className="text-lg font-black tracking-tighter" style={{ fontFamily: "var(--font-display)" }}>W</span>
            Wix Portfolio
          </h3>

          <a
            href="https://shumaimraza1990.wixstudio.com/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block max-w-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-accent-500/10 dark:to-accent-500/5 border-2 border-amber-200 dark:border-accent-500/30 rounded-2xl p-6 sm:p-8 hover:border-amber-400 dark:hover:border-accent-500 transition-all duration-300 hover:shadow-xl dark:hover:shadow-float overflow-hidden"
          >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-amber-400/20 dark:from-accent-500/20 to-transparent rounded-bl-full"></div>

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-amber-100 dark:bg-accent-500/20 text-amber-700 dark:text-accent-400 text-xs font-semibold rounded-full">
                    Web Design
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-text-primary mb-2 group-hover:text-amber-600 dark:group-hover:text-accent-500 transition-colors duration-200">
                  View My Wix Studio Portfolio
                </h4>
                <p className="text-gray-600 dark:text-text-secondary text-sm">
                  Explore my collection of Wix websites, custom designs, and client projects showcasing modern web design.
                </p>
              </div>

              {/* Arrow icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24"
                className="shrink-0 text-amber-500 dark:text-accent-500 group-hover:translate-x-1 group-hover:translate-y-[-4px] transition-transform duration-200 sm:w-7 sm:h-7"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}