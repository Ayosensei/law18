# OPEN AGENT HACKATHON 2026
## Build an agent that does real work

# Hackathon Overview

**Executive summary for participants, the judging panel, the support team, and organizers**

The **Open Agent Hackathon 2026** is a fully online global hackathon challenging builders to create **AI agents that do real work in the real world**.

The challenge is simple: build an agent that can access relevant information, understand context and relationships, reason across multiple steps, maintain useful context, and turn that understanding into a useful outcome.

This is not a prompt-writing challenge, a chatbot build, or a UI showcase. The goal is to produce **useful, production-oriented agents** that solve meaningful problems for real users, industries, or communities.

---

## 1. Executive Summary

| Item | Detail |
|---|---|
| **Event Name** | Open Agent Hackathon 2026 |
| **Tagline** | Build an agent that does real work |
| **Type** | Fully online global hackathon |
| **Audience** | Developers, researchers, and builders worldwide, from students to senior engineers |
| **Eligibility** | Anyone aged 16 or older at the start of the build window |
| **Cost** | Free |
| **Team Size** | 1–5 builders; solo entries compete in the same pool as teams |
| **Event Platform** | HackOS (all hackathon operations) |
| **Community** | Discord (community chat and post-event activities) |
| **Registration Opens** | **14 August 2026, 00:00 UTC** |
| **Sponsor Workshops** | **Data Day (Zetaris): 12 October, recording on HackOS; Build Day and Power Day: dates to be confirmed** |
| **Participant Onboarding** | **21 October 2026, 12:00–13:30 UTC (5:00–6:30 AM PT)** |
| **Build Window** | **22 October, 00:00 UTC to 27 October 2026, 23:45 UTC** — 144 hours |
| **Registration Closes** | **22 October 2026, 23:45 UTC** |
| **Submissions Close** | **27 October 2026, 23:45 UTC** |
| **Judging Opens** | **28 October 2026, immediately after submissions close** |
| **Results Announced** | **6 November 2026, 16:00 UTC** |
| **Challenge Tracks** | 3, plus one bonus track: Wildcard [Tinkerer] |
| **Sponsors** | Space XAI (with Cursor), NVIDIA, Zetaris, Meterless |
| **Required Sponsor Technology** | Zetaris and Meterless integrated in every submission; Cursor as the development environment; NVIDIA wherever it contributes |
| **Agent Frameworks** | Open choice: LangGraph, CrewAI, AutoGen, OpenAI Agent SDK, LangChain, LlamaIndex, custom stacks |
| **Prize Pool** | Up to $20,000 ($15,000 in cash prizes and $5,000 in in-kind rewards) |

All times are in **UTC**.

---

## 2. What the Hackathon Is About

The Open Agent Hackathon exists to surface agents that could realistically be used after the event ends.

Participants will:

- Select **one of the three challenge tracks** and build for it, or extend an existing project in the bonus track, **Wildcard [Tinkerer]**.
- Build a working agent that does real work, not a demo.
- Integrate Zetaris and Meterless, develop in Cursor, and use NVIDIA technology where it contributes, so the build time goes into the solution rather than the foundations.
- Submit a working, reproducible project on HackOS.
- Compete for a share of the prize pool and a place in the community showcase.

The strongest solutions will combine:

- **Technical depth**
- **Agents that act, coordinate, and recover**
- **Real business, industry, or community value**
- **A usable output for the person it is meant for**
- **Reliable execution under judging conditions**

---

## 3. Prizes

The prize pool is **up to $20,000** in total prize value: **$15,000 in cash prizes** and **$5,000 in in-kind rewards** shared among selected winners, with a feature in the community showcase for the top project.

| Track | 1st | 2nd | 3rd |
|---|---:|---:|---:|
| **Solving Fragmented Intelligence** | $2,000 | $1,350 | $1,000 |
| **The Agent That Can Explain Why** | $2,000 | $1,350 | $1,000 |
| **Reasoning Architecture** | $2,000 | $1,300 | $1,000 |
| **Wildcard [Tinkerer]** | $1,000 | $600 | $400 |

