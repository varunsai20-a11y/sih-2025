import { METRO_STATIONS } from "./data-bridge.js";
import { nowHM, addMinHM } from "./utils.js";

function genMetroDeps() {
  const hm = nowHM();
  const out = [];
  for (let i = 0; i < 6; i++) {
    const fromIdx = Math.floor(Math.random() * (METRO_STATIONS.length - 5));
    const toIdx = fromIdx + 1 + Math.floor(Math.random() * 5);
    const from = METRO_STATIONS[fromIdx],
      to = METRO_STATIONS[toIdx];
    const depart = addMinHM(hm, 2 + i * 6 + Math.floor(Math.random() * 6));
    const travel = 10 + Math.floor(Math.random() * 20);
    const arrive = addMinHM(depart, travel);
    out.push({
      from,
      to,
      depart,
      arrive,
      platform: Math.random() > 0.5 ? "P1" : "P2",
    });
  }
  return out.sort((a, b) => a.depart.localeCompare(b.depart));
}

export function renderHomeDeps() {
  const rows = genMetroDeps();
  const list = document.getElementById("metro");
  list.innerHTML = "";
  rows.forEach((t) => {
    const el = document.createElement("div");
    el.className = "row";
    el.innerHTML = `<div><strong>${t.from} → ${t.to}</strong></div><div class="small">Dep ${t.depart} • Arr ${t.arrive} • ${t.platform}</div>`;
    list.appendChild(el);
  });
}
