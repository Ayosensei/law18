# Meterless World Model Agent Engine — Headless Shared World State for Multi-Agent Systems

**Version:** 1.0
**Scope:** Standalone reference architecture for giving autonomous and multi-agent systems a persistent, queryable, evolving model of *things* (entities of any kind), the *contexts* they appear in, and the *relationships* between them — with **no UI/UX dependency**. The world model is exposed as a control-plane service contract that agents call, not a "library" panel a human browses.
**Audience:** Agent framework engineers, multi-agent system builders, and Open Agent Hackathon participants building headless or backend agents that must share grounded, explainable state.

---

## 1) Why an Agent System Needs a World Model

A swarm of agents without shared world state re-derives the same entities every step, contradicts itself across agents, and cannot explain *what it believes about the world or why*. One agent decides "Acme Corp is a customer," another simultaneously treats it as a prospect, a third never learns either fact — and no artifact records which belief won.

A World Model gives an agent system:

- **Grounded shared state** — entities, contexts, and relationships are written once and queried by every agent, so a Planner, an Executor, and a Verifier reason over the *same* world.
- **Continuity** — an entity discovered in step 3 (with its canonical anchor) is still itself in step 80, across agents and across runs, without resending raw history.
- **Explainability** — every record carries provenance and is reconstructable from an append log, so an agent (or a judge) can answer "why does the system believe this, and where did it come from?"
- **Coherence under concurrency** — derived canon is recomputed, not mutated from many places, so a parallel swarm does not corrupt the world.

In agent terms: the World Model is the substrate that turns a set of independent prompt-callers into a system that **accumulates, governs, and can defend a consistent picture of the world**. It is domain-agnostic — characters, news stories, datasets, sensors, companies, tasks, claims are all "entities" — but for headless multi-agent systems the primary use case is **tasks, tools, sessions, observations, and world state shared across an agent graph**.

---

## 2) The Headless Reframe (What Changes vs a UI-Coupled World Model)

The data model, write lifecycle, and semantics are **unchanged**. Only the **boundary** moves: from an operator-facing "Library / control plane" UI to an **agent-facing control-plane API + events + artifacts**.

| UI / operator-coupled World Model assumption | World Model Agent Engine (headless) |
|---|---|
| Operator-facing **Library / control plane UI** for CRUD, enrichment, maintenance | Control-plane is a **headless API + event stream**: query/mutation/maintenance endpoints any agent calls; state changes emit typed events |
| "Operators are the immune system" (humans watch and repair) | A **supervisor / maintenance agent + policy + alerts**: orphan/stale/conflict signals are events; auto-policy repairs, escalates only on uncertainty |
| Library shows leaderboards, sparklines, trend badges, "related" panels | **Query endpoints return structured data** (rankings, time series, neighborhoods); the consuming agent or judge formats it — the engine never renders |
| "Nuke-and-rebuild gated by user confirmation" dialog | **Programmable confirmation**: a policy gate, a supervisor-agent decision, or an approval-queue entry — destructive jobs never run without a code/agent authorization record |
| "Wired-vs-helper gap documented for human contributors" | Gap recorded in the **run manifest / telemetry** so agents *and* judges see which context helpers are live vs dormant at runtime |
| Enrichment "UI shows progress and how far along" | Enrichment is **first-class jobs emitting status events + JSONL**; an orchestrator or evaluation harness subscribes — no progress bar |
| Manual create / edit in the operator UI | **Mutation endpoints** invoked by ingest pipelines, supervisor agents, or import jobs; "manual" becomes "agent- or job-authored" with attribution |

The control plane still exists with the same three responsibilities (display, edit, maintenance) — it is just **code/agent-driven instead of screen-driven** (see §11).

---

## 3) High-Level Architecture

A world model is, at minimum, three things layered together — identical whether human- or agent-facing:

1. **A schema** — typed records for entities, contexts, and relationships.
2. **A pipeline** — an ordered, idempotent set of steps that ingests raw input (here: agent observations, tool results, feeds), derives entities, and writes them to a durable store.
3. **A read surface** — queries, projections, and context builders that downstream *agents* (planning, generation, retrieval, ranking, verification) call into instead of joining tables themselves.

Architectural traits that carry over unchanged to the headless engine:

- **One canonical store, many derived views.** Persisted rows are the source of truth. Derived state (latest-version maps, rankings, canonical merged entities) is reconstructed on read or rebuilt as a materialized view — never mutated independently by an agent.
- **Append-friendly, mutate-cautiously.** Observations, snapshots, and events are appended. Canonical aggregates are recomputed from the append log, not edited in place by whichever agent ran last.
- **Idempotent pipelines.** Re-running ingest on the same input produces the same world state. This makes a crashed/aborted agent run **safe to resume** and a swarm safe to retry.
- **Stable IDs derived from content, not autoincrement.** Hash-based IDs (e.g., `ent_${stableHash(name.toLowerCase())}`) let independent agents agree on entity identity **without coordination** — the property that makes a swarm converge instead of fork.
- **Schema-versioned storage.** Every store carries a version; migrations are explicit, inspectable, and themselves jobs.
- **Bounded blast radius.** A failed enrichment on one entity does not poison the rest of the world or crash the agent that triggered it.

