var http = require('http');
var url = require('url').parse('http://www.9958.pw/');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');

var exec = require('child_process').exec;

exec('dir F:\\',{},function(error,stdout,stderr){
    if(error) {
        console.info('stderr : '+stderr);
    }
    if(stdout.length >1){
        var code = "gbk";

        // var bufferHelper = new BufferHelper();
        // bufferHelper.concat(new Buffer(stdout));
        // console.log(iconv.decode(bufferHelper.toBuffer(),code));

        // var buffer = new Buffer(stdout);
        // console.log(iconv.decode(buffer,code));

        console.log(iconv.decode(stdout,code));

        // console.log("stdout："+ stdout);
    } else {
        // console.log('you don\'t offer args');
    }
});

// var b =  new Buffer("你好","utf8");
// console.log(b.toString("base64"));