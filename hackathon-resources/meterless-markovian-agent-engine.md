# Meterless Markovian Agent Engine — Headless Bounded-Context Reasoning for Long Agent Tasks

**Version:** 1.0
**Scope:** Standalone reference architecture for executing long, multi-step agent reasoning as a chain of bounded chunks with compressed carryover — **no UI/UX dependency**. All "tabs," "panels," and "streaming UX" from UI-coupled designs are reframed as **telemetry artifacts, structured logs, and callbacks** an agent or evaluation harness consumes.
**Audience:** Agent framework engineers, builders of autonomous long-running agents, and Open Agent Hackathon participants whose agents must reason over long tasks under token and cost constraints.

---

## 1) Why an Agent Needs Markovian Execution

Long agent tasks (multi-file builds, deep research, recursive analysis) blow up naive prompting: resending full history every step grows cumulative cost toward **O(n²)**. When you are paying for your own API calls across a six-day build, this is the difference between a workable budget and a surprise invoice — and mid-run, it is the difference between finishing and getting rate-limited.

The Markovian engine executes a long task as a sequence of bounded chunks where each step sends only:

- the original goal (truncated summary on continuation steps)
- compressed carryover state from the prior step
- optional initial context (memory/workspace/attachments) — first step only

Per-step context is effectively **O(1)** relative to chain length. For an autonomous agent this means **long tasks become feasible and cheap**, and the token savings are measurable evidence of engineering quality.

---

## 2) The Headless Reframe (What Changes vs the UI-Coupled Engine)

| UI-coupled Markovian | Markovian Agent Engine (headless) |
|---|---|
| "Engine tab" with projected/actual charts | `EngineReportService` returns the **same data as a structured object**; charts are the consumer's problem, not the engine's |
| Live telemetry side panel | Telemetry emitted as **events / JSONL log lines**; an orchestrator or judge harness subscribes |
| Streaming UX, fixed-height containers, anti-flicker throttling | `onChunk(delta)` / `onPhase(phase)` **callbacks**; throttling is optional and exists only to bound event volume, not to prevent layout shift |
| "UI strips markers before display" | Engine strips markers before returning content to the **calling agent**; raw markered text stays internal |
| Operator browses chain inspector | Chain is a queryable **run record**; an agent or evaluator reads steps programmatically |

The algorithm, marker protocol, compression cascade, and math are **unchanged**. Only the output surface changes: from screens to **service returns, callbacks, and artifacts**.

---

## 3) Canonical Data Model

### 3.1 Chunk Config

`ChunkConfig`: `chunkSize` (gen budget/chunk), `maxChunks` (chain depth cap), `carryoverTokens` (carryover budget), `overlapTokens` (reserved).

Reference defaults: `chunkSize=8000`, `maxChunks=12`, `carryoverTokens=256`, `overlapTokens=128`.
Bounds: `chunkSize` 1000–128000 (step 1000); `carryoverTokens` 128–32768 (step 128).

### 3.2 Per-step Record

`ChunkInfo`: `id` (1-based), `tokens` (`ceil(chars/4)` estimate), `carryover` (state into this step), `content` (clean output).

### 3.3 Run Record

`MarkovianRun`: `id`, `timestamp`, `prompt` (truncated), `mode`, `chunks[]`, `totalTokensUsed`, `totalTokensSaved`, `efficiencyPercent`, `durationMs`, `completed`, and **`runId`/`agentId`** so a swarm can attribute chains to the agent that ran them.

### 3.4 Cumulative Stats

`MarkovianCumulativeStats`: `totalRuns`, `completedRuns`, token totals, `averageEfficiency`, `totalChunksProcessed`, `lastRunTimestamp`, `efficiencyHistory[]`. This is **report data**, returned by an API — not a chart widget.

---

## 4) Marker Protocol (State and Completion)

Explicit markers let the model signal continuation vs completion.

- State checkpoint: `[STATE_CHECKPOINT]` · Final: `[TASK_COMPLETE]`
- Back-compat detection (optional): `@@@STATE@@@`/`[STATE]`/`---STATE---`; `@@@FINAL@@@`/`[FINAL]`/`---FINAL---`

Rules: each non-final chunk ends with the state marker + concise state summary; final chunk ends with the final marker. **The engine** (not a UI) strips markers and internal control text before returning `content` to the calling agent.

---

## 5) Component Architecture (Headless Services)

### 5.1 Config Service
Holds current `ChunkConfig`, clamps updates to bounds, and produces the **projected efficiency curve as data** (10-step reference):
- `historySize = (step-1) * chunkSize`; `standardStepCost = historySize + chunkSize`
- `markovianStepCost = carryoverTokens + chunkSize`

Returned as an array for any consumer (a report file, an evaluation harness) — no chart dependency.

### 5.2 Chunk Manager
Allocates chunk IDs, stores `ChunkInfo[]`, enforces `maxChunks`. Token estimate: `ceil(content.length/4)`.

