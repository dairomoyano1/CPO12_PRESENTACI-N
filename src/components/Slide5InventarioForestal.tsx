import React, { useState } from 'react';
import { SlideHeader } from './SlideHeader';
import { 
  Trees, 
  Sprout, 
  Search, 
  DollarSign, 
  Calendar, 
  Target, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

interface Slide5Props {
  onNavigateToSlide?: (slideNumber: number) => void;
}

export const Slide5InventarioForestal: React.FC<Slide5Props> = ({ onNavigateToSlide }) => {
  const [activeTab, setActiveTab] = useState<'resumen' | 'detalle'>('resumen');

  return (
    <div className="w-full h-full min-h-[620px] p-4 sm:p-6 lg:p-8 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl flex flex-col justify-between">
      
      {/* Top Section */}
      <div>
        {/* Slide Header */}
        <SlideHeader
          slideNumber={7}
          totalSlides={12}
          title="INVENTARIO FORESTAL EN EJECUCIÓN"
          subtitle="Bloque CPO12 • Contrato de Verificación y Cierre en Campo"
          objective="Realizar el inventario forestal para las 30,4 ha de compensación y 10 ha de inversión del 1% para el bloque CPO12 y verificar el estado actual."
          badge="Operación en Campo"
          isLight={true}
        />

        {/* Title Header with River/Forest Visual Banner */}
        <div className="relative mb-6 pb-2 border-b border-slate-200 overflow-hidden rounded-xl bg-gradient-to-r from-slate-50 via-emerald-50/40 to-slate-100 p-4 border border-slate-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1b382b] tracking-tight uppercase font-display">
                INVENTARIO FORESTAL EN EJECUCIÓN
              </h2>
              <p className="text-sm font-bold text-[#2d5a43] mt-0.5">
                Bloque CPO12
              </p>
            </div>

            {/* Aerial River Forest Visual Pill */}
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-emerald-700/20 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-800 to-[#1b382b] flex items-center justify-center text-white shadow-xs">
                <Trees className="w-6 h-6 text-emerald-300" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-950 block font-display">
                  Monitoreo Biótico
                </span>
                <span className="text-[10px] text-slate-600 font-medium">
                  Cuencas Melúa, Planas y Caño Pilón
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Column (Alcance) & Right Column (Costo + Resultados) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: ALCANCE DE LA ACTIVIDAD (span 6 or 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-slate-50/60 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2.5 bg-[#1b382b] text-white px-4 py-2 rounded-xl shadow-xs self-start mb-6">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Trees className="w-3.5 h-3.5 text-emerald-200" />
              </div>
              <span className="text-sm font-black tracking-wider uppercase font-display">
                ALCANCE DE LA ACTIVIDAD
              </span>
            </div>

            {/* List of 3 Key Scope Items */}
            <div className="space-y-4">
              
              {/* Item 1: 30,4 ha de compensación */}
              <div className="flex items-center gap-4 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-600 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#1b382b] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Trees className="w-6 h-6 text-emerald-300" />
                </div>
                <div className="h-9 w-px bg-slate-300 shrink-0 hidden sm:block" />
                <div className="text-slate-800 text-base sm:text-lg">
                  <strong className="font-extrabold text-[#1b382b] text-lg sm:text-xl">30,4 ha</strong>{' '}
                  <span className="text-slate-700 font-medium">de compensación</span>
                </div>
              </div>

              {/* Item 2: 10 ha de inversión del 1% */}
              <div className="flex items-center gap-4 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-600 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#1b382b] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sprout className="w-6 h-6 text-emerald-300" />
                </div>
                <div className="h-9 w-px bg-slate-300 shrink-0 hidden sm:block" />
                <div className="text-slate-800 text-base sm:text-lg">
                  <strong className="font-extrabold text-[#1b382b] text-lg sm:text-xl">10 ha</strong>{' '}
                  <span className="text-slate-700 font-medium">de inversión del 1% para el bloque CPO12</span>
                </div>
              </div>

              {/* Item 3: Verificar el estado actual */}
              <div className="flex items-center gap-4 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-600 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#1b382b] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Search className="w-6 h-6 text-emerald-300" />
                </div>
                <div className="h-9 w-px bg-slate-300 shrink-0 hidden sm:block" />
                <div className="text-slate-800 text-base sm:text-lg">
                  <span className="text-slate-700 font-medium">Verificar el</span>{' '}
                  <strong className="font-extrabold text-[#1b382b] text-lg sm:text-xl">estado actual</strong>
                </div>
              </div>

            </div>

            {/* Quick Context Footnote */}
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span>Levantamiento dendrométrico, supervivencia &amp; estado fitosanitario</span>
              <span className="font-bold text-emerald-800 font-mono">40,44 Ha Totales</span>
            </div>

          </div>

          {/* Right Column: COSTO (top) + RESULTADOS ESPERADOS (bottom) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            
            {/* Box 1: COSTO */}
            <div className="bg-slate-50/60 rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex-1 flex flex-col">
              <div className="bg-[#1b382b] text-white px-4 py-2 font-display font-extrabold text-sm uppercase tracking-wider">
                COSTO
              </div>
              <div className="p-5 sm:p-6 flex items-center gap-4 sm:gap-5 flex-1 bg-white">
                <div className="w-14 h-14 rounded-full bg-[#1b382b] text-white flex items-center justify-center shrink-0 shadow-md">
                  <DollarSign className="w-8 h-8 text-emerald-300 font-black" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Presupuesto Contratado
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#1b382b] font-mono tracking-tight">
                    $ 51.717.873,00
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    Pesos Colombianos (COP) • En ejecución
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: RESULTADOS ESPERADOS */}
            <div className="bg-slate-50/60 rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex-1 flex flex-col">
              <div className="bg-[#1b382b] text-white px-4 py-2 font-display font-extrabold text-sm uppercase tracking-wider">
                RESULTADOS ESPERADOS
              </div>
              <div className="p-5 sm:p-6 flex items-center gap-4 sm:gap-5 flex-1 bg-white">
                <div className="w-14 h-14 rounded-full bg-[#1b382b] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Calendar className="w-7 h-7 text-emerald-300" />
                </div>
                <div>
                  <p className="text-sm sm:text-base text-slate-700 font-medium">
                    Se espera tener los resultados para
                  </p>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#1b382b] tracking-tight mt-0.5">
                    agosto - septiembre
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Vigencia 2026 • Entrega de informe final de campo
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Objective Banner */}
        <div className="mt-6 p-4 rounded-xl bg-[#f4f7f5] border border-emerald-800/20 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-[#1b382b] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Target className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="text-xs sm:text-sm text-slate-800 leading-snug">
            <strong className="text-[#1b382b] uppercase font-bold tracking-wide">OBJETIVO:</strong>{' '}
            Realizar el inventario forestal para las <strong className="text-slate-900 font-extrabold">30,4 ha</strong> de compensación y{' '}
            <strong className="text-slate-900 font-extrabold">10 ha</strong> de inversión del 1% para el bloque CPO12 y verificar el{' '}
            <strong className="text-slate-900 font-extrabold">estado actual</strong>.
          </div>
        </div>

      </div>

      {/* Bottom Actions Bar */}
      <div className="mt-6 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-800" />
          <span>
            Verificación técnica en campo para sustento de respuestas ante la ANLA (LAM 5475)
          </span>
        </div>

        {onNavigateToSlide && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateToSlide(6)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition-all"
            >
              ← Análisis Satelital NDVI (D6)
            </button>
            <button
              onClick={() => onNavigateToSlide(8)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-bold bg-[#1b382b] hover:bg-[#12261d] text-white shadow-md transition-all active:scale-95"
            >
              <span>Ver Escenarios de Compensación (D8)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
