import React from 'react';
import { Target, Layers, FileText, CheckCircle2 } from 'lucide-react';

interface SlideHeaderProps {
  slideNumber: number;
  totalSlides?: number;
  title: string;
  subtitle?: string;
  objective: string;
  badge?: string;
  isLight?: boolean;
}

export const SlideHeader: React.FC<SlideHeaderProps> = ({
  slideNumber,
  totalSlides = 10,
  title,
  subtitle,
  objective,
  badge,
  isLight = false,
}) => {
  return (
    <div className={`mb-5 pb-3.5 border-b ${isLight ? 'border-slate-300' : 'border-white/10'}`}>
      {/* Top Metadata Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#E31C79] text-white shadow-xs">
            <Layers className="w-3 h-3" />
            Diapositiva {slideNumber} de {totalSlides}
          </span>
          {badge && (
            <span
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase ${
                isLight 
                  ? 'bg-slate-100 text-slate-700 border border-slate-300' 
                  : 'bg-white/10 text-slate-200 border border-white/10'
              }`}
            >
              {badge}
            </span>
          )}
          {subtitle && (
            <span className={`text-xs font-medium hidden sm:inline ${isLight ? 'text-slate-500' : 'text-slate-300'}`}>
              • {subtitle}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className={`px-2 py-0.5 rounded ${isLight ? 'bg-slate-100 text-slate-700 border border-slate-200' : 'bg-[#001871]/80 text-slate-300 border border-white/10'}`}>
            EXP: LAM5475
          </span>
          <span className="hidden md:inline text-slate-400 text-[10px]">
            FRONTERA ENERGY COLOMBIA
          </span>
        </div>
      </div>

      {/* Main Slide Title */}
      <h2
        className={`text-xl sm:text-2xl lg:text-[26px] font-display font-bold tracking-tight mb-2 leading-tight ${
          isLight ? 'text-[#201747]' : 'text-white'
        }`}
      >
        {title}
      </h2>

      {/* Strategic Objective Strip */}
      <div
        className={`flex items-start gap-2.5 text-xs sm:text-[13px] px-3.5 py-2 rounded-lg border leading-relaxed ${
          isLight
            ? 'bg-slate-50 text-slate-800 border-slate-200'
            : 'bg-[#001871]/50 text-slate-200 border-white/10'
        }`}
      >
        <Target className="w-4 h-4 mt-0.5 shrink-0 text-[#E31C79]" />
        <div>
          <span className="font-bold text-[#E31C79] uppercase tracking-wider text-[11px] mr-1.5">
            Objetivo Estratégico:
          </span>
          <span>{objective}</span>
        </div>
      </div>
    </div>
  );
};

