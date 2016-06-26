var mongoose = require('mongoose');
var User = mongoose.model('User');

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

module.exports = users;