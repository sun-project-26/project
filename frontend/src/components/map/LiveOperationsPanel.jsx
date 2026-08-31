import React from 'react';
import { Truck, Battery, Gauge, User, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import Badge from '../common/Badge';
import { formatWeight } from '../../utils/formatters';

export default function LiveOperationsPanel({ unit, onFocusUnit, onDispatchModal }) {
  if (!unit) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-[#0d1322]/80 backdrop-blur-xl p-6 text-center text-slate-500">
        <Truck className="w-10 h-10 mx-auto text-slate-600 mb-2" />
        <p className="text-xs font-semibold">Select a mobile vehicle on the map to inspect telematics.</p>
      </div>
    );
  }

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'en route': return 'primary';
      case 'collecting': return 'warning';
      case 'available': return 'success';
      case 'returning': return 'primary';
      default: return 'default';
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0d1322]/90 backdrop-blur-xl p-6 space-y-5 shadow-2xl animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-glow-indigo">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-black text-white">{unit.unitId}</h4>
            <p className="text-xs text-slate-400 font-medium">{unit.driver}</p>
          </div>
        </div>

        <Badge label={unit.status} variant={getStatusVariant(unit.status)} size="md" />
      </div>

      {/* Telematics Grid */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Gauge className="w-4 h-4 text-indigo-400" />
            <span className="font-bold uppercase text-[10px]">Speed</span>
          </div>
          <p className="text-base font-bold text-white">{unit.speedKmH || 0} km/h</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Battery className="w-4 h-4 text-emerald-400" />
            <span className="font-bold uppercase text-[10px]">Battery</span>
          </div>
          <p className="text-base font-bold text-emerald-400">{unit.batteryLevel || 90}%</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-bold uppercase text-[10px]">ETA</span>
          </div>
          <p className="text-base font-bold text-white">{unit.eta || 'Standby'}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Truck className="w-4 h-4 text-blue-400" />
            <span className="font-bold uppercase text-[10px]">Payload</span>
          </div>
          <p className="text-base font-bold text-white">
            {formatWeight(unit.currentCapacityKg)} / {unit.maxCapacityKg} kg
          </p>
        </div>
      </div>

      {/* Assigned Destination */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
          <span>Active Assignment / Route</span>
        </div>
        <p className="text-sm font-bold text-white">{unit.facilityTarget || 'Central Dispatch Hub'}</p>
        {unit.assignedPickup && (
          <p className="text-xs text-indigo-300 font-mono">Job ID: {unit.assignedPickup}</p>
        )}
      </div>

      {/* Driver Contact */}
      <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <User className="w-4 h-4 text-slate-400" />
          <span>{unit.driver}</span>
        </div>
        <a
          href={`tel:${unit.phone}`}
          className="flex items-center gap-1 font-mono text-indigo-400 hover:text-indigo-300"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{unit.phone}</span>
        </a>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => onFocusUnit && onFocusUnit([unit.latitude, unit.longitude])}
          className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-1.5"
        >
          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
          Focus Map
        </button>

        {onDispatchModal && (
          <button
            onClick={() => onDispatchModal(unit)}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow-indigo transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Reassign Job
          </button>
        )}
      </div>
    </div>
  );
}
