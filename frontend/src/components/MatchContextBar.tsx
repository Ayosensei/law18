'use client';

import React from 'react';
import { IncidentFullData } from '@/types/incident';
import { MapPin, Calendar, UserCheck, AlertCircle } from 'lucide-react';

interface MatchContextBarProps {
  incident: IncidentFullData;
}

export const MatchContextBar: React.FC<MatchContextBarProps> = ({ incident }) => {
  const { matchHeader } = incident;

  return (
    <div className="w-full bg-panel-base/60 border-b border-technical py-2 px-4 sm:px-6 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2 text-slate-300">
        {/* Match info line */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-semibold text-slate-100 flex items-center gap-1.5 font-mono">
            {matchHeader.homeTeam.name}{' '}
            <span className="px-1.5 py-0.2 rounded bg-panel-elevated text-slate-200">
              {matchHeader.homeTeam.score} – {matchHeader.awayTeam.score}
            </span>{' '}
            {matchHeader.awayTeam.name}
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 font-sans">{matchHeader.competition} ({matchHeader.stage})</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 font-sans flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-500" />
            {matchHeader.venue}
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 font-mono text-[11px]">
            Ref: {matchHeader.referee}
          </span>
        </div>

        {/* On-field official ruling badge */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="text-slate-500">Official Call:</span>
          <span className="px-2 py-0.5 rounded bg-panel-elevated border border-technical text-amber-400 font-medium">
            {matchHeader.officialDecision}
          </span>
          <span className="text-slate-500 hidden lg:inline">· VAR: {matchHeader.officialVarAction}</span>
        </div>
      </div>
    </div>
  );
};
