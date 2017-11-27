var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var json2xls = require('json2xls');

var index = require('./routes/index');
var news = require('./routes/news');
var orders = require('./routes/orders');
var users = require('./routes/users');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/menu');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(json2xls.middleware);

app.use('/', index);
app.use('/api', news);
app.use('/api', orders);
app.use('/api', users);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
