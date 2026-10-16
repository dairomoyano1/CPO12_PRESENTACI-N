import React, { useState, useEffect } from 'react';
import { SlideHeader } from './SlideHeader';
import { 
  NDVI_UNITS_DATA, 
  NDVI_METHODOLOGY_STATEMENT, 
  NDVI_STRATA, 
  NDVIUnit 
} from '../data/ndviData';
import { NDVISatelliteViewer } from './NDVISatelliteViewer';
import { loadAllLotImages } from '../utils/lotImageStorage';
import { 
  Satellite, 
  Layers, 
  Cpu, 
  Trees, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  ChevronRight,
  Maximize2,
  Table,
  BarChart3,
  ShieldAlert,
  FileCheck,
  Award,
  Target,
  Activity,
  AlertCircle,
  Image as ImageIcon,
  Upload,
  ExternalLink,
  Globe2
} from 'lucide-react';
import { OFFICIAL_GOOGLE_EARTH_URL } from './LiveSatelliteMap';
import { motion, AnimatePresence } from 'motion/react';

interface Slide2Props {
  onNavigateToSlide?: (slideNumber: number) => void;
  hiddenSlides?: number[];
}

export const Slide2MetodologiaNDVI: React.FC<Slide2Props> = ({ 
  onNavigateToSlide,
  hiddenSlides = [4, 10]
}) => {
  // Category tabs: 'compensacion' | 'inversion_1' | 'mosaico_5_lotes' | 'comparativa'
  const [activeCategory, setActiveCategory] = useState<'compensacion' | 'inversion_1' | 'mosaico_5_lotes' | 'comparativa'>('compensacion');
  
  // Selected Unit inside category
  const [selectedUnitId, setSelectedUnitId] = useState<string>('comp-holanda-1-2');
  
  // Selected year inside the unit
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  // Toggle Matrix Grid View
  const [showAllYearsGrid, setShowAllYearsGrid] = useState<boolean>(false);

  // Custom uploaded images mapped by lot id
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});

  useEffect(() => {
    loadAllLotImages().then((imgs) => {
      setUploadedImages(imgs);
    });

    const handleUpdate = () => {
      loadAllLotImages().then((imgs) => {
        setUploadedImages(imgs);
      });
    };

    window.addEventListener('cpo12_lot_images_updated', handleUpdate);
    return () => window.removeEventListener('cpo12_lot_images_updated', handleUpdate);
  }, [activeCategory, selectedUnitId]);

  // Filter units according to category
  const compensacionUnits = NDVI_UNITS_DATA.filter((u) => u.category === 'compensacion');
  const inversionUnits = NDVI_UNITS_DATA.filter((u) => u.category === 'inversion_1');

  const currentUnit = NDVI_UNITS_DATA.find((u) => u.id === selectedUnitId) || NDVI_UNITS_DATA[0];

  const handleSelectCategory = (cat: 'compensacion' | 'inversion_1' | 'mosaico_5_lotes' | 'comparativa') => {
    setActiveCategory(cat);
    if (cat === 'compensacion') {
      setSelectedUnitId('comp-holanda-1-2');
      setSelectedYear(2026);
    } else if (cat === 'inversion_1') {
      setSelectedUnitId('inv-cano-pilon');
      setSelectedYear(2026);
    }
  };

  const handleSelectUnit = (unit: NDVIUnit) => {
    setSelectedUnitId(unit.id);
    const lastYear = unit.timelineYears[unit.timelineYears.length - 1];
    setSelectedYear(lastYear);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Slide Header */}
      <SlideHeader
        slideNumber={5}
        totalSlides={10}
        title="Resultados y Monitoreo Satelital NDVI (Google Earth Engine)"
        subtitle="Evaluación de Vigor Fotosintético, Dinámica Sucesional y Soporte Biofísico para Decisiones C-Suite"
        objective="Evidenciar con datos satelitales multitemporales a 10m/px las 33,34 Ha consolidadas para cierre ante ANLA y las 6,00 Ha siniestradas que justifican la sustitución por Cosecha de Agua."
        badge="Resultados Satelitales & C-Suite"
      />

      {/* ========================================================================= */}
      {/* 1. COMPACT GEE RESOLUTION BAR */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 rounded-xl bg-[#001871]/80 border border-blue-400/30 text-white shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-400/20 text-cyan-300">
            <Satellite className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-200">
            <strong className="text-cyan-300 font-semibold">Sensor Satelital Sentinel-2 / Landsat-8 (10m/px):</strong> Monitoreo multitemporal (2017–2026) procesado en Google Earth Engine para cuantificar vigor de biomasa y dosel arbóreo en los 5 polígonos del proyecto.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300 shrink-0">
          <a
            href={OFFICIAL_GOOGLE_EARTH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded bg-[#E31C79] hover:bg-[#c21465] text-white font-sans font-bold text-xs flex items-center gap-1.5 shadow-md border border-pink-300/40 transition-all cursor-pointer"
            title="Abrir Proyecto Oficial en Google Earth Web 3D"
          >
            <Globe2 className="w-3.5 h-3.5 text-yellow-300" />
            <span>Abrir en Google Earth 3D</span>
            <ExternalLink className="w-3 h-3 text-white/80" />
          </a>
          <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-cyan-300 hidden md:inline">GEE 10m Píxel</span>
          <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-emerald-300 hidden md:inline">40,44 Ha Totales</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CATEGORY SELECTOR TABS (Compensación vs 1% vs Mosaico vs Matriz) */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#201747]/90 p-2 rounded-2xl border border-white/10">
        
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Tab: Compensación Biótica */}
          <button
            onClick={() => handleSelectCategory('compensacion')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold font-display flex items-center gap-2 transition-all ${
              activeCategory === 'compensacion'
                ? 'bg-gradient-to-r from-[#001871] to-[#1e3a8a] text-white shadow-lg border border-blue-400/40 ring-2 ring-blue-500/20 scale-[1.02]'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent'
            }`}
          >
            <Trees className="w-4 h-4 text-emerald-400" />
            <span>1. COMPENSACIÓN BIÓTICA (30,44 Ha)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              2 Lotes
            </span>
          </button>

          {/* Tab: Inversión 1% */}
          <button
            onClick={() => handleSelectCategory('inversion_1')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold font-display flex items-center gap-2 transition-all ${
              activeCategory === 'inversion_1'
                ? 'bg-gradient-to-r from-[#E31C79] to-[#be185d] text-white shadow-lg border border-pink-400/40 ring-2 ring-pink-500/20 scale-[1.02]'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>2. INVERSIÓN FORZOSA 1% (10,00 Ha)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30">
              3 Lotes
            </span>
          </button>

          {/* Tab: Mosaico 5 Lotes Simultáneos */}
          <button
            onClick={() => handleSelectCategory('mosaico_5_lotes')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold font-display flex items-center gap-2 transition-all ${
              activeCategory === 'mosaico_5_lotes'
                ? 'bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white shadow-lg border border-cyan-400/40 ring-2 ring-cyan-500/20 scale-[1.02]'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent'
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-300" />
            <span>3. Mosaico Cartográfico (5 Lotes)</span>
          </button>

          {/* Tab: Matriz Resumen Comparativa */}
          <button
            onClick={() => handleSelectCategory('comparativa')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold font-display flex items-center gap-2 transition-all ${
              activeCategory === 'comparativa'
                ? 'bg-white/20 text-white shadow-md border border-white/30'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent'
            }`}
          >
            <Table className="w-4 h-4 text-cyan-300" />
            <span>4. Matriz Tabular (5 Predios)</span>
          </button>

        </div>

        {/* Authority & Regulation Context Badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-300 pr-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>EXP: LAM5475 • Res. 445</span>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN TAB CONTENT */}
      {/* ========================================================================= */}
      {activeCategory === 'compensacion' || activeCategory === 'inversion_1' ? (
        <div className="flex flex-col gap-4">
          
          {/* Sub-selector for units within the selected category */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Seleccionar Polígono Satelital:
            </span>
            {(activeCategory === 'compensacion' ? compensacionUnits : inversionUnits).map((unit) => {
              const isSelected = unit.id === selectedUnitId;
              return (
                <button
                  key={unit.id}
                  onClick={() => handleSelectUnit(unit)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
                    isSelected
                      ? activeCategory === 'compensacion'
                        ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400/40 font-bold'
                        : 'bg-[#E31C79] text-white shadow-md ring-2 ring-pink-400/40 font-bold'
                      : 'bg-[#201747] text-slate-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span>{unit.unitName}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-slate-200">
                    {unit.areaHa.toFixed(2)} Ha
                  </span>
                </button>
              );
            })}
          </div>

          {/* Render Satellite Interactive Viewer (Original imagery & raster simulation intact) */}
          <NDVISatelliteViewer
            unit={currentUnit}
            selectedYear={selectedYear}
            onSelectYear={(yr) => setSelectedYear(yr)}
            showAllYearsGrid={showAllYearsGrid}
            onToggleGrid={() => setShowAllYearsGrid(!showAllYearsGrid)}
          />

          {/* Executive Results Breakdown for the Selected Category */}
          {activeCategory === 'compensacion' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Compensación Lote 1 & 2 Summary */}
              <div className="bg-[#1b143a] p-4 rounded-xl border border-emerald-500/30 flex flex-col justify-between gap-3 shadow-lg">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">18,52 Ha • Lotes 1 y 2 (La Holanda)</span>
                    <h4 className="text-sm font-bold text-white">Resultado: Consolidación Biótica y Cierre Parcial</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    Cierre Radicado
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  El monitoreo satelital en GEE (2017–2026) demuestra un incremento sostenido de dosel cerrado (&gt;0.65 NDVI) en fajas protectoras y drenajes, alcanzando el <strong>64% de vigor denso</strong>. Soporta formalmente la solicitud de cierre ante ANLA mediante <strong>Radicado 20256200936142</strong>.
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pt-2 border-t border-white/10 bg-black/20 p-2 rounded-lg">
                  <span>Establecimiento: <strong>Oct-2018</strong></span>
                  <span className="text-emerald-400 font-bold">Sobrevivencia: &gt;85% • NDVI: 0.68</span>
                </div>
              </div>

              {/* Compensación Lote 3 & 4 Summary */}
              <div className="bg-[#1b143a] p-4 rounded-xl border border-yellow-500/30 flex flex-col justify-between gap-3 shadow-lg">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-yellow-400 font-bold">10,82 Ha • Lotes 3 y 4 (La Holanda)</span>
                    <h4 className="text-sm font-bold text-white">Resultado: Recuperación Sucesional post-Acta ANLA 394</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-xs font-bold">
                    En Mantenimiento
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tras el estrés hídrico de 2025 (Acta ANLA 394), la serie 2026 refleja la recuperación progresiva del vigor sucesional (<strong>NDVI 0.56</strong>) gracias a labores de replateo extraordinario, fertilización y aislamiento sustentados en el <strong>Radicado 20266200858632</strong>.
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pt-2 border-t border-white/10 bg-black/20 p-2 rounded-lg">
                  <span>Siembra: <strong>Jun-2019</strong></span>
                  <span className="text-yellow-300 font-bold">Respuesta Técnica: Junio 2026</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Caño Pilón 4.0 Ha */}
              <div className="bg-[#1b143a] p-4 rounded-xl border border-emerald-500/40 flex flex-col justify-between gap-3 shadow-lg">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">4,0 Ha • Caño Pilón</span>
                    <h4 className="text-sm font-bold text-white">Resultado: 100% Éxito de Restauración</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    Listo para Cierre
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evolución óptima sin afectación por fuego. El estrato arbóreo denso domina el 52% del polígono con <strong>NDVI promedio de 0.72</strong> en 2026. Inversión liquidada: $101.266.484 COP.
                </p>
                <div className="text-[11px] font-mono text-emerald-400 pt-2 border-t border-white/10 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Solicitud de Cierre Definitivo
                </div>
              </div>

              {/* Río Planas 2.5 Ha (La Fortuna) */}
              <div className="bg-[#1b143a] p-4 rounded-xl border border-red-500/40 flex flex-col justify-between gap-3 shadow-lg">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-red-400 font-bold">2,5 Ha • Río Planas</span>
                    <h4 className="text-sm font-bold text-white">Resultado: Pérdida Total por Fuego</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-bold">
                    Siniestro 2023
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  GEE evidencia la calcinación total en 2023 (92% suelo desnudo / crítico &lt;0.25). En 2026 solo regeneraron pastos invasores (NDVI 0.36). Soporta sustitución por Cosecha de Agua.
                </p>
                <div className="text-[11px] font-mono text-red-400 pt-2 border-t border-white/10 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Inviable Resiembra Forestal
                </div>
              </div>

              {/* Río Melúa 3.5 Ha (Moriche Solo) */}
              <div className="bg-[#1b143a] p-4 rounded-xl border border-amber-500/40 flex flex-col justify-between gap-3 shadow-lg">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">3,5 Ha • Río Melúa</span>
                    <h4 className="text-sm font-bold text-white">Resultado: Afectación Recurrente Sabana</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                    Quema Occidental
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Afectado por incendio en 2023 en el flanco oeste. La serie 2025 muestra dominancia de gramíneas (56%) y estancamiento biótico. Justifica cambio de medida a PSA / Cosecha de Agua.
                </p>
                <div className="text-[11px] font-mono text-amber-300 pt-2 border-t border-white/10 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Alto Riesgo de Re-ignición
                </div>
              </div>

            </div>
          )}

        </div>
      ) : activeCategory === 'mosaico_5_lotes' ? (
        /* ========================================================================= */
        /* MOSAICO CARTOGRÁFICO DE LOS 5 LOTES SIMULTÁNEOS */
        /* ========================================================================= */
        <div className="flex flex-col gap-4 bg-[#1b143a] rounded-2xl p-5 border border-white/10 shadow-xl">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Mosaico Cartográfico Satelital de los 5 Polígonos (Compensación &amp; 1%)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Visualización espacial directa de cada lote evaluado con resolución 10m en Google Earth Engine (Estado 2026).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold">
                ✓ 33,34 Ha Éxito Biótico
              </span>
              <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-mono text-xs font-bold">
                ⚡ 6,00 Ha Siniestradas
              </span>
            </div>
          </div>

          {/* Grid of the 5 lots with their individual satellite raster maps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {NDVI_UNITS_DATA.map((unit) => {
              const latestPoint = unit.series[unit.series.length - 1];
              const isComp = unit.category === 'compensacion';

              return (
                <div
                  key={unit.id}
                  className={`bg-[#120b29] rounded-xl border p-4 flex flex-col justify-between gap-3 transition-all hover:border-white/30 ${
                    isComp ? 'border-blue-500/30' : 'border-pink-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-[10px] font-mono uppercase font-bold ${
                        isComp ? 'text-blue-400' : 'text-pink-400'
                      }`}>
                        {isComp ? 'Compensación Biótica' : 'Inversión Forzosa 1%'}
                      </span>
                      <h4 className="text-sm font-bold text-white font-display">
                        {unit.unitName}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {unit.geographicalContext} • <strong className="text-white">{unit.areaHa.toFixed(2)} Ha</strong>
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      latestPoint.meanNDVI >= 0.65
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : latestPoint.meanNDVI >= 0.45
                        ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                        : 'bg-red-500/20 text-red-300 border-red-500/40'
                    }`}>
                      {latestPoint.statusBadge}
                    </span>
                  </div>

                  {/* Satellite Raster / Real Uploaded Image Preview Box */}
                  <div className="relative w-full aspect-[4/3] bg-[#0c1527] rounded-lg overflow-hidden border border-slate-700/80 p-2 flex flex-col justify-between">
                    {uploadedImages[unit.id] ? (
                      <div className="absolute inset-0 z-0 bg-black flex items-center justify-center">
                        <img
                          src={uploadedImages[unit.id]}
                          alt={unit.unitName}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : null}

                    <div className="flex items-center justify-between text-[10px] font-mono z-10">
                      <span className="bg-[#001871]/80 px-2 py-0.5 rounded text-yellow-300 font-bold border border-white/10">
                        {uploadedImages[unit.id] ? '📸 Mapa Real' : '2026 • 10m/px'}
                      </span>
                      <span className="bg-black/60 px-2 py-0.5 rounded text-cyan-300 font-bold border border-white/10">
                        NDVI: {latestPoint.meanNDVI.toFixed(2)}
                      </span>
                    </div>

                    {/* SVG Map Shape (if no uploaded image) */}
                    {!uploadedImages[unit.id] && (
                      <div className="flex-1 flex items-center justify-center p-1">
                        <svg viewBox="0 0 160 120" className="w-full h-full max-h-[140px]" preserveAspectRatio="xMidYMid meet">
                          <rect x="5" y="5" width="150" height="110" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" rx="4" />
                          {/* Sample representative raster rendering */}
                          {Array.from({ length: 12 }).map((_, r) =>
                            Array.from({ length: 16 }).map((_, c) => {
                              const nx = c / 15;
                              const ny = r / 11;
                              let inside = false;
                              if (unit.satelliteShapeType === 'la_fortuna') {
                                inside = nx >= 0.15 && nx <= 0.85 && ny >= 0.25 && ny <= 0.75;
                              } else if (unit.satelliteShapeType === 'moriche_solo') {
                                inside = (nx >= 0.35 && nx <= 0.75 && ny >= 0.15 && ny <= 0.5) || (nx >= 0.15 && nx <= 0.55 && ny >= 0.45 && ny <= 0.85) || (nx >= 0.55 && nx <= 0.88 && ny >= 0.48 && ny <= 0.82);
                              } else if (unit.satelliteShapeType === 'cano_pilon') {
                                inside = nx >= 0.15 && nx <= 0.85 && Math.abs(ny - (0.3 + 0.4 * Math.sin(nx * Math.PI))) <= 0.32;
                              } else if (unit.satelliteShapeType === 'la_holanda_1_2') {
                                inside = nx >= 0.12 && nx <= 0.88 && ny >= 0.15 && ny <= 0.85 && !(nx >= 0.35 && nx <= 0.6 && ny >= 0.38 && ny <= 0.58);
                              } else {
                                inside = Math.hypot(nx - 0.38, ny - 0.5) <= 0.28 || Math.hypot(nx - 0.68, ny - 0.52) <= 0.24 || (nx >= 0.35 && nx <= 0.7 && ny >= 0.42 && ny <= 0.6);
                              }

                              if (!inside) return null;
                              const seed = Math.sin(c * 17.13 + r * 31.41 + 2026 * 7.7) * 10000;
                              const rand = seed - Math.floor(seed);
                              const bareT = latestPoint.bareSoilPct / 100;
                              const grassT = bareT + latestPoint.grasslandPct / 100;
                              const succT = grassT + latestPoint.succesionalPct / 100;
                              const color = rand < bareT ? '#DC2626' : rand < grassT ? '#EAB308' : rand < succT ? '#84CC16' : '#15803D';

                              return (
                                <rect
                                  key={`m-${r}-${c}`}
                                  x={c * 10}
                                  y={r * 10}
                                  width="9.4"
                                  height="9.4"
                                  rx="1"
                                  fill={color}
                                  stroke="rgba(0,0,0,0.25)"
                                  strokeWidth="0.4"
                                />
                              );
                            })
                          )}
                        </svg>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1 border-t border-slate-700/50 z-10 bg-black/40 px-1 rounded">
                      <span>Biomasa: <strong className="text-white">{latestPoint.biomassIndex}/100</strong></span>
                      <span>Dosel Denso: <strong className="text-emerald-400">{latestPoint.denseForestPct}%</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-[11px] text-slate-300 font-medium truncate max-w-[170px]">
                      {unit.id.includes('cano') || unit.id.includes('1-2') ? '✓ Cierre Radicado' : unit.id.includes('3-4') ? '▲ Mantenimiento' : '⚡ Sustitución Cosecha Agua'}
                    </span>
                    <button
                      onClick={() => {
                        setActiveCategory(unit.category as any);
                        setSelectedUnitId(unit.id);
                        setSelectedYear(2026);
                      }}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#001871] hover:bg-blue-800 text-white flex items-center gap-1 transition-all"
                    >
                      <span>Ver Serie</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* 4. CONSOLIDATED COMPARATIVE MATRIX (All 5 Units Side-by-Side) */
        /* ========================================================================= */
        <div className="flex flex-col gap-4 bg-[#1b143a] rounded-2xl p-5 border border-white/10 shadow-xl">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <Table className="w-4 h-4 text-cyan-400" />
                Matriz Consolidada de Monitoreo Satelital (GEE - Resolución 10m)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparativa de las 5 unidades territoriales entre Línea Base, Año de Mayor Siniestro/Estrés y Estado 2026.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-[#001871] text-cyan-200 border border-blue-400/30 font-mono text-xs font-bold">
              Total Evaluado: 40,44 Hectáreas
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs border-collapse font-sans bg-slate-900/60">
              <thead>
                <tr className="bg-[#001871] text-white text-center font-bold text-xs uppercase tracking-wide">
                  <th className="py-3 px-3 border border-white/10 w-[16%]">Obligación / Predio</th>
                  <th className="py-3 px-2 border border-white/10 w-[8%]">Área (Ha)</th>
                  <th className="py-3 px-3 border border-white/10 w-[14%]">Línea Base (NDVI)</th>
                  <th className="py-3 px-3 border border-white/10 w-[16%]">Año Crítico / Siniestro</th>
                  <th className="py-3 px-3 border border-white/10 w-[16%]">Estado 2026 (NDVI)</th>
                  <th className="py-3 px-3 border border-white/10 w-[16%]">Diagnóstico Biofísico GEE</th>
                  <th className="py-3 px-3 border border-white/10 w-[14%]">Estrategia ANLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-200">
                
                {/* 1. Holanda 1 y 2 */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 border border-white/10">
                    <strong className="text-white block">Compensación Lotes 1 y 2</strong>
                    <span className="text-[11px] text-slate-400">Finca La Holanda (Melúa)</span>
                  </td>
                  <td className="py-3 px-2 border border-white/10 text-center font-mono font-bold text-white">
                    18,52
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs">
                    <span className="text-yellow-300">2017: 0.38</span><br />
                    <span className="text-[10px] text-slate-400">Pastos 62%</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs">
                    <span className="text-slate-300">2019: 0.36</span><br />
                    <span className="text-[10px] text-slate-400">Siembra Oct-18</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs bg-emerald-950/20">
                    <strong className="text-emerald-400">2026: 0.68</strong><br />
                    <span className="text-[10px] text-emerald-300 font-bold">Bosque 48% / Suc 28%</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-xs">
                    <span className="text-emerald-300 font-semibold">Consolidación exitosa.</span> Cobertura leñosa densa en fajas protectoras.
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-xs text-center bg-emerald-900/30">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold text-[10px]">
                      Cierre Parcial Radicado
                    </span>
                  </td>
                </tr>

                {/* 2. Holanda 3 y 4 */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 border border-white/10">
                    <strong className="text-white block">Compensación Lotes 3 y 4</strong>
                    <span className="text-[11px] text-slate-400">Finca La Holanda (Melúa)</span>
                  </td>
                  <td className="py-3 px-2 border border-white/10 text-center font-mono font-bold text-white">
                    10,82
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs">
                    <span className="text-yellow-300">2017: 0.42</span><br />
                    <span className="text-[10px] text-slate-400">Pastos 58%</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs bg-yellow-950/20">
                    <span className="text-yellow-400 font-bold">2025: 0.44</span><br />
                    <span className="text-[10px] text-yellow-300">Acta ANLA 394</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs bg-emerald-950/20">
                    <strong className="text-emerald-400">2026: 0.56</strong><br />
                    <span className="text-[10px] text-emerald-300">Recuperación biótica</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-xs">
                    <span className="text-yellow-300 font-semibold">Respuesta efectiva.</span> Labores de replateo y fertilización sustentadas ante ANLA.
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-xs text-center bg-yellow-900/30">
                    <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 font-bold text-[10px]">
                      Mantenimiento Extra
                    </span>
                  </td>
                </tr>

                {/* 3. Caño Pilón 4.0 Ha */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 border border-white/10">
                    <strong className="text-white block">Inversión 1% Caño Pilón</strong>
                    <span className="text-[11px] text-slate-400">Finca La Holanda (4,0 Ha)</span>
                  </td>
                  <td className="py-3 px-2 border border-white/10 text-center font-mono font-bold text-white">
                    4,00
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs">
                    <span className="text-red-400">2019: 0.31</span><br />
                    <span className="text-[10px] text-slate-400">Suelo 38%</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs">
                    <span className="text-lime-300">2023: 0.59</span><br />
                    <span className="text-[10px] text-slate-400">Sin afectación fuego</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs bg-emerald-950/30">
                    <strong className="text-emerald-300 font-bold text-sm">2026: 0.72</strong><br />
                    <span className="text-[10px] text-emerald-200 font-bold">Bosque Denso 52%</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-xs">
                    <span className="text-emerald-300 font-semibold">Excelente dinamismo.</span> Dosel cerrado protector continuo sobre ronda hídrica.
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-xs text-center bg-emerald-900/30">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold text-[10px]">
                      Solicitar Cierre 100%
                    </span>
                  </td>
                </tr>

                {/* 4. Río Planas 2.5 Ha (La Fortuna) */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 border border-white/10">
                    <strong className="text-white block">Inversión 1% Río Planas</strong>
                    <span className="text-[11px] text-slate-400">Finca La Fortuna (2,5 Ha)</span>
                  </td>
                  <td className="py-3 px-2 border border-white/10 text-center font-mono font-bold text-white">
                    2,50
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs">
                    <span className="text-lime-300">2021: 0.54</span><br />
                    <span className="text-[10px] text-slate-400">Sucesional 56%</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs bg-red-950/40">
                    <strong className="text-red-400 font-bold">2023: 0.16</strong><br />
                    <span className="text-[10px] text-red-300 font-bold">Quema Catastrófica 92%</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs bg-red-950/20">
                    <strong className="text-yellow-400">2026: 0.36</strong><br />
                    <span className="text-[10px] text-slate-400">Solo pastos invasores</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-xs">
                    <span className="text-red-400 font-semibold">Pérdida estructural total.</span> La dinámica arbórea colapsó; persistencia de riesgo de fuego.
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-xs text-center bg-red-900/30">
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-400/30 font-bold text-[10px]">
                      Cambio a Cosecha Agua
                    </span>
                  </td>
                </tr>

                {/* 5. Río Melúa 3.5 Ha (Moriche Solo) */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 border border-white/10">
                    <strong className="text-white block">Inversión 1% Río Melúa</strong>
                    <span className="text-[11px] text-slate-400">Predio Moriche Solo (3,5 Ha)</span>
                  </td>
                  <td className="py-3 px-2 border border-white/10 text-center font-mono font-bold text-white">
                    3,50
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs">
                    <span className="text-yellow-300">2021: 0.46</span><br />
                    <span className="text-[10px] text-slate-400">Siembra inicial</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs bg-amber-950/30">
                    <span className="text-amber-400 font-bold">2023: 0.32</span><br />
                    <span className="text-[10px] text-amber-300">Quema Occidental</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-center font-mono text-xs bg-amber-950/20">
                    <strong className="text-yellow-400">2025: 0.35</strong><br />
                    <span className="text-[10px] text-slate-400">Pastos 56% / Estancado</span>
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-xs">
                    <span className="text-amber-300 font-semibold">Inviabilidad sucesional.</span> Sabana inflamable impide consolidación de estrato arbóreo.
                  </td>
                  <td className="py-3 px-3 border border-white/10 text-xs text-center bg-amber-900/30">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-400/30 font-bold text-[10px]">
                      Reformulación / PSA
                    </span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Strategic Takeaway for Executive Board */}
          <div className="bg-[#120b29] p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-300">
                <strong className="text-white block">Conclusión Técnica Irrefutable:</strong>
                Las imágenes GEE demuestran que las obligaciones forestales en zonas hídricas (Compensación La Holanda 29,34 Ha y 1% Caño Pilón 4,0 Ha) alcanzaron éxito biótico pleno (&gt;0.65 NDVI). Por el contrario, en sabanas abiertas (6,0 Ha siniestradas) la resiembra forestal es inviable y debe sustituirse por Cosecha de Agua.
              </div>
            </div>

            {onNavigateToSlide && (
              <button
                onClick={() => onNavigateToSlide(hiddenSlides.includes(4) ? 5 : 4)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#E31C79] hover:bg-[#c21465] text-white shrink-0 shadow transition-all"
              >
                <span>{hiddenSlides.includes(4) ? 'Ver Actividades (D5)' : 'Ver Cronograma ANLA (D4)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. FOOTER QUICK JUMP BAR */}
      {/* ========================================================================= */}
      <div className="mt-2 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Satellite className="w-4 h-4 text-cyan-400" />
          <span>Fuente: Satélites Sentinel-2 MSI / Landsat-8 vía Google Earth Engine • Análisis Multitemporal CPO-12</span>
        </div>

        {onNavigateToSlide && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateToSlide(5)}
              className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
            >
              ← D5: Línea de Tiempo de Actividades
            </button>
            <button
              onClick={() => onNavigateToSlide(7)}
              className="px-3 py-1 rounded bg-[#001871] hover:bg-blue-800 text-white font-bold transition-colors flex items-center gap-1"
            >
              <span>D7: Inventario Forestal</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
