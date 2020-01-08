const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, './src/js/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules: [
      {
        test: /\.ejs$/,
        loader: [{
          loader: 'ejs-loader',
          options: {}
        },
      ],
      },
      {
        test: /\.scss$/,
        use: [
          // //  ▲ 要输出到 html文件中，这里不能使用 MiniCssExtractPlugin，二球要用 style-loader。
          // {
          //   loader: MiniCssExtractPlugin.loader
          // },
          // {
          //   loader: "css-loader",
          //   options: {
          //     sourceMap: true
          //   }
          // },
          {
            loader: "style-loader",
            options: {
              // sourceMap: true
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: path.resolve(__dirname, 'src/index.ejs'),
      inject: false
    }),
    // // 要输出到 html中，则不需要 MiniCssExtractPlugin
    // new MiniCssExtractPlugin({
    //   filename: "css/style.[hash].css",
    // })
  ]
};
