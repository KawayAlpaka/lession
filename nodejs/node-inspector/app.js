console.log("hello node-inspector");
const http = require("http");
var server = http.createServer(function(req,res){
  console.log("receive a request");
  res.end("hello");
});

server.listen(3030,function(){
  console.log("listening");
});