const state = {
  day: 1,
  segment: "Morning",
  supplies: 12,
  safety: 5,
  prosperity: 3,
  knownRumors: [],
  hexes: Array.from({ length: 9 }).map((_, idx) => ({
    id: idx + 1,
    terrain: ["Forest", "Ruins", "Hills", "Marsh"][idx % 4],
    danger: 2 + Math.floor(Math.random() * 4),
    explored: false,
  })),
};

const SEGMENTS = ["Morning", "Midday", "Evening", "Night"];

const worldState = document.getElementById("worldState");
const hexGrid = document.getElementById("hexGrid");
const logEl = document.getElementById("log");
document.getElementById("restBtn").addEventListener("click", restInHearthvale);

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
    addLog("Trade caravans trickle in. Hearthvale feels a little stronger.", "good");
  }
}

function encounter(hex) {
  const roll = Math.random();
  if (roll < 0.35) {
    hex.danger = Math.max(0, hex.danger - 1);
    state.safety = Math.min(10, state.safety + 1);
    state.supplies += 1;
    addLog(`You drove off threats in Hex ${hex.id}. The road feels safer.`, "good");
  } else if (roll < 0.7) {
    state.supplies = Math.max(0, state.supplies - 2);
    hex.danger = Math.min(10, hex.danger + 1);
    addLog(`An ambush in Hex ${hex.id} cost supplies. Rumors spread at the tavern.`, "warn");
    maybeAddRumor(hex);
  } else {
    state.prosperity = Math.min(10, state.prosperity + 1);
    addLog(`A traveler shared profitable routes near Hex ${hex.id}.`, "good");
    maybeAddRumor(hex, true);
  }
}

function maybeAddRumor(hex, positive = false) {
  const rumor = positive
    ? `"Hunters found good game near the ${hex.terrain.toLowerCase()} (Hex ${hex.id})."`
    : `"Travelers avoid Hex ${hex.id} after dusk."`;

  if (!state.knownRumors.includes(rumor)) state.knownRumors.push(rumor);
}

function travelToHex(hex) {
  hex.explored = true;
  advanceTime(1);
  addLog(`You travel to Hex ${hex.id} (${hex.terrain}).`, "");
  encounter(hex);
  render();
}

function restInHearthvale() {
  advanceTime(1);
  state.supplies = Math.min(20, state.supplies + 1);
  addLog("You regroup in Hearthvale and prepare for the next push.", "");
  render();
}

function dangerLabel(value) {
  if (value <= 2) return "Calm";
  if (value <= 4) return "Uneasy";
  if (value <= 6) return "Dangerous";
  return "Deadly";
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
    btn.innerHTML = `
      <div><strong>Hex ${hex.id}</strong> — ${hex.terrain}</div>
      <div class="hex-meta">${hex.explored ? "Visited" : "Unknown"} · ${dangerLabel(hex.danger)}</div>
    `;
    btn.addEventListener("click", () => travelToHex(hex));
    hexGrid.appendChild(btn);
  });
}

addLog("Session 1 prototype initialized. Hearthvale awaits.");
render();
