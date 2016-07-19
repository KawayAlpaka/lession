var mongoose = require('mongoose');
var DebugOption = mongoose.model('DebugOption');

var controllers = {};

controllers.list = function(req, res) {
    DebugOption.find({creator:req.currentUser._id},function (err, debugOptions) {
        res.resFormat.data = debugOptions;
        res.json(res.resFormat);
    });
};
controllers.create = function(req, res) {
    var _debugOption = req.body;
    _debugOption.creator = req.currentUser._id;
    DebugOption.create(_debugOption,function (err,debugOption) {
        if(err){
            res.resFormat.data = err;
            res.resFormat.msg = "创建失败";
            res.resFormat.logicState = 1;
        }else{
            res.resFormat.data = debugOption;
        }
        res.json(res.resFormat);
    });
};
controllers.new = function(req, res) {
    var debugOption = new DebugOption();
    res.resFormat.data = debugOption;
    res.json(res.resFormat);
};
controllers.get = function(req, res) {
    var _id = req.params.id;
    DebugOption.findOne({_id:_id},function (err,debugOption) {
        res.resFormat.data = debugOption;
        res.json(res.resFormat);
    });
};
controllers.update = function(req, res) {
    var _debugOption = req.body;
    DebugOption.findOneAndUpdate({_id:_debugOption._id},_debugOption,{upsert: true ,new:true},function (err, debugOption) {
        res.resFormat.data = debugOption;
        res.json(res.resFormat);
    });
};
controllers.del = function(req, res) {
    var _id = req.params.id;
    DebugOption.findOneAndRemove({_id:_id},function (err,debugOption) {
        res.resFormat.data = debugOption;
        res.json(res.resFormat);
    });
};

module.exports = controllers;