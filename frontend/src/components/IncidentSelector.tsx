'use client';

import React from 'react';
import { IncidentFullData, IncidentId } from '@/types/incident';

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
    <div className="w-full bg-panel-base border-b border-technical py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto pb-1 sm:pb-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mr-1 hidden lg:inline-block">
            Benchmark Case:
          </span>
          {incidents.map((incident) => {
            const isActive = incident.id === selectedId;
            return (
              <button
                key={incident.id}
                onClick={() => onSelect(incident.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-panel-elevated text-slate-100 border border-sky-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-panel-elevated/50 border border-transparent'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    incident.verdict.tier === 'CRITICAL_BREACH'
                      ? 'bg-rose-500'
                      : incident.verdict.tier === 'SEVERE_ERROR'
                      ? 'bg-rose-400'
                      : 'bg-amber-400'
                  }`}
                />
                <span className="font-medium">{incident.tabLabel}</span>
                {isActive && (
                  <span className="text-[10px] px-1 rounded bg-sky-500/10 text-sky-400 font-mono">
                    ACTIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-mono text-slate-500 hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>IFAB 2025/26 Codification</span>
        </div>
      </div>
    </div>
  );
};
