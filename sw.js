const CACHE_NAME = 'PomodoroV3';
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


