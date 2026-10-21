# backend/scripts/test_zetaris_live.py
"""
Zetaris Live Gateway Smoke-Test & Diagnostic Tool for Law18.
Run this script on Friday/Saturday as soon as Zetaris container or cloud instance is reachable.
Usage:
  python backend/scripts/test_zetaris_live.py
"""

import os
import sys
import time

# Ensure backend is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.connectors.zetaris_client import ZetarisClient


def main():
    print("=" * 70)
    print(" LAW18 - ZETARIS UNIFIED DATA FABRIC GATEWAY DIAGNOSTIC")
    print("=" * 70)

    url = os.getenv("ZETARIS_REST_URL", "http://localhost:8888/api/v1.0")
    key = os.getenv("ZETARIS_API_KEY", "")
    org = os.getenv("ZETARIS_ORG_ID", "1")
    offline = os.getenv("ZETARIS_OFFLINE_MODE", "false").lower() == "true"

    print(f"Target Gateway URL : {url}")
    print(f"API Key Configured : {'YES (Masked)' if key else 'NO (Falling back to SQLite mirror)'}")
    print(f"Organization ID    : {org}")
    print(f"Offline Mode Force : {offline}")
    print("-" * 70)

    client = ZetarisClient()

    # Test 1: Simple ping
    print("\n[TEST 1] Testing Gateway Ping / Connectivity...")
    t0 = time.perf_counter()
    ping_res = client.query("SELECT 1 AS live_ping;")
    elapsed = int((time.perf_counter() - t0) * 1000)
    print(f"  Status   : {ping_res.get('status')}")
    print(f"  Source   : {ping_res.get('source')}")
    print(f"  Latency  : {ping_res.get('executionTimeMs', elapsed)} ms")

    # Test 2: Federated Statutes Query
    print("\n[TEST 2] Testing IFAB Statutes Catalog Query...")
    statutes_res = client.query_statutes("HANDBALL_BOX")
    print(f"  Status   : {statutes_res.get('status')}")
    print(f"  Source   : {statutes_res.get('source')}")
    print(f"  Count    : {statutes_res.get('count')}")
    if statutes_res.get("data"):
        sample = statutes_res["data"][0]
        print(f"  Sample   : {sample.get('statute_id')} -> {sample.get('law_number')} ({sample.get('subclause_title')})")

    # Test 3: 3-Way Federated Precedent & Telemetry Join
    print("\n[TEST 3] Testing 3-Way Federated Join (Statutes + Precedents + Telemetry)...")
    join_res = client.query_precedents("HANDBALL_BOX")
    print(f"  Status   : {join_res.get('status')}")
    print(f"  Source   : {join_res.get('source')}")
    print(f"  Count    : {join_res.get('count')}")
    if join_res.get("data"):
        sample = join_res["data"][0]
        print(f"  Precedent: {sample.get('match_name')} ({sample.get('player_involved')})")
        print(f"  Telemetry: In-Box={sample.get('in_penalty_box')}, Force={sample.get('impact_force_kn')}kN")
        print(f"  Execution: {join_res.get('executionTimeMs')} ms")

    print("\n" + "=" * 70)
    if "ZETARIS_LIGHTNING_SQL_FABRIC" in str(join_res.get("source")):
        print(" SUCCESS: Connected to LIVE Zetaris Lightning SQL Fabric!")
    else:
        print(" NOTICE: Operating on Local SQLite Virtual Mirror (Deterministic Fallback).")
        print(" To switch to live Zetaris, set ZETARIS_API_KEY in your .env or shell environment.")
    print("=" * 70)


if __name__ == "__main__":
    main()
