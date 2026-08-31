import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, Sparkles, Wifi, WifiOff, CheckCircle2 } from 'lucide-react';
import { checkBackendHealth } from '../../services/api';

export default function Header({ onMenuClick, onStartDemo, isDemoActive }) {
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [facility, setFacility] = useState('District Civil Hospital Nashik');

  useEffect(() => {
    checkBackendHealth().then((status) => setIsBackendOnline(status));
    const interval = setInterval(() => {
      checkBackendHealth().then((status) => setIsBackendOnline(status));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-20 bg-[#090d16]/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left side: Mobile menu toggle & Title / Search */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Waste ID, Pickup #, Facility, or Unit..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/70 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Right side: Facility Selector, API Status, Demo Trigger, Profile */}
      <div className="flex items-center gap-3">
        {/* Facility Selector */}
        <div className="hidden md:flex items-center">
          <select
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="District Civil Hospital Nashik">District Civil Hospital (Trimbak Naka)</option>
            <option value="Wockhardt Hospital Nashik">Wockhardt Hospital (Wadala Naka)</option>
            <option value="Sahyadri Super Speciality Hospital">Sahyadri Super Speciality (Indira Nagar)</option>
            <option value="Ashoka Medicover Hospitals">Ashoka Medicover (Ashoka Marg)</option>
            <option value="HCG Manavata Cancer Centre">HCG Manavata (Mumbai Naka)</option>
            <option value="Apollo Hospitals Nashik">Apollo Hospitals (Panchavati)</option>
          </select>
        </div>

        {/* Backend Connectivity Status Indicator */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border ${
            isBackendOnline
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
          }`}
          title={isBackendOnline ? 'Connected to Node.js Backend API' : 'Using In-Browser Deterministic Mock Engine'}
        >
          {isBackendOnline ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Live API</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Demo Mock Mode</span>
            </>
          )}
        </div>

        {/* Demo Mode Trigger Button */}
        <button
          onClick={onStartDemo}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            isDemoActive
              ? 'bg-indigo-600 text-white shadow-glow-indigo'
              : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/25'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Live Tour</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#090d16]"></span>
        </div>

        {/* Admin Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white shadow-sm ring-1 ring-white/20">
          MO
        </div>
      </div>
    </header>
  );
}
