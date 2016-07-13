var mongoose = require('mongoose');
var RobotNode = mongoose.model('RobotNode');
var Project = mongoose.model('Project');

var projects = {};

projects.myProjects = function(req, res) {
};
projects.myMemberProjects = function(req, res) {
};
projects.myGuestProjects = function(req, res) {
};

projects.create = function (req, res) {
};
projects.new = function (req, res) {
};
projects.update = function (req, res) {
};
projects.del = function (req, res) {
};
projects.get = function (req, res) {
};

module.exports = projects;