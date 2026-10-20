"""
Integration tests for the Law18 Multi-Agent Deliberation Chamber.
Verifies LangGraph StateGraph execution, API endpoints, and PDI scoring.
"""

import pytest
import os
import sys

# Ensure backend package can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from fastapi.testclient import TestClient
from backend.main import app, load_incident_json
from backend.deliberation.graph import DeliberationChamberGraph


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


def test_incident_a_langgraph_audit(graph):
    data = load_incident_json("incident-a")
    result = graph.run_audit(data)
    assert result["status"] == "DELIBERATION_COMPLETE"
    assert result["pdi"] == 92
    assert result["spatialContext"]["in_penalty_box"] is True
    assert len(result["debate"]) >= 3


def test_incident_b_langgraph_audit(graph):
    data = load_incident_json("incident-b")
    result = graph.run_audit(data)
    assert result["status"] == "DELIBERATION_COMPLETE"
    assert result["pdi"] == 86
    assert len(result["debate"]) >= 3


def test_incident_c_conditional_rebuttal_loop(graph):
    """Incident C has a marginal score, triggering a 2-cycle debate rebuttal loop."""
    data = load_incident_json("incident-c")
    result = graph.run_audit(data)
    assert result["status"] == "DELIBERATION_COMPLETE"
    assert result["pdi"] == 58
    # 2 debate cycles = 6 total turns (Advocate + Auditor + Evaluator) * 2
    assert len(result["debate"]) == 6


def test_api_deliberate_post(client):
    response = client.post("/api/deliberate", json={"id": "incident-a"})
    assert response.status_code == 200
    res = response.json()
    assert res["status"] == "DELIBERATION_COMPLETE"
    assert res["pdi"] == 92
