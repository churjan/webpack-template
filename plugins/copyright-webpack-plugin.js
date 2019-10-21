class CopyrightWebpackPlugin {
  constructor(options) {
    console.log('###############################')
    console.log(options.name)
    console.log('###############################')
  }

  //compiler:webpack实例
  apply(compiler) {}
}
module.exports = CopyrightWebpackPlugin
