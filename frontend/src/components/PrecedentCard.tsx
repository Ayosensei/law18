'use client';

import React from 'react';
import { PrecedentAnchorData } from '@/types/incident';
import { GitCompare, BookmarkCheck, ExternalLink } from 'lucide-react';

interface PrecedentCardProps {
  precedent: PrecedentAnchorData;
}

export const PrecedentCard: React.FC<PrecedentCardProps> = ({ precedent }) => {
  const similarityPct = (precedent.similarityScore * 100).toFixed(1);

  return (
    <div className="w-full bg-panel-base border border-technical rounded-lg p-4 sm:p-5 flex flex-col gap-3 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-technical">
        <div className="flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-sky-400" />
          <h3 className="text-xs font-mono font-semibold tracking-wide text-slate-200">
            HISTORICAL PRECEDENT ANCHOR
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 font-mono text-[11px] text-sky-400 font-bold">
          <BookmarkCheck className="w-3.5 h-3.5" />
          {similarityPct}% Match
        </div>
      </div>

      {/* Precedent details */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <h4 className="text-sm font-bold text-white font-mono">
            {precedent.title}
          </h4>
          <span className="text-[11px] font-mono text-slate-500">
            {precedent.date}
          </span>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Case Subject: <span className="text-slate-200 font-semibold">{precedent.playerInvolved}</span> · {precedent.match}
        </div>

        <div className="p-2.5 rounded bg-panel-elevated border border-technical mt-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
            Binding Official Precedent Ruling:
          </span>
          <span className="text-xs font-mono font-semibold text-emerald-400">
            {precedent.officialRuling}
          </span>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed mt-1">
          {precedent.deviationAnalysis}
        </p>
      </div>
    </div>
  );
};
