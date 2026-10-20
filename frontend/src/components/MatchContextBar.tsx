'use client';

import React from 'react';
import { IncidentFullData } from '@/types/incident';
import { MapPin, Trophy, UserCheck, ShieldAlert } from 'lucide-react';

interface MatchContextBarProps {
  incident: IncidentFullData;
}

export const MatchContextBar: React.FC<MatchContextBarProps> = ({ incident }) => {
  const { matchHeader } = incident;

  return (
    <div className="w-full bg-panel-base/80 border-b border-technical py-2.5 px-4 sm:px-6 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-slate-300">
        {/* Match and venue overview */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
            <span>{matchHeader.homeTeam.name}</span>
            <span className="px-2 py-0.5 rounded bg-panel-elevated text-slate-200 text-xs font-semibold">
              {matchHeader.homeTeam.score} – {matchHeader.awayTeam.score}
            </span>
            <span>{matchHeader.awayTeam.name}</span>
          </div>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <span className="text-slate-300 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            {matchHeader.competition}
          </span>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <span className="text-slate-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {matchHeader.venue}
          </span>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <span className="text-slate-400">
            Referee: <strong className="text-slate-200">{matchHeader.referee}</strong>
          </span>
        </div>

        {/* On-field official ruling badge vs VAR */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-panel-elevated border border-technical">
            <span className="text-slate-400">On-field call:</span>
            <span className="text-amber-400 font-semibold">{matchHeader.officialDecision}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-panel-elevated border border-technical">
            <span className="text-slate-400">VAR action:</span>
            <span className="text-slate-200 font-medium">{matchHeader.officialVarAction}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
