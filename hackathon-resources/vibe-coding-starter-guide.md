# Vibe Coding Starter Guide

**OPEN AGENT HACKATHON 2026 | Build an agent that does real work**

This guide helps beginner and intermediate builders use **Cursor** and AI coding to move from idea to a working agent quickly, without producing fake demos, hardcoded outputs or non-compliant submissions.

Use this guide if you want to:

- Scaffold a working agent system fast in Cursor
- Wire in Zetaris and Meterless from the start
- Generate logs that show your agents doing real work
- Use AI coding safely and productively
- Avoid the mistakes that make a good project unscoreable

The Build Day workshop covers this workflow live, and the recording is on HackOS.

> Where this guide and the Official Rules on the event page disagree, the Official Rules apply.

---

## 1. What Vibe Coding Means Here

Vibe coding means using AI as a fast pair-programmer: you describe what you want, the AI drafts the code, then you inspect, test, correct and harden the result.

For this hackathon, vibe coding is allowed and encouraged, and generated code is expected. Your final submission must still be a real working system that you can explain.

### Allowed

Use AI coding to help with project scaffolding, agent orchestration, prompt design, debugging, test generation, README and slide deck drafts, Dockerfiles, log formatting and refactoring.

### Not allowed

You must not submit:

- Hardcoded outputs
- Fake agent responses that do not call a real model or real logic
- A single prompt wrapped as several "agents"
- A linear A → B → C pipeline with no feedback loop
- Mocked Zetaris or Meterless integrations presented as real
- API keys committed to GitHub
- Manual setup steps that judges cannot reproduce

> **Required in every submission:** Zetaris and Meterless integrated, and the project developed in Cursor. NVIDIA wherever it contributes.

---

## 2. The Build Loop

Use this loop throughout the build window:

```text
Describe → Generate → Inspect → Run → Log → Test → Refine → Document
```

Do not accept generated code blindly. AI coding produces code that often looks correct but fails under evaluation.

1. **Describe the exact requirement:** your track, agents and roles, the entry point, the Zetaris and Meterless integration, logging, and the submission structure.
2. **Generate the smallest working version.** Do not ask for the entire final app at once. Start with an entry point and two or three agents.
3. **Run it immediately.** Test locally before adding features.
4. **Inspect the logs.** Confirm agents actually interact, with critique, retries or refinement.
5. **Add one feature at a time:** data loading, memory, retrieval, tool calls, then a UI if needed.
6. **Document as you go:** README, agent descriptions, input and output examples, limitations.

---

## 3. Set Up Cursor

Cursor is the required development environment.

1. Download Cursor from cursor.com, install it and sign in.
2. Activate your Cursor credit using the instructions in the Space XAI and Cursor folder in Resources on HackOS.
3. Create an empty project folder and open it in Cursor.
4. Open the Agent chat and pick a model from the model menu. Composer suits fast everyday coding; Grok suits harder, longer tasks. Both run on your Cursor credit.
5. Ask the Agent to create and run a Python file that prints "hello". This confirms it can edit files and use your terminal.

### Keep building and running separate

Your project uses AI in two different ways:

| | AI that helps you build | AI that powers your product |
|---|---|---|
| **What it does** | Writes, fixes and explains your code | Reasons and makes decisions inside your app |
| **Where it runs** | Cursor's own models | Your model provider, called from your code |
| **Used when** | Any time you're coding | Only when your product runs |

Keep your model provider's key out of Cursor's settings, so that key is only ever used by your product, never for writing code.

---

## 4. The Shape of Your App

There is no mandated structure. This one is easy for judges to navigate:

```text
/project-root
│── app/
│   │── agents.py           # Agent roles and the collaboration loop
│   │── llm.py              # Your model provider client
│   │── adapters/
│   │   │── zetaris.py      # Zetaris integration
│   │   │── meterless.py    # Meterless integration
│   │── tracing.py          # Trace logging
│── data/                   # Small samples or download scripts
│── scripts/                # Helper scripts
│── run.py                  # Entry point
│── requirements.txt
│── Dockerfile              # Recommended
│── input_examples/         # At least 3 sample inputs
│── output_examples/        # At least 3 real outputs
│── logs/                   # Agent traces
│── .env.example            # Placeholders only
│── README.md               # Setup, usage, dependencies, limitations
```

