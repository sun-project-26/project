import React from 'react';

export default function GlassCard({ children, className = '', hoverEffect = false, glowColor = '', onClick }) {
  const glowClasses = {
    indigo: 'hover:border-indigo-500/50 hover:shadow-glow-indigo',
    yellow: 'glass-card-yellow hover:shadow-glow-yellow',
    red: 'glass-card-red hover:shadow-glow-red',
    white: 'glass-card-white hover:shadow-glow-white',
    blue: 'glass-card-blue hover:shadow-glow-blue',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-6 transition-all duration-300 ${
        hoverEffect ? 'hover:-translate-y-1 hover:bg-slate-900/80 cursor-pointer' : ''
      } ${glowColor ? glowClasses[glowColor] || '' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
