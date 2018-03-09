const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
let createEntry = require("./webpack_conf/entry.js");
let createPlugins = require("./webpack_conf/plugins");
let webpack_module = require("./webpack_conf/module");
let createOutput = require("./webpack_conf/output");

var buildFolder = "dist";

var pagesSrcDir = "src/pages";
var pagesOutDir = buildFolder + "/pages";

var buildDir = path.resolve(__dirname, './'+buildFolder);

module.exports = {
  devtool: "source-map",
  entry: createEntry(pagesSrcDir),
  plugins: createPlugins(buildFolder,pagesSrcDir,pagesOutDir),
  module: webpack_module,
  output: createOutput(buildDir)
};