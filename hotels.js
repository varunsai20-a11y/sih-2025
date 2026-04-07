import { HOTELS } from "./data-bridge.js";
import { fmtINR } from "./format.js";
import { emojiIcon } from "./ui.js";
import { ensureMap, markersLayer } from "./map.js";

const amenEmoji = { wifi: "📶", ac: "❄️", breakfast: "🥐", parking: "🅿️" };

export function renderHotels() {
  const box = document.getElementById("hotellist");
  box.innerHTML = "";
  let area = document.getElementById("area").value;
  const budgetRaw = document.getElementById("budget").value;
  const maxB = budgetRaw ? parseInt(budgetRaw, 10) : 999999;
  let pool = HOTELS.filter((h) => area === "all" || h.area === area);
  if (pool.length < 6) pool = HOTELS.slice();
  let shown = 0;
  pool.forEach((h) => {
    const lo = Math.round(h.price[0] + (h.price[1] - h.price[0]) * 0.25);
    const hi = Math.round(h.price[0] + (h.price[1] - h.price[0]) * 0.85);
    if (lo > maxB) return;
    const el = document.createElement("div");
    el.className = "row";
    const amen = (h.amenities || [])
      .map(
        (a) =>
          `<span style="margin-right:6px">${amenEmoji[a] || "•"} ${a}</span>`
      )
      .join(" ");
    el.innerHTML = `
      <div><strong>${h.name}</strong> — ★ ${h.rating.avg.toFixed(1)} (${
      h.rating.count
    })</div>
      <div class="small">${h.area} • ${h.addr}</div>
      <div class="small">From ${fmtINR(lo)} to ${fmtINR(hi)} • ${amen}</div>
      <div class="inline" style="margin-top:6px">
        <button class="btn" data-map="${h.lat},${h.lng}" data-city="${
      h.area
    }">Map</button>
        <a class="btn ghost" href="tel:${h.phone.replaceAll(" ", "")}">Call</a>
      </div>`;
    box.appendChild(el);
    shown++;
  });
  if (shown === 0) {
    const fallback = HOTELS.filter(
      (h) => area === "all" || h.area === area
    ).slice(0, 3);
    fallback.forEach((h) => {
      const el = document.createElement("div");
      el.className = "row";
      el.innerHTML = `<div><strong>${
        h.name
      }</strong> — ★ ${h.rating.avg.toFixed(1)}</div><div class="small">${
        h.area
      } • ${h.addr}</div>`;
      box.appendChild(el);
    });
  }
  box.querySelectorAll("button[data-map]").forEach((b) => {
    b.addEventListener("click", () => {
      const [lat, lng] = b.dataset.map.split(",").map(Number);
      // show map and marker
      ensureMap();
      window.map.setView([lat, lng], 15);
      if (markersLayer) markersLayer.clearLayers();
      L.marker([lat, lng], { icon: emojiIcon("🏨") })
        .addTo(markersLayer)
        .bindPopup("<b>Hotel</b>")
        .openPopup();
      window.map.invalidateSize(true);
    });
  });
}
