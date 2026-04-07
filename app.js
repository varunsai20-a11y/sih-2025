// Entry module: wire up the previously split modules
import { $, $$ } from "./utils.js";
import { setNet, wireTabClicks, show, emojiIcon } from "./ui.js";
import { ensureMap, applyHeat } from "./map.js";
import { renderHotels } from "./hotels.js";
import { renderRoutes } from "./rider.js";
import { renderHomeDeps } from "./home.js";
import { fillPTSelectors, genPTOptions } from "./pt.js";
import { ensurePTMap, ptMap, ptLayer } from "./pt-map-helpers.js";
import { centerToDestination } from "./dest.js";

// Basic UI init
document.getElementById("yr").textContent = new Date().getFullYear();
setNet();
addEventListener("online", setNet);
addEventListener("offline", setNet);

// wire tab clicks to show with map initializers
wireTabClicks(ensureMap, ensurePTMap);
show("home");

// Fill datalists / selectors and render initial sections
fillPTSelectors();
renderHomeDeps();
renderHotels();
renderRoutes();

// Quick Go
document.getElementById("goMap").addEventListener("click", () => {
  const q = (document.getElementById("quickDest").value || "").trim();
  if (!q) return alert("Enter a destination");
  show("mapSection");
  setTimeout(() => {
    document.getElementById("mapDest").value = q;
    if (centerToDestination(q)) {
      if (window.map) window.map.invalidateSize(true);
    }
  }, 50);
});
document.getElementById("centerMap").addEventListener("click", () => {
  const q = (document.getElementById("mapDest").value || "").trim();
  if (!q) return alert("Enter a destination");
  if (centerToDestination(q)) {
    setTimeout(() => window.map && window.map.invalidateSize(true), 50);
  }
});

// PT controls
$$('input[name="mode"]').forEach((r) =>
  r.addEventListener("change", () => (window.PT_MODE = r.value))
);
document.getElementById("swapPT").addEventListener("click", () => {
  const f = document.getElementById("pt_from"),
    t = document.getElementById("pt_to");
  const tmp = f.value;
  f.value = t.value;
  t.value = tmp;
});
document.getElementById("ptPlan").addEventListener("click", () => {
  const from = document.getElementById("pt_from").value,
    to = document.getElementById("pt_to").value;
  if (from === to) return alert("Pick different places.");
  window.PT_OPTIONS = genPTOptions(window.PT_MODE || "bus", from, to);
  window.PT_SELECTED_INDEX = 0;
  // renderPTOptions is still implemented inline to keep this change minimal
  const box = document.getElementById("ptResults");
  box.innerHTML = "";
  if (window.PT_OPTIONS.length === 0) {
    box.textContent =
      'No options yet. Choose From/To and click "Show Options".';
    return;
  }
  window.PT_OPTIONS.forEach((o, i) => {
    const el = document.createElement("div");
    el.className = "row";
    el.innerHTML = `\n      <label class="radio">\n        <input type="radio" name="ptpick" ${
      i === 0 ? "checked" : ""
    } data-i="${i}">\n        <div>\n          <div><strong>${
      o.line
    }</strong> — ${o.from} → ${
      o.to
    }</div>\n          <div class="small">Board: ${o.board} • Alight: ${
      o.alight
    }</div>\n          <div class="small">Dep ${o.departHM} → Arr ${
      o.arriveHM
    } (${o.mins} min)</div>\n        </div>\n      </label>`;
    box.appendChild(el);
  });
  document.querySelectorAll('input[name="ptpick"]').forEach((r) =>
    r.addEventListener("change", (e) => {
      window.PT_SELECTED_INDEX = parseInt(e.target.dataset.i, 10);
    })
  );
});
window.PT_MODE = "bus";
window.PT_OPTIONS = [];
window.PT_SELECTED_INDEX = 0;

document.getElementById("ptOnMap").addEventListener("click", () => {
  if (window.PT_OPTIONS.length === 0) return alert("Generate options first.");
  const o = window.PT_OPTIONS[window.PT_SELECTED_INDEX];
  ensurePTMap();
  window.ptLayer && window.ptLayer.clearLayers();
  if (window.ptRoute) {
    window.ptMap.removeControl(window.ptRoute);
    window.ptRoute = null;
  }
  const A = window.SARATHI_DATA.DESTS.find((d) => d.id === o.from),
    B = window.SARATHI_DATA.DESTS.find((d) => d.id === o.to);
  if (!A || !B) return;
  try {
    window.ptRoute = L.Routing.control({
      waypoints: [L.latLng(A.lat, A.lng), L.latLng(B.lat, B.lng)],
      lineOptions: {
        addWaypoints: false,
        styles: [
          {
            color:
              window.PT_MODE === "train"
                ? "#22c55e"
                : window.PT_MODE === "metro"
                ? "#6366f1"
                : "#f59e0b",
            weight: 5,
            opacity: 1,
          },
        ],
      },
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
      createMarker: (i, wp) =>
        L.marker(wp.latLng, {
          icon: emojiIcon(i === 0 ? "🚏" : "🏁"),
        }).bindPopup(
          i === 0
            ? `<b>${o.board}</b><br>Dep ${o.departHM}`
            : `<b>${o.alight}</b><br>Arr ${o.arriveHM}`
        ),
      fitSelectedRoutes: true,
      show: false,
    }).addTo(window.ptMap);
  } catch (e) {
    const line = L.polyline(
      [
        [A.lat, A.lng],
        [B.lat, B.lng],
      ],
      {
        color:
          window.PT_MODE === "train"
            ? "#22c55e"
            : window.PT_MODE === "metro"
            ? "#6366f1"
            : "#f59e0b",
        weight: 5,
      }
    ).addTo(window.ptMap);
    window.ptMap.fitBounds(line.getBounds(), { padding: [30, 30] });
  }
});

// Guard simple click
document
  .getElementById("checkIn")
  .addEventListener("click", () => alert("Checked in. Stay safe!"));
