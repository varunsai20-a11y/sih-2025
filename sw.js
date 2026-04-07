const CACHE = "sarathi-pwa-v6";
const ASSETS = [
  "./",
  "./index.html",
  "./app.js",
  "./data.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)))
      )
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Let map tiles and OSRM pass through (network first)
  if (
    url.hostname.includes("tile.openstreetmap.org") ||
    url.hostname.includes("router.project-osrm.org")
  ) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  // App shell: cache-first
  e.respondWith(
    caches
      .match(e.request)
      .then(
        (r) => r || fetch(e.request).catch(() => caches.match("./index.html"))
      )
  );
});
