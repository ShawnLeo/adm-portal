var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'prod'

var buildOptions = process.env.NODE_ENV  === 'dev' ? config.dev : config.build;

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: buildOptions
      ? buildOptions.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
