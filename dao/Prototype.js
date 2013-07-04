var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _Prototype = new Schema({
    versionDir:Number,
    projectDir:String,
    versionId:String,
    path:String,
    isMain:{type:Boolean, default:false}
});

var Prototype = mongoose.model('prototype', _Prototype);



exports.addNew = function (path, versionDir, pid, projectDir, callback) {

    var picture = new Picture({
        versionDir:versionDir,
        versionId:pid,
        projectDir:projectDir,
        isMain:false,
        path:path
    });
    picture.save(function (err, doc) {
        if (err) {
            callback(err);
        } else {
            callback(null, doc);
        }
    });
};

exports.findPicturesByVersionId = function (vid, callback) {
    Picture.find({versionDir:vid}, function (err, pictures) {
        callback(err, pictures);
    });
}

exports.findAll = function (callback) {
    Picture.find({}, callback);
};


exports.resetMainFlag = function (vid, callback) {
    Picture.update({versionDir:vid, "isMain":true},{"isMain":false} ,function (err, pic) {
        if (err) {
            callback(err);
        } else {
            callback(null, pic);
        }
    });
};
exports.findMainPic = function(vid,callback){
    Picture.find({versionDir:vid},function(err,doc){
         if(err){
             callback(err);
         }else{
             callback(null,doc);
         }
    });
}

exports.setMainPicFlag = function (picId, callback) {
    Picture.update({_id:picId}, {isMain:true}, function (err, doc) {
        if (err) {
            callback(err);
        } else {
            callback(null, doc);
        }
    })
};