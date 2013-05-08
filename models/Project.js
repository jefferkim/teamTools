var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _Project = new Schema({
    name : String,
    password : String
});

exports.Project = mongoose.model('projects', _Project);