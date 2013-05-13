var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _Version = new Schema({
    name : String,
    projectId : String,
    versionId : String,
    desc: String,
    mainPicPath : String,
    author: String
});

var Version = mongoose.model('versions', _Version);

exports.findAll = function(callback){
    Version.find({},callback);
};

exports.findVersionById = function(id,callback){
    Version.findById(id,function(err,doc){
       callback(err,doc);
    });
};

exports.addNew = function(version,callback){

    var version = new Version({
        name : version.name,
        projectId : version.pid,
        versionId : version.vid,
        desc: version.desc,
        author: ''
    });

    version.save(function (err,docs) {
        if (err) {
            callback(err);
        } else {
            callback(null,docs);
        }
    });
};

exports.setMainPicPath = function(vid,path,callback){
   Version.update({versionId:vid},{mainPicPath:path},function(err,doc){
       if(err){
           callback(err);
       }else{
           callback(null,doc);
       }
   })
};

exports.findByVersionId = function(pid,callback){
    Version.find({projectId:pid}, function (err,docs) {
        if (err) {
            callback(err);
        } else {
            callback(null,docs);
        }
    });
};



