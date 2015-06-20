const log = require('debug')('quad-blog:config')
const assert = require('assert')

/**
 * Configuration objects
 * Each config object has environment as key
 */
const SERVER = require('./server')
const DATABASE = require('./database')

/**
 * List of allowed environments
 */
const ENVIRONMENTS = [
  'development',
  'production',
  'test'
]

/**
 * Config maker
 * @param {string} [env='development'] Desired environment
 * @returns {Object} configuration object
 */
module.exports = function configMaker (env) {
  log('start')
  env = env || process.env.NODE_ENV || 'development'
  assert(~ENVIRONMENTS.indexOf(env), 'Unexpected config environment')

  const config = {
    env,
    ...SERVER[env],
    database: {
      ...DATABASE[env]
    }
  }

  log('end')
  return config
}
