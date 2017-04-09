// redis 链接
var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');
// redis 链接错误
client.on("error", function(error) {
    console.log(error);
});

// client.set("string key", "string val", redis.print);
// client.get("string key",function () {
//     console.log(arguments);
// });

////对象
// client.set("obj1", JSON.stringify( {name:"123"}), redis.print);
client.get("obj1",function (err,obj) {
    console.log(JSON.parse(obj));
});