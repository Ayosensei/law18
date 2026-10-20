# Law18 — Autonomous Referee Consistency & VAR Deliberation Engine
> *"IFAB wrote Laws 1 through 17 to govern physical play. Law 18 governs consistency, precedent, and transparent explanation."*

**Track 2: The Agent That Can Explain Why** | Open Agent Hackathon 2026

---

## 1. Executive Overview
**Law18** is an autonomous multi-agent cognitive system designed to eliminate subjective inconsistencies in football refereeing and VAR intervention. By cross-referencing structured match telemetry against codified IFAB Laws of the Game and multi-season precedent databases, Law18 delivers:
1. **B2B Regulatory Audit Dossiers**: Precise Precedent Deviation Index (PDI), cited statutory clauses, and referee bias/tendency deltas for governing bodies (PGMOL, UEFA) and club sporting directors preparing formal appeals.
2. **Public Transparency Cards**: Broadcast-ready, plain-English 3-bullet explanations detailing *why* an on-field call was upheld or overturned for television match-centers and stadium screens.

---

## 2. Master Documentation Directory

All system architecture, design specifications, task allocations, and sponsor integrations are extensively documented:

| Document | Purpose & Key Topics |
|---|---|
| 📋 **[`docs/PROJECT_SPEC.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/PROJECT_SPEC.md)** | Master specification, benchmark incidents (Pubill, Fermín, Eric García), schemas, and judging criteria |
| 🎨 **[`docs/DESIGN.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/DESIGN.md)** | Zero AI Slop UI/UX design system, 2D SVG pitch coordinate rules, complete mock data repository |
| 🧠 **[`docs/AGENTS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/AGENTS.md)** | Cognitive Officiating Chamber specification, LangGraph state graph, node prompts, and decision trees |
| 👥 **[`docs/TEAM_WORKFLOW.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TEAM_WORKFLOW.md)** | Team operating principles, contract decoupling strategy, and git workflow |
| 👨‍💻 **[`docs/TASKS_SENSEI.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TASKS_SENSEI.md)** | Sensei's implementation playbook: Frontend Lead & Sponsor Connectors |
| 👨‍💻 **[`docs/TASKS_DUROT.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TASKS_DUROT.md)** | DuroT's implementation playbook: Backend, Pydantic Schemas & LangGraph Graph |
| ⚡ **[`docs/SPONSOR_ZETARIS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_ZETARIS.md)** | Headline Data Fabric: Unified virtual SQL queries across IFAB laws, precedents & telemetry (No ETL) |
| 🧩 **[`docs/SPONSOR_METERLESS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_METERLESS.md)** | Cognition Layer: World Model (2D pitch), H-MEM (referee memory), Markovian engine ($O(1)$ tokens) |
| 🚀 **[`docs/SPONSOR_NVIDIA.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_NVIDIA.md)** | Advanced Officiating Reasoning: NVIDIA Nemotron 70B/340B adversarial debate & PDI scoring |
| 💻 **[`docs/SPONSOR_CURSOR.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_CURSOR.md)** | Development Environment: Agent workflows, contract synchronization & rule governance via `.cursorrules` |

---

## 3. System Architecture & Sponsor Tech Integration

Law18 integrates all four hackathon sponsor technologies in load-bearing architectural roles:

