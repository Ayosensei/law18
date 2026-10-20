"""
Multi-Agent Deliberation Graph for Law18.
Orchestrates the Cognitive Officiating Chamber using LangGraph (StateGraph):
START -> Triage -> Retriever -> Advocate -> Auditor -> Consistency Evaluator -> (Conditional Loop / Synthesizer) -> END.
"""

import json
import asyncio
from typing import Dict, Any, List, Optional, AsyncGenerator
from langgraph.graph import StateGraph, START, END

from backend.deliberation.state import DeliberationState
from backend.deliberation.nodes import (
    triage_fact_node,
    retriever_node,
    var_advocate_node,
    rules_auditor_node,
    consistency_evaluator_node,
    kmi_synthesizer_node
)


def should_continue_debate(state: DeliberationState) -> str:
    """
    Conditional Edge:
    Evaluates whether the adversarial debate between VAR Advocate and Rules Auditor
    should continue for another rebuttal round, or proceed to final synthesis.
    """
    current_cycle = state.get("current_cycle", 1)
    max_cycles = state.get("max_cycles", 2)
    consensus_reached = state.get("consensus_reached", False)
    
    if current_cycle <= max_cycles and not consensus_reached:
        return "advocate"
    return "synthesizer"


def build_deliberation_graph():
    """Constructs and compiles the Law18 LangGraph StateGraph."""
    builder = StateGraph(DeliberationState)
    
    # Register Node Functions
    builder.add_node("triage", triage_fact_node)
    builder.add_node("retriever", retriever_node)
    builder.add_node("advocate", var_advocate_node)
    builder.add_node("auditor", rules_auditor_node)
    builder.add_node("evaluator", consistency_evaluator_node)
    builder.add_node("synthesizer", kmi_synthesizer_node)
    
    # Establish Sequential Pipeline
    builder.add_edge(START, "triage")
    builder.add_edge("triage", "retriever")
    builder.add_edge("retriever", "advocate")
    builder.add_edge("advocate", "auditor")
    builder.add_edge("auditor", "evaluator")
    
    # Establish Conditional Debate Rebuttal Loop
    builder.add_conditional_edges(
        "evaluator",
        should_continue_debate,
        {
            "advocate": "advocate",
            "synthesizer": "synthesizer"
        }
    )
    
    builder.add_edge("synthesizer", END)
    
    return builder.compile()


class DeliberationChamberGraph:
    """
    Public Facade for the LangGraph Cognitive Officiating Chamber.
    Provides deterministic batch auditing and async SSE streaming for hackathon evaluation.
    """
    def __init__(self):
        self.app = build_deliberation_graph()

    def _init_initial_state(self, incident_data: Dict[str, Any]) -> DeliberationState:
        incident_id = incident_data.get("id", "incident-a")
        telemetry = incident_data.get("telemetry", {})
        match_header = incident_data.get("matchHeader", {})
        verdict = incident_data.get("verdict", {})
        
        return {
            "incident_id": incident_id,
            "incident_data": incident_data,
            "match_header": match_header,
            "telemetry": telemetry,
            "spatial_context": {},
            "referee_name": match_header.get("referee", "István Kovács"),
            "referee_memory": "",
            "retrieved_laws": [],
            "precedents_matched": [],
            "advocate_arguments": [],
            "auditor_arguments": [],
            "debate_turns": [],
            "current_cycle": 1,
            "max_cycles": 2,
            "consensus_reached": False,
            "evaluator_adjudication": "",
            "pdi_score": verdict.get("precedentDeviationIndex", 92),
            "consistency_score": verdict.get("consistencyScore", 8),
            "verdict_tier": verdict.get("tier", "CRITICAL_BREACH"),
            "headline": verdict.get("headline", ""),
            "badge_label": verdict.get("badgeLabel", ""),
            "broadcast_takeaways": verdict.get("broadcastTakeaway", []),
            "dossier": incident_data.get("regulatoryDossier", {}),
            "transparency_card": {},
            "trace_logs": []
        }

    def run_audit(self, incident_data: Dict[str, Any]) -> Dict[str, Any]:
        """Executes the compiled LangGraph StateGraph deterministically."""
        initial_state = self._init_initial_state(incident_data)
        final_state = self.app.invoke(initial_state)
        
        return {
            "incidentId": final_state["incident_id"],
            "status": "DELIBERATION_COMPLETE",
            "spatialContext": final_state["spatial_context"],
            "refereeMemory": final_state["referee_memory"],
            "precedents": final_state["precedents_matched"],
            "debate": final_state["debate_turns"],
            "pdi": final_state["pdi_score"],
            "consistencyScore": final_state["consistency_score"],
            "verdict": incident_data.get("verdict", {}),
            "transparencyCard": final_state["transparency_card"],
            "dossier": final_state["dossier"],
            "traceLogs": final_state["trace_logs"]
        }

    async def astream_audit(self, incident_data: Dict[str, Any]) -> AsyncGenerator[Dict[str, Any], None]:
        """Progressively yields step events as the LangGraph state transitions."""
        initial_state = self._init_initial_state(incident_data)
        async for output in self.app.astream(initial_state):
            for node_name, node_state in output.items():
                yield {
                    "node": node_name,
                    "state": node_state
                }
