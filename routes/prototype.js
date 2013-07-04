/*
 * 原型
 *
 * 
 */


var Project = require('../dao/Project');
var Version = require('../dao/Version');
var Picture = require('../dao/Picture');


exports.show = function (req, res) {
    res.render("prototypeList", {title:"添加版本", project:{_id:"1", name:""}});
};

exports.showAll = function (req, res) {
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



//创建项目

exports.projectNew = function (req, res) {

    var target_path = './upload/' + req.param("fileName");
    var fileSize = req.param("fileSize");
    var projectParam = {
        name:req.param("name"),
        dirName:req.param("dirName"),
        fileName:req.param("fileName")
    };


    var wOption = {flags:'w', encoding:null, mode:0777};
    var fileStream = fs.createWriteStream(target_path, wOption);
    req.pipe(fileStream, { end:false });
    req.on('end', function () {


        console.log("传输完毕！");
        var transfer;
        fs.stat(target_path, function (err, data) {
            if (err) throw err;
            transfer = String(data.size);
            console.log("tmp file's size :", data.size);
            console.log("the received size is :", fileSize);
            if (transfer == String(fileSize)) {
                Project.addNew(projectParam, function (e, r) {
                    if (!e) {
                        res.json({success:true});

                    }
                });

            } else {
                res.send({error:"文件在传输的过程中有丢失,传输失败!"});
            }
        });


    });

};