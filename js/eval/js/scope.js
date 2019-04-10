//来源于 JavaScript 秘密花园，本人略有修改 (https://bonsaiden.github.io/JavaScript-Garden/zh/#core.eval)
//eval 函数会在当前作用域中执行一段 JavaScript 代码字符串。
(function(){
  var foo = 1;
  function test() {
      var foo = 2;
      eval('foo = 3');
      return foo;
  }
  console.log(test());    // 3
  console.log(foo);       // 1
})();
console.log("--------------分割线----------------------------");
// 但是 eval 只在被直接调用并且调用函数就是 eval 本身时，才在当前作用域中执行。
// 间接调用eval时 执行的作用域为全局作用域，两个function中的 foo 都没有被修改，全局的 foo 被修改了
var foo = 1;
(function(){
  var foo = 1;
  function test() {
      var foo = 2;
      var bar = eval;
      bar('foo = 3');
      return foo;
  }
  console.log(test());    // 2
  console.log(foo);       // 1
})();
console.log(foo);         // 3

