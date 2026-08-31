import React, { useState, useEffect } from 'react';
import VerificationCard from '../components/traceability/VerificationCard';
import TraceabilityTimeline from '../components/traceability/TraceabilityTimeline';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import { fetchTraceability } from '../services/traceabilityService';
import { Search, ShieldCheck, Lock, CheckCircle, RefreshCw, Key } from 'lucide-react';
import { notify } from '../hooks/useNotifications';

export default function TraceabilityPage() {
  const [searchQuery, setSearchQuery] = useState('WST-2026-081');
  const [ledgerData, setLedgerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadTraceability = async (query) => {
    setIsLoading(true);
    const data = await fetchTraceability(query);
    setLedgerData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadTraceability('WST-2026-081');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    loadTraceability(searchQuery.trim());
    notify(`Loaded Traceability Ledger for: ${searchQuery}`, 'info');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Immutable Digital Audit Trail
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30">
              SHA-256 Hash Chain
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Traceability & Chain of Custody
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Cryptographic proof-of-custody tracking biomedical waste from clinical point of generation to CBWTF certified disposal.
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <GlassCard className="p-4 sm:p-5">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Waste ID (e.g. WST-2026-081), Pickup ID, or Facility Name..."
              className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all shrink-0 flex items-center justify-center gap-2"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            Verify Chain
          </button>
        </form>
      </GlassCard>

      {/* Certified Tamper-Evident Banner */}
      <VerificationCard
        isChainIntact={ledgerData?.isChainIntact ?? true}
        wasteId={ledgerData?.wasteId || searchQuery}
        eventCount={ledgerData?.events?.length || 7}
      />

      {/* Step-by-Step Blockchain Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Digital Proof of Custody Lifecycle</h3>
          <span className="text-xs text-slate-400">7 Chronological Checkpoints</span>
        </div>

        <TraceabilityTimeline events={ledgerData?.events} />
      </div>
    </div>
  );
}
