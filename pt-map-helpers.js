export let ptMap = null;
export let ptLayer = null;
export let ptRoute = null;

export function ensurePTMap() {
  if (ptMap) return;
  try {
    ptMap = L.map("mapPT", {
      zoomControl: true,
      minZoom: 6,
      maxZoom: 19,
    }).setView([10.0, 76.4], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap",
    }).addTo(ptMap);

    ptLayer = L.layerGroup().addTo(ptMap);
  } catch (e) {
    console.error("PT Map initialization error:", e);
  }
}
