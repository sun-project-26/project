import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PickupTable from '../components/pickups/PickupTable';
import NewPickupModal from '../components/pickups/NewPickupModal';
import AssignUnitModal from '../components/pickups/AssignUnitModal';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import { fetchPickups, createPickup, updatePickupStatus } from '../services/pickupService';
import { notify } from '../hooks/useNotifications';
import { Truck, Plus, Filter, RefreshCw, CheckCircle2, Clock } from 'lucide-react';

export default function PickupsPage() {
  const [pickups, setPickups] = useState([]);
  const [filteredPickups, setFilteredPickups] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [assignModalPickup, setAssignModalPickup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loadPickups = async () => {
    setIsLoading(true);
    const data = await fetchPickups();
    setPickups(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPickups();
  }, []);

  useEffect(() => {
    let result = [...pickups];
    if (statusFilter !== 'All') {
      result = result.filter((p) => p.status.toLowerCase() === statusFilter.toLowerCase());
    }
    if (categoryFilter !== 'All') {
      result = result.filter((p) => p.wasteCategory.toUpperCase() === categoryFilter.toUpperCase());
    }
    setFilteredPickups(result);
  }, [pickups, statusFilter, categoryFilter]);

  const handleCreatePickup = async (payload) => {
    const created = await createPickup(payload);
    setPickups((prev) => [created, ...prev]);
    notify(`Created Pickup ${created.pickupId} successfully!`, 'success');
  };

  const handleAssignConfirm = async (pickupId, unitId) => {
    const updated = await updatePickupStatus(pickupId, 'En Route', unitId);
    setPickups((prev) =>
      prev.map((p) => (p.pickupId === pickupId ? { ...p, status: 'En Route', assignedUnit: unitId } : p))
    );
    notify(`Assigned Mobile Unit ${unitId} to Pickup ${pickupId}!`, 'success');
  };

  const handleMarkComplete = async (pickupId) => {
    await updatePickupStatus(pickupId, 'Completed');
    setPickups((prev) =>
      prev.map((p) => (p.pickupId === pickupId ? { ...p, status: 'Completed' } : p))
    );
    notify(`Pickup ${pickupId} marked as Completed & Disposed!`, 'success');
  };

  const handleTrackOnMap = (pickup) => {
    navigate('/map', { state: { targetPickup: pickup } });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Fleet Scheduling & Logistics
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-bold border border-indigo-500/30">
              {pickups.filter((p) => p.status !== 'Completed').length} Active Pickups
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Pickup Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Prioritized collection queue for infectious & hazardous waste across regional healthcare facilities.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Pickup Request
        </button>
      </div>

      {/* Filter Toolbar */}
      <GlassCard className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span>Filter Status:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['All', 'Pending', 'Assigned', 'En Route', 'Collecting', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-indigo-600 text-white shadow-glow-indigo'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="YELLOW">Yellow (Infectious)</option>
            <option value="RED">Red (Plastics)</option>
            <option value="WHITE">White (Sharps)</option>
            <option value="BLUE">Blue (Glass)</option>
          </select>

          <button
            onClick={loadPickups}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Refresh Table"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </GlassCard>

      {/* Main Table */}
      <GlassCard className="p-0 sm:p-2 overflow-hidden">
        <PickupTable
          pickups={filteredPickups}
          onAssign={(p) => setAssignModalPickup(p)}
          onComplete={handleMarkComplete}
          onTrack={handleTrackOnMap}
        />
      </GlassCard>

      {/* New Pickup Modal */}
      <NewPickupModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={handleCreatePickup}
      />

      {/* Assign Unit Modal */}
      <AssignUnitModal
        isOpen={!!assignModalPickup}
        onClose={() => setAssignModalPickup(null)}
        pickup={assignModalPickup}
        onAssignConfirm={handleAssignConfirm}
      />
    </div>
  );
}
