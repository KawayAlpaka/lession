var fs = require("fs");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


let pages = [
  {filename:`./index/index/index.html`,template: `./index/index/index.js`},
  {filename:`./home/home.html`,template: `./home/home.js`},
];
let pages2 = [];

let createPlugins = function (buildFolder, pagesSrcDir, pagesOutDir) {

  //根据真实pages目录结构，生成需要输出的文件列表
  readDirSync(pagesSrcDir,function(file){
    if(file.ext == ".js"){
      pages2.push({
        template:file.path.replace(pagesSrcDir,"."),
        filename:file.path.replace(pagesSrcDir,".").replace(".js",".html")
      });
    }
  });
  function readDirSync(path,fileCb){
      var pa = fs.readdirSync(path);
      pa.forEach(function(ele,index){  
          var info = fs.statSync(path+"/"+ele);
          if(info.isDirectory()){  
              readDirSync(path+"/"+ele,fileCb);
          }else{  
              let doIndex = ele.lastIndexOf(".");
              let ext = "";
              if(doIndex >= 0){
                ext = ele.slice(doIndex);
              }
              fileCb && fileCb({
                name:ele,
                path:path+"/"+ele,
                ext: ext
              });
          }     
      });
  }
  
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
        root: path.resolve(__dirname, '../'),  //根目录
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
  pages2.forEach(function (page) {
    plugins.push(
      new HtmlWebpackPlugin({
        filename: path.resolve(pagesOutDir, page.filename),
        template: path.resolve(pagesSrcDir, page.template),
      })
    );
  });
  plugins.push(new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "css/style.[hash].css",
    // chunkFilename: "[id].css"
  }));
  plugins.push(new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]));
  return plugins;
};


module.exports = createPlugins;