

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

        if (!result.error) {
            console.log(result);
            if(result.files){
                res.render('prototypeFiles',{files:result.files});
            }
            if(result.dirs){

                res.render('projectList',{projects:result.dirs});
            }


        } else{
            console.log('....');
        }
    })

};
