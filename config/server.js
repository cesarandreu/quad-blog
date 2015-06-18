/**
 * Server environment config
 */
module.exports = {
  development: {
    port: 3000
  },
  test: {
    port: 4000
  },
  production: {
    port: process.env.PORT || 3000
  }
}
