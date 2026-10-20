# Law18 — UI/UX Design System & Specification
**Philosophy: Pure Sports Telemetry & Officiating Authority. Zero AI Slop.**

> *"If it looks like a ChatGPT wrapper or an NFT dashboard, it has failed. It must look like Hawk-Eye, Opta, and UEFA VAR match operations built a mission-critical tool for sporting directors."*

---

## 1. The "Zero AI Slop" Manifesto

In sports analytics and high-stakes arbitration, credibility is everything. Most AI products fail because they look like toys: glowing purple gradients, floating cards, vague chatbot speech bubbles, and cheesy robotic copy.

### The Strict Banned List:
1. **NO Generic AI Gradients**: Banned across all buttons, cards, text, and backgrounds (`linear-gradient(to right, #8B5CF6, #EC4899)`, purple-to-indigo, neon glow halos).
2. **NO Chatbot Conversational Interfaces**: No centered chat inputs, no "How can I help you today referee?", no avatar heads with smiling robots.
3. **NO AI Buzzword Slop**: The copy must strictly reflect official IFAB, UEFA, and PGMOL terminology.
   * **BANNED**: *"Empowering football with cognitive AI synergy"*, *"Our intelligent model thinks..."*, *"AI-generated insight"*, *"Delve"*, *"Unleash"*, *"Magic"*.
   * **MANDATORY**: *"Key Match Incident (KMI)"*, *"Precedent Deviation Index (PDI)"*, *"IFAB Law 12.1 Compliance Check"*, *"Clear & Obvious Threshold"*, *"Spatial Telemetry Vector"*, *"Adversarial Deliberation Protocol"*, *"Historical Anchor Match"*.
4. **NO Low-Density Spacing**: Avoid massive 64px padding and sparse empty cards. Follow high-density sports UI like Sofascore, FotMob, and Bloomberg Terminal: compact typography, tabular numbers, precise borders, and information-dense grids.

---

## 2. Aesthetic Anchor & Moodboard

* **Aesthetic**: Technical, institutional, broadcast-grade sports telemetry.
* **Primary Visual References**:
  * **FotMob & Sofascore**: Compact match headers, stat bars, live event timelines, clean player ratings.
  * **Hawk-Eye Innovations & Piero Sports Graphics**: Vector pitch lines, player limb angle annotations, millimeter measurement calipers.
  * **UEFA VAR Control Room Monitor**: Crisp black/zinc surfaces, amber/crimson/emerald status lamps, high-contrast timestamps, audio-waveform transcripts.

---

## 3. Color Palette & Design Tokens

Every color in Law18 has an exact functional meaning derived from football refereeing (pitch grass, referee cards, pitchside monitor states).

### 3.1 Surface & Neutral Tokens (Dark Mode First)
We use cold technical slates and deep stadium charcoal—never muddy grays or purple-tinted blacks.

| Token | Hex | Tailwind Utility | Purpose |
|---|---|---|---|
| `bg-stadium-pitch` | `#080A0E` | `bg-[#080A0E]` | Base canvas / global app background |
| `bg-panel-base` | `#0F141C` | `bg-[#0F141C]` | Main panel / card surface |
| `bg-panel-elevated` | `#161C26` | `bg-[#161C26]` | Hover states, active tabs, modal surfaces |
| `bg-panel-subtle` | `#1D2433` | `bg-[#1D2433]` | Table row alternate, telemetry box background |
| `border-technical` | `#263043` | `border-[#263043]` | Default 1px structural container borders |
| `border-technical-strong` | `#3B4863` | `border-[#3B4863]` | Active container, focused input, highlighted section |

### 3.2 Typography Tokens
| Token | Hex | Purpose |
|---|---|---|
| `text-display-white` | `#F8FAFC` | Primary metrics, match titles, key verdicts (`text-slate-50`) |
| `text-telemetry-primary` | `#E2E8F0` | Telemetry readouts, agent claims, statutory text (`text-slate-200`) |
| `text-telemetry-secondary` | `#94A3B8` | Metadata, timestamps, referee names, pitch dimensions (`text-slate-400`) |
| `text-telemetry-muted` | `#64748B` | Table headers, deactivated tabs, coordinates axis (`text-slate-500`) |

