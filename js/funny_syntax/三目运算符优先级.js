var val = 'c';
var str = 'Value is ' + (val === 'c') ? 'a' : 'b';
console.log(str);  // 输出 a ，说明是先运算 + ，再进行三目运算
