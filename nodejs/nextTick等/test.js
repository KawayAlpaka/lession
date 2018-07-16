
setImmediate(()=>{console.log('setImmediate')});

Promise.resolve()
// (new Promise((resolve,reject)=>{resolve();}))
.then(()=>{console.log('promise1')})
.then(()=>{console.log('promise2');});

process.nextTick(()=>{
  console.log('nextTick');
});

console.log('end');
