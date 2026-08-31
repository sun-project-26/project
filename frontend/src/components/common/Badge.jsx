import React from 'react';

export default function Badge({ label, variant = 'default', size = 'md', className = '' }) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    primary: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    // BMW Categories
    yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    red: 'bg-red-500/20 text-red-300 border-red-500/40',
    white: 'bg-slate-200/20 text-slate-100 border-slate-300/40',
    blue: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
    lg: 'px-3 py-1.5 text-sm font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variants[variant] || variants.default} ${
        sizes[size] || sizes.md
      } ${className}`}
    >
      {label}
    </span>
  );
}
