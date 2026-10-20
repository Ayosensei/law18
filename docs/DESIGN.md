# Law18 — Frontend Design System & UI Specification (`DESIGN.md`)
**Sofascore / FotMob Sports Analytics Aesthetics & Dark-Mode Command Center**

---

## 1. Design Vision & Philosophy

**Law18 combines the live excitement of premier sports platforms (Sofascore, FotMob) with the forensic precision of a regulatory legal command center.**

* **Theme**: Deep stadium night floodlights (`#0B0E14` pitch black with glowing neon accents).
* **Speed & Responsiveness**: Immediate incident filtering, snappy tab switching, animated score dials, and real-time streaming deliberation feeds.
* **Dual Persona Experience**:
  * **Analyst / Referee Board Mode**: Dense, tabular, precedent-heavy data dossier with exact IFAB statutes.
  * **Fan / Broadcast Mode**: High-contrast, clean, 3-bullet graphic cards ready for television lower-thirds or stadium jumbotrons.

---

## 2. Color System & Design Tokens

### Core Color Palette

```typescript
// tailwind.config.ts extension
export const law18Theme = {
  colors: {
    pitch: {
      950: '#06080D', // Deepest background
      900: '#0B0E14', // Base app background
      850: '#121721', // Surface / container background
      800: '#1A2232', // Elevated card surface
      700: '#2A3447', // Subtle borders & dividers
      600: '#3D4A63', // Hover state borders
    },
    accent: {
      emerald: '#00E676', // Verified correct / Standard call
      emeraldGlow: 'rgba(0, 230, 118, 0.2)',
      amber: '#FFAB00',   // Marginal / Subjective grey-zone
      amberGlow: 'rgba(255, 171, 0, 0.2)',
      crimson: '#FF1744', // Blunder / Clear & Obvious Error
      crimsonGlow: 'rgba(255, 23, 68, 0.25)',
      cyan: '#00E5FF',    // Telemetry & spatial data points
      varPurple: '#7C3AED', // VAR protocol badge & system highlights
      uclBlue: '#001D4A',  // Champions league branding accent
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#64748B',
      highlight: '#FFFFFF',
    }
  }
};
```

### Typography Hierarchy

* **Font Family**: `Inter, system-ui, sans-serif` for body; `Geist, sans-serif` for headers.
* **Tabular Figures**: `font-mono` / `tabular-nums` for all match minutes, aggregate scores, and consistency percentages to prevent layout jitter.
* **Scale**:
  * Header Banner: `text-2xl font-bold tracking-tight text-white`
  * Score Display: `text-4xl font-extrabold tracking-wider font-mono`
  * Section Titles: `text-sm font-semibold uppercase tracking-widest text-pitch-600`
  * Body Text: `text-sm text-text-secondary leading-relaxed`
  * Small Badges: `text-xs font-semibold px-2 py-0.5 rounded-full`

---

## 3. Component Architecture & UI Hierarchy

```text
┌────────────────────────────────────────────────────────────────────────┐
│  MATCH HEADER (UCL Banner · FC Barcelona 2 – 3 Atlético Madrid)       │
├────────────────────────────────────────────────────────────────────────┤
│  TIMELINE SCRUBBER [ 0' ── 29'🩸 ── 54'⚽✋ ── 79'🟥 ── 90' ]          │
├───────────────────────────────────┬────────────────────────────────────┤
│  LEFT COLUMN: INCIDENT INSPECTOR  │  RIGHT COLUMN: LAW18 ADJUDICATION  │
│  - Incident Summary               │  - Radial Consistency Gauge        │
│  - Physical Telemetry Card        │    (e.g., 8% Crimson Blunder)      │
│  - 2D Pitch Coordinate Map        │  - Dual Output Tabs:               │
│  - On-Field Call vs. VAR Stance   │    [ B2B Audit ] [ Public Card ]   │
├───────────────────────────────────┴────────────────────────────────────┤
│  BOTTOM DRAWER: LIVE MULTI-AGENT DELIBERATION CHAMBER                   │
│  [VAR Protocol Advocate] ◄──── Debate / Rebuttal ────► [IFAB Auditor]  │
│  - Live streaming arguments · Cited precedents · H-MEM Referee Memory  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Detailed Component Specifications

### 1. `MatchHeader.tsx` (UCL Tie Scoreboard)
* **Visual Style**: Sleek top banner with dark navy gradient `#001D4A` to `#0B0E14`.
* **Elements**:
  * Official UEFA Champions League starball logo badge.
  * Scoreboard: **FC Barcelona 2 – 3 Atlético Madrid** (Aggregate).
  * Stage: *Quarter-Final · 2nd Leg at Metropolitano (April 14, 2026)* / *1st Leg at Camp Nou (April 8, 2026)*.
  * Officiating Crew: Referee chip (Clément Turpin / István Kovács), VAR Lead chip.

