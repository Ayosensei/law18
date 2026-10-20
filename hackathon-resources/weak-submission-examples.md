# Weak Submission Examples

**OPEN AGENT HACKATHON 2026 | Build an agent that does real work**

This guide shows the most common weak submission patterns, why they score badly or put a submission at risk, and how to fix each one.

The hackathon is not looking for prompt wrappers, static demos or polished interfaces without working agent logic. The goal is agents that do real work:

- Agents that act, coordinate and recover
- Zetaris and Meterless integrated with a real role in the build
- Developed in Cursor, with NVIDIA wherever it contributes
- Traceable logs that show how the system reached its output
- A system that handles realistic inputs and runs from a clean setup

Use this guide before you submit on **27 October 2026, 23:45 UTC**.

> Where this guide and the Official Rules on the event page disagree, the Official Rules apply.

---

## 1. Quick Summary

| Weak Pattern | Outcome | Why |
|---|---|---|
| Zetaris or Meterless missing | Fails a requirement | Both are required in every submission |
| Sponsor technology bolted on | Low Sponsor Tech score | Named in the README, no real role in the build |
| Linear `A → B → C` pipeline | Low Technical and Innovation scores | No real collaboration between agents |
| Agents that are prompt wrappers | Low Technical and Innovation scores | One workflow with several labels |
| Single agent presented as many | Low Technical score, integrity question | Misrepresents the system |
| Hardcoded outputs | Disqualification risk | No real agent logic |
| Missing or unusable logs | Low Technical score | Judges cannot verify the agent did the work |
| Repository not public | Cannot be judged properly | Judges cannot open it |
| Broken setup or manual steps | Low Technical score | Judges cannot run it |
| UI only, no programmatic path | Low Technical score | Hard to evaluate beyond the interface |
| API keys committed | Disqualification risk | Security violation |
| Missing slide deck or over-length demo | Incomplete submission, low Demo score | Required components missing or out of spec |
| Undeclared pre-existing work | Disqualification risk | Work before the build window must be declared |
| No clear track fit | Low Impact score | Judges cannot assess it against the challenge |

---

## 2. What Judges Are Looking For

| Criterion | Points |
|---|---:|
| Impact | 30 |
| Technical | 20 |
| Innovation | 15 |
| Demo | 15 |
| Product & UX | 10 |
| Sponsor Tech | 10 |
| **Total** | **100** |

Judges look for evidence that agents:

- Have distinct roles
- Exchange information
- Delegate tasks dynamically
- Critique, validate or revise each other's work
- Use shared state, memory or structured context
- Retry or escalate when something fails
- Produce logs that prove the interaction happened

A strong pattern:

```text
Planner → Researcher
Researcher → Planner
Planner → Executor
Executor → Evaluator
Evaluator → Executor
Executor → Risk Agent
Risk Agent → Planner
Planner → Final Response
```

A weak pattern:

```text
Agent A → Agent B → Agent C → Final Response
```

The second has three "agents" in name, but it is only a pipeline.

---

## 3. Weak Example 1: Zetaris or Meterless Missing

### The pattern

The team builds a working agent but never integrates Zetaris or Meterless, or plans to "add them at the end" and runs out of time.

### Why it fails

Zetaris and Meterless are required in every submission, including Wildcard [Tinkerer]. A submission without them does not meet the requirements, however good the rest of it is.

### How to fix it

Wire both in on day one. Give each a real job:

```text
Planner decides what data is needed
Executor queries Zetaris for the internal data
Meterless handles [its role in your build]
Evaluator checks the result
```

Put each integration behind an adapter in `app/adapters/`, log every call, and explain both in your sponsor technology explanation.

---

## 4. Weak Example 2: Sponsor Technology Bolted On

### The pattern

The README says:

```text
This project uses Zetaris, Meterless and NVIDIA.
```

But the code calls Zetaris once to run `SELECT 1`, and the rest of the system ignores it.

### Why it is weak

Sponsor Tech is worth 10 points, and judges check. A sponsor named in the README but doing nothing in the code scores worse than an honest, smaller integration, because it reads as padding.

### Likely outcome

| Area | Outcome |
|---|---|
| Sponsor Tech | Near zero |
| Technical | Lowered |
| Credibility | Damaged across every criterion |

