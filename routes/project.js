/*
 * project add
 *
 * TODO:增加dao
 */

var projectModel = require('../models/Project');
var versionModel = require('../models/Version');
var Project = projectModel.Project;
var Version = versionModel.Version;


exports.show = function (req, res) {
    var pid = req.params.pid;

    Version.find({projectId:pid}, function (err, versions) {
        Project.findById(pid, function (err, project) {
            res.render('versionList', {title:'项目列表', project:project, versions:versions});
        });
    });
};
exports.showAll = function (req, res) {
    Project.find(function (err, projects) {
        res.render('projectList', {title:'项目列表', project:{_id:"1", name:""}, projects:projects})
    });
};


//修改项目，暂时不需要
exports.edit = function (req, res) {
    res.send("edit");
};

//创建项目，有认证
exports.add = function (req, res) {
    Project.find(function (err, projects) {
        res.render('projectAdd', {title:'添加项目', projects:projects});
    });
};
exports.new = function (req, res) {
    var p = new Project({
        name:req.body.project.name
    });
    p.save();
    res.redirect('back');
};