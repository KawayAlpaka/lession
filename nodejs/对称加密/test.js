const aes = require("./crypto-util");

var encrypt = aes.encryption("44344444444444444444444444");
console.log(encrypt);
var decrypt = aes.decryption(encrypt);
console.log(decrypt);
