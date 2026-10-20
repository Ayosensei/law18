'use client';

import React, { useState } from 'react';
import { allIncidents, incidentsMap } from '@/data/incidentsData';
import { IncidentId } from '@/types/incident';
import { TopNav } from '@/components/TopNav';
import { IncidentSelector } from '@/components/IncidentSelector';
import { MatchContextBar } from '@/components/MatchContextBar';
import { PitchCanvas2D } from '@/components/PitchCanvas2D';
import { TelemetryMetrics } from '@/components/TelemetryMetrics';
import { VerdictBanner } from '@/components/VerdictBanner';
import { DeliberationChamber } from '@/components/DeliberationChamber';
import { PrecedentCard } from '@/components/PrecedentCard';
import { RegulatoryDrawer } from '@/components/RegulatoryDrawer';
import { Radio, Scale } from 'lucide-react';

export default function Home() {
  const [selectedIncidentId, setSelectedIncidentId] = useState<IncidentId>('incident-a');
  const activeIncident = incidentsMap[selectedIncidentId] || allIncidents[0];

  return (
    <div className="min-h-screen bg-pitch-canvas text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-white">
      {/* 1. Global Navigation Bar */}
      <TopNav />

      {/* 2. Incident Selector Tabs */}
      <IncidentSelector
        incidents={allIncidents}
        selectedId={selectedIncidentId}
        onSelect={setSelectedIncidentId}
      />

      {/* 3. Match Context Line */}
      <MatchContextBar incident={activeIncident} />

      {/* 4. Main Balanced Stage: Pitch View vs Cognitive Audit */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* LEFT COLUMN: WHAT HAPPENED ON THE PITCH */}
          <section className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
                  What Happened On The Pitch
                </h2>
              </div>
              <span className="text-xs text-slate-400">
                Hawkeye tracking & positioning
              </span>
            </div>

            <PitchCanvas2D
              pitch={activeIncident.telemetry.pitch}
              shortTitle={activeIncident.shortTitle}
            />

            <TelemetryMetrics metrics={activeIncident.telemetry.metrics} />
          </section>

          {/* RIGHT COLUMN: THE VERDICT & VAR DELIBERATION */}
          <section className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-sky-400" />
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
                  The Decision & Rulebook Check
                </h2>
              </div>
              <span className="text-xs text-slate-400">
                IFAB Law 12 & Precedent Analysis
              </span>
            </div>

            <VerdictBanner incident={activeIncident} />

            <DeliberationChamber
              deliberation={activeIncident.deliberation}
              incidentId={activeIncident.id}
            />

            <PrecedentCard precedent={activeIncident.precedent} />
          </section>
        </div>

        {/* 5. Progressive Disclosure: Full Technical Evidence Drawer */}
        <section className="w-full mt-2">
          <RegulatoryDrawer
            dossier={activeIncident.regulatoryDossier}
            shortTitle={activeIncident.shortTitle}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-technical bg-panel-base/60 py-5 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">LAW 18</span>
            <span>— The Independent Football Decision Explainer</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-xs">
            <span>Open Agent Hackathon 2026 · Track 2</span>
            <span>Zetaris · Meterless · NVIDIA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
