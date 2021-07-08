
const { merge } = require('webpack-merge')
const commonConfig = require("./webpack.common")

const Config = merge(commonConfig,{
  mode:"production"
});

module.exports = Config;