The architecture is intentionally portable: the same pieces run in-process behind a single agent, as a sidecar shared by a local swarm, or as a networked service behind a distributed orchestrator. No external infrastructure is required client-side (see §12.3).

Two recurring shapes keep the abstractions concrete (most real agent systems are hybrids):

- **Example A — Timeline-of-snapshots:** a history of states (agent steps, scenes, sessions, frames) where entities exist *within* snapshots. Suits agent-trace, narrative, simulation, and run-state world models.
- **Example B — Stream-clustered facts:** a stream of incoming items (observations, articles, events) clustered into higher-order aggregates (stories, topics, incidents). Suits research, news, monitoring, and intelligence agents.

---

## 4) The World Data Model

### 4.1 Aggregate shapes

There is no single "right" aggregate. Pick the one matching how the agent system accumulates state.

- **Timeline aggregate** (Example A)

```text
  World
    ├─ id, name
    ├─ snapshots: Snapshot[]
    │     ├─ timestamp
    │     ├─ context (config, location, scene, run/session)
    │     ├─ entities: EntityRef[]    // entities present in this snapshot
    │     ├─ events: Event[]           // what happened (agent actions, tool calls)
    │     └─ artifacts (image, transcript, log)
    ├─ activeSnapshotIndex
    └─ registries: { locations, factions, items, sessions, ... }
```

  Use when world state evolves through discrete agent steps and an agent must reconstruct or branch from any point (replay, what-if, rollback).

- **Stream-cluster aggregate** (Example B)

```text
  Items[]                         // raw ingested observations / tool outputs
    └─ clustered into Stories[]   // higher-order aggregates
                ├─ entities: EntityRef[]
                ├─ events: Event[]
                ├─ sources: SourceRef[]
                └─ scores: Score[] (over time)
```

  Use when raw input arrives continuously from feeds/sensors/tools and meaning emerges from grouping (research and monitoring agents).

- **Pure graph aggregate**

```text
  Nodes: { id, type, properties }
  Edges: { from, to, type, properties, validFrom, validTo }
```

  Use when relationships are first-class and time-bitemporality matters (knowledge-graph agents, lineage, compliance).

- **Hybrid** — most production agent systems combine two or more: a research swarm may have a stream-cluster of observations plus a source graph plus a topic taxonomy; an agentic narrative tool may have a timeline plus a location registry plus an entity graph.

### 4.2 Entity records

A robust entity record separates **identity**, **semantics**, **continuity anchors**, **aggregates**, **provenance**, and **lifecycle**. The headless engine adds agent-attribution fields so a swarm can attribute, filter, and replay world changes per agent and per run.

| Layer | Purpose | Examples |
|---|---|---|
| Identity | Stable handle agents agree on | `id` (content hash), `name`, `type`, canonical aliases |
| Semantics | What it *is* / *means* | `description`, `traits`, `tags`, `summary` |
| Continuity anchors | Reduce drift across regenerations / re-encounters by different agents | visual essence, fingerprint hash, embedding, schema signature |
| Aggregates | Cheap-to-read rollups for ranking/context | `mentionCount`, `firstSeenAt`, `lastSeenAt`, `linkedStoryIds` |
| Provenance | Where it came from | `isCustom`, `importedFrom`, `discoveredAt`, `createdFromSnapshotIndex` |
| Lifecycle | Where it is now | `state` (`emerging` / `active` / `archived`), `confidence`, `staleness` |
| **Agent attribution** (headless) | Who/what wrote it | `agentId`, `runId`, `taskId` — lets a swarm attribute and replay world changes per agent |

Not every entity needs every layer. A research claim benefits from provenance and confidence; a tracked tool/service benefits from lifecycle (online/deprecated); a generated character benefits from continuity anchors. Pick what the agent system's consumers actually reward.

### 4.3 Context records

Entities live *inside* contexts: "the environment in which this entity was observed or acted upon." Contexts deserve first-class records when reused or carrying their own properties:

- **Locations** (places, regions, scenes)
- **Sessions / runs** (agent orchestration runs, conversations, episodes) — the natural home for `runId`
- **Sources** (publishers, sensors, channels, feeds, tools)
- **Tenants / accounts** (multi-tenant data partitions)
- **Time windows** (step, sprint, market session, rolling interval)

Contexts often have their own graph (adjacency, hierarchy, lineage) and their own enrichment (reliability score, atmosphere, palette, trust weight).

### 4.4 Relationship records

Edges between entities, when promoted to first-class records, gain:

- **Type** (`mentions`, `cites`, `owns`, `reports_to`, `connects_to`, `causes`, `depicts`, `produced_by_agent`)
- **Direction** (directed, undirected, symmetric)
- **Properties** (weight, confidence, time bounds)
- **Provenance** (which observation / which agent run produced this edge)

If that richness is not needed, edges stay implicit — denormalized as ID arrays on the endpoints (`entity.linkedStoryIds`, `story.entityIds`). Implicit edges are cheaper but harder to evolve (see §7).

