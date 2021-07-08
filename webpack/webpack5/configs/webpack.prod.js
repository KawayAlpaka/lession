
const { merge } = require('webpack-merge')
const commonConfig = require("./webpack.common")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const Config = merge(commonConfig,{
  mode:"production",
  module:{
    rules:[{
			test: /\.less$/,
			use: [
				{loader:MiniCssExtractPlugin.loader},
				{loader:"css-loader"},
				{loader:"less-loader"},
			],
			exclude: /node_modules/
		}]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:"css/[name].[contenthash:4].css"
    })
  ],
  optimization: {
    minimizer:[
      new CssMinimizerPlugin()
    ] 
  }
});

module.exports = Config;