### 3.3 Functional Officiating Signals
Colors represent real football match decisions:

| Signal | Hex | Usage in UI |
|---|---|---|
| **Pitch Grass Green** | `#10B981` | Law Compliance, Precedent Match, Low Deviation (<15%), Confirmed Correct Call |
| **Yellow Card Amber** | `#F59E0B` | Under Deliberation, Caution Offence, Moderate Deviation (15%–40%), Subjective Threshold |
| **Red Card Crimson** | `#EF4444` | Precedent Violation, High Deviation (>40%), DOGSO, Serious Foul Play, Reversed Call |
| **VAR Cyan / Monitor Blue**| `#0284C7` | Active On-Field Review (OFR), Telemetry Tracking vectors, Hawk-Eye measure lines |
| **Precedent Gold** | `#EAB308` | Historical Precedent Anchor citation, IFAB Rule clause callout |

---

## 4. Typography Specification

To prevent any generic feel, typography is strictly divided into **Technical Data Font** and **Institutional Editorial Font**.

1. **Telemetry & Numbers**: `JetBrains Mono` or `Geist Mono`
   * *Used for*: Timestamps (`54:12`), Spatial Coordinates (`x: 88.4m, y: 14.2m`), Deviation Indices (`92.4%`), Law Clauses (`Law 12.1.b`), Velocity (`8.2 m/s`).
   * *Style*: Tabular figures enabled (`font-mono tabular-nums tracking-tight`).
2. **Interface & Narrative**: `Inter` or `Geist Sans`
   * *Used for*: Match titles, team names, agent arguments, statutory summaries, dossier copy.
   * *Style*: Clean, neutral sans-serif with geometric precision (`tracking-[-0.01em]`).

---

## 5. UI Layout & Component Anatomy

The application layout follows a 3-column / stacked telemetry command-center layout:

```
+----------------------------------------------------------------------------------------------------+
| TOPBAR: Match Status Strip | Incident Selector (Dropdown) | PDI Metric Badge | Export Dossier Button |
+----------------------------------------------------+-----------------------------------------------+
| LEFT PANEL (45% Width): INCIDENT TELEMETRY          | RIGHT PANEL (55% Width): COGNITION & AUDIT    |
|                                                    |                                               |
| 1. Match Header & On-Field Decision Context        | 1. Live Multi-Agent Deliberation Chamber      |
|    - Fixture: FC Barcelona vs Atlético Madrid      |    - Real-time turn-based debate transcript   |
|    - Minute: 54' | Referee: István Kovács          |    - [VAR Advocate] vs [Rules Auditor]        |
|    - Call: No Penalty / No Review                  |    - Zetaris Precedent query citations        |
|                                                    |                                               |
| 2. 2D Interactive Pitch Telemetry Canvas           | 2. Consistency Evaluator Summary              |
|    - Top-down vector pitch view                    |    - Precedent Deviation Index (PDI) gauge    |
|    - Ball velocity & trajectory vector             |    - Referee Kovács Leniency Bias meter       |
|    - Player spatial positions & contact point      |                                               |
|    - Limb angle caliper (108° unnatural silhouette)| 3. Dual Output Tabs:                          |
|                                                    |    [Tab A: B2B Regulatory Appeal Dossier]     |
| 3. Historical Precedent Comparison Card             |    [Tab B: Broadcast Transparency Card]       |
|    - Target: Pubill Goal-Kick Handing (2026)       |                                               |
|    - Anchor: Tyrone Mings Handball (Villa vs Brugge)|                                              |
|    - Rule: IFAB Law 12.1 Para 3                    |                                               |
+----------------------------------------------------+-----------------------------------------------+
| BOTTOM DOCK: System Diagnostics | Zetaris Virtual SQL Trace | Meterless Memory State | API Latency |
+----------------------------------------------------------------------------------------------------+
```

---

## 6. Detailed Component Specifications

