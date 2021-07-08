
const { merge } = require('webpack-merge')
const commonConfig = require("./webpack.common")

const devConfig = merge(commonConfig,{});

module.exports = devConfig;
