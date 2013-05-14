/*
 * project add
 *
 * TODO:增加dao
 */


var Project = require('../dao/Project');
var Version = require('../dao/Version');
var Picture = require('../dao/Picture');


exports.show = function (req, res) {
    var pid = req.params.pid;
    Version.findByVersionId(pid, function (err, versions) {
        Project.findProjectById(pid, function (err, project) {
            res.render('versionList', {title:'项目列表', project:project, versions:versions});
        });
    });
};

exports.showAll = function (req, res) {
    Project.findAll(function (err, projects) {
        res.render('projectList', {title:'项目列表', project:{_id:"1", name:""}, projects:projects});
    });
};

exports.showSidebar = function(req, res){
    console.log(req);
     Project.findAll(function(err,projects){
         res.json(projects);
    });
}

//修改项目，暂时不需要
exports.edit = function (req, res) {
    res.send("edit");
};
