
const { merge } = require('webpack-merge')
const commonConfig = require("./webpack.common")

const devConfig = merge(commonConfig,{
  devtool:"source-map"
});

module.exports = devConfig;
