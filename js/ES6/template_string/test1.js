var assert = require('assert');

var x = 1;
var y = 2;
console.log(`${x} + ${ y } = ${ x + y}`);

var s = `a
    b
    c`;
assert(s === 'a\n    b\n    c');
console.log(s === 'a\n    b\n    c');
console.log(s);


function tag(strings, ...values) {
    console.log(strings);
    console.log(values);
    // assert(strings[0] === 'a');
    // assert(strings[1] === 'b');
    // assert(values[0] === 0);
    return 'whatever';
}
tag `a${ 42 }b`;  // "whatever"

function r(strings, ...values) {
    assert(strings.raw[0] === '\\n');
    console.log(strings);
    console.log(strings.raw[0]);
}

r `\n`;


console.log( String.raw `a\n${ 42 }b`);  // "a\\n42b"