#!/usr/bin/env python3
# backend/run.py
"""
Law18 Programmatic CLI Runner for Hackathon Judges.
Executes an end-to-end multi-agent officiating audit directly from the terminal.
Usage:
    python backend/run.py --incident incident-a
    python backend/run.py --all
    python backend/run.py --serve --port 8000
"""

import sys
import os
import io
import time
import json
import uuid
import argparse
from datetime import datetime, timezone

# Safe standard output encoding for cross-platform terminals (including Windows cp1252)
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Ensure offline fallback is default when external API or Nightshift daemon is unconfigured
os.environ.setdefault("NVIDIA_OFFLINE_MODE", "true")

# Ensure backend package can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.deliberation.graph import DeliberationChamberGraph


def get_incident_filepath(incident_id: str) -> str:
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "data"))
    inc = incident_id.lower()
    if "incident-b" in inc or "incident_b" in inc or "fermin" in inc:
        return os.path.join(base_dir, "incident_b_fermin.json")
    elif "incident-c" in inc or "incident_c" in inc or "garcia" in inc:
        return os.path.join(base_dir, "incident_c_garcia.json")
    return os.path.join(base_dir, "incident_a_pubill.json")


def log_structured_trace(run_id: str, incident_id: str, result: dict, elapsed_ms: float):
    """Writes structured execution trace to backend/logs/trace-<run_id>.jsonl."""
    logs_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "logs"))
    os.makedirs(logs_dir, exist_ok=True)
    log_file = os.path.join(logs_dir, f"trace-{run_id}.jsonl")
    
    trace_payload = {
        "run_id": run_id,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "incident_id": incident_id,
        "elapsed_ms": round(elapsed_ms, 2),
        "status": result.get("status"),
        "pdi_score": result.get("pdi"),
        "consistency_score": result.get("consistencyScore"),
        "debate_turns_count": len(result.get("debate", [])),
        "spatial_context": result.get("spatialContext", {}),
        "trace_logs": result.get("traceLogs", [])
    }
    
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(json.dumps(trace_payload) + "\n")


def run_incident_audit(incident_id: str):
    file_path = get_incident_filepath(incident_id)

    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    start_time = time.time()
    run_id = str(uuid.uuid4())[:8]

    print("\n" + "=" * 80)
    print(" LAW18 COGNITIVE OFFICIATING CHAMBER -- AUDIT REPORT")
    print("=" * 80)
    print(f"RUN ID:     trace-{run_id}")
    print(f"INCIDENT:   {data['tabLabel']} -- {data['shortTitle']}")
    print(f"MATCH:      {data['matchHeader']['homeTeam']['name']} vs {data['matchHeader']['awayTeam']['name']} ({data['matchHeader']['competition']})")
    print(f"REFEREE:    {data['matchHeader']['referee']} | VAR: {data['matchHeader']['varReferee']}")
    print(f"ON-FIELD:   {data['matchHeader']['officialDecision']}")
    print("-" * 80)

    # Execute LangGraph Chamber
    graph = DeliberationChamberGraph()
    result = graph.run_audit(data)
    elapsed_ms = (time.time() - start_time) * 1000

    print("\n[STAGE 1: METERLESS WORLD MODEL (SPATIAL GROUNDING)]")
    spatial = result.get("spatialContext", {})
    print(f"  * In Penalty Box: {spatial.get('in_penalty_box', False)}")
    print(f"  * Ball Elevation: {spatial.get('ball_elevation_m', 0.0)}m")
    if spatial.get("dogso_metrics"):
        print(f"  * Covering Defenders in Recovery Cone: {spatial['dogso_metrics'].get('covering_defenders_count', 0)}")

    print("\n[STAGE 2: METERLESS H-MEM (REFEREE MEMORY CONTEXT)]")
    for line in result.get("refereeMemory", "").split("\n"):
        if line.strip():
            print(f"  {line}")

    print("\n[STAGE 3: ZETARIS DATA FABRIC (STATUTE & PRECEDENT QUERY)]")
    if result.get("precedents"):
        p = result["precedents"][0]
        print(f"  * Matched Precedent: {p.get('match_name')} ({p.get('player_involved')})")
        print(f"  * Law Cited:         {p.get('law_cited')}")
        sim = float(p.get("similarity_score", 0)) * 100
        print(f"  * Similarity Parity: {sim:.1f}%")
        print(f"  * Precedent Ruling:  {p.get('official_ruling')}")

    print("\n[STAGE 4: ADVERSARIAL DELIBERATION (NVIDIA NEMOTRON)]")
    for turn in result.get("debate", []):
        print(f"\n  >> [{turn.get('agent')} | {turn.get('role')}]:")
        print(f"     {turn.get('message')}")

    print("\n" + "-" * 80)
    verdict = result.get("verdict", data.get("verdict", {}))
    print(f" FINAL CONSISTENCY VERDICT: [{verdict.get('badgeLabel')}]")
    print(f" PRECEDENT DEVIATION INDEX: {result.get('pdi', verdict.get('precedentDeviationIndex'))}%")
    print(f" CONSISTENCY SCORE:         {result.get('consistencyScore', verdict.get('consistencyScore'))}%")
    print(f" HEADLINE: {verdict.get('headline')}")
    print(f" AUDIT LATENCY:             {elapsed_ms:.2f}ms")
    print("-" * 80)
    print(" BROADCAST TAKEAWAY BULLETS:")
    for idx, bullet in enumerate(verdict.get("broadcastTakeaway", []), 1):
        print(f"   0{idx}. {bullet}")
    print("=" * 80 + "\n")

    # Save structured audit trace
    log_structured_trace(run_id, incident_id, result, elapsed_ms)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Law18 Autonomous Officiating Audit Runner")
    parser.add_argument("--incident", type=str, default="incident-a", help="Incident ID: incident-a, incident-b, or incident-c")
    parser.add_argument("--all", action="store_true", help="Audit all three benchmark incidents sequentially")
    parser.add_argument("--serve", action="store_true", help="Start the FastAPI backend server")
    parser.add_argument("--port", type=int, default=8000, help="Server port (default: 8000)")
    args = parser.parse_args()

    if args.serve:
        import uvicorn
        from backend.main import app
        uvicorn.run(app, host="0.0.0.0", port=args.port)
    elif args.all:
        for inc in ["incident-a", "incident-b", "incident-c"]:
            run_incident_audit(inc)
    else:
        run_incident_audit(args.incident)
