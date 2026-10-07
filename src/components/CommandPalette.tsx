import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleTheme: (isDark: boolean) => void;
  onSelectProject: (p: ProjectItem) => void;
  onOpenCVModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  darkMode,
  onToggleTheme,
  onSelectProject,
  onOpenCVModal,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or toggle
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    {
      id: 'nav-home',
      category: 'Navigation',
      label: 'Jump to Home // Hero',
      icon: 'home',
      action: () => {
        window.location.hash = '#home';
        onClose();
      },
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      label: 'Jump to About // Capabilities',
      icon: 'person',
      action: () => {
        window.location.hash = '#about';
        onClose();
      },
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      label: 'Jump to Featured Projects Showcase',
      icon: 'layers',
      action: () => {
        window.location.hash = '#projects';
        onClose();
      },
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      label: 'Jump to Career Log & Experience',
      icon: 'history_edu',
      action: () => {
        window.location.hash = '#experience';
        onClose();
      },
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      label: 'Jump to Technical Skills Matrix',
      icon: 'build_circle',
      action: () => {
        window.location.hash = '#skills';
        onClose();
      },
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      label: 'Jump to Contact Terminal Form',
      icon: 'send',
      action: () => {
        window.location.hash = '#contact';
        onClose();
      },
    },
    {
      id: 'prj-football',
      category: 'Simulators',
      label: 'Launch Expected Goals (xG) Tactical Workbench',
      icon: 'sports_soccer',
      action: () => {
        onSelectProject(PROJECTS[0]);
        onClose();
      },
    },
    {
      id: 'prj-banking',
      category: 'Simulators',
      label: 'Launch Global Banking & Valuation Explorer',
      icon: 'account_balance',
      action: () => {
        onSelectProject(PROJECTS[1]);
        onClose();
      },
    },
    {
      id: 'prj-hospital',
      category: 'Simulators',
      label: 'Launch AHA Hospital Surge & Triage Estimator',
      icon: 'local_hospital',
      action: () => {
        onSelectProject(PROJECTS[2]);
        onClose();
      },
    },
    {
      id: 'view-cv',
      category: 'Artifacts',
      label: 'View / Download Official Curriculum Vitae',
      icon: 'description',
      action: () => {
        onOpenCVModal();
        onClose();
      },
    },
    {
      id: 'toggle-mode',
      category: 'Environment',
      label: `Switch View Mode: ${darkMode ? 'Light Pro' : 'IDE Dark'}`,
      icon: darkMode ? 'light_mode' : 'dark_mode',
      action: () => {
        onToggleTheme(!darkMode);
        onClose();
      },
    },
  ];

  const filteredCommands = query
    ? commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-xl shadow-2xl overflow-hidden font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-[#30363d] bg-slate-50 dark:bg-[#0d1117]">
          <span className="text-blue-600 dark:text-[#00f2fe] font-bold text-sm">&gt;</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section (e.g. projects, xG, theme)..."
            className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-[#f0f6fc] placeholder-slate-400 dark:placeholder-[#8b949e] text-xs"
          />
          <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-[#21262d] text-slate-500 dark:text-[#8b949e] text-[10px]">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-[#21262d]">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                type="button"
                onClick={cmd.action}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-[#1f2631] text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[16px] text-blue-600 dark:text-[#00f2fe] group-hover:scale-110 transition-transform">
                    {cmd.icon}
                  </span>
                  <span className="text-slate-800 dark:text-[#f0f6fc] font-medium">
                    {cmd.label}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-[#8b949e] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#0d1117]">
                  {cmd.category}
                </span>
              </button>
            ))
          ) : (
            <div className="p-6 text-center text-slate-400 dark:text-[#8b949e]">
              No commands matching &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-[#0d1117] border-t border-slate-200 dark:border-[#30363d] flex items-center justify-between text-[10px] text-slate-400 dark:text-[#8b949e]">
          <span>RAAH System Terminal v2.6</span>
          <div className="flex items-center gap-2">
            <span>Use ↑↓ to navigate</span>
            <span>•</span>
            <span>↵ to select</span>
          </div>
        </div>
      </div>
    </div>
  );
};
