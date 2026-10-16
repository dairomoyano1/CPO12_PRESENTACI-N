import React, { useState } from 'react';
import { SlideHeader } from './SlideHeader';
import { SEISMIC_WATER_COSTS, TOTAL_WATER_HARVEST } from '../data/presentationData';
import { 
  Sun, 
  Droplets, 
  ShieldCheck, 
  Layers, 
  DollarSign, 
  Trees, 
  Wrench, 
  Compass, 
  CheckCircle2,
  Table as TableIcon,
  Calendar,
  BarChart3,
  Truck,
  FileCheck,
  Building2,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

interface Slide7Props {
  onNavigateToSlide?: (slideNumber: number) => void;
  hiddenSlides?: number[];
}

interface CosechaWaterBudgetRow {
  id: string;
  expediente: string;
  tipoObligacion: string;
  estrategiaCumplimiento: string;
  obligacion: string;
  costo2026: number;
  costo2027: number;
  costoTotal: number;
  isCosechaAgua: boolean;
}

const WATER_HARVEST_BUDGET_ROWS: CosechaWaterBudgetRow[] = [
  {
    id: 'row-1',
    expediente: '3.37.09.028',
    tipoObligacion: 'COMPENSACIÓN',
    estrategiaCumplimiento: 'Proyecto Cosecha de Agua (3 Reservorios)',
    obligacion: '6.3 Ha',
    costo2026: 157580080,
    costo2027: 157580080,
    costoTotal: 315160161,
    isCosechaAgua: true,
  },
  {
    id: 'row-2',
    expediente: '3.37.09.028',
    tipoObligacion: 'COMPENSACIÓN',
    estrategiaCumplimiento: 'Proyecto Cosecha de Agua (1 Reservorio)',
    obligacion: '2.5 Ha',
    costo2026: 52526693,
    costo2027: 52526693,
    costoTotal: 105053387,
    isCosechaAgua: true,
  },
  {
    id: 'row-3',
    expediente: 'TRANSVERSAL',
    tipoObligacion: 'Inventario Forestal',
    estrategiaCumplimiento: 'Formulación y levantamiento de línea base forestal',
    obligacion: '-',
    costo2026: 51717873,
    costo2027: 0,
    costoTotal: 51717873,
    isCosechaAgua: false,
  },
  {
    id: 'row-4',
    expediente: 'TRANSVERSAL',
    tipoObligacion: 'Mantenimiento Expedientes',
    estrategiaCumplimiento: 'Seguimiento legal, normativo y ambiental multianual',
    obligacion: '-',
    costo2026: 62344741,
    costo2027: 65524323,
    costoTotal: 127869064,
    isCosechaAgua: false,
  },
  {
    id: 'row-5',
    expediente: 'TRANSVERSAL',
    tipoObligacion: 'Logística',
    estrategiaCumplimiento: 'Operación de campo, cuadrillas, maquinaria y supervisión',
    obligacion: '-',
    costo2026: 63300000,
    costo2027: 66528300,
    costoTotal: 129828300,
    isCosechaAgua: false,
  },
];

const TOTAL_ANUAL_2026 = 387469388;
const TOTAL_ANUAL_2027 = 342159397;
const GRAN_TOTAL_COP = 729628784;
const TOTAL_USD_TRM_3200 = 228009;
const SUBTOTAL_COSECHA_AGUA = 420213548;
const SUBTOTAL_TRANSVERSAL = 309415237;

export const Slide7IngenieriaCosecha: React.FC<Slide7Props> = ({ 
  onNavigateToSlide,
  hiddenSlides = [4, 10]
}) => {
  const [activeTab, setActiveTab] = useState<'flujo' | 'ingenieria'>('flujo');
  const [activeComponent, setActiveComponent] = useState<number>(0);

  const technicalComponents = [
    {
      id: 0,
      title: 'Geomembrana HDPE 40 mils (1.0 mm)',
      tag: 'Impermeabilización & Estanque',
      desc: 'Estanque excavado mecánicamente de 10×15 metros (175 m³ excavación y 165 m³ diques compactados), impermeabilizado completamente con lámina HDPE de 40 mils (1.00 mm) garantizando 0% infiltración.',
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      specs: '10×15 m | 175 m³ excavación | 165 m³ diques compactados | HDPE 40 mils.',
    },
    {
      id: 1,
      title: 'Cunetas de Corona en Suelo-Cemento',
      tag: 'Captación & Anti-Erosión',
      desc: 'Cunetas perimetrales de corona construidas en suelo-cemento y revestidas en sacos de 0.1 × 0.5 × 0.7 m para interceptar escorrentía y proteger el terreno contra la erosión.',
      icon: <Droplets className="w-5 h-5 text-sky-400" />,
      specs: 'Revestimiento en sacos de 0.1 × 0.5 × 0.7 m en suelo-cemento.',
    },
    {
      id: 2,
      title: 'Desagüe y Tubería PVC Sanitaria 3"',
      tag: 'Manejo Hídrico y Rebose',
      desc: 'Tuberías sanitarias de PVC de 3 pulgadas con longitud aproximada de 20 metros para regulación hidráulica, entrada y salida segura por rebose.',
      icon: <Wrench className="w-5 h-5 text-cyan-400" />,
      specs: 'Tubería sanitaria PVC Ø 3" | Longitud: ~20 metros.',
    },
    {
      id: 3,
      title: 'Bombeo Solar FV (5.000 L/día)',
      tag: 'Energía Limpia & Baterías',
      desc: 'Sistema fotovoltaico autónomo con paneles solares, banco de baterías e inversor que acciona una electrobomba para distribuir hasta 5.000 L/día hacia bebederos de ganado o riego.',
      icon: <Sun className="w-5 h-5 text-amber-400" />,
      specs: 'Caudal de diseño: hasta 5.000 litros diarios con autonomía solar y baterías.',
    },
    {
      id: 4,
      title: 'Protección Ecológica (Púas + 32 Árboles)',
      tag: 'Cerramiento y Cerca Viva',
      desc: 'Cerramiento con alambre de púas de 4 hilos (82 a 240 m de longitud) y cerca viva protectora con 32 árboles nativos (Cañafistolo, Guácimo, Balso, Cajeto) a 3 m de distancia.',
      icon: <Trees className="w-5 h-5 text-[#8FA73B]" />,
      specs: '4 hilos de púas (82-240 m) | 32 árboles nativos sembrados a 3.0 m.',
    },
  ];

  return (
    <div className="w-full h-full min-h-[640px] p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#201747] text-white border border-white/10 shadow-2xl flex flex-col justify-between">
      <div>
        <SlideHeader
          slideNumber={12}
          totalSlides={12}
          title="Flujo Multianual e Ingeniería del Proyecto Cosecha de Agua"
          subtitle="Expediente Cormacarena 3.37.09.028 • Presupuesto de Cumplimiento 2026-2027"
          objective="Presentar el presupuesto multianual por obligación asociado al contexto de Cosecha de Agua y las especificaciones técnicas del reservorio."
          badge="Frontera Energy • Bloque CPO-12"
        />

        {/* Segmented View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('flujo')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'flujo'
                  ? 'bg-[#E31C79] text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Flujo Financiero 2026–2027 (Cosecha de Agua)</span>
            </button>

            <button
              onClick={() => setActiveTab('ingenieria')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ingenieria'
                  ? 'bg-[#001871] text-white border border-white/20 shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ingeniería Constructiva del Reservorio</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono bg-emerald-900/40 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8FA73B]" />
              TRM Base: $3.200 COP/USD ($228.009 USD)
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: FLUJO FINANCIERO 2026-2027 (TABLA SOLICITADA POR EL USUARIO)       */}
        {/* ========================================================================= */}
        {activeTab === 'flujo' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Top KPI Cards Contextualizing Cosecha de Agua */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  <span>Inversión Total 2026–2027</span>
                  <DollarSign className="w-4 h-4 text-[#8FA73B]" />
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
                  ${GRAN_TOTAL_COP.toLocaleString('es-CO')}
                </div>
                <div className="text-[10px] text-emerald-400 font-medium mt-0.5">
                  100% de la ejecución presupuestal
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  <span>Equivalente en Dólares</span>
                  <span className="text-[10px] font-mono text-cyan-400">TRM 3.200</span>
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-cyan-300 mt-1">
                  ${TOTAL_USD_TRM_3200.toLocaleString('es-CO')} USD
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Tasa de cambio de referencia corporativa
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#001871]/70 border border-cyan-500/30 flex flex-col justify-between">
                <div className="flex items-center justify-between text-cyan-200 text-[10px] uppercase font-bold tracking-wider">
                  <span>Cosecha de Agua (Directa)</span>
                  <Droplets className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
                  ${SUBTOTAL_COSECHA_AGUA.toLocaleString('es-CO')}
                </div>
                <div className="text-[10px] text-cyan-200 font-medium mt-0.5">
                  4 Reservorios • 8,8 Ha (57,6% del presupuesto)
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  <span>Costos Transversales</span>
                  <Truck className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-amber-300 mt-1">
                  ${SUBTOTAL_TRANSVERSAL.toLocaleString('es-CO')}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Inventario + Mantenimiento + Logística (42,4%)
                </div>
              </div>
            </div>

            {/* Master Financial Table (The exact table requested by the user) */}
            <div className="overflow-x-auto rounded-xl border border-white/15 bg-black/30 shadow-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-black/60 text-slate-300 font-semibold border-b border-white/15 text-[10px] uppercase tracking-wider">
                    <th className="py-3 px-3">Expediente</th>
                    <th className="py-3 px-3">Tipo Obligación</th>
                    <th className="py-3 px-4">Estrategia de Cumplimiento</th>
                    <th className="py-3 px-3 text-center">Obligación</th>
                    <th className="py-3 px-3 text-right font-mono">2026</th>
                    <th className="py-3 px-3 text-right font-mono">2027</th>
                    <th className="py-3 px-4 text-right font-mono text-white">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {WATER_HARVEST_BUDGET_ROWS.map((row) => (
                    <tr 
                      key={row.id} 
                      className={`transition-colors ${
                        row.isCosechaAgua 
                          ? 'bg-[#001871]/40 hover:bg-[#001871]/60' 
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <td className="py-3 px-3 font-mono font-bold text-white text-xs">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] ${
                          row.isCosechaAgua 
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                            : 'bg-white/10 text-slate-300'
                        }`}>
                          {row.expediente}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-bold text-white">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wide ${
                          row.tipoObligacion === 'COMPENSACIÓN'
                            ? 'bg-[#E31C79]/20 text-[#ff8bbd] border border-[#E31C79]/40'
                            : 'bg-slate-700/60 text-slate-200'
                        }`}>
                          {row.tipoObligacion}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          {row.isCosechaAgua ? (
                            <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          ) : (
                            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                          <span>{row.estrategiaCumplimiento}</span>
                        </div>
                        {row.isCosechaAgua && (
                          <div className="text-[10px] text-cyan-200/80 mt-0.5">
                            Predio La Idea I • Sustitución regulatoria autorizada Cormacarena
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center font-mono font-bold text-white">
                        {row.obligacion !== '-' ? (
                          <span className="bg-[#8FA73B]/20 text-[#c2df5d] px-2 py-0.5 rounded border border-[#8FA73B]/40">
                            {row.obligacion}
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-right font-mono text-slate-200 font-semibold">
                        ${row.costo2026.toLocaleString('es-CO')}
                      </td>

                      <td className="py-3 px-3 text-right font-mono text-slate-200 font-semibold">
                        {row.costo2027 > 0 ? (
                          `$${row.costo2027.toLocaleString('es-CO')}`
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-bold text-white text-sm">
                        ${row.costoTotal.toLocaleString('es-CO')}
                      </td>
                    </tr>
                  ))}

                  {/* Subtotal Cosecha de Agua Row */}
                  <tr className="bg-cyan-950/40 border-t-2 border-cyan-500/30 text-xs">
                    <td colSpan={3} className="py-2.5 px-4 text-cyan-300 font-display font-bold uppercase tracking-wider">
                      Subtotal Proyecto Cosecha de Agua (4 Reservorios)
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-cyan-300">
                      8.8 Ha
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-cyan-200">
                      $210.106.773
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-cyan-200">
                      $210.106.773
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-cyan-300 text-sm">
                      ${SUBTOTAL_COSECHA_AGUA.toLocaleString('es-CO')}
                    </td>
                  </tr>

                  {/* Subtotal Transversal Row */}
                  <tr className="bg-slate-900/60 border-t border-white/10 text-xs">
                    <td colSpan={3} className="py-2.5 px-4 text-slate-300 font-display font-bold uppercase tracking-wider">
                      Subtotal Costos Transversales de Gestión
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-500 font-mono">-</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-300">
                      $177.362.614
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-300">
                      $132.052.623
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-300 text-sm">
                      ${SUBTOTAL_TRANSVERSAL.toLocaleString('es-CO')}
                    </td>
                  </tr>

                  {/* TOTAL ANUAL ROW */}
                  <tr className="bg-[#001871] font-bold border-t-2 border-white/30 text-white">
                    <td colSpan={4} className="py-3 px-4 font-display text-xs uppercase tracking-wider">
                      Total Anual
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-sm text-[#ff8bbd]">
                      ${TOTAL_ANUAL_2026.toLocaleString('es-CO')}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-sm text-[#ff8bbd]">
                      ${TOTAL_ANUAL_2027.toLocaleString('es-CO')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-base text-[#8FA73B]">
                      ${GRAN_TOTAL_COP.toLocaleString('es-CO')}
                    </td>
                  </tr>

                  {/* TOTAL USD ROW */}
                  <tr className="bg-black/80 font-bold border-t border-white/15 text-white">
                    <td colSpan={4} className="py-2.5 px-4 font-display text-xs uppercase tracking-wider text-slate-300">
                      Total (TRM 3.200) USD$
                    </td>
                    <td colSpan={3} className="py-2.5 px-4 text-right font-mono text-sm sm:text-base text-cyan-300">
                      ${TOTAL_USD_TRM_3200.toLocaleString('es-CO')} USD
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Contextual Narrative Card tying the table to Cosecha de Agua */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#001871]/80 to-[#201747] border border-cyan-500/30 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-300 font-bold font-display uppercase tracking-wider text-[11px]">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>Asociación al Contexto de Cumplimiento: Cosecha de Agua</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                El <strong>Expediente 3.37.09.028</strong> sustituye la obligación forestal tradicional por la construcción de <strong>4 Reservorios de Cosecha de Agua</strong> en el <strong>Predio La Idea I</strong> (6,3 Ha para 3 reservorios + 2,5 Ha para 1 reservorio = <strong>8,8 Ha en total</strong>). 
                La inversión directa en reservorios (<strong>$420.213.548 COP</strong>) se ejecuta en cuotas iguales durante 2026 y 2027 ($210,11M por año para obras civiles, bombeo solar y cercas vivas), complementada por los <strong>Costos Transversales ($309.415.237 COP)</strong> que aseguran el inventario forestal habilitante y el seguimiento legal ante Cormacarena.
              </p>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: INGENIERÍA CONSTRUCTIVA DE RESERVORIOS & ESPECIFICACIONES          */}
        {/* ========================================================================= */}
        {activeTab === 'ingenieria' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Side: Esquema Técnico e Ingeniería (50%) */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="flex items-center justify-between pb-1 border-b border-white/10">
                <div className="text-xs sm:text-sm font-display font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#E31C79]" />
                  <span>Esquema Técnico Constructivo del Reservorio</span>
                </div>
                <span className="text-[11px] font-mono text-slate-300">
                  Diseño Estándar CPO-12
                </span>
              </div>

              {/* Interactive Blueprint Schematic Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {technicalComponents.map((comp) => {
                  const isSelected = activeComponent === comp.id;
                  return (
                    <motion.div
                      key={comp.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setActiveComponent(comp.id)}
                      className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-[#001871] border-[#E31C79] ring-2 ring-[#E31C79]/40 shadow-xl'
                          : 'bg-[#001871]/60 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-lg bg-black/40">
                          {comp.icon}
                        </div>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/30 text-slate-300">
                          {comp.tag}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold font-display text-white mb-1">
                        {comp.title}
                      </h4>

                      <p className="text-[11px] text-slate-300 leading-snug">
                        {comp.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Active Component Deep-Dive Blueprint Callout */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/15 text-xs space-y-1">
                <div className="text-[10px] uppercase font-bold text-[#E31C79] tracking-wider">
                  Especificación Técnica Seleccionada
                </div>
                <div className="font-bold text-white text-sm">
                  {technicalComponents[activeComponent].title}
                </div>
                <p className="text-slate-300 text-xs">
                  {technicalComponents[activeComponent].specs}
                </p>
              </div>
            </div>

            {/* Right Side: Estructura de Costos por Resolución (50%) */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-[#001871]/60 p-5 rounded-xl border border-white/15">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2 text-sm font-display font-bold text-white">
                    <DollarSign className="w-4 h-4 text-[#8FA73B]" />
                    <span>Estructura de Costos por Proyecto Sísmico</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#8FA73B] bg-[#8FA73B]/20 px-2 py-0.5 rounded border border-[#8FA73B]/40">
                    Total: 4 Reservorios
                  </span>
                </div>

                {/* Resolution Cost Table */}
                <div className="overflow-x-auto rounded-lg border border-white/10 mb-4 bg-black/25">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-black/50 text-slate-300 font-semibold border-b border-white/10 text-[10px] uppercase tracking-wider">
                        <th className="py-2.5 px-3">Proyecto Sísmico</th>
                        <th className="py-2.5 px-3">Acto Administrativo</th>
                        <th className="py-2.5 px-3 text-center">Área (Ha)</th>
                        <th className="py-2.5 px-3 text-center">No. Res.</th>
                        <th className="py-2.5 px-3 text-right">Inversión Total ($COP)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {SEISMIC_WATER_COSTS.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-3 font-bold font-display text-white">
                            {item.project}
                          </td>
                          <td className="py-3 px-3 text-[11px] font-mono text-slate-300">
                            {item.act}
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-slate-200">
                            {item.areaHa} Ha
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-bold text-[#E31C79]">
                            {item.reservoirsCount}
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-white">
                            ${item.investmentCOP.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                      {/* Total Consolidado Row */}
                      <tr className="bg-[#201747] font-bold border-t-2 border-white/20">
                        <td colSpan={2} className="py-3 px-3 text-white font-display uppercase tracking-wider text-xs">
                          Total Consolidado
                        </td>
                        <td className="py-3 px-3 text-center text-white font-mono">
                          {TOTAL_WATER_HARVEST.totalAreaHa} Ha
                        </td>
                        <td className="py-3 px-3 text-center text-[#E31C79] font-mono text-sm">
                          {TOTAL_WATER_HARVEST.totalReservoirs} Res.
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-sm sm:text-base text-[#8FA73B]">
                          ${TOTAL_WATER_HARVEST.totalInvestmentCOP.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Metric Breakdown Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                    <div className="text-[10px] uppercase text-slate-400 font-semibold">
                      Costo Promedio por Reservorio
                    </div>
                    <div className="text-sm font-mono font-bold text-white mt-1">
                      $120.207.124,33 COP
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Incluye obra civil y bombeo solar</div>
                  </div>

                  <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                    <div className="text-[10px] uppercase text-slate-400 font-semibold">
                      Costo Equivalente por Hectárea
                    </div>
                    <div className="text-sm font-mono font-bold text-[#8FA73B] mt-1">
                      $54.639.601,97 COP / Ha
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Dentro de bandas de mercado ANLA</div>
                  </div>
                </div>
              </div>

              {/* Bottom Approval Tag */}
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-900/25 border border-emerald-500/40 text-[11px] text-emerald-200 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8FA73B]" />
                  <span>Viabilidad Técnica Aprobada por Cormacarena (Concepto No. 3.44.25.1543)</span>
                </span>
                <span className="font-mono text-[10px] bg-black/30 px-2 py-0.5 rounded text-white">
                  Predio La Idea I
                </span>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Bottom Legal Baseline and Navigation */}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          CPO-12 3D (Res. 1249/2011) + CPO-12 2D (Res. 0761/2010) • Expediente Cormacarena 3.37.09.028
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-slate-300">
            Flujo Multianual: $729.628.784 COP (~$228.009 USD)
          </span>
          {onNavigateToSlide && (
            <button
              onClick={() => onNavigateToSlide(11)}
              className="px-3 py-1 rounded-lg border border-white/20 text-slate-300 hover:bg-white/10 font-semibold transition-all text-xs"
            >
              ← D11: Cormacarena Proceso
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
