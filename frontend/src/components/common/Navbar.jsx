import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function Navbar({ onStartDemo }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-glow-indigo group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">MEDISORT</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">AI</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Smart Bio-Medical Waste</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How It Works</a>
          <a href="#impact" className="hover:text-indigo-400 transition-colors">Impact & Value</a>
          <a href="#compliance" className="hover:text-indigo-400 transition-colors">BMW Rules</a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          {onStartDemo && (
            <button
              onClick={onStartDemo}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Live Demo
            </button>
          )}

          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-indigo hover:shadow-indigo-500/40 transition-all hover:translate-y-[-1px]"
          >
            Launch Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
