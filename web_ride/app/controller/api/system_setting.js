var mongoose = require('mongoose');
var SystemSetting = mongoose.model('SystemSetting');
var systemSettingHelper = require('../../helper/system_setting_helper');

var controllers = {};

controllers.list = function(req, res) {
    SystemSetting.find({},function (err, systemSettings) {
        res.resFormat.data = systemSettings;
        res.json(res.resFormat);
    });
};
controllers.create = function(req, res) {
    var _systemSetting = req.body;
    SystemSetting.create(_systemSetting,function (err,systemSetting) {
        if(err){
            res.resFormat.data = err;
            res.resFormat.msg = "创建失败";
            res.resFormat.logicState = 1;
        }else{
            res.resFormat.data = systemSetting;
        }
        res.json(res.resFormat);
    });
};
controllers.new = function(req, res) {
    var systemSetting = new SystemSetting();
    res.resFormat.data = systemSetting;
    res.json(res.resFormat);
};
controllers.get = function(req, res) {
    var _id = req.params.id;
    SystemSetting.findOne({_id:_id},function (err,systemSetting) {
        res.resFormat.data = systemSetting;
        res.json(res.resFormat);
    });
};
controllers.update = function(req, res) {
    var _systemSetting = req.body;
    SystemSetting.findOneAndUpdate({_id:_systemSetting._id},_systemSetting,{upsert: true ,new:true},function (err, systemSetting) {
        res.resFormat.data = systemSetting;
        res.json(res.resFormat);
    });
};
controllers.del = function(req, res) {
    var _id = req.params.id;
    SystemSetting.findOneAndRemove({_id:_id},function (err,systemSetting) {
        res.resFormat.data = systemSetting;
        res.json(res.resFormat);
    });
};

controllers.refresh = function (req, res) {
    console.log(systemSettingHelper);
    systemSettingHelper.refresh();
    res.json(res.resFormat);
};

module.exports = controllers;