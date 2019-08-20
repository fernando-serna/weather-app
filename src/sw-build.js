const workboxBuild = require('workbox-build')

const buildSW = () => {
  return workboxBuild.injectManifest({
    swSrc: 'src/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      "**/*.css",
      "index.html",
      "offline.html",
      "404.html"
    ]
  }).then(({ count, size, warnings }) => {
    warnings.forEach(console.warn)
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  })
}
buildSW()
