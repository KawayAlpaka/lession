console.log("start");


Promise.resolve().then(()=>{
  console.log("Promise then 1")
})

setImmediate(()=>{
  console.log("setImmediate 1")
});


setTimeout(()=>{
  console.log("setTimeout 1")
},0);

Promise.resolve().then(()=>{
  console.log("Promise then 2")
})

console.log("end");
