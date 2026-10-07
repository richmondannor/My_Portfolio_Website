import React, { useState, useEffect, useRef } from 'react';
import { HERO_STAGES, METRIC_STRIP } from '../data/portfolioData';

interface HeroProps {
  onOpenCVModal: () => void;
  onOpenMetricModal?: (metricId: string) => void;
  darkMode?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCVModal, darkMode = true }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(1); // Defaults to Junior Data Analyst (stage 1) as seen in screenshots
  const [displayedTitle, setDisplayedTitle] = useState(HERO_STAGES[1].title);
  const [titleAnimClass, setTitleAnimClass] = useState('translate-y-0 opacity-100');

  const DURATION = 10000; // 10 seconds per stage
  const startTimeRef = useRef(performance.now());
  const stageRef = useRef(currentStageIdx);
  stageRef.current = currentStageIdx;

  const progressBarRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const currentStage = HERO_STAGES[currentStageIdx];
  const activeColor = darkMode ? currentStage.color : currentStage.lightColor;

  // Title transition handler
  const transitionToStage = (newIdx: number) => {
    if (newIdx === stageRef.current) return;
    stageRef.current = newIdx;
    setTitleAnimClass('-translate-y-4 opacity-0');

    setTimeout(() => {
      setCurrentStageIdx(newIdx);
      setDisplayedTitle(HERO_STAGES[newIdx].title);
      setTitleAnimClass('translate-y-4 opacity-0');

      setTimeout(() => {
        setTitleAnimClass('translate-y-0 opacity-100');
      }, 50);
    }, 250);

    startTimeRef.current = performance.now();
    if (progressBarRef.current) {
      progressBarRef.current.style.width = '0%';
    }
    if (iconRef.current) {
      iconRef.current.style.transform = 'rotate(0deg)';
    }
  };

  // Auto rotation timer - updates DOM refs directly so React doesn't re-render 60-120fps and cause scroll lag
  useEffect(() => {
    let animFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }
      if (iconRef.current) {
        iconRef.current.style.transform = `rotate(${pct * 3.6}deg)`;
      }

      if (elapsed >= DURATION) {
        const nextIdx = (stageRef.current + 1) % HERO_STAGES.length;
        transitionToStage(nextIdx);
      }
      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  return (
    <section className="relative max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pt-12 md:pt-16 pb-12" id="home">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
        {/* Left Column: Intro & Controls */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-full shadow-xs dark:shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-400" />
            </span>
            <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wide uppercase">
              Status: Ready for Full-Time &amp; Contract Deployments
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-3 w-full">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="font-sans text-4xl md:text-6xl text-slate-900 dark:text-[#f0f6fc] font-extrabold tracking-tight">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 dark:from-[#00f2fe] dark:via-[#38bdf8] dark:to-[#22c55e]">
                  Richmond Annor
                </span>
              </h1>
              <span className="font-mono text-xs uppercase px-2 py-0.5 bg-slate-200/80 dark:bg-[#1f2631] border border-slate-300 dark:border-[#30363d] text-slate-700 dark:text-[#8b949e] rounded">
                [RAAH]
              </span>
            </div>

            {/* Dynamic Role Display Box + Progress Timer */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-lg shadow-xs dark:shadow-inner min-w-[290px] sm:min-w-[360px]">
                <span className="text-blue-600 dark:text-[#00f2fe] font-mono font-bold">&gt;</span>
                <div className="relative h-8 w-full overflow-hidden flex items-center">
                  <div
                    className={`font-mono text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 ease-out transform ${titleAnimClass}`}
                    style={{ color: activeColor }}
                  >
                    {displayedTitle}
                  </div>
                </div>
                <span className="inline-block w-2 h-5 bg-blue-600/70 dark:bg-[#00f2fe]/70 animate-pulse ml-auto" />
              </div>

              {/* Progress counter */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-lg shadow-xs">
                <span
                  ref={iconRef}
                  className="material-symbols-outlined text-[18px] inline-block select-none transition-colors"
                  style={{
                    transform: 'rotate(0deg)',
                    color: activeColor,
                  }}
                  title="Cycle Timer Active"
                >
                  update
                </span>
                <div className="flex flex-col gap-1 w-24">
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-[#283240] rounded-full overflow-hidden relative">
                    <div
                      ref={progressBarRef}
                      className="h-full rounded-full will-change-[width]"
                      style={{
                        width: '0%',
                        backgroundColor: activeColor,
                        boxShadow: `0 0 8px ${activeColor}, 0 0 2px ${activeColor}`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 dark:text-[#8b949e]">
                    <span>{currentStageIdx + 1} of 4</span>
                    <span>10.0s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Selectors Pills */}
            <div className="flex items-center gap-2 flex-wrap pt-2">
              {HERO_STAGES.map((stage, idx) => {
                const isActive = currentStageIdx === idx;
                const stageColor = darkMode ? stage.color : stage.lightColor;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => transitionToStage(idx)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'font-semibold border shadow-xs dark:bg-opacity-20'
                        : 'font-medium border border-slate-200 dark:border-[#30363d] text-slate-500 dark:text-[#8b949e] hover:text-slate-900 dark:hover:text-[#f0f6fc] hover:bg-slate-100 dark:hover:bg-[#161b22]'
                    }`}
                    style={
                      isActive
                        ? {
                            borderColor: stageColor,
                            color: stageColor,
                            backgroundColor: `${stageColor}15`,
                          }
                        : {}
                    }
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: stageColor,
                        opacity: isActive ? 1 : 0.6,
                      }}
                    />
                    <span>{stage.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intro Paragraph */}
          <p className="font-sans text-base md:text-lg text-slate-600 dark:text-[#8b949e] max-w-2xl leading-relaxed">
            Bridging the gap between raw data intelligence, automated workflow architecture, and modern web applications. Delivering measurable business outcomes with predictive models and scalable interfaces.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={onOpenCVModal}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 dark:bg-[#00f2fe] text-white dark:text-[#041b24] font-mono text-sm font-bold rounded-lg hover:bg-blue-700 dark:hover:bg-[#6ff6ff] shadow-md dark:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download CV</span>
            </button>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-[#161b22] text-slate-800 dark:text-[#f0f6fc] border border-slate-300 dark:border-[#30363d] font-mono text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-[#1f2631] hover:border-blue-500 dark:hover:border-[#00f2fe]/50 transition-all shadow-xs dark:shadow-sm"
            >
              <span>View Projects</span>
              <span className="material-symbols-outlined text-[18px] text-blue-600 dark:text-[#00f2fe]">
                arrow_downward
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Dynamic Geometric Photo Frame & SVG Tracer */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <div className="relative w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 rounded-2xl p-3 bg-white/70 dark:bg-[#161b22]/60 border border-slate-200 dark:border-[#30363d] shadow-xl flex items-center justify-center overflow-hidden">
            {/* Ambient Back Glows */}
            <div
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl pointer-events-none transition-colors duration-700 opacity-30"
              style={{ backgroundColor: currentStage.color }}
            />
            <div
              className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full blur-2xl pointer-events-none transition-colors duration-700 opacity-20"
              style={{ backgroundColor: currentStage.color }}
            />

            {/* SVG Tracer Paths Overlay */}
            <svg
              className="absolute inset-6 w-[calc(100%-3rem)] h-[calc(100%-3rem)] pointer-events-none z-20 overflow-visible"
              viewBox="0 0 280 280"
            >
              {/* Circle Tracer */}
              <circle
                id="tracer-circle"
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="#00f2fe"
                strokeWidth="3"
                strokeDasharray="24 16"
                className={`transition-opacity duration-500 ${
                  currentStageIdx === 0 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 140 140"
                  to="360 140 140"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Rectangle Tracer */}
              <rect
                id="tracer-rect"
                x="25"
                y="10"
                width="230"
                height="260"
                rx="16"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeDasharray="24 16"
                className={`transition-opacity duration-500 ${
                  currentStageIdx === 1 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;80"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>

              {/* Triangle Tracer */}
              <polygon
                id="tracer-triangle"
                points="140,15 248,77.5 248,202.5 140,265 32,202.5 32,77.5"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeDasharray="24 16"
                className={`transition-opacity duration-500 ${
                  currentStageIdx === 2 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;80"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </polygon>

              {/* Square Tracer */}
              <rect
                id="tracer-square"
                x="25"
                y="25"
                width="230"
                height="230"
                rx="24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="3"
                strokeDasharray="24 16"
                className={`transition-opacity duration-500 ${
                  currentStageIdx === 3 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;80"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>

            {/* Dynamic Geometric Shape Frame */}
            <div
              className={`relative w-56 h-56 sm:w-64 sm:h-64 overflow-hidden border-4 transition-all duration-700 ease-in-out z-10 ${currentStage.shape}`}
              style={{
                borderColor: activeColor,
                boxShadow: darkMode
                  ? `0 0 24px ${activeColor}55`
                  : `0 8px 24px -4px ${activeColor}35`,
              }}
            >
              {HERO_STAGES.map((stage, idx) => {
                const isActive = currentStageIdx === idx;
                return (
                  <img
                    key={stage.id}
                    src={stage.photoUrl}
                    alt={`Richmond Annor - ${stage.title}`}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      stage.id === 0 ? 'object-top' : 'object-center'
                    } ${
                      isActive
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-95 pointer-events-none z-0'
                    }`}
                  />
                );
              })}
            </div>

            {/* Badge Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <span
                className="font-mono text-[11px] px-3 py-1 bg-white/90 dark:bg-[#1f2631]/90 backdrop-blur-md border rounded-full font-semibold shadow-xs whitespace-nowrap transition-all duration-500"
                style={{
                  borderColor: `${activeColor}80`,
                  color: activeColor,
                }}
              >
                {currentStage.badge}
              </span>
            </div>

            {/* Dots Nav Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-[#070a0f]/80 backdrop-blur-md border border-slate-200 dark:border-[#30363d] shadow-sm">
              {HERO_STAGES.map((stage, idx) => {
                const isActive = currentStageIdx === idx;
                const stageColor = darkMode ? stage.color : stage.lightColor;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => transitionToStage(idx)}
                    aria-label={`Jump to stage: ${stage.title}`}
                    style={{
                      backgroundColor: isActive ? stageColor : undefined,
                      transform: isActive ? 'scale(1.35)' : 'scale(1)',
                    }}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      isActive ? '' : 'bg-slate-300 dark:bg-[#30363d] hover:opacity-80'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar (Bento Metric Strip) */}
      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {METRIC_STRIP.map((metric) => (
          <div
            key={metric.id}
            className="bg-white dark:bg-[#161b22] p-5 rounded-lg border border-slate-200 dark:border-[#30363d] hover:border-blue-400 dark:hover:border-[#38bdf8]/50 transition-all shadow-xs dark:shadow-none flex flex-col justify-between group cursor-default"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-[#8b949e] font-semibold">
                {metric.label}
              </span>
              <span
                className="material-symbols-outlined text-[18px] transition-transform group-hover:scale-110"
                style={{ color: metric.accentColor }}
              >
                {metric.icon}
              </span>
            </div>
            <div
              className="font-mono text-3xl font-extrabold text-slate-900 dark:text-[#f0f6fc] transition-colors"
              style={{ color: metric.id === 'operational-quality' ? metric.accentColor : undefined }}
            >
              {metric.value}
            </div>
            <p className="font-mono text-xs text-slate-500 dark:text-[#8b949e] mt-2">
              {metric.subtext}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
