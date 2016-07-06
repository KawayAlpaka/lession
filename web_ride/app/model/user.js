var mongoose = require('mongoose');

var userSchema = require('../schema/user');
var User = mongoose.model('User', userSchema);

var sessionSchema = require('../schema/session');
var Session = mongoose.model('Session', sessionSchema);

module.exports = User;