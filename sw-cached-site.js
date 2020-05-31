/**
 * Uses fallback to cache strategy when we
 * don't have internet connection fallback to cache.
 * */

const cacheVersion = 'v1';
// here we don't do any caching in the install we do it one per fetch
self.addEventListener('install', (e) => {
  console.log('ServiceWorker: Installed')
})

// To get rid of the unwanted caches or previous versions
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(
        cacheNames => {
          return Promise.all(
            cacheNames.filter(prevCacheVersion => {
              if (prevCacheVersion !== cacheVersion) {
                console.log('ServiceWorker: Clearing old cache.')
                return caches.delete(prevCacheVersion)
              }
              return false;

            }))
        }))
  console.log('ServiceWorker: Activated')
})



// Mock all the fetch calls for offline
// place where we look into call and control the network call.

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        const respCln = response.clone();
        // caching each and every request user makes to load faster
        caches.open(cacheVersion).then(cache => cache.put(e.request, respCln))
        return response;
      })
      .catch(() => caches.match(e.request))
  )
}




