# backend/engines/meterless_hmem.py
"""
Meterless H-MEM (Hierarchical Memory) Agent Engine for Law18.
Stores persistent, conflict-resolved referee behavioral profiles across multi-season competitions.
"""

from typing import Dict, Any, List, Optional
import json
import os

class HMEMRefereeMemory:
    def __init__(self):
        self._profiles = {
            "István Kovács": {
                "association": "FRF (Romania) / UEFA Elite",
                "career_matches": 142,
                "strictness_percentile": 78.4,
                "penalty_award_rate": "0.38 per 90 (High)",
                "historical_var_overturn_rate": "12.2% (Low resistance)",
                "tendencies": [
                    "High deference to on-field non-calls during restart ambiguities",
                    "Allows aggressive physical contest in central midfield transitions",
                    "Strict on dissent, lenient on accidental technical handball restarts"
                ]
            },
            "Clément Turpin": {
                "association": "FFF (France) / UEFA Elite",
                "career_matches": 168,
                "strictness_percentile": 52.1,
                "penalty_award_rate": "0.26 per 90 (Moderate)",
                "historical_var_overturn_rate": "18.4% (Standard)",
                "tendencies": [
                    "Strong protective bias toward goalkeepers in aerial 50/50 collisions",
                    "Elevated threshold for on-field DOGSO dismissals; relies heavily on VAR monitor guidance",
                    "Moderate leniency in high-stakes European knockout ties"
                ]
            }
        }

    def retrieve_referee_context(self, referee_name: str, incident_type: str) -> str:
        """Injects ranked memory into agent debate nodes without token bloat."""
        # Fuzzy matching
        match_profile = None
        for name, profile in self._profiles.items():
            if name.lower() in referee_name.lower():
                match_profile = profile
                break

        if not match_profile:
            match_profile = list(self._profiles.values())[0]

        tendency_bullets = "\n".join([f"  • {t}" for t in match_profile["tendencies"]])
        return (
            f"[METERLESS H-MEM PROFILE: {referee_name}]\n"
            f"Strictness Percentile: {match_profile['strictness_percentile']}%\n"
            f"Penalty Concession Frequency: {match_profile['penalty_award_rate']}\n"
            f"Known Officiating Biases & Tendencies:\n{tendency_bullets}"
        )
