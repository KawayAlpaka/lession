var mongoose = require('mongoose');
var User = mongoose.model('User');

var admin = {};

admin.requireAdmin = function (req, res, next) {
    if(req.currentUser.role == 'admin'){
        next();
    }else{
        res.resFormat.state = 601;
        res.json(res.resFormat);
    }
};

admin.users = {};
admin.users.list = function (req, res) {
    User.find({},function (err, users) {
        res.resFormat.data = users;
        res.json(res.resFormat);
    })
};
admin.users.get = function (req, res) {
    var userID = req.params.id;
    console.log(userID);
    User.findOne({_id:userID},function (err, user) {
        res.resFormat.data = user;
        res.json(res.resFormat);
    })
};

admin.users.create = function(req, res) {
    var _user = req.body;
    User.findOne({user: _user.user},  function(err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            res.resFormat.logicState = 1;
            res.resFormat.msg = "用户名已经存在";
            res.json(res.resFormat);
        }
        else {
            user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                res.resFormat.data = user;
                res.json(res.resFormat);
            });
        }
    });
};
admin.users.update = function(req, res) {
    var userID = req.params.id;
    var _user = req.body;
    User.findOneAndUpdate({_id:userID},_user,{new:true},function (err,user) {
        res.resFormat.data = user;
        res.json(res.resFormat);
    });
};
admin.users.del = function(req, res) {
    var userID = req.params.id;
    User.findOneAndRemove({_id:userID},function (err,user) {
        res.resFormat.data = user;
        res.json(res.resFormat);
    });
};


module.exports = admin;