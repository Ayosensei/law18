# Sensei's Task Playbook — Frontend Lead & Core Integrations
**Law18 | Next.js 14, TypeScript, Tailwind CSS & Sponsor Integrations (Zetaris, Meterless, NVIDIA)**

> **Reference Documents**:
> * Specification & Schemas: [`docs/PROJECT_SPEC.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/PROJECT_SPEC.md)
> * Visual Identity & Tokens: [`docs/DESIGN.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/DESIGN.md)
> * Agent State & Prompts: [`docs/AGENTS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/AGENTS.md)
> * Team Operating Guide: [`docs/TEAM_WORKFLOW.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TEAM_WORKFLOW.md)
> * DuroT's Task Playbook: [`docs/TASKS_DUROT.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TASKS_DUROT.md)
> * Zetaris Data Fabric: [`docs/SPONSOR_ZETARIS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_ZETARIS.md)
> * Meterless Cognition Engines: [`docs/SPONSOR_METERLESS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_METERLESS.md)
> * NVIDIA Nemotron Inference: [`docs/SPONSOR_NVIDIA.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_NVIDIA.md)
> * Cursor Development Hub: [`docs/SPONSOR_CURSOR.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_CURSOR.md)

---

## 1. Domain Ownership

Sensei owns:
1. **Frontend Architecture & UI/UX**:
   * Next.js 14 App Router, TypeScript, Tailwind CSS.
   * High-density sports telemetry interface inspired by Sofascore, FotMob, and Hawk-Eye.
   * **Absolute Zero AI Slop Rule**: Strict prohibition of generic purple gradients, conversational chatbot bubbles, or robotic marketing text.
   * 2D Interactive SVG Pitch & Spatial Vector Telemetry visualizer.
   * Real-time streaming Deliberation Chamber (SSE).
   * Dual output views: **B2B Regulatory Audit Dossier** (PDF/formal report) and **Public Transparency Card** (broadcast graphic).
2. **Sponsor & Core Technology Integrations**:
   * **Zetaris Unified Data Fabric Client**: Connecting the system to Zetaris virtual SQL queries across IFAB laws, historical season precedents, and live match telemetry (with seamless local SQLite/JSON fallback for offline judge reproducibility).
   * **Meterless Cognitive Engines Integration**:
     * **World Model**: Spatial coordinates, limb vectors, and pitch state representations.
     * **H-MEM**: Hierarchical memory storing referee behavioural profiles, leniency patterns, and historical sanction deviations.
     * **Markovian Engine**: Bounded-context protocol manager ensuring token-efficient step-by-step VAR review.
   * **NVIDIA Nemotron Inference Integration**: API configuration and client integration to power the adversarial legal debating nodes (`VARAdvocate` and `RulesAuditor`).

---

## 2. Detailed Step-by-Step Task Checklist

