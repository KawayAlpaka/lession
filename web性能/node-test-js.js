const { PerformanceObserver, performance } = require('perf_hooks');


performance.mark("start");

const add = (a,b)=>a+b;
const num1 = 1;
const num2 = 2;
add(1,"2")
for (let index = 0; index < 100000000; index++) {
  add(index,index+1)
  // add(num1,num2)
}
add(1,"2")  // 这一句会导致前面部分的优化被回滚，所以会慢很多
add(1,2)
for (let index = 0; index < 100000000; index++) {
  add(index,index+1)  
  // add(num1,num2)
}

performance.mark("end");

const observer = new PerformanceObserver((list)=>{
  console.log(list.getEntries()[0]);
});

observer.observe({entryTypes:["measure"]});


performance.measure("test1","start","end");