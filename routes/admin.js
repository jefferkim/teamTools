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

    var target_path = './public/images/_projectPic/' + req.param("fileName");
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



