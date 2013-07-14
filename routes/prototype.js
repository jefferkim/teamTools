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
/*
    Util.urlReq('http://10.33.33.197:8080/api/group/get',{
        method:'POST',
        params:{
            access_token:access_token
        }

    },function (body, res1) {

        var result = JSON.parse(body);
        console.log(result);
        if (!result.error) {
            console.log(result);
            res.render('prototypeList',{groups:result});
        }
    })*/


    Util.urlReq('/api/folder/sortList',{
        method:'POST',
        params:{
            pageSize:50,
            pageIndex:1,
            showImg:false,
            type:0,
            order:"desc",
            sort:'gmt_modified',
            access_token:access_token
        }

    },function (body, res1) {

        var result = JSON.parse(body);
        console.log(result);
        if (!result.error) {
            console.log(result);
            res.render('prototypeList',{groups:result});
        }
    })

};
