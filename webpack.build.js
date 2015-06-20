/**
 * Webpack config for builds
 */
module.exports = require('./webpack.make')({
  SERVER: false,
  BUILD: true,
  TEST: false
})
