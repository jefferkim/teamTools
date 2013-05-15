/*
 * admin
 */

var Project = require('../dao/Project');
var fs = require('fs');

//创建项目，有认证
exports.addProject = function (req, res) {
    res.render('adminProjectAdd', {title:'添加项目', project:{"name":"添加项目"}});
};


exports.projectNew = function (req, res) {
    var info = req.headers;

    var fileObj = req.files.fileObject;
    var tmp_path = fileObj.path;

    var target_path = './public/images/_projectPic/' + fileObj.name;

    var projectParam = {
        name:req.body.name,
        dirName : req.body.dirName,
        fileName : fileObj.name
    };

    fs.rename(tmp_path, target_path, function (err) {
        if (err) throw err;
        fs.unlink(tmp_path, function () {
            if (err) throw err;

            Project.addNew(projectParam,function(e,r){
                if(!e){
                    res.redirect("/");
                }
            });
        });
    });


};



