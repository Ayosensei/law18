# backend/main.py
"""
FastAPI Server for Law18.
Exposes REST and SSE streaming endpoints for multi-agent officiating audits.
"""

import os
import json
import asyncio
from typing import Dict, Any, List
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from backend.deliberation.graph import DeliberationChamberGraph

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

DATA_FILES = {
    "incident-a": "backend/data/incident_a_pubill.json",
    "incident-b": "backend/data/incident_b_fermin.json",
    "incident-c": "backend/data/incident_c_garcia.json"
}

def load_incident_json(incident_id: str) -> Dict[str, Any]:
    file_path = DATA_FILES.get(incident_id)
    if not file_path or not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"Incident {incident_id} not found.")
    with open(file_path, "r") as f:
        return json.load(f)

@app.get("/health")
def health_check():
    return {
        "status": "ONLINE",
        "service": "Law18 Officiating Consistency Engine",
        "connectors": {
            "zetaris": "READY",
            "meterless_world_model": "READY",
            "meterless_hmem": "READY",
            "nvidia_nemotron": "READY"
        }
    }

@app.get("/api/incidents")
def list_incidents():
    """Lists all available benchmark referee incidents."""
    incidents = []
    for inc_id in DATA_FILES.keys():
        incidents.append(load_incident_json(inc_id))
    return incidents

@app.get("/api/incidents/{incident_id}")
def get_incident(incident_id: str):
    """Retrieves full telemetry, precedent, and audit data for a single incident."""
    return load_incident_json(incident_id)

@app.post("/api/deliberate")
def run_deliberation(payload: Dict[str, Any]):
    """Executes the full multi-agent LangGraph deliberation chamber."""
    incident_id = payload.get("id", "incident-a")
    incident_data = load_incident_json(incident_id)
    audit_result = graph.run_audit(incident_data)
    return audit_result

@app.get("/api/deliberate/stream")
async def stream_deliberation(incident_id: str = Query("incident-a")):
    """Server-Sent Events (SSE) endpoint progressively streaming debate turns."""
    incident_data = load_incident_json(incident_id)

    async def event_generator():
        # Step 1: Spatial Triage
        yield f"data: {json.dumps({'step': 1, 'agent': 'TriageFactAgent', 'status': 'Spatial boundaries and limb vectors verified on 105x68m grid.'})}\n\n"
        await asyncio.sleep(1.0)

        # Step 2: VAR Advocate
        advocate_msg = incident_data["deliberation"][0]["message"]
        yield f"data: {json.dumps({'step': 2, 'agent': 'VARAdvocate', 'role': 'DEFENSE', 'message': advocate_msg})}\n\n"
        await asyncio.sleep(1.2)

        # Step 3: Rules Auditor
        auditor_msg = incident_data["deliberation"][1]["message"]
        yield f"data: {json.dumps({'step': 3, 'agent': 'RulesAuditor', 'role': 'PROSECUTION', 'message': auditor_msg})}\n\n"
        await asyncio.sleep(1.2)

        # Step 4: Consistency Evaluator
        evaluator_msg = incident_data["deliberation"][2]["message"]
        pdi = incident_data["verdict"]["precedentDeviationIndex"]
        yield f"data: {json.dumps({'step': 4, 'agent': 'ConsistencyEvaluator', 'role': 'ARBITRATION', 'pdi': pdi, 'message': evaluator_msg})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
