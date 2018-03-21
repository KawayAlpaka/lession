
const loaderUtils = require("loader-utils");


module.exports = function(source,map){
    console.log("tpl-loader");
    //获取参数
    let options = loaderUtils.getOptions(this);
    console.log(options);
    // let s = source.replace(/<!--.*-->/gm,"");
    let s = source.replace(/<!--[\s\S]*-->/gm,"");
    let result = JSON.stringify(s);
    console.log(`export default ${ result }`);
    return `export default ${ result }`;
    // return source;
    // this.callback(null, source, map);
}