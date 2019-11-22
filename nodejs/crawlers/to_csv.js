
const fs = require('fs');
const json2csv = require('json2csv').parse;
const path = require('path')




try {
  let dataJson = fs.readFileSync(path.resolve(__dirname,"dist","5idem.json")).toString();
  let data = JSON.parse(dataJson);

  if(data[0]){
    var keys = Object.keys(data[0]);
  }else{
    console.log("没有数据");
    return;
  }
  let fields = keys;
  let opts = { fields };
  let csv = json2csv(data, opts);

  fs.writeFile(path.resolve(__dirname,"dist","data.csv"),csv ,function(err){
    if(err) console.log('写文件操作失败');
    else console.log('写文件操作成功');
  });
} catch (err) {
  console.error(err);
}