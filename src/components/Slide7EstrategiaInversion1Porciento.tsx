import React, { useState } from 'react';
import { SlideHeader } from './SlideHeader';
import {
  DollarSign,
  Clock,
  Droplets,
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
  Percent,
  Trees,
  Wrench,
  ShieldCheck,
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
  Line,
} from 'recharts';

export interface Inversion1PorcientoScenario {
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
  probability: 'Baja' | 'Media' | 'Alta';
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

export const INVERSION_1_PORCIENTO_SCENARIOS: Inversion1PorcientoScenario[] = [
  {
    id: 1,
    code: 'ESC-1',
    shortTitle: 'Escenario 1: Aceptación 4 ha Caño Pilón + Formulación Saldo $154,1M',
    name: 'La ANLA Acepta la ejecución en las 4 ha Caño Pilon $103.470.221 COP, pero se tiene que formular el restante $154.077.103 + indexación',
    description: 'Reconocimiento de las 4 ha en Caño Pilón ($103,4M) y formulación/ejecución del saldo de $154.077.103 COP más indexación en obras biomecánicas, promotorías o pozos sépticos.',
    timeYears: 4.0,
    timeLabel: '4,0 Años (48 Meses)',
    areaHa: 4.0,
    areaLabel: '4 ha (Caño Pilón)',
    totalCostCOP: 242596378.75,
    totalCostFormatted: '$ 242.596.378,75',
    imprevistosCOP: 38519275.75,
    probability: 'Baja',
    probabilityPercent: 25,
    anlaRisk: 'Medio',
    color: '#059669', // Emerald
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    badgeText: 'Aceptación 4 ha + Saldo (Prob. Baja)',
    accentBorder: 'border-emerald-500',
    activities: [
      {
        actividad: 'Tiempos de gestión interna',
        tiempo: '0,50 año (6 meses)',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Gestión corporativa interna, aprobaciones de Junta y contratación previa de consultoría (+6 meses sumados a ruta crítica)',
      },
      {
        actividad: 'Formulación (Obras Biomecánicas, Promotorias, pozos septicos)',
        tiempo: '0,50',
        costoCOP: 50000000.0,
        costoFormatted: '$ 50.000.000,00',
        observacion: 'Diseño técnico de nuevas medidas de conservación hídrica',
      },
      {
        actividad: 'Aprobación por parte de ANLA',
        tiempo: '0,50',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Requiere analisis por parte de ANLA',
      },
      {
        actividad: 'Ejecución (154.077.103 + indexación)',
        tiempo: '2',
        costoCOP: 154077103.0,
        costoFormatted: '$ 154.077.103,00',
        observacion: 'Se debe indexar este valor a valores presentes',
      },
      {
        actividad: 'Imprevistos 25% (sobre ejecución $154.077.103,00)',
        tiempo: '-',
        costoCOP: 38519275.75,
        costoFormatted: '$ 38.519.275,75',
        observacion: 'Margen de contingencia del 25% aplicado al saldo de ejecución ($154,08M * 25%)',
      },
      {
        actividad: 'Aprobación ANLA (cierre)',
        tiempo: '0,5',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Trámite y resolución final de cierre de la obligación del 1%',
      },
    ],
  },
  {
    id: 2,
    code: 'ESC-2',
    shortTitle: 'Escenario 2: No Aceptación 4 ha + Postmantenimiento 4 ha + Saldo $67,9M',
    name: 'La ANLA no acepta la ejecución en las 4 ha Caño Pilón ($103.470.221 COP), pero el inventario es viable para un postmantenimiento ($86.190.368 COP) cargado a la inversión de 1%, más saldo por ejecutar ($67.886.735,65 COP).',
    description: 'Justificación Técnica del Postmantenimiento: Requerido para garantizar la entrega a satisfacción de las obras en Caño Pilón (4 ha), dado que la ANLA aún no ha emitido el acto administrativo de cierre del mantenimiento finalizado en 2022. Desglose Conciliado: Obligación base 1% ($257.547.324,65) − Caño Pilón ($103.470.221,00) − Postmantenimiento integral ($86.190.368,00) = Saldo pendiente por ejecutar de $67.886.735,65 COP. Inversión total del escenario: Formulación ($50,0M) + Saldo ejecución ($67,89M) + Postmantenimiento integral ($86,19M) = $204.077.103,65 COP.',
    timeYears: 4.0,
    timeLabel: '4,0 Años (48 Meses)',
    areaHa: 4.0,
    areaLabel: '4 ha (Caño Pilón)',
    totalCostCOP: 204077103.65,
    totalCostFormatted: '$ 204.077.103,65',
    imprevistosCOP: 17238073.6,
    probability: 'Media',
    probabilityPercent: 50,
    anlaRisk: 'Medio',
    color: '#2563eb', // Blue
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
    badgeText: 'Menor Costo Total ($204,1M)',
    accentBorder: 'border-blue-500',
    activities: [
      {
        actividad: 'Tiempos de gestión interna',
        tiempo: '0,50 año (6 meses)',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Gestión corporativa interna, autorizaciones y contratación previa de la formulación (+6 meses sumados a ruta crítica)',
      },
      {
        actividad: 'Formulación (Obras Biomecánicas, Promotorías)',
        tiempo: '0,50',
        costoCOP: 50000000.0,
        costoFormatted: '$ 50.000.000,00',
        observacion: 'Estructuración de medidas alternativas para ejecutar el saldo restante ante la ANLA',
      },
      {
        actividad: 'Aprobación por parte de ANLA',
        tiempo: '0,50',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Trámite de revisión y evaluación técnica por parte de la ANLA',
      },
      {
        actividad: 'Ejecución saldo ($67.886.735,65 + indexación)',
        tiempo: '2',
        costoCOP: 67886735.65,
        costoFormatted: '$ 67.886.735,65',
        observacion: 'Saldo neto ajustado ($257,55M base − $103,47M Caño Pilón − $86,19M postmantenimiento integral)',
      },
      {
        actividad: 'Aprobación por parte de ANLA (cierre)',
        tiempo: '0,50',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Concepto final de cierre y desestimación de objeciones regulatorias',
      },
      {
        actividad: 'Postmantenimiento 4 ha Caño Pilón (4 ha × $15.486.666,60)',
        tiempo: '1',
        costoCOP: 61946666.4,
        costoFormatted: '$ 61.946.666,40',
        observacion: '1 año de postmantenimiento integral (4 ha × $15.486.666,60 COP/ha/año) ejecutado en paralelo',
      },
      {
        actividad: 'Cambio de aislamiento perimetral (196 m)',
        tiempo: '1',
        costoCOP: 7005628.0,
        costoFormatted: '$ 7.005.628,00',
        observacion: 'Reposición de cerramiento de 196 m ejecutado en paralelo',
      },
      {
        actividad: 'Imprevistos 25% (sobre postmantenimiento y aislamiento: $68.952.294,40)',
        tiempo: '-',
        costoCOP: 17238073.6,
        costoFormatted: '$ 17.238.073,60',
        observacion: 'Margen del 25% aplicado a actividades de campo ($68.952.294,40 × 25%)',
      },
    ],
  },
  {
    id: 3,
    code: 'ESC-3',
    shortTitle: 'Escenario 3: No Viabilidad 10 ha ➔ Ejecución Total $257,5M + Indexación',
    name: 'El inventario arroja que no son viables las 10 ha, se debe ejecutar $257.547.324 + indexación',
    description: 'Pérdida de viabilidad en las 10 ha previas. Se adopta la adquisición y saneamiento predial bajo nuevo manual ($6.722.924 COP/ha equivalente a ~38,3 ha).',
    timeYears: 4.5,
    timeLabel: '4,5 Años (54 Meses)',
    areaHa: 38.3,
    areaLabel: '38,3 ha (Saneamiento Predial - Nuevo Manual)',
    totalCostCOP: 294302056.4,
    totalCostFormatted: '$ 294.302.056,40',
    imprevistosCOP: 26754732.4,
    probability: 'Alta',
    probabilityPercent: 85,
    anlaRisk: 'Bajo',
    color: '#059669', // Emerald / Green for High Probability
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Blindaje Jurídico Predial (Prob. Alta)',
    accentBorder: 'border-emerald-500',
    activities: [
      {
        actividad: 'Tiempos de gestión interna',
        tiempo: '0,50 año (6 meses)',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Gestión corporativa interna, debida diligencia predial y autorizaciones de Junta (+6 meses sumados a ruta crítica)',
      },
      {
        actividad: 'Formulación (saneamiento predial)',
        tiempo: '0,50 año',
        costoCOP: 10000000.0,
        costoFormatted: '$ 10.000.000,00',
        observacion: 'Se incluiria en la formulación',
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
        costoCOP: 191544117.8,
        costoFormatted: '$ 191.544.117,80',
        observacion: 'Costo consolidado por hectárea: $5.000.000 + $1.722.924 = $6.722.924 COP/ha (Área equivalente a la obligación: ~38,3 ha)',
      },
      {
        actividad: 'Costos Indirectos y Habilitantes (Técnico, Jurídico, Saneamiento y Cerramiento): $1.722.924 COP/ha',
        tiempo: '0',
        costoCOP: 66003206.2,
        costoFormatted: '$ 66.003.206,20',
        observacion: 'Costos Indirectos y Habilitantes (Técnico, Jurídico, Saneamiento, vallas y Cerramiento)',
      },
      {
        actividad: 'Imprevistos 10 % (Saneamiento Predial)',
        tiempo: '-',
        costoCOP: 26754732.4,
        costoFormatted: '$ 26.754.732,40',
        observacion: 'Margen de imprevistos del 10% exclusivo para componente de saneamiento predial',
      },
    ],
  },
  {
    id: 4,
    code: 'ESC-4',
    shortTitle: 'Escenario 4: Objeción ANLA + Postmantenimiento 3 Años (10 ha con Resiembras)',
    name: 'La ANLA no cierra las obligaciones y genera requerimientos post mantenimientos de tres años con resiembras de individuos de mayor porte',
    description: 'Objeción regulatoria total: Exigencia de 3 años continuos de postmantenimiento en las 10 ha con resiembra de individuos de mayor porte y cambio de 500 m de cerramiento perimetral.',
    timeYears: 3.5,
    timeLabel: '3,5 Años (42 Meses)',
    areaHa: 10.0,
    areaLabel: '10 ha (Postmantenimiento 3 Años)',
    totalCostCOP: 603089372.5,
    totalCostFormatted: '$ 603.089.372,50',
    imprevistosCOP: 120617874.5,
    probability: 'Baja',
    probabilityPercent: 25,
    anlaRisk: 'Alto',
    color: '#dc2626', // Red
    badgeBg: 'bg-red-100 text-red-800 border-red-300',
    badgeText: 'Postmantenimiento 3 Años (Prob. Baja)',
    accentBorder: 'border-red-500',
    activities: [
      {
        actividad: 'Mantenimiento 10 ha (Dos completos, dos parciales por año)',
        tiempo: '3',
        costoCOP: 464599998.0,
        costoFormatted: '$ 464.599.998,00',
        observacion: 'Se proyecta un postmantenimiento de tres años para cerrar la obligación ante requerimientos continuos de ANLA',
      },
      {
        actividad: 'Cambio de aislamiento (500 m)',
        tiempo: '3',
        costoCOP: 17871500.0,
        costoFormatted: '$ 17.871.500,00',
        observacion: 'Se proyecta un cambio de aislamiento de 500 m',
      },
      {
        actividad: 'Imprevistos 25 %',
        tiempo: '-',
        costoCOP: 120617874.5,
        costoFormatted: '$ 120.617.874,50',
        observacion: 'Margen de contingencia del 25% sobre actividades de campo',
      },
      {
        actividad: 'Aprobación ANLA',
        tiempo: '0,5',
        costoCOP: 0,
        costoFormatted: '$ 0,00',
        observacion: 'Emisión final del acto administrativo de cierre',
      },
    ],
  },
];

const CHART_DATA_1_PORCIENTO = INVERSION_1_PORCIENTO_SCENARIOS.map((s) => ({
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

interface Slide7Props {
  onNavigateToSlide?: (slideNumber: number) => void;
  hiddenSlides?: number[];
}

export const Slide7EstrategiaInversion1Porciento: React.FC<Slide7Props> = ({
  onNavigateToSlide,
  hiddenSlides = [4, 10],
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<number>(1);
  const [activeView, setActiveView] = useState<'comparison' | 'table'>('comparison');

  const selectedScenario =
    INVERSION_1_PORCIENTO_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
    INVERSION_1_PORCIENTO_SCENARIOS[0];

  return (
    <div className="w-full h-full min-h-[640px] p-4 sm:p-6 lg:p-8 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl flex flex-col justify-between">
      <div>
        {/* Slide Header */}
        <SlideHeader
          slideNumber={9}
          totalSlides={12}
          title="Escenarios de Inversión del 1% y Cierre de Obligaciones"
          subtitle="Evaluación Técnico-Económica y Temporal ante la ANLA (Bloque CPO-12 • LAM 5475)"
          objective="Comparar los 4 escenarios de cumplimiento de la Inversión Forzosa del 1% en términos de costos ($COP), plazos (años), hectáreas e imprevistos para la toma de decisión corporativa."
          badge="Inversión del 1% (Art. 321 PND)"
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
                Comparativa de Escenarios de Inversión del 1% (ANLA)
              </h3>
              <p className="text-xs text-slate-600">
                Caño Pilón (4,0 ha), Río Melúa (3,5 ha) y Río Planas (2,5 ha) vs. Saneamiento Predial y Postmantenimientos
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
          {INVERSION_1_PORCIENTO_SCENARIOS.map((s) => {
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
                          : 'text-amber-800 bg-amber-100/80 border border-amber-300'
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
                      <Droplets className="w-3 h-3 text-slate-400" />
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
                  Escenario 2 es el más económico ($204,1M, Prob. Media 50%); Escenario 3 otorga blindaje predial ($294,3M, Prob. Media 50%); y Escenario 4 asume requerimientos de postmantenimiento extendido por 3 años ante ANLA ($603,1M, Prob. Baja 25%).
                </p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={CHART_DATA_1_PORCIENTO}
                    margin={{ top: 15, right: 20, left: 10, bottom: 20 }}
                  >
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
                      domain={[0, 680]}
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
                      formatter={(value: any, name: string) => {
                        if (name === 'Costo Total ($M)') return [`$${value} Millones COP`, 'Costo Total'];
                        if (name === 'Probabilidad (%)') return [`${value}% (${value >= 80 ? 'Alta' : value >= 50 ? 'Media' : 'Baja'})`, 'Probabilidad'];
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
                      {CHART_DATA_1_PORCIENTO.map((entry, index) => (
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
                <span>
                  Diferencia Min/Max: <strong>+$399.012.269 COP (+196%)</strong>
                </span>
                <span className="text-purple-700 font-bold">Máx. Probabilidad: Esc. 2 y 3 (50% Media)</span>
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
                  Escenario 4 requiere 3,5 años (sin formulación, directo a mantenimiento); Escenarios 1 y 2 requieren 4,0 años (sumando 6 meses de gestión interna + formulación y trámites); y Escenario 3 requiere 4,5 años (sumando 6 meses de gestión interna + formulación de saneamiento y 3 años de adquisición).
                </p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={CHART_DATA_1_PORCIENTO}
                    margin={{ top: 15, right: 20, left: 10, bottom: 20 }}
                  >
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
                      stroke="#0284c7"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#0284c7' }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                <span>
                  Menor Plazo: <strong>Escenario 4 (3,5 Años - Sin Formulación)</strong> | Mediano: <strong>Escenarios 1 y 2 (4,0 Años - Con Formulación + Gestión Interna)</strong> | Mayor: <strong>Escenario 3 (4,5 Años - Con Formulación + Gestión Interna)</strong>
                </span>
                <span className="text-blue-700 font-bold">Mayor Área: Escenario 3 (~38,3 ha)</span>
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
              {selectedScenario.id === 2 && (
                <div className="mt-2.5 p-3 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-slate-700 leading-relaxed space-y-1.5">
                  <div>
                    <span className="font-bold text-blue-900">✔ Justificación Técnica del Postmantenimiento:</span> Requerido para garantizar la entrega a satisfacción de las 4 ha de Caño Pilón ante la ANLA, dado que no ha emitido resolución de cierre. El postmantenimiento integral asciende a <strong className="text-slate-900">$86.190.368,00 COP</strong> ($61,95M mantenimiento a $15,49M/ha/año + $7,01M aislamiento + $17,24M imprevistos del 25%).
                  </div>
                  <div>
                    <span className="font-bold text-amber-900">⚠ Conciliación Financiera del Saldo:</span> Obligación base 1%: $257.547.324,65 − Reconocimiento Caño Pilón: $103.470.221,00 − Postmantenimiento integral: $86.190.368,00 = <strong className="text-slate-900">Saldo pendiente por ejecutar: $67.886.735,65 COP</strong>.
                  </div>
                  <div className="text-[10.5px] text-slate-600 bg-white/70 p-1.5 rounded border border-blue-100">
                    <strong>∑ Flujo Total a Desembolsar:</strong> Formulación ($50.000.000,00) + Ejecución saldo ($67.886.735,65) + Postmantenimiento integral ($86.190.368,00) = <strong className="text-[#001871]">$204.077.103,65 COP</strong>.
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Escenario 1%</span>
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
                  <td className="py-3 px-3">TOTAL ESTIMADO DEL ESCENARIO 1%</td>
                  <td className="py-3 px-3 text-center font-mono">{selectedScenario.timeYears} Años</td>
                  <td className="py-3 px-3 text-right font-mono text-[#001871] text-sm">
                    {selectedScenario.totalCostFormatted}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-normal text-[11px]">
                    Cierre esperado: {selectedScenario.timeLabel} • Cantidad: {selectedScenario.areaLabel}
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
              <strong>Criterio de Decisión 1%:</strong> El <strong>Escenario 2 ($204,1M, 4,0 años, Prob. Media 50%)</strong> optimiza el flujo al imputar el postmantenimiento integral de 4 ha ($86,19M con imprevistos) a la obligación del 1%, ejecutando el saldo neto de $67,89M + formulación y 6 meses de gestión interna; el <strong>Escenario 3 ($294,3M, 4,5 años, Prob. Alta 85%)</strong> liquida el saldo total en saneamiento predial (~38,3 ha) con máximo blindaje jurídico ante ANLA (sumando 6 meses de gestión interna + formulación); mientras que el <strong>Escenario 4 ($603,1M, 3,5 años, Prob. Baja 25%)</strong> proyecta 3 años de postmantenimiento continuo directo sin formulación ni gestión interna.
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-6 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#001871]">Bloque CPO-12</span>
          <span>•</span>
          <span>Inversión Forzosa del 1% (LAM 5475)</span>
        </div>

        {onNavigateToSlide && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateToSlide(8)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition-all"
            >
              ← D8: Escenarios Compensación Forestal
            </button>
            <button
              onClick={() => onNavigateToSlide(hiddenSlides.includes(10) ? 11 : 10)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-bold bg-[#001871] hover:bg-[#002299] text-white shadow-md transition-all active:scale-95"
            >
              <span>{hiddenSlides.includes(10) ? 'D11: Sustitución Cormacarena' : 'D10: Matriz Combinada Costos Totales'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
