var net = require('net');

var start = function (cbOnListen,cbOnData) {
    var server = net.createServer();
    var sockets = [];
    server.on('connection', function(socket) {
        sockets.push(socket);
        socket.on('data', function(data) {
            var str = data.toString();
            try{
                var jsonStrs = str.split(/J\d{1,4}\|/);
                jsonStrs.forEach(function (jsonStr) {
                    if(jsonStr.trim().length > 0){
                        var json = JSON.parse(jsonStr);
                        cbOnData(json);
                        if(json[0] == "close"){
                            console.log("socket destroy");
                            socket.destroy();
                            console.log("Server close");
                            server.close();
                        }
                    }
                });
            }catch(err) {
                console.log(str);
            }

        });
        socket.on('error', function(e) {
            console.log('error:');
            console.log(e);
            server.close();
        });
        socket.on('close',function (e) {
            console.log('close:');
            console.log(e);
            sockets.splice(sockets.indexOf(socket), 1); // 删除数组中的制定元素。这是 JS 基本功哦~
        });
        socket.on('end', function() {
            console.log('end:');
            // sockets.splice(sockets.indexOf(socket), 1); // 删除数组中的制定元素。这是 JS 基本功哦~
        });
    }).on('error', function (err) {
        console.log(err);
        throw err;
    });

    server.listen(function () {
        console.log(server.address());
        cbOnListen(server.address());
    });
};

module.exports.start = start;