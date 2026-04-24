importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Предварительное кэширование основных ресурсов
workbox.precaching.precacheAndRoute([
  { url: './index.html', revision: '2' },
  { url: './manifest.json', revision: '1' }
]);

// Стратегия для страниц: сначала кэш, потом сеть (для офлайн-работы)
workbox.routing.registerRoute(
  ({request}) => request.mode === 'navigate',
  new workbox.strategies.CacheFirst({ 
    cacheName: 'pages',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
      })
    ]
  })
);

// Статика: кэш + фоновое обновление
workbox.routing.registerRoute(
  ({request}) => ['image', 'style', 'script', 'font'].includes(request.destination),
  new workbox.strategies.StaleWhileRevalidate({ 
    cacheName: 'assets',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 60 * 24 * 60 * 60 // 60 дней
      })
    ]
  })
);

// API запросы к Supabase: не кэшируем, пропускаем
workbox.routing.registerRoute(
  ({url}) => url.hostname.includes('supabase.co'),
  new workbox.strategies.NetworkOnly()
);
