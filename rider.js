import { ROUTES } from "./data-bridge.js";

export function renderRoutes() {
  const box = document.getElementById("routes");
  box.innerHTML = "";
  ROUTES.forEach((r) => {
    const el = document.createElement("div");
    el.className = "row";
    el.innerHTML = `<div><strong>${
      r.name
    }</strong> <span class="small">★ ${r.rating.toFixed(
      1
    )}</span></div><div class="small">${r.tips}</div>`;
    box.appendChild(el);
  });
}
