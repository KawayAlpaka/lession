var mongoose = require('mongoose');

var userSchema = require('../schema/user');
var User = mongoose.model('User', userSchema);

var sessionSchema = require('../schema/session');
var Session = mongoose.model('Session', sessionSchema);

var projectUserSchema = require('../schema/project_user');
var ProjectUser = mongoose.model('ProjectUser', projectUserSchema);

module.exports = User;