A programmatic entry point, such as a `POST /run` endpoint or a `run.py` that takes an input file, lets a judge run your agent without clicking through a UI.

---

## 5. Environment Setup

Create a local `.env` file. Do **not** commit it.

```bash
# Model provider for your product
MODEL_API_KEY=your-model-api-key
MODEL_BASE_URL=https://api.your-provider.example/v1
MODEL_NAME=your-model

# Sponsor services
ZETARIS_REST_URL=http://localhost:8888/api/v1.0
ZETARIS_ORG_ID=1
ZETARIS_API_KEY=your-zetaris-api-key
METERLESS_API_KEY=your-meterless-key

# Runtime
SAMPLE_MODE=false
```

Commit only a `.env.example` with the same names and placeholder values, and add `.env` to `.gitignore`.

Setup steps for each sponsor service are in its folder in Resources on HackOS. If a connection fails, ask in that sponsor's Help channel.

---

## 6. Start With a Simple, Strong Architecture

Beginner and intermediate teams should avoid overbuilding. A strong simple architecture beats a complex broken one.

```text
Planner ↔ Executor ↔ Evaluator
       ↘ Retry / Refine ↗
```

| Agent | Responsibility |
|---|---|
| **Planner** | Understands the request, breaks down the task, decides which data and tools are needed |
| **Executor** | Retrieves data through Zetaris, performs the analysis, produces a draft |
| **Evaluator** | Reviews the draft, checks quality and evidence, requests revisions |

This shows real collaboration: the planner delegates, the executor acts, the evaluator critiques, and the work is revised based on feedback. It is much stronger than:

```text
Agent A → Agent B → Agent C → Final Answer
```

### Fitting the pattern to your track

| Track | Example roles |
|---|---|
| **Solving Fragmented Intelligence** | Source Mapper, Reconciler, Conflict Critic, Reporter |
| **The Agent That Can Explain Why** | Research Planner, Retriever, Evidence Summarizer, Insight Critic |
| **Reasoning Architecture** | Intake, Rules Checker, Memory Keeper, Priority Critic, Decision Agent |
| **Wildcard [Tinkerer]** | Your existing project, plus a new capability built on Zetaris and Meterless |

---

## 7. Scaffold Your App in Cursor

### Step 1: Open an empty folder

```bash
mkdir open-agent-hack
cd open-agent-hack
cursor .
```

### Step 2: Use this prompt in the Agent chat

```text
You are helping me build an Open Agent Hackathon 2026 submission.

Create a Python 3.11 agent app with:

- This structure: app/ (agents.py, llm.py, tracing.py, adapters/zetaris.py,
  adapters/meterless.py), data/, scripts/, logs/, input_examples/,
  output_examples/, run.py, requirements.txt, Dockerfile, .env.example, README.md
- run.py starts a FastAPI server exposing POST /run on port 8000
- llm.py uses the openai package with MODEL_BASE_URL, MODEL_API_KEY and
  MODEL_NAME read from the environment
- adapters/zetaris.py sends one SQL statement to Zetaris with a POST to
  ZETARIS_REST_URL + /sql-editor/sqls/run, using ZETARIS_API_KEY as a bearer
  token plus an X-Org-ID header and a fresh UUID X-Request-ID header,
  and returns the rows
- adapters/meterless.py wraps the Meterless integration behind one function,
  reading its key from the environment
- Three agents: PlannerAgent, ExecutorAgent, EvaluatorAgent
- ExecutorAgent retrieves data through the Zetaris adapter
- At least one feedback loop: Planner plans, Executor drafts,
  Evaluator critiques, Executor revises if issues are found
- JSONL trace logs written to logs/ and printed to stdout
- Timeouts, retry handling and structured error responses
- SAMPLE_MODE=true loads sample input data only, never prewritten final outputs
- Three input examples
- A README with setup, usage, dependencies, agent roles and limitations

Do not hardcode outputs. Keep all secrets in environment variables.
Generate minimal, readable code.
```

