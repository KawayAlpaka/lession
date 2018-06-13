const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
let createEntry = require("./entry");
let createPlugins = require("./plugins");
let webpack_module = require("./module");
let createOutput = require("./output");
let createResolve = require("./resolve");


var buildFolder = "dist";
var pagesSrcDir = "src/pages";
var pagesOutDir = buildFolder + "/pages";
var buildDir = path.resolve(__dirname, '../'+buildFolder);

module.exports = function(env){
  return {
    devtool: "source-map",
    entry: createEntry(pagesSrcDir),
    plugins: createPlugins(buildFolder,pagesSrcDir,pagesOutDir),
    module: webpack_module,
    resolve:createResolve(env),
    output: createOutput(buildDir)
  };
};