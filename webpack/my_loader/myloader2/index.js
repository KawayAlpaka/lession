module.exports = function(s){
    console.log("myloader2");
    console.log(arguments);
    var a = function(){
    };
    var r = {
        a:a,
        b:s
    };
    console.log(`export ${ JSON.stringify(r) }`);
    // return `export '${ JSON.stringify(r) }'`;
    return `var a = 1;
    var b = function(){
        console.log("${ s }");
    };
     export { a,b }; `;
}