---

## 5) Persistence and Durability

### 5.1 Choosing a substrate

| Substrate | Good fit for | Trade-offs |
|---|---|---|
| IndexedDB / SQLite (client) | Single-process / single-swarm agents, offline, privacy-sensitive | No multi-writer merge; constrained query language |
| Postgres / MySQL (server) | Distributed swarms, transactional, joinable | Operational overhead; network round trips |
| Document DB (Mongo, Firestore) | Flexible schema, embedded aggregates | Weak join story; eventual-consistency caveats |
| Graph DB (Neo4j, Neptune) | Edge-heavy agent reasoning, multi-hop queries | Niche tooling; learning curve |
| Vector DB (pgvector, Pinecone, Qdrant) | Semantic recall for context builders | Needs an embedding pipeline; not a system of record |
| Object store + index | Large artifacts (images, transcripts, logs) | Pair with a metadata DB |
| In-memory + write-through | Hot working set, tests, fallbacks | Volatile; mirror to durable store |

Use **one write-through adapter** that hides substrate choice from every agent and provides graceful degradation (e.g., IndexedDB primary with in-memory fallback, or Postgres primary with read-replica failover). Agents call the adapter, never the substrate — the same property that lets H-MEM and Markovian sit behind any backend.

### 5.2 Stores you typically need

Names vary; the *kinds* recur:

- **Canonical entity store** — keyed by stable ID
- **Canonical context store** — keyed by stable ID (locations, sources, sessions/runs)
- **Edge / mention store** — indexed on both endpoints
- **Snapshot / observation store** — append-only history (agent steps / tool outputs)
- **Score / metric snapshot store** — time series and ranking features
- **Aggregate / materialized view store** — rebuilt from canonicals (never mutated independently)
- **App / pointer state** — current selections, queues, active world, processing head

### 5.3 Indexing

Index every foreign-key-shaped field used in lookups, plus time fields for window queries:

- `mentions.articleId`, `mentions.storyId`
- `snapshots.worldId`, `snapshots.runId`
- `scores.storyId` (for "latest by ID")
- `entities.type` (for typed leaderboard queries)
- time indexes (`discoveredAt`, `publishDate`) for "as-of" / rolling-window agent queries

### 5.4 Failure handling

Durable, resilient storage habits — all expressed without a human:

- Detect corruption, blocked-open, and quota errors explicitly; classify them as machine-readable failure events.
- Retry transient errors with exponential backoff.
- Provide a **"nuke-and-rebuild" path for unrecoverable corruption, gated by programmable confirmation** (policy gate / supervisor-agent decision / approval-queue entry) — never an unguarded auto-wipe and never a dialog box.
- Persist *aggregate documents*, not only deltas, so a lost append does not leave the world unreadable to the next agent.
- Debounce writes (e.g., ~300 ms) to avoid write storms when a fast swarm edits rapidly.

---

## 6) End-to-End Write Lifecycle

The write path is the most consequential part of a world model: get it right and every consuming agent benefits.

### 6.1 The canonical pipeline shape

Regardless of domain, ingest pipelines follow this order. Each stage is **awaited per record**, **idempotent**, and **safe to interrupt** (so an aborted agent run can resume):

1. **Reconcile** — detach stale edges/aggregates touching items being reprocessed.
2. **Cluster / classify** — group raw items into higher-order aggregates (stories, scenes, sessions/runs).
3. **Persist primary aggregates** — stories, snapshots, sessions.
4. **Score / measure** — compute trend velocity, salience, confidence; persist a snapshot row per measurement.
5. **Infer derived records** — events, milestones, alerts (alerts become supervisor-agent signals, §11).
6. **Persist edges** — mentions, links, citations.
7. **Rebuild materialized views** — sources, leaderboards, "latest" maps (queried, never rendered).
8. **Patch source items** — write computed fields back onto raw items so consumer agents avoid joins.
9. **Rebuild aggregates** — entity mention counts, trend direction, last-seen timestamps.
10. **Mark stale** — items not touched this cycle whose state is now out of date (a maintenance-agent input).

### 6.2 Snapshot creation (Example A)

1. Agent input or upstream signal enters a creation queue.
2. Generate or capture the snapshot's primary content (text, image, transcript, telemetry, tool output).
3. Extract entities present in the snapshot.
4. Enrich entities (visual essence, embeddings, classifications, summaries) via queued jobs (§9).
5. Compose the snapshot record (context + entities + artifacts + timestamp + `runId`/`agentId`).
6. Append to the world's history; rebuild aggregates.
7. Persist through the write-through adapter; emit a `snapshot.created` event.

### 6.3 Stream ingest (Example B)

1. Pull raw items from feeds, APIs, scrapers, sensors, or tool results.
2. Normalize to a common item shape with stable IDs.
3. Cluster items into aggregates via a refinement loop:
   - Coarse bucket by URL / signature / time / source.
   - Refine within bucket via similarity (Jaccard, cosine, edit distance, entity overlap).
   - Union-find to collapse merge-equivalent buckets.
