var f1 = function(){  // 创建一个f1方法
  var data = {        
    name:"data",
    data: (new Array(50000)).fill("data 111 data")
  };                  // 创建一个不会被使用到的变量
  var f = function(){
    // console.log("code:hello world");
    eval('console.log("eval:hello world");');
  };
  return f;
};
var F1 = f1();
// var f2 = function(){
//   var data = {name:"data",data: (new Array(50000)).fill("data 222 data")};
//   var f = function(){
//     eval('console.log("eval:hello world");');
//   };
//   return f;
// };
// var F2 = f2();

// 如果是nodejs环境，则直接输出内存使用情况 // 似乎不准确，与debug中查看的情况不同，debug中没用到的data变量会被释放，这里打印的看不出来(但用不用eval，占用的内存相同)
if(typeof module == "object"){
  console.log(process.memoryUsage());
}
