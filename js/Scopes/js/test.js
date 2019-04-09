var G = {};
G.f = function(){
  var f_v1 = "f_v1";
  var f_v2 = "f_v2";
  G.f1 = function(){
    var f1_v1 = "f1_a";
    G.f11 = function(){
      var f11_v1 = "f11_v1";
      G.f111 = function(){
        var f111_v1 = "f111_v1";
        console.log(f_v1);
        // console.log(f1_v1);
        // console.log(f11_v1);
        // console.log(f111_v1);
        // eval('');
      }
    }
    G.f12 = function(){
      var f11_v1 = "f12_v1";
      // console.log(f_v2);
    }
  }
}
G.f();
G.f1();
G.f11();
console.log(G);