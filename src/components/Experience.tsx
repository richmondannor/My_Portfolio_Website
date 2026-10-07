import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section
      className="w-full bg-slate-100/70 dark:bg-[#11161d]/80 border-y border-slate-200 dark:border-[#30363d] py-16"
      id="experience"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 max-w-xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-[#00f2fe] font-bold">
            <span className="material-symbols-outlined text-[16px]">terminal</span>
            <span>// Career Log &amp; Milestones</span>
          </div>
          <h2 className="font-sans text-2xl md:text-3xl text-slate-900 dark:text-[#f0f6fc] font-extrabold tracking-tight">
            Professional Journey
          </h2>
          <p className="text-sm text-slate-600 dark:text-[#8b949e]">
            Statistics and computer science graduate building reporting packages, dashboards, and data models that turn raw operational data into business insight.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 md:pl-10 space-y-8">
          {/* Vertical Timeline Line */}
          <div className="absolute top-4 bottom-4 left-2.5 md:left-4 w-0.5 bg-slate-300 dark:bg-[#30363d]" />

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Icon Node */}
              <div
                className="absolute -left-6 md:-left-10 top-1 w-6 h-6 rounded flex items-center justify-center ring-4 ring-slate-100 dark:ring-[#0a0e14] shadow-xs"
                style={{
                  backgroundColor: exp.themeColor,
                  color: '#041b24',
                }}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {exp.icon}
                </span>
              </div>

              {/* Experience Card */}
              <div className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] group-hover:border-blue-400 dark:group-hover:border-[#00f2fe]/50 p-6 rounded-lg transition-all shadow-xs dark:shadow-none">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-sans text-base md:text-lg text-slate-900 dark:text-[#f0f6fc] font-bold">
                      {exp.role}
                    </h3>
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: exp.themeColor }}
                    >
                      {exp.company} — {exp.department}
                    </span>
                  </div>
                  <span
                    className="px-2.5 py-1 font-mono text-xs rounded w-fit font-semibold border"
                    style={{
                      backgroundColor: `${exp.themeColor}15`,
                      borderColor: `${exp.themeColor}35`,
                      color: exp.themeColor,
                    }}
                  >
                    {exp.dateRange}
                  </span>
                </div>

                <ul className="space-y-2 text-xs md:text-sm text-slate-600 dark:text-[#8b949e] list-disc pl-4">
                  {exp.highlights.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 flex-wrap pt-4 font-mono text-xs">
                  {exp.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-100 dark:bg-[#1f2631] border border-slate-200 dark:border-[#30363d] text-slate-600 dark:text-[#8b949e] rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
