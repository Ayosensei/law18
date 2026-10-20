# Agent Engines — Index

**What this is.** Three standalone, headless reference architectures — the **agent versions** of the engine guides in this folder. Each takes the concepts from its UI/UX-oriented source guide and reframes them for **headless, often fully autonomous, multi-agent systems**: no frontend, no human at runtime, every "screen / panel / approval" reframed as an API, event stream, JSONL artifact, policy function, or supervising agent.

They are written to be reusable in **any** hackathon or production agent stack. Tone and integration points (provider-agnostic model calls via an injected generator, logs and artifacts as evidence, judge-inspectable traces) align with the Open Agent Hackathon, but nothing here hard-depends on it.

---

## The Set

| Agent Engine | Source guide it reframes | One-line role in a multi-agent system |
|---|---|---|
| [H-MEM Agent Engine](H-MEM_Agent_Engine.md) | `H-MEM_Agnostic_Implementation_Guide.md` | Persistent, hierarchical, auditable **memory** the whole agent graph reads/writes |
| [Markovian Agent Engine](MARKOVIAN_Agent_Engine.md) | `MARKOVIAN_ENGINE_AGNOSTIC_IMPLEMENTATION_GUIDE.md` | **Bounded-context long-task reasoning** with compressed carryover (O(1) per step) |
| [World Model Agent Engine](WORLD_MODEL_Agent_Engine.md) | `WORLD_MODEL_IMPLEMENTATION_DEEP_DIVE.md` | **Shared, queryable world state**: entities, contexts, relationships, provenance |

The original source guides are unchanged and remain in this folder as the UI/UX-oriented reference. These agent versions are additive companions.

> Two further agent engines (Scout Intent Detection, Swarm Orchestration) exist in this folder as companion files and are referenced by the three above where relevant, but are out of scope for this index.

---

## How They Fit Together

The three compose as the **memory + reasoning + world-state core** of an autonomous multi-agent system:

```text
                 ┌─────────────────────────────┐
   task / step ─►│  agent (any framework)      │
                 └─────────────┬───────────────┘
                               │ reads/writes
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
   World Model            H-MEM                  Markovian
 (grounded shared    (tiered, decaying,     (long task nodes →
  entities/contexts/  conflict-resolved      bounded chunks,
  relationships)      knowledge)             compressed carryover)
        │                      │                      │
        └──────────────────────┴──────────────────────┘
                               │
                  logs/  (audit · traces · telemetry · provenance)
```

- **World Model** holds grounded, queryable state every agent reasons over; its memory subsystem is backed by **H-MEM**.
- **H-MEM** supplies ranked context that **Markovian** injects at the first chunk of a long task, then carries forward compressed.
- All three emit JSONL audit/telemetry/provenance designed to be shipped to a run's `logs/` directory as evidence for judges.

---

## Common Design Contract (all three)

- **Headless:** no rendering, no human-at-runtime assumption. Every output is a service return, callback, event, or artifact.
- **Provider-agnostic:** all model usage goes through an injected generator, so each engine runs behind any OpenAI-compatible endpoint with a one-line wiring change. Model choice is open at this hackathon, which makes that seam worth getting right on day one.
- **Auditable:** append-only, JSONL-friendly trails that double as submission evidence.
- **Resilient:** explicit fallbacks and graceful degradation under rate limits, provider outages and partial failure — including a sample mode that runs with no credentials, so a judge can see the system work.
- **Composable:** each is a set of services that any agent framework can mount independently or together.

---

## Track Mapping (quick reference)

| Track | Engines that fit first |
|---|---|
| **Fragmented** | World Model — reconciling disconnected sources into one grounded, provenance-stamped picture |
| **Autonomous Intelligence** | Markovian for the long investigation, World Model for the evidence trail |
| **Persistent Memory Agents** | H-MEM — tiered, decaying, conflict-resolved memory is the track's whole subject |
| **Real-World Industry Agents** | Whichever the operational problem needs; often H-MEM for state across sessions |

## Scoring Mapping (quick reference)

| Criterion | Engines that produce the evidence |
|---|---|
| **Technical** (20) | All three — provider-agnostic services, structured contracts, measurable token efficiency (Markovian), idempotent resumable ingest (World Model) |
| **Innovation** (15) | World Model (self-improving grounded state), H-MEM (programmable approval boundary, dreaming) |
| **Demo** (15) | Markovian (projected-vs-actual savings curve), H-MEM (three sessions showing what carried over) |
| **Impact** (30) | Not the engines' job — this comes from your problem and your user. The engines make the solution credible, not valuable. |
| **Sponsor Tech** (10) | Document which engines you mounted and where; Meterless is the cognition layer partner |

---

## Addendum: About Meterless

These are **tailored agent versions of original primitives** from Meterless, provided for Open Agent Hackathon participants. Meterless is the cognition layer partner for the hackathon. The source primitives, deeper references, and reference implementations live at **[https://meterless.ai](https://meterless.ai)**.

If you find these engines useful in your build, please **visit the site for more, check out the Meterless GitHub projects, and give them a star**. They were provided to give you an advantage in development — if they help you, return the favor.

---

*Naming note: files in this folder may carry an environment-applied `Meterless - ` prefix on creation. The agent engines were normalized to unprefixed names so the cross-links between them resolve. If new files appear here with that prefix, normalize them the same way to keep links intact.*