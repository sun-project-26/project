import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Truck, CheckCircle2, Battery, Gauge } from 'lucide-react';
import { INITIAL_MOBILE_UNITS } from '../../data/mockData';

export default function AssignUnitModal({ isOpen, onClose, pickup, onAssignConfirm }) {
  const [selectedUnitId, setSelectedUnitId] = useState('MS-02');

  if (!pickup) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign Mobile Unit for ${pickup.pickupId}`}>
      <div className="space-y-4">
        <p className="text-xs text-slate-400">
          Select the nearest mobile waste collection vehicle to dispatch to <strong className="text-white">{pickup.facility}</strong>.
        </p>

        {/* Units list */}
        <div className="space-y-2.5">
          {INITIAL_MOBILE_UNITS.map((unit) => {
            const isSelected = selectedUnitId === unit.unitId;
            return (
              <div
                key={unit.unitId}
                onClick={() => setSelectedUnitId(unit.unitId)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-glow-indigo'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{unit.unitId}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                        {unit.driver}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Status: {unit.status} • {unit.eta}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div className="hidden sm:block text-xs">
                    <span className="text-slate-400">Battery: </span>
                    <span className="font-bold text-emerald-400">{unit.batteryLevel}%</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAssignConfirm(pickup.pickupId, selectedUnitId);
              onClose();
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all"
          >
            <Truck className="w-4 h-4" />
            Dispatch {selectedUnitId}
          </button>
        </div>
      </div>
    </Modal>
  );
}
