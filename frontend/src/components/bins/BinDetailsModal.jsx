import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { formatWeight, formatPercentage } from '../../utils/formatters';
import { Trash2, AlertCircle, Shield, Truck } from 'lucide-react';

export default function BinDetailsModal({ isOpen, onClose, bin, onCreatePickup }) {
  if (!bin) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Smart Bin Details: ${bin.category} Container`}>
      <div className="space-y-6">
        {/* Top Info Header */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-indigo-400">{bin.binId}</span>
              <Badge label={bin.status} variant={bin.fillPercentage >= 80 ? 'danger' : 'success'} />
            </div>
            <p className="text-sm font-bold text-white">{bin.locationTag}</p>
            <p className="text-xs text-slate-400">{bin.facility}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Fill Level</p>
            <p className="text-2xl font-black text-white">{formatPercentage(bin.fillPercentage)}</p>
          </div>
        </div>

        {/* Weight & Capacity Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-400">Current Weight</p>
            <p className="text-base font-bold text-white mt-1">{formatWeight(bin.currentLoadKg)}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-400">Max Capacity</p>
            <p className="text-base font-bold text-white mt-1">{bin.maxCapacityKg} kg</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-400">Item Count</p>
            <p className="text-base font-bold text-white mt-1">{bin.itemCount} items</p>
          </div>
        </div>

        {/* Accepted Waste Types */}
        <div className="space-y-2">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Accepted Bio-Medical Waste Types</h5>
          <div className="flex flex-wrap gap-2">
            {bin.wasteTypesIncluded?.map((type, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700"
              >
                • {type}
              </span>
            ))}
          </div>
        </div>

        {/* Prescribed Treatment Protocol */}
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3">
          <Shield className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-indigo-300">Mandated BMW Treatment Protocol</h5>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{bin.treatmentProtocol}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onCreatePickup(bin);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all"
          >
            <Truck className="w-4 h-4" />
            Dispatch Pickup for this Bin
          </button>
        </div>
      </div>
    </Modal>
  );
}
