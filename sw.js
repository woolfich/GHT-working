importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  { url: './', revision: '2' },
  { url: './index.html', revision: '2' },
  { url: './manifest.json', revision: '2' }
]);

workbox.routing.registerRoute(
  ({request}) => request.mode === 'navigate',
  new workbox.strategies.CacheFirst({ 
    cacheName: 'pages',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  })
);

workbox.routing.registerRoute(
  ({request}) => ['image', 'style', 'script', 'font'].includes(request.destination),
  new workbox.strategies.StaleWhileRevalidate({ 
    cacheName: 'assets',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 60 * 24 * 60 * 60
      })
    ]
  })
);

workbox.routing.registerRoute(
  ({url}) => url.hostname.includes('supabase.co'),
  new workbox.strategies.NetworkOnly()
);
