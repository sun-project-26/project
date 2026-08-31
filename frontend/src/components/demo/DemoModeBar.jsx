import React from 'react';
import { Sparkles, Play, SkipForward, SkipBack, X, CheckCircle, RefreshCw } from 'lucide-react';
import { DEMO_STEPS } from '../../hooks/useDemoMode';

export default function DemoModeBar({
  isDemoActive,
  currentStepIndex,
  currentStep,
  isRunningAuto,
  onNext,
  onPrev,
  onRunAuto,
  onStop
}) {
  if (!isDemoActive) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl rounded-3xl border border-amber-500/50 bg-[#0d1322]/95 backdrop-blur-2xl shadow-2xl p-4 sm:p-5 text-slate-100 animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Step Indicator and Title */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-glow-yellow">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                Live Demo: Step {currentStepIndex + 1} of {DEMO_STEPS.length}
              </span>
            </div>
            <h4 className="text-sm font-black text-white mt-0.5">{currentStep?.title}</h4>
            <p className="text-xs text-slate-300 line-clamp-1">{currentStep?.description}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={onPrev}
            disabled={currentStepIndex === 0 || isRunningAuto}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 transition-colors"
            title="Previous Step"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onRunAuto}
            disabled={isRunningAuto}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all disabled:opacity-50"
          >
            {isRunningAuto ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Auto Tour</span>
              </>
            )}
          </button>

          <button
            onClick={onNext}
            disabled={isRunningAuto}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-glow-yellow transition-all"
          >
            <span>{currentStepIndex === DEMO_STEPS.length - 1 ? 'Finish' : 'Next Step'}</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onStop}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            title="Exit Demo Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Track */}
      <div className="grid grid-cols-8 gap-1.5 mt-3 pt-3 border-t border-slate-800">
        {DEMO_STEPS.map((s, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx <= currentStepIndex ? 'bg-amber-400 shadow-glow-yellow' : 'bg-slate-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
