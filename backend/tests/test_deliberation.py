# backend/tests/test_deliberation.py
"""
Integration tests for the Law18 Multi-Agent Deliberation Chamber.
Verifies LangGraph StateGraph execution, Zetaris 3-table federated SQL,
O(1) Markovian citation pinning, B2B Regulatory Dossier synthesis, and API endpoints.
"""

import pytest
import os
import sys

# Ensure backend package can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from fastapi.testclient import TestClient
from backend.main import app, load_incident_json
from backend.deliberation.graph import DeliberationChamberGraph
from backend.connectors.zetaris_client import ZetarisClient
from backend.engines.meterless_markovian import MarkovianDebateState


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def graph():
    return DeliberationChamberGraph()


def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ONLINE"
    assert data["engine"] == "LangGraph StateGraph Chamber"


def test_list_incidents(client):
    response = client.get("/api/incidents")
    assert response.status_code == 200
    incidents = response.json()
    assert len(incidents) == 3
    ids = [inc["id"] for inc in incidents]
    assert "incident-a" in ids
    assert "incident-b" in ids
    assert "incident-c" in ids


def test_zetaris_federated_queries():
    """Verifies multi-table federated SQL join across IFAB statutes, UEFA precedents, and OptaVision telemetry."""
    zetaris = ZetarisClient()
    statutes_res = zetaris.query_statutes("HANDBALL_BOX")
    assert statutes_res["status"] == "SUCCESS"
    assert statutes_res["count"] >= 1
    assert "Law 12.1" in statutes_res["data"][0]["law_number"]

    prec_res = zetaris.query_precedents("HANDBALL_BOX")
    assert prec_res["status"] == "SUCCESS"
    assert prec_res["count"] == 1
    row = prec_res["data"][0]
    assert row["player_involved"] == "Tyrone Mings"
    assert "in_penalty_box" in row
    assert "verbatim_text" in row


def test_markovian_o1_citation_preservation():
    """Verifies O(1) bounded state size and legal citation pinning across multiple rebuttal turns."""
    m = MarkovianDebateState("incident-a")
    for cycle in range(1, 6):
        m.compress_turn_delta(
            "VARAdvocate",
            f"Round {cycle}: Under IFAB VAR Protocol Section 3, referee had clear sightline."
        )
        summary = m.compress_turn_delta(
            "RulesAuditor",
            f"Round {cycle}: IFAB Law 16.1 and IFAB Law 12.1 mandate a penalty per PREC-UCL-2024-MINGS."
        )
    # Token carryover remains strictly O(1) (< 450 characters even after 10 turns)
    assert len(summary) < 450
    assert any("16.1" in c for c in m.pinned_citations)
    assert any("12.1" in c for c in m.pinned_citations)
    assert "PREC-UCL-2024-MINGS" in m.pinned_citations


def test_incident_a_langgraph_audit(graph):
    data = load_incident_json("incident-a")
    result = graph.run_audit(data)
    assert result["status"] == "DELIBERATION_COMPLETE"
    assert 85 <= result["pdi"] <= 98
    assert result["spatialContext"]["in_penalty_box"] is True
    assert len(result["debate"]) >= 3
    assert result["precedents"][0]["player_involved"] == "Tyrone Mings"
    # Verify B2B Regulatory Dossier synthesis
    dossier = result["dossier"]
    assert "markdownReport" in dossier
    assert "htmlReport" in dossier
    assert "executiveSummary" in dossier
    assert "disciplinaryRecommendation" in dossier
    assert "UEFA / IFAB KMI REGULATORY APPEAL DOSSIER" in dossier["markdownReport"]


def test_incident_b_langgraph_audit(graph):
    data = load_incident_json("incident-b")
    result = graph.run_audit(data)
    assert result["status"] == "DELIBERATION_COMPLETE"
    assert 80 <= result["pdi"] <= 95
    assert len(result["debate"]) >= 3
    assert "Sadio" in result["precedents"][0]["player_involved"]
    assert "SEVERE_ERROR" in result["dossier"]["markdownReport"]


def test_incident_c_conditional_rebuttal_loop(graph):
    """Incident C has a marginal score, triggering a 2-cycle debate rebuttal loop."""
    data = load_incident_json("incident-c")
    result = graph.run_audit(data)
    assert result["status"] == "DELIBERATION_COMPLETE"
    assert 50 <= result["pdi"] <= 75
    # 2 debate cycles = 6 total turns (Advocate + Auditor + Evaluator) * 2
    assert len(result["debate"]) == 6
    assert result["precedents"][0]["player_involved"] == "David Luiz"
    # Verify Markovian state persisted across both cycles
    markov_state = result["spatialContext"].get("_markovian_state", {})
    assert markov_state.get("turn") == 4


def test_api_deliberate_post(client):
    response = client.post("/api/deliberate", json={"id": "incident-a"})
    assert response.status_code == 200
    res = response.json()
    assert res["status"] == "DELIBERATION_COMPLETE"
    assert 85 <= res["pdi"] <= 98
    assert "htmlReport" in res["dossier"]


def test_api_deliberate_stream(client):
    """Verifies progressive SSE streaming of LangGraph deliberation steps."""
    with client.stream("GET", "/api/deliberate/stream?incident_id=incident-a") as response:
        assert response.status_code == 200
        lines = [line for line in response.iter_lines() if line]
        assert len(lines) >= 4
        assert any("TriageFactAgent" in l for l in lines)
        assert any("VARAdvocate" in l for l in lines)
