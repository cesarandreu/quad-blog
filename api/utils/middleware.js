const assert = require('assert')

/**
 * Add all enumerable keys in objects to context
 * @param {object} [objects={}]
 * @returns {function} addToContextMiddleware
 */
exports.addToContext = function addToContext (objects={}) {
  return function * addToContextMiddleware (next) {
    Object.assign(this, objects)
    yield next
  }
}

/**
 * Load resource instance into state
 * Resource must be in ctx.model[resource]
 * Result is set in ctx.state[name]
 * Throws 404 if not found
 * @param {string} resource Resource name
 * @param {object} [opts={}] Configuration
 * @param {string} [opts.key='id'] Search value to use
 * @param {string} [opts.name=resource.toLowerCase()] Param value to check
 * @returns {function} loadMiddleware
 */
exports.load = function load (resource, { key='id', name=resource.toLowerCase() }={}) {
  assert(resource, 'load middleware required a resource')
  return function * loadMiddleware (next) {
    this.state[name] = yield this.models[resource].find({
      where: {
        [key]: this.params[name]
      }
    })

    this.assert(this.state[name], 404, `${resource} not found`)
    yield next
  }
}
