# Meterless Agent Engines — How to Use

A short, practical guide to using the three headless agent engines in your multi-agent build.

- **[H-MEM Agent Engine](H-MEM_Agent_Engine.md)** — shared memory
- **[Markovian Agent Engine](MARKOVIAN_Agent_Engine.md)** — long-task reasoning
- **[World Model Agent Engine](WORLD_MODEL_Agent_Engine.md)** — shared world state

Start with the **[Index](AGENT_ENGINES_INDEX.md)** for the big picture, then come back here to build.

---

## 1. What These Are (and Are Not)

- They are **reference architectures**, not a library you `pip install`. You implement the services described, in whatever language/framework your agent uses.
- They are **headless**: no UI, no human at runtime. Every "screen" is an API call, event, or JSONL artifact.
- They are **provider-agnostic**: you pass in a generator function; the engine never hard-codes a model or endpoint.

## 2. The One Rule That Makes Them Portable

Each engine takes an **injected generator** instead of calling a model itself. Define it once, point it at whichever provider your team chose, and reuse it everywhere:

```ts
// Define once. Wire it to whatever OpenAI-compatible endpoint you are using.
const generator = async (prompt, attachments, systemPrompt, onStream, abortSignal) => {
  const res = await client.chat.completions.create({
    model: process.env.MODEL,
    messages: [
      ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
      { role: "user", content: prompt },
    ],
  });
  return { text: res.choices[0].message.content };
};
```

Model choice is open at this hackathon, so this seam matters: swapping providers mid-build — because of a rate limit, a cost surprise, or an outage on day four — is a one-line change in this function. Nothing inside the engines changes.

## 3. Pick What You Need

You do **not** have to implement all three. Use the smallest set that helps:

| You need… | Use | Minimum to implement |
|---|---|---|
| Agents to stop forgetting / contradicting each other | **H-MEM** | `MemoryStoreService` + `MemoryRetrievalService` (skip dreaming/sleep at first) |
| One long task (deep research, multi-file build) not to blow the token budget | **Markovian** | Config + chunk manager + carryover cascade + orchestrator loop |
| Many agents to reason over the same grounded entities/facts | **World Model** | `WorldStoreService` + `IngestPipelineService` + `ContextBuilderService` |

Add the advanced parts (H-MEM dreaming/sleep, Markovian reporting, World Model enrichment/control-plane) only once the basics work.

**Which track you're building for is a good guide:**

| Track | Usually starts with |
|---|---|
| **Fragmented** | World Model — reconciling disconnected sources into one grounded picture is exactly what it's for |
| **Autonomous Intelligence** | Markovian for the long investigation, World Model for the evidence and provenance |
| **Persistent Memory Agents** | H-MEM — tiered, decaying, conflict-resolved memory is the track's whole subject |
| **Real-World Industry Agents** | Whichever the operational problem actually needs; often H-MEM for state across sessions |

## 4. Minimal Integration Recipe

**Step 1 — Memory (H-MEM).** At run start, hydrate memory tiers. After each agent step, mine the result into memory. Before the next agent acts, retrieve top-N memories and inject them as a structured context block.

**Step 2 — Long tasks (Markovian).** When an agent hits a long task, hand it to the Markovian orchestrator instead of one giant prompt. Feed the H-MEM context into the **first chunk only**; the compressed carryover maintains continuity after that.

**Step 3 — Shared state (World Model).** Write observations/tool results through the canonical ingest pipeline. Other agents query the World Model's context builder instead of re-deriving entities themselves. Back the World Model's memory subsystem with H-MEM.

**Step 4 — Evidence.** Each engine emits JSONL (audit, traces, telemetry, provenance). Write it to your run's `logs/` directory so a judge can see the system reasoning end to end.

## 5. Typical Flow

```text
run starts
  └─ hydrate H-MEM (warm start)
  └─ load / open World Model

each agent step
  ├─ build context: H-MEM retrieval  +  World Model context builder
  ├─ if long task → Markovian orchestrator (context injected at chunk 0)
  ├─ act / call tools
  ├─ write results → World Model ingest  +  mine into H-MEM
  └─ emit JSONL → logs/

between runs (optional)
  ├─ H-MEM dreaming + sleep (programmable approval)
  └─ World Model enrichment jobs + supervisor-agent maintenance
```

## 6. Hackathon Checklist

- [ ] One shared `generator` function, pointed at your provider through configuration, not hardcoded.
- [ ] H-MEM retrieval injected into agent prompts, with the trace written to `logs/`.
- [ ] Long tasks routed through Markovian; projected-vs-actual savings saved to `logs/`.
- [ ] World Model ingest is idempotent and resumable (a crashed run recovers, doesn't corrupt).
- [ ] All audit/telemetry/provenance written as JSONL into `logs/` as evidence for judges.
- [ ] A sample mode that runs without live provider credentials, so a judge can see the system work.
- [ ] No UI dependency, no human-in-the-loop at runtime, no provider lock-in.
- [ ] Your README says which engines you mounted and where — Sponsor Tech is worth 10 points.

## 7. Common Mistakes

- **Implementing everything before anything works.** Ship the minimum column from §3 first. Six days is not long.
- **Calling a model inside the engine.** Always go through the injected generator.
- **Storing data no agent reads.** Rich state is only worth writing if a consumer queries it (the "stored ≠ loaded" rule).
- **Tying long jobs to an agent's turn.** Markovian runs and World Model ingest must outlive the step that started them.
- **No logs.** If it isn't in `logs/` as JSONL, a judge can't see it happened — and the Technical score depends on their being able to.
- **Unbounded loops against a paid API.** You're paying for your own calls here. Cap rounds and retries before you leave a run going overnight.

---

For the architecture detail and full service contracts, read each engine doc. For how they relate, see the **[Index](AGENT_ENGINES_INDEX.md)**.

---

## Addendum: About Meterless

These engines are **tailored agent versions of original primitives** from Meterless, provided for Open Agent Hackathon participants. Meterless is the cognition layer partner for the hackathon. The source primitives, deeper references, and reference implementations live at **[https://meterless.ai](https://meterless.ai)**.

If you find them useful in your build, please **visit the site for more, check out the Meterless GitHub projects, and give them a star**. They were provided to give you an advantage in development — if they help you, return the favor.