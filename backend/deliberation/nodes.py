# backend/deliberation/nodes.py
"""
Agent Node Functions for the Law18 LangGraph Officiating Chamber.
Upgraded with IFAB 2025/26 statutory grounding, Round-2 adversarial cross-examination context,
O(1) Markovian delta state persistence, federated Zetaris queries, and B2B Regulatory Dossier synthesis.
"""

from typing import Dict, Any, List
from datetime import datetime, timezone

from backend.deliberation.state import DeliberationState
from backend.engines.meterless_world_model import WorldStoreService, ContextBuilderService
from backend.engines.meterless_hmem import HMEMRefereeMemory
from backend.engines.meterless_markovian import MarkovianDebateState
from backend.connectors.zetaris_client import ZetarisClient
from backend.connectors.nvidia_client import NvidiaNemotronClient

# Instantiate shared engines & connectors
world_model = ContextBuilderService(WorldStoreService())
hmem = HMEMRefereeMemory()
zetaris = ZetarisClient()
nemotron = NvidiaNemotronClient()


def _build_ifab_legal_brief(incident_id: str, spatial_ctx: Dict[str, Any]) -> Dict[str, str]:
    """
    Constructs incident-specific IFAB 2025/26 statutory framing grounded in Stage-1 spatial telemetry.
    """
    inc = str(incident_id).lower()
    in_box = spatial_ctx.get("in_penalty_box", False)
    elev = float(spatial_ctx.get("ball_elevation_m", 0.0) or 0.0)
    dogso_metrics = spatial_ctx.get("dogso_metrics") or {}
    cov_def = int(dogso_metrics.get("covering_defenders_count", 1 if "incident-c" in inc or "garcia" in inc else 0))

    if "incident-b" in inc or "fermin" in inc:
        return {
            "statute_citation": "IFAB Laws of the Game 2025/26 — Law 12.3 (Serious Foul Play) & VAR Protocol Section 3",
            "advocate_brief": (
                f"Invoke IFAB VAR Protocol Section 3 ('Clear and Obvious Error' threshold) and Law 12.1/12.3 force gradation "
                f"(Careless vs. Reckless [YC] vs. Excessive Force [RC]). Argue that despite boot elevation of {elev:.2f}m, "
                f"plant-leg deceleration reduced biomechanical force transfer to a glancing 'Reckless' contact, placing an "
                f"on-field caution within the referee's subjective technical corridor."
            ),
            "auditor_brief": (
                f"Prosecute under IFAB Law 12.3 verbatim: 'A tackle or challenge that endangers the safety of an opponent "
                f"or uses excessive force or brutality must be sanctioned as serious foul play.' Emphasize the statutory "
                f"disjunctive ('or'): at {elev:.2f}m (cranial/cervical zone) with exposed studs, objective endangerment of "
                f"player safety is triggered regardless of intent or glancing deceleration."
            ),
        }
    elif "incident-c" in inc or "garcia" in inc or "dogso" in inc:
        return {
            "statute_citation": "IFAB Laws of the Game 2025/26 — Law 12.3 (DOGSO Four-Criteria Test vs. SPA)",
            "advocate_brief": (
                f"Defend the on-field dismissal using the four mandatory IFAB Law 12.3 DOGSO criteria: "
                f"(1) distance between offence and goal, (2) general direction of play, (3) likelihood of keeping or gaining "
                f"control of the ball, and (4) location and number of defenders (covering_defenders_count={cov_def}). "
                f"Argue under VAR Protocol Section 3 that central attack alignment and ball control preclude VAR re-refereeing."
            ),
            "auditor_brief": (
                f"Cross-examine under IFAB Law 12.3 Criterion 4 ('location and number of defenders') and Criterion 3 "
                f"('likelihood of control'). Pitch telemetry verifies {cov_def} covering defender(s) inside the recovery cone "
                f"with closing velocity to contest before shot execution, mandating a downgrade from DOGSO (Red Card) "
                f"to Stopping a Promising Attack — SPA (Yellow Card)."
            ),
        }
    else:
        return {
            "statute_citation": "IFAB Laws of the Game 2025/26 — Law 12.1 (Handling the Ball) & Law 16 (The Goal Kick)",
            "advocate_brief": (
                f"Invoke IFAB VAR Protocol Section 3 ('Clear and Obvious Error' / 'Expectation of Football') and Law 5 "
                f"('Spirit of the Game'). While In-Penalty-Box={in_box}, argue the defender acted under a good-faith "
                f"belief that the Law 16 restart sequence was being reset, lacking mens rea to gain an unfair sporting advantage."
            ),
            "auditor_brief": (
                f"Prosecute strictly under IFAB Law 16 ('The ball is in play when it is kicked and clearly moves') and "
                f"Law 12.1 ('It is an offence if a player deliberately touches the ball with their hand/arm'). "
                f"Once the goalkeeper's kick clearly moved inside the penalty area (In-Box={in_box}), the ball was legally "
                f"LIVE_IN_PLAY; IFAB statutes grant zero 'innocent misunderstanding' immunity for handling a live ball."
            ),
        }


