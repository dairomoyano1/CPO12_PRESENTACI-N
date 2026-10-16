import React, { useState, useEffect } from 'react';
import { SLIDES_METADATA } from '../data/presentationData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  Grid, 
  Play, 
  Pause, 
  FileSpreadsheet, 
  Printer, 
  Layers, 
  Calendar,
  X,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface PresentationControlsProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (slideNumber: number) => void;
  onOpenSheetsExport: () => void;
  hiddenSlides?: number[];
  onToggleSlideVisibility?: (slideNumber: number) => void;
  onToggleHideBoth3And9?: () => void;
  onToggleHideBoth3And10?: () => void;
  onToggleHideBoth4And10?: () => void;
}

export const PresentationControls: React.FC<PresentationControlsProps> = ({
  currentSlide,
  totalSlides,
  onNavigate,
  onOpenSheetsExport,
  hiddenSlides = [],
  onToggleSlideVisibility,
  onToggleHideBoth3And9,
  onToggleHideBoth3And10,
  onToggleHideBoth4And10,
}) => {
  const toggleHandler = onToggleHideBoth4And10 || onToggleHideBoth3And10 || onToggleHideBoth3And9;
  const isHiddenActive = hiddenSlides.includes(4) || hiddenSlides.includes(10) || hiddenSlides.includes(3) || hiddenSlides.includes(9);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Helper functions to get next and previous visible slides
  const getNextVisibleSlide = (fromSlide: number): number => {
    for (let s = fromSlide + 1; s <= totalSlides; s++) {
      if (!hiddenSlides.includes(s)) return s;
    }
    return fromSlide;
  };

  const getPrevVisibleSlide = (fromSlide: number): number => {
    for (let s = fromSlide - 1; s >= 1; s--) {
      if (!hiddenSlides.includes(s)) return s;
    }
    return fromSlide;
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        const next = getNextVisibleSlide(currentSlide);
        if (next !== currentSlide) onNavigate(next);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = getPrevVisibleSlide(currentSlide);
        if (prev !== currentSlide) onNavigate(prev);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'o' || e.key === 'O' || e.key === 'Escape') {
        setIsGridOpen((prev) => !prev);
      } else if (e.key >= '1' && e.key <= '9') {
        const slideNum = parseInt(e.key, 10);
        if (slideNum <= totalSlides) onNavigate(slideNum);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides, onNavigate, hiddenSlides]);

  // Autoplay timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoplay) {
      timer = setInterval(() => {
        const next = getNextVisibleSlide(currentSlide);
        if (next !== currentSlide) {
          onNavigate(next);
        } else {
          // Wrap around to the first visible slide
          const firstVisible = SLIDES_METADATA.find((s) => !hiddenSlides.includes(s.slideNumber))?.slideNumber || 1;
          onNavigate(firstVisible);
        }
      }, 8000);
    }
    return () => clearInterval(timer);
  }, [isAutoplay, currentSlide, totalSlides, onNavigate, hiddenSlides]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Fixed Bottom Executive Navigation Bar */}
      <footer aria-label="Controles de presentación" className="w-full bg-[#120b29]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 sticky bottom-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left Controls: Slide Selector & Overview */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGridOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#001871] hover:bg-[#002299] text-white border border-white/20 transition-all active:scale-95 shadow"
              title="Vista en cuadrícula de diapositivas (Tecla 'O')"
            >
              <Grid className="w-3.5 h-3.5 text-[#E31C79]" />
              <span className="hidden sm:inline">Índice (O)</span>
            </button>

            {toggleHandler && (
              <button
                onClick={toggleHandler}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all active:scale-95 shadow ${
                  isHiddenActive
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                }`}
                title="Haga clic para habilitar u ocultar las diapositivas 4 y 10"
              >
                {isHiddenActive ? (
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
            )}

            <button
              onClick={onOpenSheetsExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-800/80 hover:bg-emerald-700 text-white border border-emerald-500/30 transition-all active:scale-95 shadow"
              title="Exportar datos a Google Sheets / Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">Google Sheets</span>
            </button>
          </div>

          {/* Center Controls: Direct Numbered Slide Pills */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => onNavigate(getPrevVisibleSlide(currentSlide))}
              disabled={getPrevVisibleSlide(currentSlide) === currentSlide}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
              title="Diapositiva Anterior (Flecha Izquierda)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1 px-1">
              {SLIDES_METADATA.filter((slide) => !hiddenSlides.includes(slide.slideNumber)).map((slide) => {
                const isActive = slide.slideNumber === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => onNavigate(slide.slideNumber)}
                    className={`relative w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center ${
                      isActive
                        ? 'bg-[#E31C79] text-white shadow-[0_0_10px_rgba(227,28,121,0.5)] scale-105 z-10'
                        : 'text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                    title={`D${slide.slideNumber}: ${slide.title}`}
                  >
                    {slide.slideNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => onNavigate(getNextVisibleSlide(currentSlide))}
              disabled={getNextVisibleSlide(currentSlide) === currentSlide}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
              title="Siguiente Diapositiva (Flecha Derecha / Espacio)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Controls: Fullscreen, Autoplay, Shortcuts */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className={`p-1.5 rounded-lg text-xs font-medium border transition-all ${
                isAutoplay
                  ? 'bg-[#8FA73B] text-slate-900 border-[#8FA73B]'
                  : 'bg-black/30 text-slate-300 border-white/10 hover:text-white'
              }`}
              title={isAutoplay ? 'Pausar Avance Automático' : 'Reproducir Presentación (8s)'}
            >
              {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-black/30 text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="Pantalla Completa (Tecla 'F')"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowShortcuts(true)}
              className="p-1.5 rounded-lg bg-black/30 text-slate-400 hover:text-white border border-white/10 transition-colors"
              title="Atajos de teclado"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

        </div>
      </footer>

      {/* Grid Drawer Modal for all 9 slides */}
      {isGridOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#201747] border border-white/20 rounded-2xl max-w-5xl w-full p-6 text-white shadow-2xl space-y-4 max-h-[90vh] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#E31C79]" />
                <h3 className="text-lg font-bold font-display text-white">
                  Índice y Selector de Presentación CPO-12
                </h3>
              </div>
              
              <div className="flex items-center gap-2">
                {toggleHandler && (
                  <button
                    onClick={toggleHandler}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      isHiddenActive
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                        : 'bg-white/10 text-slate-200 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {isHiddenActive ? (
                      <>
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Habilitar D4 y D10 para presentar</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                        <span>Ocultar D4 y D10 (Recomendado)</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={() => setIsGridOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto pr-1">
              {SLIDES_METADATA.filter((slide) => !hiddenSlides.includes(slide.slideNumber)).map((slide) => {
                const isActive = slide.slideNumber === currentSlide;
                return (
                  <div
                    key={slide.id}
                    onClick={() => {
                      onNavigate(slide.slideNumber);
                      setIsGridOpen(false);
                    }}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all border text-left flex flex-col justify-between relative ${
                      isActive
                        ? 'bg-[#001871] border-[#E31C79] ring-2 ring-[#E31C79]/50 shadow-xl'
                        : 'bg-black/30 border-white/10 hover:bg-[#001871]/40 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-[#E31C79] text-white">
                            D{slide.slideNumber}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold font-display line-clamp-2 leading-tight text-white">
                        {slide.title}
                      </h4>
                    </div>

                    <p className="text-[10px] text-slate-400 mt-2 line-clamp-2 leading-snug">
                      {slide.objective}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
              <span>Haga clic en cualquier diapositiva para navegar.</span>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-emerald-400 font-bold">{totalSlides - hiddenSlides.length} Diapositivas Activas</span>
                {hiddenSlides.length > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-amber-400 font-semibold">{hiddenSlides.length} Reservadas (D4 y D10)</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Helper Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#201747] border border-white/20 rounded-xl max-w-md w-full p-5 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h4 className="font-bold text-sm font-display">Atajos de Teclado</h4>
              <button onClick={() => setShowShortcuts(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded">
                <span className="text-slate-300">Avanzar diapositiva:</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded">Flecha Derecha / Espacio</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded">
                <span className="text-slate-300">Retroceder diapositiva:</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded">Flecha Izquierda</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded">
                <span className="text-slate-300">Pantalla Completa:</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded">F</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded">
                <span className="text-slate-300">Abrir Índice / Cuadrícula:</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded">O / Esc</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded">
                <span className="text-slate-300">Ir a Diapositiva 1 a 9:</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded">Teclas 1 - 9</span>
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() => setShowShortcuts(false)}
                className="px-4 py-1.5 rounded-lg bg-[#E31C79] text-white text-xs font-bold"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
