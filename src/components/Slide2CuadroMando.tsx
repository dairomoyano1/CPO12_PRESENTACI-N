import React, { useState } from 'react';
import { SlideHeader } from './SlideHeader';
import { OBLIGATIONS_KPI } from '../data/presentationData';
import { ObligationKPI } from '../types';
import { 
  AlertCircle, 
  Clock, 
  MapPin, 
  DollarSign, 
  Trees, 
  Droplets, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Info,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Slide2Props {
  onNavigateToSlide: (slideNumber: number) => void;
}

export const Slide2CuadroMando: React.FC<Slide2Props> = ({ onNavigateToSlide }) => {
  const [selectedKpi, setSelectedKpi] = useState<ObligationKPI | null>(null);

  const getSemaphoreBadge = (semaphore: string, color: string) => {
    switch (color) {
      case 'yellow':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>{semaphore}</span>
          </div>
        );
      case 'red':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/40">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>{semaphore}</span>
          </div>
        );
      case 'magenta':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-[#E31C79]/20 text-[#ff8bbd] border border-[#E31C79]/50">
            <span className="w-2 h-2 rounded-full bg-[#E31C79]" />
            <span>{semaphore}</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-[#8FA73B]/20 text-[#8FA73B] border border-[#8FA73B]/40">
            <span className="w-2 h-2 rounded-full bg-[#8FA73B]" />
            <span>{semaphore}</span>
          </div>
        );
    }
  };

  const getIconForKpi = (id: string) => {
    if (id.includes('forestal')) return <Trees className="w-5 h-5 text-amber-400" />;
    if (id.includes('1')) return <Flame className="w-5 h-5 text-red-400" />;
    return <Droplets className="w-5 h-5 text-[#E31C79]" />;
  };

  const getSlideTarget = (id: string) => {
    if (id.includes('forestal')) return 7;
    if (id.includes('1')) return 8;
    return 9;
  };

  return (
    <div className="w-full h-full min-h-[600px] p-6 sm:p-8 rounded-2xl bg-[#201747] text-white border border-white/10 shadow-2xl flex flex-col justify-between">
      <div>
        <SlideHeader
          slideNumber={6}
          totalSlides={12}
          title="Estado Consolidado de Obligaciones y Alertas Críticas"
          subtitle="Cuadro de Mando de Cumplimiento C-Suite"
          objective="Brindar lectura visual ejecutiva inmediata del estado de las tres obligaciones principales."
          badge="Matriz 3 Columnas C-Suite"
        />

        {/* 3-Column Executive Matrix (Tarjetas #001871 sobre fondo #201747) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-3">
          {OBLIGATIONS_KPI.map((kpi) => {
            const slideTarget = getSlideTarget(kpi.id);
            const isMagenta = kpi.semaphoreColor === 'magenta';
            const isRed = kpi.semaphoreColor === 'red';

            return (
              <div
                key={kpi.id}
                className={`flex flex-col justify-between rounded-xl bg-[#001871] p-5 sm:p-6 border transition-all duration-200 shadow-xl relative overflow-hidden group ${
                  isMagenta
                    ? 'border-[#E31C79]/80'
                    : isRed
                    ? 'border-red-500/50'
                    : 'border-amber-500/40'
                }`}
              >
                {/* Header of the Card */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-black/30 border border-white/10">
                      {getIconForKpi(kpi.id)}
                    </div>
                    {getSemaphoreBadge(kpi.semaphore, kpi.semaphoreColor)}
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      {kpi.authority} • {kpi.instrument}
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-bold text-white leading-snug">
                      {kpi.name}
                    </h3>
                  </div>

                  {/* Key Metrics / Budget */}
                  <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                        Metas / Alcance
                      </span>
                      <div className="font-semibold text-[#F4F5F7] text-xs sm:text-sm bg-black/25 p-2 rounded border border-white/5 font-mono">
                        {kpi.targets}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> Ubicación
                      </span>
                      <div className="text-slate-200 text-xs">
                        {kpi.location}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                        Estado Operativo y Regulatorio
                      </span>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        {kpi.operationalStatus}
                      </p>
                    </div>

                    {kpi.criticalNotice && (
                      <div className="p-2.5 rounded bg-[#E31C79]/15 border border-[#E31C79]/30 text-[#ff8bbd] text-[11px] font-semibold flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#E31C79]" />
                        <span>{kpi.criticalNotice}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action of the Card */}
                <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedKpi(kpi)}
                    className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-medium hover:underline"
                  >
                    <Info className="w-3.5 h-3.5" /> Ficha Técnica
                  </button>

                  <button
                    onClick={() => onNavigateToSlide(slideTarget)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-[#001871] hover:bg-[#002299] text-white border border-white/20 transition-all active:scale-95 shadow-sm"
                  >
                    <span>Ver Diapositiva {slideTarget}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Contextual Alert Bar */}
      <div className="mt-5 p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#E31C79] shrink-0" />
          <span className="text-slate-200">
            <strong className="text-[#E31C79] font-bold">Alerta C-Suite:</strong> La obligación ante Cormacarena tiene fecha fatal el <strong>29 de Agosto de 2026</strong>. La inversión del 1% presenta $20,26M COP de sobrecosto acumulado por incendios.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateToSlide(9)}
            className="text-xs text-[#8FA73B] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Ver Escenarios Financieros (D9)</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Modal Detailed KPI Inspector */}
      <AnimatePresence>
        {selectedKpi && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-[#201747] border border-white/20 rounded-2xl max-w-xl w-full p-6 text-white shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono text-[#E31C79] uppercase">{selectedKpi.authority} • {selectedKpi.instrument}</div>
                  <h3 className="text-xl font-bold font-display text-white">{selectedKpi.name}</h3>
                </div>
                {getSemaphoreBadge(selectedKpi.semaphore, selectedKpi.semaphoreColor)}
              </div>

              <div className="space-y-3 text-xs bg-[#001871]/60 p-4 rounded-xl border border-white/10">
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block">Meta / Alcance:</strong>
                  <p className="text-sm font-semibold text-white">{selectedKpi.targets}</p>
                </div>
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block">Presupuesto / Ejecución:</strong>
                  <p className="text-xs text-slate-200 font-mono">{selectedKpi.financialTarget} | {selectedKpi.executedFinancial}</p>
                </div>
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] block">Acción Inmediata Requerida:</strong>
                  <p className="text-xs text-[#F4F5F7]">{selectedKpi.actionRequired}</p>
                </div>
                {selectedKpi.deadline && (
                  <div>
                    <strong className="text-slate-400 uppercase text-[10px] block">Fecha Límite:</strong>
                    <p className="text-xs font-bold text-[#E31C79]">{selectedKpi.deadline}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedKpi(null)}
                  className="px-4 py-2 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    const target = getSlideTarget(selectedKpi.id);
                    setSelectedKpi(null);
                    onNavigateToSlide(target);
                  }}
                  className="px-4 py-2 text-xs rounded-lg bg-[#E31C79] hover:bg-[#c41364] text-white font-bold flex items-center gap-1.5 shadow"
                >
                  <span>Abrir Diapositiva Específica</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
