
/**
 * Module dependencies.
 */

var express = require('express');

var project = require('./routes/project');
var version = require('./routes/version');
var admin = require('./routes/admin');

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
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(partials());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



app.set('env', 'production');//set production env


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/*
* Auth 认证，
* 先暂时用硬编码
* */
var user             = 'jinjianfeng';
var pass             = '7418529630';
var basicAuthMessage = 'etao tools , need password';
var auth = express.basicAuth(function(username, password) {
    return (username === user && password === pass);
}, basicAuthMessage);

//routes
//project
app.get('/', project.showAll);
app.get('/project/:pid',project.show);
app.get('/project/edit',project.edit);
//version
app.get('/version/:vid',version.show);
app.get('/version/add/:pid',version.add);
app.post('/version/new',version.new);
app.post('/version/uploadFile',version.uploadFile);//add file
//admin
app.get('/admin/projectadd',auth,admin.addProject); //项目只有管理员才能添加
app.post('/admin/projectNew',admin.projectNew); //form post


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});