### Phase S.1: Next.js Workspace & Design Token Setup
- [ ] Initialize Next.js 14 App Router workspace in `frontend/` with TypeScript and ESLint.
- [ ] Configure `tailwind.config.ts` with the exact color palette and tokens specified in [`docs/DESIGN.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/DESIGN.md):
  * Base surfaces: `bg-stadium-pitch` (`#080A0E`), `bg-panel-base` (`#0F141C`), `bg-panel-elevated` (`#161C26`), `bg-panel-subtle` (`#1D2433`).
  * Borders: `border-technical` (`#263043`), `border-technical-strong` (`#3B4863`).
  * Signal tokens: `accent-grass` (`#10B981`), `accent-amber` (`#F59E0B`), `accent-crimson` (`#EF4444`), `accent-cyan` (`#0284C7`), `accent-gold` (`#EAB308`).
  * Typography: JetBrains Mono / Geist Mono for tabular metrics and telemetry; Inter / Geist Sans for editorial text.
- [ ] Install UI dependencies: `lucide-react`, `clsx`, `tailwind-merge`, `@radix-ui/react-tabs`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-dialog`.
- [ ] Verify that no CSS or styles contain generic AI gradients (`#8B5CF6`, `#EC4899`, etc.).

### Phase S.2: UI Components (Sofascore / FotMob High-Density Aesthetic)
- [ ] **`TopCommandBar.tsx`**:
  * Match Status header with UCL branding and real referee names.
  * Dropdown selector for the 3 benchmark incidents (Pubill 54', Fermín 29', Eric García 79').
  * Engine status indicator: `METERLESS: ACTIVE | ZETARIS: FEDERATED | NEMOTRON: READY`.
  * CTA: `Generate Formal Appeal Dossier (PDF/JSON)`.
- [ ] **`PitchTelemetry2D.tsx`**:
  * Native SVG pitch canvas rendering official 105m x 68m proportions in dark tactical turf (`#0C131D`).
  * Real-time spatial plotting: ball velocity vector arrow, player nodes, referee sightline cone, and contact quadrant.
  * Limb angle caliper (e.g., rendering the 108° unnatural arm extension for handball).
- [ ] **`DeliberationChamber.tsx`**:
  * Aviation black-box / court transcript layout (discrete turn cards with role badges, timestamps, and cited doctrine).
  * Server-Sent Events (SSE) listener consuming streaming tokens from DuroT's `/api/deliberate/stream` endpoint.
  * Color-coded border ribbons: Slate for `VAR Advocate`, Amber for `Rules Auditor`, Emerald for `Consistency Evaluator`.
- [ ] **`PrecedentMatrixCard.tsx`**:
  * Side-by-side comparison table matching target incident metrics against the historical anchor precedent (e.g. Pubill vs. Tyrone Mings).
- [ ] **`RegulatoryDossierView.tsx`**:
  * Formal UEFA/PGMOL appeal document format with printable CSS styling.
  * Displays Precedent Deviation Index (PDI), exact IFAB clauses violated, referee leniency profile delta, and legal conclusion.
- [ ] **`PublicTransparencyCard.tsx`**:
  * Broadcast lower-third graphic layout.
  * 3 concise, plain-English bullet points explaining why the decision was made.

### Phase S.3: Zetaris Unified Data Fabric Integration
- [ ] Author `backend/app/integrations/zetaris_client.py`:
  * Implement connection to Zetaris virtualized data harness.
  * Construct federated virtual SQL queries joining 3 disparate silos:
    1. IFAB Laws 2025/26 (semi-structured statutory text).
    2. Historical Season Precedent Database (SQLite / JSON tables).
    3. Live Match Telemetry event feeds.
  * Implement robust local fallback (`SAMPLE_MODE=true`): query local SQLite/JSON mirrors automatically if live Zetaris instance credentials are not set, guaranteeing 100% offline reproducibility for judges.
- [ ] Expose clean query functions for DuroT's LangGraph nodes:
  * `query_statutes(law_numbers: list[int], keywords: list[str]) -> list[dict]`
  * `query_precedents(incident_type: str, min_similarity: float) -> list[dict]`

### Phase S.4: Meterless Cognitive Engines Integration
- [ ] Author `backend/app/integrations/meterless_world_model.py`:
  * Implement headless shared world state based on `hackathon-resources/meterless-world-model-agent-engine.md`.
  * Maintain persistent entities (ball, referee, offending player, victim player), pitch contexts (penalty box, goal kick in-flight), and spatial vectors.
- [ ] Author `backend/app/integrations/meterless_hmem.py`:
  * Implement hierarchical memory based on `hackathon-resources/meterless-h-mem-agent-engine.md`.
  * Store referee behavioural profiles (e.g., István Kovács' historical leniency on subjective box contact vs. Clément Turpin's red card frequency).
  * Provide functions to calculate the referee tendency delta.
- [ ] Author `backend/app/integrations/meterless_markovian.py`:
  * Implement bounded-context reasoning based on `hackathon-resources/meterless-markovian-agent-engine.md`.
  * Enforce the official IFAB step-by-step VAR Protocol check with compressed carryover state to guarantee O(1) context scaling.

### Phase S.5: NVIDIA Nemotron Model Integration
- [ ] Author `backend/app/integrations/nvidia_client.py`:
  * Set up NVIDIA API catalog client for Nemotron models (`nvidia/nemotron-4-340b-instruct` or latest Nemotron endpoint).
  * Include rate-limiting handling, exponential backoff, and local mock fallback for deterministic judge evaluations.
  * Configure system prompt parameters (temperature 0.2 for strict legal accuracy, top_p 0.95).

### Phase S.6: Full Frontend-to-Backend Wiring & End-to-End Verification
- [ ] Connect Next.js API client (`src/lib/api.ts`) to DuroT's FastAPI endpoints.
- [ ] Test real-time SSE streaming of deliberation turns from LangGraph into `DeliberationChamber.tsx`.
- [ ] Validate that all 3 benchmark cases run end-to-end within 10 seconds.
- [ ] Verify PDF/JSON dossier export functionality.
