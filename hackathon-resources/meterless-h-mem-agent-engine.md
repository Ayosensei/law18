# Meterless H-MEM Agent Engine — Headless Hierarchical Memory for Multi-Agent Systems

**Version:** 1.0
**Scope:** Standalone reference architecture for giving autonomous and multi-agent systems a persistent, hierarchical, auditable memory — with **no UI/UX dependency**. Memory is exposed as a service contract that agents call, not a panel a human reads.
**Audience:** Agent framework engineers, multi-agent system builders, and Open Agent Hackathon participants building headless or backend agents.

---

## 1) Why an Agent Needs H-MEM

A multi-agent system without memory re-derives the same conclusions every run, contradicts itself across steps, and cannot explain why it acted. H-MEM gives an agent:

- **Continuity** — what was learned in step 3 is available, ranked, in step 40 without resending full history.
- **Cross-agent shared knowledge** — a Planner agent's decision is retrievable by a Verifier agent.
- **Explainability** — every memory carries provenance, so an agent (or a judge) can answer "why did you believe that?"
- **Self-correction** — contradictions are detected and resolved as a runtime behavior, not a manual cleanup.

In agent terms: H-MEM is the substrate that turns a stateless prompt-caller into a system that **accumulates and governs knowledge**.

---

## 2) The Headless Reframe (What Changes vs a UI-Coupled Memory)

| UI-coupled memory | H-MEM Agent Engine (headless) |
|---|---|
| User clicks "approve this insight" | Approval is a **policy function or supervising-agent decision**; default is an auto-policy with an audit record |
| Memory trace shown in a sidebar | Trace is emitted as **structured log lines / JSONL artifacts** for downstream agents and evaluation |
| "Helpful / not helpful" thumb buttons | Feedback is a **typed event** emitted by a Critic/Verifier agent or an outcome signal |
| Human reads conflict and picks a winner | Conflict resolution runs an **auto-decision heuristic**; only flagged-uncertain conflicts escalate to a supervisor agent or queue |
| Dreaming reviewed in a screen | Dreaming proposals are written to a **proposals store**; an approval agent or rule promotes them |

The data model and lifecycle are unchanged. Only the **boundary** moves: from human-facing surface to **agent-facing service contract**.

---

## 3) Core Design Principles

- Treat memory as a **living knowledge graph**, not a flat note list.
- Separate **what is remembered** from **how it is injected into an agent's prompt**.
- Keep provenance on every inferred memory (`source`, `derivedFrom`, `supersedes`, `relatedTo`).
- Replace the human approval boundary with a **programmable approval boundary** (policy + optional supervisor agent).
- Make every mutation auditable through an append-only trust ledger that doubles as **submission evidence**.
- Favor graceful degradation: when model extraction is unavailable, fall back to direct capture rather than dropping information.

---

## 4) Canonical Memory Model

Each memory record contains:

- `id`, `content`, `type` (`personal`, `factual`, `preference`, `general`, `procedural`)
- `layer` (`short_term`, `working`, `long_term`)
- `timestamp`, `lastAccessed`, `accessCount`
- `tags`
- Retrieval fields: lightweight `embedding`, runtime `score`
- Reliability fields: `confidence`, `source`
- Hierarchy fields: `domain`, `namespace`
- Graph fields: `entities[]`, `relatedTo[]`, `supersedes`, `derivedFrom[]`
- **Agent fields (added for headless use):** `agentId` (which agent wrote it), `runId` (which orchestration run), `taskId` (which DAG/task node)

The agent fields are what let a multi-agent system attribute, filter, and replay memory per agent and per run — essential for orchestrated swarms and for judge-inspectable logs.

---

## 5) Storage Topology

Tiered storage with different persistence and decay behavior:

- **Short-term** — volatile per-run / per-session memory (the working set of the current orchestration run)
- **Working** — durable-but-cheap store for active project/task context
- **Long-term** — durable store for validated knowledge that survives across runs

Persistence split: long-term in a durable DB; working in a lightweight local store; short-term in process/run memory.

On run start (load): hydrate long-term + working, merge with run-scoped short-term, de-duplicate by ID, backfill missing embeddings, apply the forgetting curve to non-long-term records. This makes a fresh agent process **resume with prior knowledge** instead of cold-starting.

