
/*
 * version
 */

var Version = require('../dao/Version');
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


exports.uploadFile = function(req, res){

   console.log(req.files);
    var fileName=req.param('fileName');//获取param中文件的信息
    var fileSize=req.param('fileSize');
    var target_path = './public/images/' + fileName ;
    var wOption = {flags: 'w',encoding: null,mode: 0777};
    var fileStream = fs.createWriteStream(target_path,wOption);
    req.pipe(fileStream, { end: false });
    req.on('end', function() {
        console.log("传输完毕！");
        var transfer;
        fs.stat(target_path, function (err, data) {
            if (err) throw err;
            transfer=String(data.size);
            console.log("tmp file's size :",data.size);
            console.log("the received size is :",fileSize);
            if(transfer==String(fileSize)){
                res.json({"success":true});
            }else{
                res.send({error:"文件在传输的过程中有丢失,传输失败!"});
            }
        });
    });










    /*var t = req.files;
    var fileArray = t.fileselect[0];


    for (var i = 0; i < fileArray.length; i++) {
        // 获得文件的临时路径
        var tmp_path = fileArray[i].path;
        // 指定文件上传后的目录 - 示例为"images"目录。
        var target_path = './public/images/' + fileArray[i].name;
        // 移动文件
        fs.rename(tmp_path, target_path, function (err) {
            if (err) throw err;
            // 删除临时文件夹文件,
            fs.unlink(tmp_path, function () {
                if (err) throw err;

                res.json({"success":true});
            });
        });
    }*/

};



