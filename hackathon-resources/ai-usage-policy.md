# AI Usage Policy

**OPEN AGENT HACKATHON 2026 | Build an agent that does real work**

This policy covers how you may use AI tools during the hackathon and what your submitted project must be honest about.

The short version: build with AI as heavily as you like, then submit something real. Everything below follows from that.

> Where this policy and the Official Rules on the event page disagree, the Official Rules apply.

---

## 1. Policy Summary

**Allowed, and encouraged:**

- Any model provider, including closed-source models, paid APIs and sponsor credits
- Any agent framework
- AI-assisted coding, vibe coding, debugging, testing and documentation
- Generated code, which is allowed and expected

**Required:**

- Zetaris and Meterless integrated in every submission
- Cursor (with Space XAI) as your development environment
- NVIDIA technology wherever it contributes

**Not allowed:**

- Hardcoded outputs presented as agent results
- Fabricated logs or traces
- Plagiarised code, content, data or another team's work
- Undeclared pre-existing work
- Committed API keys or secrets
- A README or slide deck that claims more than the system does
- A single agent or a fixed chain presented as something it is not

---

## 2. Model and Framework Choice Is Open

There is no mandated model provider. Use what fits the problem.

| You may use | Examples |
|---|---|
| **Closed-source models** | Any commercial model API |
| **Open-weight models** | Hosted, or run locally |
| **Paid APIs** | Any, at your own cost, or through sponsor credits |
| **Any agent framework** | LangGraph, CrewAI, AutoGen, the OpenAI Agent SDK, LangChain, LlamaIndex, a custom stack |

The framework itself is not scored. Agent behaviour, technical implementation, product quality, sponsor technology use and impact are.

### Sponsor technology

| Sponsor | Requirement |
|---|---|
| **Zetaris** | Required: every submission must integrate Zetaris |
| **Meterless** | Required: every submission must integrate Meterless |
| **Cursor (with Space XAI)** | Required: use Cursor as your development environment |
| **NVIDIA** | Integrate wherever it contributes to your project, workflow or use case |

**Sponsor Tech is worth 10 points.** Design Zetaris and Meterless into your architecture from the start rather than bolting them on at the end.

---

## 3. What Is Allowed

### 3.1 AI inside your agent

Use AI models for whatever your solution needs: reasoning, planning, task decomposition, summarisation, classification, retrieval-augmented generation, embeddings, transcription, report generation, evaluation and critique agents, planner ↔ executor ↔ evaluator loops, multi-agent review and escalation.

### 3.2 AI-assisted coding

Cursor is the required development environment, and you can use its AI features as heavily as you like. Other assistants, IDE autocomplete, AI debugging and test generation may be used alongside it. Use them to scaffold the repository, generate boilerplate, design APIs, debug, refactor, write tests, create Dockerfiles and draft the README.

**You remain responsible for all submitted code.** Generated code must be reviewed, tested and understood by your team. Judges may ask how something works, and "the AI wrote it" is not an answer.

### 3.3 Vibe coding

Encouraged as a prototyping workflow, and covered in the Build Day workshop. Move from idea to working prototype as fast as you can.

It does not excuse non-compliance. The submission still needs to run from a clean setup, show how the agent worked, integrate Zetaris and Meterless, and include the required components.

### 3.4 AI-assisted documentation

Draft your README, slide deck, agent descriptions, setup instructions, demo script, comments and limitations with AI if you want.

Documentation may be AI-assisted, but it must be accurate. Do not claim capabilities your system does not have.

### 3.5 AI-assisted prompt engineering

System prompts, role prompts, evaluation prompts, critique prompts, routing prompts, retry and fallback prompts, retrieval query prompts. All fine.

### 3.6 AI-assisted testing

Test cases, synthetic inputs, edge cases, expected outputs, evaluation rubrics, failure-mode checklists. Synthetic examples are allowed, but label them where they appear in documentation or examples.

---

## 4. What Is Not Allowed

### 4.1 Hardcoded outputs

A hardcoded output is anything pre-written to look like an agent result without being produced by real execution.

