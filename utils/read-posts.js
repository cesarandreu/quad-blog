const log = require('debug')('quad-blog:utils:read-posts')
const fs = require('fs')

/**
 * Read posts from a directory
 * @param {string} dir Directory to read for posts
 * @returns {Promise} A promise of posts
 */
module.exports = async function readPosts (dir) {
  log('start')

  // Read dir
  const rootList = await readdirPromise(dir)

  // Stat each entry
  // Get pairs of [isDirectory, file]
  const statList = await Promise.all(
    rootList.map(file =>
      statPromise(`${dir}/${file}`)
        .then(stat => [stat.isDirectory(), file])
    )
  )

  // Filter out non-folders
  // Get rid of pairs
  const folderList = statList
    .filter(pair => pair[0])
    .map(pair => pair[1])

  // Load .meta.json and then readFile json.fileName
  const postList = await Promise.all(
    folderList.map(name => {
      const json = require(`${dir}/${name}/${name}.meta.json`)
      json.name = name
      return readFilePromise(`${dir}/${name}/${json.fileName}`)
        .then(file => {
          json.file = file
          return json
        })
    })
  )

  log('end')
  return postList
}

// fs.readdir Promise
function readdirPromise (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) =>
      err ? reject(err) : resolve(files)
    )
  })
}

// fs.stat Promise
function statPromise (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) =>
      err ? reject(err) : resolve(stat)
    )
  })
}

// fs.readFile Promise
function readFilePromise (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, { encoding: 'utf8' }, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}
