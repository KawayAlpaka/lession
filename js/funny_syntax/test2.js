var str1 = "";
var data1 = {str:str1};
var test1 = function (data) {
    data.str = data.str + "1";
    test12(data);
    return data;
};
var test12 = function (data) {
    data.str = data.str + "2";
};
// test1(data1);
// console.log(data1);
console.log(test1(data1));
console.log(str1);
console.log(data1.str);



var test2 = function () {
    var data2 = {
        str2:"2",
        children:[{
            str2:"21",
            children:[{
                str2:"211",
                children:[]
            },{
                str2:"212",
                children:[]
            }]
        },{
            str2:"22",
            children:[]
        }]
    };
    var result = "";
    var path = "";
    var data = {node:data2,path:path,result:result};
    test21(data);
    return data.result;
};
var test21 = function (data) {
    var path = data.path + "." + data.node.str2;
    // 初步分析，data.result 的引用会变，导致每层都是单独的data.result
    data.result = data.result + path + "\r\n";
    // data.result += path + "\r\n";
    console.log("str2:"+data.node.str2);
    console.log("path:"+data.path);
    console.log("result:"+data.result);
    var data2 = {node:null,path:path,result:data.result};
    data.node.children.forEach(function (node) {
        data2.node = node;
        test21(data2);
    });
};
console.log(test2());