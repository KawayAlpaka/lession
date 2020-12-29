let let_a = "let_aaaaaa";
var var_a = "var_aaaaaa";
console.log(let_a);
console.log(window.let_a);
console.log(var_a);
console.log(window.var_a);
let fn1 = function(){
  let let_b = "let_bbbbbb";
  var var_b = "var_bbbbbb";
  console.log(let_a);
  console.log(var_a);
  console.log(let_b);
  console.log(var_b);
  if(true){
    let let_c = "let_cccccc";
    var var_c = "var_cccccc";
    console.log(let_c);
    console.log(var_c);
  }
  let fn2 = function(){
    let let_d = "let_dddddd";
    var var_d = "var_dddddd";
    console.log(let_d);
    console.log(var_d);
  }
  fn2();
}
fn1();