### 5.3 State Carryover Service — Compression Cascade (strict order)
1. **Explicit override** — parse text after the state marker, sanitize, accept if meaningful.
2. **LLM compression** — call injected `compressorFn(prompt, systemPrompt)` with previous state + current chunk preview; enforce concise "3–5 critical points."
3. **Heuristic extraction** — regex-capture key phrases ("Therefore", "Key insight", "Status"); compress first N into a semicolon summary.
4. **Absolute fallback** — tail-truncate words to the carryover budget.

This makes carryover robust even during model or API instability — critical when a provider rate-limits you mid-run on day five.

### 5.4 Prompt Builder
Mode templates. At least:
- `ARCHITECT` first chunk (analyze/plan/start) and continuation chunk (truncated goal ~200 chars + previous carryover + strict continue rules + marker rules).
- `RESEARCH` first chunk (recursive analysis, action-log pattern `>> ...`, research-tree state snapshot) and continuation.

Modes are data-driven so new agent task classes can register their own templates.

### 5.5 Runtime Orchestrator
One function executes the chain with an **injected generator** (provider-agnostic), the prompt, mode, attachments, memory context, an abort signal, and an optional `onChunk` callback. Loop: while can-add-chunk and not-done →
1. emit `phase=generating` event
2. build chunk prompt from mode + carryover
3. invoke generator (callback receives deltas)
4. update live token/savings estimates
5. strip markers from content
6. account tokens, accumulate savings
7. run compression phase (`phase=compressing`)
8. update carryover metrics
9. persist chunk
10. if final marker detected → done

After loop: if completed and not aborted, run reflection (`phase=reflecting`); finalize; asynchronously persist run history + analytics. No render step exists anywhere in this loop.

### 5.6 Progress Service (Event Stream, not a Panel)
Emits a state object: lifecycle (`isActive`, `phase`, `phaseDetail`), chunk counters, token metrics (`tokensUsed`, `tokensSaved`, `carryoverSize`), timing, a bounded log queue, and `completedChunks[]`. Phases: `initializing`, `generating`, `compressing`, `reflecting`, `complete`, `error`. Consumers **subscribe**; nothing is drawn. Event emission may be throttled (e.g., 300 ms) **only to bound event volume / cost**, not to prevent UI flicker.

### 5.7 History Service (Persistent Analytics)
Load prior runs, record each run, compute cumulative stats, provide aggregated performance-by-step data, support delete/clear and subscriptions. Storage split is an implementation choice (e.g., a run-records store + a cumulative-stats key); for your submission, also serialize run records into `logs/` as JSONL evidence.

---

## 6) Memory and Context Reinjection Contract

The engine accepts `memoryContext` as external input and injects it into the **first chunk only**: `enhancedPrompt = memoryContext + "\n\nTask: " + prompt` (if non-empty).

Upstream composition (agnostic): retrieve memory context (e.g., from the [H-MEM Agent Engine](H-MEM_Agent_Engine.md)) → append workspace/task context → append selected artifact snippets → pass into the Markovian run. Attachment policy: chunk 0 gets full attachments; continuation chunks get none by default. Heavy context enters at step 1; compressed carryover + goal summary maintain continuity afterward.

This is the clean integration seam between Markovian and a memory engine in a multi-agent system.

---

## 7) Token and Efficiency Math (Reference Formulas)

**During generation (estimate), chunk `i`:** `chunkTokens = ceil(text.length/4)`; `historySize = i*chunkSize`; `standardChunkCost = historySize + chunkTokens`; `markovianChunkCost = carryoverTokens + chunkTokens`; `chunkSavings = max(0, standard - markovian)`.

**Per completed run:** `totalTokensUsed = Σ chunk.tokens`; standard cumulative = for each `i`, `Σ tokens[0..i-1] + tokens[i]`; markovian cumulative = `chunks.length * carryoverTokens + totalTokensUsed`; `tokensSaved = max(0, standard - markovian)`; `efficiencyPercent = tokensSaved/standard*100`.

Token accounting is heuristic (`chars/4`), not tokenizer-precise — adequate for relative savings and good enough as submission evidence; note the heuristic in your write-up. Judges reward honest measurement more than an impressive number.

---

## 8) Completion and Reflection

Completion: a chunk containing the final marker stops recursion and marks the run completed. Reflection runs only when ≥1 chunk exists, the run completed (not interrupted), and not aborted. It builds a prompt from the original goal + final carryover + full generated content (truncated if huge) + an artifact summary (count/language/size of code blocks), and appends a synthesis. **Reflection failure must not fail the run** — preserve partial output.

---

## 9) Engine Reporting (Headless Replacement for the "Engine Tab")

Provide `EngineReportService` returning **plain data objects**, never widgets:

