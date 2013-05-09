
/*
 * version
 */


var versionModel = require('../models/Version');
var Version = versionModel.Version;
var fs = require('fs');


exports.show = function(req, res){
    res.render("versionShow",{title:"添加版本",project:{id:"1",name:"添加版本"}});
};

exports.edit = function(req, res){
    res.send("version edit");
};



//增加版本
exports.add = function(req, res){
    res.render("versionAdd",{title:"添加版本",project:{id:req.params.pid,name:"添加版本"}});
};
exports.new = function(req, res){
    var version = req.body.version;
    var _Version = new Version({
        name:version.name,
        projectId:version.pid,
        desc:version.desc
    });
    _Version.save();
    res.redirect('project/'+version.pid);
};

/*exports.uploadFile = function(req, res){

    var fileArray = [];
    console.log("uploadFile.......");


    if(req.files && !req.files.fileselect){
        fileArray.push(req.files);
    }else{
        fileArray = req.files.fileselect[0];
    }



    console.log(fileArray);
    for (var i = 0; i < fileArray.length; i++) {
        // 获得文件的临时路径
        var tmp_path = fileArray[i].path;
        console.log(tmp_path);
        // 指定文件上传后的目录 - 示例为"images"目录。
        var target_path = './public/images/' + fileArray[i].name;

       // var target_path = './public/images/' + i+"."+fileArray[i].name.split(".")[1];
        // 移动文件
        fs.rename(tmp_path, target_path, function (err) {
            if (err) throw err;
            // 删除临时文件夹文件,
            fs.unlink(tmp_path, function () {
                if (err) throw err;
                res.send('ver');
            });
        });
    }

};*/

exports.uploadFile = function(req, res){

   // console.log(req);
    var t = req.files;
    console.log(t);

    console.log(req.)


    /*console.log(fileArray);
    for (var i = 0; i < fileArray.length; i++) {
        // 获得文件的临时路径
        var tmp_path = fileArray[i].path;
        console.log(tmp_path);
        // 指定文件上传后的目录 - 示例为"images"目录。
        var target_path = './public/images/' + fileArray[i].name;

        // var target_path = './public/images/' + i+"."+fileArray[i].name.split(".")[1];
        // 移动文件
        fs.rename(tmp_path, target_path, function (err) {
            if (err) throw err;
            // 删除临时文件夹文件,
            fs.unlink(tmp_path, function () {
                if (err) throw err;
                res.send('ver');
            });
        });
    }*/

};



