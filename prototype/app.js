const SEGMENTS = ["Morning", "Midday", "Evening", "Night"];
const ENCOUNTER_TYPES = ["Threat", "Opportunity", "Mystery"];

function createInitialState() {
  return {
    day: 1,
    segment: "Morning",
    supplies: 12,
    safety: 5,
    prosperity: 3,
    knownRumors: [],
    activeEncounter: null,
    hexes: Array.from({ length: 9 }).map((_, idx) => ({
      id: idx + 1,
      terrain: ["Forest", "Ruins", "Hills", "Marsh"][idx % 4],
      danger: 2 + Math.floor(Math.random() * 4),
      explored: false,
    })),
  };
}

let state = createInitialState();

const worldState = document.getElementById("worldState");
const hexGrid = document.getElementById("hexGrid");
const logEl = document.getElementById("log");
const encounterBox = document.getElementById("encounterBox");

document.getElementById("restBtn").addEventListener("click", restInHearthvale);
document.getElementById("resetBtn").addEventListener("click", resetRun);

function addLog(text, tone = "") {
  const div = document.createElement("div");
  div.className = `log-item ${tone}`.trim();
  div.textContent = `[Day ${state.day} ${state.segment}] ${text}`;
  logEl.prepend(div);
}

function advanceTime(steps = 1) {
  for (let i = 0; i < steps; i++) {
    const idx = SEGMENTS.indexOf(state.segment);
    if (idx === SEGMENTS.length - 1) {
      state.segment = SEGMENTS[0];
      state.day += 1;
      state.supplies = Math.max(0, state.supplies - 1);
      passiveWorldTick();
    } else {
      state.segment = SEGMENTS[idx + 1];
    }
  }
}

function passiveWorldTick() {
  const nearThreat = state.hexes.filter((h) => h.danger >= 6).length;
  if (nearThreat >= 3) {
    state.safety = Math.max(0, state.safety - 1);
    addLog("Fear rises in Hearthvale as nearby threats grow.", "bad");
  } else {
    state.prosperity = Math.min(10, state.prosperity + 1);
    addLog("Trade caravans trickle in. Hearthvale feels stronger.", "good");
  }
}

function startEncounter(hex) {
  const type = ENCOUNTER_TYPES[Math.floor(Math.random() * ENCOUNTER_TYPES.length)];

  const flavor = {
    Threat: `Shadows move in Hex ${hex.id}. Something watches from the ${hex.terrain.toLowerCase()}.`,
    Opportunity: `A traveler flags you down in Hex ${hex.id} with a risky offer.`,
    Mystery: `Strange signs circle an old marker in Hex ${hex.id}.`,
  };

  state.activeEncounter = { hexId: hex.id, type, text: flavor[type] };
  renderEncounter();
}

function resolveEncounter(choice) {
  const encounter = state.activeEncounter;
  if (!encounter) return;

  const hex = state.hexes.find((h) => h.id === encounter.hexId);
  const outcomeRoll = Math.random();

  if (encounter.type === "Threat") {
    if (choice === "Engage") {
      if (outcomeRoll < 0.7) {
        hex.danger = Math.max(0, hex.danger - 2);
        state.safety = Math.min(10, state.safety + 1);
        addLog("You break the threat and secure safer roads.", "good");
      } else {
        state.supplies = Math.max(0, state.supplies - 2);
        addLog("The clash drains supplies before you pull back.", "warn");
      }
    } else if (choice === "Observe") {
      maybeAddRumor(hex, false);
      addLog("You study tracks and return with useful warnings.", "");
    } else {
      hex.danger = Math.min(10, hex.danger + 1);
      addLog("You avoid contact, but danger grows in the dark.", "bad");
    }
  }

  if (encounter.type === "Opportunity") {
    if (choice === "Engage") {
      state.prosperity = Math.min(10, state.prosperity + 2);
      state.supplies = Math.min(20, state.supplies + 1);
      maybeAddRumor(hex, true);
      addLog("The deal pays off; Hearthvale hears good news.", "good");
    } else if (choice === "Observe") {
      state.prosperity = Math.min(10, state.prosperity + 1);
      addLog("You gather intel and take a smaller gain.", "");
    } else {
      addLog("You pass on the offer and keep moving.", "");
    }
  }

  if (encounter.type === "Mystery") {
    if (choice === "Engage") {
      state.supplies = Math.max(0, state.supplies - 1);
      state.knownRumors.push(`"Odd lights still linger near Hex ${hex.id}."`);
      addLog("You investigate deeply; unsettling clues follow you home.", "warn");
    } else if (choice === "Observe") {
      maybeAddRumor(hex, false);
      addLog("You record what you saw and map safer routes.", "good");
    } else {
      addLog("You mark the site and choose caution over risk.", "");
    }
  }

  advanceTime(1);
  state.activeEncounter = null;
  render();
}

