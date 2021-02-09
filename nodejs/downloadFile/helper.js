
const fs = require('fs');
const axios = require('axios');
const m3u8Parser = require('m3u8-parser');
const path = require("path");
const URI = require('urijs');


async function downloadFileMuti(uris,saveDir){
  
  for(let uri of uris){
    console.log(uri);
    let saveBasename = path.basename(uri);
    let saveFullPath = path.join(saveDir,saveBasename);
    await downloadFile(uri,saveFullPath);
  }
}

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

function downloadM3u8(uri,saveFullPath,fenpian=0){
  var m3u8Uri = URI(uri);
  const origin = m3u8Uri.origin();
  const saveBasename = path.basename(saveFullPath);
  const saveDirname = path.dirname(saveFullPath);
  

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


    let file;
    let fenpian_index = 0;
    let fenpian_name;
    const creatFenpian = ()=>{
      fenpian_index++;
      fenpian_name = ("" + fenpian_index).padStart(4,"0") + "_"+saveBasename;
      file = fs.createWriteStream(path.join(saveDirname,fenpian_name));
    };
    if(fenpian <= 0){
      file = fs.createWriteStream(saveFullPath);
    }

    for(let i=0;i<segments.length;i++){
    // for(let i=0;i<5;i++){
      console.log(i);
      if(fenpian > 0 && i % fenpian == 0){
        if(file){
          file.end();
        }
        creatFenpian();
      }

      let ii = i.toFixed(0).padStart(4,"0");
      let uri = URI(segments[i].uri);
      if(!uri.origin()){
        if(path.isAbsolute(uri.toString())){  // 判断是否是 / 开头
          uri.origin(origin);
        }else{
          let dirname = m3u8Uri.directory();
          uri = origin + dirname + "/" + uri.toString();
        }
      }
      // console.log(uri.toString());
      let url = uri.toString();
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
  downloadM3u8,
  downloadFileMuti
};
