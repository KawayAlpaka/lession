import * as express from "express";
import { AddressInfo } from "net";
import { Hello } from "./module";
Hello("express");
let app = express();

app.use('/', express.static('dist'));
// app.use('/js', express.static('out/web'));

app.get("/welcome",(req,res)=>{
    res.send("welcome");
});

var server = app.listen(3000,function(){
    let addressInfo = server.address() as AddressInfo;
    let host = addressInfo.address;
    let port = addressInfo.port;
    console.log('Example app listening at http://%s:%s', host, port);
});

