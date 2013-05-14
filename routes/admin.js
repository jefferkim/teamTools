
/*
 * admin
 */

var Project = require('../dao/Project');

//创建项目，有认证
exports.addProject = function (req, res) {
    res.render('adminProjectAdd', {title:'添加项目',project:{"name":"添加项目"}});
};


exports.projectNew = function (req, res) {
    var project = req.body.project;
    Project.addNew(req.body.project, function (err,project) {
        res.redirect('/');
    });
};



