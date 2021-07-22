const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const prodConfig = require("./webpack.prod");
const smp = new SpeedMeasurePlugin();
const measureConfig = smp.wrap(prodConfig);
module.exports = measureConfig;
