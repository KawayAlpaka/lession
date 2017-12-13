if(typeof module != "undefined"){
    var handler = require('./handler');
}
class Bar{
    constructor(a){
        this.a = a;
        return new Proxy(this,handler);
    }    
}
var bar = new Bar(1);
bar.b = 2;
console.log(bar);
console.log(bar.cc);