### 6.1 Topbar (Command Header)
* **Height**: `56px` (`h-14`)
* **Background**: `bg-[#0F141C]` with `border-b border-[#263043]`
* **Elements**:
  * **Brand**: `LAW 18` in bold monospace (`font-mono tracking-widest text-slate-100 font-bold`) followed by a discreet badge: `OFFICIATING CONSISTENCY ENGINE`.
  * **Incident Selector**: Dropdown showing the 3 core benchmark cases:
    1. `54' UCL: Marc Pubill Goal-Kick Handball (FCB vs ATM)`
    2. `29' UCL: Fermín López High-Boot Head Contact (FCB vs ATM)`
    3. `79' UCL: Eric García DOGSO Red Card (FCB vs ATM)`
  * **Live Engine Status Lamp**: Glowing dot with tabular text (`METERLESS: ACTIVE | ZETARIS: FEDERATED | NEMOTRON: READY`).
  * **Export Action**: High-contrast button: `Generate Formal Appeal Dossier (PDF/JSON)`.

### 6.2 2D Pitch & Spatial Vector Visualizer
* **Container**: `bg-[#080A0E]` surrounded by a crisp `border border-[#263043] rounded-lg`.
* **Pitch Surface**: Dark tactical turf (`#0C131D`) with subtle pitch markings (`#1E293B`) at official 105m x 68m proportions.
* **Telemetry Visuals**:
  * **Ball Trajectory**: Cyan vector line (`#0284C7`) with dashed motion trail and direction arrowhead.
  * **Players**: High-contrast circles with squad numbers:
    * Defending Team (Atlético): `#EF4444` border, `#161C26` fill.
    * Attacking Team (Barcelona): `#3B82F6` border, `#161C26` fill.
    * Referee: `#F59E0B` diamond icon.
  * **Incident Focus Zone**: Highlighted box around the penalty area or contact quadrant.
  * **Vector Overlays**:
    * Arm angle indicator (e.g. `108°` arc showing deviation from natural silhouette).
    * Impact speed readout (`8.2 m/s`, `0.18s reaction window`).

### 6.3 Live Adversarial Deliberation Chamber
This is the core cognitive display. **It does NOT look like a generic chatbot.** It is modeled after an official court transcript or aviation black box recording.

* **Layout**: Chronological audit trail with discrete turn cards.
* **Agent Turn Card Anatomy**:
  ```
  +-------------------------------------------------------------------------+
  | [ROLE BADGE: VAR ADVOCATE]               STEP 02/05 | TIMESTAMP: 00:01.4s|
  | Target: Defending On-Field Non-Call                                      |
  +-------------------------------------------------------------------------+
  | "Referee Kovács maintained an unobstructed sightline (8.4m distance,     |
  | 42° angle). On-field ruling of non-punishable contact falls within the    |
  | referee discretion corridor: ball was moving away from attacking goal,   |
  | establishing insufficient grounds for Clear & Obvious intervention."    |
  |                                                                         |
  | Cited Doctrine: IFAB Protocol 2025/26 - "High Bar for Intervention"     |
  +-------------------------------------------------------------------------+
  ```
  Followed immediately by:
  ```
  +-------------------------------------------------------------------------+
  | [ROLE BADGE: RULES AUDITOR]              STEP 03/05 | TIMESTAMP: 00:02.1s|
  | Target: Statutory Prosecution & Precedent Challenge                     |
  +-------------------------------------------------------------------------+
  | "REBUTTAL: Advocate argument fails on statutory grounds.                 |
  | Under Law 12.1 (Handling the Ball), once the ball is in play from a      |
  | goal kick, any deliberate outfield touch with hand/arm in the penalty   |
  | area is a mandatory penalty kick.                                        |
  |                                                                         |
  | PRECEDENT MATCH FOUND (Zetaris Federated SQL):                           |
  | Case: #UCL-2024-MINGS | Aston Villa vs Club Brugge (06/11/2024)          |
  | Incident: Tyrone Mings picked up live goal-kick inside box.              |
  | Sanction Imposed: Penalty Kick awarded. Similarity Score: 94.8%."        |
  +-------------------------------------------------------------------------+
  ```
* **Speaker Color-Coding**:
  * `VAR Advocate`: Cold Slate / Zinc header (`border-l-2 border-slate-400`).
  * `Rules Auditor`: Amber / Crimson header (`border-l-2 border-amber-500`).
  * `Consistency Evaluator`: Emerald header (`border-l-2 border-emerald-500`).

