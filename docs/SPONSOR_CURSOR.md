# Law18 — Sponsor Integration Specification: Cursor
**AI-First Development Environment, Agent Rule Governance & Rapid Scaffolding**

> **Hackathon Scoring Category**: Sponsor Tech (10 Points — Required Development Environment)  
> **Load-Bearing Role**: Development environment, architectural rule enforcement via `.cursorrules`, data contract validation, and iterative agent refinement.

---

## 1. Executive Summary: Why Cursor is Load-Bearing in Law18

Building an enterprise-grade multi-agent officiating intelligence system in a 6-day build window requires rigorous coordination between frontend contracts, backend state graphs, and sponsor APIs. Without unified development environment rules, distributed builds quickly fall victim to schema drift, hallucinated coordinates, and "AI slop" UI patterns.

**Cursor is the development environment powering Law18**:
1. **Rule Governance via `.cursorrules`**: Enforces the project's strict "Zero AI Slop" standard (banning purple/pink gradients, chatbot bubbles, and marketing buzzwords) and prevents agents from hallucinating sports telemetry coordinates.
2. **End-to-End Contract Synchronization**: Cursor Agent was used to align Pydantic v2 schemas in Python (`backend/schemas/telemetry.py`) with TypeScript interfaces in Next.js (`frontend/src/types/incident.ts`), ensuring zero interface divergence.
3. **Agentic Code Review & Preflight Execution**: Cursor Composer and Agent chats were leveraged to write and execute preflight checks for Zetaris, Meterless Nightshift, and LangGraph deliberation loops.

---

## 2. Cursor in the Law18 Development Lifecycle

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CURSOR AGENT WORKFLOW                           │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │  .cursorrules (Repository Rule Anchor)                         │   │
│   │  • Enforces Zero AI Slop aesthetic                            │   │
│   │  • Enforces deterministic telemetry coordinates               │   │
│   │  • Enforces Lightning SQL syntax for Zetaris                  │   │
│   └────────────────────────────────┬───────────────────────────────┘   │
│                                    │                                   │
│            ┌───────────────────────┴───────────────────────┐           │
│            ▼                                               ▼           │
│   ┌─────────────────────────────┐         ┌────────────────────────┐   │
│   │  Backend Contract Scaffolding│        │ Frontend UI Component  │   │
│   │  (Pydantic v2 + FastAPI)    │         │ Assembly (Next.js 14)  │   │
│   │  • PDI Scoring logic        │         │ • 2D SVG Pitch Canvas  │   │
│   │  • LangGraph State nodes    │         │ • Minimalist Obsidian  │   │
│   └──────────────┬──────────────┘         └────────────┬───────────┘   │
│                  │                                     │               │
│                  └──────────────────┬──────────────────┘               │
│                                     ▼                                  │
│                    [ Cross-Stack Contract Testing ]                    │
│                    (Cursor Agent automated audits)                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. The Central Governance Mechanism: `.cursorrules`

The root [`.cursorrules`](file:///home/saturnsurfer/Documents/PROJECTS/law18/.cursorrules) file anchors the entire development environment:

```markdown
# Law18 — Cursor Officiating Agent Rules

You are working on Law18, an agentic officiating consistency intelligence engine for the Open Agent Hackathon 2026 (Track 2: The Agent That Can Explain Why).

## Project Guidelines
1. **Zero AI Slop Rule**: No generic purple/pink gradients, conversational chatbot bubbles, or robotic marketing text. Follow the minimalist sports telemetry aesthetic in `docs/DESIGN.md`.
2. **Data Consistency**: Never hallucinate player names, coordinates, or statistics. All UI data is strictly codified in `docs/DESIGN.md` and `frontend/src/data/incidentsData.ts`.
3. **Architecture**:
   - Frontend: Next.js 14 App Router, TypeScript, Tailwind CSS (`frontend/`).
   - Backend: FastAPI, LangGraph, Pydantic v2 (`backend/`).
   - Sponsors: Zetaris (Virtual SQL fabric), Meterless (World Model, H-MEM, Markovian engine), NVIDIA Nemotron (Inference).
4. **Zetaris Rules**:
   - Always use Lightning SQL syntax.
   - Run one statement at a time.
   - Never print database credentials in logs.
```

---

## 4. Cursor Agent Prompts Used During Development

### 4.1 Schema Synchronization Prompt
```text
Inspect docs/PROJECT_SPEC.md and docs/DESIGN.md. Author the authoritative Pydantic v2 telemetry models in backend/schemas/telemetry.py. 
Next, generate the mirrored TypeScript definitions in frontend/src/types/incident.ts. 
Ensure that all field names, enum values (CRITICAL_BREACH, SEVERE_ERROR, MARGINAL_CONSISTENCY), and coordinate types match with 100% precision.
```

### 4.2 Adversarial Graph Verification Prompt
```text
Review backend/deliberation/graph.py. Ensure that the StateGraph transitions strictly between Triage -> VARAdvocate -> RulesAuditor -> ConsistencyEvaluator. 
Ensure that the debate loop terminates after at most two turns to preserve token bounds, using the Markovian carryover delta.
```

---

## 5. Local Setup & Cursor Workspace Integration

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/Ayosensei/law18.git
   cd law18
   ```
2. **Open in Cursor**:
   ```bash
   cursor .
   ```
3. **Verify Configuration**:
   * Open the Cursor Agent panel (`Ctrl + L` or `Cmd + L`).
   * Type:
     > *"Verify our workspace against .cursorrules and confirm that docs/DESIGN.md is fully respected."*
   * Cursor will automatically validate that the codebase conforms to the design tokens and telemetry contracts.

---

## 6. Submission Text & Presentation Talking Points

* **README Copy**:
  > *"Law18 was built in Cursor as our required development environment. We used Cursor's Agent chat and Composer alongside custom `.cursorrules` to govern data contracts across our Next.js frontend and Python LangGraph backend, enforce a strict 'Zero AI Slop' visual design standard, and validate integration points for Zetaris, Meterless, and NVIDIA Nemotron."*
* **Video Pitch Script (15 Seconds)**:
  > *"We developed Law18 inside Cursor. Using `.cursorrules`, we locked our AI coding agents to an exact sports telemetry contract—preventing coordinate hallucination and eliminating generic AI slop. Cursor made it seamless to maintain strict type synchronization between our Next.js frontend and LangGraph backend."*
