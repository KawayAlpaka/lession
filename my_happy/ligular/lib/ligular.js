//从angularjs源码上取的正则
const ARROW_ARG = /^([^(]+?)=>/;            //处理没有括号的箭头函数定义方式
const FN_ARGS = /^[^(]*\(\s*([^)]*)\)/m;    //处理有括号的函数定义方式

class Injector{
    constructor(){

    }
    getArgs(fn){
        let fnText = fn.toString();
        console.log(fnText);
        let args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
        return args[1].split(",").map((arg)=>{
            return arg.trim();
        });
    }
}
//测试获取参数
(()=>{
    var testCases = [
        {fn:function(ab,cd){},except:"ab,cd"},
        {fn:(ab,cd)=>{},except:"ab,cd"},
        {fn:(ab,cd)=>
            {},except:"ab,cd"},
        {fn:(ab , cd)=>{},except:"ab,cd"},
        {fn:ab=>{},except:"ab"},
        {fn:ab=>
            {},except:"ab"},
        {fn:ab =>{},except:"ab"},
    ];
    let injector = new Injector();
    testCases.forEach((testCase)=>{
        let result = injector.getArgs(testCase.fn).join(",");
        let showStr = `fn=${testCase.fn.toString()},reuslt=${result},except=${testCase.except}`;
        if(result == testCase.except){
            console.log("pass:"+showStr);
        }else{
            console.warn("error:"+showStr);
        }
    });
     
})();
