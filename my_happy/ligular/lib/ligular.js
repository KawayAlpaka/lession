const ARROW_ARG = /^([^(]+?)=>/;
const FN_ARGS = /^[^(]*\(\s*([^)]*)\)/m;

class Injector{
    constructor(){

    }
    getArgs(fn){
        let fnText = fn.toString();
        let args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
        return args[1].split(",");
    }
}
//测试获取参数
(()=>{
    var testCases = [
        {fn:function(ab,cd){},except:"ab,cd"},
        {fn:(ab,cd)=>{},except:"ab,cd"},
        {fn:ab=>{},except:"ab"},
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