---

## 6) Memory Mining (Acquisition Pipeline) — Agent Event Sources

Instead of UI events (chat message, file save), a headless agent mines memory from **runtime events**:

| Agent event | Mine for |
|---|---|
| Tool call result | facts, observed state, failure signals |
| Sub-agent message / handoff | decisions, constraints passed downstream |
| Plan / DAG node completion | what was produced, what remains |
| Verifier/Critic verdict | corrections, invariants, quality signals |
| External API / retrieval response | factual knowledge, source-tagged |
| Run outcome (success/failure) | procedural memory ("approach X failed for task class Y") |

Pipeline per event: build an event-specialized extraction prompt → ask a background model for a strict JSON array of memory strings → parse robustly (strip fences, tolerate noise) → validate → add each with event-derived `type`, `tags`, `source`, and the `agentId`/`runId`/`taskId` of the emitting agent.

**No-model fallback:** store concise direct summaries as short-term memories so capture continuity is preserved even when the extraction model is rate-limited or unavailable — which matters both when your provider throttles you mid-build and when a judge runs your project in sample mode with no credentials at all.

---

## 7) Normalization and Enrichment

Every added/updated memory runs enrichment:

- **Domain classification** (multi-pass): explicit tags → specific-capability detection → project/run inference → weighted keyword/tag scoring → heuristic fallback.
- **Namespace generation** — domain sub-buckets (e.g., `orchestration/planning`, `tooling/retrieval`).
- **Entity extraction** — normalized entities (tools, datasets, services, concepts, agents).
- **Relationship discovery** — `supersedes` from high similarity + correction language; `relatedTo` by shared entities and domain affinity. Use bidirectional links where possible.

---

## 8) Reinjection (Retrieval → Agent Prompt Context)

Reinjection is the operational heart of H-MEM and the single most valuable thing it does for an agent.

### 8.1 Retrieval Ranking

