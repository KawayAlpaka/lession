const path = require('path');
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
  var config = {
    devtool: "source-map",
    entry: createEntry(pagesSrcDir),
    plugins: createPlugins(buildFolder,pagesSrcDir,pagesOutDir),
    module: webpack_module,
    resolve:createResolve(env),
    output: createOutput(buildDir)
  };
  var mode = "development";
  if(env.name == "prod"){
    mode = "production";
  };
  config.mode = mode;
  return config;
};