var getTime = function(){
  // return Date.now();
  return new Date().getTime()     //兼容ie8
}
var sum;
// 测试 1万次 eval("sum++")
sum = 0;
var startEval = getTime();
for(var i = 0;i<10000;i++){
  eval("sum++");
}
var durEval = getTime() - startEval;
console.log("durEval = ",durEval,"ms");
// 测试 500万次 sum++
sum = 0;
var startCode = getTime();
for(var i = 0;i<5000000;i++){
  sum++;
}
var durCode = getTime() - startCode;
console.log("durCode = ",durCode,"ms");
//输出结果
console.log('直接运行 sum++ 的速度约是 运行 eval("sum++") 的',(durEval * 500 / durCode).toFixed(0),'倍');
