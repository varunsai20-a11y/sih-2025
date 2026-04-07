import { DESTS, POI_ICON } from "./data-bridge.js";
import { emojiIcon } from "./ui.js";
import { getAggregateRating } from "./reviews.js";
import { ensureMap, markersLayer, applyHeat } from "./map.js";

export function renderPoiChips(dest) {
  const bar = document.getElementById("poiChips");
  bar.innerHTML = "";
  (dest.pois || []).forEach((p) => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.innerHTML = `<span>${POI_ICON[p.type] || "📍"}</span><span>${
      p.n
    }</span>`;
    chip.addEventListener("click", () => {
      ensureMap();
      window.map.setView([p.lat, p.lng], 15);
    });
    bar.appendChild(chip);
  });
}

export function findDestination(name) {
  if (!name) return null;
  const q = name.trim().toLowerCase();
  let d = DESTS.find((x) => x.id.toLowerCase() === q);
  if (d) return d;
  d = DESTS.find((x) => x.id.toLowerCase().startsWith(q));
  if (d) return d;
  return DESTS.find((x) => x.id.toLowerCase().includes(q)) || null;
}

export function centerToDestination(inputName) {
  const d = findDestination(inputName);
  if (!d) {
    alert("Destination not found. Try Kochi, Munnar, Alappuzha, etc.");
    return false;
  }
  ensureMap();
  if (markersLayer) markersLayer.clearLayers();
  window.map.setView([d.lat, d.lng], 12);
  L.marker([d.lat, d.lng], { icon: emojiIcon("📍") })
    .addTo(markersLayer)
    .bindPopup(`<b>${d.id}</b>`);
  (d.pois || []).forEach((p) => {
    const mk = L.marker([p.lat, p.lng], {
      icon: emojiIcon(POI_ICON[p.type] || "📍"),
    }).addTo(markersLayer);
    const agg = getAggregateRating("poi", p.id);
    mk.bindPopup(`<b>${p.n}</b><br>★ ${agg.avg.toFixed(1)} (${agg.count})`);
  });
  renderPoiChips(d);
  applyHeat();
  return true;
}