Adjust the Meterless part to match the integration steps in the Meterless folder in Resources on HackOS, or attach a Meterless prompt file with `@` if you're using the library.

### Step 3: Review what Cursor generates

- Does `run.py` actually start the app?
- Is the entry point implemented?
- Are model calls real, reading `MODEL_BASE_URL` from the environment?
- Does the Zetaris adapter really call Zetaris?
- Is the Meterless integration real, not a stub?
- Are outputs generated from the input?
- Are logs written to `logs/`?
- Is there a feedback loop?

### Step 4: Run the app

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python run.py
```

In another terminal:

```bash
curl -X POST http://localhost:8000/run \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "test-001",
    "user_query": "Reconcile supplier records across our sources and flag any conflicts."
  }'
```

---

## 8. Other AI Coding Tools

Cursor is the required development environment. Other assistants, such as terminal-based coding agents or IDE autocomplete, may be used alongside it for help with coding. They are development aids only; your submitted product calls whatever model provider you configured, and its key lives in your environment variables.

Clear comments and function signatures get better results from any assistant:

**Good:**

```python
# Implement a PlannerAgent that:
# - receives a user query and optional context
# - asks the model to produce a JSON plan
# - returns a dict with objective, subtasks, required_data and success_criteria
# - raises a clear exception if the model call fails
# - does not return hardcoded content
```

**Poor:**

```python
# make planner
```

---

## 9. Centralise Your Service Calls

Put each external service behind one module. It makes debugging easier and lets sample mode work cleanly.

Example `app/llm.py`:

```python
import os
from openai import OpenAI


def get_client() -> OpenAI:
    api_key = os.getenv("MODEL_API_KEY")
    if not api_key:
        raise RuntimeError("MODEL_API_KEY is not set.")
    return OpenAI(
        api_key=api_key,
        base_url=os.getenv("MODEL_BASE_URL"),
        timeout=60.0,
        max_retries=1,
    )


def chat(messages: list[dict], temperature: float = 0.2) -> str:
    client = get_client()
    response = client.chat.completions.create(
        model=os.environ["MODEL_NAME"],
        messages=messages,
        temperature=temperature,
    )
    return response.choices[0].message.content
```

Example `app/adapters/zetaris.py`:

```python
import os
import uuid
import requests


def run_sql(sql: str, limit: int = 100) -> list:
    response = requests.post(
        os.environ["ZETARIS_REST_URL"].rstrip("/") + "/sql-editor/sqls/run",
        headers={
            "Authorization": "Bearer " + os.environ["ZETARIS_API_KEY"],
            "X-Org-ID": os.environ["ZETARIS_ORG_ID"],
            "X-Request-ID": str(uuid.uuid4()),
        },
        json={"queryId": str(uuid.uuid4()), "sql": sql, "source": "SqlEditor", "limit": limit},
        timeout=60,
    )
    response.raise_for_status()
    return response.json().get("data", [])
