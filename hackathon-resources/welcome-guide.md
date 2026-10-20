# Welcome Guide

## OPEN AGENT HACKATHON 2026

Welcome to the **Open Agent Hackathon 2026**, a fully online global hackathon for builders creating real agentic solutions to meaningful real-world problems.

This guide is your **pre-event orientation resource**. Read it before **participant onboarding on 21 October 2026** and keep it open during your first build session.

The goal is simple:

> **Build working AI agents that solve real problems, using sponsor technology to handle the technical plumbing so you can focus on the solution and the value it creates.**

---

## 1. What Is the Open Agent Hackathon?

The **Open Agent Hackathon 2026** is a 144-hour online build event where participants build AI agents that can access relevant information, understand context and relationships, reason across multiple steps, maintain useful context, and turn that understanding into a useful outcome. Participants work across three challenge tracks and one bonus track, supported by sponsor technologies, live technical workshops, mentors, and resources.

| Item | Detail |
|---|---|
| **Event name** | Open Agent Hackathon 2026 |
| **Format** | Fully online, 144 hours |
| **Eligibility** | Open worldwide to anyone aged 16 or older at the start of the build window |
| **Team size** | 1–5 builders; solo entries compete in the same pool as teams |
| **Cost** | Free |
| **Event platform** | HackOS (all hackathon operations) |
| **Community** | Discord (community chat and post-event activities) |
| **Challenge tracks** | 3, plus one bonus track: Wildcard [Tinkerer] |
| **Sponsors** | Space XAI (with Cursor), NVIDIA, Zetaris, Meterless |
| **Prize pool** | Up to $20,000 ($15,000 in cash prizes and $5,000 in in-kind rewards) |
| **Sponsor workshops** | Data Day on 12 October 2026 (recording on HackOS); Build Day and Power Day dates to be confirmed |
| **Participant onboarding** | 21 October 2026, 12:00–13:30 UTC (5:00–6:30 AM PT) |
| **Build window** | 22 October 2026, 00:00 UTC to 27 October 2026, 23:45 UTC |
| **Registration closes** | 22 October 2026, 23:45 UTC |
| **Submissions close** | 27 October 2026, 23:45 UTC |
| **Judging opens** | 28 October 2026, immediately after submissions close |
| **Results announced** | 6 November 2026, 16:00 UTC |

Employees of the organizer and of judging sponsors may participate but are not eligible for cash prizes. One account per participant; duplicate accounts disqualify the whole team. Full details are in the Official Rules on the event page.

---

## 2. The Mission: Build Real Agentic Work

This hackathon is about building agents that do useful work, not demos.

The sponsor technology exists to reduce the infrastructure burden. Instead of spending most of the event rebuilding data integration, context infrastructure, and other foundations, you can spend your time on the problem, the agent design, and the outcome.

### Focus on this

| Focus | Not This | Why |
|---|---|---|
| **Systems** | Prompt experiments | Agents should act, coordinate, recover, and produce useful outputs. |
| **Real problems** | Novelty alone | Strong submissions solve meaningful problems for real users. |
| **Working solutions** | Slides and mockups | Judges need to see the solution run. |
| **Using the sponsor technology well** | Rebuilding foundations | Sponsor technology is there so you can focus on value. |
| **Clarity** | UI polish only | A clear, explainable solution is stronger than a polished interface over a weak system. |

### What your solution must demonstrate

| Requirement | What It Means |
|---|---|
| **Technical Execution** | The project must be functional and demonstrate a working implementation. |
| **Real-World Impact** | The project must address a clear, meaningful problem or user need. |
| **Innovation** | The submission should demonstrate a novel or creative approach to the problem. |
| **Demo Quality** | You must clearly demonstrate how the product works and its key functionality. |
| **Use of Technology** | The project must integrate Zetaris and Meterless, be developed using Cursor, and use NVIDIA technology wherever it contributes. |

---

## 3. What Makes a Strong Agent System?

Judges will look at whether your agents do real work and whether the system holds up.

### Weak

Avoid submissions where:

- Agent A simply passes output to Agent B, then Agent B passes output to Agent C.
- There are no feedback loops.
- Agents are only wrappers around prompts.
- There is no evidence of decision-making.
- Nothing shows how the system reached its output.

Example of a weak design:

```text
User input → Planner → Writer → Summarizer → Final answer
```

This is a pipeline, not an agent system.

### Strong

Strong submissions include:

- Agents that **delegate tasks dynamically**.
- Agents that **critique or validate** outputs.
- Iterative loops such as:

```text
Planner ↔ Executor ↔ Evaluator
```

- Shared memory or shared context.
- Branching, retries, escalation, and recovery.
- Logs or traces showing how the system reasoned and refined its work.

Example of a stronger design:

