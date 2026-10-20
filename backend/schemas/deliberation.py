"""
Pydantic v2 schemas for the Law18 Multi-Agent Deliberation Chamber.
Defines agent turns, debate state, precedent citations, statutory violations,
regulatory audit dossiers, and public transparency cards.
"""

from typing import List, Dict, Any, Optional, Literal
from pydantic import BaseModel, Field
from backend.schemas.telemetry import IncidentId, VerdictTier, AgentName, AgentRole

StatutorySeverity = Literal["CRITICAL", "HIGH", "MODERATE", "LOW"]
AuditStatus = Literal["DELIBERATION_COMPLETE", "FAILED", "IN_PROGRESS"]

class AgentTurnMessage(BaseModel):
    agent: AgentName = Field(..., description="Name of deliberating agent")
    role: AgentRole = Field(..., description="Cognitive role in chamber (DEFENSE, PROSECUTION, ARBITRATION)")
    cycle: int = Field(default=1, description="Debate round number")
    timestamp: Optional[str] = Field(default=None, description="ISO timestamp or match minute")
    message: str = Field(..., description="Substantive argumentation or ruling")
    citations: List[str] = Field(default_factory=list, description="IFAB laws or historical precedent citations")

class PrecedentMatchRecord(BaseModel):
    precedent_id: Optional[str] = None
    match_name: str = Field(..., description="Fixture title (e.g. Aston Villa vs Club Brugge)")
    competition: Optional[str] = Field(default="UEFA Champions League", description="Competition name")
    player_involved: str = Field(..., description="Key player involved in precedent")
    similarity_score: float = Field(..., ge=0.0, le=1.0, description="Zetaris cosine/vector similarity")
    law_cited: str = Field(..., description="Primary IFAB law invoked")
    official_ruling: str = Field(..., description="Official ruling in precedent match")
    deviation_analysis: Optional[str] = Field(default=None, description="Analysis of deviation from precedent")

class StatutoryViolationItem(BaseModel):
    law_number: str = Field(..., description="IFAB Law number (e.g. Law 12.1)")
    clause_title: str = Field(..., description="Clause title (e.g. Handling the ball)")
    verbatim_text: str = Field(..., description="Verbatim statute text")
    breach_assessment: str = Field(..., description="Explanation of why action violates statute")
    severity: StatutorySeverity = Field(default="HIGH", description="Severity tier of breach")

class PDIScoreBreakdown(BaseModel):
    pdi_score: int = Field(..., ge=0, le=100, description="Precedent Deviation Index (0=Compliant, 100=Critical Breach)")
    consistency_score: int = Field(..., ge=0, le=100, description="Officiating Consistency Score")
    precedent_divergence: float = Field(..., description="D_precedent metric component")
    statutory_breach_weight: float = Field(..., description="D_statute metric component")
    referee_bias_factor: float = Field(..., description="Delta_referee_bias metric component")
    verdict_tier: VerdictTier

class PublicTransparencyCard(BaseModel):
    incident_id: IncidentId
    badge_label: str
    headline: str
    subheadline: str
    broadcast_takeaways: List[str] = Field(default_factory=list)

class RegulatoryAuditDossier(BaseModel):
    dossier_id: str
    incident_id: IncidentId
    competition: str
    referee: str
    official_decision: str
    verdict_tier: VerdictTier
    pdi_score: int
    precedents_cited: List[PrecedentMatchRecord] = Field(default_factory=list)
    statutes_cited: List[StatutoryViolationItem] = Field(default_factory=list)
    deliberation_transcript: List[AgentTurnMessage] = Field(default_factory=list)
    executive_summary: str

class Law18AuditResult(BaseModel):
    incident_id: IncidentId
    status: AuditStatus = "DELIBERATION_COMPLETE"
    spatial_context: Dict[str, Any]
    referee_memory: str
    precedents: List[Dict[str, Any]]
    debate: List[AgentTurnMessage]
    pdi_score: int
    consistency_score: int
    verdict: Dict[str, Any]
    transparency_card: Optional[PublicTransparencyCard] = None
    dossier: Optional[RegulatoryAuditDossier] = None