### 6.4 The Decision Metric: Precedent Deviation Index (PDI)
Instead of a simple "yes/no", Law18 provides an authoritative quantitative gauge:
* **PDI Gauge**: Horizontal segmented meter from `0%` to `100%`:
  * `0% - 20%`: **CONSISTENT** (Within standard officiating margin).
  * `21% - 49%`: **SUBJECTIVE DISCRETION** (Debatable, VAR protocol respected).
  * `50% - 79%`: **SIGNIFICANT ANOMALY** (Precedent contradicted, review warranted).
  * `80% - 100%`: **CRITICAL ERROR / LAW BREACH** (100% contradiction of settled precedent).
* For the Pubill incident, PDI renders at **`92%` (CRITICAL PRECEDENT BREACH)** in crimson typography.

### 6.5 Output Layer A: B2B Regulatory Audit Dossier
Designed for club sporting directors and league technical committees.
* **Format**: Structured formal report with print/PDF styling.
* **Contents**:
  * Official Incident Header: Match ID, Competition, Match Officials (Referee, VAR, AVAR).
  * Statutory Breaches: Exact IFAB 2025/26 Law citations.
  * Precedent Comparison Table: Side-by-side breakdown of current incident vs. historical anchor (Mings 2024).
  * Referee Behavioral Delta: Historical leniency variance retrieved from Meterless H-MEM.
  * Conclusion & Legal Standing: Formal summary for competition protest submission.

### 6.6 Output Layer B: Public Transparency Card
Designed for broadcast match-centers and television graphics (e.g. TNT Sports, DAZN, CBS Sports).
* **Format**: Ultra-clean, high-contrast, broadcast lower-third card.
* **Visual**:
  * Header: `KMI TRANSPARENCY EXPLANATION | INCIDENT #01`
  * Verdict Banner: `OFFICIATING ANOMALY IDENTIFIED — MANDATORY PENALTY OMITTED`
  * 3 Plain-English Bullet Points (Strictly readable by general audiences in 8 seconds):
    1. **Ball Status**: The goal kick was legally completed and the ball was in active play.
    2. **Infraction**: Marc Pubill deliberately controlled the live ball using both hands inside his penalty area.
    3. **Precedent**: IFAB Law 12.1 mandates a direct penalty kick; identical to the sanctioned Tyrone Mings incident in the 2024 Champions League.

---

## 7. Interactive States & Micro-Interactions

1. **State 1: Idle / Incident Loaded**:
   * Telemetry canvas populated with starting player coordinates and ball vectors.
   * Deliberation chamber shows "Ready to initiate multi-agent review".
   * Primary Action Button: `[ INITIATE LAW18 DELIBERATION ]` in high-contrast emerald text with a crisp border.
2. **State 2: Live Deliberation Streaming**:
   * Telemetry canvas highlights active contact points.
   * Deliberation cards appear sequentially via Server-Sent Events (SSE).
   * Monospace timer in the header counts execution latency (`1.2s... 2.4s...`).
3. **State 3: Evaluation Complete & Audited**:
   * PDI Gauge animates to its calculated value.
   * Precedent comparison table illuminates matching data points.
   * Tabs enable switching between the **B2B Regulatory Dossier** and the **Public Transparency Card**.

---

## 8. Frontend Engineering Stack & Constraints

* **Framework**: Next.js 14 (App Router) + TypeScript.
* **Styling**: Tailwind CSS + `clsx` + `tailwind-merge`.
* **Icons**: `lucide-react` (strictly technical iconography: `Scale`, `ShieldAlert`, `FileText`, `Activity`, `CheckCircle2`, `AlertTriangle`).
* **Charts & Pitch**: Native SVG components for the 2D pitch visualizer (eliminates heavy canvas libraries, ensures instant loading and crisp resolution on retina displays).
* **Components**: Radix UI primitives (`@radix-ui/react-tabs`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-dialog`) unstyled and customized with our technical tokens.

---

## 9. Verification & Quality Rubric

Before any frontend component is accepted into `law18`, it must pass this 4-point test:
1. **The Opta Test**: Does this screen look like an official sports analytics terminal used by a professional analyst?
2. **The Slop Test**: Does any part of the UI use purple gradients, floating robotic mascots, or chat bubble nonsense? (If yes, immediate reject).
3. **The Density Test**: Is the information cleanly visible without excessive scrolling?
4. **The Latency Test**: Does the page render in sub-second time without client-side lag?
