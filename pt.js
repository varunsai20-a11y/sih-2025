import { DESTS, PT_CITY_PAIRS } from "./data-bridge.js";
import { nowHM } from "./utils.js";
import { ensurePTMap } from "./pt-map-helpers.js";

export function haversineKm(a, b) {
  const R = 6371,
    toRad = (v) => (v * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat),
    dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

const CITY_INDEX = Object.fromEntries(DESTS.map((d) => [d.id, d]));

export function genPTOptions(mode, from, to) {
  const f = CITY_INDEX[from],
    t = CITY_INDEX[to];
  if (!f || !t) return [];
  const dist = haversineKm(f, t);
  const speed = mode === "bus" ? 45 : mode === "metro" ? 55 : 75;
  const baseMins = Math.max(10, Math.round((dist / speed) * 60));
  const headway = mode === "bus" ? 15 : mode === "metro" ? 7 : 30;
  const start = dayjs().startOf("minute");
  const options = [];
  for (let i = 1; i <= 5; i++) {
    const depart = start.add(
      i * headway +
        (mode === "bus"
          ? Math.floor(Math.random() * 8)
          : Math.floor(Math.random() * 4)),
      "minute"
    );
    const travel =
      baseMins +
      (mode === "bus"
        ? Math.floor(Math.random() * 18)
        : Math.floor(Math.random() * 8));
    const arrive = depart.add(travel, "minute");
    const line =
      mode === "metro"
        ? "KMRL Green"
        : mode === "train"
        ? "SR Regional"
        : "KSRTC";
    const board =
      mode === "bus"
        ? `${from} Bus Stand`
        : `${from} ${mode === "train" ? "Jn." : "Metro"}`;
    const alight =
      mode === "bus"
        ? `${to} Bus Stand`
        : `${to} ${mode === "train" ? "Jn." : "Metro"}`;
    options.push({
      mode,
      line,
      from,
      to,
      departHM: depart.format("HH:mm"),
      arriveHM: arrive.format("HH:mm"),
      mins: travel,
      board,
      alight,
    });
  }
  return options;
}

export function fillPTSelectors() {
  const f = document.getElementById("pt_from"),
    t = document.getElementById("pt_to");
  f.innerHTML = "";
  t.innerHTML = "";
  DESTS.forEach((d) => {
    const o1 = document.createElement("option");
    o1.value = o1.textContent = d.id;
    f.appendChild(o1);
    const o2 = document.createElement("option");
    o2.value = o2.textContent = d.id;
    t.appendChild(o2);
  });
  const [df, dt] =
    PT_CITY_PAIRS[Math.floor(Math.random() * PT_CITY_PAIRS.length)];
  f.value = df;
  t.value = dt;
}
