import React from 'react';
import { AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';

export default function ConfidenceMeter({ confidence = 0.968, reviewRequired = false }) {
  const percentage = Math.round(confidence * 100);
  const isHighConfidence = percentage >= 85;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isHighConfidence ? (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          )}
          <span className="text-sm font-bold text-white">AI Confidence Index</span>
        </div>
        <span
          className={`text-lg font-black ${
            isHighConfidence ? 'text-emerald-400' : 'text-amber-400'
          }`}
        >
          {percentage}%
        </span>
      </div>

      {/* Progress Bar with 85% Threshold Indicator */}
      <div className="relative w-full">
        <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              isHighConfidence
                ? 'bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-glow-indigo'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-glow-yellow'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* 85% Regulatory Threshold Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-slate-400/80 z-10"
          style={{ left: '85%' }}
          title="Regulatory Safety Threshold (85%)"
        >
          <span className="absolute -top-5 -translate-x-1/2 text-[9px] font-bold text-slate-400 uppercase tracking-tight">
            85% Min
          </span>
        </div>
      </div>

      {/* Human In the Loop Alert Note */}
      {reviewRequired || !isHighConfidence ? (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Human Review Flagged</p>
            <p className="text-[11px] text-amber-200/80">
              Confidence score is below the 85% safety threshold. Medical officer manual sign-off required prior to final bin disposal.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Exceeds regulatory confidence standard. Safe for automated routing.</span>
        </div>
      )}
    </div>
  );
}
