var env = {
    net:{
        protocol:"http",
        // ssl:{
        //     key:"D:/ssl/privatekey.pem",
        //     cert:"D:/ssl/certificate.pem"
        // },
        port: 3030
    },
    db:{
        host: "localhost",
        port: "27017",
        user: {
            user:"ride",
            pwd:"ride"
        },
        database:"web_ride"
    }
};







//默认设置
if(!env.net){
    env.net = {
        protocol:"http",
        port: 3030
    };
}else{
    if(!env.net.port){
        env.net.port = 3030;
    }
    if(!env.net.protocol){
        env.net.protocol = "http";
    }
}

if(!env.db){
    env.db = {
        host: "localhost",
        port: "27017",
        database:"web_ride"
    };
}else{
    if(!env.db.host){
        env.db.host = "localhost";
    }
    if(!env.db.port){
        env.db.port = "27017";
    }
    if(!env.db.database){
        env.db.database = "web_ride";
    }
}

module.exports = env;