
/**
 * Module dependencies.
 */

var express = require('express');

var project = require('./routes/project');

var my = require('./routes/my');

var flow = require('./routes/flow');

var version = require('./routes/version');
var admin = require('./routes/admin');

var login = require('./routes/login');


var prototype = require('./routes/prototype');


var dirs = require('./routes/dirs');


var http = require('http');
var path = require('path');
var partials = require('express-partials');





/**
 * mongoDB connection
 */
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/tools');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   console.log("open...")
});



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine','ejs');



//app.set('client_id','7906391197878369133');
//app.set('client_secret','25827169871c447b905e820ed62f4374');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(partials());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



app.set('env', 'production');//set production env


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



//routes
//project



app.get('/', project.showAll);
app.get('/project/:pid',project.show);
app.get('/project/edit',project.edit);
app.post('/project/querySidebar',project.showSidebar);














app.get('/login',login.login);
app.post('/login/validation',login.validation);










app.get('/prototype',prototype.list);


app.get('/file/:fid',dirs.list);

app.post('/file/delete',dirs.delete);


//我的目录
app.get('/my',my.myList);

//创建流程

app.get('/flow',flow.step1);


//流程上传图片

app.get('/flow/addVersion',flow.addVersion);
app.get('/flow/addEffect',flow.addEffect);




//version
app.get('/version/:vid',version.show);
app.get('/version/add/:pid',version.add);
app.post('/version/new',version.new);
app.post('/version/uploadFile',version.uploadFile);//add file
app.post('/version/setMainPic',version.setMainPic);//设置封面

app.get('/version/mobile/:vid',version.mobile);//手机端显示

//admin
app.get('/admin/projectadd',admin.addProject); //项目只有管理员才能添加
app.post('/admin/projectNew',admin.projectNew); //form post



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});