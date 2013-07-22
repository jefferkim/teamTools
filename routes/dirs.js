var Project = require('../dao/Project');
var Version = require('../dao/Version');
var Picture = require('../dao/Picture');

var http = require('http');

var Util = require('../util/util');


//获取文件夹
exports.list = function (req, res) {
    var access_token = req.cookies.access_token;
    var dirId = req.params.fid;

    Util.urlReq('/api/folder/list', {
        method: 'POST',
        params: {
            dirId: dirId,
            path: "",
            access_token: access_token
        }

    }, function (body, res1) {

        var result = JSON.parse(body);

        if (!result.hasError) {
            console.log(result);
            if (result.files) {
                res.render('prototypeFiles', {files: result.files});
            } else if (result.dirs) {
                res.render('projectList', {projects: result.dirs});
            } else {
                res.render('prototypeFiles', {files: false});
            }


        } else {
            console.log('....');
        }
    })

};


exports.addDir = function (req, res) {
    var cookie = req.cookies;
    var name = req.param('dirName');
    var pid = req.param('pid');
    Util.urlReq('/api/folder/mkdir', {
        method: 'POST',
        params: {
            name: name,
            pid: pid,
            access_token: cookie.access_token
        }
    }, function (body) {

        var result = JSON.parse(body);

        if(result.suc){
            res.json(result);
        }else{

            console.log("创建出错");
        }


    });
};



/*
 *
 *
 * id :  文件夹ID

 类   型 ： Long
 缺省值 ： 0
 timeStamp :  时间戳

 类   型 ： Long
 缺省值 ： 0
 * */

exports.removeFolder = function (req, res) {
    var access_token = req.cookies.access_token;
    var dirId = req.param("id");

    console.log(dirId);

    Util.urlReq('/api/folder/remove', {
        method: 'POST',
        params: {
            id: dirId,
            access_token: access_token
        }

    }, function (body) {

        var result = JSON.parse(body);console.log(result);


        if (result.suc) {


            res.json(result);


        } else {

        }
    })


};






/*
 *
 *
 * return { id: 71288934, folder: false, resultCode: 0, suc: true }
 * */

exports.info = function (req, res) {
    var access_token = req.cookies.access_token;
    var dirId = req.params.did;

    Util.urlReq('/api/folder/getById', {
        method: 'POST',
        params: {
            dirId: dirId,
            access_token: access_token
        }

    }, function (body) {

        var result = JSON.parse(body);

        if (result.suc) {


            res.render('editDir',{dirInfo:result});


        } else {

        }
    })


};




/*
 *
 *
 * return { id: 71288934, folder: false, resultCode: 0, suc: true }
 * */

exports.delete = function (req, res) {
    var access_token = req.cookies.access_token;
    var fileId = req.param("fileId");

    Util.urlReq('/api/file/remove', {
        method: 'POST',
        params: {
            id: fileId,
            direct: false,
            access_token: access_token
        }

    }, function (body) {

        var result = JSON.parse(body);

        if (result.suc) {

            res.json(result);


        } else {

        }
    })


};
