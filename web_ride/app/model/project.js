var mongoose = require('mongoose');
var schema = require('../schema/project');

var Model = mongoose.model('Project', schema);

module.exports = Model;