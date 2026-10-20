# DuroT's Task Playbook — Backend & Agent Graph Specialist
**Law18 | Python 3.11+, LangGraph, FastAPI & Agentic State Deliberation**

> **Reference Documents**:
> * Specification & Schemas: [`docs/PROJECT_SPEC.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/PROJECT_SPEC.md)
> * Agent State, Roles & Prompts: [`docs/AGENTS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/AGENTS.md)
> * Visual Identity & Tokens: [`docs/DESIGN.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/DESIGN.md)
> * Sensei's Task Playbook: [`docs/TASKS_SENSEI.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TASKS_SENSEI.md)
> * Team Operating Guide: [`docs/TEAM_WORKFLOW.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TEAM_WORKFLOW.md)

---

## 1. Domain Ownership

DuroT owns:
1. **API Contracts & FastAPI Backend Service**:
   * Authoring all Pydantic v2 schemas for telemetry input, agent debate states, and audit outputs.
   * Implementing FastAPI REST endpoints (`/api/incidents`, `/api/deliberate`, `/api/audit`).
   * Implementing the Server-Sent Events (SSE) streaming endpoint (`/api/deliberate/stream`) feeding Sensei's Next.js frontend in real time.
2. **LangGraph Deliberation Graph**:
   * Implementing the full multi-agent deliberation graph using **LangGraph** (StateGraph).
   * Creating agent node functions:
     * `triage_fact_node`: Validates spatial telemetry against pitch boundaries.
     * `var_advocate_node`: Defends the on-field decision using the "Clear & Obvious" threshold.
     * `rules_auditor_node`: Prosecutes using IFAB statutory clauses and precedent matches queried via Sensei's Zetaris client.
     * `consistency_evaluator_node`: Arbitrates the adversarial debate, calculating the Precedent Deviation Index (PDI).
     * `kmi_synthesizer_node`: Generates the formal B2B Dossier and Public Transparency Card.
   * Implementing conditional edges for the adversarial rebuttal loop (maximum 2 debate cycles before mandatory arbitration).
3. **Data Schemas & Benchmark Incidents**:
   * Authoring structured telemetry JSON files for the 3 benchmark Barcelona incidents.
   * Authoring the codified IFAB Laws JSON and the Historical Precedent Database (Mings, Ederson/Mané, David Luiz).
4. **Reproducibility, Logging & CLI Entrypoint**:
   * Programmatic entry point in `backend/run.py` allowing judges to run single incident audits from the CLI.
   * Structured JSONL logging to `backend/logs/trace-<run_id>.jsonl`.

---

## 2. Detailed Step-by-Step Task Checklist

### Phase D.1: Python Environment, Dependencies & Schemas
- [ ] Initialize Python 3.11+ virtual environment in `/backend`.
- [ ] Create `requirements.txt`:
  ```text
  langgraph>=0.2.0
  langchain-core>=0.2.0
  fastapi>=0.110.0
  uvicorn>=0.28.0
  pydantic>=2.6.0
  httpx>=0.27.0
  pytest>=8.0.0
  python-dotenv>=1.0.0
  ```
- [ ] Define core Pydantic schemas in `backend/app/schemas/telemetry.py` matching [`docs/PROJECT_SPEC.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/PROJECT_SPEC.md):
  * `Vector2D`, `PlayerCoordinates`, `BallTrajectory`, `ContactMetrics`.
  * `OnFieldDecisionContext`, `IncidentTelemetry`.
- [ ] Define agent deliberation and output schemas in `backend/app/schemas/deliberation.py`:
  * `AgentTurnMessage`, `AdversarialDeliberationState`.
  * `PrecedentMatchRecord`, `StatutoryViolationItem`.
  * `RegulatoryAuditDossier`, `PublicTransparencyCard`, `Law18AuditResult`.

### Phase D.2: Benchmark Incidents & Precedent Datasets
- [ ] Author structured incident files in `backend/app/data/incidents/`:
  * `incident_a_pubill_handball.json`: 54' Camp Nou, Pubill handling Musso's live goal-kick.
  * `incident_b_fermin_highboot.json`: 29' Metropolitano, Musso high boot studs-up head contact on Fermín López.
  * `incident_c_eric_garcia_dogso.json`: 79' Metropolitano, Turpin straight red card on Eric García against Sørloth.
