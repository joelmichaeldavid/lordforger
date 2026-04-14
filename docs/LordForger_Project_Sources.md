# LordForger Project Sources

> Canonical foundational notes for 7LeafPocket and the LordForger project.
> Source: Joel + ChatGPT working notes (organized for repository use).

## 1) 7LeafPocket Game Studio Charter

### Studio Identity
- **Studio Name:** 7LeafPocket  
- **Project Title:** LordForger  
- **Founder / Creative Director:** Joel

### Mission Statement
Create deeply immersive games that invite exploration, discovery, and meaningful choices in living worlds.

### Creative Philosophy
- Curiosity
- Craftsmanship
- Collaboration
- Respect for Players

### Core Vision
Exploration-driven RPG with systemic world simulation where unknown lands are discovered, settlements grow/decline, encounters shape outcomes, and time matters.

### Development Stages
1. Concept
2. Prototype
3. Vertical Slice
4. Production
5. Polish

### Core Pillars
1. **Exploration First** (locations, factions, stories, secrets)
2. **Living World** (settlement growth + world response)
3. **Emergent Encounters** (combat/social/mystery/hazard/etc.)
4. **Time Matters** (travel/actions drive world timeline)
5. **Character + Settlement Evolution** (Hearthvale as living anchor)

### Player Experience Goals
Curiosity, immersion, responsibility, surprise, and meaningful discovery.

---

## 2) Studio Infrastructure Map

### Departments
- Creative Direction
- Game Design
- Narrative & Writing
- Engineering / Programming
- Art
- Audio
- QA / Playtesting
- Production
- Tools & Pipeline
- Marketing & Community
- Business / Publishing

### Governance Concepts
- **World Steward / Systems Philosopher:** “Does this mechanic deepen the world?”
- **World Systems Council:** Creative Director, Lead Systems Designer, Narrative Director, World Steward

### Economic/Ethics Guardrails (from notes)
1. No infinite minting
2. No power purchasable
3. No passive compounding yield
4. Seasonal finite pools only
5. Reward impact, not hours
6. World health overrides revenue mechanics

---

## 3) Game Design Bible (Living Document)

Use this structure for each system entry:

```md
[System] <Name> vX

Purpose:
Core Mechanics:
Data Model:
Player Experience:
Connected Systems:
```

### Core Player Fantasy
“I explore a living, changing world.”

### Core Loop
1. Choose destination (knowledge system)
2. Travel (time passes)
3. Enter hex (encounter check)
4. Stay/act (time drives additional encounter risk)
5. Resolve encounter (world changes)
6. Update world (danger, NPCs, factions)
7. Return to Hearthvale (settlement reacts)
8. Advance time (world evolves)

### Major System Areas
- Exploration Engine (discovery, scouting, fog, map memory)
- Encounter Engine (context-aware generation + multi-path resolution)
- Time Engine (days, travel, events, seasons)
- Settlement Engine (buildings, population, prosperity, faction influence)
- Progression Engine (capability growth, not raw power creep)
- Economy Engine (settlement survival + growth loops)
- UX Layer (intuition, ambiguity, no heavy numeric exposure)

---

## 4) World Codex (Narrative Layer)

Focus areas:
- Factions
- Lore
- Regions
- Characters

---

## 5) Systems Architecture (Simulation Layer)

### Truth vs Perception Model
- **World State** stores full hex truth regardless of player awareness.
- **Player Knowledge** stores perceived and aging information.

### Example Objects

```txt
Hex {
  id
  terrain_type
  sub_features
  danger_level
  resource_nodes
  encounter_table_id
  faction_presence
  hidden_locations
  weather_state
}
```

```txt
PlayerKnowledge {
  known_hexes: {
    hex_id: {
      knowledge_level
      last_updated_time
      perceived_danger
      known_features
      rumor_tags
    }
  }
}
```

### Interaction Rules
- Exploration triggers encounters.
- Encounters alter world state.
- Time advances all systems.
- Settlement state feeds back into player options.
- Knowledge quality changes player decision quality.

---

## 6) Production Roadmap Pyramid

1. **Core Player Fantasy**
2. **Core Gameplay Loop**
3. **Systems & Simulation Layer**
4. **World & Narrative Layer**
5. **Polish & Content**

---

## 7) Immediate Next Step (Actionable)

Convert this foundation into implementation artifacts:
- `docs/design/system-*.md` (one file per major system)
- `docs/narrative/world-codex.md`
- `docs/production/roadmap.md`
- GitHub issues linked to each system/team lane
