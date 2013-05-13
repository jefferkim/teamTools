/*
 * project add
 *
 * TODO:增加dao
 */


var Project = require('../dao/Project');
var Version = require('../dao/Version');


exports.show = function (req, res) {
    var pid = req.params.pid;

    console.log(pid);




        Version.findByVersionId(pid, function (err, versions) {

            console.log(versions);
            Project.findProjectById(pid, function (err, project) {
                res.render('versionList', {title:'项目列表', project:project, versions:versions});
            });
        });


};

exports.showAll = function (req, res) {
    Project.findAll(function (err, projects) {
        res.render('projectList', {title:'项目列表', project:{_id:"1", name:""}, projects:projects})
    });
};


//修改项目，暂时不需要
exports.edit = function (req, res) {
    res.send("edit");
};

//创建项目，有认证
exports.add = function (req, res) {
    console.log("fffffff=======");
    Project.findAll(function (err, projects) {
        console.log(projects);
      //  res.render('projectAdd', {title:'添加项目', projects:projects});
    });
};
exports.new = function (req, res) {


    Project.addNew(req.body.project.name,function(err){
        res.redirect('back');
    })

};