Additional challenges and prizes will be presented at the participant onboarding call on 21 October.

- Cash prizes are paid by bank transfer within 30 days of the results announcement.
- Cash prizes are split equally among team members unless the team submits a different split in writing.
- Taxes and any local charges are the recipient's responsibility.
- Employees of the organizer and of judging sponsors may participate but are not eligible for cash prizes.

Full details are in the Official Rules on the event page.

---

## 4. The Core Build Mandate

Participants must build an agent that satisfies the following:

### Minimum Requirements

| Requirement | What It Means |
|---|---|
| **Technical Execution** | The project must be functional and demonstrate a working implementation. |
| **Real-World Impact** | The project must address a clear, meaningful problem or user need. |
| **Innovation** | The submission should demonstrate a novel or creative approach to the problem. |
| **Demo Quality** | Participants must clearly demonstrate how the product works and its key functionality. |
| **Use of Technology** | The project must integrate Zetaris and Meterless, be developed using Cursor, and use NVIDIA technology wherever it contributes. |

All projects must be submitted on HackOS by **27 October 2026, 23:45 UTC**.

### What Counts as a Strong Agent System

Strong submissions show that agents are not simply running one after another in a fixed pipeline.

#### Weak

- Linear pipeline only: `Agent A → Agent B → Agent C`
- No feedback loops
- No critique or validation
- Agents acting as prompt wrappers
- No shared context or state
- No retries, branching, or escalation

#### Strong

- Agents delegate tasks dynamically based on context.
- Agents critique or validate outputs.
- Planner, executor, and evaluator agents iterate together.
- Agents use shared memory or shared state.
- Workflows include branching, retries, escalation, or fallback logic.
- Agents recover from errors or incomplete outputs.
- Roles are specialised and interdependent.

Example strong pattern:

```text
Planner Agent
   ↔ critiques and revises task plan with
Executor Agent
   ↔ validates generated output with
Evaluator Agent
   ↔ escalates risks or gaps to
Risk / Domain Agent
   ↔ returns refinement instructions to Planner
```

---

## 5. The Sponsor Technology

The hackathon is backed by Space XAI (with Cursor), NVIDIA, Zetaris and Meterless. Their technology exists to reduce the infrastructure burden so teams can spend the build window on the problem and the agent rather than on plumbing.

| Sponsor | Requirement | Workshop |
|---|---|---|
| **Zetaris** | Required: every submission must integrate Zetaris | Data Day: 12 October 2026 (recording on HackOS) |
| **Meterless** | Required: every submission must integrate Meterless | Build Day and Power Day: dates to be confirmed |
| **Cursor (with Space XAI)** | Required: teams must use Cursor as their development environment | Build Day: date to be confirmed |
| **NVIDIA** | Integrate wherever it contributes to the project, workflow or use case | Power Day: date to be confirmed |

Each sponsor has a folder in Resources on HackOS with its documentation and resources. Technical questions go to the #help desk channel, and sponsor questions to each sponsor's Help channel on HackOS.

Use of sponsor technology is scored: **Sponsor Tech is worth 10 points** in the rubric.

### Security Rule

Set credentials through environment variables only. Never commit API keys or secrets. Your repository should include a `.env.example` file with placeholder values only.

---

## 6. The Challenge Tracks

Every submission selects exactly one primary track, which determines the judging panel and the prizes it competes for. Teams may change track any time before the submission deadline from their team workspace. Cross-track relevance is welcome but is not scored twice.

| # | Track | What You Build |
|---:|---|---|
| 1 | **Solving Fragmented Intelligence** | Demonstrate a clever ability to discover and work across fragmented data sources. |
| 2 | **The Agent That Can Explain Why** | Build agents that investigate complex questions across multiple data sources, connect findings, and produce evidence-backed answers or recommendations. |
| 3 | **Reasoning Architecture** | Demonstrate a novel ability to turn data, knowledge, memory, and reasoning into reliable decisions and actions. |

### Bonus Track

