const fs = require("fs");
const cheerio = require('cheerio');
const axios = require('axios');
const Excel = require('exceljs');
const path = require('path');


const run = async function(){
  let r = [];
  try{
    for(let i = 1;i<=1179;i++){
    // for(let i = 1;i<=3;i++){
      let url = `http://haha`;
      console.log(url);
      await axios.get(url, {}).then(async (res)=>{
        var $ = cheerio.load(res.data);
        var $trs = $("#data_list_container").find("tr");
        console.log($trs.length);
        if($trs.length <= 1){
          await delay(10000);
          i--;
          return;
        }
        $trs.each((index,ele)=>{
          let $tds = $(ele).find("td");
          if($tds.length <= 0){
            return;
          }
          r.push({
            index: $($tds[0]).text().trim(),
            certificate: $($tds[1]).text().trim(),
            company: $($tds[2]).text().trim(),
            address: $($tds[3]).text().trim(),
            domain: $($tds[4]).text().trim(),
            type: $($tds[5]).text().trim(),
          });
        });
      });
      await delay(1000);
    }
    console.log(r.length);

    let pIndex = 0;
    for(let i =0;i<r.length;i++){
      if(pIndex>0){
        if(( parseInt(pIndex)  - parseInt(r[i].index)) != 1){
          console.log("不连续:",i);
        }
      }
      pIndex = r[i].index;
    }
  }finally{
    fs.writeFileSync(path.resolve(__dirname,"dist","gaokeji3.json"),JSON.stringify(r));
  }

};

const delay = function(ms){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve();
    },ms);
  });
};

run();
