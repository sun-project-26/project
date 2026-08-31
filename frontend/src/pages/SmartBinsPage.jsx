import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BinCard from '../components/bins/BinCard';
import BinDetailsModal from '../components/bins/BinDetailsModal';
import SegregationGuideModal from '../components/bins/SegregationGuideModal';
import NewPickupModal from '../components/pickups/NewPickupModal';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import { fetchBins } from '../services/binService';
import { createPickup } from '../services/pickupService';
import { notify } from '../hooks/useNotifications';
import { Trash2, BookOpen, Plus, Info, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

export default function SmartBinsPage() {
  const [bins, setBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isNewPickupOpen, setIsNewPickupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loadBins = async () => {
    setIsLoading(true);
    const data = await fetchBins();
    setBins(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadBins();
  }, []);

  const handleCreatePickupSubmit = async (payload) => {
    const newJob = await createPickup(payload);
    notify(`Created Pickup Job: ${newJob.pickupId}`, 'success');
    navigate('/pickups');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Virtual Load Cell Telemetry
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30">
              4 BMW Categories
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Smart Bins Capacity Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time weight monitoring and automatic pickup dispatch triggers without physical hardware sensors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsGuideOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            BMW Guide
          </button>

          <button
            onClick={() => setIsNewPickupOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Pickup
          </button>
        </div>
      </div>

      {/* 4 BMW Bin Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bins.map((bin) => (
          <BinCard key={bin.binId} bin={bin} onClick={setSelectedBin} />
        ))}
      </div>

      {/* Info & Regulatory Safeguard Banner */}
      <GlassCard className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 shadow-glow-indigo">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Automated Capacity Threshold Triggers</h4>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              When any smart bin crosses <strong>75% capacity load</strong>, MediSort AI automatically generates an on-demand pickup order and dispatches the nearest mobile collection vehicle within 45 minutes SLA.
            </p>
          </div>
        </div>

        <button
          onClick={loadBins}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Levels
        </button>
      </GlassCard>

      {/* Bin Details Modal */}
      <BinDetailsModal
        isOpen={!!selectedBin}
        onClose={() => setSelectedBin(null)}
        bin={selectedBin}
        onCreatePickup={(bin) => {
          setIsNewPickupOpen(true);
        }}
      />

      {/* Segregation Guide Modal */}
      <SegregationGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* New Pickup Modal */}
      <NewPickupModal
        isOpen={isNewPickupOpen}
        onClose={() => setIsNewPickupOpen(false)}
        onSubmit={handleCreatePickupSubmit}
        initialCategory={selectedBin?.category || 'YELLOW'}
      />
    </div>
  );
}
