// 은퇴 후 여기어때 — 오프라인 저장 (버전 3c593d6d10)
const CACHE = 'yeogi-3c593d6d10';
const FILES = ["./", "apt.js", "basemap.js", "bus.js", "chars/cheer.png", "chars/cheer.webp", "chars/dad.png", "chars/dad.webp", "chars/idea.png", "chars/idea.webp", "chars/kid.png", "chars/kid.webp", "chars/love.png", "chars/love.webp", "chars/mom.png", "chars/mom.webp", "chars/parent_dad.webp", "chars/parent_mom.webp", "chars/think.png", "chars/think.webp", "chars/wow.png", "chars/wow.webp", "clinic.js", "dn_data.js", "dots/cheer.png", "dots/dad.png", "dots/idea.png", "dots/kid.png", "dots/love.png", "dots/mom.png", "dots/think.png", "dots/wow.png", "hall.js", "icon-192.png", "icon-512.png", "index.html", "ltc.js", "manifest.json", "phc.js", "pop.js", "pref.js", "rent.js", "senior.js", "trade.js", "world.js"];
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/';
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = e.request.url;
  if (e.request.method !== 'GET') return;
  if (u.startsWith(self.location.origin) || u.startsWith(CDN)) {
    e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(res => {
      if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
      return res;
    })));
  }
});
