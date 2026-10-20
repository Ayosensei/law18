'use client';

import React from 'react';
import { IncidentFullData } from '@/types/incident';
import { AlertOctagon, AlertTriangle, CheckCircle2, Scale, ArrowRight } from 'lucide-react';

interface VerdictBannerProps {
  incident: IncidentFullData;
}

export const VerdictBanner: React.FC<VerdictBannerProps> = ({ incident }) => {
  const { verdict } = incident;

  const isCritical = verdict.tier === 'CRITICAL_BREACH';
  const isSevere = verdict.tier === 'SEVERE_ERROR';
  const isMarginal = verdict.tier === 'MARGINAL_CONSISTENCY';

  const badgeBg = isCritical
    ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
    : isSevere
    ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
    : 'bg-amber-500/15 border-amber-500/30 text-amber-300';

  const badgeTitle = isCritical
    ? 'Incorrect Ruling (Clear & Obvious Error)'
    : isSevere
    ? 'Severe Error (Intervention Missed)'
    : 'Controversial Decision (Split Precedent)';

  const icon = isCritical || isSevere ? (
    <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
  ) : isMarginal ? (
    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
  ) : (
    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
  );

  return (
    <div className="w-full bg-panel-base border border-technical rounded-xl p-5 sm:p-6 flex flex-col gap-4 shadow-lg relative overflow-hidden">
      {/* Top subtle highlight gradient */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          isCritical || isSevere ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gradient-to-r from-amber-500 to-emerald-500'
        }`}
      />

      {/* Status header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${badgeBg}`}>
          {icon}
          <span>{badgeTitle}</span>
        </div>

        {/* Consistency metric bar */}
        <div className="flex items-center gap-3 bg-panel-elevated/80 px-3 py-1.5 rounded-lg border border-technical self-start sm:self-auto">
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">
              Rulebook Parity Score
            </span>
            <span className="text-xs font-bold text-slate-200">
              {verdict.consistencyScore}% Consistent
            </span>
          </div>
          {/* Visual mini-bar */}
          <div className="w-16 h-2 rounded-full bg-slate-700 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                verdict.consistencyScore < 30 ? 'bg-rose-500' : verdict.consistencyScore < 70 ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${Math.max(verdict.consistencyScore, 8)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Headline & Context */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          {verdict.headline}
        </h2>
        <p className="text-sm text-slate-300 mt-1 leading-relaxed">
          {verdict.subheadline}
        </p>
      </div>

      {/* Key Takeaways in plain English */}
      <div className="mt-1 pt-4 border-t border-technical flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Scale className="w-4 h-4 text-sky-400" />
          <span>Why this decision was audited (The 3 Facts):</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {verdict.broadcastTakeaway.map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg bg-panel-elevated/60 border border-technical/80 text-xs text-slate-200 leading-relaxed"
            >
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="font-normal text-slate-200">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
