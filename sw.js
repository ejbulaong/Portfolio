const staticCache = "my-cache-1";

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith("my-") && cacheName !== staticCache
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener("install", event=> {
    event.waitUntil(
        caches.open(staticCache).then((cache)=> {
            return cache.addAll(
                [
                    "images/image0.jpg",
                    "images/image1.jpg",
                    "images/image2.jpg",
                    "images/image3.jpg",
                    "images/image4.jpg",
                    "styles/styles.css",
                    "/",
                    "index.html",
                    "app.js"
                ]
            );
        })
    );
});

self.addEventListener("fetch", (event)=> {
    event.respondWith(
        caches.match(event.request).then((response)=> {
            return response || fetch(event.request)
        })
    );
})