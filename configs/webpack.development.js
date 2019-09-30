const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = merge.smart(baseConfig, {
    mode:'development',
    //静态服务器，可以预览打包后的项目
    devServer:{
        contentBase:'./dist',
        host:'localhost',
        port:8000,
        compress:true,//服务器返回给浏览器的时候是否启用gzip压缩
    }
})
module.exports = config;