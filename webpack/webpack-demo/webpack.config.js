const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: './src/js/index.js',
    print: './src/js/print.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template:'index.html'
    })
    ,
    new ExtractTextPlugin("../css/styles.css"),
    // new ExtractTextPlugin("css/styles.[hash].css"),
    // new ExtractTextPlugin("F:\\styles.css")
  ],
  module: {
    rules: [
    //   {
    //     test: /\.css$/,
    //     use: ExtractTextPlugin.extract({
    //       fallback: "style-loader",
    //       use: [{ loader: 'css-loader', options: { importLoaders: 1 } },{ loader: 'postcss-loader', options: {  } }]
    //     })
    //   },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: "css-loader"},
            {loader: "sass-loader", options: { }},
            { loader: 'postcss-loader', options: {  } }]
        })
      }
    ]
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  }
};