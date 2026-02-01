importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Кэшируем страницы: сначала сеть, если нет — кэш
workbox.routing.registerRoute(
  ({request}) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({ 
    cacheName: 'pages',
    networkTimeoutSeconds: 3
  })
);

// Кэшируем статику (CSS, JS, иконки): кэш + фоновое обновление
workbox.routing.registerRoute(
  ({request}) => ['image', 'style', 'script'].includes(request.destination),
  new workbox.strategies.StaleWhileRevalidate({ 
    cacheName: 'assets'
  })
);