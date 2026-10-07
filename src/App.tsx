/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { ProjectItem } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  // Sync theme with documentElement
  useEffect(() => {
    const savedTheme = localStorage.getItem('raah_portfolio_theme');
    const isDark = savedTheme ? savedTheme === 'dark' : true;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, []);

  const handleToggleTheme = (isDark: boolean) => {
    setDarkMode(isDark);
    localStorage.setItem('raah_portfolio_theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  };

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e14] text-slate-800 dark:text-[#8b949e] terminal-grid transition-colors">
      {/* Top Header */}
      <Header
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-16">
        <div className="relative w-full overflow-hidden">
          {/* Ambient Glows Backdrop */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[980px] h-[480px] bg-gradient-to-tr from-blue-500/10 via-teal-500/5 to-transparent dark:from-[#00f2fe]/10 dark:via-[#38bdf8]/5 dark:to-transparent blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-96 -left-32 w-80 h-80 bg-emerald-500/10 dark:bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-48 -right-32 w-96 h-96 bg-blue-500/10 dark:bg-[#00f2fe]/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* 1. Hero Section */}
          <Hero onOpenCVModal={() => setCvModalOpen(true)} darkMode={darkMode} />
        </div>

        {/* 2. About Me Section */}
        <About />

        {/* 3. Featured Projects Showcase */}
        <Projects onSelectProject={(p) => setSelectedProject(p)} />

        {/* 4. Experience & Timeline */}
        <Experience />

        {/* 5. Capabilities Matrix / Technical Skills */}
        <Skills />

        {/* 6. Contact & Action Section */}
        <Contact onOpenCVModal={() => setCvModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        onSelectProject={(p) => {
          setSelectedProject(p);
          setCommandPaletteOpen(false);
        }}
        onOpenCVModal={() => {
          setCvModalOpen(true);
          setCommandPaletteOpen(false);
        }}
      />
    </div>
  );
}
