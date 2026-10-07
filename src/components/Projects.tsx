import React from 'react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  return (
    <section
      className="w-full bg-slate-50 dark:bg-[#0a0e14] border-b border-slate-200 dark:border-[#30363d] py-16 transition-colors"
      id="projects"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-[#00f2fe] font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-[#00f2fe] animate-pulse" />
              <span>// Portfolio Showcase</span>
            </div>
            <h2 className="font-sans text-2xl md:text-3xl text-slate-900 dark:text-[#f0f6fc] font-extrabold tracking-tight">
              Featured Projects &amp; Computational Artifacts
            </h2>
            <p className="text-sm text-slate-600 dark:text-[#8b949e]">
              Engineering statistical models, predictive machine learning pipelines, and interactive web tools delivering quantifiable diagnostic insights.
            </p>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-lg font-mono text-xs text-slate-600 dark:text-[#8b949e] shadow-xs dark:shadow-none">
            <span className="material-symbols-outlined text-[18px] text-blue-600 dark:text-[#00f2fe]">
              layers
            </span>
            <span>3 Deployed Systems • Production Validated</span>
          </div>
        </div>

        {/* Alternating Timeline Track */}
        <div className="relative py-4">
          {/* Vertical Track Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-slate-300 dark:bg-[#30363d] z-0" />

          <div className="space-y-12 md:space-y-16 relative z-10">
            {PROJECTS.map((prj, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={prj.id}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Left Side (Empty if Odd, Card if Even on MD) */}
                  {!isEven ? (
                    <div className="w-full md:w-1/2 pl-10 md:pl-0 md:pr-10 order-2 md:order-1">
                      <ProjectCard project={prj} onSelect={onSelectProject} />
                    </div>
                  ) : (
                    <div className="hidden md:block md:w-1/2" />
                  )}

                  {/* Center Node Dot */}
                  <div
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-slate-50 dark:border-[#0a0e14] shadow-xs z-20"
                    style={{ backgroundColor: prj.themeColor }}
                  />

                  {/* Right Side (Card if Even, Empty if Odd on MD) */}
                  {isEven ? (
                    <div className="w-full md:w-1/2 pl-10 md:pl-10 md:pr-0">
                      <ProjectCard project={prj} onSelect={onSelectProject} />
                    </div>
                  ) : (
                    <div className="hidden md:block md:w-1/2 order-1 md:order-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (p: ProjectItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] hover:border-blue-400 dark:hover:border-[#00f2fe]/50 rounded-2xl p-6 transition-all shadow-xs dark:shadow-none flex flex-col justify-between group"
    >
      <div className="flex items-start gap-3.5 mb-4">
        <div
          className="w-11 h-11 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105"
          style={{
            backgroundColor: `${project.themeColor}15`,
            borderColor: `${project.themeColor}40`,
            color: project.themeColor,
          }}
        >
          <span className="material-symbols-outlined text-[24px]">
            {project.icon}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-sans text-base md:text-lg text-slate-900 dark:text-[#f0f6fc] font-bold truncate group-hover:text-blue-600 dark:group-hover:text-[#00f2fe] transition-colors">
              {project.title}
            </h3>
            <span className="font-mono text-[10px] text-slate-400 dark:text-[#8b949e] font-semibold">
              {project.code}
            </span>
          </div>
          <span
            className="font-mono text-xs font-semibold block mt-0.5"
            style={{ color: project.themeColor }}
          >
            {project.subtitle}
          </span>
        </div>
      </div>

      <p className="text-xs md:text-sm text-slate-600 dark:text-[#8b949e] leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="p-2.5 rounded bg-slate-50 dark:bg-[#11161d]/50 border border-slate-200 dark:border-[#30363d]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-[#8b949e] block mb-0.5">
            {project.accuracyMetric.label}
          </span>
          <span
            className="font-mono text-sm font-bold"
            style={{ color: project.themeColor }}
          >
            {project.accuracyMetric.value}
          </span>
        </div>
        <div className="p-2.5 rounded bg-slate-50 dark:bg-[#11161d]/50 border border-slate-200 dark:border-[#30363d]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-[#8b949e] block mb-0.5">
            {project.scopeMetric.label}
          </span>
          <span className="font-mono text-sm font-bold text-emerald-600 dark:text-[#4ade80]">
            {project.scopeMetric.value}
          </span>
        </div>
      </div>

      {/* Applied Stack */}
      <div className="pt-3 border-t border-slate-100 dark:border-[#30363d]/70 bg-slate-50 dark:bg-[#11161d]/50 p-2.5 rounded mb-4">
        <span
          className="font-mono text-[10px] uppercase font-bold block mb-1.5"
          style={{ color: project.themeColor }}
        >
          Applied Stack:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs">
          {project.appliedStack.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-white dark:bg-[#1f2631] border border-slate-200 dark:border-[#30363d] text-slate-600 dark:text-[#8b949e] rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 dark:bg-[#00f2fe] text-white dark:text-[#041b24] font-mono text-xs font-bold rounded hover:bg-blue-700 dark:hover:bg-[#6ff6ff] shadow-xs transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[14px]">visibility</span>
          <span>View Details</span>
        </button>

        {project.id === 'prj-01' && (
          <a
            href={project.githubUrl || 'https://github.com/richmondannor/Football-xG-Analysis.git'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-[#1f2631] border border-slate-200 dark:border-[#30363d] text-slate-700 dark:text-[#f0f6fc] font-mono text-xs rounded hover:border-blue-400 dark:hover:border-[#00f2fe]/50 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px] text-blue-600 dark:text-[#00f2fe]">
              terminal
            </span>
            <span>GitHub Repo</span>
          </a>
        )}

        {project.id === 'prj-02' && (
          <a
            href={project.githubUrl || 'https://github.com/richmondannor/Fifty-Largest-Banks-Business-Analytics.git'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-[#1f2631] border border-slate-200 dark:border-[#30363d] text-slate-700 dark:text-[#f0f6fc] font-mono text-xs rounded hover:border-teal-400 dark:hover:border-[#38bdf8]/50 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px] text-teal-600 dark:text-[#38bdf8]">
              terminal
            </span>
            <span>GitHub Repo</span>
          </a>
        )}

        {project.id === 'prj-03' && (
          <a
            href={project.githubUrl || 'https://github.com/richmondannor/AHA_Database_Analysis.git'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-[#1f2631] border border-slate-200 dark:border-[#30363d] text-slate-700 dark:text-[#f0f6fc] font-mono text-xs rounded hover:border-emerald-400 dark:hover:border-[#22c55e]/50 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px] text-emerald-600 dark:text-[#22c55e]">
              terminal
            </span>
            <span>GitHub Repo</span>
          </a>
        )}
      </div>
    </div>
  );
};
