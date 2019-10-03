const path=require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin=require('copy-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
let fs = require('fs');
let htmlArr  = fs.readdirSync(resolve('src/html'));
let entrys={};
let htmlPlugins = [];
console.log('src目录下所有文件:',htmlArr)

// console.log('process:',process)
for(let item of htmlArr){
    //我们只需要.html前面的文件名
    if(item.endsWith('.html')){
        let name = item.split('.html')[0];
        entrys[name]=resolve(`src/js/${name}.js`);
        htmlPlugins.push(new HtmlWebpackPlugin({
            template:resolve(`src/html/${item}`),
            chunks:['common',name],
            title:[name],
            filename:`${item}`,
            hash:true,
        }))
    }
}
console.log(entrys)
module.exports={
    resolve:{
        alias:{
          //解析路径
          '@': resolve('src')
        },
        extensions: ['.js', '.json', '.css']
    },
    entry:{
        'common':'./src/js/common.js',
        ...entrys,

    },
    output:{
        path:resolve('dist'),//输出的文件夹，只能是绝对路径
        //name是entry名字main,hash根据打包后的文件内容计算出来的hash,默认20位，这里取8位
        // filename:'[name].[hash:8].js'//打包后的文件名
        filename:'[name].[hash:8].js',
    },

    module:{
        rules:[
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                  }
            },
            {
                //css-loader 用来解析css文件的url解析
                //style-loader 把css变成style标签插入head
                //多个loader有顺序要求，从右往左写
                test:/\.(sa|sc|c)ss$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                  ],
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            {
                test:/\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader:'url-loader',
                        options:{
                            limit:5*1024,
                            outputPath: 'images'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        //此插件可以自动产出HTML文件
        ...htmlPlugins,
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new CopyWebpackPlugin([{
            from:resolve('static'),
            to:'static'
        }])
    ],
    
}
