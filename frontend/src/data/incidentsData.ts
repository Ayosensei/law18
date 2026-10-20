// frontend/src/data/incidentsData.ts
import { IncidentFullData, IncidentId } from '@/types/incident';

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

export const incidentsMap: Record<IncidentId, IncidentFullData> = {
  'incident-a': incidentA,
  'incident-b': incidentB,
  'incident-c': incidentC,
};

export const allIncidents: IncidentFullData[] = [incidentA, incidentB, incidentC];
