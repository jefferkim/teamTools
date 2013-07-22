var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _Project = new Schema({
    uid:String,
    isShow:Boolean,
    pid:String,
    type : String,
    cover:String //文件夹目录，存放版本
});

var Project = mongoose.model('projects', _Project);

exports.addNew = function (project, callback) {

    var project = new Project({
        uid:project.uid,
        isShow:project.isShow,
        pid:project.pid,
        type : project.type,
        cover:project.cover //文件夹目录，存放版本
    });

    project.save(function (err,doc) {
        callback(err,doc);
    });
};


exports.findAll = function(callback){
    Project.find({},callback);
};


exports.findProjectByPid = function (pid, callback) {
    Project.findById(pid, function (err, doc) {
        if (err) {
            callback(err, null);
        }
        callback(null, doc);
    });
}


exports.findProjectsByUid = function(uid,callback){
    Project.find({uid:uid},callback);
}


exports.edit = function(uid,pid,filename,callback){

    Project.update({pid:pid},{isShow:true,uid:uid,type:"folder",cover:filename},{upsert: true},function(err,numberAffected, raw){
        if(err){
           console.log("update project fail");

        }else{
            console.log(numberAffected);
            console.log(raw);
            callback(null,raw);
        }

    });
};