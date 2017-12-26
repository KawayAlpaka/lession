var request = require('request');
var fs = require('fs');


/*
* 数字长度不足函数
*/
var buzu = function(num,n){
    var a = '000000000000000' + num;
    return a.substring(a.length-n);
};
// console.log(buzu(10,4));
// console.log(buzu(3,4));

/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function downloadFile(uri,filename,callback){
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream)
        .on('close', callback)
        .on('error',function(){
            console.log('error');
        }); 
}
// http://tv.cctv.com/2017/08/20/VIDEpHe5T9NjtzZ6ATARGZEH170820.shtml
// http://cntv.hls.cdn.myqcloud.com/asp/hls/850/0303000a/3/default/183fefbd9da14657af39e18742a256ee/210.ts
var basefileUrl  = 'http://cntv.hls.cdn.myqcloud.com/asp/hls/850/0303000a/3/default/183fefbd9da14657af39e18742a256ee/';
var localPath = 'E:/tss/';
var index = 0;
var filename = localPath + buzu(index,4)+".ts";
var fileUrl = basefileUrl+index+".ts";
var cb = function(){
    console.log(filename+'下载完毕');
    index++;
    filename = localPath + buzu(index,4)+".ts";
    fileUrl = basefileUrl+index+".ts";
    downloadFile(fileUrl,filename,cb);
};
downloadFile(fileUrl,filename,cb);

