var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const crypto = require('crypto');

var OAuth = require('wechat-oauth');
var client = new OAuth('wx13f06fd9ec831ed6', '396e23200d59276bcf9c4a3eb2b0d05d');


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var env = require("./config/env");

if(env.db.user){
    mongoose.connect('mongodb://' + env.db.user.user + ':'+ env.db.user.pwd + "@" + env.db.host + ':' + env.db.port + '/' + env.db.database);
}else{
    mongoose.connect('mongodb://' + env.db.host + ':' + env.db.port + '/' + env.db.database);
}
mongoose.connection.on('error', function (err) {
    console.log(err);
});
mongoose.connection.on('connected', function () {

    require('./app/model/models');
    
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
        }  else if (message.Content === '22') {
            //你也可以这样回复text类型的信息
            res.reply({
                content: 'http://weixin.yangtuos.com',
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
            console.log(result.data);
            if(result.data){
                // 这是网页授权accessToken，和普通accessToken不同，要注意
                var accessToken = result.data.access_token;
                var openid = result.data.openid;
                client.getUser(openid, function (err, result) {
                    var userInfo = result;
                    console.log(userInfo);
                    res.cookie('openid',userInfo.openid,{ maxAge: 20000000,httpOnly:false, path:'/'});
                    res.location(req.query.state);
                    res.statusCode = 301;
                    res.end('');
                });
            }else{
                res.location("/");
                res.statusCode = 301;
                res.end('');
            }

        });

        // res.json({});
    });

    var routerApi = require('./app/router/api');
    app.use('/api', routerApi,function (err, req, res, next) {
        res.resFormat.data = err.stack;
        res.json(res.resFormat);
    });


    //使用 commander 获取启动参数
    // https://github.com/tj/commander.js
    var program = require('commander');
    //定义参数,以及参数内容的描述
    program
        .version('0.0.1')
        .usage('[options] [value ...]')
        .option('-p, --port <n>', 'input a integet argument.', parseInt);

    //解析commandline arguments
    program.parse(process.argv);
    // console.log(program.port);
    var port = env.net.port;
    if (program.port) {
        port = program.port;
    }

    var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('listening at http://%s:%s', host, port);
        process.on('uncaughtException', function (err) {
            console.log('Caught exception: ', err.stack);
        });
    });


});

