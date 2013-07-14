

var Project = require('../dao/Project');
var Version = require('../dao/Version');
var Picture = require('../dao/Picture');

var http = require('http');

var Util = require('../util/util');







//获取文件夹
exports.list = function (req, res) {
    var access_token = req.cookies.access_token;
    var dirId = req.params.fid;

    Util.urlReq('/api/folder/list',{
        method:'POST',
        params:{
            dirId: dirId,
            path: "",
            access_token:access_token
        }

    },function (body, res1) {

        var result = JSON.parse(body);

        if (!result.hasError) {
            console.log(result);
            if(result.files){
                res.render('prototypeFiles',{files:result.files});
            }else if(result.dirs){
                res.render('projectList',{projects:result.dirs});
            }else{
                res.render('prototypeFiles',{files:false});
            }


        } else{
            console.log('....');
        }
    })

};


/*
*
*
* return { id: 71288934, folder: false, resultCode: 0, suc: true }
* */

exports.delete =function(req,res){
    var access_token = req.cookies.access_token;
    var fileId = req.param("fileId");

    Util.urlReq('/api/file/remove',{
        method:'POST',
        params:{
            id: fileId,
            direct: false,
            access_token:access_token
        }

    },function (body) {

        var result = JSON.parse(body);

        if (result.suc) {

             res.json(result);


        } else{

        }
    })



};
