# Law18 — Team Collaboration & Workflow Guide
**Sensei (Lead / Frontend & Fullstack) & DuroT (Backend & Agent Graph)**

---

## 1. Operating Rules for Parallel Development

To work fast without stepping on each other's toes or blocking progress:

1. **Strict Contract First**: Both team members code against `docs/PROJECT_SPEC.md`.
2. **Mock-Driven Decoupling**:
   * Sensei does not wait for the Python backend to build the UI. A mock fixture file (`src/fixtures/mockIncidents.json` and `mockAuditResults.json`) will let Sensei build and test the full Sofascore-style interface immediately.
   * DuroT builds the backend agents and tests against sample incident JSONs using automated tests (`pytest`) and `run.py --sample`.
3. **Zero-Cost Constraint**:
   * No paid cloud databases.
   * LangGraph runs locally (`pip install langgraph`).
   * Next.js runs locally on port 3000; FastAPI runs locally on port 8000.
   * Model calls use hackathon NVIDIA Nemotron free keys (with a deterministic mock fallback when testing offline).

---

## 2. Directory Structure Blueprint

```text
law18/
├── docs/                        # Architecture, specs & task playbooks
│   ├── PROJECT_SPEC.md
│   ├── TEAM_WORKFLOW.md
│   ├── TASKS_SENSEI.md
│   └── TASKS_DUROT.md
├── backend/                     # DuroT's Domain (Python)
│   ├── app/
│   │   ├── main.py              # FastAPI endpoints (/api/incidents, /api/audit)
│   │   ├── graph/               # LangGraph state machine & agents
│   │   │   ├── state.py         # Agent graph state definitions
│   │   │   ├── triage.py        # Triage & extraction agent
│   │   │   ├── retriever.py     # Zetaris query agent
│   │   │   ├── advocate.py      # VAR Protocol defense agent
│   │   │   ├── auditor.py       # IFAB Rules challenger agent
│   │   │   ├── evaluator.py     # Meterless consistency evaluator
│   │   │   └── synthesizer.py   # Report & Public Card writer
│   │   ├── sponsor/
│   │   │   ├── zetaris_client.py   # Zetaris connection & mock
│   │   │   └── meterless_engine.py # H-MEM & World Model integration
│   │   └── data/                # Precedents, IFAB text, sample incidents
│   ├── logs/                    # JSONL execution traces
│   ├── run.py                   # Programmatic CLI entry point for judges
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/                    # Sensei's Domain (Next.js 14/15, TS, Tailwind)
│   ├── src/
│   │   ├── app/                 # App Router (pages: /dashboard, /incident/[id])
│   │   ├── components/          # Sofascore/FotMob design system components
│   │   │   ├── MatchHeader.tsx
│   │   │   ├── TimelineSlider.tsx
│   │   │   ├── IncidentCard.tsx
│   │   │   ├── ConsistencyGauge.tsx
│   │   │   ├── DeliberationFeed.tsx
│   │   │   └── PublicCardModal.tsx
│   │   ├── fixtures/            # Static mock data for zero-blocker UI dev
│   │   └── lib/                 # API client connecting to port 8000
│   ├── package.json
│   └── tailwind.config.ts
├── .env.example                 # Secrets template (no committed keys!)
└── README.md                    # Main submission README
```

---

## 3. Daily Milestones (144-Hour Calendar)

| Day / Window | Sensei (Frontend & Integration) | DuroT (Backend & Agent Graph) | Shared Milestone |
|---|---|---|---|
| **Day 1 (Kickoff)** | Initialize Next.js project with Tailwind; create static mock incident fixtures. | Setup Python venv, LangGraph baseline, create incident JSON schemas. | Mock data contract signed off. |
| **Day 2 (Core Build)** | Build Sofascore match timeline, header, and incident selector components. | Build `TriageAgent`, `ZetarisClient` (mock + live), and IFAB database schema. | Backend loads incidents; UI renders them statically. |
| **Day 3 (Agent Loops)** | Build the Live Deliberation Feed UI (showing agent debate messages in real time). | Implement `VARAdvocate` vs `RulesAuditor` adversarial loop in LangGraph. | Agents debate in terminal; logs written to `logs/*.jsonl`. |
| **Day 4 (Integration)** | Build Consistency Gauge, B2B Dossier viewer, and Public Card modal. | Wire `Meterless` H-MEM / World Model, add `SAMPLE_MODE=true` fallback. | Frontend connects to `POST http://localhost:8000/api/audit`. |
| **Day 5 (Polish & Hardening)** | Polish responsive layout, dark theme accents, error toasts, and demo transitions. | Test `run.py` CLI, Docker build container, sanitize secrets, verify sample mode. | End-to-end run works with 1 command. |
| **Day 6 (Submission)** | Draft slide deck visuals, capture UI screenshots. | Write technical section of README, confirm `metadata.json`. | Record 3-minute video demo & submit on HackOS! |
