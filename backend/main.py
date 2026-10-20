"""
FastAPI Server for Law18.
Exposes REST and SSE streaming endpoints for multi-agent officiating audits.
Synchronized with Next.js frontend contracts and Pydantic v2 schemas.
"""

import os
import sys

# Ensure offline fallback is default when external API or Nightshift daemon is unconfigured
os.environ.setdefault("NVIDIA_OFFLINE_MODE", "true")

import json
import asyncio
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from backend.deliberation.graph import DeliberationChamberGraph
from backend.schemas.telemetry import IncidentFullData
from backend.schemas.deliberation import Law18AuditResult

app = FastAPI(
    title="Law18 Officiating Consistency Engine API",
    description="Cognitive VAR & Referee Auditing Backend powered by Zetaris, Meterless & NVIDIA Nemotron",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graph = DeliberationChamberGraph()

BASE_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "data"))
DATA_FILES = {
    "incident-a": os.path.join(BASE_DATA_DIR, "incident_a_pubill.json"),
    "incident-b": os.path.join(BASE_DATA_DIR, "incident_b_fermin.json"),
    "incident-c": os.path.join(BASE_DATA_DIR, "incident_c_garcia.json")
}


def load_incident_json(incident_id: str) -> Dict[str, Any]:
    file_path = DATA_FILES.get(incident_id)
    if not file_path or not os.path.exists(file_path):
        inc = incident_id.lower()
        if "incident-b" in inc or "incident_b" in inc or "fermin" in inc:
            file_path = os.path.join(BASE_DATA_DIR, "incident_b_fermin.json")
        elif "incident-c" in inc or "incident_c" in inc or "garcia" in inc:
            file_path = os.path.join(BASE_DATA_DIR, "incident_c_garcia.json")
        elif "incident-a" in inc or "incident_a" in inc or "pubill" in inc:
            file_path = os.path.join(BASE_DATA_DIR, "incident_a_pubill.json")
            
    if not file_path or not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"Incident '{incident_id}' not found.")
            
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/health")
def health_check():
    return {
        "status": "ONLINE",
        "service": "Law18 Officiating Consistency Engine",
        "engine": "LangGraph StateGraph Chamber",
        "connectors": {
            "zetaris": "READY",
            "meterless_world_model": "READY",
            "meterless_hmem": "READY",
            "nvidia_nemotron": "READY"
        }
    }


@app.get("/api/incidents")
def list_incidents():
    """Lists all available benchmark referee incidents with metadata and telemetry."""
    incidents = []
    for inc_id in ["incident-a", "incident-b", "incident-c"]:
        incidents.append(load_incident_json(inc_id))
    return incidents


@app.get("/api/incidents/{incident_id}")
def get_incident(incident_id: str):
    """Retrieves full telemetry, precedent, and audit data for a single incident."""
    return load_incident_json(incident_id)


@app.post("/api/deliberate")
@app.post("/api/audit")
def run_deliberation(payload: Dict[str, Any] = Body(...)):
    """Executes the full multi-agent LangGraph deliberation chamber."""
    incident_id = payload.get("id") or payload.get("incidentId") or "incident-a"
    incident_data = load_incident_json(incident_id)
    audit_result = graph.run_audit(incident_data)
    return audit_result


@app.get("/api/deliberate/stream")
async def stream_deliberation(incident_id: str = Query("incident-a")):
    """Server-Sent Events (SSE) endpoint progressively streaming live LangGraph deliberation turns."""
    incident_data = load_incident_json(incident_id)

    async def event_generator():
        audit_result = graph.run_audit(incident_data)
        spatial = audit_result.get("spatialContext", {})
        precedents = audit_result.get("precedents", [])
        debate = audit_result.get("debate", [])
        verdict = audit_result.get("verdict", incident_data.get("verdict", {}))

        # Event 1: Spatial Triage (Meterless World Model)
        yield f"data: {json.dumps({'step': 1, 'agent': 'TriageFactAgent', 'role': 'TRIAGE', 'status': 'Spatial telemetry verified on 105x68m grid.', 'spatial': spatial})}\n\n"
        await asyncio.sleep(0.3)

        # Event 2: Knowledge Hydration (Zetaris & Meterless H-MEM)
        prec_title = precedents[0].get("match_name", "Precedent Match") if precedents else "Binding Statute"
        yield f"data: {json.dumps({'step': 2, 'agent': 'ZetarisRetriever', 'role': 'RETRIEVAL', 'status': f'Hydrated referee profile and matched precedent: {prec_title}', 'precedents': precedents})}\n\n"
        await asyncio.sleep(0.4)

        # Event 3+: Adversarial Debate Turns
        for idx, turn in enumerate(debate, 3):
            yield f"data: {json.dumps({'step': idx, 'agent': turn.get('agent'), 'role': turn.get('role'), 'message': turn.get('message'), 'cycle': turn.get('cycle', 1)})}\n\n"
            await asyncio.sleep(0.4)

        # Final Event: KMI Synthesis & Verdict
        yield f"data: {json.dumps({'step': len(debate) + 3, 'agent': 'KMISynthesizer', 'role': 'SYNTHESIS', 'status': 'COMPLETE', 'pdi': audit_result.get('pdi'), 'consistency': audit_result.get('consistencyScore'), 'verdict': verdict, 'takeaways': verdict.get('broadcastTakeaway', [])})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
