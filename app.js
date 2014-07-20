
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var zkroute = require('./routes/zkroute');
var mnroute = require('./routes/menuroute');

var http = require('http');
var path = require('path');
var fs=require('fs');
var util=require('util');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
//var menus = JSON.parse(fs.readFileSync(path.join(__dirname,'menus.json'), 'utf8'));

//app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'json')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/menu',mnroute.index);
app.get('/children',zkroute.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
