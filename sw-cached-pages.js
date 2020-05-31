const cacheVersion = 'v1';
// we do caching on install for specific files
const cacheablesAssets = [
  './index.html',
  './about.html',
  './css/style.css',
  './js/main.js',
]
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(cacheVersion)
      .then(cache => {
        cache.addAll(cacheablesAssets)
      })
      .then(() => self.skipWaiting())
  )
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
    fetch(e.request).catch(() => caches.match(e.request))
  )
})