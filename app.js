var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var memoryStore = require('session-memory-store')(session);
var routes = require('./routes/index');
//var users = require('./routes/users');
//var config = require('./config/config.json')[process.env.NODE_ENV || "development"];

//storage destination
/*var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    cb(null, config.db.upload_path)
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname);
  }
})
*/

var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/angular', express.static(path.join(__dirname, 'angular')));
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));
// Session
app.use(session({
    secret: 'se-shoues',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3*60*60*1000 }, 
    store : new memoryStore()
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);
//app.use('/users', users);

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