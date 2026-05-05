const CACHE_NAME = 'my-study-dashboard-v2';

const STATIC_ASSETS = [
  '/my%20study/index.html',
  '/my%20study/pages/gerais.html',
  '/my%20study/pages/especificos.html',
  '/my%20study/pages/cronograma.html',
  '/my%20study/pages/microaprendizado.html',
  '/my%20study/pages/dicas.html',
  '/my%20study/manifest.json',
];

const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// ── Install: pré-cacheia assets locais ─────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cacheia locais (críticos)
      return cache.addAll(STATIC_ASSETS).then(() => {
        // Cacheia externos de forma silenciosa (não bloqueia install)
        return Promise.allSettled(
          EXTERNAL_ASSETS.map(url =>
            cache.add(url).catch(() => {/* ignora falha de CDN */})
          )
        );
      });
    })
  );
  self.skipWaiting();
});

// ── Activate: remove caches antigos ────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: Cache-first para locais, Network-first para externos ─────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ignora requisições não-GET e chrome-extension
  if (event.request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // Navegação (HTML): Network-first, fallback para cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Assets estáticos e externos: Cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});