**Prohibited:**

- Returning the same answer regardless of input
- Matching a known sample input and returning a pre-written output
- Storing final answers in files and presenting them as generated
- Writing logs that simulate collaboration that never happened
- Detecting a judge's input and behaving differently
- Faking model calls and returning static text
- Hardcoding an "agent debate" transcript

**Allowed:**

- Small static configuration files
- Prompt templates
- Example input and output files for documentation
- Cached sample data for reproducibility
- A documented `SAMPLE_MODE=true` for offline testing

The default mode of your submission must run real agent logic.

### 4.2 Fabricated logs

Logs are how judges verify your agent did the work. They must reflect actual execution.

Do not hand-write traces, generate a plausible-looking trace file, or edit real logs to look better than the run was. A trace that does not match the code is worse than no trace.

### 4.3 Plagiarism and pre-existing work

Do not submit another participant's work, another team's repository, code from private sources without permission, proprietary code you are not authorised to use, open-source code in breach of its licence, or documentation and diagrams copied without attribution.

Open-source libraries and public examples are fine. Comply with their licences and attribute where required.

Work committed before the build window opens is not eligible unless it is declared as a pre-existing component in the submission form.

### 4.4 Misrepresentation

Do not overclaim. Prohibited examples:

- Claiming real-time data when only static samples are used
- Claiming agents collaborate when they run in a fixed chain
- Claiming a model was fine-tuned when only a prompt was used
- Claiming Zetaris, Meterless or any other service is integrated when the output is mocked
- Claiming production readiness without disclosing limitations

Be honest about limits. An accurate limitations section reads as confidence. Judges check, and overclaiming costs more than the gap it hides.

### 4.5 Secrets

Never commit an API key, token, password or credential.

**Required:**

- Environment variables for everything sensitive
- `.env.example` with placeholders only
- `.env` in `.gitignore`
- No secrets printed in logs
- No secrets visible in screenshots, the demo video or the slide deck

If a real key ever reached a commit, rotate it rather than deleting the commit.

---

## 5. Cost and Access

You choose your providers, so you carry the cost of any paid API you use, except where a sponsor provides credits or free access for the event. Access instructions and any credits are set out in each sponsor's folder in Resources on HackOS, and questions go to that sponsor's Help channel.

Two practical consequences:

- **Judges may not have your keys.** Ship a documented sample mode so someone can see the system work without your credentials.
- **Rate limits and outages happen mid-judging.** Handle failure gracefully rather than crashing.

---

## 6. Disclosure

You do not need to log every prompt you typed into a coding assistant.

Your README should disclose:

1. Model providers and models used
2. Agent frameworks used
3. How Zetaris and Meterless are integrated, how Cursor was used, and where NVIDIA contributes
4. External tools and libraries
5. Data sources, and whether any data is sample or synthetic
6. Any open-source code or templates materially adapted
7. Known limitations
8. Fallback or sample-mode behaviour

The sponsor technology explanation in your submission covers point 3 in more detail. Pre-existing components are declared in the submission form.

Recommended section:

```markdown
## AI and Model Usage

Models:
- [provider/model] for agent reasoning and summarisation
- [provider/model] for evaluator-agent reasoning
- [provider/model] for retrieval embeddings

Sponsor technology:
- Zetaris — [what it does in this build]
- Meterless — [what it does in this build]
- Cursor — [how it was used during development]
- NVIDIA — [where it contributes, if used]

Development tools:
- Developed in Cursor. AI-assisted coding was used for scaffolding, debugging and documentation.
- All generated code was reviewed and tested by the team.

Sample mode:
- SAMPLE_MODE=true runs on cached sample data with no external calls.
```

---

## 7. Configuration

Use environment variables, never hardcoded credentials.

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["MODEL_API_KEY"],
    base_url=os.environ.get("MODEL_BASE_URL")
)
```

And ship a `.env.example`:

```bash
# Model provider
MODEL_API_KEY=your-api-key-here
MODEL_BASE_URL=https://api.your-provider.example/v1
MODEL_NAME=your-default-model
EMBEDDING_MODEL=your-embedding-model

