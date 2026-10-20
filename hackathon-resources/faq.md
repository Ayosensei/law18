# OPEN AGENT HACKATHON 2026 FAQ

**Build an agent that does real work**

Your first stop for questions about the schedule, teams, tracks, sponsor technology, submissions, judging and prizes.

> All times are **UTC**. Registration closes **22 October 2026, 23:45** and submissions close **27 October 2026, 23:45**. Where this FAQ and the Official Rules disagree, the Official Rules apply.

---

## Contents

- [1. Event Basics](#1-event-basics)
- [2. Schedule](#2-schedule)
- [3. Eligibility](#3-eligibility)
- [4. Teams](#4-teams)
- [5. Tracks](#5-tracks)
- [6. Models, Providers and Cost](#6-models-providers-and-cost)
- [7. Sponsor Technology](#7-sponsor-technology)
- [8. Frameworks and Tech Stack](#8-frameworks-and-tech-stack)
- [9. What Counts as a Strong Agent](#9-what-counts-as-a-strong-agent)
- [10. Data and Licensing](#10-data-and-licensing)
- [11. Technical Practice](#11-technical-practice)
- [12. Submission](#12-submission)
- [13. Demo Video](#13-demo-video)
- [14. Judging](#14-judging)
- [15. Prizes and Results](#15-prizes-and-results)
- [16. Support](#16-support)

---

## 1. Event Basics

### What is the Open Agent Hackathon?

A fully online global hackathon where builders create AI agents that do real work: agents that can access relevant information, understand context and relationships, reason across multiple steps, maintain useful context, and turn that understanding into a useful outcome.

It is not a prompt-writing competition and not a UI showcase. The strongest submissions show a working agent, a real problem, a clear user, and evidence of how the system reached its output.

### Who is it for?

Developers, researchers and builders worldwide, from students to senior engineers. You don't need to be an agent expert; you need to be able to ship something that runs.

### Is it online or in person?

Fully online. Everything during the event happens on HackOS.

### How long is it?

144 hours, from 22 October, 00:00 to 27 October, 23:45 UTC.

### What do I actually have to do?

1. Register before 22 October, 23:45 UTC
2. Pick one track
3. Build a working agent during the build window, integrating Zetaris and Meterless and developing in Cursor
4. Submit on HackOS before 27 October, 23:45 UTC

---

## 2. Schedule

| Milestone | Date (UTC) |
|---|---|
| Registration opens | 14 August, 00:00 |
| Data Day workshop (Zetaris) | 12 October — recording on HackOS |
| Build Day and Power Day workshops | Dates announced on HackOS |
| Participant onboarding | 21 October, 12:00–13:30 |
| Build window opens | 22 October, 00:00 |
| Registration closes | **22 October, 23:45** |
| Build window | 22–27 October |
| Submissions close | **27 October, 23:45** |
| Judging opens | 28 October, immediately after submissions close |
| Results announced | 6 November, 16:00 |

### What time zone is used?

UTC, everywhere, for everything.

### Are the deadlines really hard?

Yes. Registration closes at 22 October, 23:45 with no late entry, and submissions close at 27 October, 23:45. Submit early and update rather than submitting once at the last minute.

### What if I miss a workshop?

All workshops are recorded and published on HackOS. Watch them before the build window opens.

---

## 3. Eligibility

### Who can take part?

Anyone aged 16 or older at the start of the build window, anywhere in the world.

### Does it cost anything?

No. Registration, HackOS, workshops, mentor office hours and submission are free. You pay for any model API you choose to use, except where sponsor credits cover it.

### How do I register?

Sign up on hackathon.genai.works, then log in to HackOS and complete your profile.

### Can I create more than one account?

No. One account per participant. Duplicate accounts disqualify the whole team.

### Can organizer or sponsor employees take part?

Employees of the organizer and of judging sponsors may participate, but they are not eligible for cash prizes.

### Do I need previous agent-building experience?

No. You need to be able to build something that runs and explain how it works.

---

## 4. Teams

### Can I take part alone?

Yes. Select **"happy to build solo"** in the registration form. Solo entries compete in the same pool as teams.

### Can I register with a team already formed?

Yes.

### Can I find a team after registering?

Yes. Use team-finding on HackOS. Try to settle your team before the build window opens.

### What's the maximum team size?

Five.

### Can I be on two teams?

No. A participant may belong to exactly one team and appear on one submission. Mentors may advise any number of teams.

### Can we change the roster?

Yes, until your team's first submission is created. Before that, you may join, leave or merge teams freely. **Team composition locks once the first submission is created.**

### Does team size affect the prize?

No. Cash prizes are split equally among team members unless the team submits a different split in writing. Agree it **before** you submit.

### What if the team falls out?

Teams resolve their own internal matters: who does what, how decisions are made, credit, and how a prize is shared. Organizers help with platform and admin problems but don't adjudicate who contributed more. Agree the split on day one.

---

## 5. Tracks

### How many tracks are there?

Three challenge tracks plus one bonus track. Every submission selects exactly one primary track, which determines the judging panel and the prizes it competes for.

| # | Track | What You Build |
|---:|---|---|
| 1 | **Solving Fragmented Intelligence** | Demonstrate a clever ability to discover and work across fragmented data sources. |
| 2 | **The Agent That Can Explain Why** | Build agents that investigate complex questions across multiple data sources, connect findings, and produce evidence-backed answers or recommendations. |
| 3 | **Reasoning Architecture** | Demonstrate a novel ability to turn data, knowledge, memory, and reasoning into reliable decisions and actions. |
| Bonus | **Wildcard [Tinkerer]: Bring Your Own Project** | Bring an existing project, prototype or concept and extend it using Zetaris and Meterless. Judged on the same criteria as the other tracks and scored on the new work rather than prior development. |

Full challenge statements are on HackOS.

### Can I submit to more than one track?

No. Each submission selects exactly one primary track. Cross-track relevance is welcome but is not scored twice.

### Can I change track after starting?

Yes. You can change your track any time before the submission deadline from your team workspace.

### Which track is easiest?

None carries a difficulty rating. How ambitious you are matters far more than which track you pick. A focused solution that runs beats a broad one that doesn't.

### How do I pick?

Match the track to a problem you understand and data you can actually get. If you have several messy systems to work across, Solving Fragmented Intelligence fits. If your users need answers they can trust, The Agent That Can Explain Why fits. If you're turning data and memory into decisions and actions, Reasoning Architecture fits. If you already have a working project, Wildcard [Tinkerer] lets you extend it.

---

## 6. Models, Providers and Cost

### Which models can I use?

Any. Open choice, including closed-source models, paid APIs and sponsor credits.

### Is there a mandated provider?

No. But Zetaris and Meterless must be integrated in every submission, and NVIDIA technology should be used wherever it contributes.

### Who pays for the API calls?

You do, unless sponsor credits or free access cover it. Details are in each sponsor's folder in Resources on HackOS. Two practical consequences:

- **Check your limits and set a spend alert on day one.** Agent loops multiply token use fast, and an unbounded retry loop can burn a budget overnight.
- **Judges may not have your keys.** Ship a documented sample mode so someone can see the system work without your credentials.

### Can I run models locally?

Yes, but assume a judge has an ordinary machine without a GPU. Where your build uses NVIDIA technology, reach it through hosted or cloud access so a judge can run your project.

### How do I keep costs down?

Use a smaller model for routine steps and a larger one only where reasoning is hard. Cap agent rounds, cap retries, shorten prompts, cache repeated calls, and develop against sample mode rather than paying to test plumbing.

### Can I use AI coding assistants?

Yes. Cursor is the required development environment, and other assistants may be used alongside it. Generated code is allowed and expected, but you remain responsible for it: it must be reviewed, tested and understood by your team. Judges may ask how something works.

---

## 7. Sponsor Technology

### Who are the sponsors?

**Space XAI (with Cursor)**, **NVIDIA**, **Zetaris** and **Meterless**.

### What's required?

| Sponsor | Requirement | Workshop |
|---|---|---|
| **Zetaris** | Required: every submission must integrate Zetaris | Data Day: serving internal data |
| **Meterless** | Required: every submission must integrate Meterless | Build Day and Power Day: building faster; local and cloud provider |
| **Cursor (with Space XAI)** | Required: use Cursor as your development environment | Build Day: building with Cursor |
| **NVIDIA** | Integrate wherever it contributes to your project, workflow or use case | Power Day: cloud provider |

These requirements apply to every track, including Wildcard [Tinkerer].

### How is it scored?

**Sponsor Tech is worth 10 points**: how effectively your solution uses the sponsors' technology to address the problem and enhance the overall product. A sponsor bolted on at the end with no real role scores close to zero, and judges can tell.

### How do I get access?

Access instructions, setup steps and any credits are in each sponsor's folder in Resources on HackOS. Set everything up before 22 October.

### Where do I get help with a sponsor technology?

The sponsor's folder in Resources first, then that sponsor's Help channel on HackOS: Help Zetaris, Help Meterless, Help Cursor or Help NVIDIA.

### What if a sponsor service goes down during judging?

Put every sponsor call behind an adapter with a timeout and a fallback. A project that degrades gracefully still scores; one that crashes doesn't.

---

## 8. Frameworks and Tech Stack

### Which frameworks are allowed?

Any. LangGraph, CrewAI, AutoGen, the OpenAI Agent SDK, LangChain, LlamaIndex, or your own stack.

### Does the framework affect my score?

No. Judges evaluate agent behaviour, technical implementation, product quality, sponsor technology use and impact. The framework is a means.

### When would I use each?

- **LangGraph** — state-driven workflows, branching, planner/executor/evaluator loops, explicit control over state
- **CrewAI** — role-driven builds with specialist agents and delegation
- **AutoGen** — conversational multi-agent reasoning, debate, iterative refinement
- **OpenAI Agent SDK** — if your team already thinks in those abstractions
- **LangChain / LlamaIndex** — retrieval-heavy, document-heavy work
- **A custom stack** — Python, FastAPI, direct API calls, a trace log and a vector store is often enough, and easier to debug at 2am

### Can I build without a framework?

Yes, and plenty of strong submissions do. Fewer moving parts means fewer things breaking on submission day.

---

## 9. What Counts as a Strong Agent

### How many agents do I need?

There's no fixed minimum. What matters is that the system does real work and you can show how. Quality of interaction beats number of agents; three that genuinely collaborate beat six that don't.

### What counts as an agent?

Something with a defined role, a decision boundary, access to context or tools, the ability to produce or transform output, and real interaction with other agents or shared state. Not a prompt with a label.

### What does strong look like?

- Tasks delegated dynamically based on context
- Agents that critique or validate outputs
- Planner ↔ executor ↔ evaluator loops
- Shared memory or context carried across steps
- Branching, retries, escalation
- Recovery from errors
- Traces showing how it got there

### What's weak?

- A fixed chain: A → B → C, no feedback
- Agents that are prompt wrappers
- No critique or validation anywhere
- One agent with several labels
- Hardcoded outputs

### Do I need logs?

Yes, in practice. Logs are how a judge verifies your agent did the work rather than took one long prompt. Add trace logging on day one; retrofitting it on day six is how teams lose Technical points.

### What should a trace line look like?

```json
{
  "timestamp": "2026-10-24T10:15:30Z",
  "agent_name": "ReconcilerAgent",
  "action": "merge_records",
  "input_summary": "Records from 3 supplier sources, queried through Zetaris",
  "output_summary": "Merged 240 records; 3 conflicts unresolved",
  "target_agent": "ConflictCritic",
  "confidence": 0.84,
  "retry_count": 0,
  "status": "success"
}
```

### Can I write the logs by hand?

No. Fabricated traces are a disqualification risk, not a shortcut. A trace that doesn't match the code is worse than no trace.

---

## 10. Data and Licensing

### Can I use external datasets?

Yes: public datasets and public APIs with appropriate licences.

### Can I use private or proprietary data?

No, unless you're authorised to and it's legally permitted. Avoid real personal, clinical, financial or confidential records. When in doubt, use open or synthetic data.

### How big can my repository be?

Keep it light. Use small samples rather than full datasets. A judge cloning a multi-gigabyte repository is a judge who moves on.

### What are my options?

**Static data in the repo** — small curated samples, sources documented.
**A download script** — fully automated, no login, no manual clicks.
**Runtime public APIs** — with timeouts, retries and a fallback.

### Do I need a sample mode?

Strongly recommended. `SAMPLE_MODE=true` running on cached data with no external calls is what lets a judge without your credentials see the system work.

### Can I use synthetic data?

Yes, especially for sensitive domains. Say so in the README.

### What if I prepared data before the build window?

Declare it as a pre-existing component in the submission form.

### What about regulated domains?

If your use case touches health, finance, law or security, include caveats and safety boundaries. Don't present outputs as a diagnosis, investment advice or legal advice. Cybersecurity builds should focus on detection and response, not exploitation.

---

## 11. Technical Practice

### What should my project do technically?

Recommended practice:

- Runs from a clean clone with a documented command
- Can be driven programmatically, not only through a UI
- Installs dependencies at build or setup time, never during a run
- Runs on an ordinary machine without a local GPU
- Finishes in minutes, with timeouts and capped loops
- Loads secrets from environment variables
- Writes logs to stdout and `logs/`

### Should I use Docker?

It's strongly recommended. It's the most reliable way to make sure a judge gets the same result you do.

### Can I include a UI?

Yes, and Product & UX is worth 10 points. But give judges a way to run the agent without clicking through screens. A polished interface over a weak system scores badly.

### How long should a run take?

Aim for 5 to 10 minutes or less. A run that takes an hour is hard to demo, hard to judge and more likely to fail.

### Can dependencies install at runtime?

No. Install at build time.

### What should happen when something fails?

Fail gracefully: timeouts, capped retries with backoff, fallback to sample data, a clear error, and logs showing the failure and the recovery. Reliability is part of the Technical score.

---

## 12. Submission

### Where do I submit?

On HackOS, before 27 October, 23:45 UTC.

### What do I submit?

| Component | Requirement |
|---|---|
| **Demo video** | 1–4 minutes, showing the main workflow, how the agent solves the selected challenge, its key features, and how Zetaris and Meterless are integrated |
| **Slide deck** | The problem and target users, the solution, the agent workflow or architecture, the technical stack, how Zetaris and Meterless were used, what was unique about your use of the sponsor technologies, product visuals, and future enhancements |
| **GitHub repository** | Public, with all source code and a README covering setup, usage and dependencies. If your agents run in Google Colab, include the Colab links |
| **Sponsor technology explanation** | How Zetaris and Meterless were integrated, how Cursor was used during development, where NVIDIA technology contributes, and what was unique about your use of the sponsor technologies |

You also declare any pre-existing components in the submission form.

### Does my repository have to be public?

Yes, so judges can open it without requesting access.

### Can I use code I wrote before the hackathon?

Work committed before the build window opens is not eligible, except for clearly declared pre-existing components. Pre-existing open-source libraries are fine. Wildcard [Tinkerer] is designed for existing projects, and only the new work is scored.

### Can I update my submission?

Yes, up to the deadline. Remember your team locks when the first submission is created.

### Can I submit a notebook?

A notebook is fine as explanation, and Colab links can go in your README, but the project needs to run as a system, not only as cells someone steps through.

### Can I submit a UI-only project?

It would be hard to judge. Give judges something they can run.

### Can I hardcode the demo output?

No. Hardcoded outputs are a disqualification risk. The default mode must run real agent logic.

### What are the most common ways teams lose points?

A judge can't run it, the repository is private, the traces don't exist, the README claims more than the code does, secrets are committed, Zetaris or Meterless is decorative, or the project only works on the author's laptop.

---

## 13. Demo Video

### Is it required?

Yes, and Demo is worth **15 points**.

### How long?

1 to 4 minutes.

### What should it cover?

| Segment | Time | Show |
|---|---:|---|
| Problem | 15–25s | The track, the user and the problem |
| Solution | 20–30s | What your agent does |
| Agents | 30–45s | The roles and how they interact |
| Live run | 45–60s | The main workflow actually running |
| Sponsor technology | 20–30s | How Zetaris and Meterless are integrated |
| Output | 30–45s | The result, and why it's useful |

### Does it have to be live?

No, recorded is fine. The input and output must be real.

### Can I use sample data?

Yes, label it clearly.

### Should I focus on the interface?

No. Show the agent working. A video of only slides doesn't demonstrate a working system, and a video of only screens doesn't demonstrate an agent.

---

## 14. Judging

### How does it work?

Judging opens on 28 October, immediately after submissions close. Expert judges review submissions against the published criteria, and each submission is reviewed by at least three judges. Wildcard [Tinkerer] is scored on the new work rather than prior development.

### What's the scoring?

| Criterion | Points | What Judges Look For |
|---|---:|---|
| **Impact** | 30 | Consistency with the challenge statements: how effectively the solution addresses a meaningful real-world problem for its intended users |
| **Technical** | 20 | How well the solution is built, including its technical implementation, reliability and architecture |
| **Innovation** | 15 | How original or creative the approach to solving the problem is |
| **Demo** | 15 | How clearly the demo shows the solution, its functionality, and the value it provides to its intended users |
| **Product & UX** | 10 | How intuitive, accessible, and easy to use the product is for its intended users |
| **Sponsor Tech** | 10 | How effectively the solution uses the sponsors' technology to address the problem and enhance the overall product |
| **Total** | **100** | |

### What happens in a tie?

Ties are resolved on the **Impact** score, then on submission timestamp.

### What do judges reward?

Agents that act rather than describe, a clear problem and user, critique and recovery instead of a fixed pipeline, reliable execution, sponsor technology that's load-bearing, an output someone could actually use, and a demo that explains itself.

### What do they discount?

UI polish without depth, single-agent systems presented as more, hardcoded demo paths, broad concepts with weak implementation, and overclaiming.

### Will judges test with their own inputs?

Possibly. Your project should handle reasonable unseen inputs for your track, not just the three you shipped.

### Do I get feedback?

Yes. Participants receive feedback on their submissions.

### Are decisions final?

Yes, on eligibility, disqualification, scoring and winner selection.

---

## 15. Prizes and Results

### What's the prize?

A prize pool of **up to $20,000**: **$15,000 in cash prizes** and **$5,000 in in-kind rewards**, with a feature in the community showcase for the top project.

| Track | 1st | 2nd | 3rd |
|---|---:|---:|---:|
| Solving Fragmented Intelligence | $2,000 | $1,350 | $1,000 |
| The Agent That Can Explain Why | $2,000 | $1,350 | $1,000 |
| Reasoning Architecture | $2,000 | $1,300 | $1,000 |
| Wildcard [Tinkerer] | $1,000 | $600 | $400 |

### How is a team prize split?

Equally among team members, unless the team submits a different split in writing.

### Does team size change the prize?

No.

### When are winners announced?

6 November, 16:00 UTC, on the live results call on HackOS. Winners receive certificates.

### How and when do prizes get paid?

Cash prizes are paid by bank transfer within 30 days of the results announcement. Taxes and any local charges are the recipient's responsibility.

### Who owns what I built?

You do. You keep all rights to what you build, and nothing transfers ownership to the organizer or sponsors. By submitting, you grant the organizer a licence to show your demo, screenshots and description in event coverage. Sponsor-track submissions grant that sponsor the same non-exclusive promotional licence.

### Is there an incubation or deployment pathway?

No formal pathway runs after this event. What continues is the community: the showcase, future hackathons and workshops on Discord.

---

## 16. Support

### Where do I ask questions?

Everything during the event is on HackOS.

| Need | Where |
|---|---|
| Track scope and expectations | Challenge pages on HackOS |
| General technical questions | #help desk channel |
| Sponsor setup and errors | Sponsor folder in Resources, then that sponsor's Help channel (Help Zetaris, Help Meterless, Help Cursor, Help NVIDIA) |
| Agent design, frameworks, debugging | Mentor office hours |
| Rules questions | Official Rules, or hackathons@genai.works |
| Finding teammates | Team-finding |
| Official updates | Announcements, check daily |
| Your own model provider's errors | Your provider's support |

### What is Discord for?

Community activity after the hackathon: showcases, future events, workshops, staying in touch.

### What do mentors do?

They help you understand the tracks, navigate HackOS and the sponsor technologies, answer technical and use-case questions, and get you unstuck. They don't build your project, and they can't debug your provider account for you.

### How do I get a fast answer?

Include: what you're trying to do, what you expected, what happened, the exact error, your framework and provider, whether it fails locally or in Docker, and what you already tried. That last one saves the most time.

Good:

> "LangGraph with Meterless. Works locally, fails in Docker with a 401. Key is passed as an environment variable and a minimal SDK call works. Sanitised error below. Any ideas?"

Not useful:

> "Nothing works. Please fix."

### What if my provider key doesn't work?

1. Check the environment variable actually reaches the process, in Docker as well as locally
2. Check the base URL character by character, and that the key, address and model ID are all from the same route
3. Run a minimal SDK call outside your framework

If the minimal call works and your framework doesn't, that's a configuration problem and mentors can help. If the minimal call fails on Meterless or NVIDIA, ask in that sponsor's Help channel.

### What if I accidentally commit a key?

**Rotate it immediately.** Then remove it from the repository history and tell a moderator. Deleting the commit is not enough on its own.

### What if my issue is sensitive?

Exposed credentials, personal data, a security concern or a safety issue: don't post details publicly. Email hackathons@genai.works or ask a moderator for a private route, and rotate anything exposed while you wait.

### Final checklist before submitting

- [ ] Picked one track and built for it
- [ ] Zetaris and Meterless integrated; developed in Cursor
- [ ] Runs from a clean clone with a documented command
- [ ] Repository is public
- [ ] A judge can drive it without your UI
- [ ] `.env.example` present, no real keys
- [ ] Sample mode works with no credentials
- [ ] At least 3 sample inputs and matching outputs
- [ ] Logs show real agent interaction
- [ ] No secrets committed anywhere
- [ ] README covers setup, usage and dependencies
- [ ] Demo video 1–4 minutes
- [ ] Slide deck complete
- [ ] Sponsor technology explanation written
- [ ] Pre-existing components declared
- [ ] Team roster correct before the first submission
- [ ] Submitted before 27 October, 23:45 UTC

---

## Final Reminder

| Focus on | Avoid |
|---|---|
| Systems | Prompt-only demos |
| Agents that act and recover | Fixed chains |
| A real problem and a real user | Novelty without usefulness |
| Working execution | Slides without code |
| Sponsor technology that earns its place | Decorative integrations |
| Honest logs | Unverifiable claims |
| Reproducibility | "Works on my machine" |

Build something that runs, explains itself, recovers when something breaks, and hands back something useful.