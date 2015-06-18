const log = require('debug')('quad-blog:config')
const assert = require('assert')
const _ = require('lodash')

/**
 * Configuration objects
 * Each config object has environments as keys
 */
const CONFIG = {
  database: require('./database'),
  server: require('./server')
}

/**
 * Config maker
 * @param {string} [env='development'] Desired environment
 * @returns {Object} configuration object
 */
module.exports = function configMaker (env) {
  log('start')
  env = env || process.env.NODE_ENV || 'development'

  const config = _.merge({
    env: env,
    database: getConfig('database', env)
  }, getConfig('server', env))

  log('end')
  return _.cloneDeep(config)
}

/**
 * Get an environment's config out of a config object
 * @param {string} name Config name
 * @param {string} env Config environment
 * @returns {Object} environment config
 */
function getConfig (name, env) {
  assert(CONFIG[name], `config ${name} not found`)
  assert(CONFIG[name][env], `env ${env} not fonud in config ${name}`)
  return CONFIG[name][env]
}
