const CACHE_NAME = 'Pomodorov2';
const urlsToCache = [
    '/',
    '/script.js',
    '/AppIcon.png',
    '/index.html',
    '/instt.js',
    '/mainfest.json',
    '/mixkit-clear-announce-tones-2861_43iHpxKb.wav',
    '/style.css',
 
    
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});


// Service Worker-based solution
self.addEventListener('activate', async () => {
    // after we've taken over, iterate over all the current clients (windows)
    const tabs = await self.clients.matchAll({type: 'window'})
    tabs.forEach((tab) => {
      // ...and refresh each one of them
      tab.navigate(tab.url)
    })
  })