# Law18 — Autonomous Referee Consistency & VAR Deliberation Engine
> *"IFAB wrote Laws 1 through 17 to govern the pitch. Law 18 governs consistency, precedent, and explanation."*

**Track 2: The Agent That Can Explain Why** | Open Agent Hackathon 2026

---

## Overview
**Law18** is an autonomous multi-agent cognitive system designed to eliminate subjective inconsistencies in football refereeing and VAR intervention. By cross-referencing structured match telemetry against the IFAB Laws of the Game and multi-season precedent databases, Law18 delivers:
1. **B2B Regulatory Audit Dossiers**: Precise Precedent Deviation Index, cited statutory clauses, and referee bias/tendency delta for governing bodies (PGMOL, UEFA) and club sporting directors.
2. **Public Transparency Cards**: Broadcast-ready, plain-English 3-bullet explanations detailing *why* a decision was made.

---

## System Architecture
* **Frontend**: Next.js 14, TypeScript, Tailwind CSS (FotMob / Sofascore dark-mode telemetry aesthetics).
* **Agent Deliberation (LangGraph)**:
  * `TriageFactAgent`: Validates spatial telemetry and extracts key contact points.
  * `VARAdvocateAgent`: Defends the on-field decision using the "Clear and Obvious" threshold.
  * `RulesAuditorAgent`: Prosecutes the decision using strict IFAB Law 12 clauses and conflicting precedents.
  * `ConsistencyEvaluatorAgent`: Arbitrates the adversarial debate, calculating consensus and precedent deviation.
  * `KMISynthesizerAgent`: Generates executive dossiers and transparency cards.
* **Unified Data Fabric (Zetaris)**: Federated SQL queries across IFAB rules, historical season decisions, and live telemetry without ETL.
* **Cognitive State (Meterless)**: World Model (pitch/limb vector tracking), H-MEM (referee seasonal profile memory), and Markovian decision trees.

---

## Repository Structure
```
law18/
├── docs/                     # Full system specs, agent prompts, and task splits
│   ├── AGENTS.md
│   ├── DESIGN.md
│   ├── PROJECT_SPEC.md
│   ├── TASKS_SENSEI.md
│   ├── TASKS_DUROT.md
│   └── TEAM_WORKFLOW.md
├── hackathon-resources/      # Original hackathon rules, guides, and sponsor briefs
└── README.md
```

---

## Authors
* **Sensei** (@Ayosensei) — Lead Architect, Frontend & UI/UX, Core Pipeline
* **DuroT** — Backend & Agent Deliberation Engineer