- **Projected report:** theoretical Standard vs Markovian curve from config.
- **Actual report:** aggregated real runs step-by-step, per-step averages with sample counts, real savings and savings %.
- **Auto behavior:** if ≥1 run with chunks exists, default the report `mode` to `actual`.
- **Config controls:** expose `setConfig({chunkSize,maxChunks,carryoverTokens})` clamped to bounds; new values apply to the next run; projections recompute on read.
- **Chain inspector:** `getRun(runId)` / `listRuns()` returning per-step incoming carryover, output snapshot, and token count.
- **History management:** `deleteRun(id)`, `clearHistory()`.

A UI *may* later visualize these, but the engine has zero rendering responsibility.

## 10) Live Telemetry (Headless Replacement for the "Panel")

Expose a telemetry stream with three logical views as **queryable state**, not screens: current session, live progress, historical run. Core KPIs: efficiency %, chain depth, Markovian tokens used, comparable standard-token estimate. Core series as arrays: context-velocity (standard vs markovian per step), state-compression ratio per step. Emit as events and/or JSONL; throttle emission to bound volume.

---

## 11) Error and Abort Handling

- Check the abort signal before each chunk and before compression.
- On chunk failure: set telemetry `phase=error` with a machine-readable detail; preserve partial output.
- Reflection failure must not crash the run.
- Log friendly provider/model misconfiguration hints when transport errors match known patterns (quota, rate limit, auth) — with open model choice, a misconfigured base URL or an exhausted credit balance is the single most common mid-build failure.

---

## 12) Provider-Agnostic Integration Pattern

Inject a generator with this conceptual signature:

```ts
type Generator = (
  prompt: string,
  attachments: Attachment[],
  systemPrompt?: string,
  onStream?: (delta: string) => void,   // callback, not a renderer
  abortSignal?: AbortSignal,
  extras?: unknown
) => Promise<{ text: string; metadata?: unknown }>;
```

Routing: choose provider/model upstream → route long-form modes to the Markovian orchestrator → route short tasks to single-shot generation. One Markovian runtime sits behind any OpenAI-compatible endpoint, local model, or gateway — point the generator at whichever provider your team chose and nothing else changes.

Model choice is open at this hackathon, and a common pattern is a cheap model for chunk generation with a stronger one for compression and reflection. That is a two-line change at this seam.

---

## 13) Open Agent Hackathon Application Notes

- **Efficiency as a scoreable artifact:** persist run history and the projected-vs-actual report into `logs/`. "We cut cumulative reasoning tokens by roughly N% on long tasks, measured this way" is concrete, evidenced engineering depth and lands directly on the Technical score.
- **Cost and rate-limit safety:** the compression cascade, chunk caps and abort handling keep one long run from draining your own API budget or tripping a rate limit at the worst moment. Cap `maxChunks` before you leave a run going overnight.
- **Multi-agent fit:** wrap the orchestrator as a tool or sub-agent ("LongReasoner") that other agents call for deep tasks; attribute runs via `agentId`/`runId` so the traces show which agent ran which chain.
- **Track fit:** a natural match for **Autonomous Intelligence**, where the investigation is long and the evidence trail matters. Also useful in **Fragmented** when reconciliation spans many sources, and in **Real-World Industry Agents** for any task that doesn't fit in one prompt.
- **Provider-agnostic:** the injected generator means the engine runs behind whichever provider your team uses, and a mid-build provider switch costs one line.
- **Demo value:** a projected-vs-actual savings curve is one of the easiest things to show convincingly in a 2–3 minute demo.

---

## 14) Implementation Checklist

- [ ] Define config bounds/defaults; implement clamping and the projected curve as data.
- [ ] Implement the marker protocol and a content cleaner (engine-side, not UI-side).
- [ ] Build chunk manager + carryover service with the 4-tier fallback ladder.
- [ ] Implement mode-specific, data-driven prompt templates.
- [ ] Implement the orchestrator loop with callbacks, compression, completion, reflection, abort.
- [ ] Implement the progress/telemetry **event stream** with subscriptions (no rendering).
- [ ] Implement persistent history + cumulative stats; serialize to `logs/` JSONL.
- [ ] Implement `EngineReportService` returning structured projected/actual data.
- [ ] Implement memory-context reinjection contract (first-chunk injection seam).
- [ ] Add error/abort states and provider-misconfig hints.

---

## 15) Explicit Non-Goals

- No charts, panels, streaming views, layout-shift handling, or any rendering.
- No human-at-runtime assumptions — every "view" is a query/return.
- No tokenizer-exact accounting (heuristic by design); no provider lock-in.

This is a headless reasoning engine: any agent or orchestrator can mount it as a service, drive it via an injected generator, and consume its progress, reports, and history entirely through callbacks and structured data.

---

## Addendum: About Meterless

This document is a **tailored agent version of an original primitive** from Meterless, provided for Open Agent Hackathon participants. Meterless is the cognition layer partner for the hackathon. The source primitives, deeper references, and reference implementations live at **[https://meterless.ai](https://meterless.ai)**.

If you find these engines useful in your build, please **visit the site for more, check out the Meterless GitHub projects, and give them a star**. These were provided to give you an advantage in development — if they help you, return the favor.