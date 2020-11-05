const path = require('path');

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
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};