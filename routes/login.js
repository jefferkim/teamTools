/*
 * project add
 *
 * TODO:增加dao
 */


var Project = require('../dao/Project');
var Version = require('../dao/Version');
var Picture = require('../dao/Picture');

var Util = require('../util/util');



exports.login = function (req, res) {
    res.render('login');
};


exports.validation = function (req, res) {
    var userName = req.param("username");
    var password = req.param("password");
    var appKey = 'uxKeynote';

    Util.urlReq('/oauth/access_token', {
        method: 'POST',
        params: {
            grant_type: "password",
            site: "BUC",
            username: userName,
            password: password,
           // client_id: '7906391197878369133',
           // client_secret: '25827169871c447b905e820ed62f4374'
            client_id: '106362801917443616',
            client_secret: 'bccdbbe3145941bfbe947fdd8668a668'
        }
    }, function (body) {

        console.log(body);
        var result = JSON.parse(body);
        if (!result.error) {
            res.cookie('access_token', result.access_token);
            res.cookie('refresh_token', result.refresh_token);
            res.redirect('/');

        } else {



        }
    });

}

