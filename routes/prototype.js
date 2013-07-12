/*
 * 原型
 *
 * 
 */


var Project = require('../dao/Project');
var Version = require('../dao/Version');
var Picture = require('../dao/Picture');

var Util = require('../util/util');

exports.show = function (req, res) {
    res.render("prototypeList", {title:"添加版本", project:{_id:"1", name:""}});
};

exports.list = function (req, res) {
    var access_token = req.cookies.access_token;

    Util.urlReq('http://api.yunpan.alibaba.com/api/group/get',{
        method:'POST',
        params:{
            access_token:access_token
        }

    },function (body, res1) {

        var result = JSON.parse(body);
        if (!result.error) {
            console.log(result);
            res.render('prototypeList',{groups:result});
        }
    })

};
