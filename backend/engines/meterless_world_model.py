# backend/engines/meterless_world_model.py
"""
Meterless World Model Engine for Law18.
Maintains grounded queryable spatial state (105m x 68m pitch), entities, and geometric relationships.
"""

from typing import Dict, Any, List, Optional
import math

class WorldStoreService:
    def __init__(self):
        self.pitch_length = 105.0 # meters
        self.pitch_width = 68.0   # meters
        self.left_box = {"x_min": 0.0, "x_max": 16.5, "y_min": 13.84, "y_max": 54.16}
        self.right_box = {"x_min": 88.5, "x_max": 105.0, "y_min": 13.84, "y_max": 54.16}

    def is_inside_penalty_box(self, x: float, y: float, box_side: str = "left") -> bool:
        """Determines if a coordinate lies within standard 18-yard penalty box boundaries."""
        box = self.left_box if box_side == "left" else self.right_box
        return box["x_min"] <= x <= box["x_max"] and box["y_min"] <= y <= box["y_max"]

    def calculate_distance(self, p1: Dict[str, float], p2: Dict[str, float]) -> float:
        """Calculates Euclidean distance between two points in meters."""
        return math.sqrt((p1["x"] - p2["x"]) ** 2 + (p1["y"] - p2["y"]) ** 2)

    def evaluate_dogso_covering_defenders(
        self,
        attacker_pos: Dict[str, float],
        goal_pos: Dict[str, float],
        defenders: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Calculates whether any defending player is positioned within the recovery cone between attacker and goal.
        Essential for testing the 4th pillar of IFAB Law 12.3 DOGSO.
        """
        covering = []
        for d in defenders:
            # Check if defender is closer to goal along the X axis
            if d["x"] < attacker_pos["x"]:
                lateral_offset = abs(d["y"] - attacker_pos["y"])
                dist_to_attacker = self.calculate_distance({"x": d["x"], "y": d["y"]}, attacker_pos)
                if lateral_offset < 6.0 and dist_to_attacker < 8.0:
                    covering.append({
                        "id": d.get("id"),
                        "name": d.get("name"),
                        "distance_m": round(dist_to_attacker, 2),
                        "lateral_offset_m": round(lateral_offset, 2)
                    })

        return {
            "covering_defenders_count": len(covering),
            "covering_defenders": covering,
            "has_covering_recovery": len(covering) > 0,
            "dogso_disputed": len(covering) > 0
        }

class ContextBuilderService:
    def __init__(self, store: WorldStoreService):
        self.store = store

    def build_spatial_context(self, telemetry_data: Dict[str, Any]) -> Dict[str, Any]:
        """Builds structured geometric context for LangGraph agent nodes."""
        pitch = telemetry_data.get("pitch", {})
        players = pitch.get("players", [])
        ball = pitch.get("ball", {"x": 0.0, "y": 0.0, "elevation": 0.0})
        contact = pitch.get("contactPoint")

        in_box = False
        if contact:
            in_box = self.store.is_inside_penalty_box(contact["x"], contact["y"])

        # Find subject players
        subjects = [p for p in players if p.get("isActionSubject")]
        defenders = [p for p in players if p.get("team") == "BARCELONA" and not p.get("isActionSubject")]

        dogso_evaluation = None
        if len(subjects) >= 1:
            attacker = subjects[0]
            dogso_evaluation = self.store.evaluate_dogso_covering_defenders(
                {"x": attacker["x"], "y": attacker["y"]},
                {"x": 0.0, "y": 34.0},
                defenders
            )

        return {
            "in_penalty_box": in_box,
            "ball_elevation_m": ball.get("elevation", 0.0),
            "ball_speed_ms": ball.get("speed", 0.0),
            "dogso_metrics": dogso_evaluation,
            "provenance": "METERLESS_WORLD_MODEL_V1"
        }
