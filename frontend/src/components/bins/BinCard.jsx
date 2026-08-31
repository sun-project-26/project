import React from 'react';
import { Trash2, AlertTriangle, CheckCircle, Clock, Info } from 'lucide-react';
import Badge from '../common/Badge';
import { formatWeight, formatPercentage } from '../../utils/formatters';

export default function BinCard({ bin, onClick }) {
  const categoryStyles = {
    YELLOW: {
      border: 'hover:border-yellow-500/50',
      bgGlow: 'glass-card-yellow',
      badge: 'yellow',
      barColor: 'bg-gradient-to-r from-yellow-500 to-amber-400',
      shadow: 'hover:shadow-glow-yellow',
      textColor: 'text-yellow-400'
    },
    RED: {
      border: 'hover:border-red-500/50',
      bgGlow: 'glass-card-red',
      badge: 'red',
      barColor: 'bg-gradient-to-r from-red-500 to-rose-400',
      shadow: 'hover:shadow-glow-red',
      textColor: 'text-red-400'
    },
    WHITE: {
      border: 'hover:border-slate-300/50',
      bgGlow: 'glass-card-white',
      badge: 'white',
      barColor: 'bg-gradient-to-r from-slate-200 to-slate-400',
      shadow: 'hover:shadow-glow-white',
      textColor: 'text-slate-100'
    },
    BLUE: {
      border: 'hover:border-blue-500/50',
      bgGlow: 'glass-card-blue',
      badge: 'blue',
      barColor: 'bg-gradient-to-r from-blue-500 to-indigo-400',
      shadow: 'hover:shadow-glow-blue',
      textColor: 'text-blue-400'
    }
  };

  const style = categoryStyles[bin.category] || categoryStyles.WHITE;
  const isNearCapacity = bin.fillPercentage >= 65;
  const isCritical = bin.fillPercentage >= 90;

  return (
    <div
      onClick={() => onClick(bin)}
      className={`rounded-3xl border border-slate-800 bg-[#0d1322]/80 backdrop-blur-xl p-6 sm:p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 ${style.bgGlow} ${style.border} ${style.shadow} group`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center">
            <Trash2 className={`w-5 h-5 ${style.textColor}`} />
          </div>
          <div>
            <h4 className="text-lg font-black text-white">{bin.category}</h4>
            <span className="text-[11px] font-mono text-slate-400">{bin.binId}</span>
          </div>
        </div>

        <Badge
          label={bin.status}
          variant={isCritical ? 'danger' : isNearCapacity ? 'warning' : 'success'}
        />
      </div>

      {/* Progress Bar & Percentage */}
      <div className="space-y-2 mb-6">
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-slate-400 font-medium">Current Capacity Load</span>
          <span className={`font-black text-sm ${style.textColor}`}>
            {formatPercentage(bin.fillPercentage)}
          </span>
        </div>

        <div className="h-3 w-full rounded-full bg-slate-950/80 p-0.5 overflow-hidden border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${style.barColor}`}
            style={{ width: `${Math.min(100, bin.fillPercentage)}%` }}
          />
        </div>
      </div>

      {/* Load & Items Metrics */}
      <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-800/80 text-xs mb-4">
        <div>
          <p className="text-slate-500 font-medium">Weight Stored</p>
          <p className="text-base font-bold text-white mt-0.5">
            {formatWeight(bin.currentLoadKg)}{' '}
            <span className="text-xs font-normal text-slate-400">/ {bin.maxCapacityKg} kg</span>
          </p>
        </div>
        <div>
          <p className="text-slate-500 font-medium">Logged Items</p>
          <p className="text-base font-bold text-white mt-0.5">{bin.itemCount || 120} items</p>
        </div>
      </div>

      {/* Location & Last Updated Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate max-w-[150px] font-medium">{bin.locationTag}</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {bin.lastUpdated || '5m ago'}
        </span>
      </div>
    </div>
  );
}
