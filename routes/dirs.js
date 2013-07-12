

var Project = require('../dao/Project');
var Version = require('../dao/Version');
var Picture = require('../dao/Picture');

var http = require('http');

var Util = require('../util/util');

exports.list = function (req, res) {
    var access_token = req.cookies.access_token;
    var dirId = req.params.fid;

    Util.urlReq('http://api.yunpan.alibaba.com/api/folder/list',{
        method:'POST',
        params:{
            dirId:0,
            path:"",
           // pageSize:50,
           // pageIndex:1,
           // showImg:true,
            access_token:access_token
        }

    },function (body, res1) {

        var result = JSON.parse(body);
        if (!result.error) {
            console.log(result);
            res.render('prototypeList',{groups:result});
        } else{
            console.log('....');
        }
    })

};
