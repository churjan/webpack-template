const loaderUtils = require('loader-utils')
module.exports = function(source) {
  // const { name } = this.query
  const options = loaderUtils.getOptions(this)
  return source.replace('webpack', options.name)
}
