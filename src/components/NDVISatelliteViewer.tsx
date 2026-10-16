import React, { useState, useEffect, useRef } from 'react';
import { NDVIUnit, NDVISeriePoint, NDVI_STRATA } from '../data/ndviData';
import { LiveSatelliteMap } from './LiveSatelliteMap';
import {
  saveLotImage,
  getLotImage,
  removeLotImage,
  loadAllLotImages,
  normalizeLotId,
} from '../utils/lotImageStorage';
import {
  Layers,
  Eye,
  ZoomIn,
  Info,
  Compass,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Trash2,
  Maximize2,
  FileCheck,
  MapPin,
  RefreshCw,
  Globe2,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NDVISatelliteViewerProps {
  unit: NDVIUnit;
  selectedYear: number;
  onSelectYear: (year: number) => void;
  showAllYearsGrid?: boolean;
  onToggleGrid?: () => void;
}

export const NDVISatelliteViewer: React.FC<NDVISatelliteViewerProps> = ({
  unit,
  selectedYear,
  onSelectYear,
  showAllYearsGrid = false,
  onToggleGrid,
}) => {
  const [viewMode, setViewMode] = useState<'orthophoto' | 'uploaded'>('orthophoto');
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number; ndvi: number; stratum: string } | null>(null);
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync images from storage on mount and lot changes
  useEffect(() => {
    const refreshImages = async () => {
      const all = await loadAllLotImages();
      setUploadedImages(all);
      const img = getLotImage(unit.id);
      if (img) {
        setViewMode('uploaded');
      }
    };
    refreshImages();

    // Listen to storage update events across components
    const handleUpdate = (e: any) => {
      loadAllLotImages().then((all) => {
        setUploadedImages(all);
      });
    };

    window.addEventListener('cpo12_lot_images_updated', handleUpdate);
    return () => window.removeEventListener('cpo12_lot_images_updated', handleUpdate);
  }, [unit.id]);

  const currentUploadedImg = getLotImage(unit.id) || uploadedImages[unit.id] || null;

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, JPEG o WEBP).');
      return;
    }

    try {
      setIsSaving(true);
      const savedDataUrl = await saveLotImage(unit.id, file);
      setUploadedImages((prev) => ({
        ...prev,
        [unit.id]: savedDataUrl,
        [normalizeLotId(unit.id)]: savedDataUrl,
      }));
      setViewMode('uploaded');
      setSavedSuccessMsg(true);
      setTimeout(() => setSavedSuccessMsg(false), 3500);
    } catch (err) {
      console.error('Error saving image:', err);
      alert('Hubo un error al procesar la imagen. Por favor intenta con otra imagen.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveUploadedImage = async () => {
    await removeLotImage(unit.id);
    const updated = { ...uploadedImages };
    delete updated[unit.id];
    delete updated[normalizeLotId(unit.id)];
    setUploadedImages(updated);
    setViewMode('orthophoto');
  };

  const currentPoint = unit.series.find((s) => s.year === selectedYear) || unit.series[0];

  // Deterministic raster generator matching polygon shapes & percentages
  const getRasterCells = (shapeType: string, point: NDVISeriePoint) => {
    const rows = 12;
    const cols = 16;
    const cells: { id: string; x: number; y: number; inside: boolean; ndvi: number; color: string; label: string }[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const nx = c / (cols - 1);
        const ny = r / (rows - 1);
        let inside = false;

        // Shape definitions matching real geography from satellite imagery
        if (shapeType === 'la_fortuna') {
          // Elongated rectangular strip (oriented diagonally along road)
          inside = nx >= 0.15 && nx <= 0.85 && ny >= 0.25 && ny <= 0.75;
        } else if (shapeType === 'moriche_solo') {
          // Multi-pronged irregular polygon (North lobe, West lobe, SE lobe)
          const inNorth = nx >= 0.35 && nx <= 0.75 && ny >= 0.15 && ny <= 0.5;
          const inWest = nx >= 0.15 && nx <= 0.55 && ny >= 0.45 && ny <= 0.85;
          const inEast = nx >= 0.55 && nx <= 0.88 && ny >= 0.48 && ny <= 0.82;
          inside = inNorth || inWest || inEast;
        } else if (shapeType === 'cano_pilon') {
          // Riparian wedge / curved polygon along drainage
          const distToCurve = Math.abs(ny - (0.3 + 0.4 * Math.sin(nx * Math.PI)));
          inside = nx >= 0.15 && nx <= 0.85 && distToCurve <= 0.32;
        } else if (shapeType === 'la_holanda_1_2') {
          // Trapezoidal large polygon with perimeter buffers
          const inTrap = nx >= 0.12 && nx <= 0.88 && ny >= 0.15 && ny <= 0.85;
          const inEnclave = nx >= 0.35 && nx <= 0.6 && ny >= 0.38 && ny <= 0.58;
          inside = inTrap && !inEnclave;
        } else if (shapeType === 'la_holanda_3_4') {
          // Bi-lobed curved polygon (Lóbulo Oeste y Este)
          const d1 = Math.hypot(nx - 0.38, ny - 0.5);
          const d2 = Math.hypot(nx - 0.68, ny - 0.52);
          const inBridge = nx >= 0.35 && nx <= 0.7 && ny >= 0.42 && ny <= 0.6;
          inside = d1 <= 0.28 || d2 <= 0.24 || inBridge;
        } else {
          inside = nx >= 0.2 && nx <= 0.8 && ny >= 0.2 && ny <= 0.8;
        }

        if (inside) {
          // Generate pseudo-deterministic NDVI value based on seed + point percentages
          const seed = Math.sin(c * 17.13 + r * 31.41 + point.year * 7.7) * 10000;
          const rand = seed - Math.floor(seed);

          let color = '#EAB308';
          let stratum = 'Gramíneas / Pastos';
          let val = 0.35;

          const bareT = point.bareSoilPct / 100;
          const grassT = bareT + point.grasslandPct / 100;
          const succT = grassT + point.succesionalPct / 100;

          if (rand < bareT) {
            color = '#DC2626'; // Rojo Suelo Desnudo
            stratum = 'Suelo Desnudo / Crítico (< 0.25)';
            val = Number((0.08 + rand * 0.16).toFixed(2));
          } else if (rand < grassT) {
            color = '#EAB308'; // Amarillo Gramíneas
            stratum = 'Gramíneas / Pastos (0.25 - 0.45)';
            val = Number((0.26 + (rand - bareT) / Math.max(0.01, point.grasslandPct / 100) * 0.18).toFixed(2));
          } else if (rand < succT) {
            color = '#84CC16'; // Verde Claro Arbóreo Sucesional
            stratum = 'Arbóreo Sucesional (0.45 - 0.65)';
            val = Number((0.46 + (rand - grassT) / Math.max(0.01, point.succesionalPct / 100) * 0.18).toFixed(2));
          } else {
            color = '#15803D'; // Verde Oscuro Bosque
            stratum = 'Arbóreo Denso / Bosque (> 0.65)';
            val = Number((0.66 + (rand - succT) / Math.max(0.01, point.denseForestPct / 100) * 0.24).toFixed(2));
          }

          cells.push({
            id: `c-${r}-${c}`,
            x: c,
            y: r,
            inside: true,
            ndvi: val,
            color,
            label: stratum,
          });
        }
      }
    }
    return cells;
  };

  // Render Real Satellite / Google Earth Map View
  const renderOrthophotoMap = () => {
    return <LiveSatelliteMap unit={unit} />;
  };

  // Render Custom Uploaded Image View
  const renderUploadedMapView = () => {
    if (!currentUploadedImg) {
      return (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleImageUpload(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`relative w-full aspect-[4/3] bg-[#0c1527] rounded-xl overflow-hidden border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#E31C79] bg-[#E31C79]/10 scale-[1.01]'
              : 'border-slate-600 hover:border-cyan-400 hover:bg-[#121d33]'
          }`}
        >
          <div className="p-3 rounded-full bg-[#001871] text-cyan-300 mb-3 shadow-lg">
            <Upload className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-white font-display mb-1">
            Cargar Imagen / Mapa Real para {unit.unitName}
          </h4>
          <p className="text-xs text-slate-400 max-w-[280px] mb-3">
            Arrastra y suelta aquí tu archivo de imagen (PNG, JPG, WEBP) o haz clic para seleccionarlo desde tu equipo.
          </p>
          <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#E31C79] text-white shadow-md">
            Seleccionar Archivo de Imagen
          </span>
        </div>
      );
    }

    return (
      <div className="relative w-full aspect-[4/3] bg-black rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col justify-between select-none group">
        <img
          src={currentUploadedImg}
          alt={`Mapa real ${unit.unitName}`}
          className="absolute inset-0 w-full h-full object-contain bg-slate-950"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between gap-2 p-3 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-1.5 bg-[#001871]/90 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded text-white shadow-xs">
            <span className="font-display font-extrabold text-xs text-emerald-300">
              ✓ Mapa Real Cargado
            </span>
            <span className="text-[10px] text-slate-300 font-mono">
              • {unit.unitName}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-2 py-1 rounded bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-md transition-all"
              title="Cambiar imagen"
            >
              <RefreshCw className="w-3 h-3" /> Reemplazar
            </button>
            <button
              onClick={handleRemoveUploadedImage}
              className="p-1 rounded bg-red-600/80 hover:bg-red-600 text-white text-[10px] backdrop-blur-md transition-all"
              title="Eliminar imagen personalizada"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Details Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-200 p-2.5 bg-gradient-to-t from-black/90 to-transparent">
          <span>Área: <strong className="text-white">{unit.areaHa.toFixed(2)} Ha</strong></span>
          <span className="text-cyan-300">{unit.geographicalContext}</span>
        </div>
      </div>
    );
  };

  const renderSingleMap = (point: NDVISeriePoint, isInteractive: boolean = true) => {
    const cells = getRasterCells(unit.satelliteShapeType, point);

    return (
      <div className="relative w-full aspect-[4/3] bg-[#0c1527] rounded-xl overflow-hidden border border-slate-700/80 shadow-inner flex flex-col justify-between p-3 select-none">
        
        {/* Raster Grid Background / Coordinate lines */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Top Overlay Badges */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-[#001871]/90 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded text-white shadow-xs">
            <span className="font-display font-extrabold text-sm text-yellow-300">
              {point.year}
            </span>
            <span className="text-[10px] text-slate-300 font-mono">
              • NDVI 10m/px
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono bg-black/60 backdrop-blur-xs text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
              NDVI Prom: {point.meanNDVI.toFixed(2)}
            </span>
          </div>
        </div>

        {/* SVG / Raster Visualizer */}
        <div className="relative z-10 flex-1 flex items-center justify-center p-2">
          <svg
            viewBox="0 0 160 120"
            className="w-full h-full max-h-[220px] drop-shadow-md"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Outer boundary buffer reference */}
            <rect
              x="5"
              y="5"
              width="150"
              height="110"
              fill="none"
              stroke="#334155"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              rx="4"
            />

            {/* Render 10m Raster Cells */}
            {cells.map((cell) => (
              <rect
                key={cell.id}
                x={cell.x * 10}
                y={cell.y * 10}
                width="9.4"
                height="9.4"
                rx="1"
                fill={cell.color}
                stroke={hoveredCell && hoveredCell.x === cell.x && hoveredCell.y === cell.y ? '#ffffff' : 'rgba(0,0,0,0.3)'}
                strokeWidth={hoveredCell && hoveredCell.x === cell.x && hoveredCell.y === cell.y ? '1.5' : '0.4'}
                className="transition-all duration-300 cursor-crosshair hover:opacity-100 opacity-90"
                onMouseEnter={() => {
                  if (isInteractive) {
                    setHoveredCell({
                      x: cell.x,
                      y: cell.y,
                      ndvi: cell.ndvi,
                      stratum: cell.label,
                    });
                  }
                }}
                onMouseLeave={() => {
                  if (isInteractive) setHoveredCell(null);
                }}
              />
            ))}
          </svg>
        </div>

        {/* Bottom Metadata & Scale Bar */}
        <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1 border-t border-slate-700/50">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-slate-300">
              <Compass className="w-2.5 h-2.5 text-cyan-400" /> N
            </span>
            <div className="flex items-center gap-1">
              <div className="w-8 h-1 bg-white/40 border-l border-r border-white" />
              <span>50 m</span>
            </div>
          </div>

          <div className="text-right truncate max-w-[150px]">
            <span className="text-slate-300 font-semibold">{point.statusBadge}</span>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="w-full bg-[#1b143a]/90 rounded-2xl border border-white/10 p-4 sm:p-5 flex flex-col gap-4 shadow-xl">
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleImageUpload(e.target.files[0]);
          }
        }}
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
      />

      {/* Top Header Row of the Satellite Viewer with Mode Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
              {viewMode === 'ndvi'
                ? 'Google Earth Engine • NDVI 10m'
                : viewMode === 'orthophoto'
                ? 'Satélite en Vivo (Alta Resolución)'
                : 'Imagen Adjuntada por el Usuario'}
            </span>
            <span className="text-xs font-bold text-white font-display">
              {unit.unitName}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {unit.geographicalContext} (Área: <strong className="text-white">{unit.areaHa.toFixed(2)} Ha</strong>)
          </p>
        </div>

        {/* View mode toggle pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Mode: Satellite Live / Google Earth */}
          <button
            onClick={() => setViewMode('orthophoto')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'orthophoto'
                ? 'bg-[#0284c7] text-white border border-cyan-400/40 shadow-xs'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-cyan-300" />
            <span>Satélite en Vivo / Google Earth</span>
          </button>

          {/* Mode: Custom Uploaded Image */}
          <button
            onClick={() => {
              if (!currentUploadedImg) {
                fileInputRef.current?.click();
              } else {
                setViewMode('uploaded');
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'uploaded'
                ? 'bg-[#E31C79] text-white shadow-xs'
                : currentUploadedImg
                ? 'bg-[#E31C79]/30 text-pink-200 hover:bg-[#E31C79]/50 border border-pink-400/30'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-pink-300" />
            <span>{currentUploadedImg ? 'Mi Imagen Adjunta' : '+ Adjuntar Mi Foto'}</span>
          </button>
        </div>
      </div>

      {/* Main Display Area */}
      {viewMode === 'orthophoto' ? (
        /* Orthophoto Mode */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7">
            {renderOrthophotoMap()}
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 h-full">
            <div className="bg-[#120b29] rounded-xl p-4 border border-white/10 flex flex-col gap-3 shadow-md">
              <span className="text-[10px] uppercase font-mono text-cyan-300 font-bold">Ficha Cartográfica del Lote</span>
              <h4 className="text-base font-bold text-white font-display">
                {unit.unitName}
              </h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">Superficie Total:</span>
                  <strong className="text-white font-mono">{unit.areaHa.toFixed(2)} Hectáreas</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">Ubicación / Cuenca:</span>
                  <strong className="text-slate-200">{unit.geographicalContext}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">Régimen Legal:</span>
                  <strong className="text-cyan-300">Expediente LAM5475 • Res. 445</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">Estado Ante ANLA:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                    {unit.series[unit.series.length - 1].statusBadge}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#001871]/70 to-[#120b29] rounded-xl p-4 border border-blue-400/20 text-xs flex flex-col gap-2 shadow-md">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Dictamen Técnico para ANLA / Junta:</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                {unit.regulatoryRecommendation}
              </p>
            </div>
          </div>
        </div>
      ) : viewMode === 'uploaded' ? (
        /* Uploaded Image Mode */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7">
            {renderUploadedMapView()}
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 h-full">
            <div className="bg-[#120b29] rounded-xl p-4 border border-white/10 flex flex-col gap-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-pink-400 font-bold">Imagen Personalizada</span>
                <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 text-[10px] font-bold">
                  Adjuntada por Usuario
                </span>
              </div>
              <h4 className="text-base font-bold text-white font-display">
                Mapa Real del Lote: {unit.unitName}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Esta imagen representa el levantamiento aerofotogramétrico o cartográfico oficial del polígono de <strong>{unit.areaHa.toFixed(2)} Ha</strong>. Se almacena localmente en la presentación para tus sesiones y reportes.
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#E31C79] hover:bg-[#c21465] text-white flex items-center gap-1.5 shadow-md"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir Nueva Versión</span>
                </button>
                <button
                  onClick={handleRemoveUploadedImage}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-red-500/20 hover:text-red-300 text-slate-300 flex items-center gap-1.5 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#001871]/70 to-[#120b29] rounded-xl p-4 border border-blue-400/20 text-xs flex flex-col gap-2 shadow-md">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>Sustento para la Autoridad:</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                {unit.regulatoryRecommendation}
              </p>
            </div>
          </div>
        </div>
      ) : showAllYearsGrid ? (
        /* Matrix Grid View of all evaluated years */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {unit.series.map((point) => (
            <div
              key={point.year}
              onClick={() => onSelectYear(point.year)}
              className={`cursor-pointer rounded-xl transition-all ${
                point.year === selectedYear ? 'ring-2 ring-[#E31C79] scale-[1.02]' : 'hover:opacity-95'
              }`}
            >
              {renderSingleMap(point, false)}
              <div className="mt-2 px-1 text-center">
                <div className="text-xs font-bold text-white flex items-center justify-center gap-1">
                  Año {point.year}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {point.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Focused Single Year View with Interactive Controls & Breakdown */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column: Interactive Satellite Map (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {renderSingleMap(currentPoint, true)}

            {/* Hover Tooltip inspection badge */}
            <div className="min-h-[30px] bg-slate-900/60 rounded-lg px-3 py-1.5 border border-white/5 flex items-center justify-between text-xs">
              {hoveredCell ? (
                <div className="flex items-center gap-3 w-full justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: hoveredCell.ndvi < 0.25 ? '#DC2626' : hoveredCell.ndvi < 0.45 ? '#EAB308' : hoveredCell.ndvi < 0.65 ? '#84CC16' : '#15803D' }} />
                    <span className="font-medium text-white">{hoveredCell.stratum}</span>
                  </div>
                  <span className="font-mono text-cyan-300 font-bold">
                    Píxel [x:{hoveredCell.x}, y:{hoveredCell.y}] = NDVI {hoveredCell.ndvi}
                  </span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400 italic flex items-center gap-1.5">
                  <Info className="w-3 h-3 text-cyan-400" />
                  Pasa el cursor sobre cualquier píxel de 10x10m para consultar el valor exacto de NDVI y estrato.
                </span>
              )}
            </div>

            {/* Timeline Year Selector Chips */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#120b29] rounded-xl border border-white/10">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider px-2">
                Año Evaluado:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {unit.series.map((point) => {
                  const isSelected = point.year === selectedYear;
                  return (
                    <button
                      key={point.year}
                      onClick={() => onSelectYear(point.year)}
                      className={`px-3 py-1 rounded-lg text-xs font-display font-bold transition-all ${
                        isSelected
                          ? 'bg-[#E31C79] text-white shadow-md scale-105 ring-2 ring-white/30'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      {point.year}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Quantitative Strata Breakdown & Interpretation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 h-full">
            
            {/* Year Stats Card */}
            <div className="bg-[#120b29] rounded-xl p-4 border border-white/10 flex flex-col gap-3 shadow-md">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400">Diagnóstico Anual</span>
                  <h4 className="text-base font-bold text-white font-display">
                    {currentPoint.year} — {currentPoint.label}
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-white/10 text-slate-200 border border-white/10">
                  {currentPoint.statusBadge}
                </span>
              </div>

              {/* Mean NDVI & Biomass Progress Gauge */}
              <div className="grid grid-cols-2 gap-3 py-1">
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-white/5">
                  <div className="text-[10px] text-slate-400 font-semibold">NDVI Promedio</div>
                  <div className="text-xl font-black font-mono text-cyan-300">
                    {currentPoint.meanNDVI.toFixed(2)}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Escala de vigor (-1 a +1)</div>
                </div>

                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-white/5">
                  <div className="text-[10px] text-slate-400 font-semibold">Índice Biomasa</div>
                  <div className="text-xl font-black font-mono text-emerald-400">
                    {currentPoint.biomassIndex} / 100
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Densidad fotosintética</div>
                </div>
              </div>

              {/* Stacked Percentage Bar for Estratos */}
              <div className="flex flex-col gap-1.5 mt-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                  <span>Distribución de Estratos de Cobertura</span>
                  <span className="text-slate-400">Total: 100%</span>
                </div>

                <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner bg-slate-900 border border-white/10">
                  {currentPoint.bareSoilPct > 0 && (
                    <div
                      style={{ width: `${currentPoint.bareSoilPct}%` }}
                      className="bg-red-600 h-full transition-all duration-500"
                      title={`Suelo Desnudo / Crítico: ${currentPoint.bareSoilPct}%`}
                    />
                  )}
                  {currentPoint.grasslandPct > 0 && (
                    <div
                      style={{ width: `${currentPoint.grasslandPct}%` }}
                      className="bg-yellow-500 h-full transition-all duration-500"
                      title={`Gramíneas / Pastos: ${currentPoint.grasslandPct}%`}
                    />
                  )}
                  {currentPoint.succesionalPct > 0 && (
                    <div
                      style={{ width: `${currentPoint.succesionalPct}%` }}
                      className="bg-lime-500 h-full transition-all duration-500"
                      title={`Arbóreo Sucesional: ${currentPoint.succesionalPct}%`}
                    />
                  )}
                  {currentPoint.denseForestPct > 0 && (
                    <div
                      style={{ width: `${currentPoint.denseForestPct}%` }}
                      className="bg-emerald-700 h-full transition-all duration-500"
                      title={`Arbóreo Denso / Bosque: ${currentPoint.denseForestPct}%`}
                    />
                  )}
                </div>

                {/* Percentage Legend Items */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="flex items-center justify-between p-1.5 rounded bg-red-950/30 border border-red-800/30 text-red-300">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-xs bg-red-600" /> Suelo Crítico (&lt;0.25)
                    </span>
                    <strong className="font-mono">{currentPoint.bareSoilPct}%</strong>
                  </div>

                  <div className="flex items-center justify-between p-1.5 rounded bg-yellow-950/30 border border-yellow-800/30 text-yellow-300">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-xs bg-yellow-500" /> Pastos (0.25-0.45)
                    </span>
                    <strong className="font-mono">{currentPoint.grasslandPct}%</strong>
                  </div>

                  <div className="flex items-center justify-between p-1.5 rounded bg-lime-950/30 border border-lime-800/30 text-lime-300">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-xs bg-lime-500" /> Sucesional (0.45-0.65)
                    </span>
                    <strong className="font-mono">{currentPoint.succesionalPct}%</strong>
                  </div>

                  <div className="flex items-center justify-between p-1.5 rounded bg-emerald-950/30 border border-emerald-800/30 text-emerald-300">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-xs bg-emerald-700" /> Bosque Denso (&gt;0.65)
                    </span>
                    <strong className="font-mono">{currentPoint.denseForestPct}%</strong>
                  </div>
                </div>
              </div>

              {/* Bio-physical Observation of the year */}
              <div className="bg-slate-900/80 p-3 rounded-lg border border-white/5 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white block mb-0.5">Observación Satelital:</span>
                {currentPoint.notes}
              </div>

            </div>

            {/* Strategic Conclusion Card for Authority */}
            <div className="bg-gradient-to-br from-[#001871]/70 to-[#120b29] rounded-xl p-4 border border-blue-400/20 text-xs flex flex-col gap-2 shadow-md">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Dictamen Técnico para ANLA / Junta:</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                {unit.regulatoryRecommendation}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* Global NDVI Strata Reference Bar */}
      <div className="mt-2 pt-3 border-t border-white/10">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
          <span>Escala Oficial de Estratos de Cobertura (NDVI) • Google Earth Engine</span>
          <span className="text-slate-400 font-mono text-[10px]">Resolución Espacial: 10 metros/píxel</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {NDVI_STRATA.map((stratum) => (
            <div
              key={stratum.id}
              className="bg-[#120b29] rounded-lg p-2.5 border border-white/10 flex items-start gap-2.5"
            >
              <div
                className="w-3.5 h-3.5 rounded-xs mt-0.5 shrink-0 shadow-xs"
                style={{ backgroundColor: stratum.colorHex }}
              />
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">{stratum.label}</span>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">({stratum.range})</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                  {stratum.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
