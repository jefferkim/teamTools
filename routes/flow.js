/*
 * project add
 *
 * TODO:增加dao
 */


var Project = require('../dao/Project');


var Version = require('../dao/Version');
var Picture = require('../dao/Picture');





exports.step1 = function (req, res) {
    console.log("step1");
    res.render('flow');
};


exports.addVersion = function(req, res){
    res.render('flowAddPic.ejs');
}

exports.addEffect = function(req, res){
    res.render('flowLink.ejs');
}
