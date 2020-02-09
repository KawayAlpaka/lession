const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, './src/js/index.js'),
    index2: path.resolve(__dirname, './src/js/index2.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules: [
      {
        test: /\.ejs$/,
        loader: [
          {
            loader: 'ejs-loader',
            options: {}
          }
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
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
      },
      {
        test: /\.(png|jpg|gif|jpeg|ani)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20000000,
              fallback:{
                loader: 'file-loader',
                options: {
                  outputPath: "img/",
                  useRelativePath : true
                  // publicPath: "../img/"
                }
              }
            }
          },
        ]
      },
      {
        test: /\.(cur)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: "img/",
              useRelativePath : true
              // publicPath: "../img/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: path.resolve(__dirname, 'src/index.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: path.resolve(__dirname, 'dist/html_test.html'),
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    })
  ]
};
