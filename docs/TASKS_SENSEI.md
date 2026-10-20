# Sensei's Task Playbook — Frontend & Fullstack Lead
**Law18 | Next.js 14/15, TypeScript, Tailwind CSS & Sofascore/FotMob Design System**

> **Reference Documents**:
> * Specification & Schemas: [`docs/PROJECT_SPEC.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/PROJECT_SPEC.md)
> * Visual Identity & Components: [`docs/DESIGN.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/DESIGN.md)
> * Agent State & Prompts: [`docs/AGENTS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/AGENTS.md)
> * Team Operating Guide: [`docs/TEAM_WORKFLOW.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TEAM_WORKFLOW.md)

---

## 1. Domain Ownership
Sensei leads:
1. **Frontend Architecture**: Modern Next.js 14/15 App Router with full TypeScript type safety.
2. **Sofascore / FotMob Visual Polish**: Stadium dark mode (`#0B0E14`), neon glow status badges, tabular scores, and fluid animations.
3. **Decoupled Mock Layer**: Complete static fixtures (`src/fixtures/incidents.ts` and `src/fixtures/auditResults.ts`) so UI development never waits for backend availability.
4. **API Integration**: Connecting the Next.js client to DuroT's FastAPI backend (`POST http://localhost:8000/api/audit`).

---

## 2. Detailed Task Breakdown

### Phase S.1: Project Setup & Design Token Configuration
- [ ] Initialize Next.js 14/15 in `/frontend` using App Router and TypeScript.
- [ ] Configure `tailwind.config.ts` with the exact color palette and tokens specified in [`docs/DESIGN.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/DESIGN.md):
  * `pitch-950` (`#06080D`), `pitch-900` (`#0B0E14`), `pitch-850` (`#121721`), `pitch-800` (`#1A2232`), `pitch-700` (`#2A3447`).
  * `accent-emerald` (`#00E676`), `accent-amber` (`#FFAB00`), `accent-crimson` (`#FF1744`), `accent-cyan` (`#00E5FF`), `accent-varPurple` (`#7C3AED`).
- [ ] Install dependencies: `lucide-react`, `clsx`, `tailwind-merge`, `framer-motion`.
- [ ] Set up global fonts with tabular figures (`font-mono`) for minutes, scores, and percentages.

### Phase S.2: Benchmark Incidents & Static Mock Layer
- [ ] Create `src/fixtures/incidents.ts` adhering strictly to `IncidentTelemetry` in [`docs/PROJECT_SPEC.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/PROJECT_SPEC.md):
  * **Incident A (54')**: Marc Pubill / Juan Musso Goal-Kick Pickup (Camp Nou, Kovács).
  * **Incident B (29')**: Fermín López / Juan Musso High-Boot Facial Laceration (Metropolitano, Turpin).
  * **Incident C (79')**: Eric García / Alexander Sørloth DOGSO Red Card (Metropolitano, Turpin).
- [ ] Create `src/fixtures/mockResults.ts` containing the full `Law18AuditResult` payloads (including the Mings precedent match for Pubill, Mané/Pickford for Fermín, and David Luiz for Eric García).
- [ ] Create client state toggle (`NEXT_PUBLIC_USE_MOCK=true`) to enable seamless switching between mock fixtures and DuroT's live FastAPI backend.

### Phase S.3: Sofascore-Style Match Header & Timeline Scrubber
- [ ] **`MatchHeader.tsx`**:
  * Top competition bar: UEFA Champions League Quarter-Final.
  * Scoreboard display: **FC Barcelona 2 – 3 Atlético Madrid (Agg)** with glowing home/away badges.
  * Match official badges: István Kovács (Leg 1) / Clément Turpin (Leg 2), VAR lead chip.
- [ ] **`TimelineSlider.tsx`**:
  * Horizontal timeline bar (0' to 90'+).
  * Clickable incident badges at minutes 29', 54', 79' with dynamic icons (Handball ⚽✋, Collision 🩸, Red Card 🟥).
  * Active incident marker with pulsing color glow.
  * Selection triggers smooth animated state transition.

### Phase S.4: Physical Telemetry Inspector & 2D Pitch Radar
- [ ] **`IncidentTelemetryCard.tsx`**:
  * Clean grid displaying event parameters: Action Type, Ball In Play status, Impact Vector, Force Rating, and Initial Ruling.
  * On-field call badge vs. VAR Room action badge.
- [ ] **`PitchRadar2D.tsx`**:
  * Interactive stylized 2D pitch graphic with 18-yard box, penalty spot, and goal lines.
  * Pulsing coordinate pin at the exact pitch coordinates of the incident.
  * Directional vector arrow illustrating ball/player motion (e.g., short goal-kick pass from Musso to Pubill).

### Phase S.5: Live Adversarial Deliberation Chamber UI
- [ ] **`DeliberationFeed.tsx`**:
  * Live conversation thread displaying the multi-agent exchange specified in [`docs/AGENTS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/AGENTS.md):
    * **VAR Protocol Advocate** card (Purple accent): Arguments defending high intervention threshold and natural motion.
    * **IFAB Rules Auditor** card (Cyan accent): Prosecution citing strict Law 16.1 / 12.3 and Tyrone Mings precedent.
    * **Consistency Evaluator** card (Gold accent): Synthesis with referee behavioral tendency metrics.
  * Streaming animated text reveal for high-impact demo presentation.

### Phase S.6: Radial Consistency Gauge & Verdict Banner
- [ ] **`ConsistencyGauge.tsx`**:
  * Circular SVG progress dial (diameter: 160px) with animated roll-up from 0% to final score.
  * Dynamic color grading:
    * Pubill: 8% (Neon Crimson glow `#FF1744`).
    * Fermín: 14% (Neon Crimson glow `#FF1744`).
    * Eric García: 42% (Neon Amber glow `#FFAB00`).
  * Bold verdict pill below dial: `CLEAR & OBVIOUS BLUNDER` / `SEVERE ERROR` / `MARGINAL CALL`.

### Phase S.7: Dual Deliverable Views (B2B Dossier vs. Public Card)
- [ ] **`DualOutputTabs.tsx`**:
  * Tab navigation between "B2B Regulatory Dossier" and "Public Match Center Card".
- [ ] **`B2BDossierView.tsx`**:
  * Tabular layout for UEFA Observers / Club Legal Appeals.
  * Collapsible sections for: Executive Summary, Codified IFAB Statute Text, Precedent Comparison Table (with similarity meters), and Referee Marksheet.
  * "Export Dossier PDF / Markdown" button.
- [ ] **`PublicMatchCenterCard.tsx`**:
  * High-contrast 16:9 broadcast card ready for TV lower-thirds and stadium screens.
  * Large decision banner, 3 concise plain-English bullet points, and social share action.

### Phase S.8: API Client & End-to-End Integration
- [ ] Build `src/lib/api.ts` with `fetchAuditResult(incidentId: string, useMock: boolean)`.
- [ ] Implement error boundary, loading skeletons, and connection health toast checking `GET http://localhost:8000/api/health`.
