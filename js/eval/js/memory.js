var F1 = (function(){
  var data = {name:"data",data: (new Array(50000)).fill("data 111 data")};
  var f = function(){
    eval('console.log("eval:hello world");');
  };
  return f;
})();
var F2 = (function(){
  var data = {name:"data",data: (new Array(50000)).fill("data 222 data")};
  var f = function(){
    console.log("code:hello world");
  };
  return f;
})();