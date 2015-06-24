// Modules
var fs = require('fs')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer-core')
var StatsPlugin = require('stats-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function makeWebpackConfig (options) {
  // Environment types
  var SERVER = !!options.SERVER
  var BUILD = !!options.BUILD
  var TEST = !!options.TEST

  // Environment values
  var NODE_ENV = process.env.NODE_ENV || 'development'

  // base
  var config = {}

  // Entry
  if (TEST) {
    config.entry = {}
  } else if (SERVER) {
    config.entry = {
      app: './client/renderer/server.js'
    }
  } else {
    config.entry = {
      app: './client/client.js'
    }
  }

  // Output
  if (TEST) {
    config.output = {}
  } else {
    const output = {}
    output.path = __dirname + (SERVER ? '/build' : '/public/assets')
    output.pathinfo = !BUILD || SERVER
    output.publicPath = BUILD || (BUILD && SERVER) ? '/assets/' : 'http://localhost:8080/assets/'
    output.libraryTarget = SERVER ? 'commonjs2' : 'var'
    output.filename = SERVER
      ? 'server.js'
      : (BUILD
          ? '[name].[hash].js'
          : '[name].bundle.js'
        )

    config.output = output
  }

  // Target
  config.target = SERVER ? 'node' : 'web'

  // Devtool
  if (TEST) {
    config.devtool = 'inline-source-map'
  } else if (BUILD || SERVER) {
    config.devtool = 'source-map'
  } else {
    config.devtool = 'eval'
  }

  // Module
  config.module = {
    // Preloaders
    preLoaders: [],

    // Loaders
    loaders: [{
      // JS loader
      test: /\.js$/,
      loader: 'babel?optional=runtime',
      exclude: /node_modules/
    }, {
      // JSX loader
      test: /\.jsx$/,
      loader: (BUILD || SERVER || TEST ? '' : 'react-hot!') + 'babel?optional=runtime&cacheDirectory'
    }, {
      // LESS loader
      test: /\.less$/,
      loader: SERVER || TEST ? 'null' : ExtractTextPlugin.extract(
        'style',
        'css?sourceMap!postcss!less?sourceMap'
      )
    }, {
      // Asset loader
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'file'
    }]
  }

  // Isparta preloader for tests
  if (TEST) {
    config.module.preLoaders.push({
      test: /\.(js|jsx)$/,
      exclude: [
        /node_modules/,
        /\.test\.(js|jsx)$/
      ],
      loader: 'isparta-instrumenter'
    })
  }

  // PostCSS
  config.postcss = function postcss () {
    return [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ]
  }

  // Resolve
  config.resolve = {
    extensions: ['', '.js', '.jsx', '.css']
  }

  // Externals
  config.externals = []

  if (SERVER) {
    config.externals.push({
      './stats.json': 'commonjs ./stats.json'
    })
    config.externals.push(
      fs.readdirSync('node_modules')
        .filter(function (x) {
          return ['.bin', 'react'].indexOf(x) === -1
        })
        .reduce(function (nodeModules, module) {
          nodeModules[module] = 'commonjs ' + module
          return nodeModules
        }, {
          'react/addons': 'commonjs react/addons',
          'react': 'commonjs react/addons'
        })
    )
  }

  // Plugins
  config.plugins = []

  // Register sourcemaps for compiled server
  if (SERVER) {
    config.plugins.push(
      new webpack.BannerPlugin('require("source-map-support").install();', {
        entryOnly: true,
        raw: true
      })
    )
  }

  // Don't emit when running on server or tests
  if (!SERVER && !TEST) {
    config.plugins.push(
      new StatsPlugin(__dirname + '/build/stats.json')
    )
  }

  // Avoid replacing NODE_ENV and extracting css when it's a server build
  if (!SERVER) {
    config.plugins.push(
      // Extract css files
      new ExtractTextPlugin('[name].[hash].css', {
        disable: !BUILD || SERVER || TEST
      }),

      // Replace NODE_ENV
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      })
    )
  }

  if (BUILD && !SERVER) {
    config.plugins.push(
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  // Dev server config
  config.devServer = {
    contentBase: './public'
  }

  if (SERVER) {
    config.node = {
      __dirname: true,
      __filename: true
    }
  }

  return config
}
