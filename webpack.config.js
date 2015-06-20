/**
 * Webpack config for development
 */
module.exports = require('./webpack.make')({
  SERVER: false,
  BUILD: false,
  TEST: false
})
