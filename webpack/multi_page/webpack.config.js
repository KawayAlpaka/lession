const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var pagesDir = "src/pages";

var pageArr = [
  // 'index/login',
  // 'index/index',
  // 'alert/index',
];
var configEntry = {};
pageArr.forEach((page) => {
  configEntry[page] = path.resolve(pagesDir, page + '/page');
});
configEntry.main = "./src/js/main.js";
console.log(configEntry)


var buildDir = path.resolve(__dirname, './dist');

module.exports = {
  devtool: "source-map",
  entry: configEntry,
  plugins: [
    new CleanWebpackPlugin(
      ['dist'],
      {
        root: __dirname,  //根目录
        verbose:  true,  //开启在控制台输出信息
        dry: false    //启用删除文件
      }
    ),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: "./src/index.html",
      inject:false
    }),    
    new HtmlWebpackPlugin({
      filename: `index/index/index.html`,
      template: path.resolve(pagesDir, `./index/index/index.js`), // 指定为一个js文件而非普通的模板文件
      // chunks: ['alert/index', 'commons'], // 自动加载上index/login的入口文件以及公共chunk
      // hash: true, // 为静态资源生成hash值
      // xhtml: true,  // 需要符合xhtml的标准
    }),    
    new HtmlWebpackPlugin({
      filename: `home/home.html`,
      template: path.resolve(pagesDir, `./home/home.js`),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tpl$/,
        loader: 'html-loader'
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" ,
        options: {
          sourceMap: true
        }
      }
    ]
  },
  output: {
    path: buildDir,
    // publicPath: '../../../../build/',
    // publicPath: '',
    filename: 'js/[name].[hash].js',
    chunkFilename: '[id].bundle.js',
  },
};