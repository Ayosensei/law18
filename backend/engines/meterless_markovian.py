# backend/engines/meterless_markovian.py
"""
Meterless Markovian Agent Engine for Law18.
Maintains bounded-context long-task reasoning with strictly O(1) token carryover per round.
Pins statutory citations (IFAB Laws, VAR Protocol sections, Precedent IDs) in a fixed-width
register while overwriting transient positional clauses so token budgets never grow linearly.
"""

import re
from typing import Dict, Any, List, Optional


class MarkovianDebateState:
    """
    Fixed-Slot O(1) Markovian State Register:
      State_{t+1} = f(State_t, Delta_t)
    Instead of concatenating historical turns (O(N) growth), maintains a constant-size
    semantic frame containing:
      - defense_claim: latest compressed VARAdvocate thesis (<= 140 chars)
      - prosecution_claim: latest compressed RulesAuditor thesis (<= 140 chars)
      - pinned_citations: deduplicated bounded set of IFAB statutes & UEFA precedents (max 8)
      - conflict_locus: synthesized core point of contention
    """

    CITATION_PATTERNS = [
        r"IFAB\s+Law\s+\d+(?:\.\d+)?",
        r"Law\s+\d+(?:\.\d+)?",
        r"VAR\s+Protocol\s+(?:Section|§)\s*\d+(?:\.\d+)?",
        r"PREC-[A-Z0-9-]+",
        r"#UCL-\d{4}-\d+",
        r"(?:Tyrone\s+Mings|Sadio\s+Mané|David\s+Luiz|Ederson)\s*(?:\(\d{4}\))?"
    ]

    def __init__(self, incident_id: str, max_turns: int = 4):
        self.incident_id = incident_id
        self.turn = 0
        self.max_turns = max_turns
        self.defense_claim: str = "Pending Defense"
        self.prosecution_claim: str = "Pending Prosecution"
        self.pinned_citations: List[str] = []
        self.carryover_summary: str = ""

    @classmethod
    def extract_legal_citations(cls, text: str) -> List[str]:
        """Extracts statutory and precedent citations before semantic text compression."""
        if not text:
            return []
        found: List[str] = []
        for pattern in cls.CITATION_PATTERNS:
            for match in re.findall(pattern, text, flags=re.IGNORECASE):
                cleaned = re.sub(r"\s+", " ", match.strip())
                if cleaned and cleaned not in found:
                    found.append(cleaned)
        return found

    @staticmethod
    def _extract_core_thesis(argument_text: str, max_chars: int = 135) -> str:
        """
        Extracts the highest-signal legal conclusion sentence rather than blind prefix slicing,
        guaranteeing bounded character length.
        """
        if not argument_text:
            return ""
        clean = re.sub(r"\s+", " ", argument_text).strip()
        # Strip role prefixes like "Advocate Position:" or "Audit Objection:"
        clean = re.sub(r"^(?:Advocate Position|Audit Objection|Arbitration Finding)\s*:\s*", "", clean, flags=re.IGNORECASE)
        sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", clean) if s.strip()]
        if not sentences:
            return clean[:max_chars]

        # Prioritize sentences containing statutory/decisive keywords
        priority_keywords = ("explicitly", "mandates", "threshold", "criterion", "precedent", "law", "overturn", "defend")
        chosen = sentences[0]
        for s in sentences:
            if any(k in s.lower() for k in priority_keywords):
                chosen = s
                break

        if len(chosen) > max_chars:
            return chosen[: max_chars - 3].rstrip() + "..."
        return chosen

    def compress_turn_delta(
        self,
        agent_name: str,
        argument_text: str,
        explicit_citations: Optional[List[str]] = None
    ) -> str:
        """
        Updates the O(1) Markovian register with the latest agent turn and returns the
        bounded carryover state string (guaranteed <= ~110 tokens regardless of cycle count).
        """
        self.turn += 1

        # 1. Harvest and pin legal citations (capped at 8 unique anchors for strict O(1) bound)
        extracted = self.extract_legal_citations(argument_text)
        if explicit_citations:
            extracted.extend(explicit_citations)
        for cit in extracted:
            if cit not in self.pinned_citations and len(self.pinned_citations) < 8:
                self.pinned_citations.append(cit)

        # 2. Overwrite the role-specific thesis slot (O(1) in-place update, no linear append)
        core_thesis = self._extract_core_thesis(argument_text)
        agent_key = str(agent_name).lower()
        if "advocate" in agent_key or "defense" in agent_key:
            self.defense_claim = core_thesis
        elif "auditor" in agent_key or "prosecut" in agent_key:
            self.prosecution_claim = core_thesis

        # 3. Synthesize fixed-width Markovian state snapshot
        citations_str = ", ".join(self.pinned_citations) if self.pinned_citations else "IFAB Statutory Baseline"
        self.carryover_summary = (
            f"[MARKOVIAN STATE | Inc:{self.incident_id} | Turn:{self.turn}] "
            f"DEF_SLOT: {self.defense_claim} || "
            f"PROS_SLOT: {self.prosecution_claim} || "
            f"PINNED_CITATIONS: [{citations_str}]"
        )
        return self.carryover_summary

    def to_dict(self) -> Dict[str, Any]:
        """Serializes the O(1) Markovian state for LangGraph state persistence."""
        return {
            "incident_id": self.incident_id,
            "turn": self.turn,
            "max_turns": self.max_turns,
            "defense_claim": self.defense_claim,
            "prosecution_claim": self.prosecution_claim,
            "pinned_citations": list(self.pinned_citations),
            "carryover_summary": self.carryover_summary,
            "bounded_tokens_estimate": max(1, len(self.carryover_summary) // 4)
        }

    @classmethod
    def from_dict(cls, data: Optional[Dict[str, Any]], incident_id: str = "incident-a") -> "MarkovianDebateState":
        """Restores Markovian state across LangGraph cycles without losing pinned citations."""
        instance = cls(incident_id=data.get("incident_id", incident_id) if data else incident_id)
        if data:
            instance.turn = int(data.get("turn", 0))
            instance.max_turns = int(data.get("max_turns", 4))
            instance.defense_claim = str(data.get("defense_claim", "Pending Defense"))
            instance.prosecution_claim = str(data.get("prosecution_claim", "Pending Prosecution"))
            instance.pinned_citations = list(data.get("pinned_citations", []))
            instance.carryover_summary = str(data.get("carryover_summary", ""))
        return instance

    def should_terminate_debate(self) -> bool:
        """Enforces strict bound on adversarial loops before mandatory arbitration."""
        return self.turn >= self.max_turns
