var moment = require('moment');

console.log(moment().format());
console.log(new Date());
console.log(new Date().getTime());
console.log(Date.now());
console.log(moment(new Date("2015-09-15").getTime()).format());
console.log(moment(new Date("2015-09-15 23:12:59:543").getTime()).format("YYYYMMDDHHmmssSSS"));