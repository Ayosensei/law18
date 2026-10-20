# Demo Video Guide

**OPEN AGENT HACKATHON 2026 | Build an agent that does real work**

This guide explains how to create the **1–4 minute demo video** for your submission.

Your demo video is a required submission component, due on HackOS by:

**27 October 2026, 23:45 UTC**

**Demo is worth 15 points.** Judges look at how clearly the demo shows the solution, its functionality, and the value it provides to its intended users.

The goal is not a polished marketing video. It is to help judges quickly understand:

- What problem you solved, and for whom
- How your agents work and collaborate
- That your system actually runs
- How Zetaris and Meterless are integrated
- What output it produces and why that matters

> Where this guide and the Official Rules on the event page disagree, the Official Rules apply.

---

## 1. Length

| | |
|---|---|
| **Minimum** | 1 minute |
| **Maximum** | 4 minutes |
| **Recommended** | 2 minutes 30 seconds to 3 minutes 30 seconds |

Put the most important evidence early. A video over 4 minutes does not meet the requirement.

---

## 2. What Your Demo Must Show

The submission requirements ask your video to show:

1. **The main workflow**
2. **How the agent solves the selected challenge**
3. **Its key features**
4. **How Zetaris and Meterless are integrated**

The segments below cover all four.

| Segment | Time | What to Show |
|---|---:|---|
| 1. Problem | 15–25 seconds | The track, the user and the problem |
| 2. Solution | 20–30 seconds | What your agent does and the outcome it produces |
| 3. Agents and collaboration | 30–45 seconds | Agent roles and how they interact |
| 4. Live run | 45–60 seconds | The main workflow running on a real input |
| 5. Sponsor technology | 20–30 seconds | Zetaris and Meterless doing real work |
| 6. Output and impact | 30–40 seconds | The result, a trace snippet and why it matters |

---

## 3. Recommended Structure

### 0:00–0:20 — Problem

Include your track, the user and the pain point.

> "Our entry is for The Agent That Can Explain Why. Customer success leads can see churn rising but can't say why, because the answer is spread across three systems that don't talk to each other."

---

### 0:20–0:45 — Solution

Explain the system in one simple flow: what goes in, what processes it, what comes out, and whether the data is real, public or synthetic.

> "The user asks a question. Our agents pull evidence from billing, support and usage data, test each explanation, and return an answer that shows where every finding came from. The demo uses synthetic data."

---

### 0:45–1:25 — Agents and Collaboration

This is one of the most important segments. Show that your solution is an agent system, not a single prompt or a fixed chain.

Show:

- Agent names and roles
- How they communicate
- Where feedback loops happen
- Where agents validate or challenge each other
- Where retries, branching, escalation or shared memory are used

> "This isn't a fixed A-to-B-to-C pipeline. The Evaluator can send the Planner back when a hypothesis hasn't been tested, and it blocks any claim the data doesn't support. Every interaction is written to our trace logs."

Showing your architecture diagram here helps.

---

### 1:25–2:15 — Live Run

Show the system actually running. Any of these works:

**API call:**

```bash
curl -X POST http://localhost:8000/run \
  -H "Content-Type: application/json" \
  -d @input_examples/example_1.json
```

**Command line:**

```bash
python run.py --input input_examples/example_1.json
```

**A UI**, as long as it is backed by the real agent system.

Important:

- Never show real API keys or `.env` contents
- Clear terminal history that contains secrets
- If a run takes time, you may cut the wait, but the input and output must be real

---

### 2:15–2:45 — Sponsor Technology

Show Zetaris and Meterless doing real work, not just their logos.

Good things to show:

- The trace lines where your agent queries Zetaris
- The data Zetaris returned and how the agent used it
- Model calls running through Meterless
- Where NVIDIA technology contributes, if you use it

> "Our Retriever queries all three systems through Zetaris with a single SQL access point. Every model call runs through Meterless. We built the whole project in Cursor."

---

### 2:45–3:30 — Output and Impact

Show the final result and why it is useful.

Show:

- The final output: JSON response, report, dashboard or recommendation
- At least one trace snippet showing collaboration
- Confidence, evidence or limitations, if your output includes them

> "The answer shows that failed payments and slow ticket resolution explain most of the rise, with the evidence for each and an honest caveat. The team can act on it this week."

---

## 4. What Judges Need to See

### Must show or clearly mention

- The track, the problem and the target user
- At least two agents with clear roles
- Real collaboration between agents
- A live or recorded run on real or synthetic data
- How Zetaris and Meterless are integrated
- The final output
- Why the output is useful

### Strong signals

- An architecture diagram or agent flow
- A real run
- Trace lines showing agent-to-agent interaction
- A failure, retry, critique or validation loop
- Sponsor technology visibly doing work
- A clear impact statement

### Weak signals

- Slides with no working run
- UI screens with no evidence of the system behind them
- One prompt producing one answer
- A linear chain with no feedback loop
- Zetaris and Meterless mentioned but never shown
- No final output

---

## 5. Recording Tips

Use any screen recording tool: Zoom, Teams, QuickTime, OBS, Loom, Clipchamp or your operating system's built-in recorder.

| Setting | Recommendation |
|---|---|
| Resolution | 1080p if possible |
| Aspect ratio | 16:9 |
| Audio | Clear narration; a headset helps |
| Terminal font | Increase the size before recording |
| Browser zoom | 110–125% for web UIs |
| Cursor | Visible |

### Screen flow

1. README header or title slide
2. Architecture diagram
3. Terminal or UI showing the run
4. Trace showing collaboration and sponsor technology calls
5. Final output
6. Closing summary

### Protect secrets

Before recording:

- Clear terminal history that contains secrets
- Close or hide `.env`
- Never open API key pages for any service
- Never paste keys into a visible terminal

