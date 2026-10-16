import React from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  Flame,
  Droplets,
  Trees
} from 'lucide-react';

interface Slide1Props {
  onNavigateNext: () => void;
  onNavigateToSlide: (slideNumber: number) => void;
  hiddenSlides?: number[];
}

export const Slide1Portada: React.FC<Slide1Props> = ({ 
  onNavigateNext, 
  onNavigateToSlide,
  hiddenSlides = [4, 10]
}) => {
  const totalDisplaySlides = 12 - hiddenSlides.length;

  return (
    <div className="w-full h-full min-h-[660px] p-4 sm:p-6 lg:p-8 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl flex flex-col justify-between">
      
      {/* Top Header matching corporate slide */}
      <div>
        <div className="flex items-center justify-between gap-4 pb-3 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#001871] text-white shadow-xs">
              Diapositiva 2 de {totalDisplaySlides}
            </span>
            <span className="text-xs sm:text-sm font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-300 font-bold">
              Bloque CPO-12 | LAM 5475
            </span>
            <span className="text-xs sm:text-sm font-mono px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold hidden sm:inline-block">
              Expedientes ANLA &amp; Cormacarena
            </span>
          </div>

          {/* Central Title */}
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#001871] tracking-tight font-display">
              CPO-12: Matriz Consolidada de Obligaciones Ambientales
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
              Licencia Ambiental LAM 5475 (Res. 445/2012) &amp; Cormacarena (Res. 1543/2025) • Estado Técnico-Financiero
            </p>
          </div>

          {/* Frontera Energy Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <svg className="w-7 h-7 text-[#001871]" viewBox="0 0 40 40" fill="currentColor">
                <path d="M4 8 L24 20 L4 32 L12 20 Z" fill="#001871" />
                <path d="M16 8 L36 20 L16 32 L24 20 Z" fill="#E31C79" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-tighter text-[#001871] font-display">FRONTERA</span>
                <span className="text-[9px] tracking-widest text-[#001871] font-bold uppercase">ENERGY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Master Consolidated Obligations Table - High Legibility (Clear large fonts for windowed view) */}
        <div className="overflow-x-auto rounded-xl border-2 border-[#001871] shadow-md mb-4 bg-white">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-[#001871] text-white text-center font-bold text-xs sm:text-sm md:text-base">
                <th className="py-3.5 px-3 sm:px-4 border border-[#001871] w-[15%] uppercase tracking-wide">
                  Autoridad<br />Ambiental
                </th>
                <th className="py-3.5 px-3 sm:px-4 border border-[#001871] w-[14%] uppercase tracking-wide">
                  Obligación
                </th>
                <th className="py-3.5 px-3 sm:px-4 border border-[#001871] w-[14%] uppercase tracking-wide">
                  Cantidad (Ha/$)
                </th>
                <th className="py-3.5 px-4 sm:px-5 border border-[#001871] w-[31%] uppercase tracking-wide">
                  Proyecto / Ejecución
                </th>
                <th className="py-3.5 px-4 sm:px-5 border border-[#001871] w-[26%] uppercase tracking-wide">
                  Estado Actual
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-900 divide-y divide-slate-300">
              
              {/* ========================================================================= */}
              {/* BLOQUE ANLA (LAM 5475) - 7 FILAS TOTAL:                                   */}
              {/* 4 filas de Compensación Forestal + 3 filas de Inversión del 1%             */}
              {/* ========================================================================= */}
              
              {/* --- ANLA COMPENSACIÓN FORESTAL: LOTE 1 --- */}
              <tr className="hover:bg-blue-50/40 transition-colors">
                {/* Spans all 7 ANLA rows */}
                <td
                  rowSpan={7}
                  className="py-4 px-3 sm:px-4 border border-slate-300 font-bold text-slate-800 text-center align-middle bg-slate-50/80 text-sm sm:text-base"
                >
                  <div className="leading-snug">
                    Expediente ANLA<br />
                    <span className="font-mono text-slate-600 font-semibold text-xs sm:text-sm">(LAM 5475)</span>
                  </div>
                </td>

                {/* Spans 4 Compensación Forestal rows */}
                <td
                  rowSpan={4}
                  className="py-3 px-3 sm:px-4 border border-slate-300 font-bold text-slate-900 text-center align-middle bg-white hover:text-[#001871] cursor-pointer text-sm sm:text-base"
                  onClick={() => onNavigateToSlide(8)}
                  title="Clic para ver Escenarios de Compensación Forestal ANLA (Diapositiva 8)"
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center gap-1 text-[#001871]">
                      <Trees className="w-4 h-4 text-emerald-700" />
                      <span>Compensación Forestal</span>
                    </div>
                    <span className="font-extrabold text-sm text-[#001871]">(30 ha)</span>
                    <span className="text-xs text-blue-600 underline font-semibold flex items-center gap-0.5 hover:text-blue-800">
                      Ver D8 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </td>

                {/* Spans Cambio de uso del suelo (Lotes 1, 2 y 3) */}
                <td
                  rowSpan={3}
                  className="py-3 px-3 sm:px-4 border border-slate-300 text-center align-middle bg-slate-50/60 font-medium text-xs sm:text-sm"
                >
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">29,33 ha</div>
                  <div className="text-slate-600 font-medium text-xs sm:text-sm leading-tight mt-0.5">
                    Cambio uso del suelo
                  </div>
                </td>

                {/* Lote 1 */}
                <td className="py-3 px-4 border border-slate-300 text-slate-800 leading-snug text-xs sm:text-sm">
                  <strong className="text-slate-900 text-xs sm:text-sm">Reforestación 10,66 ha</strong> (Lote 1 - Finca La Holanda) /<br />
                  <span className="text-slate-600 font-medium text-xs sm:text-sm">Establecimiento 2018</span>
                </td>

                {/* Estado Actual Lote 1 y 2 (rowSpan 2) */}
                <td
                  rowSpan={2}
                  className="py-3 px-4 border border-slate-300 text-center align-middle bg-emerald-50/30 text-slate-800 leading-snug text-xs sm:text-sm"
                >
                  <div className="font-bold text-emerald-900 mb-1 text-xs sm:text-sm">
                    ✓ Solicitud de cierre
                  </div>
                  <div className="text-slate-700 text-xs sm:text-sm">
                    Rad. <span className="font-mono font-bold text-slate-900">20256200936142</span> del 08 de agosto de 2025,
                  </div>
                  <div className="text-slate-700 font-medium mt-1 text-xs sm:text-sm">
                    reiterado mediante Rad. <span className="font-mono font-bold text-slate-900">20266201199632</span> del 24 de agosto de 2026 y en el último ICA,
                  </div>
                  <div className="text-slate-600 font-semibold italic mt-1 text-xs sm:text-sm">
                    espera de pronunciamiento ANLA
                  </div>
                </td>
              </tr>

              {/* --- ANLA COMPENSACIÓN FORESTAL: LOTE 2 --- */}
              <tr className="hover:bg-blue-50/40 transition-colors">
                <td className="py-3 px-4 border border-slate-300 text-slate-800 leading-snug text-xs sm:text-sm">
                  <strong className="text-slate-900 text-xs sm:text-sm">Reforestación 7,86 ha</strong> (Lote 2 - Finca La Holanda) /<br />
                  <span className="text-slate-600 font-medium text-xs sm:text-sm">Establecimiento 2018</span>
                </td>
              </tr>

              {/* --- ANLA COMPENSACIÓN FORESTAL: LOTE 3 --- */}
              <tr className="hover:bg-blue-50/40 transition-colors">
                <td className="py-3 px-4 border border-slate-300 text-slate-800 leading-snug text-xs sm:text-sm">
                  <strong className="text-slate-900 text-xs sm:text-sm">Reforestación 10,81 ha</strong> (Lote 3 - Finca La Holanda) /<br />
                  <span className="text-slate-600 font-medium text-xs sm:text-sm">Establecimiento 2019</span>
                </td>

                {/* Estado Actual Lote 3 y Lote 4 (rowSpan 2) */}
                <td
                  rowSpan={2}
                  className="py-3 px-4 border border-slate-300 text-slate-800 leading-snug text-xs sm:text-sm bg-amber-50/50"
                >
                  <div className="font-bold text-amber-900 mb-1 text-xs sm:text-sm">
                    ⚠ AA solicitó actividades de mantenimiento
                  </div>
                  <div className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                    (A través del Rad. <span className="font-mono font-bold text-slate-900">20266200858632</span> del 30/06/2026 en respuesta al Acta 394 de 2025 se informó labores de plateo, replanteo y mantenimiento de cerco)
                  </div>
                </td>
              </tr>

              {/* --- ANLA COMPENSACIÓN FORESTAL: LOTE 4 / PAISAJISMO --- */}
              <tr className="hover:bg-blue-50/40 transition-colors">
                <td className="py-3 px-3 sm:px-4 border border-slate-300 text-center align-middle bg-slate-50/60 font-medium text-xs sm:text-sm">
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">1,11 ha</div>
                  <div className="text-slate-600 font-medium text-xs sm:text-sm leading-tight mt-0.5">
                    Afectación paisajística
                  </div>
                </td>

                <td className="py-3 px-4 border border-slate-300 text-slate-800 leading-snug text-xs sm:text-sm">
                  <strong className="text-slate-900 text-xs sm:text-sm">Reforestación 1,11 ha</strong> (Lote 4 - Finca La Holanda) /<br />
                  <span className="text-slate-600 font-medium text-xs sm:text-sm">Establecimiento 2019</span>
                </td>
              </tr>

              {/* ========================================================================= */}
              {/* ANLA - INVERSIÓN FORZOSA DEL 1% (10,0 HA) - LOS 3 LOTES DIVIDIDOS         */}
              {/* Lote 1: Caño Pilón (4,0 ha)                                               */}
              {/* Lote 2: La Fortuna (2,5 ha)                                               */}
              {/* Lote 3: Moriche Solo (3,5 ha)                                             */}
              {/* ========================================================================= */}
              
              {/* --- INVERSIÓN 1%: LOTE 1 (CAÑO PILÓN - 4,0 HA) --- */}
              <tr className="hover:bg-blue-50/40 transition-colors border-t-2 border-[#001871]/40">
                {/* Spans 3 Inversión 1% rows */}
                <td
                  rowSpan={3}
                  className="py-4 px-3 sm:px-4 border border-slate-300 font-bold text-slate-900 text-center align-middle bg-white hover:text-[#001871] cursor-pointer text-sm sm:text-base"
                  onClick={() => onNavigateToSlide(9)}
                  title="Clic para ver Estrategia Inversión 1% ANLA (Diapositiva 9)"
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center gap-1 text-[#001871]">
                      <Droplets className="w-4 h-4 text-blue-700" />
                      <span>Inversión del 1%</span>
                    </div>
                    <span className="font-extrabold text-sm text-[#001871]">(10 ha)</span>
                    <span className="text-xs text-blue-600 underline font-semibold flex items-center gap-0.5 hover:text-blue-800">
                      Ver D9 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </td>

                {/* Cantidad Lote 1 */}
                <td className="py-3 px-3 sm:px-4 border border-slate-300 text-center align-middle bg-slate-50/60 text-xs sm:text-sm">
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">4,00 ha</div>
                  <div className="text-slate-600 font-semibold text-xs sm:text-sm">Cuenca Caño Pilón</div>
                </td>

                {/* Proyecto Lote 1 */}
                <td className="py-3 px-4 border border-slate-300 text-slate-800 leading-snug text-xs sm:text-sm">
                  <strong className="text-slate-900 text-xs sm:text-sm">Reforestación 4,00 ha</strong> (Finca La Holanda) /<br />
                  <span className="text-slate-600 font-medium text-xs sm:text-sm">Establecimiento 2019 (Aislamiento y siembra)</span>
                </td>

                {/* Estado Actual Lote 1 */}
                <td className="py-3 px-4 border border-slate-300 text-center align-middle bg-emerald-50/30 text-slate-800 leading-snug text-xs sm:text-sm">
                  <div className="font-bold text-emerald-900 mb-0.5 text-xs sm:text-sm">
                    ✓ Actividades concluidas
                  </div>
                  <div className="text-slate-700 text-xs sm:text-sm">
                    Siembra 2019 y mantenimientos 2021–2023 concluidos.
                  </div>
                  <div className="text-slate-800 font-semibold mt-1 text-xs sm:text-sm">
                    En consolidación para proyección de solicitud de cierre parcial ante ANLA (NDVI &gt; 0.65).
                  </div>
                </td>
              </tr>

              {/* --- INVERSIÓN 1%: LOTE 2 (LA FORTUNA - 2,5 HA) --- */}
              <tr className="hover:bg-blue-50/40 transition-colors">
                {/* Cantidad Lote 2 */}
                <td className="py-3 px-3 sm:px-4 border border-slate-300 text-center align-middle bg-slate-50/60 text-xs sm:text-sm">
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">2,50 ha</div>
                  <div className="text-slate-600 font-semibold text-xs sm:text-sm">Cuenca Río Planas</div>
                </td>

                {/* Proyecto Lote 2 */}
                <td className="py-3 px-4 border border-slate-300 text-slate-800 leading-snug text-xs sm:text-sm">
                  <strong className="text-slate-900 text-xs sm:text-sm">Reforestación 2,50 ha</strong> (Finca La Fortuna) /<br />
                  <span className="text-slate-600 font-medium text-xs sm:text-sm">Establecimiento 2021 (Acogimiento Art. 321 PND)</span>
                </td>

                {/* Estado Actual Lotes 2 y 3 (rowSpan 2 para las 6,0 ha siniestradas por incendios) */}
                <td
                  rowSpan={2}
                  className="py-3 px-4 border border-slate-300 text-center align-middle bg-rose-50/40 text-slate-800 leading-snug text-xs sm:text-sm"
                >
                  <div className="flex items-center justify-center gap-1 font-bold text-rose-900 mb-1 text-xs sm:text-sm">
                    <Flame className="w-3.5 h-3.5 text-rose-600" />
                    <span>Siniestro por incendios forestales (6,0 ha)</span>
                  </div>
                  <div className="text-slate-700 text-xs sm:text-sm">
                    Pérdida de cobertura por quemas externas en sabana.
                  </div>
                  <div className="text-slate-800 font-semibold mt-1 text-xs sm:text-sm">
                    Inventario forestal en curso; se proyecta solicitud formal de cambio de medida a <strong className="text-[#001871]">Cosecha de Agua</strong> y activación de garantía/póliza con contratista.
                  </div>
                </td>
              </tr>

              {/* --- INVERSIÓN 1%: LOTE 3 (MORICHE SOLO - 3,5 HA) --- */}
              <tr className="hover:bg-blue-50/40 transition-colors">
                {/* Cantidad Lote 3 */}
                <td className="py-3 px-3 sm:px-4 border border-slate-300 text-center align-middle bg-slate-50/60 text-xs sm:text-sm">
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">3,50 ha</div>
                  <div className="text-slate-600 font-semibold text-xs sm:text-sm">Cuenca Río Melúa</div>
                </td>

                {/* Proyecto Lote 3 */}
                <td className="py-3 px-4 border border-slate-300 text-slate-800 leading-snug text-xs sm:text-sm">
                  <strong className="text-slate-900 text-xs sm:text-sm">Reforestación 3,50 ha</strong> (Predio Moriche Solo) /<br />
                  <span className="text-slate-600 font-medium text-xs sm:text-sm">Establecimiento 2021 (Acogimiento Art. 321 PND)</span>
                </td>
              </tr>

              {/* ========================================================================= */}
              {/* EXPEDIENTE CORMACARENA (PM-GA.3.37.09.028)                                */}
              {/* ========================================================================= */}
              <tr className="hover:bg-blue-50/40 transition-colors border-t-2 border-[#001871]">
                <td className="py-4 px-3 sm:px-4 border border-slate-300 font-bold text-slate-800 text-center align-middle bg-slate-50/80 text-sm sm:text-base">
                  <div className="leading-snug uppercase">
                    EXPEDIENTE<br />CORMACARENA
                  </div>
                </td>

                <td
                  className="py-3 px-3 sm:px-4 border border-slate-300 font-bold text-slate-900 text-center align-middle bg-white hover:text-[#001871] cursor-pointer text-sm sm:text-base"
                  onClick={() => onNavigateToSlide(11)}
                  title="Ver detalle de Compensación Cormacarena (Diapositiva 11)"
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="font-bold">Compensación</span>
                    <span className="text-xs text-blue-600 underline font-semibold flex items-center gap-0.5 hover:text-blue-800">
                      Ver D11 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </td>

                <td className="py-3 px-3 sm:px-4 border border-slate-300 text-center align-middle bg-slate-50/60 font-bold text-slate-900 text-sm sm:text-base">
                  <div className="font-extrabold text-slate-900">4 reservorios</div>
                </td>

                <td className="py-3 px-4 border border-slate-300 text-slate-800 leading-snug text-xs sm:text-sm">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    Por quema, se cambió a Cosecha del agua (4 reservorios)
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                    PM.GA.3.44.25.1543 del 20 de agosto de 2025
                  </div>
                </td>

                <td className="py-3 px-4 border border-slate-300 text-slate-800 leading-snug text-xs sm:text-sm bg-emerald-50/40">
                  <div className="font-bold text-emerald-900 text-xs sm:text-sm">
                    ✓ Aprobado por AA • Proyecto formulado y a radicar en la fecha establecida.
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                    Hito de radicación: <strong className="text-[#001871]">29 de agosto de 2026</strong>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>

      {/* Bottom Footer Bar */}
      <div className="mt-4 pt-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-700">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#001871] shrink-0" />
          <span className="font-medium">
            Fuente: Frontera Energy Colombia Corp. | Dirección de Gestión Ambiental &amp; Cumplimiento
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateToSlide(1)}
            className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold transition-all text-xs sm:text-sm shadow-2xs"
          >
            ← D1: Resumen de Expedientes
          </button>

          <button
            onClick={() => onNavigateToSlide(3)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#E31C79] hover:bg-[#c21465] text-white shadow transition-all active:scale-95"
          >
            <span>Continuar a Proceso Sancionatorio ANLA (D3)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
