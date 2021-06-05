// https://segmentfault.com/a/1190000022924958

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const filePath = path.join(__dirname, 'dist',"zhai.apk");

// const buffer = fs.readFileSync(filePath);
// const hash = crypto.createHash('md5');
// hash.update(buffer, 'utf8');
// const md5 = hash.digest('hex');
// console.log(md5);


const stream = fs.createReadStream(filePath);
const hash = crypto.createHash('md5');
stream.on('data', chunk => {
  hash.update(chunk, 'utf8');
});
stream.on('end', () => {
  const md5 = hash.digest('hex');
  console.log(md5);
});
