import React from 'react';
import Badge from '../common/Badge';
import { formatWeight } from '../../utils/formatters';
import { Truck, MapPin, CheckCircle, UserCheck } from 'lucide-react';

export default function PickupTable({ pickups = [], onAssign, onComplete, onTrack }) {
  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return <Badge label="Critical" variant="danger" />;
      case 'high':
        return <Badge label="High" variant="warning" />;
      case 'medium':
        return <Badge label="Medium" variant="primary" />;
      default:
        return <Badge label="Low" variant="default" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <Badge label="Completed" variant="success" />;
      case 'en route':
        return <Badge label="En Route" variant="primary" />;
      case 'collecting':
        return <Badge label="Collecting" variant="warning" />;
      case 'assigned':
        return <Badge label="Assigned" variant="primary" />;
      default:
        return <Badge label="Pending" variant="default" />;
    }
  };

  const getCategoryBadge = (category) => {
    const cat = category?.toLowerCase();
    if (['yellow', 'red', 'white', 'blue'].includes(cat)) {
      return <Badge label={category} variant={cat} />;
    }
    return <Badge label={category || 'MIXED'} variant="default" />;
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/40">
            <th className="py-4 px-4">Pickup ID</th>
            <th className="py-4 px-4">Facility</th>
            <th className="py-4 px-4">Category</th>
            <th className="py-4 px-4">Weight</th>
            <th className="py-4 px-4">Priority</th>
            <th className="py-4 px-4">Assigned Unit</th>
            <th className="py-4 px-4">Status</th>
            <th className="py-4 px-4">Created</th>
            <th className="py-4 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-xs">
          {pickups.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-8 text-center text-slate-500">
                No pickup jobs found matching the filter criteria.
              </td>
            </tr>
          ) : (
            pickups.map((pickup) => (
              <tr
                key={pickup.pickupId}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                <td className="py-4 px-4 font-mono font-bold text-indigo-400">
                  {pickup.pickupId}
                </td>
                <td className="py-4 px-4 font-semibold text-white">
                  {pickup.facility}
                </td>
                <td className="py-4 px-4">
                  {getCategoryBadge(pickup.wasteCategory)}
                </td>
                <td className="py-4 px-4 font-bold text-slate-200">
                  {formatWeight(pickup.weight)}
                </td>
                <td className="py-4 px-4">
                  {getPriorityBadge(pickup.priority)}
                </td>
                <td className="py-4 px-4 font-medium text-slate-300">
                  {pickup.assignedUnit === 'Unassigned' ? (
                    <span className="text-slate-500 italic">Unassigned</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-indigo-300 font-bold">
                      <Truck className="w-3 h-3 text-indigo-400" />
                      {pickup.assignedUnit}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4">
                  {getStatusBadge(pickup.status)}
                </td>
                <td className="py-4 px-4 text-slate-400">
                  {pickup.createdAt || 'Today'}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {pickup.status === 'Pending' && (
                      <button
                        onClick={() => onAssign(pickup)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/30 transition-all"
                        title="Assign Mobile Unit"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        Assign
                      </button>
                    )}

                    {pickup.status !== 'Completed' && (
                      <button
                        onClick={() => onTrack(pickup)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                        title="Track on Live GPS Map"
                      >
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        Track
                      </button>
                    )}

                    {pickup.status !== 'Completed' && (
                      <button
                        onClick={() => onComplete(pickup.pickupId)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
                        title="Mark Completed"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Done
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
