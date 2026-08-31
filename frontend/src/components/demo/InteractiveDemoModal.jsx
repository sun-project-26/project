import React from 'react';
import Modal from '../common/Modal';
import { Sparkles, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { DEMO_STEPS } from '../../hooks/useDemoMode';

export default function InteractiveDemoModal({ isOpen, onClose, onStartGuided, onStartAuto }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Live Platform Demo Tour" maxWidth="max-w-2xl">
      <div className="space-y-5">
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-white">Full-Pipeline Live Autonomous Simulation</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Demonstrates the end-to-end medical waste lifecycle without hardware dependencies.
            </p>
          </div>
        </div>

        {/* 8 Steps Overview */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 text-xs">
          {DEMO_STEPS.map((s) => (
            <div key={s.step} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
              <span className="w-5 h-5 rounded-lg bg-slate-800 text-indigo-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                {s.step}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white truncate">{s.title}</p>
                <p className="text-[11px] text-slate-400 truncate">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Start Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onStartGuided();
            }}
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
          >
            <span>Step-by-Step Guided Tour</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onClose();
              onStartAuto();
            }}
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl text-xs font-bold text-slate-900 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-glow-yellow transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Automated 30s Run</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
