# DuroT's Task Playbook — Backend & Agent Graph Specialist
**Law18 | Python 3.11+, LangGraph, FastAPI, Zetaris & Meterless**

> **Reference Documents**:
> * Specification & Schemas: [`docs/PROJECT_SPEC.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/PROJECT_SPEC.md)
> * Agent State, Roles & Prompts: [`docs/AGENTS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/AGENTS.md)
> * Visual Identity & Schemas: [`docs/DESIGN.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/DESIGN.md)
> * Team Operating Guide: [`docs/TEAM_WORKFLOW.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TEAM_WORKFLOW.md)

---

## 1. Domain Ownership
DuroT leads:
1. **Multi-Agent State Machine**: Authoring the full orchestration graph in **LangGraph** (100% open-source, $0).
2. **Sponsor Technology Integration**:
   * **Zetaris Data Fabric**: Querying virtualized tables (`ifab_laws`, `season_precedents`, `match_telemetry`) with local SQLite/JSON fallback.
   * **Meterless Cognition Layer**: Implementing **H-MEM** (referee psychological & tendency memory) and **World Model** (pitch spatial coordinates and ball vectors).
   * **NVIDIA Nemotron**: API model calling for adversarial legal debating.
3. **Reproducibility & Execution**:
   * Programmatic entry point (`backend/run.py`).
   * Structured JSONL logging to `backend/logs/trace-<run_id>.jsonl`.
   * Guaranteed offline reliability via `SAMPLE_MODE=true`.
   * FastAPI service exposing endpoints for Sensei's Next.js frontend.

---

## 2. Detailed Task Breakdown

### Phase D.1: Python Environment & Telemetry Data Store
- [ ] Initialize Python 3.11+ virtual environment in `/backend`.
- [ ] Create `requirements.txt`:
  ```text
  langgraph>=0.2.0
  fastapi>=0.110.0
  uvicorn>=0.28.0
  pydantic>=2.6.0
  httpx>=0.27.0
  pytest>=8.0.0
  python-dotenv>=1.0.0
  ```
- [ ] Author structured incident telemetry JSONs in `backend/app/data/incidents/`:
  * `pubill_handball_54.json`
  * `fermin_highboot_29.json`
  * `eric_garcia_dogso_79.json`
- [ ] Author historical precedent records in `backend/app/data/precedents.json`:
  * **Mings Penalty (Club Brugge vs Aston Villa, Nov 2024)**: Similarity 0.98.
  * **Gabriel Goal-Kick Pickup (Arsenal vs Bayern, April 2024)**: Similarity 0.94.
  * **Sadio Mané High Boot on Ederson (Sept 2017)**: Similarity 0.92.
  * **Pickford Lunge on Van Dijk (Oct 2020)**: Similarity 0.89.
  * **David Luiz DOGSO Heel Clip (Arsenal vs Wolves, Feb 2021)**: Similarity 0.91.
- [ ] Author codified IFAB Law database in `backend/app/data/ifab_laws.json` (focusing on Law 11, Law 12.1, Law 12.3, Law 16, and official VAR Protocol text).

### Phase D.2: Zetaris Data Fabric Integration
- [ ] Implement `backend/app/sponsor/zetaris_client.py`:
  * Connect to the Zetaris instance to execute federated SQL across `ifab_laws`, `season_precedents`, and `match_telemetry`.
  * Implement offline fallback mechanism (`SAMPLE_MODE=true`) that queries local JSON/SQLite tables seamlessly.
  * Functions to expose:
    ```python
    def query_statutes(law_numbers: list[int], keywords: list[str]) -> list[dict]: ...
    def query_precedents(incident_type: str, min_similarity: float = 0.7) -> list[dict]: ...
    def query_telemetry(incident_id: str) -> dict: ...
    ```

