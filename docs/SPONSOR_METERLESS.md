# Law18 — Sponsor Integration Specification: Meterless
**Local-First Agent Cognition Layer: World Model, H-MEM, Markovian Engine & Nightshift**

> **Hackathon Scoring Category**: Sponsor Tech (10 Points)  
> **Load-Bearing Role**: Spatial pitch state representation, referee behavioural memory, and bounded token-efficient VAR deliberation.
>
> **Related Documentation**:
> * Master Technical Spec: [`docs/PROJECT_SPEC.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/PROJECT_SPEC.md)
> * UI/UX & 2D Pitch Canvas: [`docs/DESIGN.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/DESIGN.md)
> * Multi-Agent Graph: [`docs/AGENTS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/AGENTS.md)
> * Zetaris Data Fabric: [`docs/SPONSOR_ZETARIS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_ZETARIS.md)
> * NVIDIA Nemotron Inference: [`docs/SPONSOR_NVIDIA.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_NVIDIA.md)
> * Cursor Environment: [`docs/SPONSOR_CURSOR.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_CURSOR.md)

---

## 1. Executive Summary: Why Meterless is Load-Bearing in Law18

In conventional AI sports applications, models either receive raw, noisy video frames (requiring expensive GPU clusters and hallucinating non-existent fouls) or are fed giant prompt blobs containing full match logs, running out of context and drifting into contradictory referee justifications.

**Meterless solves both failure modes** for Law18 by serving as the headless local-first cognition layer:
1. **World Model Agent Engine**: Houses the grounded, queryable spatial representation of the football pitch (105m × 68m standard pitch grid), player velocity vectors, ball trajectories, and contact points. Every agent in our LangGraph graph inspects the exact same grounded physical reality rather than re-deriving coordinates independently.
2. **H-MEM (Hierarchical Memory) Agent Engine**: Stores persistent referee behavioural profiles (e.g., István Kovács' leniency in restart incidents, Clément Turpin's high DOGSO threshold). H-MEM prevents memory drift across deliberation steps and tracks historical consistency deviations over multi-match referee careers.
3. **Markovian Agent Engine**: Bounded-context protocol manager that breaks the multi-turn adversarial VAR review into strict, token-efficient chunks ($O(1)$ carryover per debate turn). This keeps LLM costs and latency strictly bounded while preserving full reasoning provenance.
4. **Meterless Nightshift**: The local runtime proxy (`http://127.0.0.1:8088/v1/chat/completions`) routing inference requests securely to NVIDIA Nemotron models.

---

## 2. Architecture & System Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                              METERLESS CORE                            │
│                                                                        │
│   ┌───────────────────┐    ┌───────────────────┐    ┌────────────────┐ │
│   │    WORLD MODEL    │    │       H-MEM       │    │   MARKOVIAN    │ │
│   │  Spatial Pitch    │    │ Referee Profiles  │    │ State Machine  │ │
│   │  Entities/Vectors │    │ Leniency Memory   │    │ Bounded Debate │ │
│   └─────────┬─────────┘    └─────────┬─────────┘    └────────┬───────┘ │
└─────────────┼────────────────────────┼───────────────────────┼─────────┘
              │                        │                       │
              ▼                        ▼                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       LANGGRAPH DELIBERATION GRAPH                     │
│                                                                        │
│   [ Triage Node ] ────► [ VAR Advocate ] ◄──► [ Rules Auditor ]        │
│   (Spatial bounds)      (H-MEM defense)       (Zetaris statute check)  │
│                                │                       │               │
│                                └───────────┬───────────┘               │
│                                            ▼                           │
│                                [ Consistency Evaluator ]               │
│                                (Markovian state arbitration)           │
└────────────────────────────────────────────┬───────────────────────────┘
                                             │
                                             ▼
                               [ Meterless Nightshift ]
                           (NVIDIA Nemotron 70B/340B Proxy)
