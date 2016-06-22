var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = express.Router();

console.log("api user");

router.get('/', function(req, res) {
    console.log('hello api user');
    console.log(req.model);
    res.send('hello api user');
});

router.get('/create', function(req, res) {

    console.log(req.query);
    var _user = req.query;
    User.findOne({user: _user.user},  function(err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            res.send('用户已经存在');
            // return res.redirect('/signin');
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
});

module.exports = router;