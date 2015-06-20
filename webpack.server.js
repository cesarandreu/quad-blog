/**
 * Webpack config for server
 */
module.exports = require('./webpack.make')({
  SERVER: true,
  BUILD: false,
  TEST: false
})
