var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const connectMongo = require('connect-mongo')(session);
const config = require('./app_server/config/config');
//var exphdbs = require('express-handlebars');
var passport = require('passport');
//require setup mongoose db
require('./app_server/models/db');
require('./app_server/config/passport');

// require routes
var index = require('./app_server/routes/index');
var api = require('./app_server/routes/api');
var fb = require('./app_server/routes/facebookbot');
const admin = require('./app_server/routes/admin')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/app_server/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: config.secret,
  store: new connectMongo({
    mongooseConnection: mongoose.connection,
    touchAfter: 60 * 60 * 24
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000*60*30}
}))
app.use(express.static(path.join(__dirname, 'public')));
//Passport should be initialized after static route and before routes that are going to use authentication
app.use(passport.initialize());
app.use(passport.session())

//Setting routes file
app.use('/', index);
app.use('/api', api);
app.use('/fbbot', fb);
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError'){
    res.status(401);
    res.json({
      'message': err
    })
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('Express error: ', err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
