function aaa() {
    var i = {};
    return (i.a = "1",i.b = "2",i.c = "3",i);
}

function bbb() {
    var i = {};
    return i.a = "a",i.b = "b",i.c = "c",i;
}

function ccc() {
    var i = {};

    return i.b = "2";
}

console.log(aaa());
console.log(bbb());
console.log(ccc());