### How to fix it

Make each sponsor technology load-bearing. Ask yourself: if I removed Zetaris, would the agent still work? If yes, it isn't integrated yet.

---

## 5. Weak Example 3: Linear A → B → C Pipeline

### The pattern

```text
Planner Agent → Search Agent → Writer Agent → Final Answer
```

```python
def run_agent_system(user_query):
    plan = planner_agent(user_query)
    search_results = search_agent(plan)
    report = writer_agent(search_results)
    return report
```

Logs:

```json
{"agent_name": "Planner", "action": "created plan", "status": "success"}
{"agent_name": "SearchAgent", "action": "searched documents", "status": "success"}
{"agent_name": "WriterAgent", "action": "wrote final report", "status": "success"}
```

### Why it is weak

This is task chaining, not collaboration. There is no feedback loop, no critique, no dynamic delegation, no retry, and no evidence that one agent changed its behaviour because of another's output.

### Likely outcome

| Area | Outcome |
|---|---|
| Technical | Low to medium, if it works |
| Innovation | Low |
| Impact | Depends on the problem, but limited by the design |

### How to fix it

```python
def run_agent_system(user_query):
    plan = planner.create_plan(user_query)

    for attempt in range(2):
        evidence = researcher.retrieve(plan)          # queries Zetaris
        evaluation = evaluator.assess_evidence(evidence, plan)
        log_interaction("Evaluator", "Planner", evaluation)

        if evaluation["sufficient"]:
            break

        plan = planner.revise_plan(original_plan=plan, evaluator_feedback=evaluation)

    draft = writer.create_report(plan, evidence)
    critique = critic.review_report(draft)

    if critique["requires_revision"]:
        draft = writer.revise_report(draft, critique)

    return draft
```

Improved trace:

```json
{"timestamp":"2026-10-24T10:15:01Z","agent_name":"Planner","action":"created_initial_plan","input_summary":"User asked which suppliers have conflicting delivery records","output_summary":"Plan with 3 retrieval tasks","target_agent":"Researcher","confidence":0.82,"retry_count":0,"status":"success"}
{"timestamp":"2026-10-24T10:15:09Z","agent_name":"Researcher","action":"queried_zetaris","input_summary":"Delivery records from ERP export and ticket system","output_summary":"24 records, 2 sources missing dates","target_agent":"Evaluator","confidence":0.64,"retry_count":0,"status":"partial"}
{"timestamp":"2026-10-24T10:15:15Z","agent_name":"Evaluator","action":"requested_plan_revision","input_summary":"Missing dates weaken the conflict claim","output_summary":"Asked Planner to add the shipping log as a third source","target_agent":"Planner","confidence":0.71,"retry_count":0,"status":"needs_revision"}
{"timestamp":"2026-10-24T10:15:22Z","agent_name":"Planner","action":"revised_plan","input_summary":"Evaluator requested a third source","output_summary":"Added shipping log retrieval branch","target_agent":"Researcher","confidence":0.88,"retry_count":1,"status":"success"}
```

---

## 6. Weak Example 4: Agents Are Just Prompt Wrappers

### The pattern

```python
class RiskAgent:
    def run(self, text):
        return call_llm(f"Find risks in this text: {text}")

class SummaryAgent:
    def run(self, text):
        return call_llm(f"Summarise this text: {text}")

class RecommendationAgent:
    def run(self, text):
        return call_llm(f"Recommend actions: {text}")
```

The agents never interact.

### Why it is weak

Naming a class "Agent" does not make it one. There is no decision authority, tool use, state, memory or communication between agents.

### How to fix it

Give each agent a real responsibility, and make its output change what another agent does:

```python
clauses = clause_extractor.extract(document)
risk_scores = risk_analyzer.score(clauses)

compliance_findings = compliance_checker.validate(clauses=clauses, risk_scores=risk_scores)

if compliance_findings.has_conflicts:
    risk_scores = risk_analyzer.revise_scores(
        original_scores=risk_scores,
        compliance_feedback=compliance_findings
    )

recommendations = recommender.generate(
    clauses=clauses,
    risk_scores=risk_scores,
    compliance_findings=compliance_findings
)
```

---

