import React from 'react';
import Modal from '../common/Modal';
import { BMW_CATEGORIES } from '../../data/segregationGuide';
import { ShieldCheck, AlertOctagon, CheckCircle2 } from 'lucide-react';

export default function SegregationGuideModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Bio-Medical Waste Segregation Guide (BMW Rules)" maxWidth="max-w-4xl">
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
        <p className="text-xs text-slate-400">
          Standardized waste classification reference according to Bio-Medical Waste Management Rules. Automated in MediSort AI edge scanner.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(BMW_CATEGORIES).map((cat) => (
            <div
              key={cat.category}
              className={`p-5 rounded-2xl border ${cat.glowClass} space-y-3`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cat.badgeClass}`}>
                  {cat.category} BIN
                </span>
                <span className="text-[11px] font-semibold text-slate-400">{cat.hazard}</span>
              </div>

              <h4 className="text-sm font-bold text-white">{cat.name}</h4>

              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 mb-1">Key Waste Items:</p>
                <ul className="text-xs text-slate-300 space-y-1">
                  {cat.wasteTypes.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-indigo-400"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px]">
                <span className="font-bold text-slate-400">Disposal Method: </span>
                <span className="text-slate-200">{cat.treatmentMethod}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
