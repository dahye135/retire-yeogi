// 은퇴 후 여기어때 — 오프라인 저장 (버전 1f4e293f5c)
const CACHE = 'yeogi-1f4e293f5c';
const FILES = ["./", "apt.js", "basemap.js", "bus.js", "chars/cheer.png", "chars/cheer.webp", "chars/dad.png", "chars/dad.webp", "chars/idea.png", "chars/idea.webp", "chars/kid.png", "chars/kid.webp", "chars/love.png", "chars/love.webp", "chars/mom.png", "chars/mom.webp", "chars/parent_dad.webp", "chars/parent_mom.webp", "chars/think.png", "chars/think.webp", "chars/wow.png", "chars/wow.webp", "clinic.js", "dn_data.js", "dots/cheer.png", "dots/dad.png", "dots/idea.png", "dots/kid.png", "dots/love.png", "dots/mom.png", "dots/think.png", "dots/wow.png", "hall.js", "icon-192.png", "icon-512.png", "index.html", "ltc.js", "manifest.json", "phc.js", "pop.js", "pref.js", "rent.js", "senior.js", "trade.js", "world.js"];
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/';
// 브라우저에 남은 옛 파일을 쓰지 않도록 서버에서 새로 받아 저장
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = e.request.url;
  if (e.request.method !== 'GET') return;
  // 앱 화면(index.html)은 인터넷이 되면 항상 최신으로, 안 되면 저장해 둔 것으로
  if (e.request.mode === 'navigate' || /\/(index\.html)?(\?.*)?$/.test(new URL(u).pathname + new URL(u).search)) {
    e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(res => {
      if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp)); }
      return res;
    }).catch(() => caches.match('./index.html').then(r => r || caches.match('./'))));
    return;
  }
  if (u.startsWith(self.location.origin) || u.startsWith(CDN)) {
    e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(res => {
      if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
      return res;
    })));
  }
});