## 7. Weak Example 5: Single Agent Presented as Many

### The pattern

The README says "our system has five agents," but the code has one model call:

```python
response = client.chat.completions.create(
    model=os.environ["MODEL_NAME"],
    messages=[
        {"role": "system", "content": "You are a planner, researcher, critic, evaluator and writer."},
        {"role": "user", "content": user_query}
    ]
)
```

### Why it is weak

One prompt telling a model to "act as several agents" is not an agent system. It also misrepresents what was built, which judges treat as an integrity issue.

### How to fix it

Use distinct agents or role modules, each with its own responsibilities and traceable actions, and make the control flow branch on their outputs.

---

## 8. Weak Example 6: Hardcoded Outputs

### The pattern

```python
def run(input_data):
    if "supplier" in input_data["query"].lower():
        return {"summary": "Supplier C has a conflict.", "recommendation": "Review Supplier C."}
    return {"summary": "Analysis complete.", "recommendation": "Take action."}
```

Or:

```python
with open("output_examples/example_1.json") as f:
    return json.load(f)
```

### Why it puts you at risk

Hardcoded outputs presented as agent results are prohibited. Judges test with their own inputs, and a system that only works on your three samples fails immediately.

### Red flags

```python
if input_id == "example_1":
    return example_1_output
```

```python
# TODO: replace with real agent later
return precomputed_response
```

```python
def run_sql(sql):
    return [["Supplier C", "2026-10-20"]]   # pretends to call Zetaris
```

### How to fix it

Process any valid input through real logic. Sample mode may load sample **input data**, never prewritten final answers:

```python
SAMPLE_MODE = os.getenv("SAMPLE_MODE", "false").lower() == "true"

def get_records():
    if SAMPLE_MODE:
        return load_sample_records()
    return zetaris.run_sql("SELECT supplier, delivery_date FROM erp.deliveries")
```

---

## 9. Weak Example 7: Missing or Unusable Logs

### The pattern

No `logs/` directory, nothing printed to stdout, or only:

```text
Starting app...
Calling agents...
Done.
```

### Why it is weak

Logs are how judges verify your agent did the work. Without them, collaboration, retries and sponsor technology use cannot be checked, and the Technical score suffers.

### What logs should show

Which agent acted, what it did, what it received and produced, which agent got the result, any calls to Zetaris or Meterless, and whether each step succeeded, failed, retried or escalated.

### Stronger example

```json
{"timestamp":"2026-10-25T14:02:01Z","agent_name":"Planner","action":"decompose_task","input_summary":"Explain why Q3 churn rose","output_summary":"4 sub-questions: billing, support, onboarding, pricing","target_agent":"Retriever","confidence":0.86,"retry_count":0,"status":"success"}
{"timestamp":"2026-10-25T14:02:07Z","agent_name":"Retriever","action":"queried_zetaris","input_summary":"Billing and support tables for Q3","output_summary":"Retrieved 340 records across 2 sources","target_agent":"EvidenceSummarizer","confidence":0.79,"retry_count":0,"status":"success"}
{"timestamp":"2026-10-25T14:02:14Z","agent_name":"InsightCritic","action":"flag_unsupported_claim","input_summary":"Draft claims pricing caused churn","output_summary":"No pricing evidence retrieved; requested another pass","target_agent":"Retriever","confidence":0.58,"retry_count":0,"status":"needs_revision"}
```

Write traces to `logs/` and print key events to stdout.

---

## 10. Weak Example 8: Repository Not Public

### The pattern

The GitHub link in the submission returns a 404 for anyone outside the team.

### Why it is weak

The repository must be public so judges can open it without requesting access. A repository judges cannot open cannot be judged properly.

### How to fix it

Make the repository public before you submit, then test the link in a private browser window while logged out.

---

## 11. Weak Example 9: Broken Setup or Manual Steps

### The pattern

The README says:

```text
1. Download the dataset manually from this link.
2. Edit config.py and paste your API key.
3. Run setup_notebook.ipynb.
4. Start the vector database manually.
5. Then run python app.py.
```

Or the build fails:

```text
ModuleNotFoundError: No module named 'app.agents'
```

### Why it is weak

A judge who cannot run your project can only score your video. Technical and Demo both collapse.