4. Compute aggregate properties (title, summary, state, confidence).
5. Run the canonical pipeline (§6.1) over the resulting aggregates.

### 6.4 Bulk update / migration jobs

Some operations are world-wide rewrites and must be **explicit jobs** with progress events, cancellation, and resumability — never incidental side effects of an agent edit:

- Re-render every snapshot containing entity X with X's updated definition.
- Re-cluster every item under a new similarity threshold.
- Backfill embeddings for every entity after switching enrichment providers.
- Repair orphan edges after a schema migration.

These are world-model migrations at the content level; they deserve the same rigor as schema migrations and are triggered through the maintenance API (§11.3), often by a supervisor agent under policy.

---

## 7) Semantic Meaning Capture

"Semantic" means *what an entity means and how it relates to others*, beyond its ID — the part that lets an agent reason rather than just look up.

### 7.1 Sources of meaning

- **Structured fields** on the entity (description, type, tags, traits)
- **Surrounding context** (snapshot narrative, item titles, transcript / tool-output text)
- **Aggregate history** (how often, alongside what, with what outcome)
- **Embeddings** (vector representations for similarity recall)
- **External references** (Wikidata IDs, DOIs, ISO codes, cross-system keys)
- **Generated summaries** (model-produced canonical descriptions, refreshed on change)
- **Observational memory** (what the system has seen the entity do)

### 7.2 Symbolic vs textual vs vector representations

Three complementary encodings — pick deliberately; most agent systems use all three:

| Representation | Strengths | Weaknesses | Good for |
|---|---|---|---|
| **Symbolic** (typed predicates, RDF triples, schemas) | Precise, queryable, explainable | Brittle, expensive to author, schema-heavy | Compliance, ontologies, lineage, verifier agents |
| **Textual** (descriptions, traits, summaries) | Cheap, expressive, model-friendly | Hard to query exactly, drifts over time | Generative pipelines, prompt context |
| **Vector** (embeddings, hashes) | Similarity, retrieval, clustering, dedup | Opaque, requires model versioning | Context builders, dedup, recommendation |

A tracked entity might have a typed `type` field (symbolic), a `description` (textual), and a `visualEssence`/centroid embedding (vector) — each consulted by different agents.

### 7.3 Continuity anchors

Continuity is the property that an entity *remains itself* across regenerations, edits, and re-encounters by **different agents**. Anchors are the dense, hard-to-drift representations that context builders re-inject. Examples:

- A 2–3 sentence visual essence for a character
- A canonical schema fingerprint for a dataset
- A normalized name + alias set for a public figure or company
- A topic embedding centroid for a story cluster
- A device serial + firmware version for a sensor

When any agent's generation or inference step might *invent* a fresh version of an entity, anchors are the lever that pulls it back to canonical — the world-model analogue of a continuity contract across a swarm.

### 7.4 Memory subsystems

Long-running agent world models grow a memory layer separate from the canonical store:

- **Short-term / working memory** — the last N observations of the current run, kept verbatim
- **Episodic memory** — recent sessions/runs, lightly summarized
- **Long-term memory** — distilled facts, retrievable by similarity

Memory is consulted at context-construction time and emitted as a `[RELEVANT MEMORIES]`-style block in the structured context payload. Keep memory writes automatic but **bounded** — not every observation deserves to be remembered forever. This subsystem is the seam to the **[H-MEM Agent Engine](H-MEM_Agent_Engine.md)**: the World Model owns *grounded entities/contexts/relationships*; H-MEM owns *tiered, decaying, conflict-resolved knowledge*. A mature stack mounts H-MEM as the memory substrate behind §7.4 and lets the World Model's context builder draw `[RELEVANT MEMORIES]` from it.

---

## 8) Relationship Graphing

### 8.1 Levels of graph maturity

Most agent world models do not need a graph database. Move up a level only when the previous one is provably insufficient — each level adds query power and operational cost:

1. **Implicit** — relationships emerge from co-occurrence in snapshots or shared aggregates. No edges stored.
2. **Denormalized** — edges live as ID arrays on the endpoints (`entity.linkedStoryIds`).
3. **First-class edge records** — `mentions` store indexed on both endpoints; supports edge properties.
4. **Typed graph** — multiple edge types, each with its own constraints and queries.
5. **Bitemporal graph** — edges carry validity intervals; an agent can query "the world as it was on date X" (audit / lineage / verifier use).

### 8.2 Common edge patterns

- **Mentions** — item ↔ entity (text references entity)
- **Member-of** — entity ↔ aggregate (article in story, character in scene)
- **Adjacency** — context ↔ context (location connects to location)
- **Hierarchy** — entity ↔ entity (topic → subtopic)
- **Citation / lineage** — directed, often weighted
- **Co-occurrence** — derived, often a materialized view

### 8.3 Implicit signals to harvest before building a graph

Before promoting to typed edges, check whether value already exists in:

- Shared snapshot membership
- `@mentions` in text / tool output
- Shared location, source, or session/run
- Title / description token overlap
- Shared embedding neighborhood

A surprisingly capable relationship layer for agent reasoning can be built from these alone.

---

