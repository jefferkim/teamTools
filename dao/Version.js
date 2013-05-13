var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _Version = new Schema({
    name : String,
    projectId : String,
    desc: String,
    author: String
});

var Version = mongoose.model('versions', _Version);

exports.findAll = function(callback){
    Version.find({},callback);
}

exports.findByVersionId = function(pid,callback){
    Version.find({projectId:pid}, function (err,docs) {
        if (err) {
            callback(err);
        } else {
            callback(null,docs);
        }
    });
};

