import React, { useState } from 'react';
import { 
  FileText, 
  ClipboardCheck, 
  Sprout, 
  Scale, 
  Trees, 
  Search, 
  Handshake, 
  Calendar, 
  Settings, 
  FileEdit, 
  AlertTriangle, 
  FileX, 
  Flag, 
  Users, 
  Link, 
  CheckSquare, 
  MapPin, 
  Mail, 
  Gavel, 
  UserCheck, 
  UserPlus, 
  Info,
  ChevronRight,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Slide5LineaTiempoANLA: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<{
    track: string;
    title: string;
    date: string;
    content: string[];
    highlight?: string;
  } | null>(null);

  return (
    <div className="w-full h-full min-h-[640px] p-4 sm:p-6 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl flex flex-col justify-between space-y-4">
      
      {/* Header matching corporate style */}
      <div>
        <div className="text-center pb-3 border-b border-slate-200 relative">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#001871] text-white">
              Diapositiva 4
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300 font-semibold">
              Expediente ANLA LAM5475
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="text-xl text-emerald-800">🌿</span>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#001871] tracking-tight font-display uppercase">
                Línea de Tiempo
              </h1>
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#001871] font-display">
                CPO-12 – CONTRATO 9800002571
              </h2>
            </div>
            <span className="text-xl text-emerald-800">🌿</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
            Expediente LAM5475 – Compensación e Inversión del 1 %
          </p>
        </div>

        {/* 4 Tracks Container */}
        <div className="space-y-3.5 mt-3 text-xs">

          {/* ========================================================================= */}
          {/* 1. OBLIGACIONES Y PRONUNCIAMIENTOS ANLA */}
          {/* ========================================================================= */}
          <div className="rounded-xl border border-[#001871]/40 overflow-hidden shadow-xs bg-white">
            {/* Track Header Pill */}
            <div className="bg-[#001871] text-white px-3 py-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white text-[#001871] font-black text-xs flex items-center justify-center shrink-0">
                1.
              </span>
              <span className="font-bold text-xs uppercase tracking-wider">
                Obligaciones y Pronunciamientos ANLA
              </span>
            </div>

            {/* Nodes Container */}
            <div className="p-3 bg-gradient-to-b from-blue-50/20 to-white overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-3 min-w-[840px] relative">
                
                {/* Connector line behind circles on desktop */}
                <div className="hidden md:block absolute top-4 left-6 right-6 h-0.5 bg-blue-200 -z-0" />

                {/* Node 1: 2012 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '1. Obligaciones y Pronunciamientos ANLA',
                    title: 'Licencia Ambiental y Medidas Iniciales',
                    date: '2012',
                    content: [
                      'Se otorga la Licencia Ambiental mediante Resolución 445 de 2012 (LAM5475).',
                      'Se aprueba transitoriamente el plan de inversión del 1 %.',
                      'Se establece la medida de compensación.'
                    ]
                  })}
                  className="relative z-10 flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#001871] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-1.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-slate-900 text-xs font-display mb-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    2012
                  </div>
                  <ul className="text-[11px] text-slate-700 text-left space-y-1 bg-white p-2 rounded border border-slate-200 shadow-2xs w-full">
                    <li className="leading-snug">• Se otorga la Licencia Ambiental mediante <strong>Resolución 445 de 2012</strong> (LAM5475).</li>
                    <li className="leading-snug">• Se aprueba transitoriamente el plan de inversión del 1 %.</li>
                    <li className="leading-snug">• Se establece la medida de compensación.</li>
                  </ul>
                </div>

                {/* Node 2: 2017 - 2018 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '1. Obligaciones y Pronunciamientos ANLA',
                    title: 'Aprobación Planes de Compensación e Inversión',
                    date: '2017 – 2018',
                    content: [
                      '2017: ANLA acepta Plan de compensación mediante Auto 3314 de 2017.',
                      '2018: ANLA aprueba reforestación protectora del Plan de inversión del 1 % mediante Auto 6534 de 2018.'
                    ]
                  })}
                  className="relative z-10 flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#001871] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-1.5">
                    <ClipboardCheck className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-slate-900 text-xs font-display mb-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    2017 – 2018
                  </div>
                  <ul className="text-[11px] text-slate-700 text-left space-y-1 bg-white p-2 rounded border border-slate-200 shadow-2xs w-full">
                    <li className="leading-snug">• <strong>2017</strong>: ANLA acepta Plan de compensación mediante <strong>Auto 3314 de 2017</strong>.</li>
                    <li className="leading-snug">• <strong>2018</strong>: ANLA aprueba reforestación protectora del Plan de inversión del 1 % mediante <strong>Auto 6534 de 2018</strong>.</li>
                  </ul>
                </div>

                {/* Node 3: 2018 - 2019 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '1. Obligaciones y Pronunciamientos ANLA',
                    title: 'Establecimiento Predio La Holanda',
                    date: '2018 – 2019',
                    content: [
                      'Establecimiento de 4 ha de inversión del 1 % en el predio La Holanda (Cuenca Caño Pilón).'
                    ]
                  })}
                  className="relative z-10 flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#001871] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-1.5">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-slate-900 text-xs font-display mb-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    2018 – 2019
                  </div>
                  <ul className="text-[11px] text-slate-700 text-left space-y-1 bg-white p-2 rounded border border-slate-200 shadow-2xs w-full">
                    <li className="leading-snug">• Establecimiento de <strong>4 ha de inversión del 1 %</strong> en el predio <strong>La Holanda</strong>.</li>
                  </ul>
                </div>

                {/* Node 4: 2020 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '1. Obligaciones y Pronunciamientos ANLA',
                    title: 'Acogimiento a Ley 1955 y Resolución 1701',
                    date: '2020',
                    content: [
                      'ANLA aprueba acogimiento al artículo 321 de la Ley 1955 del 25 de mayo del 2019.',
                      'Se indican las líneas de inversión y se realizan requerimientos mediante Resolución 1701 de 2020.'
                    ]
                  })}
                  className="relative z-10 flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#001871] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-1.5">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-slate-900 text-xs font-display mb-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    2020
                  </div>
                  <ul className="text-[11px] text-slate-700 text-left space-y-1 bg-white p-2 rounded border border-slate-200 shadow-2xs w-full">
                    <li className="leading-snug">• ANLA aprueba acogimiento al <strong>artículo 321 de la Ley 1955</strong> del 25 de mayo del 2019.</li>
                    <li className="leading-snug">• Se indican líneas de inversión y requerimientos mediante <strong>Resolución 1701 de 2020</strong>.</li>
                  </ul>
                </div>

                {/* Node 5: 2020 - 2025 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '1. Obligaciones y Pronunciamientos ANLA',
                    title: 'Ejecución Progresiva y Mantenimientos',
                    date: '2020 – 2025',
                    content: [
                      'Ejecución progresiva de los mantenimientos de las áreas de compensación e inversión del 1 %, años 1, 2 y 3 para las áreas inicialmente establecidas (20 ha y 10,4 ha de compensación así como 4 ha de inversión).',
                      'En 2021 se establecen 3,5 ha (Moriche Solo) y 2,5 ha (La Fortuna), continuando sus mantenimientos durante 2022–2024.',
                      'En 2025 solo garantía de las 6 ha de 1 % con fallas técnicas y actividades pendientes.'
                    ]
                  })}
                  className="relative z-10 flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#001871] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-1.5">
                    <Trees className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-slate-900 text-xs font-display mb-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    2020 – 2025
                  </div>
                  <ul className="text-[10px] text-slate-700 text-left space-y-1 bg-white p-2 rounded border border-slate-200 shadow-2xs w-full">
                    <li className="leading-tight">• Mantenimientos progresivos años 1, 2 y 3 (20 ha + 10,4 ha compensación y 4 ha inversión).</li>
                    <li className="leading-tight">• En 2021 se establecen 3,5 ha (Moriche Solo) y 2,5 ha (La Fortuna), mantenimientos 2022–2024.</li>
                    <li className="leading-tight font-semibold text-amber-900">• En 2025 solo garantía de las 6 ha de 1% con fallas técnicas y pendientes.</li>
                  </ul>
                </div>

                {/* Node 6: Seguimiento ANLA (Separated by border) */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '1. Obligaciones y Pronunciamientos ANLA',
                    title: 'Seguimiento ANLA y Actas de Control',
                    date: '2020 – 2025 Seguimiento ANLA',
                    content: [
                      'Acta 209 de 2020.',
                      'Acta 745 de 2021.',
                      'Acta 959 de 2022.',
                      'Acta 464 de 2024.',
                      'Acta 394 de 2025.',
                      'La ANLA realiza seguimiento a las áreas de compensación e inversión del 1 %, requiriendo alturas mínimas del material vegetal, mantenimientos y atención de observaciones.'
                    ]
                  })}
                  className="relative z-10 flex flex-col items-center text-center group cursor-pointer border-l-2 border-dashed border-blue-300 pl-2"
                >
                  <div className="w-8 h-8 rounded-full bg-[#001871] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-1.5">
                    <Search className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-slate-900 text-[11px] font-display mb-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 leading-tight">
                    2020 – 2025<br />
                    <span className="text-[10px] text-[#001871] font-bold">Seguimiento ANLA</span>
                  </div>
                  <div className="text-[10px] text-slate-700 text-left bg-white p-2 rounded border border-slate-200 shadow-2xs w-full space-y-0.5">
                    <div className="grid grid-cols-2 gap-0.5 font-mono text-[9px] text-slate-800 font-semibold mb-1">
                      <span>• Acta 209 (2020)</span>
                      <span>• Acta 745 (2021)</span>
                      <span>• Acta 959 (2022)</span>
                      <span>• Acta 464 (2024)</span>
                      <span className="col-span-2 text-[#E31C79] font-bold">• Acta 394 de 2025</span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-tight border-t border-slate-100 pt-1">
                      ANLA requiere alturas mínimas del material vegetal, mantenimientos y atención de observaciones.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. ACTUACIONES CONTRACTUALES */}
          {/* ========================================================================= */}
          <div className="rounded-xl border border-emerald-700/40 overflow-hidden shadow-xs bg-white">
            {/* Track Header Pill */}
            <div className="bg-emerald-800 text-white px-3 py-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white text-emerald-800 font-black text-xs flex items-center justify-center shrink-0">
                2.
              </span>
              <span className="font-bold text-xs uppercase tracking-wider">
                Actuaciones Contractuales
              </span>
            </div>

            {/* Nodes Container */}
            <div className="p-3 bg-gradient-to-b from-emerald-50/20 to-white overflow-x-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 min-w-[840px]">
                
                {/* Contract Initial */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '2. Actuaciones Contractuales',
                    title: 'Inicio Contrato 9800002571',
                    date: '02 de noviembre de 2017',
                    content: [
                      'Contrato 9800002571.',
                      'Fecha de inicio: 02 de noviembre de 2017.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-emerald-200 bg-white hover:border-emerald-500 cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-emerald-900 font-bold text-xs">
                    <div className="p-1 rounded-full bg-emerald-800 text-white">
                      <Handshake className="w-3.5 h-3.5" />
                    </div>
                    <span>Contrato 9800002571</span>
                  </div>
                  <div className="text-[11px] text-slate-800 flex items-center gap-1 font-semibold">
                    <Calendar className="w-3 h-3 text-emerald-700" />
                    <span>02 de noviembre de 2017</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Fecha de inicio.</div>
                </div>

                {/* Ejecucion */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '2. Actuaciones Contractuales',
                    title: 'Ejecución Inicial CPO-12',
                    date: '2017 – 2022',
                    content: [
                      'Las actividades de CPO-12 fueron ejecutadas inicialmente mediante el Contrato 9800002571.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-emerald-200 bg-white hover:border-emerald-500 cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-emerald-900 font-bold text-xs">
                    <div className="p-1 rounded-full bg-emerald-800 text-white">
                      <Settings className="w-3.5 h-3.5" />
                    </div>
                    <span>Ejecución</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-snug">
                    Las actividades de CPO-12 fueron ejecutadas inicialmente mediante el <strong>Contrato 9800002571</strong>.
                  </p>
                </div>

                {/* Otrosí 1 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '2. Actuaciones Contractuales',
                    title: 'Firma de OTROSÍ NÚMERO 1 (Contrato C1230)',
                    date: '18 de julio de 2022',
                    content: [
                      'Firma del OTROSÍ NÚMERO 1 al contrato C1230, mediante el cual CPO-12 continúa su ejecución.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-emerald-200 bg-white hover:border-emerald-500 cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-emerald-900 font-bold text-xs">
                    <div className="p-1 rounded-full bg-emerald-800 text-white">
                      <FileEdit className="w-3.5 h-3.5" />
                    </div>
                    <span>18 de julio de 2022</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-snug">
                    Firma del <strong>OTROSÍ NÚMERO 1</strong> al contrato C1230, mediante el cual CPO-12 continúa su ejecución.
                  </p>
                </div>

                {/* Incumplimiento Dic 2025 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '2. Actuaciones Contractuales',
                    title: 'Comunicado de Incumplimiento C1230 – CPO-12',
                    date: '12 de diciembre de 2025',
                    content: [
                      'Frontera emite el Comunicado de Incumplimiento C1230 – CPO-12, notificando hallazgos técnicos y otorgando plazo para presentar plan correctivo y soportes de cumplimiento.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-red-300 bg-red-50/30 hover:border-red-500 cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-red-900 font-bold text-xs">
                    <div className="p-1 rounded-full bg-red-600 text-white">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <span>12 de diciembre de 2025</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-snug">
                    Frontera emite el <strong>Comunicado de Incumplimiento C1230 – CPO-12</strong>, notificando hallazgos técnicos y plazo para plan correctivo.
                  </p>
                </div>

                {/* Terminacion 2026 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '2. Actuaciones Contractuales',
                    title: 'Proyección de Terminación por Incumplimiento',
                    date: '2026',
                    content: [
                      'Se proyecta oficio de terminación del contrato por incumplimiento e imposición de cláusula penal.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-red-300 bg-red-50/40 hover:border-red-500 cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-red-900 font-bold text-xs">
                    <div className="p-1 rounded-full bg-red-700 text-white">
                      <FileX className="w-3.5 h-3.5" />
                    </div>
                    <span>2026</span>
                  </div>
                  <p className="text-[11px] text-red-900 font-semibold leading-snug">
                    Se proyecta oficio de <strong>terminación del contrato por incumplimiento</strong> e imposición de cláusula penal.
                  </p>
                </div>

                {/* Finalizacion 31 Ago 2026 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '2. Actuaciones Contractuales',
                    title: 'Fecha de Finalización Programada',
                    date: '31 de agosto de 2026',
                    content: [
                      'Fecha de finalización programada del contrato C1230 / CPO-12.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-emerald-400 bg-emerald-50/50 hover:border-emerald-600 cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-emerald-900 font-bold text-xs">
                    <div className="p-1 rounded-full bg-emerald-700 text-white">
                      <Flag className="w-3.5 h-3.5" />
                    </div>
                    <span>31 de agosto de 2026</span>
                  </div>
                  <p className="text-[11px] text-slate-800 font-bold leading-snug">
                    Fecha de finalización programada.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. GESTIONES TÉCNICAS Y REQUERIMIENTOS */}
          {/* ========================================================================= */}
          <div className="rounded-xl border border-[#201747]/40 overflow-hidden shadow-xs bg-white">
            {/* Track Header Pill */}
            <div className="bg-[#201747] text-white px-3 py-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white text-[#201747] font-black text-xs flex items-center justify-center shrink-0">
                3.
              </span>
              <span className="font-bold text-xs uppercase tracking-wider">
                Gestiones
              </span>
            </div>

            {/* Gestiones Horizontal Cards Flow */}
            <div className="p-3 bg-gradient-to-b from-indigo-50/20 to-white overflow-x-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-11 gap-2 min-w-[1320px]">
                
                {/* Mayo 2025 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '3. Gestiones',
                    title: 'Reunión Conjunta con Refocosta',
                    date: 'Mayo 2025',
                    content: [
                      'Reunión conjunta con Refocosta donde se evidenció falencia en la temporalidad de la ejecución de las actividades.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-slate-200 bg-white hover:border-[#001871] cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 mb-1 font-bold text-[#001871] text-[11px]">
                    <Users className="w-3.5 h-3.5 text-[#001871]" />
                    <span>Mayo 2025</span>
                  </div>
                  <p className="text-[10px] text-slate-700 leading-tight">
                    Reunión conjunta con Refocosta: se evidenció falencia en temporalidad de ejecución.
                  </p>
                </div>

                {/* Julio 2025 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '3. Gestiones',
                    title: 'Remisión de Requerimientos Acta 394 de 2025',
                    date: 'Julio 2025',
                    content: [
                      'Frontera remite los requerimientos formulados por la ANLA en el Acta 394 de 2025.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-slate-200 bg-white hover:border-[#001871] cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 mb-1 font-bold text-[#001871] text-[11px]">
                    <ClipboardCheck className="w-3.5 h-3.5 text-[#001871]" />
                    <span>Julio 2025</span>
                  </div>
                  <p className="text-[10px] text-slate-700 leading-tight">
                    Frontera remite requerimientos formulados por ANLA en el <strong>Acta 394 de 2025</strong>.
                  </p>
                </div>

                {/* Agosto 2025 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '3. Gestiones',
                    title: 'Informes Predio Moriche Solo',
                    date: 'Agosto 2025',
                    content: [
                      'Refocosta comparte los enlaces con los informes del predio Moriche Solo (Inversión 1 %).'
                    ]
                  })}
                  className="p-2 rounded-lg border border-slate-200 bg-white hover:border-[#001871] cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 mb-1 font-bold text-[#001871] text-[11px]">
                    <Link className="w-3.5 h-3.5 text-[#001871]" />
                    <span>Agosto 2025</span>
                  </div>
                  <p className="text-[10px] text-slate-700 leading-tight">
                    Refocosta comparte enlaces con informes del predio Moriche Solo (Inversión 1 %).
                  </p>
                </div>

                {/* Septiembre 2025 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '3. Gestiones',
                    title: 'Solicitud de Estado de Mantenimientos por Garantía',
                    date: 'Septiembre 2025',
                    content: [
                      'Frontera solicita información sobre el estado de las actividades contractuales y los mantenimientos ejecutados por garantía en las reforestaciones de inversión del 1 %.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-slate-200 bg-white hover:border-[#001871] cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 mb-1 font-bold text-[#001871] text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-[#001871]" />
                    <span>Septiembre 2025</span>
                  </div>
                  <p className="text-[10px] text-slate-700 leading-tight">
                    Frontera solicita estado contractual y mantenimientos por garantía en inversión del 1 %.
                  </p>
                </div>

                {/* Octubre 2025 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '3. Gestiones',
                    title: 'Activación de Garantía y Requerimientos PDT',
                    date: 'Octubre 2025',
                    content: [
                      '02 de octubre: Frontera solicita activar la garantía del servicio, presentar plan de acción, cronograma y responsables técnicos por deficiencias en La Fortuna y Moriche Solo.',
                      '09 de octubre: Refocosta informa la ejecución de un PDT y actividades de mantenimiento, sin aportar cronograma ni responsables técnicos. Informa inicio de mantenimiento de las 6 ha de inversión del 1 %.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-amber-300 bg-amber-50/30 hover:border-amber-500 cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 mb-1 font-bold text-amber-900 text-[11px]">
                    <CheckSquare className="w-3.5 h-3.5 text-amber-800" />
                    <span>Octubre 2025</span>
                  </div>
                  <ul className="text-[9px] text-slate-700 space-y-1 leading-tight">
                    <li>• <strong>02 Oct:</strong> Frontera solicita activar garantía, plan de acción y cronograma.</li>
                    <li>• <strong>09 Oct:</strong> Refocosta reporta PDT sin cronograma ni responsables.</li>
                  </ul>
                </div>

                {/* Noviembre 2025 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '3. Gestiones',
                    title: 'Verificación en Campo: Alta Mortalidad y Fallas',
                    date: 'Noviembre 2025',
                    content: [
                      '19 de noviembre: Frontera programa visita de verificación en campo.',
                      '25 al 27 de noviembre: verificación técnica en La Fortuna, Moriche Solo y La Holanda.',
                      'Se identificó alta mortalidad, alturas inferiores a las requeridas, ausencia de aislamientos, deficiencias en control de malezas e inconsistencias entre lo ejecutado y lo reportado.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-red-300 bg-red-50/40 hover:border-red-500 cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 mb-1 font-bold text-red-900 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-red-700" />
                    <span>Noviembre 2025</span>
                  </div>
                  <ul className="text-[9px] text-slate-700 space-y-0.5 leading-tight">
                    <li>• <strong>25–27 Nov:</strong> Verificación técnica en La Fortuna, Moriche Solo y La Holanda.</li>
                    <li className="text-red-800 font-semibold">• Alta mortalidad, alturas bajas, falta de aislamientos y malezas.</li>
                  </ul>
                </div>

                {/* Diciembre 2025 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '3. Gestiones',
                    title: 'Requerimientos Auto 6534 y Respuesta Parcial',
                    date: 'Diciembre 2025',
                    content: [
                      'Frontera solicita atender los requerimientos del Auto 6534 de 2018 y directrices de la ANLA; remite información cartográfica MAG/GOB e inventarios forestales para captura de carbono.',
                      'Refocosta responde atribuyendo las deficiencias a factores externos, sin presentar plan de acción y entrega únicamente inventarios parciales de La Fortuna y Moriche Solo.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-red-300 bg-red-50/30 hover:border-red-500 cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 mb-1 font-bold text-red-900 text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-red-700" />
                    <span>Diciembre 2025</span>
                  </div>
                  <p className="text-[9px] text-slate-700 leading-tight">
                    Frontera exige Auto 6534 y MAG. Refocosta alega factores externos y entrega inventarios parciales.
                  </p>
                </div>

                {/* Marzo 2026 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '3. Gestiones',
                    title: 'Solicitud MAG y Certificación >50 cm',
                    date: 'Marzo 2026',
                    content: [
                      'Frontera solicita MAG, certificación de individuos > 50 cm, PDT actualizado y soportes pendientes.',
                      'Refocosta remite citación de la Fiscalía por afectaciones ambientales; se verifica que corresponde a otras áreas y no al proyecto CPO-12.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-slate-300 bg-white hover:border-[#001871] cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 mb-1 font-bold text-[#001871] text-[11px]">
                    <Gavel className="w-3.5 h-3.5 text-[#001871]" />
                    <span>Marzo 2026</span>
                  </div>
                  <p className="text-[9px] text-slate-700 leading-tight">
                    Frontera exige certificación &gt;50 cm. Refocosta remite citación Fiscalía no aplicable a CPO-12.
                  </p>
                </div>

                {/* Abril 2026 */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '3. Gestiones',
                    title: 'Verificación Técnica Final: Incumplimientos Persistentes',
                    date: 'Abril 2026',
                    content: [
                      'Refocosta informa programación de actividades pendientes en La Fortuna y Moriche Solo; indica ajustes al MAG y que se deberán ejecutar replantes.',
                      '11 al 13 de abril: Frontera realiza nueva verificación técnica en campo, confirmando persistencia de incumplimientos (ausencia de replantes, deterioro de aislamientos y deficiencias en mantenimientos).',
                      '14 de abril: Refocosta remite información de afectaciones antrópicas y señala que las actividades correspondían solo a la última resiembra, sin contemplar mantenimientos posteriores.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-red-400 bg-red-50/50 hover:border-red-600 cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 mb-1 font-bold text-red-900 text-[11px]">
                    <Trees className="w-3.5 h-3.5 text-red-700" />
                    <span>Abril 2026</span>
                  </div>
                  <ul className="text-[9px] text-slate-700 space-y-0.5 leading-tight">
                    <li>• <strong>11–13 Abr:</strong> Verificación confirma persistencia de incumplimientos.</li>
                    <li>• <strong>14 Abr:</strong> Refocosta descarta mantenimientos posteriores.</li>
                  </ul>
                </div>

                {/* Gestión 2026: Terminación de Contrato */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '3. Gestiones',
                    title: 'Terminación de Contrato por Incumplimiento',
                    date: '2026',
                    content: [
                      'Proyección y trámite de oficio de terminación del contrato C1230 por incumplimiento imputable a Refocosta.',
                      'Imposición de cláusula penal tras reiteradas fallas técnicas, atrasos injustificados y persistencia de áreas siniestradas sin replante ni atención a requerimientos.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-red-500 bg-red-100/50 hover:border-red-700 cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 mb-1 font-bold text-red-950 text-[11px]">
                    <FileX className="w-3.5 h-3.5 text-red-700" />
                    <span>2026</span>
                  </div>
                  <div className="text-[9px] text-red-900 font-semibold leading-tight">
                    <strong>Terminación contrato:</strong> Trámite por incumplimiento e imposición de cláusula penal.
                  </div>
                </div>

                {/* Gestión 2026: Solicitud de Cierre ante la ANLA */}
                <div 
                  onClick={() => setSelectedItem({
                    track: '3. Gestiones',
                    title: 'Solicitud de Cierre ante la ANLA',
                    date: 'Agosto 2026',
                    content: [
                      'Solicitud inicial de cierre de la obligación Caño Pilón (4,0 ha) radicada ante la ANLA: Rad. 20256200936142 del 08 de agosto de 2025 (en espera de pronunciamiento).',
                      'Reiteración formal de solicitud de cierre radicada ante la ANLA mediante Rad. 20266201199632 del 24 de agosto de 2026.'
                    ]
                  })}
                  className="p-2 rounded-lg border border-emerald-400 bg-emerald-50/70 hover:border-emerald-600 cursor-pointer shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1 mb-1 font-bold text-emerald-900 text-[11px]">
                    <ClipboardCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Ago 2026</span>
                  </div>
                  <div className="text-[9px] text-emerald-950 leading-tight space-y-0.5">
                    <div className="font-bold text-emerald-900">Solicitud Cierre ANLA:</div>
                    <div className="font-mono text-[8.5px]">• Rad. 20256200936142 (08/08/2025)</div>
                    <div className="font-mono text-[8.5px] font-bold text-emerald-800">• Reiterado Rad. 20266201199632 (24/08/2026)</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Information */}
      <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#001871]" />
          <span>
            Trazabilidad Contractual y Regulatoria: <strong>Contrato 9800002571 / C1230</strong> ante la <strong>ANLA (LAM5475)</strong>.
          </span>
        </div>
        <div className="text-[11px] text-slate-500 font-mono">
          Haga clic en cualquier nodo para ver el detalle técnico ampliado
        </div>
      </div>

      {/* Interactive Detail Modal for Nodes */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 text-slate-900 shadow-2xl border border-slate-200 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#001871]">
                    {selectedItem.track}
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-900">
                    {selectedItem.title}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-[#E31C79]">
                    {selectedItem.date}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 rounded hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs leading-relaxed">
                {selectedItem.content.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-800">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 text-xs rounded-lg bg-[#001871] text-white font-bold hover:bg-[#002299] transition-all"
                >
                  Entendido / Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
