/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SLIDES_METADATA, BLOCK_METADATA } from './data/presentationData';
import { Slide0ResumenExpedientes } from './components/Slide0ResumenExpedientes';
import { Slide1Portada } from './components/Slide1Portada';
import { Slide3SancionatorioANLA } from './components/Slide3SancionatorioANLA';
import { Slide5LineaTiempoANLA } from './components/Slide5LineaTiempoANLA';
import { Slide6LineaTiempoActividades } from './components/Slide6LineaTiempoActividades';
import { Slide2MetodologiaNDVI } from './components/Slide2MetodologiaNDVI';
import { Slide5InventarioForestal } from './components/Slide5InventarioForestal';
import { Slide6EscenariosCompensacion } from './components/Slide6EscenariosCompensacion';
import { Slide7EstrategiaInversion1Porciento } from './components/Slide7EstrategiaInversion1Porciento';
import { Slide8MatrizCombinadaCostos } from './components/Slide8MatrizCombinadaCostos';
import { Slide6CormacarenaProceso } from './components/Slide6CormacarenaProceso';
import { Slide7IngenieriaCosecha } from './components/Slide7IngenieriaCosecha';
import { PresentationControls } from './components/PresentationControls';
import { SheetsExportModal } from './components/SheetsExportModal';
import { 
  Building2, 
  Calendar, 
  Layers, 
  FileSpreadsheet, 
  ShieldCheck, 
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isSheetsExportOpen, setIsSheetsExportOpen] = useState<boolean>(false);
  // Ocultar por defecto las diapositivas 4 (Cronograma ANLA) y 10 (Matriz Combinada Costos)
  const [hiddenSlides, setHiddenSlides] = useState<number[]>([4, 10]);

  const totalSlides = SLIDES_METADATA.length;

  const navigateToSlide = (slideNum: number) => {
    if (slideNum >= 1 && slideNum <= totalSlides) {
      if (hiddenSlides.includes(slideNum)) {
        const next = getNextVisibleSlide(slideNum);
        setCurrentSlide(next !== slideNum ? next : 1);
        return;
      }
      setCurrentSlide(slideNum);
    }
  };

  const toggleSlideVisibility = (slideNum: number) => {
    setHiddenSlides((prev) => {
      const isCurrentlyHidden = prev.includes(slideNum);
      const nextList = isCurrentlyHidden 
        ? prev.filter((id) => id !== slideNum) 
        : [...prev, slideNum];
      return nextList;
    });
  };

  const toggleHideBoth4And10 = () => {
    const hasAnyHidden = hiddenSlides.includes(4) || hiddenSlides.includes(10);
    if (hasAnyHidden) {
      // Habilitar ambas diapositivas
      setHiddenSlides((prev) => prev.filter((id) => id !== 4 && id !== 10));
    } else {
      // Ocultar ambas diapositivas
      setHiddenSlides((prev) => Array.from(new Set([...prev, 4, 10])));
      if (currentSlide === 4) setCurrentSlide(5);
      if (currentSlide === 10) setCurrentSlide(11);
    }
  };

  const getNextVisibleSlide = (fromSlide: number): number => {
    for (let s = fromSlide + 1; s <= totalSlides; s++) {
      if (!hiddenSlides.includes(s)) return s;
    }
    return fromSlide;
  };

  const renderSlideContent = () => {
    switch (currentSlide) {
      case 1:
        return (
          <Slide0ResumenExpedientes
            onNavigateNext={() => navigateToSlide(getNextVisibleSlide(1))}
            onNavigateToSlide={navigateToSlide}
            hiddenSlides={hiddenSlides}
          />
        );
      case 2:
        return (
          <Slide1Portada
            onNavigateNext={() => navigateToSlide(getNextVisibleSlide(2))}
            onNavigateToSlide={navigateToSlide}
            hiddenSlides={hiddenSlides}
          />
        );
      case 3:
        return (
          <Slide3SancionatorioANLA
            onNavigateNext={() => navigateToSlide(getNextVisibleSlide(3))}
            onNavigateToSlide={navigateToSlide}
            hiddenSlides={hiddenSlides}
          />
        );
      case 4:
        if (hiddenSlides.includes(4)) {
          return (
            <div className="w-full min-h-[500px] p-8 rounded-2xl bg-[#201747] border border-amber-500/40 text-center flex flex-col items-center justify-center gap-4 text-white">
              <EyeOff className="w-12 h-12 text-amber-400" />
              <div className="max-w-md">
                <h3 className="text-lg font-bold text-white mb-1">Diapositiva 4 Oculta</h3>
                <p className="text-xs text-slate-300">
                  Esta diapositiva (Cronograma ANLA) está reservada y oculta para la presentación general.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => toggleSlideVisibility(4)}
                  className="px-4 py-2 rounded-xl bg-[#E31C79] text-white text-xs font-bold shadow hover:bg-[#c21465] transition-all"
                >
                  Habilitar Diapositiva 4
                </button>
                <button
                  onClick={() => navigateToSlide(5)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all"
                >
                  Continuar a Diapositiva 5
                </button>
              </div>
            </div>
          );
        }
        return <Slide5LineaTiempoANLA />;
      case 5:
        return <Slide6LineaTiempoActividades onNavigateToSlide={navigateToSlide} hiddenSlides={hiddenSlides} />;
      case 6:
        return <Slide2MetodologiaNDVI onNavigateToSlide={navigateToSlide} hiddenSlides={hiddenSlides} />;
      case 7:
        return <Slide5InventarioForestal onNavigateToSlide={navigateToSlide} />;
      case 8:
        return <Slide6EscenariosCompensacion onNavigateToSlide={navigateToSlide} />;
      case 9:
        return <Slide7EstrategiaInversion1Porciento onNavigateToSlide={navigateToSlide} hiddenSlides={hiddenSlides} />;
      case 10:
        if (hiddenSlides.includes(10)) {
          return (
            <div className="w-full min-h-[500px] p-8 rounded-2xl bg-[#201747] border border-amber-500/40 text-center flex flex-col items-center justify-center gap-4 text-white">
              <EyeOff className="w-12 h-12 text-amber-400" />
              <div className="max-w-md">
                <h3 className="text-lg font-bold text-white mb-1">Diapositiva 10 Oculta</h3>
                <p className="text-xs text-slate-300">
                  Esta diapositiva (Matriz Combinada de Costos) está reservada y oculta para la presentación general.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => toggleSlideVisibility(10)}
                  className="px-4 py-2 rounded-xl bg-[#E31C79] text-white text-xs font-bold shadow hover:bg-[#c21465] transition-all"
                >
                  Habilitar Diapositiva 10
                </button>
                <button
                  onClick={() => navigateToSlide(11)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all"
                >
                  Continuar a Diapositiva 11 (Cormacarena)
                </button>
              </div>
            </div>
          );
        }
        return <Slide8MatrizCombinadaCostos onNavigateToSlide={navigateToSlide} hiddenSlides={hiddenSlides} />;
      case 11:
        return <Slide6CormacarenaProceso onNavigateToSlide={navigateToSlide} hiddenSlides={hiddenSlides} />;
      case 12:
        return <Slide7IngenieriaCosecha onNavigateToSlide={navigateToSlide} hiddenSlides={hiddenSlides} />;
      default:
        return (
          <Slide0ResumenExpedientes
            onNavigateNext={() => navigateToSlide(getNextVisibleSlide(1))}
            onNavigateToSlide={navigateToSlide}
            hiddenSlides={hiddenSlides}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#120b29] text-slate-100 flex flex-col justify-between selection:bg-[#E31C79] selection:text-white">
      
      {/* Top Header Bar */}
      <header className="w-full bg-[#201747]/95 backdrop-blur-md border-b border-white/10 px-4 py-2 z-30 sticky top-0">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-3">
          
          {/* Brand & Block Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#001871] border border-white/20 flex items-center justify-center text-[#E31C79] font-display font-black text-xs shadow-xs">
              12
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-display font-bold text-white tracking-wide">
                  BLOQUE CPO-12
                </span>
                <span className="text-[10px] font-mono bg-white/10 px-1.5 py-0.2 rounded text-slate-300">
                  LAM5475
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  • Frontera Energy
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden md:block">
                Diagnóstico de Cumplimiento Ambiental &amp; Estrategia Integrada de Inversiones
              </p>
            </div>
          </div>

          {/* Quick Critical Alerts and Date Badges */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Toggle for Hidden Slides (D4 & D10) */}
            <button
              onClick={toggleHideBoth4And10}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all border shadow-xs ${
                hiddenSlides.includes(4) || hiddenSlides.includes(10)
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
              title="Haga clic para habilitar u ocultar las diapositivas 4 y 10"
            >
              {hiddenSlides.includes(4) || hiddenSlides.includes(10) ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">+ Habilitar D4 y D10</span>
                  <span className="md:hidden">+ D4/D10</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">D4 y D10 Habilitadas (Ocultar)</span>
                  <span className="md:hidden">D4/D10 Activas</span>
                </>
              )}
            </button>

            <div className="hidden lg:flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#E31C79]/20 text-[#ff8bbd] border border-[#E31C79]/40 font-bold text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31C79]" />
                Hito Crítico: 29-Ago-2026
              </span>
            </div>

            {/* Quick Slide Navigation Dropdown */}
            <div className="relative">
              <select
                aria-label="Seleccionar diapositiva"
                value={currentSlide}
                onChange={(e) => navigateToSlide(Number(e.target.value))}
                className="bg-black/40 text-slate-200 border border-white/15 text-xs rounded px-2.5 py-1 font-medium focus:outline-none focus:border-[#E31C79] cursor-pointer"
              >
                {SLIDES_METADATA.filter((s) => !hiddenSlides.includes(s.slideNumber)).map((s) => (
                  <option key={s.id} value={s.slideNumber} className="bg-[#201747] text-white">
                    D{s.slideNumber}: {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-black/40 px-2.5 py-1 rounded border border-white/10">
              <Calendar className="w-3.5 h-3.5 text-[#E31C79]" />
              <span className="font-medium font-mono text-[11px]">{BLOCK_METADATA.currentDateDisplay}</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Slide Presentation Stage Area */}
      <main className="flex-1 w-full max-w-[1536px] mx-auto p-3 sm:p-5 md:p-6 flex flex-col items-center justify-center">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full"
            >
              {renderSlideContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Sticky Presentation Control Bar */}
      <PresentationControls
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onNavigate={navigateToSlide}
        onOpenSheetsExport={() => setIsSheetsExportOpen(true)}
        hiddenSlides={hiddenSlides}
        onToggleSlideVisibility={toggleSlideVisibility}
        onToggleHideBoth4And10={toggleHideBoth4And10}
      />

      {/* Google Sheets / CSV Export Modal */}
      <SheetsExportModal
        isOpen={isSheetsExportOpen}
        onClose={() => setIsSheetsExportOpen(false)}
      />

    </div>
  );
}
