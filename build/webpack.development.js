const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base.js')

const config = merge.smart(baseConfig, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 显示被替换模块的名称
    new webpack.NamedModulesPlugin() // HMR shows correct file names
  ],
  //静态服务器，可以预览打包后的项目
  devServer: {
    contentBase: './dist',
    open: true,
    host: 'localhost',
    port: 8000,
    hot: true,
    hotOnly: true
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000' //服务器的地址
    //   }
    // }
  }
})
module.exports = config