Given a query (typically the current task description or the next sub-agent's brief): build query embedding → extract keywords → infer domain → extract entities → score each memory with hybrid ranking:

- semantic similarity + keyword overlap + tag overlap
- domain match boost + entity match boost
- layer weighting (long-term > working > short-term)
- recency boost; superseded penalty
- **agent-scope boost** (memories from the same `runId`, or written by collaborating agents, can be up-weighted)

Keep memories above threshold; take top N.

### 8.2 Reinjection Format

Return a **structured payload, not a pre-rendered string**, so any consumer (an LLM prompt builder, a planner, a tool-arg synthesizer) formats it for its target. Include trace metadata: `retrievalReason`, per-memory relevance score, selected strategy label (`minimal`, `task_focused`, `comprehensive`).

Inject into downstream prompts for: planning/orchestration, executor agents, debate/critic agents, tool-argument construction, merge/synthesis agents. This makes memory influence **explicit, inspectable, and reusable across the whole agent graph** — and the trace metadata is exactly the kind of evidence judges look for when checking that an agent actually reasoned over remembered state.

---

## 9) Dreaming System (Constructive Synthesis) — Headless

Dreaming generates *new* knowledge; it is not cleanup. Run it as a scheduled or between-runs job, not on a UI trigger.

- **Inputs:** pull all memories; cluster by multi-signal relatedness (content similarity, tag overlap, shared domain/type, entity overlap).
- **Proposal types:** `insight` (cross-memory conclusion), `domain` (reclassification), `invariant` (stable behavioral rule).
- **Execution phases:** init session state + telemetry → cluster → generate insights → generate domain suggestions → generate invariants → write proposals to a **proposals store**.

### 9.1 Programmable Approval Boundary (replaces human-in-the-loop)

- **Auto-policy (default):** promote proposals whose supporting cluster size ≥ threshold *and* min confidence ≥ threshold; everything else stays pending.
- **Supervisor-agent mode:** a dedicated approval agent (or the Verifier) reviews pending proposals and emits `approve`/`reject` events.
- Approved `insight` → new long-term `factual` memory with `derivedFrom`. Approved `invariant` → new long-term `preference`/procedural memory. Approved `domain` → update domain on source memories. Rejected → logged, not materialized.

Only approved proposals become durable memory — the boundary still exists, it is just code/agent instead of a screen.

---

## 10) Sleep System (Consolidation and Compaction)

Operational maintenance of memory quality and footprint, runnable as a between-runs job:

- **Preview first:** compute `toConsolidate` (stale short-term to promote), `toArchive` (low-access old, safe to remove), `toSynthesize` (highly similar groups to merge).
- **Guardrails:** never archive superseding/current records, derived/synthesized memories, or relationship hubs.
- **Execute:** snapshot backup → consolidate → archive → synthesize (merge tags/entities, inherit non-internal relations, create `derivedFrom` memory, delete sources) → persist a report with action log + counts + backup ID.
- Expose **restore-from-backup** as an API for recovery.

---

## 11) Trust Layer (Audit and Reliability) — Doubles as Submission Evidence

Append-only audit behavior plus feedback loops. In a headless agent, the ledger is not a screen — it is the **artifact trail** that proves the system reasoned over remembered state.

### 11.1 Audit Ledger

Log every significant action: create/read/update/delete, feedback, promote/demote/merge, conflict_detected/conflict_resolved, sleep actions. Each entry: `memoryId`, `action`, `actor` (agent or service), `timestamp`, optional `previousState`/`newState`, structured details. Emit as JSONL so it can be shipped to `logs/` and read by a judge.

### 11.2 Feedback Adaptation (event-driven)

Feedback comes from agents/outcomes, not thumbs:

- Critic/Verifier marks a recalled memory `helpful` → increase access count + confidence.
- `not_helpful` → small confidence decrease.
- `wrong` (outcome contradicted it) → larger confidence decrease + `review` tag.

This closes the loop between retrieval quality and future ranking automatically.

---

## 12) Conflict Detection and Resolution — Auto-Decide First

### 12.1 Detection

Scan memory pairs with contradiction heuristics: opposing phrase pairs, high-similarity conflicting numeric values, same-entity divergent claims. Confidence modifiers: shared entities ↑, same domain ↑, explicit relation ↓ false positives, `supersedes` suppresses (intended replacement). Persist conflict records with reason + metadata.

### 12.2 Resolution Strategies

Support keep-A / keep-B / keep-both / merge / delete-both. **Auto-decision** uses weighted heuristics (recency, access frequency, confidence, content richness, source reliability, conflict type, similarity/domain context). Only conflicts where the auto-decision margin is below a confidence threshold escalate to a supervisor agent or a pending queue. All resolutions are audit-logged.

---

## 13) Suggested Service Boundaries (Headless)

Composable services, each callable by any agent in the graph:

- `MemoryStoreService` — tiered persistence, CRUD, decay, promotion
- `MemoryMiningService` — runtime-event extraction + no-model fallback
- `MemoryRetrievalService` — ranking, structured context packaging, trace metadata
- `DreamingService` — clustering + proposal generation + **programmable approval**
- `SleepCycleService` — preview + execute + backup/report
- `TrustLedgerService` — audit ingest/query/stats/prune/export (JSONL-friendly)
- `ConflictService` — scan, classify, **auto-resolve**, escalate-on-uncertainty

Expose them behind a stable interface (in-process module, local sidecar, or networked service) so the same memory engine sits behind any agent framework.

In a six-day build, `MemoryStoreService` + `MemoryRetrievalService` is the minimum that pays for itself. Add dreaming and sleep only once retrieval is demonstrably working.

---

## 14) End-to-End Agent Lifecycle (No UI)

1. Run starts → hydrate memory tiers (warm start).
2. Each agent step emits runtime events → mine candidate memories.
3. Add/update with domain/entity/relationship enrichment + agent attribution.
4. Next agent/task → retrieve top memories → reinject as structured context.
5. Critic/outcome emits feedback events → adjust confidence/access.
6. Between runs → dreaming (programmable approval) for higher-order knowledge.
7. Between runs → sleep for consolidation/archival/synthesis.
8. Continuously → detect + auto-resolve contradictions.
9. Everything audited as JSONL → shipped to `logs/` as evidence.

---

## 15) Operational Defaults (Recommended)

- Retrieval top-N: 5 · hybrid threshold: ~0.35
- Consolidation: 7 days no recent access · Archive: 30 days + low access
- Dream cluster min size: 2 · relatedness threshold: ~0.35 · max proposals/type: 8
- Entity cap/memory: 10 · related links cap/memory: 5
- Auto-approve dream proposal: cluster ≥ 3 AND min confidence ≥ 0.7
- Conflict auto-resolve confidence margin: ≥ 0.15 (else escalate)

Tune per domain, task class, and observed agent behavior. Note that the consolidation and archive windows are written for systems that run for weeks; over a six-day build you will want much shorter windows if you intend to demo those behaviors.

---

## 16) Open Agent Hackathon Application Notes

- **Track fit:** H-MEM is the direct substrate for **Persistent Memory Agents**, where remembering across interactions, maintaining state and continuing work is the track's entire subject. It also underpins **Real-World Industry Agents** whenever a case, ticket or workflow spans more than one session.
- **Evidence of real agent work:** the audit ledger and reinjection trace metadata show knowledge flowing between agents, which is exactly what separates a system that does real work from a chain of prompts. This lands on the Technical score.
- **Robustness:** the no-model fallback and conflict auto-resolution show graceful degradation under rate limits and partial failure — and they keep sample mode working when a judge has no credentials.
- **Provider-agnostic:** all model calls (extraction, dreaming) go through an injected generator, so the engine runs behind whichever provider your team chose, and a mid-build provider switch costs one line.
- **Demo value:** memory is hard to show in a single run. The strongest demos show three sessions: what the agent learned, what it retrieved next time, and what it did differently as a result.
- **Ship the ledger:** write the JSONL audit and retrieval traces into your run's `logs/` directory so judges can see the memory engine working end to end.
- **Companion engines:** H-MEM is the memory substrate the other agent engines draw on — the [Scout Intent Detection Agent Engine](SCOUT_INTENT_DETECTION_Agent_Engine.md) reads it during context assembly, the [Markovian Agent Engine](MARKOVIAN_Agent_Engine.md) injects retrieved context at its first chunk, the [Swarm Orchestration Agent Engine](SWARM_ORCHESTRATION_Agent_Engine.md) uses it as cross-agent shared knowledge, and the [World Model Agent Engine](WORLD_MODEL_Agent_Engine.md) pairs it as the memory subsystem alongside canonical world state.

---

## 17) Implementation Checklist

- [ ] Define canonical memory schema with lineage **and agent attribution** fields.
- [ ] Implement tiered persistence and warm-start loading.
- [ ] Add acquisition hooks for all runtime event types (tool result, handoff, node-complete, verdict, outcome).
- [ ] Build extraction prompts + robust JSON parsing fallback (no-model path).
- [ ] Implement enrichment (domain, namespace, entities, relations).
- [ ] Implement hybrid retrieval scoring + structured reinjection payload + trace metadata.
- [ ] Implement programmable approval boundary (auto-policy + optional supervisor agent).
- [ ] Implement trust ledger as queryable JSONL audit, shippable to `logs/`.
- [ ] Implement conflict scanning + auto-resolution + uncertainty escalation.
- [ ] Implement dream proposal cycle and sleep preview/execute/backup/restore.
- [ ] Add metrics: memory health, retrieval hit rate, conflict rate, approval throughput.

---

## 18) Explicit Non-Goals

- No UI rendering, no human-at-runtime assumptions, no panel/screen contracts.
- No replay/session rewind (out of scope, optional separate module).
- No provider-specific model lock-in.

This is intentionally a headless, agent-facing engine: any multi-agent system can mount H-MEM as modular services and expose it entirely through APIs and event streams.

---

## Addendum: About Meterless

This document is a **tailored agent version of an original primitive** from Meterless, provided for Open Agent Hackathon participants. Meterless is the cognition layer partner for the hackathon. The source primitives, deeper references, and reference implementations live at **[https://meterless.ai](https://meterless.ai)**.

If you find these engines useful in your build, please **visit the site for more, check out the Meterless GitHub projects, and give them a star**. These were provided to give you an advantage in development — if they help you, return the favor.