### 2. `TimelineSlider.tsx` (Chronological Match Scrubber)
* **Visual Style**: Inspired by FotMob's match momentum timeline.
* **Interaction**:
  * Continuous line from 0' to 90'+.
  * Interactive incident badges positioned at exact match minutes:
    * **29' (High-Boot Collision)**: Yellow warning badge with collision icon and blood alert tag.
    * **54' (Pubill Handball Pickup)**: Hand icon with red question mark badge.
    * **79' (Eric García DOGSO Red)**: Solid red card icon with VAR review indicator.
  * Clicking any badge instantly updates the active incident state with a smooth Framer Motion spring transition.

### 3. `IncidentTelemetryCard.tsx` (Physical Event Inspector)
* **Visual Style**: Clean tabular grid with `#1A2232` background and `#2A3447` border.
* **Data Points Displayed**:
  * **Event Type**: `HANDBALL`, `SERIOUS_FOUL_PLAY`, `DOGSO`.
  * **Ball Status**: `LIVE_IN_PLAY` (highlighted in emerald) vs `DEAD_BALL`.
  * **Impact / Contact Vector**: e.g., *Head/Facial laceration at 1.45m elevation; Studs forward*.
  * **On-Field Ruling**: *No Foul / Play On* vs. *Straight Red Card*.
  * **VAR Action**: *No Monitor Review* vs. *On-Field Review Recommended*.

### 4. `PitchRadar2D.tsx` (Interactive Spatial Pitch)
* **Visual Style**: Top-down stylized green pitch graphic with subtle yard markings and 18-yard box.
* **Features**:
  * Pulsing neon dot indicating exact pitch coordinates of the incident.
  * Ball vector trajectory arrow (e.g., short goal-kick pass from Musso to Pubill).
  * Visual representation of penalty area boundary and referee sightlines.

### 5. `DeliberationFeed.tsx` (The Adversarial Chamber)
* **Visual Style**: Modern multi-agent chat stream with distinct avatar badges and glowing borders.
* **Agent Cards**:
  * **VAR Protocol Advocate** (Purple accent `#7C3AED`): Cites the high "Clear and Obvious" threshold, camera angle ambiguity, and natural movement biomechanics.
  * **IFAB Rules Auditor** (Cyan accent `#00E5FF`): Cites strict statutory clauses (Law 16.1, Law 12.3) and lethal precedents (Tyrone Mings penalty).
  * **Consistency Evaluator** (Gold accent `#FFAB00`): Injects H-MEM referee profile data (Kovács's reluctance to consult monitor) and delivers real-time synthesis.

### 6. `ConsistencyGauge.tsx` (The Verdict Radial Dial)
* **Visual Style**: Large circular SVG radial progress meter (diameter: 160px).
* **Color States**:
  * **0% – 24% (Blunder / Error)**: Glowing Neon Crimson `#FF1744`.
  * **25% – 49% (Inconsistent)**: Glowing Neon Amber `#FFAB00`.
  * **50% – 79% (Marginal / Subjective)**: Slate Amber `#F59E0B`.
  * **80% – 100% (Correct / Standard)**: Glowing Electric Emerald `#00E676`.
* **Animated Value**: Counter rolls up from 0 to final score on incident change.
* **Verdict Banner**: Bold badge beneath the dial (e.g., `CLEAR & OBVIOUS BLUNDER (8%)`).

### 7. Dual Output Deliverable Views

#### Tab A: `B2BDossierView.tsx` (Official Regulatory Report)
* Formatted for UEFA / PGMOL referee observers and Club Sporting Directors.
* **Sections**:
  1. *Executive Summary & Incident Metadata*.
  2. *Codified IFAB Law Clauses*: Direct quotes from Law 12 and Law 16.
  3. *Precedent Comparison Matrix*: Table showing Tyrone Mings (Villa vs Brugge) vs. Marc Pubill, detailing why the non-penalty directly violated European precedent.
  4. *Referee Performance Assessment*: Rating the crew's adherence to the VAR Handbook.
  5. *Actionable Action*: "Download Official PDF Dossier".

#### Tab B: `PublicMatchCenterCard.tsx` (Broadcast / Fan Card)
* Formatted like a Premier League Match Centre or FIFA Club World Cup stadium jumbotron card.
* **Card Specs**:
  * 16:9 aspect ratio container with sharp rounded corners.
  * Large decision chip: **MISSED PENALTY & YELLOW CARD (8% CONSISTENCY)**.
  * **3 Plain-English Bullet Points**:
    1. *The ball was legally in play the instant Juan Musso kicked it.*
    2. *Marc Pubill deliberately stopped the live ball with his hands inside the box.*
    3. *Under IFAB Law 16 & UEFA precedents (e.g. Tyrone Mings, 2024), this is a mandatory penalty kick.*
  * Social Share button: "Copy Broadcast Card".

---

## 5. Animation & Micro-Interactions

* **Framer Motion Transitions**:
  * Incident selection: Smooth cross-fade between incident telemetry cards.
  * Gauge loading: `stroke-dashoffset` animated SVG transition taking 1.2s with `easeOutExpo`.
  * Deliberation stream: Argument cards slide in from bottom with slight opacity stagger.
* **Pulse Effects**: The active incident badge on the timeline pulses with a subtle box-shadow glow matching its verdict color.
