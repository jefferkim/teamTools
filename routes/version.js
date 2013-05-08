
/*
 * upload
 */



exports.add = function(req, res){

    res.render("versionAdd",{title:"添加版本",currentProject:"添加版本",projectId:req.params.pid});
};

exports.list = function(req, res){
    res.send("version list");
};

exports.edit = function(req, res){
    res.send("version edit");
};

