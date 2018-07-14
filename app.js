
/**
 * Module dependencies.
 */

var express = require('express');
var exphbs = require('express-handlebars');
var logger = require('morgan');
var errorHandler = require('errorhandler')
var routes = require('./routes');
var classroutes = require('./routes/class');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/:className/:lessonName?', classroutes.showClass);

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
