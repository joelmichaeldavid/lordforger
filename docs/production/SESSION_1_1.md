# Session 1.1 — Decision Lock + Vertical Slice Execution Plan

## A) Top 5 Decisions to Lock First

1. **View + input format for the first playable**
   - Decision: Browser-first single-player prototype (clickable hex map).
   - Why now: Keeps iteration fast and visible for design conversations.

2. **Vertical-slice boundaries**
   - Decision: One settlement (Hearthvale), 9 surrounding hexes, 3 encounter archetypes, day-segment time loop.
   - Why now: Prevents scope drift.

3. **Truth vs perception rules**
   - Decision: Internal truth data can be numeric; player-facing danger labels stay qualitative.
   - Why now: Protects the UX philosophy early.

4. **Progression philosophy**
   - Decision: Capability growth over raw power creep.
   - Why now: Avoids refactoring economy/combat later.

5. **Source-of-truth workflow**
   - Decision: Durable choices must land in `docs/` + linked issue.
   - Why now: Enables multi-agent consistency.

---

## B) MVP Vertical Slice Scope (Session 1.1 lock)

### Included
- Hearthvale hub state (safety, prosperity, supply pressure signals)
- 3x3 nearby hex region
- Time segments: Morning / Midday / Evening / Night
- Encounter archetypes:
  1) Threat pressure (ambush/predator)
  2) Opportunity (trader/traveler intel)
  3) Neutral mystery (odd signs/lights)
- Rumor feedback into next decisions

### Excluded (for now)
- Multiplayer/network systems
- Full quest pipelines
- High-fidelity art/VFX/audio production
- Large world streaming or many settlements

---

## C) Department Task Split + Handoffs

### 1) Systems Design
**Owns:** encounter tables, danger shifts, time costs, settlement response formulas.  
**Handoff to Engineering:** JSON-friendly rules + acceptance examples.

### 2) Narrative
**Owns:** rumor lines, faction tone, encounter framing text.  
**Handoff to UX/Engineering:** content packs tagged by terrain/time/faction.

### 3) Engineering
**Owns:** state model, deterministic rolls, save/load, UI wiring.  
**Handoff to QA:** testable build + scenario seeds.

### 4) UX
**Owns:** readability, qualitative danger language, feedback clarity.  
**Handoff to Engineering:** UI states + component behavior specs.

### 5) QA
**Owns:** loop stability, edge cases, balancing smoke tests.  
**Handoff to Production:** defect list + risk labels.

### 6) Production
**Owns:** priorities, sequencing, milestone health.  
**Handoff to all lanes:** weekly target list + dependency map.

---

## D) First 10 Issues Ready to Assign

1. **SYS-001** Define terrain/time encounter tables for 9-hex slice.
2. **SYS-002** Formalize danger/prosperity/safety update equations.
3. **NAR-001** Write rumor pack v1 (40 lines, terrain + time variants).
4. **NAR-002** Write encounter framing text for 3 archetypes.
5. **ENG-001** Extract `prototype/app.js` into modules (`state`, `systems`, `ui`).
6. **ENG-002** Add deterministic RNG seed + replayable scenario mode.
7. **ENG-003** Add local save/load (browser storage) for day/hex progress.
8. **UX-001** Improve map readability: hovered hex state + recent change badges.
9. **QA-001** Add smoke checklist for 20-turn playthrough stability.
10. **PROD-001** Create milestone board for Session 1.1 with dependency tags.

---

## E) Done Criteria for Session 1.1

- 10 issues created and assigned to lane owners.
- Deterministic seed mode works.
- 20-turn smoke test passes with no hard-locks.
- Docs updated for every locked decision.
