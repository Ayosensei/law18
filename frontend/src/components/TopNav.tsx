'use client';

import React from 'react';
import { ExternalLink, HelpCircle, CheckCircle, ShieldCheck } from 'lucide-react';

export const TopNav: React.FC = () => {
  const scrollToTechnical = () => {
    const el = document.getElementById('regulatory-drawer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full border-b border-technical bg-panel-base/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand identity - Friendly & Authoritative */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-600 flex items-center justify-center text-white font-bold text-base shadow-md">
            18
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">LAW 18</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                VAR Explainer
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Clear, plain-English answers to football's biggest referee controversies
            </p>
          </div>
        </div>

        {/* Sponsor Transparency & Quick Links */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTechnical}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-panel-elevated hover:bg-panel-subtle border border-technical text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Inspect AI deliberation graph, Zetaris SQL traces, and referee memory models"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-medium text-slate-300">Auditor Proof:</span>
            <span className="text-slate-400 text-[11px]">Zetaris · Meterless · NVIDIA</span>
          </button>

          <a
            href="https://github.com/Ayosensei/law18"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-panel-elevated hover:bg-panel-subtle border border-technical text-slate-300 hover:text-white transition-colors text-xs font-medium"
          >
            GitHub
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