### Common causes and fixes

| Failure | Fix |
|---|---|
| Missing dependency | Add it to `requirements.txt` |
| `pip install` during a run | Install everything at build time |
| Keys pasted into source | Environment variables and `.env.example` |
| Manual data download | Automated download script or small sample in `/data/` |
| Notebook setup steps | Move setup into scripts the entry point calls |
| Needs a local GPU | Reach any GPU compute through hosted or cloud access |
| Crashes on a missing variable | Validate environment variables and return a clear error |

### How to fix it

```bash
cp .env.example .env     # fill in locally, never commit
docker build -t oah-submission .
docker run --rm -p 8000:8000 --env-file .env oah-submission
```

Test from a fresh clone, on a machine that isn't yours.

---

## 12. Weak Example 10: UI Only, With Weak Substance

### The pattern

A polished dashboard with animations, charts and dark mode, over:

```text
Single prompt → static result → dashboard display
```

### Why it is weak

Product & UX is worth 10 points, but judges do not overvalue polish without depth. A UI cannot replace working agent logic, sponsor integration, logs or reproducibility.

### How to fix it

Treat the UI as a thin layer over a real agent system, with a programmatic entry point judges can call directly:

```text
UI
  ↓
Entry point (e.g. POST /run)
  ↓
Agent orchestration
  ↓
Zetaris, Meterless and model calls
  ↓
Trace logs
  ↓
Structured output
```

---

## 13. Weak Example 11: No Failure Handling

### The pattern

```python
data = requests.get(url).json()
response = client.chat.completions.create(...)
return response.choices[0].message.content
```

No timeout, no retry, no fallback.

### Why it is weak

One hanging call can fail the whole run during judging, and rate limits and outages happen.

### Better pattern

```python
import requests
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(stop=stop_after_attempt(3), wait=wait_exponential(min=1, max=8))
def fetch_public_data(url):
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return response.json()

def safe_fetch(url):
    try:
        return fetch_public_data(url)
    except Exception as error:
        log_event(agent_name="DataAgent", action="fallback_to_sample_data",
                  output_summary=str(error), target_agent="Planner", status="fallback")
        return load_sample_data()
```

---

## 14. Weak Example 12: Committed Secrets

### The pattern

```python
MODEL_API_KEY = "sk-..."
```

Or a real `.env` committed to the repository.

### Why it puts you at risk

Committed credentials are a security violation and a disqualification risk. They are also a real risk to you.

### How to fix it

Ship `.env.example` with placeholders only, and keep these out of the repository:

```gitignore
.env
.env.*
!.env.example
*.pem
*.key
credentials.json
secrets.toml
```

If you commit a key by accident:

1. Rotate or revoke it immediately
2. Remove it from the repository history
3. Confirm the final repository is clean

---

## 15. Weak Example 13: Missing Slide Deck or Weak Demo

### The pattern

The demo video runs over 4 minutes, shows only slides, or never shows a real run. Or there is no slide deck at all.

### Why it is weak

The demo video (1–4 minutes) and the slide deck are required components. Demo is worth 15 points, and a vague demo also makes Impact and Technical harder to judge.

### Better demo structure

1. **Problem** — the user, the track and why it matters
2. **Architecture** — agent roles and the collaboration loop
3. **Live run** — the agent working on a real input
4. **Sponsor technology** — how Zetaris and Meterless are integrated
5. **Trace** — the logs showing the back-and-forth
6. **Output** — the result and why it is useful

### Slide deck must cover

The problem and target users, the solution, the agent workflow or architecture, the technical stack, how Zetaris and Meterless were used, what was unique about your use of the sponsor technologies, product visuals, and future enhancements.

---

## 16. Weak Example 14: Undeclared Pre-Existing Work

### The pattern

A team enters Wildcard [Tinkerer] with an existing project, adds a small feature, and presents the whole thing as hackathon work. Or a team in a main track brings code written last month without saying so.

### Why it puts you at risk

Work committed before the build window opens is not eligible unless it is declared in the submission form. Wildcard [Tinkerer] is scored only on the new work, so judges need to see clearly what was built during the hackathon.

### How to fix it

Declare every pre-existing component in the submission form. For Wildcard [Tinkerer], record the state of the project before 22 October and show the before and after in your demo and slide deck.

