import React, { useState } from 'react';
import { COMPETENCIES } from '../data/portfolioData';
import { CompetencyItem } from '../types';

export const About: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<CompetencyItem | null>(null);

  return (
    <section
      className="w-full bg-slate-100/70 dark:bg-[#11161d]/80 border-y border-slate-200 dark:border-[#30363d] py-16"
      id="about"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-[#00f2fe] font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-[#00f2fe] animate-pulse" />
              <span>// Who I Am &amp; What I Do</span>
            </div>
            <h2 className="font-sans text-2xl md:text-3xl text-slate-900 dark:text-[#f0f6fc] font-extrabold tracking-tight">
              Synthesizing Data Models with Executable Web Infrastructure
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-slate-600 dark:text-[#8b949e] max-w-xl leading-relaxed">
            I sit at the convergence of quantitative analytics and scalable software engineering. I hold a Statistics and Computer Science degree from the University of Ghana, and I translate messy operational data into automated pipelines, dashboards, and clear business insight. At Societe Generale Ghana, I apply Lean Six Sigma methodology to map, document, and streamline the processes behind that reporting. Outside work, I build data-driven projects from predictive modelling in football to global banking analysis using Python, R, SQL, and Power BI. I'm now looking to bring that same discipline to a team.
          </p>
        </div>

        {/* Core Competency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMPETENCIES.map((comp) => (
            <div
              key={comp.modId}
              onClick={() => setSelectedComp(comp)}
              className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] hover:border-blue-400 dark:hover:border-[#00f2fe]/60 rounded-lg p-5 transition-all shadow-xs dark:shadow-none flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center transition-all group-hover:scale-105"
                    style={{
                      backgroundColor: `${comp.accentColor}18`,
                      borderColor: `${comp.accentColor}40`,
                      color: comp.accentColor,
                    }}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {comp.icon}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 dark:text-[#8b949e] font-semibold">
                    {comp.modId}
                  </span>
                </div>
                <h3 className="font-sans text-base text-slate-900 dark:text-[#f0f6fc] font-bold group-hover:text-blue-600 dark:group-hover:text-[#00f2fe] transition-colors">
                  {comp.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#8b949e] leading-relaxed">
                  {comp.description}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 dark:border-[#30363d]/70 bg-slate-50 dark:bg-[#11161d]/50 p-2.5 rounded">
                <span
                  className="font-mono text-[10px] uppercase font-bold block mb-1"
                  style={{ color: comp.accentColor }}
                >
                  Core Arsenal:
                </span>
                <span className="font-mono text-[11px] text-slate-600 dark:text-[#8b949e] block leading-snug">
                  {comp.coreArsenal}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competency Detail Modal */}
      {selectedComp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedComp(null)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-xl shadow-2xl p-6 relative font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#30363d]">
              <div className="flex items-center gap-2.5">
                <span
                  className="text-xs px-2 py-0.5 rounded font-bold"
                  style={{
                    backgroundColor: `${selectedComp.accentColor}20`,
                    color: selectedComp.accentColor,
                  }}
                >
                  {selectedComp.modId}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-[#f0f6fc]">
                  {selectedComp.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedComp(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs font-sans">
              <p className="text-slate-700 dark:text-[#b9cacb] leading-relaxed">
                {selectedComp.details?.overview || selectedComp.description}
              </p>

              <div>
                <span className="font-mono text-[11px] text-blue-600 dark:text-[#00f2fe] uppercase font-bold block mb-2">
                  Key Deliverables:
                </span>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-600 dark:text-[#8b949e]">
                  {selectedComp.details?.keyDeliverables.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-mono text-[11px] text-emerald-600 dark:text-[#22c55e] uppercase font-bold block mb-2">
                  Applied Methodologies:
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {selectedComp.details?.methodologies.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1f2631] text-slate-700 dark:text-[#8b949e] border border-slate-200 dark:border-[#30363d]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-[#30363d] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedComp(null)}
                className="px-4 py-1.5 bg-slate-100 dark:bg-[#1f2631] text-slate-700 dark:text-[#f0f6fc] text-xs font-mono rounded hover:bg-slate-200 dark:hover:bg-[#262a31]"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