## 9) Dynamic Enrichment

Enrichment is the set of post-ingest jobs that improve fidelity over time — the world model gets *better* the longer the agent system runs because enrichment fills in what the initial write could not.

### 9.1 Common enrichment kinds

- **Detail extraction** — pull structured attributes from unstructured artifacts (entities from text, schema from CSV, face details from image).
- **Continuity anchor computation** — derive dense fingerprints (visual essence, embeddings, hashes).
- **Trait / tag generation** — categorical labels from descriptions or context.
- **Cross-source enrichment** — merge information about the same entity from multiple sources/agents.
- **Vision / multimodal import** — accept an image/audio/document and produce a typed entity.
- **Rebuild / replay** — re-run a prior enrichment over historical content with an improved model.
- **Merge detection** — find probable duplicates (Levenshtein on names, story overlap, embedding distance) and propose merges (a supervisor-agent or policy decision, not a screen).
- **Stale flagging** — mark entities whose underlying source changed since last enrichment (a maintenance-agent input).

### 9.2 Enrichment as a queue, not a side effect

Enrichment must be:

- **Explicit jobs** with IDs, status, and progress
- **Bounded in scope** (per-entity, per-window, per-source)
- **Cancellable**
- **Resumable**
- **Observable** — status is emitted as **events / JSONL artifacts**, not a progress bar; an orchestrator or judge harness subscribes

Implicit enrichment (running quietly in a mount hook or a global side effect) is a debugging nightmare in a swarm: no agent can find or stop it. Promote enrichment to first-class jobs early.

### 9.3 Provider abstractions

Enrichment calls external providers (LLMs, vision, embeddings). Hide them behind an injected adapter with:

- Provider preference (cloud vs local, primary vs fallback)
- Rate limiting and retry
- Cost / token accounting
- Versioning — record which provider + model produced each enrichment, so a later agent can rebuild deterministically

This is the same provider-agnostic seam as the other engines: point the enrichment adapter at whichever model endpoint your team uses and nothing else changes.

---

## 10) Context Injection

The world model exists to be *consumed by agents*. Most consumption happens at context-construction time: a downstream agent asks "what does the world model know that is relevant here?"

### 10.1 Common injection points

- **Generation / planning prompts** — entity canon, recent history, relevant memories, location atmosphere.
- **Search and ranking** — story velocity, source diversity, entity mention counts as features.
- **Retrieval-augmented generation** — top-K relevant entities or memories prepended to a query.
- **Cross-agent handoff** — the world payload a Planner passes to an Executor / Verifier.
- **Recap / digest jobs** — periodic structured summaries of what changed (artifacts, not screens).
- **Notifications** — fire an **event** when an entity crosses a threshold (velocity, confidence, staleness) — consumed by a supervisor agent, never a toast.

### 10.2 Building context (the context-builder algorithm)

A good context builder:

1. Accepts the *intent* (what is being planned, generated, ranked, or verified).
2. Selects relevant entities and contexts — by mention, recency, similarity, or salience.
3. Prioritizes (mention-prioritized first, then recency, then similarity).
4. Prefers continuity anchors over raw fields (the visual essence, not the raw description).
5. Falls back gracefully when an anchor is missing.
6. Truncates to a token / size budget.
7. **Returns a structured payload, not a pre-rendered string**, so any agent (prompt builder, planner, tool-arg synthesizer) formats it for its target — including trace metadata (`selectionReason`, per-item relevance, strategy label).

### 10.3 The wired-vs-helper trap

A common gap: rich context-builder helpers exist, but the active code path injects a simpler subset. **Audit what is actually injected at runtime, not what *could* be.** In the headless engine this gap is not a code comment for human contributors — it is recorded in the **run manifest / telemetry** so agents *and* judges can see which helpers are live and which are dormant. An undocumented gap is silent debt that misleads the whole swarm.

This makes the World Model the natural context-assembly source feeding intent and orchestration layers — see the **[Scout Intent Detection Agent Engine](SCOUT_INTENT_DETECTION_Agent_Engine.md)** (world payload as an input to intent classification) and the **[Markovian Agent Engine](MARKOVIAN_Agent_Engine.md)** (world context injected at the **first chunk only**, then carried compressed).

---

## 11) Writing and Updating Items

### 11.1 Entity writes

Entities are created/updated through several channels — the headless engine keeps every channel but removes the human one:

- **Agent / job-authored creation** (replaces "manual creation in the operator UI") — attributed via `agentId`/`runId`.
- **Import** from JSON, CSV, image, document, or external system (an import job).
- **Generation** by ingest pipelines.
- **Bulk update** by ID or name match across all snapshots/items (a bulk job, §6.4).
- **Bulk delete** with cascade to edges and aggregates (gated by programmable confirmation).

### 11.2 Canonical reconstruction

When an entity exists across many snapshots/items written by different agents, a canonical view is *derived*, never owned by one writer:

- **Latest-wins** for atomic fields.
- **Union** for set-valued fields (traits, tags, aliases).
- **Longest-text-wins** for descriptive fields (a useful proxy for "most informative version").
- **Most-confident-wins** when a confidence score exists.
- **Provenance-weighted** when sources/agents have differing trust.

