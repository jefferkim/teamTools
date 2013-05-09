var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _Picture = new Schema({
    versionId : Number,
    path : String
});

exports.Picture = mongoose.model('picture', _Picture);