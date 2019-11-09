if (typeof importScripts === 'function') {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')
}

if (workbox) {
  console.log('Yay! Workbox is loaded 🎉')

  workbox.precaching.precacheAndRoute([])

  workbox.routing.registerRoute(
    new RegExp('https://cors-anywhere.herokuapp.com/'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'weather-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
          maxAgeSeconds: 7 * 24 * 60 * 60
        })
      ]
    })
  )
} else {
  console.log('Boo! Workbox didn\'t load 😬')
}
