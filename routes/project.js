
/*
 * project add
 */

var projectModel = require('../models/Project');
var Project = projectModel.Project;

exports.add = function(req, res){


    /*var t = new Project({
        name:"变形金刚",
        password:"test"
    });
    t.save(function (err, project) {
        if (err){
            res.send("error");
        }
    });*/

    res.render('projectAdd',{title:'添加项目',currentProject:'变形金刚'});

    $("#J-addProject").on("click",function(e){
        e.preventDefault();
        var pn = $("#J-projectName").val();
        var pwd = $("#J-pwd").val();
        $.ajax({
            url:'',
            success:function(){

            }
        })

    });

   // res.send("respond with a resource");
};

exports.list = function(req, res){
    Project.find(function(err, projects) {
           res.render('projectList',{title:'项目列表', projects: projects });
    });
};

exports.edit = function(req, res){
    res.send("edit");
};