| Track | What You Build | Sponsor Technology |
|---|---|---|
| **Wildcard [Tinkerer]: Bring Your Own Project** | Bring an existing project, prototype or concept and extend it using Zetaris and Meterless. Judged on the same criteria as the other tracks and scored on the new work rather than prior development. | Zetaris, Meterless |

Each challenge page on HackOS carries the full challenge statement, expected outputs, sponsor technology involved, and submission requirements.

### Practical Advice

Do not choose the most ambitious idea just to appear ambitious.

Judges will reward:

- A working, focused solution over an incomplete broad one.
- Agents doing real work over superficial complexity.
- Clear value over technical noise.
- Reliable execution over fragile demos.

---

## 7. Programme Timeline

### Pre-Event Milestones

| Date | Milestone |
|---|---|
| **14 August, 00:00** | Registration opens |
| **25 September** | Mentor selection |
| **5 October** | Mentor onboarding |
| **12 October** | Data Day workshop: Zetaris (recording on HackOS) |
| **To be confirmed** | Build Day workshop: Cursor, GenAI Works and Meterless |
| **To be confirmed** | Power Day workshop: NVIDIA and Meterless |
| **21 October, 12:00–13:30** | Participant onboarding |

### Phases

| Phase | Date | Activity | Participant Action |
|---:|---|---|---|
| **1** | **From 12 October** | **Sponsor Workshops** — Data Day, Build Day and Power Day, recorded and published on HackOS | Attend live or watch the recordings on HackOS |
| **2** | **21 October, 12:00–13:30** | **Participant Onboarding** — tracks, sponsor technology, HackOS walkthrough, submission requirements, Q&A | Attend, confirm your track, decide whether to build solo or in a team |
| **3** | **22–27 October** | **Build Window** — 144 hours of development, mentor office hours, #help desk and sponsor Help channels live. Registration closes 22 October, 23:45 | Build, test, and prepare your submission |
| **4** | **27 October, 23:45** | **Submission** — hard deadline | Submit on HackOS |
| **5** | **From 28 October** | **Judging** — begins immediately after submissions close; expert review against the published criteria | Await the outcome; respond if clarification is requested |
| **6** | **6 November, 16:00** | **Results** — live results call on HackOS, with winners' certificates | Join the call |
| **7** | **After the event** | **Community** — showcase and ongoing community activity on Discord | Join the GenAI Works community |

Sponsor workshops are joined through the Open Agent Hackathon 2026 course on GenAI Academy: https://academy.genai.works/courses/open-agent-hackathon-2026/details

---

## 8. Eligibility Criteria

| # | Criterion | Detail |
|---:|---|---|
| 1 | **Age** | Open worldwide to anyone aged 16 or older at the start of the build window. |
| 2 | **Accounts** | One account per participant. Duplicate accounts disqualify the whole team. |
| 3 | **Team size** | Teams of 1–5 builders. Solo entries compete in the same pool as teams. |
| 4 | **Track selection** | Every submission selects exactly one primary track. |
| 5 | **Organizer and sponsor staff** | Employees of the organizer and of judging sponsors may participate but are not eligible for cash prizes. |

Full eligibility terms are in section 1 of the Official Rules on the event page.

---

## 9. Team Structure

| Format | Description |
|---|---|
| **Solo** | Build and submit alone. Select "happy to build solo" in the registration form. |
| **Create a Team** | Create a team on HackOS and invite up to four teammates. |
| **Join a Team** | Use team-finding on HackOS to join a team. |

Teams can have up to **5 builders**, and a participant may belong to exactly one team. Mentors may advise any number of teams. Team composition locks when the first submission is created; before that, participants may join, leave or merge freely.

### Team Guidance

Teams should align early on:

- Selected track and use case
- Agent architecture
- Technical stack and sponsor integration
- Repository ownership
- Demo and slide deck responsibilities
- Submission owner
- How outcomes and prizes are shared

---

## 10. Participant Journey

