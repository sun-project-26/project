import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  Trash2,
  Truck,
  MapPin,
  FileCheck,
  BarChart3,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/scanner', label: 'AI Scanner', icon: ScanLine, badge: 'Vision' },
  { path: '/bins', label: 'Smart Bins', icon: Trash2, badge: '4 BMW' },
  { path: '/pickups', label: 'Pickups', icon: Truck },
  { path: '/map', label: 'Live Map', icon: MapPin, badge: 'Fleet' },
  { path: '/traceability', label: 'Traceability', icon: FileCheck, badge: 'SHA-256' },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Sidebar({ isOpen, onClose, onOpenDemo }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0d1322] border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-glow-indigo">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white">MEDISORT</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Medical Waste Platform</p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Navigation</p>
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-glow-indigo'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-slate-800 text-slate-400 border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Quick Demo Mode Trigger inside Sidebar */}
          {onOpenDemo && (
            <div className="pt-4">
              <button
                onClick={() => {
                  onClose();
                  onOpenDemo();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 hover:from-amber-500/30 hover:to-orange-500/30 transition-all shadow-glow-yellow"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Live Tour</span>
              </button>
            </div>
          )}
        </div>

        {/* User Profile & Facility Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">District Civil Hospital, Nashik</p>
              <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Nashik Hub Node Active
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
