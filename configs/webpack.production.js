const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = merge.smart(baseConfig, {
    mode:'production',
    devtool: 'source-map',//开启这个可以在生产环境中调试代码
})
module.exports = config;