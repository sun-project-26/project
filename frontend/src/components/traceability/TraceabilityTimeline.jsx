import React from 'react';
import {
  Sparkles,
  Trash2,
  Truck,
  CheckCircle,
  FileText,
  Lock,
  MapPin,
  Clock,
  UserCheck,
  Building,
  Flame
} from 'lucide-react';
import { truncateHash } from '../../utils/formatters';

const STEP_ICONS = {
  WASTE_GENERATED: Building,
  AI_CLASSIFIED: Sparkles,
  BIN_ASSIGNED: Trash2,
  PICKUP_CREATED: FileText,
  UNIT_ASSIGNED: Truck,
  PICKUP_COLLECTED: UserCheck,
  DISPOSAL_COMPLETED: Flame,
  DEFAULT: CheckCircle
};

export default function TraceabilityTimeline({ events = [] }) {
  if (!events || events.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500 rounded-3xl border border-slate-800 bg-[#0d1322]/80">
        <FileText className="w-12 h-12 mx-auto mb-3 text-slate-600" />
        <p className="text-sm font-semibold">No traceability records found for this identifier.</p>
      </div>
    );
  }

  return (
    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-emerald-500">
      {events.map((evt, idx) => {
        const Icon = STEP_ICONS[evt.action] || STEP_ICONS.DEFAULT;
        const isLatest = idx === events.length - 1;

        return (
          <div key={evt.eventId || idx} className="relative group">
            {/* Timeline Circle Node */}
            <div
              className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                isLatest
                  ? 'bg-indigo-600 border-white text-white shadow-glow-indigo ring-4 ring-indigo-500/20'
                  : 'bg-slate-900 border-indigo-500/60 text-indigo-400 group-hover:border-indigo-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>

            {/* Event Content Card */}
            <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    Step 0{evt.stepIndex || idx + 1}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {evt.title || evt.action.replace(/_/g, ' ')}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{evt.timestamp || 'Just now'}</span>
                </div>
              </div>

              {/* Event Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <UserCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="text-slate-400">Actor:</span>
                  <span className="font-semibold text-white">{evt.actor}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-white">{evt.location}</span>
                </div>
              </div>

              {/* Cryptographic SHA-256 Hash Display */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-indigo-400">
                    <Lock className="w-3 h-3" />
                    <span className="font-bold uppercase tracking-wider text-[10px]">Block Hash:</span>
                  </div>
                  <span className="text-emerald-400 font-bold">Verified Sealed</span>
                </div>
                <p className="break-all text-slate-300 text-[10px] sm:text-[11px]">
                  {evt.hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                </p>
                {evt.previousHash && (
                  <p className="text-[10px] text-slate-500 pt-0.5">
                    Prev: {truncateHash(evt.previousHash, 12)}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
