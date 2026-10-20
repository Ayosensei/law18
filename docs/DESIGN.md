# Law18 — UI/UX Design System & Specification
**Philosophy: Minimalist Sports Authority. Zero Noise. Clear Guided Path.**

> *"Every first-time visitor should understand what happened, what the referee called, and why Law18 agrees or disagrees within 5 seconds—without needing a manual or getting lost in dashboard clutter."*

---

## 1. The Core Philosophy: Restraint & Progressive Disclosure

High-stakes sports decisions should not look like an overcrowded airplane cockpit. 

Most dashboards fail because they dump every telemetry metric, database query, and log trace onto the screen at the same time. **Law18 embraces extreme clarity and progressive disclosure**:
1. **Zero Noise**: No redundant status meters, no bottom diagnostic docks, no flashing widgets, and no sensory overload.
2. **Zero AI Slop**: Strict ban on generic purple-pink gradients, chatbot speech bubbles, floating robot mascots, and robotic marketing jargon.
3. **The 3-Second Rule**: A user immediately sees:
   * **The Incident**: What happened on the pitch?
   * **The Official Call**: What did the referee do?
   * **The Law18 Verdict**: Why was it right or wrong, backed by law and precedent?
4. **Progressive Disclosure**: Deep technical evidence (Zetaris SQL traces, Meterless memory vectors, IFAB sub-clauses) is tucked neatly into clean expandable sheets—available on demand for regulatory appeals without cluttering the primary view.

---

## 2. The First-Time Visitor Journey (The Golden Path)

