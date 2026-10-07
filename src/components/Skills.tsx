import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-16 w-full" id="skills">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-[#00f2fe] font-bold">
            <span className="material-symbols-outlined text-[16px]">build_circle</span>
            <span>// Capabilities Matrix</span>
          </div>
          <h2 className="font-sans text-2xl md:text-3xl text-slate-900 dark:text-[#f0f6fc] font-extrabold tracking-tight">
            Technical Skills &amp; Domain Tooling
          </h2>
          <p className="text-sm text-slate-600 dark:text-[#8b949e]">
            A structured overview of software proficiencies, analytical environments, and operational frameworks.
          </p>
        </div>

        {/* Skill filter input */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-lg font-mono text-xs max-w-xs w-full focus-within:border-blue-500 dark:focus-within:border-[#00f2fe]">
          <span className="text-blue-600 dark:text-[#00f2fe] font-bold">$</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="grep skill / framework..."
            className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-[#f0f6fc] placeholder-slate-400 dark:placeholder-[#8b949e]"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 3 Categorized Skill Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((category) => {
          const filteredSkills = category.skills.filter((s) =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          return (
            <div
              key={category.id}
              className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] hover:border-blue-400 dark:hover:border-[#00f2fe]/50 p-6 rounded-lg transition-all shadow-xs dark:shadow-none flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center"
                    style={{
                      backgroundColor: `${category.themeColor}15`,
                      borderColor: `${category.themeColor}35`,
                      color: category.themeColor,
                    }}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {category.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans text-base text-slate-900 dark:text-[#f0f6fc] font-bold">
                      {category.title}
                    </h3>
                    <span className="font-mono text-xs text-slate-500 dark:text-[#8b949e]">
                      {category.subtitle}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center font-mono text-xs text-slate-800 dark:text-[#f0f6fc] mb-1">
                          <span>{skill.name}</span>
                          <span
                            className="font-bold"
                            style={{ color: category.themeColor }}
                          >
                            {skill.percentage}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-[#1f2631] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${skill.percentage}%`,
                              backgroundColor: category.themeColor,
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-xs font-mono text-slate-400 dark:text-[#8b949e]">
                      No skills match &quot;{searchTerm}&quot;
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-[#30363d]/70 bg-slate-50 dark:bg-[#11161d]/50 p-2.5 rounded">
                <span
                  className="font-mono text-[10px] uppercase font-bold block"
                  style={{ color: category.themeColor }}
                >
                  Focus Areas:
                </span>
                <span className="font-mono text-[11px] text-slate-600 dark:text-[#8b949e]">
                  {category.focusAreas}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
