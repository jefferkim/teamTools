
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require("mongoose");
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var partials = require('express-partials');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    // yay!
});


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
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
app.get('/users', user.list);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
