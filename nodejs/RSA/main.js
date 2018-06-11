const fs = require("fs");
const crypto = require('crypto');
const keys = require("./key");

var msg = "hello RSA";

// var publicKey = keys.pubKey;
// var privateKey = keys.privKey;
var publicKey = fs.readFileSync("keys/rsa_public.key").toString();
var privateKey = fs.readFileSync("keys/rsa_private.key").toString();


console.log("公钥加密，私钥解密:");
var data1 = crypto.publicEncrypt(publicKey, Buffer.from(msg));
console.log(data1.toString('hex'));
var result1 = crypto.privateDecrypt(privateKey, data1);
console.log(result1.toString());

console.log("私钥加密，公钥解密:");
var data2 = crypto.privateEncrypt(privateKey, Buffer.from(msg));
console.log(data2.toString('hex'));
var result2 = crypto.publicDecrypt(publicKey, data2);
console.log(result2.toString());

// //加密
// var sign = crypto.createSign('RSA-SHA256');
// sign.update(msg);
// var sig = sign.sign(publicKey, 'hex');
// console.log(sig);
// //解密
// var verify = crypto.createVerify('RSA-SHA256');
// verify.update(data);
// console.log(verify.verify(privateKey, sig, 'hex'));