import React from 'react';
import GlassCard from './GlassCard';

export default function StatCard({ title, value, unit = '', change = '', isPositive = true, icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  };

  return (
    <GlassCard hoverEffect={true} className="relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <h3 className="text-3xl font-extrabold tracking-tight text-white">{value}</h3>
            {unit && <span className="text-sm font-medium text-slate-400">{unit}</span>}
          </div>
        </div>
        {Icon && (
          <div className={`p-3.5 rounded-xl border ${colorMap[color] || colorMap.indigo} transition-transform group-hover:scale-110`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {change && (
        <div className="mt-4 flex items-center gap-2">
          <span
            className={`inline-flex items-center text-xs font-semibold ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositive ? '↑' : '↓'} {change}
          </span>
          <span className="text-xs text-slate-500">vs last 24 hours</span>
        </div>
      )}
    </GlassCard>
  );
}
