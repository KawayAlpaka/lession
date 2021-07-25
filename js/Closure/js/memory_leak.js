var a_store = null;
const run = ()=>{
  const largeData = new Array(10000000).fill(Math.random());
  const prevStore = a_store;
  // // 确实有点奇怪，inner没有被使用，但却能触发内存泄漏
  // const inner = ()=>{
  //   if(prevStore) // 这里需要使用一下 prevStore,否则不会泄漏
  //     return largeData;
  // }
  return function(){
    // eval("run return");  // 如果有这句，就可以不用上面那个inner，就能会导致泄漏
    // 或者写上下面两句，这种情况下，就相当于所有的data都会像链条一样被保存下来，所以会导致泄漏
    console.log(largeData)
    return prevStore;
  }
}

document.getElementById("test_memory_leak").addEventListener("click",()=>{
  a_store = run();
  console.log(window);
})

// setInterval(()=>{
//   a_store = run();
//   console.log(window);
// },10);

