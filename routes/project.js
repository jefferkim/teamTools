/*
 * project add
 *
 * TODO:增加dao
 */


var Project = require('../dao/Project');
var Version = require('../dao/Version');
var Picture = require('../dao/Picture');

var http = require('http');



exports.show = function (req, res) {
    var pid = req.params.pid;
    Version.findByVersionId(pid, function (err, versions) {
        Project.findProjectById(pid, function (err, project) {
            res.render('versionList', {title:'项目列表', project:project, versions:versions});
        });
    });
};

exports.showAll = function (req, res) {
    /*http.get("http://api.yunpan.alibaba.com/oauth/access_token?", function(res) {
      console.log("Got response: " + res.statusCode);
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });*/



        


    Project.findAll(function (err, projects) {
        res.render('projectList', {title:'项目列表', project:{_id:"1", name:""}, projects:projects});
    });






};

exports.showSidebar = function(req, res){

     Project.findAll(function(err,projects){
         res.json(projects);
    });
}

//修改项目，暂时不需要
exports.edit = function (req, res) {
    res.send("edit");
};
