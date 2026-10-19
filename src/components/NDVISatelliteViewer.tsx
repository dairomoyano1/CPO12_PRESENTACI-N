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
  Satellite,
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
  // 'ndvi' (multitemporal satellite maps) is the default and primary view
  const [viewMode, setViewMode] = useState<'ndvi' | 'orthophoto' | 'uploaded'>('ndvi');

  // Display mode inside the multitemporal series: 'raster' | 'uploaded' | 'split'
  // Defaults to 'uploaded' so the user's attached image is immediately visible in multitemporal maps!
  const [seriesDisplayMode, setSeriesDisplayMode] = useState<'raster' | 'uploaded' | 'split'>('uploaded');

  // Target year for photo upload (undefined = lot general image)
  const [targetUploadYear, setTargetUploadYear] = useState<number | undefined>(selectedYear);

  // Fullscreen lightbox modal for viewing attached image
  const [zoomModalImg, setZoomModalImg] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

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
    };
    refreshImages();

    // Listen to storage update events across components
    const handleUpdate = () => {
      loadAllLotImages().then((all) => {
        setUploadedImages(all);
      });
    };

    window.addEventListener('cpo12_lot_images_updated', handleUpdate);
    return () => window.removeEventListener('cpo12_lot_images_updated', handleUpdate);
  }, [unit.id]);

  // Image for the lot general
  const generalUploadedImg = getLotImage(unit.id) || uploadedImages[unit.id] || uploadedImages[normalizeLotId(unit.id)] || null;

  // Image for the selected year (with fallback to lot general)
  const currentYearImg = getLotImage(unit.id, selectedYear) ||
    uploadedImages[`${normalizeLotId(unit.id)}_${selectedYear}`] ||
    uploadedImages[`${unit.id}_${selectedYear}`] ||
    generalUploadedImg;

  // Check if current year has an explicit year-specific photo
  const isYearSpecificPhoto = !!(
    getLotImage(unit.id, selectedYear) &&
    (uploadedImages[`${normalizeLotId(unit.id)}_${selectedYear}`] || uploadedImages[`${unit.id}_${selectedYear}`])
  );

  const currentUploadedImg = currentYearImg;

  // Whenever unit or selectedYear changes, if an attached image exists, show the uploaded image by default in multitemporal maps
  useEffect(() => {
    if (currentYearImg) {
      setSeriesDisplayMode('uploaded');
    }
  }, [unit.id, selectedYear, !!currentYearImg]);

  const handleTriggerUpload = (year?: number) => {
    setTargetUploadYear(year);
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, JPEG o WEBP).');
      return;
    }

    try {
      setIsSaving(true);
      const year = targetUploadYear;
      const savedDataUrl = await saveLotImage(unit.id, file, year);
      const normId = normalizeLotId(unit.id);
      
      const key1 = year ? `${normId}_${year}` : normId;
      const key2 = year ? `${unit.id}_${year}` : unit.id;

      setUploadedImages((prev) => ({
        ...prev,
        [key1]: savedDataUrl,
        [key2]: savedDataUrl,
        [normId]: prev[normId] || savedDataUrl,
        [unit.id]: prev[unit.id] || savedDataUrl,
      }));

      // When in series mode, keep the user in the series and switch to uploaded mode
      if (viewMode === 'ndvi') {
        setSeriesDisplayMode('uploaded');
      } else {
        setViewMode('uploaded');
      }

      setSavedSuccessMsg(true);
      setTimeout(() => setSavedSuccessMsg(false), 3500);
    } catch (err) {
      console.error('Error saving image:', err);
      alert('Hubo un error al procesar la imagen. Por favor intenta con otra imagen.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveUploadedImage = async (year?: number) => {
    await removeLotImage(unit.id, year);
    const updated = { ...uploadedImages };
    const normId = normalizeLotId(unit.id);
    if (year) {
      delete updated[`${normId}_${year}`];
      delete updated[`${unit.id}_${year}`];
    } else {
      delete updated[unit.id];
      delete updated[normId];
    }
    setUploadedImages(updated);
    if (seriesDisplayMode === 'uploaded' && !getLotImage(unit.id, selectedYear) && !generalUploadedImg) {
      setSeriesDisplayMode('raster');
    }
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

  // Render Custom Uploaded Image for a specific year in the multitemporal series (or fallback to lot image)
  const renderYearUploadedView = (point: NDVISeriePoint, isInteractive: boolean = true) => {
    const pointNormId = normalizeLotId(unit.id);
    const pointImg = getLotImage(unit.id, point.year) ||
      uploadedImages[`${pointNormId}_${point.year}`] ||
      uploadedImages[`${unit.id}_${point.year}`] ||
      generalUploadedImg;

    const isSpecific = !!(
      uploadedImages[`${pointNormId}_${point.year}`] ||
      uploadedImages[`${unit.id}_${point.year}`]
    );

    if (!pointImg) {
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
              setTargetUploadYear(point.year);
              handleImageUpload(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => handleTriggerUpload(point.year)}
          className={`relative w-full aspect-[4/3] bg-[#0c1527] rounded-xl overflow-hidden border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#E31C79] bg-[#E31C79]/10 scale-[1.01]'
              : 'border-pink-500/40 hover:border-pink-400 bg-pink-950/10 hover:bg-pink-950/20'
          }`}
        >
          <div className="p-3 rounded-full bg-[#E31C79]/30 text-pink-300 mb-2 shadow-lg">
            <Upload className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white font-display mb-1">
            Adjuntar Imagen Individual — Año {point.year}
          </h4>
          <p className="text-xs text-slate-300 max-w-[280px] mb-3">
            Sube el plano, foto de campo u ortofoto del año {point.year} para <strong>{unit.unitName}</strong>.
          </p>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#E31C79] text-white shadow-md">
              Seleccionar Foto {point.year}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSeriesDisplayMode('raster');
              }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-300"
            >
              Ver Ráster GEE
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full aspect-[4/3] bg-black rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col justify-between select-none group">
        <img
          src={pointImg}
          alt={`Imagen ${point.year} ${unit.unitName}`}
          className="absolute inset-0 w-full h-full object-contain bg-slate-950 cursor-pointer"
          onClick={() =>
            setZoomModalImg({
              url: pointImg,
              title: `${unit.unitName} — Año ${point.year}`,
              subtitle: isSpecific ? 'Imagen fotográfica / cartográfica individual del año' : 'Imagen cartográfica del lote aplicada a la serie',
            })
          }
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between gap-2 p-3 bg-gradient-to-b from-black/85 via-black/40 to-transparent">
          <div className="flex items-center gap-1.5 bg-[#001871]/90 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded text-white shadow-xs">
            <span className="font-display font-extrabold text-xs text-yellow-300">
              Año {point.year}
            </span>
            <span className="text-[10px] text-pink-300 font-mono flex items-center gap-1">
              • 📷 {isSpecific ? 'Foto Individual' : 'Imagen Adjunta Lote'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                setZoomModalImg({
                  url: pointImg,
                  title: `${unit.unitName} — Año ${point.year}`,
                  subtitle: `Polígono ${unit.areaHa.toFixed(2)} Ha • NDVI Prom: ${point.meanNDVI.toFixed(2)}`,
                })
              }
              className="p-1.5 rounded bg-black/60 hover:bg-black/90 text-white text-xs backdrop-blur-md transition-all border border-white/20"
              title="Ampliar a pantalla completa"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            {isInteractive && (
              <>
                <button
                  onClick={() => handleTriggerUpload(point.year)}
                  className="px-2 py-1 rounded bg-[#E31C79]/80 hover:bg-[#E31C79] text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-md transition-all shadow-xs"
                  title={`Adjuntar o cambiar foto individual para el año ${point.year}`}
                >
                  <RefreshCw className="w-3 h-3" /> {isSpecific ? 'Cambiar Foto' : '+ Foto Año ' + point.year}
                </button>
                <button
                  onClick={() => handleRemoveUploadedImage(isSpecific ? point.year : undefined)}
                  className="p-1 rounded bg-red-600/70 hover:bg-red-600 text-white text-[10px] backdrop-blur-md transition-all"
                  title="Eliminar foto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bottom Details Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-200 p-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">{unit.unitName}</span>
            <span className="text-cyan-300 font-mono">NDVI {point.meanNDVI.toFixed(2)}</span>
          </div>
          <span className="text-emerald-300 font-bold">{point.statusBadge}</span>
        </div>
      </div>
    );
  };

  // Render Split Side-by-Side View (Raster NDVI vs Real Attached Photo)
  const renderSplitView = (point: NDVISeriePoint) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full bg-[#0c1527] rounded-xl p-3 border border-slate-700/80 shadow-inner">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1">
              <Satellite className="w-3 h-3" /> Ráster Satelital GEE (10m)
            </span>
            <span className="text-[9px] font-mono text-slate-400">Año {point.year}</span>
          </div>
          <div className="flex-1 rounded-lg overflow-hidden border border-slate-700">
            {renderSingleMap(point, false)}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1">
              <ImageIcon className="w-3 h-3" /> Imagen Adjunta Individual
            </span>
            <span className="text-[9px] font-mono text-pink-300">Año {point.year}</span>
          </div>
          <div className="flex-1 rounded-lg overflow-hidden border border-slate-700">
            {renderYearUploadedView(point, false)}
          </div>
        </div>
      </div>
    );
  };

  // Render Custom Uploaded Image View (Lot Level standalone)
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
          onClick={() => handleTriggerUpload(selectedYear)}
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
          className="absolute inset-0 w-full h-full object-contain bg-slate-950 cursor-pointer"
          onClick={() =>
            setZoomModalImg({
              url: currentUploadedImg,
              title: `Mapa Real del Lote: ${unit.unitName}`,
              subtitle: `Superficie: ${unit.areaHa.toFixed(2)} Ha • ${unit.geographicalContext}`,
            })
          }
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
              onClick={() =>
                setZoomModalImg({
                  url: currentUploadedImg,
                  title: `Mapa Real del Lote: ${unit.unitName}`,
                  subtitle: `Superficie: ${unit.areaHa.toFixed(2)} Ha • ${unit.geographicalContext}`,
                })
              }
              className="p-1.5 rounded bg-black/60 hover:bg-black/90 text-white text-xs backdrop-blur-md transition-all border border-white/20"
              title="Ampliar"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleTriggerUpload(selectedYear)}
              className="px-2 py-1 rounded bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-md transition-all"
              title="Cambiar imagen"
            >
              <RefreshCw className="w-3 h-3" /> Reemplazar
            </button>
            <button
              onClick={() => handleRemoveUploadedImage(undefined)}
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

      {/* Top Header Row of the Multitemporal Viewer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5 text-emerald-300" />
              <span>Mapas Multitemporales NDVI (Serie 2017–2026)</span>
            </span>
            <span className="text-sm font-bold text-white font-display">
              {unit.unitName}
            </span>
            {currentYearImg && (
              <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-bold flex items-center gap-1">
                <ImageIcon className="w-3 h-3 text-pink-300" />
                <span>{isYearSpecificPhoto ? `Foto Año ${selectedYear}` : 'Imagen Adjunta Lote'}</span>
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {unit.geographicalContext} • Superficie: <strong className="text-white">{unit.areaHa.toFixed(2)} Ha</strong> • Monitoreo Multitemporal
          </p>
        </div>

        {/* Action Button: Attach / Change Image */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleTriggerUpload(selectedYear)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 bg-[#E31C79] hover:bg-[#c21465] text-white shadow-md transition-all cursor-pointer"
            title="Subir o cambiar tu imagen / ortofoto adjunta"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{currentYearImg ? 'Cambiar Mi Imagen Adjunta' : '+ Adjuntar Mi Imagen'}</span>
          </button>
        </div>
      </div>

      {/* Multitemporal Interactive Map & Diagnostics View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column: Interactive Satellite Map (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            
            {/* Sub-selector: Attached Image vs Ráster NDVI vs Split */}
            <div className="flex items-center justify-between gap-2 p-1.5 bg-[#120b29] rounded-xl border border-white/10 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setSeriesDisplayMode('uploaded')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    seriesDisplayMode === 'uploaded'
                      ? 'bg-gradient-to-r from-[#E31C79] to-[#be185d] text-white shadow-md font-extrabold ring-2 ring-pink-400/40'
                      : currentYearImg
                      ? 'bg-pink-950/40 text-pink-300 hover:text-white border border-pink-500/30'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-pink-300" />
                  <span>
                    📸 Mi Imagen Adjunta
                    {isYearSpecificPhoto ? ` (${currentPoint.year})` : currentYearImg ? ' (Lote)' : ''}
                  </span>
                </button>

                <button
                  onClick={() => setSeriesDisplayMode('raster')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    seriesDisplayMode === 'raster'
                      ? 'bg-[#001871] text-cyan-300 border border-cyan-400/40 shadow-xs ring-2 ring-blue-500/30 font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <Satellite className="w-3.5 h-3.5 text-cyan-400" />
                  <span>🛰️ Ráster NDVI 10m GEE</span>
                </button>

                {currentYearImg && (
                  <button
                    onClick={() => setSeriesDisplayMode('split')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      seriesDisplayMode === 'split'
                        ? 'bg-purple-600 text-white shadow-xs ring-2 ring-purple-400/40 font-bold'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                    title="Comparar ráster NDVI con imagen adjunta"
                  >
                    <Layers className="w-3.5 h-3.5 text-purple-300" />
                    <span>Comparar Lado a Lado</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => handleTriggerUpload(currentPoint.year)}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-[#E31C79]/20 hover:bg-[#E31C79] text-pink-200 hover:text-white flex items-center gap-1 border border-pink-500/30 transition-all cursor-pointer"
                title={`Adjuntar o actualizar foto individual para el año ${currentPoint.year}`}
              >
                <Upload className="w-3 h-3 text-pink-300" />
                <span>+ Foto {currentPoint.year}</span>
              </button>
            </div>

            {/* Map or Uploaded Image or Split Render */}
            {seriesDisplayMode === 'raster' ? (
              renderSingleMap(currentPoint, true)
            ) : seriesDisplayMode === 'uploaded' ? (
              renderYearUploadedView(currentPoint, true)
            ) : (
              renderSplitView(currentPoint)
            )}

            {/* Hover Tooltip or Photo Legend */}
            {seriesDisplayMode === 'raster' ? (
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
            ) : (
              <div className="min-h-[30px] bg-slate-900/60 rounded-lg px-3 py-1.5 border border-white/5 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3 h-3 text-pink-400" />
                  {isYearSpecificPhoto
                    ? `Mostrando imagen individual específica del año ${currentPoint.year} para ${unit.unitName}.`
                    : currentYearImg
                    ? `Mostrando imagen adjunta del lote ${unit.unitName} (puedes subir una foto específica para ${currentPoint.year} con el botón "+ Foto ${currentPoint.year}").`
                    : `Sin foto adjunta aún para este año.`}
                </span>
                {currentYearImg && (
                  <button
                    onClick={() =>
                      setZoomModalImg({
                        url: currentYearImg,
                        title: `${unit.unitName} — Año ${currentPoint.year}`,
                      })
                    }
                    className="text-[10px] text-cyan-300 hover:underline flex items-center gap-1"
                  >
                    <Maximize2 className="w-3 h-3" /> Pantalla Completa
                  </button>
                )}
              </div>
            )}

            {/* Timeline Year Selector Chips with Multitemporal Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#120b29] rounded-xl border border-white/10">
              <div className="flex items-center gap-1.5 px-1">
                <Satellite className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Año Evaluado:
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {unit.series.map((point) => {
                  const isSelected = point.year === selectedYear;
                  const pointNormId = normalizeLotId(unit.id);
                  const hasSpecific = !!(uploadedImages[`${pointNormId}_${point.year}`] || uploadedImages[`${unit.id}_${point.year}`]);
                  return (
                    <button
                      key={point.year}
                      onClick={() => onSelectYear(point.year)}
                      className={`px-3 py-1 rounded-lg text-xs font-display font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#E31C79] text-white shadow-md scale-105 ring-2 ring-white/30'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      <span>{point.year}</span>
                      {hasSpecific ? (
                        <span title="Foto específica de este año" className="text-[10px]">📸</span>
                      ) : currentUploadedImg ? (
                        <span title="Imagen adjunta disponible" className="text-[8px] opacity-70">📷</span>
                      ) : null}
                      <span className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                        isSelected ? 'bg-black/40 text-yellow-300' : 'bg-black/30 text-slate-400'
                      }`}>
                        NDVI {point.meanNDVI.toFixed(2)}
                      </span>
                    </button>
                  );
                })}

                {/* Dedicated Toggle Button for Attached Image in the Series */}
                <button
                  onClick={() => {
                    setSeriesDisplayMode(seriesDisplayMode === 'uploaded' ? 'raster' : 'uploaded');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    seriesDisplayMode === 'uploaded'
                      ? 'bg-pink-600 text-white ring-2 ring-pink-400/50 shadow-md font-extrabold'
                      : currentYearImg
                      ? 'bg-pink-900/30 text-pink-300 border border-pink-500/30 hover:bg-pink-900/50'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                  title="Ver o alternar imagen adjunta en la serie"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-pink-300" />
                  <span>{seriesDisplayMode === 'uploaded' ? '✓ Viendo Imagen' : 'Ver Imagen Adjunta'}</span>
                </button>
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

      {/* Lightbox Modal for Fullscreen Attached Image Inspection */}
      {zoomModalImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fadeIn"
          onClick={() => setZoomModalImg(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#120b29] rounded-2xl border border-white/20 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3.5 border-b border-white/10 bg-[#0c1527]">
              <div>
                <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-pink-400" />
                  {zoomModalImg.title}
                </h3>
                {zoomModalImg.subtitle && (
                  <p className="text-xs text-slate-400 mt-0.5">{zoomModalImg.subtitle}</p>
                )}
              </div>
              <button
                onClick={() => setZoomModalImg(null)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-bold"
              >
                ✕ Cerrar
              </button>
            </div>
            <div className="flex-1 p-2 bg-black flex items-center justify-center overflow-auto max-h-[78vh]">
              <img
                src={zoomModalImg.url}
                alt={zoomModalImg.title}
                className="max-w-full max-h-[75vh] object-contain rounded"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
