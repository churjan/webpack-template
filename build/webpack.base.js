const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
let fs = require('fs')
let htmlArr = fs.readdirSync(resolve('src/html'))
let entrys = {}
let htmlPlugins = []
console.log('src目录下所有文件:', htmlArr)

// console.log('process:',process)
for (let item of htmlArr) {
  //我们只需要.html前面的文件名
  if (item.endsWith('.html')) {
    let name = item.split('.html')[0]
    entrys[name] = resolve(`src/js/${name}.js`)
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: `src/html/${item}`,
        chunks: ['vendor', 'common', name],
        title: name,
        filename: `${item}`,
        hash: true,
      })
    )
  }
}
console.log(entrys)
module.exports = {
  resolve: {
    alias: {
      //解析路径
      '@': resolve('src'),
      '@static': resolve('static'),
    },
    extensions: ['.js', '.vue', '.html', '.json', '.scss', '.css'],
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    modules: [resolve('node_modules')],
  },
  entry: {
    ...entrys,
  },
  output: {
    path: resolve('dist'), //输出的文件夹，只能是绝对路径
    publicPath: devMode ? './' : '/dist/',
    //name是entry名字main,hash根据打包后的文件内容计算出来的hash,默认20位，这里取8位
    // filename:'[name].[hash:8].js'//打包后的文件名
    filename: devMode ? 'js/[name].js' : 'js/[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':src', ':data-src'],
          },
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          //自定义loader
          // {
          //   loader: 'replaceLoader',
          //   options: {
          //     name: 'Churjan'
          //   }
          // },
        ],
      },
      {
        //css-loader 用来解析css文件的url解析
        //style-loader 把css变成style标签插入head
        //多个loader有顺序要求，从右往左写
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // {
      //   test: require.resolve('jquery'),
      //   use: [
      //     {
      //       loader: 'expose-loader',
      //       options: '$'
      //     }
      //   ]
      // },
      // {
      //   test: /\.(htm|html)$/i,
      //   loader: 'html-withimg-loader'
      // },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5 * 1024,
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash',
    }),
    new CleanWebpackPlugin(),
    //此插件可以自动产出HTML文件
    ...htmlPlugins,

    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: 'static',
      },
    ]),
  ],
  optimization: {
    //帮我们自动做代码分割
    splitChunks: {
      cacheGroups: {
        vendor: {
          //node_modules内的依赖库
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100,
          // enforce: true?
        },
        common: {
          // ‘src/js’ 下的js文件
          chunks: 'all',
          test: /[\\/]src[\\/]js[\\/]/, //也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
          name: 'common', //生成文件名，依据output规则
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
        },
      },
    },
  },
}
