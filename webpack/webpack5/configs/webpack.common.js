const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { srcPath,distPath } = require("./path");

module.exports = {
	mode: "development",
	entry: {
		main: path.join(srcPath, "main.js"),
		list: path.join(srcPath, "list.js")
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: 'babel-loader',
			exclude: /node_modules/
		},{
			test: /\.less$/,
			use: [
				{loader:"style-loader"},
				{loader:"css-loader"},
				{loader:"less-loader"},
			],
			exclude: /node_modules/
		},{
			test: /\.(png|jpg|gif)$/i,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 8192,
						outputPath: 'img/',
						// publicPath: 'http://cdn.abc.com'
					},
				},
			],
		}
	]
	},
	plugins: [
		new webpack.DefinePlugin({
			IsHappy:true
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(srcPath, "template", "index.html"),
			filename: "index.html",
			chunks: ["main"]
		}),
		new HtmlWebpackPlugin({
			template: path.join(srcPath, "template", "list.html"),
			filename: "list.html",
			chunks: ["list"]
		})
	],
	output: {
		filename: '[name].[contenthash:8].js',
		path: distPath
	},
};
