import * as express from "express";
import { AddressInfo } from "net";
let app = express();

app.get("/",(req,res)=>{
    res.send("hello world!")
});

var server = app.listen(3000,function(){
    let addressInfo = server.address() as AddressInfo;
    let host = addressInfo.address;
    let port = addressInfo.port;
    console.log('Example app listening at http://%s:%s', host, port);
});