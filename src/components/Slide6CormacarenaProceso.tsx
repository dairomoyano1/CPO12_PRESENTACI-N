import React, { useState } from 'react';
import { SlideHeader } from './SlideHeader';
import { CORMACARENA_FLOW_STEPS } from '../data/presentationData';
import { CormacarenaStep } from '../types';
import { CosechaAguaAnimacion } from './CosechaAguaAnimacion';
import { 
  Flame, 
  FileText, 
  Droplets, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ShieldAlert, 
  ArrowRight,
  Sun,
  Layers,
  Sparkles,
  Zap,
  TreePine,
  ShieldCheck,
  PlayCircle,
  Eye,
  Sliders
} from 'lucide-react';
import { motion } from 'motion/react';

interface Slide6Props {
  onNavigateToSlide?: (slideNumber: number) => void;
  hiddenSlides?: number[];
}

export const Slide6CormacarenaProceso: React.FC<Slide6Props> = ({ 
  onNavigateToSlide,
  hiddenSlides = [4, 10]
}) => {
  const [activeStep, setActiveStep] = useState<CormacarenaStep>(CORMACARENA_FLOW_STEPS[6] || CORMACARENA_FLOW_STEPS[5]);
  const [activeViewMode, setActiveViewMode] = useState<'fotos' | 'animacion'>('animacion');

  return (
    <div className="w-full h-full min-h-[620px] p-5 sm:p-7 rounded-2xl bg-[#201747] text-white border border-white/10 shadow-2xl flex flex-col justify-between">
      <div>
        <SlideHeader
          slideNumber={11}
          totalSlides={12}
          title="Sustitución de Medida Forestal ante Cormacarena (Expediente PM-GA.3.37.09.028)"
          subtitle="Expediente Cormacarena: Transición y Especificación de Cosecha de Agua"
          objective="Sustentar el cambio de reforestación a reservorios de agua tras siniestro biótico. Proyecto formulado al 100% y plazo perentorio de 120 días para ejecución física e informe."
          badge="Flujo Cormacarena (7 Pasos)"
        />

        {/* High Priority Status Alert Banner */}
        <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-emerald-950/80 via-[#001871]/80 to-blue-950/80 border-2 border-emerald-500/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-black shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-emerald-300 tracking-wide">
                PROYECTO FORMULADO AL 100% Y LISTO PARA RADICACIÓN EN LA FECHA ESTABLECIDA
              </div>
              <div className="text-[11px] text-slate-300">
                Propuesta técnica definitiva con especificaciones de Cosecha de Agua lista para radicación antes del 29/Ago/2026. A continuación: plazo de 120 días para obras físicas e informe técnico.
              </div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 shrink-0">
            Formulado al 100%
          </span>
        </div>

        {/* 7-Step Chevron Process Flow */}
        <div className="mt-3 space-y-2.5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {CORMACARENA_FLOW_STEPS.map((step) => {
              const isSelected = activeStep.stepNumber === step.stepNumber;
              const isStep6 = step.stepNumber === 6;
              const isStep7 = step.stepNumber === 7;

              return (
                <motion.div
                  key={step.stepNumber}
                  whileHover={{ translateY: -2 }}
                  onClick={() => setActiveStep(step)}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all flex flex-col justify-between relative border overflow-hidden ${
                    isSelected ? 'ring-2 ring-amber-400 shadow-xl' : ''
                  } ${
                    isStep7
                      ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                      : isStep6
                      ? 'bg-emerald-950/50 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-[#001871]/80 border-white/15 hover:border-white/40'
                  }`}
                >
                  {/* Step Header */}
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isStep7
                            ? 'bg-amber-400 text-slate-950 font-black'
                            : isStep6
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-black/30 text-slate-300'
                        }`}
                      >
                        Paso {step.stepNumber}
                      </span>

                      {isStep7 ? (
                        <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      ) : isStep6 ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8FA73B]" />
                      )}
                    </div>

                    <div className="text-[10px] font-mono text-slate-300 font-bold mb-0.5">
                      {step.date}
                    </div>

                    <h4 className="text-[10px] font-bold font-display text-white leading-tight mb-1 line-clamp-2">
                      {step.title}
                    </h4>
                  </div>

                  {/* Radicado Tag */}
                  <div className="pt-1 border-t border-white/10">
                    <span
                      className={`text-[8.5px] font-mono block truncate ${
                        isStep7
                          ? 'text-amber-300 font-bold'
                          : isStep6
                          ? 'text-emerald-300 font-bold'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.radicadoOrConcept}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Step Details Bar */}
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-inner">
            <div className="flex items-start sm:items-center gap-2.5">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase tracking-wider shrink-0 ${
                activeStep.stepNumber === 7 
                  ? 'bg-amber-400 text-slate-950' 
                  : activeStep.stepNumber === 6 
                  ? 'bg-emerald-400 text-slate-950' 
                  : 'bg-[#001871] text-white border border-white/20'
              }`}>
                Paso {activeStep.stepNumber} • {activeStep.date}
              </span>
              <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed font-medium">
                <strong className="text-white font-bold">{activeStep.title} ({activeStep.radicadoOrConcept}):</strong>{' '}
                {activeStep.description}
              </p>
            </div>
            {activeStep.stepNumber === 7 && (
              <span className="px-2 py-0.5 rounded text-[9.5px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 shrink-0">
                120 Días Perentorios
              </span>
            )}
          </div>

          {/* SECCIÓN PRINCIPAL: ALTERNATIVA DE COMPENSACIÓN - COSECHA DEL AGUA */}
          <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl overflow-hidden">
            
            {/* Header: ALTERNATIVA DE COMPENSACIÓN (Verde Oliva) vs Cosecha del Agua (Navy) + View Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-sm sm:text-lg font-black font-display tracking-tight text-[#658728] uppercase">
                    ALTERNATIVA DE COMPENSACIÓN
                  </h3>
                  <h4 className="text-base sm:text-2xl font-black font-display tracking-tight text-[#001871]">
                    Cosecha del Agua
                  </h4>
                </div>
              </div>

              {/* Toggle Switcher: Fotos Técnicas vs Animación Interactiva */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-300 shrink-0">
                <button
                  onClick={() => setActiveViewMode('animacion')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all ${
                    activeViewMode === 'animacion'
                      ? 'bg-[#001871] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <PlayCircle className="w-3.5 h-3.5 text-amber-300" />
                  <span>Animación del Proceso</span>
                </button>

                <button
                  onClick={() => setActiveViewMode('fotos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all ${
                    activeViewMode === 'fotos'
                      ? 'bg-[#658728] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Especificación & Fotos</span>
                </button>
              </div>
            </div>

            {/* Content Body: Conditional view between Interactive Animation vs Detailed Photo Specification */}
            {activeViewMode === 'animacion' ? (
              <div className="space-y-3">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                  <span className="font-bold text-[#001871]">Ingeniería del Sistema de Cosecha de Agua:</span> Captación con cunetas en suelo-cemento (sacos 0.1×0.5×0.7 m), estanque excavado de 10×15 m (175 m³ exc. / 165 m³ diques) con geomembrana HDPE 40 mils (1.0 mm), desagüe en PVC 3" (20 m), bombeo solar autónomo (5.000 L/día) y cerramiento de 4 hilos con 32 árboles nativos a 3 m.
                </div>
                <CosechaAguaAnimacion />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                
                {/* Left Column: Texto y Componentes Clave */}
                <div className="lg:col-span-5 space-y-3">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium text-justify">
                    Sistema integral compuesto por cunetas en <strong>suelo-cemento (sacos 0.1×0.5×0.7 m)</strong>, reservorio excavado de <strong>10×15 m</strong> impermeabilizado con <strong>geomembrana HDPE de 40 mils (1.00 mm)</strong>, desagüe en <strong>PVC sanitario 3" (20 m)</strong>, <strong>bombeo solar fotovoltaico (5.000 L/día)</strong> y cerramiento perimetral de <strong>4 hilos con 32 árboles nativos</strong>.
                  </p>

                  {/* 5 Feature Badges */}
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-700 shrink-0" />
                      <div>
                        <div className="text-[10px] font-bold text-slate-800">HDPE 40 mils (1.0mm)</div>
                        <div className="text-[9px] text-slate-500 font-mono">10×15m • 175 m³ exc.</div>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <div className="text-[10px] font-bold text-slate-800">Bombeo Solar FV</div>
                        <div className="text-[9px] text-slate-500 font-mono">5.000 L/día + Baterías</div>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2">
                      <TreePine className="w-4 h-4 text-emerald-700 shrink-0" />
                      <div>
                        <div className="text-[10px] font-bold text-slate-800">32 Árboles Nativos</div>
                        <div className="text-[9px] text-slate-500 font-mono">Distancia @ 3.0 m</div>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#001871] shrink-0" />
                      <div>
                        <div className="text-[10px] font-bold text-slate-800">Púas 4 Hilos</div>
                        <div className="text-[9px] text-slate-500 font-mono">Longitud: 82 a 240 m</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-[11px] text-emerald-900 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Sustitución técnica aprobada por Cormacarena (Concepto 3.44.25.1543).</span>
                  </div>
                </div>

                {/* Right Column: 2 Visual Photographs Cards + 3 Teardrops Identity */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
                  
                  {/* Photo 1: Reservorio HDPE con Panel Solar y Canal */}
                  <div className="rounded-xl overflow-hidden border border-slate-300 shadow-md bg-slate-100 flex flex-col group hover:shadow-lg transition-all">
                    <div className="relative h-44 sm:h-48 w-full bg-gradient-to-b from-sky-400 via-sky-200 to-slate-200 overflow-hidden flex items-end">
                      
                      {/* Sky & Background */}
                      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/80 via-sky-300/60 to-emerald-900/30" />
                      
                      {/* Background Trees & Horizon */}
                      <div className="absolute top-8 left-0 right-0 h-16 bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 opacity-90 rounded-t-full blur-[1px]" />
                      <div className="absolute top-12 left-0 right-0 h-10 bg-emerald-900/70" />

                      {/* Reservorio HDPE (Black Geomembrane on Left with realistic sheen) */}
                      <div className="absolute bottom-0 left-0 w-3/5 h-28 bg-gradient-to-br from-slate-900 via-slate-950 to-black rounded-tr-3xl shadow-inner border-t border-slate-700 overflow-hidden">
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/30 via-transparent to-transparent" />
                        <div className="absolute top-2 left-4 right-6 h-px bg-slate-600/50" />
                        <div className="absolute top-6 left-2 right-4 h-px bg-slate-700/60" />
                        <span className="absolute bottom-2 left-2 text-[9px] font-mono font-black text-white/70 px-1.5 py-0.5 rounded bg-black/60">
                          Geomembrana HDPE
                        </span>
                      </div>

                      {/* Concrete Berm Trench / Canal Disipador */}
                      <div className="absolute bottom-0 left-[55%] w-7 h-28 bg-slate-200 border-x border-slate-400 shadow-sm flex items-center justify-center">
                        <div className="w-1.5 h-full bg-slate-300/80" />
                      </div>

                      {/* Ground Bank / Berm */}
                      <div className="absolute bottom-0 right-0 w-[42%] h-28 bg-gradient-to-br from-amber-700/70 via-amber-800 to-amber-900 border-t border-amber-600" />

                      {/* Solar PV Post & Panel Structure */}
                      <div className="absolute top-4 right-8 flex flex-col items-center z-10">
                        <div className="w-16 h-8 bg-gradient-to-tr from-blue-950 via-blue-900 to-indigo-900 rounded-sm border-2 border-slate-300 shadow-md transform -rotate-12 flex items-center justify-center">
                          <div className="grid grid-cols-4 grid-rows-2 gap-0.5 w-full h-full p-0.5 opacity-80">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <div key={i} className="bg-blue-800/80 border border-blue-400/40 rounded-[1px]" />
                            ))}
                          </div>
                        </div>
                        <div className="w-1.5 h-20 bg-emerald-800 border-x border-emerald-950 shadow-sm" />
                        <div className="w-6 h-7 bg-slate-900 rounded-sm border border-slate-700 absolute top-12 -right-1 shadow-sm" />
                        <div className="w-4 h-5 bg-slate-950 rounded-xs border border-slate-700 absolute top-20 -right-0.5 shadow-sm" />
                      </div>

                      {/* PVC White Pipe Delivery */}
                      <div className="absolute bottom-6 left-12 w-28 h-1.5 bg-white rounded-full shadow-md z-10 border border-slate-300" />

                      {/* Tag Overlay */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-900/85 text-white backdrop-blur-xs border border-white/20">
                          Reservorio HDPE + Bombeo
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-50 border-t border-slate-200">
                      <p className="text-[11px] font-bold text-slate-800">
                        Reservorio impermeabilizado con lámina HDPE y sistema solar
                      </p>
                      <span className="text-[10px] text-slate-500">
                        Almacenamiento hídrico para fauna y uso comunitario
                      </span>
                    </div>
                  </div>

                  {/* Photo 2: Sistema de Bombeo Solar Fotovoltaico y Canal de Entrada */}
                  <div className="rounded-xl overflow-hidden border border-slate-300 shadow-md bg-slate-100 flex flex-col group hover:shadow-lg transition-all">
                    <div className="relative h-44 sm:h-48 w-full bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 overflow-hidden flex items-end">
                      
                      <div className="absolute inset-0 bg-gradient-to-b from-sky-500 via-sky-300 to-amber-50" />

                      <div className="absolute top-6 left-0 right-0 h-16 bg-gradient-to-r from-emerald-800 via-green-800 to-emerald-900 opacity-90 rounded-t-full" />
                      
                      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600">
                        <div className="absolute top-0 bottom-0 left-1/3 w-10 bg-slate-200 border-x-2 border-slate-400 transform -skew-x-12 shadow-sm" />
                      </div>

                      <div className="absolute top-4 right-10 flex flex-col items-center z-10">
                        <div className="w-16 h-8 bg-gradient-to-tr from-blue-950 to-blue-800 rounded-sm border-2 border-slate-300 shadow-md transform -rotate-6 flex items-center justify-center">
                          <div className="grid grid-cols-4 grid-rows-2 gap-0.5 w-full h-full p-0.5 opacity-80">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <div key={i} className="bg-blue-800/80 border border-blue-400/40 rounded-[1px]" />
                            ))}
                          </div>
                        </div>
                        <div className="w-1.5 h-20 bg-emerald-800 border-x border-emerald-950 shadow-sm" />
                        <div className="w-7 h-8 bg-slate-900 rounded-sm border border-slate-600 absolute top-11 -right-1 shadow-sm" />
                        <div className="w-5 h-6 bg-slate-950 rounded-xs border border-slate-700 absolute top-20 -right-0.5 shadow-sm" />
                      </div>

                      <div className="absolute bottom-10 right-2 w-20 flex justify-between items-end opacity-70">
                        <div className="w-1 h-8 bg-amber-950" />
                        <div className="w-1 h-8 bg-amber-950" />
                        <div className="w-1 h-8 bg-amber-950" />
                      </div>

                      <div className="absolute top-2 left-2 z-10">
                        <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#001871]/90 text-white backdrop-blur-xs border border-white/20">
                          Bombeo Solar Autónomo
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-slate-800">
                          Estructuras hidráulicas y panel fotovoltaico
                        </p>
                        <span className="text-[10px] text-slate-500">
                          Cero emisiones y autonomía operativa
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 pl-2">
                        <div className="w-4 h-5 rounded-full rounded-tl-xs bg-[#6b7280] shadow-xs transform rotate-45" title="Gris Técnico" />
                        <div className="w-4 h-5 rounded-full rounded-tl-xs bg-[#8FA73B] shadow-xs transform rotate-45" title="Verde Sostenible" />
                        <div className="w-4 h-5 rounded-full rounded-tl-xs bg-[#001871] shadow-xs transform rotate-45" title="Azul Hídrico" />
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>
      </div>

      {/* Bottom Legal Baseline & Navigation */}
      <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          Corporación Cormacarena | Concepto de Viabilidad Técnica No. 3.44.25.1543 • Oficio PM.GA.3.26.5845
        </div>

        {onNavigateToSlide && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateToSlide(hiddenSlides.includes(10) ? 9 : 10)}
              className="px-3 py-1.5 rounded-lg border border-white/20 text-slate-300 hover:bg-white/10 font-semibold transition-all text-xs"
            >
              {hiddenSlides.includes(10) ? '← D9: Inversión 1%' : '← D10: Matriz Combinada'}
            </button>
            <button
              onClick={() => onNavigateToSlide(12)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-bold bg-[#001871] hover:bg-[#002299] text-white shadow-md transition-all active:scale-95 text-xs"
            >
              <span>Ver Ingeniería Cosecha de Agua (D12)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
