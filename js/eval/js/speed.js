(function(){
  var sum;
  // 测试 1万次 eval("sum++")
  console.log('eval("sum++"):');
  var startEvel = Date.now();
  sum = 0;
  for(var i = 0;i<10000;i++){
    eval("sum++");
  }
  var durEvel = Date.now() - startEvel;
  console.log("durEvel = ",durEvel,"ms");

  // 测试 500万次 sum++
  console.log('sum++:');
  var startCode = Date.now();
  sum = 0;
  for(var i = 0;i<5000000;i++){
    sum++
  }
  var durCode = Date.now() - startCode;
  console.log("durCode = ",durCode,"ms");

  console.log(`直接运行 sum++ 的速度约是 运行 eval("sum++") 的 ${(durEvel * 500 / durCode).toFixed(0)} 倍`);
})();
