# Law18 — Master Project Specification & Architecture
**Open Agent Hackathon 2026 | Track 2: The Agent That Can Explain Why**

---

## 1. Project Concept & Pitch

* **Name**: **Law18**  
* **Etymology & Philosophy**: The International Football Association Board (IFAB) codified Laws 1 through 17 to govern physical match play. However, modern elite football is paralyzed by subjective officiating variance and erratic VAR intervention thresholds. **Law 18 represents the missing cognitive law: the autonomous law of consistency, codified precedent, and evidence-backed explanation.**
* **The Mission**: Modern officiating suffers from catastrophic inconsistency across match fixtures, referee crews, and competitions (Premier League, LaLiga, Serie A, UEFA Champions League). A handball or high boot penalized on Tuesday is waved away on Wednesday. Law18 solves this by introducing an autonomous multi-agent review chamber that cross-references live match telemetry against codified IFAB statutes and multi-season international precedents via **Zetaris** and **Meterless**.
* **Target Audience**:
  * **Primary (B2B / Regulatory)**: League Officiating Boards (PGMOL, UEFA Referees Committee, Key Match Incident Panels) and Club Sporting Directors / Legal Teams preparing formal appeals.
  * **Secondary (Broadcast & Fans)**: Television match center analysts, stadium screen operators, and global football supporters who demand transparency over opaque refereeing calls.
* **$0.00 Cost Guarantee**: Every component in this project (LangGraph, Next.js, Meterless local engines, Zetaris Hackathon Tier, NVIDIA Nemotron credits, Cursor) is 100% open-source or free-tier.

---

## 2. Benchmark Case Study: The 2026 UCL Quarter-Final Tie Audit

