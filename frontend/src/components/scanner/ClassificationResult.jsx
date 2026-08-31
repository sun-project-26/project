import React from 'react';
import { ArrowRight, Trash2, Truck, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import ConfidenceMeter from './ConfidenceMeter';
import Badge from '../common/Badge';

export default function ClassificationResult({ result, onAddToBin, onCreatePickup, isAdding }) {
  if (!result) return null;

  const categoryTheme = {
    YELLOW: {
      border: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300',
      badge: 'yellow',
      glow: 'shadow-glow-yellow'
    },
    RED: {
      border: 'border-red-500/40 bg-red-500/10 text-red-300',
      badge: 'red',
      glow: 'shadow-glow-red'
    },
    WHITE: {
      border: 'border-slate-300/40 bg-slate-200/10 text-slate-100',
      badge: 'white',
      glow: 'shadow-glow-white'
    },
    BLUE: {
      border: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
      badge: 'blue',
      glow: 'shadow-glow-blue'
    },
  };

  const currentTheme = categoryTheme[result.category] || categoryTheme.WHITE;

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0d1322]/90 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
      {/* Top Header info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
              {result.wasteId}
            </span>
            <Badge label={`BMW Category: ${result.category}`} variant={currentTheme.badge} />
          </div>
          <h3 className="text-2xl font-black text-white">{result.label}</h3>
        </div>

        <div className="text-right">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Target Smart Bin</p>
          <span className="text-lg font-black text-white">{result.recommendedBin} Container</span>
        </div>
      </div>

      {/* Confidence Meter */}
      <ConfidenceMeter confidence={result.confidence} reviewRequired={result.reviewRequired} />

      {/* Segregation & Protocol Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <p className="text-[11px] uppercase font-bold text-slate-400 mb-1">Hazard Class</p>
          <p className="text-xs font-semibold text-slate-200">{result.hazardClass || 'Bio-Medical Sharps / Contamination'}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <p className="text-[11px] uppercase font-bold text-slate-400 mb-1">Treatment Protocol</p>
          <p className="text-xs font-semibold text-slate-200">{result.treatmentMethod || 'Autoclaving & Shredding'}</p>
        </div>
      </div>

      {/* Recommended Action Box */}
      <div className={`p-4 rounded-2xl border ${currentTheme.border} flex items-start gap-3.5`}>
        <div className="p-2 rounded-xl bg-slate-900/80 shrink-0">
          <CheckCircle2 className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">Recommended Segregation Action</h5>
          <p className="text-sm font-semibold text-white mt-0.5">
            Place in {result.recommendedBin} category container. Do not mix with domestic solid waste.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={onAddToBin}
          disabled={isAdding}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          {isAdding ? 'Updating Smart Bin...' : `Allocate to ${result.recommendedBin} Bin`}
        </button>

        <button
          onClick={onCreatePickup}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all hover:scale-[1.01]"
        >
          <Truck className="w-4 h-4 text-indigo-400" />
          Dispatch Pickup
        </button>
      </div>
    </div>
  );
}