```text
                                  ┌───────────────────────────┐
                                  │   CURSOR (Development)    │
                                  │  .cursorrules governance  │
                                  └─────────────┬─────────────┘
                                                │
         ┌──────────────────────────────────────┴──────────────────────────────────────┐
         ▼                                                                             ▼
┌─────────────────────────────────┐                                           ┌─────────────────────────────────┐
│       FRONTEND (Next.js 14)     │                                           │        BACKEND (FastAPI)        │
│  Minimalist Sports Telemetry    │                                           │   LangGraph Multi-Agent Graph   │
│  • 2D SVG Spatial Pitch Canvas  │ ◄────────── REST / SSE Stream ──────────► │  • Triage & Spatial Verification│
│  • Cognitive Audit Verdict Card │                                           │  • VAR Advocate vs Rules Auditor│
│  • Progressive Disclosure Drawer│                                           │  • PDI Adjudication & Synthesis │
└────────────────┬────────────────┘                                           └────────┬────────────────────────┘
                 │                                                                     │
                 ▼                                                                     ▼
┌─────────────────────────────────┐                                           ┌─────────────────────────────────┐
│     ZETARIS DATA FABRIC         │                                           │      METERLESS ENGINES          │
│  Unified Virtual SQL Layer      │                                           │  • World Model: Pitch Geometries│
│  • IFAB Statutes (Laws 1-17)    │                                           │  • H-MEM: Referee Profiles      │
│  • Historical UEFA Precedents   │                                           │  • Markovian: Bounded Reasoning │
│  • Real-time Match Telemetry    │                                           │  • Nightshift: Nemotron Proxy   │
└─────────────────────────────────┘                                           └────────────────┬────────────────┘
                                                                                               │
                                                                                               ▼
                                                                              ┌─────────────────────────────────┐
                                                                              │         NVIDIA NEMOTRON         │
                                                                              │  Llama-3.1-Nemotron-70B-Instruct│
                                                                              │  Adversarial Statutory Debate   │
                                                                              └─────────────────────────────────┘
```

* **[Zetaris](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_ZETARIS.md)**: Acts as the unified data fabric, executing federated Lightning SQL across heterogeneous silos (IFAB law text, UEFA precedent SQLite tables, live match telemetry) in sub-50ms with zero ETL.
* **[Meterless](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_METERLESS.md)**: Provides the local-first cognition layer: World Model for pitch coordinate tracking ($105\text{m} \times 68\text{m}$), H-MEM for persistent referee behavioral memory, Markovian engine for token-bounded debate turns, and Nightshift for local model routing.
* **[NVIDIA Nemotron](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_NVIDIA.md)**: Powers the adversarial debate between the `VARAdvocate` and `RulesAuditor` nodes, calculating the Precedent Deviation Index and synthesizing formal legal appeal dossiers.
* **[Cursor](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_CURSOR.md)**: Serves as the primary development environment, using custom [`.cursorrules`](file:///home/saturnsurfer/Documents/PROJECTS/law18/.cursorrules) to enforce the Zero AI Slop standard and ensure strict type synchronization between Next.js and Pydantic v2.

---

## 4. Repository Structure
```text
law18/
├── .cursorrules               # Cursor agent rules & Zero AI Slop design constraints
├── docs/                      # Master technical documentation
│   ├── PROJECT_SPEC.md        # Master technical architecture & benchmark cases
│   ├── DESIGN.md             # UI/UX design system, 2D pitch specs & complete mock data
│   ├── AGENTS.md             # Multi-agent cognitive chamber & LangGraph nodes
│   ├── TEAM_WORKFLOW.md      # Team collaboration & contract testing protocol
│   ├── TASKS_SENSEI.md       # Sensei's implementation playbook
│   ├── TASKS_DUROT.md        # DuroT's implementation playbook
│   ├── SPONSOR_ZETARIS.md    # Zetaris data fabric integration guide
│   ├── SPONSOR_METERLESS.md  # Meterless cognitive engines integration guide
│   ├── SPONSOR_NVIDIA.md     # NVIDIA Nemotron reasoning integration guide
│   └── SPONSOR_CURSOR.md     # Cursor development environment integration guide
├── hackathon-resources/       # Official hackathon briefs, guides, and rubrics
└── README.md
```

---

## 5. Authors & Team Roles
* **Sensei** ([@Ayosensei](https://github.com/Ayosensei)) — Project Lead, Frontend Architecture (Next.js 14, Tailwind, 2D SVG pitch canvas), Sponsor Integrations (Zetaris, Meterless, NVIDIA).
* **DuroT** — Backend Architecture, Pydantic v2 Schemas, LangGraph Deliberation Graph, CLI Test Runner.
