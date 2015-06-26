const koa = require('koa')
const qs = require('koa-qs')
const serve = require('koa-static')
const log = require('debug')('quad-blog:server')
const responseTime = require('koa-response-time')

log('loading api and models')
const modelLoader = require('./models')
const apiLoader = require('./api')

log('loading and building config')
const configMaker = require('./config')
const config = configMaker()

log('initializing models and api')
const models = modelLoader(config.database)
const api = apiLoader({models})

/**
 * Server
 */
const server = qs(koa())
Object.assign(server, {
  env: config.env,
  config,
  models,
  api
})

/**
 * Middleware
 */

// request logging
if (server.env === 'development') {
  const logger = require('koa-logger')
  server.use(logger())
}

// x-response-time
server.use(responseTime())

// file server
server.use(serve('./static'))
server.use(serve('./public'))

/**
 * API
 */
log('mounting API')
server.use(api)

/**
 * Server initializer
 * Listen for connections
 * @returns {object} server instance
 */
server.init = function init (port=config.port) {
  log('initializing server using port ${port}')
  server.server = server.listen(port, () => log(`listening on port ${port}`))
  return server.server
}

// Export server so it can be started externally
module.exports = server

// Initialize server if called directly
if (require.main === module) {
  server.init()
}
