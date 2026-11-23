const CACHE = 'pendientes-v1';
const FILES = ['./', 'index.html', 'styles.css', 'app.js', 'tasks.js', 'manifest.webmanifest', 'icon.svg'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));
self.addEventListener('fetch', e => {
  if (e.request.url.includes('version.json')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
