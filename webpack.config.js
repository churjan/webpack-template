module.exports = function(env, argv) {
  console.log('argv.mode:', argv.mode)
  process.env.NODE_ENV = argv.mode
  return argv.mode === 'production'
    ? require('./build/webpack.production')
    : require('./build/webpack.development')
}
