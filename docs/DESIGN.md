# Law18 — Comprehensive UI/UX Design System & Data Specification
**Philosophy: Minimalist Sports Authority. Zero Noise. Clear Guided Path. Zero Hallucination.**

> **Notice for Coding Agents**: This document contains the **exhaustive and authoritative** UI specification, component tree, design tokens, and mock telemetry data for Law18. **Do NOT guess, assume, or hallucinate** UI text, coordinates, player names, metrics, or colors. Everything required to build the frontend is specified here.
> 
> * Related Technical Documents:
>   * Master Technical Spec: [`docs/PROJECT_SPEC.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/PROJECT_SPEC.md)
>   * Sensei's Frontend Task Playbook: [`docs/TASKS_SENSEI.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/TASKS_SENSEI.md)
>   * Zetaris Data Fabric Queries: [`docs/SPONSOR_ZETARIS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_ZETARIS.md)
>   * Meterless World Model & H-MEM: [`docs/SPONSOR_METERLESS.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_METERLESS.md)
>   * NVIDIA Nemotron Inference: [`docs/SPONSOR_NVIDIA.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_NVIDIA.md)
>   * Cursor Agent Governance: [`docs/SPONSOR_CURSOR.md`](file:///home/saturnsurfer/Documents/PROJECTS/law18/docs/SPONSOR_CURSOR.md)

---

## 1. UI Architecture & The Golden Path

Law18 is a high-density, distraction-free officiating intelligence system. It does not look like an AI chat toy or an overcrowded flight simulator. It adheres to sports officiating clarity inspired by FotMob, Sofascore, and Hawk-Eye.

### 1.1 The Golden Path (Visual Hierarchy)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ TOP BAR: [LAW18 LOGO]  [Officiating Consistency Engine]          [GITHUB] [DOCS] [STATUS: ONLINE]│
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ INCIDENT SELECTOR (Always Visible, Single Click Switcher):                                       │
│ [ 54' Pubill Handball (Active) ]     [ 29' Fermín Collision ]     [ 79' Eric García DOGSO ]      │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ MATCH CONTEXT STRIP (One Clean Monospace/Sans Line):                                             │
│ FC Barcelona 0 – 1 Atlético Madrid · Camp Nou · UCL QF Leg 1 · Ref: István Kovács · VAR: Di Bello│
│ Official Decision: Play On (No Penalty) · VAR Action: No Intervention                            │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN STAGE (Two-Column Balanced Grid, 50/50 Desktop, 100/100 Stacked Mobile):                    │
│                                                                                                  │
│  COLUMN 1: THE PITCH REALITY (Left)            COLUMN 2: THE COGNITIVE AUDIT (Right)             │
│  ┌──────────────────────────────────────────┐  ┌──────────────────────────────────────────────┐  │
│  │ Pitch Canvas Header                      │  │ The Verdict Banner                           │  │
│  │ [SPATIAL TELEMETRY] [REPLAY VECTORS]     │  │ [ 92% PRECEDENT BREACH ] [CRITICAL ERROR]    │  │
│  ├──────────────────────────────────────────┤  │ "Mandatory Penalty Omitted Under Law 12.1"   │  │
│  │ 2D Pitch Viewport (SVG: 105m x 68m)      │  ├──────────────────────────────────────────────┤  │
│  │ - Tactical green-slate pitch             │  │ Broadcast Takeaway (3 Plain-English Bullets) │  │
│  │ - Penalty box highlight                  │  │ • Ball was legally in play from goal kick.   │  │
│  │ - Ball vector (Musso -> Pubill)          │  │ • Pubill deliberately handled inside box.    │  │
│  │ - Player markers (#13 Musso, #2 Pubill)  │  │ • Penalty kick mandatory; yellow card req.   │  │
│  │ - Impact / Touch coordinate pulse        │  ├──────────────────────────────────────────────┤  │
│  ├──────────────────────────────────────────┤  │ Adversarial Deliberation Chamber (Live/SSE)  │  │
│  │ Key Telemetry Strip (4 Metric Tiles)     │  │ ┌──────────────────────────────────────────┐ │  │
│  │ [Ball: IN PLAY] [Touch: HAND PICKUP]     │  │ │ VAR Advocate: "Low clear/obvious bar..." │ │  │
│  │ [Distance: 11.2m] [Action: GOAL KICK]    │  │ ├──────────────────────────────────────────┤ │  │
│  │                                          │  │ │ Rules Auditor: "Law 12.1 + Mings rule..."│ │  │
│  │                                          │  │ ├──────────────────────────────────────────┤ │  │
│  │                                          │  │ │ Arbitrator: "Precedent violation: 92%"   │ │  │
│  │                                          │  │ └──────────────────────────────────────────┘ │  │
│  │                                          │  ├──────────────────────────────────────────────┤  │
│  │                                          │  │ Precedent Anchor Card                        │  │
│  │                                          │  │ [Club Brugge vs Villa (2024)] [98.4% Match]  │  │
│  └──────────────────────────────────────────┘  └──────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ PROGRESSIVE DISCLOSURE DRAWER (Expandable Secondary Drawer):                                     │
│ [ ^ View Official Regulatory Appeal Dossier & Evidence (Zetaris SQL & Meterless H-MEM) ]         │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Design Tokens & Tailwind CSS Palette

To prevent visual clutter, 90% of the screen uses neutral obsidian slates. Color is strictly functional and reserved for officiating status.

### 2.1 Surfaces & Backgrounds
* **`bg-pitch-canvas`**: `#080A0F` (Pitch dark canvas backdrop)
* **`bg-panel-base`**: `#0F141E` (Primary card and container background)
* **`bg-panel-elevated`**: `#161D2B` (Hover cards, active tabs, floating panels)
* **`bg-panel-subtle`**: `#1F293D` (Subtle metric pills, secondary pill chips)
* **`bg-pitch-turf`**: `#0C1717` (Dark tactical grass surface inside SVG)

### 2.2 Borders & Dividers
* **`border-subtle`**: `#1B2433` (Standard 1px structural container border)
* **`border-strong`**: `#2C3A52` (Dividers, card hover outlines)
* **`border-active`**: `#38BDF8` (Focused incident tab or highlighted player)

### 2.3 Officiating Signal Colors
* **Crimson / Breach / Red Card**:
  * Text: `#F43F5E` (`text-rose-500`)
  * Background: `rgba(244, 63, 94, 0.12)` (`bg-rose-500/10`)
  * Border: `rgba(244, 63, 94, 0.35)` (`border-rose-500/30`)
* **Amber / Caution / Yellow Card / Reviewing**:
  * Text: `#F59E0B` (`text-amber-500`)
  * Background: `rgba(245, 158, 11, 0.12)` (`bg-amber-500/10`)
  * Border: `rgba(245, 158, 11, 0.35)` (`border-amber-500/30`)
* **Emerald / Compliant / Legal Call**:
  * Text: `#10B981` (`text-emerald-500`)
  * Background: `rgba(16, 185, 129, 0.12)` (`bg-emerald-500/10`)
  * Border: `rgba(16, 185, 129, 0.35)` (`border-emerald-500/30`)
* **Cyan / Spatial Vector**:
  * Stroke / Fill: `#38BDF8` (`text-sky-400`, `stroke-sky-400`)
  * Accent Pill: `rgba(56, 189, 248, 0.12)`

### 2.4 Typography Hierarchy
* **Monospace Numbers & Officiating Codes**: `font-mono tabular-nums` (Geist Mono, JetBrains Mono, or Roboto Mono).
  * Used for: Minutes (`54'`), Percentages (`92%`), Distance (`11.2m`), Force (`24.8 kN`), Law codes (`Law 12.1`).
* **Headings & Body**: `font-sans` (Inter or Geist Sans).
  * High-contrast text: `#F8FAFC` (`text-slate-50`)
  * Body & Descriptions: `#94A3B8` (`text-slate-400`)
  * Subtext & Timestamps: `#64748B` (`text-slate-500`)

---

## 3. Component Hierarchy & TypeScript Interfaces

All components must live in `frontend/src/components/` and adhere to these exact interfaces:

```typescript
// frontend/src/types/incident.ts

export type IncidentId = 'incident-a' | 'incident-b' | 'incident-c';

export type VerdictTier = 'CRITICAL_BREACH' | 'SEVERE_ERROR' | 'MARGINAL_CONSISTENCY' | 'COMPLIANT';

export interface PlayerNode {
  id: string;
  name: string;
  number: number;
  team: 'BARCELONA' | 'OPPONENT' | 'REFEREE';
  x: number; // 0 to 105 (meters on standard pitch)
  y: number; // 0 to 68 (meters on standard pitch)
  label: string;
  isActionSubject?: boolean;
}

export interface TelemetryVector {
  id: string;
  type: 'PASS' | 'RUN' | 'COLLISION' | 'SHOT';
  from: { x: number; y: number };
  to: { x: number; y: number };
  label: string;
  color: string;
  dashed?: boolean;
}

export interface PitchState {
  viewBox: string; // e.g., "0 0 105 68" or penalty box zoom "0 0 55 68"
  highlightZone: {
    x: number;
    y: number;
    width: number;
    height: number;
    type: 'PENALTY_AREA' | 'BOX_ARC' | 'TOUCHLINE';
  };
  players: PlayerNode[];
  ball: {
    x: number;
    y: number;
    status: 'LIVE_IN_PLAY' | 'DEAD_BALL';
    elevation: number; // meters above ground
    speed: number; // m/s
  };
  vectors: TelemetryVector[];
  contactPoint?: {
    x: number;
    y: number;
    timestamp: string;
    description: string;
  };
}

export interface MetricTileData {
  label: string;
  value: string;
  sublabel?: string;
  status?: 'normal' | 'warning' | 'alert' | 'success';
}

export interface DeliberationStep {
  agent: 'VARAdvocate' | 'RulesAuditor' | 'ConsistencyEvaluator';
  role: 'DEFENSE' | 'PROSECUTION' | 'ARBITRATION';
  timestamp: string;
  message: string;
  citations: string[];
}

export interface PrecedentAnchorData {
  title: string;
  match: string;
  date: string;
  playerInvolved: string;
  similarityScore: number; // 0 to 1 (e.g. 0.98)
  officialRuling: string;
  deviationAnalysis: string;
}

export interface RegulatoryDossierData {
  dossierId: string;
  timestamp: string;
  matchId: string;
  competition: string;
  refereeProfile: {
    name: string;
    association: string;
    careerMatches: number;
    strictnessPercentile: number;
    penaltyAwardRate: string;
    historicalVarOverturnRate: string;
  };
  zetarisQuery: string;
  zetarisResults: {
    clausesChecked: number;
    precedentsMatched: number;
    executionTimeMs: number;
  };
  verbatimStatutes: {
    law: string;
    subclause: string;
    text: string;
  }[];
  meterlessMemoryTrace: {
    contextId: string;
    hMemClusters: string[];
    boundedContextTokens: number;
  };
}

export interface IncidentFullData {
  id: IncidentId;
  tabLabel: string;
  shortTitle: string;
  matchHeader: {
    competition: string;
    stage: string;
    date: string;
    venue: string;
    homeTeam: { name: string; score: number };
    awayTeam: { name: string; score: number };
    referee: string;
    varReferee: string;
    officialDecision: string;
    officialVarAction: string;
  };
  verdict: {
    tier: VerdictTier;
    precedentDeviationIndex: number; // 0 to 100%
    consistencyScore: number; // 0 to 100%
    badgeLabel: string;
    headline: string;
    subheadline: string;
    broadcastTakeaway: string[]; // Exactly 3 plain-English bullets
  };
  telemetry: {
    metrics: MetricTileData[];
    pitch: PitchState;
  };
  deliberation: DeliberationStep[];
  precedent: PrecedentAnchorData;
  regulatoryDossier: RegulatoryDossierData;
}
```

---

## 4. The Complete Static & Mock Data Repository (Zero Guesswork)

This section contains the **exact mock objects for all three benchmark incidents**. Coding agents should paste this directly into `frontend/src/data/incidentsData.ts`.

### 4.1 Incident A: Marc Pubill / Juan Musso Goal-Kick Handball (54th Min)

```typescript
export const incidentA: IncidentFullData = {
  id: 'incident-a',
  tabLabel: "54' Pubill Handball",
  shortTitle: "Marc Pubill Handball Pickup",
  matchHeader: {
    competition: "UEFA Champions League 2025/26",
    stage: "Quarter-Final Leg 1",
    date: "April 8, 2026",
    venue: "Spotify Camp Nou, Barcelona",
    homeTeam: { name: "FC Barcelona", score: 0 },
    awayTeam: { name: "Atlético Madrid", score: 1 },
    referee: "István Kovács (Romania)",
    varReferee: "Marco Di Bello (Italy)",
    officialDecision: "Play On (No Foul)",
    officialVarAction: "Check Complete — Silent Support (No On-Field Review)"
  },
  verdict: {
    tier: "CRITICAL_BREACH",
    precedentDeviationIndex: 92,
    consistencyScore: 8,
    badgeLabel: "92% PRECEDENT BREACH",
    headline: "Mandatory Penalty Kick Omitted",
    subheadline: "Violation of IFAB Law 12.1 & Direct Breach of 2024 Tyrone Mings UEFA Precedent",
    broadcastTakeaway: [
      "The goal-kick restart was legally complete the moment goalkeeper Musso kicked and clearly moved the ball.",
      "Defender Marc Pubill deliberately picked up the live ball with both hands inside the 18-yard box to reposition it.",
      "Under IFAB Law 12.1 and binding UEFA directives, handling a live ball inside the penalty box mandates a penalty kick and a second yellow card."
    ]
  },
  telemetry: {
    metrics: [
      { label: "BALL STATE", value: "LIVE IN PLAY", sublabel: "Kicked & moved 8.4m", status: "alert" },
      { label: "TOUCH TYPE", value: "HAND PICKUP", sublabel: "Both hands grasp ball", status: "alert" },
      { label: "BOX PROXIMITY", value: "INSIDE (11.2m)", sublabel: "Inside 18-yard area", status: "warning" },
      { label: "PRECEDENT MATCH", value: "98.4% SIMILAR", sublabel: "Tyrone Mings (2024)", status: "alert" }
    ],
    pitch: {
      viewBox: "0 0 105 68",
      highlightZone: {
        x: 0,
        y: 13.84,
        width: 16.5,
        height: 40.32,
        type: "PENALTY_AREA"
      },
      players: [
        { id: "p1", name: "Musso", number: 13, team: "OPPONENT", x: 5.5, y: 34.0, label: "13 Musso (GK)" },
        { id: "p2", name: "Pubill", number: 2, team: "OPPONENT", x: 13.2, y: 26.5, label: "2 Pubill (DF)", isActionSubject: true },
        { id: "p3", name: "Lewandowski", number: 9, team: "BARCELONA", x: 22.0, y: 29.0, label: "9 Lewandowski" },
        { id: "p4", name: "Raphinha", number: 11, team: "BARCELONA", x: 19.5, y: 44.0, label: "11 Raphinha" },
        { id: "ref", name: "Kovács", number: 0, team: "REFEREE", x: 28.0, y: 38.0, label: "Ref Kovács" }
      ],
      ball: {
        x: 13.2,
        y: 26.5,
        status: "LIVE_IN_PLAY",
        elevation: 0.35,
        speed: 0.0
      },
      vectors: [
        {
          id: "v1",
          type: "PASS",
          from: { x: 5.5, y: 34.0 },
          to: { x: 13.2, y: 26.5 },
          label: "Musso goal kick pass (8.4m)",
          color: "#38BDF8"
        }
      ],
      contactPoint: {
        x: 13.2,
        y: 26.5,
        timestamp: "53:48",
        description: "Deliberate two-hand pickup on live ball"
      }
    }
  },
  deliberation: [
    {
      agent: "VARAdvocate",
      role: "DEFENSE",
      timestamp: "53:52",
      message: "Advocate Position: Defend on-field call. Referee Kovács had an unobstructed direct sightline (22m distance). Contact occurred during an unpressured defensive restart with no active attacking phase, supporting the high Clear & Obvious threshold for non-intervention.",
      citations: ["IFAB VAR Protocol §2.1", "UEFA Ref Circular 2025/03"]
    },
    {
      agent: "RulesAuditor",
      role: "PROSECUTION",
      timestamp: "53:55",
      message: "Audit Objection: IFAB Law 16.1 explicitly dictates 'The ball is in play when it is kicked and clearly moves.' Once Musso kicked the ball, the restart was consummated. Law 12.1 categorizes deliberate hand contact in the box as an objective, non-interpretative penalty offense. In Club Brugge vs Aston Villa (2024), referee Stieler awarded a penalty against Tyrone Mings under identical spatial mechanics.",
      citations: ["IFAB Law 16.1 (The Goal Kick)", "IFAB Law 12.1 (Handling the Ball)", "UEFA Precedent Ref #UCL-2024-048"]
    },
    {
      agent: "ConsistencyEvaluator",
      role: "ARBITRATION",
      timestamp: "53:59",
      message: "Arbitration Finding: Overturn warranted. The Clear & Obvious threshold was breached because the handling was deliberate, unambiguous, and occurred on a live ball. 98.4% statistical parity with the Mings precedent dictates a mandatory penalty kick. Precedent Deviation Index: 92%.",
      citations: ["Law18 Consensus Engine", "IFAB Statutory Alignment Matrix"]
    }
  ],
  precedent: {
    title: "Aston Villa vs. Club Brugge",
    match: "UEFA Champions League Matchday 4",
    date: "November 6, 2024",
    playerInvolved: "Tyrone Mings (Aston Villa)",
    similarityScore: 0.984,
    officialRuling: "Penalty Kick Awarded (Confirmed by UEFA Technical Committee)",
    deviationAnalysis: "In both instances, the goalkeeper took a short lateral goal kick to a defender who picked up the moving ball with his hands under the false impression play had not restarted. While Mings was penalized, Pubill was granted immunity, representing an acute 92% inter-match consistency divergence."
  },
  regulatoryDossier: {
    dossierId: "DOS-UCL-2026-084-KOVACS",
    timestamp: "2026-04-08T21:54:12Z",
    matchId: "UCL-2026-QF1-FCB-ATM",
    competition: "UEFA Champions League",
    refereeProfile: {
      name: "István Kovács",
      association: "FRF (Romania) / UEFA Elite",
      careerMatches: 142,
      strictnessPercentile: 78.4,
      penaltyAwardRate: "0.38 per 90 (High)",
      historicalVarOverturnRate: "12.2% (Low resistance)"
    },
    zetarisQuery: "SELECT precedent_id, law_cited, similarity_score FROM virtual_ifab_archive WHERE offense_category = 'HANDBALL_BOX' AND restart_type = 'GOAL_KICK';",
    zetarisResults: {
      clausesChecked: 14,
      precedentsMatched: 6,
      executionTimeMs: 42
    },
    verbatimStatutes: [
      {
        law: "IFAB Law 16.1",
        subclause: "Procedure: The Goal Kick",
        text: "The ball must be stationary and is kicked from any point within the goal area by a player of the defending team. The ball is in play when it is kicked and clearly moves."
      },
      {
        law: "IFAB Law 12.1",
        subclause: "Fouls and Misconduct: Handling the ball",
        text: "It is an offence if a player deliberately touches the ball with their hand/arm, for example moving the hand/arm towards the ball. A penalty kick is awarded if an offense occurs inside the penalty area."
      }
    ],
    meterlessMemoryTrace: {
      contextId: "HMEM-REF-KOVACS-2026",
      hMemClusters: ["Kovacs_Restart_Leniency", "UCL_QuarterFinal_Pressure_Index"],
      boundedContextTokens: 612
    }
  }
};
```

---

### 4.2 Incident B: Fermín López / Juan Musso High-Boot Collision (29th Min)

```typescript
export const incidentB: IncidentFullData = {
  id: 'incident-b',
  tabLabel: "29' Fermín Collision",
  shortTitle: "Fermín López / Juan Musso Head Collision",
  matchHeader: {
    competition: "UEFA Champions League 2025/26",
    stage: "Quarter-Final Leg 2",
    date: "April 14, 2026",
    venue: "Cívitas Metropolitano, Madrid",
    homeTeam: { name: "Atlético Madrid", score: 1 },
    awayTeam: { name: "FC Barcelona", score: 2 },
    referee: "Clément Turpin (France)",
    varReferee: "Jérôme Brisard (France)",
    officialDecision: "Offensive Foul on Fermín (No Penalty)",
    officialVarAction: "Check Complete — Incident Deemed 'Natural Collision'"
  },
  verdict: {
    tier: "SEVERE_ERROR",
    precedentDeviationIndex: 86,
    consistencyScore: 14,
    badgeLabel: "86% PRECEDENT BREACH",
    headline: "Reckless Endangerment / Penalty Omitted",
    subheadline: "Violation of IFAB Law 12.3 (Endangering Safety of Opponent) — Ederson/Mané Precedent Breached",
    broadcastTakeaway: [
      "Fermín López legally contested an aerial cross inside the box with an orthodox header trajectory.",
      "Goalkeeper Juan Musso lunged outward with an elevated boot at 1.48m height, making direct stud contact with Fermín's head and face.",
      "IFAB Law 12.3 explicitly establishes that intent is subordinate to player safety; reckless studs to the head require an immediate penalty and disciplinary sanction."
    ]
  },
  telemetry: {
    metrics: [
      { label: "BOOT ELEVATION", value: "1.48 METERS", sublabel: "Head/neck height", status: "alert" },
      { label: "IMPACT FORCE", value: "24.8 kN", sublabel: "Severe concussion risk", status: "alert" },
      { label: "BALL CONTACT", value: "OPPONENT ZERO", sublabel: "Musso missed ball completely", status: "warning" },
      { label: "DISCIPLINARY REQ", value: "PENALTY + RED/YC", sublabel: "Serious foul play / Reckless", status: "alert" }
    ],
    pitch: {
      viewBox: "0 0 105 68",
      highlightZone: {
        x: 0,
        y: 20.0,
        width: 14.0,
        height: 28.0,
        type: "PENALTY_AREA"
      },
      players: [
        { id: "p1", name: "Musso", number: 13, team: "OPPONENT", x: 7.2, y: 33.2, label: "13 Musso (Lunge)", isActionSubject: true },
        { id: "p2", name: "Fermín", number: 16, team: "BARCELONA", x: 8.4, y: 34.1, label: "16 Fermín (Aerial)", isActionSubject: true },
        { id: "p3", name: "Giménez", number: 2, team: "OPPONENT", x: 9.8, y: 31.0, label: "2 Giménez" },
        { id: "ref", name: "Turpin", number: 0, team: "REFEREE", x: 22.0, y: 40.0, label: "Ref Turpin" }
      ],
      ball: {
        x: 8.4,
        y: 34.1,
        status: "LIVE_IN_PLAY",
        elevation: 1.55,
        speed: 12.4
      },
      vectors: [
        {
          id: "v1",
          type: "COLLISION",
          from: { x: 5.5, y: 33.0 },
          to: { x: 8.4, y: 34.1 },
          label: "Musso explosive charge (24.8 kN)",
          color: "#F43F5E"
        }
      ],
      contactPoint: {
        x: 8.4,
        y: 34.1,
        timestamp: "28:44",
        description: "Studs to facial region at 1.48m elevation"
      }
    }
  },
  deliberation: [
    {
      agent: "VARAdvocate",
      role: "DEFENSE",
      timestamp: "28:50",
      message: "Advocate Position: Defend on-field assessment. Musso is entitled to contest his aerial domain. The goalkeeper's eyes were fixed on the flight of the ball, and the collision was a consequential result of mutual attacking momentum rather than malice.",
      citations: ["Goalkeeper Spatial Privilege Guidelines", "Law 12 Collision Discretion"]
    },
    {
      agent: "RulesAuditor",
      role: "PROSECUTION",
      timestamp: "28:54",
      message: "Audit Objection: Law 12.3 explicitly clarifies: 'Any player who lunges at an opponent in challenging for the ball from the front, with one or both legs, using excessive force or endangering the safety of an opponent is guilty of serious foul play.' In Sadio Mané vs Ederson (2017), Mané's lack of intent was dismissed because a high boot causing facial impact legally constitutes serious foul play.",
      citations: ["IFAB Law 12.3 (Disciplinary Action)", "PL Precedent Mané/Ederson (2017)", "UEFA Player Safety Memo"]
    },
    {
      agent: "ConsistencyEvaluator",
      role: "ARBITRATION",
      timestamp: "28:58",
      message: "Arbitration Finding: Gross consistency failure. Awarding an offensive foul against the injured player when the goalkeeper missed the ball entirely and led with studs to the head contradicts established safety standards. Precedent Deviation Index: 86%.",
      citations: ["IFAB Head Injury Protocol", "Law18 Safety Matrix"]
    }
  ],
  precedent: {
    title: "Sadio Mané vs. Ederson",
    match: "Premier League (Manchester City vs. Liverpool)",
    date: "September 9, 2017",
    playerInvolved: "Sadio Mané (Liverpool) / Ederson (Man City)",
    similarityScore: 0.912,
    officialRuling: "Direct Red Card for Serious Foul Play (Upheld upon appeal)",
    deviationAnalysis: "Mané was tracking an aerial ball and raised his boot to control it, unintentionally connecting with Ederson's face. The FA and IFAB firmly affirmed that intent is irrelevant when player welfare is severely endangered by a raised boot."
  },
  regulatoryDossier: {
    dossierId: "DOS-UCL-2026-092-TURPIN",
    timestamp: "2026-04-14T20:29:15Z",
    matchId: "UCL-2026-QF2-ATM-FCB",
    competition: "UEFA Champions League",
    refereeProfile: {
      name: "Clément Turpin",
      association: "FFF (France) / UEFA Elite",
      careerMatches: 168,
      strictnessPercentile: 52.1,
      penaltyAwardRate: "0.26 per 90 (Moderate)",
      historicalVarOverturnRate: "18.4% (Standard)"
    },
    zetarisQuery: "SELECT ruling, sanction, case_id FROM virtual_ifab_archive WHERE incident_type = 'HIGH_BOOT_HEAD_CONTACT' AND in_box = TRUE;",
    zetarisResults: {
      clausesChecked: 19,
      precedentsMatched: 8,
      executionTimeMs: 38
    },
    verbatimStatutes: [
      {
        law: "IFAB Law 12.3",
        subclause: "Disciplinary Action: Serious Foul Play",
        text: "A tackle or challenge that endangers the safety of an opponent or uses excessive force or brutality must be sanctioned as serious foul play."
      }
    ],
    meterlessMemoryTrace: {
      contextId: "HMEM-REF-TURPIN-2026",
      hMemClusters: ["Turpin_HighStakes_HomeAdvantage", "Goalkeeper_Protection_Bias"],
      boundedContextTokens: 580
    }
  }
};
```

---

### 4.3 Incident C: Eric García / Alexander Sørloth DOGSO Red Card (79th Min)

```typescript
export const incidentC: IncidentFullData = {
  id: 'incident-c',
  tabLabel: "79' Eric García DOGSO",
  shortTitle: "Eric García Denial of Goal Scoring Opportunity",
  matchHeader: {
    competition: "UEFA Champions League 2025/26",
    stage: "Quarter-Final Leg 2",
    date: "April 14, 2026",
    venue: "Cívitas Metropolitano, Madrid",
    homeTeam: { name: "Atlético Madrid", score: 2 },
    awayTeam: { name: "FC Barcelona", score: 2 },
    referee: "Clément Turpin (France)",
    varReferee: "Jérôme Brisard (France)",
    officialDecision: "Direct Red Card (DOGSO) After On-Field Review",
    officialVarAction: "VAR Recommended Review; On-Field Call Overturned from Play-On to Red Card"
  },
  verdict: {
    tier: "MARGINAL_CONSISTENCY",
    precedentDeviationIndex: 58,
    consistencyScore: 42,
    badgeLabel: "58% PRECEDENT BREACH",
    headline: "Marginal Red Card / Low Threshold Intervention",
    subheadline: "Disputed DOGSO Criteria Under Law 12.3 — Covering Defender Proximity Ignored",
    broadcastTakeaway: [
      "Contact was minimal incidental heel-clipping 32 meters from the goal line.",
      "Covering defender Jules Koundé maintained an active recovery angle at 4.2m distance with superior velocity.",
      "The VAR intervention breached the 'Clear and Obvious' benchmark due to doubt over Sørloth's ball control and the presence of covering defenders."
    ]
  },
  telemetry: {
    metrics: [
      { label: "DISTANCE TO GOAL", value: "32.4 METERS", sublabel: "Long distance to target", status: "warning" },
      { label: "COVERING DEFENDER", value: "4.2m RECOVERY", sublabel: "Koundé in active pursuit", status: "alert" },
      { label: "BALL CONTROL", value: "HEAVY TOUCH", sublabel: "Ball trajectory angled away", status: "warning" },
      { label: "VAR CLEAR/OBVIOUS", value: "HIGH DOUBT", sublabel: "Subjective soft contact", status: "alert" }
    ],
    pitch: {
      viewBox: "0 0 105 68",
      highlightZone: {
        x: 20,
        y: 15.0,
        width: 35.0,
        height: 38.0,
        type: "TOUCHLINE"
      },
      players: [
        { id: "p1", name: "Sørloth", number: 9, team: "OPPONENT", x: 38.0, y: 32.0, label: "9 Sørloth (Breakaway)", isActionSubject: true },
        { id: "p2", name: "Eric García", number: 24, team: "BARCELONA", x: 39.2, y: 32.8, label: "24 Eric García", isActionSubject: true },
        { id: "p3", name: "Koundé", number: 23, team: "BARCELONA", x: 36.5, y: 28.0, label: "23 Koundé (Covering)" },
        { id: "p4", name: "Ter Stegen", number: 1, team: "BARCELONA", x: 8.0, y: 34.0, label: "1 Ter Stegen (GK)" }
      ],
      ball: {
        x: 34.0,
        y: 31.0,
        status: "LIVE_IN_PLAY",
        elevation: 0.1,
        speed: 8.8
      },
      vectors: [
        {
          id: "v1",
          type: "RUN",
          from: { x: 39.2, y: 32.8 },
          to: { x: 38.0, y: 32.0 },
          label: "Tracking contact",
          color: "#F59E0B",
          dashed: true
        },
        {
          id: "v2",
          type: "RUN",
          from: { x: 36.5, y: 28.0 },
          to: { x: 33.0, y: 30.5 },
          label: "Koundé recovery vector (7.8 m/s)",
          color: "#10B981"
        }
      ],
      contactPoint: {
        x: 38.0,
        y: 32.0,
        timestamp: "78:12",
        description: "Minimal heel clip outside penalty area (32.4m)"
      }
    }
  },
  deliberation: [
    {
      agent: "VARAdvocate",
      role: "DEFENSE",
      timestamp: "78:20",
      message: "Advocate Position: Support DOGSO sanction. Sørloth had breached the last defensive line in central space. Once contact tripped the forward from behind, the goal scoring opportunity was denied, validating VAR review.",
      citations: ["IFAB Law 12.3 DOGSO Criteria", "VAR Protocol KMI Guidelines"]
    },
    {
      agent: "RulesAuditor",
      role: "PROSECUTION",
      timestamp: "78:26",
      message: "Audit Objection: Law 12.3 sets four cumulative tests for DOGSO: distance, play direction, likelihood of ball control, and location/number of defenders. Sørloth's previous touch was heavy and tracking toward the corner flag, and Koundé was positioned 4.2m inside with recovery trajectory. In David Luiz vs Wolves (2021), similar incidental contact was heavily criticized by PGMOL as an over-application of DOGSO.",
      citations: ["IFAB Law 12.3 Four-Pillar Test", "PGMOL Independent Review 2021"]
    },
    {
      agent: "ConsistencyEvaluator",
      role: "ARBITRATION",
      timestamp: "78:32",
      message: "Arbitration Finding: Threshold error. The contact was neither clear nor unambiguous enough to overturn Turpin's original live decision. While a yellow card for a stopping a promising attack (SPA) was valid, a straight red breached historical VAR intervention thresholds. Precedent Deviation Index: 58%.",
      citations: ["Law18 Consistency Benchmark", "UEFA Threshold Index"]
    }
  ],
  precedent: {
    title: "David Luiz vs. Wolves",
    match: "Premier League (Arsenal vs. Wolves)",
    date: "February 2, 2021",
    playerInvolved: "David Luiz (Arsenal) / Willian José (Wolves)",
    similarityScore: 0.842,
    officialRuling: "Red Card (Heavily Criticized in Subsequent PGMOL Guidance)",
    deviationAnalysis: "Incidental knee-on-heel contact with no intentional trip. While originally sanctioned with a red card, refereeing bodies subsequently modified enforcement to prevent soft DOGSO dismissals when covering defenders are in recovery proximity."
  },
  regulatoryDossier: {
    dossierId: "DOS-UCL-2026-099-DOGSO",
    timestamp: "2026-04-14T21:19:40Z",
    matchId: "UCL-2026-QF2-ATM-FCB",
    competition: "UEFA Champions League",
    refereeProfile: {
      name: "Clément Turpin",
      association: "FFF (France) / UEFA Elite",
      careerMatches: 168,
      strictnessPercentile: 52.1,
      penaltyAwardRate: "0.26 per 90",
      historicalVarOverturnRate: "18.4%"
    },
    zetarisQuery: "SELECT * FROM virtual_ifab_archive WHERE offense = 'DOGSO' AND distance_to_goal > 30.0 AND defenders_covering >= 1;",
    zetarisResults: {
      clausesChecked: 24,
      precedentsMatched: 11,
      executionTimeMs: 46
    },
    verbatimStatutes: [
      {
        law: "IFAB Law 12.3",
        subclause: "Denying a goal or an obvious goal-scoring opportunity (DOGSO)",
        text: "The following must be considered: distance between the offence and the goal; general direction of the play; likelihood of keeping or gaining control of the ball; location and number of defenders."
      }
    ],
    meterlessMemoryTrace: {
      contextId: "HMEM-REF-TURPIN-DOGSO-2026",
      hMemClusters: ["Turpin_CardThreshold", "Late_Game_VAR_Deference"],
      boundedContextTokens: 640
    }
  }
};
```

---

## 5. 2D Pitch Canvas Coordinate System & SVG Rules

To ensure exact spatial rendering across devices, the Pitch Canvas uses an SVG coordinate system standard:

### 5.1 SVG Canvas Specifications
* **ViewBox**: `"0 0 105 68"` (1 unit = 1 real meter on standard pitch).
* **Turf Fill**: `#0A131C` (Dark tactical surface).
* **Line Markings (`stroke="#1E293B" strokeWidth="0.5"`)**:
  * Outer Boundary: `<rect x="0" y="0" width="105" height="68" fill="none" />`
  * Halfway Line: `<line x1="52.5" y1="0" x2="52.5" y2="68" />`
  * Center Circle: `<circle cx="52.5" cy="34" r="9.15" fill="none" />`
  * Center Spot: `<circle cx="52.5" cy="34" r="0.6" fill="#1E293B" />`
  * Penalty Box (Left): `<rect x="0" y="13.84" width="16.5" height="40.32" fill="none" />`
  * 6-Yard Box (Left): `<rect x="0" y="24.84" width="5.5" height="18.32" fill="none" />`
  * Penalty Spot (Left): `<circle cx="11.0" cy="34.0" r="0.6" fill="#1E293B" />`
  * Penalty Arc (Left): `<path d="M 16.5 27.0 A 9.15 9.15 0 0 1 16.5 41.0" fill="none" />`

### 5.2 Dynamic Elements on Canvas
* **Player Markers**:
  * Home (Barcelona): `fill="#1E3A8A"` (Deep Blaugrana Navy) with `stroke="#38BDF8"` (`strokeWidth="0.4"`).
  * Away (Atlético): `fill="#881337"` (Colchonero Crimson) with `stroke="#FB7185"` (`strokeWidth="0.4"`).
  * Referee: `fill="#EAB308"` (Official Yellow) with `stroke="#FEF08A"` (`strokeWidth="0.4"`).
  * Radius: `r="1.8"` units.
  * Number Text: `<text text-anchor="middle" dy="0.6" font-size="1.4" font-weight="bold" fill="#FFFFFF">`
* **Vectors & Passes**:
  * Arrow Marker: Standard SVG `<defs><marker id="arrow" .../></defs>`
  * Solid Vector: `stroke="#38BDF8" strokeWidth="0.8" marker-end="url(#arrow)"`
  * Dashed Vector: `stroke="#F59E0B" strokeWidth="0.7" strokeDasharray="1.5, 1.5"`
* **Contact Hotspot / Action Pulse**:
  * SVG circle with CSS animation: `animate-ping` effect at coordinates `(x, y)`.

---

## 6. Real-Time Streaming & Deliberation Chamber Behavior

When an incident is selected, the **Deliberation Chamber** can operate in two modes:
1. **Instant / Review Mode**: Renders the full 3-step deliberation conversation immediately.
2. **Simulation / SSE Stream Mode**: Progressively reveals each agent step with realistic deliberation pacing:
   * **Step 1 (0.0s)**: `VARAdvocate` post appears with a pulsing amber status badge (*"Analyzing on-field view..."*).
   * **Step 2 (+1.5s)**: `RulesAuditor` post streams in with a cyan badge (*"Querying Zetaris IFAB archive..."*).
   * **Step 3 (+3.0s)**: `ConsistencyEvaluator` locks in the final arbitration with the crimson/amber PDI score banner (*"Precedent arbitration finalized"*).

---

## 7. Progressive Disclosure Drawer: Regulatory Appeal Dossier

Tucked at the bottom of the page is a collapsible sheet:
`[ ^ View Official Regulatory Appeal Dossier & Precedent Evidence ]`

When clicked, it slides up smoothly (using `framer-motion` or standard CSS transition) and provides:
1. **Official Dossier Header**: Unique dossier reference (`DOS-UCL-2026-084-KOVACS`), verification timestamp, and cryptographic signature hash.
2. **Referee Behavioral Profile (Meterless H-MEM)**:
   * István Kovács' historical strictness index vs European averages.
   * Penalty concession rates in high-leverage knockout fixtures.
3. **Zetaris Virtual SQL Trace**:
   * Pre-formatted monospaced SQL query box showing the federated query across IFAB statutes and Opta telemetry databases.
   * Response latency (e.g., `42ms`, `0 ETL required`).
4. **Verbatim IFAB Statute Citations**: Exact text from IFAB Laws 12 and 16.
5. **Print / Export PDF Button**: Triggering `window.print()` or generating a clean regulatory appeal document for UEFA/PGMOL sporting directors.

---

## 8. Verification & Strict Compliance Checklist

Before committing frontend code, verify:
- [ ] No purple-to-pink gradient backgrounds anywhere in the codebase.
- [ ] All coordinates on the 2D pitch map directly to the numbers in Section 4.
- [ ] Tab switching between Incidents A, B, and C updates both pitch vectors and verdict cards with zero page reloads.
- [ ] All numerical values (minutes, percentages, velocities, distances) use `font-mono tabular-nums`.
- [ ] Mobile responsive layout stacks Pitch Reality above Cognitive Audit cleanly with no horizontal scrolling.
