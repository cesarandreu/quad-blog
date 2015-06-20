/**
 * Webpack config for tests
 */
module.exports = require('./webpack.make')({
  SERVER: false,
  BUILD: false,
  TEST: true
})
