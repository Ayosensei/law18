"""
Multi-Agent Deliberation Graph for Law18.
Upgraded with deep-copy state isolation, hard cycle recursion bounds, and synchronized verdict synthesis.
"""

import copy
from typing import Dict, Any, AsyncGenerator
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

MAX_ALLOWED_CYCLES = 3
GRAPH_RECURSION_LIMIT = 18


def should_continue_debate(state: DeliberationState) -> str:
    """
    Conditional Edge:
    Evaluates whether the adversarial debate between VAR Advocate and Rules Auditor
    should continue for another rebuttal round, or proceed to final synthesis.
    Includes a hard turn-count guard to guarantee loop termination.
    """
    current_cycle = int(state.get("current_cycle", 1))
    max_cycles = min(int(state.get("max_cycles", 2)), MAX_ALLOWED_CYCLES)
    consensus_reached = bool(state.get("consensus_reached", False))
    turns_so_far = len(state.get("debate_turns", []))

    # Each full cycle produces 3 turns (Advocate, Auditor, Evaluator).
    if (
        not consensus_reached
        and current_cycle <= max_cycles
        and turns_so_far < (max_cycles * 3)
    ):
        return "advocate"
    return "synthesizer"


def build_deliberation_graph():
    """Constructs and compiles the Law18 LangGraph StateGraph."""
    builder = StateGraph(DeliberationState)

    builder.add_node("triage", triage_fact_node)
    builder.add_node("retriever", retriever_node)
    builder.add_node("advocate", var_advocate_node)
    builder.add_node("auditor", rules_auditor_node)
    builder.add_node("evaluator", consistency_evaluator_node)
    builder.add_node("synthesizer", kmi_synthesizer_node)

    builder.add_edge(START, "triage")
    builder.add_edge("triage", "retriever")
    builder.add_edge("retriever", "advocate")
    builder.add_edge("advocate", "auditor")
    builder.add_edge("auditor", "evaluator")

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
        # Deep-copy nested structures to prevent cross-request state aliasing
        isolated_data = copy.deepcopy(incident_data)
        incident_id = isolated_data.get("id", "incident-a")
        telemetry = isolated_data.get("telemetry", {})
        match_header = isolated_data.get("matchHeader", {})
        verdict = isolated_data.get("verdict", {})

        return {
            "incident_id": incident_id,
            "incident_data": isolated_data,
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
            "broadcast_takeaways": list(verdict.get("broadcastTakeaway", [])),
            "dossier": isolated_data.get("regulatoryDossier", {}),
            "transparency_card": {},
            "trace_logs": []
        }

    def run_audit(self, incident_data: Dict[str, Any]) -> Dict[str, Any]:
        """Executes the compiled LangGraph StateGraph deterministically."""
        initial_state = self._init_initial_state(incident_data)
        final_state = self.app.invoke(
            initial_state,
            config={"recursion_limit": GRAPH_RECURSION_LIMIT}
        )

        # Synchronize verdict payload with computed PDI & consistency while preserving all frontend keys
        merged_verdict = copy.deepcopy(incident_data.get("verdict", {}))
        merged_verdict["precedentDeviationIndex"] = final_state["pdi_score"]
        merged_verdict["consistencyScore"] = final_state["consistency_score"]
        merged_verdict["tier"] = final_state["verdict_tier"]

        return {
            "incidentId": final_state["incident_id"],
            "status": "DELIBERATION_COMPLETE",
            "spatialContext": final_state["spatial_context"],
            "refereeMemory": final_state["referee_memory"],
            "precedents": final_state["precedents_matched"],
            "debate": final_state["debate_turns"],
            "pdi": final_state["pdi_score"],
            "consistencyScore": final_state["consistency_score"],
            "verdict": merged_verdict,
            "transparencyCard": final_state["transparency_card"],
            "dossier": final_state["dossier"],
            "traceLogs": final_state["trace_logs"]
        }

    async def astream_audit(self, incident_data: Dict[str, Any]) -> AsyncGenerator[Dict[str, Any], None]:
        """Progressively yields step events as the LangGraph state transitions."""
        initial_state = self._init_initial_state(incident_data)
        async for output in self.app.astream(
            initial_state,
            config={"recursion_limit": GRAPH_RECURSION_LIMIT}
        ):
            for node_name, node_state in output.items():
                yield {
                    "node": node_name,
                    "state": node_state
                }
