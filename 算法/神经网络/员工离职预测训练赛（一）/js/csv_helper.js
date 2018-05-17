var fs = require("fs");

let readCsv = function(filePath){
    return new Promise((reslove,reject)=>{
        fs.readFile(filePath, function (err, data) {
            var table = new Array();
            if (err) {
                reject(err.stack);
                return;
            }
        
            ConvertToTable(data, function (table) {
                reslove(table);
            });
        });
    });
}


// console.log("程序执行完毕");

function ConvertToTable(data, callBack) {
    data = data.toString();
    var table = new Array();
    var rows = new Array();
    rows = data.split("\n");
    for (var i = 0; i < rows.length; i++) {
        table.push(rows[i].split(","));
    }
    callBack(table);
}

module.exports = {
    readCsv:readCsv
};