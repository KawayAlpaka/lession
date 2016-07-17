var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.start = function () {
    console.log("seed start");
    var user = new User({user:"admin",role:"admin",password:"admin",name:"管理员"});
    user.save(function (err, user) {
        if(err) console.log(err);
    });
};