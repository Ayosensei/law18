# backend/schemas/telemetry.py
"""
Pydantic v2 schemas for Law18.
Strictly synchronized with frontend/src/types/incident.ts and docs/DESIGN.md.
"""

from typing import List, Optional, Literal, Dict, Any
from pydantic import BaseModel, Field, ConfigDict

IncidentId = Literal["incident-a", "incident-b", "incident-c"]
VerdictTier = Literal["CRITICAL_BREACH", "SEVERE_ERROR", "MARGINAL_CONSISTENCY", "COMPLIANT"]
TeamType = Literal["BARCELONA", "OPPONENT", "REFEREE"]
VectorType = Literal["PASS", "RUN", "COLLISION", "SHOT"]
BallStatus = Literal["LIVE_IN_PLAY", "DEAD_BALL"]
AgentRole = Literal["DEFENSE", "PROSECUTION", "ARBITRATION"]
AgentName = Literal["VARAdvocate", "RulesAuditor", "ConsistencyEvaluator"]

class PlayerNode(BaseModel):
    id: str
    name: str
    number: int
    team: TeamType
    x: float = Field(..., description="Pitch X coordinate (0-105m)")
    y: float = Field(..., description="Pitch Y coordinate (0-68m)")
    label: str
    isActionSubject: Optional[bool] = False

class TelemetryVector(BaseModel):
    id: str
    type: VectorType
    from_pos: Dict[str, float] = Field(..., alias="from")
    to_pos: Dict[str, float] = Field(..., alias="to")
    label: str
    color: str
    dashed: Optional[bool] = False

    model_config = ConfigDict(populate_by_name=True)

class BallTelemetry(BaseModel):
    x: float
    y: float
    status: BallStatus
    elevation: float
    speed: float

class HighlightZone(BaseModel):
    x: float
    y: float
    width: float
    height: float
    type: Literal["PENALTY_AREA", "BOX_ARC", "TOUCHLINE"]

class ContactPoint(BaseModel):
    x: float
    y: float
    timestamp: str
    description: str

class PitchState(BaseModel):
    viewBox: str
    highlightZone: HighlightZone
    players: List[PlayerNode]
    ball: BallTelemetry
    vectors: List[TelemetryVector]
    contactPoint: Optional[ContactPoint] = None

class MetricTileData(BaseModel):
    label: str
    value: str
    sublabel: Optional[str] = None
    status: Optional[Literal["normal", "warning", "alert", "success"]] = "normal"

class DeliberationStep(BaseModel):
    agent: AgentName
    role: AgentRole
    timestamp: str
    message: str
    citations: List[str] = Field(default_factory=list)

class PrecedentAnchorData(BaseModel):
    title: str
    match: str
    date: str
    playerInvolved: str
    similarityScore: float
    officialRuling: str
    deviationAnalysis: str

class RefereeProfile(BaseModel):
    name: str
    association: str
    careerMatches: int
    strictnessPercentile: float
    penaltyAwardRate: str
    historicalVarOverturnRate: str

class VerbatimStatute(BaseModel):
    law: str
    subclause: str
    text: str

class MeterlessMemoryTrace(BaseModel):
    contextId: str
    hMemClusters: List[str]
    boundedContextTokens: int

class RegulatoryDossierData(BaseModel):
    dossierId: str
    timestamp: str
    matchId: str
    competition: str
    refereeProfile: RefereeProfile
    zetarisQuery: str
    zetarisResults: Dict[str, Any]
    verbatimStatutes: List[VerbatimStatute]
    meterlessMemoryTrace: MeterlessMemoryTrace

class TeamScore(BaseModel):
    name: str
    score: int

class MatchHeader(BaseModel):
    competition: str
    stage: str
    date: str
    venue: str
    homeTeam: TeamScore
    awayTeam: TeamScore
    referee: str
    varReferee: str
    officialDecision: str
    officialVarAction: str

class VerdictData(BaseModel):
    tier: VerdictTier
    precedentDeviationIndex: int
    consistencyScore: int
    badgeLabel: str
    headline: str
    subheadline: str
    broadcastTakeaway: List[str]

class IncidentFullData(BaseModel):
    id: IncidentId
    tabLabel: str
    shortTitle: str
    matchHeader: MatchHeader
    verdict: VerdictData
    telemetry: Dict[str, Any]
    deliberation: List[DeliberationStep]
    precedent: PrecedentAnchorData
    regulatoryDossier: RegulatoryDossierData
