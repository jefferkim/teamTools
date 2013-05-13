var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _Project = new Schema({
    name:String
});

var Project = mongoose.model('projects', _Project);

exports.addNew = function (title, callback) {

    var project = new Project();
    project.name = title;
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
    console.log("======"+id);
    Project.findById(id, function (err, doc) {
        if (err) {
            callback(err, null);
        }
        callback(null, doc);
    });
}