function maybeAddRumor(hex, positive = false) {
  const rumor = positive
    ? `"Hunters found good game near the ${hex.terrain.toLowerCase()} (Hex ${hex.id})."`
    : `"Travelers avoid Hex ${hex.id} after dusk."`;

  if (!state.knownRumors.includes(rumor)) state.knownRumors.push(rumor);
}

function travelToHex(hex) {
  if (state.activeEncounter) return;
  hex.explored = true;
  advanceTime(1);
  addLog(`You travel to Hex ${hex.id} (${hex.terrain}).`, "");
  startEncounter(hex);
  render();
}

function restInHearthvale() {
  if (state.activeEncounter) {
    addLog("Resolve the current encounter before resting.", "warn");
    return;
  }
  advanceTime(1);
  state.supplies = Math.min(20, state.supplies + 1);
  addLog("You regroup in Hearthvale and prepare for the next push.", "");
  render();
}

function resetRun() {
  state = createInitialState();
  logEl.innerHTML = "";
  addLog("A new expedition begins from Hearthvale.", "good");
  render();
}

function dangerLabel(value) {
  if (value <= 2) return "Calm";
  if (value <= 4) return "Uneasy";
  if (value <= 6) return "Dangerous";
  return "Deadly";
}

function renderEncounter() {
  const e = state.activeEncounter;
  if (!e) {
    encounterBox.innerHTML = "<p>No encounter active. Travel to a hex to begin.</p>";
    return;
  }

  encounterBox.innerHTML = `
    <p><strong>${e.type}</strong></p>
    <p>${e.text}</p>
    <div class="encounter-actions">
      <button data-choice="Engage">Engage</button>
      <button data-choice="Observe">Observe</button>
      <button data-choice="Avoid">Avoid</button>
    </div>
  `;

  encounterBox.querySelectorAll("button[data-choice]").forEach((btn) => {
    btn.addEventListener("click", () => resolveEncounter(btn.dataset.choice));
  });
}

function render() {
  worldState.innerHTML = `
    <p><strong>Time:</strong> Day ${state.day}, ${state.segment}</p>
    <p><strong>Supplies:</strong> ${state.supplies}</p>
    <p><strong>Hearthvale Safety:</strong> ${state.safety}/10</p>
    <p><strong>Hearthvale Prosperity:</strong> ${state.prosperity}/10</p>
    <p><strong>Latest Rumors:</strong><br>${state.knownRumors.slice(-2).join("<br>") || "No rumors yet."}</p>
  `;

  hexGrid.innerHTML = "";
  state.hexes.forEach((hex) => {
    const btn = document.createElement("button");
    btn.className = "hex-btn";
    btn.disabled = Boolean(state.activeEncounter);
    btn.innerHTML = `
      <div><strong>Hex ${hex.id}</strong> — ${hex.terrain}</div>
      <div class="hex-meta">${hex.explored ? "Visited" : "Unknown"} · ${dangerLabel(hex.danger)}</div>
    `;
    btn.addEventListener("click", () => travelToHex(hex));
    hexGrid.appendChild(btn);
  });

  renderEncounter();
}

addLog("Session 1.2: choose your response in encounters.", "good");
render();
