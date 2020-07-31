
const fs = require('fs');
const axios = require('axios');
const m3u8Parser = require('m3u8-parser');
const URI = require('urijs');


function downloadFile(uri,saveFullPath){
  return axios({
    method:'get',
    url:uri,
    responseType:'stream'
  }).then(function(response) {
    return new Promise((resolve,reject)=>{
      // console.log("start:",Date.now());
      let t = response.data.pipe(fs.createWriteStream(saveFullPath));
      // response.data.on("end",()=>{
      //   console.log("response end:",Date.now());
      // });
      // response.data.on("close",()=>{
      //   console.log("response close:",Date.now());
      // });
      // t.on("end",()=>{
      //   console.log("t end:",Date.now());
      // });
      t.on("close",()=>{
        resolve();
        // console.log("t close:",Date.now());
      });
      t.on("error",(e)=>{
        // resolve();
        console.log("t error:",e.toString());
      });
    });
  });
};


function getArraybuffer (uri){
  console.log(uri);
  return axios({
    method:'get',
    url:uri,
    responseType:'arraybuffer'
  }).then((res)=>{
    return res.data;
  });
}

function downloadM3u8(uri,saveFullPath){
  var m3u8Uri = URI(uri);
  const origin = m3u8Uri.origin();
  return axios({
    method:'get',
    url:uri
  }).then(async function(response) {
    let manifest = response.data;
    const parser = new m3u8Parser.Parser();
    parser.push(manifest);
    parser.end();
    let segments = parser.manifest.segments;
    // console.log(parser.manifest.segments);
    let file = fs.createWriteStream(saveFullPath);

    for(let i=0;i<segments.length;i++){
    // for(let i=0;i<5;i++){
      let ii = i.toFixed(0).padStart(4,"0");
      let url = origin + segments[i].uri;
      // await downloadFile(url,saveFullPath + `/${ii}.ts`);
      let arraybuffer = await getArraybuffer(url);
      // console.log(arraybuffer);
      file.write(arraybuffer);
    }
    file.end();
  });
  

}

module.exports = {
  downloadFile,
  downloadM3u8
};
