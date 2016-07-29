"use strict";
var fs = require("fs");
var unzip = require("unzip");
var archiver = require('archiver');

module.exports.unzip = function (zipPath,unzipPath,cb) {
    var readStream = fs.createReadStream(zipPath);
    readStream.pipe(unzip.Extract({ path: unzipPath })).on('close', cb);
};

module.exports.zip = function (inputPath,outputPath,successCb) {
    var path = inputPath;
    var output = fs.createWriteStream(outputPath);
    var archive = archiver('zip');

    archive.on('error', function(err){
        throw err;
    });
    console.log(path);
    archive.pipe(output);
    archive.bulk([
        {
            src: ['**'],
            // dest: mainItem.path + '/',
            cwd: path,
            expand: true
        }
        
    ]);
    archive.finalize();
    output.on('close', successCb );
};