The canonical view is what consuming agents see; per-snapshot versions remain for audit and replay — this is exactly the **auditable evidence** a judge can trace back to source.

### 11.3 Context writes (locations, sources, sessions)

Contexts have their own write patterns, all agent/job-driven:

- Create / edit / delete via mutation endpoints.
- Extraction from current snapshot or item ("turn this scene into a saved location").
- Generation from world context ("invent a region consistent with what we have").
- Image / document import.

### 11.4 Snapshots and items (immutability)

Snapshots are **immutable by default** — they are observations of the world at a moment. The API may permit reordering, branching, duplicating, or deleting snapshots, but mutating an existing snapshot's content is rare and explicit (a logged job). Items in a stream model (articles, observations, tool outputs) are likewise immutable inputs; their *world-model annotations* (`storyId`, `entityIds`, sync state) are the mutable surface.

### 11.5 Stale and orphan handling

Every world model accumulates rot; in a headless system rot is handled by the maintenance agent + policy, not a human:

- **Stale flags** — once-synced items whose aggregate has since changed.
- **Orphan detection** — entities/events linked to no aggregate (a data-quality canary, emitted as an alert event).
- **Tombstones** — soft deletes that preserve historical references for audit.
- **Repair jobs** — explicit, supervisor-agent- or policy-triggered rebuilds (not operator-triggered).

---

## 12) The Headless Control Plane (Replaces the "Library")

The source's operator-facing Library is reframed as a **control-plane API + event stream**. Its three responsibilities are unchanged — only the surface is. Every world model worth keeping deserves a control plane; here it is a service, not a screen.

### 12.1 Display → Query Endpoints

Instead of rendering, expose query endpoints returning **structured data the consumer formats itself**:

- Per entity type: `listEntities(type, {filter, sort, page})` returning the deduped, canonical list with `firstSeen` / `lastSeen` / appearance count; `getEntity(id)` with drill-down to per-snapshot/per-item appearances.
- Per context (locations/sources/sessions): `listContexts(kind)` with usage counts; `assignContext(snapshotId, contextId)` / `unassign(...)`.
- Per aggregate (stories/clusters): velocity, confidence, state badges, linked entities/items/sources, **trend series as arrays** (no sparklines — the array *is* the sparkline; an agent or judge renders if it wants).

### 12.2 Edit → Mutation Endpoints / Bulk Ops

- `create` / `update` / `delete` with cascade.
- Bulk operations (`rename`, `retype`, `merge`) as jobs (§6.4).
- `generateTraits` / `generateTags`.
- JSON `import` / `export`.
- Image / document import.
- `suggest` / `generate` (random or guided).
- `rebuildEnrichment(scope)`.

### 12.3 Maintenance → Trigger / Queue / Health Endpoints + Alerts

- `triggerPipeline(mode)` — `full`, `repair`, `window`.
- `getQueueState()` — running / queued / failed jobs.
- `getJobProgress(jobId)` — emitted also as events / JSONL.
- `getHealth()` — schema version, record counts, orphan counts, queue depth (the data the operator panel used to show).
- `nukeAndRebuild()` — guarded by **programmable confirmation** (policy / supervisor-agent / approval queue), never an unguarded call.
- **Alerts** — orphan/stale/conflict/threshold crossings are emitted as typed events. A **supervisor / maintenance agent** subscribes, auto-repairs under policy, and escalates only uncertain cases to an approval queue. This is the source's "operators are the immune system" — re-cast as an autonomous immune system: *policy + supervisor agent + alert events*.

### 12.4 Common model gaps to watch for (documented for agents + judges)

The source's UI/model gaps map directly onto headless gaps; record each in the run manifest so they are not silent debt:

- Dense continuity anchors (essences, embeddings) drive generation but are not exposed as readable/editable API fields → expose them.
- Edge fields exist (`connectedLocationIds`, `entityIds`) but no relationship-query endpoint → add a graph query.
- Pipelines run but no queryable run history → persist run records (JSONL).
- Enrichment jobs run but no per-job log → emit per-job JSONL.

### 12.5 Suggested service boundaries (headless)

Composable services, each callable by any agent in the graph:

- `WorldStoreService` — write-through persistence, canonical/append stores, indexing, schema versioning
- `IngestPipelineService` — the 10-step canonical lifecycle (idempotent, resumable)
- `EnrichmentService` — queued enrichment jobs + provider abstraction
- `ContextBuilderService` — structured context payloads + trace metadata + wired-vs-helper manifest
- `RelationshipService` — implicit→typed edge access, graph queries
- `ControlPlaneService` — query / mutation / maintenance endpoints (the headless Library)
- `SupervisorAgent` (+ policy) — consumes alert events, auto-repairs, escalates on uncertainty

Expose them behind a stable interface (in-process module, local sidecar, or networked service) so the same world model sits behind any agent framework.

---

## 13) Jobs, Queues, and Concurrency

A real agent world model runs many concurrent operations: ingestion, enrichment, bulk rewrites, agent edits, render-equivalent context builds. Concurrency is where most production bugs in a swarm live.

