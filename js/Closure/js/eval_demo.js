var ev = eval;
var G = "G";              // G 全局变量
var F =  (function(){
            var A = "A";
            var f1 = (function(){
              var a = "a";            // a 外层局部变量
              var f = function(b){    // b 参数, f 外层局部变量
                console.log("G:",G);
                var c = "c";          // c 内层局部变量
                console.log("a:",a);
                console.log("b:",b);
                console.log("c:",c);
                // f;
                d;
                eval("");
                // ev("console.log('ev')");
              }
              // var f2 = function(b){
              //   f;
              // }
              // eval('');
              return f;
            })();
            // eval('');
            return f1;
          })();
console.log(window);