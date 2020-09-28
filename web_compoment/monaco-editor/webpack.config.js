const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  entry: {
    index: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, 
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html" ,
      template:path.join(__dirname,"src",'index.html')
    }),
    new MonacoWebpackPlugin()
  ],
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  }
}