### 13.1 A practical queueing model

- **Per-aggregate FIFO queue** — one running job at a time per world / project / stream, with a FIFO backlog. Avoids cross-talk between agents writing the same aggregate.
- **Job typing** — `ingest`, `action`, `bulk_update`, `rebuild`, `enrichment`; different policies per type.
- **Processing head** — for chained jobs, a pointer to the snapshot they extend from.
- **Stale discard** — jobs older than N minutes are discarded with a machine-readable reason.
- **Retry / fallback** — network errors retry with backoff; persistent provider failures fall back to alternatives.
- **Cancellation** — jobs are cancellable; the canceller wins (an aborting agent must be able to stop work cleanly).

### 13.2 Background coordination decoupled from framework lifecycle

Separate the background coordinator from any agent-framework lifecycle. Pipelines must **not** be tied to an agent's step/turn or a component mount/unmount: a long-running ingest must survive an agent finishing its turn, a sub-agent handing off, or a run being navigated away from. The coordinator is a standalone service the orchestrator drives, mirroring the Markovian engine's rule that long work outlives the caller's lifecycle.

### 13.3 No external infrastructure required client-side

For in-process / single-swarm world models, in-process queues with per-aggregate isolation are sufficient — zero external infra. For distributed swarms, a managed queue (SQS, Redis, NATS) buys durability across restarts, but the per-aggregate FIFO discipline still applies unchanged. This keeps the engine mountable in a hackathon build environment with no infrastructure burden. For blackboard-style shared state across DAG tasks in a larger orchestration, see the **[Swarm Orchestration Agent Engine](SWARM_ORCHESTRATION_Agent_Engine.md)** — the World Model is its natural shared-state substrate.

---

## 14) Trade-offs and Architectural Choices

Three axes drive most design decisions; a headless agent system lands in the middle of each.

### 14.1 Semantic depth vs scalability

- **Deep semantics** (typed ontology, model-based entity classification, knowledge-graph linkage) — better agent reasoning, slower ingest, expensive merge logic.
- **Shallow semantics** (regex extraction, denormalized aggregates, structural signals) — fast, cheap, scales freely; weaker explanations.

Pick the depth the *consuming agents* actually need — a search agent needs less depth than a compliance/verifier agent.

### 14.2 Mutable canon vs immutable append

- **Mutable canon** (an agent edits entities directly) — flexible, low-friction, drift-prone in a swarm.
- **Immutable append** (ingest writes only; canon is rebuilt) — consistent, replayable, harder to "fix one wrong field."

Most systems are mutable-canon for agent/job-authored entities and immutable-append for derived aggregates.

### 14.3 Generative vs observational

- **Generative** (a model produces entities, traits, summaries) — rich, hallucination risk, needs continuity anchors.
- **Observational** (entities extracted from real signals / tool outputs) — grounded, sparse, needs aggregation to feel "alive."

Real agent systems mix: observational ingest + generative enrichment + supervisor-agent override.

### 14.4 Time models

| Model | Use when |
|---|---|
| Discrete steps | Each state change is meaningful (agent turns, scenes, sessions) |
| Continuous timestamps | Events have absolute times (news, telemetry, tool logs) |
| Bucketed windows | You analyze rates over rolling intervals (1h / 24h / 7d) |
| Bitemporal | You need "as-of" queries (compliance, audit, verifier replay) |

Most agent world models need at least two of these.

---

## 15) Universal Portability Blueprint (Headless Order)

To stand up this architecture for a new agent system, roughly in this order:

1. **Pick aggregate shape** — timeline, stream-cluster, graph, or hybrid.
2. **Define the entity record** — identity / semantics / continuity / aggregates / provenance / lifecycle **+ agent attribution (`agentId`/`runId`/`taskId`)**.
3. **Choose a persistence substrate** with a write-through adapter and graceful fallback.
4. **Implement stable ID derivation** (content-hash / normalized-name / external-key) so agents converge without coordination.
5. **Build the ingest pipeline** in canonical order (§6.1), idempotent and resumable.
6. **Add a context builder** that agents call instead of joining tables themselves; return a structured payload + trace metadata.
7. **Add enrichment jobs** as first-class queue entries with progress events and cancellation.
8. **Expose the headless control plane** — query / mutation / maintenance endpoints + alert events (not a Library UI).
9. **Add the supervisor / maintenance agent + policy** to consume alerts and run repair under programmable confirmation.
10. **Promote relationships** from implicit → denormalized → first-class as agent demand grows.
11. **Add memory and continuity anchors** (mount [H-MEM Agent Engine](H-MEM_Agent_Engine.md)) when generation or retrieval starts drifting.
12. **Instrument** record counts, schema version, orphan counts, queue depth, job duration — as JSONL shipped to `logs/`.
13. **Record the wired-vs-helper map** in the run manifest so agents and judges know what is actually live.

---

## 16) Pitfalls and Anti-Patterns