Safe to show:

```bash
MODEL_API_KEY=***
ZETARIS_API_KEY=***
```

Not safe to show:

```bash
MODEL_API_KEY=sk-actual-real-key-value
```

---

## 6. Narration

Keep it direct. Avoid long background explanations.

1. **Problem:** "Our entry is for [track]. [User] needs to [job], but [pain point]."
2. **System:** "Our agent takes [input] and produces [output]."
3. **Agents:** "The main agents are..."
4. **Collaboration:** "They work together by..."
5. **Run:** "Here's a real run with this input..."
6. **Sponsor technology:** "Zetaris does..., Meterless does..."
7. **Output:** "The result shows..."
8. **Impact:** "This matters because..."

### Template

> "Our entry is for [track]. [User] needs to [job to be done], but today that is hard because [pain point].
>
> Our agent takes [input] and produces [output]. The main agents are [Agent 1], [Agent 2] and [Agent 3].
>
> They don't just run in sequence. [Agent 1] plans the work, [Agent 2] gathers evidence through Zetaris, and [Agent 3] checks the result. If the evidence is weak, the work goes back for another pass. You can see that in our trace.
>
> Here's a real run. [Show the run.] Every model call runs through Meterless.
>
> The final output includes [key elements]. This is useful because [impact]."

---

## 7. File and Access

| Setting | Recommendation |
|---|---|
| Format | MP4 preferred |
| Length | 1–4 minutes |
| Resolution | 1080p preferred |
| Audio | Required |
| Captions | Optional, but helpful for judges in other time zones and languages |

### Naming

```text
OAH2026-TeamName-Track-Demo.mp4
```

Example:

```text
OAH2026-ChurnWhy-ExplainWhy-Demo.mp4
```

### Access

Submit the video through the submission form on HackOS. If you share it as a link, test it in a private browser window first. The link must:

- Open without requesting permission
- Play with audio
- Stay live until judging is complete
- Not need special software or access to a private workspace

### Do not submit

- A local file path
- A link only visible to your own account
- A broken or expiring link
- A video with no audio
- A video over 4 minutes
- A video that shows API keys or sensitive data

---

## 8. Backup Plan

Prepare this before 27 October:

1. **Primary copy:** the one you submit
2. **Backup copy:** hosted somewhere different
3. **Local copy:** the original MP4 on your machine
4. **Team copy:** at least one teammate has the final file
5. **README link:** add the video link to your README

```markdown
## Demo Video

Demo video: [viewable link]
```

### If an upload fails near the deadline

1. Use your backup copy
2. Confirm it opens in a private browser window
3. If HackOS is the problem, post in the #help desk channel straight away
4. Do not wait until the final minutes

Message template for #help desk:

```text
Team name:
Track:
Demo video link (primary):
Demo video link (backup):
GitHub repository:
Issue:
Error message or screenshot:
Time attempted (UTC):
```

---

## 9. Shot List

| Shot | Screen | Narration Goal |
|---|---|---|
| 1 | README or title slide | Team, track and problem |
| 2 | Architecture diagram | Agents and roles |
| 3 | Terminal or UI | The main workflow running |
| 4 | Trace | Collaboration and Zetaris and Meterless calls |
| 5 | Output | The result and why it is useful |
| 6 | Closing | One-line summary |

---

## 10. Checklist

### Content

- [ ] 1–4 minutes long
- [ ] Track, problem and user are clear
- [ ] Agent roles are explained
- [ ] Agent collaboration is shown
- [ ] The main workflow runs on screen
- [ ] Zetaris and Meterless are shown doing real work
- [ ] Key features are shown
- [ ] The final output is shown
- [ ] Impact is explained

### Technical

- [ ] Audio is clear
- [ ] Screen text is readable
- [ ] The video plays start to finish
- [ ] No API keys or secrets are visible
- [ ] The video is submitted on HackOS, or the link opens in a private window
- [ ] A backup copy is ready

---

## 11. Common Mistakes

| Mistake | Fix |
|---|---|
| **Spending too long on the problem** | One or two sentences, then show the system |
| **Showing only the UI** | Also show the trace and the output |
| **Listing agents without showing interaction** | Show a moment where one agent changes another's work |
| **Never showing Zetaris or Meterless** | Show the calls in the trace or on screen |
| **Ending before the output** | Always show the final result |
| **Going over 4 minutes** | Cut the setup and the waiting, keep the evidence |
| **Revealing secrets** | Clear history, hide `.env`, mask keys |

**Weak:**

> "We have five agents: retriever, classifier, analyst, critic and writer."

**Strong:**

> "The Critic rejected the Analyst's pricing claim because no pricing data was retrieved, so the Analyst removed it before the Writer drafted the answer."

---

## 12. What a Strong Demo Looks Like

1. "Our entry is for The Agent That Can Explain Why."
2. "A customer success lead asks why churn rose."
3. "The Planner breaks it into hypotheses."
4. "The Retriever pulls billing, support and usage data through Zetaris."
5. "The Evaluator flags an untested hypothesis and sends the Planner back."
6. "The Analyst connects the findings; the Evaluator blocks an unsupported claim."
7. "Every model call runs through Meterless."
8. "Here's a real run."
9. "Here's the trace showing that back-and-forth."
10. "Here's the answer, with evidence and a caveat."
11. "The team can act on it this week instead of spending days pulling data together."

---

## 13. Final Reminder

Your demo is not judged on production quality. It is judged on whether judges can quickly understand and verify:

- The problem and the user
- The agent design
- The system running
- How Zetaris and Meterless are used
- The output and its value

Focus on **systems, not slides**.
Focus on **collaboration, not isolated automation**.
Focus on **impact, not just novelty**.