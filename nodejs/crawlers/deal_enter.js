var fs=require('fs');
var path = require("path");
  
fs.readFile('text/楚留香新传——借尸还魂.txt','utf-8',function(err,data){
    if(err){
      console.error(err);
    }
    else{
      var r = ""
      // console.log(data);
      var arr = data.split("\r\n");
      arr.forEach(function(str){
        if(str.length > 28){
          r += str;
        }else{
          r += str + "\r\n";
        }
      });

      if (!fs.existsSync("dist")) {
        fs.mkdirSync("dist");
      }

      var outputFile = "楚留香新传——借尸还魂.txt";
      var outputDir = "dist"
      var outputPath = path.resolve(__dirname, outputDir, outputFile);
      fs.appendFileSync(outputPath, r + "\r\n", "utf-8");

    }
});