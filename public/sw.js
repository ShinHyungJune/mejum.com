const staticCacheName = 'site-static-v3';
const dynamicCacheName = 'static-dynamic-v3';

const assets = [
    "/",
    "/js/app.js",
    "/js/kakao.js",
    "/css/animate.css",
    "/css/app.css",
    "/css/common.css",
    "/css/default.css",
    "/css/style.css",
    "/img/icon-192x192.png",
    "/img/logo.png",
    "/img/spoon.png",
    "/favicon.ico",
    "/fallback.html"
];
// 폰트도 은근 크니까 캐싱하길 추천

// install service worker
self.addEventListener("install", event => {
    // console.log("service worker has been installed");
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets);
        })
    );
});

// activate service worker
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key)))
        })
    )
});

// fetch event
self.addEventListener("fetch", event => {


    // 등록해놨던 캐쉬 뿌리기(요청이 캐쉬해놨던 리소스랑 일치하면)
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request).then(fetchResponse => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(event.request.url, fetchResponse.clone());

                    return fetchResponse;
                })
            });
        }).catch(() => caches.match("/fallback.html"))
    )
});
