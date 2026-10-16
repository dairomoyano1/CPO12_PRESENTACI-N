import React, { useState } from 'react';
import { SlideHeader } from './SlideHeader';
import {
  DollarSign,
  Clock,
  Trees,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  ArrowRight,
  TrendingDown,
  Layers,
  ShieldAlert,
  Info,
  Scale,
  Sparkles,
  BarChart3,
  Percent
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line
} from 'recharts';

interface ScenarioDetail {
  id: number;
  code: string;
  name: string;
  shortTitle: string;
  description: string;
  timeYears: number;
  timeLabel: string;
  areaHa: number;
  areaLabel: string;
  totalCostCOP: number;
  totalCostFormatted: string;
  imprevistosCOP: number;
  probability: 'Muy Baja' | 'Baja' | 'Media' | 'Alta';
  probabilityPercent: number;
  anlaRisk: 'Bajo' | 'Medio' | 'Alto';
  color: string;
  badgeBg: string;
  badgeText: string;
  accentBorder: string;
  activities: {
    actividad: string;
    tiempo: string;
    costoCOP: number;
    costoFormatted: string;
    observacion: string;
  }[];
}

export const COMPENSATION_SCENARIOS: ScenarioDetail[] = [
  {
    id: 1,
    code: 'ESC-1',
    shortTitle: 'Escenario 1: Aceptación 18,6 ha + Postmantenimiento 11,9 ha',
    name: 'La ANLA Acepta las 18,6 ha (lote 1 y 2), con un inventario favorable para implementar un postmantenimiento en los lotes 3 y 4 (11,9 ha)',
    description: 'Cierre parcial favorable de Lotes 1 y 2 (18,6 ha) e intervención concentrada en Lotes 3 y 4 por 1 año de postmantenimiento.',
    timeYears: 1.5,
    timeLabel: '1,5 Años (18 Meses)',
    areaHa: 11.9,
    areaLabel: '11,9 ha (Lotes 3 y 4)',
    totalCostCOP: 398092872.83,
    totalCostFormatted: '$ 398.092.872,83',
    imprevistosCOP: 49218574.57,
    probability: 'Muy Baja',
    probabilityPercent: 15,
    anlaRisk: 'Medio',
    color: '#059669', // Emerald
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Menor Costo (Prob. Muy Baja)',
    accentBorder: 'border-emerald-500',
    activities: [
      {
        actividad: 'Mantenimiento 11,9 ha Lote 3 y Lote 4 (Dos completos, dos parciales)',
        tiempo: '1 año',
        costoCOP: 184291332.54,
        costoFormatted: '$ 184.291.332,54',
        observacion: 'Se proyecta un postmantenimiento de un año para cerrar la obligación (11,9 ha × $15.486.666,60 COP/ha)',
      },
      {
        actividad: 'Cambio de aislamiento (352,04 m)',
        tiempo: '1 año',
        costoCOP: 12582965.72,
        costoFormatted: '$ 12.582.965,72',
        observacion: 'Se proyecta un postmantenimiento de un año para cerrar la obligación',
      },
      {
        actividad: 'Imprevistos 25 %',
        tiempo: '-',
        costoCOP: 49218574.57,
        costoFormatted: '$ 49.218.574,57',
        observacion: 'Contingencia técnica sobre actividades en campo',
      },
      {
        actividad: 'Aprobación ANLA',
        tiempo: '0,5 año',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Requiere análisis por parte de ANLA, mediana probabilidad de aprobación.',
      },
      {
        actividad: 'Seguimiento ANLA + Póliza (aproximado) $76 M/año',
        tiempo: '2 años',
        costoCOP: 152000000.0,
        costoFormatted: '$ 152.000.000,00',
        observacion: 'Seguimiento ANLA + Póliza ($76M/año x 2 años; 1,5 años de ejecución redondeando a 2 años)',
      },
    ],
  },
  {
    id: 2,
    code: 'ESC-2',
    shortTitle: 'Escenario 2: Acogimiento Nuevo Manual (PNN 61,3 ha)',
    name: 'Implementación de la compensación a través del acogimiento del nuevo manual con Acción de Preservación Estricta Saneamiento Predial en PNN (Parques Nacionales Naturales), aplicando los nuevos factores = 61,3 ha',
    description: 'Saneamiento y adquisición predial total en PNN bajo nuevo manual de compensaciones del MADS (61,3 ha requeridas por factor).',
    timeYears: 4.5,
    timeLabel: '4,5 Años (54 Meses)',
    areaHa: 61.3,
    areaLabel: '61,3 ha (PNN)',
    totalCostCOP: 883326765.32,
    totalCostFormatted: '$ 883.326.765,32',
    imprevistosCOP: 41211524.12,
    probability: 'Alta',
    probabilityPercent: 85,
    anlaRisk: 'Bajo',
    color: '#2563eb', // Blue
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
    badgeText: 'Blindaje Jurídico Definitivo (Prob. Alta)',
    accentBorder: 'border-blue-500',
    activities: [
      {
        actividad: 'Tiempos de gestión interna',
        tiempo: '0,50 año (6 meses)',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Gestión corporativa interna, autorizaciones de Junta, estructuración de términos de referencia y contratación (+6 meses sumados a ruta crítica)',
      },
      {
        actividad: 'Formulación',
        tiempo: '0,50 año',
        costoCOP: 50000000.0,
        costoFormatted: '$ 50.000.000,00',
        observacion: 'Diseño técnico y estructuración del plan de compensación',
      },
      {
        actividad: 'Aprobación por parte de ANLA',
        tiempo: '0,50 año',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Requiere análisis por parte de ANLA',
      },
      {
        actividad: 'Costo Directo de la Tierra (Adquisición): $5.000.000 COP/ha',
        tiempo: '3 años',
        costoCOP: 306500000.0,
        costoFormatted: '$ 306.500.000,00',
        observacion: 'Compra de 61,3 ha en PNN para entrega a Parques Nacionales Naturales',
      },
      {
        actividad: 'Costos Indirectos y Habilitantes (Técnico, Jurídico, Saneamiento y Cerramiento): $1.722.924 COP/ha',
        tiempo: '0',
        costoCOP: 105615241.2,
        costoFormatted: '$ 105.615.241,20',
        observacion: 'Costos Indirectos y Habilitantes (Técnico, Jurídico, Saneamiento, vallas y Cerramiento): $1.722.924 COP/ha',
      },
      {
        actividad: 'Imprevistos 10 % (Saneamiento Predial)',
        tiempo: '-',
        costoCOP: 41211524.12,
        costoFormatted: '$ 41.211.524,12',
        observacion: 'Margen de imprevistos del 10% exclusivo para componente de saneamiento predial',
      },
      {
        actividad: 'Seguimiento ANLA + Póliza (aproximado) $76 M/año',
        tiempo: '5 años',
        costoCOP: 380000000.0,
        costoFormatted: '$ 380.000.000,00',
        observacion: 'Seguimiento ANLA + Póliza ($76M/año x 5 años; 4,5 años de ejecución redondeando a 5 años)',
      },
    ],
  },
  {
    id: 3,
    code: 'ESC-3',
    shortTitle: 'Escenario 3: Mixto (22 ha PNN + Postmantenimiento 18,6 ha)',
    name: 'Implementación de la compensación a través del acogimiento del nuevo manual con Acción de Preservación Estricta Saneamiento Predial en PNN (Parques Nacionales Naturales), aplicando los nuevos factores = 22 ha para el lote 3 y 4 (10 ha) si no es viable en el inventario, adicional un postmantenimiento de las 18,6 ha (lote 1 y 2) restantes por un año',
    description: 'Estrategia combinada: Adquisición de 22 ha en PNN para sustituir Lotes 3 y 4 + 1 año de postmantenimiento en Lotes 1 y 2.',
    timeYears: 4.5,
    timeLabel: '4,5 Años (54 Meses)',
    areaHa: 22.0,
    areaLabel: '22 ha (PNN) + 18,6 ha (La Holanda)',
    totalCostCOP: 952759759.25,
    totalCostFormatted: '$ 952.759.759,25',
    imprevistosCOP: 86803432.49,
    probability: 'Media',
    probabilityPercent: 50,
    anlaRisk: 'Bajo',
    color: '#d97706', // Amber
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    badgeText: 'Estrategia Mixta (Prob. Media)',
    accentBorder: 'border-amber-500',
    activities: [
      {
        actividad: 'Tiempos de gestión interna',
        tiempo: '0,50 año (6 meses)',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Gestión corporativa interna, autorizaciones de Junta y contratación de consultoría especializada (+6 meses sumados a ruta crítica)',
      },
      {
        actividad: 'Formulación',
        tiempo: '0,50 año',
        costoCOP: 50000000.0,
        costoFormatted: '$ 50.000.000,00',
        observacion: 'Estructuración técnica de componentes duales',
      },
      {
        actividad: 'Aprobación por parte de ANLA',
        tiempo: '0,50 año',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Requiere análisis por parte de ANLA',
      },
      {
        actividad: 'Costo Directo de la Tierra (Adquisición): $5.000.000 COP/ha',
        tiempo: '3 años',
        costoCOP: 110000000.0,
        costoFormatted: '$ 110.000.000,00',
        observacion: 'Saneamiento y entrega de 22 ha a PNN',
      },
      {
        actividad: 'Costos Indirectos y Habilitantes (Técnico, Jurídico, Saneamiento y Cerramiento): $1.722.924 COP/ha',
        tiempo: '0',
        costoCOP: 37904328.0,
        costoFormatted: '$ 37.904.328,00',
        observacion: 'Costos Indirectos y Habilitantes (Técnico, Jurídico, Saneamiento , vallas y Cerramiento): $1.722.924 COP/ha',
      },
      {
        actividad: 'Mantenimiento 18,6 ha Lote 1 y Lote 2 (Dos completos, dos parciales)',
        tiempo: '1 año',
        costoCOP: 288051998.76,
        costoFormatted: '$ 288.051.998,76',
        observacion: 'Se proyecta un postmantenimiento de un año para cerrar la obligación (18,6 ha × $15.486.666,60 COP/ha)',
      },
      {
        actividad: 'Imprevistos Mixtos (10% Saneamiento + 25% Mantenimientos)',
        tiempo: '-',
        costoCOP: 86803432.49,
        costoFormatted: '$ 86.803.432,49',
        observacion: 'Contingencia combinada: 10% en saneamiento ($14,79M) + 25% en mantenimientos ($72,01M)',
      },
      {
        actividad: 'Seguimiento ANLA + Póliza (aproximado) $76 M/año',
        tiempo: '5 años',
        costoCOP: 380000000.0,
        costoFormatted: '$ 380.000.000,00',
        observacion: 'Seguimiento ANLA + Póliza ($76M/año x 5 años; 4,5 años de ejecución redondeando a 5 años)',
      },
    ],
  },
  {
    id: 4,
    code: 'ESC-4',
    shortTitle: 'Escenario 4: Postmantenimiento Total 30,4 ha por 1 Año',
    name: 'La ANLA no cierra las obligaciones y genera requerimientos post mantenimientos, adicional el inventario es viable para hacer un postmantenimiento en las 30 ha por un año',
    description: 'Postmantenimiento integral en los 4 lotes (30,4 ha) de Finca La Holanda con recambio perimetral de cerramientos por requerimiento de la ANLA.',
    timeYears: 1.5,
    timeLabel: '1,5 Años (18 Meses)',
    areaHa: 30.4,
    areaLabel: '30,4 ha (Lotes 1, 2, 3 y 4)',
    totalCostCOP: 784771759.2,
    totalCostFormatted: '$ 784.771.759,20',
    imprevistosCOP: 126554351.84,
    probability: 'Baja',
    probabilityPercent: 25,
    anlaRisk: 'Alto',
    color: '#dc2626', // Red
    badgeBg: 'bg-red-100 text-red-800 border-red-300',
    badgeText: 'Postmantenimiento Total 30 ha (Prob. Baja)',
    accentBorder: 'border-red-500',
    activities: [
      {
        actividad: 'Mantenimiento 30,4 Lote 1, 2, 3 y 4 (Dos completos, dos parciales)',
        tiempo: '1 año',
        costoCOP: 470794664.64,
        costoFormatted: '$ 470.794.664,64',
        observacion: 'Se proyecta un postmantenimiento de un año para cerrar la obligación',
      },
      {
        actividad: 'Cambio de aislamiento (991,04 m)',
        tiempo: '1 año',
        costoCOP: 35422742.72,
        costoFormatted: '$ 35.422.742,72',
        observacion: 'Se proyecta un postmantenimiento de un año para cerrar la obligación',
      },
      {
        actividad: 'Imprevistos 25 %',
        tiempo: '-',
        costoCOP: 126554351.84,
        costoFormatted: '$ 126.554.351,84',
        observacion: '25% de contingencia en campo',
      },
      {
        actividad: 'Aprobación ANLA',
        tiempo: '0,5 año',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Requiere análisis por parte de ANLA, mediana probabilidad de aprobación.',
      },
      {
        actividad: 'Seguimiento ANLA + Póliza (aproximado) $76 M/año',
        tiempo: '2 años',
        costoCOP: 152000000.0,
        costoFormatted: '$ 152.000.000,00',
        observacion: 'Seguimiento ANLA + Póliza ($76M/año x 2 años; 1,5 años de ejecución redondeando a 2 años)',
      },
    ],
  },
];

