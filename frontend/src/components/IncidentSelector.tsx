'use client';

import React from 'react';
import { IncidentFullData, IncidentId } from '@/types/incident';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

interface IncidentSelectorProps {
  incidents: IncidentFullData[];
  selectedId: IncidentId;
  onSelect: (id: IncidentId) => void;
}

export const IncidentSelector: React.FC<IncidentSelectorProps> = ({
  incidents,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="w-full bg-panel-base border-b border-technical py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Label */}
        <div className="text-xs text-slate-400 font-medium">
          Select a controversial match incident to review:
        </div>

        {/* Buttons / Cards */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {incidents.map((incident) => {
            const isActive = incident.id === selectedId;
            const isCritical = incident.verdict.tier === 'CRITICAL_BREACH';
            const isSevere = incident.verdict.tier === 'SEVERE_ERROR';

            return (
              <button
                key={incident.id}
                onClick={() => onSelect(incident.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer text-left ${
                  isActive
                    ? 'bg-sky-500/15 text-white border border-sky-500/40 shadow-sm font-semibold'
                    : 'bg-panel-elevated/70 text-slate-300 hover:text-white hover:bg-panel-elevated border border-technical'
                }`}
              >
                {/* Status indicator icon */}
                {isCritical ? (
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                ) : isSevere ? (
                  <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                )}

                <div className="flex flex-col">
                  <span className="font-semibold text-slate-100">{incident.tabLabel}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {incident.matchHeader.homeTeam.name} vs {incident.matchHeader.awayTeam.name}
                  </span>
                </div>

                {isActive && (
                  <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">
                    Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
