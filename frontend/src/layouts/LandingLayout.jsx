import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import InteractiveDemoModal from '../components/demo/InteractiveDemoModal';
import Toast from '../components/common/Toast';
import { useNotifications } from '../hooks/useNotifications';
import { ShieldCheck, HeartHandshake, ArrowRight, Github } from 'lucide-react';

export default function LandingLayout() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toasts, removeToast } = useNotifications();

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar onStartDemo={() => setIsDemoModalOpen(true)} />

      {/* Main Landing Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* HealthTech SaaS Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070a12] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Column 1: Brand */}
            <div className="md:col-span-1 space-y-4">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-glow-indigo">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-black tracking-tight text-white">MEDISORT AI</span>
              </Link>
              <p className="text-xs text-slate-400 leading-relaxed">
                Smart Mobile Medical-Waste Collection &amp; Segregation System. AI-first software platform that classifies, routes, and traces biomedical waste in real time.
              </p>
              <div className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                <span>BMW Rules 2016 Compliant</span>
              </div>
            </div>

            {/* Column 2: Core Platform Modules */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Core Modules</h5>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                <li><Link to="/scanner" className="hover:text-indigo-400 transition-colors">AI Waste Scanner</Link></li>
                <li><Link to="/bins" className="hover:text-indigo-400 transition-colors">Smart Bins Telemetry</Link></li>
                <li><Link to="/pickups" className="hover:text-indigo-400 transition-colors">On-Demand Dispatch</Link></li>
                <li><Link to="/map" className="hover:text-indigo-400 transition-colors">Mobile Fleet GPS Simulator</Link></li>
                <li><Link to="/traceability" className="hover:text-indigo-400 transition-colors">Tamper-Evident Ledger</Link></li>
              </ul>
            </div>

            {/* Column 3: BMW Regulatory Standards */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">BMW Categories</h5>
              <ul className="space-y-2.5 text-xs font-medium">
                <li className="text-yellow-400/90">• Yellow: Anatomical & Infectious</li>
                <li className="text-red-400/90">• Red: Contaminated Plastics</li>
                <li className="text-slate-300">• White: Puncture-Proof Sharps</li>
                <li className="text-blue-400/90">• Blue: Glassware & Implants</li>
              </ul>
            </div>

            {/* Column 4: Quick Launch */}
            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">Launch Prototype</h5>
              <p className="text-xs text-slate-400">
                Experience the live command center with simulated real-time fleet telematics.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all"
              >
                Open Command Center
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 MediSort AI. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Zero-Hardware Architecture • Pure Software Intelligence
            </p>
          </div>
        </div>
      </footer>

      {/* Global Toast Notifications */}
      <Toast toasts={toasts} onClose={removeToast} />

      {/* Demo Initiation Modal */}
      <InteractiveDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onStartGuided={() => navigate('/scanner')}
        onStartAuto={() => navigate('/scanner')}
      />
    </div>
  );
}
