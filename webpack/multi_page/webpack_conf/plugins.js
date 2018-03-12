const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


let pages = [
  {filename:`./index/index/index.html`,template: `./index/index/index.js`},
  {filename:`./home/home.html`,template: `./home/home.js`},
];

let createPlugins = function (buildFolder, pagesSrcDir, pagesOutDir) {
  let plugins = [
    // new HtmlWebpackPlugin({
    //   filename: path.resolve(pagesOutDir, `./index/index/index.html`),
    //   template: path.resolve(pagesSrcDir, `./index/index/index.js`), // 指定为一个js文件而非普通的模板文件
    //   // chunks: ['alert/index', 'commons'], // 自动加载上index/login的入口文件以及公共chunk
    //   // hash: true, // 为静态资源生成hash值
    //   // xhtml: true,  // 需要符合xhtml的标准
    // }),
  ];
  plugins.push(
    new CleanWebpackPlugin(
      [buildFolder],
      {
        root: __dirname,  //根目录
        verbose: true,  //开启在控制台输出信息
        dry: false    //启用删除文件
      }
    )
  );
  plugins.push(
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: "./src/index.html",
      inject: false
    })
  );
  pages.forEach(function (page) {
    plugins.push(
      new HtmlWebpackPlugin({
        filename: path.resolve(pagesOutDir, page.filename),
        template: path.resolve(pagesSrcDir, page.template),
      })
    );
  });
  plugins.push(new ExtractTextPlugin("css/style.[hash].css"));
  plugins.push(new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]));
  return plugins;
};


module.exports = createPlugins;