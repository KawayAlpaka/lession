const url = "http://1253731777.vod2.myqcloud.com/cd68bb45vodbj1253731777/f4416ced5285890807131735457/playlist_eof.m3u8";

const helper = require("./helper");
const path = require("path");

// console.log(helper);


// // 测试path
// let p = "haha31.pgweg?!@414";
// console.log("path.isAbsolute(p):",path.isAbsolute(p));
// console.log("path.isAbsolute(url):",path.isAbsolute(url));
// console.log("path.isAbsolute('/123/423'):",path.isAbsolute('/123/423'));
// console.log("path.dirname(url):",path.dirname(url));
// console.log('path.dirname(path.resolve(__dirname,"dist","fabuhui.ts")):',path.dirname(path.resolve(__dirname,"dist","fabuhui.ts")));
// console.log('path.basename(path.resolve(__dirname,"dist","fabuhui.ts")):',path.basename(path.resolve(__dirname,"dist","fabuhui.ts")));


// var url1 = path.relative(url,p);
// console.log(url1);
// var url2 = path.resolve(url,p);
// console.log(url2);
// var url3 = path.join(url,p);
// console.log(url3);

helper.downloadM3u8(url, path.resolve(__dirname,"dist","fabuhui.ts"),500);


// const URI = require('urijs');
// var t1 = new URI("https://cdn-freems.tnfvbblwhr.work/hlsredirect/fYsqWurOMqCrkbnKXc0njQ/1596488399/hls/251512/normal.3gp/seg-1-v1-a1.ts");
// var t2 = new URI("/hlsredirect/fYsqWurOMqCrkbnKXc0njQ/1596488399/hls/251512/normal.3gp/seg-1-v1-a1.ts");
// console.log(t1.origin());
// console.log(t2.origin());
// console.log("t1.pathname():",t1.pathname());
// console.log("t1.directory():",t1.directory());
// t2.origin("https://cdn-freems.tnfvbblwhr.work");
// console.log(t2.origin());
// console.log(t2.toString());


