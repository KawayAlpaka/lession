let EC = require("elliptic").ec;
let ec = new EC('secp256k1');

// 生成公私钥对
let keypair = ec.genKeyPair();
const res = {
  prv: keypair.getPrivate('hex').toString(),
  pub: keypair.getPublic('hex').toString(),
}
console.log(res);

// 私钥签名,公钥验证前面
let keypair2 = ec.genKeyPair();
let data = "hahahehe";
let prvKey = ec.keyFromPrivate(res.prv,'hex');
let pubKey = ec.keyFromPublic(res.pub,'hex');
// 另外的公钥测试
// let pubKey = ec.keyFromPublic(keypair2.getPublic('hex').toString(),'hex');

let signature = prvKey.sign(data);
let derSign = signature.toDER();
console.log(pubKey.verify(data, derSign));

module.exports = res;
