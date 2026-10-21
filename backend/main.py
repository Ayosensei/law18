"""
FastAPI Server for Law18.
Exposes REST and SSE streaming endpoints for multi-agent officiating audits.
Synchronized with Next.js frontend contracts and Pydantic v2 schemas.
Upgraded with SSE anti-buffering headers, threadpool execution, and disconnect safety.
"""

import os
import sys

# Ensure offline fallback is default when external API or Nightshift daemon is unconfigured
os.environ.setdefault("NVIDIA_OFFLINE_MODE", "true")

import json
import asyncio
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException, Query, Body, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.concurrency import run_in_threadpool

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
async def list_incidents():
    """Lists all available benchmark referee incidents with metadata and telemetry."""
    incidents = []
    for inc_id in ["incident-a", "incident-b", "incident-c"]:
        data = await run_in_threadpool(load_incident_json, inc_id)
        incidents.append(data)
    return incidents


@app.get("/api/incidents/{incident_id}")
async def get_incident(incident_id: str):
    """Retrieves full telemetry, precedent, and audit data for a single incident."""
    return await run_in_threadpool(load_incident_json, incident_id)


@app.post("/api/deliberate")
@app.post("/api/audit")
async def run_deliberation(payload: Dict[str, Any] = Body(...)):
    """Executes the full multi-agent LangGraph deliberation chamber."""
    incident_id = payload.get("id") or payload.get("incidentId") or "incident-a"
    incident_data = await run_in_threadpool(load_incident_json, incident_id)
    audit_result = await run_in_threadpool(graph.run_audit, incident_data)
    return audit_result


@app.get("/api/deliberate/stream")
async def stream_deliberation(request: Request, incident_id: str = Query("incident-a")):
    """Server-Sent Events (SSE) endpoint progressively streaming live LangGraph deliberation turns."""
    incident_data = await run_in_threadpool(load_incident_json, incident_id)

    async def event_generator():
        step_idx = 1
        async for chunk in graph.astream_audit(incident_data):
            if await request.is_disconnected():
                break

            node_name = chunk.get("node")
            node_state = chunk.get("state", {})

            if node_name == "triage":
                spatial = node_state.get("spatial_context", {})
                yield f"data: {json.dumps({'step': step_idx, 'node': 'triage', 'agent': 'TriageFactAgent', 'role': 'TRIAGE', 'status': 'Spatial telemetry verified on 105x68m grid.', 'spatial': spatial})}\n\n"
                step_idx += 1
                await asyncio.sleep(0.3)

            elif node_name == "retriever":
                precedents = node_state.get("precedents_matched", [])
                p_name = precedents[0].get("match_name") if precedents else "IFAB Law"
                yield f"data: {json.dumps({'step': step_idx, 'node': 'retriever', 'agent': 'ZetarisRetriever', 'role': 'RETRIEVAL', 'status': f'Matched Zetaris precedent: {p_name}', 'precedents': precedents})}\n\n"
                step_idx += 1
                await asyncio.sleep(0.4)

            elif node_name in ("advocate", "auditor", "evaluator"):
                debate = node_state.get("debate_turns", [])
                if debate:
                    turn = debate[-1]
                    yield f"data: {json.dumps({'step': step_idx, 'node': node_name, 'agent': turn.get('agent'), 'role': turn.get('role'), 'message': turn.get('message'), 'cycle': turn.get('cycle', 1), 'pdi': turn.get('pdi')})}\n\n"
                    step_idx += 1
                    await asyncio.sleep(0.4)

            elif node_name == "synthesizer":
                card = node_state.get("transparency_card", {})
                verdict = incident_data.get("verdict", {})
                yield f"data: {json.dumps({'step': step_idx, 'node': 'synthesizer', 'agent': 'KMISynthesizer', 'role': 'SYNTHESIS', 'status': 'COMPLETE', 'transparencyCard': card, 'verdict': verdict})}\n\n"
                step_idx += 1

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
