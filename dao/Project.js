var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _Project = new Schema({
    name:String,
    dirName:String//文件夹目录，存放版本
});

var Project = mongoose.model('projects', _Project);

exports.addNew = function (project, callback) {

    var project = new Project({
        name : project.name,
        dirName : project.dirName
    });
    project.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};


exports.findAll = function(callback){
    Project.find({},callback);
};


var findProjectById = exports.findProjectById = function (id, callback) {
    Project.findById(id, function (err, doc) {
        if (err) {
            callback(err, null);
        }
        callback(null, doc);
    });
}