# Session 1.1 — Copy/Paste Issue Templates

Use these as GitHub issue starters.

## SYS-001 — Encounter Tables for 9-Hex Slice
**Goal:** Define deterministic encounter pools by terrain + time segment.  
**Acceptance Criteria:**
- Table exists for each terrain in the prototype.
- Each table includes 3 archetypes with weights.
- At least one anti-repeat rule is documented.

## SYS-002 — Settlement Response Equations
**Goal:** Document and implement danger/safety/prosperity update logic.  
**Acceptance Criteria:**
- Input/output examples for 5 scenarios.
- Equations represented in docs and code comments.

## NAR-001 — Rumor Pack v1
**Goal:** Write 40 rumor lines tagged by terrain/time/faction tone.  
**Acceptance Criteria:**
- 10 warning rumors, 10 opportunity rumors, 10 mystery rumors, 10 settlement rumors.
- Content avoids hard numeric language.

## NAR-002 — Encounter Framing Text
**Goal:** Add narrative framing for all archetypes.  
**Acceptance Criteria:**
- Entry line + 2 follow-up variants per archetype.
- Tone aligns with uncertainty-first UX.

## ENG-001 — Prototype Modularization
**Goal:** Split prototype logic into state/systems/ui modules.  
**Acceptance Criteria:**
- No behavior regression in baseline loop.
- Functions grouped by ownership.

## ENG-002 — Deterministic Seed Mode
**Goal:** Add optional RNG seed for replayability and QA.  
**Acceptance Criteria:**
- Seed can be set from UI query param or input.
- Same seed yields same 20-turn event sequence.

## ENG-003 — Save/Load Slot v1
**Goal:** Save and restore current run in browser storage.  
**Acceptance Criteria:**
- Day, segment, hex states, and settlement stats persist.
- Load restores exact prior state.

## UX-001 — Hex Readability Improvements
**Goal:** Improve readability of hex changes and risk hints.  
**Acceptance Criteria:**
- Last-changed indicator visible on hex cards.
- Hover/focus states clearly distinguish selectable elements.

## QA-001 — 20-Turn Smoke Suite
**Goal:** Verify loop stability and no dead-end states.  
**Acceptance Criteria:**
- Checklist run for at least 3 seeds.
- Defects categorized by severity.

## PROD-001 — Session 1.1 Milestone Board
**Goal:** Create milestone with dependency-aware sequencing.  
**Acceptance Criteria:**
- All 10 issues linked to milestone.
- Each issue has owner lane and priority label.
