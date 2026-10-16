import React, { useState } from 'react';
import { 
  LOTES_COMPENSACION, 
  BASINS_1_PERCENT, 
  FINANCIAL_1_PERCENT, 
  SEISMIC_WATER_COSTS, 
  TOTAL_WATER_HARVEST,
  STRATEGIC_SCENARIOS,
  NEW_SCENARIOS,
  BLOCK_METADATA 
} from '../data/presentationData';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  FileSpreadsheet, 
  Table, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

interface SheetsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SheetsExportModal: React.FC<SheetsExportModalProps> = ({ isOpen, onClose }) => {
  const [activeDataset, setActiveDataset] = useState<'lotes' | 'cuencas' | 'reservorios' | 'escenarios' | 'checklist'>('escenarios');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateTSV = (dataset: string) => {
    switch (dataset) {
      case 'lotes': {
        const header = ['Lote / Predio', 'Área (Ha)', 'Año Establecimiento', 'Sobrevivencia (%)', 'Estatus', 'Radicado / Acta'];
        const rows = LOTES_COMPENSACION.map(l => [
          l.loteName,
          l.areaHa,
          l.establishedYear,
          `${l.survivalRate}%`,
          l.status,
          l.radicado || l.acta || 'N/A'
        ]);
        return [header.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
      }
      case 'cuencas': {
        const header = ['Cuenca Hidrográfica', 'Predio', 'Área (Ha)', 'Año Establecimiento', 'Sobrevivencia (%)', 'Afectado por Fuego', 'Estado Operativo'];
        const rows = BASINS_1_PERCENT.map(b => [
          b.basinName,
          b.predio,
          b.areaHa,
          b.establishedYear,
          `${b.survivalRate}%`,
          b.affectedByFire ? 'SI (6,0 Ha)' : 'NO',
          b.status
        ]);
        return [header.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
      }
      case 'reservorios': {
        const header = ['Proyecto Sísmico', 'Acto Administrativo', 'Año', 'Área a Compensar (Ha)', 'No. Reservorios', 'Inversión Total ($COP)', 'Costo por Ha ($COP)'];
        const rows = SEISMIC_WATER_COSTS.map(s => [
          s.project,
          s.act,
          s.year,
          s.areaHa,
          s.reservoirsCount,
          s.investmentCOP,
          s.costPerHaCOP
        ]);
        rows.push([
          'TOTAL CONSOLIDADO',
          'Aprobación PM.GA.3.26.5845',
          2026,
          TOTAL_WATER_HARVEST.totalAreaHa,
          TOTAL_WATER_HARVEST.totalReservoirs,
          TOTAL_WATER_HARVEST.totalInvestmentCOP,
          54639601.97
        ]);
        return [header.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
      }
      case 'escenarios': {
        const header = ['Parámetro', 'Escenario 1: Conservador (COP)', 'Escenario 2: Eficiente (COP)', 'Ahorro / Diferencia (COP)'];
        const rows = [
          ['Compensación 30,4 Ha (Mantenimiento)', STRATEGIC_SCENARIOS.scenario1.compensation30HaCOP, STRATEGIC_SCENARIOS.scenario2.compensation30HaCOP, 0],
          ['1% Inversión - 4 Ha Conformes', STRATEGIC_SCENARIOS.scenario1.inv1Compliant4HaCOP, STRATEGIC_SCENARIOS.scenario2.inv1Compliant4HaCOP, 0],
          ['1% Inversión - 6 Ha Quemadas', STRATEGIC_SCENARIOS.scenario1.inv1Burned6HaCOP, STRATEGIC_SCENARIOS.scenario2.inv1Burned6HaCOP, STRATEGIC_SCENARIOS.scenario1.inv1Burned6HaCOP - STRATEGIC_SCENARIOS.scenario2.inv1Burned6HaCOP],
          ['PRESUPUESTO TOTAL ($COP)', STRATEGIC_SCENARIOS.scenario1.totalCOP, STRATEGIC_SCENARIOS.scenario2.totalCOP, STRATEGIC_SCENARIOS.scenario2.savingsCOP],
          ['Tiempo de Ejecución', `${STRATEGIC_SCENARIOS.scenario1.executionTimeYears} Años`, `${STRATEGIC_SCENARIOS.scenario2.executionTimeYears} Años`, '2 Años de Reducción'],
          ['Riesgo Biótico', STRATEGIC_SCENARIOS.scenario1.bioticRisk, STRATEGIC_SCENARIOS.scenario2.bioticRisk, 'Blindaje contra quemas'],
        ];
        return [header.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
      }
      case 'checklist': {
        const header = ['Categoría', 'Ítem Normativo', 'Descripción', 'Estatus'];
        const rows = NEW_SCENARIOS.normativeChecklist.map(c => [
          c.category,
          c.item,
          c.description,
          c.status
        ]);
        return [header.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
      }
      default:
        return '';
    }
  };

  const currentTSV = generateTSV(activeDataset);

  const handleCopyTSV = () => {
    navigator.clipboard.writeText(currentTSV);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCSV = () => {
    // UTF-8 BOM for Excel compatibility
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + currentTSV.replace(/\t/g, ',');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CPO12_${activeDataset}_${BLOCK_METADATA.currentDateDisplay.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#201747] border border-white/20 rounded-2xl max-w-3xl w-full p-6 text-white shadow-2xl space-y-4 max-h-[90vh] flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                Exportar Datos a Google Sheets / Excel
              </h3>
              <p className="text-xs text-slate-300">
                Bloque CPO-12 | Tablas técnicas listas para pegar en hojas de cálculo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dataset Selector Tabs */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveDataset('escenarios')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeDataset === 'escenarios'
                ? 'bg-[#8FA73B] text-slate-900 shadow'
                : 'bg-black/30 text-slate-300 hover:text-white'
            }`}
          >
            Escenarios 1 vs 2 (Junta)
          </button>
          <button
            onClick={() => setActiveDataset('reservorios')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeDataset === 'reservorios'
                ? 'bg-[#001871] text-white border border-white/30 shadow'
                : 'bg-black/30 text-slate-300 hover:text-white'
            }`}
          >
            Cosecha de Agua (Cormacarena)
          </button>
          <button
            onClick={() => setActiveDataset('lotes')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeDataset === 'lotes'
                ? 'bg-[#001871] text-white border border-white/30 shadow'
                : 'bg-black/30 text-slate-300 hover:text-white'
            }`}
          >
            Lotes Compensación (ANLA)
          </button>
          <button
            onClick={() => setActiveDataset('cuencas')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeDataset === 'cuencas'
                ? 'bg-[#001871] text-white border border-white/30 shadow'
                : 'bg-black/30 text-slate-300 hover:text-white'
            }`}
          >
            Cuencas 1% & Siniestros
          </button>
          <button
            onClick={() => setActiveDataset('checklist')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeDataset === 'checklist'
                ? 'bg-[#001871] text-white border border-white/30 shadow'
                : 'bg-black/30 text-slate-300 hover:text-white'
            }`}
          >
            Checklist Normativo & SIG
          </button>
        </div>

        {/* Tabular Preview Box */}
        <div className="flex-1 overflow-auto bg-black/40 rounded-xl p-3 border border-white/10 font-mono text-xs text-slate-200">
          <pre className="whitespace-pre overflow-x-auto text-[11px] leading-relaxed">
            {currentTSV}
          </pre>
        </div>

        {/* Actions Bar */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8FA73B]" />
            <span>Formato TSV compatible con Ctrl+V directo en Google Sheets</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyTSV}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E31C79] hover:bg-[#c41364] text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Copiado al Portapapeles!' : 'Copiar para Google Sheets'}</span>
            </button>

            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Descargar .CSV</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
