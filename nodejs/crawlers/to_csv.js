
const fs = require('fs');
const json2csv = require('json2csv').parse;
const path = require('path')




try {
  let dataJson = fs.readFileSync(path.resolve(__dirname,"dist","cpi.json")).toString();
  let data = JSON.parse(dataJson);

  if(data[0]){
    // var keys = Object.keys(data[0]); // 从第一条数据中取keys
    var keys = Object.keys(data[data.length-1]); // 从第最后条数据中取keys
  }else{
    console.log("没有数据");
    return;
  }
  let fields = keys;
  let opts = { fields };
  let csv = json2csv(data, opts);

  fs.writeFile(path.resolve(__dirname,"dist","cpi.csv"),csv ,function(err){
    if(err) console.log('写文件操作失败');
    else console.log('写文件操作成功');
  });
} catch (err) {
  console.error(err);
}