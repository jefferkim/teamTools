/*
 * project add
 *
 * TODO:增加dao
 */


var Project = require('../dao/Project');
var Version = require('../dao/Version');
var Picture = require('../dao/Picture');


var Util = require('../util/util');


exports.showAll = function (req, res) {
    var access_token = req.cookies.access_token;
    Util.urlReq('/api/folder/list', {
        method: 'POST',
        params: {
            dirId: 0,
            path: "",
            access_token: access_token
        }
    }, function (projects) {
        var result = JSON.parse(projects);
        if (!result.error) {
            console.log(result);
            res.render('projectList', { projects: result.dirs});//这里只会读取文件夹，文件将不会作为展示类型
        } else {
            console.log('....');
        }
    })
};


exports.show = function (req, res) {
    var pid = req.params.pid;
    Version.findByVersionId(pid, function (err, versions) {
        Project.findProjectById(pid, function (err, project) {
            res.render('versionList', {title: '项目列表', project: project, versions: versions});
        });
    });
};


exports.showSidebar = function (req, res) {

    Project.findAll(function (err, projects) {
        res.json(projects);
    });
}

//修改项目，暂时不需要
exports.edit = function (req, res) {
    res.send("edit");
};
