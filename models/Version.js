var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _Version = new Schema({
    name : String,
    projectId : String,
    desc: String,
    author: String
});

exports.Version = mongoose.model('versions', _Version);