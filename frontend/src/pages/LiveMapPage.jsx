import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LeafletMap from '../components/map/LeafletMap';
import LiveOperationsPanel from '../components/map/LiveOperationsPanel';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import { useLiveFleet } from '../hooks/useLiveFleet';
import { Truck, MapPin, Activity, Navigation, Radio, Compass } from 'lucide-react';

export default function LiveMapPage() {
  const { units } = useLiveFleet(2500);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [focusCoords, setFocusCoords] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (units.length > 0 && !selectedUnit) {
      setSelectedUnit(units[0]);
    }
  }, [units, selectedUnit]);

  useEffect(() => {
    if (location.state?.targetPickup?.coords) {
      setFocusCoords(location.state.targetPickup.coords);
    }
  }, [location.state]);

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setFocusCoords([unit.latitude, unit.longitude]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Title & Telematics Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Live Telematics Grid
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-bold border border-indigo-500/30">
              OpenStreetMap + GPS Simulation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Mobile Unit Fleet Tracking
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time GPS positions, transit speeds, and automated dispatch routing for mobile collection units.
          </p>
        </div>

        {/* Quick Fleet Pill Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {units.map((u) => (
            <button
              key={u.unitId}
              onClick={() => handleSelectUnit(u)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedUnit?.unitId === u.unitId
                  ? 'bg-indigo-600 text-white shadow-glow-indigo'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{u.unitId}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'En Route' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Map (8 cols) + Right Telematics Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-8">
          <LeafletMap
            units={units}
            onSelectUnit={handleSelectUnit}
            selectedUnit={selectedUnit}
            focusCoords={focusCoords}
          />
        </div>

        {/* Live Operations Telematics Drawer */}
        <div className="lg:col-span-4 space-y-4">
          <LiveOperationsPanel
            unit={selectedUnit}
            onFocusUnit={(coords) => setFocusCoords(coords)}
          />

          {/* Quick Hub Telematics Card */}
          <GlassCard className="p-5 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">Regional Disposal Hub</span>
              <Badge label="Operational" variant="success" size="sm" />
            </div>
            <p className="text-slate-300">
              CBWTF Treatment Plant #1 (Incineration & Autoclave Facility)
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
              <span>Capacity Available:</span>
              <span className="font-bold text-emerald-400">4,200 kg / day</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
