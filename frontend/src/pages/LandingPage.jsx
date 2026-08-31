import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ScanLine,
  Trash2,
  Truck,
  FileCheck,
  BarChart3,
  CheckCircle2,
  Building2,
  Activity,
  AlertTriangle,
  Zap,
  Lock,
  ChevronRight,
  Play
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import SegregationGuideModal from '../components/bins/SegregationGuideModal';

export default function LandingPage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="space-y-24 sm:space-y-32 pb-16 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-8 shadow-glow-indigo animate-float">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>AI-Powered Medical Waste Management • Zero-Hardware Platform</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Smarter Medical Waste.{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-purple-400">
            Safer Healthcare.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          MediSort AI classifies, routes, tracks, and traces biomedical waste through one software-first platform—eliminating physical hardware barriers with computer vision and real-time fleet simulation.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all hover:scale-105"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 backdrop-blur-xl transition-all"
          >
            <span>See How It Works</span>
            <ChevronRight className="w-4 h-4 text-indigo-400" />
          </a>
        </div>

        {/* HERO VISUAL: Premium HealthTech Command Center Glassmorphism Mockup */}
        <div className="mt-16 sm:mt-20 relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl border border-slate-700/70 bg-[#0d1322]/90 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl overflow-hidden ring-1 ring-white/10">
            {/* Mock Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">medisort.ai/command-center</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-semibold">Live System Operational</span>
              </div>
            </div>

            {/* Mock Grid Elements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* Left: AI Classification Card */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    WST-2026-081
                  </span>
                  <Badge label="WHITE" variant="white" size="sm" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl shrink-0">
                    💉
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Used Syringe & Needle</h5>
                    <p className="text-[11px] text-slate-400">Puncture Sharps</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Confidence:</span>
                  <span className="font-extrabold text-emerald-400">96.8%</span>
                </div>
              </div>

              {/* Middle: Smart Bins Status */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Smart Bin Telemetry</span>
                  <span className="text-[10px] text-slate-400">4 Categories</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-yellow-400">
                    <span>Yellow (Infectious)</span>
                    <span className="font-bold">68%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 w-[68%]" />
                  </div>
                  <div className="flex justify-between text-slate-200 pt-1">
                    <span>White (Sharps)</span>
                    <span className="font-bold">82%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-200 w-[82%]" />
                  </div>
                </div>
              </div>

              {/* Right: Live Mobile Unit Tracking */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Mobile Unit MS-02</span>
                  <Badge label="En Route" variant="primary" size="sm" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-white">Rajesh Kumar</p>
                    <p className="text-[11px] text-slate-400">Speed: 36 km/h • ETA: 6m</p>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-[10px] text-indigo-300 font-mono flex items-center justify-between">
                  <span>SHA-256 Ledger:</span>
                  <span>7b8c...5f6a</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION (4 STEPS WITH CONNECTING LINE) */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge label="Workflow Engine" variant="primary" size="md" />
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            How MediSort AI Operates
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            A seamless 4-step autonomous pipeline from point of care to certified disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <GlassCard hoverEffect={true} className="relative group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-black text-lg shadow-glow-indigo">
              01
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
              AI Waste Scanner
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Staff captures an image at the point of generation. Vision model instantly identifies item, assigns BMW category, and calculates confidence score.
            </p>
          </GlassCard>

          {/* Step 2 */}
          <GlassCard hoverEffect={true} className="relative group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-black text-lg shadow-glow-indigo">
              02
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
              Smart Bin Mapping
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Virtual telemetry logs waste weight into designated Yellow, Red, White, or Blue digital bins without expensive IoT physical load cells.
            </p>
          </GlassCard>

          {/* Step 3 */}
          <GlassCard hoverEffect={true} className="relative group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-black text-lg shadow-glow-indigo">
              03
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
              Mobile Unit Simulator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Intelligent dispatch algorithm assigns the nearest mobile collection vehicle, optimizes route sequence, and tracks live GPS transit on Leaflet maps.
            </p>
          </GlassCard>

          {/* Step 4 */}
          <GlassCard hoverEffect={true} className="relative group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-lg shadow-glow-indigo">
              04
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              Pickup + Traceability
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every handover is cryptographically stamped with SHA-256 block hashing, generating tamper-evident audit trails for regulatory compliance.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* 3. IMPACT & BENEFICIARIES SECTION */}
      <section id="impact" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-slate-800 bg-[#0d1322]/80 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <Badge label="Public Health & Efficiency" variant="primary" />
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
              Measurable Healthcare Impact
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Transforming biomedical waste compliance across clinical tiers in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Beneficiaries */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-400" />
                Target Beneficiaries
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Hospitals & Nursing Homes', desc: 'Automate ward segregation compliance and eliminate manual logging errors.' },
                  { title: 'Clinics & Diagnostic Labs', desc: 'Affordable on-demand collection without expensive dedicated equipment.' },
                  { title: 'Urban & Primary Health Centres (UPHCs)', desc: 'Standardize safety protocols across remote healthcare outposts.' },
                  { title: 'Pollution Control Boards & CBWTF Operators', desc: 'Access real-time, tamper-proof digital manifests.' },
                ].map((b, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <p className="text-xs font-bold text-white">{b.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Quantifiable Outcomes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: '85%+ Error Reduction', desc: 'Vision classification prevents dangerous mixed waste disposal.' },
                  { title: '100% Audit-Ready', desc: 'SHA-256 digital proof-of-custody for CPCB compliance.' },
                  { title: '40% Faster Pickup', desc: 'Dynamic mobile fleet routing prioritizes critical biohazards.' },
                  { title: 'Zero Hardware Cost', desc: 'No IoT bin load cells or specialized readers required.' },
                ].map((o, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-1">
                    <p className="text-sm font-black text-indigo-300">{o.title}</p>
                    <p className="text-[11px] text-slate-400">{o.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BMW RULES COMPLIANCE PREVIEW */}
      <section id="compliance" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl border border-slate-800 bg-[#0d1322]/80 backdrop-blur-xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">CPCB Standards</span>
            <h3 className="text-2xl font-black text-white mt-1">Bio-Medical Waste (BMW) Management Rules</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              MediSort AI is programmed with official segregation protocols for Yellow, Red, White, and Blue categories.
            </p>
          </div>
          <button
            onClick={() => setIsGuideOpen(true)}
            className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all shrink-0"
          >
            View Segregation Guide
          </button>
        </div>
      </section>

      {/* 5. BOTTOM CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-10 sm:p-14 rounded-3xl border border-indigo-500/40 bg-gradient-to-tr from-indigo-950/50 via-slate-900/80 to-purple-950/40 shadow-glow-indigo space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready to Experience MediSort AI?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Launch the command center to explore the live AI scanner, simulate fleet routing, and inspect the digital custody ledger.
          </p>
          <div className="pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo transition-all hover:scale-105"
            >
              Launch Live Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Segregation Guide Modal */}
      <SegregationGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
}
