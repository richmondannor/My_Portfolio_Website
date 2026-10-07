import React, { useState, useEffect } from 'react';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: (isDark: boolean) => void;
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleTheme,
  onOpenCommandPalette,
}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];
          const scrollY = window.scrollY + 120;

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollY >= top && scrollY < top + height) {
                setActiveSection((prev) => (prev === section ? prev : section));
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: '01_home' },
    { id: 'about', label: '02_about' },
    { id: 'projects', label: '03_projects' },
    { id: 'experience', label: '04_experience' },
    { id: 'skills', label: '05_skills' },
    { id: 'contact', label: '06_contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#30363d] transition-colors shadow-sm dark:shadow-none">
      <div className="h-16 max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand & Title Badge */}
        <a href="#home" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-9 h-9 rounded-md bg-blue-50 dark:bg-[#161b22] border border-blue-200 dark:border-[#00f2fe]/40 flex items-center justify-center text-blue-600 dark:text-[#00f2fe] font-mono font-bold text-sm shadow-[0_0_12px_rgba(0,242,254,0.15)] dark:shadow-[0_0_12px_rgba(0,242,254,0.2)] group-hover:scale-105 transition-transform">
            <span>&gt;_</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-slate-900 dark:text-[#f0f6fc] tracking-tight">
                Raah
              </span>
              <span
                className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                title="Runtime Active"
              />
            </div>
            <span className="text-[11px] text-slate-500 dark:text-[#8b949e] font-medium font-mono">
              Data Analyst &amp; Web Developer
            </span>
          </div>
        </a>

        {/* Navigation tabs / Editor Tabs */}
        <nav className="hidden xl:flex items-center gap-1 p-1 bg-slate-100/90 dark:bg-[#070a0f]/80 border border-slate-200 dark:border-[#30363d] rounded-lg font-mono text-xs">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3 py-1.5 transition-all font-semibold rounded ${
                  isActive
                    ? 'bg-white dark:bg-[#161b22] text-blue-600 dark:text-[#00f2fe] shadow-xs border border-slate-200 dark:border-[#30363d]'
                    : 'text-slate-600 dark:text-[#8b949e] hover:text-slate-900 dark:hover:text-[#f0f6fc] hover:bg-white/70 dark:hover:bg-[#161b22]'
                }`}
              >
                <span className="text-blue-500/70 dark:text-[#38bdf8]/70">#</span>
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action items & Mode Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Mode Toggle Switcher */}
          <div
            id="portfolio-mode-toggle"
            className="inline-flex items-center p-0.5 bg-slate-200/80 dark:bg-[#070a0f]/90 border border-slate-300 dark:border-[#30363d] rounded-lg font-mono text-xs"
            role="group"
            aria-label="Portfolio View Mode"
          >
            <button
              id="theme-toggle-ide"
              type="button"
              onClick={() => onToggleTheme(true)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-all cursor-pointer ${
                darkMode
                  ? 'bg-[#161b22] text-[#00f2fe] font-semibold border border-[#00f2fe]/40 shadow-[0_0_10px_rgba(0,242,254,0.2)]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/60 font-medium border border-transparent'
              }`}
              title="Switch to IDE Dark Terminal Mode"
            >
              <span className="text-[11px] font-bold">&gt;_</span>
              <span className="tracking-tight text-[11px]">IDE Dark</span>
              {darkMode && <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse inline-block" />}
            </button>
            <button
              id="theme-toggle-light"
              type="button"
              onClick={() => onToggleTheme(false)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-all cursor-pointer font-medium ${
                !darkMode
                  ? 'bg-white text-blue-600 font-semibold border border-blue-400/80 shadow-xs ring-1 ring-blue-500/10'
                  : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#161b22] border border-transparent'
              }`}
              title="Switch to Precision Light Executive Mode"
            >
              <span className="material-symbols-outlined text-[14px] text-amber-500">light_mode</span>
              <span className="tracking-tight text-[11px]">Light Pro</span>
              {!darkMode && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse inline-block" />}
            </button>
          </div>

          {/* Quick Terminal Options Button */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="w-8 h-8 rounded border border-slate-200 dark:border-[#30363d] bg-slate-50 dark:bg-[#161b22] flex items-center justify-center text-blue-600 dark:text-[#00f2fe] hover:border-blue-400 dark:hover:border-[#00f2fe]/60 transition-colors cursor-pointer"
            title="Open Command Palette & Telemetry (Ctrl+K)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M6 4h7a4.5 4.5 0 0 1 0 9H6V4zm0 9l8 8M6 20h2" />
            </svg>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-8 h-8 rounded border border-slate-200 dark:border-[#30363d] bg-slate-50 dark:bg-[#161b22] flex items-center justify-center text-slate-700 dark:text-[#f0f6fc]"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[18px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-[#0d1117] border-b border-slate-200 dark:border-[#30363d] px-4 py-3 space-y-1 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md ${
                activeSection === link.id
                  ? 'bg-blue-50 dark:bg-[#161b22] text-blue-600 dark:text-[#00f2fe] font-bold'
                  : 'text-slate-600 dark:text-[#8b949e] hover:bg-slate-100 dark:hover:bg-[#161b22]'
              }`}
            >
              <span className="text-blue-500/70 dark:text-[#38bdf8]/70">#</span>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
