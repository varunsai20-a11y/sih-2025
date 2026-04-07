import { $, $$ } from "./utils.js";

export function setNet() {
  const el = $("#net");
  if (navigator.onLine) {
    el.textContent = "Online";
    el.className = "banner";
  } else {
    el.textContent = "Offline — cached features only";
    el.className = "banner off";
  }
}

export const sections = ["home", "mapSection", "public", "rider", "car"];

export function show(tab, ensureMapCb, ensurePTMapCb) {
  sections.forEach((id) =>
    document.getElementById(id).classList.toggle("hidden", id !== tab)
  );
  document
    .querySelectorAll("#tabs .tab, .bnav .tab")
    .forEach((t) => t.classList.toggle("active", t.dataset.tab === tab));
  const homeStyledTabs = new Set([
    "home",
    "mapSection",
    "public",
    "rider",
    "car",
  ]);
  document.body.classList.toggle("homebg", homeStyledTabs.has(tab));
  if (tab === "mapSection" && ensureMapCb) {
    setTimeout(() => {
      ensureMapCb();
      if (window.map) window.map.invalidateSize(true);
    }, 50);
  }
  if (tab === "public" && ensurePTMapCb) {
    setTimeout(() => {
      ensurePTMapCb();
      if (window.ptMap) {
        window.ptMap.invalidateSize(true);
        if (
          !window.ptRoute &&
          (!window.ptLayer || window.ptLayer.getLayers().length === 0)
        ) {
          L.marker([10.0, 76.4], { icon: emojiIcon("📍") })
            .addTo(window.ptLayer)
            .bindPopup("<b>Kerala</b>")
            .openPopup();
        }
      }
    }, 50);
  }
}

export function wireTabClicks(ensureMapCb, ensurePTMapCb) {
  $("#tabs").addEventListener("click", (e) => {
    const t = e.target.closest(".tab")?.dataset.tab;
    if (t) show(t, ensureMapCb, ensurePTMapCb);
  });
  document.querySelector(".bnav").addEventListener("click", (e) => {
    const t = e.target.closest(".tab")?.dataset.tab;
    if (t) show(t, ensureMapCb, ensurePTMapCb);
  });
}

// small helper used by ui when injecting markers (kept here to avoid circular imports)
export function emojiIcon(emoji) {
  return L.divIcon({
    html: `<div style="font-size:22px;transform:translate(-50%,-50%)">${emoji}</div>`,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}
