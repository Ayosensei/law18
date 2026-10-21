"""
LangGraph Officiating Chamber State for Law18.
Strictly TypedDict defining the state across all deliberation nodes.
"""

from typing import TypedDict, List, Dict, Any, Optional

class DeliberationState(TypedDict):
    # Ingestion & Telemetry Context
    incident_id: str
    incident_data: Dict[str, Any]
    match_header: Dict[str, Any]
    telemetry: Dict[str, Any]
    spatial_context: Dict[str, Any]
    
    # Knowledge & Memory
    referee_name: str
    referee_memory: str
    retrieved_laws: List[Dict[str, Any]]
    precedents_matched: List[Dict[str, Any]]
    
    # Adversarial Deliberation
    advocate_arguments: List[Dict[str, Any]]
    auditor_arguments: List[Dict[str, Any]]
    debate_turns: List[Dict[str, Any]]
    current_cycle: int
    max_cycles: int
    consensus_reached: bool
    
    # Adjudication & Scoring
    evaluator_adjudication: str
    pdi_score: int
    consistency_score: int
    verdict_tier: str
    headline: str
    badge_label: str
    broadcast_takeaways: List[str]
    
    # Final Deliverables
    dossier: Dict[str, Any]
    transparency_card: Dict[str, Any]
    trace_logs: List[Dict[str, Any]]
