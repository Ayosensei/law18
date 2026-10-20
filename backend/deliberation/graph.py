# backend/deliberation/graph.py
"""
Multi-Agent Deliberation Graph for Law18.
Orchestrates the Cognitive Officiating Chamber:
Triage -> VAR Advocate <-> Rules Auditor -> Consistency Evaluator -> KMI Synthesizer.
"""

from typing import Dict, Any, List, TypedDict, Optional
from backend.engines.meterless_world_model import WorldStoreService, ContextBuilderService
from backend.engines.meterless_hmem import HMEMRefereeMemory
from backend.engines.meterless_markovian import MarkovianDebateState
from backend.connectors.zetaris_client import ZetarisClient
from backend.connectors.nvidia_client import NvidiaNemotronClient

class DeliberationGraphState(TypedDict):
    incident_id: str
    telemetry: Dict[str, Any]
    match_header: Dict[str, Any]
    spatial_context: Dict[str, Any]
    referee_memory: str
    precedents_matched: List[Dict[str, Any]]
    advocate_turn: str
    auditor_turn: str
    debate_carryover: str
    pdi_score: int
    consistency_verdict: str
    broadcast_takeaways: List[str]
    dossier: Dict[str, Any]

class DeliberationChamberGraph:
    def __init__(self):
        self.world_model = ContextBuilderService(WorldStoreService())
        self.hmem = HMEMRefereeMemory()
        self.zetaris = ZetarisClient()
        self.nemotron = NvidiaNemotronClient()

    def run_audit(self, incident_data: Dict[str, Any]) -> Dict[str, Any]:
        """Executes the full multi-agent deliberation graph deterministically."""
        incident_id = incident_data.get("id", "incident-a")
        telemetry = incident_data.get("telemetry", {})
        match_header = incident_data.get("matchHeader", {})
        referee = match_header.get("referee", "Unknown Referee")

        # 1. Triage & Spatial Verification Node (Meterless World Model)
        spatial_ctx = self.world_model.build_spatial_context(telemetry)

        # 2. Memory Hydration Node (Meterless H-MEM)
        ref_memory = self.hmem.retrieve_referee_context(referee, incident_id)

        # 3. Statute & Precedent Retrieval Node (Zetaris Virtual Data Fabric)
        sql_query = "SELECT * FROM virtual_ifab_archive WHERE incident_type = 'HANDBALL_BOX' LIMIT 1;"
        if "collision" in incident_id or "fermin" in incident_id:
            sql_query = "SELECT * FROM virtual_ifab_archive WHERE incident_type = 'HIGH_BOOT_HEAD_CONTACT' LIMIT 1;"
        elif "garcia" in incident_id or "dogso" in incident_id:
            sql_query = "SELECT * FROM virtual_ifab_archive WHERE incident_type = 'DOGSO' LIMIT 1;"

        zetaris_res = self.zetaris.query(sql_query)
        matched_precedents = zetaris_res.get("data", [])

        # 4. Markovian State Initialization
        markovian = MarkovianDebateState(incident_id)

        # 5. VAR Advocate Node (Nemotron Inference with H-MEM defense)
        advocate_prompt = f"Defend referee {referee}'s decision using Clear & Obvious threshold.\nContext: {ref_memory}"
        advocate_res = self.nemotron.deliberate(
            system_prompt="You are the VAR Advocate defending on-field referee discretion.",
            user_prompt=advocate_prompt,
            agent_name="VARAdvocate",
            incident_id=incident_id
        )
        markovian.compress_turn_delta("VARAdvocate", advocate_res)

        # 6. Rules Auditor Node (Nemotron Inference with Zetaris Precedent Prosecution)
        precedent_text = matched_precedents[0].get("deviation_analysis", "") if matched_precedents else ""
        auditor_prompt = f"Prosecute potential error using IFAB laws and precedent: {precedent_text}"
        auditor_res = self.nemotron.deliberate(
            system_prompt="You are the IFAB Rules Auditor prosecuting referee inconsistency.",
            user_prompt=auditor_prompt,
            agent_name="RulesAuditor",
            incident_id=incident_id
        )
        markovian.compress_turn_delta("RulesAuditor", auditor_res)

        # 7. Consistency Evaluator & Arbitration Node (Nemotron Adjudication)
        evaluator_prompt = f"Arbitrate debate:\nAdvocate: {advocate_res}\nAuditor: {auditor_res}"
        evaluator_res = self.nemotron.deliberate(
            system_prompt="You are the Consistency Evaluator arbitrating the final PDI score.",
            user_prompt=evaluator_prompt,
            agent_name="ConsistencyEvaluator",
            incident_id=incident_id
        )

        # 8. KMI Synthesis Node (Combine into complete audited state)
        verdict = incident_data.get("verdict", {})
        return {
            "incidentId": incident_id,
            "status": "DELIBERATION_COMPLETE",
            "spatialContext": spatial_ctx,
            "refereeMemory": ref_memory,
            "precedents": matched_precedents,
            "debate": [
                {"agent": "VARAdvocate", "role": "DEFENSE", "message": advocate_res},
                {"agent": "RulesAuditor", "role": "PROSECUTION", "message": auditor_res},
                {"agent": "ConsistencyEvaluator", "role": "ARBITRATION", "message": evaluator_res}
            ],
            "markovianCarryover": markovian.carryover_summary,
            "verdict": verdict,
            "dossier": incident_data.get("regulatoryDossier", {})
        }
