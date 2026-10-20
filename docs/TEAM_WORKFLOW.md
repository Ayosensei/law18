# Law18 — Team Collaboration & Workflow Guide
**Sensei (Frontend Lead & Integrations) & DuroT (Backend & Agent Graph Specialist)**

> **Reference Documents**:
> * Specification & Schemas: [`docs/PROJECT_SPEC.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/PROJECT_SPEC.md)
> * Visual Identity & Tokens: [`docs/DESIGN.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/DESIGN.md)
> * Agent State, Roles & Prompts: [`docs/AGENTS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/AGENTS.md)
> * Sensei's Task Playbook: [`docs/TASKS_SENSEI.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TASKS_SENSEI.md)
> * DuroT's Task Playbook: [`docs/TASKS_DUROT.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TASKS_DUROT.md)
> * Sponsor Guides: [`docs/SPONSOR_ZETARIS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_ZETARIS.md) · [`docs/SPONSOR_METERLESS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_METERLESS.md) · [`docs/SPONSOR_NVIDIA.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_NVIDIA.md) · [`docs/SPONSOR_CURSOR.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_CURSOR.md)

---

## 1. Operating Rules for Parallel Development

To work at lightning speed without stepping on each other's toes or blocking progress:

1. **Strict Contract First**: Both team members code against [`docs/PROJECT_SPEC.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/PROJECT_SPEC.md). DuroT defines the exact Pydantic/OpenAPI contracts, and Sensei uses identical TypeScript interfaces.
2. **Mock-Driven Decoupling**:
   * Sensei does not wait for the backend to complete before building the UI. A mock fixture layer (`src/fixtures/mockIncidents.ts` and `src/fixtures/mockAuditResults.ts`) enables immediate development and visual testing of the full Sofascore-style interface.
   * DuroT builds the LangGraph nodes and tests against structured incident JSONs using automated test runners and `run.py --sample`.
3. **Clear Boundary on Integrations**:
   * **Sensei** authors the client connectors for **Zetaris**, **Meterless**, and **NVIDIA Nemotron** in `backend/app/integrations/`.
   * **DuroT** calls these clean interfaces inside the LangGraph agent nodes.
4. **Zero-Cost Constraint**:
   * No paid cloud databases.
   * LangGraph runs locally (`pip install langgraph`).
   * Next.js runs locally on port 3000; FastAPI runs locally on port 8000.
   * Model calls utilize free hackathon NVIDIA Nemotron credits with a deterministic local mock fallback for offline judge evaluation.

---

## 2. Directory Structure Blueprint

```text
law18/
├── docs/                        # Architecture, specs & task playbooks
│   ├── AGENTS.md
│   ├── DESIGN.md
│   ├── PROJECT_SPEC.md
│   ├── TASKS_SENSEI.md
│   ├── TASKS_DUROT.md
│   └── TEAM_WORKFLOW.md
├── backend/                     # Python 3.11+ Environment
│   ├── app/
│   │   ├── main.py              # FastAPI endpoints (/api/incidents, /api/audit, /api/deliberate/stream)
│   │   ├── schemas/             # DuroT: Pydantic v2 telemetry and audit schemas
│   │   │   ├── telemetry.py
│   │   │   └── deliberation.py
│   │   ├── graph/               # DuroT: LangGraph state machine & agent nodes
│   │   │   ├── state.py         # DeliberationState TypedDict
│   │   │   ├── graph.py         # StateGraph builder and conditional edge routing
│   │   │   └── nodes/
│   │   │       ├── triage_fact_node.py
│   │   │       ├── var_advocate_node.py
│   │   │       ├── rules_auditor_node.py
│   │   │       ├── consistency_evaluator_node.py
│   │   │       └── kmi_synthesizer_node.py
│   │   ├── integrations/        # Sensei: Sponsor & Core Integration layer
│   │   │   ├── zetaris_client.py       # Zetaris virtual data fabric connector + SQLite fallback
│   │   │   ├── meterless_world_model.py # Pitch spatial vector state
│   │   │   ├── meterless_hmem.py       # Referee profile hierarchical memory
│   │   │   ├── meterless_markovian.py  # Bounded VAR protocol carryover
│   │   │   └── nvidia_client.py        # NVIDIA Nemotron LLM inference client
│   │   └── data/                # DuroT: Precedents, IFAB laws, and 3 benchmark incident files
│   │       ├── incidents/
│   │       ├── precedents.json
│   │       └── ifab_laws.json
│   ├── logs/                    # JSONL execution traces (logs/trace-*.jsonl)
│   ├── tests/                   # Automated pytest suite
│   ├── run.py                   # DuroT: Programmatic CLI entry point for hackathon judges
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/                    # Sensei: Next.js 14, TypeScript, Tailwind
│   ├── src/
│   │   ├── app/                 # App Router (layout, page)
│   │   ├── components/          # High-density sports telemetry UI components
│   │   │   ├── TopCommandBar.tsx
│   │   │   ├── PitchTelemetry2D.tsx
│   │   │   ├── DeliberationChamber.tsx
│   │   │   ├── PrecedentMatrixCard.tsx
│   │   │   ├── ConsistencyGauge.tsx
│   │   │   ├── RegulatoryDossierView.tsx
│   │   │   └── PublicTransparencyCard.tsx
│   │   ├── fixtures/            # Static mock data for zero-blocker UI dev
│   │   ├── types/               # TypeScript interfaces matching backend schemas
│   │   └── lib/                 # API client and SSE stream consumer
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── hackathon-resources/         # Original rules, guides & sponsor briefs
├── .gitignore
└── README.md                    # Main submission README
```

---

## 3. Communication & Integration Handshake

* **Contract Changes**: Any schema modification to `backend/app/schemas/` must immediately be mirrored in `frontend/src/types/telemetry.ts`.
* **Testing Protocol**:
  1. DuroT runs `python run.py --incident pubill` and verifies trace output in `backend/logs/`.
  2. Sensei verifies `npm run dev` renders the 2D pitch visualizer and connects to SSE streaming.
  3. Combined end-to-end integration verified before git commits.
