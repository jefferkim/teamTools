/*
 * version
 */

var Version = require('../dao/Version');
var Project = require('../dao/Project');
var Picture = require('../dao/Picture');
var fs = require('fs');


exports.show = function (req, res) {
    Version.findVersionById(req.param('vid'), function (err, version) {
        Picture.findPicturesByVersionId(version.versionId, function (err, pictures) {
            res.render("versionShow", {title:"添加版本", project:{id:"1", name:version.name}, pictures:pictures});
        });
    });
};

exports.edit = function (req, res) {
    res.send("version edit");
};


//增加版本
exports.add = function (req, res) {
    Project.findProjectById(req.params.pid, function (err, project) {
        res.render("versionAdd", {title:"添加版本", project:project});
    });

};


exports.new = function (req, res) {
    var versionParams = req.body.version;
    Version.addNew(versionParams, function (err, version) {
        res.redirect('project/' + versionParams.pid);
    });
};


exports.setMainPic = function (req, res) {
    var picId = req.param("picId");
    var vid = req.param("versionId");
    var path = req.param("path");
    Picture.resetMainFlag(vid, function (err, doc) {
        Picture.setMainPicFlag(picId, function (err, version) {
            if (!err) {
                res.json({"success":true});
            }
        });
    });
};


exports.mkdirSync = function (url, mode, cb) {
    var path = require("path"), arr = url.split("/");
    mode = mode || 0755;
    cb = cb || function () {
    };
    if (arr[0] === ".") {//处理 ./aaa
        arr.shift();
    }
    if (arr[0] == "..") {//处理 ../ddd/d
        arr.splice(0, 2, arr[0] + "/" + arr[1])
    }
    function inner(cur) {
        if (!path.existsSync(cur)) {//不存在就创建一个
            fs.mkdirSync(cur, mode)
        }
        if (arr.length) {
            inner(cur + "/" + arr.shift());
        } else {
            cb();
        }
    }

    arr.length && inner(arr.shift());
}


exports.uploadFile = function (req, res) {

    var fileName = req.param('fileName');//获取param中文件的信息
    var fileSize = req.param('fileSize');
    var uploadDir = req.param('pdir');
    var pid = req.param('pid');//项目id
    var versionDir = req.param('vid');

    var path = './public/images/' + uploadDir + '/' + versionDir;

    exports.mkdirSync(path, 0, function (e) {
        /* if(e){
         console.log('出错了');
         }else{

         }*/

        var target_path = path + '/' + fileName;
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
                    Picture.addNew(fileName, versionDir, pid, uploadDir, function (err, doc) {

                        res.json({"info":doc});
                    });

                } else {
                    res.send({error:"文件在传输的过程中有丢失,传输失败!"});
                }
            });
        });
    });

};






