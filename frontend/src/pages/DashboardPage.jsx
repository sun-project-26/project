import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatCard from '../components/common/StatCard';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import BinCard from '../components/bins/BinCard';
import BinDetailsModal from '../components/bins/BinDetailsModal';
import NewPickupModal from '../components/pickups/NewPickupModal';
import { fetchBins } from '../services/binService';
import { fetchPickups, createPickup } from '../services/pickupService';
import { useLiveFleet } from '../hooks/useLiveFleet';
import { SAMPLE_TRACEABILITY_CHAIN, SAMPLE_WASTE_ITEMS } from '../data/mockData';
import { formatWeight, truncateHash } from '../utils/formatters';
import { notify } from '../hooks/useNotifications';
import {
  Trash2,
  Truck,
  ScanLine,
  Activity,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Plus,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function DashboardPage() {
  const [bins, setBins] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);
  const [isNewPickupOpen, setIsNewPickupOpen] = useState(false);
  const { units } = useLiveFleet();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBins().then((data) => setBins(data));
    fetchPickups().then((data) => setPickups(data.slice(0, 4)));
  }, []);

  const handleCreatePickupSubmit = async (payload) => {
    const newJob = await createPickup(payload);
    setPickups((prev) => [newJob, ...prev.slice(0, 3)]);
    notify(`Created Pickup Job: ${newJob.pickupId} (${payload.priority} Priority)`, 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. TOP TITLE BAR & ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Healthcare Operations Command Center
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Live Fleet Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            District Civil Hospital Nashik Command Hub
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/scanner"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all"
          >
            <ScanLine className="w-4 h-4" />
            AI Waste Scanner
          </Link>

          <button
            onClick={() => setIsNewPickupOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
          >
            <Plus className="w-4 h-4 text-indigo-400" />
            New Pickup
          </button>
        </div>
      </div>

      {/* 2. FOUR CORE STAT KPI CARDS (Animated Counters Aesthetic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Waste Processed"
          value="1,284"
          unit="kg"
          change="+14.2%"
          isPositive={true}
          icon={Trash2}
          color="indigo"
        />

        <StatCard
          title="Pending Pickups"
          value="24"
          unit="jobs"
          change="-4.5%"
          isPositive={true}
          icon={Truck}
          color="yellow"
        />

        <StatCard
          title="Active Mobile Units"
          value="08"
          unit="fleet"
          change="100% Online"
          isPositive={true}
          icon={Activity}
          color="emerald"
        />

        <StatCard
          title="AI Classification Accuracy"
          value="96.8"
          unit="%"
          change="+1.8%"
          isPositive={true}
          icon={ShieldCheck}
          color="blue"
        />
      </div>

      {/* 3. SMART BINS OVERVIEW */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Smart Bin Virtual Telemetry</h2>
            <p className="text-xs text-slate-400">Point-of-care waste capacity across 4 BMW categories</p>
          </div>
          <Link
            to="/bins"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View All Bins</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bins.map((bin) => (
            <BinCard key={bin.binId} bin={bin} onClick={setSelectedBin} />
          ))}
        </div>
      </div>

      {/* 4. TWO-COLUMN SPLIT: QUICK SCANNER PREVIEW & LIVE FLEET TRACKER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (1 col): Quick AI Scan Trigger Box */}
        <GlassCard className="lg:col-span-1 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Point-of-Care Scanner
              </span>
              <Badge label="Edge Vision" variant="primary" size="sm" />
            </div>
            <h3 className="text-lg font-bold text-white">Classify Waste Instantaneously</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Upload medical waste photos for automatic color-coded bin classification & human review threshold checking.
            </p>

            {/* Mini preview thumbnail */}
            <div className="mt-4 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <img
                src={SAMPLE_WASTE_ITEMS[0].sampleImage}
                alt="Syringe"
                className="w-12 h-12 rounded-xl object-cover border border-slate-700"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{SAMPLE_WASTE_ITEMS[0].name}</p>
                <p className="text-[11px] text-emerald-400 font-semibold">96.8% Confidence (White Container)</p>
              </div>
            </div>
          </div>

          <Link
            to="/scanner"
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all"
          >
            <ScanLine className="w-4 h-4" />
            Open Full AI Scanner
          </Link>
        </GlassCard>

        {/* Right (2 cols): Live Fleet & Route Telematics Preview */}
        <GlassCard className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Live Mobile Units Telematics</h3>
                <p className="text-xs text-slate-400">Autonomous GPS route tracking for collection fleet</p>
              </div>
            </div>
            <Link
              to="/map"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Full Live Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {units.slice(0, 4).map((unit) => (
              <div
                key={unit.unitId}
                onClick={() => navigate('/map')}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white">{unit.unitId}</span>
                    <span className="text-xs text-slate-400 font-medium">{unit.driver}</span>
                  </div>
                  <Badge
                    label={unit.status}
                    variant={unit.status === 'En Route' ? 'primary' : unit.status === 'Collecting' ? 'warning' : 'success'}
                    size="sm"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Speed: <strong className="text-white">{unit.speedKmH || 30} km/h</strong></span>
                  <span>Battery: <strong className="text-emerald-400">{unit.batteryLevel || 85}%</strong></span>
                  <span>ETA: <strong className="text-indigo-300">{unit.eta || 'Standby'}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* 5. RECENT PICKUPS & AUDIT TRAIL FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Pickups Table (2 cols) */}
        <GlassCard className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Active Pickup Requests</h3>
            <Link
              to="/pickups"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-2.5 px-3">Job ID</th>
                  <th className="py-2.5 px-3">Facility</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Weight</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {pickups.map((p) => (
                  <tr key={p.pickupId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-indigo-400">{p.pickupId}</td>
                    <td className="py-3 px-3 text-white truncate max-w-[150px]">{p.facility}</td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-xs">{p.wasteCategory}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{formatWeight(p.weight)}</td>
                    <td className="py-3 px-3">
                      <Badge
                        label={p.status}
                        variant={p.status === 'Completed' ? 'success' : p.status === 'En Route' ? 'primary' : 'default'}
                        size="sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Digital Traceability Live Feed (1 col) */}
        <GlassCard className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Cryptographic Custody Feed</h3>
            </div>
            <Link
              to="/traceability"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Ledger
            </Link>
          </div>

          <div className="space-y-3">
            {SAMPLE_TRACEABILITY_CHAIN.slice(-3).reverse().map((evt, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{evt.title}</span>
                  <span className="text-[10px] text-slate-500">{evt.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-400">{evt.actor} • {evt.location}</p>
                <p className="font-mono text-[10px] text-indigo-300 truncate">
                  Hash: {truncateHash(evt.hash, 10)}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Bin Details Modal */}
      <BinDetailsModal
        isOpen={!!selectedBin}
        onClose={() => setSelectedBin(null)}
        bin={selectedBin}
        onCreatePickup={(bin) => {
          setIsNewPickupOpen(true);
        }}
      />

      {/* New Pickup Modal */}
      <NewPickupModal
        isOpen={isNewPickupOpen}
        onClose={() => setIsNewPickupOpen(false)}
        onSubmit={handleCreatePickupSubmit}
      />
    </div>
  );
}