```text
Planner creates approach
Executor attempts task
Evaluator detects missing evidence
Planner revises plan
Research Agent retrieves new context
Executor reruns task
Evaluator approves or requests another iteration
Final Agent produces answer
```

---

## 4. Your Starting Point: The Challenge Tracks

Every submission selects exactly one primary track, which determines the judging panel and the prizes it competes for. You can change your track any time before the submission deadline from your team workspace.

| # | Track | What You Build |
|---:|---|---|
| 1 | **Solving Fragmented Intelligence** | Demonstrate a clever ability to discover and work across fragmented data sources. |
| 2 | **The Agent That Can Explain Why** | Build agents that investigate complex questions across multiple data sources, connect findings, and produce evidence-backed answers or recommendations. |
| 3 | **Reasoning Architecture** | Demonstrate a novel ability to turn data, knowledge, memory, and reasoning into reliable decisions and actions. |

### Bonus track

| Track | What You Build | Sponsor Technology |
|---|---|---|
| **Wildcard [Tinkerer]: Bring Your Own Project** | Bring an existing project, prototype or concept and extend it using Zetaris and Meterless. Judged on the same criteria as the other tracks and scored on the new work rather than prior development. | Zetaris, Meterless |

Each challenge page on HackOS includes:

- Challenge statement
- Problem and use case
- What you are expected to build
- Sponsor technology involved
- Submission requirements

**Recommendation:** Pick a track where you can build a reliable, working solution within the build window. A focused solution that runs is stronger than an ambitious one that does not.

---

## 5. Key Dates You Must Know

All times are in **UTC**.

| Date | Milestone | What You Should Do |
|---|---|---|
| **12 October** | Data Day workshop: Zetaris | Watch the recording on HackOS. |
| **Date to be confirmed** | Build Day workshop: Cursor, GenAI Works and Meterless | Attend live where possible. Recording is added to HackOS. |
| **Date to be confirmed** | Power Day workshop: NVIDIA and Meterless | Attend live where possible. Recording is added to HackOS. |
| **21 October, 12:00–13:30** | Participant onboarding | Attend live. Confirm your track and how you will build. |
| **22 October, 00:00** | Build window opens | Start building. |
| **22 October, 23:45** | Registration closes | Hard deadline to register. |
| **22–27 October** | Build period | Use HackOS, mentors, and resources. Ask questions early. |
| **27 October, 23:45** | Submissions close | Hard deadline. Submit all required materials. |
| **28 October** | Judging opens | Judging begins immediately after submissions close. |
| **6 November, 16:00** | Results announced | Live results call on HackOS. |

---

## 6. Before the Hackathon: Sponsor Workshops and Onboarding

### Sponsor workshops

Sponsors run live workshops before the hackathon, covering their technology and how to use it in your build. All workshops are recorded, and the recordings and related resources are added to HackOS.

| Workshop | Sponsors and Focus | Date | Time |
|---|---|---|---|
| **Data Day** | Zetaris: serving internal data | 12 October 2026 | Recording on HackOS |
| **Build Day** | Cursor: build with. GenAI Works: how to build (vibe coding). Meterless engines: build faster | To be confirmed | To be confirmed |
| **Power Day** | NVIDIA: cloud provider. Meterless: local and cloud provider | To be confirmed | To be confirmed |

Join the workshops through the Open Agent Hackathon 2026 course on GenAI Academy: https://academy.genai.works/courses/open-agent-hackathon-2026/details

If you cannot attend live, watch the recordings on HackOS before the hackathon starts.

### Participant onboarding (21 October, 12:00–13:30 UTC)

Onboarding is the official start of the participant experience. It is delivered by the GenAI Works team, with technical walkthroughs from the Product Team.

| Segment | What It Covers |
|---|---|
| Welcome | Event purpose, timeline, expectations |
| Challenge tracks | The three tracks, the bonus track, and what strong solutions look like |
| Sponsor technology | How Zetaris, Meterless, Cursor, and NVIDIA fit into your build |
| HackOS walkthrough | Resources, teams, mentors, submission |
| Q&A | Open questions before the build starts |

### Come prepared with

- Your HackOS account set up.
- A shortlist of tracks you are interested in.
- Your preferred agent framework or stack in mind.
- Your local development environment checked, including Cursor.
- Questions about the sponsor technology, teams, or submission.

---

## 7. How to Get Set Up on HackOS

**HackOS** runs all hackathon operations. Everything during the event happens there.

Use HackOS to:

- Receive official announcements.
- Access challenge pages and resources.
- Watch sponsor workshop recordings.
- Find teammates and create or manage your team.
- Attend mentor office hours.
- Ask technical questions in the #help desk channel, or sponsor questions in each sponsor's Help channel.
- Submit your project.
- Join the live results call.