1. **Register** on hackathon.genai.works before 22 October, 23:45 UTC.
2. **Log in to HackOS**, complete your profile, and review the challenge pages and Resources.
3. **Watch the Data Day recording** on HackOS, and attend or watch the Build Day and Power Day workshops.
4. **Attend participant onboarding** on 21 October, 12:00–13:30 UTC.
5. **Build** from 22 to 27 October, using mentor office hours, the #help desk channel and the sponsor Help channels on HackOS.
6. **Submit** before 27 October, 23:45 UTC.
7. **Join the results call** on HackOS on 6 November, 16:00 UTC.

HackOS runs all hackathon operations: announcements, team-finding and team creation, mentor office hours, the #help desk and sponsor Help channels, submission, and the results call. Discord is the GenAI Works community space for community chat and activities after the hackathon.

---

## 11. Build Environment Summary

### Models and Frameworks

| Component | Rule |
|---|---|
| **Models** | Open choice, including closed-source models and paid APIs |
| **Languages, frameworks and clouds** | Open choice, including sponsor credits |
| **Required sponsor technology** | Zetaris and Meterless integrated; Cursor (with Space XAI) as the development environment |
| **NVIDIA** | Integrated wherever it contributes |
| **Open-source libraries** | Pre-existing open-source libraries are fine |
| **Pre-existing product code** | Must be declared in the submission form |
| **Generated code** | Allowed and expected; teams own the result and are accountable for it |

### Suggested Frameworks

| Framework / Stack | Best For |
|---|---|
| **LangGraph** | State-driven workflows, branching, complex decision flows |
| **CrewAI** | Role-based delegation and specialist agent teams |
| **AutoGen** | Multi-agent conversations, debate, iterative reasoning |
| **OpenAI Agent SDK** | Teams familiar with OpenAI-style agent development |
| **LangChain / LlamaIndex** | Document-heavy workflows and retrieval |
| **Lightweight Custom Stack** | Fast prototypes using Python, FastAPI, direct API calls |
| **Multimodal Stack** | Audio, video, speech, and media-heavy use cases |

The framework itself is not scored. Judges evaluate the **agent behaviour**, **technical implementation**, **product quality**, **sponsor technology use**, and **impact**.

---

## 12. Submission Essentials

Submissions close on **27 October 2026 at 23:45 UTC**. This is a hard deadline. Submit through HackOS.

### Required Submission Components

| Component | Requirement |
|---|---|
| **Demo video** | 1–4 minutes, showing the main workflow, how the agent solves the selected challenge, its key features, and how Zetaris and Meterless are integrated |
| **Slide deck** | The problem and target users, the solution, the agent workflow or architecture, the technical stack, how Zetaris and Meterless were used, what was unique about the use of the sponsor technologies, product visuals, and future enhancements |
| **GitHub repository** | All source code and a README covering setup, usage and dependencies. If agents run in Google Colab, include the Colab links |
| **Sponsor technology explanation** | How Zetaris and Meterless were integrated, how Cursor was used during development, where NVIDIA technology contributes, and what was unique about the use of the sponsor technologies |

Work committed before the build window opens is not eligible, except for clearly declared pre-existing components.

### To Support Your Technical and Demo Scores

| Component | Requirement |
|---|---|
| **Codebase** | Complete and runnable from a clean setup |
| **Logs or traces** | Evidence of how the agent reached its output |
| **Sample inputs and outputs** | Enough to show the system works on more than one case |
| **No committed secrets** | `.env.example` with placeholder values only |

---

## 13. Judging

Submissions are reviewed by expert judges against the published criteria. Judging opens on **28 October**, immediately after submissions close. Each submission is reviewed by at least three judges. The Wildcard [Tinkerer] track is scored on the new work rather than prior development.

### Scoring

| Criterion | Points | What Judges Look For |
|---|---:|---|
| **Impact** | **30** | Consistency with the challenge statements: how effectively the solution addresses a meaningful real-world problem for its intended users |
| **Technical** | **20** | How well the solution is built, including its technical implementation, reliability and architecture |
| **Innovation** | **15** | How original or creative the approach to solving the problem is |
| **Demo** | **15** | How clearly the demo shows the solution, its functionality, and the value it provides to its intended users |
| **Product & UX** | **10** | How intuitive, accessible, and easy to use the product is for its intended users |
| **Sponsor Tech** | **10** | How effectively the solution uses the sponsors' technology to address the problem and enhance the overall product |
| **Total** | **100** | |

