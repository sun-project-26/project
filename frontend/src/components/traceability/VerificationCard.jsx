import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, Cpu } from 'lucide-react';
import { truncateHash } from '../../utils/formatters';

export default function VerificationCard({ isChainIntact = true, wasteId = 'WST-2026-081', eventCount = 7 }) {
  return (
    <div className="rounded-3xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-purple-950/30 backdrop-blur-2xl p-6 sm:p-7 shadow-glow-indigo">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Badge & Status */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-glow-indigo shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-lg border border-indigo-500/20">
                {wasteId}
              </span>
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Tamper-Evident Digital Log Certified
              </span>
            </div>
            <h3 className="text-xl font-black text-white mt-1">
              Cryptographic Chain of Custody Verified
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              All {eventCount} lifecycle transitions cryptographically sealed via SHA-256 block hash chaining.
            </p>
          </div>
        </div>

        {/* Right Details */}
        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 text-xs">
          <div>
            <p className="text-slate-500 font-bold uppercase text-[10px]">Verification Engine</p>
            <p className="font-bold text-white mt-0.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              SHA-256 Ledger
            </p>
          </div>
          <div>
            <p className="text-slate-500 font-bold uppercase text-[10px]">Status</p>
            <p className="font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              100% Immutable
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