**Discord** is the GenAI Works community space for community chat and activities after the hackathon.

### Step 1: Register and log in to HackOS

Complete your registration before **22 October, 23:45 UTC**, then log in to HackOS.

### Step 2: Complete your profile

- Confirm your name and details.
- Add your technical skills.
- Add your preferred track, if requested.
- If you plan to build alone, select **"happy to build solo"** in the registration form.

A complete profile helps others find you for team formation.

### Step 3: Review the resources

Recommended first reads:

1. **Welcome Guide** (this document)
2. **Challenge pages**
3. **Event calendar**
4. **Sponsor folders in Resources** (Zetaris, Meterless, Space XAI and Cursor, NVIDIA)
5. **Sponsor workshop recordings**
6. **Submission requirements**

### Step 4: Find your way around HackOS

| Area | Use For |
|---|---|
| **Announcements** | Official updates |
| **Resources** | Sponsor folders and workshop recordings |
| **Team-finding** | Finding teammates and creating teams |
| **Mentor office hours** | Getting help from mentors |
| **#help desk** | Technical questions, answered by the technical team |
| **Sponsor Help channels** | Help Zetaris, Help Meterless, Help Cursor, Help NVIDIA |
| **Results call** | Live announcement of winners |

### Step 5: Confirm how you will build

You may build:

- **Solo:** select "happy to build solo" in the registration form. Solo entries compete in the same pool as teams.
- **In a team you create:** create your team on HackOS and invite up to four teammates.
- **In a team you join:** use team-finding on HackOS.

Teams can have up to 5 builders, and a participant may belong to exactly one team. You can join, leave or merge teams freely until your first submission is created; team composition locks at that point.

Teams should agree internally on responsibilities, ownership of work, and how any outcomes are shared.

---

## 8. The Sponsor Technology: What You Need to Know

The Open Agent Hackathon is backed by **Space XAI (with Cursor)**, **NVIDIA**, **Zetaris**, and **Meterless**.

| Sponsor | Requirement |
|---|---|
| **Zetaris** | Required: every submission must integrate Zetaris |
| **Meterless** | Required: every submission must integrate Meterless |
| **Cursor (with Space XAI)** | Required: teams must use Cursor as their development environment |
| **NVIDIA** | Integrate wherever it contributes to your project, workflow or use case |

Each sponsor has a folder in Resources on HackOS with its documentation and resources. Resources are being updated as sponsors add material. For technical questions, use the #help desk channel or the sponsor's Help channel on HackOS.

You can use any language, framework, model or cloud, including closed-source APIs and sponsor credits. Pre-existing open-source libraries are fine. Generated code is allowed and expected; you own the result and are accountable for it.

### Security rule

Never commit API keys or credentials.

Do not place real keys in:

- Repository files
- `README.md`
- Notebooks
- Screenshots
- Logs
- `.env.example`

Keep secrets in a local `.env` file, add it to `.gitignore`, and include a `.env.example` with placeholder values only.

---

## 9. What You Need to Submit

Submissions close on **27 October 2026 at 23:45 UTC**. This is a hard deadline. Submit through HackOS.

| Component | Requirement |
|---|---|
| **Demo video** | 1–4 minutes, showing the main workflow, how the agent solves the selected challenge, its key features, and how Zetaris and Meterless are integrated |
| **Slide deck** | The problem and target users, the solution, the agent workflow or architecture, the technical stack, how Zetaris and Meterless were used, what was unique about your use of the sponsor technologies, product visuals, and future enhancements |
| **GitHub repository** | All source code and a README covering setup, usage and dependencies. If your agents run in Google Colab, include the Colab links |
| **Sponsor technology explanation** | How Zetaris and Meterless were integrated, how Cursor was used during development, where NVIDIA technology contributes, and what was unique about your use of the sponsor technologies |

Work committed before the build window opens is not eligible, except for clearly declared pre-existing components. Pre-existing product code must be declared in the submission form.

---

## 10. First 30 Minutes Checklist

Use this checklist as soon as you have access.

### Minutes 0–5: Access

- [ ] Log in to HackOS.
- [ ] Complete or verify your profile.
- [ ] Find the announcements area.
- [ ] Locate Resources.

### Minutes 5–10: Confirm your path

- [ ] Review the three tracks and the bonus track.
- [ ] Choose your track.
- [ ] Confirm whether you are building:
  - [ ] Solo
  - [ ] In a team you created
  - [ ] In a team you joined

### Minutes 10–15: Set up support

- [ ] Find the #help desk channel and the sponsor Help channels on HackOS.
- [ ] Find the mentor office hours schedule.

### Minutes 15–20: Sponsor technology