Ties are resolved on the Impact score, then on submission timestamp.

---

## 14. What Judges Will Prioritise

Judges will prioritise:

- Agents that do real work rather than describe it.
- Clear real-world applications.
- Thoughtful architecture.
- Multiple agent interactions across a run.
- Outputs refined through iteration.
- Agents that challenge, validate, or improve each other's work.
- Branching or dynamic workflows.
- Reliable execution.
- Clear logs and traceability.
- Outputs someone could actually use.

Judges will avoid overvaluing:

- UI polish without technical depth.
- Single-agent systems presented as agent systems.
- Hardcoded demo paths.
- Overly broad concepts with weak implementation.
- Unsupported claims of value.
- Sponsor technology bolted on at the end with no real role in the build.

---

## 15. Recommended Participant Focus

| Focus On This | Not This | Why |
|---|---|---|
| **Systems** | Prompts | Agents must act, coordinate, and produce outputs, not describe what they would do. |
| **Real problems** | Novelty alone | The strongest submissions solve meaningful problems for real users. |
| **Working solutions** | Slides and mockups | Judges need to see the solution run. |
| **Using the sponsor technology well** | Rebuilding foundations | Sponsor technology is there so you can focus on value. |
| **Reliability** | Fragile demos | Submissions must hold up during judging. |

---

## 16. Practical Success Checklist

Before submission, every team or solo builder should be able to answer "yes" to the following:

### Problem and Scope

- [ ] Have we selected one primary track and built for it?
- [ ] Is the problem clearly defined?
- [ ] Is the solution scoped tightly enough to work reliably?
- [ ] Can we explain the value to a real user?

### Agent Design

- [ ] Are agent roles distinct and meaningful?
- [ ] Do agents interact more than once?
- [ ] Is there critique, validation, feedback, delegation, retry, or escalation?
- [ ] Do logs show how the system reached its output?

### Technical

- [ ] Are Zetaris and Meterless integrated, and did we develop in Cursor?
- [ ] Does the system run from a clean setup with no manual steps?
- [ ] Are credentials loaded only from environment variables?
- [ ] Does the system handle failures and fall back gracefully?
- [ ] Does it run quickly and predictably?

### Product

- [ ] Is the output usable by the person it is meant for?

### Submission

- [ ] Is the demo video (1–4 minutes) uploaded?
- [ ] Is the slide deck complete?
- [ ] Does the GitHub repository include a README covering setup, usage and dependencies?
- [ ] Have we explained how Zetaris, Meterless, Cursor and NVIDIA were used?
- [ ] Have we declared any pre-existing components?
- [ ] Are there no committed API keys?
- [ ] Did we submit before 27 October, 23:45 UTC?

---

## 17. Key Dates at a Glance

| Date (UTC) | Milestone |
|---|---|
| **14 August, 00:00** | Registration opens |
| **25 September** | Mentor selection |
| **5 October** | Mentor onboarding |
| **12 October** | Data Day workshop: Zetaris (recording on HackOS) |
| **To be confirmed** | Build Day workshop: Cursor, GenAI Works and Meterless |
| **To be confirmed** | Power Day workshop: NVIDIA and Meterless |
| **21 October, 12:00–13:30** | Participant onboarding |
| **22 October, 00:00** | Build window opens |
| **22 October, 23:45** | Registration closes |
| **27 October, 23:45** | Submissions close |
| **28 October** | Judging opens, immediately after submissions close |
| **6 November, 16:00** | Results announced, with winners' certificates |

---

## 18. Final Message to Participants

The Open Agent Hackathon is an opportunity to build an agent that could realistically be used after the event ends.

The best submissions will not necessarily be the biggest or the most visually polished. They will be the ones that show:

- A clear problem.
- A working agent that does real work.
- Agents that coordinate and recover.
- Good use of the sponsor technology.
- Reliable execution.
- A useful output for a real person.

Build something useful.  
Make the agents do real work.  
Keep the system reproducible.  
Show your work clearly.