var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var coach = require('./routes/coach_route');
var general_manager = require('./routes/general_manager_route');
var player = require('./routes/player_route');
var team = require('./routes/team_route');
var gm_player = require('./routes/gm_player_route');
var team_goals = require('./routes/team_goals_route');
var authentication = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'project2'}));

app.use('/', routes);
// Placed between the routes because any routes that need authentication
// first must be placed below this app.use()
function restrict(req, res, next){
  if(req.session.account) { //check if user is authenticated yet
    next();  //user logged in so proceed to requested page
  }
  else {
    req.session.originalUrl = req.originalUrl;
    res.redirect('/login');  // they aren't so ask them to login
  }
}
app.use('/users', users);
app.use('/coach', restrict, coach);
app.use('/general_manager', restrict, general_manager);
app.use('/player', player);
app.use('/team', restrict, team);
app.use('/gm_player', restrict, gm_player);
app.use('/team_goals', restrict, team_goals);
app.use('/authentication', restrict, authentication);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
