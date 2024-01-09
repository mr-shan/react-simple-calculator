self.addEventListener('install', event => {
  console.log("[service worker]: Installing")
})

self.addEventListener('activate', event => {
  console.log("[service worker]: Activating")
  return self.clients.claim();
})

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request))
})
