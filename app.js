var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var memoryStore = require('session-memory-store')(session);
var config = require('./config/config.json')[process.env.NODE_ENV || "development"];

var routes = require('./routes/index');
var auction = require('./routes/rest/auction');
var board = require('./routes/rest/board');
var cart = require('./routes/rest/cart');
var item = require('./routes/rest/item');
var itemBrand = require('./routes/rest/brand');
var itemType = require('./routes/rest/type');
var order = require('./routes/rest/order');
var popup = require('./routes/rest/popup');
var user = require('./routes/rest/user');

var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/angular', express.static(path.join(__dirname, 'angular')));
app.use('/webdata', express.static(path.join(__dirname, 'webdata')));
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));
// Session
app.use(session({
    secret: 'se-shoues',
    cookie: { maxAge: 60000 }, 
    resave: true, 
    saveUninitialized: true,
    store : new memoryStore()
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);
app.use('/rest/item', item);
app.use('/rest/brand', itemBrand);
app.use('/rest/type', itemType);
app.use('/rest/auction', auction);
app.use('/rest/cart', cart);
app.use('/rest/order', order);
app.use('/rest/board', board);
app.use('/rest/popup', popup);
app.use('/rest/user', user);

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
