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

module.exports = admin;