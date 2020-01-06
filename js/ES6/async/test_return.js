// 结论 async函数 本身返回的也是一个Promise
// 当这个 async函数 执行完成后，这个Promise会变成resolve状态，值就是函数最后return的值
const fn1 = async function(){
  let r = await new Promise((resolve)=>{ setTimeout(()=>{ resolve("data haha")  },1000) });
  // console.log(r);
  return "hehe";
};
console.log("start");
let r = fn1()
console.log(r);
r.then(function(data){
  console.log(data);
});
console.log("end");
