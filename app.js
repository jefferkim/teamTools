
/**
 * Module dependencies.
 */

var express = require('express');

var routes = require('./routes');
var project = require('./routes/project');
var upload = require('./routes/upload');
var version = require('./routes/version');
var http = require('http');
var path = require('path');
var partials = require('express-partials');


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


//routes
app.get('/', routes.index);

app.get('/project/add',project.add);
app.get('/project/list',project.list);
app.get('/project/edit',project.edit);
app.get('/upload',upload.uploadFile);

app.get('/version/add/:pid',version.add);





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
