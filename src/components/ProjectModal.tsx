import React, { useState } from 'react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-[#30363d] rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="bg-slate-100 dark:bg-[#161b22] px-6 py-3.5 border-b border-slate-200 dark:border-[#30363d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span className="font-mono text-xs text-slate-600 dark:text-[#8b949e]">
              artifact_viewer // {project.code}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-[#f0f6fc] hover:bg-slate-200 dark:hover:bg-[#21262d] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Title & Tag */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-[#30363d]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${project.themeColor}20`,
                    color: project.themeColor,
                  }}
                >
                  {project.code}
                </span>
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: project.themeColor }}
                >
                  {project.subtitle}
                </span>
              </div>
              <h2 className="font-sans text-xl md:text-2xl font-extrabold text-slate-900 dark:text-[#f0f6fc]">
                {project.title}
              </h2>
            </div>

            {/* Key Metrics Pill cluster */}
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-lg">
                <span className="font-mono text-[10px] uppercase text-slate-400 dark:text-[#8b949e] block">
                  {project.accuracyMetric.label}
                </span>
                <span
                  className="font-mono text-base font-bold"
                  style={{ color: project.themeColor }}
                >
                  {project.accuracyMetric.value}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-lg">
                <span className="font-mono text-[10px] uppercase text-slate-400 dark:text-[#8b949e] block">
                  {project.scopeMetric.label}
                </span>
                <span className="font-mono text-base font-bold text-emerald-600 dark:text-[#4ade80]">
                  {project.scopeMetric.value}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Project Tool / Simulator */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-[#30363d] bg-slate-50/60 dark:bg-[#11161d]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-600 dark:text-[#00f2fe]">
                  tune
                </span>
                <span className="font-mono text-xs uppercase font-bold text-slate-800 dark:text-[#f0f6fc]">
                  Interactive Diagnostic Workbench
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-[#4ade80] rounded border border-emerald-500/20">
                LIVE COMPUTE
              </span>
            </div>

            {project.id === 'prj-01' && <FootballSimulator />}
            {project.id === 'prj-02' && <BankingExplorer />}
            {project.id === 'prj-03' && <HospitalTriageSimulator />}
          </div>

          {/* Detailed Engineering Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-[#00f2fe] font-bold mb-1.5">
                  // Problem Definition
                </h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-[#8b949e] leading-relaxed">
                  {project.details.problemStatement}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-[#00f2fe] font-bold mb-1.5">
                  // Solution Architecture
                </h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-[#8b949e] leading-relaxed">
                  {project.details.solutionArchitecture}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-600 dark:text-[#4ade80] font-bold mb-1.5">
                  // Key Diagnostic Findings
                </h4>
                <ul className="space-y-2 list-disc pl-4 text-xs md:text-sm text-slate-600 dark:text-[#8b949e]">
                  {project.details.keyFindings.map((finding, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-purple-600 dark:text-[#c084fc] font-bold mb-1.5">
                  // Applied Methodologies
                </h4>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {project.appliedStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] text-slate-700 dark:text-[#8b949e] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 dark:bg-[#161b22] px-6 py-4 border-t border-slate-200 dark:border-[#30363d] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <span className="text-slate-500 dark:text-[#8b949e]">
            Artifact ID: {project.code}_VERIFIED_2026
          </span>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 dark:bg-[#1f2631] border border-slate-200 dark:border-[#30363d] text-slate-700 dark:text-[#f0f6fc] font-bold rounded hover:border-blue-400 dark:hover:border-[#00f2fe]/50 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px] text-blue-600 dark:text-[#00f2fe]">
                  terminal
                </span>
                <span>GitHub Repository</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 dark:bg-[#21262d] text-slate-800 dark:text-[#f0f6fc] rounded hover:bg-slate-300 dark:hover:bg-[#30363d] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- 1. Football xG Simulator --- */
const FootballSimulator: React.FC = () => {
  const [distance, setDistance] = useState(16); // meters
  const [angle, setAngle] = useState(45); // degrees
  const [shotType, setShotType] = useState<'foot' | 'header'>('foot');
  const [pressure, setPressure] = useState<'low' | 'high'>('low');

  // Empirical xG formulation based on distance, angle, body part, pressure
  const baseProb = Math.exp(-0.11 * distance) * Math.sin((angle * Math.PI) / 180);
  const typeMultiplier = shotType === 'header' ? 0.62 : 1.0;
  const pressureMultiplier = pressure === 'high' ? 0.68 : 1.0;
  const calculatedXG = Math.max(0.01, Math.min(0.96, baseProb * typeMultiplier * pressureMultiplier));

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-600 dark:text-[#8b949e]">
        Simulate tactical shot characteristics to calculate Expected Goals (xG) based on empirical Random Forest weights trained across 684 team-seasons:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white dark:bg-[#161b22] p-4 rounded-lg border border-slate-200 dark:border-[#30363d]">
        <div>
          <label className="font-mono text-[11px] text-slate-500 dark:text-[#8b949e] block mb-1">
            Distance: {distance}m
          </label>
          <input
            type="range"
            min="4"
            max="35"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-[#00f2fe]"
          />
        </div>

        <div>
          <label className="font-mono text-[11px] text-slate-500 dark:text-[#8b949e] block mb-1">
            Angle: {angle}°
          </label>
          <input
            type="range"
            min="10"
            max="90"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-[#00f2fe]"
          />
        </div>

        <div>
          <label className="font-mono text-[11px] text-slate-500 dark:text-[#8b949e] block mb-1">
            Execution Mode
          </label>
          <div className="grid grid-cols-2 gap-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setShotType('foot')}
              className={`py-1 rounded border ${
                shotType === 'foot'
                  ? 'bg-blue-600 text-white dark:bg-[#00f2fe] dark:text-[#041b24] font-bold border-transparent'
                  : 'border-slate-200 dark:border-[#30363d] text-slate-600 dark:text-[#8b949e]'
              }`}
            >
              Foot
            </button>
            <button
              type="button"
              onClick={() => setShotType('header')}
              className={`py-1 rounded border ${
                shotType === 'header'
                  ? 'bg-blue-600 text-white dark:bg-[#00f2fe] dark:text-[#041b24] font-bold border-transparent'
                  : 'border-slate-200 dark:border-[#30363d] text-slate-600 dark:text-[#8b949e]'
              }`}
            >
              Header
            </button>
          </div>
        </div>

        <div>
          <label className="font-mono text-[11px] text-slate-500 dark:text-[#8b949e] block mb-1">
            Opponent Pressure
          </label>
          <div className="grid grid-cols-2 gap-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setPressure('low')}
              className={`py-1 rounded border ${
                pressure === 'low'
                  ? 'bg-emerald-600 text-white dark:bg-[#22c55e] dark:text-[#041b24] font-bold border-transparent'
                  : 'border-slate-200 dark:border-[#30363d] text-slate-600 dark:text-[#8b949e]'
              }`}
            >
              Low / Free
            </button>
            <button
              type="button"
              onClick={() => setPressure('high')}
              className={`py-1 rounded border ${
                pressure === 'high'
                  ? 'bg-emerald-600 text-white dark:bg-[#22c55e] dark:text-[#041b24] font-bold border-transparent'
                  : 'border-slate-200 dark:border-[#30363d] text-slate-600 dark:text-[#8b949e]'
              }`}
            >
              Contested
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-3.5 bg-blue-50/70 dark:bg-[#161b22] border border-blue-200 dark:border-[#00f2fe]/30 rounded-lg font-mono">
        <div>
          <span className="text-xs text-slate-500 dark:text-[#8b949e] block">
            Calculated Probability Metric
          </span>
          <span className="text-xl font-bold text-blue-600 dark:text-[#00f2fe]">
            xG: {calculatedXG.toFixed(3)}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 dark:text-[#8b949e] block">
            Model Validation
          </span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-[#4ade80]">
            Random Forest (R² = 0.89) vs MLR (0.72)
          </span>
        </div>
      </div>
    </div>
  );
};

/* --- 2. Banking Explorer --- */
const BankingExplorer: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const sampleBanks = [
    { name: 'JPMorgan Chase', region: 'Americas', assets: '$3,875B', marketCap: '$580B', cet1: '15.3%', fit: 'High' },
    { name: 'Industrial & Commercial Bank of China', region: 'APAC', assets: '$5,740B', marketCap: '$240B', cet1: '13.9%', fit: 'Moderate' },
    { name: 'BNP Paribas', region: 'EMEA', assets: '$2,850B', marketCap: '$78B', cet1: '13.2%', fit: 'High' },
    { name: 'HSBC Holdings', region: 'EMEA', assets: '$3,020B', marketCap: '$162B', cet1: '14.8%', fit: 'High' },
    { name: 'Mitsubishi UFJ Financial Group', region: 'APAC', assets: '$2,680B', marketCap: '$115B', cet1: '12.9%', fit: 'Moderate' },
    { name: 'Bank of America', region: 'Americas', assets: '$3,180B', marketCap: '$310B', cet1: '14.7%', fit: 'High' },
  ];

  const filteredBanks = selectedRegion === 'all'
    ? sampleBanks
    : sampleBanks.filter((b) => b.region === selectedRegion);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs text-slate-600 dark:text-[#8b949e]">
          Capital Adequacy &amp; Valuation Distribution Matrix across the world&apos;s 50 largest banks:
        </p>
        <div className="flex items-center gap-1 font-mono text-xs">
          {['all', 'Americas', 'EMEA', 'APAC'].map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => setSelectedRegion(reg)}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedRegion === reg
                  ? 'bg-blue-600 dark:bg-[#38bdf8] text-white dark:text-[#041b24] font-bold'
                  : 'bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] text-slate-600 dark:text-[#8b949e]'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-[#30363d]">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-slate-100 dark:bg-[#1f2631] text-slate-600 dark:text-[#8b949e] border-b border-slate-200 dark:border-[#30363d]">
            <tr>
              <th className="p-2.5">Institution</th>
              <th className="p-2.5">Region</th>
              <th className="p-2.5">Total Assets</th>
              <th className="p-2.5">Market Cap</th>
              <th className="p-2.5">CET1 Ratio</th>
              <th className="p-2.5">Stress Fit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#30363d]">
            {filteredBanks.map((bank, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-[#161b22]/70">
                <td className="p-2.5 font-bold text-slate-900 dark:text-[#f0f6fc]">{bank.name}</td>
                <td className="p-2.5 text-slate-600 dark:text-[#8b949e]">{bank.region}</td>
                <td className="p-2.5 text-slate-700 dark:text-[#38bdf8]">{bank.assets}</td>
                <td className="p-2.5 text-slate-700 dark:text-[#38bdf8]">{bank.marketCap}</td>
                <td className="p-2.5 text-emerald-600 dark:text-[#4ade80] font-semibold">{bank.cet1}</td>
                <td className="p-2.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 dark:bg-[#38bdf8]/10 text-blue-600 dark:text-[#38bdf8] border border-blue-200 dark:border-[#38bdf8]/30">
                    {bank.fit}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* --- 3. Hospital Triage Simulator --- */
const HospitalTriageSimulator: React.FC = () => {
  const [icuOccupancy, setIcuOccupancy] = useState(78); // %
  const [turnoverProtocol, setTurnoverProtocol] = useState<'standard' | 'automated'>('automated');

  // Simulated triage dwell time calculation
  const baselineLatency = 95; // minutes
  const surgePenalty = Math.max(0, icuOccupancy - 80) * 4.8;
  const protocolBenefit = turnoverProtocol === 'automated' ? 41 : 0;
  const estimatedDwellTime = Math.max(25, Math.round(baselineLatency + surgePenalty - protocolBenefit));

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-600 dark:text-[#8b949e]">
        ANOVA &amp; DOE emergency triage surge model synthesizing 1,300+ American Hospital Association facilities:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-[#161b22] p-4 rounded-lg border border-slate-200 dark:border-[#30363d]">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-mono text-[11px] text-slate-500 dark:text-[#8b949e]">
              ICU Inpatient Occupancy: {icuOccupancy}%
            </span>
            <span
              className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                icuOccupancy > 84.5
                  ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                  : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
              }`}
            >
              {icuOccupancy > 84.5 ? 'CRITICAL SURGE' : 'NOMINAL BUFFER'}
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="98"
            value={icuOccupancy}
            onChange={(e) => setIcuOccupancy(Number(e.target.value))}
            className="w-full accent-[#22c55e]"
          />
        </div>

        <div>
          <label className="font-mono text-[11px] text-slate-500 dark:text-[#8b949e] block mb-1">
            Bed Turnover Communication Protocol
          </label>
          <div className="grid grid-cols-2 gap-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setTurnoverProtocol('standard')}
              className={`py-1.5 rounded border ${
                turnoverProtocol === 'standard'
                  ? 'bg-slate-700 text-white border-transparent'
                  : 'border-slate-200 dark:border-[#30363d] text-slate-600 dark:text-[#8b949e]'
              }`}
            >
              Standard Manual
            </button>
            <button
              type="button"
              onClick={() => setTurnoverProtocol('automated')}
              className={`py-1.5 rounded border ${
                turnoverProtocol === 'automated'
                  ? 'bg-emerald-600 text-white dark:bg-[#22c55e] dark:text-[#041b24] font-bold border-transparent'
                  : 'border-slate-200 dark:border-[#30363d] text-slate-600 dark:text-[#8b949e]'
              }`}
            >
              Automated Push (-41m)
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-3.5 bg-emerald-50/70 dark:bg-[#161b22] border border-emerald-200 dark:border-[#22c55e]/30 rounded-lg font-mono">
        <div>
          <span className="text-xs text-slate-500 dark:text-[#8b949e] block">
            Estimated Median ER Boarding Latency
          </span>
          <span className="text-xl font-bold text-emerald-600 dark:text-[#22c55e]">
            {estimatedDwellTime} mins
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 dark:text-[#8b949e] block">
            Two-Way ANOVA Confidence
          </span>
          <span className="text-xs font-semibold text-blue-600 dark:text-[#00f2fe]">
            p &lt; 0.005 Across 9 Census Regions
          </span>
        </div>
      </div>
    </div>
  );
};
