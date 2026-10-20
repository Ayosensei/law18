'use client';

import React, { useState } from 'react';
import { RegulatoryDossierData } from '@/types/incident';
import { ChevronDown, ChevronUp, FileText, Database, Brain, Printer, ShieldAlert, Cpu } from 'lucide-react';

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
    <div
      id="regulatory-drawer"
      className="w-full bg-panel-base border border-technical rounded-xl overflow-hidden shadow-md transition-all duration-300"
    >
      {/* Toggle Button Strip */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 sm:px-6 py-4 bg-panel-elevated/70 hover:bg-panel-elevated flex items-center justify-between text-left transition-colors cursor-pointer border-b border-transparent data-[open=true]:border-technical"
        data-open={isOpen}
      >
        <div className="flex items-center gap-3.5">
          <div className="p-2 rounded-lg bg-panel-base border border-technical">
            <Database className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold text-white block">
                Technical Evidence & Official Referee Dossier
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 hidden sm:inline-block">
                For Judges & Analysts
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspect Zetaris Virtual SQL traces, Meterless referee cognitive profiles, and verbatim IFAB statutes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
          <span>{isOpen ? 'Hide Technical Data' : 'View Technical Evidence'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Content Drawer */}
      {isOpen && (
        <div className="p-5 sm:p-6 flex flex-col gap-6 bg-panel-base text-slate-200">
          {/* Dossier Header & Print Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-technical">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wide font-medium block">
                Official Regulatory Appeal File
              </span>
              <span className="text-sm sm:text-base font-bold text-white">
                Dossier #{dossier.dossierId}
              </span>
              <span className="text-xs text-slate-400 ml-2">
                Generated: {new Date(dossier.timestamp).toLocaleDateString()}
              </span>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Export Official Appeal Dossier (PDF)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Column 1: Zetaris Virtual SQL Fabric Query */}
            <div className="flex flex-col gap-2.5 p-4 rounded-xl bg-panel-elevated/60 border border-technical">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  Zetaris Virtual Data Fabric Trace
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {dossier.zetarisResults.executionTimeMs}ms · Zero ETL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Federated query executed directly across IFAB legal statutes and UEFA precedent archives:
              </p>
              <div className="p-3 rounded-lg bg-[#080d17] border border-technical font-mono text-xs text-sky-300 overflow-x-auto">
                <code>{dossier.zetarisQuery}</code>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-4 mt-1">
                <span>Clauses Inspected: <strong className="text-white">{dossier.zetarisResults.clausesChecked}</strong></span>
                <span>Precedents Matched: <strong className="text-white">{dossier.zetarisResults.precedentsMatched}</strong></span>
              </div>
            </div>

            {/* Column 2: Meterless H-MEM Referee Profile */}
            <div className="flex flex-col gap-2.5 p-4 rounded-xl bg-panel-elevated/60 border border-technical">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-sky-400" />
                  Meterless Referee Cognitive Profile (H-MEM)
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  {dossier.meterlessMemoryTrace.boundedContextTokens} Bounded Tokens
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Historical behavioral patterns and psychological baseline for on-field referee:
              </p>
              <div className="grid grid-cols-2 gap-2.5 text-xs mt-1">
                <div className="p-2.5 rounded-lg bg-panel-base border border-technical">
                  <span className="text-[11px] text-slate-400 block">Referee</span>
                  <span className="font-bold text-white text-sm">{dossier.refereeProfile.name}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-panel-base border border-technical">
                  <span className="text-[11px] text-slate-400 block">Strictness Percentile</span>
                  <span className="font-bold text-amber-400 text-sm">{dossier.refereeProfile.strictnessPercentile}%</span>
                </div>
                <div className="p-2.5 rounded-lg bg-panel-base border border-technical">
                  <span className="text-[11px] text-slate-400 block">Penalty Concession Rate</span>
                  <span className="font-bold text-white text-sm">{dossier.refereeProfile.penaltyAwardRate}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-panel-base border border-technical">
                  <span className="text-[11px] text-slate-400 block">VAR Overturn Frequency</span>
                  <span className="font-bold text-slate-300 text-sm">{dossier.refereeProfile.historicalVarOverturnRate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verbatim IFAB Statutory Citations */}
          <div className="flex flex-col gap-3 pt-3 border-t border-technical">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Codified IFAB Statutes Cited in Decision
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {dossier.verbatimStatutes.map((statute, sIdx) => (
                <div key={sIdx} className="p-4 rounded-xl bg-panel-elevated/40 border border-technical text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-200 mb-1.5">
                    <span className="text-sm text-sky-400">{statute.law}</span>
                    <span className="text-xs text-slate-400 font-normal">{statute.subclause}</span>
                  </div>
                  <p className="text-slate-300 italic leading-relaxed">
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
