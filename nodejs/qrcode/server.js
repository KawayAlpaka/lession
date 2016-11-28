//windows下没有安装成功
//linux下还没有测试

var QRCode = require('qrcode');

QRCode.toDataURL('i am a pony!',function(err,url){
    console.log(url);
});

