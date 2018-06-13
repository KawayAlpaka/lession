const path = require('path');
module.exports = function createResolve(env){
    let fileName = "env";
    if(env.name && env.name.length > 0){
        fileName = "env." +  env.name;
    }
    return {
        alias:{
            env: path.resolve(__dirname, '../src/environments/' + fileName),
        }
    }
};