When someone opens Law18, their eyes follow a single, natural vertical flow:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 1. INCIDENT SELECTOR                                                             │
│    Three clean pills at the top:                                                 │
│    [ 54' Pubill Handball (Active) ]   [ 29' Fermín Collision ]   [ 79' Eric García ]│
├──────────────────────────────────────────────────────────────────────────────────┤
│ 2. MATCH & ON-FIELD CONTEXT (Clean Header)                                       │
│    FC Barcelona 0 – 1 Atlético Madrid · Camp Nou · Ref: István Kovács            │
│    Official Call: Play On (No Penalty) · VAR Action: No Intervention             │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 3. THE SPLIT STAGE (Side-by-side, perfectly balanced)                            │
│                                                                                  │
│    LEFT: The Pitch Reality                 RIGHT: The Cognitive Audit            │
│    ┌──────────────────────────────────┐    ┌──────────────────────────────────┐  │
│    │ Minimal 2D Pitch Canvas          │    │ The Verdict Banner               │  │
│    │ - Clean turf, subtle markings    │    │ [ 92% PRECEDENT BREACH ]         │  │
│    │ - Musso pass -> Pubill pickup    │    │ "Mandatory Penalty Omitted"      │  │
│    │ - Vector arrow & touch marker    │    ├──────────────────────────────────┤  │
│    │                                  │    │ Adversarial Deliberation Stream  │  │
│    │ Telemetry Summary                │    │ - VAR Advocate: Ref Discretion   │  │
│    │ - Ball Status: Live in Play      │    │ - Rules Auditor: Law 12.1 +      │  │
│    │ - Touch: Hand Pickup in Box      │    │   Tyrone Mings Precedent Match   │  │
│    └──────────────────────────────────┘    ├──────────────────────────────────┤  │
│                                            │ 3-Bullet Plain-English Takeaway  │  │
│                                            │ 1. Ball in play from goal kick.  │  │
│                                            │ 2. Deliberate hand contact.      │  │
│                                            │ 3. Penalty kick mandatory.       │  │
│                                            └──────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 4. PROGRESSIVE DISCLOSURE (Secondary / On-Demand)                                │
│    [ > View Full Regulatory Appeal Dossier ]   [ > View Historical Precedents ]  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Color System: Monochromatic Base with Signal Accents

To keep the UI calm and readable, 90% of the screen is composed of deep neutral stadium grays and crisp typography. Vibrant color is used **strictly for officiating signals**.

### 3.1 Neutral Surfaces & Typography
* **Canvas Background**: `#090C10` (Deep obsidian charcoal).
* **Card & Panel Surface**: `#11161F` (Elevated slate container).
* **Secondary Surface**: `#171E2B` (Hover states, table rows).
* **Subtle Borders**: `#212B3B` (1px crisp dividing lines).
* **Primary Text**: `#F1F5F9` (`text-slate-100` — High-contrast headlines and verdicts).
* **Secondary Text**: `#94A3B8` (`text-slate-400` — Explanations, referee quotes).
* **Muted Text**: `#64748B` (`text-slate-500` — Minute markers, axis labels).

### 3.2 Officiating Signal Colors (Only Used When Functional)
* **Precedent Breach / Red Card**: `#F43F5E` (Rose-crimson — flags severe referee error or red cards).
* **Under Review / Yellow Card**: `#F59E0B` (Warm amber — flags caution offenses or active debate).
* **Precedent Confirmed / Legal**: `#10B981` (Pitch emerald — flags confirmed correct calls).
* **Telemetry Vector**: `#0284C7` (Sky blue — subtle pitch motion lines).

---

## 4. Typography: Tabular Precision & Clean Geometry

* **Telemetry, Coordinates, Minutes & Percentages**:
  * Font: `JetBrains Mono` or `Geist Mono` (`font-mono tabular-nums`).
  * Used for: `54'`, `92%`, `Law 12.1`, `8.2 m/s`.
* **Headings, Narrative & Explanations**:
  * Font: `Inter` or `Geist Sans` (`tracking-tight`).
  * Clean, human-readable prose without robotic stiffness.

---

## 5. Component Breakdown (Clean & Distraction-Free)

### 5.1 Top Navigation & Incident Switcher
* **Brand Mark**: `LAW 18` in bold monospace with a small subtitle: `Officiating Consistency Engine`.
* **Incident Switcher Tabs**: Positioned directly in the center or right of the header:
  * `54' Pubill Handball`
  * `29' Fermín Collision`
  * `79' Eric García DOGSO`
* *First-time user action*: Clicking any tab smoothly swaps the pitch telemetry and deliberation audit without page reloads.

### 5.2 Match Context Strip
A clean, one-line summary right above the main panels:
* `UCL Quarter-Final Leg 1 · FC Barcelona 0 – 1 Atlético Madrid`
* `On-Field Decision: Play on (No Foul) · Referee: István Kovács · VAR: Marco Di Bello`

### 5.3 Left Panel: The Pitch Reality
* **Purpose**: Show *what happened* in 2 seconds.
* **Minimal 2D Pitch Canvas**:
  * Dark tactical turf (`#0C131E`) with faint pitch boundaries (`#1E293B`).
  * Goal box clearly highlighted.
  * Ball vector: Cyan arrow showing the pass from Musso to Pubill.
  * Player dots: Simple numbered circles (`#13 Musso`, `#2 Pubill`).
  * Contact callout: A clean indicator on the pitch showing `Hand contact @ 53:48`.
* **Essential Facts Pill**:
  * Ball Status: `LIVE IN PLAY`
  * Action: `HANDBALL PICKUP`
  * Prior Action: `SHORT GOAL KICK COMPLETED`

### 5.4 Right Panel: The Cognitive Audit & Explanation
* **Purpose**: Explain *why* the referee made a mistake and what IFAB law mandates.
* **The Verdict Card**:
  * Clean badge: `92% PRECEDENT BREACH` in bold crimson.
  * Headline: `Mandatory Penalty Kick Omitted`.
  * Plain-English Summary (3 quick bullets):
    1. The goal-kick was taken legally and the ball was live in play.
    2. Defender Marc Pubill deliberately used his hands to pick up the ball inside the penalty area.
    3. Under IFAB Law 12.1 and UCL precedent, this is a mandatory penalty kick and second yellow card.
* **The Deliberation Exchange (Adversarial Audit)**:
  Instead of an overwhelming wall of text, a clean 2-turn dialogue:
  * **[VAR Advocate]**: *"Referee Kovács had clear sight. Ball was not in an attacking phase, supporting low clear-and-obvious intervention threshold."*
  * **[Rules Auditor]**: *"Rebuttal: Law 12.1 makes deliberate handling in the box an objective penalty offence. In Aston Villa vs Club Brugge (2024), Tyrone Mings committed the exact same infraction and a penalty was awarded."*

### 5.5 Progressive Disclosure: Deeper Regulatory Sheets
For regulatory officials, club sporting directors, and hackathon judges who want the deep technical proof:
* A clean expandable drawer: `[ View Official Appeal Dossier & Precedent Data ]`
* **When expanded**, it displays:
  * Full IFAB Law 12.1 and Law 16 verbatim citations retrieved from **Zetaris**.
  * Precedent comparison table matching Pubill vs. Tyrone Mings (similarity 0.98).
  * Referee István Kovács' historical leniency profile from **Meterless H-MEM**.
  * Printable/Exportable formal appeal dossier.

---

## 6. Eliminating Cognitive Friction: The "Before vs After"

| Previous Overcrowded Approach | New Minimalist Law18 Approach |
|---|---|
| Multiple competing gauges, status pills, and latency meters | One clear verdict badge: `92% PRECEDENT BREACH` |
| Full raw SQL queries and JSON trees visible on screen | Clean pitch canvas + simple explanation first; technical proof on click |
| Complex navigation between 5 tabs and sub-pages | Single-page layout with a 3-incident switcher at the top |
| Robotic AI phrases (*"Empowering cognitive synergy"*) | Direct sports language (*"Penalty omitted under Law 12.1"*) |

---

## 7. Implementation Checklist

- [ ] Single-page layout with zero horizontal clutter.
- [ ] Incident switcher at top allows switching between the 3 Barcelona cases with 1 click.
- [ ] Minimalist SVG pitch canvas renders cleanly on mobile, tablet, and desktop without canvas lag.
- [ ] Real-time deliberation stream displays clear advocate vs. auditor cards with zero chatbot fluff.
- [ ] Progressive disclosure drawer holds deep Zetaris SQL queries and Meterless memory profiles.
