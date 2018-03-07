const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var pagesDir = "src/pages";

var pageArr = [
  'index/login',
  // 'index/index',
  // 'alert/index',
];
var configEntry = {};
pageArr.forEach((page) => {
  configEntry[page] = path.resolve(pagesDir, page + '/page');
});
configEntry.main = "./src/main.js";
console.log(configEntry)


var buildDir = path.resolve(__dirname, './build');

module.exports = {
  entry: configEntry,
  plugins: [
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
      //如果这里有对 .html 处理，就不能再模板中 用 "<%= require('html-loader!./pages/shared/_head.html')  %>" 导入其他html，有待研究
      {
        test: /\.tpl$/,
        loader: 'html-loader'
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      }
    ]
  },
  output: {
    path: buildDir, // var buildDir = path.resolve(__dirname, './build');
    // publicPath: '../../../../build/',
    // publicPath: '',
    filename: '[name]/[name].entry.js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
    chunkFilename: '[id].bundle.js',
  },
};