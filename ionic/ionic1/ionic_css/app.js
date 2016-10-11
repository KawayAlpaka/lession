var express = require('express');
var app = express();
var bodyParser = require("body-parser");

var OAuth = require('wechat-oauth');
var client = new OAuth('wx13f06fd9ec831ed6', '396e23200d59276bcf9c4a3eb2b0d05d');

var wechat = require('wechat');
var config = {
    token: 'ltoken',
    appid: 'wx13f06fd9ec831ed6'
    // encodingAESKey: '12345678'
};

app.use(express.static('www'));
app.use(express.query());
app.use(bodyParser.json({limit: '1mb'}));
app.use('/wechat', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message);
    if (message.Content === '1') {
        // 回复屌丝(普通回复)
        res.reply('hehe');
    } else if (message.Content === '2') {
        //你也可以这样回复text类型的信息
        res.reply({
            content: 'http://119.29.225.69',
            type: 'text'
        });
    } else if (message.Content === '3') {
        // 回复一段音乐
        res.reply({
            type: "music",
            content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3",
                thumbMediaId: "thisThumbMediaId"
            }
        });
    } else {
        // 回复高富帅(图文回复)
        res.reply([
            {
                title: '你来我家接我吧',
                description: '这是女神与高富帅之间的对话',
                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                url: 'http://nodeapi.cloudfoundry.com/'
            }
        ]);
    }
}));

app.use('/OAuth', function (req, res, next) {
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    var url = client.getAuthorizeURL('http://www.yangtuos.com/OAuth', '123', 'snsapi_base');
    console.log(url);
    client.getAccessToken(req.query.code, function (err, result) {
        var accessToken = result.data.access_token;
        var openid = result.data.openid;
        console.log(result.data);
        client.getUser(openid, function (err, result) {
            var userInfo = result;
            console.log(userInfo);
            res.cookie('openid',userInfo.openid,{ maxAge: 20000000,httpOnly:false, path:'/'});
            res.location(req.query.state);
            res.statusCode = 301;
            res.end('响应的内容');
        });
    });

    // res.json({});
});

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('ride listening at http://%s:%s', host, port);
    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ', err.stack);
    });
});