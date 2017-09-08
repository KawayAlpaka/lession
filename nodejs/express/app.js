var express = require('express');
var app = express();
var routerHome = require('./router/home');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var multer = require('multer');


app.use(express.static('public'));




app.use('/home', routerHome);


app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.post('/file/uploading', function(req, res, next){
    console.log('/file/uploading');
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/files/'});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files,null,2);

        if(err){
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            console.log(files);
            // var inputFile = files.inputFile[0];
            var inputFile = files.file1[0];
            var uploadedPath = inputFile.path;
            var dstPath = './public/files/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
        }

        // res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.send('Hello World!');
        // res.write('received upload:\n\n');
        res.end();
    });
});


var upload = multer({dest: './public/images/user'});

app.post('/file/webuploader', upload.fields([
    {name: 'file'}
]), function(req, res, next){
    console.log(req.body);
    for(var i in req.files){
        console.log(req.files[i]);
        req.files[i].forEach(function (file) {
            var dstPath = './public/files/' + file.originalname;
            fs.rename(file.path, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
        });
    }
    //ie8的特殊处理，为此，其他浏览器的前端上传代码，也要做修改，这种情况下，浏览器获得到的数据，不会自动转换为obj，而是json字符串
    //(如果不设置这个返回头，则IE8会弹出一个文件下载界面，并把返回的内容当成文件下载)
    // res.header('Content-Type', 'text/html; charset=utf-8');

    // console.log(req.header("aaa")); //ie不会发送
    // console.log(req.header("Accept"));
    // console.log(req.header("User-Agent"));
    // console.log(req.header("X-Requested-With"));//ie不会发送
    
    res.json({state:0});
});


app.use('*',function (req, res) {
    res.send('Hello 404');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});