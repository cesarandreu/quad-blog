const ghdownload = require('github-download')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

/**
 * Download a repo to destination
 * @param {string} repoUrl Repository url
 * @param {string} destination Destination path
 * @returns {Promise}
 */
module.exports = async function downloadRepo (repoUrl, destination) {
  await rimrafPromise(destination)
  await mkdirpPromise(destination)
  await ghdownloadPromise(repoUrl, destination)
}

// Promise ghdownload
function ghdownloadPromise (repoUrl, destination) {
  return new Promise((resolve, reject) => {
    ghdownload(repoUrl, destination)
      .on('error', reject)
      .on('end', resolve)
  })
}

// Promise mkdirp
function mkdirpPromise (dir) {
  return new Promise((resolve, reject) => {
    mkdirp(dir, err => err ? resolve(err) : resolve())
  })
}

// Promise rimraf
function rimrafPromise (f) {
  return new Promise((resolve, reject) => {
    rimraf(f, err => err ? reject(err) : resolve())
  })
}