- [ ] Author historical precedent records in `backend/app/data/precedents.json`:
  * **Tyrone Mings Incident** (Aston Villa vs Club Brugge, Nov 2024): Goal-kick handball, penalty awarded (Similarity: 0.98).
  * **Sadio Mané on Ederson** (Man City vs Liverpool, Sept 2017): High boot head impact, straight red card (Similarity: 0.92).
  * **David Luiz on Willian José** (Wolves vs Arsenal, Feb 2021): Accidental knee clip / DOGSO red card (Similarity: 0.91).
- [ ] Author codified IFAB Laws JSON in `backend/app/data/ifab_laws.json`:
  * Law 12.1 (Handling the ball, deliberate contact, unnatural silhouette).
  * Law 12.3 (Disciplinary action, DOGSO, serious foul play vs reckless challenge).
  * Law 16 (The Goal Kick, ball in play once kicked and clearly moves).
  * IFAB VAR Protocol (Definition of Clear and Obvious Error).

### Phase D.3: LangGraph Deliberation State Machine
- [ ] Author `backend/app/graph/state.py`:
  * Define `DeliberationState(TypedDict)`:
    ```python
    class DeliberationState(TypedDict):
        incident: IncidentTelemetry
        world_state: dict
        retrieved_laws: list[dict]
        retrieved_precedents: list[dict]
        referee_memory: dict
        advocate_arguments: list[dict]
        auditor_arguments: list[dict]
        debate_turns: list[dict]
        current_cycle: int
        max_cycles: int
        pdi_score: float
        consensus_reached: bool
        audit_dossier: dict
        transparency_card: dict
        trace_logs: list[dict]
    ```
- [ ] Author agent node functions in `backend/app/graph/nodes/`:
  * **`triage_fact_node.py`**:
    * Ingests telemetry, queries Sensei's Meterless World Model, extracts primary contact geometry.
  * **`var_advocate_node.py`**:
    * Uses Nemotron to formulate the strongest possible defense of the on-field decision, citing VAR discretion corridors.
  * **`rules_auditor_node.py`**:
    * Calls Sensei's Zetaris client to pull IFAB statutes and precedent anchors, generating direct rebuttals to the advocate.
  * **`consistency_evaluator_node.py`**:
    * Computes the mathematical Precedent Deviation Index:
      $$\text{PDI} = 0.5 \times D_{\text{precedent}} + 0.3 \times D_{\text{statute}} + 0.2 \times \Delta_{\text{referee\_bias}}$$
    * Determines if further rebuttal is needed or if arbitration is final.
  * **`kmi_synthesizer_node.py`**:
    * Formats final outputs: B2B Regulatory Audit Dossier and Public Transparency Card.
- [ ] Author `backend/app/graph/graph.py`:
  * Build the `StateGraph`.
  * Add edges: `triage -> [advocate, auditor] -> evaluator`.
  * Add conditional edge: if `current_cycle < max_cycles` and not `consensus_reached` $\to$ loop back to `[advocate, auditor]`; else $\to$ `synthesizer -> END`.

### Phase D.4: FastAPI Endpoints & Server-Sent Events (SSE)
- [ ] Author `backend/app/main.py`:
  * CORS middleware configured for `http://localhost:3000`.
  * `GET /api/incidents`: Returns list of available benchmark incidents and metadata.
  * `GET /api/incidents/{incident_id}`: Returns full telemetry payload.
  * `POST /api/audit`: Runs full LangGraph deliberation synchronously, returns `Law18AuditResult`.
  * `GET /api/deliberate/stream`: SSE streaming endpoint yielding agent turn tokens and state transitions as they occur.
- [ ] Verify health check at `GET /health`.

### Phase D.5: Programmatic Entry Point (`run.py`) & Logging
- [ ] Implement `backend/run.py` meeting Hackathon Standard:
  ```bash
  python run.py --incident pubill
  python run.py --all
  python run.py --serve --port 8000
  ```
- [ ] Ensure execution writes structured logs to `backend/logs/trace-<run_id>.jsonl` with timestamps, agent decisions, token usage, and latency metrics.
- [ ] Write integration test in `backend/tests/test_deliberation.py` ensuring the pipeline completes in under 10 seconds.
