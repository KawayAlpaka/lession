const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/index.js"
  },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',

      options: {
        presets: ['env']
      }
    },
    {
      test: /\.tpl$/,
      exclude: /node_modules/,
      loader: './tpl-loader',

      options: {
        presets: ['env']
      }
    },
    {
      test: /\.world$/,
      exclude: /node_modules/,
      use: [{
        loader: './myloader2',
        options: {
          presets: ['env'],
          c:"ccc"
        }
      },
      {
        loader: './myloader1',
        options: {
          presets: ['env']
        }
      }]
    }]
  },

  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: "src/index.html",
      inject: "head"
    }),
    new HtmlWebpackPlugin({
      filename: `pages/index.html`,
      template: "src/pages/index.js",
      inject: false
    })
  ]
}