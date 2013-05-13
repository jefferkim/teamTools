var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _Picture = new Schema({
    versionDir : Number,
    projectDir : String,
    versionId : String,
    path : String
});

var Picture = mongoose.model('picture', _Picture);


exports.addNew = function (path,versionDir,pid,projectDir, callback) {

    var picture = new Picture({
        versionDir : versionDir,
        versionId : pid,
        projectDir : projectDir,
        path : path
    });
    picture.save(function (err,doc) {
        if (err) {
            callback(err);
        } else {
            callback(null,doc);
        }
    });
};

exports.findPicturesByVersionId = function(vid,callback){
   Picture.find({versionDir:vid},function(err,pictures){
      callback(err,pictures);
   });
}

exports.findAll = function(callback){
    Picture.find({},callback);
};