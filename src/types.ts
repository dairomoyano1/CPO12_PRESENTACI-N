export type SemaphorColor = 'green' | 'yellow' | 'red' | 'magenta';

export interface ObligationKPI {
  id: string;
  name: string;
  authority: 'ANLA' | 'Cormacarena';
  instrument: string;
  targets: string;
  financialTarget: string;
  executedFinancial: string;
  location: string;
  operationalStatus: string;
  semaphore: 'Amarillo (Mantenimiento)' | 'Rojo (Riesgo Resiembra)' | 'Magenta (Urgencia Crítica)' | 'Verde (Conforme)';
  semaphoreColor: SemaphorColor;
  criticalNotice?: string;
  actionRequired: string;
  deadline?: string;
}

export interface LoteForestal {
  id: string;
  loteName: string;
  areaHa: number;
  establishedYear: number;
  survivalRate: number;
  status: string;
  radicado?: string;
  acta?: string;
  actionsDone: string;
  pendingActions: string;
}

export interface GEEDataPoint {
  year: number;
  coveragePercent: number;
  milestone: string;
  notes: string;
  anomaly?: 'peak' | 'fire_drop' | 'recovery';
}

export interface Basin1Percent {
  id: string;
  basinName: string;
  predio: string;
  areaHa: number;
  establishedYear: number;
  survivalRate: number;
  affectedByFire: boolean;
  affectedHa: number;
  status: string;
  regulatoryRequirement: string;
  riskLevel: 'Bajo' | 'Severo' | 'Crítico';
}

export interface TimelineNode {
  id: string;
  period: string;
  date: string;
  title: string;
  lane: 'Actas ANLA' | 'Contratos' | 'Gestiones Técnicas';
  status: 'conforme' | 'critico' | 'tramite';
  radicado?: string;
  description: string;
  legalBasis?: string;
}

export interface CormacarenaStep {
  stepNumber: number;
  date: string;
  title: string;
  radicadoOrConcept: string;
  description: string;
  isUrgent?: boolean;
  isCompleted: boolean;
}

export interface SeismicWaterCostItem {
  id: string;
  project: string;
  act: string;
  year: number;
  areaHa: number;
  reservoirsCount: number;
  investmentCOP: number;
  costPerHaCOP: number;
}

export interface ScenarioComparison {
  parameter: string;
  scenario1Conservador: {
    title: string;
    costCOP: number;
    notes: string;
  };
  scenario2Eficiente: {
    title: string;
    costCOP: number;
    notes: string;
  };
}

export interface SlideData {
  id: number;
  slideNumber: number;
  title: string;
  subtitle?: string;
  objective: string;
  badge?: string;
}

export interface PredioTimelineNode {
  year: number;
  month?: string;
  type: 'establecimiento' | 'mantenimiento' | 'cierre' | 'mantenimiento_extra' | 'siembra' | 'contrato_inicio' | 'otrosi' | 'contrato_fin';
  label: string;
  icon: 'hourglass' | 'drop' | 'check' | 'wrench' | 'sprout' | 'file' | 'flag';
  color: string;
  description: string;
  radicadoOrActa?: string;
}

export interface PredioTimelineSpan {
  startYear: number;
  endYear: number;
  color: string;
  label?: string;
  sublabel?: string;
}

export interface PredioTimelineRow {
  id: string;
  category: 'compensacion' | 'inversion_1' | 'contractual';
  categoryTitle: string;
  rowNumber: number;
  rowTitle: string;
  predio: string;
  areaHa?: number;
  spans: PredioTimelineSpan[];
  nodes: PredioTimelineNode[];
  summaryNote?: string;
  linkedSlideNumber: number;
}

export interface SanctionProcessRecord {
  codExpediente: string;
  fechaNotificacion: string;
  cargosFormulados: string;
  valoracionRiesgo: string;
  riesgoRango: string;
  valorMultaCop: number;
  valorMultaCopFormatted: string;
  valorMultaUsd: number;
  valorMultaUsdFormatted: string;
  etapaProcesal: string;
  normasInvolucradas: string[];
  conductaResumen: string;
}


