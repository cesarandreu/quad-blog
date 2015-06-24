/**
 * Webpack config for server
 */
module.exports = require('./webpack.make')({
  SERVER: true,
  BUILD: true,
  TEST: false
})
