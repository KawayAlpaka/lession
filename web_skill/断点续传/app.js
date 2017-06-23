var express = require('express');
var app = express();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var multer = require('multer');


app.use(express.static('www'));

var upload = multer({dest: './upload/temp'});

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
    res.json({state:0});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});