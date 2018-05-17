// import * as CsvHelper from "./csv_helper"; //nodejs默认不认这个import语法
const CsvHelper = require("./csv_helper");

var start = function () {
    CsvHelper.readCsv("../data/pfm_train.csv").then((table) => {
        // CsvHelper.readCsv("data/pfm_train.csv").then((table)=>{
        train(table);
        trainCount++;
        if (trainCount < 20) {
            start();
        }
    }).catch((err) => {
        console.log(err);
    });
};



var trainCount = 0;
var w;
var delta = 0.1;
var numberIndexse;
var rightCount = 0;

let train = function(table){
    init(table[1]);
    let rowsLen = table.length;
    rightCount = 0;
    console.log("rowsLen="+rowsLen);
    for(let i =1;i<rowsLen;i++){
         calcOneRow(table[i]);
    }
    console.log("rightCount="+rightCount);
    console.log(w.join(","));
};

var calcOneRow = function(row){
    var result = getRightResult(row);
    let numberData = getPart(row,numberIndexse);
    numberData.unshift(1);
    var wtx = doMul(numberData,w);
    // console.log(wtx);
    var _result = activation(wtx,w[0]);
    if(result == _result){
        rightCount++;
    }else{
        let len = w.length;
        for(let i=0;i<len;i++){
            let d = delta*(result-_result)*numberData[i];
            // console.log(d);
            w[i] = w[i] + d;
        }
        // console.log(w);
    }
};
var doMul = function (xs, ws) {
    let r = 0;
    if (xs.length == ws.length) {
        for (let i = 0; i < xs.length; i++) {
            r = xs[i] * ws[i];
        }
    } else {
        console.error("xs.length != ws.length");
    }
    return r;
};

var init = function(dataRow){
    let row = [];
    dataRow.forEach((data)=>{
        row.push(data);
    });
    let _result = getRightResult(row);
    numberIndexse = getNumberIndexse(row);
    // //首次
    if(trainCount == 0){
        let numberData = getPart(row,numberIndexse);
        w = new Array(numberData.length);
        w.fill(0);
        w.unshift(0);
    }else{

    }

    //非首次
    // w = [119,3612,1484,327,116582,274,282,133,278,336779,340,1860,383,290,9520,38,430,304,318,109,76,4,1];
    // w = [253,7737,2951,694,242065,590,608,291,602,738924,739,3971,815,633,20240,95,945,655,671,234,206,23,10];
    // w = [391,11919,4532,1068,370313,928,943,449,939,1128791,1138,6144,1259,977,31280,153,1460,1015,1032,332,349,63,21];
    // w = [530,16174,6110,1442,500847,1264,1285,612,1283,1540081,1551,8318,1706,1329,42400,215,2020,1382,1398,474,504,100,32];
}

let activation = function(wtx,n){
    if(wtx > n){
        return 1;
    }else{
        return -1;
    }
};

let getNumberIndexse = function(arr){
    let len = arr.length;
    let indexse = [];
    for(let i=0;i<len;i++){
        if(!isNaN(parseFloat(arr[i]))){
            indexse.push(i);
        }
    }
    return indexse;
};
let getRightResult = function(arr){
    return parseInt(arr.splice(1,1)[0]) > 0 ? 1 : -1;
};

let getPart = function(arr,indexse){
    var _arr = [];
    indexse.forEach(index => {
        _arr.push(arr[index]);
    });
    return _arr;
};
start();