const CHART_DATA = COMPENSATION_SCENARIOS.map((s) => ({
  name: `Escenario ${s.id}`,
  shortCode: s.code,
  costMillions: Number((s.totalCostCOP / 1000000).toFixed(1)),
  probabilityPercent: s.probabilityPercent,
  probabilityLabel: s.probability,
  timeYears: s.timeYears,
  areaHa: s.areaHa,
  imprevistosMillions: Number((s.imprevistosCOP / 1000000).toFixed(1)),
  color: s.color,
}));

interface Slide6Props {
  onNavigateToSlide?: (slideNumber: number) => void;
}

export const Slide6EscenariosCompensacion: React.FC<Slide6Props> = ({ onNavigateToSlide }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<number>(1);
  const [activeView, setActiveView] = useState<'comparison' | 'table'>('comparison');

  const selectedScenario =
    COMPENSATION_SCENARIOS.find((s) => s.id === selectedScenarioId) || COMPENSATION_SCENARIOS[0];

  return (
    <div className="w-full h-full min-h-[640px] p-4 sm:p-6 lg:p-8 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl flex flex-col justify-between">
      <div>
        {/* Slide Header */}
        <SlideHeader
          slideNumber={8}
          totalSlides={12}
          title="Escenarios de Compensación Forestal y Cierre de Obligaciones"
          subtitle="Evaluación Técnico-Económica y Temporal ante la ANLA (Bloque CPO-12)"
          objective="Comparar los 4 escenarios de compensación en términos de costos ($COP), plazos (años), hectáreas e imprevistos para la toma de decisión corporativa."
          badge="Matriz Financiera & Temporal"
          isLight={true}
        />

        {/* Top Summary Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#001871] text-white flex items-center justify-center shadow-xs">
              <Scale className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#001871] uppercase tracking-tight font-display">
                Comparativa de Escenarios de Compensación ANLA
              </h3>
              <p className="text-xs text-slate-600">
                Lotes 1, 2, 3 y 4 (Finca La Holanda) vs. Acogimiento Nuevo Manual en PNN (Parques Nacionales Naturales)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('comparison')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'comparison'
                  ? 'bg-[#001871] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Gráficos Comparativos</span>
            </button>
            <button
              onClick={() => setActiveView('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'table'
                  ? 'bg-[#001871] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Tablas de Desglose</span>
            </button>
          </div>
        </div>

        {/* 4 Interactive Scenario Cards Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          {COMPENSATION_SCENARIOS.map((s) => {
            const isSelected = s.id === selectedScenarioId;
            return (
              <div
                key={s.id}
                onClick={() => setSelectedScenarioId(s.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-left relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? `${s.accentBorder} bg-slate-50 shadow-md ring-2 ring-offset-1 ring-blue-500/30`
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 shadow-2xs'
                }`}
              >
                {/* Top Badge & Code */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="text-xs font-black px-2 py-0.5 rounded-md font-mono text-white"
                      style={{ backgroundColor: s.color }}
                    >
                      {s.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.badgeBg}`}>
                      {s.badgeText}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 mb-3">
                    {s.shortTitle}
                  </h4>
                </div>

                {/* Metrics */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-slate-400" />
                      Costo:
                    </span>
                    <span className="font-extrabold font-mono text-slate-900">
                      {s.totalCostFormatted}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Percent className="w-3 h-3 text-slate-400" />
                      Probabilidad:
                    </span>
                    <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                      s.probability === 'Alta' 
                        ? 'text-emerald-800 bg-emerald-100/80 border border-emerald-300' 
                        : s.probability === 'Media' 
                          ? 'text-blue-800 bg-blue-100/80 border border-blue-300' 
                          : s.probability === 'Baja'
                            ? 'text-amber-800 bg-amber-100/80 border border-amber-300'
                            : 'text-rose-800 bg-rose-100/80 border border-rose-300'
                    }`}>
                      {s.probability} ({s.probabilityPercent}%)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      Tiempo:
                    </span>
                    <span className="font-bold text-slate-800">{s.timeLabel}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Trees className="w-3 h-3 text-slate-400" />
                      Área:
                    </span>
                    <span className="font-bold text-slate-800">{s.areaLabel}</span>
                  </div>
                </div>

                {isSelected && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: s.color }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Content Area: Either Visual Charts or Detailed Table */}
        {activeView === 'comparison' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
            
            {/* Chart 1: Cost Comparison ($ Millions COP) + Probability Line */}
            <div className="lg:col-span-6 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-extrabold text-[#001871] uppercase tracking-wide flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    Comparativa de Costo Total ($ Millones COP) vs Probabilidad
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Barras: Costo | Línea: Probabilidad
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Escenario 1 es el menor en costo ($398M, Prob. Muy Baja 15%); Escenario 2 cuenta con la mayor probabilidad de éxito técnico (Prob. Alta 85%, $807M) destacando por saneamiento predial en PNN (61,3 ha a $5.000.000/ha); y Escenario 3 plantea una estrategia mixta ($840M, Prob. Media 50%).
                </p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={CHART_DATA} margin={{ top: 15, right: 20, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis
                      dataKey="name"
                      stroke="#475569"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis
                      yAxisId="left"
                      stroke="#475569"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickFormatter={(val) => `$${val}M`}
                      domain={[0, 950]}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#7c3aed"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickFormatter={(val) => `${val}%`}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      formatter={(value: any, name: string, item: any) => {
                        if (name === 'Costo Total ($M)') return [`$${value} Millones COP`, 'Costo Total'];
                        if (name === 'Probabilidad (%)') {
                          const probLabel = item?.payload?.probabilityLabel || (value <= 20 ? 'Muy Baja' : value < 50 ? 'Baja' : value < 80 ? 'Media' : 'Alta');
                          return [`${value}% (${probLabel})`, 'Probabilidad'];
                        }
                        return [value, name];
                      }}
                      labelFormatter={(label) => `${label}`}
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                    <Bar yAxisId="left" dataKey="costMillions" name="Costo Total ($M)" radius={[6, 6, 0, 0]}>
                      {CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="probabilityPercent"
                      name="Probabilidad (%)"
                      stroke="#7c3aed"
                      strokeWidth={3}
                      dot={{ r: 6, fill: '#7c3aed', strokeWidth: 2, stroke: '#ffffff' }}
                      activeDot={{ r: 8, fill: '#5b21b6' }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                <span>Rango Costos: <strong>$398M – $785M COP</strong></span>
                <span className="text-purple-700 font-bold">Máx. Probabilidad: Esc. 2 y 3 (85% Alta)</span>
              </div>
            </div>

            {/* Chart 2: Time to Closure vs Area Compensated */}
            <div className="lg:col-span-6 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-extrabold text-[#001871] uppercase tracking-wide flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Plazo de Cierre (Años) vs Área (Hectáreas)
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Dual Axis
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Los Escenarios 1 y 4 toman 1,5 años; mientras que los de saneamiento en PNN (Esc. 2 y 3) toman 3,0 años de seguimiento ANLA.
                </p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={CHART_DATA} margin={{ top: 15, right: 20, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis
                      dataKey="name"
                      stroke="#475569"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis
                      yAxisId="left"
                      stroke="#475569"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickFormatter={(val) => `${val} Años`}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#475569"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickFormatter={(val) => `${val} ha`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                    <Bar
                      yAxisId="left"
                      dataKey="timeYears"
                      name="Tiempo Cierre (Años)"
                      fill="#001871"
                      radius={[4, 4, 0, 0]}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="areaHa"
                      name="Área a Compensar (ha)"
                      stroke="#ea580c"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#ea580c' }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                <span>Rápida Ejecución: <strong>Escenarios 1 y 4 (1,5 Años - Sin Formulación)</strong> | Media: <strong>Escenarios 2 y 3 (4,5 Años - Con Formulación + 6 Meses Gestión Interna)</strong></span>
                <span className="text-blue-700 font-bold">Mayor Área: Esc. 2 (61,3 ha)</span>
              </div>
            </div>

          </div>
        ) : null}

        {/* Detailed Breakdown for Selected Scenario */}
        <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200 shadow-xs mb-4">
          
          {/* Header of Detail Box */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-black px-2.5 py-0.5 rounded text-white font-mono"
                  style={{ backgroundColor: selectedScenario.color }}
                >
                  {selectedScenario.code}
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  {selectedScenario.shortTitle}
                </h4>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-4xl">
                {selectedScenario.name}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Escenario</span>
                <span className="text-lg sm:text-xl font-black text-[#001871] font-mono">
                  {selectedScenario.totalCostFormatted}
                </span>
              </div>
            </div>
          </div>

          {/* Activities Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="py-2.5 px-3 font-bold">Actividad / Rubro</th>
                  <th className="py-2.5 px-3 font-bold text-center w-24">Tiempo</th>
                  <th className="py-2.5 px-3 font-bold text-right w-44">Costo ($ COP)</th>
                  <th className="py-2.5 px-3 font-bold">Observación Técnica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedScenario.activities.map((act, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">
                      {act.actividad}
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-600 font-mono">
                      {act.tiempo}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {act.costoFormatted}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                      {act.observacion}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 border-t-2 border-slate-300 font-black text-slate-900">
                  <td className="py-3 px-3">TOTAL ESTIMADO DEL ESCENARIO</td>
                  <td className="py-3 px-3 text-center font-mono">{selectedScenario.timeYears} Años</td>
                  <td className="py-3 px-3 text-right font-mono text-[#001871] text-sm">
                    {selectedScenario.totalCostFormatted}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-normal text-[11px]">
                    Cierre esperado: {selectedScenario.timeLabel}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

        </div>

        {/* Synthesis Takeaway Bar */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-800">
            <Info className="w-4 h-4 text-[#001871] shrink-0" />
            <span>
              <strong>Criterio de Decisión:</strong> El <strong>Escenario 1 ($398,1M, 1,5 años, Prob. Muy Baja 15%)</strong> ofrece menor costo pero sujeto a aprobación de ANLA sin formulación; el <strong>Escenario 2 ($883,3M, 4,5 años, Prob. Alta 85%)</strong> ofrece el mayor blindaje técnico y normativo ante ANLA por adquisición directa en PNN (sumando 6 meses de gestión interna por formulación previa y póliza para 5 años); el <strong>Escenario 3 ($952,8M, 4,5 años, Prob. Media 50%)</strong> combina PNN (22 ha) con postmantenimiento en 18,6 ha (sumando 6 meses de gestión interna por formulación previa y póliza para 5 años); y el <strong>Escenario 4 ($784,8M, 1,5 años, Prob. Baja 25%)</strong> proyecta postmantenimiento total de 30,4 ha directo sin formulación.
            </span>
          </div>
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="mt-6 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#001871]">Bloque CPO-12</span>
          <span>•</span>
          <span>Matriz de Escenarios Económicos ANLA</span>
        </div>

        {onNavigateToSlide && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateToSlide(7)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition-all"
            >
              ← D7: Inventario Forestal
            </button>
            <button
              onClick={() => onNavigateToSlide(9)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-bold bg-[#001871] hover:bg-[#002299] text-white shadow-md transition-all active:scale-95"
            >
              <span>Continuar a Escenarios 1% (D9)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
