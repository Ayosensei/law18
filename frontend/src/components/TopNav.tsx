'use client';

import React from 'react';
import { Shield, ExternalLink, Activity, Sparkles, BookOpen } from 'lucide-react';

export const TopNav: React.FC = () => {
  return (
    <header className="w-full border-b border-technical bg-panel-base/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-slate-800 to-slate-900 border border-technical flex items-center justify-center text-sky-400 font-mono font-bold text-sm shadow-inner">
            L18
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm tracking-wider text-slate-100">LAW 18</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400">
                VAR AUDIT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans hidden sm:block">
              Cognitive Officiating & Consistency Engine
            </p>
          </div>
        </div>

        {/* Sponsor Badges & Quick Links */}
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-panel-elevated border border-technical">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Zetaris SQL
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-panel-elevated border border-technical">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              Meterless Core
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-panel-elevated border border-technical">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              NVIDIA Nemotron
            </span>
          </div>

          <a
            href="https://github.com/Ayosensei/law18"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-panel-elevated hover:bg-panel-subtle border border-technical text-slate-300 hover:text-white transition-colors font-mono text-xs"
          >
            GitHub
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
