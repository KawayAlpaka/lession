var mongoose = require('mongoose');
var RobotNode = mongoose.model('RobotNode');
var Project = mongoose.model('Project');

var projects = {};

projects.myProjects = function(req, res) {
    Project.find({creator:req.currentUser._id},function (err, projects) {
        res.resFormat.data = projects;
        res.json(res.resFormat);
    });
};
projects.myMemberProjects = function(req, res) {
};
projects.myGuestProjects = function(req, res) {
};

projects.create = function (req, res) {
    var _project = req.body;
    // var _projectNode = new RobotNode();
    // _projectNode.name = _project.name;
    // _projectNode.type = "project";
    // _projectNode.fileType = "dir";
    // _projectNode.fileFormat = "txt";
    // console.log(_projectNode);
    // _projectNode.save(function (err,projectNode) {
    RobotNode.create({name:_project.name,type:"project",fileType:"dir",fileFormat:"txt"},function (err,projectNode) {
        if(err){
            console.log(err);
            res.resFormat.logicState = 1;
            res.resFormat.msg = "创建节点失败";
            res.json(res.resFormat);
            return ;
        }
        var project = new Project(_project);
        project.creator = req.currentUser._id;
        project.robotNode = projectNode._id;
        project.save(function (err, project) {
            if(err){
                projectNode.remove(function (err) {
                    console.log(arguments);
                    res.resFormat.logicState = 1;
                    res.resFormat.msg = "创建项目失败";
                    res.json(res.resFormat);
                });
            }else{
                res.resFormat.data = project;
                res.json(res.resFormat);
            }
        });
    });



};
projects.new = function (req, res) {
    var project = new Project();
    res.resFormat.data = project;
    res.json(res.resFormat);
};
projects.update = function (req, res) {
    var _project = req.body;
    Project.findOneAndUpdate({_id:_project._id},_project,{upsert: true ,new:true},function (err, project) {
        res.resFormat.data = project;
        res.json(res.resFormat);
    });
};
projects.del = function (req, res) {
};
projects.get = function (req, res) {
    var projectId = req.params.id;
    Project.findOne({_id:projectId},function (err,project) {
        res.resFormat.data = project;
        res.json(res.resFormat);
    });
};

module.exports = projects;