
// 
var a = {a:"aa"};
with(a){
  var haha = "haha";
  console.log(a);
  console.log(window);
}


// 要阻断b，就必须在调用时传入一个b的值
var b = {b:"bb"}
var fn =  new Function("g", `
                with(g){
                  var hehe = "hehe";
                  console.log(this);
                  console.log(a);
                  console.log(b);
                  console.log(window);
                  // alert("alert"); // 还是会弹出
                  return a;
                }
              `).bind({});
fn({a,window:{},b:undefined});