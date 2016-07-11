//  Sever --> Client 的单向通讯
var net = require('net');

var chatServer = net.createServer();

var clients = [];


// //处理转义字符\\测试代码
// var ttt = '["start_suite",["Hello",{"doc":"","id":"s1","longname":"Hello","metadata":{},"source":"F:\\robot\\workspace\\hello","starttime":"20160705 15:59:44.067","suites":["Suite1"],"tests":[],"totaltests":1}]]';
// var ttt1 = '["start_suite",["Hello",{"doc":"","id":"s1","longname":"Hello","metadata":{},"source":"F:\\robot\\workspace\\hello"    }]]';
// var ttt2 = '["start_suite","\\"]';
// var tt = JSON.parse(ttt1.replace(/\\/g,"/"));
// console.log(tt);

chatServer.on('connection', function(client) {
    client.write('Hi!\n'); // 服务端向客户端输出信息，使用 write() 方法
    client.write('Bye!\n');
    clients.push(client);
    client.on('data', function(data) {
        var str = data.toString();
        try{
            var jsonStrs = str.split(/J\d{1,4}\|/);
            jsonStrs.forEach(function (jsonStr) {
                if(jsonStr.trim().length > 0){
                    var json = JSON.parse(jsonStr);
                    if(json[0] == "close"){

                    }
                }
            });
            // broadcast(data, client);// 接受来自客户端的信息
        }catch(err) {
            console.log(str);
        }

    });
    client.on('error', function(e) {
        console.log('error:');
        console.log(e);
    });
    client.on('close',function (e) {
        console.log('close:');
        console.log(e);
        clients.splice(clients.indexOf(client), 1); // 删除数组中的制定元素。这是 JS 基本功哦~
    });
    client.on('end', function() {
        console.log('end:');
        // clients.splice(clients.indexOf(client), 1); // 删除数组中的制定元素。这是 JS 基本功哦~
    });
    // client.end(); // 服务端结束该次会话
}).on('error', (err) => {
    // handle errors here
    console.log(err);
    throw err;
});

// chatServer.listen(9000);
chatServer.listen(function () {
    console.log(chatServer.address());
});