- **Schema drift without versioning.** Migrations become archaeology. Stamp every store with a version from day one.
- **Mutable aggregates.** If `mentionCount` can be incremented from any agent, it will be wrong. Recompute it.
- **Hidden enrichment.** Side effects in mount hooks / global state. No agent will be able to find or stop them later.
- **Joining in consumers.** Every agent reinvents the same join. Centralize in the context-builder service.
- **Single-source canon.** One bad write from one agent overwrites the truth. Use canonical reconstruction with provenance.
- **Edges as flags.** A `bool isAllyOf` on every entity does not scale to N relationships. Promote to edges.
- **Unbounded memory.** Saving every observation forever degrades quality and cost. Distill and forget (delegate to H-MEM).
- **No control plane.** A world model with no control surface calcifies. Headless ≠ uncontrolled — ship the API + supervisor agent (the autonomous immune system).
- **Ingestion as a one-shot.** Real ingest must be repeatable, resumable, and repair-friendly so a crashed agent run recovers.
- **Conflating "stored" with "loaded."** Storing rich data no agent ever reads is a tax on every write — keep the wired-vs-helper map honest.
- **Tying pipelines to an agent's lifecycle.** Long ingest must outlive the turn that started it.

---

## 17) Open Agent Hackathon Application Notes

- **Coherence + explainability win:** the World Model is the substrate that makes a multi-agent solution *coherent* (every agent reasons over the same canonical state) and *explainable* (every belief reconstructs from a provenance-stamped append log). Judges reward grounded state and traceable beliefs over confident-but-ungrounded output.
- **Robustness as evidence:** idempotent, resumable, interrupt-safe ingest means a crashed or rate-limited agent run resumes the world instead of corrupting it — concrete engineering depth.
- **Auditable evidence:** serialize the append log, canonical-reconstruction inputs, run records, and per-job enrichment status as JSONL into a `logs/` directory. "Here is exactly why the system believed X, and the source observation it came from" is strong submission material.
- **Fit with the partner stack:** the World Model maps directly onto the Open Agent Hackathon stack — Zetaris at the data layer feeding ingest (§6) and Meterless engines at the cognition layer.
- **Provider-agnostic enrichment:** every enrichment model call goes through an injected adapter, so the engine runs behind whichever model provider your team uses with a one-line wiring change and no provider lock-in.
- **Broad domain fit:** the same engine underpins research and knowledge-graph agents, monitoring and intelligence aggregators, agent-trace and run-state monitors, and other data-heavy domains — useful across all four tracks, and a natural fit for **Fragmented** (reconciling disconnected sources into one grounded picture) and **Persistent Memory Agents** (state that survives across runs).

---

## 18) Implementation Checklist

- [ ] Pick aggregate shape (timeline / stream-cluster / graph / hybrid).
- [ ] Define entity / context / relationship records with provenance, lifecycle **and agent attribution**.
- [ ] Choose a substrate; implement the write-through adapter with graceful fallback.
- [ ] Implement content-hash stable ID derivation.
- [ ] Implement the 10-step canonical ingest pipeline (idempotent, resumable, interrupt-safe).
- [ ] Implement snapshot creation, stream ingest, and bulk/migration jobs.
- [ ] Implement semantic capture (symbolic/textual/vector) + continuity anchors; mount H-MEM for memory tiers.
- [ ] Implement relationship maturity ladder (implicit → typed) + graph queries.
- [ ] Implement enrichment as first-class queued jobs behind a provider adapter.
- [ ] Implement the context-builder returning a structured payload + trace metadata + wired-vs-helper manifest.
- [ ] Implement the headless control plane (query / mutation / maintenance endpoints + alert events).
- [ ] Implement the supervisor/maintenance agent + policy + programmable confirmation for destructive ops.
- [ ] Implement per-aggregate FIFO queues, job typing, cancellation, lifecycle-decoupled coordination.
- [ ] Ship append log, run records, enrichment status, and health as JSONL to `logs/`.

---

## 19) Explicit Non-Goals

- No operator UI, no Library screens, no leaderboards/sparklines/panels rendered by the engine — only structured data and events.
- No human-at-runtime: every "view" is a query return, every "approval/confirmation" is a policy / supervisor-agent / approval-queue decision.
- No provider lock-in: all enrichment model calls go through an injected adapter.
- **Stored ≠ loaded discipline:** rich data is only worth storing if a consuming agent actually reads it; keep the wired-vs-helper map honest.

This is intentionally a headless, agent-facing engine: any multi-agent system can mount the World Model as modular services, write through the canonical pipeline, and consume grounded entities, contexts, and relationships entirely through APIs, events, and JSONL artifacts. It is the shared world state that makes a swarm coherent — and the provenance trail that makes it explainable.

---

## Addendum: About Meterless

This document is a **tailored agent version of an original primitive** from Meterless, provided for Open Agent Hackathon participants. Meterless is the cognition layer partner for the hackathon. The source primitives, deeper references, and reference implementations live at **[https://meterless.ai](https://meterless.ai)**.

If you find these engines useful in your build, please **visit the site for more, check out the Meterless GitHub projects, and give them a star**. These were provided to give you an advantage in development — if they help you, return the favor.