To ensure the system is deeply grounded and immediately verifiable by hackathon judges, Law18 audits the high-stakes, two-legged **2026 UEFA Champions League Quarter-Final tie between FC Barcelona and Atlético Madrid**.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ CASE STUDY 01: UEFA CHAMPIONS LEAGUE QUARTER-FINAL TIE AUDIT                          │
│ Leg 1 (Camp Nou): Barcelona 0 – 1 Atlético Madrid (Referee: István Kovács)            │
│ Leg 2 (Metropolitano): Atlético Madrid 3 – 2 Barcelona Agg (Referee: Clément Turpin)  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Incident A: The Marc Pubill / Juan Musso Goal-Kick Handball (Leg 1 — 54th Minute)
* **Match Context**: Camp Nou (April 8, 2026). Barcelona trailing 0–1 and attacking relentlessly.
* **The Action**: Atlético goalkeeper Juan Musso took a short, low goal kick inside the penalty box, passing to defender Marc Pubill (who was already on a yellow card from 45+1'). Pubill stopped, bent down, and deliberately picked up the live ball with his hands inside the box to reposition it.
* **The On-Field Call & VAR Stance**: István Kovács waved play on without awarding a penalty. The VAR room (Marco Di Bello) failed to intervene or recommend an on-field monitor review.
* **The Official Aftermath**: Barcelona lodged a formal protest with UEFA. While initially rejected on technical procedural grounds, UEFA subsequently dropped Kovács from officiating for the remainder of the tournament, and in August 2026 issued a strict global directive confirming a penalty kick and second yellow card were mandatory.
* **The Direct International Precedent**:
  * **The Tyrone Mings Incident (Club Brugge vs. Aston Villa, UEFA Champions League — Nov 6, 2024)**:
    * *What Happened*: Goalkeeper Emi Martínez played a short restart from a goal kick inside the 6-yard box to center-back Tyrone Mings. Mings, unaware the kick had already been taken, picked up the live ball with his left hand to retake it.
    * *The Ruling*: German referee Tobias Stieler strictly applied IFAB Law 16.1 (*"The ball is in play when it is kicked and clearly moves"*) and IFAB Law 12.1 (*"Handball offense"*), awarding a penalty kick to Club Brugge. Hans Vanaken scored, and Villa lost 1–0.
    * *Precedent Similarity*: **0.98 Match**. The Pubill non-call is an indefensible breach of established Champions League precedent.
  * **Secondary Precedent**: Gabriel Magalhães (Arsenal vs. Bayern Munich, UCL April 9, 2024) where referee Glenn Nyberg informally excused a similar pickup as a "kid's mistake", sparking worldwide outrage and prompting UEFA's revised guidance.
* **Law18 Consistency Verdict**: **CLEAR & OBVIOUS BLUNDER (8% Consistency Rating)**. Penalty kick + Second Yellow Card mandatory.

---

### Incident B: The Fermín López / Juan Musso High-Boot Collision (Leg 2 — 29th Minute)
* **Match Context**: Metropolitano (April 14, 2026). Barcelona leading 2–0 on the night (leveling the aggregate at 2–2 via Yamal 3' and Ferran Torres 23') and surging to take the lead.
* **The Action**: Fermín López rose to head a cross toward goal. Goalkeeper Juan Musso rushed out with his boot raised at head height, catching Fermín flush in the face and mouth with his studs. Blood poured from López’s mouth and nose, requiring extensive pitchside treatment and a post-match emergency hospital visit.
* **The On-Field Call & VAR Stance**: Clément Turpin awarded neither a foul, penalty, nor card, deeming it a "natural momentum collision". Two minutes later (31'), while Barcelona was destabilized, Ademola Lookman scored to make it 2–1 on the night (3–2 agg).
* **The Direct International Precedent**:
  * **Sadio Mané vs. Ederson (Man City vs. Liverpool, Sept 2017)**: Mané challenged for an aerial ball with a high boot, catching Ederson in the head. Straight red card for Serious Foul Play. IFAB established that intent is legally subordinate to endangering player safety.
  * **Jordan Pickford vs. Virgil van Dijk (Everton vs. Liverpool, Oct 2020)**: Knee-high reckless lunge by a goalkeeper. Officiating authorities subsequently confirmed that offside/phases do not negate disciplinary red cards for dangerous challenges.
* **Law18 Consistency Verdict**: **SEVERE OFFICIATING ERROR (14% Consistency Rating)**. Mandatory Penalty Kick + Red/Yellow Card for Serious Foul Play under IFAB Law 12.3.

---

### Incident C: The Eric García / Alexander Sørloth DOGSO Red Card (Leg 2 — 79th Minute)
* **Match Context**: Metropolitano (April 14, 2026). Barcelona leading 2–1 on the night (2–3 on aggregate), chasing an equalizer in the final 10 minutes.
* **The Action**: Pedri lost possession after a spin in midfield. Alexander Sørloth broke on a counter-attack. Eric García made minimal contact (slight arm contact / clipping of heels). Sørloth went down.
* **The On-Field Call & VAR Stance**: Turpin initially allowed play to continue, but was called to the pitchside monitor by VAR. After a tense review, Turpin issued a straight red card for Denial of an Obvious Goal-Scoring Opportunity (DOGSO).
* **The Direct International Precedent**:
  * **David Luiz vs. Wolves (Arsenal vs. Wolves, Feb 2021)**: Accidental knee-on-heel clipping on a running forward outside the penalty area resulting in a contested red card.
* **The Nuance Analyzed by Law18**:
  * The 4 DOGSO Criteria (IFAB Law 12.3):
    1. Distance between the offense and the goal ($\approx 32\text{m}$).
    2. General direction of play (Toward goal).
    3. Likelihood of keeping or gaining control of the ball (Contested; heavy touch toward goalkeeper).
    4. Location and number of defenders (Jules Koundé covering within recovery angle).
* **Law18 Consistency Verdict**: **MARGINAL / INCONSISTENT DISCIPLINE (42% Consistency Rating)**. VAR intervention breached the "Clear and Obvious" bar due to covering defender trajectory and forward's heavy touch.

---

## 3. Detailed Data Contract & Schemas

The TypeScript and Python schemas are strictly aligned between Sensei and DuroT:

```typescript
export interface IncidentTelemetry {
  incidentId: string;
  matchId: string;
  minute: number;
  incidentType: "HANDBALL" | "SERIOUS_FOUL_PLAY" | "DOGSO";
  playerInvolved: {
    name: string;
    team: string;
    position: string;
    priorDisciplinaryStatus: "CLEAN" | "YELLOW_CARD" | "RED_CARD";
  };
  opponentPlayer: {
    name: string;
    team: string;
    position: string;
  };
  physicalContext: {
    ballState: "LIVE_IN_PLAY" | "DEAD_BALL_RESTART";
    priorAction: string; // e.g., "GOAL_KICK_PASS_BY_MUSSO"
    contactPoint: string; // e.g., "HAND_PICKUP", "STUDS_TO_FACE"
    contactHeightMeters?: number; // e.g., 1.55m
    forceRating?: "MINIMAL" | "RECKLESS" | "EXCESSIVE";
    injuryOccurred: boolean;
    medicalStoppageMinutes?: number;
  };
  onFieldDecision: {
    ruling: "NO_FOUL" | "FREE_KICK" | "PENALTY" | "YELLOW_CARD" | "RED_CARD";
    referee: string;
    hasClearSightline: boolean;
  };
  varAction: {
    interventionRecommended: boolean;
    monitorReviewConducted: boolean;
    varOfficial: string;
    reasonGiven?: string;
  };
}

export interface Law18AuditResult {
  runId: string;
  incidentId: string;
  consistencyScore: number; // 0 to 100
  verdict: "CORRECT_CALL" | "CLEAR_AND_OBVIOUS_BLUNDER" | "SEVERE_OFFICIATING_ERROR" | "MARGINAL_INCONSISTENCY";
  summary: string;
  
  // Adversarial Debate Transcript
  deliberation: {
    varAdvocateDefense: string;
    rulesAuditorProsecution: string;
    evaluatorSynthesis: string;
    rebuttalTurns: number;
  };
  
  // Zetaris-Retrieved Legal Backing
  statutes: {
    lawNumber: number;
    subClause: string;
    fullText: string;
    regulatoryImpact: string;
  }[];
  
  // Historical Precedent Comparison
  precedents: {
    fixture: string;
    date: string;
    competition: string;
    ruling: string;
    similarityScore: number; // 0.0 to 1.0
    precedentDifference: string;
  }[];
  
  // Dual Outputs
  dualOutputs: {
    b2bAuditDossier: string; // Formatted Markdown Dossier
    publicMatchCenterCard: {
      headline: string;
      badgeText: string;
      badgeColor: "emerald" | "amber" | "crimson";
      bullets: [string, string, string];
      precedentCitation: string;
    };
  };
  
  // Traceability & Reproducibility
  traceId: string;
  traceFilePath: string;
  executionTimeMs: number;
}
```

---

## 4. Sponsor Technology Architecture

### 1. Zetaris (Federated Officiating Data Fabric)
* **Problem Solved**: Officiating data lives in disconnected silos: regulatory text (IFAB PDFs), relational season records (PostgreSQL/SQLite), and active match event feeds (JSON). Traditional pipelines require fragile ETL.
* **Zetaris Solution**: Zetaris mounts these data sources as a unified virtual schema.
  * `ifab_laws` (Virtual table representing the IFAB Statutes).
  * `season_precedents` (Virtual table indexing 50+ controversial UEFA/PL decisions).
  * `match_telemetry` (Virtual table exposing incoming incident payloads).
* **Fallback Guarantee**: Includes `SAMPLE_MODE=true` using a local SQLite/Mock client (`zetaris_client.py`) so judges can test instantly without network or credential dependencies.

### 2. Meterless (Local Cognition & Memory Engine)
* **Problem Solved**: Standard LLMs forget referee behavioral contexts and suffer from context token explosion when reasoning through multi-step incident checklists.
* **Meterless Solution**:
  * **H-MEM (Hierarchical Memory)**: Stores persistent behavioral profiles for top referees (István Kovács, Clément Turpin, Tobias Stieler) and seasonal refereeing circulars.
  * **World Model**: Holds the spatial, temporal, and physical pitch state (ball trajectory vectors, penalty box boundaries, player contact points).
  * **Markovian Engine**: Drives the bounded 4-step VAR checklist (Phase of Play $\to$ Contact Point $\to$ Force/Silhouette $\to$ Clear & Obvious Threshold) with $O(1)$ token carryover per reasoning node.

### 3. NVIDIA Nemotron
* **Role**: Powers the adversarial legal debates between `VARAdvocateAgent` and `RulesAuditorAgent`, ensuring deep statutory interpretation and counter-factual analysis.

### 4. Cursor (Development Hub)
* **Role**: The core IDE and agentic workspace for Sensei and DuroT. Custom `.cursorrules` enforce TypeScript types and Python Pydantic models across the codebase.

---

## 5. Associated Documentation Directory

* 📄 **[AGENTS.md](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/AGENTS.md)**: Deep specification of every agent, prompt templates, decision trees, and LangGraph state nodes.
* 🎨 **[DESIGN.md](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/DESIGN.md)**: Full design system, color tokens, Sofascore/FotMob component hierarchy, wireframes, and animations.
* 🤝 **[TEAM_WORKFLOW.md](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TEAM_WORKFLOW.md)**: Team operating rules, decoupling strategy, and milestone roadmap.
* 👨‍💻 **[TASKS_SENSEI.md](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TASKS_SENSEI.md)**: Sensei's detailed task playbook.
* 👨‍💻 **[TASKS_DUROT.md](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TASKS_DUROT.md)**: DuroT's detailed task playbook.
