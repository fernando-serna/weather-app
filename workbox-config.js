module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{png,ico,html,js,webmanifest,json,css}"
  ],
  "swDest": "dist/service-worker.js",
  "swSrc": "public/service-worker.js",
  "globIgnores": [
    "../workbox-config.js"
  ]
}