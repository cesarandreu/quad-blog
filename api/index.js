const log = require('debug')('quad-blog:api:loader')
const controllerLoader = require('./controllers')
const middleware = require('./utils/middleware')
const compose = require('koa-compose')
const assert = require('assert')

/**
 * API loader
 * @param {object} options
 * @param {object} options.models
 * @returns {function} API application
 */
module.exports = function apiLoader ({ models }={}) {
  assert(models, 'api requires models')
  log('start')

  const api = compose([
    middleware.addToContext({ models }),
    ...controllerLoader()
  ])

  log('end')
  return api
}
