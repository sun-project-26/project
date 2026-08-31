import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Truck, Plus } from 'lucide-react';

export default function NewPickupModal({ isOpen, onClose, onSubmit, initialCategory = 'YELLOW' }) {
  const [facility, setFacility] = useState('District Civil Hospital Nashik - Ward 4B');
  const [wasteCategory, setWasteCategory] = useState(initialCategory);
  const [weight, setWeight] = useState('15.0');
  const [priority, setPriority] = useState('High');
  const [pickupNotes, setPickupNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      facility,
      wasteCategory,
      weight: parseFloat(weight) || 10,
      priority,
      pickupNotes
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create On-Demand Medical Waste Pickup">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Facility */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Healthcare Facility / Ward (Nashik)
          </label>
          <select
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="District Civil Hospital Nashik - Ward 4B">District Civil Hospital Nashik - Ward 4B (Trimbak Naka)</option>
            <option value="Wockhardt Hospital Nashik - ICU Block">Wockhardt Hospital Nashik - ICU Block (Wadala Naka)</option>
            <option value="Sahyadri Super Speciality Hospital - Dialysis">Sahyadri Super Speciality - Dialysis (Indira Nagar)</option>
            <option value="HCG Manavata Cancer Centre - Oncology OT">HCG Manavata Cancer Centre - Oncology OT (Mumbai Naka)</option>
            <option value="Ashoka Medicover Hospitals - Trauma Wing">Ashoka Medicover Hospitals - Trauma Wing (Ashoka Marg)</option>
            <option value="Apollo Hospitals Nashik - Minor OT">Apollo Hospitals Nashik - Minor OT (Panchavati)</option>
          </select>
        </div>

        {/* Category & Weight in 2 cols */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Waste Category
            </label>
            <select
              value={wasteCategory}
              onChange={(e) => setWasteCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="YELLOW">YELLOW (Anatomical/Soiled)</option>
              <option value="RED">RED (Recyclable Plastics)</option>
              <option value="WHITE">WHITE (Sharps/Needles)</option>
              <option value="BLUE">BLUE (Glassware/Implants)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Estimated Weight (kg)
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              required
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 14.5"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Pickup Priority SLA
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['Critical', 'High', 'Medium', 'Low'].map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPriority(p)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  priority === p
                    ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Special Instructions / Ward Notes
          </label>
          <textarea
            rows={3}
            value={pickupNotes}
            onChange={(e) => setPickupNotes(e.target.value)}
            placeholder="e.g., Post-surgical biohazard boxes sealed and tagged at dock #2."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Pickup Job
          </button>
        </div>
      </form>
    </Modal>
  );
}
