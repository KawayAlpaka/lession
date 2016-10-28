var mongoose = require('mongoose');
var User = mongoose.model('User');
var Session = mongoose.model('Session');
var extend = require('util')._extend;

var users = {};

users.new = function (req, res) {
    var user = new User({user:"new user"});
    res.resFormat.data = user;
    res.json(res.resFormat);
};

users.getCurrentUser = function (req, res) {
    res.resFormat.data = req.currentUser;
    res.json(res.resFormat);
};
users.updateCurrentUser = function (req, res) {
    var _user = req.body;
    delete _user.user;
    delete _user.role;
    extend(req.currentUser, _user);
    req.currentUser.save(function (err, user) {
        res.resFormat.data = user;
        res.json(res.resFormat);
    });
};

users.login = function(req, res) {
    var _user = req.body;
    User.findOne({user:_user.user},function (err, user) {
        if(err){
            res.resFormat.msg = err;
            res.json(res.resFormat);
        }
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
    if(req.cookies.mSession){
        Session.findOneAndRemove({_id:req.cookies.mSession},function (err) {
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
    // console.log(req.cookies);
    // console.log(req.header("mSession"));
    var mSession = req.cookies.mSession ? req.cookies.mSession:req.header("mSession");

    if(!mSession){
        next();
    }else{
        Session.findOne({_id:mSession},function (err,session) {
            if(err){
                console.log(err);
            }
            if(session){
                User.findOne({_id:session.user},function (err,user) {
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

users.requireLogin = function (req, res, next) {
    if(req.currentUser){
        next();
    }else{
        res.resFormat.state = 600;
        res.json(res.resFormat);
    }
};

module.exports = users;