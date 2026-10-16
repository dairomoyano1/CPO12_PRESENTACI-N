import React, { useState, useMemo } from 'react';
import {
  COMPENSATION_SCENARIOS,
} from './Slide6EscenariosCompensacion';
import {
  INVERSION_1_PORCIENTO_SCENARIOS,
} from './Slide7EstrategiaInversion1Porciento';
import {
  DollarSign,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Sparkles,
  TrendingUp,
  Percent,
  CheckCircle2,
  SlidersHorizontal,
  FileSpreadsheet,
  ArrowRight,
  Info,
  ChevronRight,
  Calculator,
  Compass,
  Zap,
  Award,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
  Legend,
  PieChart,
  Pie
} from 'recharts';

interface Slide8Props {
  onNavigateToSlide?: (slideNumber: number) => void;
  hiddenSlides?: number[];
}

interface PresetOption {
  id: string;
  name: string;
  badge: string;
  badgeBg: string;
  description: string;
  compScenarioId: number;
  invScenarioId: number;
  icon: React.ReactNode;
}

const PRESETS: PresetOption[] = [
  {
    id: 'min-cost',
    name: 'Mínimo Costo Inmediato',
    badge: 'Menor Inversión: $602,2M',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Comp. Esc 1 (Postmant. 11,9 ha) + 1% Esc 2 (Postmant. 4 ha). Menor costo nominal pero sujeto a objeciones ANLA.',
    compScenarioId: 1,
    invScenarioId: 2,
    icon: <Zap className="w-4 h-4 text-emerald-600" />,
  },
  {
    id: 'max-prob',
    name: 'Máximo Blindaje Predial PNN',
    badge: 'Máxima Certeza (85% / 85%): $1.025,6M',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Comp. Esc 2 (PNN 61,3 ha) + 1% Esc 3 (Saneamiento ~38,3 ha). Cero riesgo de mortandad de siembras y blindaje definitivo.',
    compScenarioId: 2,
    invScenarioId: 3,
    icon: <Award className="w-4 h-4 text-purple-600" />,
  },
  {
    id: 'balanced-rec',
    name: 'Estrategia Recomendada Corporativa',
    badge: 'Recomendada: $1.043,4M',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Comp. Esc 3 (Mixto PNN 22 ha) + 1% Esc 1 (Aceptación 4 ha + Saldo $154M). Excelente balance costo, tiempo y probabilidad.',
    compScenarioId: 3,
    invScenarioId: 1,
    icon: <Sparkles className="w-4 h-4 text-blue-600" />,
  },
  {
    id: 'pure-predial',
    name: '100% Adquisición / Saneamiento Predial',
    badge: 'Sin Mantenimiento: $1.025,6M',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Comp. Esc 2 (PNN 61,3 ha) + 1% Esc 3 (Adquisición $257,5M). Entrega predial a Parques sin riesgo de mortandad de siembras.',
    compScenarioId: 2,
    invScenarioId: 3,
    icon: <Compass className="w-4 h-4 text-amber-600" />,
  },
  {
    id: 'total-postmantenimiento',
    name: '100% Postmantenimiento en Campo',
    badge: 'Máx. Operación Campo: $1.387,9M',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Comp. Esc 4 (30,4 ha La Holanda) + 1% Esc 4 (Postmantenimiento 3 años 10 ha). Extensión de labores operativas y resiembras.',
    compScenarioId: 4,
    invScenarioId: 4,
    icon: <SlidersHorizontal className="w-4 h-4 text-rose-600" />,
  },
];

const COLORS_PIE = ['#001871', '#E31C79', '#f59e0b', '#10b981', '#6366f1'];

