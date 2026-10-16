import React from 'react';
import { 
  FolderKanban, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Trees, 
  Droplets, 
  Sun, 
  Calendar,
  ChevronRight,
  ListOrdered,
  FileSpreadsheet,
  Clock,
  Activity,
  Satellite,
  Compass,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

interface Slide0Props {
  onNavigateToSlide: (slideNumber: number) => void;
  onNavigateNext: () => void;
  hiddenSlides?: number[];
}

export const Slide0ResumenExpedientes: React.FC<Slide0Props> = ({ 
  onNavigateToSlide, 
  onNavigateNext,
  hiddenSlides = [4, 10]
}) => {
  const allAgendaItems = [
    { num: '01', title: 'Resumen de Expedientes', slide: 1, desc: 'Marco legal y agenda ejecutiva' },
    { num: '02', title: 'Matriz Consolidada de Obligaciones', slide: 2, desc: 'Tabla maestra ANLA vs. Cormacarena' },
    { num: '03', title: 'Proceso Sancionatorio ANLA', slide: 3, desc: 'Expediente SAN0002-00-2018 (LAM 5475)' },
    { num: '04', title: 'Cronograma y Radicaciones ANLA', slide: 4, desc: 'Trazabilidad histórica Contrato 9800002571' },
    { num: '05', title: 'Línea de Tiempo de Actividades', slide: 5, desc: 'Establecimiento y mantenimientos 2017-2026' },
    { num: '06', title: 'Monitoreo Satelital y Cartografía', slide: 6, desc: 'Análisis de vigor vegetal y coordenadas' },
    { num: '07', title: 'Inventario Forestal en Campo', slide: 7, desc: 'Verificación de biomasa y supervivencia' },
    { num: '08', title: 'Escenarios de Compensación Forestal', slide: 8, desc: 'Costos, hectáreas y plazos de cierre ANLA' },
    { num: '09', title: 'Escenarios de Inversión del 1%', slide: 9, desc: 'Costos, plazos y escenarios de cierre del 1%' },
    { num: '10', title: 'Matriz Integrada de Costos Totales', slide: 10, desc: 'Simulador combinado Comp. + 1% ($ COP)' },
    { num: '11', title: 'Sustitución ante Cormacarena', slide: 11, desc: 'Transición regulatoria a Cosecha de Agua' },
    { num: '12', title: 'Ingeniería y Presupuesto Cosecha', slide: 12, desc: 'Planos constructivos, bombeo solar y costos' },
  ];

  const agendaItems = allAgendaItems.filter((item) => !hiddenSlides.includes(item.slide));

  return (
    <div className="w-full h-full min-h-[640px] p-5 sm:p-7 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl flex flex-col justify-between">
      
      {/* Top Header: Branding + Simple Fecha */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-[#001871] text-white shadow-xs">
              <FolderKanban className="w-3.5 h-3.5 text-[#E31C79]" />
              Bloque CPO-12
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Fecha Simple y Limpia */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50/80 rounded-lg border border-blue-200 text-xs font-semibold text-[#001871]">
              <Calendar className="w-3.5 h-3.5 text-[#001871]" />
              <span>Agosto 2026</span>
            </div>

            {/* Logo Frontera Energy */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg border border-slate-200">
              <svg className="w-5 h-5 text-[#001871]" viewBox="0 0 40 40" fill="currentColor">
                <path d="M4 8 L24 20 L4 32 L12 20 Z" fill="#001871" />
                <path d="M16 8 L36 20 L16 32 L24 20 Z" fill="#E31C79" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-black tracking-tighter text-[#001871] font-display">FRONTERA</span>
                <span className="text-[7px] tracking-widest text-[#001871] font-bold uppercase">ENERGY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Título Principal */}
        <div className="mb-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#001871] tracking-tight font-display">
            Diagnóstico de Cumplimiento Ambiental &amp; Hoja de Ruta de Inversiones
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Resumen de expedientes, estado de obligaciones de compensación e inversión del 1% y contenido temático.
          </p>
        </div>

        {/* CONTENIDO PRINCIPAL: 2 Expedientes (Izquierda) + Índice Temático (Derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* COLUMNA IZQUIERDA: RESUMEN DE LOS 2 EXPEDIENTES (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            
            {/* 1. EXPEDIENTE ANLA: LAM 5475 */}
            <div className="p-3.5 rounded-xl border-2 border-[#001871]/30 bg-blue-50/30 hover:border-[#001871] transition-all">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200/80 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#001871] text-white flex items-center justify-center text-[10px] font-black">
                    ANLA
                  </div>
                  <div>
                    <h2 className="text-xs font-black text-[#001871] font-display">
                      Expediente LAM 5475
                    </h2>
                    <p className="text-[10px] text-slate-500 font-mono">Res. 445 de 2012 • Nivel Nacional</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-300">
                  40,44 Ha Totales
                </span>
              </div>

              {/* 3 Obligaciones ANLA */}
              <div className="space-y-2 text-xs">
                {/* 1.1 Compensación Forestal */}
                <div 
                  onClick={() => onNavigateToSlide(8)}
                  className="p-2 bg-white rounded-lg border border-slate-200 hover:border-[#001871] hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Trees className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block text-[11px]">Compensación Forestal (30,44 Ha)</span>
                      <span className="text-[10px] text-slate-500">Lotes 1-2 (18,5 Ha en cierre) | Lotes 3-4 (11,9 Ha)</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                </div>

                {/* 1.2 Inversión 1% */}
                <div 
                  onClick={() => onNavigateToSlide(9)}
                  className="p-2 bg-white rounded-lg border border-slate-200 hover:border-amber-600 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-700 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block text-[11px]">Inversión Forzosa del 1% (10,0 Ha)</span>
                      <span className="text-[10px] text-slate-500">Base: $257,5 M vs. Ejecutado: $277,8 M</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                </div>

                {/* 1.3 Proceso Sancionatorio ANLA */}
                <div 
                  onClick={() => onNavigateToSlide(3)}
                  className="p-2 bg-white rounded-lg border border-rose-200 hover:border-rose-500 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block text-[11px]">Proceso Sancionatorio (SAN0002)</span>
                      <span className="text-[10px] text-slate-500">Riesgo Probable: $282,3 M • Decreto de Pruebas</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                </div>
              </div>
            </div>

            {/* 2. EXPEDIENTE CORMACARENA: PM-GA.3.37.09.028 */}
            <div className="p-3.5 rounded-xl border-2 border-[#658728]/40 bg-emerald-50/30 hover:border-[#658728] transition-all">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200/80 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#658728] text-white flex items-center justify-center text-[10px] font-black">
                    CAR
                  </div>
                  <div>
                    <h2 className="text-xs font-black text-[#658728] font-display">
                      Expediente PM-GA.3.37.09.028
                    </h2>
                    <p className="text-[10px] text-slate-500 font-mono">Cormacarena • Nivel Regional</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                  4 Reservorios
                </span>
              </div>

              {/* Obligación Cormacarena */}
              <div 
                onClick={() => onNavigateToSlide(11)}
                className="p-2 bg-white rounded-lg border border-slate-200 hover:border-[#658728] hover:shadow-xs transition-all cursor-pointer flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block text-[11px]">Sustitución a Cosecha del Agua</span>
                    <span className="text-[10px] text-slate-500">4 Reservorios HDPE (1.0 mm) • $480,8 M COP</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#658728] shrink-0" />
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: ÍNDICE / TABLA DE CONTENIDO DE LA PRESENTACIÓN (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <ListOrdered className="w-4 h-4 text-[#001871]" />
                <span>Índice Temático de la Presentación</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">{agendaItems.length} Diapositivas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {agendaItems.map((item) => (
                <div
                  key={item.num}
                  onClick={() => onNavigateToSlide(item.slide)}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-[#001871] hover:bg-blue-50/40 transition-all cursor-pointer group flex items-start gap-2 shadow-2xs"
                >
                  <span className="w-5 h-5 rounded bg-slate-100 group-hover:bg-[#001871] group-hover:text-white text-[#001871] font-mono font-bold text-[10px] flex items-center justify-center shrink-0 transition-colors">
                    {item.num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[11px] font-bold text-slate-900 group-hover:text-[#001871] truncate transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[9px] text-slate-500 truncate leading-tight">
                      {item.desc}
                    </p>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-[#001871] shrink-0 self-center transition-colors" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Footer y Botón de Inicio */}
      <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#001871]" />
          <span>
            Expedientes: <strong>LAM 5475 (ANLA)</strong> &amp; <strong>PM-GA.3.37.09.028 (Cormacarena)</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToSlide(2)}
            className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold transition-all text-xs"
          >
            Ver Matriz Consolidada (D2)
          </button>
          
          <button
            onClick={onNavigateNext}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-bold bg-[#001871] hover:bg-[#002299] text-white shadow-md transition-all active:scale-95 text-xs"
          >
            <span>Iniciar Presentación</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
