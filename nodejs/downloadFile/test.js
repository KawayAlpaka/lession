const url = "https://cdn-freems.tnfvbblwhr.work/hlsredirect/fYsqWurOMqCrkbnKXc0njQ/1596488399/hls/251512/normal.3gp/index.m3u8";

const helper = require("./helper");
const path = require("path");

console.log(helper);
helper.downloadM3u8(url, path.resolve(__dirname,"dist","haha2.ts"));


// const URI = require('urijs');
// var t1 = URI("https://cdn-freems.tnfvbblwhr.work/hlsredirect/fYsqWurOMqCrkbnKXc0njQ/1596488399/hls/251512/normal.3gp/seg-1-v1-a1.ts");
// var t2 = URI("/hlsredirect/fYsqWurOMqCrkbnKXc0njQ/1596488399/hls/251512/normal.3gp/seg-1-v1-a1.ts");
// console.log(t1.origin());
// console.log(t2.origin());
// t2.origin("https://cdn-freems.tnfvbblwhr.work");
// console.log(t2.origin());
// console.log(t2.toString());


