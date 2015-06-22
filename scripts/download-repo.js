#!/usr/bin/env iojs -r babel/register
const downloadRepo = require('../utils/download-repo')
const path = require('path')

const destination = path.resolve(__dirname, '../public/blog')
const repoUrl = process.argv[2] || 'https://github.com/cesarandreu/blog.git'

console.log(`starting download-repo
repoUrl:     "${repoUrl}"
destination: "${destination}"`)
downloadRepo(repoUrl, destination)
  .then(() => {
    console.log('finished downloading repo')
  }, (err) => {
    console.error('error download repo', err)
  })