### Phase D.3: Meterless Cognition Integration (H-MEM & World Model)
- [ ] Implement `backend/app/sponsor/meterless_engine.py`:
  * **H-MEM (Hierarchical Memory)**:
    * Holds profiles for match referees:
      * *István Kovács*: Foul intervention index 6.2, card threshold high, reluctance to initiate monitor review.
      * *Clément Turpin*: Red card index 0.34, strict DOGSO disciplinarian, high threshold on goalie challenges.
      * *Tobias Stieler*: Strict statutory compliance (as demonstrated in Mings penalty).
    * Provides methods to compute referee subjective variance delta ($D_{\text{tolerance}}$).
  * **World Model**:
    * Stores spatial pitch coordinates $(x, y)$, contact height relative to ground, and phase of play continuity.
  * **Markovian Engine**:
    * Enforces the bounded 4-step VAR reasoning checklist (Phase $\to$ Contact $\to$ Force/Silhouette $\to$ Clear & Obvious Bar) with $O(1)$ token carryover per step.

### Phase D.4: LangGraph Multi-Agent Deliberation Architecture
- [ ] Implement `backend/app/graph/state.py` using `Law18GraphState` defined in [`docs/AGENTS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/AGENTS.md).
- [ ] Implement Agent Nodes:
  * **`triage_node`**: Validates telemetry, extracts incident parameters, and determines IFAB law routes.
  * **`retriever_node`**: Executes Zetaris SQL queries to pull relevant IFAB clauses and historical precedents (e.g. Mings, Mané, David Luiz).
  * **`advocate_node`**: Employs NVIDIA Nemotron with the system prompt from `AGENTS.md` to defend the on-field/VAR call.
  * **`auditor_node`**: Employs NVIDIA Nemotron to prosecute the call, quoting exact IFAB statutes and highlighting contradictory precedent rulings.
  * **`evaluator_node`**: Computes mathematical consistency score (0–100%), assesses referee tendency delta via Meterless H-MEM, and triggers rebuttal loops if legal arguments contradict.
  * **`synthesizer_node`**: Compiles the final B2B Regulatory Audit Dossier and Public Match Center Card.
- [ ] Assemble the graph in `backend/app/graph/builder.py`:
  ```python
  from langgraph.graph import StateGraph, END
  
  builder = StateGraph(Law18GraphState)
  builder.add_node("triage", triage_node)
  builder.add_node("retriever", retriever_node)
  builder.add_node("advocate", advocate_node)
  builder.add_node("auditor", auditor_node)
  builder.add_node("evaluator", evaluator_node)
  builder.add_node("synthesizer", synthesizer_node)
  
  builder.set_entry_point("triage")
  builder.add_edge("triage", "retriever")
  builder.add_edge("retriever", "advocate")
  builder.add_edge("advocate", "auditor")
  builder.add_edge("auditor", "evaluator")
  builder.add_conditional_edges(
      "evaluator",
      should_rebuttal_or_retry,
      {"rebuttal": "advocate", "retry_retrieval": "retriever", "finalize": "synthesizer"}
  )
  builder.add_edge("synthesizer", END)
  graph = builder.compile()
  ```

### Phase D.5: Logging, Tracing & `run.py` CLI
- [ ] Configure JSONL execution logging in `backend/app/utils/logger.py`:
  * Every run outputs to `backend/logs/trace-<run_id>.jsonl` with timestamps, agent thoughts, citations, and execution time.
- [ ] Implement `backend/run.py` CLI:
  ```bash
  # Run benchmark test on Incident A in sample mode
  python run.py --incident pubill_handball_54 --sample
  
  # Run benchmark test on Incident B
  python run.py --incident fermin_highboot_29
  
  # Launch FastAPI backend server
  python run.py --serve --port 8000
  ```

### Phase D.6: FastAPI Endpoints & Docker Container
- [ ] In `backend/app/main.py`, expose:
  * `GET /api/health`: Health status.
  * `GET /api/incidents`: Lists all available match incidents.
  * `POST /api/audit`: Runs the LangGraph deliberation on an incident and returns `Law18AuditResult`.
  * `GET /api/traces/{run_id}`: Returns JSONL trace.
- [ ] Author standard `backend/Dockerfile` with non-root user, dependencies cached at build time, and verified `docker run -p 8000:8000` execution.
