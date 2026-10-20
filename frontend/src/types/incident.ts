// frontend/src/types/incident.ts
/**
 * Authoritative TypeScript Data Contracts for Law18.
 * Strictly aligned with docs/DESIGN.md and backend/schemas/telemetry.py.
 */

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
  viewBox: string; // e.g., "0 0 105 68"
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
  similarityScore: number; // 0 to 1 (e.g. 0.984)
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
