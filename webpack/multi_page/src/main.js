
console.log("main.js:")

class Foo {
    getString (){
        return "foo";
    }
}

var obj = {
    name:"main"
}
export {
    obj
};
export function getIndex(params) {
    return "index";
};
export {
    Foo
};