const log = require('debug')('quad-blog:api:controllers')

/**
 * List of controllers to load
 * Kept manually because it's simpler and the list is short
 */
const CONTROLLER_LIST = [
  'posts'
]

/**
 * Controller loader
 * Loads each controller from CONTROLLER_LIST
 * @returns {Function[]} Middlewares for all controllers
 */
module.exports = function controllerLoader () {
  log('start')

  // Load controllers
  const controllers = CONTROLLER_LIST.reduce((controllers, name) => {
    log(`loading ${name} controller`)
    controllers[name] = require(`./${name}.controller.js`)
    return controllers
  }, {})

  // Get middleware
  const middleware = Object.keys(controllers).map(name => {
    log(`getting middleware for ${name} controller`)
    return controllers[name]()
  })

  log('end')
  return middleware
}
