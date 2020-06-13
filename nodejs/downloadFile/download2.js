var request = require('request');
var fs = require('fs');
var tangshis = require('./resource/tangshi.json');


function downloadFile(uri,filename){
  return new Promise((resolve,reject)=>{
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream)
        .on('close', ()=>{
          resolve();
        })
        .on('error',function(){
            console.log('error');
        }); 
  });
};

var run = async function(){
  for(let i =0;i<tangshis.length;i++){
    let uri = tangshis[i].src;
    let filename = "./dist/" + tangshis[i].name + ".mp3";
    await downloadFile(uri,filename);
  }
};
run();


