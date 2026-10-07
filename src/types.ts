export interface HeroStage {
  id: number;
  title: string;
  shortName: string;
  shape: 'shape-circle' | 'shape-rectangle' | 'shape-triangle' | 'shape-square';
  shapeLabel: string;
  badge: string;
  color: string;
  lightColor: string;
  photoUrl: string;
  tracerId: 'tracer-circle' | 'tracer-rect' | 'tracer-triangle' | 'tracer-square';
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
  icon: string;
  accentColor: string;
}

export interface CompetencyItem {
  modId: string;
  title: string;
  description: string;
  coreArsenal: string;
  icon: string;
  accentColor: string;
  details?: {
    overview: string;
    keyDeliverables: string[];
    methodologies: string[];
  };
}

export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  accuracyMetric: {
    label: string;
    value: string;
  };
  scopeMetric: {
    label: string;
    value: string;
  };
  appliedStack: string[];
  icon: string;
  themeColor: string;
  githubUrl?: string;
  details: {
    problemStatement: string;
    solutionArchitecture: string;
    keyFindings: string[];
    technicalHighlights: string[];
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  department: string;
  dateRange: string;
  highlights: string[];
  tools: string[];
  themeColor: string;
  icon: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  themeColor: string;
  skills: {
    name: string;
    percentage: number;
  }[];
  focusAreas: string;
}
