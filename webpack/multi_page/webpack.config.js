const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

var buildFolder = "dist";

var pagesSrcDir = "src/pages";
var pagesOutDir = buildFolder + "/pages";

var pageArr = [
  // 'index/login',
  // 'index/index',
  // 'alert/index',
];
var configEntry = {};
pageArr.forEach((page) => {
  configEntry[page] = path.resolve(pagesSrcDir, page + '/page');
});
configEntry.main = "./src/js/main.js";
console.log(configEntry)


var buildDir = path.resolve(__dirname, './'+buildFolder);

module.exports = {
  devtool: "source-map",
  entry: configEntry,
  plugins: [
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
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            { 
              loader: 'postcss-loader', 
              options: { 
                sourceMap: true
              } 
            },
            {
              loader: "sass-loader", 
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },   
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `[hash].[ext]`,
              outputPath:"css/img/",
              publicPath:"img/"
            }  
            // options: {
            //   name: function(fullpath){
            //     var path =  "../assets" + fullpath.split("assets")[1].replace(/\\/g,"/");
            //     return path;
            //     // // return '[path][name].[ext]';
            //   },
            //   outputPath:function(filepath){
            //     return buildFolder + filepath.replace("..","");

            //   },
            //   publicPath:function(filepath){
            //     console.log(arguments);
            //     return filepath;
            //   }
            // }  
          }
        ]
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 100
      //       }
      //     }
      //   ]
      // },
    ]
  },
  output: {
    path: buildDir,
    // publicPath: '../../../../build/',
    publicPath: '',
    filename: 'js/[name].[hash].js',
    // chunkFilename: '[id].bundle.js',
  },
};