```

Check the Zetaris folder in Resources on HackOS for the current setup steps and the full API reference.

---

## 10. Request and Response Contract

A simple JSON contract makes your project easy to test.

### Request

```json
{
  "request_id": "example-001",
  "user_query": "Which suppliers have conflicting delivery records across our systems?",
  "context": {
    "track": "Solving Fragmented Intelligence"
  }
}
```

### Response

```json
{
  "request_id": "example-001",
  "trace_id": "trace-20261024-001",
  "status": "success",
  "agents_used": ["PlannerAgent", "ExecutorAgent", "EvaluatorAgent"],
  "result": {
    "summary": "Three suppliers have conflicting delivery dates across two sources...",
    "findings": [
      {
        "supplier": "Supplier C",
        "conflict": "Delivery date differs between ERP export and ticket system",
        "sources": ["erp_export", "ticket_system"]
      }
    ],
    "confidence": 0.82
  },
  "collaboration": {
    "feedback_loop_completed": true,
    "revision_count": 1,
    "evaluator_findings": ["Initial draft did not cite the source of each fact"]
  },
  "log_path": "logs/trace-20261024-001.jsonl"
}
```

---

## 11. What Your Logs Must Show

Logs are how judges verify your agents did real work.

### Recommended fields

```json
{
  "timestamp": "2026-10-24T10:30:00Z",
  "trace_id": "trace-abc123",
  "agent_name": "ExecutorAgent",
  "action": "query_zetaris",
  "input_summary": "Planner requested supplier delivery records",
  "output_summary": "Retrieved 24 records from two sources through Zetaris",
  "target_agent": "EvaluatorAgent",
  "confidence": 0.87,
  "retry_count": 0,
  "status": "success"
}
```

### Strong pattern

```text
PlannerAgent → ExecutorAgent: create retrieval plan
ExecutorAgent → Zetaris: query two sources
ExecutorAgent → EvaluatorAgent: submit draft reconciliation
EvaluatorAgent → ExecutorAgent: critique missing source attribution
ExecutorAgent → EvaluatorAgent: submit revised reconciliation
EvaluatorAgent → PlannerAgent: approve final
PlannerAgent → User: final response
```

### Weak pattern

```text
Agent1 ran
Agent2 ran
Agent3 ran
Done
```

The weak pattern proves nothing.

---

## 12. Avoid Fake Functionality

### Not acceptable

```python
if user_query == "Find supplier conflicts":
    return {"summary": "Supplier C has a conflict."}
```

```python
return open("output_examples/example_1.json").read()
```

```python
def run_sql(sql):
    return [["Supplier C", "2026-10-20"]]   # pretends to call Zetaris
```

### Acceptable

Sample mode may load sample **input data**:

```python
if os.getenv("SAMPLE_MODE") == "true":
    records = load_sample_records()
else:
    records = run_sql("SELECT supplier, delivery_date FROM erp.deliveries")
```

Sample mode must not load prewritten **final answers**, fake agent interaction, or pretend a sponsor service was called.

---

## 13. Hardcoded Output Self-Check

### Search for suspicious returns

```bash
grep -R "return {" app/ run.py
grep -R "output_examples" app/ run.py
```

These are not automatically wrong, but inspect each one.

### Test different inputs

Run your app with two unrelated queries. If the outputs are almost identical, your app is too generic or hardcoded.

### Ask Cursor to audit

```text
Audit this codebase for hardcoded outputs or fake functionality.

Look for:
- final answers stored in code
- sample outputs returned at runtime
- functions that pretend to call a model, Zetaris or Meterless
- agents that ignore their input
- if/else branches matching known test prompts
- logs not tied to actual agent execution

Return a table with file, line, risk and fix.
```

---

## 14. Prompting Well

### Bad prompt

```text
Build a hackathon-winning agent app.
```

Too broad. It encourages fake complexity.

### Better prompt

```text
We are building for the track "The Agent That Can Explain Why".

Goal: answer one bounded market question with a cited recommendation.

Architecture:
- ResearchPlanner: breaks the question into sub-questions
- Retriever: pulls evidence through Zetaris and cached public sources
- EvidenceSummarizer: connects findings across sources
- InsightCritic: checks every claim is supported, requests revision if not
- ReportWriter: produces the cited recommendation

Constraints:
- Zetaris and Meterless integrated through app/adapters/
- Model calls through MODEL_BASE_URL and MODEL_API_KEY
- JSONL logs with agent-to-agent events
- No hardcoded final outputs
- SAMPLE_MODE loads cached sources but never returns prewritten answers
- Timeouts and structured errors on every external call

Generate the smallest working implementation first.
```

---

## 15. Debugging With AI

Give the tool context, not "it doesn't work."

```text
I am building an Open Agent Hackathon app.

Expected:
- python run.py starts the server
- POST /run calls the model and queries Zetaris
- logs are written to logs/

Actual error:
[paste full traceback]

Relevant files:
[paste the file where it fails]

Environment:
- Python 3.11
- MODEL_BASE_URL and ZETARIS_REST_URL are set
- OS: macOS / Linux / Windows

