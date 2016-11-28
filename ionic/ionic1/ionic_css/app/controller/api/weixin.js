var mongoose = require('mongoose');
var AccessToken = mongoose.model('AccessToken');
var extend = require('util')._extend;
var sha1 = require('sha1');
var fns = {};

fns.getConfig = function (req, res) {
    AccessToken.getLast(function (err, accessToken) {
        if(err){

        }else if(accessToken){
            var createNonceStr = function() {
                return Math.random().toString(36).substr(2, 15);
            };
            var noncestr = createNonceStr();
            var timestamp = parseInt(new Date().getTime().toString().substr(0,10));
            var url = "http://weixin.yangtuos.com/";
            var string1Obj = {
                noncestr: noncestr,
                jsapi_ticket: accessToken.jsapiTicket,
                timestamp: timestamp ,
                url:url
            };

            var keys = Object.keys(string1Obj).sort();
            var string1Arr = [];
            for(var index in keys){
                string1Arr.push(keys[index]+ "=" + string1Obj[keys[index]]);
            }
            var string1 = string1Arr.join("&");

            res.resFormat.data = {
                debug: false,
                appId: 'wx13f06fd9ec831ed6',
                timestamp: timestamp,
                nonceStr: noncestr,
                signature: sha1(string1),
                jsApiList: ["scanQRCode"]
            };
            res.json(res.resFormat);
        }
    });
};

module.exports = fns;