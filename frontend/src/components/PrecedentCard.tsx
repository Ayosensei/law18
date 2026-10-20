'use client';

import React from 'react';
import { PrecedentAnchorData } from '@/types/incident';
import { GitCompare, BookmarkCheck, Calendar, Trophy, CheckCircle2 } from 'lucide-react';

interface PrecedentCardProps {
  precedent: PrecedentAnchorData;
}

export const PrecedentCard: React.FC<PrecedentCardProps> = ({ precedent }) => {
  const similarityPct = (precedent.similarityScore * 100).toFixed(0);

  return (
    <div className="w-full bg-panel-base border border-technical rounded-xl p-5 sm:p-6 flex flex-col gap-3.5 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-technical">
        <div className="flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-sky-400" />
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Past Match Precedent (Identical Incident)
            </h3>
            <p className="text-xs text-slate-400">
              How referees and UEFA officially ruled on the same situation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-xs text-sky-300 font-bold">
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>{similarityPct}% Match</span>
        </div>
      </div>

      {/* Precedent details */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <h4 className="text-base font-bold text-white">
            {precedent.title}
          </h4>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {precedent.date}
          </span>
        </div>

        <div className="text-xs text-slate-300">
          Match: <strong className="text-slate-100">{precedent.match}</strong> · Player involved:{' '}
          <strong className="text-sky-300">{precedent.playerInvolved}</strong>
        </div>

        {/* Binding Official Ruling Pill */}
        <div className="p-3 rounded-lg bg-panel-elevated border border-technical mt-1 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Official UEFA Precedent Ruling:
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-400">
              {precedent.officialRuling}
            </span>
          </div>
        </div>

        {/* Deviation Analysis */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
          {precedent.deviationAnalysis}
        </p>
      </div>
    </div>
  );
};
