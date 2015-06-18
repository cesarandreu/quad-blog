const log = require('debug')('quad-blog:models:loader')
const Sequelize = require('sequelize')
const assert = require('assert')

/**
 * List of models to load
 * Kept manually because it's simpler and the list is short
 */
const MODEL_LIST = [
  'post'
]

/**
 * Model loader
 * Loads each model from MODEL_LIST
 * @param {object} config
 * @returns {object} Models
 */
module.exports = function modelLoader (config) {
  assert(config, 'model loader requires config')
  log('start')

  // Create sequelize instance
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )

  // Load the models
  const models = MODEL_LIST.reduce((models, name) => {
    log(`loading ${name} model`)
    const model = require(`./${name}.js`)(sequelize, Sequelize)
    models[model.name] = model
    return models
  }, {
    sequelize,
    Sequelize
  })

  // Set model associations
  Object.keys(models).forEach(name => {
    if ('associate' in models[name]) {
      log(`associate ${name}`)
      models[name].associate(models)
    }
  })

  log('end')
  return models
}