- [ ] Read the sponsor folders in Resources: Zetaris, Meterless, Space XAI and Cursor, and NVIDIA.
- [ ] Watch or bookmark the workshop recordings.
- [ ] Complete any required access or setup steps.

### Minutes 20–25: Build environment

- [ ] Create or clone your project repository.
- [ ] Set up Cursor for development.
- [ ] Confirm your local environment works.
- [ ] Add `.env` to `.gitignore`.
- [ ] Add `.env.example` with placeholder values only.

### Minutes 25–30: Plan your first prototype

- [ ] Define your agents and their roles.
- [ ] Write down how they will work together.
- [ ] Identify the feedback loop, retry path, or evaluator.
- [ ] Decide where Zetaris and Meterless fit, and where NVIDIA can contribute.
- [ ] Create your first test input.

At the end of your first 30 minutes, you should know:

- Which track you are targeting.
- Whether you are building solo or in a team.
- How the sponsor technology fits into your build.
- What agents you are building first.
- Where to ask for help.

---

## 11. Recommended Build Plan

The build window runs for 144 hours. Get a working end-to-end system early.

### Day 1: Scope and skeleton

- Confirm your track, user, and expected output.
- Choose the smallest useful version of the solution.
- Connect Zetaris and Meterless.
- Implement a basic working agent loop.

### Day 2–3: Agent behaviour

- Add evaluation, critique, or review steps.
- Add retries and branching.
- Add shared context or memory.
- Start logging agent activity.

### Day 4: Data and tools

- Add datasets, tools, and retrieval.
- Test failures and fallbacks.

### Day 5: Hardening

- Complete documentation and your README.
- Prepare your slide deck.
- Record your demo video (1–4 minutes).
- Test a clean setup from scratch.

### Day 6: Final checks and submission

- Complete all submission materials.
- Declare any pre-existing components.
- Check for committed secrets.
- Submit before 27 October, 23:45 UTC.

---

## 12. How You Will Be Evaluated

Submissions are reviewed by expert judges against the published criteria. Judging begins immediately after submissions close. Each submission is reviewed by at least three judges. Scoring is out of 100 points.

| Criterion | Points | What Judges Look For |
|---|---:|---|
| Impact | 30 | Consistency with the challenge statements: how effectively the solution addresses a meaningful real-world problem for its intended users |
| Technical | 20 | How well the solution is built, including its technical implementation, reliability and architecture |
| Innovation | 15 | How original or creative the approach to solving the problem is |
| Demo | 15 | How clearly the demo shows the solution, its functionality, and the value it provides to its intended users |
| Product & UX | 10 | How intuitive, accessible, and easy to use the product is for its intended users |
| Sponsor Tech | 10 | How effectively the solution uses the sponsors' technology to address the problem and enhance the overall product |
| **Total** | **100** | |

Ties are resolved on the Impact score, then on submission timestamp.

---

## 13. Where to Get Help

All support during the hackathon happens on HackOS.

| Need Help With | Go To |
|---|---|
| Track scope and expectations | Challenge pages on HackOS |
| Sponsor technology setup and errors | Sponsor folder in Resources, then that sponsor's Help channel |
| Technical questions | #help desk channel on HackOS |
| Agent design, framework issues, debugging | Mentor office hours |
| Rules questions | hackathons@genai.works (reply within one working day) |
| Finding teammates | Team-finding |
| Official updates | Announcements |

### Mentors

Mentors are available to help you understand the tracks, navigate HackOS and the sponsor technologies, answer basic technical and use-case questions, and help you get unstuck. Mentors will not build your project. Deeper technical issues with sponsor technology are escalated to that sponsor's support.

### When asking for help, include

- What you are trying to do.
- Your framework and stack.
- The error message or stack trace.
- A relevant code snippet.
- What you have already tried.

Do not post API keys or secrets anywhere.

---

## 14. Your Immediate Next Steps

Before the hackathon:

1. Read this guide fully.
2. Register before 22 October, 23:45 UTC.
3. Watch the Data Day recording and attend or watch the Build Day and Power Day workshops.
4. Review the three tracks and the bonus track.
5. Set up your HackOS profile.
6. Decide whether you will build solo or in a team.
7. Attend participant onboarding on 21 October, 12:00 UTC.

When the hackathon starts on 22 October:

1. Confirm your track and how you will build.
2. Set up Zetaris, Meterless and Cursor.
3. Build the smallest working version first.
4. Log agent activity from day one.
5. Keep checking HackOS for updates.

Join the GenAI Works community on Discord for community chat and post-event activities.

---

## 15. Final Reminder

The strongest submissions will not be the ones with the flashiest interface.

They will be the ones that show:

- A real problem.
- A working agent system.
- Good use of the sponsor technology.
- Reliable execution.
- Useful outputs.

**Welcome to the Open Agent Hackathon 2026.**