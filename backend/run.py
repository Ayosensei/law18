#!/usr/bin/env python3
# backend/run.py
"""
Law18 Programmatic CLI Runner for Hackathon Judges.
Executes an end-to-end multi-agent officiating audit directly from the terminal.
Usage:
    python3 backend/run.py --incident incident-a
    python3 backend/run.py --all
"""

import sys
import os
import json
import argparse

# Ensure backend package can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.deliberation.graph import DeliberationChamberGraph

def run_incident_audit(incident_id: str):
    file_path = f"backend/data/{incident_id.replace('-', '_')}_pubill.json"
    if "incident_b" in incident_id or "fermin" in incident_id:
        file_path = "backend/data/incident_b_fermin.json"
    elif "incident_c" in incident_id or "garcia" in incident_id:
        file_path = "backend/data/incident_c_garcia.json"
    else:
        file_path = "backend/data/incident_a_pubill.json"

    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    with open(file_path, "r") as f:
        data = json.load(f)

    print("\n" + "=" * 80)
    print(f" LAW18 COGNITIVE OFFICIATING CHAMBER — AUDIT REPORT")
    print("=" * 80)
    print(f"INCIDENT:   {data['tabLabel']} — {data['shortTitle']}")
    print(f"MATCH:      {data['matchHeader']['homeTeam']['name']} vs {data['matchHeader']['awayTeam']['name']} ({data['matchHeader']['competition']})")
    print(f"REFEREE:    {data['matchHeader']['referee']} | VAR: {data['matchHeader']['varReferee']}")
    print(f"ON-FIELD:   {data['matchHeader']['officialDecision']}")
    print("-" * 80)

    # Initialize graph
    graph = DeliberationChamberGraph()
    result = graph.run_audit(data)

    print("\n[STAGE 1: METERLESS WORLD MODEL (SPATIAL GROUNDING)]")
    print(f"  • In Penalty Box: {result['spatialContext']['in_penalty_box']}")
    print(f"  • Ball Elevation: {result['spatialContext']['ball_elevation_m']}m")
    if result['spatialContext'].get('dogso_metrics'):
        print(f"  • Covering Defenders in Recovery Cone: {result['spatialContext']['dogso_metrics']['covering_defenders_count']}")

    print("\n[STAGE 2: METERLESS H-MEM (REFEREE MEMORY CONTEXT)]")
    for line in result['refereeMemory'].split("\n"):
        print(f"  {line}")

    print("\n[STAGE 3: ZETARIS DATA FABRIC (STATUTE & PRECEDENT QUERY)]")
    if result['precedents']:
        p = result['precedents'][0]
        print(f"  • Matched Precedent: {p.get('match_name')} ({p.get('player_involved')})")
        print(f"  • Law Cited:         {p.get('law_cited')}")
        print(f"  • Similarity Parity: {float(p.get('similarity_score', 0))*100:.1f}%")
        print(f"  • Precedent Ruling:  {p.get('official_ruling')}")

    print("\n[STAGE 4: ADVERSARIAL DELIBERATION (NVIDIA NEMOTRON)]")
    for turn in result['debate']:
        print(f"\n  ▶ [{turn['agent']} | {turn['role']}]:")
        print(f"    {turn['message']}")

    print("\n" + "-" * 80)
    print(f" FINAL CONSISTENCY VERDICT: [{data['verdict']['badgeLabel']}]")
    print(f" PRECEDENT DEVIATION INDEX: {data['verdict']['precedentDeviationIndex']}%")
    print(f" HEADLINE: {data['verdict']['headline']}")
    print("-" * 80)
    print(" BROADCAST TAKEAWAY BULLETS:")
    for idx, bullet in enumerate(data['verdict']['broadcastTakeaway'], 1):
        print(f"   0{idx}. {bullet}")
    print("=" * 80 + "\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Law18 Autonomous Officiating Audit Runner")
    parser.add_argument("--incident", type=str, default="incident-a", help="Incident ID: incident-a, incident-b, or incident-c")
    parser.add_argument("--all", action="store_true", help="Audit all three benchmark incidents sequentially")
    args = parser.parse_args()

    if args.all:
        for inc in ["incident-a", "incident-b", "incident-c"]:
            run_incident_audit(inc)
    else:
        run_incident_audit(args.incident)
