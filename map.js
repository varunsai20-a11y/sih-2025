import { emojiIcon } from "./ui.js";

export let map = null;
export let markersLayer = null;
export let heatLayer = null;

export function ensureMap() {
  if (map) return;
  try {
    map = L.map("mapView", {
      zoomControl: true,
      minZoom: 6,
      maxZoom: 19,
    }).setView([10.0, 76.4], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);

    // Add a default marker for Kerala
    L.marker([10.0, 76.4], { icon: emojiIcon("📍") })
      .addTo(markersLayer)
      .bindPopup("<b>Kerala</b>")
      .openPopup();
    // expose to global for compatibility with older code/modules
    try {
      window.map = map;
      window.markersLayer = markersLayer;
      window.heatLayer = heatLayer;
    } catch (e) {
      // ignore in restricted environments
    }
  } catch (e) {
    console.error("Map initialization error:", e);
  }
}

export function applyHeat() {
  if (!map) return;
  if (heatLayer) {
    map.removeLayer(heatLayer);
  }
  const pts = [
    ...Array.from({ length: 40 }, () => [
      9.9665 + (Math.random() - 0.5) * 0.01,
      76.2425 + (Math.random() - 0.5) * 0.01,
      0.6 + Math.random() * 0.4,
    ]),
    ...Array.from({ length: 40 }, () => [
      10.0269 + (Math.random() - 0.5) * 0.01,
      76.3083 + (Math.random() - 0.5) * 0.01,
      0.6 + Math.random() * 0.4,
    ]),
    ...Array.from({ length: 40 }, () => [
      9.4896 + (Math.random() - 0.5) * 0.01,
      76.318 + (Math.random() - 0.5) * 0.01,
      0.6 + Math.random() * 0.4,
    ]),
  ];
  heatLayer = L.heatLayer(pts, { radius: 18, blur: 22 }).addTo(map);
}