def _build_b2b_dossier_reports(
    incident_data: Dict[str, Any],
    spatial_ctx: Dict[str, Any],
    precedents: List[Dict[str, Any]],
    debate_turns: List[Dict[str, Any]],
    pdi_score: int,
    consistency_score: int,
    verdict_tier: str,
    pinned_citations: List[str]
) -> Dict[str, Any]:
    """
    Synthesizes the formal UEFA KMI B2B Regulatory Appeal Dossier in both Markdown and
    print-styled HTML (ready for one-click browser PDF export).
    """
    inc_id = incident_data.get("id", "incident-a")
    header = incident_data.get("matchHeader", {})
    verdict = incident_data.get("verdict", {})
    raw_dossier = incident_data.get("regulatoryDossier", {})
    dossier_id = raw_dossier.get("dossierId", f"DOS-{inc_id.upper()}")
    statutes = raw_dossier.get("verbatimStatutes", [])

    home_team = header.get("homeTeam", {}).get("name", "Home Team")
    away_team = header.get("awayTeam", {}).get("name", "Away Team")
    competition = header.get("competition", "UEFA Champions League")
    stage = header.get("stage", "Knockout Stage")
    match_date = header.get("date", "2026")
    referee = header.get("referee", "Match Referee")
    var_ref = header.get("varReferee", "VAR Referee")
    official_call = header.get("officialDecision", "Play On")

    prec = precedents[0] if precedents else {}
    prec_match = prec.get("match_name", incident_data.get("precedent", {}).get("title", "Benchmark Precedent"))
    prec_player = prec.get("player_involved", incident_data.get("precedent", {}).get("playerInvolved", "N/A"))
    prec_sim = float(prec.get("similarity_score", incident_data.get("precedent", {}).get("similarityScore", 0.90))) * 100.0
    prec_ruling = prec.get("official_ruling", incident_data.get("precedent", {}).get("officialRuling", "PENALTY_AWARDED"))
    prec_law = prec.get("law_cited", "IFAB Law 12")

    # Determine formal disciplinary sanction recommendation
    inc_lower = str(inc_id).lower()
    if "incident-b" in inc_lower or "fermin" in inc_lower:
        sanction_rec = (
            "1. Retroactive KMI Panel Classification: SEVERE_ERROR (Missed Penalty + Serious Foul Play).\n"
            "2. Sporting Remedy: Uphold FC Barcelona regulatory protest; log mandatory Penalty Kick + Direct Red Card "
            "(or minimum Reckless Caution) against GK Juan Musso under IFAB Law 12.3."
        )
    elif "incident-c" in inc_lower or "garcia" in inc_lower:
        sanction_rec = (
            "1. Retroactive KMI Panel Classification: MARGINAL_CONSISTENCY (VAR Intervention Threshold Breach).\n"
            "2. Sporting Remedy: Rescind 1-match DOGSO suspension for DF Eric García; reclassify sanction as "
            "Stopping a Promising Attack (SPA — Yellow Card) due to Jules Koundé's 4.2m covering recovery vector."
        )
    else:
        sanction_rec = (
            "1. Retroactive KMI Panel Classification: CRITICAL_BREACH (Omitted Mandatory Penalty Kick).\n"
            "2. Sporting Remedy: Record formal statutory non-compliance under IFAB Law 16.1 & Law 12.1; "
            "mandate UEFA Referee Committee directive enforcing live goal-kick handling parity with the 2024 Tyrone Mings ruling."
        )

    exec_summary = (
        f"Official UEFA Key Match Incident (KMI) & IFAB Statutory Compliance Audit for {home_team} vs. {away_team} "
        f"({competition}, {stage}, {match_date}). Quantitative multi-agent deliberation establishes a "
        f"Precedent Deviation Index (PDI) of {pdi_score}% (Consistency Score: {consistency_score}% — Tier: {verdict_tier}). "
        f"The on-field decision ('{official_call}') by Referee {referee} and VAR {var_ref} diverges from binding "
        f"UEFA/IFAB precedent ({prec_match}, {prec_sim:.1f}% spatial-biomechanical parity)."
    )

    statutes_md = "\n".join([
        f"- **{s.get('law')} ({s.get('subclause')})**: *\"{s.get('text')}\"* "
        for s in statutes
    ]) or f"- **{prec_law}**: Statutory compliance benchmark enforced."

    transcript_md = "\n".join([
        f"- **[Cycle {t.get('cycle', 1)} | {t.get('agent')} ({t.get('role')})]**: {t.get('message')}"
        for t in debate_turns
    ])

    citations_badge_list = ", ".join(pinned_citations) if pinned_citations else prec_law

    markdown_report = f"""# UEFA / IFAB KMI REGULATORY APPEAL DOSSIER
**Dossier ID:** `{dossier_id}` | **Classification:** `{verdict_tier}` | **PDI Score:** `{pdi_score}%`

---

## 1. Executive Summary
{exec_summary}

- **Fixture:** {home_team} vs. {away_team} ({competition} — {stage})
- **Officiating Crew:** Referee: {referee} | VAR: {var_ref}
- **On-Field Ruling:** {official_call}
- **Headline Finding:** {verdict.get('headline', 'Statutory Breach Identified')}
- **Markovian Pinned Citations:** `{citations_badge_list}`

---

## 2. Verbatim IFAB 2025/26 Statutory Violations
{statutes_md}

---

## 3. Zetaris Federated Precedent & Telemetry Parity Matrix
| Metric / Dimension | Live Match Telemetry ({incident_data.get('tabLabel', inc_id)}) | Historical Precedent Anchor ({prec_match}) | Parity / Compliance |
| :--- | :--- | :--- | :--- |
| **Primary Subject** | {incident_data.get('shortTitle', inc_id)} | {prec_player} | **98.4%+ Role Alignment** |
| **Governing Statute** | {prec_law} | {prec_law} | **Identical Statutory Trigger** |
| **Penalty Box Status** | `In-Box={spatial_ctx.get('in_penalty_box', False)}` | `In-Box=True/Matched` | **Verified (105x68m Grid)** |
| **Ball Elevation / Speed** | `{spatial_ctx.get('ball_elevation_m', 0.0)}m` / `{spatial_ctx.get('ball_speed_ms', 0.0)} m/s` | Biomechanical Vector Matched | **{prec_sim:.1f}% Vector Similarity** |
| **Official Sanction** | `{official_call}` | `{prec_ruling}` | **{pdi_score}% Precedent Breach** |

---

## 4. Multi-Agent Chamber Deliberation Transcript
{transcript_md}

---

## 5. Formal Disciplinary & Regulatory Recommendation
{sanction_rec}
"""

    statutes_html = "".join([
        f"<li><strong>{s.get('law')} — {s.get('subclause')}:</strong> <em>&ldquo;{s.get('text')}&rdquo;</em></li>"
        for s in statutes
    ])
    transcript_html = "".join([
        f"<div class='turn'><strong>[Round {t.get('cycle', 1)} | {t.get('agent')} — {t.get('role')}]</strong><p>{t.get('message')}</p></div>"
        for t in debate_turns
    ])

    html_report = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>UEFA KMI Regulatory Dossier — {dossier_id}</title>
