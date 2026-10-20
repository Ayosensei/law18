# backend/engines/meterless_markovian.py
"""
Meterless Markovian Agent Engine for Law18.
Maintains bounded-context long-task reasoning with compressed state carryover (O(1) tokens per round).
Prevents LLM token budget explosion during multi-turn adversarial VAR review.
"""

from typing import Dict, Any, List

class MarkovianDebateState:
    def __init__(self, incident_id: str):
        self.incident_id = incident_id
        self.turn = 0
        self.max_turns = 2
        self.carryover_summary = ""

    def compress_turn_delta(self, agent_name: str, argument_text: str) -> str:
        """
        Compresses an agent turn into a concise carryover delta.
        State_{t+1} = f(State_t, Delta_t)
        """
        self.turn += 1
        summary_snippet = argument_text[:140].replace("\n", " ") + "..."
        delta = f"[Turn {self.turn} | {agent_name}]: {summary_snippet}"
        if self.carryover_summary:
            self.carryover_summary += f" -> {delta}"
        else:
            self.carryover_summary = delta
        return self.carryover_summary

    def should_terminate_debate(self) -> bool:
        """Enforces strict bound on adversarial loops before mandatory arbitration."""
        return self.turn >= self.max_turns
