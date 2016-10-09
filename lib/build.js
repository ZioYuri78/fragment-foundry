const browserify = require('browserify')
const generate = require('./generate')
const path = require('path')
const fs = require('fs')

buildBundle(function (err) {
  if (err) throw err
  buildChapters()
})

function buildChapters () {
  generate.chapters.forEach(function (name) {
    const html = generate.chapter(name)
    const dst = path.resolve(generate.chapterDir, name + '.html')

    fs.writeFileSync(dst, html)
  })
}

function buildBundle (next) {
  const src = path.join(__dirname, '..', 'index.js')
  const dst = path.join(__dirname, '..', 'bundle.js')

  browserify(src).bundle(function (err, result) {
    if (err) return next(err)
    fs.writeFile(dst, result, next)
  })
}