# Sponsor services
ZETARIS_API_KEY=your-key-here
METERLESS_API_KEY=your-key-here
NVIDIA_API_KEY=your-key-here

# Runtime
SAMPLE_MODE=false
LOG_LEVEL=INFO
```

---

## 8. Logs as Evidence

Your logs should show:

- Which agent acted, and in what role
- What it received and what it produced
- Which agent got the handoff
- Critique, validation, retry, escalation or refinement
- Whether model and sponsor service calls succeeded or failed
- Any fallback or sample-mode behaviour

Recommended fields:

```json
{
  "timestamp": "2026-10-25T18:42:00Z",
  "agent_name": "EvaluatorAgent",
  "action": "critique_output",
  "input_summary": "Reviewed the reconciliation across three supplier sources.",
  "output_summary": "Flagged an unsupported resolution for Supplier C and requested a re-check.",
  "target_agent": "ReconcilerAgent",
  "model": "[provider/model]",
  "status": "success",
  "retry_count": 0
}
```

---

## 9. Open Source and Third-Party Code

**You may use:** open-source libraries, public framework examples, starter templates, public documentation snippets, public datasets under appropriate licences.

**You must:** respect licences, keep copyright notices, attribute material code you copied or adapted, avoid private or proprietary code without permission, and make sure your team's own contribution is substantial.

Recommended section:

```markdown
## Third-Party Code and Licences

- FastAPI — MIT
- LangGraph — MIT
- [library] — [licence]

Substantially adapted code is noted in comments or documentation.
```

---

## 10. Data Integrity

AI assistance does not override data rules. See the Data and Licensing Policy for the full rules.

- Data sources must be public or properly licensed
- Data loading should be automated
- No private or sensitive data
- No personally identifiable information
- Synthetic data labelled as such
- Public datasets cited

Do not use AI tools to invent citations, fabricate data provenance or create benchmark results that were never run.

---

## 11. How Compliance Is Checked

Reviewers may check during repository inspection, execution, log review, demo and slide deck review, technical evaluation and judge Q&A.

They may look for: hardcoded outputs, static or fabricated logs, suspiciously identical outputs across different inputs, committed secrets, missing or misleading disclosures, undeclared pre-existing work, sponsor technology that is claimed but not used, plagiarised code or documentation, missing attribution, and a gap between what the README claims and what the code does.

---

## 12. Disqualification Triggers

A submission may be disqualified if:

- Outputs are hardcoded or fake
- Logs are fabricated
- Code, content or documentation is plagiarised
- Pre-existing work is not declared
- API keys or secrets are committed
- The README or slide deck materially misrepresents what the system does
- The team cannot explain how their own solution works
- Unauthorised private, personal or restricted data is included

The Official Rules on the event page set out the full disqualification conditions.

---

## 13. Checklist

- [ ] No real API keys or secrets are committed
- [ ] `.env.example` is included, with placeholders only
- [ ] Outputs are generated by real agent logic, not hardcoded
- [ ] Logs reflect actual execution
- [ ] Agent roles are distinct and they interact more than once
- [ ] Zetaris and Meterless are integrated, and the project was developed in Cursor
- [ ] AI-assisted code has been reviewed and tested by the team
- [ ] Every team member can explain how the system works
- [ ] Open-source code and datasets are attributed
- [ ] Pre-existing components are declared in the submission form
- [ ] The README and slide deck accurately describe models, sponsor technology, data and limitations
- [ ] Sample mode, if included, is documented and works
- [ ] The project runs from a clean setup

---

## 14. The Principle

Use AI to move faster, think better, test more thoroughly and document more clearly.

The submission itself must be:

- **Yours** — you can explain and defend it
- **Executable** — it runs from a clean setup
- **Honest** — the README and slide deck match the code
- **Transparent** — the traces match the run
- **Reproducible** — someone else gets the same result
- **Secure** — no secrets, no unauthorised data

Build with AI. Submit with integrity.