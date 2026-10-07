import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-900 dark:bg-[#070a0f] border-t border-slate-800 dark:border-[#30363d] text-slate-400 dark:text-[#8b949e] transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800 dark:border-[#30363d]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-slate-800 dark:bg-[#161b22] border border-blue-400 dark:border-[#00f2fe]/40 flex items-center justify-center text-blue-400 dark:text-[#00f2fe] font-mono text-xs font-bold">
                &gt;_
              </div>
              <span className="font-mono text-sm text-white dark:text-[#f0f6fc] font-bold">
                RAAH
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-[#8b949e] max-w-md">
              Bridging the gap between raw telemetry, statistical modeling, and production-grade full-stack engineering.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 dark:bg-[#161b22] border border-slate-700 dark:border-[#30363d] rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-medium text-emerald-400 uppercase tracking-wider">
              Open for Analytics &amp; Development roles
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 font-mono text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/spookyraah?stkn=MWFodXV3NHZhcHpydQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram (@spookyraah)"
                className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-pink-400 hover:bg-slate-800 dark:hover:bg-[#161b22] transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/richmondannor"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub (@richmondannor)"
                className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-blue-400 dark:hover:text-[#00f2fe] hover:bg-slate-800 dark:hover:bg-[#161b22] transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>

              {/* Snapchat */}
              <a
                href="https://www.snapchat.com/@spookyraah?share_id=4-mluQUQQ427kroOu9oirg&locale=en_GH"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Snapchat"
                title="Snapchat (@spookyraah)"
                className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-amber-400 hover:bg-slate-800 dark:hover:bg-[#161b22] transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.298 2.001c-3.642 0-6.108 2.73-6.108 5.688 0 .894.264 1.996.678 2.782.115.22.128.374.032.551-.106.195-.316.326-.645.421-.861.25-1.896.792-1.896 1.83 0 .734.582 1.335 1.488 1.579.529.143.916.147 1.258.452.334.298.398.742.868 1.62.77 1.436 1.815 1.986 3.125 1.986.323 0 .671-.035 1.032-.108.67-.135 1.396-.445 2.17-.445.748 0 1.442.3 2.112.441.385.081.761.121 1.119.121 1.31 0 2.355-.55 3.125-1.986.47-.878.534-1.322.868-1.62.342-.305.729-.309 1.258-.452.906-.244 1.488-.845 1.488-1.579 0-1.038-1.035-1.58-1.896-1.83-.329-.095-.539-.226-.645-.421-.096-.177-.083-.331.032-.551.414-.786.678-1.888.678-2.782 0-2.958-2.466-5.688-6.108-5.688z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@raa._h"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                title="TikTok (@raa._h)"
                className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800 dark:hover:bg-[#161b22] transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/richmond-annor-ayisah-678415304"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn (Richmond Annor Ayisah)"
                className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-[#0a66c2] hover:bg-slate-800 dark:hover:bg-[#161b22] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>

            <span className="hidden sm:inline-block text-slate-700 dark:text-[#30363d]">|</span>
            <p>© 2026 Richmond Annor Ayisah. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              title="Scroll to top"
              className="inline-flex items-center justify-center w-8 h-8 rounded border border-slate-700 dark:border-[#30363d] bg-slate-800 dark:bg-[#161b22] text-slate-400 hover:border-blue-400 dark:hover:border-[#00f2fe]/50 hover:text-blue-400 dark:hover:text-[#00f2fe] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
