// https://cc-b.llscdn.com/ssk-prod/vm3u8/15ceb0606a5a10d6.m3u8

// https://apineo.llsapp.com/api/v1/lux_klass_sessions/OTA4NWIwMDAwMDAzZTY0Mg==/video

const helper = require('./helper');
const path = require("path");
const axios = require('axios');
const lessons = require("./resource/lls");


const getM3u8Url = async function(id){
  return await axios({
    method:'get',
    url: `https://apineo.llsapp.com/api/v1/lux_klass_sessions/${id}/video`
  }).then((res)=>{
    return res.data.url
  });
};

// console.log(lessons);
const run = async function(){
  // let url = await getM3u8Url(lessons[lessons.length-1].id);
  // console.log(url);
  for(let i=0;i<lessons.length;i++){
  // for(let i=1;i<2;i++){
    let filename = `level ${lessons[i].level} ${lessons[i].title.trim()}.ts`;
    filename = filename.replace(/:/g,"：").replace(/\?/g,"？");
    let outPath = path.resolve(__dirname,"dist","lls",filename);
    console.log(i + ":" , outPath);
    let m3u8Url = await getM3u8Url(lessons[i].id);
    // console.log(m3u8Url);
    await helper.downloadM3u8(m3u8Url,outPath);
  }
};
run();
// helper.downloadM3u8("https://cc-b.llscdn.com/ssk-prod/vm3u8/15ceb0606a5a10d6.m3u8")
// helper.downloadFile("https://cc-b.llscdn.com/ssk-prod/vm3u8/15ceb0606a5a10d6.m3u8",path.resolve(__dirname,"dist","haha.m3u8"));
// helper.downloadM3u8("https://cc-b.llscdn.com/ssk-prod/vm3u8/15ceb0606a5a10d6.m3u8",path.resolve(__dirname,"dist","haha"));


// var a = {a:"a"}
