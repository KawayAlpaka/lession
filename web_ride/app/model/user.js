var mongoose = require('mongoose');

var userSchema = require('../schema/user');
var User = mongoose.model('User', userSchema);

var sessionSchema = require('../schema/session');
var Session = mongoose.model('Session', sessionSchema);

var projectUserSchema = require('../schema/project_user');
var ProjectUser = mongoose.model('ProjectUser', projectUserSchema);

var debugOptionSchema = require('../schema/debug_option');
var DebugOption = mongoose.model('DebugOption', debugOptionSchema);

var systemSettingSchema = require('../schema/system_setting');
var SystemSetting = mongoose.model('SystemSetting', systemSettingSchema);

module.exports = User;