var mongoose = require('mongoose');
var userSchema = require('../schema/user');

var User = mongoose.model('User', userSchema);

module.exports = User;