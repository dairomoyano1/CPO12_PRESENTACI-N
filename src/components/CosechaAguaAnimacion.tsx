import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Sun,
  Droplets,
  Zap,
  Layers,
  TreePine,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  BatteryCharging,
  Pipette,
  Fence,
  Sparkles,
  Gauge
} from 'lucide-react';

export const CosechaAguaAnimacion: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentStage, setCurrentStage] = useState<number>(0);

  const stages = [
    {
      id: 0,
      title: '1. Captación y Escorrentía (Cunetas en Suelo-Cemento)',
      shortTitle: '1. Captación',
      icon: Droplets,
      color: 'text-sky-400',
      activeBorder: 'border-sky-500',
      bg: 'bg-sky-500/10 border-sky-500/30',
      badge: 'Cunetas de Corona',
      desc: 'El agua lluvia es interceptada por el terreno y protegida de la erosión mediante cunetas perimetrales de corona construidas en suelo-cemento (revestidas en sacos de 0.1 x 0.5 x 0.7 m).',
      specDetails: [
        'Cunetas de corona en suelo-cemento',
        'Revestimiento en sacos de 0.1 x 0.5 x 0.7 m',
        'Protección total contra erosión hídrica'
      ],
      metric: 'Sacos Suelo-Cemento: 0.1 × 0.5 × 0.7 m'
    },
    {
      id: 1,
      title: '2. Excavación y Almacenamiento (Geomembrana HDPE 40 mils)',
      shortTitle: '2. Reservorio HDPE',
      icon: Layers,
      color: 'text-indigo-400',
      activeBorder: 'border-indigo-500',
      bg: 'bg-indigo-500/10 border-indigo-500/30',
      badge: '10 × 15 m • 40 mils (1.0 mm)',
      desc: 'Estanque excavado mecánicamente de 10x15 metros (volumen de excavación de 175 m³ y diques de 165 m³ compactados) impermeabilizado completamente con geomembrana de alta densidad (HDPE) de 40 mils (1.00 mm) para evitar la infiltración.',
      specDetails: [
        'Dimensiones: 10 × 15 m en corona',
        'Excavación: 175 m³ | Diques: 165 m³ compactados',
        'Lámina HDPE 40 mils (1.00 mm) impermeable'
      ],
      metric: 'Volumen: 175 m³ exc. / 165 m³ diques'
    },
    {
      id: 2,
      title: '3. Manejo Hídrico y Desagüe Seguro (PVC 3")',
      shortTitle: '3. Desagüe PVC 3"',
      icon: Pipette,
      color: 'text-cyan-400',
      activeBorder: 'border-cyan-500',
      bg: 'bg-cyan-500/10 border-cyan-500/30',
      badge: 'PVC Sanitaria 3" (20 m)',
      desc: 'Tuberías sanitarias de PVC de 3 pulgadas (aproximadamente 20 metros de longitud) para regular la entrada, purga y salida segura del agua por rebose.',
      specDetails: [
        'Tubería sanitaria PVC Ø 3 pulgadas',
        'Longitud total: ~20 metros de conducción',
        'Sistema de alivio y control de nivel de rebose'
      ],
      metric: 'Tubería Sanitaria: PVC 3" (~20 m)'
    },
    {
      id: 3,
      title: '4. Energía Limpia y Bombeo Solar (5.000 L/día)',
      shortTitle: '4. Bombeo Solar',
      icon: Sun,
      color: 'text-amber-400',
      activeBorder: 'border-amber-500',
      bg: 'bg-amber-500/10 border-amber-500/30',
      badge: '5.000 Litros/Día',
      desc: 'Sistema de bombeo solar fotovoltaico que capta energía con paneles solares, la almacena en baterías y acciona una electrobomba sumergible para distribuir hasta 5.000 litros diarios hacia bebederos para ganado o sistemas de riego.',
      specDetails: [
        'Generación FV con paneles solares monocristalinos',
        'Banco de baterías de ciclo profundo + Inversor',
        'Distribución activa: hasta 5.000 L/día para bebederos/riego'
      ],
      metric: 'Caudal: 5.000 L/día • Solar + Baterías'
    },
    {
      id: 4,
      title: '5. Protección Ecológica (Cerramiento + 32 Árboles Nativos)',
      shortTitle: '5. Protección Ecológica',
      icon: TreePine,
      color: 'text-emerald-400',
      activeBorder: 'border-emerald-500',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      badge: '32 Árboles Nativos • 4 Hilos',
      desc: 'Cerramiento perimetral con alambre de púas de 4 hilos (de 82 a 240 metros de longitud) y cerca viva protectora con 32 árboles de especies nativas (Cañafistolo, Guácimo, Balso y Cajeto) plantados a una distancia de 3 metros para restaurar el entorno y dar sombra.',
      specDetails: [
        'Cerramiento: Alambre de púas 4 hilos (82 a 240 m)',
        '32 árboles nativos: Cañafistolo, Guácimo, Balso, Cajeto',
        'Siembra a 3.0 m de distancia con aporte de sombra'
      ],
      metric: '32 Árboles @ 3m • Púas 4 Hilos (82-240m)'
    }
  ];

  // Auto-advance loop when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  const active = stages[currentStage];

  return (
    <div className="w-full rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
      
      {/* Top Header & Controls Bar */}
      <div className="px-3.5 py-2.5 bg-slate-900/95 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Simulador Técnico • Cosecha del Agua
          </span>
          <span className="hidden md:inline-block text-[11px] text-slate-400 font-mono">
            (Especificación CPO-12)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Progress Indicator */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 mr-1">
            <span>Fase</span>
            <span className="text-white font-bold">{currentStage + 1}</span>
            <span>de {stages.length}</span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-black shadow-md'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Iniciar Animación</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setCurrentStage(0);
              setIsPlaying(true);
            }}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700 text-xs transition-all"
            title="Reiniciar Simulación"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5 Interactive Phase Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 p-2 bg-slate-900/60 border-b border-slate-800">
        {stages.map((stage, idx) => {
          const isCurrent = currentStage === idx;
          const Icon = stage.icon;
          return (
            <button
              key={stage.id}
              onClick={() => {
                setCurrentStage(idx);
                setIsPlaying(false);
              }}
              className={`p-2 rounded-xl text-left transition-all flex items-center gap-2 border ${
                isCurrent
                  ? `${stage.bg} ring-2 ring-white/20 shadow-lg`
                  : 'bg-slate-900/40 border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isCurrent ? 'bg-white/15' : 'bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${stage.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-[11px] font-black truncate leading-tight ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                  {stage.shortTitle}
                </div>
                <div className="text-[9px] text-slate-400 font-mono truncate mt-0.5">
                  {stage.badge}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Dynamic Stage Canvas: Schematic Section of Cosecha de Agua */}
      <div className="relative h-64 sm:h-76 w-full bg-gradient-to-b from-[#091124] via-[#0d1a33] to-[#10241b] overflow-hidden p-3.5 sm:p-5 flex flex-col justify-between select-none">
        
        {/* Animated Sky Elements */}
        <div className="absolute inset-0 pointer-events-none">
          
          {/* Sun with Glowing Halo */}
          <div className="absolute top-2 right-12 flex items-center justify-center">
            <motion.div
              animate={{
                scale: currentStage === 3 ? [1, 1.25, 1] : [1, 1.1, 1],
                opacity: currentStage === 3 ? [0.8, 1, 0.8] : [0.5, 0.7, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 blur-md opacity-70"
            />
            <Sun className="w-9 h-9 text-amber-300 absolute" />

            {/* Solar Emission Rays to PV panel when stage 3 is active */}
            {currentStage === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.9, 0.3], y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-8 right-6 w-32 h-24 bg-gradient-to-b from-amber-300/40 via-yellow-400/20 to-transparent transform rotate-25 blur-xs"
              />
            )}
          </div>

          {/* Rain / Water Runoff animation on Stage 0 & 1 */}
          {(currentStage === 0 || currentStage === 1) && (
            <div className="absolute inset-0 overflow-hidden opacity-75">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -20, x: `${i * 5}%`, opacity: 0 }}
                  animate={{ y: [0, 160], opacity: [0, 0.85, 0] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: (i % 5) * 0.16,
                    ease: 'linear'
                  }}
                  className="absolute w-0.5 h-3.5 bg-sky-300 rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        {/* TOP CALLOUT: Active Stage Dynamic Overlay Banner */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-black uppercase tracking-wider bg-slate-900/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-md shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Componente Activo: {active.shortTitle}
            </span>
          </div>

          <div className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-black/60 text-slate-300 border border-white/10 backdrop-blur-xs">
            {active.metric}
          </div>
        </div>

        {/* CENTRAL SCHEMATIC CROSS-SECTION (5 Modules) */}
        <div className="relative z-10 w-full h-full flex items-end justify-between gap-1.5 pt-2">
          
          {/* 1. LEFT: Cuneta de Corona en Suelo-Cemento (Sacos 0.1x0.5x0.7m) */}
          <div className={`w-[22%] flex flex-col justify-end transition-all ${currentStage === 0 ? 'scale-[1.03] z-20' : 'opacity-85'}`}>
            <div className="flex items-center gap-1 mb-1">
              <span className={`text-[8.5px] font-mono font-black uppercase px-1.5 py-0.5 rounded border ${
                currentStage === 0 ? 'bg-sky-950 text-sky-300 border-sky-400 shadow-md' : 'bg-slate-900/80 text-slate-400 border-slate-700'
              }`}>
                1. Cuneta Corona
              </span>
            </div>

            <div className="relative h-28 bg-gradient-to-b from-amber-950/70 via-stone-800 to-stone-900 rounded-tl-xl border-t-2 border-l-2 border-stone-500 p-1.5 flex flex-col justify-between shadow-xl">
              <div className="text-[7.5px] font-mono text-amber-200/90 font-bold">
                Sacos Suelo-Cemento
              </div>

              {/* Stack of Suelo-Cemento Bags (0.1 x 0.5 x 0.7 m) */}
              <div className="space-y-0.5 my-1">
                {Array.from({ length: 3 }).map((_, bi) => (
                  <div
                    key={bi}
                    className="h-2.5 bg-gradient-to-r from-stone-400 via-stone-300 to-amber-200 rounded-[2px] border border-stone-600 flex items-center justify-center shadow-xs"
                  >
                    <span className="text-[6.5px] font-mono font-black text-stone-900">
                      0.1×0.5×0.7 m
                    </span>
                  </div>
                ))}
              </div>

              {/* Water Channel Stream */}
              <div className="relative w-full h-4 bg-sky-600/80 rounded-sm overflow-hidden border border-sky-400/60 flex items-center">
                <motion.div
                  animate={{ x: [-20, 60] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="w-6 h-full bg-sky-200/60 transform -skew-x-12"
                />
                <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-white">
                  Escorrentía
                </span>
              </div>
            </div>
          </div>

          {/* 2. CENTER: Reservorio Excavado 10x15m (175m³ exc / 165m³ diques) + HDPE 40 mils */}
          <div className={`w-[36%] px-1 flex flex-col justify-end transition-all ${currentStage === 1 || currentStage === 2 ? 'scale-[1.02] z-20' : 'opacity-90'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[8.5px] font-mono font-black uppercase px-1.5 py-0.5 rounded border ${
                currentStage === 1 ? 'bg-indigo-950 text-indigo-300 border-indigo-400 shadow-md' : 'bg-slate-900/80 text-slate-400 border-slate-700'
              }`}>
                2. Reservorio 10×15m
              </span>
              <span className="text-[7.5px] font-mono text-emerald-400 font-bold">
                HDPE 40 mils (1.0mm)
              </span>
            </div>

            {/* Basin Excavation */}
            <div className="relative h-34 bg-gradient-to-b from-slate-900 via-black to-slate-950 rounded-b-2xl border-x-4 border-b-4 border-slate-950 shadow-2xl p-1 overflow-hidden">
              
              {/* HDPE 40 mils Liner border */}
              <div className="absolute inset-0 border-2 border-indigo-500/60 rounded-b-xl pointer-events-none" />

              {/* Water Body */}
              <motion.div
                animate={{
                  height: currentStage === 0 ? '60%' : currentStage === 1 ? '85%' : '78%'
                }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#001871] via-[#0284c7] to-[#38bdf8] opacity-95 rounded-b-xl overflow-hidden"
              >
                {/* Surface Waves */}
                <motion.div
                  animate={{ x: [-20, 20, -20] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[130%] h-3 bg-sky-200/50 absolute top-0 -left-6 rounded-full blur-[1px]"
                />

                {/* Submersible Pump Assembly with cable */}
                <div className="absolute bottom-2 right-3 flex flex-col items-center">
                  <div className="w-3.5 h-6 bg-slate-950 border border-amber-400 rounded-sm flex items-center justify-center shadow-md">
                    <motion.div
                      animate={{
                        scale: currentStage === 3 ? [1, 1.25, 1] : 1,
                        opacity: currentStage === 3 ? 1 : 0.6
                      }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      <Zap className="w-2.5 h-2.5 text-amber-300" />
                    </motion.div>
                  </div>
                  <span className="text-[5.5px] font-mono text-amber-300 font-black">Electrobomba</span>
                </div>

                {/* 3. Desagüe PVC 3" (20m) Pipe on side */}
                <div className="absolute top-1 left-2 flex items-center gap-1">
                  <div className="w-8 h-2 bg-slate-200 border border-slate-400 rounded-sm shadow-xs flex items-center justify-center">
                    <span className="text-[5px] font-mono font-black text-slate-900">PVC 3"</span>
                  </div>
                  <span className="text-[6px] font-mono text-cyan-200 font-bold">Desagüe 20m</span>
                </div>

                <div className="absolute bottom-1 left-2 text-[7.5px] font-mono text-white font-bold drop-shadow-md">
                  175 m³ Excavación • 165 m³ Diques
                </div>
              </motion.div>

              {/* Compacted Earth Berm Crests */}
              <div className="absolute top-0 inset-x-0 flex justify-between px-1">
                <span className="text-[6.5px] font-mono text-amber-300 font-bold bg-amber-950/80 px-1 rounded">
                  Dique Compactado
                </span>
                <span className="text-[6.5px] font-mono text-amber-300 font-bold bg-amber-950/80 px-1 rounded">
                  Dique Compactado
                </span>
              </div>
            </div>
          </div>

          {/* 3 & 4. RIGHT-CENTER: Bombeo Solar FV + Baterías + Distribución 5.000 L/día */}
          <div className={`w-[22%] flex flex-col justify-end transition-all ${currentStage === 3 ? 'scale-[1.03] z-20' : 'opacity-85'}`}>
            <div className="flex items-center gap-1 mb-1">
              <span className={`text-[8.5px] font-mono font-black uppercase px-1.5 py-0.5 rounded border ${
                currentStage === 3 ? 'bg-amber-950 text-amber-300 border-amber-400 shadow-md' : 'bg-slate-900/80 text-slate-400 border-slate-700'
              }`}>
                4. Bombeo Solar
              </span>
            </div>

            <div className="relative h-32 bg-gradient-to-b from-slate-900/80 via-slate-900 to-amber-950/50 rounded-t-xl border-t-2 border-amber-500/70 p-1.5 flex flex-col justify-between shadow-xl">
              {/* Solar Array Post */}
              <div className="flex flex-col items-center">
                {/* Solar Panel */}
                <motion.div
                  animate={{
                    boxShadow: currentStage === 3
                      ? ['0 0 5px rgba(251,191,36,0.3)', '0 0 16px rgba(251,191,36,0.9)', '0 0 5px rgba(251,191,36,0.3)']
                      : 'none'
                  }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="w-12 h-6 bg-gradient-to-tr from-blue-950 to-blue-800 rounded-xs border border-amber-400 transform -rotate-12 flex items-center justify-center"
                >
                  <div className="grid grid-cols-3 grid-rows-2 gap-0.5 w-full h-full p-0.5">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <div key={idx} className="bg-blue-800 border border-blue-400/40 rounded-[0.5px]" />
                    ))}
                  </div>
                </motion.div>

                {/* Pole & Battery Cabinet */}
                <div className="w-1 h-10 bg-emerald-700 relative mt-0.5">
                  {/* Battery Box with Icon */}
                  <div className="w-4 h-5 bg-slate-950 border border-amber-400 rounded-xs absolute top-2 -right-1.5 flex items-center justify-center shadow-md">
                    <BatteryCharging className="w-2.5 h-2.5 text-amber-300" />
                  </div>
                </div>
              </div>

              {/* Water Output Metric to Livestock Trough */}
              <div className="p-1 rounded bg-amber-500/20 border border-amber-500/40 text-[7px] text-amber-200 text-center font-bold">
                5.000 L/día Distribuidos
              </div>
            </div>
          </div>

          {/* 5. FAR RIGHT: Cerramiento 4 Hilos Púas (82-240m) + 32 Árboles Nativos @ 3m */}
          <div className={`w-[20%] flex flex-col justify-end transition-all ${currentStage === 4 ? 'scale-[1.03] z-20' : 'opacity-85'}`}>
            <div className="flex items-center gap-1 mb-1">
              <span className={`text-[8.5px] font-mono font-black uppercase px-1.5 py-0.5 rounded border ${
                currentStage === 4 ? 'bg-emerald-950 text-emerald-300 border-emerald-400 shadow-md' : 'bg-slate-900/80 text-slate-400 border-slate-700'
              }`}>
                5. Cerramiento & Árboles
              </span>
            </div>

            <div className="relative h-36 bg-gradient-to-b from-emerald-950/80 to-slate-900 rounded-tr-xl border-t-2 border-r-2 border-emerald-500/70 p-1.5 flex flex-col justify-between shadow-xl">
              
              {/* Native Trees: Cañafistolo, Guácimo, Balso, Cajeto */}
              <div className="flex flex-col items-center">
                <div className="flex items-end gap-1">
                  <motion.div
                    animate={{ scale: currentStage === 4 ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <TreePine className="w-7 h-7 text-emerald-400 drop-shadow-md" />
                  </motion.div>
                  <TreePine className="w-5 h-5 text-emerald-500 drop-shadow-md opacity-90" />
                </div>
                <span className="text-[6.5px] font-black text-emerald-300 mt-0.5 text-center leading-tight">
                  32 Árboles @ 3m
                </span>
                <span className="text-[5.5px] text-slate-300 font-mono text-center">
                  Cañafistolo, Guácimo, Balso, Cajeto
                </span>
              </div>

              {/* Barbed Wire 4 Hilos (82 - 240 m) */}
              <div className="p-1 rounded bg-slate-950 border border-slate-700 space-y-0.5">
                <div className="text-[6px] font-mono text-slate-300 flex items-center justify-between">
                  <span>Púas 4 Hilos</span>
                  <span className="text-emerald-400 font-bold">82-240 m</span>
                </div>
                <div className="w-full h-px bg-slate-400 border-t border-dashed border-slate-300" />
                <div className="w-full h-px bg-slate-400 border-t border-dashed border-slate-300" />
                <div className="w-full h-px bg-slate-400 border-t border-dashed border-slate-300" />
                <div className="w-full h-px bg-slate-400 border-t border-dashed border-slate-300" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Detail Footer for the active stage */}
      <div className="p-3.5 bg-slate-900 border-t border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-xl shrink-0 ${active.bg}`}>
            {React.createElement(active.icon, {
              className: `w-5 h-5 ${active.color}`
            })}
          </div>
          <div>
            <div className="font-extrabold text-white flex flex-wrap items-center gap-2">
              <span className="text-sm">{active.title}</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded font-mono font-black bg-white/10 text-emerald-300 border border-emerald-400/30">
                {active.metric}
              </span>
            </div>
            
            <p className="text-slate-200 text-xs mt-1 leading-relaxed">
              {active.desc}
            </p>

            {/* 3 bullet micro-specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 mt-2">
              {active.specDetails.map((spec, sidx) => (
                <div
                  key={sidx}
                  className="flex items-center gap-1 text-[10px] text-slate-300 bg-black/40 px-2 py-0.5 rounded border border-white/5"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Forward / Back Navigation for Stages */}
        <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
          <button
            onClick={() => setCurrentStage((prev) => (prev > 0 ? prev - 1 : stages.length - 1))}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
          >
            ← Anterior
          </button>
          <button
            onClick={() => setCurrentStage((prev) => (prev + 1) % stages.length)}
            className="px-3.5 py-1.5 rounded-lg bg-[#001871] hover:bg-[#002299] text-white font-bold text-xs border border-blue-500/30 transition-all flex items-center gap-1.5 shadow-md active:scale-95"
          >
            <span>Siguiente Fase</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
