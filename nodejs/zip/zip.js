var archiver = require('archiver');
var fs = require('fs');

var path = "F:/robot/workspace/sample";
var output = fs.createWriteStream(path+".zip");
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
output.on('close', function () {
    console.log("close");
});