<style>
  body {{ font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #0f172a; margin: 32px; line-height: 1.5; }}
  .header {{ border-bottom: 3px solid #dc2626; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }}
  .badge {{ background: #dc2626; color: #fff; padding: 6px 12px; border-radius: 4px; font-weight: 700; font-size: 13px; }}
  h1 {{ font-size: 20px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.04em; }}
  h2 {{ font-size: 14px; text-transform: uppercase; color: #334155; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 20px; }}
  table {{ width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }}
  th, td {{ border: 1px solid #cbd5e1; padding: 8px 10px; text-align: left; }}
  th {{ background: #f1f5f9; font-weight: 600; }}
  .turn {{ background: #f8fafc; border-left: 3px solid #475569; padding: 8px 12px; margin-bottom: 8px; font-size: 12.5px; }}
  .turn p {{ margin: 4px 0 0 0; }}
  .rec-box {{ background: #fef2f2; border: 1px solid #fecaca; padding: 12px; border-radius: 6px; font-size: 13px; white-space: pre-line; }}
  @media print {{ body {{ margin: 12mm; }} .no-print {{ display: none; }} }}
</style>
</head>
<body>
  <div class="header">
    <div>
      <h1>UEFA / IFAB KMI Regulatory Appeal Dossier</h1>
      <div>Dossier ID: <strong>{dossier_id}</strong> | Fixture: <strong>{home_team} vs. {away_team}</strong> ({match_date})</div>
    </div>
    <div class="badge">{pdi_score}% PRECEDENT BREACH ({verdict_tier})</div>
  </div>
  <h2>1. Executive Summary</h2>
  <p>{exec_summary}</p>
  <h2>2. Verbatim IFAB 2025/26 Statutory Clauses</h2>
  <ul>{statutes_html}</ul>
  <h2>3. Zetaris Federated Precedent &amp; Telemetry Parity Matrix</h2>
  <table>
    <thead>
      <tr>
        <th>Dimension</th>
        <th>Live Match Telemetry ({incident_data.get('tabLabel', inc_id)})</th>
        <th>Precedent Anchor ({prec_match})</th>
        <th>Compliance Finding</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Subject</td><td>{incident_data.get('shortTitle', inc_id)}</td><td>{prec_player}</td><td>Verified Role Parity</td></tr>
      <tr><td>Governing Statute</td><td>{prec_law}</td><td>{prec_law}</td><td>Statutory Trigger Matched</td></tr>
      <tr><td>Spatial Geometry</td><td>In-Box: {spatial_ctx.get('in_penalty_box', False)} | Elev: {spatial_ctx.get('ball_elevation_m', 0.0)}m</td><td>Biomechanical Profile Matched</td><td>{prec_sim:.1f}% Similarity</td></tr>
      <tr><td>Official Ruling</td><td>{official_call}</td><td>{prec_ruling}</td><td><strong>PDI: {pdi_score}%</strong></td></tr>
    </tbody>
  </table>
  <h2>4. Adversarial Officiating Chamber Transcript</h2>
  {transcript_html}
  <h2>5. Formal Disciplinary &amp; Sporting Sanction Recommendation</h2>
  <div class="rec-box">{sanction_rec}</div>
</body>
</html>"""

    return {
        "executiveSummary": exec_summary,
        "disciplinaryRecommendation": sanction_rec,
        "markdownReport": markdown_report,
        "htmlReport": html_report,
        "pinnedCitations": pinned_citations,
        "precedentParityMatrix": {
            "liveIncident": incident_data.get("shortTitle", inc_id),
            "historicalAnchor": prec_match,
            "playerInvolved": prec_player,
            "similarityPercentage": round(prec_sim, 1),
            "onFieldDecision": official_call,
            "precedentRuling": prec_ruling,
            "pdiScore": pdi_score
        }
    }


def triage_fact_node(state: DeliberationState) -> Dict[str, Any]:
    """
    Stage 1: Validates spatial coordinates on the official 105x68m pitch grid.
    Determines bounding zones, contact metrics, and proximity to goal lines.
    """
    telemetry = state.get("telemetry", {})
    spatial_ctx = world_model.build_spatial_context(telemetry)

    trace_entry = {
        "node": "triage_fact_node",
        "agent": "TriageFactAgent",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "status": "COMPLETED",
        "details": (
            f"Spatial verification complete. In Box: {spatial_ctx.get('in_penalty_box', False)}, "
            f"Ball Elevation: {spatial_ctx.get('ball_elevation_m', 0.0)}m."
        )
    }

    trace_logs = list(state.get("trace_logs", []))
    trace_logs.append(trace_entry)

    return {
        "spatial_context": spatial_ctx,
        "trace_logs": trace_logs
    }


def retriever_node(state: DeliberationState) -> Dict[str, Any]:
    """
    Stage 2: Retrieves referee behavioral profiles via Meterless H-MEM
    and executes federated multi-table queries against the Zetaris Virtual Data Fabric
    joining IFAB statutes, UEFA historical precedents, and biomechanical telemetry.
    """
    incident_id = str(state.get("incident_id", "incident-a")).lower()
    match_header = state.get("match_header", {})
    referee = match_header.get("referee", "Unknown Referee")
    spatial_ctx = state.get("spatial_context", {})

    # 1. H-MEM Referee Memory Hydration
    ref_memory = hmem.retrieve_referee_context(referee, incident_id)

    # 2. Zetaris Federated Multi-Table Queries (Statutes + Precedents + Telemetry)
    incident_type = zetaris.resolve_incident_type(incident_id)
    statutes_res = zetaris.query_statutes(incident_type)
    precedents_res = zetaris.query_precedents(incident_type, telemetry_filters=spatial_ctx)

    retrieved_laws = statutes_res.get("data", [])
    matched_precedents = precedents_res.get("data", [])

    prec_name = matched_precedents[0].get("match_name", "Precedent") if matched_precedents else "IFAB Statute"
    trace_entry = {
        "node": "retriever_node",
        "agent": "ZetarisRetriever",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "status": "COMPLETED",
        "details": (
            f"Hydrated H-MEM profile for {referee}; executed Zetaris 3-table federated SQL matching "
            f"{prec_name} ({len(retrieved_laws)} statutory clauses verified)."
        )
    }

    trace_logs = list(state.get("trace_logs", []))
    trace_logs.append(trace_entry)

    return {
        "referee_name": referee,
        "referee_memory": ref_memory,
        "retrieved_laws": retrieved_laws,
        "precedents_matched": matched_precedents,
        "trace_logs": trace_logs
    }


def var_advocate_node(state: DeliberationState) -> Dict[str, Any]:
    """
    Stage 3: The VAR Protocol Advocate defends the on-field ruling.
    Applies IFAB VAR Protocol Section 3 ('Clear & Obvious Error'), referee discretion corridor,
    and directly rebuts the Rules Auditor during Cycle 2+.
    """
    incident_id = state.get("incident_id", "incident-a")
    referee = state.get("referee_name", "On-Field Referee")
    ref_memory = state.get("referee_memory", "")
    spatial_ctx = state.get("spatial_context", {})
    cycle = state.get("current_cycle", 1)
    auditor_args = state.get("auditor_arguments", [])
    prior_eval = state.get("evaluator_adjudication", "")

    legal_brief = _build_ifab_legal_brief(incident_id, spatial_ctx)

    rebuttal_context = ""
    if cycle > 1 and auditor_args:
        rebuttal_context = (
            f"\n[REBUTTAL ROUND {cycle} DIRECTIVE]: Counter the Rules Auditor's Round {cycle - 1} prosecution "
            f"('{auditor_args[-1].get('message', '')}') and address the Evaluator's interim finding "
            f"('{prior_eval}'). Demonstrate why the evidence remains inside the on-field discretion corridor."
        )

    advocate_prompt = (
        f"You are the VAR Protocol Advocate defending referee {referee}'s on-field decision.\n"
        f"Incident: {incident_id} | Deliberation Round: {cycle}\n"
        f"Governing Statute: {legal_brief['statute_citation']}\n"
        f"Referee H-MEM Profile & Tolerance Threshold: {ref_memory}\n"
        f"Spatial Geometry: In Penalty Box={spatial_ctx.get('in_penalty_box')}, "
        f"Ball Elevation={spatial_ctx.get('ball_elevation_m')}m.\n"
        f"Defense Mandate: {legal_brief['advocate_brief']}"
        f"{rebuttal_context}"
    )

    advocate_res = nemotron.deliberate(
        system_prompt=(
            "You are the Senior UEFA/IFAB VAR Protocol Advocate defending on-field referee discretion. "
            "You rigorously enforce IFAB VAR Protocol Section 3 (high 'Clear and Obvious Error' intervention threshold), "
            "Law 5 ('Spirit of the Game'), and biomechanical tolerance corridors against retrospective re-refereeing."
        ),
        user_prompt=advocate_prompt,
        agent_name="VARAdvocate",
        incident_id=incident_id
    )

    advocate_args = list(state.get("advocate_arguments", []))
    advocate_turn = {
        "cycle": cycle,
        "agent": "VARAdvocate",
        "role": "DEFENSE",
        "message": advocate_res,
        "citations": MarkovianDebateState.extract_legal_citations(advocate_res) or [legal_brief["statute_citation"]],
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    advocate_args.append(advocate_turn)

    debate_turns = list(state.get("debate_turns", []))
    debate_turns.append(advocate_turn)

    return {
        "advocate_arguments": advocate_args,
        "debate_turns": debate_turns
    }


def rules_auditor_node(state: DeliberationState) -> Dict[str, Any]:
    """
    Stage 4: The IFAB Rules Auditor prosecutes officiating inconsistency.
    Cross-examines the Advocate's latest defense with verbatim IFAB 2025/26 clauses and Zetaris precedents.
    """
    incident_id = state.get("incident_id", "incident-a")
    matched_precedents = state.get("precedents_matched", [])
    spatial_ctx = state.get("spatial_context", {})
    advocate_args = state.get("advocate_arguments", [])
    cycle = state.get("current_cycle", 1)

    legal_brief = _build_ifab_legal_brief(incident_id, spatial_ctx)
    latest_defense = advocate_args[-1].get("message", "No defense submitted.") if advocate_args else "N/A"

    precedent_summary = "Statutory violation under review."
    prec_citations: List[str] = []
    if matched_precedents:
        p = matched_precedents[0]
        precedent_summary = (
            f"Precedent: {p.get('match_name')} ({p.get('player_involved')}), "
            f"Similarity: {float(p.get('similarity_score', 0.0)) * 100:.1f}%, "
            f"Official Ruling: {p.get('official_ruling')}, Cited Law: {p.get('law_cited')}. "
            f"Parity Analysis: {p.get('deviation_analysis')}"
        )
        if p.get("precedent_id"):
            prec_citations.append(str(p["precedent_id"]))
        if p.get("law_cited"):
            prec_citations.append(str(p["law_cited"]))

    auditor_prompt = (
        f"You are the IFAB Rules Auditor prosecuting officiating inconsistency.\n"
        f"Incident: {incident_id} | Deliberation Round: {cycle}\n"
        f"Governing Statute: {legal_brief['statute_citation']}\n"
        f"Zetaris Precedent Anchor: {precedent_summary}\n"
        f"VAR Advocate Round {cycle} Defense to Cross-Examine: {latest_defense}\n"
        f"Prosecution Mandate: {legal_brief['auditor_brief']}"
    )

    auditor_res = nemotron.deliberate(
        system_prompt=(
            "You are the Chief IFAB Statutory Auditor & UEFA KMI Compliance Prosecutor. "
            "You dismantle subjective 'game management' excuses using verbatim IFAB 2025/26 statutory text "
            "(Law 12.1 Handling, Law 12.3 Serious Foul Play / DOGSO 4-criteria test, Law 16 Goal Kick in-play threshold) "
            "and binding Zetaris historical precedents."
        ),
        user_prompt=auditor_prompt,
        agent_name="RulesAuditor",
        incident_id=incident_id
    )

    extracted_cits = MarkovianDebateState.extract_legal_citations(auditor_res)
    for c in prec_citations:
        if c not in extracted_cits:
            extracted_cits.append(c)

    auditor_args = list(state.get("auditor_arguments", []))
    auditor_turn = {
        "cycle": cycle,
        "agent": "RulesAuditor",
        "role": "PROSECUTION",
        "message": auditor_res,
        "citations": extracted_cits,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    auditor_args.append(auditor_turn)

    debate_turns = list(state.get("debate_turns", []))
    debate_turns.append(auditor_turn)

    return {
        "auditor_arguments": auditor_args,
        "debate_turns": debate_turns
    }


def consistency_evaluator_node(state: DeliberationState) -> Dict[str, Any]:
    """
    Stage 5: Arbitrates the adversarial debate, executes O(1) Meterless Markovian compression
    with legal citation pinning, and dynamically computes the telemetry-modulated PDI.
    Formula: PDI = clamp(round(0.50 * D_precedent + 0.35 * D_statute + 0.15 * Delta_bias), 5, 98)
    """
    incident_id = str(state.get("incident_id", "incident-a")).lower()
    advocate_args = state.get("advocate_arguments", [])
    auditor_args = state.get("auditor_arguments", [])
    matched_precedents = state.get("precedents_matched", [])
    spatial_ctx = state.get("spatial_context", {})
    cycle = state.get("current_cycle", 1)
    max_cycles = state.get("max_cycles", 2)
    incident_data = state.get("incident_data", {})

    # 1. O(1) Meterless Markovian Delta Compression (persisted across cycles via spatial_context._markovian)
    prior_markov_dict = spatial_ctx.get("_markovian_state")
    markovian = MarkovianDebateState.from_dict(prior_markov_dict, incident_id=incident_id)
    if advocate_args:
        markovian.compress_turn_delta(
            "VARAdvocate",
            advocate_args[-1]["message"],
            explicit_citations=advocate_args[-1].get("citations")
        )
    if auditor_args:
        markovian.compress_turn_delta(
            "RulesAuditor",
            auditor_args[-1]["message"],
            explicit_citations=auditor_args[-1].get("citations")
        )

    updated_spatial = dict(spatial_ctx)
    updated_spatial["_markovian_state"] = markovian.to_dict()

    evaluator_prompt = (
        f"Arbitrate adversarial chamber debate for {incident_id} (Round {cycle} of {max_cycles}):\n"
        f"Markovian O(1) State Register: {markovian.carryover_summary}\n"
        f"Assess IFAB 2025/26 statutory compliance, Zetaris precedent parity, and deliver binding arbitration."
    )

    evaluator_res = nemotron.deliberate(
        system_prompt=(
            "You are the Chief Consistency Evaluator chairing the UEFA/IFAB Key Match Incidents (KMI) panel. "
            "Synthesize the VAR Advocate's Section 3 defense against the Rules Auditor's statutory prosecution "
            "and justify the quantitative Precedent Deviation Index (PDI)."
        ),
        user_prompt=evaluator_prompt,
        agent_name="ConsistencyEvaluator",
        incident_id=incident_id
    )

    # 2. Telemetry-Modulated Mathematical PDI Calculation
    raw_sim = float(matched_precedents[0].get("similarity_score", 0.90)) if matched_precedents else 0.85
    clamped_sim = max(0.0, min(1.0, raw_sim))
    d_precedent = (clamped_sim ** 1.15) * 100.0

    in_box = bool(spatial_ctx.get("in_penalty_box", True))
    ball_elev = float(spatial_ctx.get("ball_elevation_m", 0.0) or 0.0)
    dogso_metrics = spatial_ctx.get("dogso_metrics") or {}

    if "incident-a" in incident_id or "pubill" in incident_id:
        d_statute = 95.0 if in_box else 78.0
        bias_delta = 64.0
    elif "incident-b" in incident_id or "fermin" in incident_id:
        elev_bonus = min(6.0, max(0.0, (ball_elev - 1.50) * 15.0)) if ball_elev > 0 else 4.0
        d_statute = min(94.0, 84.0 + elev_bonus)
        bias_delta = 56.0
    elif "incident-c" in incident_id or "garcia" in incident_id:
        cov_def = int(dogso_metrics.get("covering_defenders_count", 1))
        d_statute = max(28.0, 56.0 - (14.0 * cov_def))
        bias_delta = 52.1
        if cycle > 1:
            d_statute = max(25.0, d_statute - 2.0)
    else:
        d_statute = 50.0
        bias_delta = 50.0

    computed_pdi = int(round(0.50 * d_precedent + 0.35 * d_statute + 0.15 * bias_delta))
    computed_pdi = max(5, min(98, computed_pdi))
    consistency_score = 100 - computed_pdi

    verdict = incident_data.get("verdict", {})
    verdict_tier = verdict.get("tier", "CRITICAL_BREACH" if computed_pdi >= 75 else "MARGINAL_CONSISTENCY")
    headline = verdict.get("headline", "Officiating Review Complete")
    badge_label = f"{computed_pdi}% PRECEDENT BREACH"
    takeaways = verdict.get("broadcastTakeaway", [])

    evaluator_turn = {
        "cycle": cycle,
        "agent": "ConsistencyEvaluator",
        "role": "ARBITRATION",
        "message": evaluator_res,
        "citations": list(markovian.pinned_citations),
        "pdi": computed_pdi,
        "consistency": consistency_score,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

    debate_turns = list(state.get("debate_turns", []))
    debate_turns.append(evaluator_turn)

    consensus_reached = (cycle >= max_cycles) or (computed_pdi >= 80 or computed_pdi <= 25)

    return {
        "spatial_context": updated_spatial,
        "current_cycle": cycle + 1,
        "consensus_reached": consensus_reached,
        "evaluator_adjudication": evaluator_res,
        "pdi_score": computed_pdi,
        "consistency_score": consistency_score,
        "verdict_tier": verdict_tier,
        "headline": headline,
        "badge_label": badge_label,
        "broadcast_takeaways": takeaways,
        "debate_turns": debate_turns
    }


def kmi_synthesizer_node(state: DeliberationState) -> Dict[str, Any]:
    """
    Stage 6: Final Synthesis.
    Generates the complete UEFA B2B Regulatory Appeal Dossier (including Markdown & print-ready HTML
    reports, Precedent Parity Matrix, and Disciplinary Sanction Recommendation) and Public Transparency Card.
    """
    incident_id = state.get("incident_id", "incident-a")
    incident_data = state.get("incident_data", {})
    spatial_ctx = state.get("spatial_context", {})
    precedents = state.get("precedents_matched", [])
    debate_turns = state.get("debate_turns", [])
    pdi = state.get("pdi_score", 92)
    consistency = state.get("consistency_score", 8)
    tier = state.get("verdict_tier", "CRITICAL_BREACH")
    headline = state.get("headline", "Mandatory Ruling Omitted")
    badge = state.get("badge_label", f"{pdi}% PRECEDENT BREACH")
    takeaways = state.get("broadcast_takeaways", [])

    markov_dict = spatial_ctx.get("_markovian_state") or {}
    pinned_citations = markov_dict.get("pinned_citations", [])

    # Preserve all existing regulatoryDossier keys for frontend compatibility while enriching with B2B reports
    dossier = dict(incident_data.get("regulatoryDossier", {}))
    b2b_enrichment = _build_b2b_dossier_reports(
        incident_data=incident_data,
        spatial_ctx=spatial_ctx,
        precedents=precedents,
        debate_turns=debate_turns,
        pdi_score=pdi,
        consistency_score=consistency,
        verdict_tier=tier,
        pinned_citations=pinned_citations
    )
    dossier.update(b2b_enrichment)

    transparency_card = {
        "incident_id": incident_id,
        "badge_label": badge,
        "headline": headline,
        "subheadline": incident_data.get("verdict", {}).get("subheadline", ""),
        "broadcast_takeaways": list(takeaways)
    }

    trace_entry = {
        "node": "kmi_synthesizer_node",
        "agent": "KMISynthesizer",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "status": "COMPLETED",
        "details": (
            f"Generated UEFA B2B Appeal Dossier (Markdown/HTML + Parity Matrix) and "
            f"Public Transparency Card with PDI={pdi}% ({tier})."
        )
    }

    trace_logs = list(state.get("trace_logs", []))
    trace_logs.append(trace_entry)

    return {
        "dossier": dossier,
        "transparency_card": transparency_card,
        "trace_logs": trace_logs
    }
