var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './www/js/main.ts',
  // entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  module:{
    rules:[
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'www/index.html'
  })],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
};