Please:
1. Identify the root cause
2. Give the minimal code change
3. Explain how to test the fix
4. Do not remove the Zetaris or Meterless integration
5. Do not replace a real call with a hardcoded response
```

If the problem is with a sponsor service, ask in that sponsor's Help channel on HackOS. For anything else, use the #help desk channel or mentor office hours.

---

## 16. Real Agent Collaboration

AI coding tools often create agents that are just separate functions. You need collaboration.

### Weak

```python
plan = planner.run(query)
draft = executor.run(plan)
final = evaluator.run(draft)
return final
```

### Better

```python
plan = planner.run(query)
draft = executor.run(plan)

critique = evaluator.review(query=query, plan=plan, draft=draft)

if critique["requires_revision"]:
    revised = executor.revise(plan=plan, draft=draft, critique=critique)
    final_review = evaluator.review(query=query, plan=plan, draft=revised)
    final = planner.finalise(query=query, plan=plan, result=revised, evaluation=final_review)
else:
    final = planner.finalise(query=query, plan=plan, result=draft, evaluation=critique)
```

This shows evaluation, feedback, branching, revision and interdependent roles.

---

## 17. Dockerise Early

Do not leave Docker to the last day.

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN mkdir -p /app/logs

EXPOSE 8000
CMD ["python", "run.py"]
```

```bash
docker build -t oah-submission .
docker run --rm -p 8000:8000 --env-file .env oah-submission
```

Never copy `.env` or secrets into the image.

---

## 18. Documentation: Generate, Then Verify

AI drafts documentation well, but it may invent features. Never let your README or slide deck claim functionality that does not exist.

### README prompt

```text
Write a README.md for this Open Agent Hackathon submission.

Include: the track and problem, what the app does, agent roles, the
collaboration flow, how Zetaris and Meterless are integrated, how Cursor was
used, where NVIDIA contributes if used, setup, usage, dependencies, request
and response examples, the logs, sample mode, limitations and future work.

Rules:
- Do not claim features that are not implemented
- Do not include API keys
- Keep instructions copy-pasteable
```

### Audit prompt

```text
Compare README.md against the actual codebase. Flag features claimed but not
implemented, run commands that will fail, missing environment variables,
inaccurate agent descriptions, and any sponsor integration that is described
but not real. Return exact edits.
```

Use the same audit on your slide deck before you submit.

---

## 19. Input and Output Examples

Include at least three of each.

Output examples must be **real outputs** from your app, saved after a successful run, and never used as runtime responses:

```bash
curl -X POST http://localhost:8000/run \
  -H "Content-Type: application/json" \
  -d @input_examples/example_1.json \
  > output_examples/example_1.json
```

Repeat for all three.

---

## 20. Common Mistakes

| Mistake | Fix |
|---|---|
| **Building the UI first** | Build in this order: entry point → model call → Zetaris and Meterless → agents → logs → Docker → README → optional UI |
| **Accepting fake agent code** | An agent that returns `"Plan created"` is not an agent. Agents must process input and produce meaningful output |
| **Bolting on sponsor tech at the end** | Wire Zetaris and Meterless in on day one |
| **No logs** | Without traces, judges can't see your agents work |
| **Overbuilding** | Don't attempt retrieval, UI, database, streaming, async and memory all on day one |
| **Hardcoding demo answers** | Judges use their own inputs. A system that only works on your demo fails |
| **Your provider key in Cursor** | Keep it in `.env` only, so it powers your product, not your coding |

---

## 21. Reusable Prompts

### Architecture

```text
Help me design a simple agent architecture for the Open Agent Hackathon
track [TRACK NAME], solving [PROBLEM] for [USER].

Constraints:
- 2 to 5 agents with distinct roles
- Real collaboration, not a linear pipeline
- Zetaris and Meterless integrated with a real role
- Runs in minutes from a clean setup
- Logs every agent interaction
- Feasible for a small team in a 144-hour build window

Return: agents and roles, collaboration flow, where Zetaris and Meterless fit,
data sources, failure handling, what to build first, and what to avoid.
```

### Refactoring

```text
Refactor this code for clarity and compliance:
- keep model, Zetaris and Meterless calls in their own modules
- make agents testable
- improve error handling
- make logs show the collaboration
- remove any hardcoded final outputs
- keep the entry point contract unchanged
```

