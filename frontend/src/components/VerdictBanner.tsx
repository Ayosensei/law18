'use client';

import React from 'react';
import { IncidentFullData } from '@/types/incident';
import { AlertTriangle, CheckCircle2, AlertOctagon, Scale } from 'lucide-react';

interface VerdictBannerProps {
  incident: IncidentFullData;
}

export const VerdictBanner: React.FC<VerdictBannerProps> = ({ incident }) => {
  const { verdict } = incident;

  const isCritical = verdict.tier === 'CRITICAL_BREACH';
  const isSevere = verdict.tier === 'SEVERE_ERROR';
  const isMarginal = verdict.tier === 'MARGINAL_CONSISTENCY';

  const badgeBg = isCritical
    ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
    : isSevere
    ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
    : 'bg-amber-500/15 border-amber-500/40 text-amber-400';

  const icon = isCritical || isSevere ? (
    <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
  ) : isMarginal ? (
    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
  ) : (
    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
  );

  return (
    <div className="w-full bg-panel-base border border-technical rounded-lg p-4 sm:p-5 flex flex-col gap-3 shadow-sm">
      {/* Top row: Badge & Precedent Deviation Percentage */}
      <div className="flex items-center justify-between gap-3">
        <div className={`flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-mono font-bold tracking-wide ${badgeBg}`}>
          {icon}
          <span>{verdict.badgeLabel}</span>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">
            Officiating Consistency
          </span>
          <span className="font-mono text-xs font-semibold text-slate-300">
            {verdict.consistencyScore}% Parity Score
          </span>
        </div>
      </div>

      {/* Main Headline & Subheadline */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
          {verdict.headline}
        </h2>
        <p className="text-xs text-slate-400 mt-0.5 font-sans">
          {verdict.subheadline}
        </p>
      </div>

      {/* Broadcast Takeaway: 3 Plain-English Bullets */}
      <div className="mt-1 pt-3 border-t border-technical flex flex-col gap-2">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Scale className="w-3 h-3 text-sky-400" />
          Broadcast Takeaway (Plain-English Rationale)
        </span>
        <div className="space-y-1.5">
          {verdict.broadcastTakeaway.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="font-mono font-bold text-sky-400 select-none text-[11px] mt-0.5">
                0{idx + 1}.
              </span>
              <p className="leading-relaxed font-sans">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
