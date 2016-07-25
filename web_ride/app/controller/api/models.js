var mongoose = require('mongoose');

var models = {};

models.schema = function (req, res) {
    var modelName = req.params.modelName;
    try {
        var Model = mongoose.model(modelName);
        res.resFormat.data = Model.schema.tree;
    }catch(ex) {
        res.resFormat.msg = "异常";
        res.resFormat.logicState = 1;
    }
    res.json(res.resFormat);

};

module.exports = models;