---

## 17. Weak Example 15: No Clear Track Fit

### The pattern

The submission claims to be "an AI productivity assistant" and never connects to the selected track.

### Why it is weak

Impact is worth 30 points and is judged on consistency with the challenge statements. If judges can't see how your build answers the track, they can't score it well.

### How to fix it

Name the track and the problem everywhere: README, slide deck, demo and examples.

```markdown
## Track

Solving Fragmented Intelligence

We built an agent system that helps operations leads answer supplier questions by
querying three disconnected sources through Zetaris, reconciling conflicting records,
and producing one sourced answer.
```

---

## 18. Weak Example 16: Too Much Data, Too Slow

### The pattern

```python
download_full_dataset("large_public_archive.zip")
build_embeddings_for_everything()
run_full_batch_analysis()
```

### Why it is weak

Heavy downloads and long preprocessing make your system slow and fragile during judging.

### How to fix it

- Include a small representative sample in `/data/`
- Provide download scripts for optional full data
- Use lightweight API queries
- Cache small preprocessed samples
- Add a `SAMPLE_MODE=true` fallback
- Limit processing to the submitted input

---

## 19. Side-by-Side

| Category | Weak | Strong |
|---|---|---|
| Sponsor tech | Named, not used | Zetaris and Meterless load-bearing from day one |
| Agent flow | `A → B → C` only | Planner ↔ Executor ↔ Evaluator loop |
| Logs | "Agent complete" | Structured traces with agent-to-agent events |
| Outputs | Pre-written | Generated from input and agent reasoning |
| Repository | Private or broken | Public, runs from a clean clone |
| Setup | Manual steps | Automated, with sample mode |
| Secrets | Key committed | `.env.example` only |
| Demo | Slides only, over time | 1–4 minutes, live run, logs, output |
| Pre-existing work | Undeclared | Declared, with a clear before and after |
| README | Vague, overclaims | Clear setup, usage, dependencies, limitations |

---

## 20. Pre-Submission Self-Test

### A. Sponsor technology

- [ ] Zetaris integrated, with a real role
- [ ] Meterless integrated, with a real role
- [ ] Developed in Cursor
- [ ] NVIDIA used wherever it contributes

### B. Run test

```bash
git clone <your-repo-url> final-check
cd final-check
cp .env.example .env
python run.py
```

```bash
curl -X POST http://localhost:8000/run \
  -H "Content-Type: application/json" \
  -d @input_examples/example_1.json
```

### C. Log test

After a run, confirm `logs/` contains several agent events showing interaction, not just completion messages.

### D. Hardcoding test

> If a judge submits a new valid input that is not in my examples, will my system still produce a real answer?

If no, fix it.

### E. Collaboration test

> Does at least one agent critique, validate, revise, delegate, retry or escalate based on another agent's output?

If no, your system is a pipeline.

---

## 21. Red-Flag Checklist

Do not submit if any of these are true:

- [ ] Zetaris or Meterless is missing, or only mentioned in the README
- [ ] My agents run once in a straight line with no feedback loop
- [ ] My logs do not show agent-to-agent interaction
- [ ] My output is hardcoded for sample inputs
- [ ] My repository is private
- [ ] My setup needs manual steps or fails from a clean clone
- [ ] I committed an API key or secret
- [ ] My demo video is over 4 minutes or does not show a real run
- [ ] I have no slide deck
- [ ] I have not declared pre-existing work
- [ ] My README does not explain setup, usage and dependencies
- [ ] My track and problem are unclear

If any box is checked, fix it before the deadline.

---

## 22. The Minimum Bar

At minimum, your submission must have:

- A working agent system that runs from a clean setup
- Zetaris and Meterless integrated, developed in Cursor
- At least two clearly defined agents that genuinely interact
- Logs showing how the system reached its output
- A public GitHub repository with a README covering setup, usage and dependencies
- A demo video of 1–4 minutes
- A slide deck
- A sponsor technology explanation
- Pre-existing components declared
- No committed secrets
- No hardcoded outputs
- Submission on HackOS before **27 October 2026, 23:45 UTC**

A submission that looks good but misses the execution, logging, sponsor technology or collaboration requirements will not be competitive.