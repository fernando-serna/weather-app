module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.css",
    "index.html",
    "js/animation.js",
  ],
  "swDest": "dist/service-worker.js",
  "swSrc": "public/service-worker.js",
  "globIgnores": [
    "../workbox-config.js"
  ]
}