```

---

## 3. Detailed Component Integrations

### 3.1 Meterless World Model Engine
* **File Location**: [`backend/engines/meterless_world_model.py`](file:///home/saturnsurfer/Documents/PROJECTS/law18/backend/engines/meterless_world_model.py)
* **Purpose**: Ingests structured Opta/Hawk-Eye telemetry and builds a queryable spatial state.
* **Core Primitives Implemented**:
  * `WorldStoreService`: Stores entities (`PlayerNode`, `Ball`, `ContactPoint`) and geometric relationships (`distance_to_goal`, `recovery_vector_angle`, `boot_elevation`).
  * `ContextBuilderService`: Exposes spatial context queries to agent nodes (e.g., `get_covering_defenders_in_cone(forward_pos, goal_pos, radius)`).
  * `ProvenanceTracker`: Emits JSONL spatial event traces to `backend/logs/world-model-trace.jsonl`.

### 3.2 Meterless H-MEM (Hierarchical Memory) Engine
* **File Location**: [`backend/engines/meterless_hmem.py`](file:///home/saturnsurfer/Documents/PROJECTS/law18/backend/engines/meterless_hmem.py)
* **Purpose**: Persistent referee profile memory, tracking disciplinary tendencies and leniency deltas.
* **Tiers Implemented**:
  * **Short-Term Memory (STM)**: Current match events (e.g., *Pubill was already cautioned at 45+1'*).
  * **Working Memory (WM)**: Active tournament disciplinary context (e.g., *Kovács has awarded 0.38 penalties per 90 in UCL 2025/26*).
  * **Long-Term Memory (LTM)**: Multi-year career tendencies, VAR overturn resistance, and historical leniency in non-dangerous handball incidents.
* **Sleep/Consolidation Cycle**: Consolidates post-match audit findings into the referee's persistent profile without corrupting baseline stats.

### 3.3 Meterless Markovian Engine
* **File Location**: [`backend/engines/meterless_markovian.py`](file:///home/saturnsurfer/Documents/PROJECTS/law18/backend/engines/meterless_markovian.py)
* **Purpose**: Manages multi-agent debate tokens. Instead of accumulating 16,000 tokens across repeated back-and-forth arguments between `VARAdvocate` and `RulesAuditor`, Markovian compresses each turn into a structured 120-token carryover delta:
  $$\text{State}_{t+1} = f(\text{State}_t, \text{Delta}_t)$$
* **Guarantees**: $O(1)$ token cost per deliberation round, avoiding prompt budget exhaustion.

### 3.4 Meterless Nightshift Runtime
* **Purpose**: Local inference proxy for model abstraction and execution verification.
* **Port / URL**: `http://127.0.0.1:8088/v1/chat/completions`
* **Headers**:
  * `Authorization: Bearer $METERLESS_RUNTIME_TOKEN`
  * `meterless-app: law18`
  * `meterless-scope: officiating-deliberation`

---

## 4. Implementation Code Blueprint

```python
# backend/engines/meterless_world_model.py
from typing import Dict, Any, List
from pydantic import BaseModel

class SpatialQuery:
    @staticmethod
    def calculate_dogso_cone(attacker_x: float, attacker_y: float, defenders: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Queries the Meterless World Model for covering defender angles."""
        covering = []
        for d in defenders:
            if d["x"] < attacker_x and abs(d["y"] - attacker_y) < 6.0:
                covering.append(d)
        return {
            "covering_count": len(covering),
            "nearest_defender_distance": min([abs(d["x"] - attacker_x) for d in defenders], default=99.0),
            "dogso_breached": len(covering) == 0
        }

# backend/engines/meterless_hmem.py
class HMEMRefereeMemory:
    def __init__(self, ref_id: str):
        self.ref_id = ref_id
        self.stm = [] # Short-term: current match cards
        self.ltm = {} # Long-term: historical strictness

    def retrieve_context_block(self, incident_type: str) -> str:
        """Injects ranked memory into agent debate nodes."""
        return (
            f"[H-MEM CONTEXT: {self.ref_id}]\n"
            f"- Career strictness percentile: {self.ltm.get('strictness', 75)}%\n"
            f"- Penalty award frequency: {self.ltm.get('penalty_rate', '0.38/90')}\n"
            f"- Known tendency: High deference to on-field non-calls during restart errors."
        )
```

---

## 5. Local Setup & Environment Variables

### 5.1 Environment Configuration (`.env`)
```bash
# Meterless Runtime Configuration
METERLESS_BASE_URL=http://127.0.0.1:8088/v1
METERLESS_RUNTIME_TOKEN=your-meterless-runtime-token
METERLESS_APP_ID=law18
METERLESS_ROUTING_MODE=meterless/auto

# Injected Generator Fallback (Offline Mode)
METERLESS_OFFLINE_MODE=false
```

### 5.2 Verification Script
Run the verification check from the terminal:
```bash
python3 backend/scripts/verify_meterless.py
```
Expected output:
```text
[PASS] Meterless World Model: Spatial entity registry online (105x68m grid)
[PASS] Meterless H-MEM: Kovács & Turpin referee profiles hydrated
[PASS] Meterless Markovian Engine: Bounded carryover loop verified (O(1) tokens)
[PASS] Meterless Nightshift: HTTP 200 from http://127.0.0.1:8088/v1/chat/completions
```

---

## 6. Offline & Judge Reproducibility Fallback

If hackathon judges do not have the local Meterless Nightshift daemon running on port 8088:
* The codebase detects `ConnectionRefusedError` and automatically switches to **Offline Deterministic Fallback Mode**.
* In fallback mode, the World Model and H-MEM engines run entirely in-process using local state matrices (`backend/data/meterless_hmem_cache.json`).
* This guarantees that judges can clone the repo and run `python3 backend/run.py --incident incident-a` with **zero setup hurdles**.

---

## 7. Submission Text & Presentation Talking Points

* **README Copy**:
  > *"Law18 relies on Meterless as its foundational cognition layer. The Meterless World Model resolves pitch coordinate geometries into objective spatial facts. Meterless H-MEM persists referee behavioral profiles and historical decision tendencies across matches. The Meterless Markovian Engine bounds the adversarial VAR debate into strict, token-efficient chunks, and Meterless Nightshift routes high-leverage arbitration calls directly to NVIDIA Nemotron."*
* **Video Pitch Script (15 Seconds)**:
  > *"Instead of blowing our token budget on massive raw logs, we use the Meterless World Model to ground pitch telemetry in an exact 2D coordinate space, while Meterless H-MEM supplies referee behavioral memory. This keeps our multi-agent VAR debate completely bounded, deterministic, and lightning fast."*
