module.exports = function(env, argv) {
  console.log('argv.mode:', argv.mode)
  process.env.NODE_ENV = argv.mode
  return argv.mode === 'production'
    ? require('./configs/webpack.production')
    : require('./configs/webpack.development')
}
