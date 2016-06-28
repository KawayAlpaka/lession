var mongoose = require('mongoose');
var robotNodeSchema = require('../schema/robot_node');

var RobotNode = mongoose.model('RobotNode', robotNodeSchema);

module.exports = RobotNode;