
// var v1s = [];
// var urls = v1s.map((v1)=>v1.d).reduce((a,b)=>{
//   return a.concat(b);
// }).map(d=>d.ol);


const images = require("./resource/alltuu.json");
const helper = require('./helper');
const path = require("path");
// console.log(path.basename(images[0]));
helper.downloadFileMuti(images,path.join(__dirname,"dist","alltuu"));
