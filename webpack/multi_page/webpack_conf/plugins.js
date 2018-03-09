const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


let createPlugins = function (buildFolder,pagesSrcDir,pagesOutDir){
    let plugins = [
        new CleanWebpackPlugin(
          [buildFolder],
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
          filename: path.resolve(pagesOutDir, `./index/index/index.html`),
          template: path.resolve(pagesSrcDir, `./index/index/index.js`), // 指定为一个js文件而非普通的模板文件
          // chunks: ['alert/index', 'commons'], // 自动加载上index/login的入口文件以及公共chunk
          // hash: true, // 为静态资源生成hash值
          // xhtml: true,  // 需要符合xhtml的标准
        }),    
        new HtmlWebpackPlugin({
          filename: path.resolve(pagesOutDir, `./home/home.html`),
          template: path.resolve(pagesSrcDir, `./home/home.js`),
        }),
        new ExtractTextPlugin("css/style.[hash].css"),
        new CopyWebpackPlugin([
          { from: 'src/assets', to: 'assets' }
        ]),
      ];
      return plugins;
};


module.exports = createPlugins;