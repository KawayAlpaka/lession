var express = require('express');
var app = express();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs-extra');
var multer = require('multer');

fs.ensureDir("./upload/temp");
fs.ensureDir("./upload/blob");
fs.ensureDir("./upload/file");

app.use(express.static('www'));
app.use("/upload",express.static('upload'));

var upload = multer({dest: './upload/temp'});

var files = new Map();

app.post('/file/webuploader', upload.fields([
    {name: 'file'}
]), function(req, res, next){
    // console.log(req.body);
    var blob = req.body;
    for(var i in req.files){
        // console.log(req.files[i]);
        req.files[i].forEach(function (file) {
            var dstPath = './upload/blob/' + blob.blobMd5;
            fs.rename(file.path, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    if(!files.get(blob.fileMd5)){
                        files.set(blob.fileMd5,{
                            name:blob.fileName,
                            chunks:blob.chunks,
                            blobs:new Map()
                        });
                    }
                    var file = files.get(blob.fileMd5);
                    file.blobs.set(blob.chunk,{
                        md5:blob.blobMd5,
                        chunk:blob.chunk
                    });
                    // if(files[blob.fileMd5].blobs.size ==  files[blob.fileMd5].chunks){
                    //
                    // }
                    // files[blob.fileMd5].blobs.push({
                    //     md5:blob.blobMd5,
                    //     chunk:blob.chunk
                    // });
                    // if(files[blob.fileMd5].blobs.length == ){
                    //
                    // }
                    // console.log('rename ok');
                }
            });
        });

    }
    res.json({state:0});
});

app.get('/file/hasBlob', function (req, res, next) {
    console.log(req.query);
    var fileMd5 = req.query.fileMd5;
    // var blobMd5 = req.query.blobMd5;
    var chunk = req.query.chunk;
    var file = files.get(fileMd5);
    if(file && file.blobs.get(chunk)){
        res.json({
            result:"1"
        });
    }else{
        res.json({
            result:"0"
        });
    }
});

app.get('/file/combine', function (req, res, next) {
    console.log(req.query);
    var fileMd5 = req.query.fileMd5;
    var file = files.get(fileMd5);
    console.log(file.blobs.size);
    console.log(file.chunks);
    if(file && file.blobs.size == file.chunks){
        var chunk = 0;
        var writerPath = './upload/file/'+ fileMd5;
        var writerStream = fs.createWriteStream(writerPath);
        var combineOne = function () {
            var blob = file.blobs.get(chunk+"");
            if(!blob){
                writerStream.end("Done");
                res.json({
                    result:"0",
                    path:writerPath
                });
            }else{
                var readerStream = fs.createReadStream('./upload/blob/'+blob.md5);
                readerStream.on("end",function () {
                    console.log("chunk:"+chunk);
                    chunk++;
                    combineOne();
                });
                readerStream.pipe(writerStream,{end: false});
            }
        };
        combineOne();
    }else{
        res.json({
            result:"1",
            message:"分片没有上传完成",
            files:files
        });
    }
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});