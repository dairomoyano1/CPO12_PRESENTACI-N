import React from 'react';
import { 
  AlertTriangle, 
  ArrowRight, 
  ChevronLeft, 
  ShieldCheck, 
  Scale 
} from 'lucide-react';
import { SANCTION_PROCESS_ANLA } from '../data/presentationData';

interface Slide3SancionatorioANLAProps {
  onNavigateNext?: () => void;
  onNavigateToSlide: (slideNumber: number) => void;
  hiddenSlides?: number[];
}

export const Slide3SancionatorioANLA: React.FC<Slide3SancionatorioANLAProps> = ({
  onNavigateNext,
  onNavigateToSlide,
  hiddenSlides = [4, 10],
}) => {
  const isD4Hidden = hiddenSlides.includes(4);
  const totalDisplaySlides = 12 - hiddenSlides.length;

  return (
    <div className="w-full h-full min-h-[660px] p-4 sm:p-6 lg:p-8 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-xl flex flex-col justify-between">
      
      {/* Top Header - Corporate identity Frontera Energy */}
      <div>
        <div className="flex items-center justify-between gap-4 pb-3 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#E31C79] text-white shadow-xs">
              Diapositiva 3 de {totalDisplaySlides}
            </span>
            <span className="text-xs sm:text-sm font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-300 font-bold">
              Bloque CPO-12 | LAM 5475
            </span>
            <span className="text-xs sm:text-sm font-mono px-2.5 py-1 rounded bg-rose-50 text-rose-800 border border-rose-300 font-bold">
              Exp. SAN0002-00-2018
            </span>
          </div>

          {/* Central Title */}
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#001871] tracking-tight font-display">
              Proceso Sancionatorio Ambiental ANLA
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
              Expediente SAN0002-00-2018 • Derivado de LAM 5475 (Res. 445 de 2012)
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

        {/* Sub-header / Badge ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 px-4 py-3 bg-gradient-to-r from-rose-50 via-slate-50 to-blue-50 rounded-xl border border-rose-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E31C79] text-white flex items-center justify-center shrink-0 shadow-xs">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xs sm:text-sm md:text-base font-black uppercase tracking-wider text-[#001871] block">
                Cuadro Oficial de Contingencia Sancionatoria — ANLA
              </span>
              <span className="text-xs sm:text-sm text-slate-600 font-medium">
                Matriz Corporativa de Procesos Sancionatorios Ambientales • Régimen Ley 1333 de 2009
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 font-bold shadow-2xs">
              <Scale className="w-4 h-4 text-indigo-700" />
              Autoridad: ANLA
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#fed7d7] text-rose-950 border border-rose-300 text-xs sm:text-sm font-black shadow-2xs">
              Riesgo: {SANCTION_PROCESS_ANLA.valoracionRiesgo} {SANCTION_PROCESS_ANLA.riesgoRango}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TABLA OFICIAL SEGÚN IMAGEN CORPORATIVA (7 COLUMNAS EXACTAS)               */}
        {/* High legibility fonts for windowed / non-fullscreen mode                  */}
        {/* ========================================================================= */}
        <div className="overflow-x-auto rounded-xl border-2 border-slate-300 shadow-lg bg-white my-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-[#001871] text-white text-center font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase">
                <th className="py-4 px-3 sm:px-4 border border-slate-700 w-[13%] leading-snug">
                  COD.<br />EXPEDIENTE
                </th>
                <th className="py-4 px-3 sm:px-4 border border-slate-700 w-[11%] leading-snug">
                  FECHA DE<br />NOTIFICACIÓN
                </th>
                <th className="py-4 px-4 sm:px-6 border border-slate-700 w-[36%] leading-snug">
                  CARGOS FORMULADOS
                </th>
                <th className="py-4 px-3 sm:px-4 border border-slate-700 w-[14%] leading-snug">
                  VALORACIÓN DEL<br />RIESGO DE MULTA
                </th>
                <th className="py-4 px-3 sm:px-4 border border-slate-700 w-[13%] leading-snug">
                  VALOR MULTA<br />EN COP
                </th>
                <th className="py-4 px-3 sm:px-4 border border-slate-700 w-[7%] leading-snug">
                  VALOR MULTA<br />EN USD
                </th>
                <th className="py-4 px-3 sm:px-4 border border-slate-700 w-[8%] leading-snug">
                  ETAPA<br />PROCESAL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300 text-slate-800">
              <tr className="hover:bg-slate-50/80 transition-colors">
                
                {/* 1. Cod Expediente */}
                <td className="py-6 px-3 sm:px-4 border border-slate-300 text-center align-middle">
                  <div className="font-mono font-black text-sm sm:text-base text-[#001871] tracking-tight">
                    {SANCTION_PROCESS_ANLA.codExpediente}
                  </div>
                  <div className="mt-2">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs">
                      {SANCTION_PROCESS_ANLA.derivadoDe}
                    </span>
                  </div>
                </td>

                {/* 2. Fecha Notificación */}
                <td className="py-6 px-3 sm:px-4 border border-slate-300 font-mono text-center text-xs sm:text-sm text-slate-800 align-middle">
                  <div className="font-bold text-sm sm:text-base">{SANCTION_PROCESS_ANLA.fechaNotificacion}</div>
                  <div className="text-xs text-slate-600 font-sans mt-1">
                    {SANCTION_PROCESS_ANLA.fechaNotificacionCompleta}
                  </div>
                </td>

                {/* 3. Cargos Formulados */}
                <td className="py-6 px-4 sm:px-6 border border-slate-300 text-xs sm:text-sm text-slate-800 leading-relaxed align-middle">
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {SANCTION_PROCESS_ANLA.cargosFormulados}
                  </p>
                </td>

                {/* 4. Valoración del Riesgo de Multa (Pink/salmon background matching image) */}
                <td className="py-6 px-3 sm:px-4 border border-slate-300 text-center align-middle bg-[#fed7d7] text-rose-950">
                  <div className="font-black text-sm sm:text-base tracking-wide uppercase">
                    {SANCTION_PROCESS_ANLA.valoracionRiesgo}
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-rose-900 mt-1 font-mono">
                    {SANCTION_PROCESS_ANLA.riesgoRango}
                  </div>
                </td>

                {/* 5. Valor Multa en COP */}
                <td className="py-6 px-3 sm:px-4 border border-slate-300 font-mono font-black text-center text-xs sm:text-sm md:text-base text-slate-900 align-middle">
                  <span className="text-[#001871]">{SANCTION_PROCESS_ANLA.valorMultaCopFormatted}</span>
                </td>

                {/* 6. Valor Multa en USD */}
                <td className="py-6 px-3 sm:px-4 border border-slate-300 font-mono font-black text-center text-xs sm:text-sm md:text-base text-slate-800 align-middle">
                  <span>{SANCTION_PROCESS_ANLA.valorMultaUsdFormatted}</span>
                </td>

                {/* 7. Etapa Procesal */}
                <td className="py-6 px-3 sm:px-4 border border-slate-300 text-center align-middle text-xs sm:text-sm font-bold text-slate-900">
                  <span className="inline-block px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold text-xs sm:text-sm shadow-2xs">
                    {SANCTION_PROCESS_ANLA.etapaProcesal}
                  </span>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* Bottom Footer Bar */}
      <div className="mt-6 pt-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-700">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#001871] shrink-0" />
          <span className="font-medium">
            Fuente: Cuadro Corporativo de Procesos Sancionatorios Ambientales • Frontera Energy Colombia Corp.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateToSlide(2)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold transition-all text-xs sm:text-sm shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>D2: Matriz Consolidada</span>
          </button>

          <button
            onClick={() => onNavigateToSlide(isD4Hidden ? 5 : 4)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#001871] hover:bg-[#002299] text-white shadow transition-all active:scale-95"
          >
            <span>
              {isD4Hidden 
                ? 'Continuar a Línea de Tiempo de Actividades (D5)' 
                : 'Continuar a Cronograma ANLA (D4)'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
