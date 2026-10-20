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

      {/* 4. Main Balanced Stage: Pitch Reality vs Cognitive Audit */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* LEFT COLUMN: THE PITCH REALITY */}
          <section className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Stage 01: Physical Observation
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Hawkeye / Opta Vector Space
              </span>
            </div>

            <PitchCanvas2D
              pitch={activeIncident.telemetry.pitch}
              shortTitle={activeIncident.shortTitle}
            />

            <TelemetryMetrics metrics={activeIncident.telemetry.metrics} />
          </section>

          {/* RIGHT COLUMN: THE COGNITIVE AUDIT */}
          <section className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Stage 02: Statutory & Precedent Audit
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                NVIDIA Nemotron + Zetaris + Meterless
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

        {/* 5. Progressive Disclosure: Full Regulatory Dossier */}
        <section className="w-full mt-2">
          <RegulatoryDrawer
            dossier={activeIncident.regulatoryDossier}
            shortTitle={activeIncident.shortTitle}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-technical bg-panel-base/60 py-4 px-4 sm:px-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Law18 — Track 2: The Agent That Can Explain Why</span>
          <span>Open Agent Hackathon 2026 · Powered by Zetaris, Meterless, NVIDIA, & Cursor</span>
        </div>
      </footer>
    </div>
  );
}