export const Slide8MatrizCombinadaCostos: React.FC<Slide8Props> = ({
  onNavigateToSlide,
  hiddenSlides = [4, 10],
}) => {
  const [selectedCompId, setSelectedCompId] = useState<number>(3); // Default to Recommended Esc 3
  const [selectedInvId, setSelectedInvId] = useState<number>(1);   // Default to Recommended Esc 1
  const [activeTab, setActiveTab] = useState<'matrix' | 'charts' | 'details'>('matrix');

  // Selected Scenarios Data
  const compScenario = useMemo(() => {
    return COMPENSATION_SCENARIOS.find((s) => s.id === selectedCompId) || COMPENSATION_SCENARIOS[0];
  }, [selectedCompId]);

  const invScenario = useMemo(() => {
    return INVERSION_1_PORCIENTO_SCENARIOS.find((s) => s.id === selectedInvId) || INVERSION_1_PORCIENTO_SCENARIOS[0];
  }, [selectedInvId]);

  // Combined Calculations
  const combinedTotalCOP = compScenario.totalCostCOP + invScenario.totalCostCOP;
  const combinedTotalMillions = Number((combinedTotalCOP / 1000000).toFixed(1));
  const combinedImprevistosCOP = compScenario.imprevistosCOP + invScenario.imprevistosCOP;
  const combinedImprevistosMillions = Number((combinedImprevistosCOP / 1000000).toFixed(1));
  
  // Max time horizon between the two (since obligations can be executed in parallel or coordinated)
  const combinedMaxTimeYears = Math.max(compScenario.timeYears, invScenario.timeYears);

  // Composite Probability
  const averageProbability = Math.round((compScenario.probabilityPercent + invScenario.probabilityPercent) / 2);
  const compositeProbabilityLabel =
    averageProbability >= 75 ? 'Alta' : averageProbability >= 45 ? 'Media' : 'Baja';

  // Overall Risk Level
  const combinedRisk: 'Bajo' | 'Medio' | 'Alto' =
    compScenario.anlaRisk === 'Alto' || invScenario.anlaRisk === 'Alto'
      ? 'Alto'
      : compScenario.anlaRisk === 'Medio' || invScenario.anlaRisk === 'Medio'
        ? 'Medio'
        : 'Bajo';

  // Format currency
  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  // 16 Combinations Calculation for Matrix View
  const matrix16Combinations = useMemo(() => {
    const list = [];
    for (const c of COMPENSATION_SCENARIOS) {
      for (const i of INVERSION_1_PORCIENTO_SCENARIOS) {
        const total = c.totalCostCOP + i.totalCostCOP;
        const avgProb = Math.round((c.probabilityPercent + i.probabilityPercent) / 2);
        const maxTime = Math.max(c.timeYears, i.timeYears);
        const isSelected = c.id === selectedCompId && i.id === selectedInvId;

        list.push({
          compId: c.id,
          compCode: c.code,
          compName: c.shortTitle,
          compCost: c.totalCostCOP,
          compProb: c.probabilityPercent,
          invId: i.id,
          invCode: i.code,
          invName: i.shortTitle,
          invCost: i.totalCostCOP,
          invProb: i.probabilityPercent,
          totalCOP: total,
          totalMillions: Number((total / 1000000).toFixed(1)),
          totalFormatted: formatCOP(total),
          avgProb,
          probLabel: avgProb >= 75 ? 'Alta' : avgProb >= 45 ? 'Media' : 'Baja',
          maxTime,
          isSelected,
        });
      }
    }
    return list;
  }, [selectedCompId, selectedInvId]);

  // Breakdown for Doughnut Chart
  const pieData = useMemo(() => {
    const compBaseCost = compScenario.totalCostCOP - compScenario.imprevistosCOP;
    const invBaseCost = invScenario.totalCostCOP - invScenario.imprevistosCOP;
    
    return [
      {
        name: 'Compensación Forestal (Base)',
        value: Number((compBaseCost / 1000000).toFixed(1)),
        color: '#001871',
      },
      {
        name: 'Inversión del 1% (Base)',
        value: Number((invBaseCost / 1000000).toFixed(1)),
        color: '#E31C79',
      },
      {
        name: 'Imprevistos Combinados',
        value: Number((combinedImprevistosCOP / 1000000).toFixed(1)),
        color: '#f59e0b',
      },
    ];
  }, [compScenario, invScenario, combinedImprevistosCOP]);

  // Comparison of All 16 combinations for Bar Chart
  const bar16ChartData = useMemo(() => {
    return matrix16Combinations.map((item) => ({
      name: `C${item.compId} + I${item.invId}`,
      fullName: `Comp. ${item.compId} + 1% ${item.invId}`,
      totalMillions: item.totalMillions,
      compMillions: Number((item.compCost / 1000000).toFixed(1)),
      invMillions: Number((item.invCost / 1000000).toFixed(1)),
      avgProb: item.avgProb,
      isSelected: item.isSelected,
      compId: item.compId,
      invId: item.invId,
    }));
  }, [matrix16Combinations]);

  const minComb = useMemo(() => {
    if (!matrix16Combinations.length) return null;
    return [...matrix16Combinations].sort((a, b) => a.totalCOP - b.totalCOP)[0];
  }, [matrix16Combinations]);

  const maxComb = useMemo(() => {
    if (!matrix16Combinations.length) return null;
    return [...matrix16Combinations].sort((a, b) => b.totalCOP - a.totalCOP)[0];
  }, [matrix16Combinations]);

  return (
    <section className="min-h-full bg-white text-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#001871] text-white text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider font-mono">
                Diapositiva 9 | Consolidado Financiero ANLA
              </span>
              <span className="bg-[#E31C79]/10 text-[#E31C79] border border-[#E31C79]/30 text-[11px] font-bold px-2.5 py-0.5 rounded font-mono">
                Simulador Interactivo de Decisión
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#001871] tracking-tight">
              Matriz Integrada de Costos Totales: Compensación Forestal + Inversión del 1%
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl">
              Seleccione cualquier combinación de escenarios para calcular el desembolso total consolidado, el horizonte temporal conjunto y la probabilidad de cierre técnico ante la ANLA (Bloque CPO-12).
            </p>
          </div>

          {/* Tab View Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'matrix'
                  ? 'bg-[#001871] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Matriz 4x4
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'charts'
                  ? 'bg-[#001871] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Gráficos Comparativos
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'details'
                  ? 'bg-[#001871] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Actividades Desglosadas
            </button>
          </div>
        </div>

        {/* Quick Presets Strip */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E31C79]" />
              Preajustes de Estrategia Corporativa (Click para simular):
            </span>
            <span className="text-[11px] text-slate-500 font-normal">
              16 combinaciones posibles evaluadas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {PRESETS.map((preset) => {
              const isMatch =
                selectedCompId === preset.compScenarioId &&
                selectedInvId === preset.invScenarioId;

              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedCompId(preset.compScenarioId);
                    setSelectedInvId(preset.invScenarioId);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    isMatch
                      ? 'bg-[#001871]/5 border-[#001871] ring-2 ring-[#001871]/30 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1">
                      {preset.icon}
                      {preset.name}
                    </span>
                    {isMatch && (
                      <span className="w-4 h-4 rounded-full bg-[#001871] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border inline-block mb-1 ${preset.badgeBg}`}>
                    {preset.badge}
                  </span>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Dual-Selector Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Column 1: Compensación Forestal Scenarios (30,4 ha) */}
          <div className="lg:col-span-6 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#001871]"></span>
                <h3 className="text-sm font-bold text-[#001871] font-display">
                  1. Escenario de Compensación Forestal
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                Seleccionado: Escenario {selectedCompId}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {COMPENSATION_SCENARIOS.map((s) => {
                const isSelected = selectedCompId === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedCompId(s.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-[#001871] ring-2 ring-[#001871]/20 shadow-xs'
                        : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-black text-[#001871]">
                          Escenario {s.id}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                          s.probability === 'Alta'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : s.probability === 'Media'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : s.probability === 'Baja'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          Prob. {s.probability} ({s.probabilityPercent}%)
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 mb-1.5">
                        {s.shortTitle}
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px]">
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-slate-500">Costo Total:</span>
                        <span className="font-bold text-slate-900">{s.totalCostFormatted}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-500">
                        <span>Horizonte:</span>
                        <span className="font-semibold text-slate-700">{s.timeLabel}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Inversión del 1% Scenarios (10,0 ha) */}
          <div className="lg:col-span-6 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E31C79]"></span>
                <h3 className="text-sm font-bold text-[#E31C79] font-display">
                  2. Escenario de Inversión del 1%
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                Seleccionado: Escenario {selectedInvId}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {INVERSION_1_PORCIENTO_SCENARIOS.map((s) => {
                const isSelected = selectedInvId === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedInvId(s.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-[#E31C79] ring-2 ring-[#E31C79]/20 shadow-xs'
                        : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-black text-[#E31C79]">
                          Escenario {s.id}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                          s.probability === 'Alta'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : s.probability === 'Media'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : s.probability === 'Baja'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          Prob. {s.probability} ({s.probabilityPercent}%)
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 mb-1.5">
                        {s.shortTitle}
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px]">
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-slate-500">Costo Total:</span>
                        <span className="font-bold text-slate-900">{s.totalCostFormatted}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-500">
                        <span>Horizonte:</span>
                        <span className="font-semibold text-slate-700">{s.timeLabel}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Consolidated KPI Banner */}
        <div className="bg-linear-to-r from-[#001871] via-[#102482] to-[#201747] text-white p-5 sm:p-6 rounded-2xl shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Main Total Callout */}
            <div className="space-y-1 lg:border-r lg:border-white/10 lg:pr-8">
              <div className="flex items-center gap-2">
                <span className="bg-[#E31C79] text-white text-[10px] font-black px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  Combinación Activa: Comp. {selectedCompId} + 1% {selectedInvId}
                </span>
                <span className="text-xs text-slate-300">
                  Total Consolidado Obligaciones
                </span>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>{formatCOP(combinedTotalCOP)}</span>
                <span className="text-sm font-normal text-emerald-400 font-sans">
                  (~${combinedTotalMillions} M COP)
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Compensación Forestal ({compScenario.totalCostFormatted}) + Inversión 1% ({invScenario.totalCostFormatted})
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
              
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="text-slate-300 text-[11px] flex items-center gap-1 mb-1">
                  <Clock className="w-3.5 h-3.5 text-blue-300" />
                  Plazo Máximo
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  {combinedMaxTimeYears.toFixed(1)} Años
                </div>
                <div className="text-[10px] text-slate-300">
                  {Math.round(combinedMaxTimeYears * 12)} Meses horizonte
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="text-slate-300 text-[11px] flex items-center gap-1 mb-1">
                  <Percent className="w-3.5 h-3.5 text-purple-300" />
                  Prob. Combinada
                </div>
                <div className="text-lg font-bold text-white font-mono flex items-center gap-1.5">
                  <span>{averageProbability}%</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                    averageProbability >= 75
                      ? 'bg-emerald-400/30 text-emerald-200 border border-emerald-400/40'
                      : averageProbability >= 45
                        ? 'bg-blue-400/30 text-blue-200 border border-blue-400/40'
                        : 'bg-amber-400/30 text-amber-200 border border-amber-400/40'
                  }`}>
                    {compositeProbabilityLabel}
                  </span>
                </div>
                <div className="text-[10px] text-slate-300">
                  Promedio técnico ponderado
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="text-slate-300 text-[11px] flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                  Imprevistos Ponderados
                </div>
                <div className="text-lg font-bold text-amber-300 font-mono">
                  ${combinedImprevistosMillions} M
                </div>
                <div className="text-[10px] text-slate-300">
                  {formatCOP(combinedImprevistosCOP)}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="text-slate-300 text-[11px] flex items-center gap-1 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  Riesgo ANLA
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  {combinedRisk}
                </div>
                <div className="text-[10px] text-slate-300">
                  Exposición regulatoria
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Tab 1: 4x4 Heatmap Matrix View */}
        {activeTab === 'matrix' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#001871]" />
                  Matriz Cruzada de las 16 Combinaciones de Cierre (4 x 4)
                </h3>
                <p className="text-xs text-slate-500">
                  Haga click sobre cualquier celda para activar inmediatamente esa combinación en el simulador.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Bajo Costo (&lt; $800M)
                </span>
                <span className="flex items-center gap-1 text-blue-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  Medio ($800M - $1.100M)
                </span>
                <span className="flex items-center gap-1 text-purple-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  Alto (&gt; $1.100M)
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200">
                    <th className="p-3 font-bold text-slate-700 w-44">
                      Compensación \ Inversión 1%
                    </th>
                    {INVERSION_1_PORCIENTO_SCENARIOS.map((inv) => (
                      <th key={inv.id} className="p-3 text-center border-l border-slate-200">
                        <div className="font-bold text-[#E31C79] text-xs">
                          1% Escenario {inv.id}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {inv.totalCostFormatted}
                        </div>
                        <div className="text-[9px] text-slate-400 font-normal">
                          Prob. {inv.probability} ({inv.probabilityPercent}%)
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {COMPENSATION_SCENARIOS.map((comp) => (
                    <tr key={comp.id} className="hover:bg-slate-50/50">
                      
                      {/* Row Header */}
                      <td className="p-3 bg-slate-50/80 border-r border-slate-200 font-semibold text-slate-800">
                        <div className="font-bold text-[#001871]">
                          Comp. Escenario {comp.id}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {comp.totalCostFormatted}
                        </div>
                        <div className="text-[9px] text-slate-400 font-normal">
                          Prob. {comp.probability} ({comp.probabilityPercent}%) | {comp.timeLabel}
                        </div>
                      </td>

                      {/* 4 Cells for this Row */}
                      {INVERSION_1_PORCIENTO_SCENARIOS.map((inv) => {
                        const total = comp.totalCostCOP + inv.totalCostCOP;
                        const totalM = Number((total / 1000000).toFixed(1));
                        const avgP = Math.round((comp.probabilityPercent + inv.probabilityPercent) / 2);
                        const isSelected = selectedCompId === comp.id && selectedInvId === inv.id;

                        // Color pill styling based on amount
                        const pillBg =
                          total < 800000000
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                            : total <= 1100000000
                              ? 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100'
                              : 'bg-purple-50 text-purple-800 border-purple-300 hover:bg-purple-100';

                        return (
                          <td
                            key={inv.id}
                            onClick={() => {
                              setSelectedCompId(comp.id);
                              setSelectedInvId(inv.id);
                            }}
                            className={`p-3 text-center border-l border-slate-200 cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#001871]/10 ring-2 ring-inset ring-[#001871]'
                                : 'hover:bg-slate-100/60'
                            }`}
                          >
                            <div className={`p-2 rounded-xl border ${pillBg} flex flex-col items-center justify-between`}>
                              <span className="font-extrabold text-xs font-mono">
                                ${totalM} M COP
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">
                                {formatCOP(total)}
                              </span>
                              <div className="flex items-center gap-1.5 mt-1 text-[10px]">
                                <span className="font-bold">
                                  Prob: {avgP}%
                                </span>
                                <span>•</span>
                                <span>
                                  {Math.max(comp.timeYears, inv.timeYears)} Años
                                </span>
                              </div>
                              {isSelected && (
                                <span className="mt-1 bg-[#001871] text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                                  Activo
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Comparative Charts */}
        {activeTab === 'charts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Chart 1: Bar Comparison of 16 Options */}
            <div className="lg:col-span-8 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#001871]" />
                    Comparativa de las 16 Combinaciones ($ Millones COP)
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Barra Destacada = Combinación Actual
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Rango de inversión: Desde ${minComb ? `${minComb.totalMillions}M (C${minComb.compId}+I${minComb.invId})` : '$602,2M'} hasta ${maxComb ? `${maxComb.totalMillions}M (C${maxComb.compId}+I${maxComb.invId})` : '$1.278,7M'}.
                </p>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={bar16ChartData}
                    margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis
                      dataKey="name"
                      stroke="#475569"
                      fontSize={10}
                      tickLine={false}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis
                      stroke="#475569"
                      fontSize={11}
                      tickLine={false}
                      tickFormatter={(val) => `$${val}M`}
                      domain={[0, 1350]}
                    />
                    <Tooltip
                      formatter={(val: any, name: string) => {
                        return [`$${val} Millones COP`, 'Costo Total Consolidado'];
                      }}
                      labelFormatter={(label) => `Combinación ${label}`}
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '12px',
                      }}
                    />
                    <Bar
                      dataKey="totalMillions"
                      radius={[4, 4, 0, 0]}
                      onClick={(entry) => {
                        if (entry && entry.compId && entry.invId) {
                          setSelectedCompId(entry.compId);
                          setSelectedInvId(entry.invId);
                        }
                      }}
                    >
                      {bar16ChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.isSelected ? '#E31C79' : entry.totalMillions < 800 ? '#059669' : entry.totalMillions <= 1100 ? '#2563eb' : '#7c3aed'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                <span>Mínimo: <strong>${minComb ? `${minComb.totalMillions}M COP (C${minComb.compId}+I${minComb.invId})` : '$602,2M COP'}</strong></span>
                <span className="text-pink-600 font-bold">Seleccionado: ${combinedTotalMillions}M COP (C{selectedCompId}+I{selectedInvId})</span>
                <span>Máximo: <strong>${maxComb ? `${maxComb.totalMillions}M COP (C${maxComb.compId}+I${maxComb.invId})` : '$1.278,7M COP'}</strong></span>
              </div>
            </div>

            {/* Chart 2: Cost Breakdown of Selected Pair */}
            <div className="lg:col-span-4 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
                  <Layers className="w-4 h-4 text-[#E31C79]" />
                  Composición de la Combinación
                </h4>
                <p className="text-xs text-slate-500 mb-2">
                  Desglose porcentual entre ambas obligaciones e imprevistos.
                </p>
              </div>

              <div className="h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`pie-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`$${val} M COP`, 'Subtotal']}
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#001871]"></span>
                    Compensación Forestal:
                  </span>
                  <span className="font-bold font-mono">
                    {formatCOP(compScenario.totalCostCOP)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E31C79]"></span>
                    Inversión del 1%:
                  </span>
                  <span className="font-bold font-mono">
                    {formatCOP(invScenario.totalCostCOP)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-amber-700">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Imprevistos Combinados:
                  </span>
                  <span className="font-bold font-mono">
                    {formatCOP(combinedImprevistosCOP)}
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Detailed Activity Tables */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* Activities Comp */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs text-[#001871] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#001871]"></span>
                  Actividades: Compensación Escenario {compScenario.id}
                </span>
                <span className="text-xs font-mono font-bold text-slate-800">
                  {compScenario.totalCostFormatted}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-2">Actividad</th>
                      <th className="p-2 text-center">Tiempo</th>
                      <th className="p-2 text-right">Costo ($ COP)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {compScenario.activities.map((act, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-2">
                          <div className="font-semibold text-slate-900">{act.actividad}</div>
                          <div className="text-[10px] text-slate-500">{act.observacion}</div>
                        </td>
                        <td className="p-2 text-center text-slate-600 font-mono">{act.tiempo}</td>
                        <td className="p-2 text-right font-mono font-bold text-slate-800">{act.costoFormatted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activities 1% */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs text-[#E31C79] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E31C79]"></span>
                  Actividades: Inversión 1% Escenario {invScenario.id}
                </span>
                <span className="text-xs font-mono font-bold text-slate-800">
                  {invScenario.totalCostFormatted}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-2">Actividad</th>
                      <th className="p-2 text-center">Tiempo</th>
                      <th className="p-2 text-right">Costo ($ COP)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invScenario.activities.map((act, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-2">
                          <div className="font-semibold text-slate-900">{act.actividad}</div>
                          <div className="text-[10px] text-slate-500">{act.observacion}</div>
                        </td>
                        <td className="p-2 text-center text-slate-600 font-mono">{act.tiempo}</td>
                        <td className="p-2 text-right font-mono font-bold text-slate-800">{act.costoFormatted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Executive Takeaway Guidance Box */}
        <div className="bg-[#001871]/5 border border-[#001871]/20 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-center gap-2 text-[#001871] font-bold">
            <Info className="w-4 h-4 shrink-0" />
            <span>Dictamen y Conclusiones del Comité Técnico-Financiero para Bloque CPO-12</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            La combinación seleccionada (<strong>Compensación {compScenario.code}</strong> + <strong>Inversión 1% {invScenario.code}</strong>) consolida una inversión total de <strong>{formatCOP(combinedTotalCOP)}</strong> con un horizonte de ejecución máximo de <strong>{combinedMaxTimeYears.toFixed(1)} años</strong> y una probabilidad compuesta de <strong>{averageProbability}% ({compositeProbabilityLabel})</strong>.
            {selectedCompId === 3 && selectedInvId === 1 && (
              <span className="text-blue-900 font-semibold block mt-1">
                ⭐ <strong>Recomendación Estratégica:</strong> Esta configuración maximiza la probabilidad de aprobación al sustituir los lotes críticos de La Holanda por 22 ha en PNN (Parques Nacionales Naturales) e integrar la aceptación de las 4 ha de Caño Pilón con formulación de obras biomecánicas, evitando objeciones recurrentes de ANLA.
              </span>
            )}
            {selectedCompId === 1 && selectedInvId === 2 && (
              <span className="text-emerald-900 font-semibold block mt-1">
                ⚠️ <strong>Advertencia Financiera:</strong> Representa el menor desembolso financiero ($602,2M), pero mantiene una probabilidad baja/media supeditada al resultado estricto del inventario forestal y a la aceptación no objetada de los postmantenimientos por ANLA.
              </span>
            )}
            {selectedCompId === 3 && selectedInvId === 4 && (
              <span className="text-purple-900 font-semibold block mt-1">
                🛡️ <strong>Máximo Blindaje Técnico:</strong> Con una probabilidad conjunta del 85%, garantiza el cierre mediante saneamiento perimetral en PNN y postmantenimiento extendido de 2 años en Caño Pilón con resiembras de mayor porte.
              </span>
            )}
          </p>
        </div>

        {/* Slide Navigation Footer */}
        {onNavigateToSlide && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
            <button
              onClick={() => onNavigateToSlide(9)}
              className="flex items-center gap-1 text-slate-600 hover:text-[#001871] font-semibold transition-colors"
            >
              ← Volver a Diapositiva 9 (Inversión 1%)
            </button>
            <span className="text-slate-400 font-mono">
              {hiddenSlides.includes(10) ? 'Oculta en vista general' : 'Diapositiva 10 de 12'}
            </span>
            <button
              onClick={() => onNavigateToSlide(11)}
              className="flex items-center gap-1 text-[#001871] hover:text-[#E31C79] font-bold transition-colors"
            >
              Ir a Diapositiva 11 (Cormacarena Proceso) →
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
