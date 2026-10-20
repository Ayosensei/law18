'use client';

import React, { useState } from 'react';
import { RegulatoryDossierData } from '@/types/incident';
import { ChevronDown, ChevronUp, FileText, Database, Brain, Printer, ShieldAlert } from 'lucide-react';

interface RegulatoryDrawerProps {
  dossier: RegulatoryDossierData;
  shortTitle: string;
}

export const RegulatoryDrawer: React.FC<RegulatoryDrawerProps> = ({ dossier, shortTitle }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-panel-base border border-technical rounded-lg overflow-hidden shadow-sm transition-all duration-300">
      {/* Toggle Button Strip */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-6 py-3.5 bg-panel-elevated/70 hover:bg-panel-elevated flex items-center justify-between text-left transition-colors cursor-pointer border-b border-transparent data-[open=true]:border-technical"
        data-open={isOpen}
      >
        <div className="flex items-center gap-3">
          <FileText className="w-4 h-4 text-sky-400" />
          <div>
            <span className="text-xs sm:text-sm font-mono font-bold text-slate-100 block">
              Official Regulatory Appeal Dossier & Evidence
            </span>
            <span className="text-[11px] text-slate-400 font-sans">
              Zetaris Lightning SQL traces, Meterless H-MEM referee profiles, and verbatim IFAB citations
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-sky-400">
          <span>{isOpen ? 'Collapse Dossier' : 'Inspect Dossier'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Content Drawer */}
      {isOpen && (
        <div className="p-4 sm:p-6 flex flex-col gap-5 bg-panel-base text-slate-200">
          {/* Dossier Header & Print Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-technical">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                Official Document ID:
              </span>
              <span className="font-mono text-sm font-bold text-white">
                {dossier.dossierId}
              </span>
              <span className="text-[11px] font-mono text-slate-400 ml-2">
                Generated: {new Date(dossier.timestamp).toUTCString()}
              </span>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-panel-elevated hover:bg-panel-subtle border border-technical font-mono text-xs text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-sky-400" />
              Export Dossier for Appeal
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Column 1: Zetaris Virtual SQL Fabric Query */}
            <div className="flex flex-col gap-2 p-4 rounded-lg bg-panel-elevated/50 border border-technical">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  Zetaris Virtual Data Fabric Trace
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {dossier.zetarisResults.executionTimeMs}ms · ZERO ETL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Federated query executed directly across IFAB legal statutes and UEFA precedent archives:
              </p>
              <div className="p-2.5 rounded bg-[#080A0F] border border-technical font-mono text-[11px] text-sky-300 overflow-x-auto">
                <code>{dossier.zetarisQuery}</code>
              </div>
              <div className="text-[11px] font-mono text-slate-500 flex items-center gap-3 mt-1">
                <span>Clauses Inspected: {dossier.zetarisResults.clausesChecked}</span>
                <span>Precedents Matched: {dossier.zetarisResults.precedentsMatched}</span>
              </div>
            </div>

            {/* Column 2: Meterless H-MEM Referee Profile */}
            <div className="flex flex-col gap-2 p-4 rounded-lg bg-panel-elevated/50 border border-technical">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-sky-400" />
                  Meterless H-MEM Referee Profile
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  Hierarchical Memory
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono mt-1">
                <div className="p-2 rounded bg-panel-base border border-technical">
                  <span className="text-[10px] text-slate-500 block">Referee</span>
                  <span className="font-bold text-white">{dossier.refereeProfile.name}</span>
                </div>
                <div className="p-2 rounded bg-panel-base border border-technical">
                  <span className="text-[10px] text-slate-500 block">Strictness Percentile</span>
                  <span className="font-bold text-amber-400">{dossier.refereeProfile.strictnessPercentile}%</span>
                </div>
                <div className="p-2 rounded bg-panel-base border border-technical">
                  <span className="text-[10px] text-slate-500 block">Penalty Concession Rate</span>
                  <span className="font-bold text-white">{dossier.refereeProfile.penaltyAwardRate}</span>
                </div>
                <div className="p-2 rounded bg-panel-base border border-technical">
                  <span className="text-[10px] text-slate-500 block">VAR Overturn Frequency</span>
                  <span className="font-bold text-slate-300">{dossier.refereeProfile.historicalVarOverturnRate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verbatim IFAB Statutory Citations */}
          <div className="flex flex-col gap-2 pt-2 border-t border-technical">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Codified IFAB Statutes Cited in Decision
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
              {dossier.verbatimStatutes.map((statute, sIdx) => (
                <div key={sIdx} className="p-3 rounded-lg bg-panel-elevated/40 border border-technical text-xs">
                  <div className="flex items-center justify-between font-mono font-bold text-slate-200 mb-1">
                    <span>{statute.law}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{statute.subclause}</span>
                  </div>
                  <p className="text-slate-300 font-sans italic leading-relaxed text-[11px]">
                    "{statute.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