### Testing

```text
Create practical tests that verify:
- the entry point returns success for valid input
- different inputs produce different outputs
- logs are created and show at least three distinct agents
- at least one evaluator critique event appears
- the Zetaris adapter makes a real request in normal mode
- no API keys are present in any file
- output_examples are not loaded by runtime code
```

### Final audit

```text
Perform a final Open Agent Hackathon readiness audit. Check:
- the app starts from a clean clone with documented commands
- the entry point works
- Zetaris and Meterless are integrated, not mocked
- .env.example is present and no real keys are committed
- logs show agent collaboration
- no hardcoded outputs
- at least 3 input and 3 output examples
- README commands match the code
- sample mode works with no credentials

Return PASS or FAIL for each item, with the exact fix for each failure.
```

---

## 22. Final Local Checklist

### Repository

- [ ] Entry point exists and is documented
- [ ] `requirements.txt`, `.env.example` and `README.md` exist
- [ ] At least 3 input examples and 3 real output examples
- [ ] No real `.env` or API keys committed
- [ ] Repository is public

### Sponsor technology

- [ ] Zetaris integrated, with a real role in the build
- [ ] Meterless integrated, with a real role in the build
- [ ] Project developed in Cursor
- [ ] NVIDIA used wherever it contributes

### Agents

- [ ] At least 2 agents with distinct roles
- [ ] At least one feedback loop
- [ ] An evaluator critiques another agent's work
- [ ] Output is revised or approved based on that critique

### Logs

- [ ] Written to `logs/` and stdout
- [ ] Show agent names, actions, handoffs and statuses
- [ ] Tied to the actual request

### Anti-hardcoding

- [ ] No prewritten final answers
- [ ] `output_examples/` not loaded at runtime
- [ ] `SAMPLE_MODE` uses sample inputs only
- [ ] Different inputs produce meaningfully different outputs

### Submission

- [ ] Demo video, 1–4 minutes
- [ ] Slide deck complete
- [ ] Sponsor technology explanation written
- [ ] Pre-existing components declared

---

## 23. Six-Day Build Plan

| Day | Date | Focus |
|---|---|---|
| **Before** | By 21 October | Set up Cursor, Zetaris and Meterless; watch the workshop recordings; attend onboarding |
| **Day 1** | 22 October | Confirm track, user and output. Scaffold the app in Cursor. Connect Zetaris and Meterless. Get one real end-to-end run |
| **Day 2** | 23 October | Add the planner, executor and evaluator loop. Add JSONL logs |
| **Day 3** | 24 October | Add data, sample mode, retries and error handling. Mid-build check: what would fail if you submitted tomorrow? |
| **Day 4** | 25 October | Improve prompts and output quality. Add Docker. Run the full validation from a fresh clone |
| **Day 5** | 26 October | Generate real output examples. Write the README, sponsor explanation and slide deck. Record the demo video |
| **Day 6** | 27 October | Final audit, secrets check, declare pre-existing components, submit well before 23:45 UTC |

---

## 24. What a Strong Beginner Submission Looks Like

**Strong:**

- Solves one problem for one clear user
- Has a working entry point
- Integrates Zetaris and Meterless for real
- Uses 3–5 agents with distinct roles
- Shows evaluator feedback and revision
- Logs agent handoffs clearly
- Uses realistic input data
- Handles errors gracefully
- Has honest documentation
- Runs from a clean clone

**Weak:**

- UI-only demo
- No programmatic entry point
- Sponsor technology named but not used
- Hardcoded answers
- Agents that are just names in a prompt
- No logs
- No feedback loop
- API keys committed

---

## 25. Final Advice

Use AI coding aggressively, but stay in control.

The strongest teams will not be the ones that generate the most code. They will be the ones that scope tightly, build a working system early, wire in Zetaris and Meterless from the start, show real agent collaboration, test with unseen inputs and document honestly.

Focus on this:

```text
Working agent system + real Zetaris and Meterless integration + clear logs + reproducible submission
```

Not this:

```text
Large codebase + polished UI + fake outputs + sponsor tech bolted on
```

Build the smallest real system first. Then improve it.