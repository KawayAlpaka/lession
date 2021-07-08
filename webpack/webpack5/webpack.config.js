const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.join(__dirname,"src"); 

module.exports = {
	mode:"development",
  entry: {
		main:"./src/main.js"
	},
	module: {
	    rules: [{
	        test: /\.js$/,
	        use: 'babel-loader',
	        exclude: /node_modules/
	    }]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(srcPath,"template","index.html"),
			filename:"index.html"
		}),
		new HtmlWebpackPlugin({
			template: path.join(srcPath,"template","list.html"),
			filename:"list.html"
		})
	],
  output: {
    filename: 'main.[contenthash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
};
