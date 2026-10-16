import React, { useState } from 'react';
import { 
  PREDIOS_TIMELINE_ROWS, 
  PREDIOS_TIMELINE_YEARS 
} from '../data/presentationData';
import { PredioTimelineRow, PredioTimelineNode } from '../types';
import { 
  Trees, 
  Flame, 
  FileText, 
  CheckCircle2, 
  Hourglass, 
  Droplet, 
  Wrench, 
  Sprout, 
  Flag, 
  Info, 
  ChevronRight, 
  X,
  Layers,
  MapPin,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Slide6Props {
  onNavigateToSlide?: (slideNumber: number) => void;
  hiddenSlides?: number[];
}

export const Slide6LineaTiempoActividades: React.FC<Slide6Props> = ({ 
  onNavigateToSlide,
  hiddenSlides = [4, 10]
}) => {
  const [selectedNode, setSelectedNode] = useState<{
    row: PredioTimelineRow;
    node: PredioTimelineNode;
  } | null>(null);

  const [filterCategory, setFilterCategory] = useState<'all' | 'compensacion' | 'inversion_1' | 'contractual'>('all');
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Function to render modern sleek icons
  const renderModernIcon = (iconName: string, className: string = 'w-3.5 h-3.5') => {
    switch (iconName) {
      case 'hourglass':
        return <Hourglass className={className} />;
      case 'drop':
        return <Droplet className={className} />;
      case 'check':
        return <CheckCircle2 className={className} />;
      case 'wrench':
        return <Wrench className={className} />;
      case 'sprout':
        return <Sprout className={className} />;
      case 'file':
        return <FileText className={className} />;
      case 'flag':
        return <Flag className={className} />;
      default:
        return <Info className={className} />;
    }
  };

  // Helper to calculate exact horizontal percentage for a given year
  // Since we have 10 columns (2017 to 2026), column i (0 to 9) centers at (i * 10% + 5%)
  const getYearCenterPercent = (year: number) => {
    const idx = year - 2017;
    return idx * 10 + 5; // e.g. 2017 = 5%, 2018 = 15%, 2026 = 95%
  };

  return (
    <div className="w-full h-full min-h-[640px] p-3 sm:p-5 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl flex flex-col justify-between space-y-3">
      
      {/* Top Header matching original presentation style */}
      <div>
        <div className="text-center pb-2 border-b border-slate-200 relative">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#001871] text-white shadow-xs">
                <Calendar className="w-3 h-3 text-amber-300" />
                Diapositiva 3 de 9
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-300 font-semibold flex items-center gap-1">
                <Layers className="w-3 h-3 text-slate-500" />
                Cronograma de Ejecución por Predios
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px]">
              <button
                type="button"
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  filterCategory === 'all' 
                    ? 'bg-[#001871] text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Todas las Obligaciones
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('compensacion')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  filterCategory === 'compensacion' 
                    ? 'bg-[#5c1d47] text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Compensación (30.44 ha)
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('inversion_1')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  filterCategory === 'inversion_1' 
                    ? 'bg-[#831843] text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Inversión 1% (10 ha)
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('contractual')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  filterCategory === 'contractual' 
                    ? 'bg-[#1b4d2e] text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Ejecución Contractual
              </button>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#001871] tracking-tight font-display uppercase">
            LÍNEA DE TIEMPO EJECUCIÓN ACTIVIDADES
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
            Trazabilidad Multianual por Predios y Cuencas: Establecimiento, Mantenimientos y Cierre ante la ANLA (2017 – 2026)
          </p>
        </div>

        {/* Matrix Grid Container */}
        <div className="mt-2.5 border border-slate-300 rounded-xl overflow-hidden shadow-md bg-white">
          
          {/* Timeline Years Header (Dark bar with exact 10 columns) */}
          <div className="grid grid-cols-12 bg-[#1e1b29] text-white text-xs font-bold font-mono py-2.5 px-2 items-center border-b border-slate-700">
            <div className="col-span-3 text-left pl-3 text-slate-300 uppercase tracking-wider text-[11px] font-sans font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Predio / Cuenca / Instrumento</span>
            </div>
            
            {/* 10 Year Header Columns (Exactly 10% each) */}
            <div className="col-span-9 grid grid-cols-10 text-center">
              {PREDIOS_TIMELINE_YEARS.map((year) => {
                const isHovered = hoveredYear === year;
                const isFinalYear = year === 2026;
                const isAuditYear = year === 2025;

                return (
                  <div 
                    key={year}
                    onMouseEnter={() => setHoveredYear(year)}
                    onMouseLeave={() => setHoveredYear(null)}
                    className={`py-1 text-xs font-extrabold tracking-wider transition-all rounded-md flex flex-col items-center justify-center ${
                      isFinalYear 
                        ? 'text-amber-300 bg-amber-400/10 border border-amber-400/30' 
                        : isAuditYear
                        ? 'text-rose-200 bg-rose-400/10'
                        : isHovered
                        ? 'text-white bg-white/10'
                        : 'text-slate-200'
                    }`}
                  >
                    <span>{year}</span>
                    {isFinalYear && (
                      <span className="text-[8px] font-sans text-amber-400 uppercase font-bold tracking-tighter">
                        Actual
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 1: COMPENSACIÓN BIÓTICA (30.44 ha totales) */}
          {(filterCategory === 'all' || filterCategory === 'compensacion') && (
            <div>
              {/* Category Subheader */}
              <div className="bg-[#2d0b25] text-white font-extrabold text-xs tracking-wider uppercase px-4 py-1.5 flex items-center justify-between border-b border-rose-950/40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                  <Trees className="w-4 h-4 text-rose-300" />
                  <span>COMPENSACIÓN BIÓTICA (30.44 ha totales)</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-normal text-rose-200">
                  <span className="hidden sm:inline">Finca La Holanda (Lotes 1, 2, 3 y 4)</span>
                  <span className="bg-white/15 px-2 py-0.5 rounded font-mono font-semibold text-white border border-white/20">
                    Res. 445 de 2012 / LAM5475
                  </span>
                </div>
              </div>

              {/* Row 1: Finca La Holanda (Lotes 1 y 2 - 18.52 ha) */}
              <div className="grid grid-cols-12 border-b border-slate-200 hover:bg-slate-50/90 transition-colors">
                {/* Left Label Box */}
                <div className="col-span-3 bg-[#38102e] text-white p-3 flex flex-col justify-center border-r border-slate-300">
                  <div className="font-bold text-xs leading-snug">
                    1 | Finca La Holanda
                  </div>
                  <div className="text-[11px] text-rose-200 font-medium">
                    (Lotes 1 y 2 - 18.52 ha)
                  </div>
                  {onNavigateToSlide && !hiddenSlides.includes(4) && (
                    <button
                      type="button"
                      onClick={() => onNavigateToSlide(4)}
                      className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-amber-300 hover:text-white font-semibold group"
                    >
                      <span>Ver diagnóstico forestal (D4)</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>

                {/* Timeline Grid (10 perfectly aligned columns: 2017 to 2026) */}
                <div className="col-span-9 relative h-20 flex items-center bg-white overflow-hidden">
                  {/* Background vertical guideline columns */}
                  <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
                    {PREDIOS_TIMELINE_YEARS.map((y, idx) => (
                      <div 
                        key={y} 
                        className={`h-full border-r border-slate-100 flex items-center justify-center ${
                          hoveredYear === y ? 'bg-amber-50/60' : idx % 2 === 0 ? 'bg-slate-50/30' : ''
                        }`}
                      />
                    ))}
                  </div>

                  {/* Continuous Solid Line 2018 (15%) to 2022 (55%) */}
                  <div 
                    className="absolute h-1.5 bg-[#6b2156] rounded-full shadow-xs top-1/2 -translate-y-1/2 z-0"
                    style={{
                      left: '15%',
                      width: '40%',
                    }}
                  />

                  {/* Continuous Solid Line 2025 (85%) to 2026 (95%) */}
                  <div 
                    className="absolute h-1.5 bg-[#9f1239] rounded-full shadow-xs top-1/2 -translate-y-1/2 z-0"
                    style={{
                      left: '85%',
                      width: '10%',
                    }}
                  />

                  {/* 10 Column Interactive Node Slots */}
                  <div className="absolute inset-0 grid grid-cols-10 z-10">
                    {/* 2017 (Col 1): Empty */}
                    <div className="flex items-center justify-center" />

                    {/* 2018 (Col 2): Establecimiento Oct */}
                    <div className="flex flex-col items-center justify-center relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[0], node: PREDIOS_TIMELINE_ROWS[0].nodes[0] })}
                        className="w-7 h-7 rounded-full bg-[#521741] text-white border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#521741] transition-all cursor-pointer"
                        title="Establecimiento Octubre 2018"
                      >
                        <Hourglass className="w-3.5 h-3.5 text-amber-200" />
                      </button>
                      <span className="absolute top-13 text-[9.5px] font-bold text-slate-800 leading-none text-center whitespace-nowrap bg-white/95 px-1 py-0.5 rounded shadow-xs border border-slate-200 pointer-events-none">
                        Establecimiento<br /><span className="font-normal text-[8.5px] text-slate-500">Oct</span>
                      </span>
                    </div>

                    {/* 2019 (Col 3): Mantenimiento */}
                    <div className="flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[0], node: PREDIOS_TIMELINE_ROWS[0].nodes[1] })}
                        className="w-6 h-6 rounded-full bg-[#521741] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#521741] transition-all cursor-pointer"
                        title="Mantenimiento 2019"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                    </div>

                    {/* 2020 (Col 4): Mantenimiento + Text label */}
                    <div className="flex flex-col items-center justify-center relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[0], node: PREDIOS_TIMELINE_ROWS[0].nodes[2] })}
                        className="w-6 h-6 rounded-full bg-[#521741] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#521741] transition-all cursor-pointer"
                        title="Mantenimiento 2020"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                      <span className="absolute top-13 text-[9.5px] font-bold text-slate-800 leading-none whitespace-nowrap bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-slate-200 pointer-events-none">
                        Mantenimientos
                      </span>
                    </div>

                    {/* 2021 (Col 5): Mantenimiento */}
                    <div className="flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[0], node: PREDIOS_TIMELINE_ROWS[0].nodes[3] })}
                        className="w-6 h-6 rounded-full bg-[#521741] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#521741] transition-all cursor-pointer"
                        title="Mantenimiento 2021"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                    </div>

                    {/* 2022 (Col 6): Mantenimiento */}
                    <div className="flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[0], node: PREDIOS_TIMELINE_ROWS[0].nodes[4] })}
                        className="w-6 h-6 rounded-full bg-[#521741] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#521741] transition-all cursor-pointer"
                        title="Mantenimiento 2022"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                    </div>

                    {/* 2023 (Col 7): Empty */}
                    <div className="flex items-center justify-center" />

                    {/* 2024 (Col 8): Empty */}
                    <div className="flex items-center justify-center" />

                    {/* 2025 (Col 9): Check Cierre */}
                    <div className="flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[0], node: PREDIOS_TIMELINE_ROWS[0].nodes[5] })}
                        className="w-6 h-6 rounded-full bg-[#9f1239] text-white border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#9f1239] transition-all cursor-pointer"
                        title="Solicitud Cierre Rad. 20256200936142"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>

                    {/* 2026 (Col 10): Check Cierre + Label */}
                    <div className="flex flex-col items-center justify-center relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[0], node: PREDIOS_TIMELINE_ROWS[0].nodes[6] })}
                        className="w-7 h-7 rounded-full bg-[#9f1239] text-white border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#9f1239] transition-all cursor-pointer"
                        title="Gestión de Cierre Parcial ANLA"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </button>
                      <span className="absolute top-13 text-[9px] font-extrabold text-[#9f1239] leading-tight text-center whitespace-nowrap bg-rose-50/95 px-1.5 py-0.5 rounded shadow-xs border border-rose-200 pointer-events-none">
                        Gestión de Cierre<br />Parcial con ANLA
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Finca La Holanda (Lotes 3 y 4 - 10.82 ha) */}
              <div className="grid grid-cols-12 border-b border-slate-300 hover:bg-slate-50/90 transition-colors">
                {/* Left Label Box */}
                <div className="col-span-3 bg-[#38102e] text-white p-3 flex flex-col justify-center border-r border-slate-300">
                  <div className="font-bold text-xs leading-snug">
                    2 | Finca La Holanda
                  </div>
                  <div className="text-[11px] text-rose-200 font-medium">
                    (Lotes 3 y 4 - 10.82 ha)
                  </div>
                  {onNavigateToSlide && !hiddenSlides.includes(4) && (
                    <button
                      type="button"
                      onClick={() => onNavigateToSlide(4)}
                      className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-amber-300 hover:text-white font-semibold group"
                    >
                      <span>Ver respuesta Acta 394 (D4)</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>

                {/* Timeline Grid (10 columns: 2017 to 2026) */}
                <div className="col-span-9 relative h-20 flex items-center bg-white overflow-hidden">
                  {/* Background vertical guideline columns */}
                  <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
                    {PREDIOS_TIMELINE_YEARS.map((y, idx) => (
                      <div 
                        key={y} 
                        className={`h-full border-r border-slate-100 flex items-center justify-center ${
                          hoveredYear === y ? 'bg-amber-50/60' : idx % 2 === 0 ? 'bg-slate-50/30' : ''
                        }`}
                      />
                    ))}
                  </div>

                  {/* Continuous Solid Line 2019 (25%) to 2023 (65%) */}
                  <div 
                    className="absolute h-1.5 bg-[#b91c1c] rounded-full shadow-xs top-1/2 -translate-y-1/2 z-0"
                    style={{
                      left: '25%',
                      width: '40%',
                    }}
                  />

                  {/* Continuous Solid Line 2025 (85%) to 2026 (95%) */}
                  <div 
                    className="absolute h-1.5 bg-[#7f1d1d] rounded-full shadow-xs top-1/2 -translate-y-1/2 z-0"
                    style={{
                      left: '85%',
                      width: '10%',
                    }}
                  />

                  {/* 10 Column Interactive Node Slots */}
                  <div className="absolute inset-0 grid grid-cols-10 z-10">
                    {/* 2017 (Col 1): Empty */}
                    <div className="flex items-center justify-center" />

                    {/* 2018 (Col 2): Empty */}
                    <div className="flex items-center justify-center" />

                    {/* 2019 (Col 3): Establecimiento Jun */}
                    <div className="flex flex-col items-center justify-center relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[1], node: PREDIOS_TIMELINE_ROWS[1].nodes[0] })}
                        className="w-7 h-7 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Establecimiento Junio 2019"
                      >
                        <Sprout className="w-3.5 h-3.5 text-emerald-200" />
                      </button>
                      <span className="absolute top-13 text-[9.5px] font-bold text-slate-800 leading-none text-center whitespace-nowrap bg-white/95 px-1 py-0.5 rounded shadow-xs border border-slate-200 pointer-events-none">
                        Establecimiento<br /><span className="font-normal text-[8.5px] text-slate-500">Jun</span>
                      </span>
                    </div>

                    {/* 2020 (Col 4): Mantenimiento */}
                    <div className="flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[1], node: PREDIOS_TIMELINE_ROWS[1].nodes[1] })}
                        className="w-6 h-6 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Mantenimiento 2020"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                    </div>

                    {/* 2021 (Col 5): Mantenimiento + Text label */}
                    <div className="flex flex-col items-center justify-center relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[1], node: PREDIOS_TIMELINE_ROWS[1].nodes[2] })}
                        className="w-6 h-6 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Mantenimiento 2021"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                      <span className="absolute top-13 text-[9.5px] font-bold text-slate-800 leading-none whitespace-nowrap bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-slate-200 pointer-events-none">
                        Mantenimientos regulares
                      </span>
                    </div>

                    {/* 2022 (Col 6): Mantenimiento */}
                    <div className="flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[1], node: PREDIOS_TIMELINE_ROWS[1].nodes[3] })}
                        className="w-6 h-6 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Mantenimiento 2022"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                    </div>

                    {/* 2023 (Col 7): Mantenimiento */}
                    <div className="flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[1], node: PREDIOS_TIMELINE_ROWS[1].nodes[4] })}
                        className="w-6 h-6 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Mantenimiento 2023"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                    </div>

                    {/* 2024 (Col 8): Empty */}
                    <div className="flex items-center justify-center" />

                    {/* 2025 (Col 9): Wrench Replateo */}
                    <div className="flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[1], node: PREDIOS_TIMELINE_ROWS[1].nodes[5] })}
                        className="w-6 h-6 rounded-full bg-[#7f1d1d] text-white border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#7f1d1d] transition-all cursor-pointer"
                        title="Replateo Acta 394"
                      >
                        <Wrench className="w-3 h-3 text-amber-300" />
                      </button>
                    </div>

                    {/* 2026 (Col 10): Wrench + Label */}
                    <div className="flex flex-col items-center justify-center relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[1], node: PREDIOS_TIMELINE_ROWS[1].nodes[6] })}
                        className="w-7 h-7 rounded-full bg-[#7f1d1d] text-white border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#7f1d1d] transition-all cursor-pointer"
                        title="Respuesta ANLA Rad. 20266200858632"
                      >
                        <Wrench className="w-3.5 h-3.5 text-amber-300" />
                      </button>
                      <span className="absolute top-13 text-[9px] font-extrabold text-[#7f1d1d] leading-tight text-center whitespace-nowrap bg-rose-50/95 px-1.5 py-0.5 rounded shadow-xs border border-rose-200 pointer-events-none">
                        Mantenimiento extra y<br />Replateo Actas ANLA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: INVERSIÓN FORZOSA DEL 1% (10 ha totales) */}
          {(filterCategory === 'all' || filterCategory === 'inversion_1') && (
            <div>
              {/* Category Subheader */}
              <div className="bg-[#2d0b25] text-white font-extrabold text-xs tracking-wider uppercase px-4 py-1.5 flex items-center justify-between border-b border-rose-950/40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <Flame className="w-4 h-4 text-amber-300" />
                  <span>INVERSIÓN FORZOSA DEL 1% (10 ha totales)</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-normal text-rose-200">
                  <span className="hidden sm:inline">Caño Pilón (4 ha), Río Planas (2.5 ha) y Río Melúa (3.5 ha)</span>
                  <span className="bg-white/15 px-2 py-0.5 rounded font-mono font-semibold text-white border border-white/20">
                    Art. 321 Ley 1955 de 2019
                  </span>
                </div>
              </div>

              {/* Row 3: Cuenca Caño Pilón | Finca La Holanda (4 ha) */}
              <div className="grid grid-cols-12 border-b border-slate-200 hover:bg-slate-50/90 transition-colors">
                {/* Left Label Box */}
                <div className="col-span-3 bg-[#38102e] text-white p-3 flex flex-col justify-center border-r border-slate-300">
                  <div className="font-bold text-xs leading-snug">
                    3 | Cuenca Caño Pilón
                  </div>
                  <div className="text-[11px] text-rose-200 font-medium">
                    Finca La Holanda (4 ha)
                  </div>
                  {onNavigateToSlide && (
                    <button
                      type="button"
                      onClick={() => onNavigateToSlide(4)}
                      className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-amber-300 hover:text-white font-semibold group"
                    >
                      <span>Ver balance financiero 1% (D4)</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>

                {/* Timeline Grid (10 columns: 2017 to 2026) */}
                <div className="col-span-9 relative h-20 flex items-center bg-white overflow-hidden">
                  {/* Background vertical guideline columns */}
                  <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
                    {PREDIOS_TIMELINE_YEARS.map((y, idx) => (
                      <div 
                        key={y} 
                        className={`h-full border-r border-slate-100 flex items-center justify-center ${
                          hoveredYear === y ? 'bg-amber-50/60' : idx % 2 === 0 ? 'bg-slate-50/30' : ''
                        }`}
                      />
                    ))}
                  </div>

                  {/* 2019 Single Year Establishment Bar */}
                  <div 
                    className="absolute h-1.5 bg-[#991b1b] rounded-full shadow-xs top-1/2 -translate-y-1/2 z-0"
                    style={{
                      left: '23%',
                      width: '4%',
                    }}
                  />

                  {/* Continuous Solid Line 2021 (45%) to 2023 (65%) */}
                  <div 
                    className="absolute h-1.5 bg-[#991b1b] rounded-full shadow-xs top-1/2 -translate-y-1/2 z-0"
                    style={{
                      left: '45%',
                      width: '20%',
                    }}
                  />

                  {/* 10 Column Interactive Node Slots */}
                  <div className="absolute inset-0 grid grid-cols-10 z-10">
                    {/* 2017 (Col 1): Empty */}
                    <div className="flex items-center justify-center" />

                    {/* 2018 (Col 2): Empty */}
                    <div className="flex items-center justify-center" />

                    {/* 2019 (Col 3): Aislamiento y Siembra */}
                    <div className="flex flex-col items-center justify-center relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[2], node: PREDIOS_TIMELINE_ROWS[2].nodes[0] })}
                        className="flex items-center gap-0.5 p-1 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-md group-hover:scale-115 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Aislamiento y Siembra 2019"
                      >
                        <Sprout className="w-3 h-3 text-emerald-200" />
                        <Sprout className="w-3 h-3 text-emerald-200" />
                      </button>
                      <span className="absolute top-13 text-[9.5px] font-bold text-slate-800 leading-none text-center whitespace-nowrap bg-white/95 px-1 py-0.5 rounded shadow-xs border border-slate-200 pointer-events-none">
                        Aislamiento y<br /><span className="font-normal text-[8.5px] text-slate-500">Siembra</span>
                      </span>
                    </div>

                    {/* 2020 (Col 4): Empty */}
                    <div className="flex items-center justify-center" />

                    {/* 2021 (Col 5): Droplet */}
                    <div className="flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[2], node: PREDIOS_TIMELINE_ROWS[2].nodes[1] })}
                        className="w-6 h-6 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Mantenimiento 2021"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                    </div>

                    {/* 2022 (Col 6): Droplet + Label */}
                    <div className="flex flex-col items-center justify-center relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[2], node: PREDIOS_TIMELINE_ROWS[2].nodes[2] })}
                        className="w-6 h-6 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Mantenimiento 2022"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                      <span className="absolute top-13 text-[9.5px] font-bold text-slate-800 leading-none whitespace-nowrap bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-slate-200 pointer-events-none">
                        Mantenimientos 3 años
                      </span>
                    </div>

                    {/* 2023 (Col 7): Droplet */}
                    <div className="flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[2], node: PREDIOS_TIMELINE_ROWS[2].nodes[3] })}
                        className="w-6 h-6 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Mantenimiento 2023"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                    </div>

                    {/* 2024 (Col 8): Empty */}
                    <div className="flex items-center justify-center" />

                    {/* 2025 (Col 9): Empty */}
                    <div className="flex items-center justify-center" />

                    {/* 2026 (Col 10): Check Cierre ANLA */}
                    <div className="flex flex-col items-center justify-center relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[2], node: PREDIOS_TIMELINE_ROWS[2].nodes[4] })}
                        className="w-7 h-7 rounded-full bg-[#9f1239] text-white border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#9f1239] transition-all cursor-pointer"
                        title="Gestión de Cierre Parcial ANLA"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </button>
                      <span className="absolute top-13 text-[9px] font-extrabold text-[#9f1239] leading-tight text-center whitespace-nowrap bg-rose-50/95 px-1.5 py-0.5 rounded shadow-xs border border-rose-200 pointer-events-none">
                        Gestión de Cierre<br />Parcial con ANLA
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rows 4 & 5: Río Planas (La Fortuna - 2.5 ha) y Río Melúa (Moriche Solo - 3.5 ha) */}
              <div className="grid grid-cols-12 border-b border-slate-300 hover:bg-slate-50/90 transition-colors">
                {/* Left Label Box */}
                <div className="col-span-3 bg-[#38102e] text-white p-3 flex flex-col justify-center border-r border-slate-300 divide-y divide-white/15">
                  <div className="pb-1.5">
                    <div className="font-bold text-xs leading-snug">
                      4 | Cuenca Río Planas
                    </div>
                    <div className="text-[11px] text-rose-200 font-medium">
                      Finca La Fortuna (2.5 ha)
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <div className="font-bold text-xs leading-snug">
                      5 | Cuenca Río Melúa
                    </div>
                    <div className="text-[11px] text-rose-200 font-medium">
                      Predio Moriche Solo (3.5 ha)
                    </div>
                  </div>
                  {onNavigateToSlide && (
                    <button
                      type="button"
                      onClick={() => onNavigateToSlide(4)}
                      className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-amber-300 hover:text-white font-semibold group"
                    >
                      <span>Ver siniestro por quema (6 ha)</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>

                {/* Timeline Grid (10 columns: 2017 to 2026) */}
                <div className="col-span-9 relative h-20 flex items-center bg-white overflow-hidden">
                  {/* Background vertical guideline columns */}
                  <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
                    {PREDIOS_TIMELINE_YEARS.map((y, idx) => (
                      <div 
                        key={y} 
                        className={`h-full border-r border-slate-100 flex items-center justify-center ${
                          hoveredYear === y ? 'bg-amber-50/60' : idx % 2 === 0 ? 'bg-slate-50/30' : ''
                        }`}
                      />
                    ))}
                  </div>

                  {/* Continuous Solid Line 2021 (45%) to 2024 (75%) */}
                  <div 
                    className="absolute h-1.5 bg-[#991b1b] rounded-full shadow-xs top-1/2 -translate-y-1/2 z-0"
                    style={{
                      left: '45%',
                      width: '30%',
                    }}
                  />

                  {/* 10 Column Interactive Node Slots */}
                  <div className="absolute inset-0 grid grid-cols-10 z-10">
                    {/* 2017 to 2020: Empty */}
                    <div className="flex items-center justify-center" />
                    <div className="flex items-center justify-center" />
                    <div className="flex items-center justify-center" />
                    <div className="flex items-center justify-center" />

                    {/* 2021 (Col 5): Siembra Inicial */}
                    <div className="flex flex-col items-center justify-center relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[3], node: PREDIOS_TIMELINE_ROWS[3].nodes[0] })}
                        className="w-7 h-7 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Siembra inicial 2021"
                      >
                        <Sprout className="w-3.5 h-3.5 text-emerald-200" />
                      </button>
                      <span className="absolute top-13 text-[9.5px] font-bold text-slate-800 leading-none text-center whitespace-nowrap bg-white/95 px-1 py-0.5 rounded shadow-xs border border-slate-200 pointer-events-none">
                        Siembra<br /><span className="font-normal text-[8.5px] text-slate-500">inicial</span>
                      </span>
                    </div>

                    {/* 2022 (Col 6): Droplet */}
                    <div className="flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[3], node: PREDIOS_TIMELINE_ROWS[3].nodes[1] })}
                        className="w-6 h-6 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Mantenimiento 2022"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                    </div>

                    {/* 2023 (Col 7): Droplet + Label */}
                    <div className="flex flex-col items-center justify-center relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[3], node: PREDIOS_TIMELINE_ROWS[3].nodes[2] })}
                        className="w-6 h-6 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Mantenimiento 2023"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                      <span className="absolute top-13 text-[9.5px] font-bold text-slate-800 leading-none whitespace-nowrap bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-slate-200 pointer-events-none">
                        Mantenimientos 3 años
                      </span>
                    </div>

                    {/* 2024 (Col 8): Droplet (Siniestro quema) */}
                    <div className="flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[3], node: PREDIOS_TIMELINE_ROWS[3].nodes[3] })}
                        className="w-6 h-6 rounded-full bg-[#991b1b] text-white border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#991b1b] transition-all cursor-pointer"
                        title="Mantenimiento 2024 (Siniestro de Quema)"
                      >
                        <Droplet className="w-3 h-3 text-rose-200" />
                      </button>
                    </div>

                    {/* 2025 & 2026: Empty */}
                    <div className="flex items-center justify-center" />
                    <div className="flex items-center justify-center" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: EJECUCIÓN CONTRACTUAL */}
          {(filterCategory === 'all' || filterCategory === 'contractual') && (
            <div className="grid grid-cols-12 bg-white hover:bg-slate-50/90 transition-colors">
              {/* Left Label Box (Green) */}
              <div className="col-span-3 bg-[#1e4620] text-white p-3 flex flex-col justify-center border-r border-slate-300">
                <div className="font-bold text-xs leading-snug">
                  6 | Ejecución contractual
                </div>
                <div className="text-[11px] text-emerald-200 font-medium">
                  Contrato Integral Refocosta CPO-12
                </div>
                {onNavigateToSlide && (
                  <button
                    type="button"
                    onClick={() => onNavigateToSlide(7)}
                    className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-amber-300 hover:text-white font-semibold group"
                  >
                    <span>Ver inventario forestal en campo (D7)</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>

              {/* Timeline Grid (Full span 2017 to 2026: Exactly 10 columns) */}
              <div className="col-span-9 relative h-20 flex items-center bg-white overflow-hidden">
                {/* Background vertical guideline columns */}
                <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
                  {PREDIOS_TIMELINE_YEARS.map((y, idx) => (
                    <div 
                      key={y} 
                      className={`h-full border-r border-slate-100 flex items-center justify-center ${
                        hoveredYear === y ? 'bg-amber-50/60' : idx % 2 === 0 ? 'bg-slate-50/30' : ''
                      }`}
                    />
                  ))}
                </div>

                {/* Long continuous green bar from Col 1 (5%) to Col 10 (95%) */}
                <div 
                  className="absolute h-2 bg-[#2d6a4f] rounded-full shadow-xs top-1/2 -translate-y-1/2 z-0"
                  style={{
                    left: '5%',
                    width: '90%',
                  }}
                />

                {/* 10 Column Interactive Node Slots */}
                <div className="absolute inset-0 grid grid-cols-10 z-10">
                  {/* 2017 (Col 1): Inicio Contrato */}
                  <div className="flex flex-col items-center justify-center relative group">
                    <button
                      type="button"
                      onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[5], node: PREDIOS_TIMELINE_ROWS[5].nodes[0] })}
                      className="w-7 h-7 rounded-full bg-[#1b4332] text-white border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#1b4332] transition-all cursor-pointer"
                      title="Inicio Contrato 9000002561 (02/Nov/2017)"
                    >
                      <Wrench className="w-3.5 h-3.5 text-emerald-200" />
                    </button>
                    <span className="absolute top-13 text-[9.5px] font-bold text-slate-800 leading-none text-center whitespace-nowrap bg-white/95 px-1 py-0.5 rounded shadow-xs border border-slate-200 pointer-events-none">
                      Inicio Contrato<br /><span className="font-mono text-[8.5px] text-slate-600">9000002561</span>
                    </span>
                  </div>

                  {/* 2018 to 2021: Empty span */}
                  <div className="flex items-center justify-center" />
                  <div className="flex items-center justify-center" />
                  <div className="flex items-center justify-center" />
                  <div className="flex items-center justify-center" />

                  {/* 2022 (Col 6): Otro sí C1230 */}
                  <div className="flex flex-col items-center justify-center relative group">
                    <button
                      type="button"
                      onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[5], node: PREDIOS_TIMELINE_ROWS[5].nodes[1] })}
                      className="w-7 h-7 rounded-full bg-[#1b4332] text-white border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#1b4332] transition-all cursor-pointer"
                      title="Otrosí N.° 1 a C1230 (18/Jul/2022)"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-200" />
                    </button>
                    <span className="absolute top-13 text-[9.5px] font-bold text-slate-800 leading-none whitespace-nowrap bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-slate-200 pointer-events-none">
                      otro si C1230
                    </span>
                  </div>

                  {/* 2023 to 2025: Empty span */}
                  <div className="flex items-center justify-center" />
                  <div className="flex items-center justify-center" />
                  <div className="flex items-center justify-center" />

                  {/* 2026 (Col 10): Terminación Contrato */}
                  <div className="flex flex-col items-center justify-center relative group">
                    <button
                      type="button"
                      onClick={() => setSelectedNode({ row: PREDIOS_TIMELINE_ROWS[5], node: PREDIOS_TIMELINE_ROWS[5].nodes[2] })}
                      className="w-7 h-7 rounded-full bg-[#081c15] text-white border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 group-hover:ring-2 group-hover:ring-[#081c15] transition-all cursor-pointer"
                      title="Vencimiento Programado (31/Ago/2026)"
                    >
                      <Flag className="w-3.5 h-3.5 text-emerald-300" />
                    </button>
                    <span className="absolute top-13 text-[9px] font-extrabold text-[#1b4332] leading-tight text-center whitespace-nowrap bg-emerald-50/95 px-1.5 py-0.5 rounded shadow-xs border border-emerald-300 pointer-events-none">
                      Terminación<br />contrato
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Executive Summary Cards Linking Predios & Obligations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2.5">
          
          {/* Card 1: Compensación Biótica */}
          <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200 flex items-start gap-2.5 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="p-2 rounded-lg bg-[#5c1d47]/10 text-[#5c1d47] shrink-0 border border-[#5c1d47]/20">
              <Trees className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-xs font-bold text-slate-900">Compensación (30.44 Ha)</h4>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded-sm border border-amber-200">
                  En Trámite ANLA
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                <strong>18.52 Ha</strong> con solicitud de cierre formal radicada (Rad. 20256200936142) + <strong>10.82 Ha</strong> en mantenimiento correctivo y replateo (Rad. 20266200858632).
              </p>
            </div>
          </div>

          {/* Card 2: Inversión 1% */}
          <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200 flex items-start gap-2.5 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="p-2 rounded-lg bg-[#831843]/10 text-[#831843] shrink-0 border border-[#831843]/20">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-xs font-bold text-slate-900">Inversión 1% (10.00 Ha)</h4>
                <span className="text-[10px] font-bold text-red-800 bg-red-100/90 px-1.5 py-0.5 rounded-sm border border-red-200">
                  6 Ha Siniestradas
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                <strong>4.0 Ha</strong> Caño Pilón consolidadas para cierre. <strong>6.0 Ha</strong> (La Fortuna y Moriche Solo) con siniestro por quema en sabana y reclamación de póliza activada.
              </p>
            </div>
          </div>

          {/* Card 3: Ejecución Contractual */}
          <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200 flex items-start gap-2.5 shadow-2xs hover:border-slate-300 transition-colors">
            <div className="p-2 rounded-lg bg-[#1b4d2e]/10 text-[#1b4d2e] shrink-0 border border-[#1b4d2e]/20">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-xs font-bold text-slate-900">Contrato Integral C1230</h4>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded-sm border border-emerald-200">
                  Vence 31-Ago-2026
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                Ejecutado desde nov-2017. Frontera notificó incumplimiento formal el 12-Dic-2025, proyectando terminación por incumplimiento y liquidación con cláusula penal.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Milestone Modal */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 text-slate-900 relative space-y-4"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#001871] text-white flex items-center justify-center shadow-xs">
                    {renderModernIcon(selectedNode.node.icon, 'w-5 h-5')}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                      {selectedNode.row.categoryTitle}
                    </span>
                    <h3 className="text-base font-bold text-[#001871] leading-tight">
                      {selectedNode.node.label} ({selectedNode.node.year})
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedNode(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="font-semibold">Predio / Ubicación:</span>
                    <span className="font-bold text-[#001871]">{selectedNode.row.predio}</span>
                  </div>
                  {selectedNode.row.areaHa && (
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-semibold">Área Asignada:</span>
                      <span className="font-bold text-emerald-800">{selectedNode.row.areaHa} Hectáreas</span>
                    </div>
                  )}
                  {selectedNode.node.radicadoOrActa && (
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-semibold">Acto / Radicado:</span>
                      <span className="font-mono font-bold text-rose-800 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        {selectedNode.node.radicadoOrActa}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#001871]" />
                    Detalle Técnico &amp; Regulatorio
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-[11px] bg-white p-2.5 rounded-lg border border-slate-200">
                    {selectedNode.node.description}
                  </p>
                </div>

                <div className="text-[11px] text-slate-500 italic bg-amber-50/70 p-2.5 rounded-lg border border-amber-200 text-amber-900">
                  <strong>Contexto Integral:</strong> {selectedNode.row.summaryNote}
                </div>
              </div>

              {/* Modal Footer / Navigation to Slide */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedNode(null)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
                >
                  Cerrar
                </button>
                {onNavigateToSlide && (
                  <button
                    type="button"
                    onClick={() => {
                      const target = selectedNode.row.linkedSlideNumber;
                      setSelectedNode(null);
                      onNavigateToSlide(target);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#001871] text-white font-bold text-xs hover:bg-[#001871]/90 flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Ir a Diapositiva {selectedNode.row.linkedSlideNumber}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
