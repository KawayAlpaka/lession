var mongoose = require('mongoose');
var User = mongoose.model('User');
var Session = mongoose.model('Session');

var users = {};
users.create = function(req, res) {
    var _user = req.query;
    User.findOne({user: _user.user},  function(err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            res.send('用户已经存在');
        }
        else {
            user = new User(_user);
            console.log(user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                res.send('用户创建成功');
            });
        }
    });
};

users.login = function(req, res) {
    var _user = req.body;
    User.findOne({user:_user.user},function (err, user) {
        if(user){
            if(user.password == _user.password){

                var session = new Session({user:user._id});
                session.save(function (err,session) {
                    if(err){
                        res.resFormat.logicState = 1;
                        res.resFormat.msg = err;
                        res.json(res.resFormat);
                    }
                    res.resFormat.data.session = session;
                    res.resFormat.data.user = user;
                    res.json(res.resFormat);
                });

            }else{
                res.resFormat.logicState = 1;
                res.resFormat.msg = "密码错误";
                res.json(res.resFormat);
            }
        }else{
            res.resFormat.logicState = 1;
            res.resFormat.msg = "用户名不存在";
            res.json(res.resFormat);
        }
    });
};
users.logout = function (req, res) {
    console.log(req.cookies.mSession);
    if(req.cookies.mSession){
        Session.findOneAndRemove(req.cookies.mSession,function (err) {
            if(err){
                console.log(err);
                res.resFormat.logicState = 1;
                res.resFormat.msg = "登出失败";
            }
            res.json(res.resFormat);
        });
    }else{
        res.json(res.resFormat);
    }
};

users.currentUser = function (req, res, next) {
    var mSession = req.cookies.mSession;
    if(!mSession){
        next();
    }else{
        Session.findOne(mSession,function (err,session) {
            if(err){
                console.log(err);
            }
            if(session){
                User.findOne(session.user,function (err,user) {
                    if(err){
                        console.log(err);
                        next();
                    }
                    req.currentUser = user;
                    next();
                });
            }else{
                next();
            }
        });
    }

};

module.exports = users;