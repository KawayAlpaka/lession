var mongoose = require('mongoose');
var AccessToken = mongoose.model('AccessToken');
var extend = require('util')._extend;

var fns = {};

fns.update = function (req, res) {


    //获取 access_token
    const https = require('https');
    var options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid=wx13f06fd9ec831ed6&secret=396e23200d59276bcf9c4a3eb2b0d05d',
        method: 'GET'
    };

    var mReq = https.request(options, (mRes) => {
        // console.log('statusCode:', mRes.statusCode);
        // console.log('headers:', mRes.headers);

        mRes.on('data', (d) => {
            var data = JSON.parse(d.toString('utf8'));
            if(data.errcode){
                res.resFormat.msg = "请求错误";
                res.resFormat.logicState = 1;
                res.json(res.resFormat);
            }else if(data.access_token){

                //获取 jsapiTicket
                var getJsapiTicketOptions = {
                    hostname: 'api.weixin.qq.com',
                    port: 443,
                    path: "/cgi-bin/ticket/getticket?access_token="+data.access_token+"&type=jsapi",
                    method: 'GET'
                };

                var mJReq = https.request(getJsapiTicketOptions, (mJRes) => {
                    mJRes.on("data",(jd)=>{
                        var jData = JSON.parse(jd.toString('utf8'));
                        console.log(jData);
                        if(jData.errcode != 0){
                            res.resFormat.msg = "请求错误";
                            res.resFormat.logicState = 1;
                            res.json(res.resFormat);
                        }else if(jData.ticket){
                            AccessToken.create({accessToken:data.access_token,jsapiTicket:jData.ticket},function (err,accessToken) {
                                if(err){
                                    res.resFormat.data = err;
                                    res.resFormat.msg = "创建失败";
                                    res.resFormat.logicState = 1;
                                }else{
                                    res.resFormat.data = accessToken;
                                }
                                res.json(res.resFormat);
                            });
                        }
                    });
                });

                mJReq.end();
                mJReq.on('error', (e) => {
                    console.error(e);
                    res.resFormat.msg = "请求失败";
                    res.resFormat.logicState = 1;
                    res.json(res.resFormat);
                });
            }
        });

    });
    mReq.end();
    mReq.on('error', (e) => {
        console.error(e);
        res.resFormat.msg = "请求失败";
        res.resFormat.logicState = 1;
        res.json(res.resFormat);
    });
};

module.exports = fns;