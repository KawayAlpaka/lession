var fs = require("fs");
var unzip = require("unzip");

fs.createReadStream('F:/robot/workspace/sample.zip').pipe(unzip.Extract({ path: 'F:/robot/workspace/hehe' }));